#!/usr/bin/env python3
"""
fast_scrape.py — pull YouTube transcripts in bulk, straight from YouTube's own
caption endpoint, 25 videos at a time. Standard library only.

    python3 fast_scrape.py URL [URL ...] [--out DIR] [--max N] [--workers 25]
                          [--shorts] [--timestamps] [--ids-file FILE]

Accepts any mix of: video URLs, youtu.be links, Shorts links, playlist URLs,
channel URLs (@handle, /c/, /channel/, /user/), bare 11-character video IDs,
or a text/JSON file of IDs. Channel and playlist listing needs yt-dlp
(`pip install yt-dlp`); individual videos need nothing at all.

Writes one Markdown file per video (title, URL, date, duration, word count,
then the transcript as readable paragraphs) plus _manifest.json.
"""
import argparse, json, os, re, sys, time, random, threading, subprocess
import urllib.request, urllib.parse, urllib.error
from collections import Counter
from concurrent.futures import ThreadPoolExecutor

PLAYER_URL = "https://www.youtube.com/youtubei/v1/player"
# Two mobile clients. Retries alternate between them so one flaky answer doesn't sink a video.
CLIENTS = [
    ({"clientName": "IOS", "clientVersion": "20.10.4", "deviceModel": "iPhone16,2"},
     "com.google.ios.youtube/20.10.4 (iPhone16,2; U; CPU iOS 18_3_2 like Mac OS X)"),
    ({"clientName": "ANDROID", "clientVersion": "20.10.38", "androidSdkVersion": 34},
     "com.google.android.youtube/20.10.38 (Linux; U; Android 14) gzip"),
]
PARAGRAPH_SECONDS = 45          # start a new paragraph roughly this often
ID_RE = re.compile(r"^[A-Za-z0-9_-]{11}$")


# ----------------------------------------------------------------------------- input parsing
def video_id_from_url(u):
    """Return the 11-char video ID if `u` points at a single video, else None."""
    if ID_RE.match(u):
        return u
    p = urllib.parse.urlparse(u if "://" in u else "https://" + u)
    host = p.netloc.lower().replace("www.", "").replace("m.", "")
    if host == "youtu.be":
        return p.path.strip("/").split("/")[0] or None
    if host.endswith("youtube.com"):
        q = urllib.parse.parse_qs(p.query)
        if p.path == "/watch" and q.get("v"):
            return q["v"][0]
        m = re.match(r"^/(shorts|live|embed|v)/([A-Za-z0-9_-]{11})", p.path)
        if m:
            return m.group(2)
    return None


def is_listing(u):
    """Playlist or channel URL — something that expands into many videos."""
    p = urllib.parse.urlparse(u if "://" in u else "https://" + u)
    host = p.netloc.lower().replace("www.", "").replace("m.", "")
    if not host.endswith("youtube.com"):
        return u.startswith("@")
    if p.path == "/playlist":
        return True
    return bool(re.match(r"^/(@[^/]+|c/[^/]+|channel/[^/]+|user/[^/]+)", p.path))


def normalise_listing(u, shorts):
    """Channel URLs need a tab suffix or yt-dlp lists every tab (videos, shorts, streams)."""
    if u.startswith("@"):
        u = "https://www.youtube.com/" + u
    if "://" not in u:
        u = "https://" + u
    p = urllib.parse.urlparse(u)
    if p.path == "/playlist":
        return u
    base = re.match(r"^/(@[^/]+|c/[^/]+|channel/[^/]+|user/[^/]+)", p.path)
    if base and not re.search(r"/(videos|shorts|streams)$", p.path):
        return f"https://www.youtube.com{base.group(0)}/{'shorts' if shorts else 'videos'}"
    return u


def ytdlp_cmd():
    for cmd in (["yt-dlp"], [sys.executable, "-m", "yt_dlp"]):
        try:
            subprocess.run(cmd + ["--version"], capture_output=True, timeout=30, check=True)
            return cmd
        except Exception:
            continue
    return None


def list_ids(url, limit):
    cmd = ytdlp_cmd()
    if not cmd:
        sys.exit("Listing a channel or playlist needs yt-dlp. Install it with:  pip install yt-dlp\n"
                 "(Single video URLs work without it.)")
    args = cmd + ["--flat-playlist", "--print", "%(id)s", "--no-warnings", "--quiet"]
    if limit:
        args += ["--playlist-end", str(limit)]
    print(f"listing videos from {url} ...", flush=True)
    r = subprocess.run(args + [url], capture_output=True, text=True, timeout=900)
    ids = [l.strip() for l in r.stdout.splitlines() if ID_RE.match(l.strip())]
    if not ids:
        sys.exit(f"yt-dlp found no videos at {url}\n{r.stderr.strip()[-500:]}")
    print(f"  {len(ids)} videos", flush=True)
    return ids


def ids_from_file(path):
    txt = open(path, encoding="utf-8").read()
    try:
        data = json.loads(txt)
        if isinstance(data, dict):
            data = data.get("videoIds") or data.get("ids") or []
        return [video_id_from_url(str(x)) for x in data if video_id_from_url(str(x))]
    except json.JSONDecodeError:
        return [video_id_from_url(l.strip()) for l in txt.splitlines() if l.strip() and not l.startswith("#")
                and video_id_from_url(l.strip())]


def collect_ids(args):
    ids = []
    for u in args.inputs:
        if os.path.isfile(u):
            ids += ids_from_file(u)
        elif video_id_from_url(u):
            ids.append(video_id_from_url(u))
        elif is_listing(u):
            ids += list_ids(normalise_listing(u, args.shorts), args.max)
        else:
            print(f"skipping unrecognised input: {u}", file=sys.stderr)
    if args.ids_file:
        ids += ids_from_file(args.ids_file)
    seen, out = set(), []
    for v in ids:
        if v not in seen:
            seen.add(v); out.append(v)
    return out[: args.max] if args.max else out


# ----------------------------------------------------------------------------- fetching
def http(url, data=None, headers=None, timeout=45):
    req = urllib.request.Request(url, data=data, headers=headers or {})
    return urllib.request.urlopen(req, timeout=timeout).read()


def player(vid, attempt):
    client, ua = CLIENTS[attempt % len(CLIENTS)]
    ctx = {"client": dict(client, hl="en", gl="US")}
    body = json.dumps({"videoId": vid, "context": ctx}).encode()
    return json.loads(http(PLAYER_URL, body, {"Content-Type": "application/json", "User-Agent": ua})), ua


WEB_CLIENT = ({"clientName": "WEB", "clientVersion": "2.20250312.04.00"}, "Mozilla/5.0")


def publish_date(vid):
    """The mobile clients return captions but no dates; the web client is the reverse.
    One extra small call gets the upload date so files sort chronologically."""
    try:
        client, ua = WEB_CLIENT
        body = json.dumps({"videoId": vid, "context": {"client": dict(client, hl="en", gl="US")}}).encode()
        d = json.loads(http(PLAYER_URL, body, {"Content-Type": "application/json", "User-Agent": ua}, timeout=20))
        mf = d.get("microformat", {}).get("playerMicroformatRenderer", {})
        return (mf.get("publishDate") or mf.get("uploadDate") or "")[:10]
    except Exception:
        return ""


CUE_RE = re.compile(r"\[[^\]]{1,30}\]")   # [Music], [Applause], [laughter] ... noise for a reader


def paragraphs(events, timestamps):
    """Flatten json3 caption events into readable paragraphs.

    A new paragraph starts every ~PARAGRAPH_SECONDS, and also wherever YouTube marks a
    speaker change (">>"), so interviews read as dialogue rather than one merged block.
    Bracketed sound cues are dropped; they help the hard-of-hearing, not a reader."""
    paras, cur, cur_start = [], [], None

    def flush(start):
        text = " ".join("".join(cur).split())
        text = CUE_RE.sub("", text)
        text = " ".join(text.split())
        if text:
            paras.append((start, text))

    for e in events:
        segs = e.get("segs") or []
        if not segs:
            continue
        t = int(e.get("tStartMs", 0))
        if cur_start is None:
            cur_start = t
        chunk = "".join(s.get("utf8", "") for s in segs)
        if t - cur_start >= PARAGRAPH_SECONDS * 1000 and cur:
            flush(cur_start)
            cur, cur_start = [], t
        # ">>" is YouTube's speaker-change marker; split the paragraph there
        if ">>" in chunk:
            pieces = chunk.split(">>")
            cur.append(pieces[0])
            for piece in pieces[1:]:
                if cur:
                    flush(cur_start)
                cur, cur_start = [piece], t
        else:
            cur.append(chunk)
    if cur:
        flush(cur_start)

    out = []
    for start, text in paras:
        if timestamps:
            m, s = divmod(start // 1000, 60)
            h, m = divmod(m, 60)
            stamp = f"[{h}:{m:02d}:{s:02d}]" if h else f"[{m}:{s:02d}]"
            out.append(f"{stamp} {text}")
        else:
            out.append(text)
    return out


def fetch(vid, timestamps, attempts=5):
    last = None
    for a in range(attempts):
        try:
            d, ua = player(vid, a)
            status = d.get("playabilityStatus", {}).get("status")
            if status != "OK":
                reason = d.get("playabilityStatus", {}).get("reason", "")
                last = f"unavailable ({status}{': ' + reason if reason else ''})"
                if status in ("ERROR", "LOGIN_REQUIRED") and a >= 1:
                    return vid, None, last          # private/removed/age-gated: retrying won't help
                raise RuntimeError(last)
            vd = d.get("videoDetails", {})
            mf = d.get("microformat", {}).get("playerMicroformatRenderer", {})
            tracks = d.get("captions", {}).get("playerCaptionsTracklistRenderer", {}).get("captionTracks", [])
            en = [t for t in tracks if t.get("languageCode", "").startswith("en")]
            if not en:
                if not tracks:
                    return vid, None, "no captions on YouTube"
                langs = ",".join(t.get("languageCode", "?") for t in tracks)
                return vid, None, f"no English captions (only: {langs})"
            # prefer a human-uploaded English track over auto-generated when both exist
            en.sort(key=lambda t: t.get("kind") == "asr")
            raw = json.loads(http(en[0]["baseUrl"] + "&fmt=json3", headers={"User-Agent": ua}))
            paras = paragraphs(raw.get("events", []), timestamps)
            text = "\n\n".join(paras)
            if not text.strip():
                last = "empty transcript"
                raise RuntimeError(last)
            return vid, {
                "title": vd.get("title") or "untitled",
                "author": vd.get("author") or "",
                "channel_id": vd.get("channelId") or "",
                "published": (mf.get("publishDate") or "")[:10] or publish_date(vid),
                "duration": int(vd.get("lengthSeconds") or 0),
                "views": int(vd.get("viewCount") or 0),
                "caption_kind": "auto" if en[0].get("kind") == "asr" else "manual",
                "words": len(text.split()),
                "text": text,
            }, None
        except Exception as e:
            last = last if isinstance(e, RuntimeError) else f"{type(e).__name__}: {e}"
            if a < attempts - 1:
                time.sleep((2 ** a) * 0.4 + random.random() * 0.5)
    return vid, None, last


# ----------------------------------------------------------------------------- output
def slug(s, n=80):
    s = re.sub(r"[^A-Za-z0-9\s-]", "", s or "untitled").strip().lower()
    return re.sub(r"[\s-]+", "-", s)[:n].strip("-") or "untitled"


def fmt_dur(sec):
    h, m = divmod(sec // 60, 60)
    return f"{h}h {m}m {sec % 60}s" if h else f"{m}m {sec % 60}s"


def write_outputs(results, out_dir, source):
    ok = [(v, m) for v, m, _ in results if m]
    bad = [(v, e) for v, m, e in results if not m]
    os.makedirs(out_dir, exist_ok=True)
    items = []
    for v, m in ok:
        fn = f"{m['published'] or 'undated'}-{slug(m['title'])}.md"
        path = os.path.join(out_dir, fn)
        if os.path.exists(path):                       # two videos with the same title on the same day
            fn = f"{m['published'] or 'undated'}-{slug(m['title'], 68)}-{v}.md"
            path = os.path.join(out_dir, fn)
        with open(path, "w", encoding="utf-8") as f:
            f.write(f"# {m['title']}\n\n"
                    f"- Channel: {m['author']}\n"
                    f"- URL: https://www.youtube.com/watch?v={v}\n"
                    f"- Published: {m['published'] or 'unknown'}\n"
                    f"- Duration: {fmt_dur(m['duration'])}\n"
                    f"- Words: {m['words']:,}\n"
                    f"- Captions: {m['caption_kind']}\n\n---\n\n{m['text']}\n")
        items.append({"id": v, "file": fn, **{k: m[k] for k in
                      ("title", "author", "published", "duration", "views", "caption_kind", "words")}})
    manifest = {
        "source": source, "scraped_at": time.strftime("%Y-%m-%dT%H:%M:%S"),
        "ok": len(ok), "failed": len(bad),
        "total_words": sum(i["words"] for i in items),
        "total_seconds": sum(i["duration"] for i in items),
        "items": items,
        "failures": [{"id": v, "url": f"https://www.youtube.com/watch?v={v}", "reason": e} for v, e in bad],
    }
    with open(os.path.join(out_dir, "_manifest.json"), "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=1)
    return manifest


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("inputs", nargs="*", help="video/playlist/channel URLs, video IDs, or files of them")
    ap.add_argument("--ids-file", help="text (one per line) or JSON {\"videoIds\": [...]} file of IDs/URLs")
    ap.add_argument("--out", help="output folder (default: outputs/transcripts/<Channel Name>)")
    ap.add_argument("--max", type=int, default=0, help="cap the number of videos (0 = no cap)")
    ap.add_argument("--workers", type=int, default=25, help="parallel downloads (default 25)")
    ap.add_argument("--shorts", action="store_true", help="for channel URLs, list the Shorts tab instead of Videos")
    ap.add_argument("--timestamps", action="store_true", help="prefix each paragraph with [m:ss]")
    args = ap.parse_args()
    if not args.inputs and not args.ids_file:
        ap.error("give at least one URL, ID, or --ids-file")

    ids = collect_ids(args)
    if not ids:
        sys.exit("no video IDs found in the input")
    print(f"fetching {len(ids)} transcript{'s' if len(ids) != 1 else ''}, {args.workers} at a time ...", flush=True)

    done = [0]; lock = threading.Lock()
    def job(v):
        r = fetch(v, args.timestamps)
        with lock:
            done[0] += 1
            if done[0] % 25 == 0 or done[0] == len(ids):
                print(f"  {done[0]}/{len(ids)}", flush=True)
        return r

    t0 = time.time()
    with ThreadPoolExecutor(max_workers=max(1, args.workers)) as ex:
        results = list(ex.map(job, ids))
    elapsed = time.time() - t0

    ok = [m for _, m, _ in results if m]
    if args.out:
        out_dir = args.out
    else:
        authors = Counter(m["author"] for m in ok if m["author"])
        name = authors.most_common(1)[0][0] if authors else "Unknown Channel"
        out_dir = os.path.join("outputs", "transcripts", re.sub(r'[\\/:*?"<>|]', "", name).strip() or "Unknown Channel")
    manifest = write_outputs(results, out_dir, " ".join(args.inputs) or args.ids_file)

    print()
    print("Transcript scrape complete")
    print("==========================")
    print(f"Saved to : {out_dir}/")
    print(f"Videos   : {manifest['ok']} saved, {manifest['failed']} skipped")
    print(f"Words    : {manifest['total_words']:,}  ({manifest['total_seconds'] / 3600:.1f} hours of video)")
    print(f"Time     : {elapsed:.1f}s  ({len(ids) / elapsed:.1f} videos/sec)")
    if manifest["failures"]:
        print("Skipped  :")
        for f in manifest["failures"][:15]:
            print(f"  - {f['url']}  {f['reason']}")
        if len(manifest["failures"]) > 15:
            print(f"  ... and {len(manifest['failures']) - 15} more in _manifest.json")
    return 0 if manifest["ok"] else 1


if __name__ == "__main__":
    sys.exit(main())

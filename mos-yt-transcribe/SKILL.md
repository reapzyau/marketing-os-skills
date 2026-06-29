---
name: mos-yt-transcribe
description: "Download SRT subtitle transcripts from YouTube and save them to a local research library. Use when: user provides a YouTube URL (single video, channel, or playlist), or says 'download transcripts', 'get transcripts from', 'save subtitles from YouTube', 'transcribe a youtube channel', 'extract subtitles'. Two modes — single video URL needs no setup, channel/playlist needs an Apify token for video discovery at scale."
---

# YouTube → Transcript Library

Turn any YouTube video, channel, or playlist into clean SRT transcript files you can search, grep, feed to Claude, or upload to NotebookLM. Saves to `outputs/transcripts/[Channel Name]/` using the convention `YYYY-MM-DD-[slug].en.srt`.

**Two modes, one skill:**

| Input | Mode | Setup required |
|-------|------|----------------|
| Single video URL (e.g. `youtube.com/watch?v=…`) | **Direct** — yt-dlp only | None beyond Python + yt-dlp |
| Playlist URL (e.g. `youtube.com/playlist?list=…`) | **Direct** — yt-dlp playlist mode | None beyond Python + yt-dlp |
| Channel URL (e.g. `youtube.com/@Handle`) | **Scale** — Apify discovers videos, yt-dlp downloads subs | Free Apify account + `APIFY_TOKEN` |

If you only ever want to transcribe individual videos or playlists, you can skip the Apify setup entirely.

---

## Prerequisites (always required)

1. **Python 3.10+**:
   ```bash
   python3 --version
   ```

2. **yt-dlp** (note: not in PATH on most systems — invoke via Python):
   ```bash
   python3 -m yt_dlp --version
   ```
   If missing: `pip install yt-dlp`

That's it for single-video and playlist mode.

---

## Apify Setup (only needed for channel-mode)

Channel mode discovers every video on a channel via the Apify API, then hands the URLs to yt-dlp. This is the only way to do it at scale — YouTube doesn't publish a public channel-to-video-list API.

**One-time setup (~3 minutes):**

### Step 1: Create a free Apify account

Go to **https://apify.com** and sign up. The free tier gives you **$5/month in platform credits** — that's enough to scrape ~25-100 channels per month depending on size. No credit card required.

### Step 2: Get your API token

1. Once logged in, go to **https://console.apify.com/account/integrations**
2. Copy your **Personal API token** (starts with `apify_api_`)

### Step 3: Set the token in your environment

Add this line to your shell profile (`~/.bashrc`, `~/.zshrc`, or `~/.profile`):

```bash
export APIFY_TOKEN="apify_api_paste_your_token_here"
```

Reload your shell:

```bash
source ~/.bashrc   # or ~/.zshrc, depending on your shell
```

### Step 4: Verify

```bash
echo "${APIFY_TOKEN:+set}"
```

Should print `set`. If it prints nothing, the token isn't loaded — restart your terminal.

### Step 5: Install Node.js 20.6+ (for the bundled Apify runner)

```bash
node --version
```

If you don't have Node, install from https://nodejs.org/ (LTS version).

---

## Workflow

### Step 0: Detect input type

Ask the user for the URL (or take it from their message). Decide which path to run:

| URL pattern | Path |
|-------------|------|
| `youtube.com/watch?v=…` or `youtu.be/…` | **Path A — Single video** (skip to Step 1A) |
| `youtube.com/playlist?list=…` | **Path A — Playlist** (skip to Step 1A) |
| `youtube.com/@Handle`, `/c/Name`, `/channel/UC…` | **Path B — Channel** (Step 1B onward) |

---

### Path A: Single Video or Playlist (no Apify needed)

#### Step 1A: Confirm folder name

Ask the user what folder name to use under `outputs/transcripts/`. For a single video, default to the channel name (yt-dlp will print it). For a playlist, default to the playlist title or a name the user picks. Use title case (e.g. `Alex Hormozi`, `Skool News`).

Probe the metadata first:

```bash
python3 -m yt_dlp \
  --print "channel=%(channel)s" \
  --print "title=%(title)s" \
  --print "upload_date=%(upload_date>%Y-%m-%d)s" \
  --no-warnings \
  --playlist-end 1 \
  "URL"
```

#### Step 2A: Download subtitles

For a single video:

```bash
mkdir -p "outputs/transcripts/[Channel Name]"
cd "outputs/transcripts/[Channel Name]" && python3 -m yt_dlp \
  --write-auto-sub \
  --skip-download \
  --sub-lang en \
  --convert-subs srt \
  --output "%(upload_date)s-%(title)s.%(ext)s" \
  "VIDEO_URL"
```

For a playlist:

```bash
mkdir -p "outputs/transcripts/[Playlist Name]"
cd "outputs/transcripts/[Playlist Name]" && python3 -m yt_dlp \
  --write-auto-sub \
  --skip-download \
  --sub-lang en \
  --convert-subs srt \
  --yes-playlist \
  --output "%(upload_date)s-%(title)s.%(ext)s" \
  "PLAYLIST_URL"
```

#### Step 3A: Rename to clean convention

yt-dlp outputs `YYYYMMDD-Title.en.srt` — rename to `YYYY-MM-DD-[slug].en.srt` per Step 6 below.

#### Step 4A: Report

Skip to Step 8 (Report).

---

### Path B: Channel (Apify required)

#### Step 1B: Verify Apify is set up

```bash
echo "${APIFY_TOKEN:+set}"
node --version
```

If `APIFY_TOKEN` is not set, stop and point the user at the Apify Setup section above. If Node.js is not installed, stop and tell them to install it.

#### Step 2B: Gather channel URL + cap

Accept any channel format:
- `https://www.youtube.com/@Handle`
- `https://www.youtube.com/c/ChannelName`
- `https://www.youtube.com/channel/UCXXXX`
- `@Handle` (prepend `https://www.youtube.com/`)

Ask for max videos — default 200.

Determine the **Channel Name** for the output folder. Use the channel's display name in title case (e.g., `Skool News`, `Alex Hormozi`). This becomes the folder name under `outputs/transcripts/`.

#### Step 3B: Estimate & confirm (cost check)

Before running Apify, research channel size using free methods:
1. **WebSearch** for the channel name + "youtube" + "videos" (Social Blade, Favikon, etc.)
2. **WebFetch** on third-party stats sites if found

Present the estimate:

```
Apify Cost Estimate
====================
Channel: @Handle → outputs/transcripts/[Channel Name]/
Estimated videos: ~N (based on [source])
Estimated Apify cost: ~$X.XX (free tier covers ~$5/month)
  - Small (<50 videos): ~$0.02-0.05
  - Medium (50-200 videos): ~$0.05-0.10
  - Large (200+ videos): ~$0.10-0.15
====================
Proceed?
```

Do NOT run the actor until the user confirms.

#### Step 4B: Scrape video URLs via Apify

The skill bundles `scripts/run_actor.js`. Resolve the skill folder at runtime:

```bash
SKILL_DIR=$(dirname "$(readlink -f ~/.claude/skills/mos/mos-yt-transcribe/SKILL.md)")
```

(If you cloned the marketingos-skills repo to a different path, adjust accordingly. The install command in the repo README is `git clone https://github.com/reapzyau/marketingos-skills.git ~/.claude/skills/mos`.)

Run the actor:

```bash
APIFY_TOKEN="$APIFY_TOKEN" node "$SKILL_DIR/scripts/run_actor.js" \
  --actor "streamers/youtube-scraper" \
  --input '{
    "startUrls": [{"url": "CHANNEL_URL/videos"}],
    "maxResults": MAX_VIDEOS,
    "sortBy": "date"
  }' \
  --output /tmp/yt-scrape-results.json \
  --format json \
  --timeout 300
```

**Notes:**
- Append `/videos` to the channel URL for best results
- `sortBy: "date"` — newest videos first (important when capping)
- Do NOT use `channelUrls` — field doesn't exist in this actor

#### Step 5B: Parse & dry run

```bash
python3 -c "
import json
data = json.load(open('/tmp/yt-scrape-results.json'))
print(f'Found {len(data)} videos')
if data: print(f'Channel: {data[0].get(\"channelName\",\"Unknown\")}')
"
```

Show the user before downloading:
- Videos found
- Channel name (confirm it matches expected folder name)
- Estimated time (~3-10 seconds per video, subtitle only)
- Get confirmation before proceeding

#### Step 6B: Download subtitles via yt-dlp

Create a working folder:

```bash
mkdir -p /tmp/yt-transcripts-[channel-slug]/
```

For each video URL extracted from `/tmp/yt-scrape-results.json`:

```bash
python3 -m yt_dlp \
  --write-auto-sub \
  --skip-download \
  --sub-lang en \
  --convert-subs srt \
  --output "/tmp/yt-transcripts-[channel-slug]/%(upload_date)s-%(title)s.%(ext)s" \
  "VIDEO_URL"
```

**Key flags:**
- `--write-auto-sub` — auto-generated captions (no manual captions needed)
- `--skip-download` — subtitles only, no video
- `--sub-lang en` — English only
- `--convert-subs srt` — standardise format
- Output pattern uses `%(upload_date)s` (YYYYMMDD) for date prefix

**For large channels (50+ videos):** Run via `run_in_background=true`. Log progress every 10 videos.

If a video fails (private, no captions, region-locked): log it and continue — don't abort.

---

### Step 6: Rename Files (shared between paths)

yt-dlp outputs `YYYYMMDD-Title.en.srt` — rename to clean `YYYY-MM-DD-[slug].en.srt`:

```bash
python3 << 'EOF'
import os, re

folder = "WORKING_FOLDER"  # /tmp/yt-transcripts-[channel-slug] or outputs/transcripts/[Channel Name]
renamed = 0
skipped = 0

for f in os.listdir(folder):
    if not f.endswith('.en.srt'):
        skipped += 1
        continue
    m = re.match(r'^(\d{4})(\d{2})(\d{2})-(.+)\.en\.srt$', f)
    if not m:
        skipped += 1
        continue
    year, month, day, title = m.groups()
    slug = re.sub(r'[^\w\s-]', '', title.lower())
    slug = re.sub(r'[\s_]+', '-', slug).strip('-')[:80]
    new_name = f"{year}-{month}-{day}-{slug}.en.srt"
    os.rename(os.path.join(folder, f), os.path.join(folder, new_name))
    renamed += 1

print(f"Renamed: {renamed}, Skipped: {skipped}")
EOF
```

### Step 7: Copy to outputs/transcripts/ (Path B only)

For Path A this happens directly in Step 2A. For Path B, move from the `/tmp/` working folder:

```bash
DEST="outputs/transcripts/[Channel Name]"
mkdir -p "$DEST"
cp /tmp/yt-transcripts-[channel-slug]/*.en.srt "$DEST/"
echo "Copied $(ls "$DEST"/*.en.srt | wc -l) files to $DEST"
```

### Step 8: Report

```
Transcript Download Complete
==============================
Source: [video URL | playlist URL | @ChannelHandle]
Saved to: outputs/transcripts/[Channel Name]/
Files: X downloaded, Y failed (no captions or private)

Failed videos:
  - [URL if any]

To search transcripts:
  grep -r "keyword" "outputs/transcripts/[Channel Name]/"
==============================
```

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| `No subtitles found` for a video | No auto-captions available — skip and continue |
| `This video is unavailable` | Private or removed — skip |
| `python3 -m yt_dlp: not found` | `pip install yt-dlp` |
| Slow download (video being downloaded) | Ensure `--skip-download` is in the command |
| Empty SRT files | Try `--write-sub` instead of `--write-auto-sub` |
| `APIFY_TOKEN` empty when running `echo "${APIFY_TOKEN:+set}"` | Add `export APIFY_TOKEN="..."` to your shell profile and restart the terminal |
| Apify actor timeout | Increase `--timeout` to 600 for large channels |
| No Apify results | Try full `youtube.com/channel/UCXXX` URL format, or append `/videos` |
| Free Apify credits used up | Wait until next month, upgrade plan, or process channels in smaller batches |
| Node.js version too old | Apify runner needs Node 20.6+ for `--env-file` and parseArgs — upgrade Node |

---

## Key Rules

- **yt-dlp is NOT in PATH** — always invoke as `python3 -m yt_dlp`
- **APIFY_TOKEN** must be set as an environment variable (no fallback paths)
- **Folder naming:** `outputs/transcripts/[Channel Name]` in title case (e.g., `Skool News`)
- **File naming:** `YYYY-MM-DD-[slug].en.srt` — no spaces, lowercase slug
- **Bundled script:** `scripts/run_actor.js` lives inside this skill folder — no external dependency
- **Single video = no Apify.** Path A handles individual videos and playlists with zero setup beyond yt-dlp.

---

## What You End Up With

A folder full of clean SRT transcripts that you can:
- `grep` across to find specific topics or quotes
- Feed into NotebookLM, Claude, or any LLM as research input
- Mine for content ideas, hooks, or competitor angles
- Build a permanent local research archive of any channel you want to study

The whole point is to turn YouTube into a searchable text corpus — no clicking through videos, no replaying for one quote, no platform lock-in.

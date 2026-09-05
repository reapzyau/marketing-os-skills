---
name: mos-yt-fast-scrape
description: "Scrape YouTube transcripts in bulk, fast — an entire channel (hundreds of videos) in under a minute, as clean readable Markdown you can search, feed to Claude, or ingest into your wiki. Pulls captions straight from YouTube's own caption endpoint, 25 videos in parallel, no API key, no Apify, no video download. Use this whenever the user wants transcripts from YouTube: 'scrape this channel', 'get every transcript from', 'pull the transcripts', 'download all of [creator]'s videos as text', 'turn this channel into a knowledge base', 'what does [creator] say about X across their videos', 'fast scrape', 'mos-yt-fast-scrape', or drops a YouTube channel/playlist/video URL and wants the words, not the video. Prefer it over mos-yt-transcribe unless the user specifically needs SRT subtitle files with per-line timestamps."
---

# YouTube Fast Scrape

Turn any YouTube channel, playlist, or video into a folder of clean Markdown transcripts, fast enough that "the whole channel" is a reasonable ask. The bundled script asks YouTube's own caption endpoint (the same one the mobile app uses) for each video's English caption track, 25 videos at a time. No API key, no third-party scraper, no video download.

For scale: a 500-video channel takes roughly 40 to 60 seconds and produces about 3 million words of searchable text.

**What you get per video:** one `.md` file with the title, channel, URL, publish date, duration, word count, and the transcript broken into readable paragraphs (roughly one per 45 seconds of speech). Plus a `_manifest.json` listing every video and every skip, with the reason.

**When to use the sibling `/mos-yt-transcribe` instead:** only when the user needs SRT subtitle files with timestamps on every line (for video editing or caption work). For research, reading, search, wiki ingest, or anything that feeds text to an LLM, this skill is the right one: it is faster, needs no setup, and the output reads like an article rather than a subtitle file.

---

## Prerequisites

1. **Python 3.8+** (already there on macOS and most Linux; Windows users usually have it from installing Claude Code):
   ```bash
   python3 --version
   ```

2. **yt-dlp, only if scraping a channel or playlist.** The script uses it purely to list the video IDs on a channel or playlist; the transcripts themselves never go through it. Single video URLs need nothing beyond Python.
   ```bash
   python3 -m yt_dlp --version || pip install yt-dlp
   ```

That's the whole setup. No accounts, no tokens.

---

## Workflow

### Step 1: Work out what the user wants scraped

Take the URL(s) from the message. The script accepts any mix of:

| Input | Example | Notes |
|-------|---------|-------|
| Video | `youtube.com/watch?v=…`, `youtu.be/…`, `youtube.com/shorts/…` | No yt-dlp needed |
| Channel | `youtube.com/@Handle`, `@Handle`, `/channel/UC…`, `/c/Name` | Lists the Videos tab (long-form). Add `--shorts` for the Shorts tab |
| Playlist | `youtube.com/playlist?list=…` | |
| Bare IDs | `mRlSb0O5QNU` | 11-character video IDs |
| A file | `ids.txt` or `ids.json` | One URL/ID per line, or `{"videoIds": [...]}` |

Then, before running anything, ask the user two questions. Ask them together in one message (use the AskUserQuestion tool if it is available, otherwise just ask in plain text), and skip either one the user has already answered in their message.

**Question 1: How many videos?**

A channel can hold hundreds of long-form videos and thousands of Shorts, and the user usually has a number in mind. Offer these, with the first as the default:

- **25 most recent** (a quick look at the shape of the output before committing to more)
- **100 most recent**
- **The whole channel** (every long-form video; warn that a large channel is a lot of files)
- **A specific number** they type in

For a single video URL there is nothing to ask. For a playlist, "all of it" is the sensible default, so only ask if the playlist is big.

**Question 2: Where should the transcripts go?**

Offer the default, which is a new folder in their Downloads named after the channel: `~/Downloads/<channel-name>-yt/` (for example `~/Downloads/charlie-morgan-yt/`). The script works this out itself on macOS, Windows, and WSL, so you do not need to know the channel name in advance. Let them type any other path instead. Two common alternatives worth mentioning: `outputs/transcripts/<Channel Name>/` inside their project (where `/mos-yt-transcribe` saves), or `knowledge/raw/<channel>` if they are feeding `/mos-wiki-ingest`.

Confirm the path you will use back to them in full so there is no surprise about where 500 files just landed.

Whatever they choose becomes `--max N` (omit for the whole channel) and `--out DIR` (omit for the default) in Step 2.

### Step 2: Run the script

Resolve the skill folder, then run:

```bash
SKILL_DIR=$(dirname "$(readlink -f ~/.claude/skills/mos/mos-yt-fast-scrape/SKILL.md)")
python3 "$SKILL_DIR/scripts/fast_scrape.py" "URL" [options]
```

(If the marketing-os-skills repo is cloned somewhere other than `~/.claude/skills/mos`, adjust the path. The README install command puts it there.)

Options:

| Flag | Effect |
|------|--------|
| `--out DIR` | Save somewhere other than the default `~/Downloads/<channel-name>-yt/` |
| `--max N` | Stop after N videos (newest first for channels) |
| `--shorts` | For a channel URL, scrape the Shorts tab instead of Videos |
| `--timestamps` | Prefix each paragraph with `[m:ss]` so quotes can be located in the video |
| `--workers N` | Parallelism (default 25; lower it only if YouTube starts refusing) |
| `--ids-file FILE` | Read IDs/URLs from a file in addition to (or instead of) arguments |

Examples:

```bash
# A whole channel, long-form only, into ~/Downloads/alex-hormozi-yt/
python3 "$SKILL_DIR/scripts/fast_scrape.py" "https://www.youtube.com/@AlexHormozi"

# Newest 50 with timestamps, straight into a wiki's raw folder
python3 "$SKILL_DIR/scripts/fast_scrape.py" "@AlexHormozi" --max 50 --timestamps --out knowledge/raw/hormozi

# Three specific videos
python3 "$SKILL_DIR/scripts/fast_scrape.py" "https://youtu.be/AAA" "https://youtu.be/BBB" "https://youtu.be/CCC"
```

Run it in the foreground for anything under ~300 videos; it finishes in well under a minute. For very large runs (1,000+ Shorts), run it in the background and check back, since the listing step alone can take a couple of minutes.

The script prints its own summary when it finishes. Trust that summary; don't re-count files by hand.

### Step 3: Sanity-check one file

Open one of the output files and read the first paragraph. You are checking two things: the transcript is in English and the words make sense (auto-captions of a heavily accented or noisy video can be rough). If the sample looks like gibberish, say so in the report rather than presenting the archive as clean.

### Step 4: Report

Relay the script's summary in this shape, then offer the natural next move:

```
YouTube scrape complete
=======================
Source   : @AlexHormozi (Videos tab)
Saved to : ~/Downloads/alex-hormozi-yt/
Videos   : 509 saved, 8 skipped
Words    : 2,924,640  (217 hours of video)
Time     : 38.6s

Skipped (all listed in _manifest.json):
  - 6 have no captions on YouTube at all
  - 2 have only non-English captions
```

Next moves worth suggesting, depending on what they said they were after:

- **Search it:** `grep -ril "grand slam offer" ~/Downloads/alex-hormozi-yt/`
- **Ask questions across the whole archive:** point Claude at the folder, or run `/mos-wiki-ingest` on it so the knowledge compounds instead of being re-read every time.
- **Mine it for content:** `/mos-linkedin-post` or `/mos-x-post` can repurpose any single transcript.

---

## What the script does and doesn't do

Knowing this helps you explain results honestly.

- **Source is YouTube's own English caption track.** Human-uploaded captions are preferred when a video has them; otherwise it's the auto-generated track. Each file's `Captions:` line says which. This is byte-for-byte the same text yt-dlp would give you, just fetched directly.
- **English only, on purpose.** A video whose only caption track is another language is skipped and listed, rather than saving a transcript the user can't read. Bilingual creators will show a few of these.
- **Videos with no caption track at all are skipped.** Nothing exists to download. The only route for those is speech-to-text over the audio, which is a different (paid, slow) job; mention it if the user needs those specific videos.
- **Private, removed, members-only, and age-gated videos are skipped** with the reason YouTube gave.
- **It leans on an internal YouTube endpoint.** That endpoint has been stable for years, but YouTube can change it. If every video suddenly fails with the same error, that's what happened: fall back to `/mos-yt-transcribe` for the day and report the failure so the script can be updated.

## Troubleshooting

| Problem | What to do |
|---------|-----------|
| "Listing a channel or playlist needs yt-dlp" | `pip install yt-dlp`, then rerun. Only channels and playlists need it |
| yt-dlp found no videos at the channel URL | Use the `youtube.com/@Handle` form, or `/channel/UC…`. Check the channel actually has a Videos tab (some are Shorts-only: add `--shorts`) |
| Every video fails with the same error | YouTube changed something, or the network is blocking youtube.com. Try one video with `/mos-yt-transcribe`; if that works, the endpoint changed |
| Many "unavailable" skips on a channel that plays fine in a browser | Members-only or region-locked videos. Nothing to fix |
| Files dated `undated-…` | The date lookup failed for that video (rare). The transcript is still complete |
| Slow (minutes, not seconds) | Almost always the yt-dlp listing step on a huge channel. The transcripts themselves are fast. Cap with `--max` while exploring |

## Key rules

- **Use the bundled script.** Don't rewrite it inline or loop `yt-dlp` per video; that turns a 40-second job into a 40-minute one and is the exact thing this skill exists to avoid.
- **Never download the video files.** Nobody asked for 200 GB of MP4s.
- **Ask how many and where before running.** Two questions, one message, defaults offered. Skip a question only if the user already answered it.
- **Report skips with reasons**, not just a count. "8 skipped" reads as a bug; "6 have no captions, 2 are non-English" reads as complete.
- **Default folder is `~/Downloads/<channel-name>-yt/`**, one folder per channel, easy to find in Finder or Explorer. Pass `--out` to put it inside a project instead.

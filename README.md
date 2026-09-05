# marketing-os-skills

The default skills that ship alongside the [MarketingOS engine](https://github.com/the-vibe-marketing-lab/marketing-os) (`pipx install marketing-os`): a knowledge library that maintains itself, plus the index of every other `mos-*-skills` pack.

Built by [The Vibe Marketing Lab](https://www.skool.com/the-vibe-marketing-lab). Powered by Claude Code.

> **Coming from the old single repo?** The offer, copywriting, social and YouTube skills moved into their own packs on 2026-09-05 (see the pack list below). Your existing links keep working until you re-clone; when you do, run each pack's `setup.sh`.

---

## What's in this repo

**The knowledge library — a wiki that maintains itself (Karpathy's LLM Wiki pattern):**

| # | Skill | What it does | Time |
|---|-------|--------------|------|
| 1 | `/mos-wiki-ingest` | Reads a source (file, folder, URL, or pasted text) and compiles it into interlinked wiki pages, updating indexes and the change log | ~30s per source |
| 2 | `/mos-wiki-query` | Answers a question from the wiki: reads the index, opens only the pages it needs, cites them, and files genuinely new answers back as pages | ~20s |
| 3 | `/mos-wiki-lint` | Health-checks the wiki (orphan pages, broken links, index mismatches, contradictions, stale data) and optionally auto-fixes | ~1 min |

> **Setting up the vault:** the one-time setup is a **master prompt** (grab it from the Skool post), not a skill. Paste it into Claude Code in an empty folder, answer two questions, and it scaffolds the whole `raw/` + `wiki/` structure plus the schema. The three skills run the ongoing loop after that.

## The other packs

Each pack is its own repo with the same layout and the same `setup.sh`. Install the ones you need.

| Pack | Skills | Install |
|------|--------|---------|
| [mos-hormozi-skills](https://github.com/the-vibe-marketing-lab/mos-hormozi-skills) | `/mos-avatar`, `/mos-offer`, `/mos-money-models`, and the interactive `$100M` chain (`/mos-100m-offer`, `/mos-100m-leads`, `/mos-100m-money-models`, `/mos-100m-onepager`) | `git clone https://github.com/the-vibe-marketing-lab/mos-hormozi-skills.git ~/Desktop/mos-hormozi-skills && bash ~/Desktop/mos-hormozi-skills/setup.sh` |
| [mos-copywriting-skills](https://github.com/the-vibe-marketing-lab/mos-copywriting-skills) | `/mos-copy-research`, `/mos-copywriting`, `/mos-proofread` | `git clone https://github.com/the-vibe-marketing-lab/mos-copywriting-skills.git ~/Desktop/mos-copywriting-skills && bash ~/Desktop/mos-copywriting-skills/setup.sh` |
| [mos-smma-skills](https://github.com/the-vibe-marketing-lab/mos-smma-skills) | `/mos-linkedin-post`, `/mos-x-post` | `git clone https://github.com/the-vibe-marketing-lab/mos-smma-skills.git ~/Desktop/mos-smma-skills && bash ~/Desktop/mos-smma-skills/setup.sh` |
| [mos-yt-skills](https://github.com/the-vibe-marketing-lab/mos-yt-skills) | `/mos-yt-fast-scrape`, `/mos-yt-transcribe` | `git clone https://github.com/the-vibe-marketing-lab/mos-yt-skills.git ~/Desktop/mos-yt-skills && bash ~/Desktop/mos-yt-skills/setup.sh` |
| [mos-geo-skills](https://github.com/the-vibe-marketing-lab/mos-geo-skills) | `/mos-geo-llm-buttons` and future GEO skills | `git clone https://github.com/the-vibe-marketing-lab/mos-geo-skills.git ~/Desktop/mos-geo-skills && bash ~/Desktop/mos-geo-skills/setup.sh` |

The MarketingOS *lifecycle* skills (onboard, start, status, think, bet, end, update, help) are not in any pack: they ship inside the engine and install via `mos install`, so they always match the engine version you're running.

---

## Install

Skills live in `~/.claude/skills/`. This repo keeps them under version control and links them into place, so a `git pull` is all an update takes.

```bash
git clone https://github.com/the-vibe-marketing-lab/marketing-os-skills.git ~/Desktop/marketing-os-skills
cd ~/Desktop/marketing-os-skills
bash setup.sh
```

`setup.sh` links every skill folder in this repo into `~/.claude/skills/` (a symlink on macOS and Linux, a directory junction on Windows via Git Bash). Restart any open Claude Code session, then type `/mos-wiki-query` to confirm it loads.

**Updating:** `cd ~/Desktop/marketing-os-skills && git pull`. Updates are announced in the Skool community.

**Prerequisites:** Claude Code with a Claude Pro or Max subscription. If you haven't set that up, start with the Claude Code Masterclass in the Skool classroom.

---

## How to use the knowledge library

**First, set up the vault (one time).** Paste the master prompt into Claude Code in an empty folder and answer the two questions it asks. It scaffolds:

- `knowledge/raw/` — your sources, frozen. You curate these; Claude never edits them.
- `knowledge/wiki/` — the compiled pages Claude writes and maintains, connected with `[[wikilinks]]`.
- A master index, per-domain indexes, and an append-only change log.
- The wiki schema injected into your `CLAUDE.md` so every future session knows the rules.

**Then feed it sources:**

```
/mos-wiki-ingest
```

Drop a source into `knowledge/raw/` (or paste text, or hand over a URL) and Claude compiles it into the wiki: creating and updating entity and concept pages, wiring up cross-references, and logging the ingest. One source can touch 5-15 pages. The cross-referencing is done once, here, not re-derived every time you ask a question.

**Keep it healthy as it grows:**

```
/mos-wiki-lint
```

Claude scans the whole wiki for orphan pages, broken links, index mismatches, contradictions, and stale data, then hands you a report and offers to auto-fix the safe stuff. A linter for your knowledge instead of your code.

**And actually use what you've built:**

```
/mos-wiki-query
```

Ask a question and Claude answers it *from the wiki* the disciplined way: it reads the index to find the right pages, opens just those two or three (never re-reading all your raw sources), and cites them. When an answer is genuinely new (a comparison, a synthesis, a connection) it files it back as its own page so you never lose it to chat history.

**Output:** a `knowledge/` folder you read in Obsidian, with graph view showing every connection. No vector database, no code. Plain markdown you own.

---

## Using the knowledge library well

A few rules that separate a library that compounds from a folder that rots.

### raw vs wiki vs outputs

The test is **not** who made it. It's what role the file plays:

- **`knowledge/raw/`** — INPUTS the AI reads but never edits. Collected from the world (articles, transcripts, competitor pages) *or* captured by you (call notes, voice memos), as long as it's a source you want the AI to synthesise *from*.
- **`knowledge/wiki/`** — COMPILED KNOWLEDGE the AI writes and maintains. You read it; the AI writes it.
- **`outputs/`** (outside the vault) — FINISHED ARTEFACTS you generate *from* the wiki: a post, a deck, a headline. Work product, not part of the graph.

Litmus test: **does the AI read *from* it (`raw/`) or did the AI *produce* it (`outputs/`)?**

### Would you ever ingest from `outputs/`? Almost never.

Outputs are downstream of the wiki, so re-ingesting them is circular. The one exception is the file-back move built into `/mos-wiki-query`: if an artefact surfaced *genuinely new knowledge*, promote *that knowledge* into a wiki page. Don't dump the whole deliverable into `raw/`.

### Already have a big library? Don't bulk-ingest it.

- **Collected source docs** (PDFs, transcripts, clippings): drop them into `raw/` as-is, then ingest *only the slice you're about to use*, in small supervised batches.
- **Your own written notes** (an existing vault): these are already the `wiki/` layer. Point them at `knowledge/wiki/` and run `/mos-wiki-lint` to index and link them.
- **If you wrote it, it's `wiki/`; if you collected it, it's `raw/`.** And: **compile what you'll query, not your whole library.**

### The daily loop

```
SET UP ONCE       → master prompt (scaffolds raw/ + wiki/ + the schema)
FEED CONTINUOUSLY → drop sources into raw/ (/mos-yt-fast-scrape from mos-yt-skills, web clipper, file drops)
INGEST ON DEMAND  → /mos-wiki-ingest a domain when you're about to use it (small batches)
QUERY VIA INDEX   → /mos-wiki-query, and let it file good answers back
LINT PERIODICALLY → /mos-wiki-lint after a big batch, or monthly
```

### Scale note

The index pattern works to roughly 100 sources / a few hundred pages with no search infrastructure. Past that, add a local search tool (an on-device BM25 + vector search such as `qmd`, available as CLI or MCP) so the agent can find pages without reading the whole index. "Compile what you'll query" keeps you under the ceiling longer.

---

## Troubleshooting

- **Skills don't show up in Claude Code:** the folders must be *direct* children of `~/.claude/skills/`. `ls ~/.claude/skills/ | grep mos-` should list them. Re-run `setup.sh`, then restart Claude Code.
- **`setup.sh` warns that a link already exists and points elsewhere:** you installed an older layout by hand. Remove that link and re-run.

## Questions?

Ask in the Skool community.

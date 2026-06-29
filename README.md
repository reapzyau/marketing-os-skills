# TVML Skill Bundle

AI skills for The Vibe Marketing Lab community. Everyone starts with **`/mos-onboarding`**, which scaffolds your MarketingOS repo — the home base every other skill works inside. From there: an offer-building pipeline, social-content writers, research tooling, and a self-maintaining knowledge library.

Built by [The Vibe Marketing Lab](https://www.skool.com/the-vibe-marketing-lab). Powered by Claude Code.

---

## What You Get

**🚀 Start here — `/mos-onboarding`:**

| Skill | What It Does | Time |
|-------|-------------|------|
| `/mos-onboarding` | Scaffolds your MarketingOS repo — detects in-house vs agency, creates it from the right GitHub template, writes your `.mos/` config, and (for agencies) creates + registers client repos | ~2 min |

**Everyone runs this first.** It builds the home base — a correctly-structured repo — that every other skill works inside. Whether you're a marketer setting up for the first time or an agency adding a client, this is the front door.

**The Offer Engine — build your offer from scratch:**

| # | Skill | What It Does | Time |
|---|-------|-------------|------|
| 1 | `/mos-avatar` | Builds a 10-section customer avatar from your business files | ~3-5 min |
| 2 | `/mos-offer` | Builds a structured offer with value stack, pricing, guarantees, and packaging | ~5-8 min |
| 3 | `/mos-money-models` | Designs the full offer sequence — attraction, upsell, downsell, continuity — with 30-day payback math | ~5-8 min |

**Social content — turn a topic or long-form piece into platform-ready posts:**

| # | Skill | What It Does | Time |
|---|-------|-------------|------|
| 4 | `/mos-linkedin-post` | Generates LinkedIn posts from a topic, or repurposes long-form content into a batch of posts | ~2-3 min |
| 5 | `/mos-x-post` | Generates X/Twitter posts and threads from a topic, or repurposes long-form into tweets | ~2-3 min |

**Research tooling — turn external content into searchable knowledge:**

| # | Skill | What It Does | Time |
|---|-------|-------------|------|
| 6 | `/mos-yt-transcribe` | Downloads SRT transcripts from any YouTube video, playlist, or full channel into a local research library | ~10s/video |

**Knowledge library — a wiki that maintains itself (Karpathy's LLM Wiki pattern):**

| # | Skill | What It Does | Time |
|---|-------|-------------|------|
| 7 | `/mos-wiki-ingest` | Reads a source (file, folder, URL, or pasted text) and compiles it into interlinked wiki pages, updating indexes and the change log | ~30s/source |
| 8 | `/mos-wiki-query` | Answers a question from the wiki — reads the index, opens only the pages it needs, cites them, and files genuinely new answers back as pages | ~20s |
| 9 | `/mos-wiki-lint` | Health-checks the wiki — orphan pages, broken links, index mismatches, contradictions, stale data — and optionally auto-fixes | ~1 min |

> **Setting up the vault:** the one-time setup is handled by a **master prompt** (included alongside this bundle — grab it from the Skool post), not a skill. Paste it into Claude Code in an empty folder, answer two questions, and it scaffolds the whole `raw/` + `wiki/` structure plus the schema. After that, the two skills below run the ongoing loop.

**The offer chain:** Avatar → Offer → Money Model. Each offer skill reads the output of the previous one. `/mos-yt-transcribe` is independent — use it anytime you want to mine a YouTube channel for content ideas, competitor angles, or research material.

**The wiki loop:** Set up the vault once with the master prompt → Ingest sources as you collect them → Lint when it grows. Point it at anything you want to remember and reuse: books you read, research you do, your own projects, or your marketing (a voice-of-customer bank, a self-compiling competitor wiki, a content-idea vault). Same pattern, your call where to aim it.

Each skill uses parallel AI agents to generate sections simultaneously, then validates everything with a dedicated fact-checking agent before writing the final workbook.

---

## What You End Up With

Three workbooks in your `outputs/` folder:

```
outputs/
├── mos-avatar-workbook.md           # Who your dream customer is
├── mos-offer-workbook-[name].md     # Your structured offer
└── mos-money-model-[name].md        # Your complete offer sequence
```

Together, these give you:
- **Avatar** — a deep profile of your dream customer: demographics, pain points, goals, objections, buying psychology, and awareness stages
- **Offer** — a validated offer with value equation scoring, enhancement levers (scarcity, urgency, bonuses), guarantee design, benefit copy, and a micro-step funnel flow
- **Money Model** — the full offer sequence optimised for cashflow: attraction offer, upsells, downsells, continuity model, 30-day payback math, and LTV projections

These aren't templates. They're built from YOUR business files, validated against real market data, and ready to use.

---

## Prerequisites

Before running the skills, you need:

1. **Claude Code installed and working**
   - If you haven't set this up yet, start with the Claude Code Masterclass in the Skool classroom
   - You need a Claude Pro or Max subscription (the parallel agents need enough context)

2. **Business reference files populated**
   - Your project needs `reference/core/` with at least these files:

   | File | What goes in it |
   |------|----------------|
   | `soul.md` | Your story — why you started this business, what drives you |
   | `offer.md` | What you sell — pricing, delivery model, who it's for |
   | `audience.md` | Who you serve — demographics, where they hang out, what they struggle with |
   | `voice.md` | How your brand speaks — tone, phrases, personality |

   - **Optional but powerful:** `reference/proof/testimonials.md` — real customer quotes. The more real language you give it, the sharper the output.

---

## Installation

### Step 1: Accept the GitHub invite

Check your email for a collaborator invite from `reapzyau/marketingos-skills`. Click accept.

### Step 2: Clone the repo

Open your terminal and run:

```bash
git clone https://github.com/reapzyau/marketingos-skills.git ~/.claude/skills/mos
```

This installs the skills globally — they'll be available in every Claude Code project.

### Step 3: Verify

Open Claude Code in any project and type `/mos-avatar`. If it loads the skill, you're good.

---

## How to Use

### Start Here: Onboard Your Repo

```
/mos-onboarding
```

The first thing you run. It asks one question — **are you in-house (one brand you run) or an agency (serving clients)?** — then scaffolds the right MarketingOS repo:

- **In-house** → a single HQ repo for your brand.
- **Agency** → an HQ repo for your agency, plus a separate, registered repo for each client.

It writes your `.mos/config.yaml` (mode + identity), sets up the folder structure and rules, and gets the repo ready to open in Claude Code. Once it exists and your business files are in, run the skills below inside it.

---

### 1. Build Your Avatar

```
/mos-avatar
```

Claude reads your business files and builds a 10-section customer avatar:
1. Dream client name + photo
2. Demographics
3. Before state (their current pain — in their words)
4. Dream outcome
5. Top 5 pain points
6. Top 5 goals
7. Buyer decision questions
8. What they've tried before
9. Roadblocks and objections
10. Stage of awareness

It'll also generate an AI avatar image if you have a Google API key configured.

**Output:** `outputs/mos-avatar-workbook.md`

### 2. Build Your Offer

```
/mos-offer
```

Claude reads your avatar workbook and builds a complete offer:
- Dream outcome and problem universe (before/during/after)
- Solution matrix — every problem mapped to a solution
- Value stack with named components and perceived values
- Enhancement levers — scarcity, urgency, bonuses, guarantee
- Offer packaging — name, pitch, benefit bullets, funnel flow
- Pricing with value-to-price ratio and tier structure
- CUB Test (Confusing? Unbelievable? Boring?) — must pass all three
- Competitor analysis via web research

**Output:** `outputs/mos-offer-workbook-[name].md`

### 3. Build Your Money Model

```
/mos-money-models
```

Claude reads your offer workbook and designs the full sequence:
- Attraction offer — what brings them in the door
- Core offer — your main product
- Upsell design — how to increase transaction value
- Continuity model — recurring revenue
- Downsell safety net — what to offer when they try to cancel
- 30-day payback math — does one customer pay for acquiring the next?
- LTV projections at 1, 3, 6, and 12 months
- Cashflow acceleration tactics
- Customer journey map from first touch to 12-month retention

**Output:** `outputs/mos-money-model-[name].md`

### 4. Write LinkedIn Posts

```
/mos-linkedin-post
```

Give it a topic, or point it at a long-form piece (a transcript, a wiki page, a past post) and it writes LinkedIn posts in your voice — single posts from an idea, or a batch repurposed from one long source.

### 5. Write X Posts

```
/mos-x-post
```

Same idea for X/Twitter — single posts or full threads from a topic, or your long-form content repurposed into tweets.

### 6. Transcribe YouTube Research

```
/mos-yt-transcribe
```

Paste in any YouTube URL and the skill downloads clean SRT transcripts you can grep, feed to Claude, or upload to NotebookLM:

- **Single video URL** → no setup beyond `yt-dlp` (`pip install yt-dlp`)
- **Playlist URL** → no setup beyond `yt-dlp`
- **Full channel URL** → needs a free Apify account + `APIFY_TOKEN` (one-time, ~3 minutes — full walkthrough in the skill)

**Output:** `outputs/transcripts/[Channel Name]/YYYY-MM-DD-[slug].en.srt`

Then `grep -r "keyword" outputs/transcripts/[Channel Name]/` finds every mention of a topic across the channel in milliseconds. Ideal for competitor research, hook mining, or building a private knowledge base from any channel you study.

### 7. Build Your Knowledge Library

**First, set up the vault (one time).** Use the master prompt that ships with this bundle — grab it from the Skool post, paste it into Claude Code in an empty folder, and answer the two questions it asks. It scaffolds the whole structure:

- `knowledge/raw/` — your sources, frozen. You curate these; Claude never edits them.
- `knowledge/wiki/` — the compiled pages Claude writes and maintains, connected with `[[wikilinks]]`.
- A master index, per-domain indexes, and an append-only change log.
- The wiki schema injected into your `CLAUDE.md` so every future session knows the rules.

**Then feed it sources:**

```
/mos-wiki-ingest
```

Drop a source into `knowledge/raw/` (or paste text, or hand over a URL) and Claude compiles it into the wiki — creating and updating entity and concept pages, wiring up cross-references, and logging the ingest. One source can touch 5-15 pages. The cross-referencing is done once, here, not re-derived every time you ask a question.

**And keep it healthy as it grows:**

```
/mos-wiki-lint
```

Claude scans the whole wiki for orphan pages, broken links, index mismatches, contradictions, and stale data, then hands you a report and offers to auto-fix the safe stuff (index updates, missing links). It's a linter, but for your knowledge instead of your code.

**And to actually use what you've built:**

```
/mos-wiki-query
```

Ask a question and Claude answers it *from the wiki* the disciplined way: it reads the index to find the right pages, opens just those two or three (never re-reading all your raw sources), and cites them. When an answer is genuinely new — a comparison, a synthesis, a connection — it files it back as its own page so you never lose it to chat history. This is the Ingest → **Query** → Lint trilogy completed.

**Output:** a `knowledge/` folder you read in Obsidian — graph view shows every connection. No vector database, no code. Plain markdown you own.

---

## Using the Knowledge Library well

A few rules that separate a library that compounds from a folder that rots.

### raw vs wiki vs outputs — what goes where

The test is **not** who made it. It's what role the file plays:

- **`knowledge/raw/`** — INPUTS the AI reads but never edits. Source material, frozen. Collected from the world (articles, transcripts, competitor pages) *or* captured by you (call notes, voice memos) — as long as it's a source you want the AI to synthesise *from*. This is your source of truth.
- **`knowledge/wiki/`** — COMPILED KNOWLEDGE the AI writes and maintains. The synthesis of your raw sources, interlinked. You read it; the AI writes it.
- **`outputs/`** (optional, outside the vault) — FINISHED ARTEFACTS you generate *from* the wiki: a post, a deck, a headline, a report. Work product, not part of the knowledge graph.

Litmus test: **does the AI read *from* it (`raw/`) or did the AI *produce* it (`outputs/`)?** Your own draft can be either — a draft kept so the AI learns your voice is `raw/`; a draft that's the finished deliverable is an output.

### Would you ever ingest from `outputs/`? Almost never.

Outputs are downstream of the wiki, so re-ingesting them is circular — you'd be re-synthesising your own synthesis. The one exception is the file-back move built into `/mos-wiki-query`: if an artefact surfaced *genuinely new knowledge* (a research finding, a competitor fact), promote *that knowledge* into a wiki page. Don't dump the whole deliverable into `raw/`.

### Already have a big library? Don't bulk-ingest it.

- **Collected source docs** (PDFs, transcripts, clippings) → drop them into `raw/` as-is. That alone makes them available. Then ingest *only the slice you're about to use*, in small supervised batches — never the whole folder at once.
- **Your own written/linked notes** (an existing vault) → these are already the `wiki/` layer. Point them at `knowledge/wiki/` and run `/mos-wiki-lint` to index and link them. Don't ingest them as raw.
- The rule that keeps it clean: **if you wrote it, it's `wiki/`; if you collected it, it's `raw/`.** And: **compile what you'll query, not your whole library.**

### The daily loop

```
SET UP ONCE       → master prompt (scaffolds raw/ + wiki/ + the schema)
FEED CONTINUOUSLY → drop sources into raw/ (/mos-yt-transcribe, web clipper, file drops)
INGEST ON DEMAND  → /mos-wiki-ingest a domain when you're about to use it (small batches)
QUERY VIA INDEX   → /mos-wiki-query — and let it file good answers back
LINT PERIODICALLY → /mos-wiki-lint after a big batch, or monthly
```

### Scale note

The index pattern works to roughly 100 sources / a few hundred pages with no search infrastructure. Past that, the agent can't lean on the index alone — add a local search tool (e.g. an on-device BM25 + vector search like `qmd`, available as CLI or MCP) so it can find pages without reading the whole index. This is exactly why "compile what you'll query" matters — it keeps you under the ceiling longer.

---

## Updating

When new versions are released, pull the latest:

```bash
cd ~/.claude/skills/mos && git pull
```

Updates are announced in the Skool community.

---

## Tips

- **Better inputs = better outputs.** The skills are only as good as your reference files. Real testimonials in `testimonials.md` make a massive difference — the AI uses your customers' actual language instead of guessing.
- **Run them in order.** Avatar → Offer → Money Model. Each builds on the last. Skipping the avatar means the offer has no customer language to draw from.
- **You can re-run any skill.** Got new testimonials? Run `/mos-avatar` again. Changed your pricing? Run `/mos-offer` again. The old files get overwritten with the updated version.
- **Read the workbooks in Obsidian.** They're markdown files with cross-references. Obsidian renders them nicely with the graph view showing connections.

---

## Troubleshooting

**Skills don't show up in Claude Code**
- Make sure you cloned to `~/.claude/skills/mos` (check the path)
- Restart Claude Code after installing

**Avatar reads too generic**
- Add real customer testimonials to `reference/proof/testimonials.md`
- The more specific language you give it, the more specific the output

**Offer validation flags issues**
- That's working as intended — the validation agent stress-tests your offer against real market data
- Review the flags and decide what to adjust

**"Avatar workbook not found" when running offer skill**
- Make sure you ran `/mos-avatar` first
- Check that the file exists in your `outputs/` folder

**Image generation doesn't work**
- You need a `GOOGLE_API_KEY` set up — this is optional. The skill works fine without it, just skips the avatar photo.

---

## Questions?

Drop them in the Skool community — post in the Questions category and tag Richard.

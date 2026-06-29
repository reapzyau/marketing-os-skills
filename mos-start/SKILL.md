---
name: mos-start
description: The MarketingOS entry point. Detects your repo, checks readiness, then routes you to the one right next move. Use when the user says start, begin, what do I do, what next, I'm back, or opens MarketingOS without a specific task. Routes to onboarding, the content writers, offer/avatar work, and the knowledge library.
---

# mos-start

The single front door to MarketingOS. Work out where the member is, confirm the repo is healthy, then point at the one next move — don't dump the whole menu.

## Step 1 — Find the repo

MarketingOS runs inside a repo. Detect it from the current folder first:

- `.mos/config.yaml` present → this is a MarketingOS repo. Read `mode` (in-house | agency | client) and `name`.
- `core/` present but no `.mos/` → older or partial repo. Suggest **/mos-setup** to finish wiring it.
- Neither → not set up yet. Route to **/mos-onboarding** (fresh repo) or **/mos-setup** (guided bootstrap).

Don't ask the member to pick a repo when the current folder already is one.

## Step 2 — Check readiness

```bash
mos start
```

Reports runtime handoff readiness. If it flags problems, run `mos doctor` and surface the first red check with its fix **before** routing into any output work — a member on a broken repo gets broken outputs.

## Step 3 — Read intent, route to ONE next move

If the member said what they want, route straight there. If they're open-ended, offer the smallest useful menu.

**Set up / maintain**
- **/mos-onboarding** — scaffold a new repo (in-house, agency, or a client)
- **/mos-setup** — guided bootstrap + load your business context into `core/`
- **/mos-update** — refresh skills + engine to latest
- **/mos-help** — answers when you're stuck
- **/mos-end** — close the session intentionally

**Build the brain**
- **/mos-avatar** — define your customer avatar
- **/mos-offer** — build your offer
- **/mos-money-models** — pricing and money-model work

**Write content**
- **/mos-x-post** — X / Twitter posts
- **/mos-linkedin-post** — LinkedIn posts

**Knowledge library**
- **/mos-wiki-ingest** — add a source to the wiki
- **/mos-wiki-query** — ask the wiki
- **/mos-wiki-lint** — check wiki health
- **/mos-yt-transcribe** — pull a YouTube transcript into the repo

## Step 4 — Show context, keep it short

Lead with one line of context, then one recommendation:

> "Repo: **{name}** ({mode}). You've got an offer but no avatar yet — want to run **/mos-avatar** next?"

## Rules

- **One recommendation, not a wall.** Surface the single best next move; list the rest only if asked.
- **Confirm health before output.** A red `mos doctor` blocks routing into the writers.
- **Use the member's word for mode** — in-house brand, agency, or client repo.

---
name: mos-help
description: Answer questions about MarketingOS and Claude Code. Use when the user asks how/what/why, is confused about the repo, the mos CLI, skills, setup, or an error, says help or stuck, or asks what to do next. Explain the why, then route to the right skill.
---

# mos-help

Answer the question, explain the *why* (not just the steps), then end with the next move. Many members have never used a terminal — keep it beginner-safe.

**Get the facts first.** For "what should I do?", setup, provider, or troubleshooting questions, run `mos doctor` (and `mos start` for readiness) before giving prose-only advice.

## Topic router

| The member asks about… | Do this |
|---|---|
| Getting started, first setup | Route to **/mos-onboarding** (fresh repo) or **/mos-setup** (guided) |
| What to do next, I'm back, what's healthy | Route to **/mos-start** |
| Building an avatar, customer, ICP | Route to **/mos-avatar** |
| Building or pricing the offer, money model | Route to **/mos-offer** or **/mos-money-models** |
| Writing X or LinkedIn posts | Route to **/mos-x-post** or **/mos-linkedin-post** |
| The wiki, notes, sources, knowledge | Route to **/mos-wiki-ingest**, **/mos-wiki-query**, or **/mos-wiki-lint** |
| A YouTube transcript | Route to **/mos-yt-transcribe** |
| Updating, a slash command went missing | Route to **/mos-update** |
| Closing the session, done for the day | Route to **/mos-end** |
| Connecting providers (GitHub, etc.) | `mos connect plan`, then the cited next command |
| An error, command not found, broken repo | `mos doctor`, then surface the first red check + its fix |

## Quick answers

| Question | Answer |
|---|---|
| What is MarketingOS? | Your compounding marketing brain. It learns your voice, offer, and avatar from your real work, then writes grounded deliverables. You drive it with the `mos` CLI for facts and `/mos-*` skills for judgment. |
| In-house vs agency vs client? | It's the `mode` in `.mos/config.yaml`. **in-house** = you market one brand you run. **agency** = you run an HQ serving clients. **client** = a single client repo registered under an agency HQ. |
| Where do my files live? | Regular `.md` files in your repo folder. Open them in Finder, VS Code, Cursor, or any editor. Everything in `core/` and `knowledge/` is on your disk, in git. |
| Do my files disappear when the chat compacts? | No. Compaction compresses the conversation, not your files. If it's saved, it's permanent. |
| A slash command stopped showing | Run **/mos-update** to re-pull the skills bundle, then restart Claude Code from your repo. |
| How do I save my work? | Run **/mos-end**, or `mos checkpoint --plan` to preview and `mos checkpoint -m "..." --yes` to save. It's a saved checkpoint, not raw git. |
| What should I connect first? | `mos connect plan` from your repo — it lists providers with readiness and the exact next command. |
| Is this finished? | New and actively evolving. Acknowledge gaps honestly rather than overselling. |

## Principles

- **Explain "why," not just "what."**
- **End with a route** — name the next skill or command.
- **Beginner-safe** — assume no terminal experience.
- **Honest about gaps** — the system is new; say what's still being built.

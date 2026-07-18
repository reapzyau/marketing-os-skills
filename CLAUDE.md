# TVML Skills — Public Shared Repo

This repo is shared with The Vibe Marketing Lab community members. It is PUBLIC to collaborators.

---

## Security Rules (CRITICAL)

This repo is shared externally. Every commit is visible to community members.

- **NEVER commit API keys, tokens, secrets, passwords, or credentials** — not in code, not in comments, not in examples
- **NEVER commit hardcoded file paths** containing usernames or machine-specific paths (e.g. `/mnt/c/Users/richa/...`, `/home/reapzy/...`)
- **NEVER reference `.env` files, env vars with real values, or credential storage locations** — only reference env var NAMES as setup instructions (e.g. "set `GOOGLE_API_KEY` in your environment")
- **NEVER commit personal data** — emails, member lists, client info, business details
- **NEVER reference other private repos** (rdg-skills, pai, rumble-digital, richard-personal-mb, tvml-engine) by path or content

**Before every commit to this repo, verify:**
1. `grep -r "API_KEY\|TOKEN\|SECRET\|PASSWORD\|sk-\|AIza" --include="*.md"` returns only env var name references, never values
2. `grep -r "/mnt/c/Users\|/home/reapzy" --include="*.md"` returns zero results
3. No `.env`, `.env.*`, or credential files are staged

**If in doubt, ask Richard before committing.**

---

## What This Repo Contains

Claude Code skills for The Vibe Marketing Lab community, across four pillars:

**Offer engine:**
1. `mos-avatar` — Customer avatar workbook
2. `mos-offer` — Offer creation workbook
3. `mos-money-models` — Money model workbook

**Social content:**
4. `mos-linkedin-post` — LinkedIn posts from a topic or repurposed long-form
5. `mos-x-post` — X/Twitter posts and threads from a topic or repurposed long-form

**Research tooling:**
6. `mos-yt-transcribe` — YouTube transcript downloader

**Knowledge library (Karpathy LLM Wiki pattern — Ingest / Query / Lint):**
7. `mos-wiki-ingest` — Compile sources into interlinked wiki pages
8. `mos-wiki-query` — Answer from the wiki (read index → pages → cite → file new knowledge back)
9. `mos-wiki-lint` — Health-check the wiki for drift

## Scope Rule (which skills belong here)

This repo holds **engine-agnostic** skills only — skills that work in any Claude Code project
without the `mos` CLI. The MarketingOS lifecycle skills (onboard/setup, start, status, think,
bet, end, update, help) ship natively inside the MarketingOS engine and install via
`mos install`, so they can never drift from the CLI they wrap. If a skill here starts
depending on `mos` commands, it either moves into the engine bundle or must degrade
gracefully when the CLI is absent.

> Wiki setup is handled by a standalone master prompt (shipped alongside the bundle), not a skill. The three wiki skills run the ongoing ingest → query → maintain loop once the vault exists.

Each skill has a `SKILL.md` (the skill prompt) and, where needed, a `references/` folder (frameworks) or `scripts/` folder.

## Editing Rules

- Skills must work on any machine — use relative paths and env var references only
- All API keys must be referenced as "set this in your environment" — never hardcode values
- Keep the README.md install instructions up to date when adding skills
- Test skills work without any of Richard's personal infrastructure before pushing

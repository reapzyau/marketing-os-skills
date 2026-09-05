# marketing-os-skills — Public Shared Repo

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

The **default pack** that accompanies the MarketingOS engine, plus the index of the other packs.

**Knowledge library (Karpathy LLM Wiki pattern — Ingest / Query / Lint):**
1. `mos-wiki-ingest` — Compile sources into interlinked wiki pages
2. `mos-wiki-query` — Answer from the wiki (read index → pages → cite → file new knowledge back)
3. `mos-wiki-lint` — Health-check the wiki for drift

> Wiki setup is handled by a standalone master prompt (shipped alongside the bundle), not a skill.

**Everything else lives in a category pack, each its own public repo with the same layout and `setup.sh`:**
- `mos-hormozi-skills` — avatar, offer, money-models, and the `$100M` chain
- `mos-copywriting-skills` — copy-research, copywriting, proofread
- `mos-smma-skills` — linkedin-post, x-post
- `mos-yt-skills` — yt-fast-scrape, yt-transcribe
- `mos-geo-skills` — GEO skills

Split on 2026-09-05 with per-skill git history preserved. A new skill goes into the pack that matches its job; a new category gets a new `mos-<category>-skills` repo cloned from this layout, and a row in this README's pack table.

## Scope Rule (which skills belong here)

Only the engine-agnostic **default** skills every MarketingOS user gets (today: the wiki loop). The MarketingOS lifecycle skills (onboard/setup, start, status, think, bet, end, update, help) ship natively inside the engine and install via `mos install`. Anything domain-specific belongs in a category pack.

Each skill has a `SKILL.md` (the skill prompt) and, where needed, a `references/` folder (frameworks) or `scripts/` folder. `setup.sh` links every top-level skill folder into `~/.claude/skills/`.

## Editing Rules

- Skills must work on any machine — use relative paths and env var references only
- All API keys must be referenced as "set this in your environment" — never hardcode values
- Keep the README.md pack table up to date when a pack is added or renamed; each pack's own README covers its skills
- Test skills work without any of Richard's personal infrastructure before pushing

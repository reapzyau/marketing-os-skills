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

Claude Code skills for The Vibe Marketing Lab community, across three pillars:

**Offer engine:**
1. `tvml-avatar` — Customer avatar workbook
2. `tvml-offer` — Offer creation workbook
3. `tvml-money-models` — Money model workbook

**Research tooling:**
4. `tvml-yt-transcribe` — YouTube transcript downloader

**Knowledge library (Karpathy LLM Wiki pattern — Ingest / Query / Lint):**
5. `tvml-wiki-ingest` — Compile sources into interlinked wiki pages
6. `tvml-wiki-query` — Answer from the wiki (read index → pages → cite → file new knowledge back)
7. `tvml-wiki-lint` — Health-check the wiki for drift

> Wiki setup is handled by a standalone master prompt (shipped alongside the bundle), not a skill. The three wiki skills run the ongoing ingest → query → maintain loop once the vault exists.

Each skill has a `SKILL.md` (the skill prompt) and, where needed, a `references/` folder (frameworks) or `scripts/` folder.

## Editing Rules

- Skills must work on any machine — use relative paths and env var references only
- All API keys must be referenced as "set this in your environment" — never hardcode values
- Keep the README.md install instructions up to date when adding skills
- Test skills work without any of Richard's personal infrastructure before pushing

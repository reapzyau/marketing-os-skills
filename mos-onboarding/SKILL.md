---
name: mos-onboarding
description: Scaffold a new MarketingOS repo — in-house HQ, agency HQ, or an agency client. Detects mode, creates the repo from the right GitHub template, writes the .mos/ config, prompts for optional folders, and (for agencies) creates and registers a client repo. Use when a marketer is setting up their AI Brain for the first time, or an agency is adding a client.
---

# mos-onboarding

Turns "set up MarketingOS" into a working, correctly-moded repo. This skill is the **runtime** for `onboarding-flow.md` (the canonical spec). No Python — it does everything with `gh` + file writes.

## When to use

- A marketer setting up their first MarketingOS repo (in-house or agency).
- An agency adding a new client (run from inside the agency HQ).

## Prerequisites

- `gh` authenticated — check `gh auth status`.
- Access to the templates under `reapzyau/`: `business-hq`, `agency-hq`, `client-template`.

## Workflow

### 1. Detect mode — `AskUserQuestion`

> "Are you marketing for one brand you run in-house, or do you run an agency serving clients?"

- **in-house** → template `business-hq`, instance `{business}-hq`
- **agency** → template `agency-hq`, instance `{agency}-hq`

Never infer. Never default. The answer sets the mode flag everything downstream reads.

### 2. Name

Ask for the slug. Instance name per convention:
- in-house: `{business}-hq`
- agency: `{agency}-hq`

### 3. Scaffold the repo

```bash
gh repo create {instance} --template reapzyau/{business-hq|agency-hq} --private --clone
```

The template already carries the folder tree, `.claude/rules/`, and `.claude/skills/` — so the new repo comes out correct. Nothing to copy here.

### 4. Write the mode flag

Write `.mos/config.yaml` (**tracked** — identity, not a secret):

```yaml
mode: in-house        # in-house | agency
name: {slug}
repo: {instance}
created: {YYYY-MM-DD}
clients: []           # agency only
```

Fail-closed: always write `mode` explicitly. A missing/unknown mode must halt, never default.

### 5. Optional folders — `AskUserQuestion`

- **Paid media?** → keep/remove `campaigns/` (default: on for agency, off for in-house)
- **Staff?** → keep/remove `team/` (default: off)
- **First content channel?** → seed one under `content/` (default: none)

Ask before writing. Removing a folder is non-destructive to the schema.

### 6. Knowledge segment

Ask the brand's segment (e.g. `b2b-saas`, `ecommerce`). Write `segment:` into config and seed `applies-to:` on the first `knowledge/` notes so global knowledge is tagged from day one.

### 7. Commit + push

```bash
git add -A && git commit -m "mos: onboard {instance}" && git push
```

---

## Agency — adding a client (Branch C)

Run from inside the agency HQ.

1. Ask the client slug → instance `{agency}-{client}` (NO `-hq`, e.g. `tvml-cchq`).
2. Scaffold:
   ```bash
   gh repo create {agency}-{client} --template reapzyau/client-template --private --clone
   ```
3. Write the client `.mos/config.yaml`: `mode: client`, `name: {client}`, `agency: {agency}`, `segment:`.
4. **Register the pointer** in the agency HQ — append a row to `business/clients/clients.md`:
   `name → repo URL → status (active|paused|offboarded) → access (who's granted)` — and push the slug into HQ config `clients:`.
5. Commit + push **both** repos (the new client repo and the HQ registry change).

---

## Rules

- **Fail-closed on mode** — never default; always write `mode` explicitly.
- **Secrets never in `config.yaml`** — provider credentials go in `.mos/connect.yaml` (gitignored).
- **Interactive prompts use `AskUserQuestion`** (clickable), and onboarding asks before it writes.
- **Skills + rules ride with the template** — don't hand-copy them at onboard; if a newer set exists, run `sync-skills.sh` / `sync-rules.sh` from the canonical repos.

---
name: mos-setup
description: Guided MarketingOS bootstrap — scaffold the repo, then load your real business context into it so the brain is useful from day one. Use when the user says set up, get started, initialize, bootstrap, new business, or wants to migrate an existing messy folder into MarketingOS. The hands-on cousin of /mos-onboarding.
---

# mos-setup

Get the member from nothing to a working, *populated* MarketingOS repo. `/mos-onboarding` scaffolds the empty repo from a template; **mos-setup goes further** — it scaffolds *and* gathers the business context that makes the brain useful (offer, avatar, voice, proof).

Use `mos` commands for the mechanics; spend your effort on gathering good context.

## Step 0 — Is the CLI installed?

```bash
mos --version
```

Missing? The member needs the MarketingOS CLI first — point them at the current install instructions in the community, then:

```bash
mos install-skills --yes
```

## Step 1 — Scaffold (or detect) the repo

If there's no repo yet, scaffold one. Detect the mode with `AskUserQuestion` — never default:

> "Are you marketing one brand you run in-house, running an agency serving clients, or setting up a single client?"

```bash
# Scaffold + push to GitHub + (client) register, in one pass:
mos onboard --name "{name}" --mode {in-house|agency|client} --github

# Or local-only scaffold:
mos init --name "{name}" --mode {in-house|agency|client}
```

`mos onboard` is the one-command path (detect → scaffold → push → register). `mos init` is the local-only scaffold. For agency clients, pass `--agency {slug}` and `--hq {agency-hq-path}` so the client registers in the HQ.

If a repo already exists, skip to Step 2. If the folder is a messy pre-MarketingOS pile, migrate it:

```bash
mos migrate
```

## Step 2 — Gather bounded context

The repo is only as good as what's in `core/`. Collect enough to fill the core files — not every fact. Ask in plain language and let the member paste, drop files, or give URLs:

> "Share the essentials: what you sell, who it's for, why it works, any proof you can show, and a few samples of how you write. Drag in screenshots — your Skool about page, sales page, anything — and I'll sort them into the right files."

Aim to fill: **offer** (price, mechanism, deliverables), **avatar** (who, pains, desires, objections), **voice** (tone, phrases), **proof** (2–5 specific results).

## Step 3 — Write the core files

Sort what they gave you into `core/`. Teach the *why* of each file as you write it — this is the member's first encounter with the system, and writing these files IS the learning. Filter hard: the repo is a precision instrument, not a dumping ground.

For deep avatar and offer work, hand off to the dedicated skills: **/mos-avatar** and **/mos-offer**.

## Step 4 — Check health

```bash
mos doctor
```

Surface any red check with its fix. Don't claim "you're set up" over a failing doctor.

## Step 5 — Save the first checkpoint

```bash
mos checkpoint --plan
mos checkpoint -m "[added] initial business context" --yes
```

Preview, get approval, save. Beginner-safe language — "saved a checkpoint."

## Step 6 — Hand off

> "You're set up. Daily flow: open this folder, start Claude, run **/mos-start**. Try **/mos-avatar** and **/mos-offer** next to deepen the brain, and **/mos-help** anytime you're stuck."

## Rules

- **Never default the mode** — always ask, always write it.
- **Secrets never in the repo config** — provider credentials go through `mos connect` (gitignored), not `.mos/config.yaml`.
- **Approval before writes and saves.**
- **mos-setup vs /mos-onboarding:** onboarding = scaffold an empty repo fast; setup = scaffold *and* load real context. If the member only wants the empty repo, send them to /mos-onboarding.

---
name: mos-update
description: Refresh your MarketingOS skills and engine to the latest version. Use when the user says update, upgrade, refresh skills, get the latest MarketingOS, pull latest, asks if they're current, or a slash command stopped appearing. Re-pulls the skills bundle, verifies repo health, and upgrades the mos engine when needed.
---

# mos-update

Get the member onto the latest MarketingOS — skills first, engine only if needed. The `mos` CLI owns the mechanics; this skill drives it and explains the result in plain language.

## When to use

- A new MarketingOS release dropped and the member wants it.
- A slash command (`/mos-...`) stopped showing up in Claude Code.
- The member asks "am I on the latest?" or "refresh my skills."

## Step 1 — Refresh the skills bundle

The skills pack is the thing members install. Re-pull it:

```bash
mos install-skills --yes
```

This re-clones the `marketing-os-skills` bundle into `~/.claude/skills/` and overwrites each `mos-*` skill with the latest version. This is the answer to most "update" requests.

## Step 2 — Verify the repo

From inside the member's MarketingOS repo:

```bash
mos doctor
```

`mos doctor` exits non-zero on red checks. If it flags anything, surface the first red check and its fix — don't report "you're up to date" over a failing doctor.

## Step 3 — Upgrade the engine (only if needed)

The skills bundle and the `mos` engine version separately. If the member is on an old engine, or `mos doctor` says the CLI is behind, upgrade the package:

```bash
pipx upgrade marketing-os
```

Then re-run `mos doctor`. Don't lead with this — most update requests just need the Step 1 skills refresh.

## Step 4 — Restart if slash commands changed

Claude Code loads slash commands at session start. If a `/mos-*` command still doesn't appear after the refresh:

> "New skills are installed. Restart Claude Code from your repo so it picks up the latest `/mos-*` commands, then run `/mos-start`."

## Rules

- **Skills refresh ≠ engine upgrade.** `mos install-skills` updates the skill pack; `pipx upgrade marketing-os` updates the CLI. Reach for the engine upgrade only when the engine itself is stale.
- **Never report success over a failing `mos doctor`.** Show the red check.
- **Don't guess what changed.** If the member asks what's new and you can't see a changelog, say so and point them at the repo.

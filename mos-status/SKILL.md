---
name: mos-status
description: A read-only briefing on your MarketingOS repo — what's healthy, what's open, what changed, and the one thing to do next. Use when the user asks "where am I", "what's going on", "what changed", or wants a daily briefing without being routed into a task.
---

# mos-status

Give the member a clear, read-only snapshot of their repo. This is the briefing — it reports, it doesn't route into work (that's `/mos-start`'s job) and it never writes anything.

Work from inside the MarketingOS repo. If you're not in one, say so and point to `/mos-onboarding` or `/mos-setup`.

## What to gather

**1. Health**

```bash
mos doctor
```

Surface red checks first, with the fix. Green = one line ("repo's healthy").

**2. Readiness**

```bash
mos start
```

Note anything blocking a clean handoff (missing config, unconnected providers).

**3. Open bets**

Read `bets/` for `status: open` files. List each with its deadline and target; flag any past their deadline.

**4. Recent activity**

```bash
git log --oneline -10
```

Translate into plain language — what's been worked on lately (offer, avatar, content, wiki).

## How to report

Lead with the single most important thing, then a short scan:

> "Repo's healthy. Two open bets — the **gym-leads** bet is 3 days past deadline and needs a verdict. Last few sessions were offer + LinkedIn content. **Next:** close out that bet with `/mos-bet close`."

Keep it to one health line, the open bets, a one-to-two line activity summary, and one recommended next move.

## Rules

- **Read-only.** Status never writes or checkpoints. If something needs saving, point at `/mos-end`.
- **Red checks lead.** Never bury a failing `mos doctor`.
- **One next move.** End with the single most useful action, not a menu.

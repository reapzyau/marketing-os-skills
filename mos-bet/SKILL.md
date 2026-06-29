---
name: mos-bet
description: Open, update, close, list, and narrate business bets — time-boxed wagers tracked as files in bets/. Use when the user wants to frame a bet, log progress, record a verdict, list active bets, or draft public-safe narration of a result. A bet is a hypothesis with a deadline, not an offer.
---

# mos-bet

Manage business bets — time-boxed operating wagers. A bet is a hypothesis with appetite, a metric, a target, and a deadline. Not an offer (a durable thing you sell); not a push (coordinated execution). A winning bet can graduate into an offer or a content pillar; a losing one gets closed with the learning captured.

Bets live as files at `bets/YYYY-MM-DD-slug.md`. Work from inside the MarketingOS repo (`core/`, `bets/` present). If you're not in one, run `/mos-start` first.

## Five modes

Say `/mos-bet` with one of: **new**, **update**, **close**, **list**, **narrate**.

### new — open a bet

Ask only for the missing essentials: hypothesis, appetite (e.g. "2 weeks"), the metric, the target, the deadline, and any kill / double-down signals. Then create `bets/YYYY-MM-DD-slug.md`:

```yaml
---
status: open            # open | paused | closed | canceled
opened: YYYY-MM-DD
deadline: YYYY-MM-DD
appetite: "2 weeks"
hypothesis: "If we do X for Y, then Z, because…"
metric: "qualified calls booked"
target: "10 by the deadline"
result: ""
public: false
tags: []
---
```

Body: **Why this bet** → **Hypothesis** → **Work plan** (checklist) → **Evidence log** (dated) → **Result** (Open) → **Narration notes** (what's safe to share later).

If the idea also sounds like an offer, ask whether it's just a wager for now or a durable offer candidate too — don't create or rename `core/offers/` without the member's say-so.

### update — log progress

Append a dated **Evidence log** entry. Update links to new research or decisions if they now matter. Leave `result` blank until there's a real one.

### close — record the verdict

Set `status: closed` (or `canceled`), fill `result` with the measured outcome, add a **Learning** section. If it changes durable offer truth, suggest a follow-up rather than editing `core/offer.md` directly. Keep the closed bet as history — never delete it.

### list — what's live

Summarize active bets: deadline, target, metric, and which one needs attention next. Flag any past their deadline. Keep it short.

### narrate — public-safe copy

Draft site / community / social copy from the bet's repo truth. Never invent results, metrics, or testimonials. If the bet is `public: false`, ask before drafting public copy — offer a private retro instead.

## Save

After writing or editing bet files, offer to checkpoint:

```bash
mos checkpoint --plan
mos checkpoint -m "[added] bet: {slug}" --yes
```

Preview, get approval, save.

## Rules

- **A bet is time-boxed.** Always has a deadline and a metric — without them, it's not a bet.
- **Never invent results.** Narration and close use measured truth only.
- **Closed bets are history.** Mark status and learning; don't delete.
- **Approval before saving.**

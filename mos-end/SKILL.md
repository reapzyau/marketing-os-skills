---
name: mos-end
description: Close your MarketingOS session intentionally. Use when the user says done, wrapping up, end my day, closing out, call it a day, checkpoint, or pause. The bookend to /mos-start — scans what happened, optionally crystallizes the thinking, and saves an approved checkpoint. Never auto-invoked.
---

# mos-end

Close the session like the end of a good conversation — not a report card. You only run this when the member chooses to. The bookend to `/mos-start`.

## The flow

1. Find the repo
2. Scan what happened
3. Brief, warm summary
4. Optional: final thought
5. Optional: crystallize (when real thinking happened)
6. Checkpoint & close

## Step 1 — Find the repo

Use the current folder if it's a MarketingOS repo (`.mos/config.yaml` or `core/`). Don't make the member pick — this is a quick close, not triage. No repo → simple goodbye.

## Step 2 — Scan what happened

```bash
mos checkpoint --plan
```

Previews what's changed and unsaved. Read it for what the member actually touched today — offer files, avatar, content, wiki, decisions.

## Step 3 — Session summary

A reflection, not a report. 3–6 bullets max, then one sentence tying it together:

> "Here's today:
> - Reworked your offer (`core/offer.md`)
> - Drafted three LinkedIn posts
> - Added two sources to the wiki
>
> Solid foundation day — the offer is much sharper now."

## Step 4 — Final thought (optional)

Ask once: "Any final thoughts before we close?" If brief, fold it into the checkpoint message. If substantial, offer to save it as a note. If they skip, move on — no friction.

## Step 5 — Crystallize (optional, when it earns it)

If real thinking happened today — a decision, meaningful research, a reworked core file — take a beat to connect the dots: what tension is still unresolved, what does today's work imply that hasn't been named yet. Ask one good question that makes the member stop and think.

If they engage, stay with it — the end of a session is the highest-value moment for an insight. If something lands that should update a core file, offer to capture it. Never push; one question planted is enough.

Skip crystallize entirely on a quiet day, or when the member asked for a quick close.

## Step 6 — Checkpoint & close

If there's unsaved work, offer to save it:

```bash
mos checkpoint --plan                       # preview
mos checkpoint -m "[updated] ..." --yes     # save after approval
```

Use past-tense, business-readable messages: `[added]`, `[updated]`, `[decided]`. Beginner-safe language — "saved a checkpoint," not "ran git commit." Save only after the member approves. If anything looks unsafe to commit, explain and leave it unchanged.

Then close warm and brief:

> "Good session. Your offer is locked in and the posts are ready when you are. See you next time."

## What mos-end is NOT

- Not a standup — no plans for tomorrow (that's /mos-start's job)
- Not a task manager
- Not an audit — the summary is observational, not evaluative
- No emojis, no performance

## Rules

- **Never auto-invoke.** Only on the member's say-so.
- **Approval before any save.** Plan → confirm → save.
- **Quiet day = quick goodbye.** Don't force a ritual.

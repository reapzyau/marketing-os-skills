---
name: mos-100m-leads
description: "Build a $100M Leads marketing plan faithfully following Alex Hormozi's $100M Leads methodology — linear, chapter-by-chapter, interactive. Ten stops, takes your existing Grand Slam Offer as input, builds your lead magnet + ONE chosen advertising channel into a complete leads plan + one-pager. ALWAYS use this skill when the user mentions: $100M Leads, Hormozi leads, lead magnet, engaged leads, the Core Four, warm outreach / cold outreach / paid ads / posting content as a plan, lead getters, the four horsemen (referrals/employees/agencies/affiliates), 'get leads', a marketing plan, an advertising plan, or asks to build a lead-gen plan the 'Hormozi way' or 'by the book.' Runs AFTER /mos-100m-offer and BEFORE /mos-100m-money-models then /mos-100m-onepager in the $100M chain (offer → leads → money-models → onepager)."
---

# /mos-100m-leads — Hormozi $100M Leads

A linear, interactive walkthrough of Alex Hormozi's *$100M Leads* book. Ten chapter stops, one decision per stop, building toward a complete leads/marketing plan saved beside the offer it feeds.

**Where this sits in the chain — the $100M chain (4 skills):**

`/mos-100m-offer` (what you sell) → **`/mos-100m-leads` (how strangers find it)** → `/mos-100m-money-models` (how you sequence the money) → `/mos-100m-onepager` (distil it all into a GTM one-pager).

You can't build a leads plan without an offer. The pre-flight loads your Grand Slam Offer workbook as the input — exactly the way `/mos-100m-offer` loads the avatar. This is the deliberate tie between the two skills: the leads plan advertises a lead magnet that turns strangers into engaged leads, who then buy the offer you already built.

**Source:** this skill applies the framework from Alex Hormozi's *$100M Leads*. It is an independent implementation, not affiliated with or endorsed by the author. Read the book for the full argument and the worked examples — this skill is the build process, not a substitute for the source.

**The chapter framework knowledge lives in `references/01-*.md` through `10-*.md`** — the orchestrator loads them on-demand, one per chapter, not all at once.

**The centerpiece is the Lead Magnet (Chapter 2).** Hormozi's core leads thesis: don't advertise your core offer to strangers — advertise a *lead magnet* (a complete solution to a narrow problem, free or cheap) that turns strangers into **engaged leads**. The lead magnet is to this skill what the 5-step offer build is to `/mos-100m-offer`. Hold the bar there.

---

## Pre-flight (auto — before Chapter 1)

### Step 1 — Locate the OFFER workbook (REQUIRED)

This skill builds the leads engine for an existing Grand Slam Offer. Find it, in order:
1. `outputs/mos-100m-offer-workbook-*.md` — the chain route written by `/mos-100m-offer`
2. `outputs/*offer-workbook*.md` or `outputs/*100m-offer*.md` — older or hand-named variants
3. Any sibling project folder: `**/mos-100m-offer-workbook-*.md`

If more than one offer workbook is found, ask the user which offer this leads plan is for. Note its `{{slug}}` — every file in the chain shares it.

If the offer workbook is NOT found → tell the user:
> "I can't find a Grand Slam Offer workbook. $100M Leads is about getting strangers to engage with an offer — so the offer comes first. Run `/mos-100m-offer` first, then come back."

Then stop. Do NOT invent an offer inline.

From the offer workbook, pull forward and keep on hand: **offer name, the dream-outcome promise, the price, the avatar, the guarantee.** Everything in the leads plan must stay consistent with these.

### Step 2 — Locate the avatar + brand context (best-effort)

Read whichever exist (skip silently if missing):
- The avatar workbook (`outputs/*avatar*`, or `reference/core/audience.md`) — who we're advertising to
- `reference/core/voice.md` — the voice ALL lead-magnet, ad and content copy must match
- `reference/core/soul.md` — why the business exists
- `reference/proof/testimonials.md`, `reference/proof/angles/*.md` — proof to use in content + ads

These are all optional conventions. Skip anything that is not there and carry on — only the offer workbook is required.

### Step 3 — Announce what was loaded + ask scope

Short message: offer loaded (name + price), avatar path, brand files found, and where the leads plan will be saved (`outputs/mos-100m-leads-plan-{{slug}}.md`, reusing the offer's slug). Then ONE `AskUserQuestion`:

**Q:** "Are we building a new leads plan from scratch, or refining one chapter of an existing plan?"
**Options:**
- **New leads plan from scratch** — full 10-chapter walk
- **Refine one chapter** — pick the chapter (e.g. "just rework the lead magnet")

---

## The linear walkthrough — 10 chapter stops

For each chapter:

1. **Read** the chapter's reference file from `references/0N-*.md`.
2. **Teach** the concept in 1–3 sentences (Hormozi's *why*) — in your own words, not a recital of the reference.
3. **Ask** the chapter's diagnostic question(s) via `AskUserQuestion` when the choice is discrete; open conversation when it's a brainstorm. **ALWAYS ask — this skill is interactive. The user makes the calls, not you. Never auto-complete the chapters**.
4. **Validate** the answer against the chapter's criteria. Push back on weak answers — Hormozi-faithful means holding the bar.
5. **Append** the chapter's filled section to the running plan (use `templates/leads-plan-template.md` as the scaffold).
6. **Confirm** before moving to the next chapter.

The 10 chapters, in strict order — DO NOT REORDER:

| # | Reference file | Stop type | Key output |
|---|---|---|---|
| 1 | `references/01-engaged-leads.md` | Reframe + metric | "Engaged lead" defined for this business + weekly target |
| 2 | `references/02-lead-magnet.md` | The heart — 7 sub-steps | A complete lead magnet (the centerpiece) |
| 3 | `references/03-core-four.md` | Discrete choice | ONE primary advertising channel chosen |
| 4 | `references/04-warm-outreach.md` | Plan (if chosen) | Warm outreach plan + scripts + activity math |
| 5 | `references/05-post-content.md` | Plan (if chosen) | Content plan (hook/retain/reward → monetise) |
| 6 | `references/06-cold-outreach.md` | Plan (if chosen) | Cold outreach plan + list + activity math |
| 7 | `references/07-paid-ads.md` | Plan (if chosen) | Paid ad plan + CAC / LTGP:CAC math |
| 8 | `references/08-more-better-new.md` | Scale | How to scale the chosen channel (More / Better / New) |
| 9 | `references/09-lead-getters.md` | Choice + sequence | Which of the Four Horsemen to add + when |
| 10 | `references/10-open-to-goal.md` | Commitment ritual | Daily activity targets + sequenced roadmap |

### Special handling per chapter

- **Ch 2 (Lead Magnet) — the heart.** This is SEVEN sub-conversations (Hormozi's 7 steps), not one. Pause between sub-steps; don't fire all seven at once. This is the most important chapter — a mediocre lead magnet sinks the whole plan. Tie it back to the offer: the lead magnet solves a *narrow* problem; the core offer solves the *broad* one, and solving the narrow one makes the broad one more obvious.
- **Ch 3 (Core Four) — discrete commitment.** Use `AskUserQuestion`. The user picks ONE primary channel (warm outreach / post content / cold outreach / paid ads). Hormozi's rule: **master one before adding another.** The choice determines which of Chapters 4–7 gets the DEEP build.
- **Ch 4–7 (the four channels) — only deep-dive the chosen one.** Read and fully build the channel chosen in Ch 3. For the other three, write a one-line "future channel — add at [trigger]" note in the plan and move on. Do NOT build all four — that's the spread-thin trap Hormozi explicitly warns against. If the user insists on a second channel, build that one too, but never all four at once.
- **Ch 9 (Lead Getters).** Pick which Horseman (customer referrals / employees / agencies / affiliates) to add FIRST and the trigger to add it. Referrals usually come first (highest quality, lowest cost); employees/agencies/affiliates scale later.
- **Ch 10 (Open To Goal) — the commitment ritual.** Daily advertising activity targets, the sequenced roadmap ("first this channel, then add X at trigger Y"), and a plain "what I do every single day until the goal is hit" statement.

---

## Assembling the plan (incremental, not at the end)

Don't wait until Chapter 10 to write the file. After each chapter:

1. Open or create the plan at `outputs/mos-100m-leads-plan-{{slug}}.md`, reusing the slug from the offer workbook.
2. Use `templates/leads-plan-template.md` as the scaffold — fill in that chapter's section.
3. Update the ONE-PAGER SUMMARY at the top as the plan takes shape.

So if the user interrupts, no work is lost and the plan is always readable in progress.

---

## Final assembly (after Chapter 10)

1. Run the QUALITY CHECKLIST at the bottom of the template. Tick every box or flag what's missing.
2. Fill the ONE-PAGER SUMMARY: lead magnet name + type, primary channel, weekly engaged-lead target, the CTA, the daily activity number, the first lead-getter to add.
3. Confirm the file path.
4. Tell the user:

```
✓ $100M Leads plan complete:
  outputs/mos-100m-leads-plan-{{slug}}.md

ONE-PAGER:
  Offer it feeds: {{OFFER_NAME}}
  Lead magnet:    {{LEAD_MAGNET_NAME}} ({{TYPE}})
  Primary channel: {{CHANNEL}}
  Engaged-lead target: {{N}}/week
  Daily activity: {{ACTIVITY}}
  First lead-getter to add: {{HORSEMAN}} at {{TRIGGER}}

Next: run /mos-100m-money-models to sequence upsells, downsells, and continuity around this offer + leads engine.
```

The output plan is compatible with `/mos-100m-money-models` — it lives beside the offer workbook, so the chain reads cleanly.

---

## Critical writing principles

- **Stay faithful to Hormozi's order.** No reordering, no skipping. If the user wants to skip a chapter, ask why and document the gap in the plan.
- **Interactive always.** Ask each chapter's decision via `AskUserQuestion` or open conversation. NEVER auto-complete the chapters — even under Auto Mode (this is a recorded user preference: decision-heavy guided skills get walked one decision at a time).
- **The lead magnet is the lever.** Hormozi's "Step 0: if you're struggling to get leads, make an amazing lead magnet." Hold the quality bar on Ch 2 above everything else.
- **One channel, mastered.** Resist building all four Core Four channels. Depth beats breadth until one channel reliably prints engaged leads.
- **Engaged leads, not vanity metrics.** The metric is people who SHOW interest (opt-ins, replies, DMs, bookings) — not impressions or followers.
- **Match the brand voice.** Every piece of copy (lead magnet name, CTAs, ad hooks, content angles) must match `voice.md`. Use the voice defined in the business's own voice file.
- **Don't restate the references verbatim.** Read, internalize, then summarize in your own words with the relevant question. The user should see "here's the question," not "here's what the reference says."

---

## Pitfalls (skill-level)

- **Don't build a leads plan without an offer.** Pre-flight requires the offer workbook. If it's missing, send the user to `/mos-100m-offer`.
- **Don't skip the lead magnet.** It's the centerpiece, not an optional step.
- **Don't spread across all Core Four.** Pick one, master it, then add the next.
- **Don't confuse a lead with an engaged lead.** Define the engaged-lead metric in Ch 1 and hold it throughout.
- **Don't finalize the lead magnet's name/packaging early.** Naming, headline, and packaging are the *later* steps of Ch 2 — earn them.
- **Don't generate the whole plan at the end.** Build it incrementally so work survives interruption.

---

## What success looks like

A complete `outputs/mos-100m-leads-plan-{{slug}}.md` with:
- An "engaged lead" definition + weekly target (Ch 1)
- A complete lead magnet: type, the narrow problem it solves, delivery method, name, packaging, CTA + scarcity/urgency (Ch 2)
- ONE primary channel chosen and deep-built with real activity math (Ch 3 + the chosen one of Ch 4–7)
- A scale plan — More / Better / New — for that channel (Ch 8)
- The first lead-getter (Horseman) to add + its trigger (Ch 9)
- Daily advertising activity targets + a sequenced roadmap (Ch 10)
- A one-pager summary at the top, usable as the marketing brief
- A clean hand-off path to `/mos-100m-money-models` → then the `/mos-100m-onepager` capstone

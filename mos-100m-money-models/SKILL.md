---
name: mos-100m-money-models
description: "Build a $100M Money Model faithfully following Alex Hormozi's $100M Money Models methodology — linear, chapter-by-chapter, interactive. Six stops, takes your existing Grand Slam Offer + leads plan as input, sequences attraction/upsell/downsell/continuity offers into a money model that pays back acquisition cost inside 30 days (client-financed acquisition). ALWAYS use this skill when the user mentions: $100M Money Models, Hormozi money model, offer sequencing, attraction/upsell/downsell/continuity offers, client-financed acquisition (CFA), 30-day payback/cash, win your money back, anchor/rollover upsell, payment-plan downsell, continuity/waived-fee offers, a product/value ladder with cashflow, or asks to build a money model the 'Hormozi way' or 'by the book.' This is the THIRD skill in the $100M chain — runs AFTER /mos-100m-offer and /mos-100m-leads, and is followed by the /mos-100m-onepager capstone (offer → leads → money-models → onepager). Prefer this over the older /mos-money-models when the user wants the canonical linear book walkthrough."
---

# /mos-100m-money-models — Hormozi $100M Money Models

A linear, interactive walkthrough of Alex Hormozi's *$100M Money Models* book. Six chapter stops, one decision per stop, building toward a complete money model — a deliberate sequence of offers — saved beside the offer and leads plan it completes.

**Where this sits in the chain — the $100M chain (4 skills):**

`/mos-100m-offer` (what you sell) → `/mos-100m-leads` (how strangers find it) → **`/mos-100m-money-models` (how you sequence the money)** → `/mos-100m-onepager` (distil it all into a GTM one-pager).

`/mos-100m-offer` builds the core offer. `/mos-100m-leads` builds the engine that turns strangers into engaged leads. **This skill wraps a sequence of offers around that core offer so you make more from one customer — fast — than it costs to get and serve them.** The pre-flight loads the offer workbook (required) and the leads plan (the attraction offers connect to the lead magnet).

**Source:** this skill applies the framework from Alex Hormozi's *$100M Money Models*. It is an independent implementation, not affiliated with or endorsed by the author. Read the book for the full argument and the worked examples — this skill is the build process, not a substitute for the source.

**The chapter framework knowledge lives in `references/01-*.md` through `06-*.md`** — load them on-demand, one per chapter, not all at once.

**The centerpiece is Client-Financed Acquisition (Ch 1 + Ch 6).** Hormozi's whole thesis: a Money Model is "a sequence of offers" engineered so the profit from one customer covers the cost to get + serve *at least two more* within **30 days** — which "eliminates cash as a bottleneck for growth." Every chapter serves that one number: 30-day cash.

**This skill is NOT the older `/mos-money-models`.** That one runs an agent-framework workbook (Revenue Mechanics, Constraint Engineering, etc.). This is the linear, Hormozi-faithful book walkthrough. Use this when the user wants the canonical book sequence.

---

## Pre-flight (auto — before Chapter 1)

### Step 1 — Locate the OFFER workbook (REQUIRED)

A money model sequences offers around a *core offer*. Find it, in order:
1. `outputs/mos-100m-offer-workbook-*.md` — the chain route written by `/mos-100m-offer`
2. `outputs/*offer-workbook*.md` or `outputs/*100m-offer*.md` — older or hand-named variants
3. Any sibling project folder: `**/mos-100m-offer-workbook-*.md`

If more than one offer workbook is found, ask the user which offer this money model is for. Note its `{{slug}}` — every file in the chain shares it.

If the offer workbook is NOT found → tell the user:
> "I can't find a Grand Slam Offer workbook. A money model sequences offers around a core offer — so the offer comes first. Run `/mos-100m-offer` (and ideally `/mos-100m-leads`) first, then come back."

Then stop. Do NOT invent an offer inline. Pull forward: **offer name, the dream-outcome promise, the price, the avatar, the guarantee, the deliverables.**

### Step 2 — Locate the LEADS plan + brand context (best-effort)

Read whichever exist (skip silently if missing):
- The leads plan (`outputs/mos-100m-leads-plan-{{slug}}.md`) — the lead magnet + channel the **attraction offers** plug into
- The avatar workbook (`outputs/*avatar*`) — who's buying
- `reference/core/voice.md` — the voice all offer copy must match
- `reference/proof/testimonials.md` — proof for offer positioning

These are all optional. Skip anything that is not there and carry on — only the offer workbook is required.

### Step 3 — Announce what was loaded + ask scope

Short message: offer loaded (name + price + 30-day economics if known), leads plan, avatar, brand files, and where the money model will be saved (`outputs/mos-100m-money-model-{{slug}}.md`, reusing the offer's slug). Then ONE `AskUserQuestion`:

**Q:** "Are we building a new money model from scratch, or refining one part of an existing one?"
**Options:**
- **New money model from scratch** — full 6-chapter walk
- **Refine one part** — pick the chapter (e.g. "just design the upsell" or "add continuity")

---

## The linear walkthrough — 6 chapter stops

For each chapter:

1. **Read** the chapter's reference file from `references/0N-*.md`.
2. **Teach** the concept in 1–3 sentences (Hormozi's *why*) — in your own words.
3. **Ask** the chapter's diagnostic question(s) via `AskUserQuestion` when the choice is discrete (which play to use), open conversation when it's a brainstorm or numbers. **ALWAYS ask — this skill is interactive. The user makes the calls, not you. Never auto-complete the chapters**.
4. **Validate** against the chapter's criteria. Push back on weak answers — Hormozi-faithful means holding the bar (especially the 30-day cash math).
5. **Append** the chapter's filled section to the running money model (use `templates/money-model-template.md`).
6. **Confirm** before moving to the next chapter.

The 6 chapters, in strict order — DO NOT REORDER (the order IS the money model: attraction → upsell → downsell → continuity → assemble):

| # | Reference file | Stop type | Key output |
|---|---|---|---|
| 1 | `references/01-money-model-foundation.md` | Reframe + the cash math | 30-day CFA target + current CAC/payback diagnosis |
| 2 | `references/02-attraction-offers.md` | Pick a play | ONE attraction offer chosen (turn strangers into customers) |
| 3 | `references/03-upsell-offers.md` | Pick a play | ONE (or more) upsell offer (spend more cash) |
| 4 | `references/04-downsell-offers.md` | Pick a play | ONE downsell offer (turn nos into yeses) |
| 5 | `references/05-continuity-offers.md` | Pick a play | ONE continuity offer (keep them buying) — sequenced LAST |
| 6 | `references/06-make-your-money-model.md` | Assemble + math | The sequenced model + 30-day cash math + build order |

### Special handling per chapter

- **Ch 1 (Foundation) — the cash frame.** Diagnose the real numbers: cash on hand, runway, CAC, and 30-day gross profit per customer. The whole model exists to make 30-day profit ≥ cost to get + serve the customer. Don't move on until the user knows their payback gap.
- **Ch 2–5 (the four offer types) — pick a PLAY, don't deploy all.** Each chapter is a menu of named plays (e.g. Attraction = Win Your Money Back / Giveaway / Decoy / Buy-X-Get-Y / Pay-Less-Now / Free Goodwill). Use `AskUserQuestion` to pick the ONE that fits this business now. Hormozi's rule: **build one stage at a time** — a full money model deployed at once "will break your business." Capture the chosen play + its mechanics; note 1-2 backups for later.
- **Ch 5 (Continuity) — sequence it LAST.** Continuity on its own crashes 30-day cash. It comes after attraction/upsell/downsell are working. Flag this explicitly.
- **Ch 6 (Make Your Money Model) — assemble + do the math.** Sequence the chosen plays (Stage I Get Cash → Stage II Get More Cash → Stage III Get The Most Cash). Run the 30-day cash math: does profit from one customer cover CAC + COGS for ≥2 more inside 30 days? Define the **build order** — which ONE play to implement first, and the trigger to add the next. "Simple Scales, Fancy Fails."

---

## Assembling the model (incremental, not at the end)

After each chapter:
1. Open or create the model at `outputs/mos-100m-money-model-{{slug}}.md`, reusing the slug from the offer workbook.
2. Use `templates/money-model-template.md` as the scaffold — fill that chapter's section.
3. Update the ONE-PAGER SUMMARY (the offer sequence + 30-day math) as it takes shape.

So if the user interrupts, no work is lost.

---

## Final assembly (after Chapter 6)

1. Run the QUALITY CHECKLIST at the bottom of the template. Tick or flag.
2. Fill the ONE-PAGER SUMMARY: the sequenced offers (attraction → upsell → downsell → continuity), the 30-day cash math, and the build order (what to implement first).
3. Confirm the file path.
4. Tell the user:

```
✓ $100M Money Model complete:
  outputs/mos-100m-money-model-{{slug}}.md

ONE-PAGER:
  Core offer:    {{OFFER_NAME}}
  Attraction:    {{ATTRACTION_PLAY}}
  Upsell:        {{UPSELL_PLAY}}
  Downsell:      {{DOWNSELL_PLAY}}
  Continuity:    {{CONTINUITY_PLAY}}
  30-day cash:   {{PAYBACK_MATH}} (target: profit from 1 customer ≥ CAC+COGS for ≥2 more)
  Build first:   {{FIRST_STAGE}} → add next at {{TRIGGER}}

That completes the Hormozi trilogy: offer (what you sell) → leads (how they find it) → money model (how you sequence the money).

Capstone — run /mos-100m-onepager to distil all three into a single go-to-market one-pager (markdown + client-facing .docx + branded HTML). This is the 4th and final skill in the chain.
```

---

## Critical writing principles

- **Stay faithful to Hormozi's order.** The order of chapters IS the money model (attraction → upsell → downsell → continuity). No reordering.
- **Interactive always.** Ask each chapter's decision. NEVER auto-complete — even under Auto Mode (recorded preference: decision-heavy guided skills get walked one decision at a time).
- **30-day cash is the scoreboard.** Every play is judged by whether it speeds up payback. Hold the math bar in Ch 1 and Ch 6.
- **One stage at a time.** Resist designing a full model to deploy at once — "it will break your business." Pick a starting play per type, but implement in stages.
- **Different thing for less, never the same thing for less.** Downsells trade; they don't discount the same offer (that destroys trust). Enforce this in Ch 4.
- **Continuity comes last.** Don't let the user lead with continuity — it starves cash.
- **Match the brand voice.** All offer copy matches `voice.md`. Use the voice defined in the business's own voice file.
- **Don't restate the references verbatim.** Read, internalize, summarize in your own words with the question.

---

## Pitfalls (skill-level)

- **Don't build a money model without an offer.** Pre-flight requires the offer workbook.
- **Don't deploy the whole model at once.** Build one stage at a time; sequence the rest.
- **Don't lead with continuity.** It crashes 30-day cash; it's the last stage.
- **Don't discount the same offer.** Downsells change what/how, never just the price of the same thing.
- **Don't skip the cash math.** A money model without 30-day payback math is just a price list.
- **Don't confuse this with the old `/mos-money-models`.** Different paradigm; this is the linear book walkthrough.

---

## What success looks like

A complete `outputs/mos-100m-money-model-{{slug}}.md` with:
- The 30-day client-financed-acquisition target + current CAC/payback diagnosis (Ch 1)
- ONE chosen play for each of attraction / upsell / downsell / continuity, with mechanics (Ch 2–5)
- A sequenced money model across the three stages, with the 30-day cash math worked out (Ch 6)
- A build order: which ONE play to implement first + the trigger to add the next
- A one-pager summary at the top
- The trilogy complete: offer → leads → money model, all sharing the same `{{slug}}` in `outputs/` — then the `/mos-100m-onepager` capstone distils them into one page

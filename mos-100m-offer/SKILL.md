---
name: mos-100m-offer
description: "Build a Grand Slam Offer faithfully following Alex Hormozi's $100M Offers methodology — linear, chapter-by-chapter, interactive. Twelve stops (one per chapter), uses existing avatar work as input, produces a complete offer workbook + one-pager. ALWAYS use this skill when the user mentions: $100M Offers, Hormozi offer, Grand Slam Offer, value equation, MAGIC naming, premium pricing, starving crowd, scarcity + urgency stack, guarantee with teeth, the offer book, or asks to build an offer the 'Hormozi way' or 'by the book.' Prefer this over /mos-offer when the user wants the canonical linear walkthrough rather than the parallel-agent custom synthesis."
---

# /mos-100m-offer — Hormozi $100M Offers (v2)

A linear, interactive walkthrough of Alex Hormozi's *$100M Offers* book. Twelve chapter stops, one decision per stop, building toward a complete Grand Slam Offer workbook saved to `outputs/`.

**Source:** this skill applies the framework from Alex Hormozi's *$100M Offers*. It is an independent implementation, not affiliated with or endorsed by the author. Read the book for the full argument and the worked examples — this skill is the build process, not a substitute for the source.

The chapter framework knowledge is encoded in `references/01-*.md` through `12-*.md` — the orchestrator loads them on-demand, not all at once.

**This skill is NOT `/mos-offer` v1.** V1 runs parallel multi-agent custom synthesis. V2 follows Hormozi's strict linear order: market → differentiate → premium price → value equation → divergent thinking → 5-step build → scarcity → urgency → bonuses → guarantee → name → execute. Use v2 when the user wants the canonical book sequence.

---

## Pre-flight (auto — before chapter 1)

### Step 1 — Locate the avatar workbook (REQUIRED)

Search in order:
1. `outputs/` in the current project — look for `*mos-avatar-workbook*` first, then `*avatar*` or `*customer-avatar*` as fallback
2. `reference/core/audience.md` — optional business-context convention, skip if not found
3. Any sibling project folder — `**/mos-avatar-workbook*`, then `**/customer-avatar*` or `**/audience.md`

If avatar not found → tell the user:
> "I can't find an avatar workbook. Hormozi's Chapter 2 is the market/avatar step — this skill loads your existing avatar rather than rebuilding it. Run `/mos-avatar` first, then come back."

Then stop. Do NOT attempt to construct an avatar inline.

### Step 2 — Load brand and offer context (best-effort)

Read whichever of these exist (skip silently if missing):
- `reference/core/soul.md` — why the business exists
- `reference/core/voice.md` — brand voice
- `reference/core/audience.md` — audience (cross-check with avatar)
- `reference/proof/testimonials.md`, `reference/proof/angles/*.md` — proof to feed Ch 4 (likelihood) and Ch 10 (guarantee)
- `reference/domain/product-ladder.md` — where this offer sits in the ladder

All of these are optional. Every one of them is a convention some projects use and others do not — skip anything that is not there and carry on. The avatar workbook from Step 1 is the only required input.

### Step 3 — Announce what was loaded + ask scope

In a short message, tell the user:
- Avatar path loaded
- Any existing offer detected, or "no active offer detected"
- Brand files found
- Proof files found

Then ask ONE question via `AskUserQuestion`:

**Q:** "Are we building a new Grand Slam Offer from scratch, or stress-testing an existing one against Hormozi's framework?"
**Options:**
- **New offer from scratch** — full 12-chapter walk
- **Stress-test an existing offer** — same 12 chapters but pre-fill from existing offer.md where possible
- **Refine just one chapter** — pick the chapter to focus on (e.g., "just rework the guarantee")

Based on the answer, adjust the cadence (full walk vs spot-fix).

---

## The linear walkthrough — 12 chapter stops

For each chapter:

1. **Read** the chapter's reference file from `references/0N-*.md`.
2. **Teach** the concept in 1–3 sentences (Hormozi's *why*).
3. **Ask** the chapter's diagnostic question(s) via `AskUserQuestion` (when the choice is discrete) or open conversation (when brainstorm).
4. **Validate** the user's answer against the chapter's validation criteria. Push back if the answer fails. Don't accept weak answers — Hormozi-faithful means quality bar held.
5. **Append** the chapter's filled section to the running workbook (use `templates/workbook-template.md` as the scaffold).
6. **Confirm** ready to proceed before moving to the next chapter.

The 12 chapters, in strict order — DO NOT REORDER:

| # | Reference file | Stop type | Key output |
|---|---|---|---|
| 1 | `references/01-differentiate.md` | Diagnostic | Commoditisation diagnosis |
| 2 | `references/02-market-validation.md` | Validation (no rebuild) | 4-tenet check + starving-crowd statement |
| 3 | `references/03-premium-pricing.md` | Commitment (discrete) | Premium price anchored ≥2× competitor |
| 4 | `references/04-value-equation.md` | Scoring | 0–4 score + weakest driver plan |
| 5 | `references/05-divergent-thinking.md` | Warmup brainstorm | Brick inventory ≥15 |
| 6 | `references/06-offer-build.md` | The heart — 5 sub-steps | Core offer (pre-enhancement) |
| 7 | `references/07-scarcity.md` | Discrete choice | One scarcity type + real cap |
| 8 | `references/08-urgency.md` | Discrete choice | One urgency type + real deadline |
| 9 | `references/09-bonuses.md` | Brainstorm + filter | 5+ bonuses stated value ≥ core |
| 10 | `references/10-guarantees.md` | Discrete + build | Conditional-statement guarantee with teeth |
| 11 | `references/11-magic-naming.md` | Brainstorm + pick | Primary name + 3+ backups |
| 12 | `references/12-execution.md` | Commitment ritual | Launch surface, $100k target, funnel math, constraint |

Each chapter file specifies its diagnostic questions, validation criteria, workbook section template, and pitfalls. **Always read the chapter file before running its conversation** — don't operate from memory.

### Special handling per chapter

- **Ch 2:** Load existing avatar. Run 4-tenet scoring. If a tenet scores ≤2, surface it as a blocker but let the user decide whether to proceed or pause.
- **Ch 3:** Commit a real price. Don't let "I'll figure it out later" pass. The price is the constraint that forces Ch 4–10's creativity.
- **Ch 6:** This chapter is FIVE sub-conversations, not one. Pause between sub-steps. Don't fire all five at once.
- **Ch 10:** Validate the guarantee uses conditional "If X then Z" structure with a stated consequence. "Satisfaction guaranteed" fails the check.
- **Ch 11:** Only run this chapter once Ch 1–10 are locked. Naming is the LAST move.

---

## Assembling the workbook (incremental, not at the end)

Don't wait until Chapter 12 to write the file. After each chapter:

1. Open or create `outputs/mos-100m-offer-workbook-{{slug}}.md` (slug = short offer name in kebab case)
2. Use `templates/workbook-template.md` as the scaffold — fill in the placeholders for that chapter
3. Update the ONE-PAGER SUMMARY at the top as the offer takes shape

This way:
- If the user interrupts, work isn't lost
- The user can read the workbook in progress
- The final file is always assembled, not just generated at the end

---

## Final assembly (after Chapter 12)

1. Run through the QUALITY CHECKLIST at the bottom of the workbook template. Tick every box or flag what's missing.
2. Fill in the ONE-PAGER SUMMARY at the top with the final values (name, promise, price, guarantee, scarcity, urgency, bonus count + total value).
3. Confirm the file lands at `outputs/mos-100m-offer-workbook-{{slug}}.md`.
4. Tell the user:

```
✓ Grand Slam Offer workbook complete:
  outputs/{{filename}}

ONE-PAGER:
  Name: {{OFFER_NAME}}
  Price: {{PRICE}}
  Promise: {{DREAM_OUTCOME}} in {{TIME_INTERVAL}}
  Guarantee: {{GUARANTEE_NAME}}
  Scarcity: {{SCARCITY_TYPE}} — {{SCARCITY_NUMBER}}
  Urgency: {{URGENCY_TYPE}} — {{URGENCY_DEADLINE}}
  Bonus stack: {{N}} bonuses (stated value ${{TOTAL}})

Next: run /mos-100m-leads to build the marketing plan — the lead magnet + advertising channel that gets strangers to this offer. After that, /mos-100m-money-models sequences the money.
```

**The $100M chain (4 skills):** `/mos-100m-offer` (this) → `/mos-100m-leads` (lead magnet + advertising) → `/mos-100m-money-models` (upsells, downsells, continuity) → `/mos-100m-onepager` (distil all three into a GTM one-pager). `/mos-100m-leads` reads this offer workbook as its input, so it must land at the shared chain route: `outputs/mos-100m-offer-workbook-{{slug}}.md`. Keep the same `{{slug}}` across all four skills — that is how each step finds the previous one's output.

---

## Critical writing principles

- **Stay faithful to Hormozi's order.** No reordering, no skipping. If the user wants to skip a chapter, ask why and document the gap in the workbook.
- **Push back on weak answers.** Validation criteria exist for a reason. A guarantee with no teeth isn't a guarantee. A 4/4 value-equation score is grading on a curve. Hold the line.
- **Quality > speed.** This skill produces a real offer the business will run on. Sloppy answers compound.
- **Don't restate the chapter references in conversation.** Read the file, internalize, then summarize for the user in your own words with the relevant question. The user shouldn't see "Here's what the reference says…" — they should see "Here's the question."
- **Reference the cheat sheet** (`references/source-cheat-sheet.html`) if the user wants to see the source material visually — but don't open it inline; just point at the path.

---

## Pitfalls (skill-level)

- **Don't be v1.** V1 runs parallel agents that produce a custom synthesis. V2 is linear and Hormozi-faithful. If the user wants the custom synthesis, redirect to `/mos-offer`.
- **Don't rebuild the avatar.** Ch 2 is validation only. If the avatar is missing, send the user to `/mos-avatar`.
- **Don't name early.** Naming is Ch 11 — last. If the user offers a name early, capture it as a candidate but don't lock it.
- **Don't skip Ch 5.** The brick exercise feels silly but is the warmup for Ch 6's divergent brainstorm. Without it, Ch 6 is flat.
- **Don't generate the final workbook only at the end.** Build it incrementally so work isn't lost on interruption.

---

## What success looks like

A complete `outputs/mos-100m-offer-workbook-[slug].md` workbook with:
- All 12 chapter sections filled in
- A One-Pager Summary at the top usable as a sales asset
- A Value Equation score (0–4 total) with weakest driver named
- A guarantee with conditional "If X then Z" teeth and a memorable name
- 5+ M-A-G-I-C names ready to rotate
- An execution plan with funnel math and named constraint
- A clean hand-off path along the chain: `/mos-100m-leads` → `/mos-100m-money-models` → `/mos-100m-onepager`

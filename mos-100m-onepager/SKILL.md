---
name: mos-100m-onepager
description: "Distil the three $100M trilogy files (offer / leads / money model) into a single go-to-market one-pager — what we sell + how we grow + how we monetise, on one page. Produces THREE outputs: a clean markdown one-pager, a client-facing .docx, and a polished branded HTML (via /frontend-design). ALWAYS use this skill when the user says: one-pager, GTM one-pager, distil the trilogy, summarise the offer/leads/money model, strategy one-pager, client-facing summary, the business on one page, or wants the offer + marketing plan + money model condensed into a single scannable page. This is the CAPSTONE — runs AFTER /mos-100m-offer, /mos-100m-leads, and /mos-100m-money-models."
---

# /mos-100m-onepager — The GTM One-Pager (trilogy capstone)

Distils the three $100M trilogy artifacts into ONE scannable go-to-market one-pager:

**what we sell (the offer)** · **how we grow (leads / marketing)** · **how we monetise (money model)**

Clean enough that anyone — you, a partner, or a client — can understand the whole business at a glance.

**Where this sits — the capstone after the trilogy:**

`/mos-100m-offer` → `/mos-100m-leads` → `/mos-100m-money-models` → **`/mos-100m-onepager`** (distil all three)

**Outputs (all three, every run):**
1. `outputs/mos-100m-gtm-onepager-{{slug}}.md` — clean markdown, the source of truth, saved beside the trilogy files.
2. `outputs/mos-100m-gtm-onepager-{{slug}}.docx` — a client-facing Word document (generated via the `docx` skill).
3. `outputs/mos-100m-gtm-onepager-{{slug}}.html` — a polished, branded single-page HTML (generated via the `/frontend-design` skill from the markdown).

The whole point is **ruthless distillation** — these three source files are hefty; this is the 60-second version. If a line doesn't earn its place, cut it.

---

## Pre-flight — locate + read the three trilogy files

Search `outputs/` and read, in order:
1. `outputs/mos-100m-offer-workbook-{{slug}}.md` — **REQUIRED** (the offer)
2. `outputs/mos-100m-leads-plan-{{slug}}.md` — the growth plan
3. `outputs/mos-100m-money-model-{{slug}}.md` — the monetisation

All three share the same `{{slug}}`. Resolve the slug from the offer workbook first, then look for its siblings. If more than one offer workbook exists, ask the user which one to distil.

If the offer workbook is NOT found → tell the user:
> "I can't find an offer workbook to distil. Build the trilogy first: `/mos-100m-offer` → `/mos-100m-leads` → `/mos-100m-money-models`, then come back."
Then stop.

If the leads plan or money model are missing → proceed, but **flag the gap** in the one-pager ("Growth plan not yet built — run `/mos-100m-leads`") rather than inventing content.

**Pull from the existing ONE-PAGER SUMMARY blocks at the top of each file** — every trilogy file already has one. Don't re-derive the strategy; distil what's locked.

Also load `reference/core/voice.md` if it exists — the one-pager must match the brand voice. Skip if not found.

---

## The distillation — what goes on the page

Keep it to ONE page. Lead with the business in a single line, then three blocks in trilogy order, then the north star + first action.

**Top line:** the business in one sentence — "For [avatar], [offer name] [delivers dream outcome] via [channel], monetised through [model shape]."

1. **THE OFFER — what we sell** (from `offer-workbook.md`)
   - Name · promise (dream outcome) · avatar (one line) · price · guarantee · core deliverables

2. **THE GROWTH PLAN — how we get customers** (from `leads-plan.md`)
   - Lead magnet · primary channel · engaged-lead metric + target · daily activity · first lead-getter to add

3. **THE MONEY MODEL — how we monetise** (from `money-model.md`)
   - The offer sequence (Attraction → Upsell → Downsell → Continuity) · the 30-day cash / per-client economics · what to build first

**North star:** the single metric/goal (e.g. "$100K by [date]" or "revenue per client within the [N]-seat cap").
**Build first:** the one immediate action.

**Format rules:** scannable bullets + one summary table. No full paragraphs. Match brand voice (as defined in the business's voice file). If it spills past a page, cut — this is a distillation, not a re-summary.

---

## Workflow

1. **Pre-flight:** locate + read the three files + voice.
2. **(Light) confirm scope:** if multiple services exist, confirm which one. (Audience default: client-facing-clean — the money model stays in plain terms, no internal jargon.)
3. **Write `outputs/mos-100m-gtm-onepager-{{slug}}.md`**, using `templates/onepager-template.md`.
4. **Generate `outputs/mos-100m-gtm-onepager-{{slug}}.docx`** via the `docx` skill — clean and professional: a title, the one-line summary, a summary table, and the three blocks as tight sections. Same `outputs/` folder, same slug.
5. **Generate `outputs/mos-100m-gtm-onepager-{{slug}}.html`** via the `/frontend-design` skill — a polished, branded, self-contained single-page HTML built from the markdown (inline CSS, no external deps so it opens anywhere). Same `outputs/` folder, same slug. Match brand voice + a clean, professional aesthetic; keep it to one page's worth of content.
6. **Tell the user** all three paths (`.md`, `.docx`, `.html`).

---

## Critical principles

- **ONE page.** If it doesn't fit on a page, cut. This is the 60-second view.
- **Distil, don't re-derive.** Pull from the trilogy files' existing one-pager summaries + locked decisions. Never invent strategy here.
- **Three blocks, in order:** Offer → Growth → Money. Mirrors the trilogy.
- **Match the brand voice.** Use the voice defined in the business's own voice file.
- **Flag gaps, don't fill them.** If a trilogy piece is missing, say so and point to the skill that builds it.
- **Plain enough for a client.** No internal shorthand — someone outside the business should follow it.

---

## What success looks like

A single-page `outputs/mos-100m-gtm-onepager-{{slug}}.md` + `outputs/mos-100m-gtm-onepager-{{slug}}.docx` + `outputs/mos-100m-gtm-onepager-{{slug}}.html` in `outputs/`, covering offer + growth + money model, scannable in 60 seconds, matching brand voice, with the HTML produced via `/frontend-design`. The whole go-to-market, on one page, in three formats.

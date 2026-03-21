# TVML Skill Bundle — The Offer Engine

Three Claude Code skills that build your complete offer from scratch. Run them in order — each one feeds into the next.

---

## The Skills

| # | Skill | What It Does | Output |
|---|-------|-------------|--------|
| 1 | `/tvml-avatar` | Builds a 10-section customer avatar workbook from your business files | `outputs/tvml-avatar-workbook.md` |
| 2 | `/tvml-offer` | Builds a high-value offer workbook from your avatar | `outputs/tvml-offer-workbook-[name].md` |
| 3 | `/tvml-money-models` | Builds the offer sequence (attraction → upsell → downsell → continuity) with 30-day payback math | `outputs/tvml-money-model-[name].md` |

**The chain:** Avatar → Offer → Money Model

Each skill uses parallel AI agents to generate sections simultaneously, then validates everything before writing the final workbook.

---

## Prerequisites

1. **Claude Code installed and working** — if you haven't done this yet, start with the Claude Code Masterclass in the classroom
2. **Business reference files set up** — run `/start` in your project to create your `reference/core/` files (soul.md, offer.md, audience.md, voice.md)
3. **A Claude Pro or Max subscription** — the parallel agents need enough context to work properly

---

## Installation

Copy the three skill folders into your Claude Code skills directory:

**Option A — Project-level (recommended):**
```
your-project/.claude/skills/
├── tvml-avatar/
├── tvml-offer/
└── tvml-money-models/
```

**Option B — Global (available in all projects):**
```
~/.claude/skills/
├── tvml-avatar/
├── tvml-offer/
└── tvml-money-models/
```

---

## How to Use

### Step 1: Build Your Avatar
```
/tvml-avatar
```
Reads your business files and produces a complete customer avatar workbook. Takes 3-5 minutes.

### Step 2: Build Your Offer
```
/tvml-offer
```
Reads your avatar workbook and builds a structured offer with value stack, pricing, guarantees, and packaging. Takes 5-8 minutes.

### Step 3: Build Your Money Model
```
/tvml-money-models
```
Takes your offer and designs the full sequence — attraction offer, upsells, downsells, continuity — with 30-day payback math. Takes 5-8 minutes.

---

## What You End Up With

Three workbooks that together give you:
- A deep understanding of your dream customer (avatar)
- A structured, validated offer with pricing and guarantees (offer)
- A complete offer sequence optimized for cashflow and lifetime value (money model)

These aren't templates — they're built from YOUR business files, validated against real market data, and ready to use.

---

## Questions?

Drop them in the community — post in the Questions category and tag Richard.

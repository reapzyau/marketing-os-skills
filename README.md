# TVML Skill Bundle — The Offer Engine

Three AI skills that build your complete offer from scratch. Run them in order — each one feeds into the next.

Built by [The Vibe Marketing Lab](https://www.skool.com/the-vibe-marketing-lab). Powered by Claude Code.

---

## What You Get

| # | Skill | What It Does | Time |
|---|-------|-------------|------|
| 1 | `/tvml-avatar` | Builds a 10-section customer avatar from your business files | ~3-5 min |
| 2 | `/tvml-offer` | Builds a structured offer with value stack, pricing, guarantees, and packaging | ~5-8 min |
| 3 | `/tvml-money-models` | Designs the full offer sequence — attraction, upsell, downsell, continuity — with 30-day payback math | ~5-8 min |

**The chain:** Avatar → Offer → Money Model. Each skill reads the output of the previous one.

Each skill uses parallel AI agents to generate sections simultaneously, then validates everything with a dedicated fact-checking agent before writing the final workbook.

---

## What You End Up With

Three workbooks in your `outputs/` folder:

```
outputs/
├── tvml-avatar-workbook.md           # Who your dream customer is
├── tvml-offer-workbook-[name].md     # Your structured offer
└── tvml-money-model-[name].md        # Your complete offer sequence
```

Together, these give you:
- **Avatar** — a deep profile of your dream customer: demographics, pain points, goals, objections, buying psychology, and awareness stages
- **Offer** — a validated offer with value equation scoring, enhancement levers (scarcity, urgency, bonuses), guarantee design, benefit copy, and a micro-step funnel flow
- **Money Model** — the full offer sequence optimised for cashflow: attraction offer, upsells, downsells, continuity model, 30-day payback math, and LTV projections

These aren't templates. They're built from YOUR business files, validated against real market data, and ready to use.

---

## Prerequisites

Before running the skills, you need:

1. **Claude Code installed and working**
   - If you haven't set this up yet, start with the Claude Code Masterclass in the Skool classroom
   - You need a Claude Pro or Max subscription (the parallel agents need enough context)

2. **Business reference files populated**
   - Your project needs `reference/core/` with at least these files:

   | File | What goes in it |
   |------|----------------|
   | `soul.md` | Your story — why you started this business, what drives you |
   | `offer.md` | What you sell — pricing, delivery model, who it's for |
   | `audience.md` | Who you serve — demographics, where they hang out, what they struggle with |
   | `voice.md` | How your brand speaks — tone, phrases, personality |

   - **Optional but powerful:** `reference/proof/testimonials.md` — real customer quotes. The more real language you give it, the sharper the output.

---

## Installation

### Step 1: Accept the GitHub invite

Check your email for a collaborator invite from `reapzyau/tvml-skills`. Click accept.

### Step 2: Clone the repo

Open your terminal and run:

```bash
git clone https://github.com/reapzyau/tvml-skills.git ~/.claude/skills/tvml
```

This installs the skills globally — they'll be available in every Claude Code project.

### Step 3: Verify

Open Claude Code in any project and type `/tvml-avatar`. If it loads the skill, you're good.

---

## How to Use

### 1. Build Your Avatar

```
/tvml-avatar
```

Claude reads your business files and builds a 10-section customer avatar:
1. Dream client name + photo
2. Demographics
3. Before state (their current pain — in their words)
4. Dream outcome
5. Top 5 pain points
6. Top 5 goals
7. Buyer decision questions
8. What they've tried before
9. Roadblocks and objections
10. Stage of awareness

It'll also generate an AI avatar image if you have a Google API key configured.

**Output:** `outputs/tvml-avatar-workbook.md`

### 2. Build Your Offer

```
/tvml-offer
```

Claude reads your avatar workbook and builds a complete offer:
- Dream outcome and problem universe (before/during/after)
- Solution matrix — every problem mapped to a solution
- Value stack with named components and perceived values
- Enhancement levers — scarcity, urgency, bonuses, guarantee
- Offer packaging — name, pitch, benefit bullets, funnel flow
- Pricing with value-to-price ratio and tier structure
- CUB Test (Confusing? Unbelievable? Boring?) — must pass all three
- Competitor analysis via web research

**Output:** `outputs/tvml-offer-workbook-[name].md`

### 3. Build Your Money Model

```
/tvml-money-models
```

Claude reads your offer workbook and designs the full sequence:
- Attraction offer — what brings them in the door
- Core offer — your main product
- Upsell design — how to increase transaction value
- Continuity model — recurring revenue
- Downsell safety net — what to offer when they try to cancel
- 30-day payback math — does one customer pay for acquiring the next?
- LTV projections at 1, 3, 6, and 12 months
- Cashflow acceleration tactics
- Customer journey map from first touch to 12-month retention

**Output:** `outputs/tvml-money-model-[name].md`

---

## Updating

When new versions are released, pull the latest:

```bash
cd ~/.claude/skills/tvml && git pull
```

Updates are announced in the Skool community.

---

## Tips

- **Better inputs = better outputs.** The skills are only as good as your reference files. Real testimonials in `testimonials.md` make a massive difference — the AI uses your customers' actual language instead of guessing.
- **Run them in order.** Avatar → Offer → Money Model. Each builds on the last. Skipping the avatar means the offer has no customer language to draw from.
- **You can re-run any skill.** Got new testimonials? Run `/tvml-avatar` again. Changed your pricing? Run `/tvml-offer` again. The old files get overwritten with the updated version.
- **Read the workbooks in Obsidian.** They're markdown files with cross-references. Obsidian renders them nicely with the graph view showing connections.

---

## Troubleshooting

**Skills don't show up in Claude Code**
- Make sure you cloned to `~/.claude/skills/tvml` (check the path)
- Restart Claude Code after installing

**Avatar reads too generic**
- Add real customer testimonials to `reference/proof/testimonials.md`
- The more specific language you give it, the more specific the output

**Offer validation flags issues**
- That's working as intended — the validation agent stress-tests your offer against real market data
- Review the flags and decide what to adjust

**"Avatar workbook not found" when running offer skill**
- Make sure you ran `/tvml-avatar` first
- Check that the file exists in your `outputs/` folder

**Image generation doesn't work**
- You need a `GOOGLE_API_KEY` set up — this is optional. The skill works fine without it, just skips the avatar photo.

---

## Questions?

Drop them in the Skool community — post in the Questions category and tag Richard.

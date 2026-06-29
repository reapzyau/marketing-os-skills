---
name: mos-money-models
description: "Build a money model workbook — the sequence of offers (attraction, upsell, downsell, continuity) that maximizes customer lifetime value and 30-day payback. Requires completed offer workbook as input. Use when: (1) Designing offer sequence around a core offer (2) User says money model, offer sequence, upsell, downsell, continuity, cashflow, 30-day payback (3) Building a product ladder with cashflow optimization."
---

# TVML Money Model Builder

Build a complete money model workbook — the sequence of offers that maximizes customer lifetime value and ensures 30-day payback.

Built on The Vibe Marketing Lab's proprietary offer economics and business model framework.

---

## Framework Reference

Before starting, read `references/money-model-frameworks.md` from this skill's directory for framework methodology. It contains all mechanisms, formulas, scoring criteria, and decision trees used throughout.

---

## Workflow

### Phase 1: Read & Understand (Main)

**Step 1: Locate and read the offer workbook.**

Search for the offer workbook in order:
1. `outputs/` in the current repo — look for `*mos-offer-workbook*` first, then `*offer-workbook*` fallback
2. Any sibling repos on Desktop — search `**/offer-workbook*`
3. If not found, ask the user to provide the path

The offer workbook is REQUIRED. Do not proceed without it. It provides: core offer details, pricing, value stack, guarantee, and enhancement levers that feed directly into the money model.

**Step 2: Read the avatar workbook (optional, for language).**

Search `outputs/` for `*mos-avatar-workbook*` first, then `*avatar*` fallback. If found, use the customer's language for offer naming and positioning. Not required to proceed.

**Step 3: Read business context files (if they exist).**

Read in order:
1. `reference/core/soul.md` — why the business exists
2. `reference/core/offer.md` — current offer thesis
3. `reference/core/audience.md` — who they serve
4. `reference/core/voice.md` — brand voice
5. `reference/domain/product-ladder.md` — where this offer sits

If files don't exist, skip gracefully.

**Step 4: Read the framework reference file.**

Read `references/money-model-frameworks.md` from this skill's directory.

**Step 5: Ask the user one question:**

> What stage is the business at? **Pre-launch** (no customers yet), **Early** (some customers, finding product-market fit), or **Growth** (proven offer, ready to scale)?

Wait for response before proceeding.

---

### Phase 2: Foundation (2 Sequential Agents)

These MUST run sequentially — offer sequence architecture depends on economics.

#### Agent 2A: Economics & Constraints

Spawn an agent with this prompt:

```
You are analyzing the economics and constraints for a Money Model. You have been given:
- An offer workbook (the core offer)
- An avatar workbook (if available)
- Business context files (if available)
- The money model framework reference

Your job is to produce FIVE outputs:

OUTPUT 1: CORE OFFER SUMMARY
Pull from the offer workbook:
- Offer name, price, delivery model
- Value stack summary (top 3-5 components)
- Guarantee type and terms
- Target avatar in one sentence

OUTPUT 2: CAC ESTIMATE & 30-DAY PAYBACK GAP
- Estimate CAC based on business stage, industry, and channel mix
- Calculate current 30-day GP (what does one customer generate in 30 days?)
- Calculate payback gap: 30D GP vs. CAC — is there a gap?
- If gap exists, how much additional 30-day revenue is needed?

OUTPUT 3: 6M CONSTRAINT ASSESSMENT
Apply the 6M framework to identify the binding constraint:
- More: Can they simply do more of what works?
- Metrics: Do they know their numbers?
- Market: Is the market big enough?
- Model: Is the business model sound?
- Money: Which sub-constraint applies? (leads too expensive, close too few, not enough per customer, too slow)
- Manpower: Can they handle more volume?

Identify the SINGLE binding constraint and explain why.

OUTPUT 4: 80/20 PRICING FRACTAL
Apply the Pareto pricing tiers to the core offer:
- Base tier: [core offer price] — 100% of customers
- 5x Premium tier: [5x price] — expect ~20% uptake
- 25x Ultra tier: [25x price] — expect ~4% uptake
- Calculate total revenue per 100 customers at each tier
- Recommend which tiers make sense for this business stage

OUTPUT 5: BILLING & CASHFLOW ASSESSMENT
- Weekly vs monthly billing impact analysis for this specific business
- Quarterly structure feasibility
- Current cashflow velocity estimate
- Which of the 9 cashflow acceleration tactics apply?

Format everything as structured markdown with clear headers.
```

Pass the offer workbook content, avatar workbook (if available), business context, AND the framework reference into this agent.

#### Agent 2B: Offer Sequence Architecture

Spawn AFTER Agent 2A completes. Pass 2A's full output plus the offer workbook.

```
You are designing the offer sequence architecture for a Money Model. You have been given:
- Economics & Constraints analysis from Phase 2A
- The offer workbook (core offer details)
- The money model framework reference

Your job is to produce FOUR outputs:

OUTPUT 1: MECHANISM SCORECARD — ATTRACTION (5 mechanisms)
Score each mechanism 1-10 against the core offer on: fit, effort, expected impact.

| # | Mechanism | Fit | Effort | Impact | Recommend? | Notes |
|---|-----------|-----|--------|--------|-----------|-------|
| 1 | Win Your Money Back | | | | | |
| 2 | Giveaways | | | | | |
| 3 | Decoy Offer | | | | | |
| 4 | Buy X Get Y Free | | | | | |
| 5 | Pay Less Now or Pay More Later | | | | | |

Select 1-2 best fits.

OUTPUT 2: MECHANISM SCORECARD — UPSELL (4 mechanisms)
Same scoring format for:
| 6 | Classic Upsell | | | | | |
| 7 | Menu Upsell | | | | | |
| 8 | Anchor Upsell | | | | | |
| 9 | Rollover Upsell | | | | | |

Select 1-2 best fits.

OUTPUT 3: MECHANISM SCORECARD — DOWNSELL (3) + CONTINUITY (4)

Downsell:
| 10 | Payment Plan Downsell | | | | | |
| 11 | Trial With Penalty | | | | | |
| 12 | Feature Downsell | | | | | |

Continuity:
| 13 | Continuity Bonus | | | | | |
| 14 | Continuity Discount | | | | | |
| 15 | Waived Fee Offer | | | | | |
| 16 | Automatic Renewal | | | | | |

Select 1-2 best fits per category.

OUTPUT 4: CUSTOMER JOURNEY MAP & PREMIUM/FREE/DISCOUNT DECISION
- Premium vs Free vs Discount decision for the attraction offer (using the decision tree from the framework reference)
- Two-step sale structure evaluation (is it appropriate?)
- Complete customer journey map from first touch to retention:
  First Awareness → Attraction Offer → Core Offer → Upsell → Continuity (with downsell branches)
- Each transition: what triggers it, what they experience, why it feels natural

Format everything as structured markdown.
```

---

### Phase 3: Offer Engineering (3 Parallel Agents)

These three agents are INDEPENDENT and run in PARALLEL. All draw from Phase 2 outputs.

#### Agent 3A: Attraction & Acquisition

```
You are designing the Attraction & Acquisition offers for a Money Model. You have:
- Economics & Constraints (Phase 2A output)
- Offer Sequence Architecture (Phase 2B output)
- Offer workbook and business context

Your job is to produce FIVE outputs:

OUTPUT 1: PRIMARY ATTRACTION OFFER
Full specification:
- Name (use M.A.G.I.C. formula if applicable)
- Price point (or free)
- What they get
- How it's delivered
- CFA mechanics (how does this fund acquiring the next customer?)
- Expected conversion to core offer

OUTPUT 2: COMMODITY PROBLEM DIFFERENTIATION
Apply Speed/Risk/Ease assessment:
- Score each vector 1-10 for this business
- Score top 3 competitors on same vectors
- Which 1-2 vectors to lead with?
- How to communicate the differentiation

OUTPUT 3: LEAD MAGNET VS DIRECT OFFER DECISION
Based on business stage and resources:
- Which approach fits now?
- What's the awareness ladder targeting strategy?
- Write hooks for at least 3 awareness levels

OUTPUT 4: PLATFORM CTA STRATEGY
Based on where the avatar spends time:
- Primary platform + CTA approach
- Secondary platform + CTA approach
- Email strategy (if applicable)

OUTPUT 5: BAMFAM FLOW
After the attraction offer, what's the next step?
- What appointment or interaction follows?
- How is it scheduled before they leave?
- What's the bridge from attraction to core offer?

Format everything as structured markdown.
```

#### Agent 3B: Upsell & Revenue Maximization

```
You are designing Upsell & Revenue Maximization for a Money Model. You have:
- Economics & Constraints (Phase 2A output)
- Offer Sequence Architecture (Phase 2B output)
- Offer workbook and business context

Your job is to produce FIVE outputs:

OUTPUT 1: PRIMARY UPSELL SPECIFICATION
Full specification:
- Name
- Price point
- What they get
- Pitch flow (how the conversation goes)
- Timing (when in the customer journey)
- Which problem it solves that the core offer creates

OUTPUT 2: ANCHOR PRICING STRATEGY
Using the 80/20 fractal tiers from Phase 2A:
- How to present the anchor (highest price first)
- The "gasp" moment
- How to come to the rescue with the real offer
- Expected impact on average transaction value

OUTPUT 3: PREPAYMENT STRUCTURES
Evaluate and recommend:
- Guarantee + Prepay: Does it fit? What would it look like?
- Layaway: Applicable?
- BNPL: Available? Expected impact?
- Which structure best fits the offer type and audience?

OUTPUT 4: UNSELLING APPROACH
Design the Menu Upsell flow:
- What items do you cross out? (builds trust)
- What items do you prescribe? (assumed close)
- A/B choice presentation
- Card-on-file close

OUTPUT 5: CASHFLOW ACCELERATION TACTICS
Score all 9 tactics for this specific business:

| # | Tactic | Applicable? | Expected Impact | Priority |
|---|--------|------------|----------------|----------|
| 1 | Push out vendor terms | | | |
| 2 | Quarterly pricing | | | |
| 3 | Present high to low | | | |
| 4 | Layaway | | | |
| 5 | Prepay incentives | | | |
| 6 | Guarantee + prepay | | | |
| 7 | Upfront fees | | | |
| 8 | BNPL | | | |
| 9 | AR financing | | | |

Format everything as structured markdown.
```

#### Agent 3C: Continuity & Retention

```
You are designing Continuity & Retention for a Money Model. You have:
- Economics & Constraints (Phase 2A output)
- Offer Sequence Architecture (Phase 2B output)
- Offer workbook and business context

Your job is to produce FIVE outputs:

OUTPUT 1: CONTINUITY MODEL
Full specification:
- Name
- Billing frequency (weekly/monthly/quarterly)
- Price
- What ongoing value they receive
- Why customers stay

OUTPUT 2: BILLING OPTIMIZATION
Compare weekly/monthly/quarterly for this specific business:

| Billing | Revenue/Year | Collection Reliability | Cashflow Velocity | Recommended? |
|---------|-------------|----------------------|------------------|-------------|
| Weekly | | | | |
| Monthly | | | | |
| Quarterly | | | | |

Recommend primary billing approach with rationale.

OUTPUT 3: DOWNSELL SAFETY NET
What happens when a customer tries to cancel?
- Downsell sequence (payment plan → feature → trial)
- What to offer to keep them (at lower revenue > zero revenue)
- Temperature check process
- "What would a 10 look like?" recombination

OUTPUT 4: CHURN PREVENTION MECHANISMS
- Onboarding activation checklist (what must happen in first 7 days)
- Milestone recognition (triggers for celebrating progress)
- Community or accountability elements
- Proactive check-in cadence

OUTPUT 5: LTV PROJECTION
Calculate projected LTV at:

| Timeframe | Churn Assumption | Revenue/Customer | Cumulative LTV |
|-----------|-----------------|-----------------|---------------|
| 1 month | | | |
| 3 months | | | |
| 6 months | | | |
| 12 months | | | |

Include sensitivity analysis: what happens if churn improves by 10%? 25%?

Format everything as structured markdown.
```

---

### Phase 4: Assemble & Validate (Main)

After all Phase 3 agents return:

**Step 1: Assemble into workbook.**
Organize all agent outputs into the 9-part structure (see Output Format below).

**Step 2: 30-Day Payback Math Check.**
- Attraction offer revenue + upsell revenue within 30 days
- Subtract: CAC + cost to service
- Does 30D Cash >= 2x CAC? If not, identify what needs to change.

**Step 3: Customer Journey Coherence Check.**
- Does each offer transition feel natural?
- Does the customer experience build trust at each step?
- Are there gaps where the customer is "left hanging"?

Fix any issues before proceeding.

---

### Phase 5: Validation (1 Agent)

Spawn a validation agent:

```
You are stress-testing a Money Model workbook. You have:
- The complete assembled Money Model workbook
- Access to web search for competitor analysis

Your job is to produce FOUR outputs:

OUTPUT 1: 6M CONSTRAINT RE-CHECK
Does the Money Model address the binding constraint identified in Phase 2?
If not, what's missing?

OUTPUT 2: CUB TEST PER OFFER
For EACH offer in the sequence (attraction, upsell, downsell, continuity):

| Offer | Confusing? | Unbelievable? | Boring? | Pass/Fail |
|-------|-----------|--------------|---------|-----------|

OUTPUT 3: COMPETITOR OFFER SEQUENCES
Use web search to find 3-5 competitors in the same space.
For each: their offer sequence (attraction → core → upsell → continuity), pricing, strengths.
How does our Money Model compare?

OUTPUT 4: SIMPLIFICATION FRAMEWORK REVIEW
Apply the 5-Step Optimization Review to the entire Money Model:
1. Question: Is every offer necessary? Why?
2. Delete: Can any offer be removed without hurting 30D payback?
3. Optimize: Where's the greatest leverage with fewest actions?
4. Accelerate: Can any timeline be compressed?
5. Automate: What can be automated?

Final: Gaps & Recommendations (issues, severity, specific fixes).

Be genuinely critical. A rubber-stamp helps nobody.
```

---

### Phase 6: Write Final Workbook (Main)

**Step 1: Incorporate validation feedback.**
Fix any high-severity issues. Note medium/low issues in the validation section.

**Step 2: Write the final workbook.**
Output path: `outputs/mos-money-model-[business-slug].md`

**Step 3: Run the quality checklist** before saving.

---

## Output Format

The final workbook follows this structure:

```markdown
# Money Model Workbook — [Business Name]

Generated: [date]
Offer Source: [path to offer workbook used]
Avatar Source: [path to avatar workbook, if used]
Framework: Offer economics and business model design (16 mechanisms, 30-day payback, CFA, pricing psychology)

---

## Part 1: Economics Snapshot

### 1.1 Core Offer Summary
[Offer name, price, delivery, value stack highlights, guarantee]

### 1.2 Key Metrics
**CAC Estimate:** $[amount]
**30-Day GP Target:** $[amount]
**Payback Gap:** $[amount] (or "None — 30D payback achieved")

### 1.3 6M Constraint Assessment
**Binding Constraint:** [which M]
**Why:** [explanation]
**How this Money Model addresses it:** [connection]

### 1.4 Pricing Tier Structure (80/20 Fractal)
| Tier | Price | Expected Uptake | Revenue per 100 Customers |
|------|-------|----------------|--------------------------|
| Base | | 100% | |
| 5x Premium | | ~20% | |
| 25x Ultra | | ~4% | |

---

## Part 2: Offer Sequence Map

### 2.1 Visual Flow
[ASCII flow diagram: attraction → core → upsell → continuity, with downsell branches]

### 2.2 Attraction Scorecard
[All 5 mechanisms scored with selections]

### 2.3 Upsell Scorecard
[All 4 mechanisms scored with selections]

### 2.4 Downsell + Continuity Scorecard
[All 3+4 mechanisms scored with selections]

### 2.5 Premium vs Free vs Discount Decision
[Decision with rationale from framework decision tree]

---

## Part 3: Attraction Offer Design

### 3.1 Primary Attraction Offer
[Full spec: name, price, delivery, CFA mechanics]

### 3.2 Commodity Differentiation (Speed/Risk/Ease)
[Scores vs. competitors, lead vectors]

### 3.3 Two-Step Sale Structure
[If applicable — flow and rationale]

### 3.4 Platform & CTA Strategy
[Primary + secondary platforms, CTA approach]

### 3.5 BAMFAM Flow
[Next step after attraction, how it's scheduled]

---

## Part 4: Upsell Design

### 4.1 Primary Upsell
[Full spec: name, price, pitch flow, timing]

### 4.2 Anchor Pricing Strategy
[How anchor is presented, expected impact]

### 4.3 Prepayment Structure
[Recommended structure with rationale]

### 4.4 Unselling Approach
[Menu upsell flow: cross out → prescribe → A/B → card on file]

### 4.5 Cashflow Acceleration Tactics
[9 tactics scored with priorities]

---

## Part 5: Continuity & Retention

### 5.1 Continuity Model
[Full spec: name, billing, price, ongoing value]

### 5.2 Billing Optimization
[Weekly/monthly/quarterly comparison with recommendation]

### 5.3 Downsell Safety Net
[Cancel attempt sequence]

### 5.4 Churn Prevention
[Onboarding, milestones, community, check-ins]

### 5.5 LTV Projection
[1/3/6/12 month projections with sensitivity analysis]

---

## Part 6: 30-Day Payback Model

### 6.1 Revenue Timeline
[Day-by-day breakdown of expected revenue per customer]

### 6.2 Payback Verdict
**CAC:** $[amount]
**30-Day Revenue:** $[amount]
**30D Cash / CAC Ratio:** [x]:1
**Verdict:** [PASS/FAIL — with explanation]

---

## Part 7: Customer Journey Map

### 7.1 Complete Flow
[First awareness → attraction → core → upsell → 12-month retention]

### 7.2 Transition Logic
[For each transition: trigger, experience, why it feels natural]

---

## Part 8: Content & Acquisition Engine

### 8.1 Content Scaling Phase
[Barely Alive / Momentum / Acceleration — where are they now?]

### 8.2 7 Ad Creation Methods
[Scored for this business — which 2-3 to prioritize]

### 8.3 Brand as 401k
[Long-term brand strategy and how it compounds]

---

## Part 9: Validation

### 9.1 Competitor Offer Sequences
[3-5 competitors with their sequences and comparison]

### 9.2 CUB Test (Per Offer)
[Table with pass/fail per offer in sequence]

### 9.3 Simplification Framework Review
[Question → Delete → Optimize → Accelerate → Automate applied]

### 9.4 Gaps & Recommendations
[Remaining issues with severity and fixes]

---

## Quick Reference Card

**Business:** [Name]
**Core Offer:** [Name + Price]
**Attraction:** [Name + Price/Free]
**Upsell:** [Name + Price]
**Continuity:** [Name + Price/period]
**Downsell:** [Type + adjusted price]
**30D Payback:** [PASS/FAIL + ratio]
**CAC:** $[amount]
**12-Month LTV:** $[amount]
**Binding Constraint:** [which M]
**Lead Vector:** [Speed/Risk/Ease]
**Content Phase:** [Barely Alive/Momentum/Acceleration]
```

---

## Skill Chain

| Step | Skill | Produces |
|------|-------|---------|
| 1 | mos-avatar | Customer avatar workbook |
| 2 | mos-offer | Core offer workbook |
| **3** | **mos-money-models (here)** | **Money model workbook** |

Previous: Requires offer workbook from mos-offer.
Back to refine: If 30-day payback math fails, go back to mos-offer to adjust pricing/guarantee/value stack. The chain is iterative.

Money model complete. Your full offer engine is built: avatar → offer → money model.

---

## Agent Architecture

```
Phase 1: Read offer workbook + avatar + reference + framework reference (main)
    |
Phase 2: Sequential economics agents
    +-- Agent 2A: Economics & Constraints
    |       | (output feeds 2B)
    +-- Agent 2B: Offer Sequence Architecture
    |
Phase 3: Parallel offer engineering
    +-- Agent 3A: Attraction & Acquisition ----+
    +-- Agent 3B: Upsell & Revenue Max    -----+-- (parallel)
    +-- Agent 3C: Continuity & Retention  -----+
    |
Phase 4: Assemble + 30-day payback validation (main)
    |
Phase 5: Validation agent (stress-test)
    |
Phase 6: Write final workbook (main)
```

Total agents: 6 (2 sequential + 3 parallel + 1 validation)

---

## Quality Checklist

Before saving the final workbook, verify:

- [ ] Offer workbook was read and core offer details accurately reflected
- [ ] All 16 mechanisms scored (5+4+3+4)
- [ ] 30-day payback math is explicit and calculated
- [ ] 80/20 pricing fractal applied with specific tier prices
- [ ] Weekly vs monthly billing analysis completed
- [ ] 6M Constraint Framework applied with binding constraint identified
- [ ] Customer journey map complete from first touch to 12-month retention
- [ ] Each offer passes CUB Test independently
- [ ] Transitions between offers feel natural
- [ ] Competitor offer sequences researched via web search
- [ ] Simplification Framework applied to simplify
- [ ] Cashflow acceleration tactics scored (9 tactics)
- [ ] LTV projection at 1, 3, 6, 12 months
- [ ] Quick Reference Card populated
- [ ] Output saved to `outputs/mos-money-model-[slug].md`
- [ ] No branded course titles or absolute file paths in output
- [ ] All skill references use mos- prefix

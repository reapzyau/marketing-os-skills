---
name: tvml-offer
description: "Build a high-value offer workbook from your avatar and business context. Synthesizes proven offer-building methodologies into a structured workbook. Use when: (1) Creating a new offer for a business (2) User says offer, value stack, offer creation, pricing, guarantee, build an offer (3) Refining or stress-testing an existing offer."
---

# TVML Offer Builder

Synthesizes proven offer-building methodologies into a structured workbook.

This framework is inspired by the work of Alex Hormozi, Charlie Morgan, and Alisha Conlin-Hurd.

This skill reads the avatar workbook as input and produces a complete offer workbook as output.

---

## Prerequisites

- An avatar workbook (from tvml-avatar or equivalent) — REQUIRED
- Business context files (optional but recommended)

---

## Workflow

### Phase 1: Read & Understand (Main)

**Step 1: Locate and read the avatar workbook.**

Search for the avatar workbook in order:
1. `outputs/` in the current repo — look for `*tvml-avatar-workbook*` first, then `*avatar*` as fallback
2. Any sibling repos on Desktop — search `**/tvml-avatar-workbook*` then `**/avatar*`
3. If not found, ask the user to provide the path

The avatar workbook is REQUIRED. Do not proceed without it. It provides: dream outcome language, pain points, before/after states, roadblocks, and emotional triggers that feed directly into the offer.

**Step 2: Read business context files (if they exist).**

Read in order:
1. `reference/core/soul.md` — why the business exists
2. `reference/core/offer.md` — current offer thesis
3. `reference/core/audience.md` — who they serve
4. `reference/core/voice.md` — brand voice
5. `reference/proof/testimonials.md` — social proof
6. Active offer file from `reference/offers/[active]/offer.md` (check `.vip/local.yaml` for `current_offer`) — these paths are used by Main Branch users, skip if not found
7. `reference/domain/product-ladder.md` — where this offer sits (Main Branch path, skip if not found)

If files don't exist, skip gracefully. The avatar workbook alone is enough to proceed.

**Step 3: Read `references/offer-frameworks.md` from this skill's directory for framework methodology.**

**Step 4: Ask the user one question:**

> Are we creating a **new offer from scratch**, or **refining/stress-testing an existing offer**?
>
> If refining — paste or point me to the current offer details.

Wait for response before proceeding.

---

### Phase 2: Foundation (2 Sequential Agents)

These MUST run sequentially — solutions depend on the problem universe.

#### Agent 2A: Dream Outcome & Problem Universe

Spawn an agent with this prompt:

```
You are building the foundation of a high-value offer. You have been given:
- An avatar workbook (the customer profile)
- Business context files (if available)

Your job is to produce TWO outputs:

OUTPUT 1: THE DREAM OUTCOME
Define the Dream Outcome with visceral specificity:
- What SPECIFIC result will they achieve?
- What does success look, feel, sound like? (sensory details)
- Express it in THEIR language (pull from avatar's own words)
- Map The Gap: Current Situation → Desired Situation → The Bridge (our offer)
- The gap should be in the Goldilocks zone — significant but achievable

OUTPUT 2: THE PROBLEM UNIVERSE
List EVERY problem the prospect faces in THREE timeframes:

**Problems BEFORE they start:**
- What stops them from beginning?
- Overwhelm, confusion, fear, not knowing where to start
- Pull from avatar's "Roadblocks" and "Before State"

**Problems DURING the process:**
- What makes them want to quit?
- Frustration, slow results, lack of support
- Pull from avatar's "Pain Points" and emotional triggers

**Problems AFTER achievement:**
- What new problems emerge from success?
- Maintaining results, scaling, new identity challenges

For EACH problem, also categorize it into the 5 Pools of Pain:
1. Vehicle Pain (the method)
2. Internal Pain (self-belief)
3. External Pain (circumstances)
4. Philosophical Pain (unfairness)
5. Social Pain (perception)

For EACH problem, note the lens:
- Vehicle problem (the "how")
- Internal belief problem (about themselves)
- External belief problem (about the method/provider)

Also list any Latent Conditions detected from the avatar:
- Identity conflict, authority skepticism, analysis paralysis, timing delusion, comparison trap, impostor syndrome

Use the avatar's EXACT language wherever possible. Be exhaustive — every missed problem is a future objection.

Format the output as structured markdown with clear headers for each section.
```

Pass the avatar workbook content AND all business context into this agent.

#### Agent 2B: Solutions & Delivery Vehicles

Spawn AFTER Agent 2A completes. Pass 2A's full output plus the avatar workbook.

```
You are designing solutions for a high-value offer. You have been given:
- The Dream Outcome and Problem Universe from Phase 2A
- The avatar workbook

Your job is to produce TWO outputs:

OUTPUT 1: SOLUTION MATRIX
For EVERY problem listed in Phase 2A, create a specific solution.
Do not skip any problem. Format as a table:

| # | Problem | Pain Pool | Solution | Delivery Vehicle | Type |
|---|---------|-----------|----------|-----------------|------|

Delivery Vehicle options:
- 1-on-1 coaching/consulting
- Small group (cohort)
- 1-to-many (course, content, templates)
- Done-for-you (DFY)
- Done-with-you (DWY)
- Do-it-yourself (DIY — tools, templates, guides)

Type = which combination makes sense for each solution.

OUTPUT 2: OFFER TYPE & DELIVERY MODEL
Classify the offer:
- Is this a CONSULTATION offer (complex, needs guidance, CTA is a conversation)?
- Or a READY-NOW offer (straightforward, CTA is a purchase)?

Apply the principle: "Easy acquisition = hard product."
- If the product is easy to deliver → acquisition must be sophisticated
- If the product is hard to deliver → acquisition can be simple

Recommend the overall delivery model and explain why.

Be thorough. Every unsolved problem is a conversion leak.
```

---

### Phase 3: Offer Engineering (3 Parallel Agents)

These three agents are INDEPENDENT and run in PARALLEL. All draw from Phase 2 outputs.

#### Agent 3A: Value Stack & Pricing

```
You are building the Value Stack for a high-value offer. You have been given:
- Dream Outcome & Problem Universe (Phase 2A output)
- Solutions & Delivery Matrix (Phase 2B output)
- Avatar workbook and business context

Your job is to produce FOUR outputs:

OUTPUT 1: THE VALUE STACK
Apply the 5-step offer build (Step 5 — Trim & Stack):
- From the Solution Matrix, select the highest-impact solutions
- Remove: low-value, high-cost items
- Keep: high-value, low-cost items (things that cost you little but save them a lot)
- Stack remaining solutions into a cohesive offer
- NAME each component (named = higher perceived value)
- Assign a perceived dollar value to each component

Score each component against the Value Equation:
V = (Dream Outcome x Perceived Likelihood of Achievement) / (Time Delay x Effort & Sacrifice)
Rate each factor 1-10 and calculate the score.

OUTPUT 2: 7 ESSENTIAL ELEMENTS CHECK
Verify the offer addresses all 7:
1. Outcome — clearly defined?
2. Timeframe — specific and compelling?
3. Method — named, believable, different?
4. Secrets — proprietary elements?
5. Safety Net — risk reversal?
6. Polarization — clear stance?
7. Pricing — justified by value?

For any missing element, flag it and suggest how to add it.

OUTPUT 3: FACTORS OF VALUE
For each component in the value stack, build the value argument:
1. What is it?
2. Why do they need it?
3. What happens if they DON'T have it?
4. What happens when they DO have it?
5. How does it work?
6. Why is YOUR version better?
7. What proof do you have?

OUTPUT 4: PRICING
- Recommend a price point with rationale
- Calculate value-to-price ratio (aim for 10x+)
- Apply pricing psychology: anchor, contrast, charm pricing if appropriate
- Consider the business's product ladder position (if known)
- Price on value, not cost
- Apply 80/20 pricing fractal: 20% will pay 5x, 4% will pay 25x. What are the tier prices?
- Reverse-engineer willingness to pay from avatar income/pain level
- Consider guarantee + prepayment structures (guarantee conditional on prepay, layaway, BNPL)
- Weekly vs monthly billing: which collects more reliably for this offer type?

Format everything as structured markdown.
```

#### Agent 3B: Enhancement Levers & Proof

```
You are designing Enhancement Levers and Proof Engineering for a high-value offer. You have:
- Dream Outcome & Problem Universe (Phase 2A output)
- Solutions & Delivery Matrix (Phase 2B output)
- Avatar workbook and business context

Your job is to produce FOUR outputs:

OUTPUT 1: ENHANCEMENT LEVERS

**Scarcity mechanism:**
- Design a GENUINE scarcity element (not manufactured)
- Options: limited spots, cohort-based, seasonal, capacity-based
- Explain why the scarcity is real and defensible

**Urgency trigger:**
- Design a time-based or cohort-based urgency element
- Options: doors close date, price increases, disappearing bonuses
- Must feel natural, not manipulative

**Bonuses:**
- Design 2-4 bonuses
- Each bonus must solve a SPECIFIC objection from the avatar
- For each: Name, What it is, Which objection it addresses, Perceived dollar value
- Apply M.A.G.I.C. naming to each bonus
- Best bonuses: cost you little, save them a lot

OUTPUT 2: GUARANTEE DESIGN
Design the guarantee using both approaches:

By approach: Unconditional, Conditional, Anti-guarantee, Implied, Performance, Service
By focus: Results guarantee, Service guarantee, Satisfaction guarantee

Recommend primary + backup guarantee. Include:
- Type and rationale
- Exact wording
- Conditions (if conditional)
- Why this type fits this offer

Consider guarantee stacking for maximum risk reversal.

Also evaluate prepayment structures:
- Guarantee + Prepay: "Give the guarantee only if they prepay. No prepay, no guarantee." Does this fit?
- Layaway: "Start paying now, we start when you've paid half/full." Applicable?
- BNPL: Third-party financing (Affirm, Klarna). Typically ~35% sales boost. Available?
Recommend which prepayment structure best fits this offer type and audience.

OUTPUT 3: 3 POOLS OF CONFIDENCE AUDIT

**Pool 1 — Confidence in the VEHICLE:**
- Does the offer prove the METHOD works?
- What evidence supports it? (case studies, data, logic)
- Gaps? Suggestions?

**Pool 2 — Confidence in YOU:**
- Does the offer prove the PROVIDER can deliver?
- What authority markers exist? (credentials, track record, testimonials)
- Gaps? Suggestions?

**Pool 3 — Confidence in THEMSELVES:**
- Does the offer prove THEY can succeed?
- Stories of similar people? Ease of implementation? Ongoing support?
- This is the most overlooked pool — be thorough here.

For each pool: current strength (1-10), gaps identified, specific fixes.

OUTPUT 4: ACTION THRESHOLD CALCULATION

Left side (maximize):
- Desire for Outcome — how vivid and compelling? (1-10)
- Pain of Current Situation — how acute and present? (1-10)

Right side (minimize):
- Confusion about the offer (1-10, where 1 = crystal clear)
- Skepticism about results (1-10, where 1 = fully convinced)
- Fear of wasting money/time (1-10, where 1 = no fear)
- Past failure baggage (1-10, where 1 = no baggage)
- Perceived effort required (1-10, where 1 = effortless)
- Social risk (1-10, where 1 = no risk)

Calculate: Does desire + pain > sum of friction factors?
If not, identify the top 3 friction points and suggest specific fixes.

Format everything as structured markdown.
```

#### Agent 3C: Offer Copy & Naming

```
You are crafting the Offer Packaging for a high-value offer. You have:
- Dream Outcome & Problem Universe (Phase 2A output)
- Solutions & Delivery Matrix (Phase 2B output)
- Avatar workbook and business context (including voice.md if available)

Your job is to produce FIVE outputs:

OUTPUT 1: M.A.G.I.C. OFFER NAMES
Generate 3-5 offer name options using the formula:
- M = Make a Magnetic Reason Why
- A = Announce Your Avatar
- G = Give Them a Goal
- I = Indicate a Time Interval
- C = Complete with a Container Word

Score each name against the formula (which elements does it hit?).
Recommend the strongest option with reasoning.

Container word options: System, Blueprint, Challenge, Bootcamp, Accelerator, Academy, Vault, Method, Formula, Protocol, Playbook, Sprint, Masterclass, Intensive

OUTPUT 2: THE PITCH (100-200 words)
Write the complete offer pitch following this structure:
1. Problem acknowledgment (1-2 sentences)
2. Dream outcome (1 sentence)
3. How it works (2-3 sentences)
4. What they get (2-3 sentences)
5. Guarantee / risk reversal (1 sentence)
6. CTA (1 sentence)

Use the brand voice (from voice.md if available). It should sound like a conversation, not a brochure.

OUTPUT 3: BENEFIT BULLETS (5-7 bullets)
Format:
**[Bold Headline — the benefit in 5-8 words]**
[One sentence explaining HOW they get this benefit and WHY it matters]

Rules:
- Each addresses a different concern or desire from the avatar
- Alternate emotional and logical benefits
- Lead with strongest, end with second strongest
- Every bullet answers: "What does this mean for ME?"

OUTPUT 4: TANGIBLE BONUS / ETHICAL BRIBE
Design the lead magnet / ethical bribe:
- Something valuable they get just for taking the next step
- NOT a discount — a tangible deliverable
- Must be useful on its own
- Related to the offer but not dependent on purchase
- Creates reciprocity and reduces friction

Include: name, format, what's in it, why it's valuable, how it connects to the main offer.

OUTPUT 5: COMMODITY PROBLEM DIFFERENTIATION
Apply the Speed/Risk/Ease assessment:
- Score each vector 1-10 for this business
- Score top 3 competitors on the same vectors
- Which 1-2 vectors should the offer lead with?
- How to communicate the differentiation in the offer packaging

| Vector | This Offer | Competitor 1 | Competitor 2 | Competitor 3 |
|--------|-----------|-------------|-------------|-------------|
| Speed | | | | |
| Risk | | | | |
| Ease | | | | |

Recommend lead vectors with rationale.

OUTPUT 6: MICRO-STEP FUNNEL FLOW
Design the complete funnel flow:
1. Attention — what pattern interrupt?
2. Interest — what problem/solution earns a click?
3. Micro-commitment — what low-risk action?
4. Engagement — what deeper interaction?
5. Conversion — the offer
6. Activation — first value delivered

For each step: what happens, what they experience, what makes the next step feel like the obvious move.

Also evaluate a Two-Step Sale Structure:
- Step 1: Small discount offer ($19-$99) to get card on file and create initial transaction
- Step 2: Prospect shows up, gets value, then upsold to core offer
- Benefits: 85-90% show rates (vs 50-60% for free), card already on file, "foot in the door" principle
- Is this applicable to this offer? If so, design the two-step flow.

Reference the Premium vs Free vs Discount decision tree from the framework reference to determine
which wrapper (premium, free, or discount) best fits this offer for the front-end attraction step.

Match the brand voice throughout. Use avatar language for pain/desire.
Format everything as structured markdown.
```

---

### Phase 4: Assemble & CUB Test (Main)

After all Phase 3 agents return, assemble the complete offer.

**Step 1: Collect all agent outputs.**

Organize into the 10-part workbook structure (see Output Format below).

**Step 2: Cross-check consistency.**
- Does the value stack solve the problems from the problem universe?
- Does the guarantee address the avatar's top objections?
- Does the naming match the dream outcome language?
- Do the benefit bullets reflect the value stack components?
- Does the micro-step funnel flow logically?
- Are all 3 Confidence Pools addressed somewhere?
- Are all 7 Essential Elements present?

Fix any inconsistencies.

**Step 3: Run the CUB Test.**

For the COMPLETE assembled offer:

| Test | Question | Pass/Fail | Notes |
|------|----------|-----------|-------|
| **C — Confusing?** | Can a 10-year-old understand the offer? Is it clear what they get, do, and what happens? | | |
| **U — Unbelievable?** | Does any claim sound too good to be true without proof? | | |
| **B — Boring?** | Does it sound like every other offer in the market? Does it create emotional response? | | |

If ANY test fails, fix it before proceeding.

---

### Phase 5: Validate (1 Agent)

Spawn a validation agent:

```
You are a critical reviewer stress-testing a high-value offer workbook. You have:
- The complete assembled offer workbook
- Access to web search for competitor analysis

Your job is to produce THREE outputs:

OUTPUT 1: FRAMEWORK COMPLIANCE TABLE
Check the offer against ALL quality criteria:

| Area | Criterion | Status | Notes |
|------|----------|--------|-------|
| Value Design | All problems mapped (before/during/after)? | | |
| Value Design | Every problem has a solution? | | |
| Value Design | Value Equation scored? | | |
| Enhancement | Enhancement levers present? | | |
| Enhancement | M.A.G.I.C. naming applied? | | |
| Offer Structure | Offer type classified? | | |
| Offer Structure | CUB Test passed? | | |
| Offer Structure | Benefit bullets follow format? | | |
| Offer Structure | Pitch is 100-200 words? | | |
| Offer Structure | Micro-step flow designed? | | |
| Confidence | All 6 Pillars addressed? | | |
| Confidence | The Gap mapped? | | |
| Confidence | 3 Pools of Confidence filled? | | |
| Confidence | Action Threshold favorable? | | |
| Confidence | Latent Conditions addressed? | | |
| Confidence | Factors of Value for each component? | | |

OUTPUT 2: COMPETITOR ANALYSIS
Use web search to find 3-5 competitor offers in the same space.
For each: name, price, what they offer, strengths, weaknesses.
Compare against our offer — where do we win? Where are we vulnerable?

OUTPUT 3: GAPS & WEAKNESSES
List any remaining gaps, weaknesses, or risks in the offer.
For each: the issue, severity (high/medium/low), and a specific fix recommendation.

Be genuinely critical. A rubber-stamp helps nobody.
```

---

### Phase 6: Write Final Workbook (Main)

**Step 1: Incorporate validation feedback.**
Fix any high-severity issues flagged in Phase 5. Note medium/low issues in the validation section.

**Step 2: Write the final workbook.**

Output path: `outputs/tvml-offer-workbook-[offer-name-slug].md`

Use the slug from the chosen M.A.G.I.C. name (lowercase, hyphens). Example: `outputs/tvml-offer-workbook-gym-owners-90-day-revenue-accelerator.md`

**Step 3: Run the quality checklist** (see below) before saving.

---

## Output Format

The final workbook follows this 10-part structure:

```markdown
# Offer Workbook — [Offer Name]
## [Business Name]

Generated: [date]
Avatar Source: [path to avatar workbook used]
TVML Offer Builder

---

## Part 1: Foundation

### 1.1 The Dream Outcome
[Viscerally specific description of the ideal result, in the customer's language]

### 1.2 The Gap
**Current Situation:** [painful present reality]
**Desired Situation:** [dream future state]
**The Bridge:** [how this offer closes the gap]

### 1.3 Offer Type Classification
[Consultation or Ready-Now — with rationale]
[Easy acquisition/hard product assessment]

---

## Part 2: The Problem Universe

### 2.1 Problems BEFORE They Start
[Numbered list with pain pool classification]

### 2.2 Problems DURING the Process
[Numbered list with pain pool classification]

### 2.3 Problems AFTER Achievement
[Numbered list with pain pool classification]

### 2.4 Pain Depth Map
[Summary table: problem count per 5 Pools of Pain]
[Latent Conditions identified]

---

## Part 3: Solutions & Delivery

### 3.1 Solution Matrix
| # | Problem | Pain Pool | Solution | Delivery Vehicle | Type |
|---|---------|-----------|----------|-----------------|------|
[Complete table — every problem has a solution]

### 3.2 Delivery Model
[Overall delivery approach with rationale]

---

## Part 4: The Value Stack

### 4.1 Core Offer Components
| Component | Description | Perceived Value | Value Equation Score |
|-----------|-------------|-----------------|---------------------|
[Named components with values]

### 4.2 Value Equation Score
V = (Dream Outcome [x/10] x Perceived Likelihood [x/10]) / (Time Delay [x/10] x Effort [x/10])
Overall Score: [number]

### 4.3 7 Essential Elements Check
| Element | Status | Details |
|---------|--------|---------|
[All 7 elements verified]

### 4.4 Factors of Value
[For each component: the 7-question value argument]

---

## Part 5: Enhancement Levers

### 5.1 Scarcity
[Mechanism, rationale, implementation]

### 5.2 Urgency
[Trigger, rationale, implementation]

### 5.3 Bonuses
| Bonus Name | What It Is | Objection It Addresses | Perceived Value |
|------------|-----------|----------------------|-----------------|
[2-4 bonuses]

### 5.4 Guarantee
**Type:** [classification]
**Wording:** "[exact guarantee language]"
**Conditions:** [if applicable]
**Rationale:** [why this type]

---

## Part 6: Confidence & Proof Engineering

### 6.1 Three Pools of Confidence
| Pool | Strength (1-10) | Current Evidence | Gaps | Fixes |
|------|-----------------|-----------------|------|-------|
| Vehicle | | | | |
| You/Provider | | | | |
| Themselves | | | | |

### 6.2 Action Threshold Calculation
**Desire for Outcome:** [x/10]
**Pain of Current Situation:** [x/10]
**Total Drive:** [sum]

| Friction Factor | Score (1-10) |
|----------------|-------------|
| Confusion | |
| Skepticism | |
| Fear of waste | |
| Past failures | |
| Perceived effort | |
| Social risk | |
| **Total Friction** | |

**Verdict:** [Drive vs Friction — pass/fail + top fixes]

---

## Part 7: Offer Packaging

### 7.1 Offer Name
**Chosen:** [name]
**M.A.G.I.C. Score:** M[y/n] A[y/n] G[y/n] I[y/n] C[y/n]
**Alternatives considered:** [2-4 others]

### 7.2 Headline
[One-line value proposition]

### 7.3 The Pitch
[100-200 word complete offer summary]

### 7.4 Benefit Bullets
[5-7 formatted bullets]

### 7.5 Tangible Bonus / Ethical Bribe
[Name, format, contents, value, connection to offer]

### 7.6 Micro-Step Funnel Flow
[6-step flow with details for each stage]

---

## Part 8: Pricing & Differentiation

### 8.0 Commodity Differentiation (Speed/Risk/Ease)
| Vector | This Offer | Competitor 1 | Competitor 2 | Competitor 3 |
|--------|-----------|-------------|-------------|-------------|
| Speed | | | | |
| Risk | | | | |
| Ease | | | | |
**Lead Vectors:** [which 1-2 to lead with and why]

### 8.1 Price Point
**Price:** $[amount] / [period]
**Rationale:** [why this price]

### 8.2 Value-to-Price Ratio
**Total Perceived Value:** $[amount]
**Price:** $[amount]
**Ratio:** [x]:1

### 8.3 Pricing Psychology
[Anchoring, contrast, positioning notes]

### 8.4 80/20 Pricing Fractal
| Tier | Price | Expected Uptake |
|------|-------|----------------|
| Base | $[amount] | 100% |
| 5x Premium | $[amount] | ~20% |
| 25x Ultra | $[amount] | ~4% |

### 8.5 Prepayment & Billing
**Recommended billing:** [weekly/monthly/quarterly]
**Prepayment structure:** [guarantee+prepay / layaway / BNPL / N/A]
**Rationale:** [why this fits]

---

## Part 9: CUB Test

| Test | Question | Result | Notes |
|------|----------|--------|-------|
| Confusing? | Can a 10-year-old understand it? | | |
| Unbelievable? | Any claims without proof? | | |
| Boring? | Does it stand out from competitors? | | |

---

## Part 10: Validation Notes

### 10.1 Framework Compliance
[Full compliance table from Phase 5]

### 10.2 Competitor Analysis
[3-5 competitors with comparison]

### 10.3 Gaps & Recommendations
[Remaining issues with severity and suggested fixes]

---

## Quick Reference Card

**Offer:** [Name]
**For:** [Avatar in one line]
**Dream Outcome:** [One sentence]
**Price:** $[amount]
**Guarantee:** [One sentence]
**CTA:** [One sentence]
**Headline:** [One line]
**Top 3 Value Stack Items:** [Bulleted]
```

---

## Agent Architecture

```
Phase 1: Read reference files + avatar workbook (main)
    |
Phase 2: Sequential foundation agents
    |
    +-- Agent 2A: Dream Outcome & Problem Universe
    |       | (output feeds 2B)
    +-- Agent 2B: Solutions & Delivery Vehicles
    |
Phase 3: Parallel offer engineering agents
    |
    +-- Agent 3A: Value Stack & Pricing ----+
    +-- Agent 3B: Enhancement Levers & Proof +-- (all 3 in parallel)
    +-- Agent 3C: Offer Copy & Naming ------+
    |
Phase 4: Assemble + CUB Test + cross-check (main)
    |
Phase 5: Validation agent (stress-test)
    |
Phase 6: Write final workbook (main)
```

Total agents: 6 (2 sequential + 3 parallel + 1 validation)

---

## Skill Chain

| Step | Skill | Produces |
|------|-------|---------|
| 1 | tvml-avatar | Customer avatar workbook |
| **2** | **tvml-offer (here)** | **Core offer workbook** |
| 3 | tvml-money-models | Money model workbook |

Previous: Requires avatar workbook from tvml-avatar.
Next: "Offer ready. Say *build a money model* to run tvml-money-models."

---

## Quality Checklist

Before saving the final workbook, verify:

- [ ] Avatar workbook was read and language was used throughout
- [ ] Dream Outcome is viscerally specific (not generic)
- [ ] Problem Universe covers BEFORE, DURING, and AFTER
- [ ] Every problem has a corresponding solution in the matrix
- [ ] Value stack components are named with perceived values
- [ ] Value Equation is scored numerically
- [ ] All 7 Essential Elements are present
- [ ] Factors of Value completed for each value stack component
- [ ] Scarcity and urgency are genuine (not manufactured)
- [ ] Each bonus addresses a specific avatar objection
- [ ] Guarantee type matches the offer type
- [ ] All 3 Confidence Pools assessed with gaps identified
- [ ] Action Threshold calculation shows favorable drive-to-friction ratio
- [ ] Offer name scores 4+ on M.A.G.I.C.
- [ ] The Pitch is 100-200 words and sounds conversational
- [ ] Benefit bullets follow headline + explainer format
- [ ] Micro-step funnel has 6 stages with transitions
- [ ] CUB Test passed (not confusing, not unbelievable, not boring)
- [ ] Competitor analysis completed via web search
- [ ] Framework compliance table has no critical gaps
- [ ] Commodity Problem vectors scored (Speed/Risk/Ease) vs. competitors
- [ ] 80/20 pricing fractal considered with specific tier prices
- [ ] Guarantee + prepayment structures evaluated
- [ ] Premium vs Free vs Discount decision tree applied
- [ ] Output saved to `outputs/tvml-offer-workbook-[slug].md`
- [ ] Quick Reference Card is populated at the end

---

## Error Handling

**Avatar workbook not found:**
- Search `outputs/` for any file matching `*avatar*`
- Search sibling repos for `*avatar*`
- Ask the user: "I need an avatar workbook to build the offer. Run tvml-avatar first, or point me to an existing one."

**Business context files missing:**
- Skip gracefully — the avatar workbook alone is sufficient
- Note in the workbook header which context files were available

**Agent fails or produces incomplete output:**
- Re-run the specific agent with the same inputs
- If it fails again, proceed with available data and flag the gap in Part 10

**Phase 3 agents produce conflicting recommendations:**
- The main thread (Phase 4) resolves conflicts by prioritizing:
  1. Avatar language and pain points (always wins)
  2. Internal consistency of the offer
  3. Framework best practices

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Avatar workbook too thin | Ask user for more detail on their customer, or run tvml-avatar first |
| Value stack feels generic | Go back to the problem universe — are problems specific enough? |
| CUB Test keeps failing | Usually a clarity issue — simplify the offer, cut jargon |
| Price feels arbitrary | Re-check value-to-price ratio and avatar's income/pain level |
| Guarantee feels risky | Consider conditional over unconditional, or service over results |
| Naming doesn't click | Generate 10 more options, test with the CUB lens |

---
name: mos-avatar
description: "Build a customer avatar workbook from your business reference files. 10-section avatar with parallel agent generation, validation, and optional image generation. Use when: (1) Creating a customer avatar for a business (2) User says customer avatar, dream customer, target market, avatar workbook, who is my customer (3) Rebuilding or updating an existing avatar with new reference material."
---

# TVML Customer Avatar Builder

Build a complete customer avatar workbook from business reference files using parallel agents.

> Built on The Vibe Marketing Lab's proprietary customer research methodology.

---

## What This Skill Does

Takes a business's reference files (soul, offer, audience, voice, testimonials) and produces a complete, validated customer avatar workbook with an optional AI-generated avatar image.

Uses **3 parallel agents** for section generation and **1 validation agent** for fact-checking -- keeping the main conversation lean while producing deeper, more focused output per section.

**Output:** `outputs/mos-avatar-workbook.md` + `outputs/avatar-{name}.jpg`

---

## Prerequisites

The business repo MUST have `reference/core/` populated with at least:
- `soul.md` -- Founder's story, why the business exists
- `offer.md` -- What they sell, pricing, delivery model
- `audience.md` -- Who they serve (existing knowledge)

**Ideal but not required:**
- `voice.md` -- Brand voice and tone
- `reference/proof/testimonials.md` -- Real customer testimonials
- Sales call transcripts, questionnaire responses, NPS surveys

**For image generation:**
- `GOOGLE_API_KEY` set in `~/.config/vip/env.sh`
- `google-genai` and `Pillow` Python packages installed

---

## Workflow

### Phase 1: Read & Understand (Main Conversation)

Read ALL available reference files before spawning agents:

```
reference/core/soul.md
reference/core/offer.md
reference/core/audience.md
reference/core/voice.md (if exists)
reference/proof/testimonials.md (if exists)
reference/proof/angles/ (if exists)
```

Also read `references/avatar-framework.md` from this skill's directory for deeper methodology context on each section.

Understand:
- Who the founder is and what drives them
- What the offer is and how it's priced
- Who the current audience is (demographics, psychographics)
- How the brand speaks (tone, cadence, key phrases)
- What real customers have said (pain language, praise language)

**Prepare a context bundle** -- a compact summary of ALL reference file content that will be passed to each agent. Include the full text of testimonials and audience files (these contain the customer language agents need). Keep soul/offer/voice to key details only.

### Phase 2: Generate Avatar Sections (3 Parallel Agents)

Spawn **3 parallel agents** using the Agent tool. Each agent receives the context bundle and generates its assigned sections. All agents are **read-only** -- they return their section content as text. The main conversation assembles the final workbook.

**Why agents:** Each agent focuses deeply on 3-4 sections with its full context window, producing richer output than a single pass across all 10 sections. Heavy reference content stays in agent windows, keeping the main conversation lean for assembly and quality control.

#### Agent A: Identity & Emotional Core (Sections 1-4)

```
Spawn Agent (subagent_type: "general-purpose"):
  Description: "Avatar sections 1-4"
  Prompt: |
    You are writing sections 1-4 of a customer avatar workbook.

    CONTEXT (from business reference files):
    [Insert context bundle here]

    SECTIONS TO WRITE:

    ## 1. Dream Client Name + Photo
    - Give the avatar a realistic first name
    - Write a 1-sentence description of what they'd look like in a photo
    - Third person voice

    ## 2. Demographics
    - Gender, Age range, Location, Education, Occupation, Income range
    - Factual bullets, grounded in reference files
    - Flag any demographics you inferred (not stated in reference files)

    ## 3. Crappy "Before State"
    - 150-250 word flowing narrative in FIRST PERSON, present tense
    - Write as the customer's inner monologue -- how they feel RIGHT NOW
    - Formula: stuck + how it feels + consequences
    - Use exact phrases from testimonials and audience files
    - This is a narrative paragraph, NOT bullet points

    ## 4. Dream Outcome
    - 1 clear sentence stating the transformation
    - Then a 100-150 word narrative in first person, present tense
    - Describe life AFTER the transformation -- specific, emotional, vivid

    WRITING RULES:
    - Use the customer's language, not marketing jargon
    - Pull exact phrases from testimonials when available
    - Never invent facts -- flag inferences with [inferred]
    - Before State and Dream Outcome are flowing narratives, not bullets

    Return ONLY the markdown content for sections 1-4. No commentary.
```

#### Agent B: Pain & Goals (Sections 5-7)

```
Spawn Agent (subagent_type: "general-purpose"):
  Description: "Avatar sections 5-7"
  Prompt: |
    You are writing sections 5-7 of a customer avatar workbook.

    CONTEXT (from business reference files):
    [Insert context bundle here]

    SECTIONS TO WRITE:

    ## 5. Top 5 Pain Points
    - Each: Bold headline (3-7 words) + 1-2 sentence explainer
    - Written in the customer's voice -- their words, their frustration
    - "Dog whistle" language that makes them think "that's exactly my problem"
    - Ground in testimonials, audience files, and real market research

    ## 6. Top 5 Goals
    - Each: Bold headline (3-7 words) + 1-2 sentence explainer
    - Include both spoken goals (what they'd tell a friend) and unspoken goals (what they secretly want)
    - WIIFM test: each goal answers "What's in it for me?"

    ## 7. 5 Buyer Decision Questions
    - Each: Bold headline (3-7 words) + 1-2 sentence explainer
    - These are the questions running through the customer's mind before buying
    - Think: "What would a digital salesperson need to answer?"
    - Order by priority -- address the biggest hesitation first

    WRITING RULES:
    - Use the customer's language, not marketing jargon
    - Pull exact phrases from testimonials when available
    - Never invent facts -- flag inferences with [inferred]
    - All items use the same format: **Bold Headline** + explainer

    Return ONLY the markdown content for sections 5-7. No commentary.
```

#### Agent C: Barriers & Awareness (Sections 8-10)

```
Spawn Agent (subagent_type: "general-purpose"):
  Description: "Avatar sections 8-10"
  Prompt: |
    You are writing sections 8-10 of a customer avatar workbook.

    CONTEXT (from business reference files):
    [Insert context bundle here]

    SECTIONS TO WRITE:

    ## 8. What Have They Tried Before
    - Each: Bold headline (3-7 words) + 1-2 sentence explainer
    - List 5 things the customer has already tried and WHY each failed
    - Matter-of-fact voice -- not their emotional voice, but objective
    - Use "why it failed" framing to differentiate the offer

    ## 9. Top 5 Roadblocks & Objections
    - Each: Bold headline (3-7 words) + 1-2 sentence explainer
    - Written in the customer's voice -- their actual hesitations
    - Objections are buying signals -- these are people who WANT to buy but need reassurance
    - Common patterns: time, money, trust, past failure, complexity

    ## 10. Stage of Awareness
    - Use Eugene Schwartz's framework
    - Write each stage in FIRST PERSON as the customer's inner monologue:
      - **Problem Aware:** They know the pain but not the solution
      - **Solution Aware:** They know solutions exist but not yours
      - **Product Aware:** They know your product but aren't convinced
      - **Most Aware:** They know and trust you, just need a nudge
    - Each stage: 2-3 sentences of inner monologue

    WRITING RULES:
    - Use the customer's language, not marketing jargon
    - Pull exact phrases from testimonials when available
    - Never invent facts -- flag inferences with [inferred]
    - Sections 8-9 use bold headline + explainer format

    Return ONLY the markdown content for sections 8-10. No commentary.
```

**Spawn all 3 agents in a single message** so they run in parallel.

### Phase 3: Assemble & Review (Main Conversation)

When all 3 agents return:

1. **Assemble** their outputs into the workbook structure (see Output Format below)
2. **Review for consistency** across sections:
   - Does the Before State pain match the Pain Points?
   - Do the Goals align with the Dream Outcome?
   - Do the Buyer Decision Questions address the Roadblocks?
   - Is the customer voice consistent across all agents' output?
3. **Fix any inconsistencies** -- adjust language, tone, or content so the avatar reads as one cohesive document
4. **Add the header** with business name and avatar name from Section 1

### Phase 4: Validate Claims (1 Agent)

Spawn **1 validation agent** to fact-check the assembled workbook:

```
Spawn Agent (subagent_type: "general-purpose"):
  Description: "Validate avatar claims"
  Prompt: |
    You are a fact-checker for a customer avatar workbook.

    WORKBOOK CONTENT:
    [Insert assembled workbook here]

    BUSINESS CONTEXT:
    [Insert brief business description -- offer, audience, industry]

    YOUR TASK:
    Run targeted web searches to cross-check key factual claims:

    1. Income/demographics claims (census data, industry reports)
    2. Market pricing claims (cost data, industry benchmarks)
    3. Pain point prevalence (surveys, review sites, Reddit threads)
    4. Competitive landscape claims (competitor pricing, reviews)

    For each claim you check, record:
    - The claim as stated
    - Verdict: Holds up / Needs softening / Doesn't hold up
    - Evidence source (URL or data point)
    - Recommended adjustment (if any)

    Return a markdown table:
    | # | Claim | Verdict | Evidence | Action Needed |
    |---|-------|---------|----------|---------------|

    Check at least 5-8 key claims. Focus on the most consequential ones
    (income figures, market sizes, pricing, prevalence stats).
```

When the validation agent returns, add its table as `## Validation Notes` at the bottom of the workbook. Fix any claims that don't hold up.

### Phase 5: Generate Avatar Image (Optional -- Main Conversation)

**Skip if `GOOGLE_API_KEY` is not configured.** Instead, leave the photo field as a description of what the image should depict and add a note about setup.

**If available:**

1. Craft a prompt describing the avatar person based on Section 2 demographics:
   - Match age, location feel, lifestyle cues
   - Casual, relatable -- NOT stock photo energy
   - Include environmental context (home style, suburb feel)
   - Specify: "Realistic photography style, warm tones, natural lighting"
   - Specify: "Square 1:1 aspect ratio"

2. Generate via Gemini Python SDK:
   - Model: `gemini-3.1-flash-image-preview` (Nano Banana 2.0 -- exact string, no substitutes)
   - Use `client.models.generate_content()` with a text prompt requesting the image
   - Extract image bytes from the response parts (check `part.inline_data.mime_type` for `image/`)
   - Save raw image bytes

3. Post-process:
   - Resize to 1920x1920 (LANCZOS)
   - Compress to JPEG under 300KB (quality stepping: 85 -> 75 -> 65 -> 55 -> 45)
   - Delete raw PNG
   - Save to `outputs/avatar-{name}.jpg`

4. Update workbook Section 1 with image reference: `![Name](avatar-{name}.jpg)`

### Phase 6: Write Final Workbook (Main Conversation)

Write the assembled, validated workbook to:

```
outputs/mos-avatar-workbook.md
```

Run the Quality Checklist before saving.

---

## Output Format

```markdown
# TVML Customer Avatar Workbook
## [Business Name]

---

## 1. Dream Client Name + Photo
## 2. Demographics
## 3. Crappy "Before State"
## 4. Dream Outcome
## 5. Top 5 Pain Points
## 6. Top 5 Goals
## 7. 5 Buyer Decision Questions
## 8. What Have They Tried Before
## 9. Top 5 Roadblocks & Objections
## 10. Stage of Awareness

---

## Validation Notes
```

---

## Agent Architecture Summary

```
Phase 1: Read reference files (main)
    |
Phase 2: Spawn 3 parallel agents
    |
    +-- Agent A: Sections 1-4 (Identity & Emotional Core)
    +-- Agent B: Sections 5-7 (Pain & Goals)
    +-- Agent C: Sections 8-10 (Barriers & Awareness)
    |
Phase 3: Assemble + cross-check consistency (main)
    |
Phase 4: Spawn 1 validation agent (fact-checking)
    |
Phase 5: Generate avatar image (main, optional)
    |
Phase 6: Write final workbook (main)
```

**Why this architecture:**
- **Parallel generation** -- 3 agents working simultaneously, each with deep focus on their sections
- **Read-only pattern** -- agents return content as text, main writes the file (avoids write persistence bug)
- **Context isolation** -- full reference files live in agent windows, main stays lean for assembly
- **Consistency review** -- main conversation reviews across all sections after agents return, catching cross-section issues no single agent could see

---

## Skill Chain

| Step | Skill | Produces |
|------|-------|---------|
| **1** | **mos-avatar (here)** | **Customer avatar workbook** |
| 2 | mos-offer | Core offer workbook |
| 3 | mos-money-models | Money model workbook |

Next: "Avatar ready. Say *build an offer* to run mos-offer."

---

## Quality Checklist

Before marking complete:

- [ ] All 10 sections written
- [ ] Before State is a flowing narrative (not bullets), 150-250 words
- [ ] Dream Outcome has both 1-sentence version and narrative
- [ ] Pain Points, Goals, Buyer Qs, Tried Before, Roadblocks use bold headline + explainer format
- [ ] Stage of Awareness covers all 4 stages in first person
- [ ] No invented facts -- everything traces to reference files or is flagged
- [ ] Cross-section consistency verified (pain matches goals, Before State matches Pain Points)
- [ ] Validation Notes section with real sources cited
- [ ] Any claims that don't hold up are flagged and corrected
- [ ] Avatar image generated (or placeholder with setup instructions)
- [ ] Voice matches the business's brand voice (check voice.md)

---

## Examples

### Example 1: Build avatar for your business

User says: "Build a customer avatar for my business"

Actions:
1. Read `reference/core/soul.md`, `offer.md`, `audience.md`, `voice.md`
2. Read `reference/proof/testimonials.md` if available
3. Prepare context bundle from all reference files
4. Spawn 3 parallel agents (sections 1-4, 5-7, 8-10)
5. Assemble outputs, review cross-section consistency
6. Spawn validation agent for fact-checking
7. Generate avatar image (if Gemini configured)
8. Write final workbook

Result: `outputs/mos-avatar-workbook.md` with validated 10-section avatar.

### Example 2: Rebuild avatar with new testimonials

User says: "I have new client testimonials, update the avatar"

Actions:
1. Read existing avatar workbook
2. Read new testimonials
3. Spawn agents for sections where new customer language adds specificity
4. Re-validate any changed claims
5. Note what changed in Validation Notes

Result: Updated workbook with richer customer language from real feedback.

---

## Troubleshooting

### Problem: Avatar reads too generic / "marketing speak"
**Cause:** Not enough real customer language in reference files.
**Solution:** Add real testimonials, survey responses, or sales call notes to `reference/proof/`. The more real language, the more specific the avatar.

### Problem: Validation finds claims that don't hold up
**Cause:** Assumptions made during avatar generation that don't match market reality.
**Solution:** The skill flags these automatically. Review the Validation Notes table and soften or correct any flagged claims.

### Problem: Agent outputs are inconsistent across sections
**Cause:** Each agent works independently and may interpret the customer voice differently.
**Solution:** Phase 3 (Assemble & Review) catches this. The main conversation reviews all sections together and adjusts tone/language for consistency before writing the final workbook.

### Problem: Image generation fails
**Cause:** `GOOGLE_API_KEY` not set, or `google-genai`/`Pillow` packages not installed.
**Solution:** Set the API key in `~/.config/vip/env.sh` and install packages: `pip install google-genai Pillow`. If skipped, a text description placeholder is used instead.

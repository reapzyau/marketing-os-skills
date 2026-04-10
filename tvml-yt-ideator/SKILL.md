---
name: tvml-yt-ideator
description: "Generate YouTube video ideas for The Vibe Marketing Lab with Skool flywheel integration. Each idea includes the video concept, Skool module mapping, lead magnet, and CTA copy. Use when: user says 'tvml video ideas', 'youtube ideas for tvml', 'what video should I make', 'content ideas', 'ideate videos', or wants help planning TVML YouTube content. Also use when the user mentions planning content that bridges YouTube and Skool."
---

# TVML YouTube Ideator

Generate and validate YouTube video ideas for The Vibe Marketing Lab. Every idea is a complete flywheel unit: YouTube video (TOFU) + Skool classroom module (MOFU) + lead magnet + CTA copy.

This is TVML-specific — it knows the audience, voice, competitors, and classroom structure. For general YouTube ideation, use `/rdg-yt-ideator` instead.

```
The Flywheel:
  YouTube video (discovery)
    → Skool module (depth + lead magnet)
      → Community engagement (social proof)
        → Vault (full system builds)

YouTube Production Line:
  /tvml-yt-ideator → /rdg-yt-thumbnail-creator → /rdg-yt-scripter → /rdg-yt-stimuli
       1. Ideate (YOU ARE HERE)   2. Thumbnail         3. Script           4. Stimuli
```

---

## Step 0: Load TVML Context

Read these files from the TVML repo (`/Users/richardmagallanes/Desktop/tvml-main-branch/`):

1. `reference/core/audience.md` — Jake avatar, pains, desires, objections
2. `reference/core/voice.md` — casual, Australian, anti-guru
3. `reference/domain/content-strategy.md` — pillars, targeting, title patterns, flywheel
4. `wiki/content/youtube/ai-youtuber-strategies.md` — competitor strategies + patterns

If any file is missing, note it and proceed with the hardcoded context below.

### Hardcoded TVML Context (always available)

**Channel:** Claude Code for marketers. Not for developers — for marketers, agency owners, and solopreneurs.

**Audience:** Marketers who know AI is important but are overwhelmed by noise. They've tried ChatGPT, hit limits. Can't code but want automation. Watching Nate Herk and Nick Saraev build massive audiences and wondering why they — with more marketing experience — are still invisible.

**Voice:** Casual, Australian, anti-guru. Like a knowledgeable mate over coffee. "I spent 3 hours testing this and here's what actually worked." Never "Unlock the power of AI to transform your marketing."

**Signature framework:** "Mini Company" — Claude Code as researcher, copywriter, strategist, developer rolled into one.

**Differentiator:** Richard is a real marketer (Prosperity Media, freelance clients) who happens to use AI. Competitors are automation demonstrators who happen to demo marketing. Real depth, not just workflows.

**Skool classroom (current courses):**

| # | Course | Status |
|---|--------|--------|
| 0 | Start Here (DON'T SKIP) | Live |
| 1 | Claude Code (Mini Company) | In progress |
| 2 | Claude Code + Web Design | Planned |
| 3 | Claude Code + SEO | Planned |
| 4 | Claude Code + YouTube | Planned |

---

## Interaction Pattern: Use AskUserQuestion for All Finite Choices

Throughout this skill, whenever a question has a finite set of answers, use the `AskUserQuestion` tool with the `options` parameter instead of freeform text. This gives Richard selectable buttons instead of typing. Use `multiSelect: true` when multiple answers are valid.

**Examples of when to use AskUserQuestion:**
- Choosing seed methods (Step 1)
- Classifying the request type (Step 1)
- Passion ratings on ideas (Step 4)
- Selecting which ideas to develop into flywheel cards (Step 7)
- Confirming whether to save / proceed to next step (Step 8)

**When NOT to use it:** Open-ended questions like "What problem did you solve this week?" — those stay freeform.

---

## Step 1: Classify the Request

If the user's intent isn't already clear from their message, ask using AskUserQuestion:

```
AskUserQuestion:
  question: "What kind of YouTube ideation do you need?"
  header: "Mode"
  options:
    - label: "Full batch (Recommended)"
      description: "5-10 ideas across pillars and rings with distribution balancing"
    - label: "Discipline-specific"
      description: "Ideas for one area — SEO, Web Design, YouTube, Ads, etc."
    - label: "Single idea deep dive"
      description: "Flesh out one concept into a full flywheel card"
    - label: "Validate an existing idea"
      description: "Score and develop something you already have in mind"
```

For batches, aim for the 40-40-20 ring distribution and 40-25-25-10 pillar split.

---

## Step 2: Seed Ideas

Ask Richard which methods to use via AskUserQuestion (multiSelect):

```
AskUserQuestion:
  question: "Which seed methods should I use to find ideas?"
  header: "Methods"
  multiSelect: true
  options:
    - label: "Problem-First Mining (Recommended)"
      description: "Mine your recent git log, Skool posts, and DMs for real problems you solved"
    - label: "Competitor Benchmark (Recommended)"
      description: "Scrape Nate Herk, Chase, Jack Roberts, Robonuggets for outliers to remix"
    - label: "SEO Gap Analysis"
      description: "Search YouTube for high-demand keywords with weak supply"
    - label: "Series / Multi-Disciplinary / Comments"
      description: "Recurring formats, cross-field ideas, or audience comment mining"
```

For TVML, Problem-First Mining and Competitor Benchmark are the highest-value starting points because Richard has real marketing work to draw from and the competitor landscape is well-mapped.

### A. Problem-First Mining — "What did Richard solve this week?"

The strongest TVML ideas come from real work. Mine these sources:

- `git log --oneline -20` in tvml-main-branch — what was built recently?
- `skool/posts/` — which posts got engagement? What are members asking?
- `raw/skool/dms/` — what are new members stuck on?
- Ask Richard: "What marketing problem did you solve with Claude Code this week?"

For each pain point, generate:
1. **The pain** — specific and relatable
2. **The solve** — what Claude Code did
3. **The angle** — how to frame for YouTube
4. **The Idiot Index** — "This costs $X from an agency. I built it in Y minutes." (when applicable)

### B. Competitor Benchmark — "What's working for Nate, Chase, Jack, Robo?"

Use yt-dlp to scrape recent videos from reference channels:

```bash
yt-dlp --flat-playlist --print "%(title)s ||| %(view_count)s" "https://www.youtube.com/@CHANNEL/videos" 2>/dev/null | head -30
```

**Reference channels (April 2026 data):**

| Channel | Subs | Handle | Top Pattern |
|---------|------|--------|-------------|
| Nate Herk | 644K | @nateherk | Authority courses (10hr = 400K views) |
| Jack Roberts | 186K | channel/UCxVxcTULO9cFU6SB9qVaisQ | Combo + dollar amounts ($10K websites = 442K) |
| Chase-H-AI | 97K | @chase-h-ai | Explainers ("6 Levels" = 114K) |
| Robonuggets | 132K | @robonuggets | Visual combos + per-video lead magnets |
| Nick Saraev | — | @nicksaraev | Long courses + hot takes |

Find outliers (5x+ channel average), extract topic + angle, remix for TVML's marketer audience.

### C. Outlier Mining

Same as Competitor Benchmark but with Apify for deeper data. Use when you need comment data or detailed metadata:

```bash
node --env-file="$HOME/.env" ~/.claude/skills/rdg-yt-scripter/scripts/run_actor.js \
  --actor "streamers/youtube-scraper" \
  --input '{"startUrls": [{"url": "CHANNEL_URL"}], "maxResults": 30, "sortBy": "date"}' \
  --output /tmp/yt-outlier-CHANNEL.json --format json
```

### D. SEO Gap Analysis

Search YouTube for marketing + AI keywords to find demand with weak supply:

```bash
yt-dlp --flat-playlist --print "%(title)s ||| %(view_count)s" "https://www.youtube.com/results?search_query=KEYWORD" 2>/dev/null | head -20
```

Look for: high-view topics with old/low-quality videos, question-format titles, missing "for marketers" angle.

### E. Series, Multi-Disciplinary, Comment Mining, Grab & Twist

Same methods as rdg-yt-ideator (see that skill for full details). Apply TVML's marketer audience lens to all outputs.

---

## Step 3: Classify Each Idea

Every idea gets classified on two axes before validation.

### Content Ring (40-40-20)

| Ring | % Target | Definition | TVML Example |
|------|----------|-----------|--------------|
| **Core** | 40% | Claude Code + Marketing (broad) | "The Mini Company: How One AI Runs My Marketing" |
| **Inner** | 40% | Claude Code + Specific Discipline | "Claude Code + Ahrefs = SEO Briefs That Write Themselves" |
| **Outer** | 20% | Claude Code + Broad Business | "How Small Businesses Build a Marketing Team for $20/Month" |

### Content Pillar (40-25-25-10)

| Pillar | % Target | Definition |
|--------|----------|-----------|
| **Technical Tutorial** | 40% | Deep Claude Code builds for marketing workflows |
| **AI News / Hot Take** | 25% | New features, tool updates, through a marketer's lens |
| **Systems / BTS** | 25% | Real implementations, journey docs, "how I use X to run Y" |
| **Vibe Coding** | 10% | Websites, apps, funnels — broadest reach (Outer ring) |

### Skool Course Mapping

Map each Inner Ring idea to the corresponding Skool course:

| Discipline | Skool Course | Example Topics |
|-----------|-------------|---------------|
| Web Design | Course 2: Claude Code + Web Design | Site builds, landing pages, Stitch, Nano Banana |
| SEO | Course 3: Claude Code + SEO | Briefs, audits, keyword research, Ahrefs workflows |
| YouTube | Course 4: Claude Code + YouTube | Scripting, thumbnails, ideation, channel management |
| Meta Ads | Future course | Ad copy, campaign builds, creative testing |
| LinkedIn | Future course | Post generation, engagement workflows |
| Content | Future course | Calendars, repurposing, daily posting |
| Email | Future course | Sequences, newsletters, deliverability |

If a topic doesn't map to an existing course, note it as "Future: Claude Code + {Discipline}".

---

## Step 4: Quick Filter

### Golden Idea Test

Present each raw candidate in a table, then ask Richard to filter using AskUserQuestion (multiSelect):

```
AskUserQuestion:
  question: "Which of these ideas can you talk about for 5-20 min off the top of your head AND would your audience care about?"
  header: "Golden Ideas"
  multiSelect: true
  options:
    - label: "[Idea 1 title]"
      description: "[Ring] — [1-line summary]"
    - label: "[Idea 2 title]"
      description: "[Ring] — [1-line summary]"
    - label: "[Idea 3 title]"
      description: "[Ring] — [1-line summary]"
    - label: "[Idea 4 title]"
      description: "[Ring] — [1-line summary]"
```

Use multiple AskUserQuestion calls if more than 4 ideas (max 4 options per question). Ideas not selected get parked.

### Creator Passion

After filtering, ask passion rating via AskUserQuestion for each surviving idea:

```
AskUserQuestion:
  question: "How excited are you about making '[Idea title]'?"
  header: "Passion"
  options:
    - label: "9-10: Need to make this"
      description: "Been thinking about it, can't wait to record"
    - label: "7-8: Genuinely interested"
      description: "Would enjoy making it"
    - label: "5-6: Meh, data-driven"
      description: "Can see why it works but not fired up"
    - label: "3-4: Would rather not"
      description: "Only if the numbers are overwhelming"
```

Ideas scoring 3-4 get flagged with a Passion Floor warning. Batch passion ratings together — ask for multiple ideas in one go if possible by presenting ideas as a table first, then asking "Any you'd rate below 7?"

### 9 Content Attributes Gut Check
Quick strong/medium/weak on each. Ideas with 3+ weak attributes get parked.

| Getting Attention | Holding Attention |
|-------------------|-------------------|
| TAM Resonance | Speed to Value |
| Idea Explosivity / Shock | Curiosity Amplitude |
| Emotional Magnitude | Absorption Rate |
| Novelty | Re-hook Rate |
| | Stickiness |

---

## Step 5: Validate with Data

For the top 5-10 surviving ideas, run YouTube search validation:

```bash
yt-dlp --flat-playlist --print "%(title)s ||| %(view_count)s" "https://www.youtube.com/results?search_query=KEYWORD" 2>/dev/null | head -20
```

Classify competition: Blue Ocean (0-5 videos) / Green Field (5-15) / Red Ocean (20+) / Dead Zone (many low-view).

Optionally cross-reference with Google Trends via Apify (present cost estimate first).

---

## Step 6: Score & Rank

Score each idea on 8 dimensions (same as rdg-yt-ideator). See `references/scoring-matrix.md` for calibration.

| Dimension | Weight |
|-----------|--------|
| TAM Resonance | 20% |
| Shock Score | 15% |
| Content Ring Fit | 15% |
| Competition Gap | 15% |
| Creator Passion | 10% |
| Outlier Proof | 10% |
| Trend Direction | 10% |
| Evergreen Potential | 5% |

---

## Step 7: Develop Top Ideas — The Flywheel Card

This is where tvml-yt-ideator differs from rdg-yt-ideator. For each top idea, produce a complete **Flywheel Card** — everything needed to execute the video AND its Skool integration.

### The Flywheel Card Format

```markdown
## [Idea Name] — Score: XX/100

### Video
- **Ring:** Core / Inner / Outer
- **Pillar:** Technical Tutorial / AI News / Systems-BTS / Vibe Coding
- **Title Options** (3, each 49 chars max, 2.2+ viral elements):
  1. [Title] — Elements: [list]
  2. [Title] — Elements: [list]
  3. [Title] — Elements: [list]
- **Title Archetype:** Combo / Course / Hot Take
- **Thumbnail Concept:** [3 elements max, dark mode optimized]
- **Hook Direction:** [1 of 9 types with rationale]
- **Grand Payoff (TTS):**
  - Target: [who]
  - Transformation: [what they become]
  - Stakes: [what happens if they don't watch]

### Skool Integration
- **Maps to Course:** [Course # and name]
- **Module Lessons** (1-3):
  1. [Lesson title — what it teaches beyond the video]
  2. [Lesson title]
  3. [Lesson title] (if needed)
- **Lead Magnet:** [Specific named asset — skill file, template, checklist]
  - What it is: [1-sentence description]
  - Format: [.md skill file / Google Sheet / PDF checklist / etc.]

### CTA Copy
- **In-video (native embed):** "[spoken CTA woven into content]"
- **Video description:**
  ```
  Want the [LEAD MAGNET NAME]? Get it free inside the community:
  https://www.skool.com/the-vibe-marketing-lab/about
  ```
- **Skool announcement post:** [1-2 sentence post for the community tab]

### Validation Data
- **Competition:** [Blue/Green/Red/Dead Ocean]
- **Trend:** [Growing/Stable/Seasonal/Declining]
- **Outlier Proof:** [Reference if exists]
```

### Title Archetype Selection

Choose the archetype that fits the idea's ring and pillar:

| Archetype | Formula | Best For |
|-----------|---------|----------|
| **Combo** | `Claude Code + {Tool} = {Result}` | Inner Ring technical tutorials. Discovery engine. |
| **Course** | `{Topic} Clearly Explained` | Core authority plays. Depth content. |
| **Hot Take** | `{Feature} Just {Big Claim}` | AI News pillar. Algorithm freshness. |

**Additional proven patterns:**
- "How I Use X to Run My Y" — Systems/BTS pillar
- "I Built X with Y" — Technical tutorial proof
- Time challenge ("in X minutes") — Showmanship
- "You Don't Need X — You Need Y" — Contrarian/hot take

### Lead Magnet Design

Every lead magnet must be:
1. **Specific** — not "resources" or "templates." Name the actual thing: "The SEO Brief Skill File"
2. **Immediately useful** — they can use it within 10 minutes of downloading
3. **Created as a byproduct** — it's something Richard already built or uses. Not manufactured for the video.
4. **Lives in the Skool module** — attached to a lesson in the corresponding course

**Common lead magnet types for TVML:**

| Type | Example | When to Use |
|------|---------|-------------|
| Claude Code skill file (.md) | "The SEO Brief Skill" | Technical tutorials showing a skill in action |
| Template/checklist | "The GBP Audit Checklist" | How-to or audit content |
| CLAUDE.md snippet | "The Marketing CLAUDE.md Starter" | Setup or config content |
| Workflow JSON | "The Content Calendar Automation" | n8n or automation content |
| Swipe file | "30 LinkedIn Post Templates" | Content creation tutorials |

---

## Step 8: Present Shortlist

Output the complete flywheel cards ranked by score. Then present the distribution check:

### Distribution Check

```
Ring Balance (target 40/40/20):
  Core: X ideas (Y%)
  Inner: X ideas (Y%)
  Outer: X ideas (Y%)

Pillar Balance (target 40/25/25/10):
  Technical: X ideas (Y%)
  AI News: X ideas (Y%)
  Systems/BTS: X ideas (Y%)
  Vibe Coding: X ideas (Y%)

Skool Course Coverage:
  Course 2 (Web Design): X ideas
  Course 3 (SEO): X ideas
  Course 4 (YouTube): X ideas
  Future courses: X ideas
```

Flag any imbalances and suggest adjustments.

### Idea Selection

After presenting all flywheel cards, ask Richard which to take forward using AskUserQuestion (multiSelect):

```
AskUserQuestion:
  question: "Which ideas should I save to the shortlist?"
  header: "Shortlist"
  multiSelect: true
  options:
    - label: "#1 [Idea title] (Score: XX)"
      description: "[Ring] / [Pillar] — [Lead magnet name]"
    - label: "#2 [Idea title] (Score: XX)"
      description: "[Ring] / [Pillar] — [Lead magnet name]"
    - label: "#3 [Idea title] (Score: XX)"
      description: "[Ring] / [Pillar] — [Lead magnet name]"
    - label: "All of them"
      description: "Save the full batch as-is"
```

Use multiple AskUserQuestion calls if more than 4 ideas.

### Handoff

After selection, ask about next step:

```
AskUserQuestion:
  question: "What do you want to do next?"
  header: "Next step"
  options:
    - label: "Save & move to thumbnails (Recommended)"
      description: "Save shortlist to youtube/ folder, then run /rdg-yt-thumbnail-creator"
    - label: "Save only"
      description: "Save shortlist to youtube/ folder, stop here"
    - label: "Script first idea now"
      description: "Skip thumbnail, go straight to /rdg-yt-scripter for the #1 pick"
    - label: "Iterate on ideas"
      description: "Refine, add, or remove ideas before saving"
```

### Save Location

Save to: `/Users/richardmagallanes/Desktop/tvml-main-branch/youtube/YYYY-MM-DD-ideation-batch/`
- `shortlist.md` — the flywheel cards
- `idea-bank.md` — full idea bank (Golden / Sub-Optimal / Created / Parked)

---

## Step 9: Lab-to-Factory Cycle

Same framework as rdg-yt-ideator:
- **Lab** = ideation experiments (this session). 30% of output.
- **Factory** = variations of proven formats. 70% of output.

When a TVML video hits outlier status (5x+ channel average):
1. Identify which Content Legos drove the win
2. Hold Topic + Hook Structure, swap the other 5
3. Generate 5-10 Factory variations
4. Each variation still gets the full flywheel card treatment (Skool module + lead magnet)

---

## Quality Checklist

### Ideas
- [ ] Golden Idea Test applied to all candidates
- [ ] 9 Content Attributes gut-checked
- [ ] Ring classification on every idea
- [ ] Pillar classification on every idea
- [ ] Skool course mapping on every idea

### Flywheel Cards
- [ ] 3 title options per idea, 49 chars max, 2.2+ viral elements
- [ ] Title archetype selected (Combo / Course / Hot Take)
- [ ] Thumbnail concept: 3 elements max, dark mode
- [ ] Lead magnet is specific and named (not generic "resources")
- [ ] Skool module with 1-3 lesson titles
- [ ] CTA copy for video description
- [ ] In-video native embed CTA written

### Distribution
- [ ] Ring balance checked against 40/40/20 target
- [ ] Pillar balance checked against 40/25/25/10 target
- [ ] Skool course coverage across disciplines
- [ ] No more than 3 consecutive Core ring ideas (needs Inner/Outer variety)

### Handoff
- [ ] Clear ranking with scores
- [ ] Next step in production line stated
- [ ] Output saved to tvml-main-branch/youtube/

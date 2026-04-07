# Repurpose Playbook

Turn one piece of long-form content into 5-10+ LinkedIn posts. Adapted from Matt Gray's Thread System and Justin Welsh's template recycling approach.

---

## Core Principle

One long-form piece = many social posts. The long-form does the thinking. Social does the distribution.

**Sources that work for repurposing:**
- Newsletter issues
- Blog posts / articles
- YouTube scripts or transcripts
- Podcast transcripts
- Course content or workshop recordings
- Research files
- Decision files with rationale
- VSL scripts

---

## Extraction Types

When reading source material, extract these nugget types:

| Nugget Type | What to Look For | Best Framework |
|-------------|-----------------|----------------|
| **Key Insight** | A non-obvious conclusion or realization | Hot Take, Story + Lesson |
| **Framework** | A repeatable process or system | Framework Share |
| **Quote** | A memorable one-liner or principle | Standalone LinkedIn post |
| **Data Point** | A specific number, stat, or result | Educational List, Authority hook |
| **Story Beat** | A narrative moment with tension/resolution | Story + Lesson, Biggest Mistake |
| **Contrarian Take** | Something that challenges conventional wisdom | Old Way vs New Way, Hot Take |
| **Actionable Tip** | Something the reader can do immediately | Educational List, Do These X Things |
| **Analogy/Metaphor** | A comparison that makes a concept click | LinkedIn post |

---

## Repurpose Workflow

### Step 1: Ingest

Read the source material. Flag every potential nugget with its type.

### Step 2: Extract

Pull out 5-10 nuggets. For each nugget, note:
- The core idea in one sentence
- Which extraction type it is
- Which framework fits best

### Step 3: Generate

For each nugget, generate a LinkedIn post using the matched framework + template.

### Step 4: Adapt

Not every nugget needs a post — some are better suited as first comments or supporting context within another post.

---

## Waterfall Pattern

Start with the highest-effort format and cascade down:

```
Long-form source (newsletter, blog, video)
    |
    +-- LinkedIn Post (expanded narrative version of the core insight)
    |
    +-- Additional LinkedIn Posts (2-3 from different angles)
    |
    +-- First Comments (CTAs, links, additional context)
```

**Key insight:** ANY long-form piece can be the source. The source does the thinking — LinkedIn does the distribution.

---

## Repurpose Rules

1. **One nugget = one post.** Don't cram multiple insights into one social post.
2. **The best nuggets become the longest posts.** If an insight has 3+ sub-points, expand it fully.
3. **Space out repurposed content.** Don't post 5 versions of the same newsletter on the same day.
4. **Nobody remembers your content like you do.** (Welsh) Repurpose freely — most people didn't see it the first time.
5. **Add new context.** When repurposing, add a personal angle, updated data, or fresh example. Don't just compress.

---

## Source-Specific Extraction Tips

### From Newsletters
- The thesis statement -> Hot Take or Old Way vs New Way
- Each section heading -> standalone post topic
- Any numbered list -> Educational List post
- The personal story -> Story + Lesson post
- The CTA -> usually skip (too promotional for social)

### From YouTube Scripts / Transcripts
- The hook -> test as LinkedIn hook
- Each main point -> standalone post
- Any "here's what most people get wrong" -> Biggest Mistake or Hot Take
- Step-by-step sections -> Educational List
- Stories and anecdotes -> Story + Lesson

### From Research Files
- Key findings -> Educational List or Data Point posts
- Decisions made -> Story + Lesson (the decision journey)
- Frameworks discovered -> Framework Share
- Contrarian findings -> Hot Take or Old Way vs New Way

### From VSL Scripts
- The problem statement -> Enemy-Driven hook
- The mechanism -> Framework Share
- Testimonial themes -> Story + Lesson (anonymized)
- The offer stack -> Do These X Things (value framing)

---

## Output Format for Repurpose Batches

Each repurpose session produces a batch file:

```yaml
---
type: output
format: social-repurpose
date: YYYY-MM-DD
status: draft
platform: linkedin
source: [path to source file or description]
---
```

Posts are numbered within the batch. Each post includes:
- Source nugget (what was extracted)
- Framework used
- The post content
- First comment
- Angle connection (if applicable)

---

## Quality Check for Repurposed Posts

Before finalizing:
- [ ] Each post stands alone — reader doesn't need the source to understand it
- [ ] Hook is strong enough on its own (not dependent on source context)
- [ ] Voice matches — sounds like the creator, not a summarizer
- [ ] No AI tells ("delve into", "game-changer", "unlock")
- [ ] LinkedIn formatting is correct (line breaks, no links in body, under 3000 chars)
- [ ] Posts are spaced enough that they don't feel repetitive on the same day

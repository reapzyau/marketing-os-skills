---
name: mos-x-post
description: "Generate X/Twitter posts from topics or repurpose long-form content into X posts. Use when: user says 'X post', 'tweet', 'thread', 'twitter post', 'write a thread', 'repurpose this into tweets', 'social content for X'. For LinkedIn posts, use /mos-linkedin-post."
---

# X Posts

Generate X/Twitter posts from topics, or repurpose long-form content into X post batches.

---

## Triage

Detect if user is in the right place:

| User Says | They Want | Route To |
|-----------|-----------|----------|
| "X post", "tweet", "thread", "twitter post" | X posts | Continue here |
| "repurpose this", "turn this into tweets", "break this down for X" | Repurpose long-form | Continue here (Repurpose mode) |
| "linkedin post", "linkedin thread" | LinkedIn posts | `/mos-linkedin-post` |
| "skool post", "community post", "daily post" | Skool community | Skool post skill |
| "reel", "tiktok", "carousel", "instagram post" | Short-form video / IG | Organic content skill |
| "ad", "meta ad", "facebook ad" | Paid ads | Ads skill |

**If wrong place:**
> "Sounds like you want [X]. That's handled by [skill]. Should I switch you over?"

---

## Context Loading

### Load reference files

Look for these files in the current working directory:

**Required:**
- `reference/core/voice.md` — tone, vocabulary, formatting rules
- `reference/core/offer.md` — product, mechanism, funnel
- `reference/core/audience.md` — who, pains, desires, objections

**Recommended:**
- `reference/domain/content-strategy.md` — pillars, platform strategy, hooks library
- `reference/core/soul.md` — identity, energy, purpose

**On-demand:**
- `reference/proof/angles/*.md` — messaging angles to connect posts to
- `reference/proof/testimonials.md` — social proof for authority posts

**Missing required files?** Tell the user what's missing. At minimum, `voice.md` must exist before generating — without it the output won't match the creator's tone.

**Transparency:** Before generating, briefly state which reference files you loaded.

---

## Mode Detection

Detect which mode based on user input:

| Signal | Mode |
|--------|------|
| User provides a topic, question, or idea | **Topic mode** |
| User provides a file path, pastes content, or says "repurpose" | **Repurpose mode** |
| User says "write a thread about X" | **Topic mode**, format = X thread |
| User says "tweet about X" | **Topic mode**, format = X single |
| User says "turn this newsletter into tweets" | **Repurpose mode** |

If unclear, ask: "Are you starting from a topic, or do you have existing content to repurpose?"

---

## Topic Mode

### Step 1: Topic Selection

**If user provided a topic:** Use it directly.

**If no topic provided:** Check these sources and suggest:
1. `reference/domain/content-strategy.md` — suggest pillar-aligned topics
2. `reference/proof/angles/*.md` — suggest angle-based topics
3. Recent `research/` files — suggest topics from recent thinking work

Present 3-5 topic suggestions. Let user pick or provide their own.

### Step 2: Format Selection

Ask which format:
- **X single** — punchy, under 280 chars
- **X thread** — tutorial/listicle format, 5-12 tweets

If user already specified ("write a thread"), skip this step.

### Step 3: Framework Selection

Read [references/post-frameworks.md](references/post-frameworks.md) for the 9 frameworks.

Based on the topic, recommend 2-3 best-fit frameworks with a one-line explanation of why each fits. Let the user pick.

**Framework quick-match:**
| Topic Type | Best Frameworks |
|------------|----------------|
| Data, research, analysis | Research/Data Share (highest performer) |
| Tips, advice, how-to | Educational List, Do These X Things |
| Personal experience | Story + Lesson, Biggest Mistake |
| Challenging norms | Old Way vs New Way, Hot Take |
| Showing your process | Framework Share |
| Creating debate | Two Types of People, Hot Take |

### Step 4: Hook Selection

Read [references/hooks-library.md](references/hooks-library.md).

Generate 3 hook options using formulas from the matching hook categories. Present them and let the user pick or request alternatives.

**Hook rules:**
- X single: The hook IS the tweet (or the most important line)
- X thread: First tweet is the hook — it determines whether anyone reads the rest
- Write the hook first. It's 80% of the post's success.

### Step 5: Draft Generation

Read the platform-specific guidelines from [references/x-guidelines.md](references/x-guidelines.md).

Read the structural template from [references/post-templates.md](references/post-templates.md).

Generate the post using:
- Selected framework structure
- Selected hook
- Voice from `voice.md` (match tone, vocabulary, energy)
- Audience awareness from `audience.md`
- Offer context from `offer.md` (for relevant CTAs)
- Angle connection from `angles/` (if applicable)

### Step 6: Variations

After the primary draft, generate 2 additional variations:
- **Variation A:** Different hook, same framework
- **Variation B:** Different framework entirely, same topic

Present all 3 versions. Let user pick their favorite or mix elements.

### Step 7: Save

Save output to: `outputs/YYYY-MM-DD-social-[campaign]/x-001.md`

Ask for campaign name if not provided. Examples: `ai-seo-series`, `founder-lessons`, `content-tips`.

Increment the number for additional batches in the same campaign: `x-002.md`, `x-003.md`, etc.

### Step 8: Update Content Calendar

Append one row to `outputs/content-calendar.csv`.

CSV columns: `campaign,platform,type,hook,created_date,publish_date,status,post_file`

- `campaign` — slug only, e.g. `ai-marketing-tips`
- `platform` — `X`
- `type` — `Single` or `Thread`
- `hook` — first line of the post (under 100 chars)
- `created_date` — today's date `YYYY-MM-DD`
- `publish_date` — leave blank (user fills when scheduling)
- `status` — always `Draft` on creation
- `post_file` — relative path to the .md file, e.g. `outputs/2026-04-07-social-ai-tips/x-001.md`

If the CSV doesn't exist yet, create it with the header row first.

---

## Repurpose Mode

### Step 1: Source Ingestion

Accept source content via:
- **File path:** User provides path to a file (newsletter, blog post, research file, VSL script, transcript)
- **Pasted content:** User pastes text directly into chat

Read the source material fully.

### Step 2: Nugget Extraction

Read [references/repurpose-playbook.md](references/repurpose-playbook.md) for extraction types.

Extract 5-10 nuggets from the source. For each nugget, identify:
- The core idea (one sentence)
- Nugget type (key insight, framework, quote, data point, story beat, contrarian take, actionable tip, analogy)
- Best framework match
- Best format (X single or X thread)

Present the extracted nuggets as a numbered list. Let user:
- Select which nuggets to turn into posts
- Select all
- Add/modify nuggets

### Step 3: Post Generation

For each selected nugget, generate a post using:
- The matched framework from [references/post-frameworks.md](references/post-frameworks.md)
- The platform template from [references/post-templates.md](references/post-templates.md)
- Platform guidelines from [references/x-guidelines.md](references/x-guidelines.md)
- Voice, audience, and offer context from loaded reference files

### Step 4: Batch Output

Save posts to: `outputs/YYYY-MM-DD-social-[campaign]/x-001.md`

---

## Output Format

### File frontmatter

```yaml
---
type: output
format: social-posts
date: YYYY-MM-DD
status: draft
platform: x
mode: topic | repurpose
source: [source file path or "original topic"]
---
```

### Post format (within each file)

```markdown
---

## Post [number]: [brief descriptor]

**Platform:** X Single | X Thread
**Framework:** [framework name]
**Angle:** [angle from reference/proof/angles/ if connected, or "none"]
**Hook:** [the hook line]

### Content

[The full post content, platform-formatted]

### Variations

**Alt Hook A:** [alternative hook]
**Alt Hook B:** [alternative hook]

---
```

### Thread format (X threads)

```markdown
## Post [number]: [brief descriptor]

**Platform:** X Thread
**Framework:** [framework name]
**Thread length:** [N] tweets

### Tweet 1 (Hook)
[content]

### Tweet 2
[content]

### Tweet 3
[content]

...

### Tweet N (CTA)
[content]
```

---

## Quality Checklist

Before presenting any post, verify:

- [ ] **Hook strength:** Would this stop a scroll? Is the first tweet punchy enough?
- [ ] **Voice match:** Sounds like the creator, not a copywriter. Uses their vocabulary. Matches their energy.
- [ ] **No AI tells or hype:** No 'dive into', 'unlock', 'game-changer', 'revolutionize', 'comprehensive guide', 'harness the power', 'amazing', 'incredible'. No throat-clearing ('Controversial take but...', 'Unpopular opinion...'). Just state the position directly.
- [ ] **Platform formatting:** Under 280 chars per tweet. Proper line breaks. No links in body. No hashtags. No markdown that won't render on X.
- [ ] **One idea per post:** Not cramming multiple concepts. Each post has one clear takeaway.
- [ ] **Precision metric:** Post includes at least one precise dollar amount, percentage, or measurable metric. Not vague counts — specific like '$180/month', '11.5% reply rate', 'from 3 hours to 12 minutes.'
- [ ] **Action CTA:** Ends with an action-oriented CTA — 'Reply with your [specific thing]', 'Try this and drop your results below', 'Bookmark this for later.' Passive questions as fallback only.
- [ ] **Angle connection:** Post connects to a defined angle from `reference/proof/angles/` when possible
- [ ] **Saves-worthy:** Is this bookmarkable? Educational, actionable, reference-worthy content drives bookmarks — the #1 purchase intent signal on X.
- [ ] **Zero emoji default:** No emojis unless genuinely functional (max 1-2). Default is zero. Never decorative.
- [ ] **No ALL CAPS:** No ALL CAPS labels or section markers for emphasis. Clean, professional formatting.
- [ ] **No hashtags:** X algorithm doesn't reward them. They look spammy.

---

## Examples

### Example 1: X Single (Topic Mode)

```
User: write a tweet about why gym owners should use AI for their marketing

Claude: Loading reference files...
- voice.md (loaded)
- offer.md (loaded)
- audience.md (loaded)

Topic: AI marketing for gym owners
Format: X Single

Recommended frameworks:
1. Old Way vs New Way — contrast traditional gym marketing with AI-assisted
2. Hot Take — "Most gym owners are wasting money on agencies"
3. Do These X Things — 3 things gym owners should automate first

Which framework? Or say "surprise me."

User: 1

Claude: Here are 3 hook options:

A) "Gym marketing in 2026 looks nothing like 2020."
B) "Most gym owners are still marketing like it's 2019."
C) "The gym owners winning right now aren't outspending you."

Which hook?

User: C

Claude: [Generates full post with Old Way vs New Way framework, hook C]

---

## Post 1: AI Marketing for Gym Owners

**Platform:** X Single
**Framework:** Old Way vs New Way
**Angle:** none
**Hook:** The gym owners winning right now aren't outspending you.

### Content

The gym owners winning right now aren't outspending you.

They're out-systemizing you.

Old way: $3K/month agency, 2-week turnaround, reports you don't understand

New way: Build your offer with AI in a weekend, test 20 ad variations in 30 minutes

Systems over spend.

### Variations

**Alt Hook A:** "Stop paying $3K/month for marketing you don't understand."
**Alt Hook B:** "Gym marketing changed more in the last 12 months than the last 12 years."

---

Saved to:
- outputs/2026-04-07-social-ai-gym-marketing/x-001.md
```

### Example 2: X Thread (Topic Mode)

```
User: write a thread about the 5 biggest mistakes gym owners make with content

Claude: [Loads reference, selects Biggest Mistake framework for thread]

---

## Post 1: Content Mistakes Thread

**Platform:** X Thread
**Framework:** Educational List + Biggest Mistake hybrid
**Thread length:** 8 tweets

### Tweet 1 (Hook)
5 content mistakes I see gym owners make every week

(And what to do instead)

A thread:

### Tweet 2 (Promise)
Most gym owners post content.

Very few post content that actually brings in members.

Here's what separates them:

### Tweet 3
1. Posting workouts without context

Nobody follows a gym for workouts. They follow for the PERSON.

Show the workout. But tell them WHY it matters for someone like them.

### Tweet 4
2. Talking to everyone

"Great workout for anyone!" speaks to no one.

Pick ONE person. Talk to THEM. "If you're 35+ and your back hurts after sitting all day..."

### Tweet 5
3. Only posting when motivated

Content isn't a mood. It's a system.

Batch 2 weeks of posts in one sitting. Schedule them. Show up even when you don't feel like it.

### Tweet 6
4. Ignoring the hook

First line = 80% of whether anyone reads the rest.

"Check out this workout" vs "Your low back pain isn't a back problem"

Which one would you click?

### Tweet 7
5. Never asking for anything

Every 5th post should have a soft CTA.

Not "BUY NOW." More like: "DM me 'BACK' if you want the full mobility routine."

### Tweet 8 (CTA)
That's the list.

Fix these 5 and you'll see the difference in 30 days.

Follow @handle for more on gym marketing that actually works.

---
```

### Example 3: Repurpose Batch

```
User: repurpose this newsletter into tweets
[pastes 1500 words about building a content system]

Claude: Reading source content...

Extracted 7 nuggets:

1. Key Insight: "Content isn't creative work. It's systems work." → Hot Take (X single)
2. Framework: 4-step content system (Curate → Template → Create → Distribute) → Framework Share (X thread)
3. Contrarian Take: "Posting daily is less important than posting systematically" → Old Way vs New Way (X single)
4. Data Point: "45 seconds per post using templates" → Authority hook (X single)
5. Actionable Tip: "3 places to find proven post structures" → Educational List (X single)
6. Quote: "You fall to the level of your systems" → X single
7. Story Beat: "I went from 2 hours per post to 45 seconds" → Story + Lesson (X thread)

Which nuggets should I turn into posts? (Enter numbers, "all", or modify)

User: all

Claude: [Generates 7 posts, saves to batch file]

Saved to:
- outputs/2026-04-07-social-content-system-repurpose/x-001.md

7 posts generated:
- 5 X singles + 2 X threads → x-001.md
```

---

## Recovering from Compaction

If conversation compresses mid-session:

**For the user:** Type the skill trigger again and describe where you were:
- "We were writing tweets about AI marketing"
- "I was picking hooks for the gym owner thread"
- "Repurpose the newsletter — we extracted 7 nuggets"

**For Claude:** When resuming:
1. Check `outputs/*-social-*/` for recent `x-*.md` files
2. Re-read reference files
3. Confirm with user: "I see recent social files from today. Want to continue or start fresh?"

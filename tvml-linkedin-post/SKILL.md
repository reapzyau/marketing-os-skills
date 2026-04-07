---
name: tvml-linkedin-post
description: "Generate LinkedIn posts from topics or repurpose long-form content into LinkedIn posts. Use when: user says 'linkedin post', 'linkedin content', 'write a linkedin post', 'repurpose this for linkedin', 'social post for linkedin'. NOT for X/Twitter (use /tvml-x-post). NOT for Reels/TikTok/carousels. NOT for Skool posts."
---

# LinkedIn Posts

Generate LinkedIn posts from topics, or repurpose long-form content into LinkedIn post batches.

---

## Triage

Detect if user is in the right place:

| User Says | They Want | Route To |
|-----------|-----------|----------|
| "linkedin post", "social post", "write a linkedin post" | LinkedIn posts | Continue here |
| "repurpose this for linkedin", "turn this into linkedin posts" | Repurpose long-form | Continue here (Repurpose mode) |
| "X post", "tweet", "thread", "twitter post" | X/Twitter posts | `/tvml-x-post` |
| "skool post", "community post", "daily post" | Skool community | Describe: write a post for your Skool community |
| "reel", "tiktok", "carousel", "instagram post" | Short-form video / IG | Describe: create short-form or IG content |
| "ad", "meta ad", "facebook ad" | Paid ads | Describe: create paid ad copy |

**If wrong place:**
> "Sounds like you want [X]. That's handled by [skill/approach]. Should I switch you over?"

---

## Context Loading

### Resolve business context

Check for `reference/core/` in the current working directory. If it exists, you're in the right place.

If `reference/core/` does not exist, tell the user:
> "I need your business reference files to write in your voice. Create a `reference/core/` folder with `voice.md`, `offer.md`, and `audience.md` — or point me to the project that has them."

### Load reference files

**Required:**
- `reference/core/voice.md` — tone, vocabulary, formatting rules
- `reference/core/offer.md` — what you sell, mechanism, positioning
- `reference/core/audience.md` — who you're writing for, pains, desires

**Recommended:**
- `reference/domain/content-strategy.md` — pillars, platform strategy
- `reference/core/soul.md` — brand identity, philosophy, energy

**On-demand:**
- `reference/proof/angles/*.md` — messaging angles to connect posts to
- `reference/proof/testimonials.md` — social proof for authority posts

**Missing required files?** Tell the user what's missing. Don't generate without `voice.md` at minimum.

**Transparency:** Before generating, briefly state which reference files you loaded.

---

## Mode Detection

Detect which mode based on user input:

| Signal | Mode |
|--------|------|
| User provides a topic, question, or idea | **Topic mode** |
| User provides a file path, pastes content, or says "repurpose" | **Repurpose mode** |
| User says "linkedin post about X" | **Topic mode** |
| User says "turn this into linkedin posts" | **Repurpose mode** |

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

### Step 2: Framework Selection

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

### Step 3: Hook Selection

Read [references/hooks-library.md](references/hooks-library.md).

Generate 3 hook options using formulas from the matching hook categories. Present them and let the user pick or request alternatives.

**Hook rules:**
- Hook must be under 125 characters (before the "see more" fold)
- Write the hook first. It's 80% of the post's success.

### Step 4: Draft Generation

Read the platform guidelines from [references/linkedin-guidelines.md](references/linkedin-guidelines.md).

Read the structural template from [references/post-templates.md](references/post-templates.md).

Generate the post using:
- Selected framework structure
- Selected hook
- Voice from `voice.md` (match tone, vocabulary, energy)
- Audience awareness from `audience.md`
- Offer context from `offer.md` (for relevant CTAs)
- Angle connection from `angles/` (if applicable)

### Step 5: Variations

After the primary draft, generate 2 additional variations:
- **Variation A:** Different hook, same framework
- **Variation B:** Different framework entirely, same topic

Present all 3 versions. Let user pick their favorite or mix elements.

### Step 6: First Comment

Draft a first comment containing:
- Link (if relevant)
- Additional context or resource
- Hashtags (3-5, if using)

### Step 7: Save

Save to: `outputs/YYYY-MM-DD-social-[campaign]/linkedin-001.md`

Ask for campaign name if not provided. Examples: `ai-seo-series`, `founder-lessons`, `linkedin-launch`.

Increment the number for additional batches in the same campaign: `linkedin-002.md`, `linkedin-003.md`, etc.

### Step 8: Update Content Calendar

Append one row to `outputs/content-calendar.csv`.

CSV columns: `campaign,platform,type,hook,created_date,publish_date,status,post_file,carousel_file`

- `campaign` — slug only, e.g. `apac-award-launch`
- `platform` — `LinkedIn`
- `type` — `Post`
- `hook` — first line of the post (under 100 chars)
- `created_date` — today's date `YYYY-MM-DD`
- `publish_date` — leave blank (user fills when scheduling)
- `status` — always `Draft` on creation
- `post_file` — relative path to the .md file
- `carousel_file` — leave blank if no carousel was created

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

Present the extracted nuggets as a numbered list. Let user:
- Select which nuggets to turn into posts
- Select all
- Add/modify nuggets

### Step 3: Post Generation

For each selected nugget, generate a LinkedIn post using:
- The matched framework from [references/post-frameworks.md](references/post-frameworks.md)
- The LinkedIn template from [references/post-templates.md](references/post-templates.md)
- Platform guidelines from [references/linkedin-guidelines.md](references/linkedin-guidelines.md)
- Voice, audience, and offer context from loaded reference files

### Step 4: Batch Output

Save all LinkedIn posts to: `outputs/YYYY-MM-DD-social-[campaign]/linkedin-001.md`

---

## Output Format

### File frontmatter

```yaml
---
type: output
format: social-posts
date: YYYY-MM-DD
status: draft
platform: linkedin
mode: topic | repurpose
source: [source file path or "original topic"]
---
```

### Post format (within each file)

```markdown
---

## Post [number]: [brief descriptor]

**Platform:** LinkedIn
**Framework:** [framework name]
**Angle:** [angle from reference/proof/angles/ if connected, or "none"]
**Hook:** [the hook line]

### Content

[The full post content, platform-formatted]

### First Comment

[First comment content]

### Variations

**Alt Hook A:** [alternative hook]
**Alt Hook B:** [alternative hook]

---
```

---

## Quality Checklist

Before presenting any post, verify:

- [ ] **Hook strength:** Would this stop a scroll? Is it under 125 chars (before the LinkedIn "see more" fold)?
- [ ] **Voice match:** Sounds like the creator, not a copywriter. Uses their vocabulary. Matches their energy.
- [ ] **No AI tells or hype:** No 'dive into', 'unlock', 'game-changer', 'revolutionize', 'comprehensive guide', 'harness the power', 'amazing', 'incredible'. No throat-clearing ('Controversial take but...', 'Unpopular opinion...'). Just state the position directly.
- [ ] **LinkedIn formatting:** Correct character count (500-1500 chars optimal). Proper line breaks between every 1-2 sentences. No links in body (put in first comment). No markdown that won't render on LinkedIn.
- [ ] **One idea per post:** Not cramming multiple concepts. Each post has one clear takeaway.
- [ ] **Precision metric:** Post includes at least one precise dollar amount, percentage, or measurable metric. Not vague counts — specific like '$180/month', '11.5% reply rate', 'from 3 hours to 12 minutes.'
- [ ] **Action CTA:** Ends with an action-oriented CTA — 'Comment [KEYWORD] and I'll send you [resource]', 'Try this and drop your results below', or 'Comment with your [specific thing] — I'll reply to every one.' Passive questions as fallback only.
- [ ] **First Comment drafted:** Every LinkedIn post gets a first comment with link/hashtags/context.
- [ ] **Angle connection:** Post connects to a defined angle from `reference/proof/angles/` when possible.
- [ ] **Saves-worthy:** Is this saveable? Educational, actionable, reference-worthy content drives saves — the #1 purchase intent signal on LinkedIn.
- [ ] **Zero emoji default:** No emojis unless genuinely functional (max 1-2). Default is zero. Never decorative.
- [ ] **No ALL CAPS:** No ALL CAPS labels or section markers for emphasis. Clean, professional formatting.

---

## Examples

### Example 1: LinkedIn Post (Topic Mode)

```
User: write a linkedin post about why gym owners should use AI for their marketing

Claude: Loading reference files...
- voice.md (loaded)
- offer.md (loaded)
- audience.md (loaded)
- content-strategy.md (loaded)

Topic: AI marketing for gym owners
Platform: LinkedIn

Recommended frameworks:
1. Old Way vs New Way — contrast traditional gym marketing with AI-assisted
2. Educational List — 5 ways gym owners can use AI today
3. Hot Take — "Most gym owners are wasting money on agencies"

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

**Platform:** LinkedIn
**Framework:** Old Way vs New Way
**Angle:** none
**Hook:** The gym owners winning right now aren't outspending you.

### Content

The gym owners winning right now aren't outspending you.

They're out-systemizing you.

How gym marketing actually works in 2026:

Old way:
- Hire an agency for $3K/month
- Wait 2 weeks for ad creative
- Hope the targeting works
- Get a report you don't understand

New way:
- Build your offer in a weekend with AI
- Generate 20 ad variations in 30 minutes
- Test messaging before spending a dollar
- Know exactly what's working and why

The shift isn't about technology.

It's about who controls the marketing brain.

Agencies rent you their thinking. AI lets you own yours.

Which side of this are you on right now?

### First Comment

If you're a gym owner figuring out AI marketing, I write about this every week.

Follow for more.

### Variations

**Alt Hook A:** "Stop paying $3K/month for marketing you don't understand."
**Alt Hook B:** "Gym marketing changed more in the last 12 months than the last 12 years."

---

Saved to:
- outputs/2026-03-08-social-ai-gym-marketing/linkedin-001.md
```

### Example 2: Repurpose Batch

```
User: repurpose this newsletter into linkedin posts
[pastes 1500 words about building a content system]

Claude: Reading source content...

Extracted 7 nuggets:

1. Key Insight: "Content isn't creative work. It's systems work." → Hot Take
2. Framework: 4-step content system (Curate → Template → Create → Distribute) → Framework Share
3. Contrarian Take: "Posting daily is less important than posting systematically" → Old Way vs New Way
4. Data Point: "45 seconds per post using templates" → Authority hook
5. Actionable Tip: "3 places to find proven post structures" → Educational List
6. Quote: "You fall to the level of your systems" → standalone post
7. Story Beat: "I went from 2 hours per post to 45 seconds" → Story + Lesson

Which nuggets should I turn into LinkedIn posts? (Enter numbers, "all", or modify)

User: all

Claude: [Generates 7 LinkedIn posts, saves to batch file]

Saved to:
- outputs/2026-03-08-social-content-system-repurpose/linkedin-001.md

7 LinkedIn posts generated across all nuggets.
```

---

## Recovering from Compaction

If conversation compresses mid-session:

**For the user:** Type the skill trigger again and describe where you were:
- "We were writing linkedin posts about AI marketing"
- "I was picking hooks for the gym owner post"
- "Repurpose the newsletter — we extracted 7 nuggets"

**For Claude:** When resuming:
1. Check `outputs/*-social-*/` for recent `linkedin-*.md` files
2. Re-read reference files
3. Confirm with user: "I see recent social files from today. Want to continue or start fresh?"

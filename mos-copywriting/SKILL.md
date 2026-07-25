---
name: mos-copywriting
description: "Write, review, or improve marketing copy using distilled frameworks from Sugarman, Kennedy, Ogilvy, Caples, and Halbert. Supports headlines, ads, emails, landing pages, sales letters, VSLs, social posts, and copy reviews. Use when: user says 'write copy', 'copywriting', 'headlines', 'sales letter', 'email copy', 'ad copy', 'landing page copy', 'VSL script', 'review my copy', 'copy review', 'critique this copy', 'map triggers', or wants help with any marketing copy."
---

# Copywriting Skill

Write high-converting copy using distilled frameworks from 5 classic copywriting masters:
- **Sugarman** — Slippery Slide, 31 Psychological Triggers, 23 Copy Elements
- **Kennedy** — 29-Step Sales Letter System, Damaging Admission, Sequences
- **Ogilvy** — Headline Rules, Research Method, Big Idea Test
- **Caples** — 35 Headline Formulas in 5 Categories
- **Halbert** — A-Pile Test, Starving Crowd, Conversational Copy

**Source:** this skill applies frameworks from published works by Joseph Sugarman, Dan Kennedy, David Ogilvy, John Caples and Gary Halbert. It is an independent implementation, not affiliated with or endorsed by any of those authors or their estates. Each file in `references/` carries its own `Source:` line naming the work it draws on. Read the originals for the full argument — these references are the build process, not a substitute for the source.

---

## Step 0: Load Business Context

### If inside a Main Branch repo (has `reference/` folder):

Read these files to ground copy in brand voice and audience:

```
reference/core/voice.md      -> Tone, channel variations, do/don't
reference/core/audience.md   -> Who they are, pains, desires, language
reference/core/offer.md      -> What the product/service is, mechanism
reference/core/soul.md       -> Why this exists, philosophy, mission
```

Also check for a PX avatar workbook for deeper audience language:
```
outputs/px-workbook-*.md     -> Detailed customer avatar with exact language
```

### If NOT inside a Main Branch repo:

Ask the user for:
1. What product/service is this copy for? (one sentence)
2. Who is the target audience? (one sentence)
3. What voice/tone? (casual, professional, authoritative, friendly?)
4. Any existing copy to reference?

Then proceed with those inputs.

---

## Step 1: Detect Copy Type + Route

Match the user's request to a copy type and load the appropriate reference files.

| User Request | Copy Type | Complexity | Load These References |
|---|---|---|---|
| "headlines", "write headlines", "headline ideas" | Headlines | Simple | `caples-headline-formulas`, `ogilvy-headlines` |
| "sales letter", "long-form sales copy" | Sales Letter | Complex | `kennedy-system`, `sugarman-slippery-slide`, `sugarman-triggers`, `halbert-principles`, `master-checklist` |
| "email", "email copy", "email sequence" | Email | Medium | `kennedy-system`, `kennedy-sequence`, `sugarman-triggers`, `halbert-principles` |
| "ad copy", "facebook ad", "meta ad", "google ad" | Ad Copy | Simple | `sugarman-slippery-slide`, `sugarman-triggers`, `ogilvy-headlines`, `caples-headline-formulas` |
| "landing page", "sales page", "landing page copy" | Landing Page | Medium | `sugarman-slippery-slide`, `sugarman-triggers`, `ogilvy-body-copy`, `kennedy-system` |
| "social post", "skool post", "linkedin post" | Social Post | Simple | `sugarman-slippery-slide`, `sugarman-triggers` |
| "VSL", "video sales letter", "sales video script" | VSL Script | Complex | `kennedy-system`, `sugarman-slippery-slide`, `sugarman-triggers`, `halbert-principles`, `master-checklist` |
| "review my copy", "critique", "copy review" | Copy Review | Medium | `master-checklist`, `sugarman-elements`, `ogilvy-body-copy` |
| "map triggers", "trigger mapping" | Trigger Mapping | Simple | `sugarman-triggers` |

**If ambiguous:** Ask the user which copy type they need. Present the table above as options.

**Always also load:** `copy-type-blueprints` — it contains the structural skeleton for each type.

**Always also load the surface-matched voice rules (they deliberately diverge):**
- **Written copy** (posts, emails, captions, About/sales pages, lessons — anything READ): `prose-craft-rules` — anti-AI prose rules, punctuation bans, repetition checks, empathy requirements, specificity standards.
- **Spoken scripts** (Reel/Short VO, YouTube scripts, talk tracks — anything read ALOUD): `spoken-script-rules` — oral devices (anaphora, repetition-as-signpost, thought narration) are ENCOURAGED there; written repetition anti-patterns do NOT apply. Never lint script VO against `prose-craft-rules`.

All reference files are at: `~/.claude/skills/mos-copywriting/references/[filename].md`

---

## Step 2: Quick Interview

Ask 3-5 questions to fill gaps not covered by business context. Skip any already answered by Step 0 or the user's initial request.

**For all types:**
1. What specific product/service/offer is this for?
2. What is the primary goal? (generate leads, sell, educate, engage?)
3. What is the reader's current awareness level? (unaware, problem-aware, solution-aware, product-aware, most-aware?)

**Additional by type:**
- **Headlines:** What's the key benefit or transformation? Any specific angle?
- **Email/Sequence:** Where does this fit in the funnel? (cold, warm, hot?) How many emails?
- **Sales Letter/VSL:** What is the price point? What's the guarantee?
- **Ad Copy:** Platform? (Meta, Google, LinkedIn?) Character/length constraints?
- **Landing Page:** What's above the fold? What action should they take?
- **Copy Review:** Paste or link the copy. What's not working?
- **Social Post:** Platform? Engagement goal? (comments, shares, clicks?)

Wait for the user's answers before proceeding.

---

## Step 2.5: Research Gate (MANDATORY — no copy is written without it)

Copy is 80% research. This is the one step that must be gated, not trusted. Before generating, you must have **real reader language**, not a generic "marketers" avatar:

1. **Look for a fresh Research Bank.** Check `business/offer/copy-research-bank.md` in your project. If it's populated and `last_refreshed` is within 90 days → load the relevant slice (One Reader + top IVOC quotes for this topic + deeper benefit). If your project keeps its avatar elsewhere, the avatar workbook or the `audience.md` exact-language sections serve the same role.
2. **If no fresh bank/VOC exists → run `/mos-copy-research`** (the 6-step ladder) to build one before writing. High-stakes surfaces (sales page, About, email sequence, offer, VSL) run the full ladder every time.
3. **Non-bank audiences** (a peer/industry post, a one-off audience not covered by the bank) still need grounding: a researched reader sketch + topic sources. Mine real sources; don't write from a guess.
4. **Hard rule:** if you genuinely have no real reader language and no research basis, STOP and tell the user — do not ship ungrounded copy. (This mirrors the Copywriter agent's own BLOCKED gate.)

Assemble the research half of the BRIEF: One Reader + awareness/sophistication stage, top 3-6 verbatim IVOC quotes, the deeper benefit, and the per-piece One Idea / Offer / Action. For **high-stakes surfaces** (sales/About page, email sequence, offer, VSL), also pull the Transformation & Decision layers from the Bank — the relevant Before→After, the Buyer Decision Questions this piece must answer, and the top Objection→Rebuttals.

---

## Step 3: Generate Copy — delegate to the Copywriter agent (single door)

**Do NOT write the copy inline, and do NOT spawn ad-hoc writing agents.** All copy is written by the **Copywriter agent** (`Agent(subagent_type="Copywriter")`), which owns the craft, the 4-pass edit (incl. the Flow pass), the friend-not-guru rule, and the master-checklist self-score. Your job here is to assemble a complete BRIEF and spawn it.

Build the BRIEF from everything gathered so far and spawn the agent:

```
Agent(subagent_type="Copywriter", prompt=<<BRIEF>>)
```

The BRIEF must contain:
- **Surface + format** — the copy type and its hard format rules (e.g. Skool plain text + `===` separators; email subject/preview/body; landing-page section order from `copy-type-blueprints`).
- **Research half** (from Step 2.5) — One Reader + awareness/sophistication stage, the top verbatim IVOC quotes, the deeper benefit, and the locked One Idea / Offer / Action. This is non-negotiable; without it the agent returns BLOCKED.
- **Voice spec** — pull from `reference/core/voice.md` (or the repo's voice rule). Practical-teacher, friend-not-guru, AU spelling/idiom where applicable.
- **Hook structure** the type calls for (e.g. Proof → Promise → Plan; Caples formula family for headlines).
- **Hard constraints list** — surface format rules, banned hype words, em-dash ≤1, no staccato/anaphoric triad, no thought-leadership reframes, CTA only if intentionally promotional, emoji policy (functional keycaps/structural markers allowed, decorative ≤2).
- **Reference frameworks to weight** — the files from the Step 1 routing row (the agent loads its own copy brain; just name what matters for this type).

Scale the BRIEF depth to the copy type (a social post is a tight brief; a sales letter/VSL hands the agent the full blueprint section order, the proof inventory, the offer/guarantee, and pacing requirements). The agent returns `=== DRAFT ===` + `=== CRAFT NOTES ===`. If it returns `=== BLOCKED: NEEDS RESEARCH ===`, go back to Step 2.5 — do not write it yourself.

---

## Step 4: Quality Gate (deterministic linter THEN checklist)

**4a. Deterministic anti-slop linter (run first, on the returned draft).** Format/voice rules resist prompting, so verify them in code rather than trusting the agent's self-score:

```
bun ~/.claude/skills/mos-copywriting/Tools/lint-copy.ts <draft-file> --surface <skool|x|linkedin|email|about|generic|spoken> --body-only
```

It checks: em-dash ≤1, staccato/anaphoric triad, thought-leadership reframe, banned hype, filler phrases, ellipses, you/because, decorative-emoji count, ALL-CAPS, and (surface=skool) markdown leakage. **Exit 1 = a hard FAIL — fix and re-run before shipping.** WARNs are judgement calls (surface them to the user, don't auto-block). If the draft isn't saved to a file yet, write it to a temp file first, or pipe via `--stdin`.

**`--surface spoken` is for script VO** (Reels/Shorts, YouTube scripts): it skips the written-only checks (em-dash, ellipses, triads, emoji, caps — oral devices are encouraged in scripts per `spoken-script-rules.md`) and keeps the universal ones (hype, filler, you/because, round-number specificity). The reframe check downgrades to WARN there: a contrarian snapback against a common belief is legitimate script structure; diagnosing the viewer is not — judge by hand.

**4b. Master checklist** — then run `master-checklist.md` at the appropriate tier level for the copy type.

| Copy Type | Tiers to Run |
|-----------|-------------|
| Headlines | 1 + 2 + 5 |
| Ad Copy | 1 + 2 + 5 |
| Social Post | 1 + 5 |
| Email | 1 + 3 + 5 |
| Landing Page | 1 + 2 + 3 + 5 |
| Sales Letter | 1 + 2 + 3 + 4 + 5 |
| VSL Script | 1 + 2 + 3 + 4 + 5 |
| Copy Review | 1 + 2 + 3 + 4 + 5 |
| Trigger Mapping | N/A |

**If any tier scores below passing:** Fix the specific failing checks and re-run that tier.

Present the checklist results to the user with the final copy.

---

## Step 5: Save Output

Save to `outputs/YYYY-MM-DD-[copy-type]-[slug].md` with this header:

```markdown
---
type: [copy-type]
product: [product/service name]
audience: [one-line audience description]
frameworks: [which reference files were used]
checklist-score: [Tier scores, e.g. "T1: 9/10 | T2: 8/9 | T3: 10/12"]
date: [YYYY-MM-DD]
---

# [Copy Type] — [Product/Slug]

[The copy]

---

## Quality Gate Results

[Checklist scores and any notes]
```

If the user doesn't specify a slug, generate one from the product name.

---

## Copy Review Mode

When the user says "review my copy" or "critique this":

1. Ask them to paste the copy or provide a file path
2. **Run the deterministic linter first:** `bun ~/.claude/skills/mos-copywriting/Tools/lint-copy.ts <file> --surface <surface> --body-only`. Its FAILs/WARNs are objective findings — fold them into the review (em-dashes, triads, reframes, hype, filler, markdown leakage) so you don't miss the mechanical tells.
3. Load `master-checklist`, `sugarman-elements`, `ogilvy-body-copy`, `prose-craft-rules`
4. Determine the copy type from context
5. Run ALL 5 tiers of the master checklist
5. Score each tier
6. Identify the top 3-5 weaknesses with specific line references
7. For each weakness, provide:
   - What's wrong (cite the framework principle being violated)
   - A specific rewrite suggestion
   - Why the rewrite is better
8. Rate overall: **Strong** (all tiers passing) / **Needs Work** (1-2 tiers below) / **Rewrite** (3+ tiers below)

---

## Reference Files

All stored in `~/.claude/skills/mos-copywriting/references/`:

| File | Source | Contents |
|------|--------|----------|
| `sugarman-slippery-slide.md` | Adweek Handbook | 13 axioms, slippery slide formula, copy sequence, 7 writing steps |
| `sugarman-triggers.md` | Adweek Handbook | 31 psychological triggers with usage guidance, top 10 quick-pick |
| `sugarman-elements.md` | Adweek Handbook | 23 copy elements as scannable checklist |
| `kennedy-system.md` | Ultimate Sales Letter | 29-step system, damaging admission, bugaboo, yes sequence |
| `kennedy-sequence.md` | Ultimate Sales Letter | Email/letter sequence strategy, per-email purpose |
| `ogilvy-headlines.md` | Ogilvy on Advertising | Headline rules, 5x rule, power words, research method |
| `ogilvy-body-copy.md` | Ogilvy on Advertising | Body copy rules tagged universal vs print-specific |
| `caples-headline-formulas.md` | Tested Advertising Methods | 35 formulas in 5 categories with templates |
| `halbert-principles.md` | Boron Letters | A-pile test, starving crowd, conversational tone |
| `master-checklist.md` | All 5 books + writer feedback | 5-tier quality gate, tiered by copy type |
| `prose-craft-rules.md` | Writer feedback + production rules | Anti-AI prose rules for WRITTEN copy: punctuation bans, repetition, empathy, specificity, EEAT signals |
| `spoken-script-rules.md` | The script-vs-copy split + Kallaway/Hormozi voice study (2026-06-11) | Voice rules for SPOKEN scripts: oral devices encouraged, shared clarity engine, functional-vs-decorative test |
| `copy-type-blueprints.md` | Synthesized | Structural skeletons with framework attribution |

---

## Scripting mode — applying these frameworks to a YouTube outline

When invoked in scripting mode by a video-scripting skill ("scripting mode: apply persuasion frameworks to this locked YouTube outline using the Reader Brief"), you're not writing a sales page — you're hardening a **spoken, dot-point** YouTube outline (Hook / Build Up / Value / Payoff / CTA). The frameworks still apply, adapted:

- **The slippery slide IS retention.** Sugarman's "the sole purpose of each sentence is to get the next one read" becomes "each moment earns the next second of watch-time." Order the Value sub-points so every one opens a loop the next closes — nothing skippable.
- **Don't rewrite into prose.** The outline stays dot points (the scripter's hard rule). You shape **order, phrasing, and coverage**, not format. Only hooks are spoken word-for-word.
- **Objection pre-emption in the body.** Take the Reader Brief's ranked objections and answer each *before the viewer voices it* — woven into Build Up or an early Value sub-point, with a receipt not a claim.
- **Triggers onto hooks + open loops.** Layer the psychological triggers (curiosity, greed/desire, honesty/specificity, exclusivity) onto the Kallaway hook formats and the Value loops. Curiosity = the open loop; specificity = real numbers / named tools.
- **IVOC over marketese.** Use the reader's verbatim language from the brief — never paraphrase into "marketing voice."
- **FABD = the Payoff.** The Payoff lands the deeper benefit (the desired self), not a summary.
- **Output:** an annotated outline + a trigger/objection-coverage map (append to `.angle-notes.md`), and sub-point rewrites confirmed via AskUserQuestion — not a rewritten document.

### Short-form variant (reels / Shorts — invoked by a short-form video skill)

When invoked as `scripting mode (short-form reel)`, the same frameworks apply but **compressed to a 30-75s spoken script**:

- **Slippery slide = second-by-second retention.** Each line earns the next *second* of watch-time, not the next sentence. Cut anything skippable; the Setup→Rehook handoff must be an open loop.
- **One trigger, not many.** Pick the single highest-leverage Sugarman trigger for the hook (usually curiosity or specificity) rather than layering — short-form has no room for a stack.
- **Pre-empt only the #1 objection, in one line.** With a receipt, never a lecture.
- **FABD = the t-shirt / outro line**, not a body section.
- **Never override the reel's voice profile.** You shape order / phrasing / coverage; the voice profile owns cadence. On conflict, the voice profile wins.
- **Output:** tightened spoken lines + trigger tags — not a rewritten document, and never the contrarian take itself (that's the reel's USER-owned Substance Gate).

# Spoken Script Rules

Voice rules for anything **read aloud**: Reel/Short VO, YouTube long-form scripts, talking-head segments, voiceover, live-session talk tracks. Written copy (posts, emails, captions, About/sales pages) uses `prose-craft-rules.md` instead — the two rule-sets deliberately diverge.

Source: in-house scripting correction, 2026-06-11 ("scripting is read out loud — we WANT anaphora") + the Kallaway (6 transcripts, 2024-2026) and Hormozi ($100M Implementation Workshop, Money Models tutorial) tone-of-voice study.

---

## The Core Principle

**A reader can scan back. A listener can't.** Repetition in spoken word is formatting — it does the job headers, bold, and paragraph breaks do on a page. Hormozi: *"There's only one. There's only one. There's one today, and there's going to be one in six months."* That's not padding; it's bolding a sentence with your voice.

The corollary: perfectly varied, never-repeating prose sounds **written-then-recited** when spoken — the definition of a stale script. Real people repeat themselves when they care about a point. Let the script do the same.

---

## Oral Devices: ENCOURAGED

These are banned or capped in written copy. In scripts they are craft:

### Anaphora (repeated openers)
Kallaway: *"All you have to do to win with content is eliminate the overthinking... All you have to do is making videos."* Use it to build pressure toward a payoff — each repeat must add weight, and the run must resolve into something. Mark the repeats in the script so they get performed, not read flat.

### Repetition-as-signpost
Restate the load-bearing point in slightly different words before moving on. The listener gets one pass; the restate IS their re-read.

### Thought narration
Kallaway: *"Cuz you're probably thinking, 'How could I possibly read someone's mind?'"* Narrating the viewer's objection collapses distance and is fully friend-at-desk compatible. Use freely.

### Rhetorical questions
*"So how do we actually help the algorithm do this matching better? Are there tactical steps we can take? Yes, there are."* Ask-then-answer is a spoken transition device. Fine in scripts; suspicious in copy.

### Incomplete sentences and "and" chains
Spoken syntax is looser. Fragments, run-ons joined by "and", trailing clauses — all fine if they match breath rhythm. The Read-Aloud Test inverts here: if it sounds natural spoken but looks wrong on the page, the PAGE is wrong.

### Verbal connectors
"Here's the thing." "So here's the tactic." "Now, here's where it gets interesting." "The truth is..." These are banned-adjacent filler in copy; in scripts they are signposts that tell the listener a turn is coming. Use them — vary them.

### Contractions and casual softeners
Always. "Kind of", "basically", "honestly" in moderation read as a person, not a bot. (Hormozi's "kind of" paradoxically increases trust — feels honest, not polished.)

---

## The Shared Engine (applies to scripts AND copy)

From the Kallaway/Hormozi study — this is what makes 5th-grade language land without being simple. These rules are universal:

1. **Mechanism before tactic.** Never state a tactic without one sentence minimum of why it works. Kallaway: *"Conflicts create open loops in the brain and then context helps close those loops"* — THEN the tactic. Depth = explained causation, not big words.
2. **Exact numbers, never approximations.** "$50 off a month for 12 months", "30 to 50 videos", "I lost about $5 million." Precision is the authority layer. If you don't have the number, get it or cut the claim.
3. **Sentence-length alternation.** Short hit, long explanation, short pivot. Cap ~35 words. Never three same-length sentences running. (In scripts this is breath rhythm; mark the short hits as beats.)
4. **Define jargon in motion.** Hormozi: *"CAC, cost to acquire a customer, is it around the industry average?"* Term + plain-English expansion in one breath, then keep moving. Never pause for a definition sidebar.
5. **Name your frameworks in simple words.** "The two-folder wiki." Naming makes simple language feel important (Kallaway's labeling effect). Branded terms are also series glue.
6. **Contrast as connective tissue.** "But / actually / instead" every few sentences; binary forks over spectrums (*"Either your leads cost too much, or your sales sucks, or both"*). Beats connect with "therefore" or "but" — never "and then" (that's a list, not a story).
7. **Earn every declarative.** Plain certainty after proof reads as clarity; before proof it reads as guru. Hormozi only drops axioms after minutes of walked logic.
8. **One load-bearing analogy per piece, max.** Hormozi used 3-4 in a 45,000-word workshop, each explaining a mechanism. Analogy-sprinkling is the imitator's mistake. Kallaway's hourglass/car-speed/stencil analogies all carry causal weight — copy that bar.

---

## Still Banned in Scripts

The split is written-vs-spoken, but the deeper line is **functional vs decorative**. These stay out of scripts:

- **Decorative slogan-triads.** "Real systems, real results, no theory" is stale in both mediums — it's ornament, not emphasis. **The test: does the repetition build toward a resolution the listener leans in for, or does it just sound finished?** Kallaway's repeats always resolve. Slogans resolve into nothing.
- **Generic noun lists.** "Your reading, your projects, your research, even your work" — the rhythm is fine spoken; the empty nouns are not. Specificity holds on every surface: swap the noun parade for one real example (*"I've got one running for client research and one for my own reading"*).
- **Hype words.** "Game-changer", "unleash", "skyrocket" etc. (full list in lint-copy.ts) sound worse out loud than on the page.
- **True filler.** "At the end of the day", "in today's world" — filler is filler in any medium. Distinguish from verbal connectors above: a connector signposts a turn; filler delays one.
- **Reframe-pronouncements about the viewer.** "You don't have a tools problem, you have a system problem" stays out — practical teacher, not thought leader. NOTE the distinction: a contrarian snapback against a **common belief** (*"this is an art... but the good news is there is a right answer"*) is legitimate script structure (Kallaway's hook formula depends on it). Flipping a belief is fine; diagnosing the viewer is not.

---

## Delivery Notes (the page is an instruction, not the product)

- Anaphora and repetition only sound authentic if **performed** — leaned into on the repeats. Write the words so the cadence is forced by the language itself; if a repeat only works with a marked pause, rewrite it.
- **Scripts are delivered BARE (in-house ruling, 2026-06-11): no stage directions, no performance marks (BEAT/PUNCH/REPEAT), no quote marks around VO lines.** All delivery and editing decisions happen in post-production — the script's job is just the words. Keep the "hit the beats in your own cadence" shooting-note convention; script only the hook word-for-word.
- The Mute Test (visual + overlays carry the message) and the Read-Aloud Test both still apply — scripts must pass spoken, not scanned.

---

## Linting

```
bun ~/.claude/skills/mos-copywriting/Tools/lint-copy.ts <script.md> --surface spoken --body-only
```

The `spoken` surface skips written-only checks (em-dash count, ellipses, staccato/anaphoric triad, emoji, ALL-CAPS — caps overlays and delivery cues are legitimate in script docs) and keeps the universal ones (hype, filler, specificity, reason-why). Reframe-pronouncements downgrade from FAIL to WARN: flag them, judge snapback-vs-diagnosis by hand.

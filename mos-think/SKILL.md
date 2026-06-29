---
name: mos-think
description: The core MarketingOS loop — research a question, make a decision, and codify it back into your business brain. Use when the user says research, decide, figure out, explore, look into, codify, or wants to enrich the core files with new findings, angles, or proof. Three phases — run all three or just one.
---

# mos-think

The compounding loop at the heart of MarketingOS: **research → decide → codify**. You explore a question, commit to a decision with rationale, then fold the learning back into `core/` so the brain gets smarter every time. Run the full flow, or jump to one phase.

```bash
mos think "your topic"
```

prints the invocation hint; the real work happens here in Claude Code.

Work from inside the repo (`core/`, `research/`, `decisions/` present). Not in one? Run `/mos-start` first.

## Phase 1 — Research

Gather what's needed to answer the question well. Pull from the member's own material first (repo files, pasted notes, URLs, transcripts), then wider sources. For anything non-trivial, spin up parallel research agents so each angle gets its own context window, then synthesize.

Save findings to a dated file:

```
research/YYYY-MM-DD-{topic}.md
```

One topic per file. Cite sources. Keep raw exports out — distil to what helps future outputs.

## Phase 2 — Decide

Turn research into a committed choice. Write a decision file:

```
decisions/YYYY-MM-DD-{topic}.md
```

with: the decision, the rationale, what was considered and rejected, and links back to the research that informed it. A decision without a "why" isn't durable — capture the reasoning.

## Phase 3 — Codify

This is what makes the loop compound. Fold the decision into the relevant `core/` files — `offer.md`, `audience.md`, `voice.md`, `proof/`, or a content / strategy file. Update the actual brain, not just the decision log. New testimonials, angles, and proof go here too.

Hand off deep offer or avatar codification to **/mos-offer** and **/mos-avatar** when the change is substantial.

## Save

After writing research / decisions / core changes:

```bash
mos checkpoint --plan
mos checkpoint -m "[decided] {topic}" --yes
```

Preview, approve, save.

## Rules

- **Research before deciding; codify after.** Skipping codify is why systems stop compounding — the learning has to land back in `core/`.
- **One topic per file.** Dated, in `research/` and `decisions/`.
- **Capture the why.** A decision file without rationale is just a note.
- **Approval before saving.**

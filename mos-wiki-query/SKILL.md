---
name: mos-wiki-query
description: "Answer questions from the LLM Wiki the disciplined way — read the index first, open only the pages you need, synthesise a cited answer, then file genuinely new knowledge back into the wiki. Use when: user asks a question about a wiki domain, says 'query the wiki', 'ask the wiki', 'what does the wiki say about', 'what do we know about', 'search my knowledge base', 'pull from the wiki', 'wiki query', or wants an answer grounded in their compiled knowledge rather than re-read from raw sources."
---

# TVML Wiki Query

Answer a question from the wiki, then keep the answer if it's worth keeping. This is the third operation in the Karpathy LLM Wiki pattern (Ingest / Query / Lint) — the one you run most.

> Built on The Vibe Marketing Lab's take on Andrej Karpathy's LLM Wiki pattern.

The whole point of the wiki is that knowledge was compiled once, during ingest. Query reads that compiled synthesis — it does NOT re-read the raw sources from scratch. And the move that makes the wiki compound: when a query produces genuinely new knowledge, file it back as a page so it's there next time.

---

## The loop (do not skip steps)

```
read master _index.md → read domain _index.md → open only the 2-3 pages you need
→ synthesise a cited answer → file new knowledge back → log it
```

The discipline is what makes this fast and trustworthy. Reading the index first means you open two or three whole pages, not the whole vault. Citing means every claim is traceable. Filing back means your explorations stop leaking into chat history.

---

## Workflow

### Step 1: Understand the question and scope it

Read the question and decide which domain(s) it touches. If it's obviously one domain, scope to it. If it spans domains, you'll read more than one domain index in Step 3.

If the question is vague, ask one clarifying question before searching — a sharp query reads two pages, a vague one reads ten.

### Step 2: Read the master index

Read `knowledge/wiki/_index.md` first. This tells you which domains exist and what each holds. Use it to confirm where the answer is likely to live.

Do NOT start opening content pages yet. Do NOT read `knowledge/raw/`. The index is the map.

### Step 3: Read the relevant domain index

Read `knowledge/wiki/{domain}/_index.md` for each domain the question touches. This lists the actual pages with one-line summaries. Identify the 2-3 pages most likely to answer the question.

### Step 4: Open only the pages you need

Open those 2-3 pages. Follow `[[wikilinks]]` only when a page points you to something directly relevant. Resist opening the whole domain — if you find yourself reading five or more pages, the index summaries probably need improving (flag it for a lint).

**Only read `knowledge/raw/` if** the user is explicitly checking provenance ("what's the original source for that figure?") — then open the single cited source, not the whole raw folder.

### Step 5: Synthesise a cited answer

Write the answer from what the pages say. For every non-obvious claim, cite the page it came from with a `[[wikilink]]`. Be honest about confidence:

- If the pages agree and are current → answer plainly.
- If pages disagree → surface the contradiction (and suggest a lint).
- If the wiki doesn't cover it → say so, and suggest what to ingest to fill the gap. Don't invent an answer the wiki can't support.

### Step 6: Decide whether to file the answer back

This is the compounding move. Ask: did this query produce knowledge that doesn't already exist as a page?

**File it back when** the answer is a novel synthesis, comparison, analysis, or connection worth reusing — something you'd hate to lose to chat history.

**Don't file it back when** it's a one-off factual lookup already covered by an existing page. Not every answer needs a page; use judgment.

### Step 7: If filing back, create the page properly

Create the new page in the right domain, following the wiki's page conventions:
- A `**Related:**` line near the top linking connected pages
- `[[wikilinks]]` throughout
- A `## Sources` line citing the wiki pages (and any raw source) it was built from

Then wire it in:
- Add it to the domain's `_index.md` with a one-line summary
- Update `pages` / `total_pages` and `last_updated` in the domain and master indexes
- Tell the user: "Filed this as `knowledge/wiki/{domain}/{page-name}.md`."

### Step 8: Log the query

Append one line to `knowledge/wiki/_log.md`:

```markdown
## [{today}] query | {what was asked}

Pages read: {list}. {Filed back as {page} | No new page — covered by existing knowledge}.
```

---

## Examples

### Example 1: A grounded answer, no new page
User says: "What are the top pains my customers mention?"
Actions: Read master index → read the relevant domain index → open the voice-of-customer page → answer with the ranked pains, each cited.
Result: A cited answer pulled from compiled knowledge in seconds. No new page (it's already a page).

### Example 2: A synthesis worth keeping
User says: "How does what competitor A does compare to competitor B?"
Actions: Read indexes → open both competitor pages → synthesise a comparison that doesn't exist yet → file it as `knowledge/wiki/{domain}/competitor-a-vs-b.md` with wikilinks to both → log it.
Result: The comparison is answered AND saved, so the next time it's one page-read away.

### Example 3: A gap
User says: "What do we know about pricing psychology?"
Actions: Read indexes → no page covers it.
Result: "The wiki doesn't have this yet. Drop a few sources into `knowledge/raw/{domain}/` and run the ingest skill, and I'll compile a page." Don't fabricate an answer.

---

## Troubleshooting

### The answer feels thin or generic
Cause: The relevant pages are sparse, or you answered before reading the right page.
Solution: Re-check the domain index for a better-matched page. If the knowledge genuinely isn't there, treat it as a gap (Example 3) — suggest an ingest, don't pad the answer.

### You're opening lots of pages to answer one question
Cause: The index summaries are too vague to route on, or pages overlap.
Solution: Answer the question, then suggest a lint — the index or the page structure needs tightening.

### The pages contradict each other
Cause: A newer source updated one page but not another.
Solution: Surface both values in the answer, flag which page looks more current, and suggest a lint to resolve it. Don't silently pick one.

---

## Important Notes

- **Read the index first, every time.** It's what keeps query fast as the wiki grows — you open fewer pages, not more.
- **Never re-read all of `knowledge/raw/`.** Query reads the compiled wiki. Raw is for provenance checks only, one source at a time.
- **Cite everything non-obvious** with `[[wikilinks]]` so claims stay traceable.
- **File valuable answers back** — this is the habit that makes the wiki compound instead of leaking into chat.
- **A gap is a useful result.** "The wiki doesn't cover this, here's what to ingest" beats a confident guess.

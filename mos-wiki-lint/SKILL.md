---
name: mos-wiki-lint
description: "Health check the LLM Wiki — scan for orphan pages, stale data, missing cross-references, contradictions, index mismatches, and data gaps. Produces an actionable report and optionally auto-fixes issues. Use when: user says 'wiki lint', 'health check the wiki', 'wiki health check', 'check the wiki', 'lint wiki', 'wiki audit', 'clean up the wiki', 'wiki maintenance', or wants to verify wiki integrity. Also useful after a large batch of ingests or when the wiki feels stale."
---

# TVML Wiki Lint

Run a health check across the wiki to find issues that degrade knowledge quality over time — orphaned pages, missing cross-references, stale data, index mismatches, and contradictions. Produces an actionable report and optionally fixes what it can.

> Built on The Vibe Marketing Lab's take on Andrej Karpathy's LLM Wiki pattern.

Think of this as the equivalent of a linter for code, but for a knowledge base. It catches the maintenance debt that accumulates as the wiki grows.

---

## Workflow

### Step 1: Scope the lint

Determine what to lint:

- **Full wiki:** `"lint the wiki"` → scan everything under `knowledge/wiki/`
- **Single domain:** `"lint knowledge/wiki/research"` → scan only that domain
- **Specific check:** `"check for orphan pages"` → run only that check

If the user doesn't specify, default to a full wiki lint.

### Step 2: Build the page graph

Read all wiki files and build a map of:

```
For every .md file in knowledge/wiki/ (excluding _index.md and _log.md):
  - File path
  - All [[wikilinks]] it contains (outbound links)
  - All pages that link TO it (inbound links — computed from outbound links)
  - Last modified date
  - Whether it appears in its domain's _index.md
  - Whether it appears in the master _index.md
```

This graph is the foundation for all checks.

### Step 3: Run checks

Run all applicable checks and collect findings. Each finding has a severity (error, warning, info) and a suggested fix.

#### Check 1: Orphan Pages
Pages with zero inbound links (nothing links to them).

```
For each page:
  if inbound_links == 0 and page is not an _index.md:
    → WARNING: "{page}" has no inbound links — it's invisible in the graph
    → Fix: Add [[wikilinks]] from related pages, or add to domain index
```

#### Check 2: Broken Links
Wikilinks that point to pages that don't exist.

```
For each [[wikilink]] in every page:
  if target page doesn't exist:
    → ERROR: "{page}" links to [[{target}]] but {target}.md doesn't exist
    → Fix: Create the page, or fix the link
```

#### Check 3: Index Mismatches
Pages that exist but aren't in the index, or index entries pointing to missing pages.

```
For each domain:
  pages_on_disk = list of .md files in knowledge/wiki/{domain}/
  pages_in_index = [[wikilinks]] listed in knowledge/wiki/{domain}/_index.md

  For pages on disk but NOT in index:
    → WARNING: "{page}" exists but isn't listed in {domain}/_index.md
    → Fix: Add to index with one-line summary

  For pages in index but NOT on disk:
    → ERROR: {domain}/_index.md references [[{page}]] but the file doesn't exist
    → Fix: Create the page, or remove from index
```

Also check the master index `knowledge/wiki/_index.md`:
- Domain page counts match actual counts
- All domains listed match actual domain directories
- `total_pages` and `last_updated` are current

#### Check 4: Missing Related Links
Pages that should logically be cross-referenced but aren't.

```
For each page in the same domain:
  if page A mentions a term that matches page B's title (case-insensitive):
    if page A doesn't link to page B:
      → INFO: "{page_a}" mentions "{term}" but doesn't link to [[{page_b}]]
      → Fix: Add [[wikilink]]
```

#### Check 5: Missing Related Section
Pages without a `**Related:**` line near the top.

```
For each page (excluding _index.md, _log.md):
  if page doesn't contain "**Related:**" or "## Related":
    → WARNING: "{page}" has no Related section — it's disconnected from the graph
    → Fix: Add **Related:** line with links to connected pages
```

#### Check 6: Stale Data Indicators
Pages that may contain outdated information.

```
For each page:
  if page contains dates more than 6 months old and no newer dates:
    → INFO: "{page}" may be stale — last date referenced is {date}
    → Fix: Review and update, or mark as historical

  if page contains "TBC", "TBD", "TODO", or "[pending]":
    → INFO: "{page}" has unresolved placeholders: {list}
    → Fix: Fill in or remove
```

#### Check 7: Contradictions
Facts that conflict across pages. This is the hardest check — use judgment.

```
For key facts that appear on multiple pages (prices, dates, metrics, counts):
  if the same fact has different values on different pages:
    → ERROR: Contradiction — "{fact}" is "{value_a}" on {page_a} but "{value_b}" on {page_b}
    → Fix: Determine which is correct, update both pages
```

Focus on numerical data: prices, dates, metrics, counts, percentages. These are the most likely to diverge after updates.

#### Check 8: Empty Domains
Wiki domains with an _index.md but no actual content pages.

```
For each domain directory:
  if only file is _index.md:
    → INFO: knowledge/wiki/{domain}/ has no content pages — consider ingesting sources from knowledge/raw/{domain}/ or removing the domain
```

### Step 4: Generate the report

Present findings organised by severity:

```markdown
# Wiki Lint Report — {date}

**Scope:** {full wiki / domain name}
**Pages scanned:** {count}
**Links scanned:** {count}

## Errors ({count})
{Issues that break the wiki — missing pages, contradictions}

## Warnings ({count})
{Issues that degrade quality — orphans, index mismatches}

## Info ({count})
{Suggestions — stale data, missing cross-refs, data gaps}

## Suggested New Pages
{Topics referenced frequently but lacking their own page}

## Summary
{1-2 sentence overall assessment}
```

### Step 5: Ask about auto-fix

If there are fixable issues, ask the user:

"I found {N} issues. {X} can be auto-fixed (index updates, missing Related sections, broken link fixes). Want me to fix those now, or just leave the report?"

If the user says yes, fix them:
- Update `_index.md` files to match actual pages
- Add `**Related:**` sections to pages missing them
- Fix page count discrepancies in indexes
- Fill in obvious missing `[[wikilinks]]`

Do NOT auto-fix:
- Contradictions (need human judgment on which value is correct)
- Stale data (need human judgment on whether to update or mark historical)
- Creating new pages (suggest them, but don't create without content)

### Step 6: Log the lint pass

Append to `knowledge/wiki/_log.md`:

```markdown
## [{today}] lint | Wiki health check

Scope: {full wiki / domain}
Pages scanned: {count}
Findings: {errors} errors, {warnings} warnings, {info} info
Auto-fixed: {count} issues (if applicable)
Key issues: {1-2 sentence summary of most important findings}
```

---

## When to Suggest a Lint

If you notice signs of wiki drift during normal work (e.g., a page references something that doesn't exist, or an index seems outdated), mention it:

"The research wiki index shows 6 pages but I count 7 on disk. Want me to run a quick lint?"

Don't run a full lint automatically — it should be user-initiated or suggested.

---

## Important Notes

- Read the entire wiki (or scoped domain) before reporting. Don't report issues piecemeal.
- The contradiction check is the most valuable and the hardest. Prioritise numerical facts.
- Empty domains aren't errors — they're scaffolding for future use. Only flag as info.
- The lint report itself doesn't need to be saved as a wiki page. It's ephemeral. Only the log entry persists.
- If the wiki is very large (100+ pages), scope to one domain at a time rather than full-wiki lint.

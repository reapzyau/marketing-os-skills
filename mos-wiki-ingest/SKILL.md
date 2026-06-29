---
name: mos-wiki-ingest
description: "Ingest source material into the LLM Wiki — reads sources from knowledge/raw/, URLs, or conversation context, then compiles into wiki pages with wikilinks, updates indexes, and logs the ingest. Use when: user says 'ingest this', 'ingest knowledge/raw/', 'process this source', 'add to wiki', 'compile this into the wiki', 'wiki ingest', drops a file in knowledge/raw/ and wants it processed, pastes content and says to add it to the knowledge base, or provides a URL to compile into wiki pages. Also triggers when the user asks a research question and the answer should be filed into the wiki."
---

# TVML Wiki Ingest

Read source material and compile it into the wiki. This is the core loop of the Karpathy LLM Wiki pattern — sources go in, compiled knowledge comes out as interlinked markdown pages.

> Built on The Vibe Marketing Lab's take on Andrej Karpathy's LLM Wiki pattern.

A single source might touch 5-15 wiki pages. That's the point — cross-referencing is done once during ingest, not re-derived on every query.

---

## Input Types

The ingest workflow accepts several input types:

1. **File path** — `"ingest knowledge/raw/research/algo-update-article.md"`
2. **Folder path** — `"ingest everything in knowledge/raw/research/"` (batch mode)
3. **URL** — `"ingest https://example.com/article"` (fetch and compile)
4. **Conversation context** — user provides information verbally ("the founder said they hit 10k MRR in month three")
5. **Research query** — user asks a question, the answer gets compiled into the wiki

---

## Workflow

### Step 1: Identify the source and domain

Determine what's being ingested and which wiki domain it belongs to.

- If a file/folder path is given, read it
- If a URL is given, fetch it with WebFetch
- If information is provided in conversation, treat it as the source
- Determine the domain from the file path (e.g., `knowledge/raw/research/` → `knowledge/wiki/research/`) or from the content itself

If the domain doesn't exist yet in the wiki, create it:
```bash
mkdir -p knowledge/raw/{new-domain} knowledge/wiki/{new-domain}
```
Then create `knowledge/wiki/{new-domain}/_index.md` with the standard template. Update `knowledge/wiki/_index.md` to include the new domain.

### Step 2: Read the existing wiki state

Before creating or updating pages, understand what already exists:

```
1. Read knowledge/wiki/_index.md (master index — what domains and pages exist)
2. Read knowledge/wiki/{domain}/_index.md (domain index — what's in this specific domain)
3. If updating existing pages, read those pages
```

This prevents duplicates and ensures updates build on existing knowledge rather than creating parallel pages.

### Step 3: Read and analyse the source

Read the source material thoroughly. Identify:

- **Entities** — specific things mentioned (people, products, tools, companies, books, places)
- **Concepts** — topics or categories covered (methodologies, comparisons, frameworks)
- **Facts** — specific data points, numbers, dates, claims
- **Relationships** — how entities and concepts connect to each other and to existing wiki pages

### Step 4: Create or update wiki pages

For each entity or concept identified:

**If a page already exists** — update it:
- Add new information in the appropriate section
- Note where new data confirms, extends, or contradicts existing content
- Update any changed facts (numbers, prices, dates, status)
- Add new `[[wikilinks]]` to connect to related pages

**If no page exists yet** — create it:

For **entity pages**:
```markdown
# {Entity Name}

{Brief description}

**Related:** [[page1]] | [[page2]] | [[page3]]

---

{Structured content — tables, sections, data}

## Sources

- {Source citation with date}
```

For **concept pages**:
```markdown
# {Concept Title}

{Brief description of what this concept covers}

**Related:** [[page1]] | [[page2]] | [[page3]]

---

{Structured content — comparisons, evidence, recommendations}

## Sources

- {Source citations with dates and URLs}
```

**Key conventions:**
- Every page gets a `**Related:**` line near the top linking to connected pages
- Use `[[wikilinks]]` throughout for Obsidian graph view compatibility
- Entity names in wikilinks: `[[stripe|Stripe]]` (lowercase filename, display name)
- Keep filenames lowercase, hyphenated: `content-distribution.md`, `technical-seo.md`
- Include source citations so claims are traceable

### Step 5: Update cross-references

After creating new pages, check existing pages for references that should link to the new content:

- Search existing wiki pages for mentions of the new entity/concept name
- Add `[[wikilinks]]` where appropriate
- Update `**Related:**` lines on connected pages

This is what makes the wiki a graph, not just a folder of files.

### Step 6: Update the domain index

Update `knowledge/wiki/{domain}/_index.md`:

- Add new pages to the appropriate section (Entity Pages or Concept Pages)
- Include a one-line summary with `[[wikilinks]]`
- Update the `pages` count in frontmatter
- Update `last_updated` date

### Step 7: Update the master index

Update `knowledge/wiki/_index.md`:

- Update the domain's page count
- If this is a new domain, add it to the domains list
- Update `total_pages` and `last_updated` in frontmatter

### Step 8: Append to the change log

Append to `knowledge/wiki/_log.md`:

```markdown
## [{today}] ingest | {Brief description of what was ingested}

Source: {file path, URL, or "conversation context"}
{What was created or updated — list pages touched}
```

### Step 9: Summarize to the user

Tell the user what was compiled:

- Which pages were created or updated
- Key facts extracted
- Any contradictions with existing wiki content (flag these explicitly)
- Any data gaps or follow-up questions worth investigating

---

## Batch Ingest

When ingesting a folder of sources:

1. List all files in the folder
2. Process them sequentially (order matters — earlier sources build context for later ones)
3. After all sources are processed, do a single pass to update all indexes and cross-references
4. Write one consolidated log entry

For large batches (10+ files), ask the user if they want to review after each source or process all at once.

---

## Filing Query Answers Back

When the user asks a question and the answer is valuable enough to keep:

1. Synthesise the answer from existing wiki pages (the query workflow)
2. If the answer produces a new comparison, analysis, or synthesis that doesn't exist as a page yet — create it
3. Tell the user: "This answer is worth keeping — I've filed it as `knowledge/wiki/{domain}/{page-name}.md`"

Not every answer needs to be filed. Use judgment: one-off factual lookups don't need a page. Novel syntheses, comparisons, and analyses do.

---

## Important Notes

- **Never modify files in `knowledge/raw/`** — raw sources are immutable. The wiki is where compiled knowledge lives.
- **Always read the index first** — before creating pages, check what already exists to avoid duplicates.
- **Contradictions are valuable** — if new source data conflicts with existing wiki content, flag it explicitly. Don't silently overwrite.
- **One ingest can touch many pages** — a single article on "content marketing" might update entity pages (a tool, a creator), concept pages (distribution, repurposing), and create new pages. This is expected.
- **Source citations matter** — every fact in the wiki should be traceable back to a source. Include URLs, dates, and titles.

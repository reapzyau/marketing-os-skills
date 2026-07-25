---
name: mos-copy-research
description: "Mandatory research preflight that runs the 6-step research ladder BEFORE any copywriting is written, so copy is grounded in real reader language, not guesses. Maintains a COMPOUNDING avatar knowledge system — an append-only Avatar Knowledge Log (every new learning about the reader) synthesised into the canonical Research Bank (One Reader, DNIC, Transformation & Decision map, IVOC, FABD) — and locks the per-piece One Idea / Offer / Action. Interactive: mines real sources, then confirms via clickable questions. Modes: full ladder, express, --learn (capture one new insight), --harvest (auto-mine new DMs/calls), --refresh (re-synthesise). Multi-avatar (your main business by default; each client or separate offer gets its own library). Use when: user says 'copy research', 'research preflight', 'research ladder', 'build the research bank', 'refresh the research', 'capture this about the avatar', 'log this learning', 'harvest the DMs', OR automatically as the gate before any copywriting skill (skool post, X, LinkedIn, email, about page, sales page, offer) when no fresh Research Bank exists."
---

# Copy Research Ladder — the compounding preflight gate before any copy

> **Core law (from the copywriting playbook): copy is 80% research, 20% writing.** "If you research well and follow the research, you can write good copy without any formula." This skill is the 80%. No copy gets written without passing this gate.

## The model: a compounding library, not a quarterly snapshot

Avatar knowledge is **accreted, not rebuilt**. Every customer interaction — a DM, a sales call, a comment, a churn reason, a course insight — is a free research datapoint. We never throw them away. Two layers:

1. **Avatar Knowledge Log** (`<avatar-dir>/avatar-knowledge-log.md`) — **append-only**. Every new learning lands here as a dated, tagged, evidence-cited entry. This is the compounding asset; it only grows.
2. **Research Bank** (`<avatar-dir>/copy-research-bank.md`) — the **synthesised "current best" view** the copywriter actually loads. Ranked, deduped, and rolled up *from* the Log. Has a `last_refreshed` date and a 90-day freshness window.

The writer never reads the raw Log — it reads the clean, synthesised Bank. The Log keeps the signal; the Bank keeps it usable. (Why split them: an append-only log alone becomes an unusable swamp; a snapshot alone is lossy and goes stale. The Log + synthesis gives both compounding memory *and* clean signal — see Guardrails.)

### The Bank's stable layers (synthesised from the Log)
1. **One Reader** — the single avatar (+ awareness & sophistication stage)
2. **DNIC** — Desires, Notions, Identifications, Characteristics
3. **Transformation & Decision map** — Before→After state, Top Goals, Buyer Decision Questions, What They've Tried, Objection→Rebuttal bank
4. **IVOC** — a ranked bank of the reader's *exact words*
5. **FABD** — feature → advantage → benefit → deeper-benefit ladder for the core offer

The two **per-piece** layers (One Idea, One Offer/Action) change every time and are locked at write-time — see Step 6, not stored.

---

## Multi-avatar (which library am I working in?)

This skill is **per-avatar**. Resolve `<avatar-dir>` before anything else:

- **Your main business (default)** — Bank: `business/offer/copy-research-bank.md`; Log + avatar: `business/audience/_shared/`; sources = the mine list below.
- **A client engagement** — that client's own project folder; sources = that client's DMs, sales calls, discovery notes, and their customers' reviews.
- **A separate offer** — its own `business/offer/<offer-slug>/`; sources as available.

If the avatar isn't obvious from context, ask which one (AskUserQuestion). Each avatar gets its own Log + Bank. Never blend two avatars' language into one Bank.

---

## Modes (route at Step 0)

| Invocation / trigger | Mode | What it does |
|----------------------|------|--------------|
| Default — called as the gate before copy, or "copy research" / "build the bank" | **Ladder** | Steps 0–6 (full or express by stakes) |
| `--learn "<insight>"`, "log this learning", "capture this about the avatar" | **Capture** | Append ONE dated, tagged, cited entry to the Log; if it changes the picture, fold into the Bank |
| `--harvest`, "harvest the DMs", "mine new conversations" | **Harvest** | Auto-mine NEW sources since the Log's last harvest → append findings to the Log → re-synthesise the Bank |
| `--refresh`, "refresh the research" | **Refresh** | Re-synthesise the Bank from the full Log (no new mining); reset `last_refreshed` |

Capture and Harvest are how the library compounds between full ladder runs.

---

## Step 0 — Triage + existence check (always run first)

**A. Resolve the avatar** (see Multi-avatar) → set `<avatar-dir>`.

**B. Check for an existing Bank.** Read `<avatar-dir>/copy-research-bank.md`.
- Populated (not the empty scaffold) and `last_refreshed` within **90 days** → the stable research is **already there**. Skip the full ladder → Step 6 (per-piece overlay), unless the user asked to refresh.
- Missing, empty scaffold, or older than 90 days → run the full ladder (Steps 1–5), then Step 6.
- Also check the Log exists; if not, create it from the scaffold in "The Avatar Knowledge Log" section below.

**C. Decide the path by stakes** (the playbook's "scale research to the fee" rule):

| Stakes | Surfaces | Path |
|--------|----------|------|
| **High** | Sales page, About page, email sequence, offer, lead magnet, VSL, **YouTube script** | **Full ladder** — Steps 1–6, even if a Bank exists (re-validate it; pull the Transformation & Decision layers, not just IVOC). A flagship video carries the whole channel, so it gets the complete Bank, not the express subset. |
| **Quick** | Skool post, X post, LinkedIn post, single email, comment | **Express pass** — fresh Bank exists: confirm the Reader, pull 2–3 relevant IVOC quotes, lock Step 6. No Bank → build it once (full ladder), then quick posts ride the Bank. |

State which avatar, mode, and path you're taking before proceeding.

---

## How to run each step (the method, every time)

**Mine first, ask second.** Never ask the user a research question cold. For each step: pull candidate answers from real sources, *propose* them, and use **AskUserQuestion** to confirm, correct, or add. Grounds every answer in evidence and respects the user's time.

**Real TVML sources to mine** (in priority order; swap for the client's sources on other avatars):
- `skool/dms/` (member DMs, by month) + `skool/dms/members.csv`
- Member conversations / research artifacts in `business/research/`
- `business/audience/_shared/avatar.md` + `buyers-journey.md`; `reference/core/audience.md`, `reference/core/offer.md`
- YouTube comments and competitor comment threads (Apify or Research skill)
- Reddit / marketing forums (append "forum" to searches; Research skill)

**The IVOC rule:** copy the reader's words **verbatim and in their vocabulary**. "Drowning in AI tools" goes in the Bank exactly — never "navigating the AI landscape." Tally recurrence; frequency sets messaging priority.

---

## The 6-Step Ladder

### Step 1 — One Reader
Mine `avatar.md` + DMs. Propose a single avatar (role, situation, **awareness** stage, **sophistication** stage). Confirm via AskUserQuestion. Lock one person — never "marketers" in general.

### Step 2 — The Avatar Profile (DNIC + Transformation & Decision map)
The emotional and decision core. Propose 2–4 items per area mined from real language, then confirm/extend via AskUserQuestion (batch related ones). **Tier by stakes:** quick pieces need DNIC + objections; high-stakes pieces (sales/About/offer/VSL) populate the whole profile.

**DNIC (the emotional core):**
- **Desires** — what they want; the pain they want gone (surface *and* deep).
- **Notions** — *firm* beliefs (never violate) and *shakable* beliefs (your best objections to overturn).
- **Identifications** — labels they claim ("SEO", "freelancer", "agency owner", "builder").
- **Characteristics** — age/income/role (use sparingly).

**Transformation & Decision map (the four high-leverage additions — from the Alisha/Hormozi avatar method):**
- **Before → After** — the "crappy before state" (their day/identity now, in their words) and the **Dream Outcome** (who they become). This is the spine of every sales narrative. Frame with Hormozi's value equation: dream outcome × perceived likelihood ÷ time delay ÷ effort/sacrifice — copy raises the top, shrinks the bottom.
- **Top Goals** — their 3–5 ranked goals (what "winning" looks like to *them*, not to you).
- **Buyer Decision Questions** — the exact questions they ask themselves before buying/joining ("will this work for someone non-technical?", "is this just more theory?"). Copy must answer these.
- **What They've Tried** — the failed solutions / competitors / DIY attempts behind them. Powers the "you've tried X, here's why it didn't work, here's what's different" move. Capture what they tried *and why it let them down*.
- **Objection → Rebuttal bank** — their roadblocks, **ranked by frequency**, each paired with the truth that overturns it (grounded in IVOC, not invented). Deliberately includes the hard "no" objections, not just the easy ones.

### Step 3 — IVOC (exact words — the highest-leverage step)
Mine DMs / conversations / comments for **verbatim quotes** about their problem and desired outcome. Cluster, one-line summary per cluster, **rank by frequency**. Present the ranked list; ask which ring truest (AskUserQuestion). Becomes the messaging priority order. Stop when ~10 new sources surface nothing new. **Log disconfirming quotes too** — objections, churn reasons, "this isn't for me" — they feed the Objection bank and stop confirmation bias.

### Step 4 — FABD ladder (for the core offer)
Drill feature → advantage → benefit → **deeper benefit** with "but what does that really mean?" until the "oh, damn" line (the desired self). Propose, confirm the deeper benefit. Don't invent it; infer from Step 3's language.

### Step 5 — Synthesise the Bank (from the Log)
Write/refresh `<avatar-dir>/copy-research-bank.md` from Steps 1–4 **and the full Avatar Knowledge Log**: dedupe, rank, and keep the *current best* view (recent evidence weighted — see Guardrails). Set `last_refreshed` to today, append a Refresh-log row (what changed + new sources mined). The Bank is a synthesis, never an append target.

### Step 6 — Per-piece overlay (One Idea + One Offer/Action — every piece)
Runs on *every* invocation, full or express. Using the Bank as input, lock via AskUserQuestion:
- **One Idea** — the single most powerful point connecting this reader to this topic (big benefit + how / the unique mechanism / why-believe-you). In a Stage-4 market (AI marketing), prefer the **mechanism** angle (Claude Code / the documented system / a named build).
- **One Offer/Objective** — what they get / what this piece is for.
- **One Action** — the single specific CTA.

Hand these three + the relevant Bank slice (Reader + top IVOC + deeper benefit; **+ objections & decision questions for high-stakes pieces**) to the writing skill / Copywriter agent as the research half of its BRIEF.

---

## Capture mode (`--learn`) — how the library compounds

When you learn something new about the avatar (a DM line, a sales-call moment, a comment, a churn reason, a new objection, an insight from a course), append ONE entry to `<avatar-dir>/avatar-knowledge-log.md`:

```
## [YYYY-MM-DD] <layer> | <one-line insight>
- **Evidence:** "<verbatim quote or specific observation>" — <source>
- **Layer:** Desire | Notion | Identification | Before→After | Goal | DecisionQuestion | Tried-Before | Objection | IVOC | FABD
- **Confidence:** high (verbatim / repeated) | med (single source) | low (inference)
- **Disconfirming?** yes/no  ← flag if it contradicts the current Bank
```

Then judge: does this change the picture? If it's a new high-frequency pattern or a contradiction → fold it into the Bank now (and note it in the Refresh log). If it's a single low-confidence datapoint → leave it in the Log to accumulate until the next synthesis. Capture is one entry, fast — never make logging a learning feel like a project, or it won't happen.

---

## Harvest mode (`--harvest`) — auto-grow the library

Mine NEW sources since the Log's last harvest (new DMs in `skool/dms/`, new sales-call transcripts, recent comments). For each genuinely new insight, append a Log entry (Capture format). Then re-synthesise the Bank (Step 5). Record the harvest's date + sources mined in the Refresh log. This is how the library grows without manual effort — run it periodically or when a batch of new conversations lands.

---

## The Avatar Knowledge Log — scaffold (create if missing)

```
---
type: avatar-knowledge-log
avatar: <avatar-slug>
created: YYYY-MM-DD
last_harvest: YYYY-MM-DD
append_only: true
---

# <Avatar> — Avatar Knowledge Log

> Append-only. Every new learning about the reader lands here, dated + tagged + cited.
> Never edited or pruned — the Research Bank is the synthesised view; this is the raw compounding memory.
> Newest entries at the top.

<!-- entries go here, newest first, in the Capture format -->
```

---

## Guardrails (so the library stays an asset, not a swamp)

- **Date + decay.** Every entry is dated. Synthesis weights *recent* evidence — a 2024 quote can mislead in a fast-moving market (the avatar evolves). Old, contradicted entries stay in the Log (history) but lose weight in the Bank.
- **Log disconfirming evidence.** Deliberately capture objections, "no" quotes, churn reasons — not just what flatters the offer. Confirmation bias is the main way a research bank goes wrong.
- **Synthesis dedupes + ranks.** The Bank only ever shows the ranked, deduped current-best. Raw accumulation lives in the Log.
- **Quarterly lint.** On refresh, scan the Bank for stale claims, contradictions, and orphan layers (e.g. the offer changed but FABD didn't). Fix and note in the Refresh log. (The TVML Bank already carries a load-bearing example: the product went all-free 2026-05-26 — any stale paid framing must be caught here.)
- **Don't over-collect at write-time.** Tier the profile by stakes (Step 2) so the gate stays fast for quick pieces and only goes deep when the fee justifies it — otherwise the gate gets skipped.

---

## Output of this skill (what you pass downstream)

A compact **Research Brief** the calling copywriting skill drops into its BRIEF to the Copywriter agent:
- One Reader (1–2 lines) + awareness/sophistication stage
- Top 3–6 IVOC quotes (verbatim, ranked) relevant to this piece
- The deeper benefit (desired self)
- The locked One Idea / One Offer / One Action
- **High-stakes pieces also get:** the relevant Before→After, the top Buyer Decision Questions this piece must answer, and the top Objection→Rebuttals.

The Copywriter agent's operating procedure (step 2) expects exactly this. With it, the agent writes in the reader's real words; without it, it must flag the copy as ungrounded.

---

## The gate (how this is enforced)

A project Hard Rule (TVML `CLAUDE.md` #11) requires this preflight before any copywriting skill. In practice:
- The writing skill's first step checks for a fresh Bank. Fresh → express path + Step 6. Missing/stale → run the full ladder.
- High-stakes surfaces always run the full ladder, even with a fresh Bank.
- If the user insists on skipping research entirely, write the copy but **flag in the output that it is ungrounded** (no real VOC) so the quality cost is visible.

#!/usr/bin/env bun
/**
 * lint-copy.ts — deterministic anti-slop gate for TVML/RDG copy.
 *
 * The Council's #1 finding: format/voice rules resist prompting, so verify them
 * in code at the CALLER instead of trusting the writer's self-scored "Tier 5: 10/10".
 * Implements the rules learned across this repo:
 *   - em-dash ≤ 1 (recurring em-dash is the top AI tell)
 *   - no staccato / anaphoric triad ("One task. One Claude. One pass." / "Real X, real Y, no Z")
 *   - no thought-leadership reframe-pronouncements ("You don't have a X problem...")
 *   - no banned hype words, no filler phrases, no ellipses in body
 *   - "you" present, "because" present (warns)
 *   - decorative emojis ≤ 2 (functional keycaps + structural ✅🎁⚠️👉🔸 don't count)
 *   - surface=skool: no markdown headers/bold/tables/links
 *
 * Usage:
 *   bun lint-copy.ts <file.md> [--surface skool|x|linkedin|email|about|generic|spoken] [--json] [--body-only]
 *   cat draft.txt | bun lint-copy.ts --stdin --surface skool
 *
 * surface=spoken (script VO read aloud — see references/spoken-script-rules.md):
 *   SKIPS written-only checks (em_dash, ellipses, staccato/anaphoric triad, emoji, caps)
 *   because oral devices are encouraged in scripts; downgrades tl_reframe FAIL→WARN
 *   (contrarian snapback vs reader-diagnosis is a judgement call); keeps the universal
 *   checks: banned hype, filler, you/because, round-number specificity.
 *
 * surface=lesson (Skool classroom lesson — see references/lesson-blueprints.md):
 *   runs every generic check PLUS the lesson hard-format rules: intro cleanliness
 *   (<Video Coming Soon> once, adjacent to the H1, no metadata block, exactly one H1),
 *   title length (WARN >30 chars, FAIL >40), heading hierarchy (no skipped levels),
 *   table ban, no [VIDEO]/[IMAGE]/[INFOGRAPHIC] placeholder markers, "Next up:" close
 *   (WARN if missing; pass --final to suppress for a course's last lesson), exclamation
 *   marks (FAIL), emoji/ALL-CAPS promoted WARN→FAIL, a readability proxy (WARN outside
 *   8-14 words/sentence, FAIL >20), and apologetic-hedge/throat-clearing filler (FAIL).
 *
 * Exit code: 0 = all hard checks pass, 1 = one or more FAILs. WARNs never fail the build.
 * --body-only strips YAML frontmatter and a trailing "## Posting Notes"/"---" tail before linting.
 * --final: surface=lesson only — suppresses the "Next up:" WARN for a course's final lesson.
 */

type Status = "PASS" | "FAIL" | "WARN";
interface Check { name: string; status: Status; detail: string; }

const args = process.argv.slice(2);
const flag = (n: string) => args.includes(n);
const opt = (n: string, d: string) => { const i = args.indexOf(n); return i >= 0 && args[i + 1] ? args[i + 1] : d; };

const surface = opt("--surface", "skool").toLowerCase();
// Spoken scripts (VO read aloud) skip written-only checks — repetition is spoken formatting.
const spoken = surface === "spoken" || surface === "script";
const asJson = flag("--json");
const bodyOnly = flag("--body-only");
const finalLesson = flag("--final"); // surface=lesson only: suppress "Next up:" WARN for a course finale

// ---- load text -------------------------------------------------------------
let text = "";
if (flag("--stdin")) {
  text = await Bun.stdin.text();
} else {
  const file = args.find(a => !a.startsWith("--") && a !== opt("--surface", "skool"));
  if (!file) { console.error("Provide a file path or --stdin"); process.exit(2); }
  text = await Bun.file(file).text();
}

// Strip frontmatter + posting-notes tail when asked, so we lint the POST, not the metadata.
let body = text;
if (bodyOnly) {
  body = body.replace(/^---\n[\s\S]*?\n---\n/, "");            // YAML frontmatter
  body = body.split(/\n---\s*\n##?\s*Posting Notes/i)[0];      // drop "---\n## Posting Notes" tail
  body = body.split(/\n##?\s*Posting Notes/i)[0];
}
body = body.trim();

// surface=lesson only: strip a leading HTML editorial comment (e.g. the locked canonical
// sample's "DO NOT EDIT WITHOUT APPROVAL" header) before ANY check runs — it's never real
// lesson content and would otherwise skew em-dash/caps/exclamation counts below. Gated on
// surface, so generic/skool keep reading the untouched `body` exactly as before.
if (surface === "lesson") {
  body = body.replace(/^<!--[\s\S]*?-->\s*\n?/, "").trim();
}

// ---- data ------------------------------------------------------------------
const BANNED = [
  "game-changer", "game changer", "gamechanger", "unlock", "unleash", "skyrocket",
  "revolutionary", "dive in", "supercharge", "scale your marketing", "cutting-edge",
  "world-class", "industry-leading", "thought leader", "in this guide", "elevate your",
];
const FILLER = [
  "it's important to note", "it is important to note", "it goes without saying",
  "in today's world", "in today's landscape", "at the end of the day", "needless to say",
  "it's worth mentioning", "as we all know", "when it comes to", "the fact of the matter is",
  "in order to", "due to the fact that", "at this point in time", "on a daily basis", "a wide range of",
];
// reframe-pronouncements: the Hormozi/LinkedIn declarative flip
const REFRAME = [
  /\byou don'?t have an? [\w\s]{1,30}? problem\b/i,
  /\bthe real (problem|issue|question) (is|isn'?t)\b/i,
  /\bmost people think[\w\s,'"-]{1,60}?\.\s+(they'?re wrong|but they'?re wrong|wrong)\b/i,
  /\bit'?s not about [\w\s]{1,30}?,? it'?s about\b/i,
];
const checks: Check[] = [];
const add = (name: string, status: Status, detail: string) => checks.push({ name, status, detail });
const lc = body.toLowerCase();

// ---- 1. em-dash (written only — punctuation is invisible when spoken) ------
if (!spoken) {
  const emDashes = (body.match(/—/g) || []).length;
  add("em_dash", emDashes <= 1 ? "PASS" : "FAIL",
    emDashes <= 1 ? `${emDashes} em-dash (≤1 ok)` : `${emDashes} em-dashes — restructure all but at most one into full stops/colons (never hyphens)`);
}

// ---- 2. ellipses in body (written only — in scripts they're delivery cues) --
if (!spoken) {
  const ellipses = (body.match(/\.\.\.|…/g) || []).length;
  add("ellipses", ellipses === 0 ? "PASS" : "WARN", ellipses === 0 ? "none" : `${ellipses} ellipsis — trailing/uncertain tone; cut unless quoted speech`);
}

// ---- 3. staccato triad (written only — spoken word WANTS rhythmic repeats) --
if (!spoken) {
  const triad = body.match(/(?:^|[\n.!?]\s+)(\b[\w'']+(?:\s+[\w'']+){0,2}[.!])\s+(\b[\w'']+(?:\s+[\w'']+){0,2}[.!])\s+(\b[\w''']+(?:\s+[\w''']+){0,2}[.!])/);
  add("staccato_triad", triad ? "WARN" : "PASS",
    triad ? `possible staccato triple: "${triad[1]} ${triad[2]} ${triad[3]}" — confirm it's earned, not filler cadence` : "none detected");
}

// ---- 4. anaphoric "adj X, adj Y, no Z" (written only — see spoken-script-rules.md) --
if (!spoken) {
  const anaphor = body.match(/\b(\w+)\s+\w+,\s+\1\s+\w+,\s+(no|not)\s+\w+/i)
    || body.match(/\b(real|more|less|just|pure)\s+\w+,\s+\w+\s+\w+,\s+(no|not)\s+\w+/i);
  add("anaphoric_triad", anaphor ? "WARN" : "PASS",
    anaphor ? `possible anaphoric triad: "${anaphor[0]}" — reads as slop tagline; rewrite as a sentence` : "none detected");
}

// ---- 5. thought-leadership reframe ------------------------------------------
// Spoken: WARN not FAIL — a contrarian snapback against a COMMON BELIEF is legit
// script structure (Kallaway hook formula); a diagnosis of the VIEWER is not. Human call.
const reframeHit = REFRAME.map(r => body.match(r)).find(Boolean);
add("tl_reframe", reframeHit ? (spoken ? "WARN" : "FAIL") : "PASS",
  reframeHit
    ? (spoken
      ? `reframe-pronouncement: "${reframeHit[0]}" — snapback against a common belief is fine; diagnosing the viewer is not. Judge by hand`
      : `reframe-pronouncement: "${reframeHit[0]}" — friend-not-guru: cut it, hand over value instead`)
    : "none");

// ---- 6. banned hype --------------------------------------------------------
const bannedHits = BANNED.filter(w => lc.includes(w));
add("banned_hype", bannedHits.length ? "FAIL" : "PASS", bannedHits.length ? `found: ${bannedHits.join(", ")}` : "none");

// ---- 7. filler phrases -----------------------------------------------------
const fillerHits = FILLER.filter(w => lc.includes(w));
add("filler", fillerHits.length ? "FAIL" : "PASS", fillerHits.length ? `found: ${fillerHits.join(", ")}` : "none");

// ---- 8. you / because ------------------------------------------------------
add("you_present", /\byou\b|\byou'?(re|ll|ve|d)\b|\byour\b/i.test(body) ? "PASS" : "WARN",
  /\byou\b/i.test(body) ? "writes to the reader" : "no 'you' — copy may be talking about itself, not to the reader");
const hasReasonWhy = /\bbecause\b|\bso (that|you)\b|\bwhich means\b|\bso you can\b/i.test(body);
add("because_present", hasReasonWhy ? "PASS" : "WARN",
  hasReasonWhy ? "reason-why present" : "no reason-why ('because'/'so you') — claims/CTAs convert better with one");

// ---- 9. decorative emoji count (written only — script docs aren't audience-facing) --
if (!spoken) {
  // Strip keycap sequences (1️⃣ = digit + FE0F + 20E3) and structural markers first.
  const STRUCTURAL = /[✅🎁⚠️👉🔸▪️◾•]/gu;
  const stripped = body.replace(/[0-9#*]️?⃣/g, "").replace(STRUCTURAL, "");
  const emoji = (stripped.match(/\p{Extended_Pictographic}/gu) || []).filter(e => e !== "️");
  const decN = emoji.length;
  add("decorative_emoji", decN <= 2 ? "PASS" : "WARN",
    `${decN} decorative emoji (≤2 ok; functional keycaps + ✅🎁⚠️👉🔸 excluded)${decN > 2 ? ` → ${emoji.join(" ")}` : ""}`);
}

// ---- 10. ALL-CAPS emphasis (written only — caps in scripts are overlay/delivery cues) --
if (!spoken) {
  const caps = [...new Set((body.match(/\b[A-Z]{3,}\b/g) || []))]
    .filter(w => !["FREE", "PAI", "SOP", "SOPS", "CTA", "DM", "DMS", "SEO", "VSL", "AI", "USP", "USA", "USD", "AUD", "UK", "FAQ", "TVML", "RDG", "CC", "WSL", "CLI", "TELOS"].includes(w));
  add("caps_emphasis", caps.length === 0 ? "PASS" : "WARN", caps.length ? `caps for emphasis: ${caps.join(", ")} (FREE + acronyms allowed)` : "none");
}

// ---- 11. round-number specificity ------------------------------------------
// Schwartz / Copy That §8.2: specific figures read as true, round ones as invented.
// Flag $ amounts / large counts / scale-word figures with a SINGLE significant digit
// ($5,000, 10,000, $1M). Genuinely specific or sourced numbers ($187,000, 3.4M, 94.4%,
// 104,861) keep ≥2 significant digits and are NOT flagged. Percentages are excluded —
// too often legitimately round (a 75% cap, a 50% split) — leave those to judgement.
const roundHits: string[] = [];
const numRe = /(?<![\d.])\$?\s?(\d{1,3}(?:,\d{3})+|\d+)\s*(million|billion|thousand|k|m|bn)?\b/gi;
let nm: RegExpExecArray | null;
while ((nm = numRe.exec(body)) !== null) {
  if (body[nm.index + nm[0].length] === "%") continue;        // skip percentages
  const hasDollar = nm[0].includes("$");
  const scale = nm[2];
  const digits = nm[1].replace(/,/g, "");
  if (!hasDollar && !scale && digits.length < 4) continue;    // ignore small bare numbers (14, 30, 65)
  const sig = digits.replace(/0+$/, "");                       // significant digits = strip trailing zeros
  const value = parseInt(digits, 10);
  if (sig.length <= 1 && (hasDollar || scale || value >= 1000)) roundHits.push(nm[0].trim());
}
const roundUniq = [...new Set(roundHits)];
add("round_number", roundUniq.length === 0 ? "PASS" : "WARN",
  roundUniq.length === 0 ? "figures read as specific"
    : `round figure(s): ${roundUniq.join(", ")} — specificity = credibility (Schwartz); use a precise number or a range ($5,000 → $4,847 or $4,500–$5,500)`);

// ---- 12. surface = skool: no markdown --------------------------------------
if (surface === "skool") {
  const md: string[] = [];
  if (/^#{1,6}\s/m.test(body)) md.push("headers");
  if (/\*\*[^*]+\*\*/.test(body)) md.push("bold");
  if (/^\s*\|.*\|/m.test(body)) md.push("tables");
  if (/\[[^\]]+\]\([^)]+\)/.test(body)) md.push("links");
  add("skool_plaintext", md.length ? "FAIL" : "PASS", md.length ? `Skool renders none of: ${md.join(", ")} — convert to plain text/dot points` : "plain text ok");
}

// ---- 13. surface = lesson: Skool classroom lesson hard-format rules --------
// See references/lesson-blueprints.md § Hard format rules / Hard-banned phrases / Quality checklist.
if (surface === "lesson") {
  // `body` was already comment-stripped above (surface=lesson only) — use it directly.
  const nonBlank = body.split("\n").map(l => l.trim()).filter(l => l.length > 0);

  // -- intro: <Video Coming Soon> present once, in first 3 non-blank lines, adjacent to H1 --
  const videoCount = (body.match(/<Video Coming Soon>/g) || []).length;
  const videoIdx = nonBlank.findIndex(l => l === "<Video Coming Soon>");
  const h1Idx = nonBlank.findIndex(l => /^#(?!#)\s/.test(l));
  const videoInFirst3 = videoIdx >= 0 && videoIdx < 3;
  const videoAdjacentH1 = videoIdx >= 0 && h1Idx >= 0 && Math.abs(videoIdx - h1Idx) === 1;
  const videoOk = videoCount === 1 && videoInFirst3 && videoAdjacentH1;
  add("lesson_video_tag", videoOk ? "PASS" : "FAIL",
    videoOk ? "<Video Coming Soon> present once, adjacent to the H1, in the intro"
      : `<Video Coming Soon> issue — count:${videoCount} (want 1), in first 3 non-blank lines:${videoInFirst3}, adjacent to H1:${videoAdjacentH1}`);

  // -- exactly one H1 -----------------------------------------------------
  const h1Count = (body.match(/^#(?!#)\s/gm) || []).length;
  add("lesson_h1_count", h1Count === 1 ? "PASS" : "FAIL", `${h1Count} H1 heading(s) found — need exactly 1`);

  // -- no metadata block before the first H2 -------------------------------
  const firstH2Idx = body.search(/^##\s/m);
  const preH2 = firstH2Idx >= 0 ? body.slice(0, firstH2Idx) : body;
  const metaHit = preH2.match(/^\*\*[^*\n]+:\*\*/m);
  add("lesson_no_metadata_block", metaHit ? "FAIL" : "PASS",
    metaHit ? `metadata block line "${metaHit[0]}" before the first H2 — no **Module:**/**Lesson objective:**/**Time to complete:** lines, <Video Coming Soon> + H1 is the whole intro`
      : "no metadata block before the first H2");

  // -- title length: strip "Lesson X.X — " prefix, WARN >30, FAIL only >40 --
  const h1Match = body.match(/^#(?!#)\s+(.*)$/m);
  if (h1Match) {
    const rawTitle = h1Match[1].trim();
    const title = rawTitle.replace(/^Lesson\s+\d+(?:\.\d+)?\s*[—–:-]\s*/i, "").trim();
    const len = title.length;
    const titleStatus: Status = len > 40 ? "FAIL" : len > 30 ? "WARN" : "PASS";
    add("lesson_title_length", titleStatus, `"${title}" — ${len} chars (target ≤30, WARN >30, FAIL only >40)`);
  } else {
    add("lesson_title_length", "FAIL", "no H1 title found to measure");
  }

  // -- heading hierarchy: never skip a level (e.g. H2 → H4) ------------------
  const headings = [...body.matchAll(/^(#{1,6})\s+.*/gm)];
  let prevLevel = 0;
  const skips: string[] = [];
  for (const h of headings) {
    const level = h[1].length;
    if (prevLevel > 0 && level > prevLevel + 1) skips.push(`H${prevLevel}→H${level}`);
    prevLevel = level;
  }
  add("lesson_heading_hierarchy", skips.length ? "FAIL" : "PASS",
    skips.length ? `skipped heading level(s): ${skips.join(", ")} — never skip levels` : "no skipped heading levels");

  // -- table ban (Skool doesn't render tables — same rule as surface=skool) --
  const hasTable = /^\s*\|.*\|/m.test(body);
  add("lesson_no_tables", hasTable ? "FAIL" : "PASS",
    hasTable ? "table markdown detected — Skool doesn't render tables, convert to dot points" : "no tables");

  // -- no [VIDEO]/[IMAGE]/[INFOGRAPHIC] placeholder markers -------------------
  const placeholderHit = body.match(/\[(VIDEO PLACEHOLDER|VIDEO|IMAGE|INFOGRAPHIC)\]/i);
  add("lesson_no_placeholder_markers", placeholderHit ? "FAIL" : "PASS",
    placeholderHit ? `found "${placeholderHit[0]}" — the written lesson IS the script, no placeholder markers` : "none");

  // -- "Next up:" cliffhanger close — WARN if missing; --final suppresses it --
  const hasNextUp = /\bNext up:/i.test(body);
  if (hasNextUp) {
    add("lesson_next_up_close", "PASS", "Next up: close present");
  } else if (!finalLesson) {
    add("lesson_next_up_close", "WARN", "no 'Next up:' close — add the cliffhanger to the next lesson's payoff (pass --final for a course's last lesson)");
  }

  // -- exclamation marks (FAIL) — ignore quoted dialogue/bad-example snippets --
  const exclaimCount = (body.replace(/"[^"]*"/g, "").match(/!/g) || []).length;
  add("lesson_no_exclaim", exclaimCount === 0 ? "PASS" : "FAIL",
    exclaimCount === 0 ? "none" : `${exclaimCount} exclamation mark(s) — visual hype proxy, cut them`);

  // -- emoji / ALL-CAPS: same detection as checks 9-10, promoted WARN → FAIL --
  const STRUCTURAL_L = /[✅🎁⚠️👉🔸▪️◾•]/gu;
  const strippedEmoji = body.replace(/[0-9#*]️?⃣/g, "").replace(STRUCTURAL_L, "");
  const lessonEmoji = (strippedEmoji.match(/\p{Extended_Pictographic}/gu) || []).filter(e => e !== "️");
  add("lesson_emoji_cap", lessonEmoji.length <= 2 ? "PASS" : "FAIL",
    `${lessonEmoji.length} decorative emoji (≤2 ok)${lessonEmoji.length > 2 ? ` → ${lessonEmoji.join(" ")}` : ""}`);

  const lessonCaps = [...new Set((body.match(/\b[A-Z]{3,}\b/g) || []))]
    .filter(w => !["FREE", "PAI", "SOP", "SOPS", "CTA", "DM", "DMS", "SEO", "VSL", "AI", "USP", "USA", "USD", "AUD", "UK", "FAQ", "TVML", "RDG", "CC", "WSL", "CLI", "TELOS"].includes(w));
  add("lesson_caps_emphasis", lessonCaps.length === 0 ? "PASS" : "FAIL",
    lessonCaps.length ? `caps for emphasis: ${lessonCaps.join(", ")} (FREE + acronyms allowed)` : "none");

  // -- readability proxy: avg words/sentence, WARN outside 8-14, FAIL only >20 --
  const sentenceChunks = body
    .replace(/^#{1,6}\s.*$/gm, "")
    .split(/(?<=[.!?])\s+/)
    .map(s => s.trim())
    .filter(s => s.split(/\s+/).filter(Boolean).length >= 3);
  const totalWords = sentenceChunks.reduce((sum, s) => sum + s.split(/\s+/).filter(Boolean).length, 0);
  const avgWords = sentenceChunks.length ? totalWords / sentenceChunks.length : 0;
  const readStatus: Status = avgWords > 20 ? "FAIL" : (avgWords < 8 || avgWords > 14) ? "WARN" : "PASS";
  add("lesson_readability", readStatus, `${avgWords.toFixed(1)} avg words/sentence (target 8-14; WARN outside, FAIL only if >20)`);

  // -- apologetic-hedge / throat-clearing filler (lesson-only list, blueprint §170-171) --
  const LESSON_HEDGE = [
    "hopefully", "kind of", "sort of", "maybe", "i think", "perhaps",
    "as you may know", "i'm sure you've heard", "controversial take but",
  ];
  const hedgeHits = LESSON_HEDGE.filter(w => lc.includes(w));
  add("lesson_hedge_filler", hedgeHits.length ? "FAIL" : "PASS",
    hedgeHits.length ? `apologetic hedge/throat-clearing found: ${hedgeHits.join(", ")}` : "none");
}

// ---- report ----------------------------------------------------------------
const fails = checks.filter(c => c.status === "FAIL");
const warns = checks.filter(c => c.status === "WARN");

if (asJson) {
  console.log(JSON.stringify({ surface, pass: fails.length === 0, fails: fails.length, warns: warns.length, checks }, null, 2));
} else {
  const icon = (s: Status) => s === "PASS" ? "✓" : s === "WARN" ? "▲" : "✗";
  console.log(`\n  lint-copy — surface: ${surface}\n  ${"─".repeat(52)}`);
  for (const c of checks) console.log(`  ${icon(c.status)} ${c.name.padEnd(20)} ${c.detail}`);
  console.log(`  ${"─".repeat(52)}`);
  console.log(`  ${fails.length === 0 ? "PASS" : "FAIL"} — ${fails.length} fail, ${warns.length} warn\n`);
}
process.exit(fails.length === 0 ? 0 : 1);

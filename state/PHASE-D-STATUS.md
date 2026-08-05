---
type: status
permanence: living
app: tobytango.com
phase: D (the archive page)
owner: charlotte (Menlo floor, FE)
consumes: plan/PHASE-A-festival-gate-2026-08-04.md, data/workshop.json
branch: DEVL
date: 2026-08-05
---

# Phase D — status

The thing Toby asked for from the start — *transcripts where each line plays that
exact moment of audio, with the matching video* — is built and working on live
data. Verified end to end on **30 July**, per Edison's instruction to get one day
genuinely working rather than six days half-working.

**Not deployed.** Edison deploys.

---

## What was built

| File | What it is |
|---|---|
| `src/lib/festival-archive.js` | Read model over `data/workshop.json` + SRT parsing and transcript judging |
| `src/app/api/festival/transcript/route.js` | Gated, on-demand transcript for one recording |
| `src/app/festival/chicho2026/page.js` | Archive index — the six days (replaces the placeholder shell) |
| `src/app/festival/chicho2026/[date]/page.js` | One day, gated and `force-dynamic` |
| `src/app/festival/chicho2026/[date]/DayArchive.js` | The player: recordings → transcript → click a line, hear that moment |

Shape follows the reference browser at
`/Volumes/DEVL/.../chicho202606/site/index.html` — day → session → recording →
transcript lines, click a line to seek, highlight the line as it plays. What is
deliberately **not** carried over: its edit mode, export/import, chatter and
drop toggles. Those are Toby's authoring tools for preparing the material; an
attendee reading the archive does not need them, and the reference is a single
1.2 MB local file with no gate.

Split across routes rather than one long page, because this page is
`force-dynamic` behind a per-request access check — a day is a small payload,
six days is not.

---

## The three data traps, handled

1. **`timing: exact | inferred`.** 35 of 78 recordings have no surviving clock
   time. Those render as `Recording NN · time not recorded`, never as a clock.
   Sort falls back to recording number.
2. **Missing subject is not empty subject.** 13 recordings carry no note. They
   render an explicit *"No subject noted — the session index does not annotate
   this segment (usually counting or a drill). The recording itself is here."*
   `subject` is `null` in the model, never `''`.
3. **Times are already corrected.** Everything comes from `workshop.json`.
   Nothing is re-derived from a filename anywhere in the code.

---

## A fourth trap, found while building — transcript existence ≠ usability

Not in the brief. **A transcript file exists for all 78 recordings, but 15 of
them cannot be rendered as a transcript at all**, and 15 more are partly
corrupted. Measured across all 78 by fetching and parsing every SRT:

| | count |
|---|---|
| clean | 48 |
| partly degraded (≥25% of the text is a transcriber loop) | 15 |
| **unusable** | **15** |

Two distinct failure modes, both of which would have produced a page that looks
broken rather than one that looks honest:

- **No syncable timing.** e.g. `rec-063`: 70 cues, every one stamped
  `00:00:00,280`, almost all with no text. Rendered naively that is 70 blank
  lines that all seek to the same instant.
- **Transcriber loops.** Whisper fills near-silence by repeating a phrase until
  the cue is full — e.g. `chichi-2026-07-30…`: one cue, *"la música абсолютa"*
  repeated ~30 times, Spanish and Cyrillic mixed.

Handling, following Edison's own principle that an honest gap beats a confident
error: a transcript that cannot be synced is **not shown as a transcript** — the
page says so plainly and the audio still plays, because the *recording* is fine
and only the transcription failed. Individual loop cues inside an otherwise good
transcript are **marked and dimmed, not deleted**, so the reader can skip them
and still keep a real timestamp. Where loops are a large share of the text, the
recording carries a heads-up.

*Caveat on the numbers:* the first pass I ran flagged 27 as hallucination loops.
That was my metric being too crude — it condemned a whole file for one bad cue.
Re-measured per cue and judged by share of text, the honest figure is the table
above. The first number was wrong and is not the one to quote.

---

## Verified — actually observed, on live Azure

**30 July, end to end — 24/24.**

| Check | Result |
|---|---|
| Day page renders; 19 recordings, 21 video clips | ✅ |
| Real clock times shown on an exact-timed day | ✅ |
| Subjects render; unannotated segments say so explicitly | ✅ |
| **No SAS URL anywhere in the served HTML** | ✅ |
| Index lists all six days; 27 Jul flagged video-only; inferred days flagged | ✅ |
| Clean transcript loads — 327 lines, timestamps monotonic | ✅ |
| Unusable transcript flagged, `lines: []`, reason given | ✅ |
| Transcript route without a cookie → 401 | ✅ |
| Transcript route asked for `data/workshop.json` → 404 (allowlisted blobs only) | ✅ |
| SAS mint → 200, `ttlSeconds` 900 | ✅ |
| **SAS serves a mid-file byte range → HTTP 206 (seeking works)** | ✅ |
| Same URL with the SAS stripped → refused, no media served | ✅ |
| Allowlist restored to baseline | ✅ |

**Edge days — 5/5 after a fix (below).** 27 July renders honestly as video-only.
28 July shows no fabricated clock times for audio. An unknown date 404s.

### Two defects found by verifying rather than assuming

- **Transcript line ordering.** One inversion in a 327-line transcript (line 300
  at 1232.34 s, line 301 at 1231.82 s). Clicking a line was unaffected, but the
  follow-along highlight scans forward and stops at the first line ahead of the
  playhead, so a single inversion would freeze the highlight. Lines are now
  sorted by start time before numbering.
- **The inferred-day warning was too broad.** It said *"No clock times survive
  for this day"* — but that is only true of the **audio**. The video on those
  days carries genuine camera timestamps, corrected, and the video list below
  the warning was showing real times like `17:59`, contradicting it. The warning
  is now scoped to the audio and explicitly says the video times are real. My
  own test assertion was also wrong here — it scanned the whole page and would
  have failed a correct implementation.

---

## Coordination with Franklin

His B4 mint route landed mid-build. Two adjustments, both mine:

- I had assumed `{ festival, blob }` → `{ url }`. His actual contract is
  **`{ festival, blobs: [...] }` → `{ urls: { blob: url }, expiresOn, ttlSeconds }`**,
  which is the better shape — one round trip for a whole day if needed. Client
  now matches it, honours `expiresOn`, and re-mints once on a playback failure
  rather than leaving a dead player.
- I had created `src/lib/festival-blob-text.js` as a flagged stopgap, because
  `azure-json-storage.js` JSON-parses everything and cannot serve an SRT. He
  added `readTextFromBlob` to the shared lib in response. **My stopgap is
  deleted**; the transcript path uses his, so there is one credential
  resolution, not two.

---

## NOT verified

1. **Browser playback has not been exercised in a real browser.** The SAS path
   is proven at HTTP level — a mint returns a URL and that URL serves a mid-file
   206. What has not been watched is a human clicking a transcript line and
   hearing the audio move, including the follow-along highlight and the
   re-mint-on-expiry path. That needs a browser and, honestly, a person.
2. **Only 30 July was driven end to end.** The other five days render and their
   edge cases are checked, but no transcript on them has been opened one by one.
3. **Video playback**: the `<video>` element is wired to the same mint path and
   the 206 proof covers seeking generally, but no video clip has been played.
4. **Nothing is deployed.** PROD does not have any of this.

---

## Left alone, deliberately

- `src/lib/azure-json-storage.js`, `festival-media.js` and the mint route —
  Franklin's.
- The gate is untouched. Every page and both API routes re-check `hasAccess()`
  server-side per request; nothing is cached around it.
- Phase C media — not touched.
- §6.3 / §6.4 hardening — won't-do per §R4b.

---

## Next

The honest next step is a browser pass on 30 July: click lines, confirm the
audio follows, watch one video, leave a tab open past the 15-minute SAS expiry
and confirm the re-mint works. After that, the remaining five days are the same
code path and need reading rather than building.

— Charlotte, Menlo floor, 2026-08-05

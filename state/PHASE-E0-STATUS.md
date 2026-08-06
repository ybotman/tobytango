---
date: 2026-08-06
persona: franklin
type: status
state: current
feature: festival-gate
phase: E0
permanence: short-term
audience: edison, toby, charlotte
related:
  - [[../plan/PHASE-A-festival-gate-2026-08-04]]
  - [[PHASE-C-STATUS]]
---

# E0 — the curation is rescued

Toby's segment-level classification now exists in the blob container as
`data/annotations.json`, alongside a byte-identical preservation copy of the
only file that held it. It is no longer one drive away from gone.

## Observed, not intended

| | recordings | segments | keep | dropped |
|---|---|---|---|---|
| source `site/index.html` | 79 | 13,456 | 3,161 | 10,295 |
| `data/annotations.json` in container | 79 | 13,456 | 3,161 | 10,295 |

Counts match the source **exactly**, and the payload was re-counted from the
uploaded bytes rather than trusting its own header (header agrees).

**Spot-check — 3 recordings, every cue compared to the HTML:** all PASS, on `t`
(cue offset), `s` (the flag) and `x` (the text). Deliberately one per case:
`New Recording 63` (an inferred day, 70 segs, 0 keep), `Chicho 2026-07-31T17:19:15`
(an exact-time day, 280 segs, 93 keep), and the largest recording in the set
(1,194 segs, 113 keep).

**Preservation copy** `data/site-index.html`, 1,199,922 bytes — sha256 identical
to the file on DEVL, and the same digest is recorded inside `annotations.json`'s
provenance, so the two can always be re-tied to each other.

**`data/access.json` UNCHANGED** — etag `0x8DEF33524045D99` recorded before the
run and identical after.

## Preserved, not regenerated

`annotations.py` survives in iCloud, so this was regenerable — but **regenerating
is not preserving**, and that distinction is the whole job. Every value here is
copied verbatim out of the embedded payload. `annotations.py` was not run. It is
recorded in `provenance.generator` as *how these were produced*, alongside the
values, never instead of them.

Shape, keyed so it joins to the SRTs already in the container:

```
recordings[] : id · key · blob · date · session · subject · students · practice · dur
  segments[] : i · t (cue seconds — the join key) · o · w? · s (the curation) · x
```

`x` (the text each flag was applied to) is kept deliberately. A flag divorced
from what it classified cannot be checked later — if the SRTs and this ever
disagree, the text is the only way to notice.

## Three things found while extracting

**1. The clip-level curation was about to be missed.** The classification is not
only the per-segment `s` flag: clips also carry `subject` (11 left as `??`),
`students` (6) and `practice` (12). Same judgement, same single point of failure.
All preserved.

**2. No hidden clock times — and this matters for E1.** The segments carry a
wall-clock field `w`, so it was worth checking whether it survived where the
filenames did not. It did not: `w` is present on **100%** of segments for 30 Jul,
31 Jul and 01 Aug, and **0%** for 28 and 29 Jul.

| day | segments | with wall-clock |
|---|---|---|
| 2026-07-28 | 1,499 | **0** |
| 2026-07-29 | 3,623 | **0** |
| 2026-07-30 | 1,907 | 1,907 |
| 2026-07-31 | 3,841 | 3,841 |
| 2026-08-01 | 2,586 | 2,586 |

So the curation confirms rather than contradicts the destroyed-metadata story:
there is no surviving clock for Tue/Wed anywhere. E1 will have to reconstruct
from the video, exactly as briefed.

**3. `New Recording 92 copy` is in here too**, and is segment-for-segment
identical to `New Recording 92` (345 segs, 107 keep each). Its audio was removed
from the archive on Toby's call. I kept its annotations — dropping them would
have made the totals stop reconciling with the source, which is the one thing
this file must always do — and flagged the record with `duplicateOf`,
`audioRemovedFromArchive` and a note, so nothing double-counts it or goes looking
for a blob that is not there.

## Scripts

`scripts/festival/extract-annotations.mjs` → `upload-annotations.mjs` →
`verify-annotations.mjs`, alongside the Phase C pipeline. The extractor carries
the do-not-regenerate reasoning at the top of the file, where the next person
will actually meet it.

## Next

E1 — audio↔video pairing, which is also the mechanism that places Tue/Wed. The
constraint I am carrying into it: any reconstructed audio time must be rendered
as **approximate** and must never be presented as a clock time it did not earn.

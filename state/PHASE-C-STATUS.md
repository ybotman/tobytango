---
date: 2026-08-05
persona: franklin
type: status
state: current
feature: festival-gate
phase: C
permanence: short-term
audience: edison, toby, charlotte
related:
  - [[../plan/PHASE-A-festival-gate-2026-08-04]]
  - [[PHASE-A1b-STATUS]]
---

# Phase C — the media — UPLOAD COMPLETE

All media is in `tobytango/festival-chicho-202606`, uploaded with the
container-scoped service principal. **352 blobs sent, 0 failed, in 889 s**
(~6 MB/s upstream). Numbers below are **observed by listing the container after
the fact**, not what the uploader intended to send.

## Observed in the container

| prefix | blobs | bytes |
|---|---|---|
| `video/` | **92** | 4.169 GB |
| `audio/` | **79** | 0.251 GB |
| `transcripts/` | 181 | 0.002 GB |
| `data/` | 3 | 79 KB |
| **total** | **355** | **4.422 GB** |

Integrity against the source, per file: **0 missing, 0 wrong size, 0 wrong
content-type** across all 92 video + 79 audio. Video total (4.169 GB) matches
the handover's stated 4.17 GB exactly.

`data/` is `access.json` (pre-existing, untouched) + `workshop.json` +
`video-index.json`.

## Acceptance

**1. All 92 video + 79 audio present with slugified names.** ✅ Observed counts
above, byte-for-byte size match on every file, content types `video/mp4` and
`audio/mp4`.

**2. Spot-check plays end to end, including seeking mid-file.** ⚠️ **Partially
performable — see the Phase D blocker below.** What I could verify, I did:
five files (2 video, 3 audio incl. the smallest at 12 KB and the largest at
21 MB) fetched with a mid-file Range request. All five returned
`206` with a correct `Content-Range`, `Accept-Ranges: bytes`, the right
content-type, and **bytes byte-identical to the same offset in the source file**.
Seeking works and the stored media is intact.

What I could **not** do is play them *through the gate*: `chicho2026/page.js` is
still a placeholder and there is no media delivery path yet (root cause below).
I am not claiming a gate pass I did not get.

> One honest note on method: my first audio seek reported FAIL. That was a bug in
> my test, not the data — a fixed 64 KB read from the midpoint of a 109 KB file
> runs past EOF, so Azure correctly returned bytes-to-end while my local buffer
> held 64 KB with zero padding. Clamped the window and it passes. Worth recording
> because the failure mode looked exactly like a corrupt upload.

**3. `data/access.json` untouched.** ✅ Proven, not asserted: etag recorded
*before* the run and re-read after — `0x8DEF32BBBE0D4B2 @ 19:57:09Z` both times.
Charlotte's live allowlist work is intact. The uploader also has a hard guard
that throws if `data/access.json` ever appears in its work list.

## 🔴 Phase D blocker — no way to deliver media to a browser

**The container-scoped SP cannot mint a user-delegation SAS** — `403
AuthorizationPermissionMismatch`. That is an account-scope operation requiring
`Storage Blob Delegator`, which the SP deliberately does not have. It also cannot
read account CORS (same 403). And there is no account key for `tobytango` by
design (that is the whole point of A1).

So today there is **no mechanism to hand the browser a media URL at all**. Phase D
must pick one:

1. **Proxy bytes through a Next route** — keeps the scope tight, but the app must
   forward `Range` correctly or seeking silently breaks, and every byte then flows
   through Vercel.
2. **Widen the SP to `Storage Blob Delegator` at account level** so it can mint
   short-lived SAS URLs; the browser then talks to Azure directly and Range works
   natively.

This is a design fork, not something to fix in passing — flagging rather than
choosing, and **not widening the scope unilaterally**. It also needs the CORS rules
checked against whatever is chosen, which I cannot read with this credential.

## Decisions taken, with reasoning

**A silent-overwrite collision, caught before upload.** `New Recording 92.m4a` and
`New Recording 92 copy.m4a` both map to `audio/rec-092.m4a` under handover §5.
Identical duration and **byte-identical transcripts** — a true duplicate — but one
would have overwritten the other and 79 files would still have looked like 79. Both
ship; the copy is `audio/rec-092-copy.m4a` with `duplicateOf` recorded in
`workshop.json`. Phase D should probably hide it from the UI. This is also what
produced the doubled `Recording 92` line in `_INDEX.md`.

**The 36 undated recordings are placeable.** Their file metadata is useless — it
reads `2026-08-03T21:38:4x`, the *copy* time, all 36 within seconds of each other.
But `transcripts/Workshop/_INDEX.md` assigns them by number: **63–84 = Tue 28 Jul,
85–97 = Wed 29 Jul**, both marked INFERRED. It independently confirms 2026-07-27 as
`NO-AUDIO`, which matches the day table I built from the media itself (12 video, 0
audio). Blob names keep the documented `rec-NNN` shape; the inferred day and
`timing: "inferred"` ride in `workshop.json` so Phase D can order them without
pretending to a precision that does not exist.

**Timestamp correction verified before any name was written.** `video_index.py`
does **not exist anywhere on the volume**, so I could not read the derivation as
instructed. I verified it empirically instead: `DJI_20260727131939_0004_D` has
`creation_time 2026-07-27T17:19:40Z`; `+2 h` = `19:19:40`, which is exactly the
`local` value in `video_index.json`; the filename stamp `13:19:39` is 4 h behind.
Times come from `video_index.json`. The proof it matters: **corrected**, video
overlaps audio on shared days (07-30: video 17:26–20:58 vs audio 16:34–20:58);
uncorrected, video would sit at 13:19–16:58 and never overlap audio at all.

**Transcripts shipped too (181 blobs, 2.3 MB).** Not in the plan's upload list, but
`transcripts/` was named as source material and Phase D is transcript-driven. Cheap
and load-bearing. Flagging as an addition: 158 `.srt`/`.txt` under `transcripts/`
plus the 23 curated Workshop markdown files under `transcripts/workshop/`.

**Masters left alone.** The ~70 GB of HEVC originals in `Video/` were never touched.

## `data/workshop.json`

66 KB, holds the full source→blob mapping plus provenance and subjects:
79 audio + 92 video, 6 days, **79/79 transcripts linked**, **66/79 subjects**
matched from `_INDEX.md` (the 13 unmatched are raw counting/drill segments the
index does not annotate). Every record carries `timing: "exact" | "inferred"` so a
consumer can never mistake an inferred day for a real clock time.

## Not done / next

- **Phase D delivery fork above needs a ruling before D can start.**
- Egress not priced — per R4b, deliberately.
- The upload/verify scripts live in my session scratchpad and are **not
  committed**. The mapping itself is durable in `data/workshop.json`. Say the word
  if you want the scripts in-repo for reproducibility.
- `master` not pushed; PROD untouched.
- Already done, contrary to the ask: the `-p 4003` port fix is **already
  committed** in `c8f5a79` and the tree was clean on arrival — nothing to fold in.

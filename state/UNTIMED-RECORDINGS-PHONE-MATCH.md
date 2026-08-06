---
date: 2026-08-06
persona: franklin
type: reference
state: current
feature: festival-gate
permanence: short-term
audience: edison, toby
related:
  - [[PHASE-E0-STATUS]]
---

# The 35 untimed recordings — match table for a phone listing

Tue 28 and Wed 29 Jul were recorded as `New Recording NN.m4a`: no clock time in
the name, and the file metadata was overwritten by the copy to DEVL (it now
reads `2026-08-03T21:38:4x`, all 36 within seconds of each other — the copy, not
the recording).

If Voice Memos on the phone still holds the real recording dates, this table
makes the match **mechanical**. Durations are from `ffprobe` on the source files,
to the millisecond.

## How to match

**Duration alone identifies 33 of 35.** Sort a phone listing by duration and
join. Two exceptions, below.

| discriminator | unique across the 35? |
|---|---|
| byte size | ❌ no — `rec-074` and `rec-084` are both 1,602 B |
| duration | ❌ almost — same two are both `0.235 s` |
| duration + recording order | ✅ yes, always |

**The only real ambiguity is `rec-074` vs `rec-084`** — both 0.235 s, both
1,602 bytes, byte-identical in every respect I can measure. They are almost
certainly accidental taps. Resolve them by **order** (074 sits 12th, 084 sits
22nd in the Tue sequence) or simply accept that swapping two near-empty clips
changes nothing anyone will ever see.

Three clips are under 2 s and may not appear in a phone listing at all:
`rec-063` (1.515 s), `rec-074` and `rec-084` (0.235 s each). If the phone shows
32 recordings rather than 35, that is why — do not treat it as a mismatch.

## The table

Total audio across the two days: **2.65 hours** in 35 recordings.

| # | rec | inferred day | duration (s) | h:mm:ss | bytes | blob |
|---|---|---|---|---|---|---|
| 1 | 63 | 2026-07-28 | 1.515 | 00:00:01 | 12,888 | `audio/rec-063.m4a` |
| 2 | 64 | 2026-07-28 | 128.405 | 00:02:08 | 1,068,371 | `audio/rec-064.m4a` |
| 3 | 65 | 2026-07-28 | 13.888 | 00:00:13 | 117,005 | `audio/rec-065.m4a` |
| 4 | 66 | 2026-07-28 | 136.171 | 00:02:16 | 1,137,743 | `audio/rec-066.m4a` |
| 5 | 67 | 2026-07-28 | 128.832 | 00:02:08 | 1,076,803 | `audio/rec-067.m4a` |
| 6 | 68 | 2026-07-28 | 247.445 | 00:04:07 | 2,068,718 | `audio/rec-068.m4a` |
| 7 | 69 | 2026-07-28 | 11.328 | 00:00:11 | 96,027 | `audio/rec-069.m4a` |
| 8 | 70 | 2026-07-28 | 225.515 | 00:03:45 | 1,884,682 | `audio/rec-070.m4a` |
| 9 | 71 | 2026-07-28 | 458.731 | 00:07:38 | 3,840,664 | `audio/rec-071.m4a` |
| 10 | 72 | 2026-07-28 | 12.693 | 00:00:12 | 107,265 | `audio/rec-072.m4a` |
| 11 | 73 | 2026-07-28 | 74.219 | 00:01:14 | 630,295 | `audio/rec-073.m4a` |
| 12 | 74 | 2026-07-28 | **0.235** | 00:00:00 | **1,602** | `audio/rec-074.m4a` ⚠ ties with 84 |
| 13 | 75 | 2026-07-28 | 118.848 | 00:01:58 | 992,040 | `audio/rec-075.m4a` |
| 14 | 76 | 2026-07-28 | 65.941 | 00:01:05 | 550,917 | `audio/rec-076.m4a` |
| 15 | 77 | 2026-07-28 | 129.856 | 00:02:09 | 1,086,164 | `audio/rec-077.m4a` |
| 16 | 78 | 2026-07-28 | 47.509 | 00:00:47 | 397,567 | `audio/rec-078.m4a` |
| 17 | 79 | 2026-07-28 | 126.613 | 00:02:06 | 1,056,335 | `audio/rec-079.m4a` |
| 18 | 80 | 2026-07-28 | 80.277 | 00:01:20 | 672,154 | `audio/rec-080.m4a` |
| 19 | 81 | 2026-07-28 | 109.547 | 00:01:49 | 912,175 | `audio/rec-081.m4a` |
| 20 | 82 | 2026-07-28 | 185.664 | 00:03:05 | 1,561,138 | `audio/rec-082.m4a` |
| 21 | 83 | 2026-07-28 | 663.189 | 00:11:03 | 5,545,953 | `audio/rec-083.m4a` |
| 22 | 84 | 2026-07-28 | **0.235** | 00:00:00 | **1,602** | `audio/rec-084.m4a` ⚠ ties with 74 |
| 23 | 85 | 2026-07-29 | 16.789 | 00:00:16 | 141,620 | `audio/rec-085.m4a` |
| 24 | 86 | 2026-07-29 | 2569.590 | 00:42:49 | 21,257,798 | `audio/rec-086.m4a` |
| 25 | 87 | 2026-07-29 | 22.592 | 00:00:22 | 189,842 | `audio/rec-087.m4a` |
| 26 | 88 | 2026-07-29 | 80.875 | 00:01:20 | 675,139 | `audio/rec-088.m4a` |
| 27 | 89 | 2026-07-29 | 629.227 | 00:10:29 | 5,243,165 | `audio/rec-089.m4a` |
| 28 | 90 | 2026-07-29 | 599.531 | 00:09:59 | 5,000,175 | `audio/rec-090.m4a` |
| 29 | 91 | 2026-07-29 | 199.232 | 00:03:19 | 1,661,953 | `audio/rec-091.m4a` |
| 30 | 92 | 2026-07-29 | 1452.779 | 00:24:12 | 12,097,505 | `audio/rec-092.m4a` |
| 31 | 93 | 2026-07-29 | 40.512 | 00:00:40 | 340,409 | `audio/rec-093.m4a` |
| 32 | 94 | 2026-07-29 | 44.779 | 00:00:44 | 374,635 | `audio/rec-094.m4a` |
| 33 | 95 | 2026-07-29 | 46.315 | 00:00:46 | 387,355 | `audio/rec-095.m4a` |
| 34 | 96 | 2026-07-29 | 368.960 | 00:06:08 | 3,079,421 | `audio/rec-096.m4a` |
| 35 | 97 | 2026-07-29 | 493.461 | 00:08:13 | 4,225,681 | `audio/rec-097.m4a` |

`New Recording 92 copy` is excluded — same 1452.779 s and same bytes as `rec-092`,
and its audio was removed from the archive. Worth knowing because a phone listing
may well show that recording **once**, not twice.

## The days are inferred, not known

`63–84 → Tue 28 Jul` and `85–97 → Wed 29 Jul` come from
`transcripts/Workshop/_INDEX.md`, which marks both days INFERRED. They are a
strong prior, not evidence. **If the phone dates disagree, the phone wins** —
these were derived by recording number, and the whole point of recovering real
dates is to stop inferring.

Machine-readable equivalent: `.festival-work/untimed-durations.json`, regenerate
with `node scripts/festival/untimed-durations.mjs`.

# Festival media pipeline

Uploads a workshop archive (media + transcripts) into its festival blob
container, using the **container-scoped service principal** — never an account
key. Written for Chicho 2026; reusable for the next festival.

Everything here encodes knowledge that is expensive to rediscover: the blob
naming convention, the camera-clock correction, and the collision guard that
stops two source files silently becoming one blob.

## Run order

```sh
node scripts/festival/snapshot-access.mjs    # record access.json state first
node scripts/festival/build-manifest.mjs     # dry run — source->blob mapping, collision check
node scripts/festival/build-workshop-json.mjs
node scripts/festival/upload.mjs             # the only script that writes media
node scripts/festival/verify.mjs             # observe what actually landed
```

Intermediates go to `.festival-work/` (gitignored). Override with
`FESTIVAL_WORK`; override the source tree with `FESTIVAL_SRC`.

Requires the `AZURE_FESTIVAL_*` env contract (plan §A2) and `@azure/identity`.

## The three things that will bite you

**1. The camera clock is wrong.** DJI filename stamps are **4 h behind**;
local wall-clock is `mp4 creation_time (UTC) + 2 h`. Video blob names use the
corrected time from `Video/video_index.json`, so audio and video sort together.
Verified on `DJI_20260727131939_0004_D`: `creation_time 17:19:40Z` → local
`19:19:40`, filename stamp `13:19:39`. Get this wrong and video/audio never
overlap — corrected, they do (07-30: video 17:26–20:58, audio 16:34–20:58).

**2. Two source files can map to one blob name.** `New Recording 92.m4a` and
`New Recording 92 copy.m4a` both slugify to `rec-092.m4a`. Whichever uploads
last wins and the file count still looks right — the failure is invisible.
`build-manifest.mjs` fails loudly on any collision. Don't remove that check.

**3. Not every recording has a clock time.** 36 files are `New Recording NN`
with no timestamp; their file metadata is the *copy* date, not the recording
date, and is useless. Days come from `transcripts/Workshop/_INDEX.md` by
recording number and are marked `timing: "inferred"` in `workshop.json`, so
nothing downstream mistakes an inferred day for a real one.

## Safety properties — preserve these

- **`data/access.json` is never written.** It is the live allowlist; the
  uploader throws if it ever appears in a work list. A changed etag during an
  upload is usually the admin UI, not this pipeline — check the contents before
  concluding anything.
- **Masters are never uploaded.** The ~70 GB of HEVC originals in `Video/` stay
  on `/Volumes/DEVL`; they will not play in Chrome or Firefox on
  Windows/Android anyway. Only the 720p H.264 proxies in `Video_web/` ship.
- **Uploads are idempotent.** A blob already present at the same byte size is
  skipped, so an interrupted run resumes instead of re-sending gigabytes.
- **Verification observes, it does not assert.** `verify.mjs` lists the
  container and compares per-file sizes and content types against the source,
  then Range-reads mid-file and compares those bytes to the same offset on disk.
  Report what it prints, not what you intended to upload.

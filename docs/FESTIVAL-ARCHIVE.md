# Festival Archive — Chicho 2026

**Handover document.** Written for the Menlo Park team taking ownership.
Everything below is current as of commit `839b7dd` on branch `DEVL`.

Read §6 first if you only read one section — it is the list of things that are
deliberately unfinished.

---

## 1. How we got here

**The site.** `tobytango.com` is live but stale — built a while ago, largely
untouched since. Next.js 16 / React 19 / MUI 7, deployed on Vercel.

**The trigger.** The Chicho Frumboli & Juana Sepúlveda workshop (Mon 27 Jul –
Sat 1 Aug 2026) produced **79 audio clips (~8.25 h)** and **92 DJI video clips
(68 GB HEVC)**. Toby wanted a browsable, timestamped archive page — transcripts
where each line plays that exact moment of audio, with the matching video.

**Why not the existing pattern.** The site already had a working gate:
`practice-videos` uses a shared viewer password + shared admin password
(`PRACTICE_VIDEOS_PASSWORD` / `PRACTICE_VIDEOS_ADMIN_PASSWORD`) held in env.
That works for a link posted on Facebook. It does **not** work here because:

- one shared secret cannot be revoked per person — you rotate it for everybody
- there is no record of who was granted access, or when
- the content is a paid workshop by a third party (see the rights note below)

**What was chosen instead.** An **allowlist in blob storage** (`data/access.json`)
plus an admin CRUD page, with the admin route password-gated. Media is never
public: access is intended to be minted per-request as a short-lived SAS URL.

**What was deliberately deferred.** Magic-link email login (Resend), and the
swap from account key to a scoped service principal. Both are listed in §6.

> **Rights note, carried forward.** This is Chicho and Juana's copyrighted
> instructional material, recorded at a paid workshop, and the audio contains
> other attendees' voices. Gating was chosen partly for this reason. Whoever
> owns this next should keep it gated unless Toby has permission to publish.

---

## 2. Current state — built and verified

### Azure

| | |
|---|---|
| Subscription | `Ybotman Azure subscription Personal` (`53cb0509-…`), user `tobybalsley@icloud.com` |
| Resource group | `TobyTango` |
| Storage account | `tobytango` — StorageV2, Standard_LRS, eastus, HTTPS-only, TLS1.2 |
| Container | `festival-chicho-202606` — **private** (`publicAccess: null`) |
| Account posture | `allowBlobPublicAccess: false` — container *cannot* be made public even by mistake |
| CORS (blob) | `GET, HEAD, OPTIONS` for `https://tobytango.com`, `https://www.tobytango.com`, `http://localhost:4003`; all headers allowed/exposed; max-age 3600 |
| Soft delete | enabled, 7 days retained |

`HEAD` and exposed headers in CORS are **load-bearing**, not decoration —
without them HTTP Range requests fail and seeking inside a video silently
breaks, which presents as "the player is broken".

### Code (all committed on `DEVL` as `839b7dd`)

| File | Role |
|---|---|
| `src/lib/festival-access.js` | Allowlist read/write, `hasAccess()`, `isAdminPassword()`, `FESTIVALS` list |
| `src/app/api/festival/access/route.js` | Admin CRUD (`add`/`update`/`remove`) + unauthenticated `check` |
| `src/app/admin/access/page.js` | Admin UI — MUI table, add/edit dialog, per-festival checkboxes |
| `src/lib/azure-json-storage.js` | **Extended**, backward-compatible: optional `container` + `fallback` |
| `src/app/data/menuStructure.js` | `Festival → Chicho 2026` menu entry |
| `next-sitemap.config.js`, `public/robots.txt` | Exclude `/admin` and `/festival/` |

**Verified:** `npm run build` exits 0 (`/admin/access` static, `/api/festival/access`
dynamic), `npx eslint` clean on all touched files, sitemap regenerated and
confirmed to no longer contain `/admin`.

**Not verified:** nothing has been exercised against live Azure yet — no blob
has been written, `data/access.json` does not exist in the container. The first
admin save creates it. Media has **not** been uploaded.

### Media pipeline (outside this repo)

The transcription/assembly scripts live in iCloud, **not** in this repo:

```
~/Library/Mobile Documents/com~apple~CloudDocs/Tango/workshops/chicho202606/scripts/
  transcribe.py        Whisper transcription (mlx-whisper, large-v3-turbo)
  build_workshop.py    Assembles .srt into a dated Markdown tree
  build_site.py        Builds a standalone local HTML browser with audio
  video_index.py       Corrects DJI timestamps, emits video_index.json
  make_proxies.py      HEVC → 720p H.264 web proxies
  annotations.py       Human judgement: subjects, day inference, speakers
  README.md            Full documentation of that pipeline
```

Source media and derived data are on the external DEVL volume at
`/Volumes/DEVL/Tango/workshops/chicho202606/`.

**Transcode status at handover: 72 of 92 proxies complete (2.9 GB), still
running, zero failures.** Ratio is a consistent ~6% of source, so the finished
set should land near **4.2 GB** from 68 GB of originals. Re-running
`make_proxies.py` is idempotent and resumes; it writes `.part.mp4` and renames
atomically, so an interrupted run never leaves a partial file looking complete.

Two facts about the media the team will need:

1. **The DJI camera clock is wrong by a fixed +4.0 h** (filename stamp vs
   embedded `creation_time`), consistent across all 92 files. Local wall-clock
   = `creation_time + 2 h`. That +2 h was derived by aligning video against
   audio on days where both exist; day-boundary matches land within 5–76 s.
   `video_index.py` documents the derivation.
2. **Originals are HEVC** and will not play in Chrome/Firefox on
   Windows/Android. The proxies exist for this reason. Do not upload the 68 GB
   of originals — they are masters, they stay on DEVL.

---

## 3. Design decisions and safety choices

These were deliberate. Please do not silently reverse them.

**Fails closed, everywhere.** Unknown email → denied. Missing grant → denied.
Allowlist unreadable → denied. There is no code path where an error grants
access.

**A read error is not "empty".** `readJsonFromBlob` now rethrows on a non-404
error when the caller supplies its own `fallback` shape. This matters
specifically for access control: if a transient blob read failed and returned
`{users: []}`, the admin page would show an empty table, the operator would
re-add everyone, and the save would **overwrite the real allowlist**. The POST
handler also refuses to write a list it could not first read.

**No password configured means nobody gets in.** `isAdminPassword()` returns
`false` when `FESTIVAL_ADMIN_PASSWORD` is unset, rather than treating "no
password" as "no gate". A missing env var must not open the door.

**The `check` action is intentionally unauthenticated** and returns *only* a
boolean — never the list. The login page needs to call it before a user has any
credential. See §6.4: this is an enumeration oracle and needs hardening.

**Backward-compatible lib extension.** `azure-json-storage.js` gained optional
arguments only. Existing callers (`practice-videos`, `artists-umbrella`,
`tango-collab`) are untouched and still resolve the default container from
`AZURE_STORAGE_CONTAINER`.

**robots.txt is a request, not a control.** Excluding `/admin` stops honest
crawlers indexing it. It does not stop anyone visiting. The real protection is
the password on the API route.

---

## 4. Environment variable contract

Every variable must be set in **both** `.env.local` (dev) and **Vercel project
settings** (prod). Vercel does not read `.env.local`.

| Variable | Read in | If missing or wrong |
|---|---|---|
| `AZURE_STORAGE_ACCOUNT_NAME` | `src/lib/azure-json-storage.js` | Throws `Azure Storage not configured`; all blob reads/writes fail |
| `AZURE_STORAGE_ACCOUNT_KEY` | `src/lib/azure-json-storage.js` | As above. **Full-account key — see §6.2** |
| `AZURE_FESTIVAL_CONTAINER` | `src/lib/festival-access.js` | Defaults to `festival-chicho-202606`. Wrong value → allowlist reads a non-existent container → 404 → empty list → **everyone denied** (fails closed, but looks like "access broken") |
| `FESTIVAL_ADMIN_PASSWORD` | `src/lib/festival-access.js` | **Unset = admin routes refuse everything**, including GET. Deliberate |
| `AZURE_STORAGE_CONTAINER` | `src/lib/azure-json-storage.js` | Pre-existing. Defaults to `tangolab-study`. Used by the other three API routes, not by festival code |

Pre-existing and unchanged: `PRACTICE_VIDEOS_PASSWORD`,
`PRACTICE_VIDEOS_ADMIN_PASSWORD`, `NEXT_PUBLIC_GA_MEASUREMENT_ID`,
`NEXT_PUBLIC_GTM_ID`.

No new variable has a value committed to the repo. `FESTIVAL_ADMIN_PASSWORD`
was deliberately **not** auto-generated — Toby chooses it.

---

## 5. Blob and festival layout

### Convention

```
Container:  festival-<slug>-<yyyymm>          e.g. festival-chicho-202606
  audio/    <local-timestamp>.m4a             79 files, 241 MB
  video/    <local-timestamp>.mp4             92 files, ~4.2 GB (720p H.264)
  data/     access.json                       the allowlist
            workshop.json                     transcript + subjects
            video-index.json                  corrected video timings
            edits.json                        operator text edits / notes
```

Azure has **no real folders** — `/` is just a character in the blob name. You
cannot pre-create an empty prefix; it appears when the first blob is uploaded.

**Blob names should be slugified on upload.** Source filenames contain spaces,
colons and `+` (`Chicho :2026-07-31T17:19:15+02:00.m4a`), all hazardous in
URLs. Intended mapping — originals on DEVL keep their names, the mapping lives
in `workshop.json`:

| Source | Blob |
|---|---|
| `Chicho :2026-07-31T17:19:15+02:00.m4a` | `audio/2026-07-31_171915.m4a` |
| `New Recording 86.m4a` | `audio/rec-086.m4a` |
| `DJI_20260730142315_0033_D_A01 2.MP4` | `video/2026-07-30_172637.mp4` |

Video blob names carry the **corrected** local time (§2), not DJI's wrong
stamp, so audio and video sort together chronologically.

### `data/access.json` shape

```json
{
  "users": [
    {
      "email": "someone@example.com",
      "name": "Someone Example",
      "pages": ["chicho2026"],
      "note": "attended the workshop",
      "added": "2026-08-04T18:00:00.000Z",
      "updated": "2026-08-04T18:00:00.000Z"
    }
  ]
}
```

`pages` holds festival keys, or `"*"` for every festival including future ones.
Email is stored lowercased and trimmed; `hasAccess()` normalises before
comparing. Users are kept sorted by email on every write.

### Adding a new festival (e.g. Chicho 2025)

1. **Create the container** — `festival-chicho-202505` (lowercase, digits,
   hyphens only; 3–63 chars; no underscores or dots).
2. **Apply container settings** — private; CORS and soft-delete are
   account-level and already configured, so nothing to repeat there.
3. **Add the env var** if the container is not the default —
   `AZURE_FESTIVAL_CONTAINER` currently holds a single value, so **more than
   one live festival requires a code change** (see §6.6).
4. **Add to `FESTIVALS`** in `src/lib/festival-access.js`:
   ```js
   { key: 'chicho2025', label: 'Chicho 2025' }
   ```
   This is what the admin page renders as a checkbox.
5. **Add the menu entry** in `src/app/data/menuStructure.js` under the
   `Festival` node's `items` array.
6. **Create the page** at `src/app/festival/chicho2025/page.js`.
7. **Upload media** under `audio/`, `video/`, `data/` with slugified names.
8. **Grant access** from `/admin/access` — no deploy needed for this step.

Steps 3–6 are code; the rest is data. §6.6 proposes collapsing 3–5 into a
registry blob so new festivals become admin-page operations.

---

## 6. Known deferrals — what the team needs to finish

These are unfinished **on purpose** and were named out loud during the work.
None is a hidden gap.

### 6.1 — Viewer gate is not built. *(highest priority)*

`hasAccess(email, festivalKey)` exists and is fully implemented. **Nothing
calls it.** There is no login page, no session, no middleware, and
`/festival/chicho2026` does not exist yet. The admin side can grant access to a
page that has no door.

There is **no partial work-in-progress** for this — `src/` is clean, there are
no stashes. Nothing to untangle.

Two options were put to Toby and not resolved:

- **Simple email check** (~30 min): visitor types an email, `check` says yes,
  set a cookie. Honest but soft — anyone who *knows* a listed email gets in.
- **Magic link via Resend** (recommended): emails a signed one-time link,
  proving ownership. Needs one dependency and an API key.

**Recommendation: magic link.** The content is attendee-recognizable video from
a paid third-party workshop; the simple check is gate theater for that.

### 6.2 — `AZURE_STORAGE_ACCOUNT_KEY` is a full-account key.

It currently sits in `.env.local` and in Vercel env. It grants **full control of
the entire storage account**, and is revocable only by rotating the key — which
breaks every deploy that uses it, simultaneously.

Swap to a service principal with `Storage Blob Data Contributor` scoped to
`festival-chicho-202606` only. Do this **before** the pattern is copied to more
festivals. (Managed Identity would be better still but the app runs on Vercel,
not Azure compute.)

### 6.3 — No rate limit on the admin password.

`/api/festival/access` compares a single shared password with no lockout, no
backoff, no 429. Brute-forceable. Add a lockout after N failures, or move
`/admin/*` behind an owner-only Entra login.

### 6.4 — The `check` action is an email-enumeration oracle.

It is unauthenticated and returns a boolean, so anyone can probe
"is `x@gmail.com` on the list?" one address at a time. Narrowly it leaks only
membership, but that is still a real disclosure.

Fix by rate-limiting and making it constant-time, **or** by having `check`
always return "sure, try to sign in" and moving the real decision to the
magic-link send and the SAS-mint step.

### 6.5 — CORS includes `http://localhost:4003`.

Correct for DEVL work, unnecessary in production. Strip it if origin-locking
matters. Low urgency.

### 6.6 — `FESTIVALS` and container names must be kept in sync by hand.

Adding a festival today means editing code in two files, creating a container,
and possibly changing an env var (§5). `AZURE_FESTIVAL_CONTAINER` holds one
value, so **two live festivals do not work without a code change** — the
container should become a property of each festival record, not a global.

Suggested: a registry blob (`data/festivals.json`) holding
`{key, label, container, published}`, read by both the admin page and the
festival routes, so adding a festival is an admin-page action.

---

## Repo conventions

- **Branch:** work on `DEVL`. Never push `master` without Toby's approval.
- **Commits:** `[area]: Brief description` — e.g. `[festival]: Add access admin`.
- `DEVL` is autonomous-commit per the repo's `CLAUDE.md`.
- **Dev server:** `npm run dev` → port **4003** (matches the CORS origin).
- `node_modules` was absent at handover; `npm install` was run. npm cache is
  redirected to `/Volumes/DEVL/DevCache/npm`, so **DEVL must be mounted** for
  installs to work.

## Quick verification

```bash
npm install && npm run build      # expect exit 0
npx eslint src/lib/festival-access.js src/app/api/festival/access/route.js \
           src/app/admin/access/page.js
grep -c admin public/sitemap-0.xml   # expect 0
```

Then set `FESTIVAL_ADMIN_PASSWORD`, run `npm run dev`, and visit
`http://localhost:4003/admin/access`. The first successful save creates
`data/access.json` in the container.

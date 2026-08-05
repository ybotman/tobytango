---
type: plan-action
permanence: phase-scoped
app: tobytango.com
owner: edison (Menlo Park)
date: 2026-08-04
consumes: docs/FESTIVAL-ARCHIVE.md (handover, commit e0a5e73)
branch: DEVL
---

# tobytango — Festival Archive: phased plan-action

**The membrane.** The floor builds from this doc, not from the handover doc and
not from Toby re-explaining. `docs/FESTIVAL-ARCHIVE.md` is the *inherited state*;
this is the *work*. Where they disagree, this wins — the disagreements are
recorded in §0 and are deliberate.

Repo conventions unchanged: branch `DEVL`, autonomous-commit, commits
`[area]: Brief description`, dev server on port **4003** (the blob CORS origin).

---

## §0 — Corrections to the inherited state

Verified 2026-08-04, after the handover was written. The floor should trust
these over the handover doc.

1. **Nothing has ever run.** `.env.local` contains neither
   `FESTIVAL_ADMIN_PASSWORD` nor `AZURE_FESTIVAL_CONTAINER`. The handover says
   "not verified against live Azure"; it is broader than that — this code has
   never executed at all, in any environment. Treat every claim about runtime
   behaviour as untested.
2. **PROD is clean.** `www.tobytango.com/admin/access` and
   `/festival/chicho2026` both 404. Nothing festival-related is live. All the
   hardening below happens *before* exposure, not after.
3. **The nav points at a route that does not exist.** `menuStructure.js` has
   `Festival → Chicho 2026 → /festival/chicho2026`; `src/app/festival/` does not
   exist. Fix in Phase B, or hide the menu entry — do not ship a 404 in the nav.
4. **Azure rights are confirmed, not unknown.** Toby is **Global Administrator**
   on tenant `ca1a9ff9-…` with `allowedToCreateApps: true`, and **Owner** on
   subscription `53cb0509-…`. The §6.2 service-principal swap is fully
   unblocked — both halves (create the app registration, assign the role) are
   his to grant.
5. **Transcode was still running at handover**, not finished: 78 of 92 complete,
   `DJI_20260731144913_0046` in flight. Source `Video/` is 70 GB / 137 entries
   (MP4 + LRF sidecars); `Video_web/` 3.2 GB; `vocals/` 79 × m4a / 239 MB.
6. **37 commits were unpushed.** Pushed to `origin/DEVL` on 2026-08-04 after
   scanning all 37 for secrets (clean; `.env*` is gitignored). **The repo
   `ybotman/tobytango` is PUBLIC** — the handover doc does not say so, and it
   changes what may ever be committed here.

---

## §1 — Rulings that close open questions

The handover left two decisions open. Both are now decided. **Do not
re-litigate; build to these.**

### R1 — Viewer gate: SIMPLE EMAIL CHECK, not magic link.

Toby's facts: **fewer than a dozen people**, and *"we can push to public but
don't want it searchable."*

That reframes the requirement. "Not searchable" is a **discoverability**
problem, not an **identity-proof** problem, and they take different
instruments. Magic link proves someone owns an address — worth its dependency,
API key and domain-verification when the loss from a wrong person getting in is
real. Here the content could acceptably be public; the actual fear is a search
engine, a scraper, or a stranger stumbling in. A signed-cookie email check plus
genuine no-index plus private blob answers that fear completely, at a fraction
of the build.

Build the simple check. **Name it honestly in the UI** — it is a courtesy gate,
not a lock, and the page should not imply otherwise.

*(Superseded: `docs/FESTIVAL-ARCHIVE.md` §6.1 recommends magic link. It was the
right recommendation for an unknown, larger audience. The audience is now known.
Magic link stays a one-phase upgrade if the archive ever widens — build the
session layer so swapping the proof-of-identity step is small.)*

### R2 — Host stays Vercel. Storage stays Azure.

tobytango is Toby's personal site. The HDTS all-Azure ruling (R2, 2026-07-04)
governs client work and does not reach here; moving the host buys nothing and
costs a migration. Azure Blob stays because it is already configured, already
private, and already has the CORS and soft-delete posture this needs.

### R3 — Ships to PROD (`master`), not DEVL-only.

Toby: *"YES prod."* Standing caveat from the repo's CLAUDE.md still holds —
`master` is never pushed without his approval, so each PROD landing is his
explicit go, per-deploy.

### R4 — Proportionality, so the floor does not gold-plate.

Toby: *"no worries if breaks, no one uses it."* Correct for the site as it
stands — build fast, deploy freely to DEVL, do not build ceremony.

**The one exception, and it is a real one:** the moment `data/access.json` holds
real people's email addresses and the container holds attendee-recognizable
video, "no one uses it" stops being true and the blast radius changes. Phases A
and B are what make that moment safe. Speed is granted everywhere *except* the
access-control path.

---

## PHASE A — make it real and safe

*Goal: the admin surface actually runs, against a credential that cannot lose
the whole storage account. Nothing here is user-visible.*

**Lane: Azure (A1, A2) · floor (A3)**

### A1 — DONE (2026-08-05). Service principal created.

On Toby's explicit GO. App registration **`tobytango-festival-blob`**, one role
assignment, **`Storage Blob Data Contributor` scoped to the
`festival-chicho-202606` container only** — verified: not the account, not the
RG, no other assignment. Credentials are in `.env.local` as
`AZURE_FESTIVAL_TENANT_ID` / `_CLIENT_ID` / `_CLIENT_SECRET` (namespaced so
`DefaultAzureCredential` cannot pick them up globally and change behaviour
elsewhere). **Still to do: the same three, plus `AZURE_FESTIVAL_ACCOUNT_NAME`
and `AZURE_FESTIVAL_CONTAINER`, in Vercel project settings.**

### A1b — 🔴 THE FESTIVAL CODE IS WIRED TO THE WRONG STORAGE ACCOUNT.

**Found 2026-08-05 while setting the env contract. The handover doc does not
mention this and its §4 table is wrong about it.** This is why nothing could
ever have worked, and it is a bigger problem than the missing password.

`src/lib/azure-json-storage.js:4` resolves the **account** from a single global
`AZURE_STORAGE_ACCOUNT_NAME`. Only the **container** is overridable per call.
And that global is set to **`tangotiempoimages`** — a different storage account,
holding `tangolab-study` and the `*-images` containers used by the pre-existing
routes.

The festival container lives in the **`tobytango`** account. Verified:
`festival-chicho-202606` does **not** exist in `tangotiempoimages`, and
`tangotiempoimages` is the only account the code can currently reach.

So with every env var correctly set, the festival code would still connect to
`tangotiempoimages`, look for `festival-chicho-202606`, take a 404, return an
empty list, and **deny everybody**. It fails closed — the safety design holds —
but it presents as "access is broken" with no clue why, and the handover's §4
table attributes that exact symptom to a wrong *container* value. The cause is
the *account*.

**Do not fix this by repointing `AZURE_STORAGE_ACCOUNT_NAME` to `tobytango`.**
That would break `practice-videos`, `artists-umbrella` and `tango-collab`, which
legitimately live in `tangotiempoimages`. Two accounts are genuinely in play.

**The fix — extend the lib to resolve account *and* credential per call**, the
same backward-compatible way the `container` option was added:

- Festival calls → account `tobytango`, credential = **`ClientSecretCredential`**
  from the `AZURE_FESTIVAL_*` trio.
- Every existing call → account `tangotiempoimages`, credential = the existing
  **`StorageSharedKeyCredential`**, unchanged.
- Default path with no options given must behave **exactly** as it does today.
  The three pre-existing routes are the regression test.

Note what this means for the original §6.2: the account key in `.env.local` is a
key for `tangotiempoimages`, and it stays — those three routes need it. The
festival never had working credentials at all, so there is no "swap" to make on
the festival side, only a correct wiring to build. `tangotiempoimages` keeping a
full-account key is now its own separate, lower-priority item.

**Acceptance:** admin page reads and writes `data/access.json` in
`tobytango/festival-chicho-202606` using **only** the SP credentials; the three
pre-existing routes still read and write `tangotiempoimages` untouched; removing
the `AZURE_FESTIVAL_*` trio breaks the festival and nothing else.

### A1-original — Swap the account key for a scoped service principal *(closes §6.2)*

Today `AZURE_STORAGE_ACCOUNT_KEY` sits in `.env.local` and Vercel and grants
full control of the entire `tobytango` storage account, revocable only by
rotating the key — which breaks every deploy simultaneously. Toby has both the
Entra and RBAC rights to fix this (§0.4). **Do it before any media is uploaded**,
so the pattern is right the first time and is not copied to a second festival.

- Create an app registration + client secret.
- Assign **`Storage Blob Data Contributor`** scoped to the
  **`festival-chicho-202606` container only** — not the account, not the RG.
- Extend `src/lib/azure-json-storage.js` to authenticate with
  `ClientSecretCredential` when `AZURE_CLIENT_ID` / `AZURE_TENANT_ID` /
  `AZURE_CLIENT_SECRET` are present, **falling back to the existing account-key
  path when they are not**. Backward compatibility is mandatory — three other
  routes (`practice-videos`, `artists-umbrella`, `tango-collab`) use this lib
  against a *different* container and must not change behaviour.
- Managed Identity is the better answer and is unavailable: the app runs on
  Vercel, not Azure compute. Do not chase it.
- Only once the SP path is verified working: remove the account key from Vercel.
  **Leave it in `.env.local` until the SP is proven in PROD** — removing both at
  once means a failure has no fallback.

**Acceptance:** admin page reads and writes `data/access.json` with *only* the
SP credentials present; the three pre-existing routes still work untouched;
account key absent from Vercel env.

### A2 — Set the environment contract

`.env.local` **and** Vercel project settings (Vercel does not read `.env.local`):

- `FESTIVAL_ADMIN_PASSWORD` — Toby chooses it. Do not generate one.
- `AZURE_FESTIVAL_CONTAINER=festival-chicho-202606`
- SP trio from A1.

Also commit the already-modified `package.json` (`next dev --turbopack -p 4003`).
It is uncommitted and the docs now depend on it: a fresh clone starts on 3000,
which is not in the blob CORS list, and local media playback fails with what
looks like a broken player.

### A3 — First live exercise

The first successful admin save creates `data/access.json` in the container.
Verify against **live Azure**, not a build: add a user, reload, confirm
persistence, revoke, confirm removal. This is the first time any of this code
has run (§0.1) — expect to find something.

**Acceptance:** `data/access.json` exists in the container with real content;
admin CRUD verified end to end; a deliberately wrong password is refused.

---

## PHASE B — the door

*Goal: a person on the list can see the archive; nobody else can; no search
engine ever indexes it.*

**Lane: FE (Charlotte) + routes (Franklin)**

### B1 — `/festival/chicho2026` and its login

The route does not exist (§0.3). Build the page plus an email-entry gate that
calls the existing `check` action, then sets a session.

### B2 — Session cookie

Signed, `httpOnly`, `Secure`, `SameSite=Lax`, with a real expiry. **The cookie
must carry the email**, so that a later revocation actually bites and so the
identity step can be upgraded to a magic link without touching anything
downstream (R1).

A revoked person must lose access at their next request — not at cookie expiry.
Re-check `hasAccess()` server-side on every gated request; do not trust the
cookie as a standing grant.

### B3 — Not-searchable, done with the right instrument

**There is a trap in what is already committed.** `public/robots.txt` currently
`Disallow`s `/admin` and `/festival/`. A `Disallow` tells Google *not to fetch*
the page — which means Google **cannot see a `noindex` tag on it**. If the URL
is ever linked from anywhere, Google can index the *URL itself* while being
forbidden to read the very instruction that would have excluded it. Disallow is
therefore the weaker instrument here, and it actively blocks the stronger one.

Correct posture for "definitely not searchable":

- Serve **`X-Robots-Tag: noindex, nofollow`** on `/festival/*` and `/admin/*`
  (Next.js headers config or per-route metadata). This is a directive, not a
  request, and it does not depend on the crawler's goodwill.
- Keep `/festival/*` and `/admin/*` **out of the sitemap** — already done, keep it.
- **Drop `/festival/` from the robots.txt `Disallow`** so the `noindex` is
  readable. Keep `/admin` disallowed if preferred — but understand it is a
  request, exactly as the handover doc says.
- The gate itself is the real control. A crawler that fetches the page sees the
  login form and nothing else.

### B4 — SAS-minted media, short-lived

Media is never served from a public URL. A gated server route mints a
**read-only SAS with a short expiry (target 15 minutes)** for the specific blob
being played, only after `hasAccess()` passes for the session email.

A SAS URL *is* a public URL for its lifetime — anyone holding it can fetch it,
and anything that logs or shares it extends the leak. Short expiry is the entire
control. Do not mint container-scoped SAS, do not mint hours-long SAS, and do
not put a SAS in a page that gets cached.

**Acceptance:** listed email gets in; unlisted email does not; revoking a user
locks them out on the next request, not on cookie expiry; `curl` on a blob URL
without SAS is refused; a SAS URL fails after expiry; `X-Robots-Tag: noindex`
observed on the live response headers of both `/festival/*` and `/admin/*`.

---

## PHASE C — the media

*Goal: the archive has something to show. Not started before Phase A lands —
uploading under the full-account key is exactly the pattern A1 exists to stop.*

- Upload `Video_web/` proxies (~3.4 GB finished) and the 79 `vocals/*.m4a`
  (239 MB) with **slugified blob names** per the handover §5: source names carry
  spaces, colons and `+` (`Chicho :2026-07-31T17:19:15+02:00.m4a`), all hazardous
  in URLs.
- Video blob names use the **corrected** local time, not DJI's stamp, so audio
  and video sort together chronologically. The DJI clock is wrong by a fixed
  **+4.0 h**; local wall-clock = `creation_time + 2 h`. `video_index.py`
  documents the derivation — read it before touching timestamps.
- **Never upload the 68–70 GB of HEVC originals.** They are masters, they stay
  on `/Volumes/DEVL`, and they will not play in Chrome or Firefox on
  Windows/Android anyway. That is why the proxies exist.
- Upload `data/workshop.json`, `data/video-index.json` alongside.
- Confirm the transcode finished (78/92 at handover, `make_proxies.py` is
  idempotent and resumes; it writes `.part.mp4` and renames atomically, so an
  interrupted run never leaves a partial file looking complete).

**Open for Toby, does not block C starting:** does the **audio** ship to blob
too, or does only video go up? And should the floor price Azure egress before
upload — an archive that a dozen people actually watch is the one case where
blob egress stops being a rounding error.

**Acceptance:** every proxy and audio file present under `video/` and `audio/`
with slugified names; a spot-check of three files plays end to end through the
gate, including **seeking mid-file** (Range requests — this is what the `HEAD`
and exposed-headers CORS settings are load-bearing for).

---

## PHASE D — the archive page

*Goal: the thing Toby actually wanted — transcripts where each line plays that
exact moment of audio, with the matching video.*

Shaped later, once B and C are real. The local standalone browser already built
by the pipeline (`build_site.py` → `/Volumes/DEVL/…/chicho202606/site/index.html`)
is the reference for what it should feel like — read it before designing.

---

## PHASE E — proportionate hardening

*Deliberately last, and deliberately small. Per R4 the audience is under a
dozen and the content is publishable-but-unlisted; these do not justify
elaborate machinery.*

- **§6.3 admin rate-limit.** A single shared password with no lockout is
  brute-forceable. Add a simple lockout/429 after N failures. Cheap, do it.
- **§6.4 enumeration oracle.** The unauthenticated `check` lets someone probe
  "is `x@gmail.com` on the list" one address at a time. With a dozen known
  friends this is a small disclosure — but the honest fix is also small: rate
  limit it and make it constant-time. Do not rebuild the auth model for it.
- **§6.5 CORS `localhost:4003`.** Leave it. Dev needs it, and R4 says do not
  build ceremony. Revisit only if the archive ever widens.
- **§6.6 festivals registry.** `AZURE_FESTIVAL_CONTAINER` holds one value, so
  **two live festivals do not work without a code change**. Move the container
  to a per-festival property (`data/festivals.json` holding
  `{key, label, container, published}`) **at the moment a second festival is
  actually wanted** — not before. Building it now is speculative.

---

## Standing constraints

- **Fails closed, everywhere.** Unknown email, unreadable list, missing grant,
  missing password → denied. There is no code path where an error grants access.
  Any change that introduces one is a defect, not a trade-off.
- **A read error is not "empty."** `readJsonFromBlob` rethrows on non-404 when a
  `fallback` is supplied, and the POST handler refuses to write a list it could
  not first read. This is what stops a transient blob failure from presenting as
  "no users", prompting a re-add, and overwriting the real allowlist. Preserve it.
- **Rights.** This is Chicho and Juana's copyrighted instructional material from
  a paid workshop, and the audio contains other attendees' voices. It stays
  gated unless Toby says he has permission to publish.
- **The repo is public.** No secret, no attendee email, no personal data is ever
  committed here.
- Escalate design forks and errors **up** (Archie for architecture/risk, Herald
  for docs) — do not argue inline, do not silently reverse a §1 ruling.

— Edison, Menlo Park, 2026-08-04

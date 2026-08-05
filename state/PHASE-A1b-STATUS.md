---
date: 2026-08-05
persona: franklin
type: status
state: current
feature: festival-gate
phase: A1b
permanence: short-term
audience: edison, toby, charlotte
related:
  - [[../plan/PHASE-A-festival-gate-2026-08-04]]
---

# A1b — festival storage account — DONE

**Commit `047d4b3` on `DEVL`.** Verified against live Azure, not reasoned about.
Not pushed to `master`; PROD untouched.

## What was wrong

`src/lib/azure-json-storage.js` resolved the storage **account** from one global,
`AZURE_STORAGE_ACCOUNT_NAME` (= `tangotiempoimages`). Only the *container* was
overridable per call. The festival container lives in a different account,
`tobytango`. Every festival read therefore hit the wrong account, took a 404,
returned an empty allowlist, and denied everyone — failing closed, as designed,
but presenting as "access is broken" with no clue why.

## The fix

The lib now resolves **account and credential per call**, the same
backward-compatible way `container` was added. Callers pass an `account` option:

| `account` | Storage account | Credential |
|---|---|---|
| omitted / `'default'` | `tangotiempoimages` | existing `StorageSharedKeyCredential` — unchanged |
| `'festival'` | `tobytango` | `ClientSecretCredential` from the `AZURE_FESTIVAL_*` trio |

Fail-closed properties, deliberately:
- Missing festival credentials **throw**. They never fall back to the default
  account — a silent fallback is a fail-open and would have hidden this very bug.
- An unrecognised account name throws rather than silently defaulting.
- `readJsonFromBlob`'s rethrow-on-non-404-when-given-a-fallback is preserved
  exactly, so a transient blob failure still cannot look like "no users" and
  invite a save that clobbers the real allowlist.

One `BlobServiceClient` is cached per account so the SP token isn't re-fetched
on every request. The cache key deliberately excludes the client secret.

## Files

- `src/lib/azure-json-storage.js` — the fix (my lane).
- `src/lib/festival-access.js` — two call sites now pass `account: 'festival'`.
  **Flagging:** not on the do-not-touch list, and it is the storage-caller seam,
  so I treated it as mine. Change is three lines + a comment. Say the word if you
  want it routed differently.
- `package.json` / `package-lock.json` — adds `@azure/identity` (in scope per your note).

Charlotte's files untouched: `src/app/festival/`, `src/app/api/festival/session/`,
`src/lib/festival-session.js`, `next.config.mjs`, `public/robots.txt`,
`next-sitemap.config.js`. I reverted an incidental `public/sitemap-0.xml`
regeneration (pure `lastmod` churn from my build) rather than commit into her lane.

## Acceptance — all four met

**1. Admin reads and writes `data/access.json` in `tobytango/festival-chicho-202606`
using only SP credentials.** ✅ Through the running app on :4003: added a user →
`{"ok":true}`, re-read → persisted, revoked → list empty. Direct SP probe confirmed
write + read-back + delete in the container, and that account-level
`listContainers` is **refused with 403** — the container-only scope genuinely holds.

**2. Pre-existing routes still hit `tangotiempoimages`, exercised not assumed.** ✅
`tango-collab` returns its **112 videos** through the real authenticated route. The
no-options write path was probe-written and confirmed to land in
`tangotiempoimages/tangolab-study`. (First pass returned 401 because both routes are
password-gated — re-run authenticated, which is the only way this is a real test.)

**3. Removing the `AZURE_FESTIVAL_*` trio breaks the festival and nothing else.** ✅
Server restarted with the trio blanked: admin GET → `502 "Azure festival storage not
configured"`, gate check → `{"allowed":false}` (**denies, not allows**), while
`tango-collab` still served 112 videos and `practice-videos` still returned 200.

**4. A deliberately wrong admin password is refused.** ✅ `401` on GET, `403` on POST.
Also confirmed the **escaped** `.env` form (`\$`) does *not* authenticate — proving
dotenv-expand unescapes it as documented. The backslash is untouched.

`npm run build` compiles clean with `@azure/identity` in the bundle.

## Three things you should know

1. **The plan says three pre-existing routes; there are two.**
   `artists-umbrella` does **not** use this lib — it reads the local filesystem
   (`public/artists-umbrella`). Only `practice-videos` and `tango-collab` are real
   regression surface. Doesn't change the fix; does change what "regression tested"
   means. Worth correcting in the plan.

2. **`practice-videos.json` does not exist in the container** (404 → legacy
   `{videos:[]}`). Pre-existing state, unaffected by this change — flagging only so
   an empty practice-videos list isn't later misread as fallout from A1b.

3. **`data/access.json` now exists** with an empty list — created by my acceptance
   run and emptied again on revoke. That is A3's "first live exercise" effectively
   done: this code has now run against live Azure and works. An empty allowlist
   fails closed, so the container is in a safe state.

Also noted, not acted on: `npm audit` reports a critical in `fast-xml-parser` via
the **pre-existing** `@azure/storage-blob`. `@azure/identity` introduced no new
vulnerable deps. Out of scope for A1b — raising it, not touching it.

## Not done / next

- **Vercel env vars are still unset**: `AZURE_FESTIVAL_ACCOUNT_NAME`,
  `AZURE_FESTIVAL_CONTAINER`, the SP trio, and `FESTIVAL_ADMIN_PASSWORD`
  (**raw and unescaped in Vercel** — no backslash). Until those are set, PROD
  festival access fails closed for everyone. This is the gating item for A2.
- `master` not pushed. Needs Toby's per-deploy go.

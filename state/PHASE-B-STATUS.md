---
type: status
permanence: living
app: tobytango.com
phase: B (B1, B2, B3)
owner: charlotte (Menlo floor, FE)
consumes: plan/PHASE-A-festival-gate-2026-08-04.md
branch: DEVL
date: 2026-08-05
---

# Phase B — status

Scope built: **B1, B2, B3**. B4 (SAS-minted media) is Franklin's and is untouched.
A1/A2 (Azure SP, env vars) are the Azure lane and are untouched — but see
**Escalation E1**, which now blocks the last verification step of B1/B2.

The line between *verified* and *reasoned about* is drawn explicitly below.
Nothing is marked done on reasoning alone.

---

## What was built

### B1 — `/festival/chicho2026` + login *(built)*
- `src/app/festival/chicho2026/page.js` — server component. Reads the session
  cookie, re-checks `hasAccess()` against the live allowlist, renders either the
  gate or the archive shell. `export const dynamic = 'force-dynamic'` so it is
  never prerendered or cached.
- `src/app/festival/FestivalGate.js` — client email-entry form. Copy names it
  honestly as a **courtesy gate, not a secure login** (plan §1 R1), and states
  the rights position (Chicho and Juana's material, other attendees' voices).
- `src/app/festival/SignOutButton.js` — clears the session.
- `src/app/festival/page.js` — index page. The nav's "Festival" group points at
  `/festival`, which was also a 404; it now lists the festivals.
- The archive shell behind the gate is a deliberate placeholder saying the
  recordings are not up yet. Populating it is Phase C/D — not drifted into.

### B2 — session cookie *(built)*
- `src/lib/festival-session.js` — HMAC-SHA256 signed token, timing-safe compare.
- `src/app/api/festival/session/route.js` — `POST` issues, `DELETE` clears.
- The cookie **carries the email**, never a grant. Every gated request re-runs
  `hasAccess(email)`, so a revoked person is denied at their next request rather
  than at cookie expiry.
- Attributes: `httpOnly`, `sameSite=lax`, `path=/`, `maxAge` 12 h, and `secure`.

### B3 — not-searchable, with the right instrument *(built + verified)*
- `next.config.mjs` now serves `X-Robots-Tag: noindex, nofollow` on `/festival`,
  `/festival/*`, `/admin`, `/admin/*` and `/api/festival/*`.
- **Dropped `/festival/` from the robots.txt `Disallow`** so that the `noindex`
  is fetchable and therefore readable. `/admin` stays disallowed. Changed in
  `next-sitemap.config.js` — note `public/robots.txt` is **generated** at
  `postbuild`, so editing that file by hand would have been overwritten. The
  brief pointed at `public/robots.txt`; the real control is the config.
- Per-route `metadata.robots = {index:false, follow:false}` as a second layer,
  since the root layout sets `index:true` site-wide.

---

## Verified — actually observed

Production build (`npm run build`), served on `:4003`, exercised with `curl`.

| Check | Result |
|---|---|
| `npm run build` | ✅ passes |
| `/festival/chicho2026` no longer 404 (the live nav 404) | ✅ 200 |
| `/festival` no longer 404 | ✅ 200 |
| `X-Robots-Tag: noindex, nofollow` on `/festival`, `/festival/chicho2026`, `/admin/access`, `/api/festival/session` | ✅ all four |
| Header **absent** on a normal page — not over-applied | ✅ |
| Anonymous request renders the gate, not the gated content | ✅ |
| Forged cookie (`aaaa.bbbb`) → gate, no content | ✅ |
| `POST` session with no signing secret → **503, no `Set-Cookie`** | ✅ |
| `POST` with invalid email → 400 · unknown festival key → 400 | ✅ |
| `POST` with secret set, email not on the list → **403, no `Set-Cookie`** | ✅ |
| `/festival` absent from generated `sitemap-0.xml` | ✅ (see D1) |
| `/festival/chicho2026` marked `ƒ` dynamic in build output | ✅ |

**Session crypto — 23/23 unit checks passed** (round-trip; email normalised to
lowercase; swapped payload with original signature rejected; flipped signature
rejected; signature stripped rejected; expired token rejected; token from a
different secret rejected; `signSession` throws rather than issuing unsigned
when unconfigured; a secret under 16 chars treated as unset; cookie attributes).

### D1 — defect found and fixed during verification
`exclude: ['/festival/*']` does **not** match the bare `/festival`, so the new
index page was emitted into `sitemap-0.xml` — the sitemap would have advertised
the gated area to crawlers. (`/admin` avoided this only because the list happens
to carry both `/admin` and `/admin/*`.) Both forms are now excluded, rebuilt,
and re-checked: `/festival` is absent.

---

## NOT verified — do not read these as done

*(Items 1 and 2 were closed on 2026-08-05 — see the Happy-path addendum below.
Left in place so the record shows what was outstanding and when.)*

1. ~~**The happy path has never run.**~~ **CLOSED** — observed 2026-08-05.
2. ~~**Revocation has never been observed biting.**~~ **CLOSED** — observed
   2026-08-05, and isolated from cookie invalidation.
3. **`secure` on the cookie has not been observed on real HTTPS.** Still open.
   It is `NODE_ENV === 'production'`-gated (see Deviation V1) and asserted in
   unit tests, not seen on a deployed response. Genuinely needs a deploy;
   Edison's call is to leave it, note it, and not chase it locally.
4. **Nothing is deployed.** All of this is local on DEVL. PROD is untouched and
   `/festival/*` still 404s on www.

---

## Escalations — for Edison

### E1 — blocked on A1b (wrong storage account) — *already known, corroborated*
The plan gained **§A1b** in commit `294943b` (11:14 today) while this phase was
being built. I hit the same wall independently from the B-side and reached the
same conclusion, so treat this as confirmation rather than a new finding.

What I observed from here: a direct probe of `readAccess()` returns
`users: 0`. That is **not** a successful read of an empty list — it is
`ContainerNotFound` (404) taking the `fallback` path in `readJsonFromBlob`.
`src/lib/azure-json-storage.js` resolves the account solely from
`AZURE_STORAGE_ACCOUNT_NAME` (= `tangotiempoimages`) and reads none of the
`AZURE_FESTIVAL_*` values, exactly as §A1b describes.

**Consequence for Phase B specifically:** the gate is correct and fails closed,
but *nobody can ever be let in* until A1b lands, because `hasAccess()` can only
ever return false. The B1/B2 happy path is not verifiable before then.

**A1b is unassigned as far as I know** — Edison's brief predates it and told me
A1/A2 were the Azure lane and not mine. A1b is a code change to
`azure-json-storage.js`, which reads as floor work. I have not touched it and
will not self-assign. **Edison: say the word and I will take it** — it is a
contained, backward-compatible change (add per-call account + credential
resolution, default path byte-identical), and the three pre-existing routes
are the regression test named in the A1b acceptance.

One coordination detail for whoever takes it: §A1-original specifies unprefixed
`AZURE_CLIENT_ID` / `AZURE_TENANT_ID` / `AZURE_CLIENT_SECRET`, but the values
Toby actually provisioned are namespaced `AZURE_FESTIVAL_*` (deliberately, per
§A1, so `DefaultAzureCredential` cannot pick them up globally). The code must
read the `AZURE_FESTIVAL_*` names.

### E2 — `FESTIVAL_ADMIN_PASSWORD` is set but **empty**
`isAdminPassword()` refuses when the expected value is blank — correctly, it
fails closed. Effect: the admin surface at `/admin/access` cannot be used by
anyone, so the allowlist cannot be populated, so A3 and the Phase B happy path
are both blocked. Toby chooses this value (plan §A2); I have not generated one.

### E3 — a new env var is required, and it is not in the plan
**`FESTIVAL_SESSION_SECRET`** — the HMAC key for the session cookie. Needs to be
a random string of at least 16 characters, set in `.env.local` **and** in Vercel.
Without it the gate refuses everyone with a 503 (verified). The plan's §A2 env
contract does not list it, because the plan did not specify how the session is
signed. Flagging rather than quietly adding it to the contract.

### E4 — ~~the enumeration oracle now has a second mouth~~ — WITHDRAWN 2026-08-05
*Closed by plan §R4b: Toby ruled the threat model first-hand — the adversary is
a search engine, not an attacker. §6.3 and §6.4 are won't-do-unless-asked. Not
built. Original text kept below for the record.*

`POST /api/festival/session` reveals "on the list / not on the list" exactly as
the existing unauthenticated `check` action does. No new class of disclosure,
but it is a second unrated endpoint. Plan §E covers rate-limiting both; I have
not built it, as Phase E is explicitly last and not in this scope.

---

## Deviations from the brief — flagged, not silent

- **V1 — `secure` is `NODE_ENV === 'production'`-gated, not unconditional.**
  The brief says `Secure`. An unconditional `Secure` cookie is silently dropped
  over `http://localhost:4003`, which would make the gate impossible to test
  locally. Every deployed environment is HTTPS, so it is `Secure` everywhere it
  matters. Say the word and it becomes unconditional.
- **V2 — the fix location for B3 is the config, not `public/robots.txt`.**
  That file is generated at `postbuild`; a hand edit would be reverted on the
  next build. Both are updated so the repo is self-consistent either way.
- **V3 — `/festival` index page added.** Not named in the brief, but the nav
  group links to `/festival`, which was a second 404 alongside the named one.

---

## Housekeeping

- `package.json` (`-p 4003` for `dev` and `start`) was uncommitted; plan §A2
  asks for it to be committed. Included.
- `.env.local` is gitignored (`.gitignore:34`) and has never been tracked —
  verified, since the repo is public and it now holds a live client secret.
- **`FESTIVAL_SESSION_SECRET` was set only as a shell variable for local
  testing.** It was never written to `.env.local` and never committed. A real
  value still needs choosing (E3).

---

## Next

Blocked on **A1b** (E1) and the empty admin password (E2) before the happy path
can be verified by anyone. Once the allowlist is reachable and an admin password
exists, the loop to run is: add a user → sign in → confirm the archive shell
renders → revoke → confirm the **next** request is denied. That is the
acceptance test Phase B actually needs, and it is the one thing still
outstanding. It takes minutes once A1b lands.

Plan §A1b was read at commit `294943b`; Phase B is unchanged from `349bbea`, so
this build is against the current membrane.

---

# Addendum — the happy path, OBSERVED (2026-08-05)

All three blockers cleared: **A1b** landed by Franklin (`047d4b3`, per-call
account resolution), **`FESTIVAL_ADMIN_PASSWORD`** set by Toby, and
**`FESTIVAL_SESSION_SECRET`** generated and added to the §A2 env contract.
Rebuilt on that, served on `:4003`, run against **live Azure** —
`tobytango/festival-chicho-202606` via the scoped service principal.

This is the section that was missing. Everything before it verifies the door
stays **shut**. This verifies it **opens for the right person and shuts again on
command**.

## The loop — 20/20 observed

| # | Step | Result |
|---|---|---|
| 0 | Baseline allowlist captured | 0 users |
| 0 | Test address not already present | ✅ |
| 1 | Grant via `/admin/access` (live Azure write) | ✅ 200, address on the list |
| 2 | That email entered at the gate → session issued | ✅ 200 + `Set-Cookie` |
| 2 | Cookie `HttpOnly` · `SameSite=Lax` · `Max-Age` present | ✅ |
| 3 | **Gated page rendered the archive shell** | ✅ **door OPENS** |
| 3 | Gate markup absent; signed-in address shown | ✅ |
| 4 | Revoked via `/admin/access` | ✅ 200, address gone |
| 4 | **Same cookie, not cleared, not expired → DENIED** | ✅ **door SHUTS** |
| 4 | Gate shown again; archive content absent | ✅ |
| 5 | Allowlist restored to baseline | ✅ 0 users |

## Mechanism isolated — 5/5

A denial after revocation could equally have meant "the cookie stopped working."
It did not. **One** cookie was minted and then reused verbatim, never re-issued,
while only the allowlist changed underneath it:

| Allowlist state | Same cookie | Result |
|---|---|---|
| granted | reused | ✅ **opens** |
| revoked | reused | ✅ **denied** |
| re-granted | reused | ✅ **opens again** |
| granted, but scoped to a *different* festival key | reused | ✅ **denied for `chicho2026`** |

The same bytes open, close and reopen the door purely as the grant changes. That
is the B2 claim demonstrated rather than argued: **the cookie carries identity,
not permission**, the allowlist is read live on every request, and per-festival
scoping is enforced — so swapping the email box for a magic link later touches
nothing downstream.

## Test data — cleaned up

One synthetic address, `charlotte-phaseb-test@example.com`, was added and
removed. `example.com` is RFC-2606 reserved, so it can never be a real person.
No attendee address was used at any point. **The allowlist ends the run exactly
as it began — 0 users** (asserted, not assumed: baseline captured before and
compared after, in both runs). `data/access.json` itself already existed from
Franklin's A1b verification and remains, holding an empty user list.

## Still open after this addendum

- **`secure` on real HTTPS** — unchanged, needs a deploy, deliberately not
  chased locally (item 3 above).
- **Nothing is deployed.** PROD still 404s on `/festival/*`. No PROD landing has
  been requested and none has been made.
- Phase C (media) is Franklin's and is untouched. Phase D (the archive page) is
  not started; the placeholder shell behind the gate remains the correct
  stopping point until the media is actually there.
- Per plan **§R4b** (Toby's threat model, first-hand): §6.3 rate-limit and §6.4
  enumeration oracle are won't-do-unless-asked. **E4 in this document is
  withdrawn** — not built, and not to be built.

---

# Addendum 2 — PROD copy corrections (2026-08-05)

Phase B is **fully closed**: deployed to PROD on Toby's go, and the last hedged
item is now observed rather than asserted — `Secure; HttpOnly; SameSite=lax` seen
on a real HTTPS `Set-Cookie` from `www.tobytango.com`. Nothing in Phase B is
hedged any more.

Two copy defects were live in front of real attendees. Both mine, both fixed.

1. **"still being processed and uploaded" was false.** Franklin completed Phase C
   — the media is in the container. What is actually missing is the delivery
   path (SAS minting) and the player, which is Phase D. Rewritten to say the
   recordings are stored and the **players** are still being built. It does not
   explain the plumbing to an attendee.
2. **"June 2026" was wrong.** The workshop was **27 July – 1 August 2026** — six
   days, corroborated by the media spanning `20260727`–`20260801` and by the
   handover doc §1 independently. Every person who can read this page was there,
   so the displayed date now matches what they lived.

Swept the whole festival surface for both errors and their softer variants
(`June`, `uploading`, `being processed`, `not up yet`, `land with`, `soon`,
`coming`, `pending`) across the gated page, the `/festival` index, the gate, the
menu label, page metadata and titles. **All instances were confined to
`festival/chicho2026/page.js`; the index, gate and menu made no date or upload
claims.** Zero remaining.

Verified by **rendering the page as a signed-in user**, not by grepping source —
7/7 assertions on the served HTML: the new dates present, "June" absent, no
upload/processing claim, no "not up yet", the recordings stated as stored, the
players stated as still being built, and the rights notice still intact.

**The container slug `festival-chicho-202606` is deliberately untouched.** The
June error is baked into the name of a container now holding 4.4 GB, it is
invisible to users, and renaming it is not worth it. Only displayed text was
corrected.

### Housekeeping note — a test row was briefly left behind
The first copy-check run crashed on a bug in my own harness *after* it had added
its test row, so that row survived until the next run cleaned it. The re-run's
baseline comparison caught the discrepancy, which is what it is for. Final state
verified directly: **no test rows remain, and the one real row
(`toby.balsley@gmail.com`) is intact.** Nothing was clobbered.

### Flag for Edison — concurrency hazard, now that PROD is live
`data/access.json` is a single blob updated read-modify-write with no ETag,
lease or conditional write. PROD and a local dev server hit the **same**
container, so two admin edits that overlap will silently drop one of them. That
was harmless while the list was empty; it is not harmless now that real people
are on it. I have stopped running write-tests against the live container. Not
proposing a fix — per §R4b the hardening dial is down — but it should be a known
sharp edge before a second admin ever uses that page.

— Charlotte, Menlo floor, 2026-08-05

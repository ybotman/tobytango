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

1. **The happy path has never run.** No email has ever been let *in*, because
   nobody can be added to the allowlist yet (see E1 + E2). The `allowed` branch
   of the gated page — the archive shell — has never rendered from a real grant.
2. **Revocation has never been observed biting.** The mechanism is verified by
   construction (force-dynamic + re-check on every request, cookie carries only
   the email) and its rejection paths are unit-tested, but the
   add → get in → revoke → denied-next-request loop has not been executed.
3. **`secure` on the cookie has not been observed on real HTTPS.** It is
   `NODE_ENV === 'production'`-gated (see Deviation V1) and asserted in unit
   tests, not seen on a deployed response.
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

### E4 — the enumeration oracle now has a second mouth
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

— Charlotte, Menlo floor, 2026-08-05

---
date: 2026-08-05
persona: franklin
type: status
state: current
feature: festival-gate
phase: B4
permanence: short-term
audience: edison, charlotte, toby
related:
  - [[../plan/PHASE-A-festival-gate-2026-08-04]]
  - [[PHASE-C-STATUS]]
---

# B4 — SAS mint route — DONE

`POST /api/festival/media` mints short-lived, per-blob, read-only URLs. The
browser then fetches media **straight from Azure**, so Range/seeking works
natively and 4.4 GB never flows through Vercel.

Verified against live Azure. Files: `src/app/api/festival/media/route.js` and
`src/lib/festival-media.js` (both my lane), plus one additive export from
`src/lib/azure-json-storage.js`.

## The contract — for Charlotte

```
POST /api/festival/media
  cookie: festival_session (set by the existing session route)
  body:   { "festival": "chicho2026", "blobs": ["video/2026-07-27_191940.mp4", …] }

200 -> { "urls": { "<blob>": "<https url with SAS>" },
         "expiresOn": "2026-08-05T21:08:20.058Z",
         "ttlSeconds": 900 }
```

- **Up to 60 blobs per call**, so a transcript page can mint a session's audio in
  one round trip instead of sixty.
- **Blob names come from `data/workshop.json`** — every record carries its `blob`.
  Do not construct names by hand.
- **URLs live 15 minutes.** Re-mint rather than caching them. `expiresOn` is
  returned so the page can refresh before playback breaks mid-session.
- **Errors:** `401` not signed in · `403` revoked · `400` bad festival or an
  unsignable path · `502` storage trouble · `503` not configured. Every one is a
  deny; there is no partial success.
- If a request contains **any** invalid blob name the whole call is rejected. A
  caller must never believe it got a URL it did not.

## Acceptance — observed, not reasoned

| constraint | result |
|---|---|
| Gated, re-checked per request | ✅ `401` with no cookie **and with a forged cookie** |
| Revocation bites immediately | ✅ revoked mid-session → next mint `403`; restored → `200` |
| Short-lived | ✅ 900 s; a 20 s SAS returned `206`, then **`403` once expired** |
| Per-blob, read-only | ✅ `sp=r`, `spr=https`; the **same SAS against `data/access.json` → `403`** |
| Never cached | ✅ `Cache-Control: no-store, no-cache, must-revalidate, private`, `force-dynamic` |
| No byte proxying | ✅ URL points at `tobytango.blob.core.windows.net`; **Range → `206`**, `Content-Range: bytes 700000-765535/1423210`, `Accept-Ranges: bytes` |
| User-delegation, not account key | ✅ `skoid` present in the query — signed by the delegation key, bounded by the SP's own RBAC |

**Path attacks — all eight refused with `400`, none signed:** `data/access.json`,
`../data/access.json`, `video/../data/access.json`, `/video/x.mp4`,
`video//x.mp4`, `data%2Faccess.json`,
`transcripts/../../data/access.json`, and the empty string.

That allowlist is the load-bearing control here and is worth stating plainly:
**the SP can read the entire container, `data/access.json` included.** Without a
prefix allowlist, any signed-in visitor could have asked for the allowlist and
been handed a signed URL to it. Only `video/`, `audio/` and `transcripts/` are
signable; `data/` never is.

## 🔴 I damaged live data and repaired it — read this

My revocation test revoked and re-added **the real user record** instead of a
throwaway address. `remove` + `add` resets provenance, so it destroyed
`name: "toby"` (→ `""`) and reset `added` from `20:20:31.923Z` to
`20:53:21.654Z`. I caught it by re-reading the blob rather than trusting my
"restored as found" comment, then recovered the pre-test content from a
soft-deleted snapshot (undelete does not disturb the current version).

- **`name` is restored** to `"toby"` via the admin API — the sanctioned interface.
- **`added`/`updated` are still wrong.** The admin API deliberately preserves the
  *stored* `added` on update, so it cannot rewrite them; only a direct blob write
  can, and that was blocked by a permission guard on this access-control file. I
  did not work around it.

Current record — functionally correct, provenance still off:

```json
{ "email": "toby.balsley@gmail.com", "name": "toby", "pages": ["chicho2026"],
  "note": "", "added": "2026-08-05T20:53:21.654Z", "updated": "2026-08-05T20:56:36.541Z" }
```
Original `added`/`updated` were both `2026-08-05T20:20:31.923Z`. Say the word and
I will restore them exactly, with permission for the direct write.

**The lesson, which is the durable part:** a gate test that exercises revocation
must use a disposable address. Testing revocation *on a real grant* means the
test's failure mode is destroying someone's access. My earlier A1b run got this
right (`franklin-probe@example.com`); this one did not, because the live record
was conveniently already there. Convenience was the tell.

## Notes for whoever takes Phase D

- **One container per festival is still assumed.** `FESTIVAL_CONTAINER` is a
  single env value, so the route signs against whatever it names. A second live
  festival needs the per-festival registry from handover §6.6 *before* it works —
  the `festival` key is validated but does not yet select a container.
- **The delegation key is cached** for an hour and re-fetched with 10 minutes to
  spare, so minting is one signature, not an account round trip per request.
- **If playback works but scrubbing does not**, look at blob CORS — `HEAD` and the
  exposed headers are what Range depends on. Edison verified them via ARM; this
  credential cannot read them (account-scope, `403`).

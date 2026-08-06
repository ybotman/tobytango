---
type: status
permanence: living
app: tobytango.com
phase: E (E2 curation toggles, E4 comments)
owner: charlotte (Menlo floor, FE)
consumes: plan/PHASE-A-festival-gate-2026-08-04.md §PHASE E, data/annotations.json
branch: DEVL
date: 2026-08-06
---

# Phase E — status (E2 + E4)

Both authoring surfaces are built and **admin-only**, per Toby's first-hand
ruling. Verified end to end on live Azure: **26/26** on the boundary suite,
**10/10** on the curation wiring.

**Not deployed.** Edison deploys.

E3 (search) not started, as instructed. E1 is Franklin's.

---

## What was built

| File | What it is |
|---|---|
| `src/lib/festival-admin.js` | Admin session — signed cookie, domain-separated from the viewer session |
| `src/app/api/festival/admin-session/route.js` | `POST` password → admin cookie; `DELETE` → clear |
| `src/lib/festival-annotations.js` | Reads Franklin's E0 rescue + an edit overlay; effective classification |
| `src/app/api/festival/annotations/route.js` | Admin-only re-classification of one segment |
| `src/lib/festival-comments.js` | Comment store (single-writer, fail-closed) |
| `src/app/api/festival/comments/route.js` | `GET` read (any viewer) · `POST` write (admin only) |
| `…/[date]/AdminPanel.js` | Owner sign-in + Show chatter / Show dropped |
| `…/[date]/DayArchive.js` | Curation applied to lines; per-line re-class; comments read/write |

### Why an admin session had to exist
"Admin" previously meant posting the password with each request from
`/admin/access`. The archive pages need to decide **what to render** — toggles or
not, a comment box or not — so admin identity has to be on the request.

Two properties it deliberately keeps:
- **It is not a view gate.** Being admin grants *authoring* only. `hasAccess()`
  still decides visibility on every request, unchanged. Verified: an admin
  cookie with **no** viewer session gets the gate and no content.
- **It is domain-separated from the viewer session.** Both are HMACs under
  `FESTIVAL_SESSION_SECRET`; without separation one token would be forgeable
  from the other. The admin key is `HMAC(secret, 'festival-admin-session-v1')`
  and the payload carries a purpose that is checked on verify.

---

## 🔴 Two findings about the curation data — read these

### 1. `s: false` is CHATTER, not dropped. The rescue's `counts.dropped` is mislabelled.

`data/annotations.json` reports `{keep: 3161, dropped: 10295}`. Those 10,295 are
**chatter**, not dropped. Verified against the reference browser's own logic
rather than inferred from the field name:

```js
if (!sg.s && se.text === undefined) cls.push('chatter');   // s:false -> chatter
if (se.hidden) cls.push('seg-hidden');                     // <- THIS is "dropped"
```

Rendering `s:false` as "dropped" would tell Toby he had discarded eight times
more of the workshop than he actually did. The mapping in
`festival-annotations.js` is therefore `s:false → chatter`, and "dropped" starts
empty.

**Franklin/Edison:** the extraction itself is correct and faithful — only the
`counts` key name is wrong. Worth renaming to `chatter` so the next reader is
not misled, but the data does not need re-extracting.

### 2. The real "dropped" set — and any text/subject edits — may be lost already.

`seg-hidden` came from the reference's `edits` object, and that object is loaded
from **localStorage only**:

```js
let edits = {};
try { edits = JSON.parse(localStorage.getItem(KEY) || '{}'); } catch(e){ edits = {}; }
```

So every manual drop, text correction and subject fix Toby made in that browser
lives in the localStorage of whichever browser profile he used. It is **not** in
`site/index.html`, not in the rescue, and not on the drive. E0 rescued the
machine's classification; this is the *human* layer on top of it, and it was
never persisted anywhere durable.

**I have not asserted that anything is lost — he may never have used edit mode.**
But if he did, the recovery window is however long that browser profile survives,
and the reference has an **"⭳ Export edits"** button that would dump it to JSON.
Worth asking him before that machine is next cleaned up. Flagged rather than
actioned: it is his data and Edison's call.

---

## Design decision — the rescue is read-only; edits go in an overlay

Curation changes write to **`data/curation-edits.json`**, never to
`data/annotations.json`.

The rescue records the **sha256 of the 1.2 MB source** it was copied from,
verbatim, on the principle that "regenerating is not preserving". Editing it in
place would destroy the artifact that was rescued and make that checksum a lie.
An overlay also means one writer per file rather than two — which is what keeps
the naive read-modify-write correct, the same reasoning §E4 applies to comments.

Effective class = overlay value if present, else the rescue's, else `keep`.
Unknown cues default to **keep**, so a gap in the data never silently hides
content.

---

## The admin-only boundary — why it stays

Recording the reasoning so nobody widens it later without doing the work first
(both points are Edison's, and both are load-bearing):

- **Multi-writer clobbering.** Comments and the overlay are read-modify-write on
  a single blob with no etag or lease. Safe with one writer; with two, a
  simultaneous write loses one silently. **Widening to attendees is not a
  permissions change** — it needs per-comment blobs or `If-Match` first.
- **Attribution.** The gate is a *courtesy* gate; it does not prove an address
  belongs to whoever typed it. Fine for watching video, not fine for words
  published under a named attendee's name, because misattribution harms a third
  party. **Widening requires the magic-link upgrade first.**

Comments anchor to a recording and optionally to a moment. The moment is stored
as **seconds** as well as a cue index, because cue numbering would shift if a
transcript were ever re-generated but a timestamp still points at the same
instant — so E3 can land on the moment.

---

## Verified — observed on live Azure

**Boundary suite — 26/26**

| Check | Result |
|---|---|
| Attendee sees no owner banner and no toggles | ✅ |
| Attendee comment write → 403 · curation write → 403 | ✅ |
| Wrong admin password → 403, **no cookie set** | ✅ |
| Correct password → 200 + `HttpOnly` cookie | ✅ |
| **Admin cookie alone → the gate, no content** (gate untouched) | ✅ |
| Viewer + admin → owner banner and toggles | ✅ |
| Admin adds a comment; it stores its moment and its day | ✅ |
| **Attendee can read the comment on the page** | ✅ |
| `canEdit` false for viewer, true for admin | ✅ |
| Unknown recording → 404 · invalid class → 400 | ✅ |
| Test comment removed; allowlist restored | ✅ |

**Curation wiring — 10/10**

| Check | Result |
|---|---|
| Rescue parsed; not malformed | ✅ |
| Per-recording tally: `{keep 199, chatter 128, dropped 0}` on a 327-line recording | ✅ |
| **Attendee gets 199 lines where admin gets 327** — filtered server-side | ✅ |
| Attendee receives only `keep` lines | ✅ |
| Admin records a drop → overlay wins over the rescue | ✅ |
| Dropped line disappears for attendees; revert restores it | ✅ |

Curation is filtered **on the server**, not hidden with CSS: "curated" should
mean the chatter was not sent, not that it is one devtools click away.

### The malformed-shape guard earned its place
I had guessed `recordings` would be an object keyed by blob. Franklin's actual
rescue is an **array** of recordings each holding a `segments` array. Because the
reader treats an unrecognised shape as *absent and reported* rather than
guessing, the first run refused cleanly with "does not match the expected shape"
instead of silently hiding nothing — or worse, hiding the wrong things. I then
read the real file and adapted to it.

---

## Test data — cleaned up

Synthetic addresses at `example.com` (RFC-2606 reserved). Final state verified
directly after the runs:

- `data/comments.json` — **0 comments**
- `data/curation-edits.json` — **`edits: {}`**, empty
- `data/annotations.json` — **untouched**, 13,456 segments / 3,161 keep, provenance sha256 intact
- allowlist — restored to baseline

`data/curation-edits.json` now exists where it did not before. That is intended:
it is the overlay this code owns, and an empty overlay is its correct resting
state.

---

## NOT verified

1. **No browser pass.** Same gap as Phase D: the toggles, the per-line
   re-classification buttons and the comment box have not been clicked by a
   person. Everything above is HTTP-level.
2. **Only 30 July** was exercised for curation.
3. **Nothing is deployed.**

## Out of scope, untouched

- **E3 (search)** — not started, per instruction. E2/E4 are shaped for it:
  comments carry `date`, `recording` and `t`, and curation class is available
  per line, so an index can skip chatter without re-deriving it.
- **E1** — Franklin's.
- The gate, `azure-json-storage.js`, `festival-media.js` and the mint route.
- No comment box for attendees exists, by design.

— Charlotte, Menlo floor, 2026-08-06

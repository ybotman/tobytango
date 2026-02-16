# People Queue Workflow

## Command: `/people-queue`

Autonomous processing of tango personality profiles from the research queue.

---

## Quick Start

```
User: /people-queue
Sage: [Reads queue, shows status, starts processing automatically]
```

To stop: Say "stop", "pause", or "handoff"

---

## How It Works

### The Queue
`/docs/queues/people-queue.json` tracks all people to profile:

```json
{
  "slug": "carlos-gavito",
  "displayName": "Carlos Gavito",
  "type": "dancer",
  "status": "prompt_ready",  // ← ready to process
  "priority": 6,
  "notes": "Stage pioneer, Tango Argentino show"
}
```

**Status values:**
- `pending` — Added but not ready
- `prompt_ready` — Ready to process
- `in_progress` — Currently being researched (rare, for crash recovery)
- `completed` — Profile published
- `blocked` — Needs human input

### Per-Person Flow (~5 min each)

1. **Research** — Web search for bio, career, quotes, videos
2. **Write** — Create `/public/tango-papers/people/{slug}.md`
3. **Index** — Add to `master-index.json`
4. **Data** — Update `peopleData.js` status → `published`
5. **Queue** — Mark `completed` in queue
6. **Build** — Verify `npm run build` passes
7. **Next** — Proceed to next `prompt_ready` item

### Output Per Person

```
## {Name} - COMPLETED
Profile: /public/tango-papers/people/{slug}.md
Key facts: [table]
Files updated: [list]
→ Processing next: {next name}
```

---

## Restarting

### After Session Break
```
User: /people-queue
Sage: [Reads queue, finds first non-completed, continues]
```

### After Crash
Queue state is persistent. Just run `/people-queue` again.

### Check Status Without Processing
```
User: /people-queue status
Sage: [Shows queue stats, doesn't start processing]
```

---

## Adding People to Queue

Edit `/docs/queues/people-queue.json` directly or ask Sage:

```
User: Add to people queue: Rodolfo Dinzel (dancer, teacher, Naveira's first teacher)
Sage: [Adds entry with status: pending]
```

### Required Fields
```json
{
  "slug": "rodolfo-dinzel",
  "displayName": "Rodolfo Dinzel",
  "type": "dancer",           // dancer|musician|singer|composer|teacher|organizer
  "status": "prompt_ready",
  "priority": 99,             // lower = higher priority
  "notes": "Context for research",
  "addedDate": "2026-02-16"
}
```

---

## Coexistence Rules

This workflow shares the repo with other Claude Code instances (site management, etc.)

### Files I Own (other Claudes avoid)
- `/docs/queues/people-queue.json`
- `/public/tango-papers/people/*.md`
- `/src/app/data/peopleData.js` (people entries only)

### Shared Files (coordinate access)
- `/public/tango-papers/index/master-index.json` — I add person entries
- `npm run build` — Don't run simultaneously

### Safe Coexistence
- I stay in my lane (people profiles)
- Other Claude handles: timeline data, era papers, site features
- Avoid simultaneous edits to shared files
- If conflict: I yield, re-read, retry

---

## Estimates

| Queue Size | Time (5 min/person) |
|------------|---------------------|
| 10 | ~50 min |
| 30 | ~2.5 hours |
| 100 | ~8 hours |
| 200 | ~16 hours |

Sessions break naturally. Queue persists. Resume anytime.

---

## Troubleshooting

### Build Fails
- Check for JSON syntax errors in master-index.json
- Check for JS syntax errors in peopleData.js
- Fix and retry

### Duplicate Index Entry
- Search master-index.json for existing entry
- Update instead of add

### Research Finds Conflicting Info
- Note in HITM Review Flags section
- Use most authoritative source
- Flag for human review

---

## File Locations

| Purpose | Path |
|---------|------|
| Queue | `/docs/queues/people-queue.json` |
| Profiles | `/public/tango-papers/people/{slug}.md` |
| People data | `/src/app/data/peopleData.js` |
| Master index | `/public/tango-papers/index/master-index.json` |
| This doc | `/docs/workflows/people-queue-workflow.md` |

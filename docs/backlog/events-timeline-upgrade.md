# Feature: Events Timeline Upgrade

**Status:** Placeholder / Needs Work
**Priority:** High (events are disconnected from upper timeline)
**Created:** 2026-02-13

---

## Current Problems

1. **Dual Data Sources**: Events defined in TWO places:
   - `tangoTimelineData.js` (events category)
   - `page.js` (timelineEvents object for TimelineJS)
   - These should be unified

2. **Event-Era Linking Broken**: TimelineJS events should highlight corresponding eras but connection may be inconsistent

3. **No Zoom**: Timeline is fixed scale (4px per year) — can't zoom in/out

4. **Missing Events**: Based on Decadencia paper and other content

---

## Missing Events to Add

### From Decadencia Paper
| Date | Event | Type |
|------|-------|------|
| 1956-03-05 | Decree 4161/56 — Peronist symbols banned | Political |
| 1960-01-12 | Di Sarli dies (age 57) | Death |
| 1967 | "La Balsa" — Rock Nacional begins | Cultural |
| 1974-05 | Piazzolla records "Libertango" (Milan) | Music |
| 1975-05-18 | Troilo dies (age 60) | Death |
| 1976-01-14 | D'Arienzo dies (age 75) | Death |
| 1980 | Finito returns to dancing after 26 years | Cultural |
| 1985-12-26 | Pugliese at Teatro Colón (finally!) | Show |

### Other Missing Events
| Date | Event | Type |
|------|-------|------|
| 1992-07-04 | Piazzolla dies | Death |
| 2004 | Osvaldo & Coca Cartery win Mundial | Cultural |
| 2015-10-09 | Osvaldo Cartery dies | Death |
| 2018-11-21 | Roberto Segarra dies (age 98) | Death |
| 2021-01-16 | Juan Carlos Copes dies | Death |

### Guardia Vieja/Nueva Events (when papers arrive)
| Date | Event | Type |
|------|-------|------|
| 1917 | La Cumparsita composed (Montevideo) | Music |
| 1924 | Julio De Caro revolutionizes orchestration | Music |

---

## Technical Changes Needed

### 1. Unify Event Data

Move events to `tangoTimelineData.js` and generate TimelineJS format from it:

```javascript
// In tangoTimelineData.js events category, add:
{
  id: "di-sarli-death",
  title: "Di Sarli Dies",
  date: "1960-01-12",  // ISO format
  yearStart: 1960,
  yearEnd: 1960,
  summary: ["Carlos Di Sarli dies at 57", "Last recordings 1958"],
  eventType: "death",
  relatedEras: ["epoca-de-oro", "decadencia"],  // NEW: links to eras
  relatedPeople: ["carlos-di-sarli"]  // NEW: links to index
}
```

Then in `page.js`:
```javascript
// Generate TimelineJS events from tangoTimelineData
const timelineEvents = {
  title: {...},
  events: timelineCategories.find(c => c.categoryId === 'events')
    .eras.map(era => ({
      start_date: parseDate(era.date || era.yearStart),
      text: { headline: era.title, text: era.summary[0] },
      group: era.eventType
    }))
};
```

### 2. Fix Event-Era Highlighting

The `findErasForYear()` function exists but may need:
- Use `relatedEras` field for explicit linking
- Highlight multiple categories when event spans them

### 3. Add Zoom Controls

Option A: **CSS Transform Zoom**
```javascript
const [zoomLevel, setZoomLevel] = useState(1);
const PIXELS_PER_YEAR = 4 * zoomLevel;

// Add zoom controls
<ButtonGroup>
  <Button onClick={() => setZoomLevel(z => Math.max(0.5, z - 0.25))}>-</Button>
  <Button onClick={() => setZoomLevel(1)}>Reset</Button>
  <Button onClick={() => setZoomLevel(z => Math.min(3, z + 0.25))}>+</Button>
</ButtonGroup>
```

Option B: **Replace TimelineJS with Custom Component**
- More control over zoom/pan
- Better mobile support
- Can integrate with era bands directly

Option C: **TimelineJS Zoom Options**
```javascript
new window.TL.Timeline('timeline-embed', timelineEvents, {
  zoom_sequence: [0.5, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89],
  initial_zoom: 2,  // Start more zoomed in
  // User can zoom with scroll wheel
});
```

---

## Recommended Approach

### Phase 1: Data Unification
1. Add missing events to `tangoTimelineData.js`
2. Add `relatedEras` and `relatedPeople` fields
3. Generate TimelineJS data from single source

### Phase 2: Event-Era Linking
1. Use `relatedEras` for explicit connections
2. Improve visual highlighting
3. Click event → scroll to era

### Phase 3: Zoom
1. Start with TimelineJS zoom options
2. Add +/- buttons for era bands section
3. Consider custom timeline component if needed

---

## Index-Driven Approach (User Suggestion)

Instead of duplicating event data, events could be:
1. **Stored in master-index.json** as type: "event"
2. **Referenced by ID** in timeline data
3. **Rendered from index** with full cross-references

```json
// In master-index.json
{
  "id": "di-sarli-death",
  "type": "event",
  "displayName": "Di Sarli Dies",
  "date": "1960-01-12",
  "eventType": "death",
  "categories": ["orchestras", "argentina"],
  "eras": ["epoca-de-oro"],
  "relatedPeople": ["carlos-di-sarli"],
  "summary": "Carlos Di Sarli dies at 57 in Olivos",
  "appearsIn": ["/tango-papers/argentina/decadencia.md"]
}
```

This would make events searchable, cross-referenceable, and consistent with the rest of the index system.

---

## Next Steps

1. [ ] Decide: Keep TimelineJS or build custom?
2. [ ] Add missing events to tangoTimelineData.js
3. [ ] Add `relatedEras` field to events
4. [ ] Test event-era highlighting
5. [ ] Add zoom controls
6. [ ] Consider index-driven approach for Phase 2

---

## Era Background Bands (User Request)

Add subtle colored background bands showing Argentina's major periods behind ALL columns:

```
| Year | Argentina | Orchestras | Dancers | Europe | USA |
|------|-----------|------------|---------|--------|-----|
| 1880 |███████████████████████████████████████████████████| ← Guardia Vieja (light blue)
| ...  |███████████████████████████████████████████████████|
| 1920 |███████████████████████████████████████████████████| ← Guardia Nueva (light green)
| ...  |███████████████████████████████████████████████████|
| 1935 |███████████████████████████████████████████████████| ← Época de Oro (GOLD!)
| ...  |███████████████████████████████████████████████████|
| 1955 |███████████████████████████████████████████████████| ← Decadencia (gray/dark)
| ...  |███████████████████████████████████████████████████|
| 1983 |███████████████████████████████████████████████████| ← Renacimiento (light pink)
| ...  |███████████████████████████████████████████████████|
```

### Implementation

```javascript
// Define era background bands (from Argentina category)
const eraBackgrounds = [
  { yearStart: 1880, yearEnd: 1920, color: 'rgba(33, 150, 243, 0.08)', label: 'Guardia Vieja' },
  { yearStart: 1920, yearEnd: 1935, color: 'rgba(76, 175, 80, 0.08)', label: 'Guardia Nueva' },
  { yearStart: 1935, yearEnd: 1955, color: 'rgba(255, 193, 7, 0.15)', label: 'Época de Oro' },  // Gold!
  { yearStart: 1955, yearEnd: 1983, color: 'rgba(0, 0, 0, 0.08)', label: 'Decadencia' },
  { yearStart: 1983, yearEnd: 1995, color: 'rgba(233, 30, 99, 0.08)', label: 'Renacimiento' },
  { yearStart: 1995, yearEnd: 2030, color: 'rgba(156, 39, 176, 0.05)', label: 'Contemporary' },
];

// Render behind all columns
{eraBackgrounds.map(era => (
  <Box
    key={era.label}
    sx={{
      position: 'absolute',
      top: getYearPosition(era.yearStart),
      height: (era.yearEnd - era.yearStart) * PIXELS_PER_YEAR,
      left: 0,
      right: 0,
      bgcolor: era.color,
      zIndex: 0,
      pointerEvents: 'none',
    }}
  />
))}
```

### Visual Effect
- Subtle wash of color behind entire timeline
- Época de Oro should be noticeably golden
- Decadencia should be gray/muted
- Labels could appear in year column margin

---

*This is a structural upgrade that will make the timeline more useful and maintainable. The current dual-data-source approach is fragile.*

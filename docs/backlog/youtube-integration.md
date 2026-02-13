# Feature: YouTube Integration for Tango Timeline

**Status:** Placeholder / Future Enhancement
**Priority:** Medium-High (rich media significantly enhances understanding)
**Created:** 2026-02-13

---

## Vision

Integrate YouTube videos throughout the timeline to bring history to life:
- **Orchestras**: Audio/video samples of each orchestra's signature sound
- **Dancers**: Video clips of Guardian Generation dancers
- **Events**: Historical footage, interviews, documentaries
- **Timeline**: Embedded videos at key moments

---

## Content Ideas

### Orchestras — Signature Recordings
| Orchestra | Suggested Video/Audio |
|-----------|----------------------|
| D'Arienzo | "La Cumparsita" (any era) — the compás |
| Di Sarli | Instrumental walking music |
| Troilo | With Fiorentino or Goyeneche |
| Pugliese | "La Yumba" — the dramatic pause |
| Biagi | Staccato piano style |
| Tanturi/Castillo | "Así se Baila el Tango" |

### Historical Moments
| Event | Video |
|-------|-------|
| **Troilo hears of Gardel's death** | Interview/documentary clip — emotional reaction |
| **Tango Argentino Paris 1983** | Any footage from the show |
| **Virulazo dancing** | The 278-pound man who "floated" |
| **Tete & Silvia** | Vals footage |
| **Finito** | Any surviving footage (rare) |
| **Pepito Avellaneda** | Milonga footage |

### Interviews / Documentaries
- Rick McGarrey's tangoandchaos.org video archive
- BBC documentary at Confitería Ideal
- Pina Bausch with Tete footage
- "The Tango Lesson" clips (Pablo Verón)
- Gustavo Naveira on "investigation"

### Guardian Generation Footage
Priority: Document what exists before it disappears
- Finito (any footage is precious — he died 1987)
- Tete Rusconi (well documented)
- Pepito Avellaneda
- Ricardo Vidort
- Pupi Castello
- Carlos & Rosa
- Osvaldo & Coca Cartery (2004 Mundial)

---

## Technical Implementation Options

### Option 1: Simple Embed Links
- Add `youtubeId` field to index entries
- Add `videos: []` array to era data
- Render as embedded iframe or link

### Option 2: YouTube API Integration
- Search for related videos dynamically
- Curated playlists per era/orchestra
- Requires API key management

### Option 3: Video Gallery Component
- Dedicated `/tango-history/videos` page
- Organized by category/era
- Thumbnail grid with lightbox playback

### Recommended: Start with Option 1
```javascript
// In tangoTimelineData.js
{
  id: "epoca-de-oro",
  // ... existing fields ...
  videos: [
    {
      title: "D'Arienzo - La Cumparsita (1951)",
      youtubeId: "XXXXX",
      type: "audio"
    },
    {
      title: "Troilo reacts to Gardel's death",
      youtubeId: "XXXXX",
      type: "interview"
    }
  ]
}

// In master-index.json
{
  "id": "juan-darienzo",
  // ... existing fields ...
  "youtubeId": "XXXXX",
  "youtubePlaylist": "PLAYLIST_ID"
}
```

---

## Data Structure Additions

### For Eras (tangoTimelineData.js)
```javascript
videos: [
  {
    title: string,
    youtubeId: string,
    type: "performance" | "interview" | "documentary" | "audio" | "teaching",
    description?: string,
    timestamp?: string  // e.g., "2:34" for specific moment
  }
]
```

### For Index Entries (master-index.json)
```json
{
  "youtubeId": "primary video ID",
  "youtubePlaylist": "playlist ID if exists",
  "videos": [
    { "title": "...", "youtubeId": "...", "type": "..." }
  ]
}
```

---

## Research Tasks

1. **Inventory existing footage** — What's on YouTube for each Guardian?
2. **Copyright considerations** — Which videos are official/safe to embed?
3. **Quality curation** — Prioritize good audio/video quality
4. **Timestamp key moments** — Link to specific timestamps for events

---

## UI/UX Considerations

- Don't auto-play (respect user bandwidth/attention)
- Thumbnail preview with play button
- Modal/lightbox for inline viewing
- Mobile-friendly responsive embeds
- Lazy-load videos (performance)

---

## Priority Videos to Find

### Must-Have (if they exist)
1. [ ] Troilo interview about Gardel's death
2. [ ] Any Finito footage
3. [ ] Tango Argentino 1983 Paris footage
4. [ ] Virulazo & Elvira dancing
5. [ ] Pugliese orchestra with red carnation visible

### Nice-to-Have
- [ ] Each Big Four orchestra sample
- [ ] Tete & Silvia vals
- [ ] Naveira/Salas Cochabamba sessions
- [ ] Carlos & Rosa teaching
- [ ] 2004 Mundial Cartery win

---

## Next Steps

1. Research LLM: Find YouTube IDs for priority videos
2. Add `videos` field to data structures
3. Create simple video embed component
4. Add to one era as proof of concept
5. Expand systematically

---

*This feature would transform the timeline from text-based reference to immersive multimedia experience. The Guardian Generation footage is especially urgent — much of it exists only in aging VHS transfers that may not survive.*

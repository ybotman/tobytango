# Batch Research Task: Contemporary Orchestras & Groups

You are a tango history researcher. Create comprehensive profiles for **contemporary tango orchestras** — the revival and post-revival groups playing today.

## Research Subjects

### Revival Era (1970s-1990s)
| Group | Founded | Key Note |
|-------|---------|----------|
| **Sexteto Mayor** | 1973 | Kept tango alive in Decadencia |
| **Sexteto Tango** | 1968 | Concurrent with Sexteto Mayor |

### Contemporary Era (1990s-Present)
| Group | Founded | Key Note |
|-------|---------|----------|
| **Orquesta Típica Fernández Fierro** | 2001 | Anarchist collective; intense performances |
| **Color Tango** | 1989 | Roberto Álvarez; traditionalist revival |
| **El Arranque** | 1996 | Ignacio Varchausky; orquesta escuela |
| **Sexteto Fantasma** | 2010s | Guido Iacopetti; contemporary reinvention |
| **Tango Bardo** | 2000s | German/Argentine collaboration? |
| **Orquesta Típica Andariega** | 2000s | Young musicians |
| **Orquesta Romantica Milonguera** | 2000s | For dancing |
| **Bandonegro** | 2014 | Polish orchestra |
| **Hyperion Ensemble** | 2000s | Nuevo repertoire |

---

## For Each Group, Provide:

### 1. Basic Data
```yaml
id: [slug]
displayName: [Name]
type: [orquesta|sexteto|ensemble]
founded: YYYY
disbanded: YYYY or "active"
baseCity: [City, Country]
currentStatus: [active|inactive|sporadic]
leaderOrFounder: [Name]
style: [Traditional|Nuevo|Fusion|etc.]
```

### 2. Musical Identity
- Sound characteristics
- Traditional vs. nuevo vs. fusion positioning
- Instrumentation (standard típica or variations?)
- Repertoire focus (Golden Age covers? originals? both?)
- For dancing or for listening?

### 3. Key Members
- Founders/leaders
- Notable musicians
- Rotating vs. stable lineup

### 4. Recordings & Albums
| Album | Year | Notable Tracks |
|-------|------|----------------|
| ... | ... | ... |

### 5. Performance History
- Major festivals/venues
- International touring
- Milonga performances (play for social dancing?)
- Notable collaborations

### 6. Cultural Significance
- Why do they matter?
- Innovation or preservation?
- Influence on other groups
- Critical reception

---

## Specific Research Questions

### Sexteto Mayor
- Founded during Decadencia — how did they survive?
- Original lineup vs. current
- Still active in 2025?
- Key recordings
- International touring history
- "Tango Argentino" (1983) involvement?

### Orquesta Típica Fernández Fierro
- "Anarchist collective" — explain governance structure
- Intense performances — describe what makes them different
- Still active?
- Albums and recordings
- Where do they play?
- Audience (tango dancers? concert goers?)

### Color Tango
- Roberto Álvarez leadership
- "Traditionalist revival" — what do they play?
- Active status in 2025?
- Key recordings
- Milonga performances

### El Arranque
- Ignacio Varchausky founding story
- "Orquesta Escuela" — training how many musicians?
- 300+ alumni claim — verify
- Current status
- Recordings and performances
- Connection to broader education mission

### Sexteto Fantasma
- Guido Iacopetti role
- "Contemporary reinvention" — what's new?
- Formation date (2010s?)
- Active status
- Key recordings/performances

### Bandonegro (Poland)
- Only non-Argentine group — significance
- Founding story
- Style and repertoire
- Touring history
- Reception in Argentina

---

## Contextual Essay

Write a 2,000-word essay: **"Tango Reborn: Contemporary Orchestras 1990-2025"**

Cover:
1. The Decadencia survivors (Sexteto Mayor)
2. First revival orchestras (1990s)
3. The training ground (Escuela, El Arranque)
4. Traditionalists vs. innovators
5. European and world orchestras
6. Playing for dancers vs. concerts
7. The future of tango music

---

## For Dancers

Include a practical section:

### Which orchestras play for milongas?
- Who plays regular milongas in Buenos Aires?
- Festival orchestras
- Studio/concert only?

### Recommended listening
- For each orchestra, 3-5 tracks that represent their sound
- YouTube/Spotify links if findable

---

## Output Format

### Individual Profiles

```markdown
## Orquesta Típica Fernández Fierro

**Founded:** 2001
**Status:** Active

**Summary:** Anarchist collective known for intense, theatrical performances; pushed tango into punk/alternative spaces.

### Sound & Style
[Description]

### Members
[Key musicians]

### Discography
| Album | Year | Notes |
|-------|------|-------|
| ... | ... | ... |

### Live Performances
[Where they play, what it's like]

### Cultural Impact
[Why they matter]

### HITM Flags
- [Uncertain facts]
```

### Structured Data

```json
{
  "entities": [
    {
      "id": "orquesta-tipica-fernandez-fierro",
      "type": "group",
      "displayName": "Orquesta Típica Fernández Fierro",
      "founded": "2001",
      "baseCity": "Buenos Aires",
      "currentStatus": "active",
      "style": "intense-alternative",
      "categories": ["orchestras", "contemporary", "revival"],
      "summary": "Anarchist collective; intense performances; punk-tango",
      "paperPath": "/tango-papers/orchestras/otff.md"
    }
  ]
}
```

---

## Cross-References

Connect to:
- Revival Era paper
- Post-Golden Orchestras prompt (already created)
- Ignacio Varchausky person profile
- Contemporary Voices section

---

**END OF PROMPT**

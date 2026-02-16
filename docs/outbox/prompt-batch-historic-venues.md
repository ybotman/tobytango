# Batch Research Task: Historic Tango Venues (Pre-1950)

You are a tango history researcher. Create comprehensive profiles for the **historic venues** where tango was born and developed — from the conventillos to the golden age cabarets.

## Research Subjects

### Origins Era (1880s-1910s)
| Venue | Type | Key Note |
|-------|------|----------|
| **Lo de Hansen** | Cabaret/café | Famous early tango locale |
| **Palais de Glace** | Dance hall | Upper-class venue |
| **El Armenonville** | Restaurant | Elegant venue in Palermo |
| **Royal Pigall** | Cabaret | Early tango performances |
| **Café de los Angelitos** | Café | Historic café-concert |
| **Café Tortoni** | Café | Still exists; tango connection |
| **Conventillo del Medio Mundo** | Conventillo | Origins setting |

### Golden Age Cabarets (1920s-1950s)
| Venue | Type | Key Note |
|-------|------|----------|
| **Cabaret Chantecler** | Cabaret | Premier tango cabaret |
| **Marabú Cabaret** | Cabaret | Famous nightclub |
| **Magic-City** | Dance hall | Large-scale milonga |

### Media Venues
| Venue | Type | Key Note |
|-------|------|----------|
| **Radio El Mundo** | Radio station | Major tango broadcasts |

---

## For Each Venue, Provide:

### 1. Basic Data
```yaml
id: [slug]
displayName: [Name]
type: [cabaret|café|conventillo|dance-hall|radio]
address: [Historical address if known]
barrio: [Neighborhood]
opened: YYYY or "circa"
closed: YYYY or "still exists"
currentStatus: [demolished|converted|historic-site|operating]
```

### 2. Historical Significance
- When was it important for tango?
- What kind of tango happened there? (Dancing? Performances? Both?)
- Who performed there?
- Who danced there? (What social class?)
- Notable events or stories

### 3. Physical Description
- What did it look like?
- How big? How many people?
- What was the neighborhood like?

### 4. Famous Associations
- Musicians who played there
- Dancers who frequented
- Historical events
- Films or documentaries featuring the venue

### 5. Current Status
- Does it still exist?
- What's there now?
- Can you visit?
- Heritage recognition?

---

## Specific Research Questions

### Lo de Hansen
- Where exactly was it? (Palermo area?)
- "Lo de" — meaning (Hansen's place)
- When did tango happen there?
- Who owned it?
- When did it close?
- Why was it significant?

### Palais de Glace
- Originally an ice skating rink?
- Conversion to dance hall — when?
- Social class of patrons
- Current status (cultural center?)
- Tango events there now?

### El Armenonville
- Named after French restaurant?
- Location (Palermo?)
- Period of operation
- Notable performers
- Current status

### Conventillo del Medio Mundo
- "Conventillo" — explain the housing type
- "Medio Mundo" — why this name?
- Where was it?
- Connection to tango origins
- Afro-Argentine presence
- Current status

### Cabaret Chantecler
- Address (Paraná?)
- Peak years
- Notable performers
- Interior description
- Current status

### Radio El Mundo
- Address
- When did tango broadcasts start?
- Which orchestras broadcast from there?
- Archives of broadcasts?
- Current status of building

### Café Tortoni
- Still operating — location
- Historical tango connection
- Current tango events
- Tourist vs. authentic?

---

## Contextual Essay

Write a 2,500-word essay: **"The Spaces of Tango: Where the Music Lived"**

Cover:
1. Conventillos and the birth of tango
2. The café-concert culture
3. "Lo de..." venues — the early cabarets
4. Golden Age cabarets — the high life
5. Radio and the democratization of tango
6. The decline of venues (1950s-1980s)
7. What survives today?

---

## Mapping Project

Include geographic information:
- Neighborhood maps of tango venues by era
- Concentration of venues (San Telmo, La Boca, Palermo, Centro)
- How the geography of tango shifted over time

---

## Output Format

### Individual Profiles

```markdown
## Cabaret Chantecler

**Type:** Cabaret
**Location:** Paraná 449, Buenos Aires (verify)
**Period:** 1920s-1950s

**Summary:** Premier tango cabaret of the Golden Age; where orchestras played for the elegant night life.

### History
[Timeline and significance]

### Physical Space
[Description]

### Notable Performers
[Who played/danced there]

### Stories
[Famous events or anecdotes]

### Current Status
[What's there now]

### HITM Flags
- [Uncertain facts]
```

### Structured Data

```json
{
  "entities": [
    {
      "id": "cabaret-chantecler",
      "type": "venue",
      "displayName": "Cabaret Chantecler",
      "venueType": "cabaret",
      "address": "Paraná 449",
      "barrio": "Centro",
      "opened": "1920",
      "closed": "1950s",
      "currentStatus": "demolished",
      "categories": ["venues", "golden-age"],
      "summary": "Premier tango cabaret of the Golden Age",
      "paperPath": "/tango-papers/venues/chantecler.md"
    }
  ]
}
```

---

## Cross-References

Connect to:
- Era papers (Guardia Vieja, Golden Age)
- Orchestra papers (who played where)
- Conventillo paper (origins)
- Buenos Aires tango map

---

**END OF PROMPT**

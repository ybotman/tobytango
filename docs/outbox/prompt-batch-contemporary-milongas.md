# Batch Research Task: Contemporary Milongas (Buenos Aires)

You are a tango history researcher. Create comprehensive profiles for the **contemporary milongas** of Buenos Aires — the venues where tango is danced today.

## Research Subjects

### Historic Clubs (Established Pre-1990)
| Venue | Type | Key Note |
|-------|------|----------|
| **Club Sin Rumbo** | Club social | Villa Urquiza; traditional |
| **Club Sunderland** | Club social | Villa Urquiza; guardian milongueros |
| **Club Gricel** | Club social | Historic ballroom |
| **Confitería Ideal** | Confitería | Historic downtown; tourists |

### Established Milongas (1990s-2000s)
| Venue | Type | Key Note |
|-------|------|----------|
| **El Beso** | Milonga salon | Small, intimate; traditional codes |
| **Lo de Celia** | Milonga | Authentic neighborhood feel |
| **Salón Canning** | Salon | Large; Parakultural |
| **La Viruta** | Cultural center | Young crowd; all hours |
| **Niño Bien** | Milonga | Traditional codes |
| **Porteño y Bailarín** | Milonga | Traditional |
| **La Baldosa** | Milonga | Friendly neighborhood |

### Nuevo Era Venues
| Venue | Type | Key Note |
|-------|------|----------|
| **Cochabamba 444** | Práctica | Investigation headquarters |
| **La Catedral** | Alternative | Warehouse space; nuevo |
| **Practica X** | Práctica | Nuevo/experimental |
| **Trottoirs de Buenos Aires** | Milonga | Nuevo era venue |

---

## For Each Venue, Provide:

### 1. Basic Data
```yaml
id: [slug]
displayName: [Name]
type: [club-social|milonga|practica|confiteria]
address: [Current address]
barrio: [Neighborhood]
founded: YYYY (as tango venue)
currentStatus: [active|closed|irregular]
schedule: [Days/times of operation]
```

### 2. Identity & Atmosphere
- What's the vibe?
- Age/style of dancers
- Dress code
- Códigos (traditional or relaxed?)
- Music (traditional tandas? nuevo? mixed?)
- Size and floor quality

### 3. History
- When did tango start there?
- Key figures associated with the venue
- Evolution over time
- Any ownership changes?

### 4. Practical Information (2025)
- Current operating schedule
- Entry fee range
- How to find it
- Tips for visitors

### 5. Cultural Significance
- Why is this venue important?
- Unique characteristics
- Who dances there? (Locals? Tourists? Mix?)

---

## Specific Research Questions

### Club Sin Rumbo & Club Sunderland
- Villa Urquiza style connection
- Guardian milongueros who danced there
- Current status (still traditional?)
- Differences between the two clubs

### Confitería Ideal
- Historic building details
- When did tango return there?
- Tourist vs. local ratio
- Current financial situation
- Restoration status

### El Beso
- Why is it considered traditional?
- Códigos enforced?
- Capacity (small intimate space)
- Who runs it?

### Salón Canning / Parakultural
- History of Parakultural nights
- Omar Viola connection
- Size of the space
- Traditional vs. nuevo balance

### La Viruta
- Armenian Cultural Center story
- All-night milongas
- Young crowd
- Teaching programs

### Cochabamba 444
- Investigation Group headquarters (1987-1997)
- Naveira/Salas prácticas
- Current status (still operating?)
- Historical importance vs. current

### La Catedral
- "Warehouse space" — describe
- Nuevo/alternative scene
- Current status
- Music policy

---

## Contextual Essay

Write a 2,000-word essay: **"Where Buenos Aires Dances: A Guide to the Milongas"**

Cover:
1. Traditional club sociales (Villa Urquiza, etc.)
2. Downtown milongas (El Beso, Confitería Ideal)
3. The Parakultural revolution (1990s)
4. Nuevo spaces (La Catedral, Cochabamba)
5. The tourist question
6. COVID impact and recovery
7. How to choose where to dance

---

## For Visitors

Include practical guidance:

### By Style Preference
- **Traditional/milonguero**: El Beso, Niño Bien, Sin Rumbo
- **Nuevo-friendly**: La Catedral, Viruta
- **Tourist-accessible**: Confitería Ideal, Salón Canning

### By Experience Level
- Beginners: Where is welcoming?
- Intermediate: Where to challenge yourself?
- Advanced: Where to dance with the best?

### By Night of Week
- Monday: [Options]
- Tuesday: [Options]
- etc.

---

## Output Format

### Individual Profiles

```markdown
## El Beso

**Type:** Milonga salon
**Address:** [Address]
**Barrio:** Centro
**Schedule:** [Days/times]

**Summary:** Small, intimate milonga known for strict códigos and high-level traditional dancing.

### Atmosphere
[Description]

### History
[When it started, key figures]

### Códigos
[Rules enforced]

### Visitor Tips
[Practical advice]

### HITM Flags
- [Uncertain facts]
```

### Structured Data

```json
{
  "entities": [
    {
      "id": "el-beso",
      "type": "venue",
      "displayName": "El Beso",
      "venueType": "milonga",
      "address": "Riobamba 416",
      "barrio": "Centro",
      "currentStatus": "active",
      "style": "traditional",
      "categories": ["venues", "milongas", "contemporary"],
      "summary": "Small, intimate; strict códigos; high-level traditional",
      "paperPath": "/tango-papers/venues/el-beso.md"
    }
  ]
}
```

---

## Cross-References

Connect to:
- Guardian generation dancers (where they danced)
- Nuevo Innovators (Cochabamba, Practica X)
- Buenos Aires tango map
- Visitor guide content

---

## Research Challenge

Note: Milonga information changes rapidly. Current status (2025) should be flagged as HITM when uncertain.

---

**END OF PROMPT**

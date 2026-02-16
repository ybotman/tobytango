# Batch Research Task: Legendary Dance Couples

You are a tango history researcher. Create comprehensive profiles for the **legendary dance partnerships** of tango history.

## Research Subjects

| Couple | Era | Key Note |
|--------|-----|----------|
| **Juan Carlos Copes & María Nieves** | 1950s-2000s | 50-year partnership; Tango Argentino |
| **Gloria & Rodolfo Dinzel** | 1970s-2000s | Pedagogy; methodology |
| **Carlos Pérez & Rosa Forte** | 1990s-present | Milonguero style ambassadors |
| **Osvaldo & Coca Cartery** | 1980s-2000s | Bridge generation |
| **Pocho & Nelly Carreras** | 1980s-2000s | Traditional style |
| **Sebastián Arce & Mariana Montes** | 2000s-present | Champion performers |
| **Vernon & Irene Castle** | 1910s | American sanitization (covered in American batch) |
| **Homer & Cristina Ladas** | 2000s-present | YouTube educators (covered in US batch) |

Note: Vernon/Irene Castle and Homer/Cristina Ladas are covered in other batch prompts. Focus on the Argentine couples here.

---

## For Each Couple, Provide:

### 1. Basic Data
```yaml
id: [couple-slug]
displayName: [Names as commonly known]
person1:
  name: [Full name]
  born: YYYY
  role: [leader|follower]
person2:
  name: [Full name]
  born: YYYY
  role: [leader|follower]
partnershipStart: YYYY
partnershipEnd: YYYY or "ongoing"
relationship: [romantic|professional|both]
```

### 2. Partnership Story
- How did they meet?
- When did they start dancing together?
- Romantic relationship or purely professional?
- How did the partnership evolve?
- Did it end? Why?

### 3. Dance Style
- What style did they dance/teach?
- What made them distinctive as a couple?
- Signature performances or moves?
- How did they influence each other?

### 4. Career Highlights
- Major performances
- Teaching history
- International impact
- Awards or recognition

### 5. Individual Contributions
- What did each partner bring?
- Solo careers (before/after partnership)
- Teaching specialties

### 6. Legacy
- Influence on tango couples
- Students
- Ongoing impact

---

## Specific Research Questions

### Juan Carlos Copes & María Nieves
- 50-year partnership — exact timeline
- How did they meet? (Story of young Copes seeing Nieves dance)
- Tango Argentino (1983) involvement
- Broadway Tony nomination
- Personal relationship (married? separated?)
- The split — when and why?
- María Nieves as "living legend" — still teaching?
- Copes's death?

### Gloria & Rodolfo Dinzel
- "Pedagogy; methodology" — what did they develop?
- Books or teaching materials
- School/academy
- Influence on tango education
- Current status (both still active?)

### Carlos Pérez & Rosa Forte
- "Milonguero style ambassadors" — explain
- Based where?
- Teaching circuit
- Style description
- Current status

### Osvaldo & Coca Cartery
- Generation — who taught them?
- Style
- Teaching career
- International travel
- Current status

### Pocho & Nelly Carreras
- Traditional style — describe
- Period of activity
- Teaching approach
- Current status

### Sebastián Arce & Mariana Montes
- Championship history
- Performance style
- Teaching career
- Partnership status (still together?)
- Influence on contemporary scene

---

## Contextual Essay

Write a 1,500-word essay: **"Dancing Together: The Art of Tango Partnership"**

Cover:
1. What makes a great tango couple?
2. Professional vs. romantic partnerships
3. The 50-year model (Copes/Nieves) vs. short partnerships
4. How couples influence each other's style
5. Teaching as a couple
6. The challenges of partnership
7. Famous breakups and their impact

---

## Partnership Dynamics

For each couple, analyze:
- Lead/follow dynamics (traditional? shared?)
- Musical interpretation as a unit
- Communication style (visible? invisible?)
- Stage vs. social dancing

---

## Output Format

### Individual Profiles

```markdown
## Juan Carlos Copes & María Nieves

**Partnership:** 1957-2007 (50 years)
**Style:** Stage/show tango

**Summary:** Tango's most famous partnership; defined stage tango for international audiences; Tango Argentino stars.

### The Partnership Story
[How they met and evolved]

### Dance Style
[What made them distinctive]

### Career Highlights
- Tango Argentino (1983)
- Broadway appearances
- Tony nomination
- World tours

### The Split
[How and why it ended]

### Individual Legacies
- **Copes:** [His contributions]
- **Nieves:** [Her ongoing work]

### HITM Flags
- [Uncertain facts]
```

### Structured Data

```json
{
  "entities": [
    {
      "id": "copes-nieves",
      "type": "couple",
      "displayName": "Juan Carlos Copes & María Nieves",
      "person1": "juan-carlos-copes",
      "person2": "maria-nieves",
      "partnershipYears": "1957-2007",
      "style": "stage",
      "categories": ["couples", "stage-tango", "tango-argentino"],
      "summary": "50-year partnership; Tango Argentino stars",
      "paperPath": "/tango-papers/couples/copes-nieves.md"
    }
  ]
}
```

---

## Cross-References

Connect to:
- Stage Pioneers paper
- Tango Argentino show
- Individual person profiles for each partner
- Teaching lineage (who learned from each couple)

---

**END OF PROMPT**

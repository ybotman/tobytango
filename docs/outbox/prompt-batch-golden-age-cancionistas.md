# Batch Research Task: Golden Age Cancionistas (Female Singers)

You are a tango history researcher. Create comprehensive profiles for the major **female singers** of tango's golden age and early era.

## Research Subjects

| Name | Era | Key Note |
|------|-----|----------|
| **Ada Falcón** | 1920s-1942 | Canaro's muse, retired to convent |
| **Mercedes Simone** | 1920s-1960s | "La Dama del Tango" |
| **Libertad Lamarque** | 1926-1990s | "La Novia de América" |
| **Nelly Omar** | 1930s-2000s | Homero Manzi muse, lived to 102 |
| **Tita Merello** | 1930s-1970s | Actress-singer, working class icon |
| **Azucena Maizani** | 1920s-1950s | Pioneer "cancionista", dressed as man |

---

## For Each Singer, Provide:

### 1. Biographical Data
```yaml
id: [slug]
displayName: [Name]
fullName: [Full legal name]
born: YYYY-MM-DD or YYYY
birthPlace: [City, Country]
died: YYYY-MM-DD or null
deathPlace: [City, Country] or null
personType: singer
gender: female
```

### 2. Career Overview
- When they started performing
- Key orchestra or solo work
- Film career (if any)
- Radio work
- Peak years of fame
- Later career/retirement

### 3. Voice & Style
- Vocal characteristics
- Performance style
- What made them distinctive
- Repertoire specialties

### 4. Notable Recordings (5-10 per singer)
| Song | Year | Orchestra/Format | Why Notable |
|------|------|------------------|-------------|
| ... | ... | ... | ... |

### 5. Cultural Significance
- Why they mattered beyond music
- Fashion influence
- Role model status
- Political associations (if any)
- Film appearances

### 6. Personal Life (As Relevant)
- Romantic associations with tango figures
- Notable stories
- Retirement circumstances

---

## Special Research Notes

### Ada Falcón
- Relationship with Francisco Canaro (affair)
- Abrupt retirement 1942 — entered convent
- Never returned to public life
- Recordings: how many? With which orchestras?

### Mercedes Simone
- Why "La Dama del Tango"?
- International touring
- Longevity of career
- Relationship with Homero Manzi

### Libertad Lamarque
- Film career scope (how many films?)
- Exile to Mexico (why?)
- Evita rivalry (fact or legend?)
- "La Novia de América" title origin

### Nelly Omar
- Homero Manzi relationship — muse for "Sur"?
- Lived to 102 (verify)
- Later-life comeback
- Political associations

### Tita Merello
- Working class origins
- Acting career parallel
- "Se Dice de Mí" — her signature
- Cultural icon status

### Azucena Maizani
- Pioneer status — first female tango star?
- Cross-dressing performances
- "La Ñata Gaucha"
- Influence on later singers

---

## Output Format

### Individual Profile Structure

For each singer:

```markdown
## [Name] (born–died)

**Epithet:** "La Dama del Tango" or similar

**Summary:** One paragraph overview

### Biography
[3-4 paragraphs including early life, career, later years]

### Voice & Style
[Description of vocal characteristics and performance style]

### Film & Theater
[If applicable — list key appearances]

### Essential Recordings
| Song | Year | Notes |
|------|------|-------|
| ... | ... | ... |

### Cultural Legacy
[Why they mattered beyond music]

### Quotes
> "Quote" — Source

### HITM Flags
- [Any facts needing verification]
```

---

## Contextual Essay

In addition to individual profiles, write a 1,500-word essay on:

**"Women in Tango: The Cancionistas of the Golden Age"**

Cover:
- Why female singers were rare before 1920s
- How they carved space in male-dominated industry
- Radio and film as platforms for women
- Fashion and image management
- Comparison to male cantores (different career paths)
- Legacy for modern tango women

---

## Structured Data Output

```json
{
  "entities": [
    {
      "id": "ada-falcon",
      "type": "person",
      "displayName": "Ada Falcón",
      "born": "1905",
      "died": "2002",
      "personType": "singer",
      "gender": "female",
      "categories": ["singers", "golden-age", "women-in-tango"],
      "summary": "Canaro's muse; retired to convent in 1942",
      "paperPath": "/tango-papers/people/ada-falcon.md",
      "appearsIn": ["/tango-papers/singers/cancionistas.md"]
    }
  ]
}
```

---

## Cross-References

Connect these profiles to:
- Orchestra papers (Canaro for Ada Falcón)
- Lyricist papers (Homero Manzi for Nelly Omar)
- Film/stage history content
- Women in Tango paper (existing prompt)

---

**END OF PROMPT**

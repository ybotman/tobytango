# Batch Research Task: American Tango Figures (1910s-1940s)

You are a tango history researcher. Create comprehensive profiles for the **American figures** who shaped tango's transformation in the United States and Europe during the "Tangomania" era (1912-1920s) and beyond.

## Research Subjects

| Name | Role | Key Contribution |
|------|------|------------------|
| **Vernon Castle** | Dancer | With Irene, "sanitized" tango for American ballroom |
| **Irene Castle** | Dancer | Fashion icon; invented Castle Bob haircut |
| **Rudolph Valentino** | Actor | Four Horsemen tango scene (1921) |
| **Arthur Murray** | Entrepreneur | Franchise empire that industrialized ballroom tango |
| **Xavier Cugat** | Bandleader | Waldorf-Astoria (1933-1949); commercial Latin music |
| **James Reese Europe** | Bandleader | First to bring "authentic" tango to NYC society |

---

## For Each Person, Provide:

### 1. Biographical Data
```yaml
id: [slug]
displayName: [Name]
fullName: [Full legal name]
born: YYYY-MM-DD
birthPlace: [City, Country]
died: YYYY-MM-DD
deathPlace: [City, Country]
personType: [dancer|actor|bandleader|entrepreneur]
nationality: [American|British|etc.]
```

### 2. Pre-Tango Career
- What were they doing before tango?
- How did they encounter tango?
- Training or background

### 3. Tango Involvement
- When and how did they engage with tango?
- What style/version of tango?
- How did they transform or adapt it?
- Key performances/events

### 4. Impact on Tango
- How did they change how Americans/Europeans understood tango?
- Positive impacts (spreading awareness)
- Negative impacts (distortion, sanitization)
- Long-term legacy

---

## Specific Research Questions

### Vernon & Irene Castle
- Where did they learn tango?
- The "sanitization" — what did they change?
- Their books/instructional materials
- Castle Walk vs. Argentine tango — comparison
- Fashion influence beyond dance
- Vernon's death (WWI pilot?)
- Irene's later career

### Rudolph Valentino
- Four Horsemen of the Apocalypse (1921) — the tango scene
- Did he actually know how to tango?
- Who choreographed the scene?
- Impact on tango's image ("Latin lover")
- The gaucho costume
- Other tango appearances in his films?

### Arthur Murray
- When did he start teaching tango?
- How did Murray method differ from Argentine tango?
- Franchise system — scale and impact
- Standardization of ballroom tango
- Legacy studios (still exist?)
- Criticism from Argentine tango community

### Xavier Cugat
- Cuban-Spanish, not Argentine — significance?
- Waldorf-Astoria residency details
- What was his "tango"? (Show orchestra, not for dancing?)
- Recordings
- Hollywood appearances
- Relationship to actual tango

### James Reese Europe
- African-American bandleader — significance
- First to bring "authentic" tango claim — verify
- Which venues/society events?
- His orchestra
- WWI service and death
- Legacy

---

## Contextual Essay

Write a 2,500-word essay: **"Tangomania: How America Discovered (and Distorted) Tango"**

Cover:
1. The 1913 arrival — who brought tango to NYC?
2. The moral panic (church, newspapers)
3. The Castles' "civilizing" mission
4. Valentino and the silver screen
5. Murray's industrialization
6. How "ballroom tango" became a separate thing
7. Legacy for Argentine tango today

---

## The Transformation Question

A key research question: **What specifically was changed?**

Document the differences between:
- Original Argentine tango (as danced in Buenos Aires 1910)
- Castle-era American ballroom tango
- Murray method tango
- Modern International Ballroom Tango

Be specific about:
- Hold/embrace differences
- Footwork changes
- Music changes
- Clothing requirements
- Lead/follow dynamics

---

## Output Format

### Individual Profiles

```markdown
## Vernon & Irene Castle

**Era:** 1912-1918

**Summary:** The dance couple who made tango "respectable" for American society, transforming it in the process.

### Biography
[3-4 paragraphs]

### Tango Transformation
[What they changed and why]

### Legacy
[Long-term impact]

### Key Sources
[Books, films, photos]

### HITM Flags
- [Uncertain facts]
```

### Structured Data

```json
{
  "entities": [
    {
      "id": "vernon-castle",
      "type": "person",
      "displayName": "Vernon Castle",
      "born": "1887-05-02",
      "died": "1918-02-15",
      "personType": "dancer",
      "nationality": "British-American",
      "categories": ["dancers", "usa", "tangomania"],
      "summary": "With Irene, 'sanitized' tango for American ballroom",
      "paperPath": "/tango-papers/usa/tangomania.md"
    }
  ]
}
```

---

## Cross-References

Connect to:
- Tangomania era (1912-1914) paper
- Europe Tango Reception paper
- USA Tango History paper
- Ballroom Tango vs. Argentine Tango comparison

---

**END OF PROMPT**

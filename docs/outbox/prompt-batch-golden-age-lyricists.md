# Batch Research Task: Golden Age Lyricists & Poets

You are a tango history researcher. Create comprehensive profiles for the major **lyricists and poets** who gave tango its literary voice.

## Research Subjects

| Name | Era | Signature Works |
|------|-----|-----------------|
| **Homero Manzi** | 1930s-1950s | Sur, Barrio de Tango, Malena |
| **Enrique Santos Discépolo** | 1920s-1950s | Cambalache, Yira...Yira, Uno |
| **Celedonio Flores** | 1920s-1930s | Mano a Mano, Corrientes y Esmeralda |
| **Enrique Cadícamo** | 1920s-1990s | Anclao en París, Nostalgias |
| **Alfredo Le Pera** | 1930s | Gardel's film tangos — Volver, Por una Cabeza |

---

## For Each Lyricist, Provide:

### 1. Biographical Data
```yaml
id: [slug]
displayName: [Name]
fullName: [Full name]
born: YYYY-MM-DD
birthPlace: [City, Country]
died: YYYY-MM-DD
deathPlace: [City, Country]
personType: lyricist
otherRoles: [poet|journalist|politician|filmmaker|etc.]
```

### 2. Literary Background
- Education
- Non-tango writing (poetry, journalism, etc.)
- Literary influences
- Political involvement (especially for Manzi, Discépolo)

### 3. Tango Collaboration
- Primary composer partnerships
- Orchestra affiliations
- Singer interpreters
- How did they work? (music first? lyrics first?)

### 4. Signature Works (Full Analysis)

For their 5 most important tangos:
| Title | Composer | Year | Theme | Famous Recording |
|-------|----------|------|-------|------------------|
| ... | ... | ... | ... | ... |

Include:
- What the lyrics mean
- Why it resonated
- Notable lines (with translation)
- Which recordings are definitive

### 5. Literary Style
- Themes (nostalgia, betrayal, urban landscape, philosophy)
- Use of lunfardo (slang)
- Poetic techniques
- Evolution over career

### 6. Legacy
- Influence on later lyricists
- Scholarly recognition
- Which songs remain in milonga rotation
- Modern covers/interpretations

---

## Specific Research Questions

### Homero Manzi (1907-1951)
- "Scene-painter of Buenos Aires" — explain with examples
- Political involvement (Radical party, FORJA)
- Nelly Omar relationship — muse? affair?
- Why did he die young (44)?
- "Sur" — full story and analysis
- Film work — which films?

### Enrique Santos Discépolo (1901-1951)
- "Tango's existentialist philosopher" — explain
- "Cambalache" (1934) — banned under Perón? why?
- Peronist radio work — controversial?
- Depression and death — circumstances?
- Philosophy of despair in his lyrics

### Celedonio Flores (1896-1947)
- Former boxer — how did this shape him?
- Lunfardo saturation — examples
- "Mano a Mano" — the story (letter to an ex?)
- Working-class voice — contrast to others

### Enrique Cadícamo (1900-1999)
- Lived to 99 — remarkable longevity
- Symbolist poetry influences
- "Anclao en París" — autobiographical?
- Later-life status and recognition
- Most prolific of the group?

### Alfredo Le Pera (1900-1935)
- Brazilian-born — significance?
- Gardel partnership — how close?
- Died in plane crash with Gardel
- Film tangos vs. traditional tangos
- "Por una Cabeza", "Volver", "El Día que Me Quieras"

---

## Contextual Essay

Write a 2,000-word essay: **"The Poets of Tango: Literature in Three Minutes"**

Cover:
- Why tango needed great lyrics (not just dance music)
- The rise of tango canción (vs. instrumental)
- Literary influences (French symbolism, criollismo)
- Lunfardo as literary device
- How lyrics reflect Buenos Aires history
- Comparison to other song traditions (blues, chanson)
- Why these lyrics still resonate

---

## Output Format

### Individual Profiles

```markdown
## Homero Manzi (1907-1951)

**Summary:** The scene-painter of Buenos Aires; political activist; created tango's most evocative urban imagery.

### Biography
[3-4 paragraphs]

### Literary Style
[Analysis of themes, techniques]

### Essential Works
| Title | Composer | Year | Analysis |
|-------|----------|------|----------|
| Sur | Troilo | 1948 | [Analysis] |
| ... | ... | ... | ... |

### Notable Lines
> "San Juan y Boedo antiguo, y todo el cielo..."
> "Sur, paredón y después..."

### HITM Flags
- [Uncertain facts]
```

### Structured Data

```json
{
  "entities": [
    {
      "id": "homero-manzi",
      "type": "person",
      "displayName": "Homero Manzi",
      "born": "1907-11-01",
      "died": "1951-05-03",
      "personType": "lyricist",
      "categories": ["lyricists", "poets", "golden-age"],
      "summary": "Scene-painter of Buenos Aires — Sur, Barrio de Tango, Malena",
      "paperPath": "/tango-papers/people/homero-manzi.md"
    }
  ]
}
```

---

## Cross-References

Connect to:
- Singers who interpreted their work
- Orchestras that premiered their tangos
- Films featuring their lyrics
- Nelly Omar paper (for Manzi connection)
- Gardel paper (for Le Pera connection)

---

**END OF PROMPT**

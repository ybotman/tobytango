# Batch Research Task: Golden Age Cantores (Male Singers)

You are a tango history researcher. Create comprehensive profiles for the major **male singers** of tango's Golden Age (1935-1955).

## Research Subjects

Provide complete profiles for these 15 singers:

| Name | Orchestra Association | Key Note |
|------|----------------------|----------|
| **Francisco Fiorentino** | Troilo (1937-1944) | First great estribillista |
| **Ángel Vargas** | D'Arienzo | "Los Dos Ángeles" partnership |
| **Alberto Castillo** | Tanturi, solo | Gynecologist turned explosive star |
| **Roberto Goyeneche** | Salgán, Troilo | "El Polaco" - gravelly voice |
| **Edmundo Rivero** | Troilo, solo | Deep bass pioneer |
| **Alberto Podestá** | Di Sarli, Caló | Elegant phrasing |
| **Alberto Marino** | Troilo | Operatic bel canto |
| **Floreal Ruiz** | Troilo, De Angelis | Chameleon voice |
| **Roberto Rufino** | Di Sarli | Joined at 16, warm theatricality |
| **Alberto Echagüe** | D'Arienzo | 130+ recordings, arrabalero |
| **Héctor Mauré** | D'Arienzo | Lyrical Gardelian style |
| **Alberto Morán** | Pugliese | Bel canto master |
| **Roberto Chanel** | Pugliese | Dramatic, passionate |
| **Raúl Berón** | Caló | Rich emotional voice |
| **Julio Sosa** | Pontier, solo | "El Varón del Tango" (1950s-60s) |
| **Enrique Campos** | Tanturi | Smooth romantic style |
| **Oscar Serpa** | Tanturi | Contrast to Castillo |
| **Jorge Casal** | D'Arienzo | Estribillista role |
| **Jorge Durán** | Pugliese, Troilo | Bridge to post-Golden |
| **Mario Bustos** | Troilo | Late Troilo era |

---

## For Each Singer, Provide:

### 1. Biographical Data
```yaml
id: [slug]
displayName: [Name]
fullName: [Full name if different]
born: YYYY-MM-DD or YYYY
birthPlace: [City, Country]
died: YYYY-MM-DD or null
deathPlace: [City, Country] or null
personType: singer
```

### 2. Career Timeline
- When they started singing professionally
- Orchestra affiliations with years
- Solo career (if any)
- Key recordings with years
- Awards or recognition

### 3. Voice & Style
- Vocal characteristics (range, timbre)
- Signature phrasing or technique
- What made them distinctive
- Comparison to other singers

### 4. Notable Recordings (5-10 per singer)
| Song | Orchestra | Year | Why Notable |
|------|-----------|------|-------------|
| ... | ... | ... | ... |

### 5. Key Quotes
- Quotes from the singer (if available)
- Quotes about them from contemporaries

### 6. Legacy
- Influence on later singers
- Recognition (if any)
- Current standing in milonga playlists

---

## Output Format

### Individual Profile Structure

For each singer:

```markdown
## [Name] (born–died)

**Summary:** One paragraph overview

### Biography
[2-3 paragraphs]

### Voice & Style
[Description of vocal characteristics]

### Orchestra Affiliations
- [Year-Year]: [Orchestra] - [# of recordings, key songs]

### Essential Recordings
| Song | Orchestra/Year | Notes |
|------|----------------|-------|
| ... | ... | ... |

### Quotes
> "Quote" — Source

### HITM Flags
- [Any facts needing verification]
```

---

## Structured Data Output

At the end, provide JSON entries for each singer:

```json
{
  "entities": [
    {
      "id": "francisco-fiorentino",
      "type": "person",
      "displayName": "Francisco Fiorentino",
      "fullName": "Francisco Fiorentino",
      "born": "1905-05-23",
      "died": "1955-11-11",
      "personType": "singer",
      "categories": ["singers", "golden-age"],
      "orchestras": ["troilo", "d-arienzo"],
      "summary": "First great estribillista...",
      "paperPath": "/tango-papers/people/francisco-fiorentino.md",
      "appearsIn": ["/tango-papers/orchestras/golden-age-cantores.md"]
    },
    // ... more entries
  ]
}
```

---

## Research Guidelines

### Source Priority
1. **Todo Tango** — Primary reference for dates, discography
2. **El Tango.com** — Biographical details
3. **Tango.info** — Recording data
4. **Academic sources** — Carolyn Merritt, etc.

### Common Challenges
- Birth dates often uncertain
- Some singers recorded under different names
- Orchestra affiliations overlapped
- Solo vs. orchestra career confusion

### Cross-References
Link to existing site content:
- Orchestra papers (when created)
- Golden Age timeline era
- Any existing index entries

---

## Groupings for the Paper

Organize the final paper by these categories:

### 1. The D'Arienzo Singers
Vargas, Echagüe, Mauré, Casal — the rhythmic, crisp school

### 2. The Troilo School
Fiorentino, Marino, Ruiz, Goyeneche, Bustos — lyrical, jazz-inflected

### 3. The Di Sarli Sound
Podestá, Rufino — elegant, orchestral integration

### 4. The Tanturi Duo
Castillo, Campos — contrasting dramatic vs. smooth

### 5. The Pugliese Expression
Morán, Chanel, Durán — dramatic, rubato-friendly

### 6. The Post-Golden Voice
Julio Sosa — bridge to decline era

---

## Delivery

Provide:
1. **Narrative white paper** (~6,000-8,000 words) organized by school/orchestra
2. **Individual mini-profiles** for each singer
3. **JSON index entries** for all 20 singers
4. **HITM flags** for unverified facts
5. **Cross-reference recommendations** to other site content

---

**END OF PROMPT**

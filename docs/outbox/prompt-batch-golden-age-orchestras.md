# Batch Research Task: Golden Age Orchestras (Non-Big Four)

You are a tango history researcher. Create comprehensive profiles for the major **Golden Age orchestras** beyond the "Big Four" (D'Arienzo, Di Sarli, Troilo, Pugliese — already covered).

## Research Subjects

| Orchestra | Leader | Key Characteristic |
|-----------|--------|-------------------|
| **Rodolfo Biagi** | Pianist | "Manos Brujas" — rhythmic intensity |
| **Ricardo Tanturi** | Violinist | Alberto Castillo partnership |
| **Miguel Caló** | Bandoneonist | Romantic, lyrical style |
| **Alfredo De Angelis** | Pianist | "El Poeta del Bandoneón ensemble" |
| **Francisco Canaro** | Violinist | Most prolific recorder; Ada Falcón partnership |
| **Osvaldo Fresedo** | Bandoneonist | "El Pibe de la Paternal" — elegant, jazzy |
| **Julio De Caro** | Violinist | Guardia Nueva revolutionary |
| **Ángel D'Agostino** | Pianist | Ángel Vargas partnership |
| **Pedro Laurenz** | Bandoneonist | Maffia student; rich sound |
| **Enrique Rodríguez** | Violinist | "La Típica del Pueblo" |
| **Edgardo Donato** | Violinist | Vals specialist |
| **Lucio Demare** | Pianist | Composer; "Malena" |
| **Domingo Federico** | Bandoneonist | Troilo-influenced |
| **Francini-Pontier** | Violin + Bandoneón | Duo leadership; instrumental |
| **Héctor Varela** | Bandoneonist | Later Golden Age |
| **Florindo Sassone** | Violinist | Post-Golden traditionalist |
| **José Basso** | Pianist | Late Golden Age |

---

## For Each Orchestra, Provide:

### 1. Basic Data
```yaml
id: [leader-slug]
displayName: [Orchestra name as commonly known]
leader: [Name of director]
instrument: [Director's instrument]
founded: YYYY
disbanded: YYYY (or "ongoing")
peakYears: YYYY-YYYY
style: [Rhythmic|Melodic|Romantic|Jazzy|etc.]
```

### 2. Musical Characteristics
- Overall sound/style
- Rhythmic vs. melodic emphasis
- Danceable? (From milonguero perspective)
- Signature techniques
- Comparison to Big Four

### 3. Key Personnel
- Featured singers (with years)
- Notable instrumentalists
- Arrangers

### 4. Discography Highlights
| Song | Year | Singer | Why Notable |
|------|------|--------|-------------|
| ... | ... | ... | ... |

### 5. Career Timeline
- Formation and early years
- Peak period
- Decline or end
- Any comebacks?

---

## Specific Research Questions

### Rodolfo Biagi
- "Manos Brujas" (Bewitching Hands) — why this nickname?
- D'Arienzo connection (was his pianist?)
- Split from D'Arienzo — when, why?
- His distinctive rhythmic style
- Key recordings for dancing
- Why is he a milonga DJ staple?

### Ricardo Tanturi
- Castillo vs. Campos — two different sounds
- Which recordings are most danced?
- "El Tango Es El Tango" — analysis
- Post-Golden career

### Miguel Caló
- "Romantic, lyrical" — explain
- Key singers (Podestá, Berón)
- Orchestral innovations
- Comparison to Di Sarli

### Francisco Canaro
- Most prolific — how many recordings?
- Ada Falcón partnership details
- Style evolution over decades
- Why some dancers avoid his music
- "Canaro en París" — the song's significance

### Osvaldo Fresedo
- "El Pibe de la Paternal" — meaning?
- Jazz influences
- Longevity of career (1920s-1970s?)
- Elegant, salon style
- Key recordings

### Julio De Caro
- "Revolutionary" — what did he change?
- Guardia Nueva founder?
- Influence on later orchestras
- Recordings for dancing vs. listening

### Ángel D'Agostino
- "Los Dos Ángeles" partnership with Vargas
- Sound characteristics
- Key recordings
- Why beloved by dancers

### Pedro Laurenz
- Maffia student — what did he learn?
- His distinctive bandoneon sound
- Key recordings
- Singers

### Others
Provide similar depth for each orchestra listed.

---

## Contextual Essay

Write a 3,000-word essay: **"Beyond the Big Four: The Golden Age Orchestra Landscape"**

Cover:
1. Why focus on four? (Marketing, DJ preferences)
2. The full ecosystem — how many orchestras?
3. Stylistic schools (rhythmic vs. romantic)
4. The vocalist revolution
5. Orchestras for dancing vs. listening
6. What DJs play today and why
7. Rediscovery of lesser-known orchestras

---

## For Milonga DJs

Include a section on **danceable recordings**:

For each orchestra, recommend:
- 5 essential tandas for milongas
- Tanda-building advice (opening, middle, closing songs)
- What moods/styles each orchestra serves
- Which orchestras pair well in a night's programming

---

## Output Format

### Individual Profiles

```markdown
## Rodolfo Biagi (1906-1969)

**Epithet:** "Manos Brujas" (Bewitching Hands)

**Summary:** Intensely rhythmic pianist; ex-D'Arienzo; staple of milonga playlists.

### Sound & Style
[Description]

### Career
[Timeline]

### Key Singers
- [Name] (years): characteristics

### Essential Recordings
| Song | Year | Singer | Notes |
|------|------|--------|-------|
| ... | ... | ... | ... |

### Tanda Building
[DJ advice]

### HITM Flags
- [Uncertain facts]
```

### Structured Data

```json
{
  "entities": [
    {
      "id": "rodolfo-biagi",
      "type": "orchestra",
      "displayName": "Rodolfo Biagi",
      "leader": "Rodolfo Biagi",
      "founded": "1938",
      "peakYears": "1938-1955",
      "style": "rhythmic",
      "categories": ["orchestras", "golden-age"],
      "summary": "'Manos Brujas' — intensely rhythmic; ex-D'Arienzo pianist",
      "paperPath": "/tango-papers/orchestras/rodolfo-biagi.md"
    }
  ]
}
```

---

## Cross-References

Connect to:
- Big Four papers (comparison)
- Golden Age era paper
- Singer profiles
- DJ/musicality content

---

**END OF PROMPT**

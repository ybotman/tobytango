# Research Request: The Bandoneón Category

## Purpose
Building a new timeline category for tobytango.com covering the bandoneón's journey from German concertina to tango's defining voice. The instrument IS tango's identity story — its arrival, mastery, near-extinction, and revival mirrors tango's own arc.

## Framework

The standard periodization:

| Era | Years | Character | Key Development |
|-----|-------|-----------|-----------------|
| Arrival & Adoption | 1870s–1910 | German import finds new home | Replaces flute in early ensembles |
| Establishment | 1910–1930 | Becomes tango's defining voice | De Caro era, orchestral integration |
| Golden Age Masters | 1930–1955 | The great soloists emerge | Troilo, Maffia, Laurenz, Federico |
| Evolution & Piazzolla | 1955–1990 | Concert instrument, nuevo tango | Piazzolla transforms possibilities |
| Near-Extinction | 1970s–2000s | Makers die, instruments scarce | Alfred Arnold closed 1948 |
| Revival & Future | 2000s–present | New makers, global players | Klingenthal revival, Asian builders |

## Output Required

### For Each Era, Provide:

```javascript
{
  id: "era-slug",
  title: "Era Title",
  subtitle: "Short tagline",
  yearStart: YYYY,
  yearEnd: YYYY,
  status: "populated",
  summary: [
    "4-6 bullet points covering key developments",
    "Include specific players, makers, technical innovations",
    "Note the instrument's evolving role"
  ],
  keyFigures: [
    { name: "Bandoneonist Name", type: "individual", role: "Brief description" }
  ],
  paperPath: "/tango-papers/bandoneon/[era-slug].md"
}
```

### Key Topics to Cover

**Origins & Arrival:**
- Heinrich Band and the invention (1840s Germany)
- The instrument's journey to Río de la Plata (~1870s)
- Why did it replace the flute? What made it perfect for tango?
- Early adopters: who were the first tango bandoneonists?

**The Instrument Itself:**
- 71 buttons (38 right, 33 left) — bisonoric system
- Why so difficult? The illogical button layout
- Rheinische vs. other systems
- The sound: why does it capture tango's emotion?

**The Great Makers:**
- **Alfred Arnold (AA)** — Carlsfeld, Germany
  - "The Stradivarius of bandoneóns"
  - Factory closed 1948
  - How many survive? Estimated 30,000-50,000 made?

- **Ernst Louis Arnold (ELA)**
- **Premier**
- Other historical makers

**Golden Age Masters:**

- **Pedro Maffia** (1899–1967)
  - "Discovered the bandoneón's singing voice"
  - Changed from percussive to melodic approach

- **Pedro Laurenz** (1902–1972)
  - "El Cadenero" — rhythmic fire
  - "Los dos Pedritos" with Maffia

- **Aníbal Troilo** (1914–1975)
  - "Pichuco" — the musician's musician
  - His AA bandoneón named "María"

- **Leopoldo Federico** (1927–2014)
  - Technical virtuoso
  - Continued performing into old age

- **Astor Piazzolla** (1921–1992)
  - Transformed the instrument
  - Concert/nuevo tango
  - His AA and the Piazzolla sound

**Other Essential Bandoneonists:**
- Eduardo Arolas ("El Tigre del Bandoneón")
- Osvaldo Ruggiero
- Néstor Marconi
- Dino Saluzzi
- Juan José Mosalini
- Rodolfo Mederos

**The Crisis:**
- Alfred Arnold factory closes (1948)
- No new quality instruments for decades
- Repairs become critical skill
- Bandoneonists hoarding, protecting instruments
- Estimated surviving playable AAs?

**The Revival:**
- **Klingenthal revival** — German workshops restart
- **Bandoneón Argentino** project
- **Asian makers** — Chinese, Japanese production?
- **Uebel, Kusserow, other modern makers**
- Cost today: $5,000–$30,000+?

**Teaching & Transmission:**
- How did/do bandoneonists learn?
- Escuela de Música Popular de Avellaneda
- Orquesta Escuela Emilio Balcarce
- International students today

---

## Research Questions

1. **The replacement**: When and why did bandoneón replace flute? Who made this transition?

2. **The AA mystique**: Why are Alfred Arnold instruments considered irreplaceable? What's different about the sound?

3. **Button layout**: Why is it so illogical? Did anyone try to reform it?

4. **Maffia's revolution**: What exactly did he change about bandoneón technique?

5. **Piazzolla's technique**: How did his approach differ from Golden Age players?

6. **The supply crisis**: How many playable bandoneóns exist? What's the real scarcity?

7. **Modern makers**: Are new instruments approaching AA quality? Who says yes/no?

8. **The bisonoric challenge**: Does the push-pull different-note system give tango its sound? Could a unisonoric bandoneón work?

---

## Output Format

### White Paper Structure

```markdown
# The Soul of Tango: A History of the Bandoneón

## I. Origins: From Heinrich Band to Buenos Aires (1840s–1900)
[German invention, journey to Río de la Plata]

## II. Adoption: Replacing the Flute (1900–1920)
[Early bandoneonists, why it fit tango]

## III. The Instrument Explained
[Technical deep-dive: buttons, bisonoric, sound production]

## IV. The Great Makers
[Alfred Arnold, ELA, the golden age of manufacturing]

## V. Golden Age Masters (1930–1955)
[Maffia, Laurenz, Troilo, the definitive sound]

## VI. Piazzolla and Beyond (1955–1990)
[Concert bandoneón, nuevo tango, expanded technique]

## VII. The Crisis: Near-Extinction (1970s–2000s)
[Factory closures, scarcity, the repair economy]

## VIII. Revival: New Makers, New Players (2000s–present)
[Klingenthal, Asian makers, the future]

## IX. Learning the Bandoneón Today
[Schools, teachers, the global community]
```

### Structured Data

Provide:
1. Era definitions for `tangoTimelineData.js` (4-5 eras)
2. Index entries for `master-index.json` (15-25 bandoneonist profiles + makers)
3. Cross-references to orchestras (who played with whom)

---

## Delivery

- Full white paper (5,000–8,000 words)
- Era definitions (4-5 eras)
- Index entries (15-25 profiles)
- HITM flags for uncertain facts (especially instrument counts, dates)

---

**END OF PROMPT**

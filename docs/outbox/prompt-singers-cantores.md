# Research Request: Singers / Cantores Category

## Purpose
Building a new timeline category for tobytango.com covering the evolution of tango singers from solo cantores to estribillistas to cantores de orquesta to modern revival. This parallels our existing Orchestras category but focuses on the vocal dimension.

## Framework (Already Established)

The standard periodization:

| Era | Years | Role | Dance Utility |
|-----|-------|------|---------------|
| Cantor Nacional | ~1900–1930s | Solo singer with guitar | Listening, not dancing |
| Estribillista | ~1926–late 1930s | Brief chorus only, "another instrument" | Background vocal |
| Cantor de Orquesta | ~late 1930s–1950 | Integrated voice, prominent but within orchestra | **Peak dance era** |
| Solista / Star Singer | ~1950s–1960s | Singer dominates, orchestra backs | Declining dance utility |
| Concert Era | ~1960s–1990s | Piazzolla/art music, singers as concert artists | Not for dancing |
| Revival | ~1990s–present | Return to cantor de orquesta model | Dance-focused again |

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
    "Include specific dates, names, recordings where known",
    "Note dance utility implications"
  ],
  keyFigures: [
    { name: "Singer Name", type: "individual", role: "Brief description with dates" }
  ],
  paperPath: "/tango-papers/singers/[era-slug].md"
}
```

### Key Figures to Profile

**Cantor Nacional Era:**
- Carlos Gardel (the towering figure)
- Ignacio Corsini
- Agustín Magaldi
- Charlo (Juan Carlos Pérez de la Riestra)

**Estribillista Era:**
- Roberto Díaz (first estribillista, Canaro 1926?)
- Fernando Díaz
- Agustín Irusta
- Roberto Fugazot
- Early Fiorentino

**Transitional Moment:**
- Francisco Fiorentino's 1934 "Serenata de amor" with Zerrillo — first complete lyrics

**Cantor de Orquesta (Golden Age):**

Group by orchestra:
- **Troilo**: Fiorentino (1941-44), Marino (1943-47), Floreal Ruiz, Edmundo Rivero, Roberto Goyeneche
- **Di Sarli**: Roberto Rufino, Jorge Durán, Alberto Podestá, Mario Pomar
- **D'Arienzo**: Alberto Echagüe, Héctor Mauré, Armando Laborde
- **Pugliese**: Roberto Chanel, Jorge Maciel, Alberto Morán, Abel Córdoba
- **Tanturi**: Alberto Castillo (explosive combination), Enrique Campos
- **Caló**: Raúl Berón, Alberto Podestá, Raúl Iriarte
- **De Angelis**: Carlos Dante, Julio Martel, Juan Carlos Godoy
- **Fresedo**: Roberto Ray, Oscar Serpa, Héctor Pacheco
- **Canaro**: Roberto Maida, Eduardo Adrián, Ernesto Famá
- **Biagi**: Jorge Ortiz, Hugo Duval, Alberto Amor
- **D'Agostino**: Ángel Vargas (essential pairing)

**Solista / Star Era:**
- Julio Sosa ("El Varón del Tango")
- Roberto Goyeneche (post-orchestra career)
- Edmundo Rivero (post-orchestra)
- Susana Rinaldi

**Female Voices (cross-era):**
- Tita Merello
- Libertad Lamarque
- Azucena Maizani
- Mercedes Simone
- Nelly Omar
- Amelita Baltar (Piazzolla era)
- Adriana Varela (revival)

**Revival Era:**
- Modern orquesta singers
- Who sings with Color Tango, OTFF, Sexteto Milonguero, Bandonegro?

---

## Research Questions

1. **The 1934 transition**: Confirm Fiorentino/"Serenata de amor"/Zerrillo as the key moment. Any other contenders?

2. **Orchestra-singer pairings**: Which pairings are considered definitive? (e.g., D'Agostino-Vargas, Troilo-Fiorentino)

3. **Dance utility**: How do DJs and dancers distinguish "good for dancing" singers vs. "listening only"? What makes a cantor de orquesta voice work for the dance floor?

4. **The Castillo phenomenon**: Alberto Castillo with Tanturi is described as "explosive" — why? What made this pairing unique?

5. **Female singers**: How do women fit into this taxonomy? Were there female estribillistas? Female cantores de orquesta? Or mostly soloists?

6. **The Goyeneche arc**: He spans multiple eras — cantor de orquesta with Troilo, then soloist. How is this transition typically framed?

7. **Rivero's position**: "Cantor de Buenos Aires" — where does he fit? More soloist or cantor de orquesta?

8. **Revival singers**: Who are the current generation singers working with revival orchestras?

---

## Output Format

### White Paper Structure

```markdown
# The Voices of Tango: From Gardel to the Revival

## I. The Cantor Nacional: Solo Voice (1900–1930s)
[Gardel, Corsini, the singer-songwriter era]

## II. The Estribillista: Voice as Instrument (1926–late 1930s)
[Brief chorus singers, Canaro's innovation]

## III. The Transition: 1934
[Fiorentino's breakthrough]

## IV. Cantor de Orquesta: The Golden Balance (late 1930s–1950)
[Orchestra by orchestra profiles]

## V. The Star Rises: Solista Era (1950s–1960s)
[Sosa, late Goyeneche, Rivero]

## VI. The Female Voice: Women in Tango Song
[Cross-era survey]

## VII. Concert and Eclipse (1960s–1990s)
[Piazzolla era, Baltar]

## VIII. Revival: The Voice Returns (1990s–present)
[Modern cantores]
```

### Structured Data

Provide:
1. Era definitions for `tangoTimelineData.js`
2. Index entries for `master-index.json` (40-60 singer profiles)
3. Cross-references to existing orchestra entries

---

## Existing Related Content

We already have:
- `/tango-papers/orchestras/golden-age-singers.md` — basic cantor de orquesta overview
- Orchestra entries in `master-index.json` with some singer mentions
- Golden Age orchestra era with keyFigures

This new category expands and systematizes the singer dimension.

---

## Delivery

- Full white paper (8,000–12,000 words)
- Era definitions (6 eras)
- Index entries (40-60 singers)
- Cross-references to orchestras
- HITM flags for uncertain attributions

---

**END OF PROMPT**

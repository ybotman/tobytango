# Research Request: Lyrics / Poetry (Letristas) Category

## Purpose
Building a new timeline category for tobytango.com covering the evolution of tango lyrics from wordless dance music to profound poetry. The letristas shaped tango's emotional and philosophical identity as much as the musicians did.

## Framework

The standard periodization:

| Era | Years | Character | Key Figure |
|-----|-------|-----------|------------|
| Instrumental / Payada | pre-1917 | No lyrics or simple folk verses | — |
| Tango-Canción Birth | 1917–1925 | Contursi's narrative revolution | Pascual Contursi |
| Golden Age Poetry | 1925–1945 | Flourishing of major poets | Cadícamo, Manzi, Discépolo |
| Existentialist Peak | 1930s–1940s | Philosophical depth | Enrique Santos Discépolo |
| Late Masters | 1950s–1970s | Mature voices, nostalgia | Horacio Ferrer, Cátulo Castillo |
| Modern / Revival | 1980s–present | New voices, preservation | Contemporary letristas |

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
    "Include specific songs, dates, publications",
    "Note thematic evolution"
  ],
  keyFigures: [
    { name: "Letrista Name", type: "individual", role: "Brief description with key works" }
  ],
  paperPath: "/tango-papers/lyrics/[era-slug].md"
}
```

### Key Figures to Profile

**Pre-Lyric Era:**
- Ángel Villoldo (wrote some early verses)
- Payadores and their influence
- The criollo/orillero tradition

**The Revolution — Pascual Contursi:**
- "Mi Noche Triste" (1917) — THE turning point
- Partnership with Samuel Castriota (music)
- Gardel's recording transforms tango forever
- What made this different from everything before?

**Golden Age Poets:**

- **Enrique Cadícamo** (1900–1999)
  - "Nostalgias," "Los Mareados," "Garúa"
  - 99 years old, witnessed entire arc

- **Homero Manzi** (1907–1951)
  - "Sur," "Barrio de Tango," "Malena"
  - The scene-painter of Buenos Aires
  - Political engagement, connection to peronismo

- **Enrique Santos Discépolo** (1901–1951)
  - "Cambalache," "Yira...Yira...," "Uno"
  - Tango's existentialist philosopher
  - "El siglo veinte es un despliegue de maldad insolente"

- **Alfredo Le Pera** (1900–1935)
  - Gardel's film-era collaborator
  - "Volver," "El Día Que Me Quieras," "Por Una Cabeza"
  - Died with Gardel in Medellín crash

- **Celedonio Flores** (1896–1947)
  - "Corrientes y Esmeralda," "Mano a Mano"
  - Lunfardo master

**Late Masters:**

- **Cátulo Castillo** (1906–1975)
  - "La Última Curda," "Caserón de Tejas"
  - Son of composer José González Castillo

- **Horacio Ferrer** (1933–2014)
  - Piazzolla's partner: "Balada para un Loco," "Chiquilín de Bachín"
  - Extended tango lyrics into theatrical/poetic territory
  - Founded Academia Nacional del Tango

**Modern Voices:**
- Who writes tango lyrics today?
- Any revival of the letrista tradition?

---

## Research Questions

1. **The 1917 moment**: What exactly made "Mi Noche Triste" revolutionary? What came before that was different?

2. **Lunfardo**: How did slang enter and evolve in lyrics? The 1943 ban? Post-1949 restoration?

3. **Themes by era**: How did lyrical themes shift?
   - Early: lost love, betrayal, the arrabal
   - Golden Age: nostalgia, Buenos Aires, philosophy
   - Discépolo: social critique, existential despair
   - Late: memory, aging, the lost city

4. **Music-lyric partnerships**: Which composer-letrista pairs were definitive?
   - Gardel-Le Pera
   - Troilo-Manzi
   - Piazzolla-Ferrer
   - Others?

5. **The female perspective**: Did any women write major tango lyrics? Or were they primarily interpreted by women?

6. **Political content**: Discépolo's "Cambalache" as social critique. Manzi's peronismo. How political did lyrics get?

7. **The untranslatable**: What makes tango poetry so hard to translate? Lunfardo, cultural references, porteño sensibility?

---

## Output Format

### White Paper Structure

```markdown
# The Words of Tango: From Silence to Poetry

## I. Before Words: The Instrumental Era (pre-1917)
[Payada tradition, early simple verses, Villoldo]

## II. The Revolution: Mi Noche Triste (1917)
[Contursi, Castriota, Gardel — the birth of tango-canción]

## III. The Flowering: Golden Age Poetry (1920s–1940s)
[Cadícamo, Celedonio Flores, Manzi — Buenos Aires as muse]

## IV. The Philosopher: Discépolo's Existentialism
[Cambalache, Yira Yira, Uno — tango as philosophy]

## V. Film Era and Le Pera
[Gardel's films, Volver, the international lyric]

## VI. The Late Masters (1950s–1970s)
[Cátulo Castillo, Ferrer, elegiac mode]

## VII. Lunfardo: The Language Within the Language
[Slang, the ban, cultural meaning]

## VIII. Themes of Tango Poetry
[Thematic analysis across eras]

## IX. Modern Voices (1980s–present)
[Contemporary letristas, preservation]
```

### Structured Data

Provide:
1. Era definitions for `tangoTimelineData.js` (5-6 eras)
2. Index entries for `master-index.json` (20-30 letrista profiles)
3. Key songs with lyricist attribution
4. Cross-references to existing singer/orchestra entries

---

## Cross-References

Connect to existing content:
- Singers/Cantores category (who sang which lyrics)
- Orchestras (which orchestras favored which poets)
- Argentina timeline (cultural/political context)
- Events (Gardel death, lunfardo ban, etc.)

---

## Delivery

- Full white paper (6,000–10,000 words)
- Era definitions (5-6 eras)
- Index entries (20-30 letristas + key songs)
- HITM flags for uncertain attributions

---

**END OF PROMPT**

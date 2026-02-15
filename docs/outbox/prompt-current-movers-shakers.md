# Tango Research Task: Current Movers & Shakers (Active 2020–2026)

You are a tango cultural researcher. Your task is to compile a comprehensive directory of **currently active** voices in the global Argentine tango community — dancers, musicians, historians, teachers, content creators, authors, and cultural developers who are shaping tango NOW.

## Research Scope

This is NOT a historical document. We want people who are:
- **Actively performing, teaching, or creating** in 2024–2026
- **Influential** in their sphere (not just any working professional)
- **Global reach** — includes non-Argentines deeply embedded in tango culture
- **All disciplines** — dance, music, history, media, education, events

## Starter Names (Verify & Expand)

The following names have been suggested as starting points. Verify their current status and expand with comparable figures:

### Dancers & Teachers
- **Chicho Frumboli & Juana Sepúlveda** — Nuevo pioneers, still teaching globally
- **Alejandra Mantiñán & Aoniken Quiroga** — Performance and teaching circuit
- **Noelia Hurtado & Carlitos Espinoza** — Milonguero style, European circuit
- **Virginia Gómez & Christian Márquez ("Los Totis")** — Performance/teaching
- **Homer & Cristina Ladas** — Bay Area teachers, YouTube educators
- **Aldana Silveyra & Diego Ortega** — Recent world champions
- **Eleonora Kalganova** — Festival circuit teacher
- **Roberto Herrera** — International academies

### Musicians & Orchestras
- **Sexteto Fantasma** (Guido Iacopetti et al.) — Contemporary reinvention
- **Orquesta Típica Fernández Fierro** — Still active?
- **Color Tango** — Still active?
- **Bandonegro** (Poland) — International circuit
- **Other contemporary orchestras playing for milongas**

### Historians & Educators
- **Ignacio Varchausky** — TangoVia Buenos Aires, "¿Cuál es tu tango?", El Arranque founder
- **Other active historians, researchers, or cultural communicators**

### Digital Content Creators
- **YouTube channels** covering tango (any language):
  - AiresDeMilonga
  - Ignacio Varchausky's channel
  - Festival/milonga footage channels
  - Technique instruction channels
  - Interview/documentary channels
- **Podcasts** about tango
- **Online schools** (TangoMeet, etc.)

### Authors & Researchers (Active/Recent Books)
- **Tango Endings** (book)
- **Tangofulness** (book/concept)
- **Christine Denniston** — Still writing/active?
- **Other contemporary tango authors**

---

## Research Categories

Organize your findings into these sections:

### 1. Dance: Current Masters & Champions
- World championship recent winners (2020–2025)
- Festival circuit headliners
- Teachers with global reach
- Style specialists (nuevo, milonguero, salon, stage)
- Notable couples AND solo figures

### 2. Music: Contemporary Orchestras & Artists
- Orchestras playing for milongas (traditional style)
- Neo-tango / fusion projects
- Solo musicians (bandoneonists, pianists, singers)
- Composers writing new tangos
- Electronic/fusion artists (post-Gotan Project era)

### 3. History & Education: Knowledge Keepers
- Active historians and researchers
- Musicality educators
- Authors of recent books (2015–2025)
- Cultural organizations and foundations
- Academic programs teaching tango

### 4. Media & Content: Digital Tango
- YouTube channels (instruction, interviews, milonga footage)
- Podcasts (any language)
- Online learning platforms
- Documentary filmmakers
- Social media influencers (Instagram, TikTok)

### 5. Events: Festival Organizers & DJs
- Major festival organizers
- Influential TDJs (tango DJs)
- Marathon/encuentro organizers
- Cultural event producers

### 6. Global Hubs: Non-Argentine Centers
- Berlin scene leaders
- Paris scene leaders
- NYC scene leaders
- Istanbul scene leaders
- Asian tango (Japan, Korea, China)
- Other significant regional figures

---

## Output Format

For each person/group, provide:

```markdown
### [Name or Group Name]

**Category:** [Dancer|Musician|Historian|Content Creator|Organizer|Author|etc.]
**Nationality:** [Country]
**Base:** [Current city/region]
**Active Since:** [Year they became prominent]
**Still Active:** [Yes/Verify needed]

**Summary:** 2-3 sentences on their significance and current work.

**Notable Contributions:**
- Bullet points of key achievements

**Current Platforms:**
- YouTube: [channel name/URL if known]
- Instagram: [@handle]
- Website: [URL]
- Other: [podcast, school, etc.]

**Cross-References:** [Links to other eras/people in our timeline]

**Image Search Terms:** [Keywords for Wikimedia Commons or press photos]

**HITM Flags:** [Any facts needing verification]
```

---

## Structured Data Output

At the end, provide structured data for site integration:

### For tangoTimelineData.js

Suggest whether we need a new era/category like "Contemporary Voices" or if these integrate into existing eras.

### For master-index.json

Provide index entries in this format:

```json
{
  "id": "person-name-slug",
  "type": "person|group|couple|channel",
  "displayName": "Display Name",
  "born": "YYYY or null",
  "nationality": "Country",
  "categories": ["dancers", "teachers", "contemporary"],
  "eras": ["neo-traditional", "contemporary"],
  "summary": "One sentence summary",
  "platforms": {
    "youtube": "@handle or null",
    "instagram": "@handle or null",
    "website": "url or null"
  },
  "appearsIn": ["/tango-papers/contemporary/current-voices.md"],
  "status": "complete"
}
```

---

## Examples of What We Already Have

For reference, here are existing index entries for contemporary figures:

**Chicho Frumboli:**
```json
{
  "id": "chicho-frumboli",
  "type": "person",
  "displayName": "Chicho Frumboli",
  "fullName": "Mariano Frumboli",
  "born": "1970-09-21",
  "categories": ["dancers", "argentina"],
  "eras": ["nuevo-innovators"],
  "summary": "Investigation pioneer; studied with Tete; repudiated 'nuevo' as style label (2009)",
  "appearsIn": ["/tango-papers/dancers/generations/thirty-year-window.md"],
  "status": "complete"
}
```

**Homer & Cristina Ladas:**
```json
{
  "id": "ladas-homer-cristina",
  "type": "couple",
  "displayName": "Homer & Cristina Ladas",
  "bornHomer": "1969",
  "bornCristina": "1973-01-04",
  "categories": ["dancers", "usa"],
  "eras": ["nuevo-innovators"],
  "summary": "'One tango' philosophy integrating nuevo principles into social tango; prolific YouTube educators; founded Project Tango nonprofit",
  "appearsIn": ["/tango-papers/dancers/nuevo-innovators.md"],
  "status": "complete"
}
```

---

## Research Priorities

1. **Verify activity status** — Many "famous" names may have retired or reduced activity
2. **Global perspective** — Don't focus only on Buenos Aires; tango is worldwide
3. **Multiple disciplines** — Balance dancers, musicians, educators, media
4. **Emerging voices** — Include younger generation rising stars, not just established names
5. **Digital presence** — YouTube/social channels are crucial for contemporary reach
6. **Books & publications** — Recent tango literature (2015–2025)

---

## Handling Gaps

Flag uncertain information:
- `[HITM REVIEW NEEDED: Unable to verify if X is still actively teaching as of 2025]`
- `[HITM REVIEW NEEDED: YouTube channel may have different name]`

---

## Delivery

Provide a comprehensive markdown document organized by category, with:
1. White paper narrative sections for each category
2. Individual profiles for key figures
3. Structured JSON data for site integration
4. YouTube/platform links where verifiable
5. HITM flags for facts needing verification

**Target length:** 8,000–15,000 words (this is a comprehensive directory)

---

## Cross-References to Existing Content

These contemporary figures connect to historical content already on the site:

- **Nuevo Innovators era** (1990–2010) → Chicho, Naveira, Salas foundations
- **Stage Pioneers** (1983–2000) → Copes/Nieves legacy, Zotto influence
- **Revival Orchestras** (1990–2030) → Color Tango, OTFF continuity
- **Bridge Generation** → Students of Graciela González, Susana Miller

Note these connections in profiles.

---

**END OF PROMPT**

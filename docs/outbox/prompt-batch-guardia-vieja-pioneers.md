# Batch Research Task: Guardia Vieja Pioneers (Pre-1925)

You are a tango history researcher. Create comprehensive profiles for the **founding figures** of tango — composers, musicians, and performers of the Guardia Vieja era (1880-1925).

## Research Subjects

| Name | Role | Key Contribution |
|------|------|------------------|
| **Ángel Villoldo** | Composer | "El Padre del Tango" — El Choclo, La Morocha |
| **Rosendo Mendizábal** | Composer | Afro-Argentine; "El Entrerriano" (first published tango?) |
| **Casimiro Alcorta** | Musician | Afro-Argentine; formed first documented tango group |
| **Eduardo Arolas** | Bandoneonist | "El Tigre del Bandoneón" — brought bandoneón to prominence |
| **Agustín Bardi** | Composer | Harmonically ahead of his time; bridged to Guardia Nueva |
| **Gabino Ezeiza** | Payador | Afro-Argentine; linked milonga to candombe |
| **Pedro Maffia** | Bandoneonist | "Father of modern bandoneón"; professor at conservatory |
| **Vicente Greco** | Bandleader | First to use term "orquesta típica" |
| **Roberto Firpo** | Pianist/Leader | Standardized tango orchestration |
| **Gerardo Matos Rodríguez** | Composer | Uruguayan; composed "La Cumparsita" (1916) |

---

## For Each Pioneer, Provide:

### 1. Biographical Data
```yaml
id: [slug]
displayName: [Name]
fullName: [Full name]
born: YYYY or circa
birthPlace: [City, Country]
died: YYYY
deathPlace: [City, Country]
personType: [composer|musician|payador|bandleader]
ethnicity: [If documented — especially for Afro-Argentine pioneers]
```

### 2. Historical Context
- Social class and neighborhood
- How they entered tango world
- Relationship to other pioneers
- Performance venues (what kind of places?)

### 3. Musical Contributions
- Key compositions (with years)
- Performance innovations
- Recordings (if any exist)
- Influence on later musicians

### 4. The Afro-Argentine Connection
For Mendizábal, Alcorta, and Ezeiza specifically:
- Documentation of African heritage
- How this shaped their music
- Their role in tango's origins
- Why this history is often overlooked

---

## Specific Research Questions

### Ángel Villoldo (1861-1919)
- How many tangos did he compose?
- Why "El Padre del Tango"?
- Did he record? With whom?
- "El Choclo" (1903) and "La Morocha" (1905) — full stories

### Rosendo Mendizábal (1868-1913)
- "El Entrerriano" (1897/98) — is this the first published tango?
- Evidence of Afro-Argentine heritage
- Relationship with other early composers
- Death circumstances

### Casimiro Alcorta (1840-1913)
- "Father of tango" claim — what's the evidence?
- His "orquesta" — what instruments?
- Where did they perform?
- Documentation of his work

### Eduardo Arolas (1892-1924)
- Why "El Tigre del Bandoneón"?
- Paris years (when? why did he go?)
- Death in Paris at 32 — circumstances?
- Key compositions: "Derecho viejo", "La cachila"

### Agustín Bardi (1884-1941)
- What made him "harmonically ahead"?
- "Qué Noche", "Tinta Verde" — analysis
- Did he lead an orchestra?
- Bridge to Guardia Nueva — explain

### Gabino Ezeiza (1858-1916)
- Payador tradition — explain
- "Improvised singer" competition culture
- Explicit candombe/milonga link — evidence?
- His fame in his time vs. obscurity now

### Pedro Maffia (1899-1967)
- "Dark, singing voice" of bandoneón — what does this mean?
- First professor of bandoneón — where?
- His orchestra
- Students/influence

### Vicente Greco (1888-1924)
- First "orquesta típica" — when? prove it
- What was the lineup?
- Recordings
- Why important?

### Roberto Firpo (1884-1969)
- Standardizing orchestration — what changes?
- "La Cumparsita" premiere (1917) — the story
- Longevity of career
- Key recordings

### Gerardo Matos Rodríguez (1897-1948)
- Uruguayan, not Argentine — significance?
- "La Cumparsita" origin story — at 19 years old?
- Copyright battles
- Other compositions?

---

## Output Format

### Narrative Essay
Write a 3,000-word essay: **"The Birth of Tango: Guardia Vieja 1880-1925"**

Structure:
1. The Origins Debate (conventillos, academias, Afro-Argentine roots)
2. The Pioneer Composers (Villoldo, Mendizábal, Alcorta)
3. The Bandoneón Revolution (Arolas, Maffia)
4. The First Orchestras (Greco, Firpo)
5. La Cumparsita and the End of an Era

### Individual Mini-Profiles
For each person, provide:
- 300-500 word biography
- Key works list
- 2-3 quotes (from them or about them)
- HITM flags for uncertain facts

### Structured Data
```json
{
  "entities": [
    {
      "id": "angel-villoldo",
      "type": "person",
      "displayName": "Ángel Villoldo",
      "born": "1861",
      "died": "1919",
      "personType": "composer",
      "categories": ["composers", "guardia-vieja"],
      "summary": "El Padre del Tango — El Choclo (1903), La Morocha (1905)",
      "paperPath": "/tango-papers/people/angel-villoldo.md",
      "appearsIn": ["/tango-papers/argentina/guardia-vieja.md"]
    }
  ]
}
```

---

## Research Challenges

Note these common issues:
- Birth/death dates often uncertain for pre-1900 figures
- Afro-Argentine heritage often undocumented or suppressed
- "First" claims (first tango, first orchestra) are disputed
- Few recordings exist from before 1910
- Oral tradition vs. documented history

Flag uncertain facts for HITM review.

---

**END OF PROMPT**

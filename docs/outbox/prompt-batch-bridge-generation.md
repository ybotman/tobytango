# Batch Research Task: Bridge Generation Teachers

You are a tango history researcher. Create comprehensive profiles for the **Bridge Generation** — dancers who learned from the Guardians and became the primary teachers to the global tango community (1980s-2000s).

## Research Subjects

| Name | Specialty | Key Contribution |
|------|-----------|------------------|
| **Martha Anton** | Canyengue | Canyengue researcher with Luis Grondona |
| **Luis Grondona** | Canyengue | Revived the oldest tango style |
| **Graciela González** | Pedagogy | "Followers/Leaders Technique" pioneer |
| **Myriam Pincen** | Traditional | 30+ years studying with masters |
| **Ismael Heljalil** | Minimalist | "Knows dozens of steps but doesn't use them" |
| **Gilda Suzuki** | Bridge | Traditional technique transmitter |
| **Roberto Segarra** | Bridge | Milonguero tradition |
| **Elba Biscay** | Footwork | "Never traveled internationally" |
| **El Chino Perico** | Traditional | "Still dancing in his 90s" |
| **Silvia Ceriani** | Musicality | Tete's partner, musicalizadora |

---

## For Each Person, Provide:

### 1. Biographical Data
```yaml
id: [slug]
displayName: [Name]
fullName: [Legal name]
born: YYYY or circa
birthPlace: [City, Country]
died: YYYY or null (if applicable)
personType: dancer/teacher
generation: bridge
currentStatus: [active|semi-retired|deceased]
```

### 2. Formation
- Who did they study with? (Guardian Generation teachers)
- When did they start dancing?
- Which milongas formed them?
- Background before tango

### 3. Teaching Career
- When did they start teaching?
- Where do/did they teach?
- International travel history
- Teaching methodology (if documented)
- Notable students

### 4. Style & Specialty
- Dance style description
- What makes them distinctive?
- Technical contributions
- Philosophical approach

### 5. Current Status (2025)
- Still teaching?
- Where based?
- Active in community?
- Recent appearances

---

## Specific Research Questions

### Martha Anton & Luis Grondona
- Their partnership history
- Canyengue research — what did they document?
- Where did they learn canyengue? From whom?
- Current status (both still active?)
- Teaching materials produced
- Canyengue definition/characteristics

### Graciela González
- "Followers/Leaders Technique" — what is it?
- Pupi Castello mentorship details
- Teaching career scope
- Students who became famous
- Current status
- Philosophy of teaching

### Myriam Pincen
- Which masters did she study with?
- 30+ years — timeline
- "Keeper of traditional technique" — explain
- Teaching approach
- Current status

### Ismael Heljalil
- "The minimalist" — explain this philosophy
- Why doesn't he use the steps he knows?
- Teaching approach
- Where does he dance/teach?

### Silvia Ceriani
- Partnership with Tete Rusconi (from 1995)
- After Tete's death — her teaching
- "Musicalizadora" — she DJs?
- Current status and locations

### Elba Biscay
- Why never traveled internationally?
- "Beautiful footwork" — technical description
- Where does she dance in Buenos Aires?
- Current status

### El Chino Perico
- Age (90s?) — verify
- Barrio/milongas
- Style description
- Legacy

---

## Contextual Essay

Write a 2,000-word essay: **"The Bridge Generation: Transmitting Tango to the World"**

Cover:
1. Definition: who are the Bridge Generation?
2. Learning from the Guardians (1980s-1990s)
3. The teaching boom (1990s-2000s) — foreigners arrive
4. How did they adapt traditional knowledge for teaching?
5. Pedagogical innovations (Graciela's technique, etc.)
6. Preservationists vs. innovators in this generation
7. Current status — who is still teaching?

---

## Output Format

### Individual Profiles

```markdown
## Graciela González

**Summary:** Bridge generation pedagogy pioneer; developed "Followers/Leaders Technique"; studied with Pupi Castello.

### Biography
[3-4 paragraphs]

### Teaching Philosophy
[Her approach to transmission]

### Methodology
[Technical innovations]

### Notable Students
- [List]

### Current Status
[Where is she now?]

### HITM Flags
- [Uncertain facts]
```

### Structured Data

```json
{
  "entities": [
    {
      "id": "graciela-gonzalez",
      "type": "person",
      "displayName": "Graciela González",
      "born": "1950s",
      "personType": "dancer",
      "generation": "bridge",
      "categories": ["dancers", "teachers", "bridge-generation"],
      "summary": "Pedagogy pioneer; Followers/Leaders Technique",
      "paperPath": "/tango-papers/people/graciela-gonzalez.md"
    }
  ]
}
```

---

## Cross-References

Connect to:
- Guardian Generation (their teachers)
- Pre-Nuevo Masters paper (some overlap)
- Thirty-Year Window paper
- Nuevo Innovators (their students in some cases)
- Stanford Tango Week history

---

**END OF PROMPT**

# Batch Research Task: Guardian Generation Milongueros

You are a tango history researcher. Create comprehensive profiles for the **Guardian Generation** — the milongueros who learned in the Golden Age and preserved authentic tango through the Decadencia (1955-1983).

## Research Subjects

| Name | Nickname/Title | Key Fact |
|------|---------------|----------|
| **El Cachafaz** | (Ovidio José Bianquet) | Legendary pre-Golden Age dancer; died dancing |
| **Ricardo Vidort** | "The Last Compadrito" | Philosopher of tango; close embrace master |
| **Pepito Avellaneda** | "The King of Milonga" | Self-taught genius; milonga specialist |
| **Pupi Castello** | — | Most flamboyant; Graciela González's mentor |
| **Gerardo Portalea** | — | Salon style master |
| **Finito** | (José Brahemcha) | "Monument of ideas in movement"; died dancing |
| **Antonio Todaro** | — | Most influential teacher of revival era |
| **Virulazo** | (Jorge Orcaizaguirre) | Tango Argentino cast; 278 pounds of footwork |
| **Orlando Paiva** | — | Milonguero style master |
| **El Turco José** | — | Co-creator of Villa Urquiza style |
| **Luis 'Milonguita' Lemos** | — | Co-creator of Villa Urquiza style |

---

## For Each Milonguero, Provide:

### 1. Biographical Data
```yaml
id: [slug]
displayName: [Name or Nickname]
fullName: [Legal name if known]
born: YYYY or circa
birthPlace: [City, Country]
died: YYYY or null
deathPlace: [City, Country] or null
personType: dancer
generation: guardian
neighborhood: [Barrio where they danced]
```

### 2. Learning & Formation
- How/when did they learn tango?
- Who taught them? (Often self-taught or learned in milongas)
- Which milongas did they frequent?
- What era did they come up in?

### 3. Dance Style
- What was distinctive about their movement?
- Close embrace? Open? Both?
- Musicality characteristics
- Signature moves or techniques
- Partners they were known for dancing with

### 4. Teaching
- Did they teach formally?
- Who were their notable students?
- Teaching philosophy (if documented)
- Where/when did they teach?

### 5. The Decadencia Years (1955-1983)
- How did they survive the military period?
- Which milongas stayed open?
- How did they keep tango alive?

### 6. Revival Era Impact (1983+)
- Were they "discovered" by foreigners?
- Did they travel internationally?
- Key workshops or festival appearances
- Documentaries/films featuring them

### 7. Quotes & Philosophy
- Direct quotes about tango
- What did they say about how tango should be danced?
- Reactions to nuevo/modern tango

---

## Specific Research Questions

### El Cachafaz (1885-1942)
- Pre-Golden Age figure — belongs to earlier generation
- "Died dancing" — verify and provide full story
- Partnership with Carmencita Calderón
- Film appearances
- Why legendary?

### Ricardo Vidort (1930-2005)
- "Philosopher of tango" — what was his philosophy?
- Close embrace style — technical description
- Teaching career — who studied with him?
- International travel
- Key quotes about tango

### Pepito Avellaneda (1926-2005)
- "Self-taught genius" — the story
- Why "King of the Milonga"?
- Milonga rhythm specialty
- Teaching approach
- Discovery by foreign dancers

### Pupi Castello (1920s-2000s)
- "Most flamboyant" — describe
- Graciela González studied with him — their relationship
- Style characteristics
- Performance history

### Finito (José Brahemcha) (1920s-2000s?)
- "Died dancing" — verify, full story
- "Monument of ideas in movement" — source?
- Style description
- Teaching?

### Antonio Todaro (1930s-1990s?)
- "Half the people you see dancing learned from him" — verify
- Teaching methodology
- Students (who became famous?)
- Where did he teach?
- Death date uncertain

### Virulazo (1926-1990)
- Tango Argentino (1983) cast member
- "Discovered in obscurity" — the story
- 278 pounds — physical description and how it affected style
- Partnership with Elvira Santamaría
- The famous slap

### El Turco José & Milonguita
- Villa Urquiza style co-creators
- What IS Villa Urquiza style?
- Their partnership/relationship
- Teaching together?
- Current status of El Turco José (still alive?)

---

## Contextual Essay

Write a 2,500-word essay: **"The Guardians: Keepers of Tango Through the Dark Years"**

Cover:
1. Who were the guardians? (Generation definition)
2. The Decadencia — why tango nearly died
3. Which milongas survived?
4. How style evolved in small spaces
5. The 1983 revival — "discovered" by outsiders
6. Transmission to Bridge Generation
7. Death of the last guardians — what was lost?

---

## Output Format

### Individual Profiles

```markdown
## Ricardo Vidort (1930-2005)

**Title:** The Last Compadrito

**Summary:** One of the most revered milongueros of the late 20th century; philosopher of close embrace tango.

### Biography
[3-4 paragraphs]

### Dance Style
[Technical and aesthetic description]

### Teaching & Legacy
[Who learned from him, how did he teach]

### Philosophy
> "Quote about tango"
> "Another quote"

### Key Students
- [List with brief notes]

### HITM Flags
- [Uncertain facts]
```

### Structured Data

```json
{
  "entities": [
    {
      "id": "ricardo-vidort",
      "type": "person",
      "displayName": "Ricardo Vidort",
      "born": "1930",
      "died": "2005",
      "personType": "dancer",
      "generation": "guardian",
      "categories": ["dancers", "guardian-generation"],
      "summary": "The Last Compadrito — philosopher of close embrace tango",
      "paperPath": "/tango-papers/people/ricardo-vidort.md"
    }
  ]
}
```

---

## Cross-References

Connect to:
- Bridge Generation teachers (their students)
- Pre-Nuevo Masters paper (existing)
- Thirty-Year Window paper (existing)
- Tango Argentino show
- Decadencia era paper

---

## Videos

Find and document notable video footage:
- Tango Argentino film appearances
- YouTube performance clips
- Documentary interviews
- Teaching videos

Verify URLs work. If uncertain, provide search terms.

---

**END OF PROMPT**

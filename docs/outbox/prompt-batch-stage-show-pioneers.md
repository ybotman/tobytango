# Batch Research Task: Stage & Show Pioneers

You are a tango history researcher. Create comprehensive profiles for the **stage and show pioneers** — the people who brought tango to theaters and international audiences.

## Research Subjects

| Name | Role | Key Contribution |
|------|------|------------------|
| **Claudio Segovia** | Director | Co-creator of "Tango Argentino" (1983) |
| **Héctor Orezzoli** | Director | Co-creator of "Tango Argentino" (1983) |
| **Virulazo** | Dancer | Tango Argentino cast; discovered in obscurity |
| **Elvira Santamaría** | Dancer | Virulazo's partner; the famous slap |
| **Miguel Ángel Zotto** | Dancer | Tango x 2 founder; Todaro/Finito student |
| **Milena Plebs** | Dancer | Zotto's partner; El Tangauta journalist |
| **Mora Godoy** | Dancer | Stage tango star; company director |
| **Pablo Pugliese** | Dancer | Youngest Stanford faculty; parents Mingo & Esther |
| **El Pulpo Esbrez** | Dancer | Investigation Group; suspension technique |
| **Horacio Salgán** | Musician | Lived to 100; duo with De Lío |

---

## For Each Person, Provide:

### 1. Biographical Data
```yaml
id: [slug]
displayName: [Name]
fullName: [Full name]
born: YYYY
died: YYYY or null
personType: [dancer|director|musician]
specialty: [stage-tango|choreography|etc.]
```

### 2. Career Path
- How did they enter tango?
- Training/teachers
- Key career milestones
- Evolution of their work

### 3. Stage Work
- Major shows/productions
- Choreographic contributions
- Companies or groups formed
- International tours

### 4. Style & Technique
- What distinguishes their stage work?
- Innovation contributions
- Signature elements

### 5. Teaching & Legacy
- Teaching career
- Students
- Ongoing influence

---

## Specific Research Questions

### Claudio Segovia & Héctor Orezzoli
- How did they come up with "Tango Argentino"?
- Background of each (theater? dance?)
- How did they find the cast?
- Paris premiere (1983) — the story
- Broadway success — Tony nominations?
- Impact on tango revival
- Later collaborations
- Deaths (when, where?)

### Virulazo (Jorge Orcaizaguirre)
- "Discovered in obscurity" — full story
- 278 pounds — how did this shape his style?
- Pre-Tango Argentino life
- The famous slap with Elvira — explain
- Style description
- Death (1990?)

### Elvira Santamaría
- Partnership with Virulazo
- The slap routine — what was it?
- Post-Virulazo career
- Current status

### Miguel Ángel Zotto
- Tango x 2 (1988) — founding story
- Studied with Todaro and Finito — what did he learn?
- "Milonguero of the stage" — explain
- Partnership with Milena Plebs
- Later partnerships
- Current status

### Milena Plebs
- Partnership with Zotto (when to when?)
- El Tangauta connection (journalist?)
- The 2009 Chicho interview — her role
- Solo career after Zotto
- Current status

### Mora Godoy
- "Stage tango star" — career highlights
- Company she directs
- Style description
- International profile
- Current status

### Pablo Pugliese
- "Youngest Stanford faculty" — verify, what year?
- Parents Mingo & Esther — their story
- Teaching career
- Current status

### El Pulpo Esbrez
- Full name (Norberto Esbrez?)
- Investigation Group involvement
- "Suspension technique" — what is this?
- Teaching career
- Current status

### Horacio Salgán
- "Lived to 100" — verify (1916-2016?)
- Duo with Ubaldo de Lío
- Maintained through Decadencia
- Compositional work
- Recognition/awards

---

## Contextual Essay

Write a 2,000-word essay: **"Tango Takes the Stage: From Milonga to Theater"**

Cover:
1. Pre-1983 stage tango (Copes/Nieves, etc.)
2. The "Tango Argentino" revolution (1983)
3. Finding the cast — discovering milongueros
4. What changed when tango went to theater?
5. The choreographic tradition (Zotto, etc.)
6. Contemporary stage tango companies
7. Tension: stage vs. social tango authenticity

---

## The Tango Argentino Story

Give special attention to:
- The 1983 production
- Paris premiere circumstances
- Broadway transfer
- Full cast list (who was in it?)
- Reviews and reception
- Revival productions
- Impact on Argentine tourism

---

## Output Format

### Individual Profiles

```markdown
## Claudio Segovia (dates)

**Role:** Director/creator

**Summary:** Co-creator of "Tango Argentino" (1983); sparked global tango revival.

### Biography
[3-4 paragraphs]

### Tango Argentino
[The production story]

### Later Work
[Other productions]

### Legacy
[Impact on tango]

### HITM Flags
- [Uncertain facts]
```

### Structured Data

```json
{
  "entities": [
    {
      "id": "claudio-segovia",
      "type": "person",
      "displayName": "Claudio Segovia",
      "born": "1938",
      "died": "2011",
      "personType": "director",
      "categories": ["stage-tango", "directors"],
      "summary": "Co-creator of Tango Argentino (1983)",
      "paperPath": "/tango-papers/people/claudio-segovia.md"
    }
  ]
}
```

---

## Cross-References

Connect to:
- Tango Argentino event paper
- Guardian generation (performers discovered)
- Nuevo Innovators (Zotto's influence on later dancers)
- Stage tango timeline era

---

**END OF PROMPT**

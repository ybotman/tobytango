# Research Request: Tango Glossary & Index Entries

## Purpose
Building an Index/Glossary page for tobytango.com that serves as a quick-reference lookup for all tango terminology, people, orchestras, venues, and styles. This will be the "Wikipedia sidebar" of the site - hover for quick definition, click for full article (when available).

## Output Format Required

Return a JSON array of entities in this exact structure:

```json
{
  "entities": [
    {
      "id": "kebab-case-id",
      "type": "term|person|orchestra|venue|style|event",
      "displayName": "Display Name",
      "spanish": "Spanish term if applicable",
      "aliases": ["other names", "abbreviations"],
      "summary": "One-line definition (50-100 chars) for hover tooltip",
      "definition": "2-3 sentence fuller explanation for the glossary page",
      "categories": ["relevant-categories"],
      "relatedTerms": ["ids-of-related-entries"],
      "status": "stub|complete"
    }
  ]
}
```

---

## Section 1: Tango Terms (Priority: HIGH)

Need ~60-80 essential tango terms. Group by category:

### A. Dance Terminology
- Basic movements: caminata, ocho, giro, molinete, cruzada, salida, resolucion
- Embellishments: adornos, boleos, ganchos, sacadas, barridas, lustradas
- Connection: abrazo, eje, disociación, marca, lapiz
- Navigation: ronda, line of dance, floorcraft

### B. Milonga Culture
- Social codes: cabeceo, mirada, codigos
- Event structure: tanda, cortina, milonga (event), practica
- Roles: líder, seguidor/a, tanguero/a, milonguero/a

### C. Music Terms
- Rhythm: compás, síncopa, traspié
- Structure: tango, vals, milonga (rhythm)
- Orchestra terms: orquesta típica, cantor/a, estribillista

### D. Historical Terms
- Eras: guardia vieja, época de oro, renacimiento
- Social context: conventillo, compadrito, arrabal, lunfardo

---

## Section 2: Orchestras (Priority: HIGH)

### The Big Four (detailed entries)
- Juan D'Arienzo
- Carlos Di Sarli
- Aníbal Troilo
- Osvaldo Pugliese

### Golden Age Orchestras (~20 more)
- Francisco Canaro, Rodolfo Biagi, Alfredo De Angelis, Miguel Caló
- Ricardo Tanturi, Enrique Rodríguez, Edgardo Donato, Angel D'Agostino
- Pedro Laurenz, Lucio Demare, Domingo Federico, Francini-Pontier
- Osvaldo Fresedo, Julio De Caro, Roberto Firpo
- And others significant for dancers

For each orchestra include:
- Leader name, active years
- Signature characteristics (beat, mood, complexity)
- Notable singers
- Why dancers love/use them

---

## Section 3: Key Singers (Priority: MEDIUM)

Golden age vocalists:
- Alberto Echagüe, Alberto Marino, Alberto Podestá
- Angel Vargas, Roberto Rufino, Floreal Ruiz
- Francisco Fiorentino, Jorge Casal, Raúl Berón
- etc.

For each: name, primary orchestra(s), signature songs, voice style

---

## Section 4: Historic Venues (Priority: MEDIUM)

Buenos Aires milongas - historic and current:
- Club Sin Rumbo, Club Sunderland (already have)
- Salon Canning, La Viruta, El Beso (already have)
- Confitería Ideal, Lo de Celia, Niño Bien
- Historical: Hansen's, Lo de Laura, Palais de Glace

For each: name, neighborhood, era, significance, current status

---

## Section 5: Styles (Priority: MEDIUM)

Expand on existing style entries:
- Milonguero/Apilado (have basic)
- Villa Urquiza/Salon (have basic)
- Nuevo
- Fantasia/Stage
- Canyengue
- Orillero

For each: description, key characteristics, historical context, notable practitioners

---

## Notes for Research LLM

1. **Accuracy over volume** - Better to have 50 accurate terms than 100 questionable ones

2. **Dancer perspective** - This site is for social dancers, not academics. Emphasize practical understanding.

3. **Summary field is critical** - This appears on hover, must be punchy and clear (50-100 chars max)

4. **Definition field** - Fuller explanation but still concise (2-3 sentences)

5. **Cross-reference with relatedTerms** - Link concepts together (e.g., "cabeceo" relates to "mirada", "codigos")

6. **Use kebab-case for IDs** - e.g., "orquesta-tipica", "juan-darienzo", "villa-urquiza-style"

---

## Existing Entities (Don't Duplicate)

Already in master-index.json:
- tete-rusconi, ricardo-vidort, pepito-avellaneda, pupi-castello
- gerardo-portalea, finito, el-turco-jose, graciela-gonzalez
- silvia-ceriani, carlos-perez-rosa-forte
- sin-rumbo, sunderland, el-beso
- villa-urquiza, milonguero-style

---

## Verification Checklist (Please Include)

For each entry, self-assess confidence level:

| Confidence | Meaning | Action |
|------------|---------|--------|
| `verified` | Multiple reliable sources confirm | Ready to publish |
| `likely` | Strong evidence but not primary-sourced | Flag for HITM review |
| `uncertain` | Conflicting info or single source | Needs expert verification |

**Include a `confidence` field in each entity.**

Also provide a verification summary at the end:

```json
{
  "verificationSummary": {
    "verified": 45,
    "likely": 12,
    "uncertain": 3,
    "flaggedForReview": [
      { "id": "entry-id", "reason": "Conflicting birth dates in sources" },
      { "id": "entry-id", "reason": "Unable to confirm full name spelling" }
    ]
  }
}
```

**Common verification concerns:**
- Birth/death dates (especially pre-1920)
- Full legal names vs stage names
- Exact years orchestras were active
- Which singers worked with which orchestras when
- Venue addresses and opening dates

When in doubt, use the `uncertain` confidence and we'll route to HITM network for expert verification.

---

## Deliverable

Return the complete JSON that can be merged into master-index.json, organized by type sections for easy review.

Include the verification summary at the end.

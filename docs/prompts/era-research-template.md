# Era Research Prompt Template

Copy this template and fill in the bracketed sections for each era you're researching.

---

## PROMPT START

```
# Tango History Research Task: [ERA_NAME]

You are a tango history researcher. Your task is to write a comprehensive white paper on a specific era in tango history.

## Era Being Researched

- **Era Name:** [Era Display Name]
- **Category:** [argentina|europe|usa|orchestras|dancers|events]
- **Years:** [start_year]–[end_year]

## What We Already Know

[PASTE ANY EXISTING CONTENT OR NOTES ABOUT THIS ERA]

## Research Scope

[DESCRIBE WHAT ASPECTS TO COVER - people, events, cultural context, etc.]

---

## Your Research Tasks

1. **VERIFY** existing content against authoritative sources
2. **IDENTIFY** gaps in coverage
3. **RESEARCH** to fill those gaps
4. **WRITE** a comprehensive white paper

---

## Cross-References to Include

This era connects to other parts of the tango timeline. Note connections inline with markers like:
- `[Cross-Reference → Orchestras: D'Arienzo's role]`
- `[Cross-Reference → Dancers: Guardian Generation learning during this period]`
- `[Cross-Reference → Argentina: Meanwhile in Buenos Aires...]`

---

## Output Requirements

1. **Length:** Comprehensive (6,000–12,000 words)
2. **Dates:** Include specific dates wherever possible (day/month/year for major events)
3. **Names:** Full names with nicknames, birth-death years where known
4. **Structure:** Clear markdown headers for navigation
5. **Tone:** Authoritative but accessible
6. **Spanish terms:** Include with English translations

---

## Handling Gaps

Where specific dates or facts aren't verifiable through available sources, flag them clearly:

`[HITM REVIEW NEEDED: exact date of X is uncertain — sources give 1942 or 1943]`

This signals that human expert verification is needed.

---

## Delivery Format

**White paper only.** Provide a comprehensive markdown document.

Structure your paper with clear sections:
- Overview / Introduction
- Timeline of key events
- Key figures (with profiles)
- Cultural / political context
- Musical developments (if relevant)
- Dance evolution (if relevant)
- Legacy and significance
- Sources consulted

Include cross-reference markers inline where connections exist.
Flag uncertain facts with `[HITM REVIEW NEEDED]`.

---

**END OF PROMPT**
```

## PROMPT END

---

## Usage Notes

1. **One era at a time** — Don't try to research multiple eras in one prompt
2. **Provide context** — Share what you already know to avoid redundant research
3. **Be specific** — If you know gaps exist, mention them
4. **Verify output** — Research LLMs can hallucinate; flag questionable claims for HITM review
5. **Iterate** — If output is incomplete, ask for specific sections to be expanded

---

## Quick Reference: Era IDs

### Argentina
- guardia-vieja, guardia-nueva, epoca-de-oro, decadencia, renacimiento, investigacion, nuevo-peak, neo-traditional

### Dancers
- guardian-generation, bridge-generation, nuevo-innovators, stage-pioneers

### Europe
- first-tangomania, interwar, disconnect, piazzolla-europe, paris-explosion, first-communities, german-nordic, film-legitimacy, festival-era, maturation

### USA
- early-usa, ballroom-era, broadway-impact, american-growth, american-present

### Orchestras
- early-orchestras, golden-orchestras, post-golden, revival-orchestras

---

## Division of Labor

| Research LLM | Sage (Claude Code) |
|--------------|-------------------|
| White paper content | JS code updates |
| Entity information (names, dates, roles) | JSON index updates |
| Cross-reference suggestions | File placement |
| Source citations | Build verification |
| Flagged gaps for HITM | |

The Research LLM doesn't have access to the codebase. Sage handles all code integration after receiving the white paper.

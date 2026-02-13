# Era Research Prompt Template

Copy this template and fill in the bracketed sections for each era you're processing.

---

## PROMPT START

```
# Tango History Research Task: [ERA_NAME]

You are a tango history researcher. Your task is to analyze the current state of documentation for a specific era in our Tango History Timeline and produce a structured RECOMMENDATIONS document.

## Era Being Processed

- **Era ID:** [era-id]
- **Era Name:** [Era Display Name]
- **Category:** [argentina|europe|usa|orchestras|dancers|events]
- **Years:** [start_year]–[end_year]
- **Current Status:** [placeholder|partial|populated]

## Current State

### Current Summary (from tangoTimelineData.js)
```json
[PASTE THE ERA OBJECT FROM tangoTimelineData.js]
```

### Existing Paper Content
```markdown
[PASTE CONTENTS OF EXISTING .md PAPER IF ANY, OR "None yet"]
```

### Related Index Entries
```json
[PASTE ANY EXISTING INDEX ENTRIES RELATED TO THIS ERA]
```

### What Other Eras Reference This One
[LIST ANY CROSS-REFERENCES FROM OTHER ERAS]

---

## Your Research Tasks

### 1. VERIFY existing content
- Check dates against authoritative sources
- Verify name spellings
- Confirm relationships and associations
- Note any errors found

### 2. IDENTIFY gaps
- Missing key figures (dancers, musicians, teachers)
- Missing venues important to this era
- Missing events or milestones
- Missing cultural/political context
- Missing cross-references to other timeline categories

### 3. RESEARCH to fill gaps
- Search authoritative tango history sources
- Cross-reference multiple sources when possible
- Note confidence level for each finding
- Capture source URLs for citations

### 4. PRODUCE structured output
- Follow the exact output format below
- Be specific and actionable
- Include all information needed for implementation

---

## Context: Cross-Reference Requirements

This era should reference (where relevant):

**From ARGENTINA timeline:**
- Previous era: [previous-era-id]
- Next era: [next-era-id]

**From DANCERS timeline:**
- Which dancer generations were active/learning during this era?

**From ORCHESTRAS timeline:**
- Which orchestras were active during this era?

**From EUROPE timeline:**
- What was happening in European tango during this era?

**From USA timeline:**
- What was happening in American tango during this era?

**From EVENTS timeline:**
- Which key events fall within this era's dates?

---

## Output Format

Produce your response in this EXACT format:

---

# Recommendations: [Era Name] ([era-id])

## Status Assessment
- **Current Status:** [placeholder|partial|populated]
- **Recommended Status:** [partial|populated]
- **Completeness:** [X]% (estimate)

## Research Summary
[2-3 paragraphs summarizing what you found and the significance of this era]

---

## NEW ENTITIES TO ADD TO INDEX

### People
| ID | Display Name | Full Name | Born | Died | Role | Summary | Source URL |
|----|--------------|-----------|------|------|------|---------|------------|
| example-id | Example Name | Full Legal Name | YYYY | YYYY | dancer/musician/teacher | Brief description | https://... |

### Couples
| ID | Partner 1 | Partner 2 | Active Years | Style | Summary | Source URL |
|----|-----------|-----------|--------------|-------|---------|------------|

### Orchestras
| ID | Name | Leader | Active Years | Style | Summary | Source URL |
|----|------|--------|--------------|-------|---------|------------|

### Venues
| ID | Name | Barrio | Type | Active Years | Summary | Source URL |
|----|------|--------|------|--------------|---------|------------|

### Terms/Glossary
| ID | Term (Spanish) | Term (English) | Definition | Source URL |
|----|----------------|----------------|------------|------------|

---

## UPDATES TO tangoTimelineData.js

### Updated Summary Array
Replace current summary with:
```javascript
summary: [
  "Point 1...",
  "Point 2...",
  "Point 3...",
  "Point 4..."
]
```

### Updated Key Figures Array
Replace/merge with current keyFigures:
```javascript
keyFigures: [
  { name: "Name", type: "individual|couple", role: "description" },
  // ... more
]
```

### Other Field Updates
```javascript
// Any other fields to update
status: "partial|populated",
paperPath: "/tango-papers/[category]/[era-id].md"
```

---

## PAPER CONTENT

### If creating new paper:
**File path:** `/public/tango-papers/[category]/[era-id].md`

```markdown
# [Era Title]

## Overview
[Introduction paragraph]

## Timeline
[Key dates and events]

## Key Figures
[Profiles of important people]

## Cultural Context
[What was happening in society]

## Musical Context
[What was happening in tango music]

## Dance Evolution
[How the dance changed during this period]

## Legacy
[Why this era matters]

## Cross-References
- See also: [links to other categories]

## Sources
- [source 1]
- [source 2]
```

### If appending to existing paper:
**File path:** [existing path]
**Append after section:** [section name]

```markdown
[New content to append]
```

---

## CROSS-REFERENCES TO CREATE

### This era should link TO:
| Target Category | Target Era/Entity | Reason |
|-----------------|-------------------|--------|
| orchestras | [orchestra-id] | "Active during this period" |
| dancers | [generation-id] | "Learned during this era" |

### Other content should link TO this era:
| Source Location | Suggested Link Text |
|-----------------|---------------------|
| /tango-history/europe#[era] | "Meanwhile in Argentina..." |

---

## CORRECTIONS NEEDED

### Factual Errors
| Location | Current | Corrected | Source |
|----------|---------|-----------|--------|

### Date Corrections
| Entity/Event | Current Date | Corrected Date | Source |
|--------------|--------------|----------------|--------|

### Spelling/Name Corrections
| Current | Corrected | Source |
|---------|-----------|--------|

---

## CONFIDENCE ASSESSMENT

### High Confidence (multiple sources agree)
- [item 1]
- [item 2]

### Medium Confidence (single reliable source)
- [item 1]

### Low Confidence (sources conflict or uncertain)
- [item 1] — Note: [explanation of conflict]

---

## SOURCES CONSULTED

1. **[Source Name]** - [URL] - [what it provided]
2. **[Source Name]** - [URL] - [what it provided]

### Recommended Additional Sources
- [sources that would help but weren't accessible]

---

## IMPLEMENTATION CHECKLIST

For Claude Code to execute:

- [ ] Update `src/app/data/tangoTimelineData.js`
  - [ ] Update era summary
  - [ ] Update keyFigures
  - [ ] Update status
  - [ ] Update paperPath
- [ ] Create/update paper: `public/tango-papers/[category]/[era-id].md`
- [ ] Update `public/tango-papers/index/master-index.json`
  - [ ] Add [X] new people entries
  - [ ] Add [X] new venue entries
  - [ ] Add [X] new term entries
- [ ] Verify cross-references resolve

---

**END OF RECOMMENDATIONS**
```

## PROMPT END

---

## Usage Notes

1. **One era at a time** - Don't try to process multiple eras in one prompt
2. **Provide current state** - The more context you give, the better the output
3. **Specify gaps you know about** - If you know something is missing, mention it
4. **Check the output** - Research LLMs can hallucinate; verify key facts
5. **Iterate if needed** - If output is incomplete, ask for specific sections to be expanded

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

### Events
- (individual event IDs from tangoTimelineData.js)

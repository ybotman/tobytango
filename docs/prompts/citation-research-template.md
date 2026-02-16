# Citation Research Prompt Template

Use this template to have the Research LLM find and verify citations for existing papers.

---

## PROMPT START

```
# Citation Research Task

You are a research assistant specializing in source verification. Your task is to find authoritative citations for claims in an existing tango history paper.

## Paper to Cite

**Title:** [PAPER_TITLE]
**Path:** [PAPER_PATH]

---

## Paper Content

[PASTE THE FULL PAPER CONTENT HERE]

---

## Your Research Tasks

### 1. Identify Citable Claims

Scan the paper and identify every claim that should have a citation. These include:

- **Dates** (births, deaths, events, recordings, performances)
- **Numbers** (attendance figures, sales figures, counts)
- **Quotes** (attributed statements from individuals)
- **Historical facts** (who did what, when, where)
- **Attributions** (when X wrote/said/argued Y)

### 2. Research Each Claim

For each citable claim, search for:
- Primary sources (original documents, recordings, newspapers)
- Secondary sources (books, academic papers, documentaries)
- Tertiary sources (encyclopedias, established tango websites)

### 3. Rank Source Quality

Use this hierarchy:
1. **Primary** — Contemporary newspapers, recordings, photographs, official documents
2. **Academic** — Peer-reviewed papers, university press books, dissertations
3. **Established Reference** — Todo Tango, UNESCO filings, major biographies
4. **Specialist Community** — tejastango.com, tangoandchaos.org, Tango Voice blog
5. **General Reference** — Wikipedia (as starting point only), news articles

---

## Output Format

Return a structured citation document with these sections:

### A. Citation List

For each citable claim, provide:

```markdown
#### Claim: [Quote the exact claim from the paper]

**Location in paper:** [Section header or approximate location]

**Sources found:**

1. **[Source Title]**
   - Type: [Primary/Academic/Reference/Community/General]
   - Author: [Name] (if applicable)
   - Publication: [Publisher/Journal/Website]
   - Date: [Publication date]
   - URL: [Full URL if web source]
   - Relevant excerpt: "[Quote the supporting text]"
   - Confidence: [High/Medium/Low]

2. **[Additional source if available]**
   ...

**Verification status:** [Verified/Partially verified/Unable to verify/Conflicting sources]

**Notes:** [Any caveats, conflicts between sources, or context]
```

### B. Summary Statistics

```markdown
## Citation Summary

- Total citable claims identified: [N]
- Claims fully verified: [N]
- Claims partially verified: [N]
- Claims unable to verify: [N]
- Claims with conflicting sources: [N]

### By source type:
- Primary sources found: [N]
- Academic sources found: [N]
- Reference sources found: [N]
- Community sources found: [N]
```

### C. Recommended Sources Section

Provide a formatted Sources section ready to append to the paper:

```markdown
## Sources

### Primary Sources
- [Source 1]
- [Source 2]

### Books & Academic Works
- [Source 1]
- [Source 2]

### Web References
- [Site Name]. "[Article Title]." [URL]. Accessed [Date].
```

### D. Flags for HITM Review

List any claims that:
- Could not be verified
- Have conflicting sources
- Appear to be commonly repeated but unsubstantiated
- Require expert judgment

```markdown
## HITM Review Needed

1. **Claim:** [claim text]
   **Issue:** [why it needs human review]
   **Sources checked:** [what you searched]

2. ...
```

---

## Special Instructions

### Web Search Strategy

For each claim, try multiple search approaches:
- Exact quote search: `"exact phrase from claim"`
- Entity + fact: `[person name] [key fact]`
- Date + event: `[year] [event description]`
- Spanish language: Search in Spanish for Argentine sources

### Handling Common Tango Sources

**These are generally reliable:**
- todotango.com — Argentine tango encyclopedia, interviews, recordings
- tejastango.com (Stephen Brown) — Historical analysis, music research
- Carolyn Merritt's academic work — Ethnographic research
- Daniel Trenner interviews — Primary source (filmed conversations)
- UNESCO ICH documentation — Official heritage filings

**These need verification:**
- Wikipedia — Use only as starting point, follow cited sources
- Generic tango blogs — May repeat unverified claims
- Social media posts — Not citable unless from named expert

### For Dates

- Cross-reference birth/death dates against multiple sources
- Note discrepancies (some sources give different years)
- Prefer official records over secondary sources

### For Quotes

- Find the original publication/interview
- Note if quote is paraphrased vs. exact
- Include original language if translated

---

## Delivery

Return a single markdown document with all sections above.

**Do not modify the original paper content.** Your job is research, not editing.

Sage will integrate citations into the paper based on your findings.

---

**END OF PROMPT**
```

## PROMPT END

---

## Usage Notes

1. **One paper at a time** — Large papers may need to be split
2. **Paste full content** — Research LLM needs context to understand claims
3. **Prioritize if needed** — For very long papers, note which sections are highest priority
4. **Iterate** — If first pass misses claims, do a follow-up prompt for specific sections

---

## Quick Reference: Papers Needing Citations

### High Priority (complex papers with many claims)
- `/public/tango-papers/argentina/nuevo-to-neotrad.md`
- `/public/tango-papers/dancers/generations/thirty-year-window.md`
- `/public/tango-papers/argentina/epoca-de-oro.md`

### Medium Priority
- `/public/tango-papers/dancers/stage-pioneers.md`
- `/public/tango-papers/dancers/nuevo-innovators.md`
- `/public/tango-papers/europe/paris-tango.md`

### Lower Priority (shorter papers)
- Event papers in `/public/tango-papers/events/`

---

## Integration Workflow

After Research LLM returns citation data:

1. **Sage reviews** the citation list
2. **Sage adds Sources section** to the paper
3. **Sage flags** HITM review items for El Gotan
4. **HITM network** verifies flagged items
5. **Paper marked** as `cited: true` in metadata (future feature)

---

## Example: Partial Citation Request

If you only need citations for specific claims:

```
# Citation Research Task (Focused)

## Paper: nuevo-to-neotrad.md

## Claims Needing Citation

Please find sources for these specific claims:

1. "By 2006, more than 40 tango festivals operated in North America alone"
2. "Gotan Project's La Revancha del Tango (2001) sold over one million copies"
3. "Tete Rusconi... died January 7, 2010, two days before his 74th birthday"
4. "Practica X had closed by September 2011"

[Follow standard output format above]
```

This is faster when you already know which claims need verification.

# Person Research Prompt Template

Use this template to generate research prompts for individual tango figure profiles.

---

## PROMPT START

```
# Person Profile Research Task: [PERSON_NAME]

You are a tango history researcher. Your task is to create a comprehensive profile for an individual tango figure.

## Person Being Researched

- **Name:** [Full name with nickname]
- **Slug:** [url-slug]
- **Type:** [dancer|musician|teacher|organizer|composer|singer]
- **Status:** [active|historical|deceased]

## What We Already Know

[PASTE ANY EXISTING INFORMATION ABOUT THIS PERSON FROM OTHER PAPERS]

## Research Scope

Create a complete profile covering:
1. **Biography** — Birth, death (if applicable), key life events
2. **Career** — Major milestones, partnerships, achievements
3. **Style/Contribution** — What distinguishes them, their impact
4. **Quotes** — Notable statements they made (with sources)
5. **Media** — Notable videos, recordings, films
6. **Legacy** — Ongoing influence, students, successors

---

## Output Format

Provide a complete Markdown profile following this structure:

### Frontmatter (YAML)

```yaml
---
id: [slug]
name: [Full Name with "Nickname"]
type: [dancer|musician|teacher|organizer|composer|singer]
status: [active|historical|deceased]
born: [YYYY or YYYY-MM-DD]
birthPlace: [City, Country]
died: [YYYY or YYYY-MM-DD or null]
deathPlace: [City, Country or null]
image: null
tags: [tag1, tag2, tag3]
eras: [era-id-1, era-id-2]
partners: [partner-slug-1, partner-slug-2]
featured: [true if currently active and notable, else false]
lastUpdated: [today's date YYYY-MM-DD]
---
```

### Profile Body

```markdown
# [Full Name]

[2-3 sentence summary: who they are, why they matter]

## Biography

[Detailed biography in narrative form. Include birth, early life, how they came to tango, key life events, death if applicable. Aim for 300-500 words.]

## Career Highlights

[Key achievements, partnerships, shows, recordings, milestones. Use a mix of narrative and bullet points.]

- **[Year]**: [Achievement]
- **[Year]**: [Achievement]

## Style & Philosophy

[What distinguishes their dancing/music/teaching. Quote them directly where possible. 200-300 words.]

## Notable Quotes

> "[Quote]"
> — [Source, Year]

> "[Quote]"
> — [Source, Year]

## Videos

| Title | Year | Partner/Context | Link |
|-------|------|-----------------|------|
| [Title] | [Year] | [Partner or event] | [YouTube](url) |

## Recordings (if musician)

| Title | Orchestra | Year | Notes |
|-------|-----------|------|-------|
| [Song] | [Orchestra] | [Year] | [Notes] |

## Links

- [Official Website](url) (if exists)
- [Instagram](url) (if active)
- [Todo Tango Profile](url) (if exists)
- [Wikipedia](url) (if exists)

## Cross-References

Link to related papers and people:
- [Related Era Paper](/tango-papers/category/era.md)
- [Related Person](/people/person-slug)

## HITM Review Flags

List any facts that need human verification:
- **[Claim]**: [Why it's uncertain, conflicting sources]

---

**Note**: This content was developed with AI assistance and should be verified against primary sources.
```

---

## Research Guidelines

### For Dates
- Verify birth/death dates against multiple sources
- Note discrepancies in HITM flags
- Prefer official records over secondary sources

### For Quotes
- Find original source (interview, article, documentary)
- Note original language if translated
- Include publication name and date

### For Videos
- Prioritize high-quality performances
- Include partner name and event/venue
- Verify YouTube links are active (or note "search terms" if URL uncertain)

### For Career Facts
- Cross-reference with known events (Tango Argentino 1983, CITA festivals, etc.)
- Note show/tour names
- Include teaching locations if relevant

### Source Priority
1. **Primary** — Interviews, documentaries, their own writings
2. **Academic** — Dissertations, books (Carolyn Merritt, Christine Denniston)
3. **Established Reference** — Todo Tango, UNESCO documentation
4. **Community** — tejastango.com, tangoandchaos.org, reputable blogs
5. **General** — Wikipedia (verify cited sources)

---

## Era IDs Reference

Use these IDs in the `eras` frontmatter field:

### Argentina
- `guardia-vieja`, `guardia-nueva`, `epoca-de-oro`, `decadencia`, `renacimiento`, `investigacion`, `nuevo-peak`, `neo-traditional`

### Dancers Generations
- `guardian-generation`, `bridge-generation`, `nuevo-innovators`, `stage-pioneers`

### Orchestras
- `early-orchestras`, `golden-orchestras`, `post-golden`, `revival-orchestras`

---

## Type-Specific Sections

### For Dancers
- Include: Style, Partners, Notable performances, Teaching
- Videos: Performance clips, teaching demos

### For Musicians (Orchestra Leaders)
- Include: Orchestra history, Key recordings, Singers who worked with them
- Recordings table instead of Videos table

### For Singers
- Include: Orchestras they sang with, Signature songs
- Recordings table

### For Composers
- Include: Major compositions, Influence on dance
- Recordings table

### For Teachers
- Include: Teaching method, Where they teach, Notable students
- Videos: Teaching clips, interviews

### For Organizers
- Include: Events they organize/organized, Philosophy, Impact
- Less emphasis on videos

---

## Index Entry

Also provide a JSON entry for `master-index.json`:

```json
{
  "id": "[slug]",
  "type": "person",
  "displayName": "[Display Name]",
  "fullName": "[Full Legal Name]",
  "born": "[YYYY or YYYY-MM-DD]",
  "died": "[YYYY or YYYY-MM-DD or null]",
  "status": "[active|historical|deceased]",
  "personType": "[dancer|musician|teacher|organizer|composer|singer]",
  "tags": ["tag1", "tag2"],
  "eras": ["era-id-1", "era-id-2"],
  "summary": "[One sentence summary]",
  "paperPath": "/tango-papers/people/[slug].md",
  "appearsIn": [
    "/tango-papers/[category]/[paper].md"
  ]
}
```

---

**END OF PROMPT**
```

## PROMPT END

---

## Usage Notes

1. **One person at a time** — Each prompt generates one profile
2. **Include existing context** — Paste any mentions from existing papers
3. **Prioritize by queue** — Work through `people-queue.json` in priority order
4. **Verify outputs** — Research LLMs can hallucinate; flag questionable claims
5. **Update queue** — Mark status as `completed` after processing

---

## Quick Start

To research the next person in the queue:

1. Open `/docs/queues/people-queue.json`
2. Find the highest-priority `pending` item
3. Copy this template
4. Fill in the `[PERSON_NAME]` and known information
5. Send to Research LLM
6. Save response to `/docs/inbox/`
7. Process into `/public/tango-papers/people/[slug].md`
8. Update queue status to `completed`

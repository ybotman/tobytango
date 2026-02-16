# Tango Person Research Task

You are a tango history researcher with web search access. Your task is to create a comprehensive profile for a specific individual in the tango world.

## Important Instructions

1. **Search the web thoroughly** for biographical information, interviews, videos, and social media
2. **Verify all YouTube links** are active and working before including them
3. **Find primary sources** — interviews, documentaries, their own statements
4. **Note uncertainty** — if you cannot verify a fact, flag it in the HITM Review section
5. **Output exactly the format specified** — YAML frontmatter + Markdown body

---

## Person to Research

- **Name:** Giselle Anne
- **Slug:** giselle-anne
- **Type:** dancer
- **Generation:** nuevo
- **Status:** active
- **Nationality:** Argentine
- **Known Tags:** nuevo, boulder, teacher
- **Current Summary:** Naveira
- **Research Notes:** Naveira's partner, nuevo pioneer, Boulder-based

---

## Research Checklist

Please verify and research the following:

- [ ] **Birth/death dates** — verify against multiple sources
- [ ] **Birthplace** — city and country
- [ ] **Current status** — active (still performing/teaching), retired, or deceased
- [ ] **Career timeline** — major milestones with years
- [ ] **Partners** — dance partners, musical collaborators (with dates if possible)
- [ ] **5-8 YouTube videos** — verify each link works, note title/year/partner/event
- [ ] **At least 3 quotes** — from interviews, articles, or documentaries with sources
- [ ] **Social media/website links** — verify current and active
- [ ] **Cross-references** — which other figures are they connected to

---

## Output Format

Your response must follow this EXACT structure:

### Part 1: YAML Frontmatter

```yaml
---
id: {slug}
name: "{Full Name with Nickname}"
type: {dancer|musician|teacher|organizer|composer|singer}
status: {active|historical|deceased}
born: {YYYY or YYYY-MM-DD}
birthPlace: "{City, Country}"
died: {YYYY or YYYY-MM-DD or null}
deathPlace: "{City, Country}" # or null
image: null
tags: [{tag1}, {tag2}, {tag3}]
eras: [{era-id-1}, {era-id-2}]
partners: [{partner-slug-1}, {partner-slug-2}]
featured: {true|false}
lastUpdated: {YYYY-MM-DD}
---
```

### Part 2: Profile Body

```markdown
# {Full Name}

{2-3 sentence summary: who they are, why they matter to tango history}

---

## Biography

{300-500 word narrative biography. Include: birth, early life, how they came to tango, key life events, current situation or death.}

---

## Career Highlights

| Year | Milestone |
|------|-----------|
| {YYYY} | {Achievement or event} |
| {YYYY} | {Achievement or event} |

### Partnerships Timeline (for dancers)

- **{Partner Name}** ({years}): {Brief description of the partnership}

### Orchestra/Ensemble (for musicians)

{Relevant details about their musical career}

---

## Style & Philosophy

{200-300 words about what distinguishes their style, approach, or teaching. Include direct quotes where possible.}

---

## Notable Quotes

> "{Exact quote}"
> — {Source, Year}

> "{Exact quote}"
> — {Source, Year}

> "{Exact quote}"
> — {Source, Year}

---

## Videos

| # | Title | Partner | Event / Venue | Year | Song / Orchestra | Views | URL |
|---|-------|---------|---------------|------|------------------|-------|-----|
| 1 | {Title} | {Partner name or N/A} | {Event or venue} | {YYYY} | {Song — Orchestra} | {XXK} | [Watch]({url}) |

{Include 5-8 videos. For musicians, use Recordings table instead.}

All links verified active as of {current date}.

---

## Recordings (for musicians only)

| Title | Orchestra | Year | Singer | Notes |
|-------|-----------|------|--------|-------|
| {Song title} | {Orchestra} | {YYYY} | {Singer or Instrumental} | {Notes} |

---

## Links

| Resource | URL |
|----------|-----|
| {Official Website} | [{display}]({url}) |
| {Instagram} | [{handle}]({url}) |
| {Wikipedia} | [{link}]({url}) |
| {Todo Tango} | [{link}]({url}) |
| {Other relevant} | [{link}]({url}) |

**Not found:** {List any expected links that don't exist, e.g., "No official website. No Todo Tango profile."}

---

## Cross-References

This person appears in or is related to:

- [{Related Era/Paper Title}](/tango-papers/{category}/{paper}.md) — {context}
- [{Related Person}](/people/{slug}) — {relationship}

---

## HITM Review Flags

These facts need human verification:

- **{Claim}**: {Why it's uncertain — conflicting sources, unverified, etc.}
- **{Claim}**: {Reason for flag}

---

*Generated with AI assistance. Human review pending.*
```

---

## Part 3: Index Entry

After the profile, provide a JSON entry for the master index:

```json
{
  "id": "{slug}",
  "type": "person",
  "displayName": "{Display Name}",
  "fullName": "{Full Legal Name}",
  "born": "{YYYY or YYYY-MM-DD}",
  "died": "{YYYY or YYYY-MM-DD or null}",
  "status": "{active|historical|deceased}",
  "personType": "{dancer|musician|teacher|organizer|composer|singer}",
  "tags": ["{tag1}", "{tag2}"],
  "eras": ["{era-id-1}", "{era-id-2}"],
  "summary": "{One sentence summary}",
  "paperPath": "/tango-papers/people/{slug}.md",
  "appearsIn": [
    "/tango-papers/{category}/{paper}.md"
  ]
}
```

---

## Era IDs Reference

Use these IDs in the `eras` frontmatter field:

### Argentina Timeline
- `guardia-vieja` (1880-1917)
- `guardia-nueva` (1917-1935)
- `epoca-de-oro` (1935-1955)
- `decadencia` (1955-1983)
- `renacimiento` (1983-1990)
- `investigacion` (1990-1998)
- `nuevo-peak` (1998-2008)
- `neo-traditional` (2008-present)

### Dancer Generations
- `guardian-generation` (dancers born ~1910-1930)
- `bridge-generation` (dancers born ~1930-1950)
- `stage-pioneers` (dancers born ~1930-1965)
- `nuevo-innovators` (dancers born ~1960-1975)

### Orchestra Eras
- `early-orchestras` (1900-1935)
- `golden-orchestras` (1935-1955)
- `post-golden` (1955-1985)
- `revival-orchestras` (1985-present)

---

## Source Priority

When researching, prioritize sources in this order:

1. **Primary** — Their own interviews, documentaries, writings
2. **Academic** — Dissertations, books (Carolyn Merritt, Christine Denniston, Robert Farris Thompson)
3. **Established Reference** — Todo Tango, UNESCO documentation
4. **Community** — tejastango.com, tangoandchaos.org, reputable blogs
5. **General** — Wikipedia (but verify cited sources)

---

## Type-Specific Guidance

### For Dancers
- Emphasize: Style description, partners timeline, notable performances, teaching
- Videos: Performance clips preferred over teaching demos (but include both)

### For Musicians (Orchestra Leaders)
- Emphasize: Orchestra history, signature sound, key recordings, singers who worked with them
- Use Recordings table, not Videos

### For Singers
- Emphasize: Orchestras they sang with, signature songs, vocal style
- Use Recordings table

### For Composers
- Emphasize: Major compositions, influence on dance, musical innovations
- Include Recordings table showing their works performed by various artists

### For Teachers
- Emphasize: Teaching method, locations, notable students, pedagogical contributions
- Videos: Teaching clips and interviews more relevant than performances

### For Organizers
- Emphasize: Events they organize/organized, philosophy, community impact
- Less emphasis on videos unless they also perform

---

## Final Reminders

- **Verify ALL YouTube links** before including — dead links are useless
- **Use exact quotes** with sources — don't paraphrase and call it a quote
- **Note when you cannot verify something** — better to flag than to guess
- **Follow the structure exactly** — this enables automated processing
- **Current date for lastUpdated**: Use today's date in YYYY-MM-DD format

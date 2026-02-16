# Tango History Timeline - Content System

## Overview

This document describes the complete workflow for building the Tango History Timeline system. Content flows through three stages:

1. **Research** - Research LLM produces white papers and recommendations
2. **Review** - Human reviews and approves content
3. **Implementation** - Claude Code updates the website

---

## Quick Links

- **Agent Instructions:** `/CLAUDE.md`
- **Prompt Templates:** `/docs/prompts/`
  - Era research: `era-research-template.md`
  - Person research: `person-research-template.md`
  - Citation research: `citation-research-template.md`
- **Timeline Data:** `/src/app/data/tangoTimelineData.js`
- **Index Files:** `/public/tango-papers/index/`
- **People Queue:** `/docs/queues/people-queue.json`
- **Research Inbox:** `/docs/inbox/` (incoming from Research LLM)
- **Research Outbox:** `/docs/outbox/` (prompts for Research LLM)

---

## Part 1: Structure & Taxonomy

### Timeline Categories

```
Timeline Master Page (/tango-history)
├── Tango Argentina (/tango-history/argentina)
│   └── 8 eras from 1880-present
├── Dancers & Couples (/tango-history/dancers)
│   └── 4 generation groups
├── Tango Europe (/tango-history/europe)
│   └── 10 eras from 1910-present
├── Tango USA (/tango-history/usa)
│   └── 5 eras (placeholder)
├── Tango Orchestras (/tango-history/orchestras)
│   └── 4 eras (placeholder)
├── Key Events (/tango-history/events)
│   └── Individual milestone events
└── Glossary (/tango-history/glossary)
    └── Terms index
```

### Entity Types

| Type | ID Format | Example |
|------|-----------|---------|
| Person | `firstname-lastname` | `tete-rusconi` |
| Couple | `name1-name2` | `copes-nieves` |
| Orchestra | `leader-lastname` | `di-sarli` |
| Venue | `venue-name` | `sin-rumbo` |
| Style | `style-name` | `villa-urquiza` |
| Era | `era-name` | `epoca-de-oro` |
| Term | `term-name` | `cabeceo` |
| Event | `event-name` | `tango-argentino-1983` |

### Status Values

| Status | Meaning | Display |
|--------|---------|---------|
| `placeholder` | Structure only, no content | Gray, "Coming Soon" |
| `partial` | Some content, more needed | Yellow, "Partial" |
| `populated` | Complete, ready for users | Green, "Complete" |

---

## Part 2: Creating White Papers

### What is a White Paper?

A white paper is a comprehensive research document on a specific topic (era, person, style, etc.) that serves as the source material for the website. Papers are:

- Written in Markdown format
- Stored in `/public/tango-papers/`
- Downloadable by users
- Source of truth for website content

### White Paper Template

```markdown
# [Title]

*[Subtitle or description]*

---

## Overview

[2-3 paragraph introduction to the topic]

---

## [Main Section 1]

### [Subsection]
[Content with dates, names, details]

### [Subsection]
[More content]

---

## [Main Section 2]
[Continue pattern...]

---

## Key Figures

### [Person Name] — "[Nickname]"

**Full Name:** [Legal name]
**Born:** [Date, Place]
**Died:** [Date, Place] (if applicable)
**Style:** [Style description]

**Life & Tango:** [Narrative paragraph]

**Style & Philosophy:** [What made them distinctive]

**Partners:** [Dance/teaching partners]

**Legacy:** [Their lasting impact]

**References:**
- [Source 1](URL)
- [Source 2](URL)

---

## Cross-References

- **See Also:** [Links to related timelines]
- **Related People:** [Links to dancer profiles]
- **Related Music:** [Links to orchestra profiles]

---

## Sources

1. [Primary sources]
2. [Secondary sources]
3. [Web references with URLs]

---

*Research compiled [Date]. Sources include [summary of sources].*
```

### File Organization

```
public/tango-papers/
├── README-CONTENT-SYSTEM.md    (this file)
│
├── index/
│   ├── master-index.json       (all entities)
│   ├── terms.json              (glossary)
│   ├── people.json             (individuals)
│   ├── couples.json            (partnerships)
│   ├── orchestras.json         (ensembles)
│   ├── venues.json             (locations)
│   └── cross-references.json   (links between entities)
│
├── argentina/
│   ├── guardia-vieja.md
│   ├── guardia-nueva.md
│   ├── epoca-de-oro.md
│   └── [other eras].md
│
├── dancers/
│   ├── generations/
│   │   ├── guardian-generation.md
│   │   ├── bridge-generation.md
│   │   └── pre-nuevo-masters.md  ← comprehensive research
│   ├── individuals/
│   │   └── [person-name].md
│   └── couples/
│       └── [couple-name].md
│
├── europe/
│   └── [era-name].md
│
├── usa/
│   └── [era-name].md
│
├── orchestras/
│   └── [orchestra-name].md
│
└── musicians/
    └── [musician-name].md
```

---

## Part 3: Research LLM Requirements

### What the Research LLM Must Deliver

The Research LLM produces a **Recommendations Document** that Claude Code can execute. This document MUST include:

#### A. Structured Data Updates

```javascript
// Exact code to update tangoTimelineData.js
{
  id: "era-id",
  summary: ["bullet 1", "bullet 2", "bullet 3", "bullet 4"],
  keyFigures: [
    { name: "Name", type: "individual", role: "description" }
  ],
  status: "partial|populated",
  paperPath: "/tango-papers/category/era-id.md"
}
```

#### B. Index Entries

```json
// Exact entries for index files
{
  "id": "entity-id",
  "type": "person|couple|orchestra|venue|term",
  "displayName": "Display Name",
  "fullName": "Full Legal Name (if person)",
  "born": "YYYY-MM-DD",
  "died": "YYYY-MM-DD",
  "categories": ["dancers", "argentina"],
  "eras": ["epoca-de-oro", "renacimiento"],
  "summary": "One sentence description",
  "status": "complete|partial"
}
```

#### C. Paper Content

Either:
- **New paper:** Complete Markdown content ready to save
- **Append to existing:** Specific content with insertion point

#### D. Cross-References

| From | To | Link Type |
|------|----|-----------|
| Source file/section | Target file/entity | Relationship |

#### E. Source Citations

Every fact must have:
- Source name
- URL (if web)
- Confidence level (high/medium/low)

#### F. Implementation Checklist

Exact list of files to create/modify with specific changes.

---

## Part 4: Ingesting White Papers

### When You Receive a White Paper

1. **Save the paper** to appropriate location in `/public/tango-papers/`

2. **Extract structured data** for `tangoTimelineData.js`:
   - Era summaries (4 bullet points)
   - Key figures array
   - Paper path reference

3. **Extract index entries** for each entity mentioned:
   - People with dates and roles
   - Couples with partners and active years
   - Venues with locations
   - Terms with definitions

4. **Identify cross-references**:
   - What other categories does this paper reference?
   - What should link TO this paper?

5. **Update status** of affected eras

### Ingestion Checklist

For each white paper received:

- [ ] Paper saved to correct path
- [ ] `tangoTimelineData.js` updated
  - [ ] Era summary updated
  - [ ] Key figures updated
  - [ ] Paper path set
  - [ ] Status updated
- [ ] Index files updated
  - [ ] `master-index.json` entries added
  - [ ] Category-specific indexes updated
  - [ ] `cross-references.json` updated
- [ ] Build tested (`npm run build`)
- [ ] Visual verification on dev server

---

## Part 5: Claude Code Implementation Guide

### Receiving Research LLM Output

When you receive a Recommendations Document:

#### Step 1: Validate Structure
```
- Does it have all required sections?
- Are the code snippets valid JSON/JS?
- Do file paths exist or need creation?
- Are there conflicts with existing data?
```

#### Step 2: Update tangoTimelineData.js
```javascript
// Find the category and era
const category = timelineCategories.find(c => c.categoryId === 'argentina');
const era = category.eras.find(e => e.id === 'epoca-de-oro');

// Update fields from recommendations
era.summary = [...new summary from recommendations];
era.keyFigures = [...new keyFigures from recommendations];
era.status = 'partial'; // or 'populated'
era.paperPath = '/tango-papers/argentina/epoca-de-oro.md';
```

#### Step 3: Create/Update Paper Files
```bash
# Create new paper
Write to: /public/tango-papers/[category]/[era-id].md

# Or append to existing
Edit: /public/tango-papers/[category]/[era-id].md
Insert after: [specified section]
```

#### Step 4: Update Index Files
```javascript
// master-index.json
{
  "entities": [
    // Add new entries
    { "id": "new-person", ... },
    // Update existing entries
    { "id": "existing-person", "appearsIn": [...add new path] }
  ]
}
```

#### Step 5: Verify Build
```bash
npm run build
# Check for errors
# Verify all pages generate
```

#### Step 6: Report Back
```markdown
## Implementation Complete

### Files Modified:
- src/app/data/tangoTimelineData.js
- public/tango-papers/argentina/epoca-de-oro.md (created)
- public/tango-papers/index/master-index.json

### Entries Added:
- 12 new people
- 3 new venues
- 5 new terms

### Status Changes:
- argentina/epoca-de-oro: partial → populated

### Not Implemented (with reasons):
- [item]: [reason]
```

---

## Part 6: Tag System (Future)

### Tag Format in Papers

```markdown
{{person:tete-rusconi|Tete Rusconi}} was one of the greatest milongueros.
He often danced at {{venue:sin-rumbo|Club Sin Rumbo}} in the
{{style:villa-urquiza|Villa Urquiza style}}.
```

### Tag Processing (to be built)

Tags will eventually render as:
- Clickable links to entity pages
- Hover cards with entity summaries
- Automatic cross-reference generation

For now, tags serve as:
- Documentation of relationships
- Searchable markers
- Input for future link generation

---

## Part 7: Quality Standards

### Paper Quality Checklist

- [ ] Accurate dates (verified against multiple sources)
- [ ] Full names with nicknames noted
- [ ] Spanish terms with English translations
- [ ] No copied text (original synthesis only)
- [ ] Sources cited for key claims
- [ ] Cross-references to other categories
- [ ] Readable narrative flow
- [ ] Downloadable as standalone document

### Era Completion Checklist

Before marking `status: "populated"`:

- [ ] Summary has 4+ substantive bullets
- [ ] Key figures list is comprehensive
- [ ] Source paper exists and is complete
- [ ] All mentioned people have index entries
- [ ] Cross-references to 2+ other categories
- [ ] Dates verified against sources
- [ ] No broken references

### Index Entry Quality

- [ ] Unique ID follows convention
- [ ] Display name is correct
- [ ] Dates are in ISO format (YYYY-MM-DD)
- [ ] Summary is one clear sentence
- [ ] Categories and eras are accurate
- [ ] AppearsIn paths are valid

---

## Part 8: Workflow Summary

```
┌─────────────────────────────────────────────────────────────┐
│                    CONTENT PIPELINE                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. SELECT ERA                                              │
│     └─→ Choose next era to process (chronological order)   │
│                                                             │
│  2. PREPARE PROMPT                                          │
│     └─→ Use template from /AI-Guild/Prompts/               │
│     └─→ Include current state from tangoTimelineData.js    │
│     └─→ Include any existing paper content                 │
│                                                             │
│  3. RESEARCH LLM PROCESSES                                  │
│     └─→ Analyzes current state                             │
│     └─→ Researches web sources                             │
│     └─→ Produces Recommendations Document                  │
│                                                             │
│  4. HUMAN REVIEWS                                           │
│     └─→ Check accuracy of key facts                        │
│     └─→ Approve or request changes                         │
│                                                             │
│  5. CLAUDE CODE IMPLEMENTS                                  │
│     └─→ Updates tangoTimelineData.js                       │
│     └─→ Creates/updates paper files                        │
│     └─→ Updates index files                                │
│     └─→ Verifies build                                     │
│                                                             │
│  6. VERIFY & ITERATE                                        │
│     └─→ Check website display                              │
│     └─→ Test cross-references                              │
│     └─→ Move to next era                                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Part 9: People Profile Pipeline

The People Pipeline is a scalable system for creating individual profile pages for tango figures — dancers, musicians, teachers, organizers. Designed to handle 100-200+ profiles over time.

### Why a Separate Pipeline?

Era papers cover movements and periods. People profiles are **entity-focused**:
- Individual biography and career
- Videos, images, links
- Cross-references to eras and other people
- Status: active, historical, deceased

### Pipeline Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    PEOPLE CONTENT PIPELINE                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  /docs/queues/people-queue.json                                 │
│  ┌──────────────────────────────────────────────────────┐       │
│  │ { "slug": "chicho-frumboli", "priority": 1,          │       │
│  │   "status": "pending", "type": "dancer" }            │       │
│  └──────────────────────────────────────────────────────┘       │
│                          │                                       │
│                          ▼                                       │
│  Sage picks next pending → generates prompt → /docs/outbox/     │
│                          │                                       │
│                          ▼                                       │
│  Research LLM returns profile → /docs/inbox/                    │
│                          │                                       │
│                          ▼                                       │
│  Sage creates → /public/tango-papers/people/[slug].md           │
│              → updates master-index.json                         │
│              → marks queue item "completed"                      │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Queue File Schema

Location: `/docs/queues/people-queue.json`

```json
{
  "queue": [
    {
      "slug": "chicho-frumboli",
      "displayName": "Chicho Frúmboli",
      "type": "dancer",
      "status": "pending",
      "priority": 1,
      "notes": "Nuevo innovator, El Tangauta interview 2009",
      "addedDate": "2026-02-15",
      "completedDate": null
    },
    {
      "slug": "anibal-troilo",
      "displayName": "Aníbal Troilo",
      "type": "musician",
      "status": "pending",
      "priority": 2,
      "notes": "Pichuco, major orchestra leader",
      "addedDate": "2026-02-15",
      "completedDate": null
    }
  ],
  "stats": {
    "total": 150,
    "pending": 148,
    "in_progress": 1,
    "completed": 1
  }
}
```

**Status values:** `pending` | `in_progress` | `completed` | `blocked`

**Type values:** `dancer` | `musician` | `teacher` | `organizer` | `composer` | `singer`

### Person Profile Template

Location: `/public/tango-papers/people/[slug].md`

```markdown
---
id: chicho-frumboli
name: Mariano "Chicho" Frúmboli
type: dancer
status: active
born: 1970
birthPlace: Buenos Aires, Argentina
died: null
deathPlace: null
image: /images/people/chicho-frumboli.jpg
tags: [nuevo, performer, teacher, innovator]
eras: [nuevo-peak, neo-traditional]
partners: [juana-sepulveda, eugenia-parrilla]
featured: true
lastUpdated: 2026-02-15
---

# Mariano "Chicho" Frúmboli

Brief bio paragraph summarizing who they are and why they matter...

## Biography

Detailed life story, career highlights, contributions to tango...

## Style & Philosophy

What distinguishes their dancing/music/teaching...

## Videos

| Title | Year | Partner | Link |
|-------|------|---------|------|
| Mantua Performance | 2008 | Juana Sepúlveda | [YouTube](url) |
| Plano Secuencia | 2006 | Eugenia Parrilla | [YouTube](url) |

## Links

- [Official Website](url)
- [Instagram](url)
- [Festival appearances](url)

## Cross-References

- [Nuevo Innovators](/tango-papers/dancers/nuevo-innovators.md)
- [The Arc from Nuevo to Neo-Traditional](/tango-papers/argentina/nuevo-to-neotrad.md)

## HITM Review Flags

- **Birth year**: Some sources say 1969, others 1970

---

**Note**: This content was developed with AI assistance and should be verified against primary sources.
```

### Frontmatter Schema

| Field | Required | Type | Description |
|-------|----------|------|-------------|
| `id` | Yes | string | URL slug, e.g., `chicho-frumboli` |
| `name` | Yes | string | Display name with nickname |
| `type` | Yes | enum | `dancer`, `musician`, `teacher`, `organizer`, `composer`, `singer` |
| `status` | Yes | enum | `active`, `historical`, `deceased` |
| `born` | No | number/string | Birth year or full date |
| `birthPlace` | No | string | City, Country |
| `died` | No | number/string | Death year or full date (null if alive) |
| `deathPlace` | No | string | City, Country |
| `image` | No | string | Path to profile image |
| `tags` | No | array | Descriptive tags for filtering |
| `eras` | No | array | Era IDs this person is associated with |
| `partners` | No | array | Slugs of dance/musical partners |
| `featured` | No | boolean | Show on home page "Tango Today" section |
| `lastUpdated` | Yes | string | ISO date of last update |

### Research Prompt Template

Location: `/docs/prompts/person-research-template.md`

Use this template to generate research prompts for the Research LLM.

### Processing a Person from the Queue

1. **Select next person** from queue (highest priority, status: pending)
2. **Generate research prompt** using template
3. **Send to Research LLM** via outbox
4. **Receive response** in inbox
5. **Create profile file** at `/public/tango-papers/people/[slug].md`
6. **Update master-index.json** with new person entry
7. **Update queue** status to `completed`
8. **Verify build** passes

### Home Page Integration

People with `featured: true` AND `status: active` appear in the "Tango Today" section on the home page. This section showcases current movers and shakers.

### Website Routes

| Route | Purpose |
|-------|---------|
| `/people` | Browse/filter all people profiles |
| `/people/[slug]` | Individual person profile page |

### Index Integration

Each person gets an entry in `master-index.json`:

```json
{
  "id": "chicho-frumboli",
  "type": "person",
  "displayName": "Chicho Frúmboli",
  "fullName": "Mariano Frúmboli",
  "born": "1970",
  "died": null,
  "status": "active",
  "personType": "dancer",
  "tags": ["nuevo", "performer", "teacher"],
  "eras": ["nuevo-peak", "neo-traditional"],
  "summary": "Argentine tango dancer and innovator, key figure in tango nuevo movement",
  "paperPath": "/tango-papers/people/chicho-frumboli.md",
  "appearsIn": [
    "/tango-papers/argentina/nuevo-to-neotrad.md",
    "/tango-papers/dancers/nuevo-innovators.md"
  ]
}
```

### Citation Research for People

Use the citation research template (`/docs/prompts/citation-research-template.md`) to verify facts in person profiles. Priority claims:
- Birth/death dates
- Career milestones
- Quotes and interviews
- Partnership histories

---

## Appendix A: Current Status

### Content Provided
- [x] Argentina: Eras defined, partial summaries
- [x] Dancers: Guardian & Bridge generations (pre-nuevo-masters.md)
- [x] Europe: Eras defined, partial summaries
- [ ] USA: Structure only
- [ ] Orchestras: Structure only
- [x] Events: Major events listed

### Pages Built
- [x] /tango-history (master timeline with TimelineJS)
- [x] /tango-history/argentina
- [x] /tango-history/dancers
- [x] /tango-history/europe
- [x] /tango-history/usa
- [x] /tango-history/orchestras
- [x] /tango-history/events
- [x] /tango-history/glossary

### Next Priority
1. **epoca-de-oro** - The most important era, needs full paper
2. **guardian-generation** - Builds on pre-nuevo-masters.md
3. **orchestras** - Golden age orchestras need profiles

---

## Appendix B: File Locations Reference

| Purpose | Location |
|---------|----------|
| Agent instructions | `/CLAUDE.md` |
| This document | `/public/tango-papers/README-CONTENT-SYSTEM.md` |
| **Prompt Templates** | |
| Era research template | `/docs/prompts/era-research-template.md` |
| Person research template | `/docs/prompts/person-research-template.md` |
| Citation research template | `/docs/prompts/citation-research-template.md` |
| **Workflow Folders** | |
| Session handoffs | `/docs/handoffs/sage/` |
| Incoming research | `/docs/inbox/` |
| Outgoing prompts | `/docs/outbox/` |
| Processed research | `/docs/processed/` |
| **Queues** | |
| People queue | `/docs/queues/people-queue.json` |
| **Data Files** | |
| Timeline data | `/src/app/data/tangoTimelineData.js` |
| Menu structure | `/src/app/data/menuStructure.js` |
| **Website Pages** | |
| Master timeline page | `/src/app/tango-history/page.js` |
| Category pages | `/src/app/tango-history/[category]/page.js` |
| People index page | `/src/app/people/page.js` (future) |
| Person profile page | `/src/app/people/[slug]/page.js` (future) |
| **Content Files** | |
| White papers | `/public/tango-papers/[category]/[era].md` |
| People profiles | `/public/tango-papers/people/[slug].md` |
| Index files | `/public/tango-papers/index/*.json` |

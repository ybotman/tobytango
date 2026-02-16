# Linking Process: Cross-Reference Workflow

## Overview

This document defines how to create and maintain hyperlinks across the tobytango.com content system.

---

## Link Hierarchy

When linking a name/term, use this priority order:

| Priority | Target | When to Use | Example |
|----------|--------|-------------|---------|
| **1** | Deep Dive Page | Profile exists at `/people/[slug]` | `[Chicho Frúmboli](/people/chicho-frumboli)` |
| **2** | Glossary Term | Term exists in glossary index | `[cabeceo](/tango-history/glossary#cabeceo)` |
| **3** | Timeline Era | Era page exists | `[Golden Age](/tango-history/argentina#epoca-de-oro)` |
| **4** | Plain Text | No page exists yet | `Chicho Frúmboli` (unlinked) |

**Rule:** Always check if a deep dive exists before linking to glossary. The glossary should link OUT to deep dives, not the other way around.

---

## Link Targets by Type

### People
```markdown
[Carlos Gardel](/people/carlos-gardel)
[Chicho Frúmboli](/people/chicho-frumboli)
```

### Orchestras (when pages exist)
```markdown
[Osvaldo Pugliese](/orchestras/osvaldo-pugliese)
[Juan D'Arienzo](/orchestras/juan-darienzo)
```

### Venues (when pages exist)
```markdown
[Cochabamba 444](/venues/cochabamba-444)
[El Beso](/venues/el-beso)
```

### Glossary Terms
```markdown
[cabeceo](/tango-history/glossary#cabeceo)
[abrazo](/tango-history/glossary#abrazo)
```

### Timeline Eras
```markdown
[Golden Age](/tango-history/argentina#epoca-de-oro)
[Investigation Era](/tango-history/argentina#investigacion)
```

---

## When to Update Links

### Trigger: New Deep Dive Published

When a new person/orchestra/venue profile is published:

1. **Update glossary** — If the entity is in the glossary, add link to deep dive
2. **Scan timeline data** — Check `tangoTimelineData.js` for mentions in keyFigures
3. **Scan related papers** — Check era papers for mentions
4. **Scan related profiles** — Check other people profiles that reference this person
5. **Update master index** — Ensure `paperPath` points to new profile

### Trigger: New Era Paper Published

When a new era paper is created:

1. **Link all mentioned people** who have profiles
2. **Link all mentioned orchestras** who have profiles
3. **Link all glossary terms** used in the paper
4. **Update timeline** — Add `paperPath` to tangoTimelineData.js

---

## Files to Check for Links

### Primary Content Files

| File/Directory | What to Link | Priority |
|----------------|--------------|----------|
| `/public/tango-papers/people/*.md` | Partner names, teachers, related figures | High |
| `/public/tango-papers/argentina/*.md` | All people, orchestras, terms | High |
| `/public/tango-papers/dancers/*.md` | All people, couples | High |
| `/src/app/data/tangoTimelineData.js` | keyFigures names (React components) | Medium |
| `/public/tango-papers/index/master-index.json` | appearsIn, paperPath fields | Medium |

### React Components (Different Syntax)

In `.js` files, use Next.js Link:
```jsx
import Link from 'next/link';

<Link href="/people/chicho-frumboli">Chicho Frúmboli</Link>
```

In Markdown files, use standard markdown:
```markdown
[Chicho Frúmboli](/people/chicho-frumboli)
```

---

## Link Discovery Process

### Step 1: Get Published Profiles List

```bash
ls public/tango-papers/people/*.md | xargs -I{} basename {} .md
```

### Step 2: Search for Unlinked Mentions

For each published profile slug, search for unlinked mentions:

```bash
# Example: Find "Chicho" mentions not already linked
grep -r "Chicho" public/tango-papers/ --include="*.md" | grep -v "\[Chicho"
```

### Step 3: Prioritize by Frequency

Focus on high-frequency mentions first:
- Big Four orchestras (D'Arienzo, Di Sarli, Troilo, Pugliese)
- Investigation Group (Naveira, Salas, Chicho)
- Guardian generation (Tete, Pepito, Vidort)

---

## Automation Script (Future)

A script could automate link insertion:

```javascript
// Pseudocode for future link-inserter.js

const publishedPeople = getPublishedPeopleSlugs();
const linkMap = buildLinkMap(publishedPeople);

// linkMap example:
// {
//   "Chicho Frúmboli": "/people/chicho-frumboli",
//   "Chicho": "/people/chicho-frumboli",
//   "Mariano Frumboli": "/people/chicho-frumboli",
// }

function linkifyMarkdown(content, linkMap) {
  for (const [name, url] of Object.entries(linkMap)) {
    // Only replace if not already linked
    const regex = new RegExp(`(?<!\\[)${name}(?!\\])(?!\\()`, 'g');
    content = content.replace(regex, `[${name}](${url})`);
  }
  return content;
}
```

---

## Manual Linking Checklist

When processing a new deep dive:

- [ ] Profile created at `/public/tango-papers/people/[slug].md`
- [ ] Entry added/updated in `peopleData.js` with `status: 'published'`
- [ ] Entry updated in `master-index.json` with `paperPath`
- [ ] Related profiles updated with links to new profile
- [ ] Era papers scanned and linked
- [ ] Glossary checked for related terms
- [ ] Timeline keyFigures checked for mentions

---

## Current Published Profiles

As of 2026-02-16, these profiles exist and should be link targets:

### People (30 profiles)
```
astor-piazzolla, cachirulo, carlos-gardel, carlos-gavito,
chicho-frumboli, daniel-trenner, dimitris-bronowski,
el-turco-jose, fabian-salas, finito, giselle-anne,
graciela-gonzalez, guido-iacopetti, gustavo-naveira,
ignacio-varchausky, juan-carlos-copes, juan-darienzo,
juana-sepulveda, maria-nieves, miguel-angel-zotto,
milena-plebs, osvaldo-pugliese, pablo-veron,
pepito-avellaneda, roberto-alvarez, steve-darmo,
susana-miller, tete-rusconi, carlos-di-sarli, anibal-troilo
```

### Name Variations to Recognize

| Slug | Variations |
|------|------------|
| chicho-frumboli | Chicho, Chicho Frúmboli, Mariano Frumboli |
| tete-rusconi | Tete, Tete Rusconi, Pedro Rusconi |
| pepito-avellaneda | Pepito, Pepito Avellaneda |
| juan-darienzo | D'Arienzo, Juan D'Arienzo |
| carlos-di-sarli | Di Sarli, Carlos Di Sarli |
| anibal-troilo | Troilo, Aníbal Troilo, Pichuco |
| osvaldo-pugliese | Pugliese, Osvaldo Pugliese |

---

## Glossary Linking Rules

The glossary page (`/tango-history/glossary`) should:

1. **Link to deep dives** when available in term descriptions
2. **Link between related terms** using `relatedTerms` field
3. **NOT be the primary target** when a deep dive exists

Example glossary entry update:
```json
{
  "id": "tango-nuevo",
  "displayName": "Tango Nuevo",
  "definition": "Movement pioneered by [Gustavo Naveira](/people/gustavo-naveira) and [Fabián Salas](/people/fabian-salas)...",
  "notablePractitioners": [
    {"name": "Chicho Frúmboli", "link": "/people/chicho-frumboli"},
    {"name": "Gustavo Naveira", "link": "/people/gustavo-naveira"}
  ]
}
```

---

## Timeline Linking (React)

In `tangoTimelineData.js`, keyFigures could be enhanced:

**Current (plain text):**
```javascript
keyFigures: [
  { name: "Chicho Frumboli", type: "individual", role: "Investigation pioneer" }
]
```

**Enhanced (with link):**
```javascript
keyFigures: [
  {
    name: "Chicho Frumboli",
    type: "individual",
    role: "Investigation pioneer",
    link: "/people/chicho-frumboli"  // Add link field
  }
]
```

Then update the timeline component to render links when `link` field exists.

---

## Implementation Priority

### Phase 1: High-Value Links (Do First)
1. Link Big Four orchestras in all papers
2. Link Investigation Group in nuevo/investigacion papers
3. Link Guardian generation in dancers papers
4. Update Chicho profile cross-references

### Phase 2: Systematic Coverage
1. Process each era paper alphabetically
2. Add links to all published people
3. Update glossary with links

### Phase 3: Automation
1. Build link-inserter script
2. Add to content pipeline
3. Run on all new deep dives automatically

---

## Maintenance

When a new profile is published:
1. Run link discovery for that person's name
2. Update 5-10 most relevant papers
3. Update related profiles
4. Log in handoff notes

---

*Created 2026-02-16 by Sage*

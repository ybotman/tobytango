# Deferred Decision: milonguero-generation.md Orphan Paper

## Status
**DEFERRED** - Decision needed from El Gotan

## The Issue
`/public/tango-papers/dancers/generations/milonguero-generation.md` (368 lines) exists but is not linked from any era's `paperPath` in tangoTimelineData.js.

## What It Contains
- Profiles of 26 dancers from the Guardian Generation
- Detailed content on: Finito, Tete, Pepito, Pupi, Vidort, Portalea, El Turco José, El Chino Perico, Carlos & Rosa, Cartery, etc.
- Style descriptions: Villa Urquiza, Milonguero, Canyengue, Orillero
- Cultural context: códigos, tandas, cabeceo, milonga etiquette
- Travel patterns and teaching history

## Current Overlap
`pre-nuevo-masters.md` (566 lines) is already linked to:
- guardian-generation
- bridge-generation
- renacimiento (Argentina)

Both papers cover similar territory with different emphasis.

## Options to Consider

### Option 1: Add as alternate paper
Add to `guardian-generation` as secondary download:
```js
paperPath: "/tango-papers/dancers/generations/pre-nuevo-masters.md",
alternatePaper: "/tango-papers/dancers/generations/milonguero-generation.md"
```
Would need UI update to show two download buttons.

### Option 2: Merge content
Combine best of both into one comprehensive paper, archive the other.

### Option 3: Link from index/reading list
Create a "Further Reading" section that links supplementary papers not tied to specific eras.

### Option 4: Delete
If content is redundant with pre-nuevo-masters.md, remove to reduce confusion.

## Recommendation
Option 1 or 3 - the content is valuable and distinct enough to preserve.

## Added
2026-02-13 by Sage

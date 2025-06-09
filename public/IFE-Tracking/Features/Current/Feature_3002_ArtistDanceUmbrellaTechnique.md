# Feature_3002_ArtistDanceUmbrellaTechnique

> **IFE Feature Document**  
> This document is the single source of truth for capturing all decisions, actions, and status updates related to this feature.  
> **Guild roles** must update this file directly, in their own sections, using their role icon and a datetime stamp.  
> All recommendations, decisions, and assignments must be recorded here by the responsible role.

## 🗂️ KANBAN (Required)
_What must be done, who is assigned, and current status.  
All task assignments and workflow status updates go here._  
**Last updated:** 2025-01-09 16:45

- [x] Create Feature document and branch
- [ ] Design data structure for artist JSON files
- [ ] Create directory structure for umbrella technique
- [ ] Implement display page with XY grid
- [ ] Implement artist selector component
- [ ] Create edit/create page for artist data
- [ ] Add API routes for JSON file operations
- [ ] Update navigation menu
- [ ] Test with sample artist data

## 🧭 SCOUT (Required)
_Research, discoveries, risks, and open questions.  
Document findings and recommendations here._  
**Last updated:** 2025-01-09 16:45

- Found existing artist section at `/artists` with orchestras/directors info
- Identified MUI X Charts as best option for scatter plot visualization
- Confirmed Next.js API routes needed for file system operations
- Individual JSON files approach chosen for better scalability

## 🏛️ ARCHITECT (Required)
_User-approved decisions, technical recommendations, and rationale.  
Document all architectural notes and user approvals here._  
**Last updated:** 2025-01-09 16:45

- User approved individual JSON files per artist couple
- No authentication required
- No versioning/history tracking needed
- Data structure: leader/follower names with auto-generated 4-letter shortName
- XY grid: Energy (X-axis) and OnTheSpot (Y-axis), both -10 to +10
- Display shortName on grid, full name in selector

## 🛠️ BUILDER (Required)
_Implementation details, blockers, and technical choices.  
Document what was built, how, and any issues encountered._  
**Last updated:** 2025-01-09 16:45

- Created feature branch: feature/3002-artist-dance-umbrella
- Starting implementation of directory structure and components

---

## Summary
New feature to visualize artist dance styles on an XY grid (Energy vs OnTheSpot) with interactive selection and editing capabilities.

## Motivation
Provide a visual tool to understand and compare different tango artist couples' dance styles across two dimensions:
- Energy: Oppositional (-10) to Supportive (+10)
- OnTheSpot: Memorized (-10) to Free (+10)

## Scope
**In-Scope:** 
- XY scatter plot visualization with quadrant labels
- Interactive artist selection (show/hide on grid)
- Edit existing artist data
- Create new artist entries
- Store data in individual JSON files

**Out-of-Scope:** 
- Authentication/authorization
- Version history
- Data export/import features

## Feature Behavior
| Area       | Behavior Description                                  |
|------------|--------------------------------------------------------|
| UI         | New pages under /artists/umbrella-technique          |
| Display    | Interactive XY grid with MUI X Charts scatter plot    |
| Selection  | Checkbox list with full artist names                 |
| Editing    | Form to edit/create artist data with validation      |
| Storage    | Individual JSON files in /public/artists-umbrella/   |

## Design
- 4-quadrant grid with labeled axes
- Points display 4-letter initials (e.g., JDMN)
- Hover tooltips show full names
- Scrollable selector for 20-30+ artists

## Tasks
| Status         | Task                                | Last Updated  |
|----------------|-------------------------------------|---------------|
| ✅ Complete     | Create Feature document             | 2025-01-09    |
| 🚧 In Progress  | Set up directory structure          | 2025-01-09    |
| ⏳ Pending      | Install MUI X Charts               |               |
| ⏳ Pending      | Create grid display component       |               |
| ⏳ Pending      | Create artist selector              |               |
| ⏳ Pending      | Create edit/create form             |               |
| ⏳ Pending      | Add API routes                      |               |
| ⏳ Pending      | Update navigation                   |               |

## Rollback Plan
- Remove feature branch
- Delete any created directories/files
- Revert package.json changes

## Dependencies
- MUI X Charts for scatter plot visualization
- Next.js API routes for file operations
- Existing MUI components

## Linked Issues / Docs
- Related to existing /artists section
- Builds on MUI component structure

## Owner
Toby Balsley

## Timeline
| Milestone | Date       |
|-----------|------------|
| Created   | 2025-01-09 |
| First Dev | 2025-01-09 |
| Review    | TBD        |
| Completed | TBD        |

---
# Design OS Folder Structure

This document explains how the design operating system is organized. · Version 2.0 · 29 September 2026

---

## Authority

The design OS is the **design record**: what the product does, who it serves, what each page and section is for, how each control behaves, and what is built. It is not the code's style guide, and it never decides how anything looks.

For anything that binds code — folder placement, data flow, naming, styling, dependency policy — `.claude/CLAUDE.md` at the repo root is the authority. Where a phase document and `.claude/CLAUDE.md` disagree, `.claude/CLAUDE.md` wins.

---

## Quick Navigation

```
design-os/
│
├── INDEX/                 ← Start here (entry point, navigation hub)
├── CORE-PHASES/           ← The 9-phase design record
└── IMPLEMENTATION/        ← Engineering action items & setup
```

---

## Deviation from the Seed Prompt's Layout

`docs/MASTER_PROMPT_COMPLETE.md` writes its 15 files flat into `design-os/generated/`. This repo **keeps the three-folder layout above** instead:

- existing cross-links and RATIFIED_DIVERGENCES references keep resolving;
- `git mv` renames preserve file history (`git log --follow`);
- two companion files the seed does not name — `RATIFIED_DIVERGENCES.md` and this file — have a natural home in `INDEX/`.

The seed's file names are used inside the folders. `design-os/generated/` is not used. `.claude/CLAUDE.md` still describes `/design-os` as "(flat)"; that line is the owner's to update.

---

## Folders Explained

### 📍 INDEX/ — Entry Point & Navigation Hub

**Purpose:** Start here. Navigation and reference documents that help you understand the design OS.

| File                        | Purpose                                                         |
| --------------------------- | --------------------------------------------------------------- |
| **START_HERE.md**           | 🚀 Quick entry point for first-time users. Read this first.     |
| **README.md**               | 5-minute overview. What is this design OS?                      |
| **DESIGN-OS-COMPLETE.md**   | Master index of all 17 documents.                               |
| **ARTIFACT_INDEX.md**       | Detailed index with deep descriptions and a build status roll-up. |
| **RATIFIED_DIVERGENCES.md** | Owner decisions where the code departs from Phases 1–7.         |
| **\_FOLDER_STRUCTURE.md**   | This file. Explains the folder layout.                          |

**When to use:** Start with START_HERE.md, then read README.md for context. Use DESIGN-OS-COMPLETE.md as the master reference.

---

### 🎯 CORE-PHASES/ — The 9-Phase Design Record

**Purpose:** The design operating system, organized by phase.

| File                                    | What It Covers                                                             | Was (v1)                            |
| --------------------------------------- | -------------------------------------------------------------------------- | ----------------------------------- |
| **phase-1-product-vision.md**           | Vision, personas, roles, business rules, KPIs, principles.                 | same                                |
| **phase-2-experience-maps.md**          | 19 user journeys (search, offer, messaging, admin, escrow, disputes…).     | same                                |
| **phase-3-information-architecture.md** | Navigation, sitemap, taxonomy, permissions, hierarchies.                   | same                                |
| **phase-4-page-blueprints.md**          | 46 pages — content requirements, data, device needs, states.               | same                                |
| **phase-5-section-blueprints.md**       | 70 sections by job.                                                        | same                                |
| **phase-6-interaction-contracts.md**    | 88 behaviour contracts.                                                    | `phase-6-component-library.md`      |
| **phase-7-frontend-architecture.md**    | Folder structure, routing, layouts, data flow, performance.                | `phase-8-frontend-architecture.md`  |
| **phase-8-implementation-roadmap.md**   | 16-week plan, milestones, per-feature build status.                        | `phase-9-implementation-roadmap.md` |
| **phase-9-qa-checklist.md**             | 213 functional QA items.                                                   | `phase-10-qa-checklist.md`          |

Version 1's `phase-7-design-tokens.md` was removed after its non-visual rules were merged into Phases 6, 7 and 9; it remains in git history.

**When to use:** Read in order (1→2→3...→9). Each phase builds on the previous one.

**Reading time:** ~2-3 hours for the full design OS.

---

### ⚙️ IMPLEMENTATION/ — Engineering Action Items

**Purpose:** Actionable guides for engineers. Synthesizes all 9 phases into concrete steps.

| File                         | Purpose                                                                                     |
| ---------------------------- | ------------------------------------------------------------------------------------------- |
| **SETUP-CHECKLIST.md**       | From clone to verified environment: Node, pnpm, env vars, tests, gates.                     |
| **IMPLEMENTATION_PROMPT.md** | The engineering prompt: architecture, sprints, what remains, patterns, the Visual Design Hand-off. |

**When to use:** After reading CORE-PHASES 1, 3 and 7, follow SETUP-CHECKLIST.md once. Then use IMPLEMENTATION_PROMPT.md as your working brief.

**Engineer workflow:**

1. Read `.claude/CLAUDE.md` (binding rules)
2. Read CORE-PHASES 1, 3, 7
3. Follow IMPLEMENTATION/SETUP-CHECKLIST.md
4. Follow IMPLEMENTATION/IMPLEMENTATION_PROMPT.md per feature
5. Reference CORE-PHASES 4–6 while building, 8–9 before merging

---

## How to Use This Structure

### 👤 For Product Managers

**Your reading order:**

1. INDEX/START_HERE.md (5 min)
2. INDEX/README.md (5 min)
3. CORE-PHASES/phase-1-product-vision.md (15 min)
4. CORE-PHASES/phase-2-experience-maps.md (20 min)
5. CORE-PHASES/phase-3-information-architecture.md (15 min)

**Then:** Use CORE-PHASES/phase-8-implementation-roadmap.md for timeline, status and deferrals.

---

### 🎨 For Designers

**Your reading order:**

1. INDEX/START_HERE.md (5 min)
2. CORE-PHASES/phase-2-experience-maps.md (20 min)
3. CORE-PHASES/phase-4-page-blueprints.md (30 min)
4. CORE-PHASES/phase-5-section-blueprints.md (30 min)
5. CORE-PHASES/phase-6-interaction-contracts.md (30 min)

**Then:** Propose each page's visual concept to the owner at build time (IMPLEMENTATION_PROMPT › Visual Design Hand-off). The design OS supplies what the page must do; the look is yours to propose.

---

### 💻 For Engineers

**Your reading order:**

1. `.claude/CLAUDE.md` (10 min) — the binding rules, read before anything else
2. INDEX/START_HERE.md (5 min)
3. CORE-PHASES/phase-1-product-vision.md (15 min) — the "why" and the business rules
4. CORE-PHASES/phase-3-information-architecture.md (15 min) — routing
5. CORE-PHASES/phase-7-frontend-architecture.md (30 min) — folder structure
6. IMPLEMENTATION/SETUP-CHECKLIST.md (20 min) — environment
7. IMPLEMENTATION/IMPLEMENTATION_PROMPT.md (ongoing) — sprint guide

---

### ✅ For QA

**Your reading order:**

1. INDEX/README.md (5 min)
2. CORE-PHASES/phase-9-qa-checklist.md (read before each milestone)
3. IMPLEMENTATION/IMPLEMENTATION_PROMPT.md (testing strategy)

**Then:** Use phase-9-qa-checklist.md as your test matrix; a feature that passes it becomes Verified in Phase 8.

---

## File Linking Convention

All markdown files use **relative paths** for cross-links:

- **Same folder:** `[Link text](phase-2-experience-maps.md)`
- **Parent folder:** `[Link text](../INDEX/START_HERE.md)`
- **Another folder:** `[Link text](../CORE-PHASES/phase-6-interaction-contracts.md)`

Example:

```markdown
Before implementing, read [Phase 6: Interaction Contracts](../CORE-PHASES/phase-6-interaction-contracts.md).
```

---

## Statistics

| Category                  | Count |
| ------------------------- | ----- |
| **Total files**           | 17    |
| **Index files**           | 6     |
| **Core phases**           | 9     |
| **Implementation files**  | 2     |
| **Journeys**              | 19    |
| **Pages specified**       | 46    |
| **Sections designed**     | 70    |
| **Interaction contracts** | 88    |
| **QA items**              | 213   |
| **Sprint weeks**          | 16    |

---

## Quick Answers

**Q: Where do I start?**
A: INDEX/START_HERE.md

**Q: What's the full overview?**
A: INDEX/README.md

**Q: I'm an engineer, where's my implementation guide?**
A: IMPLEMENTATION/IMPLEMENTATION_PROMPT.md — after `.claude/CLAUDE.md`, which overrides it.

**Q: What pages should I build?**
A: CORE-PHASES/phase-4-page-blueprints.md, then their status in phase-8-implementation-roadmap.md

**Q: What's the folder structure for my project?**
A: CORE-PHASES/phase-7-frontend-architecture.md

**Q: How should this control behave?**
A: CORE-PHASES/phase-6-interaction-contracts.md

**Q: What should it look like?**
A: Not in this design OS. Run a visual concept with the owner at build time.

**Q: How is styling set up?**
A: `.claude/CLAUDE.md` › Required patterns › Styling, and the code in `styles/`.

**Q: How do I know I'm done?**
A: CORE-PHASES/phase-9-qa-checklist.md

---

**Version:** 2.0
**Last Updated:** 2026-09-29
**Status:** Design record. Code authority is `.claude/CLAUDE.md`.

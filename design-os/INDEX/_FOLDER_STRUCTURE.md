# Design OS Folder Structure

This document explains how the design operating system is organized.

---

## Quick Navigation

```
design-os/
│
├── INDEX/                 ← Start here (entry point, navigation hub)
├── CORE-PHASES/           ← The 10-phase design blueprint
├── IMPLEMENTATION/        ← Engineering action items & setup
├── REFERENCE/             ← Master prompt & supporting docs
│
└── [Config files]
```

---

## Folders Explained

### 📍 INDEX/ — Entry Point & Navigation Hub

**Purpose:** Start here. This folder contains navigation and reference documents that help you understand the design OS structure.

| File                      | Purpose                                                     |
| ------------------------- | ----------------------------------------------------------- |
| **START_HERE.md**         | 🚀 Quick entry point for first-time users. Read this first. |
| **README.md**             | 5-minute overview. What is this design OS?                  |
| **DESIGN-OS-COMPLETE.md** | Master index of all 16 deliverables.                        |
| **ARTIFACT_INDEX.md**     | Detailed index with deep descriptions of each phase.        |
| **\_FOLDER_STRUCTURE.md** | This file. Explains the folder layout.                      |

**When to use:** Start with START_HERE.md, then read README.md for context. Use DESIGN-OS-COMPLETE.md as the master reference.

---

### 🎯 CORE-PHASES/ — The 10-Phase Design Blueprint

**Purpose:** The complete design operating system, organized by phase. These are the design artifacts—read them first before implementing.

| File                                    | What It Covers                                                            |
| --------------------------------------- | ------------------------------------------------------------------------- |
| **phase-1-product-vision.md**           | Business goals, personas, KPIs, success metrics, design principles.       |
| **phase-2-experience-maps.md**          | User journeys for 18+ key experiences (search, booking, messaging, etc.). |
| **phase-3-information-architecture.md** | Navigation hierarchy, sitemap, content taxonomy, permissions.             |
| **phase-4-page-blueprints.md**          | Specifications for 21+ pages (home, search, listing, dashboards, etc.).   |
| **phase-5-section-blueprints.md**       | Breakdown of pages into 55+ reusable sections.                            |
| **phase-6-component-library.md**        | Design system: 80+ components with variants, states, accessibility.       |
| **phase-7-design-tokens.md**            | Scalable token system (colors, typography, spacing, motion, etc.).        |
| **phase-8-frontend-architecture.md**    | Folder structure, routing, layouts, patterns, styling organization.       |
| **phase-9-implementation-roadmap.md**   | 16-week sprint breakdown, milestones, dependencies.                       |
| **phase-10-qa-checklist.md**            | 200+ QA items before shipping (accessibility, performance, responsive).   |

**When to use:** Read in order (1→2→3...→10). Each phase builds on the previous one.

**Reading time:** ~2-3 hours for full design OS.

---

### ⚙️ IMPLEMENTATION/ — Engineering Action Items

**Purpose:** Actionable implementation guides for engineers. Synthesizes all 10 phases into concrete steps.

| File                         | Purpose                                                                                           |
| ---------------------------- | ------------------------------------------------------------------------------------------------- |
| **SETUP-CHECKLIST.md**       | Step-by-step setup: Node, pnpm, Next.js, Tailwind, TypeScript, design tokens, component library.  |
| **IMPLEMENTATION_PROMPT.md** | Complete implementation guide. All 10 phases synthesized into sprint-by-sprint action items.      |
| **STYLING_ARCHITECTURE.md**  | (NEW) Critical reference for CSS architecture: globals.css vs components, separation of concerns. |

**When to use:** After reading CORE-PHASES 1-7, use SETUP-CHECKLIST.md to bootstrap your project. Then follow IMPLEMENTATION_PROMPT.md as your primary engineering guide.

**Engineer workflow:**

1. Read CORE-PHASES 1-7 (product vision → design tokens)
2. Run SETUP-CHECKLIST.md to initialize your project
3. Follow IMPLEMENTATION_PROMPT.md sprint by sprint
4. Reference CORE-PHASES 8-10 during implementation

---

### 📚 REFERENCE/ — Master Prompt & Supporting Docs

**Purpose:** Authoritative reference documents. Rarely needed after initial setup, but available for deep dives.

| File                          | Purpose                                                                                                        |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------- |
| **MASTER_PROMPT_COMPLETE.md** | The master prompt that generated this entire design OS. Contains all rules, workflow, and output requirements. |

**When to use:** Reference if you need to understand why the design OS exists or verify that all 16 files are complete.

---

## How to Use This Structure

### 👤 For Product Managers

**Your reading order:**

1. INDEX/START_HERE.md (5 min)
2. INDEX/README.md (5 min)
3. CORE-PHASES/phase-1-product-vision.md (15 min)
4. CORE-PHASES/phase-2-experience-maps.md (20 min)
5. CORE-PHASES/phase-3-information-architecture.md (15 min)

**Then:** Use CORE-PHASES/phase-9-implementation-roadmap.md for timeline & milestones.

---

### 🎨 For Designers

**Your reading order:**

1. INDEX/START_HERE.md (5 min)
2. CORE-PHASES/phase-4-page-blueprints.md (30 min)
3. CORE-PHASES/phase-5-section-blueprints.md (30 min)
4. CORE-PHASES/phase-6-component-library.md (30 min)
5. CORE-PHASES/phase-7-design-tokens.md (20 min)

**Then:** Use this as your design reference while building Figma components.

---

### 💻 For Engineers

**Your reading order:**

1. INDEX/START_HERE.md (5 min)
2. INDEX/README.md (5 min)
3. CORE-PHASES/phase-1-product-vision.md (15 min) — understand the "why"
4. CORE-PHASES/phase-3-information-architecture.md (15 min) — understand routing
5. CORE-PHASES/phase-8-frontend-architecture.md (30 min) — understand folder structure
6. IMPLEMENTATION/SETUP-CHECKLIST.md (30 min) — bootstrap your project
7. IMPLEMENTATION/IMPLEMENTATION_PROMPT.md (ongoing) — your primary guide

**Sprint workflow:**

- Week 1: SETUP-CHECKLIST.md + Phase 8 architecture setup
- Weeks 2-8: Follow IMPLEMENTATION_PROMPT.md sprint by sprint
- Week 8 onwards: Reference CORE-PHASES/phase-10-qa-checklist.md

---

### ✅ For QA

**Your reading order:**

1. INDEX/README.md (5 min)
2. CORE-PHASES/phase-10-qa-checklist.md (read before each milestone)
3. IMPLEMENTATION/IMPLEMENTATION_PROMPT.md (reference for testing strategy)

**Then:** Use phase-10-qa-checklist.md as your test matrix before shipping.

---

## File Linking Convention

All markdown files use **relative paths** for cross-links:

- **Same folder:** `[Link text](phase-2-experience-maps.md)`
- **Parent folder:** `[Link text](../INDEX/START_HERE.md)`
- **Another folder:** `[Link text](../CORE-PHASES/phase-7-design-tokens.md)`

Example:

```markdown
Before implementing, read [Phase 7: Design Tokens](../CORE-PHASES/phase-7-design-tokens.md).
```

---

## Statistics

| Category                 | Count |
| ------------------------ | ----- |
| **Total files**          | 16    |
| **Index files**          | 5     |
| **Core phases**          | 10    |
| **Implementation files** | 3     |
| **Reference files**      | 1     |
| **Pages specified**      | 21    |
| **Sections designed**    | 55    |
| **Components**           | 80+   |
| **QA items**             | 200+  |
| **Sprint weeks**         | 16    |

---

## Quick Answers

**Q: Where do I start?**  
A: INDEX/START_HERE.md

**Q: What's the full overview?**  
A: INDEX/README.md

**Q: I'm an engineer, where's my implementation guide?**  
A: IMPLEMENTATION/IMPLEMENTATION_PROMPT.md

**Q: What pages should I build?**  
A: CORE-PHASES/phase-4-page-blueprints.md

**Q: What's the folder structure for my project?**  
A: CORE-PHASES/phase-8-frontend-architecture.md

**Q: What components do I need?**  
A: CORE-PHASES/phase-6-component-library.md

**Q: How do I set up the project?**  
A: IMPLEMENTATION/SETUP-CHECKLIST.md

**Q: How do I know I'm done?**  
A: CORE-PHASES/phase-10-qa-checklist.md

**Q: Why does this design OS exist?**  
A: REFERENCE/MASTER_PROMPT_COMPLETE.md

---

**Version:** 1.0  
**Last Updated:** 2026-07-16  
**Status:** Complete and production-ready for handoff to engineering teams.

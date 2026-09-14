# Design OS Phase Index

**All 10 phases are local markdown files in `design-os/CORE-PHASES/`.**

Phases 1-7 were also published as browser-viewable artifacts. Those URLs are listed at the bottom as historical mirrors — **the markdown is canonical**.

---

## The 10 Phases

### Phase 1: Product Vision

**File:** `CORE-PHASES/phase-1-product-vision.md`  
**Contains:** Business vision, personas, JTBD, KPIs, competitive positioning  
**Read When:** Strategy alignment, understanding platform goals

### Phase 2: Experience Maps

**File:** `CORE-PHASES/phase-2-experience-maps.md`  
**Contains:** Core user journeys, decision points, emotional states, failure paths  
**Read When:** Designing new flows, understanding user intent

### Phase 3: Information Architecture

**File:** `CORE-PHASES/phase-3-information-architecture.md`  
**Contains:** Sitemap, navigation hierarchy, permissions matrix, taxonomy, labeling  
**Read When:** Setting up routing, auth, permissions

### Phase 4: Page Blueprints

**File:** `CORE-PHASES/phase-4-page-blueprints.md`  
**Contains:** 27 page specs with modules, data, responsive behavior, states  
**Read When:** Building a page ⭐ (PRIMARY REFERENCE)

### Phase 5: Section Blueprints

**File:** `CORE-PHASES/phase-5-section-blueprints.md`  
**Contains:** 70 reusable sections (Hero Search, Listing Card, Filter Panel, etc.)  
**Read When:** Composing pages into sections

### Phase 6: Component Library

**File:** `CORE-PHASES/phase-6-component-library.md`  
**Contains:** 80 components (12 primitives, 20 patterns, 48 composed) with specs  
**Read When:** Implementing components

### Phase 7: Design Tokens

**File:** `CORE-PHASES/phase-7-design-tokens.md`  
**Contains:** Colors, typography, spacing, motion, shadows, radius, breakpoints  
**Read When:** Styling, choosing token values

### Phase 8: Frontend Architecture

**File:** `CORE-PHASES/phase-8-frontend-architecture.md`  
**Contains:** Folder structure, routes, layouts, providers, hooks, API org, state management  
**Read When:** Placing a new file, understanding data flow

### Phase 9: Implementation Roadmap

**File:** `CORE-PHASES/phase-9-implementation-roadmap.md`  
**Contains:** 16-week sprint breakdown, milestones, testing strategy, risk assessment  
**Read When:** Planning sprints, understanding timeline

### Phase 10: QA & Accessibility Checklist

**File:** `CORE-PHASES/phase-10-qa-checklist.md`  
**Contains:** WCAG AA compliance, performance, security, code quality verification  
**Read When:** Pre-launch QA, verifying production readiness

---

## Index & Implementation Documents

### INDEX/START_HERE.md

Two-minute orientation. Where to begin, what binds, what each folder is for.

### INDEX/DESIGN-OS-COMPLETE.md

Complete index of all 10 phases. References, usage guide, key decisions, file manifest.

### INDEX/README.md

Quick start guide. How to use each phase, file formats, getting started.

### INDEX/\_FOLDER_STRUCTURE.md

Folder layout and per-role reading orders (PM, designer, engineer, QA).

### IMPLEMENTATION/IMPLEMENTATION_PROMPT.md

Engineering synthesis of Phases 8-10: sprint breakdown, code patterns, testing strategy, deployment checklist. Project-specific to this codebase, and a _plan_ rather than a mirror of the current tree — check the working tree before acting on a sprint.

### IMPLEMENTATION/SETUP-CHECKLIST.md

Token and styling foundation: how `styles/tokens.css` and `styles/globals.css` are organized, and the component authoring pattern.

---

## Reading Order

### If You Have 5 Minutes

1. `INDEX/START_HERE.md`
2. `INDEX/DESIGN-OS-COMPLETE.md`

### If You're Building Code (Most Important)

1. `.claude/CLAUDE.md` ⭐⭐⭐ (binding rules — overrides everything here)
2. `CORE-PHASES/phase-8-frontend-architecture.md` (codebase structure)
3. `CORE-PHASES/phase-4-page-blueprints.md` (page specs, reference constantly)
4. `IMPLEMENTATION/IMPLEMENTATION_PROMPT.md` (sprint guide)

### If You're Designing

1. `CORE-PHASES/phase-4-page-blueprints.md` (page layouts)
2. `CORE-PHASES/phase-5-section-blueprints.md` (sections in pages)
3. `CORE-PHASES/phase-6-component-library.md` (components in sections)
4. `CORE-PHASES/phase-7-design-tokens.md` (token values)

### If You're Managing/Leading

1. `CORE-PHASES/phase-1-product-vision.md` (strategy)
2. `CORE-PHASES/phase-2-experience-maps.md` (user flows)
3. `CORE-PHASES/phase-9-implementation-roadmap.md` (timeline)
4. `CORE-PHASES/phase-10-qa-checklist.md` (quality standards)

---

## How to Access

Everything is markdown in the repo:

```bash
cat design-os/CORE-PHASES/phase-8-frontend-architecture.md
cat design-os/CORE-PHASES/phase-9-implementation-roadmap.md
cat design-os/CORE-PHASES/phase-10-qa-checklist.md
```

---

## Quick Reference

| Need                    | Document     | File                                                |
| ----------------------- | ------------ | --------------------------------------------------- |
| **Binding code rules**  | **—**        | **`.claude/CLAUDE.md`**                             |
| Business Strategy       | Phase 1      | `CORE-PHASES/phase-1-product-vision.md`             |
| User Flows              | Phase 2      | `CORE-PHASES/phase-2-experience-maps.md`            |
| Navigation/Routes       | Phase 3      | `CORE-PHASES/phase-3-information-architecture.md`   |
| **Page Specs**          | **Phase 4**  | **`CORE-PHASES/phase-4-page-blueprints.md`**        |
| Section Patterns        | Phase 5      | `CORE-PHASES/phase-5-section-blueprints.md`         |
| Components              | Phase 6      | `CORE-PHASES/phase-6-component-library.md`          |
| Token Values            | Phase 7      | `CORE-PHASES/phase-7-design-tokens.md`              |
| **Codebase Structure**  | **Phase 8**  | **`CORE-PHASES/phase-8-frontend-architecture.md`**  |
| **Implementation Plan** | **Phase 9**  | **`CORE-PHASES/phase-9-implementation-roadmap.md`** |
| **QA Checklist**        | **Phase 10** | **`CORE-PHASES/phase-10-qa-checklist.md`**          |
| Sprint Guide            | Master       | `IMPLEMENTATION/IMPLEMENTATION_PROMPT.md`           |

**Bold = Most important for engineering**

---

## Appendix: Published Artifact Mirrors

Historical, may not reflect later edits to the markdown.

| Phase | URL                                                                  |
| ----- | -------------------------------------------------------------------- |
| 1     | https://claude.ai/code/artifact/257167b4-d827-4556-8bb7-21b664726b71 |
| 2     | https://claude.ai/code/artifact/73797095-b2c6-42c8-a29c-e89363470caa |
| 3     | https://claude.ai/code/artifact/63ef5a57-d3fe-44b1-bdce-67e4fd3ad2e3 |
| 4     | https://claude.ai/code/artifact/06e9a4b4-a818-4e47-aa64-b95002c9bbb9 |
| 5     | https://claude.ai/code/artifact/140f03aa-ebb5-419b-b998-75ed29e537db |
| 6     | https://claude.ai/code/artifact/5c74a0c4-da0f-4258-8b89-4d76231ac53e |
| 7     | https://claude.ai/code/artifact/bebd6aa0-7e77-4308-88b8-8874708d4106 |

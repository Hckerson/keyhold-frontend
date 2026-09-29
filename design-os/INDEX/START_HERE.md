# START HERE — Design Operating System

**The complete design record for Keyhold lives in `design-os/`. Every phase is a local markdown file.** · Version 2.0 · 29 September 2026

---

## What You Have

✅ **Complete 9-phase Design Operating System** (all local markdown)

- [ ] Phase 1 — Product Vision
- [ ] Phase 2 — Experience Maps
- [ ] Phase 3 — Information Architecture
- [ ] Phase 4 — Page Blueprints
- [ ] Phase 5 — Section Blueprints
- [ ] Phase 6 — Interaction Contracts
- [ ] Phase 7 — Frontend Architecture
- [ ] Phase 8 — Implementation Roadmap (with build status)
- [ ] Phase 9 — QA Checklist

Tick them off as you read. Phases live in `CORE-PHASES/`, engineering guides in `IMPLEMENTATION/`, navigation in `INDEX/`.

**One thing to know first:** this design OS says what every page must *do*. It never says how anything *looks* — that is decided page by page, with the owner, when the page is built.

---

## Read This First

`.claude/CLAUDE.md` at the repo root is the **binding** specification for code: folder placement, data flow, naming, styling, dependency policy. The design OS explains _what_ the product does and _why_; `.claude/CLAUDE.md` says _where things go_. Where they disagree, `.claude/CLAUDE.md` wins.

---

## Files

| File | Purpose | Action |
| ---- | ------- | ------ |
| **INDEX/START_HERE.md** | This file — orientation | You're reading it |
| **INDEX/README.md** | Five-minute overview | Read next if new |
| **INDEX/DESIGN-OS-COMPLETE.md** | Master index of all 17 documents | Use as the map |
| **INDEX/ARTIFACT_INDEX.md** | Deep description of each of the 9 phases, status roll-up | Bookmark for reference |
| **INDEX/\_FOLDER_STRUCTURE.md** | How `design-os/` is laid out, per-role reading | Read if navigating blind |
| **INDEX/RATIFIED_DIVERGENCES.md** | Owner decisions where code departs from the spec | Read before changing shipped behaviour |
| **IMPLEMENTATION/IMPLEMENTATION_PROMPT.md** | The engineering prompt | Copy into your next session |
| **IMPLEMENTATION/SETUP-CHECKLIST.md** | Clone to verified environment | Follow once |

| Phase | File | Purpose |
| ----- | ---- | ------- |
| 1 | [`phase-1-product-vision.md`](../CORE-PHASES/phase-1-product-vision.md) | Strategy, personas, roles, business rules, KPIs |
| 2 | [`phase-2-experience-maps.md`](../CORE-PHASES/phase-2-experience-maps.md) | 19 journeys, decision points, failure paths |
| 3 | [`phase-3-information-architecture.md`](../CORE-PHASES/phase-3-information-architecture.md) | Sitemap, navigation, permissions |
| 4 | [`phase-4-page-blueprints.md`](../CORE-PHASES/phase-4-page-blueprints.md) | 46 page specs |
| 5 | [`phase-5-section-blueprints.md`](../CORE-PHASES/phase-5-section-blueprints.md) | 70 sections |
| 6 | [`phase-6-interaction-contracts.md`](../CORE-PHASES/phase-6-interaction-contracts.md) | 88 behaviour contracts |
| 7 | [`phase-7-frontend-architecture.md`](../CORE-PHASES/phase-7-frontend-architecture.md) | Folder structure, routes, data flow |
| 8 | [`phase-8-implementation-roadmap.md`](../CORE-PHASES/phase-8-implementation-roadmap.md) | 16-week plan, build status, deferrals |
| 9 | [`phase-9-qa-checklist.md`](../CORE-PHASES/phase-9-qa-checklist.md) | Accessibility, performance, security |

---

## Quick 3-Step Workflow

### 1. Read (15 min)

`.claude/CLAUDE.md`, then [README](README.md), then the phase for your task (see Quick Reference below).

### 2. Copy

Copy [`IMPLEMENTATION/IMPLEMENTATION_PROMPT.md`](../IMPLEMENTATION/IMPLEMENTATION_PROMPT.md) into your session as the working brief.

### 3. Execute

Pick a page or feature. Check its row in [Phase 8](../CORE-PHASES/phase-8-implementation-roadmap.md#per-feature-build-status). Run its visual concept with the owner. Build to Phases 4–6. Verify with Phase 9. Update its status.

---

## Next Session

Start the next session by pasting `IMPLEMENTATION/IMPLEMENTATION_PROMPT.md`, then name the page or feature you are working on. The prompt tells the session what to read, what remains, and how to hand off the visual design.

---

## Quick Reference

| I want to... | Go to... |
| ------------ | -------- |
| Know the binding rules | `.claude/CLAUDE.md` |
| Understand the strategy | `CORE-PHASES/phase-1-product-vision.md` |
| Check a business rule | `CORE-PHASES/phase-1-product-vision.md#business-rules` |
| See a user flow | `CORE-PHASES/phase-2-experience-maps.md` |
| See page specifications | `CORE-PHASES/phase-4-page-blueprints.md` |
| Find how a control behaves | `CORE-PHASES/phase-6-interaction-contracts.md` |
| Decide how a page looks | Run a visual concept with the owner — `IMPLEMENTATION/IMPLEMENTATION_PROMPT.md#visual-design-hand-off` |
| Know what to build | `IMPLEMENTATION/IMPLEMENTATION_PROMPT.md` |
| Know whether it is built | `CORE-PHASES/phase-8-implementation-roadmap.md` |
| Understand codebase setup | `CORE-PHASES/phase-7-frontend-architecture.md` |
| Set up my machine | `IMPLEMENTATION/SETUP-CHECKLIST.md` |
| See where code and spec differ | `INDEX/RATIFIED_DIVERGENCES.md` |
| Verify before shipping | `CORE-PHASES/phase-9-qa-checklist.md` |

---

## What Changed in Version 2.0

The design OS was regenerated under `docs/MASTER_PROMPT_COMPLETE.md` as a merge. Ten phases became nine: the Component Library became **Interaction Contracts** (behaviour only), the Design Tokens phase was retired (visual design is governed by the code), and the architecture, roadmap and QA phases moved up one number. Nothing specified was removed. Each phase ends with Regeneration Notes listing what was added and what visual prescription was dropped.

---

## Links

All links above are relative paths within `design-os/`. Version 1 artifact mirrors (historical, pre-2.0) are listed in [ARTIFACT_INDEX](ARTIFACT_INDEX.md#appendix-published-artifact-mirrors); the markdown here is canonical.

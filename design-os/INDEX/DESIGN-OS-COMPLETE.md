# Design Operating System — Complete Index

**Keyhold | 9 Phases | All Local Markdown** · Version 2.0 · 29 September 2026

Master index and single source of truth for what exists in `design-os/`. Entry point: [START_HERE](START_HERE.md).

---

## Contents

1. [Executive Summary](#executive-summary)
2. [Authority](#authority)
3. [All Files](#all-files)
4. [What Each Phase Contains](#what-each-phase-contains)
5. [Ancillary Documents](#ancillary-documents)
6. [Deliverable Statistics](#deliverable-statistics)
7. [How to Use This Document](#how-to-use-this-document)
8. [Cross-references Between Phases](#cross-references-between-phases)
9. [What's Included vs. Not Included](#whats-included-vs-not-included)
10. [Deviations from the Seed Prompt](#deviations-from-the-seed-prompt)
11. [The Implementation Prompt](#the-implementation-prompt)
12. [Quick Reference](#quick-reference)
13. [File Manifest](#file-manifest)
14. [Version History](#version-history)

---

## Executive Summary

✅ **Complete 9-phase Design Operating System** for Keyhold, a real estate marketplace for buyers, sellers, agents and platform operators
✅ **17 documents in `design-os/`, all markdown** — 9 phases, 6 ancillary documents, plus RATIFIED_DIVERGENCES and \_FOLDER_STRUCTURE
✅ **Phases 1–6:** what the product does — strategy, journeys, IA, pages, sections, interaction contracts
✅ **Phases 7–9:** how it is built and proven — architecture, roadmap with build status, QA

This design OS defines **what the product does**. It does not decide how anything looks: the look of each page is decided when it is built, with the owner ([Visual Design Hand-off](../IMPLEMENTATION/IMPLEMENTATION_PROMPT.md#visual-design-hand-off)).

Version 2.0 regenerated the earlier ten-phase set under `docs/MASTER_PROMPT_COMPLETE.md` as a **merge**: every page, section, component, flow, persona, role, state and business rule survived; visual prescriptions were dropped and listed in each file's Regeneration Notes.

---

## Authority

`.claude/CLAUDE.md` at the repo root binds code. This folder records the product's intent and reasoning. Where they disagree, `.claude/CLAUDE.md` wins. Where the shipped code departs from Phases 1–7, [RATIFIED_DIVERGENCES.md](RATIFIED_DIVERGENCES.md) records the owner's decision — the phases are not rewritten to close the gap. Build status lives only in [Phase 8](../CORE-PHASES/phase-8-implementation-roadmap.md#per-feature-build-status).

---

## All Files

| File                                                | Phase | Purpose                                              |
| --------------------------------------------------- | ----- | ---------------------------------------------------- |
| **INDEX/START_HERE.md**                             | Intro | Read this first (2 min)                              |
| **INDEX/README.md**                                 | Intro | Five-minute overview                                 |
| **INDEX/DESIGN-OS-COMPLETE.md**                     | Intro | This file — master index                             |
| **INDEX/ARTIFACT_INDEX.md**                         | All   | Deep description of each phase                       |
| **INDEX/\_FOLDER_STRUCTURE.md**                     | All   | Folder layout, per-role reading order                |
| **INDEX/RATIFIED_DIVERGENCES.md**                   | All   | Where the code and the spec part company             |
| **IMPLEMENTATION/IMPLEMENTATION_PROMPT.md**         | 7-9   | ⭐ Engineering synthesis, sprint guide, hand-off     |
| **IMPLEMENTATION/SETUP-CHECKLIST.md**               | 7     | Clone to verified working environment                |
| **CORE-PHASES/phase-1-product-vision.md**           | 1     | Strategy, personas, business rules, KPIs             |
| **CORE-PHASES/phase-2-experience-maps.md**          | 2     | 19 user journeys, decision points                    |
| **CORE-PHASES/phase-3-information-architecture.md** | 3     | Sitemap, navigation, permissions, hierarchies        |
| **CORE-PHASES/phase-4-page-blueprints.md**          | 4     | 46 page specs                                        |
| **CORE-PHASES/phase-5-section-blueprints.md**       | 5     | 70 sections                                          |
| **CORE-PHASES/phase-6-interaction-contracts.md**    | 6     | 88 interaction contracts                             |
| **CORE-PHASES/phase-7-frontend-architecture.md**    | 7     | Codebase structure                                   |
| **CORE-PHASES/phase-8-implementation-roadmap.md**   | 8     | 16-week plan, build status, deferred register        |
| **CORE-PHASES/phase-9-qa-checklist.md**             | 9     | Pre-launch verification                              |

---

## What Each Phase Contains

### Phase 1: Product Vision

Vision, purpose, goals, value proposition, four personas and three system roles, JTBD for every role, business rules BR1–BR18, KPIs and North Star, product principles, governance, constraints, non-goals.
**Use When:** Strategy alignment; checking a rule before building a flow.

### Phase 2: Experience Maps

Nineteen journeys — primary flows, role dashboards, supporting flows and operator flows — each with intent, trigger, entry points, decision points, emotional states, failure and recovery paths, completion criteria, dependencies.
**Use When:** Designing or changing a flow.

### Phase 3: Information Architecture

Sitemap (all shipped routes), role navigation, permissions matrix, taxonomy, labelling, content hierarchy, search, filtering, cross-linking, breadcrumb and SEO hierarchies, empty and fallback routes.
**Use When:** Routing, auth, permissions, naming.

### Phase 4: Page Blueprints

46 pages, each with purpose, objectives, primary tasks, content requirements in priority order, data, permissions, device needs, states, actions, dependencies, implementation notes.
**Use When:** Building a page (PRIMARY REFERENCE FOR CODING).

### Phase 5: Section Blueprints

70 sections by the job each does — content model, data, interaction, device needs, accessibility, states — with shared Section Defaults.
**Use When:** Composing pages.

### Phase 6: Interaction Contracts

88 contracts — inputs, states, keyboard, ARIA, validation, loading and error behaviour, content rules — for primitives, patterns, domain compositions and added shipped controls.
**Use When:** Implementing or changing any interactive element.

### Phase 7: Frontend Architecture

Folder and route structure, layouts, providers and stores, component organisation, portal data flow, API layer, hooks, utilities, state, types, shared libraries, assets, naming, code splitting, performance. Styling is a pointer to the code.
**Use When:** Placing a new file, understanding data flow.

### Phase 8: Implementation Roadmap

Development phases, 16-week sprint breakdown, milestones, dependencies, risks, technical-debt prevention, testing, deployment — and the per-feature build status for every page, section, contract and flow, plus the deferred register.
**Use When:** Planning work; finding out whether something is built.

### Phase 9: QA Checklist

213 functional checks: accessibility, responsiveness, browsers, performance, behavioural consistency, state coverage, content honesty, security, admin console, SEO, scalability.
**Use When:** Before marking anything Verified; pre-launch.

---

## Ancillary Documents

| Document | What it is |
| -------- | ---------- |
| [START_HERE.md](START_HERE.md) | Entry point: what is here, the three-step workflow, quick reference |
| [README.md](README.md) | Five-minute overview, file list, how each role uses it, statistics |
| DESIGN-OS-COMPLETE.md | This master index |
| [ARTIFACT_INDEX.md](ARTIFACT_INDEX.md) | Per-phase deep descriptions, reading paths, keywords, build status roll-up |
| [SETUP-CHECKLIST.md](../IMPLEMENTATION/SETUP-CHECKLIST.md) | Environment, initialization, dependencies, testing, workflow, verification |
| [IMPLEMENTATION_PROMPT.md](../IMPLEMENTATION/IMPLEMENTATION_PROMPT.md) | The self-contained engineering prompt, including the Visual Design Hand-off |
| [\_FOLDER_STRUCTURE.md](_FOLDER_STRUCTURE.md) | Folder layout and reading orders (kept from version 1) |
| [RATIFIED_DIVERGENCES.md](RATIFIED_DIVERGENCES.md) | Owner decisions where code departs from the spec (kept from version 1) |

---

## Deliverable Statistics

| Measure | Count |
| ------- | ----- |
| Phases | 9 |
| Documents | 17 (9 phases + 6 ancillary + 2 retained companions) |
| Journeys | 19 |
| Pages | 46 (27 original + 19 added) |
| Sections | 70 |
| Interaction contracts | 88 (78 carried + 10 added) |
| Business rules | 18 |
| QA items | 213 |
| Timeline | 16 weeks, ~1120 hours |
| Build status (pages incl. sub-rows) | See [ARTIFACT_INDEX › Build Status Roll-up](ARTIFACT_INDEX.md#build-status-roll-up) |

---

## How to Use This Document

Use it as the index: find the phase that answers your question in [Quick Reference](#quick-reference), open it, and follow its previous/next links. Every phase opens with a contents list and closes with Regeneration Notes that say what changed in version 2.0.

---

## Cross-references Between Phases

| From | To | Link |
| ---- | -- | ---- |
| Phase 1 business rules | Phases 2, 4, 5, 6, 9 | Cited as BR1–BR18 |
| Phase 2 journeys | Phase 4 pages, Phase 8 flows | Cited as J1–J19 |
| Phase 3 routes | Phase 4 Page Index, Phase 7 route structure | Same route list |
| Phase 4 content requirements | Phase 5 sections | "(Section N)" |
| Phase 5 sections | Phase 6 contracts | Contracts implement section interactions |
| Phase 6 contracts | Phase 7 component organisation | C1–C30 in `ui/` and `patterns/`, C31–C88 in `features/` |
| Phases 1–7 features | Phase 8 build status | One status row each |
| Phase 9 checks | Phase 8 "Verified" | Passing Phase 9 is the only route to Verified |
| RATIFIED_DIVERGENCES | Phases 1, 4, 5 | "Page N module M", "Section N", "Phase 1 · …" |

---

## What's Included vs. Not Included

**Included:** product strategy, users and roles, journeys, IA, page and section content, behaviour contracts, architecture, roadmap, build status, QA.

**Not included — by design:**

- **Visual design:** colour, type, spacing, layout, placement, imagery, motion, wireframes. Decided per page at build time with the owner; governed by the code (`styles/`, `.claude/CLAUDE.md`, [ADR 0012](../../docs/adr/0012-tokens-are-the-design-source-of-truth.md) as a code convention).
- **Code conventions** beyond what architecture needs: `.claude/CLAUDE.md` owns them.
- **Architecture decision records:** `docs/adr/` (referenced, not reproduced).
- **Backend design:** `../backend`.

---

## Deviations from the Seed Prompt

`docs/MASTER_PROMPT_COMPLETE.md` asks for 15 files written flat into `{{OUTPUT_DIR}}` (default `design-os/generated/`). This design OS deviates, for stated reasons:

1. **Folder layout kept.** Files stay in `CORE-PHASES/`, `IMPLEMENTATION/` and `INDEX/` as in version 1, so existing links, RATIFIED_DIVERGENCES references and git history keep working. Phase files were renamed with `git mv` to the seed's names.
2. **Two extra files kept.** `INDEX/RATIFIED_DIVERGENCES.md` (owner decisions — must survive) and `INDEX/_FOLDER_STRUCTURE.md` (navigation) are retained alongside the seed's 15.
3. **Output directory.** `design-os/generated/` is not used.
4. **Stale pointer in `.claude/CLAUDE.md`.** Its folder table still describes `/design-os` as "(flat) — Design-system seed prompt". The seed prompt now lives in `docs/`; the table is the owner's to update.

---

## The Implementation Prompt

**`IMPLEMENTATION/IMPLEMENTATION_PROMPT.md`** synthesises all nine phases into engineering action: architecture map, sprint plan with pages per sprint, what remains, QA categories, code patterns, testing strategy, gates, deployment readiness — and the verbatim Visual Design Hand-off.

1. It is **project-specific** to this codebase, not a reusable seed prompt.
2. It is a **plan**, not a mirror of the current tree. Check Phase 8's build status and the working tree before acting on a sprint, and defer to `.claude/CLAUDE.md` on every structural question.

---

## Quick Reference

| I want to...                    | Go to...                                        |
| ------------------------------- | ----------------------------------------------- |
| Know the binding rules          | `.claude/CLAUDE.md`                             |
| See where code differs          | `INDEX/RATIFIED_DIVERGENCES.md`                 |
| Understand the strategy         | `CORE-PHASES/phase-1-product-vision.md`         |
| Check a business rule           | `CORE-PHASES/phase-1-product-vision.md#business-rules` |
| See user flows                  | `CORE-PHASES/phase-2-experience-maps.md`        |
| See page specifications         | `CORE-PHASES/phase-4-page-blueprints.md`        |
| Find how a control behaves      | `CORE-PHASES/phase-6-interaction-contracts.md`  |
| Decide how a page looks         | With the owner, at build time — `IMPLEMENTATION/IMPLEMENTATION_PROMPT.md#visual-design-hand-off` |
| Know what to build              | `IMPLEMENTATION/IMPLEMENTATION_PROMPT.md`       |
| Know whether something is built | `CORE-PHASES/phase-8-implementation-roadmap.md#per-feature-build-status` |
| Understand codebase setup       | `CORE-PHASES/phase-7-frontend-architecture.md`  |
| See sprint breakdown            | `CORE-PHASES/phase-8-implementation-roadmap.md` |
| Verify before shipping          | `CORE-PHASES/phase-9-qa-checklist.md`           |

---

## File Manifest

```
design-os/
├── INDEX/
│   ├── START_HERE.md                        (read first)
│   ├── README.md                            (5-minute overview)
│   ├── DESIGN-OS-COMPLETE.md                (this file)
│   ├── ARTIFACT_INDEX.md                    (per-phase descriptions, status roll-up)
│   ├── RATIFIED_DIVERGENCES.md              (spec-vs-code reconciliation)
│   └── _FOLDER_STRUCTURE.md                 (layout + reading orders)
│
├── CORE-PHASES/
│   ├── phase-1-product-vision.md
│   ├── phase-2-experience-maps.md
│   ├── phase-3-information-architecture.md
│   ├── phase-4-page-blueprints.md
│   ├── phase-5-section-blueprints.md
│   ├── phase-6-interaction-contracts.md     (was phase-6-component-library.md)
│   ├── phase-7-frontend-architecture.md     (was phase-8-frontend-architecture.md)
│   ├── phase-8-implementation-roadmap.md    (was phase-9-implementation-roadmap.md)
│   └── phase-9-qa-checklist.md              (was phase-10-qa-checklist.md)
│
└── IMPLEMENTATION/
    ├── IMPLEMENTATION_PROMPT.md             (sprint guide + visual hand-off)
    └── SETUP-CHECKLIST.md                   (environment to verified build)
```

Version 1's `phase-7-design-tokens.md` has no successor. Its non-visual rules moved to Phases 6, 7 and 9 (see [Phase 7 › Styling](../CORE-PHASES/phase-7-frontend-architecture.md#styling)); it remains in git history.

---

## Version History

| Version | Date | Change |
| ------- | ---- | ------ |
| 1.0–1.1 | to 6 September 2026 | Ten-phase design OS: Phases 1–7 design and tokens, 8–10 architecture, roadmap, QA |
| 2.0 | 29 September 2026 | Regenerated as a merge under the 9-phase master prompt: visual prescription dropped, component library → interaction contracts, tokens phase retired, 19 pages / 6 journeys / 10 contracts added, build status resolved against the code |

---

**All 9 phases complete. Code authority is `.claude/CLAUDE.md`.**

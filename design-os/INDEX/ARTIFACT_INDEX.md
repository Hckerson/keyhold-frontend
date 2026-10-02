# Design OS Phase Index

**All 9 phases are local markdown files in `design-os/CORE-PHASES/`.** · Version 2.0 · 29 September 2026

Deep description of every phase: who needs it, when to open it, what it holds, how it connects. Master index: [DESIGN-OS-COMPLETE](DESIGN-OS-COMPLETE.md) · Entry point: [START_HERE](START_HERE.md).

Phases 1-7 of the version 1 set were also published as browser-viewable artifacts. Those URLs are listed at the bottom as historical mirrors — **the markdown is canonical**, and the mirrors predate version 2.0.

---

## Contents

1. [The 9 Phases](#the-9-phases)
2. [Implementation Files (Phases 7–9)](#implementation-files-phases-79)
3. [Index & Implementation Documents](#index--implementation-documents)
4. [Reading Order](#reading-order)
5. [Search Keywords](#search-keywords)
6. [Build Status Roll-up](#build-status-roll-up)
7. [Quick Reference](#quick-reference)
8. [How to Access](#how-to-access)
9. [Appendix: Published Artifact Mirrors](#appendix-published-artifact-mirrors)

---

## The 9 Phases

### Phase 1: Product Vision

**File:** [`CORE-PHASES/phase-1-product-vision.md`](../CORE-PHASES/phase-1-product-vision.md)
**Description:** The strategic foundation. It states why Keyhold exists, the four personas and the three system roles that serve them, and the jobs each role hires the product for. It fixes the eighteen business rules every later phase cites — escrow authorisation, required decision notes, derived stages and temperatures, no fabricated data — and the KPIs and North Star that measure success. Governance, constraints and non-goals close it.
**Who needs it:** Product, leadership, anyone building a money or trust flow.
**When to reference:** Strategy alignment; before building any flow that a business rule governs; when judging whether a feature is a non-goal or merely deferred.
**Contains:** vision, purpose, goals, value proposition, personas, roles, JTBD, BR1–BR18, KPIs, North Star, competitive positioning, principles, brand voice, governance, constraints, implementation philosophy, non-goals, scalability.
**Flows to:** every phase; Phase 8 (deferred items), Phase 9 (content honesty).

### Phase 2: Experience Maps

**File:** [`CORE-PHASES/phase-2-experience-maps.md`](../CORE-PHASES/phase-2-experience-maps.md)
**Description:** Nineteen journeys designed before any page. Seven marketplace journeys, six operator journeys, and six added in version 2.0 for the role dashboards and supporting flows — listing submission, deposit and escrow, reporting and disputes, notifications. Each carries an experience frame (intent, trigger, entry points, decision points, recovery, completion, dependencies) plus steps, emotional states and failure paths.
**Who needs it:** Product, designers, QA (edge cases).
**When to reference:** Designing or changing a flow; writing test scenarios.
**Contains:** J1–J19, emotional arc summaries.
**Flows to:** Phase 3 (routes), Phase 4 (pages), Phase 8 (flow status).

### Phase 3: Information Architecture

**File:** [`CORE-PHASES/phase-3-information-architecture.md`](../CORE-PHASES/phase-3-information-architecture.md)
**Description:** What exists, what it is called and who may reach it. The sitemap now lists every shipped route; role navigation models say what each role's navigation must offer, in priority order. The permissions matrix, taxonomy (with the code's own vocabulary alongside), labelling and copy rules sit here, with search, filtering, cross-linking, breadcrumb, SEO, empty and fallback strategies.
**Who needs it:** Engineers (routing, guards), content, SEO.
**When to reference:** Adding a route; naming anything; setting permissions.
**Contains:** sitemap, navigation models, permissions, taxonomy, labels, hierarchies, fallback routes, expansion strategy.
**Flows to:** Phase 4 (Page Index), Phase 7 (route structure).

### Phase 4: Page Blueprints

**File:** [`CORE-PHASES/phase-4-page-blueprints.md`](../CORE-PHASES/phase-4-page-blueprints.md) ⭐ PRIMARY REFERENCE
**Description:** Forty-six pages, each specified by purpose, objectives, primary tasks (user goals, never controls), required data, permissions, device needs, states, rules and dependencies. What a page contains is decided with the owner at build time. The 27 original pages keep their numbers, and their version 1 module numbers survive as identifiers, so RATIFIED_DIVERGENCES references still resolve. Pages 28–46 record the routes that shipped without a blueprint.
**Who needs it:** Engineers building a page; QA writing cases; the owner reviewing a visual concept against what the page must do.
**When to reference:** Before building or changing any page.
**Contains:** Page Index, Pages 1–46, mapping from the seed's generic page list.
**Flows to:** Phase 5 (sections), Phase 8 (page status).

### Phase 5: Section Blueprints

**File:** [`CORE-PHASES/phase-5-section-blueprints.md`](../CORE-PHASES/phase-5-section-blueprints.md)
**Description:** Seventy sections, each defined by the single job it does: data requirements, interactions, device needs, accessibility, rules and states — never what the section shows or which components it uses. Section Defaults state the shared loading, error, empty and accessibility behaviour once. Layout, sizing and imagery were removed; behaviour that those lines carried survives in neutral words.
**Who needs it:** Engineers composing pages.
**When to reference:** Building or reusing a section.
**Contains:** Sections 1–70 in ten groups.
**Flows to:** Phase 6 (contracts), Phase 8 (section status).

### Phase 6: Interaction Contracts

**File:** [`CORE-PHASES/phase-6-interaction-contracts.md`](../CORE-PHASES/phase-6-interaction-contracts.md) (was `phase-6-component-library.md`)
**Description:** How every interactive element behaves. The 78 components of version 1 survive as contracts C1–C78 — inputs, states, keyboard, ARIA, validation, loading and error behaviour, content rules — with visual variants and sizes removed. C79–C88 add shipped controls that had no contract (report, checkout, confirm modal, escrow settle and others).
**Who needs it:** Engineers implementing controls; accessibility reviewers.
**When to reference:** Implementing or changing any control.
**Contains:** Contract Defaults, C1–C88, accessibility standards, testing expectations.
**Flows to:** Phase 7 (component organisation), Phase 9 (contract completeness).

### Phase 7: Frontend Architecture

**File:** [`CORE-PHASES/phase-7-frontend-architecture.md`](../CORE-PHASES/phase-7-frontend-architecture.md) (was `phase-8-frontend-architecture.md`)
**Description:** The shape of the codebase: folders, routes and rendering split, layouts, providers and stores, component organisation, the console data-flow rule, the three-layer API pattern, hooks, utilities, state, types, libraries, assets, naming, code splitting and performance. Styling is a pointer to the code; the retired tokens phase's non-visual rules are mapped here.
**Who needs it:** Engineers.
**When to reference:** Placing a file; understanding data flow.
**Contains:** 20 sections from Authority to Performance Strategy.
**Flows to:** Phase 8 (dependencies), SETUP-CHECKLIST, IMPLEMENTATION_PROMPT.

### Phase 8: Implementation Roadmap

**File:** [`CORE-PHASES/phase-8-implementation-roadmap.md`](../CORE-PHASES/phase-8-implementation-roadmap.md) (was `phase-9-implementation-roadmap.md`)
**Description:** The 16-week plan with milestones, dependencies, risks and testing — and the only place build status is recorded. Every page, section, contract and flow carries one status from the fixed vocabulary, resolved against the code on 29 September 2026, with sub-rows for unbuilt parts and a register of owner deferrals.
**Who needs it:** Leads, engineers picking up work, QA.
**When to reference:** Planning; asking "is this built?".
**Contains:** sprints, milestones, risks, debt prevention, testing, deployment, status vocabulary, per-feature status, deferred register.
**Flows to:** Phase 9 (Verified), IMPLEMENTATION_PROMPT (what remains).

### Phase 9: QA Checklist

**File:** [`CORE-PHASES/phase-9-qa-checklist.md`](../CORE-PHASES/phase-9-qa-checklist.md) (was `phase-10-qa-checklist.md`)
**Description:** 213 functional checks. Visual quality is judged when each page is built; everything else — accessibility, responsiveness, browsers, performance, consistency, states, content honesty, security, admin, SEO, scalability — is here. Passing it is the only route to **Verified**.
**Who needs it:** QA, engineers before merge, the release owner.
**When to reference:** Before marking a feature Verified; pre-launch.
**Contains:** 16 check groups and sign-off.
**Flows to:** Phase 8 (status).

---

## Implementation Files (Phases 7–9)

| File                             | Breakdown                                                                                                                                                                                                                                                                                       |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Phase 7 — Frontend Architecture  | Folder tree · route/rendering/guard table · layouts · providers and stores · component folders · console data flow · API pattern · hooks by kind · utilities and constants · state · types · libraries (Library Selection Policy) · assets · styling pointer · naming · splitting · performance |
| Phase 8 — Implementation Roadmap | Releases and priority · 8 sprints (hours, deliverables) · milestones · dependency table · risks · debt prevention · testing · deployment · status vocabulary · 4 status tables + cross-cutting · deferred register                                                                              |
| Phase 9 — QA Checklist           | Accessibility · responsiveness · browsers · Core Web Vitals · consistency · states · content honesty · code and security · admin console · SEO · scalability · pre-launch · post-launch · sign-off                                                                                              |

---

## Index & Implementation Documents

- **[INDEX/START_HERE.md](START_HERE.md)** — two-minute orientation, the three-step workflow.
- **[INDEX/README.md](README.md)** — five-minute overview; how each role uses the OS.
- **[INDEX/DESIGN-OS-COMPLETE.md](DESIGN-OS-COMPLETE.md)** — master index, statistics, deviations from the seed.
- **[INDEX/\_FOLDER_STRUCTURE.md](_FOLDER_STRUCTURE.md)** — folder layout and per-role reading orders.
- **[INDEX/RATIFIED_DIVERGENCES.md](RATIFIED_DIVERGENCES.md)** — owner decisions where the code departs from Phases 1–7.
- **[IMPLEMENTATION/IMPLEMENTATION_PROMPT.md](../IMPLEMENTATION/IMPLEMENTATION_PROMPT.md)** — the engineering prompt: architecture map, sprints, what remains, patterns, testing, gates, the Visual Design Hand-off.
- **[IMPLEMENTATION/SETUP-CHECKLIST.md](../IMPLEMENTATION/SETUP-CHECKLIST.md)** — from clone to verified environment.

---

## Reading Order

### If You Have 5 Minutes

1. `INDEX/START_HERE.md`
2. `INDEX/DESIGN-OS-COMPLETE.md`

### If You're Building Code (Most Important)

1. `.claude/CLAUDE.md` ⭐⭐⭐ (binding rules — overrides everything here)
2. `CORE-PHASES/phase-7-frontend-architecture.md` (codebase structure)
3. `CORE-PHASES/phase-4-page-blueprints.md` (page specs, reference constantly)
4. `CORE-PHASES/phase-6-interaction-contracts.md` (control behaviour)
5. `CORE-PHASES/phase-8-implementation-roadmap.md` (is it built?)
6. `IMPLEMENTATION/IMPLEMENTATION_PROMPT.md` (sprint guide, visual hand-off)

### If You're Designing

1. `CORE-PHASES/phase-2-experience-maps.md` (journeys)
2. `CORE-PHASES/phase-4-page-blueprints.md` (what each page must offer)
3. `CORE-PHASES/phase-5-section-blueprints.md` (sections in pages)
4. `CORE-PHASES/phase-6-interaction-contracts.md` (behaviour your concept must honour)
5. `IMPLEMENTATION/IMPLEMENTATION_PROMPT.md#visual-design-hand-off` (how a visual concept is approved)

### If You're Managing/Leading

1. `CORE-PHASES/phase-1-product-vision.md` (strategy, rules)
2. `CORE-PHASES/phase-2-experience-maps.md` (user flows)
3. `CORE-PHASES/phase-8-implementation-roadmap.md` (timeline, status, deferrals)
4. `CORE-PHASES/phase-9-qa-checklist.md` (quality standards)

### If You're Testing

1. `CORE-PHASES/phase-9-qa-checklist.md`
2. `CORE-PHASES/phase-2-experience-maps.md` (failure and recovery paths)
3. `CORE-PHASES/phase-4-page-blueprints.md` (states per page)

---

## Search Keywords

| Phase | Keywords                                                                                                                                                                             |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1     | vision, persona, role, SELLER, JTBD, business rule, BR, escrow, KPI, North Star, NPS, principle, governance, non-goal                                                                |
| 2     | journey, J1–J19, trigger, entry point, decision point, emotional arc, failure path, recovery, triage, moderation, dispute                                                            |
| 3     | sitemap, route, navigation, permission, taxonomy, label, empty state copy, breadcrumb, SEO, fallback, filter hierarchy                                                               |
| 4     | page, Page N, module, primary task, required data, rules, device needs, loading, empty, error, success, admin, portal                                                                |
| 5     | section, Section N, data requirements, interactions, defaults, Start a property search, Listing summary, Offer Form, Message Thread, Sortable records, Admin navigation and identity |
| 6     | contract, C1–C88, keyboard, ARIA, validation, confirm modal, focus, toast, combobox, switch                                                                                          |
| 7     | folder, route group, layout, provider, store, console, hook, query key, mapper, API client, contract, splitting, lazy                                                                |
| 8     | sprint, milestone, risk, dependency, status, Specified, Built, Verified, Deferred, register                                                                                          |
| 9     | QA, WCAG, contrast, reflow, LCP, INP, CLS, bundle, security, admin QA, sign-off                                                                                                      |

**Changed (2 October 2026):** the Phase 5 keywords use the job-based section names ("Hero Search" → "Start a property search", "Listing Card" → "Listing summary", "Data Table" → "Sortable records", "Admin Console Shell" → "Admin navigation and identity"); headings are no longer "kept as identifiers" — section numbers are. Old names: Phase 5 › Regeneration Notes.

---

## Build Status Roll-up

A view over [Phase 8](../CORE-PHASES/phase-8-implementation-roadmap.md#per-feature-build-status) as of 29 September 2026 — never a substitute for it. Features are never removed because of their status.

| Area                     | Total | Built | In progress | Specified | Deferred | Verified |
| ------------------------ | ----- | ----- | ----------- | --------- | -------- | -------- |
| Pages                    | 46    | 46    | —           | —         | —        | 0        |
| Page parts (sub-rows)    | 14    | —     | 2           | 6         | 6        | 0        |
| Sections                 | 70    | 65    | —           | 5         | —        | 0        |
| Section parts (sub-rows) | 4     | —     | —           | 2         | 2        | 0        |
| Interaction contracts    | 88    | 85    | —           | 3         | —        | 0        |
| Flows (journeys)         | 19    | 19    | —           | —         | —        | 0        |
| Flow parts (sub-rows)    | 3     | —     | —           | 2         | 1        | 0        |

Nothing is **Verified** because no Phase 9 sign-off is recorded. Nothing is **Scheduled** because no sprint currently assigns remaining work.

---

## Quick Reference

| Need                   | Document    | File                                                |
| ---------------------- | ----------- | --------------------------------------------------- |
| **Binding code rules** | **—**       | **`.claude/CLAUDE.md`**                             |
| Business Strategy      | Phase 1     | `CORE-PHASES/phase-1-product-vision.md`             |
| User Flows             | Phase 2     | `CORE-PHASES/phase-2-experience-maps.md`            |
| Navigation/Routes      | Phase 3     | `CORE-PHASES/phase-3-information-architecture.md`   |
| **Page Specs**         | **Phase 4** | **`CORE-PHASES/phase-4-page-blueprints.md`**        |
| Section Specs          | Phase 5     | `CORE-PHASES/phase-5-section-blueprints.md`         |
| Control Behaviour      | Phase 6     | `CORE-PHASES/phase-6-interaction-contracts.md`      |
| **Codebase Structure** | **Phase 7** | **`CORE-PHASES/phase-7-frontend-architecture.md`**  |
| **Plan and Status**    | **Phase 8** | **`CORE-PHASES/phase-8-implementation-roadmap.md`** |
| **QA Checklist**       | **Phase 9** | **`CORE-PHASES/phase-9-qa-checklist.md`**           |
| Sprint Guide           | Master      | `IMPLEMENTATION/IMPLEMENTATION_PROMPT.md`           |

**Bold = Most important for engineering**

---

## How to Access

Everything is markdown in the repo:

```bash
cat design-os/CORE-PHASES/phase-7-frontend-architecture.md
cat design-os/CORE-PHASES/phase-8-implementation-roadmap.md
cat design-os/CORE-PHASES/phase-9-qa-checklist.md
```

---

## Appendix: Published Artifact Mirrors

Historical mirrors of **version 1** Phases 1–7. They predate version 2.0: they still contain the visual prescription dropped in the regeneration, and phases 6 and 7 there are the retired Component Library and Design Tokens. Do not build from them.

| Phase (v1) | URL                                                                  |
| ---------- | -------------------------------------------------------------------- |
| 1          | https://claude.ai/code/artifact/257167b4-d827-4556-8bb7-21b664726b71 |
| 2          | https://claude.ai/code/artifact/73797095-b2c6-42c8-a29c-e89363470caa |
| 3          | https://claude.ai/code/artifact/63ef5a57-d3fe-44b1-bdce-67e4fd3ad2e3 |
| 4          | https://claude.ai/code/artifact/06e9a4b4-a818-4e47-aa64-b95002c9bbb9 |
| 5          | https://claude.ai/code/artifact/140f03aa-ebb5-419b-b998-75ed29e537db |
| 6          | https://claude.ai/code/artifact/5c74a0c4-da0f-4258-8b89-4d76231ac53e |
| 7          | https://claude.ai/code/artifact/bebd6aa0-7e77-4308-88b8-8874708d4106 |

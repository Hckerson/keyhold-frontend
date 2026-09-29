# Design Operating System (Design OS)

**Keyhold — complete product specification. 9 phases. All local markdown.** · Version 2.0 · 29 September 2026

Entry point: [START_HERE](START_HERE.md) · Master index: [DESIGN-OS-COMPLETE](DESIGN-OS-COMPLETE.md).

---

## What Is This?

**In 30 seconds:** a structured specification of what Keyhold — a real estate marketplace for buyers, sellers, agents and platform operators — does: who uses it, the journeys they take, the pages and sections that serve those journeys, how every control behaves, how the code is organised, what is built, and how it is proven. It defines **what the product does** and leaves **how it looks** to the build, where each page's visual concept is approved by the owner.

Covers:

- ✅ Product vision, roles & business rules (Phase 1)
- ✅ User experiences & journeys (Phase 2)
- ✅ Information architecture (Phase 3)
- ✅ Page specifications (Phase 4)
- ✅ Sections (Phase 5)
- ✅ Interaction contracts (Phase 6)
- ✅ Frontend architecture (Phase 7)
- ✅ Implementation roadmap & build status (Phase 8)
- ✅ QA & accessibility (Phase 9)

**Result:** No ambiguity about what to build. Engineers build with confidence; the owner decides the look page by page.

---

## Authority

This folder is the **design record** — the product's intent and the reasoning behind it. It is not the code's style guide.

`.claude/CLAUDE.md` at the repo root is the binding specification for code: folder placement, data flow, naming, styling, dependency policy, testing. Where a phase document and `.claude/CLAUDE.md` disagree, `.claude/CLAUDE.md` wins. Where the shipped app departs from the spec, [RATIFIED_DIVERGENCES.md](RATIFIED_DIVERGENCES.md) records the owner's decision.

---

## Quick Start

- **Read** `.claude/CLAUDE.md`, then [DESIGN-OS-COMPLETE](DESIGN-OS-COMPLETE.md).
- **Look up** the page you are building in [Phase 4](../CORE-PHASES/phase-4-page-blueprints.md) and its status in [Phase 8](../CORE-PHASES/phase-8-implementation-roadmap.md#per-feature-build-status).
- **Execute** with [IMPLEMENTATION_PROMPT](../IMPLEMENTATION/IMPLEMENTATION_PROMPT.md) — starting with the visual concept for the owner.

---

## All Files

Paths are relative to `design-os/`.

| File                                                | Purpose                                         | Read This If...                        |
| --------------------------------------------------- | ----------------------------------------------- | -------------------------------------- |
| **INDEX/START_HERE.md**                             | Orientation, 2-minute entry point               | You're new to this folder              |
| **INDEX/README.md**                                 | This overview                                   | You want the 5-minute picture          |
| **INDEX/DESIGN-OS-COMPLETE.md**                     | Master index + summary                          | You want the map                       |
| **INDEX/ARTIFACT_INDEX.md**                         | Deep description of each phase, status roll-up  | You want to know what's in a phase     |
| **INDEX/\_FOLDER_STRUCTURE.md**                     | Folder layout, per-role reading order           | You're navigating blind                |
| **INDEX/RATIFIED_DIVERGENCES.md**                   | Owner decisions where code departs from spec    | The code and a phase disagree          |
| **IMPLEMENTATION/IMPLEMENTATION_PROMPT.md**         | How to execute all nine phases                  | You're building the code               |
| **IMPLEMENTATION/SETUP-CHECKLIST.md**               | Environment to verified build                   | You're setting up                      |
| **CORE-PHASES/phase-1-product-vision.md**           | Strategy, personas, roles, business rules, KPIs | You need strategy alignment            |
| **CORE-PHASES/phase-2-experience-maps.md**          | 19 journeys, decision points, flows             | You're designing a flow                |
| **CORE-PHASES/phase-3-information-architecture.md** | Sitemap, navigation, permissions                | You're setting up routing/auth         |
| **CORE-PHASES/phase-4-page-blueprints.md**          | 46 page specs                                   | You're building a page (START HERE)    |
| **CORE-PHASES/phase-5-section-blueprints.md**       | 70 section specs                                | You're composing pages into sections   |
| **CORE-PHASES/phase-6-interaction-contracts.md**    | 88 behaviour contracts                          | You're implementing a control          |
| **CORE-PHASES/phase-7-frontend-architecture.md**    | Codebase structure, folder layout               | You're placing a new file              |
| **CORE-PHASES/phase-8-implementation-roadmap.md**   | 16-week plan, build status                      | You're planning, or asking "is it built?" |
| **CORE-PHASES/phase-9-qa-checklist.md**             | Accessibility, performance, security            | You're verifying before launch         |

---

## How to Use Each Phase

### Product/Leadership

→ Read **Phase 1** (Product Vision, business rules)
→ Share **Phase 2** (Experiences) with the team
→ Use **Phase 8** (Roadmap, status, deferrals) for timeline

### Designers

→ Start from **Phase 2** (journeys) and **Phase 4** (what each page must offer, in priority order)
→ Use **Phase 5** (Sections) and **Phase 6** (Contracts) as the behaviour your concept must honour
→ Propose each page's look to the owner at build time — this OS gives no visual direction

### Engineers

→ Read **`.claude/CLAUDE.md`** first — it binds
→ Read **Phase 7** (Architecture) for the folder map
→ Follow **Phase 4** (Pages) spec per page and **Phase 6** (Contracts) per control
→ Check **Phase 8** before starting; update it when done
→ Verify **Phase 9** (QA) before shipping

### QA/Testing

→ Use **Phase 9** (QA Checklist) as verification suite
→ Reference **Phase 4** (Pages) for states per page
→ Check **Phase 2** (Experiences) for failure and recovery paths

---

## File Formats

Everything in `design-os/` is **markdown**. Read it in an editor or `cat` it in a terminal. Nothing requires a browser.

Version 1's Phases 1-7 were published as browser-viewable artifacts; those URLs are listed in [ARTIFACT_INDEX](ARTIFACT_INDEX.md#appendix-published-artifact-mirrors) as historical mirrors. The markdown here is canonical.

---

## Key Statistics

- **9 Phases:** Product vision → Implementation → QA
- **88 Interaction Contracts:** Inputs, states, keyboard, ARIA, validation, loading, errors
- **70 Sections:** Composing 46 pages
- **46 Pages:** 27 MVP 1.5 pages + 19 shipped routes blueprinted in 2.0
- **19 Journeys**, **18 Business Rules**
- **16 Weeks:** Implementation roadmap with sprint breakdown
- **213 QA Items:** Accessibility, performance, security, consistency

---

## Getting Started (5 Minutes)

1. **`.claude/CLAUDE.md`** (2 min)
   The rules that bind every edit. Read before touching code.

2. **`INDEX/DESIGN-OS-COMPLETE.md`** (1 min)
   Master overview. Understand what you have.

3. **`CORE-PHASES/phase-8-implementation-roadmap.md` › Per-feature Build Status** (1 min)
   What is built, what is not, what is deferred.

4. **`IMPLEMENTATION/IMPLEMENTATION_PROMPT.md`** (1 min to skim)
   How to build the next thing — including the Visual Design Hand-off.

---

## Design OS Philosophy

- **No Ambiguity:** Every behaviour documented
- **No Reinvention:** Reuse existing contracts (Phase 6) and sections (Phase 5)
- **No Visual Prescription:** The look is decided per page, with the owner
- **No Silent Loss:** Nothing specified is removed because it is unbuilt — it carries a status
- **No Surprises:** QA checklist (Phase 9)
- **Production-Ready:** Can hand off to engineering immediately

---

**Questions? See [DESIGN-OS-COMPLETE](DESIGN-OS-COMPLETE.md) for the full index.**

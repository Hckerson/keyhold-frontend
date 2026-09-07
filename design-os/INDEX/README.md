# Design Operating System (Design OS)

**Complete real estate platform specification. 10 phases. All local markdown.**

---

## What Is This?

A comprehensive design system that transforms business strategy into an implementation-ready Next.js codebase. Covers:

- ✅ Product vision & strategy (Phase 1)
- ✅ User experiences & journeys (Phase 2)
- ✅ Information architecture (Phase 3)
- ✅ Page specifications (Phase 4)
- ✅ Reusable sections (Phase 5)
- ✅ Component library (Phase 6)
- ✅ Design tokens (Phase 7)
- ✅ Frontend architecture (Phase 8)
- ✅ Implementation roadmap (Phase 9)
- ✅ QA & accessibility (Phase 10)

**Result:** No ambiguity. Engineers build with confidence. Designers have single source of truth.

---

## Authority

This folder is the **design record** — the reasoning behind the product. It is not the build spec.

`.claude/CLAUDE.md` at the repo root is the binding specification for code: folder placement, data flow, naming, styling, dependency policy, testing. Where a phase document and `.claude/CLAUDE.md` disagree, `.claude/CLAUDE.md` wins.

---

## Quick Start

1. **Read:** `.claude/CLAUDE.md` (binding rules)
2. **Read:** `INDEX/DESIGN-OS-COMPLETE.md` (master index)
3. **Understand:** `IMPLEMENTATION/IMPLEMENTATION_PROMPT.md` (how to build)
4. **Reference:** Other phases as needed (see table below)

---

## All Files

Paths are relative to `design-os/`.

| File                                                | Purpose                               | Read This If...                      |
| --------------------------------------------------- | ------------------------------------- | ------------------------------------ |
| **INDEX/START_HERE.md**                             | Orientation, 2-minute entry point     | You're new to this folder            |
| **INDEX/DESIGN-OS-COMPLETE.md**                     | Master index + summary                | You want the 30-second overview      |
| **INDEX/ARTIFACT_INDEX.md**                         | Deep description of each phase        | You want to know what's in a phase   |
| **INDEX/\_FOLDER_STRUCTURE.md**                     | Folder layout, per-role reading order | You're navigating blind              |
| **IMPLEMENTATION/IMPLEMENTATION_PROMPT.md**         | How to execute Phases 8-10            | You're building the code             |
| **IMPLEMENTATION/SETUP-CHECKLIST.md**               | Token and styling foundation          | You're setting up or styling         |
| **CORE-PHASES/phase-1-product-vision.md**           | Business strategy, personas, KPIs     | You need strategy alignment          |
| **CORE-PHASES/phase-2-experience-maps.md**          | User journeys, decision points, flows | You're designing new features        |
| **CORE-PHASES/phase-3-information-architecture.md** | Sitemap, navigation, permissions      | You're setting up routing/auth       |
| **CORE-PHASES/phase-4-page-blueprints.md**          | 27 page specs with modules            | You're building a page (START HERE)  |
| **CORE-PHASES/phase-5-section-blueprints.md**       | 70 reusable section specs             | You're composing pages into sections |
| **CORE-PHASES/phase-6-component-library.md**        | 80 component specs, variants, props   | You're implementing components       |
| **CORE-PHASES/phase-7-design-tokens.md**            | Colors, spacing, typography, motion   | You need token values for styling    |
| **CORE-PHASES/phase-8-frontend-architecture.md**    | Codebase structure, folder layout     | You're placing a new file            |
| **CORE-PHASES/phase-9-implementation-roadmap.md**   | 16-week sprint breakdown              | You're planning sprints/timeline     |
| **CORE-PHASES/phase-10-qa-checklist.md**            | Accessibility, performance, security  | You're verifying before launch       |

---

## How to Use Each Phase

### Product/Leadership

→ Read **Phase 1** (Product Vision)  
→ Share **Phase 2** (Experiences) to team  
→ Use **Phase 9** (Roadmap) for timeline

### Designers

→ Reference **Phase 4** (Pages) for layout  
→ Use **Phase 5** (Sections) to build new flows  
→ Apply **Phase 7** (Tokens) for all styling  
→ Extend **Phase 6** (Components) as patterns emerge

### Engineers

→ Read **`.claude/CLAUDE.md`** first — it binds  
→ Read **Phase 8** (Architecture) for the folder map  
→ Follow **Phase 4** (Pages) spec per page  
→ Reference **Phase 6** (Components) while building  
→ Use **Phase 9** (Roadmap) for sprint planning  
→ Verify **Phase 10** (QA) before shipping

### QA/Testing

→ Use **Phase 10** (QA Checklist) as verification suite  
→ Reference **Phase 4** (Pages) for test cases  
→ Check **Phase 2** (Experiences) for edge cases

---

## File Formats

Everything in `design-os/` is **markdown**. Read it in an editor or `cat` it in a terminal. Nothing requires a browser.

Phases 1-7 were originally published as browser-viewable artifacts; those URLs are listed in `INDEX/ARTIFACT_INDEX.md` as historical mirrors. The markdown here is canonical.

---

## Key Statistics

- **10 Phases:** Product vision → Implementation → QA
- **80 Components:** Fully specified with variants, props, accessibility
- **70 Sections:** Reusable patterns composing 27 pages
- **27 Pages:** Complete MVP 1.5 specification
- **16 Weeks:** Implementation roadmap with sprint breakdown
- **200+ QA Items:** Accessibility, performance, security checklist

---

## Getting Started (10 Minutes)

1. **`.claude/CLAUDE.md`** (5 min)  
   The rules that bind every edit. Read before touching code.

2. **`INDEX/DESIGN-OS-COMPLETE.md`** (2 min)  
   Master overview. Understand what you have.

3. **`IMPLEMENTATION/IMPLEMENTATION_PROMPT.md`** (3 min)  
   How Phases 8-10 were planned. Reference the phases as needed.

---

## Design OS Philosophy

- **No Ambiguity:** Every decision documented
- **No Reinvention:** Use existing patterns (Phase 6)
- **No Hardcoding:** All tokens (Phase 7)
- **No Surprises:** QA checklist (Phase 10)
- **Production-Ready:** Can hand off to engineering immediately

---

**Questions? See `INDEX/DESIGN-OS-COMPLETE.md` for the full index.**

# START HERE — Design Operating System

**The complete design record for the platform lives in `design-os/`. Every phase is a local markdown file.**

---

## What You Have

✅ **Complete 10-Phase Design Operating System** (all local markdown)
✅ **Phases 1-7:** design and strategy — `CORE-PHASES/`
✅ **Phases 8-10:** architecture, roadmap, QA — `CORE-PHASES/`
✅ **Engineering guides** — `IMPLEMENTATION/`

---

## Read This First

`.claude/CLAUDE.md` at the repo root is the **binding** specification for code: folder placement, data flow, naming, styling, dependency policy. The design OS explains _why_ the product is shaped this way; `.claude/CLAUDE.md` says _where things go_. Where they disagree, `.claude/CLAUDE.md` wins.

---

## Files in This Folder

| File                      | Purpose                                        | Action                   |
| ------------------------- | ---------------------------------------------- | ------------------------ |
| **START_HERE.md**         | This file — orientation                        | You're reading it        |
| **README.md**             | Quick start, 5-minute guide                    | Read next if new         |
| **DESIGN-OS-COMPLETE.md** | Master index of all 17 documents               | Use as the map           |
| **ARTIFACT_INDEX.md**     | Deep description of each of the 10 phases      | Bookmark for reference   |
| **\_FOLDER_STRUCTURE.md** | How `design-os/` is laid out, per-role reading | Read if navigating blind |

---

## What To Do Right Now

### Step 1: Read This (2 min)

You're reading it now. ✓

### Step 2: Read the binding rules (10 min)

`.claude/CLAUDE.md` — non-negotiable rules, required patterns, folder structure, file rules.

### Step 3: Read README.md (3 min)

`design-os/INDEX/README.md`. Quick overview of all ten phases and who reads what.

### Step 4: Open the phase you need

Everything is markdown under `design-os/CORE-PHASES/`. Nothing needs a browser.

---

## The Master Prompt

**`IMPLEMENTATION/IMPLEMENTATION_PROMPT.md`** is the engineering synthesis of Phases 8-10. It includes:

- What to build (sprints 1-8)
- How to build it (code patterns, architecture)
- Sprint breakdown (weeks 1-16)
- Testing strategy
- Deployment checklist
- QA requirements
- References to all other phases

It is **project-specific**, written for this codebase — not a reusable seed prompt. It is also a _plan_, not a mirror of the current tree: substantial parts of it are already built. Check the working tree before acting on a sprint, and defer to `.claude/CLAUDE.md` on every structural question.

---

## All Phases

Every phase is a markdown file in `design-os/CORE-PHASES/`.

| Phase | File                                  | Covers                               |
| ----- | ------------------------------------- | ------------------------------------ |
| 1     | `phase-1-product-vision.md`           | Strategy, personas, KPIs             |
| 2     | `phase-2-experience-maps.md`          | User journeys, decision points       |
| 3     | `phase-3-information-architecture.md` | Sitemap, navigation, permissions     |
| 4     | `phase-4-page-blueprints.md`          | 27 page specs                        |
| 5     | `phase-5-section-blueprints.md`       | 70 reusable sections                 |
| 6     | `phase-6-component-library.md`        | 80 components, variants, states      |
| 7     | `phase-7-design-tokens.md`            | Colors, typography, spacing, motion  |
| 8     | `phase-8-frontend-architecture.md`    | Folder structure, routes, data flow  |
| 9     | `phase-9-implementation-roadmap.md`   | 16-week sprint breakdown             |
| 10    | `phase-10-qa-checklist.md`            | Accessibility, performance, security |

See `ARTIFACT_INDEX.md` for a longer description of each.

---

## Quick Reference

| I want to...              | Go to...                                        |
| ------------------------- | ----------------------------------------------- |
| Know the binding rules    | `.claude/CLAUDE.md`                             |
| Understand the strategy   | `CORE-PHASES/phase-1-product-vision.md`         |
| See page specifications   | `CORE-PHASES/phase-4-page-blueprints.md`        |
| Find component specs      | `CORE-PHASES/phase-6-component-library.md`      |
| Get token values          | `CORE-PHASES/phase-7-design-tokens.md`          |
| Know what to build        | `IMPLEMENTATION/IMPLEMENTATION_PROMPT.md`       |
| Understand codebase setup | `CORE-PHASES/phase-8-frontend-architecture.md`  |
| See sprint breakdown      | `CORE-PHASES/phase-9-implementation-roadmap.md` |
| Verify before shipping    | `CORE-PHASES/phase-10-qa-checklist.md`          |
| Understand styling setup  | `IMPLEMENTATION/SETUP-CHECKLIST.md`             |

---

## Appendix: Published Artifact Mirrors

Phases 1-7 were originally published as browser-viewable artifacts. **The markdown in `CORE-PHASES/` is canonical** — these mirrors are historical and may not reflect later edits.

- **Phase 1:** https://claude.ai/code/artifact/257167b4-d827-4556-8bb7-21b664726b71
- **Phase 2:** https://claude.ai/code/artifact/73797095-b2c6-42c8-a29c-e89363470caa
- **Phase 3:** https://claude.ai/code/artifact/63ef5a57-d3fe-44b1-bdce-67e4fd3ad2e3
- **Phase 4:** https://claude.ai/code/artifact/06e9a4b4-a818-4e47-aa64-b95002c9bbb9
- **Phase 5:** https://claude.ai/code/artifact/140f03aa-ebb5-419b-b998-75ed29e537db
- **Phase 6:** https://claude.ai/code/artifact/5c74a0c4-da0f-4258-8b89-4d76231ac53e
- **Phase 7:** https://claude.ai/code/artifact/bebd6aa0-7e77-4308-88b8-8874708d4106

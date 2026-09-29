# Setup Checklist — Keyhold

**From a fresh clone to a verified working environment.** · Version 2.0 · 29 September 2026

`.claude/CLAUDE.md` at the repo root is the binding specification. This checklist gets you to the point where [IMPLEMENTATION_PROMPT](IMPLEMENTATION_PROMPT.md) can be followed. Entry point: [START_HERE](../INDEX/START_HERE.md).

---

## Contents

1. [Pre-implementation Prerequisites](#1-pre-implementation-prerequisites)
2. [Environment Setup](#2-environment-setup)
3. [Project Initialization](#3-project-initialization)
4. [Dependencies](#4-dependencies)
5. [Testing Setup](#5-testing-setup)
6. [Developer Workflow Setup](#6-developer-workflow-setup)
7. [Design Phase Reference](#7-design-phase-reference)
8. [Verification Checklist](#8-verification-checklist)
9. [Design Docs in `design-os/`](#9-design-docs-in-design-os)
10. [Regeneration Notes](#regeneration-notes)

---

## 1. Pre-implementation Prerequisites

### Read these phases first

- [ ] `.claude/CLAUDE.md` — binding rules (10 min)
- [ ] [Phase 1 — Product Vision](../CORE-PHASES/phase-1-product-vision.md): personas, roles, business rules
- [ ] [Phase 3 — Information Architecture](../CORE-PHASES/phase-3-information-architecture.md): routes, permissions, labels
- [ ] [Phase 7 — Frontend Architecture](../CORE-PHASES/phase-7-frontend-architecture.md): where code goes

### Understand these concepts

- [ ] **Personas and roles** — four personas, three system roles; `SELLER` serves both the agent and the seller ([ADR 0018](../../docs/adr/0018-the-seller-is-the-agent.md))
- [ ] **Navigation** — three portals (`/dashboard`, `/agent`, `/admin`), each guarded by role
- [ ] **Interaction contracts** — every control's behaviour is specified in [Phase 6](../CORE-PHASES/phase-6-interaction-contracts.md); its look is decided at build time with the owner
- [ ] **Build status** — lives only in [Phase 8](../CORE-PHASES/phase-8-implementation-roadmap.md#per-feature-build-status)
- [ ] **Divergences** — where the code departs from the spec, [RATIFIED_DIVERGENCES](../INDEX/RATIFIED_DIVERGENCES.md) records the owner's decision

---

## 2. Environment Setup

- [ ] **Node 22.x** (`engines.node` in `package.json`)
- [ ] **pnpm 10** (`packageManager: pnpm@10.17.0`; `corepack enable` picks it up)
- [ ] **Backend** — the NestJS service checked out beside this repo at `../backend`, running on port 5000 (authenticated routes and all data depend on it; `pnpm enums:check` skips when it is absent)
- [ ] **Editor** — TypeScript from the workspace, ESLint and Prettier extensions, format on save

---

## 3. Project Initialization

The project already exists; initialization means getting a local copy running.

```bash
git clone <repo> frontend && cd frontend
git checkout development
pnpm install
cp .env.example .env.local
```

### Environment variables (`.env.example`)

| Variable | Needed for | Local value |
| -------- | ---------- | ----------- |
| `NEXT_PUBLIC_API_BASE_URL` | All data | `http://localhost:5000/api` |
| `JWT_PUBLIC_KEY` | Portal session verification in `proxy.ts` (portals redirect to `/login` without it) | Same base64 PEM as the backend |
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs, Open Graph, sitemap, robots | `http://localhost:3000` |
| `NEXT_PUBLIC_STRIPE_KEY`, `NEXT_PUBLIC_ENABLE_STRIPE` | Checkout (disabled while empty) | Test key, or leave off |
| `NEXT_PUBLIC_SENTRY_DSN`, `SENTRY_*` | Error reporting, source maps | Empty locally |
| `NEXT_PUBLIC_AUTH_PROVIDERS` | Social sign-in buttons (`google,facebook`; never `apple` until deferred work lands) | Empty or configured providers |
| `NEXT_PUBLIC_DEV_QUICK_LOGIN`, `NEXT_PUBLIC_DEV_PASSWORD` | Development-only quick login | Local only — never enable elsewhere |

### TypeScript configuration

- `tsconfig.json` is strict; no `any`.
- Imports use `@/`; `next.config.ts` uses no `@/` aliases (they resolve wrong there).

### Folder structure

Already matches [Phase 7 › Folder Structure](../CORE-PHASES/phase-7-frontend-architecture.md#folder-structure). New code goes where `.claude/CLAUDE.md` says; do not create new top-level folders.

---

## 4. Dependencies

- [ ] `pnpm install` from the lockfile — the lockfile is the contract.
- [ ] Nothing new without approval: per the Library Selection Policy, reuse what is installed; otherwise propose a package and the reason, and wait for the owner's yes before `pnpm add`. Never hand-edit `package.json`.
- [ ] The installed stack is listed in [IMPLEMENTATION_PROMPT › The Installed Stack](IMPLEMENTATION_PROMPT.md#the-installed-stack).

---

## 5. Testing Setup

- [ ] **Unit and component:** Vitest (`vitest.config.mts`), Testing Library, `vitest-axe`, `jsdom` — already installed. `pnpm test` runs once; `pnpm test:watch` watches.
- [ ] Tests colocated as `<unit>.test.ts(x)`; fixtures in `lib/data/__fixtures__/`; mock at `lib/api/<resource>.ts`.
- [ ] **End-to-end:** no runner installed. Choosing one is a dependency decision for the owner (Phase 8 lists it as Specified).

---

## 6. Developer Workflow Setup

- [ ] **Git hooks are disabled.** The `prepare` script unsets `core.hooksPath` on every install, so `.husky/` never runs. Run the gate yourself:
    - before committing: `pnpm lint-staged` (or `pnpm lint` + `pnpm format`)
    - before pushing: `pnpm type-check && pnpm lint && pnpm enums:check && pnpm contract:check`
- [ ] **Enum parity:** `pnpm enums:check` compares `lib/enums/enums.ts` with `../backend/prisma/schema.prisma`.
- [ ] **Contract:** `pnpm contract` regenerates `lib/contract/` from the backend's OpenAPI; `pnpm contract:check` fails when it is stale. Never edit `lib/contract/` by hand.
- [ ] **Styling:** follow `.claude/CLAUDE.md` › Required patterns › Styling. The visual design of any page is decided with the owner before it is built ([Visual Design Hand-off](IMPLEMENTATION_PROMPT.md#visual-design-hand-off)).

---

## 7. Design Phase Reference

When building each page, reference:

| Page Type      | Reference File                                                                                                    |
| -------------- | ----------------------------------------------------------------------------------------------------------------- |
| Home           | `../CORE-PHASES/phase-4-page-blueprints.md` (Page 1) + `../CORE-PHASES/phase-5-section-blueprints.md` (Sections 1–5) |
| Search Results | `../CORE-PHASES/phase-4-page-blueprints.md` (Page 2) + phase-5 (listing and form sections)                        |
| Listing Detail | `../CORE-PHASES/phase-4-page-blueprints.md` (Page 3) + phase-5 (listing sections)                                 |
| Dashboards     | `../CORE-PHASES/phase-4-page-blueprints.md` (Pages 8-27, 38-44)                                                   |
| Site pages     | `../CORE-PHASES/phase-4-page-blueprints.md` (Pages 28-37, 45-46)                                                  |
| Controls       | `../CORE-PHASES/phase-6-interaction-contracts.md` (C1–C88)                                                        |
| Status         | `../CORE-PHASES/phase-8-implementation-roadmap.md`                                                                |

---

## 8. Verification Checklist

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

- [ ] `/` renders with live listings (backend reachable)
- [ ] `/search` returns results; `/map` shows listings located on the map
- [ ] Sign in as a buyer, an agent and an admin; each lands in its own portal and cannot open the others
- [ ] `pnpm test` passes
- [ ] `pnpm type-check` passes
- [ ] `pnpm lint` passes
- [ ] `pnpm enums:check` passes (or reports the backend is absent)
- [ ] `pnpm contract:check` passes
- [ ] `pnpm build` succeeds

The backend must be running for authenticated routes; `proxy.ts` forwards API calls to the NestJS service in `../backend`.

---

## 9. Design Docs in `design-os/`

```
INDEX/START_HERE.md                               ← Start here
INDEX/README.md                                   ← 5-minute overview
INDEX/DESIGN-OS-COMPLETE.md                       ← Master index
INDEX/ARTIFACT_INDEX.md                           ← Per-phase descriptions
INDEX/_FOLDER_STRUCTURE.md                        ← Layout + reading orders
INDEX/RATIFIED_DIVERGENCES.md                     ← Where code and spec part company

CORE-PHASES/phase-1-product-vision.md             ← Strategy, business rules
CORE-PHASES/phase-2-experience-maps.md            ← User flows
CORE-PHASES/phase-3-information-architecture.md   ← Navigation
CORE-PHASES/phase-4-page-blueprints.md            ← Page specs (PRIMARY)
CORE-PHASES/phase-5-section-blueprints.md         ← Section specs
CORE-PHASES/phase-6-interaction-contracts.md      ← Control behaviour
CORE-PHASES/phase-7-frontend-architecture.md      ← Folder structure
CORE-PHASES/phase-8-implementation-roadmap.md     ← 16-week plan + build status
CORE-PHASES/phase-9-qa-checklist.md               ← QA & launch

IMPLEMENTATION/IMPLEMENTATION_PROMPT.md           ← Sprint guide
IMPLEMENTATION/SETUP-CHECKLIST.md                 ← This file
```

---

## Regeneration Notes

- **Retained:** the binding-authority statement, root layout facts (the stylesheet, font variables and `Provider` wiring now live in Phase 7 › Layouts), the design phase reference table, `pnpm install` / `pnpm dev`, the verification commands, the backend note, the design-docs listing.
- **Added:** the seed's structure — prerequisites, environment, initialization with the real `.env.example` variables, dependencies under the Library Selection Policy, testing setup, developer workflow (hooks disabled, enum and contract gates), verification checklist.
- **Changed:** title "Luxury Real Estate Platform" → "Keyhold". **Dropped as visual prescription:** the whole "Styling Foundation" tree (token categories, "Light theme (warm ivory ground, pine accent, brass highlight)", named scale classes and layout primitives `.console-split`, `.stat-band`, `.card-grid`…, font families Fraunces / Libre Franklin / JetBrains Mono); "Token Usage Examples" (colour CSS and Tailwind samples with `#1f4e3d`, typography, motion and spacing samples, "Non-focal text sits at the smallest exposed size token…"); the CVA "Component Building Pattern" with size and colour classes; and "You should see: warm ivory ground (`#faf8f4`)…, near-black text, pine accent, brass highlight, Fraunces…, dense application register — 16px icons, ~36px rows". How styles are written is governed by `.claude/CLAUDE.md` and the code; how pages look is decided with the owner. The old claim that Husky's pre-push runs `type-check` then `lint` is corrected — hooks are disabled.

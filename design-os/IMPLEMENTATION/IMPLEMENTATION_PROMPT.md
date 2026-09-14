# Real Estate Platform — Master Implementation Prompt

**The engineering synthesis of Phases 8-10, written for this codebase.**

---

## Read This Before Using It

Three things about this document:

1. **It is project-specific.** It names this product's routes, portals, APIs, sprint plan and staffing. It is not a reusable seed prompt for another project.
2. **It is a plan, not a mirror of the tree.** Much of the roadmap below is already built — the four route groups, the component library, and the API layer all exist. Check the working tree before acting on a sprint.
3. **`.claude/CLAUDE.md` overrides it.** That file is the binding specification for folder placement, data flow, naming, styling, dependency policy and testing. Where this document and `.claude/CLAUDE.md` disagree, `.claude/CLAUDE.md` wins.

---

## Context

**Design OS Location:** `design-os/` in the frontend root.

**Read These First (In Order):**

1. `.claude/CLAUDE.md` — binding rules and required patterns
2. `design-os/INDEX/DESIGN-OS-COMPLETE.md` — master index, overview, how to use
3. `design-os/CORE-PHASES/phase-8-frontend-architecture.md` — codebase structure
4. `design-os/CORE-PHASES/phase-4-page-blueprints.md` — page specifications
5. `design-os/CORE-PHASES/phase-9-implementation-roadmap.md` — sprint breakdown
6. `design-os/CORE-PHASES/phase-10-qa-checklist.md` — QA requirements before shipping

---

## Phase 8: Frontend Architecture (READ FIRST)

**File:** `design-os/CORE-PHASES/phase-8-frontend-architecture.md`

This specifies:

- Folder structure (where every file goes)
- Route organization (App Router, four groups: `(auth)`, `(public)`, `dashboard`, `agent`, `admin`)
- Layouts and portal shells
- Providers (`components/providers/`)
- Hooks (`lib/hooks/use-<resource>.ts`)
- API organization (`lib/api/client.ts` transport, `lib/api/<resource>.ts` calls)
- State management (TanStack Query for server state; Zustand in `lib/stores/` for session and toasts)
- Type safety (TypeScript strict, Zod validation)
- Environment variables

**Note:** the frontend has **no App Router API routes**. All data comes from the NestJS backend in `../backend` via `lib/api/client.ts`, with endpoints named in `lib/constants.ts` under `config.api.*`.

---

## Phase 9: Implementation Roadmap (THE PLAN)

**File:** `design-os/CORE-PHASES/phase-9-implementation-roadmap.md`

**16-Week Sprints:**

| Sprint | Weeks | Focus                                               | Owner    | Hours |
| ------ | ----- | --------------------------------------------------- | -------- | ----- |
| 1-2    | 1-2   | Foundation, architecture, tooling                   | Lead Eng | 80    |
| 2-3    | 3-4   | Component library (primitives + patterns)           | Frontend | 120   |
| 3-4    | 5-6   | Search & discovery (home, search, listing, map)     | 2-3 Eng  | 160   |
| 4-5    | 7-8   | Authentication (signup, login, reset, OAuth)        | 1-2 Eng  | 100   |
| 5-6    | 9-10  | Buyer dashboard (saved, offers, viewings, messages) | 2-3 Eng  | 200   |
| 6-7    | 11-12 | Agent dashboard (listings, leads, pipeline)         | 2-3 Eng  | 180   |
| 7-8    | 13-14 | Admin dashboard (moderation, users, transactions)   | 1-2 Eng  | 120   |
| 8      | 15-16 | QA, accessibility, deployment                       | QA + Eng | 160   |

**Total:** ~1120 hours, 4-5 engineers, 16 weeks.

The foundation, component library and all four portals exist in the tree today. Treat the sprint table as the original plan and the delivery order it implies — not as a to-do list to start from zero.

---

## Phase 4: Page Blueprints (SPEC REFERENCE)

**File:** `design-os/CORE-PHASES/phase-4-page-blueprints.md`

For each page, this spec defines:

- Purpose & objectives
- Primary tasks
- Modules & sections required
- Data requirements (what API calls needed)
- Responsive behavior (mobile/tablet/desktop)
- States (loading, error, empty, success)
- Dependencies (which APIs, services)

**Example: Search Results Page**

- Purpose: Find properties matching criteria
- Modules: Filter Panel, Results Grid, Pagination, Map Toggle
- Data: Properties API (search with filters)
- Responsive: Sidebar left (desktop) → Filters modal (mobile)
- States: Loading (skeletons), No Results, Error handling

**Reference this for every page you build.**

---

## Phase 10: QA Checklist (VERIFY BEFORE SHIPPING)

**File:** `design-os/CORE-PHASES/phase-10-qa-checklist.md`

Before launching, verify:

- ✓ Accessibility (WCAG 2.2 AA)
- ✓ Responsive (320px-1440px+)
- ✓ Cross-browser (Chrome, Firefox, Safari, Edge)
- ✓ Performance (Lighthouse >90, LCP <2.5s, bundle <250kb)
- ✓ Security (TypeScript strict, Zod validation, no secrets)
- ✓ Code quality (ESLint passes, no console errors)
- ✓ Testing (unit coverage on `lib/`, critical paths)
- ✓ Design system (tokens only, no hardcoded values)

---

## The Installed Stack

**Do not install anything new without explicit approval.** Adding, upgrading or swapping a package is the user's call — name the package, say why the existing stack does not cover it, and wait for a yes. Once approved, install with `pnpm add`; never hand-edit `package.json`.

**Runtime:**

| Need         | Package                                                                |
| ------------ | ---------------------------------------------------------------------- |
| Framework    | `next` (App Router), `react`, `react-dom`                              |
| Server state | `@tanstack/react-query` + devtools                                     |
| Client state | `zustand`                                                              |
| Transport    | `axios` (wrapped in `lib/api/client.ts`)                               |
| Validation   | `zod`                                                                  |
| Motion       | `motion` (**not** `framer-motion`)                                     |
| Icons        | `lucide-react`                                                         |
| Styling      | `tailwindcss` v4, `class-variance-authority`, `clsx`, `tailwind-merge` |
| Charts       | `recharts`                                                             |
| Dates        | `date-fns`, `react-day-picker`                                         |
| IDs          | `nanoid`                                                               |
| Payments     | `@stripe/stripe-js`, `@stripe/react-stripe-js`                         |
| Auth tokens  | `jose`                                                                 |

**Dev:**

`typescript`, `eslint` + `typescript-eslint`, `prettier` (+ tailwind plugin), `vitest`, `@testing-library/react`, `@testing-library/user-event`, `@testing-library/jest-dom`, `vitest-axe`, `jsdom`, `husky`, `lint-staged`.

**Not installed, and not to be assumed:** `react-hook-form`, `@hookform/resolvers`, `next-themes`, `@playwright/test`, `framer-motion`. Forms are built on the project's own `components/ui/forms/` primitives and Zod schemas.

---

## Code Standards (NON-NEGOTIABLE)

### From `.claude/CLAUDE.md`

1. **No comments.** Code reads clearly on its own. If it doesn't, the abstraction is wrong.
2. **No hardcoding.** Endpoints in `config.api.*`, shapes from Zod, recurring copy in `lib/constants.ts` or `lib/config/<feature>.ts`, sample content in `lib/data/`.
3. **No `any`.** Use `unknown` + narrowing or precise types. Derive from Zod with `z.infer`.
4. **Match the existing architecture.** Don't invent patterns or locations. State the reason before deviating.
5. **Use the framework natively.** Don't add a dependency that duplicates one already installed.
6. **Single source of truth.** Name a recurring decision once as a semantic token and reference it everywhere.
7. **Minimize LOC.** Shortest solution that stays maintainable.
8. **No `console.log` / `console.error`** in committed code.

### Styling

- Token-first: named scale classes in `styles/globals.css` (`.pad`, `.pad-x`, `.pad-y`, `.gap`, `.gap-x`, `.gap-y`, `.smooth`, `.micro-label`, `.rail-label`) over tokens in `styles/tokens.css`.
- Inline responsive utility chains are forbidden.
- Colors, typography, spacing and motion are theme tokens — never hardcoded values.
- Tailwind v4 has no config file; the `@theme` block in `globals.css` maps `--colors-*` / `--fonts-*` / `--font-sizes-*` onto Tailwind names.

### API Pattern (Critical)

```typescript
// lib/constants.ts — endpoints named once
export const config = {
    api: {
        base:
            process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api",
        properties: {
            list: "/properties",
            detail: (id: string) => `/properties/${id}`,
        },
    },
};

// lib/api/properties.ts — resource calls over the shared transport, no hooks
import { query } from "@/lib/api/client";
import { config } from "@/lib/constants";
import type { PropertyPage, PropertyQuery } from "@/lib/validations/property";

export const propertiesAPI = {
    list: (input: PropertyQuery = {}) =>
        query.get<PropertyPage>(config.api.properties.list, {
            params: toParams(input),
        }),
};

// lib/hooks/use-properties.ts — caching, keys, feedback
import { useQuery } from "@tanstack/react-query";
import { propertiesAPI } from "@/lib/api/properties";
import { queryKeys } from "@/lib/hooks/query-keys";
import { CACHE_TIME, STALE_TIME } from "@/lib/constants";

export function useProperties(input: PropertyQuery = {}) {
    return useQuery({
        queryKey: queryKeys.properties.list(input),
        queryFn: () => propertiesAPI.list(input),
        staleTime: STALE_TIME,
        gcTime: CACHE_TIME,
    });
}
```

The `*-console` section consumes the hook, derives shapes with `useMemo` and `lib/utils/to-*` mappers, renders `ConsoleUnavailable` with a `CONSOLE_FALLBACKS` entry on error, and passes rows down as props. `*-main` / `*-rail` / `*-stat-band` never fetch.

---

## Testing Strategy (Phase 10)

**Runner:** Vitest, configured in `vitest.config.mts`. Tests are colocated as `<unit>.test.ts(x)` beside the unit they cover.

### Unit & Component Tests

- All `lib/` functions (utilities, validators, formatters, mappers)
- All Zod schemas (validation logic)
- Component behavior via `@testing-library/react` — behavior, not snapshots
- Accessibility assertions via `vitest-axe`
- Mock at the `lib/api/<resource>.ts` boundary, never the hook
- Test-only fixtures live in `lib/data/__fixtures__/`
- A test name states the criterion it proves, not the function it calls

### Budget Tests

`styles/bundle-budget.test.ts` and `styles/responsive-budget.test.ts` guard bundle size and responsive behavior as part of the normal suite.

### End-to-End

No E2E runner is installed. Adding one is a dependency decision that needs approval first — do not assume Playwright.

### Manual Accessibility

- Keyboard navigation
- Screen reader pass (NVDA / JAWS / VoiceOver)
- WCAG 2.2 AA compliance per Phase 10

---

## Gates

Formatting and linting are automated. They are not chores you run by hand.

- **Commit** — Husky's `pre-commit` runs `pnpm lint-staged`: `eslint --fix` then `prettier --write`, over staged files only.
- **Push** — Husky's `pre-push` runs `pnpm type-check`, then `pnpm lint`, and blocks on failure. This is the real gate.
- **Tests** — `pnpm test` is on you. A failing test is never left for later.

`pnpm format` and `pnpm lint` stay available for a manual full-repo sweep.

### Before shipping

- [ ] `pnpm test` passes
- [ ] `pnpm type-check` passes
- [ ] `pnpm lint` passes
- [ ] `pnpm build` succeeds
- [ ] No console errors/warnings
- [ ] Accessibility audit passes
- [ ] Performance budget not exceeded
- [ ] Code review approved
- [ ] Phase 10 checklist complete

---

## Key References

All paths relative to `design-os/`.

| Phase | File                                              | Use For                                           |
| ----- | ------------------------------------------------- | ------------------------------------------------- |
| —     | `../.claude/CLAUDE.md`                            | **Binding rules — overrides this document**       |
| 1     | `CORE-PHASES/phase-1-product-vision.md`           | Strategy, personas, KPIs (team alignment)         |
| 2     | `CORE-PHASES/phase-2-experience-maps.md`          | User flows, decision points (when building flows) |
| 3     | `CORE-PHASES/phase-3-information-architecture.md` | Navigation, IA, permissions (routing, auth)       |
| 4     | `CORE-PHASES/phase-4-page-blueprints.md`          | Page specs (REFERENCE FOR EVERY PAGE)             |
| 5     | `CORE-PHASES/phase-5-section-blueprints.md`       | Section specs (what sections compose pages)       |
| 6     | `CORE-PHASES/phase-6-component-library.md`        | Component specs (what components are in sections) |
| 7     | `CORE-PHASES/phase-7-design-tokens.md`            | Token system (colors, spacing, typography)        |
| 8     | `CORE-PHASES/phase-8-frontend-architecture.md`    | Codebase structure (REFERENCE CONSTANTLY)         |
| 9     | `CORE-PHASES/phase-9-implementation-roadmap.md`   | Sprint breakdown, timelines (project planning)    |
| 10    | `CORE-PHASES/phase-10-qa-checklist.md`            | QA requirements (pre-launch verification)         |

---

## Success Metrics

**Per change:**

- [ ] Tests passing
- [ ] Zero TypeScript errors
- [ ] Zero ESLint errors
- [ ] Code review approved

**MVP 1.5 Launch:**

- [ ] 27 pages live
- [ ] Lighthouse >90 (all pages)
- [ ] WCAG 2.2 AA compliant
- [ ] 99.95% uptime
- [ ] <0.5% error rate
- [ ] NPS >50

---

## Questions?

1. **Where does this file go?** → `.claude/CLAUDE.md`, then `CORE-PHASES/phase-8-frontend-architecture.md`
2. **What to build?** → `CORE-PHASES/phase-4-page-blueprints.md`
3. **Design token?** → `CORE-PHASES/phase-7-design-tokens.md`
4. **QA requirements?** → `CORE-PHASES/phase-10-qa-checklist.md`
5. **Timeline?** → `CORE-PHASES/phase-9-implementation-roadmap.md`

---

## Start Here

```bash
# 1. Read the binding rules
cat .claude/CLAUDE.md

# 2. Read the architecture
cat design-os/CORE-PHASES/phase-8-frontend-architecture.md

# 3. Review the existing tree
ls app/ components/ lib/ styles/

# 4. Install (nothing new — the lockfile is the contract)
pnpm install

# 5. Run it
pnpm dev

# 6. Verify before pushing
pnpm test && pnpm type-check && pnpm lint
```

# Keyhold — Master Implementation Prompt

**The engineering synthesis of all nine phases, written for this codebase.** · Version 2.0 · 29 September 2026

Copy this file into a new session to continue building. Entry point: [START_HERE](../INDEX/START_HERE.md) · Master index: [DESIGN-OS-COMPLETE](../INDEX/DESIGN-OS-COMPLETE.md).

---

## Contents

1. [Read This Before Using It](#read-this-before-using-it)
2. [Overview](#overview)
3. [Required Reading: Phases 1–6](#required-reading-phases-16)
4. [Visual Design Hand-off](#visual-design-hand-off)
5. [Phase 7 Implementation: Architecture](#phase-7-implementation-architecture)
6. [Phase 8 Implementation: Sprints and Remaining Work](#phase-8-implementation-sprints-and-remaining-work)
7. [Phase 9 Implementation: QA](#phase-9-implementation-qa)
8. [The Installed Stack](#the-installed-stack)
9. [Code Standards](#code-standards-non-negotiable)
10. [Code Patterns](#code-patterns)
11. [Testing Strategy](#testing-strategy)
12. [Gates and Pre-merge Checklist](#gates-and-pre-merge-checklist)
13. [Deployment Readiness](#deployment-readiness)
14. [Key References](#key-references)
15. [Success Metrics](#success-metrics)
16. [Questions?](#questions)
17. [Start Here](#start-here)
18. [Regeneration Notes](#regeneration-notes)

---

## Read This Before Using It

Four things about this document:

1. **It is project-specific.** It names this product's routes, portals, APIs, sprint plan and staffing. It is not a reusable seed prompt for another project — that is `docs/MASTER_PROMPT_COMPLETE.md`.
2. **It is a plan, not a mirror of the tree.** Much of the roadmap below is already built — the route groups, the primitives, the API layer and nearly every page exist. [Phase 8 › Per-feature Build Status](../CORE-PHASES/phase-8-implementation-roadmap.md#per-feature-build-status) says exactly what is and is not. Check it, and the working tree, before acting on a sprint.
3. **`.claude/CLAUDE.md` overrides it.** That file is the binding specification for folder placement, data flow, naming, styling, dependency policy and testing. Where this document and `.claude/CLAUDE.md` disagree, `.claude/CLAUDE.md` wins.
4. **It never decides how anything looks.** See [Visual Design Hand-off](#visual-design-hand-off).

---

## Overview

**What this prompt does.** It turns the nine phases into engineering action: where code goes, what to build next, the patterns to build it with, and how to prove it is done.

**How to use it.**

1. Read `.claude/CLAUDE.md`.
2. Read the phases listed under [Required Reading](#required-reading-phases-16) for the feature you are touching.
3. Look the feature up in Phase 8's build status. If it is **Specified** or **In progress**, it is yours to build; if **Built**, you are changing it — read its row in RATIFIED_DIVERGENCES first.
4. Run the visual concept for the page with the owner ([Visual Design Hand-off](#visual-design-hand-off)).
5. Build to the patterns below; verify against Phase 9; update the status row in Phase 8.

**Design OS location:** `design-os/` in the frontend root — `CORE-PHASES/` (the nine phases), `IMPLEMENTATION/` (this file, SETUP-CHECKLIST), `INDEX/` (navigation and RATIFIED_DIVERGENCES).

---

## Required Reading: Phases 1–6

| Phase | File | Read it for |
| ----- | ---- | ----------- |
| 1 | [Product Vision](../CORE-PHASES/phase-1-product-vision.md) | Personas, roles, **business rules BR1–BR18**, principles, non-goals |
| 2 | [Experience Maps](../CORE-PHASES/phase-2-experience-maps.md) | The journey a feature serves; its failure and recovery paths |
| 3 | [Information Architecture](../CORE-PHASES/phase-3-information-architecture.md) | Routes, permissions, labels, empty/fallback routes |
| 4 | [Page Blueprints](../CORE-PHASES/phase-4-page-blueprints.md) | **Every page you build** — primary tasks (user goals), data, permissions, rules, states. What the page contains is decided with the owner at build time |
| 5 | [Section Blueprints](../CORE-PHASES/phase-5-section-blueprints.md) | The jobs a page is split into — data, behaviour, accessibility; Section Defaults |
| 6 | [Interaction Contracts](../CORE-PHASES/phase-6-interaction-contracts.md) | How every control behaves — keyboard, ARIA, validation, loading, error |

Also: [RATIFIED_DIVERGENCES](../INDEX/RATIFIED_DIVERGENCES.md) — owner decisions where the code departs from Phases 1–7. They win over the blueprint text they cite.

---

## Visual Design Hand-off

This design OS defines what each page must do, not how it looks. The look of each page is decided when it is built: before coding a page, run a visual concept for it with the repo's UI skills, present it to the owner, and build only after approval. Review the rendered page before marking it Built.

---

## Phase 7 Implementation: Architecture

**File:** [phase-7-frontend-architecture.md](../CORE-PHASES/phase-7-frontend-architecture.md)

### Folder structure (exact paths)

| Kind of code | Path |
| ------------ | ---- |
| Route | `app/(public)/…`, `app/(auth)/…`, `app/dashboard/…`, `app/agent/…`, `app/admin/…` |
| Primitive | `components/ui/` (`charts/`, `forms/`) |
| Generic composition | `components/patterns/` |
| Domain leaf (row, table, mark, modal) | `components/features/<consuming portal>/` or `shared/` |
| Route section | `components/sections/<route>/<route>-{console,header,main,rail,stat-band,toolbar}.tsx` |
| Chrome | `components/layout/` |
| Endpoint | `lib/constants.ts` → `config.api.*` |
| Resource call | `lib/api/<resource>.ts` |
| Hook | `lib/hooks/use-<resource>.ts`, keys in `lib/hooks/query-keys.ts` |
| Mapper | `lib/utils/to-<entity>.ts` |
| Per-screen derivation, options, copy | `lib/data/<route>.ts` |
| Feature config and copy | `lib/config/<feature>.ts` |
| Schema | `lib/validations/<domain>.ts` |
| Shared type | `lib/types/<domain>.ts`, re-exported by `lib/types/index.ts` |
| Test fixture | `lib/data/__fixtures__/` |

### Route structure (exact routes)

| Portal | Routes |
| ------ | ------ |
| Public | `/`, `/search`, `/listing/:id`, `/map`, `/about`, `/help`, `/blog`, `/contact`, `/privacy`, `/terms`, `/accessibility`, `/newsletter/confirm`, `/newsletter/unsubscribe` |
| Auth | `/signup`, `/login`, `/reset-password`, `/verify-email` |
| Buyer (`BUYER`) | `/dashboard`, `/dashboard/{saved,interests,offers,offers/:id,viewings,messages,transactions,alerts,settings}` |
| Agent (`SELLER`) | `/agent`, `/agent/{listings,listings/new,listings/:id/edit,requests,leads,pipeline,calendar,concierge,analytics,settings}` |
| Admin (`ADMIN`) | `/admin`, `/admin/{listings,flags,disputes,users,users/:id,transactions,payments,reports,verifications,settings}` |

Page numbers for each route: [Phase 4 › Page Index](../CORE-PHASES/phase-4-page-blueprints.md#page-index).

**Note:** the frontend has **no App Router API routes** for data. All data comes from the NestJS backend in `../backend` via `lib/api/client.ts`, with endpoints named in `lib/constants.ts` under `config.api.*`. The only route handler serves MapLibre worker files.

### Providers and contexts

`components/providers/provider.tsx` composes TanStack Query, the session provider and the motion provider, plus the toast viewport. Zustand stores: `lib/stores/auth-store.ts`, `lib/stores/toast-store.ts`. Nothing else wraps the tree. A new store needs a stated reason.

### Hooks organization

One resource or concern per file; every query keyed through `query-keys.ts`; mutations declare feedback copy through `meta` (`lib/config/feedback.ts`) and never retry. Cross-cutting hooks: `use-confirmation`, `use-unsaved-changes-warning`, `use-url-state`, `use-debounced-search`, `use-dialog-focus`.

### Component organization

- The `*-console` is the only section that calls hooks. It derives shapes with `useMemo` and `lib/utils/to-*` mappers, renders `ConsoleUnavailable` with a `CONSOLE_FALLBACKS` entry on error, and passes rows down as props.
- `*-main` / `*-rail` / `*-stat-band` never fetch.
- A section that serves two routes moves to `features/`. A pattern used twice is promoted out of the page that birthed it.

---

## Phase 8 Implementation: Sprints and Remaining Work

**File:** [phase-8-implementation-roadmap.md](../CORE-PHASES/phase-8-implementation-roadmap.md)

### The original 16-week plan

| Sprint | Weeks | Focus                                               | Pages and flows                          | Owner    | Hours |
| ------ | ----- | --------------------------------------------------- | ---------------------------------------- | -------- | ----- |
| 1-2    | 1-2   | Foundation, architecture, tooling                   | Root layout, providers, API layer        | Lead Eng | 80    |
| 2-3    | 3-4   | Interaction contracts (primitives + patterns)       | C1–C30                                   | Frontend | 120   |
| 3-4    | 5-6   | Search & discovery                                  | Pages 1–4 · J1, J2                        | 2-3 Eng  | 160   |
| 4-5    | 7-8   | Authentication (signup, login, reset, OAuth)        | Pages 5–7, 35 · J6                        | 1-2 Eng  | 100   |
| 5-6    | 9-10  | Buyer dashboard (saved, offers, viewings, messages) | Pages 8–14, 38, 39 · J3, J4, J5, J7, J14, J17, J19 | 2-3 Eng | 200 |
| 6-7    | 11-12 | Agent dashboard (listings, leads, pipeline)         | Pages 15–19, 40–42 · J15, J16             | 2-3 Eng  | 180   |
| 7-8    | 13-14 | Admin dashboard (moderation, users, transactions)   | Pages 20–27, 43, 44 · J8–J13, J18         | 1-2 Eng  | 120   |
| 8      | 15-16 | QA, accessibility, deployment                       | Pages 28–34, 45, 46 · Phase 9             | QA + Eng | 160   |

**Total:** ~1120 hours, 4-5 engineers, 16 weeks.

**Sequencing and dependencies:** Foundation → Contracts → Search + Auth → Buyer → Agent → Admin → QA. Money and trust features (checkout, escrow, disputes) need their acceptance criteria written before their tests. Each page's build needs an owner-approved visual concept first.

**Milestones:** week 2 architecture ready · week 4 contracts ready · week 6 search flow · week 8 auth live · week 10 buyer dashboard · week 12 agent features · week 14 admin dashboard · week 16 production ready.

The foundation, primitives and all portals exist in the tree today. Treat the table as the original plan and the delivery order it implies — not as a to-do list to start from zero.

### What remains (from Phase 8, 29 September 2026)

**In progress** — started, not finished:

- Delete account (14.3a) — modal and API call exist; wire them, or change the Privacy page's promise. Owner decision.
- VIP Concierge editing (42.6a) — hooks exist; no surface.
- Two-factor authentication — modal exists, unwired, and in no blueprint. Owner decision.

**Specified** — not started:

- Location autocomplete (2.1a, Section 37, C24)
- Video tour link (3.4a, Section 9a)
- Change password in place (14.3b)
- Import CSV (16.5a)
- Admin Revoke and Allow Resubmit (26.3a)
- Root error boundary and support error ID (46.a)
- Delete/snooze from the conversation list (24a); unnamed messaging Section 29
- General multi-step form (Section 39); price range slider (Section 35, C23 — ratified alternative in use); avatar group (C28)
- Offline / no-connection handling (Section 55)
- Viewing reminders (J3a); phone and SMS opt-in at sign-up (J6a)
- E2E runner, visual regression, component stories (dependency approval needed)
- `lib/contract/` adoption
- Legal review of Privacy and Terms

**Deferred** — see [Phase 8 › Deferred Register](../CORE-PHASES/phase-8-implementation-roadmap.md#deferred-register). Do not start these without the revisit trigger being met.

---

## Phase 9 Implementation: QA

**File:** [phase-9-qa-checklist.md](../CORE-PHASES/phase-9-qa-checklist.md) — 200+ items. A feature passing it moves to **Verified** in Phase 8.

| Category | Key items |
| -------- | --------- |
| Accessibility | WCAG 2.2 AA; contrast (1.4.3, 1.4.11); keyboard equivalents for drag and map pins; labelled inputs; announced errors and updates; reduced motion; target size (2.5.8) |
| Performance | Lighthouse >90; LCP <2.5s; INP <200ms; CLS <0.1; JS <250kb gzipped; MapLibre only where a map shows |
| Browsers | Chrome, Firefox, Safari, Edge (latest + 1); iOS Safari; Chrome Android |
| Responsive behaviour | Reflow from 320 CSS px; 200% zoom; every task on touch; portal tables scroll within themselves |
| Behavioural consistency | One confirmation pattern; no automatic write retries; note-required decisions identical; counts agree |
| State coverage | Loading, empty, error, success on every page and section; an outage never looks like an empty market |
| Content honesty | BR15, BR17; no promise of unshipped features |
| Interaction contract completeness | Every control meets its Phase 6 contract (inputs, states, keyboard, ARIA, validation, loading, error) |
| Admin | Server-enforced access; tables; moderation; verifications; trust queues; settings; charts; data integrity |
| Security | `pnpm audit`; no secrets client-side; CSP; OAuth linking per BR12 |
| SEO | Metadata, JSON-LD, sitemap, robots, canonical |

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
| Headless UI  | `@base-ui/react`                                                       |
| Charts       | `recharts`                                                             |
| Maps         | `maplibre-gl`                                                          |
| Dates        | `date-fns`                                                             |
| IDs          | `nanoid`                                                               |
| Payments     | `@stripe/stripe-js`, `@stripe/react-stripe-js`                         |
| Auth tokens  | `jose`                                                                 |
| Monitoring   | `@sentry/nextjs`                                                       |

**Dev:**

`typescript`, `eslint` + `typescript-eslint`, `prettier` (+ tailwind plugin), `vitest`, `@testing-library/react`, `@testing-library/user-event`, `@testing-library/jest-dom`, `vitest-axe`, `jsdom`, `husky`, `lint-staged`, `jiti`.

**Not installed, and not to be assumed:** `react-hook-form`, `@hookform/resolvers`, `next-themes`, `@playwright/test`, `framer-motion`, Storybook. Forms are built on the project's own `components/ui/forms/` primitives and Zod schemas.

---

## Code Standards (NON-NEGOTIABLE)

### From `.claude/CLAUDE.md`

1. **No comments.** Code reads clearly on its own. If it doesn't, the abstraction is wrong.
2. **No hardcoding.** Endpoints in `config.api.*`, shapes from Zod, recurring copy in `lib/constants.ts` or `lib/config/<feature>.ts`, sample content in `lib/data/`.
3. **No `any`.** Use `unknown` + narrowing or precise types. Derive from Zod with `z.infer`.
4. **Match the existing architecture.** Don't invent patterns or locations. State the reason before deviating.
5. **Single source of truth.** Name a recurring decision once and reference it everywhere.
6. **Minimize LOC.** Shortest solution that stays maintainable.
7. **No `console.log` / `console.error`** in committed code.

### Styling

Follow `.claude/CLAUDE.md` › Required patterns › Styling. `styles/tokens.css` is the code's design source of truth ([ADR 0012](../../docs/adr/0012-tokens-are-the-design-source-of-truth.md)). This prompt specifies no visual values.

### Business rules in code

Every rule in [Phase 1 › Business Rules](../CORE-PHASES/phase-1-product-vision.md#business-rules) is enforced by the backend and respected by the frontend. The frontend must never widen one (e.g. offer a release control to a role BR2 forbids) and must state the rule when it refuses an action.

---

## Code Patterns

### Page template

A route `page.tsx` composes sections and holds page-level state — nothing else.

```tsx
import { AdminFlagsConsole } from "@/components/sections/admin/admin-flags-console";

export default function AdminFlagsPage() {
    return <AdminFlagsConsole />;
}
```

### Component structure template (console)

```tsx
"use client";

import { ConsoleUnavailable } from "@/components/patterns/console-unavailable";
import { EmptyState } from "@/components/ui/empty-state";
import { CONSOLE_FALLBACKS } from "@/lib/config/console-fallbacks";
import { useFlagQueue } from "@/lib/hooks/use-flag-queue";

export function AdminFlagsConsole() {
    const queue = useFlagQueue();

    if (queue.failed)
        return (
            <ConsoleUnavailable
                fallback={CONSOLE_FALLBACKS.adminFlags}
                onRetry={() => void queue.refetch()}
            />
        );

    if (queue.visible.length === 0)
        return <EmptyState title={EMPTY_TITLE} description={EMPTY_LEDE} />;

    return <AdminFlagsMain reports={queue.visible} onSettle={queue.requestSettle} />;
}
```

The console owns the fetch, the fallback, the empty state and the derived rows; `*-main` receives props.

### Hook patterns

```typescript
export function useFlags(input: FlagQuery = {}, enabled = true) {
    return useQuery({
        queryKey: queryKeys.flags.list(input),
        queryFn: () => flagsAPI.list(input),
        enabled,
        staleTime: STALE_TIME,
        gcTime: CACHE_TIME,
    });
}

export function useSettleFlag() {
    const client = useQueryClient();
    return useMutation({
        meta: FEEDBACK.settleFlag,
        mutationFn: ({ id, dismiss, note }: { id: string; dismiss?: boolean } & ResolveFlagInput) =>
            dismiss ? flagsAPI.dismiss(id, { note }) : flagsAPI.resolve(id, { note }),
        onSuccess: () => client.invalidateQueries({ queryKey: queryKeys.flags.all }),
    });
}
```

### API integration pattern

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
export function useProperties(input: PropertyQuery = {}) {
    return useQuery({
        queryKey: queryKeys.properties.list(input),
        queryFn: () => propertiesAPI.list(input),
        staleTime: STALE_TIME,
        gcTime: CACHE_TIME,
    });
}
```

Components consume hooks. They never call `lib/api/*` and never touch `fetch` directly.

### Error handling

- **Console failure:** `ConsoleUnavailable` with a `CONSOLE_FALLBACKS` entry and a retry.
- **Segment crash:** the segment's `error.tsx` names what failed, what was not affected, and offers retry.
- **Mutation failure:** global toast by default ([ADR 0013](../../docs/adr/0013-mutation-feedback-is-global-by-default.md)); inline inside a modal with `silentError` so it is not reported twice. Never retry automatically ([ADR 0021](../../docs/adr/0021-writes-are-sent-once-and-confirmations-lock.md)).
- **Destructive actions:** `ConfirmModal` + `useConfirmation` — names target and effect, locks while pending, keeps the dialog open with the reason on failure.
- **Refused actions:** say who can act ("Only {buyer} can submit an offer on this property." — BR6).

### Loading states

- Portal routes: `loading.tsx` per portal; consoles render a skeleton that preserves structure while the first query resolves.
- Actions: the control disables and announces busy while pending.
- Lazy data (nearby places, detail panes) fetches on open and shows its own loading state.

### Empty states

- Say what is missing and the next action; copy lives in `lib/data/<route>.ts` or `lib/config/`.
- Distinguish "nothing yet" from "nothing matches this filter".
- Never fill an empty state with fabricated content (BR15).

---

## Testing Strategy

**Runner:** Vitest, configured in `vitest.config.mts`. Tests are colocated as `<unit>.test.ts(x)` beside the unit they cover.

### Unit test coverage targets

- >80% on `lib/` — utilities, validators, formatters, mappers, selectors, hooks
- All Zod schemas (validation logic)
- Mock at the `lib/api/<resource>.ts` boundary, never the hook
- Test-only fixtures live in `lib/data/__fixtures__/`
- A test name states the criterion it proves, not the function it calls

### Integration test priorities

1. Money paths: checkout, escrow release/refund (BR1–BR3) — acceptance criteria first
2. Decisions with required notes: moderation, disputes (BR4, BR5)
3. Deal stage moves and milestone seeding (BR6, BR7)
4. Auth and portal guards
5. Consoles: fallback on failure, empty vs filtered-empty
- Component behaviour via `@testing-library/react` — behaviour, not snapshots; >60% on `components/`

### E2E test scenarios

No E2E runner is installed. Adding one is a dependency decision that needs approval first — do not assume Playwright. When approved, start with:

1. Anonymous search → listing → sign-up gate → back to listing (J1, J2, J6)
2. Buyer offer → agent counter → buyer accepts → checkout → release (J4, J17)
3. Agent listing submission → admin moderation → live in search (J16, J9)
4. Member report → admin upholds (J18)
5. Role guard: buyer and agent cannot reach `/admin`

### Budget tests

`styles/bundle-budget.test.ts` and `styles/responsive-budget.test.ts` guard bundle size and responsive behaviour as part of the normal suite.

### Accessibility testing

- Automated: `vitest-axe` assertions per component
- Keyboard navigation pass per page
- Screen reader pass (NVDA / JAWS / VoiceOver)
- WCAG 2.2 AA compliance per Phase 9

---

## Gates and Pre-merge Checklist

Git hooks are **disabled** in this repo: the `prepare` script unsets `core.hooksPath` on every install, so `.husky/` does not run. Run the gate by hand.

- **Would-be pre-commit:** `pnpm lint-staged` — `eslint --fix` then `prettier --write` over staged files.
- **Would-be pre-push:** `pnpm type-check`, `pnpm lint`, `pnpm enums:check`, `pnpm contract:check`.
- **Tests:** `pnpm test` is on you. A failing test is never left for later.

### Before merging

- [ ] The page's visual concept was approved by the owner, and the rendered page reviewed
- [ ] `pnpm test` passes
- [ ] `pnpm type-check` passes
- [ ] `pnpm lint` passes
- [ ] `pnpm enums:check` and `pnpm contract:check` pass
- [ ] `pnpm build` succeeds
- [ ] No console errors/warnings
- [ ] Interaction contracts met (Phase 6)
- [ ] Accessibility audit passes
- [ ] Performance budget not exceeded
- [ ] Code review approved
- [ ] Phase 8 status row updated; RATIFIED_DIVERGENCES entry added if the code departs from Phases 1–7
- [ ] Phase 9 checklist complete for the feature

---

## Deployment Readiness

- Hosting: Vercel, functions pinned to Dublin; backend and email in the EU ([ADR 0019](../../docs/adr/0019-production-runs-in-europe.md)). Details in `docs/DEPLOYMENT.md`.
- Environment: API base URL, site URL, Stripe keys, auth providers (`NEXT_PUBLIC_AUTH_PROVIDERS` — do not list `apple`), Sentry DSN.
- CSP pins map tiles and payment origins; `worker-src blob:` for MapLibre.
- Release: merge to `master` after review, tag, deploy, smoke test, monitor; rollback by `git revert` + redeploy.
- Before launch: Phase 9 pre-launch checklist, legal review of Privacy and Terms, the content-honesty checks.

---

## Key References

All paths relative to `design-os/`.

| Phase | File                                              | Use For                                           |
| ----- | ------------------------------------------------- | ------------------------------------------------- |
| —     | `../.claude/CLAUDE.md`                            | **Binding rules — overrides this document**       |
| —     | `INDEX/RATIFIED_DIVERGENCES.md`                   | Owner decisions where code departs from the spec  |
| 1     | `CORE-PHASES/phase-1-product-vision.md`           | Strategy, personas, business rules                |
| 2     | `CORE-PHASES/phase-2-experience-maps.md`          | User flows, decision points (when building flows) |
| 3     | `CORE-PHASES/phase-3-information-architecture.md` | Navigation, IA, permissions (routing, auth)       |
| 4     | `CORE-PHASES/phase-4-page-blueprints.md`          | Page specs (REFERENCE FOR EVERY PAGE)             |
| 5     | `CORE-PHASES/phase-5-section-blueprints.md`       | Section specs (what sections compose pages)       |
| 6     | `CORE-PHASES/phase-6-interaction-contracts.md`    | How every control behaves                         |
| 7     | `CORE-PHASES/phase-7-frontend-architecture.md`    | Codebase structure (REFERENCE CONSTANTLY)         |
| 8     | `CORE-PHASES/phase-8-implementation-roadmap.md`   | Sprints, build status, deferred register          |
| 9     | `CORE-PHASES/phase-9-qa-checklist.md`             | QA requirements (pre-launch verification)         |
| —     | `IMPLEMENTATION/SETUP-CHECKLIST.md`               | Getting a working environment                     |

---

## Success Metrics

**Per change:**

- [ ] Tests passing
- [ ] Zero TypeScript errors
- [ ] Zero ESLint errors
- [ ] Code review approved
- [ ] Status row updated in Phase 8

**MVP 1.5 Launch:**

- [ ] 27 pages live
- [ ] Lighthouse >90 (all pages)
- [ ] WCAG 2.2 AA compliant
- [ ] 99.95% uptime
- [ ] <0.5% error rate
- [ ] NPS >50

---

## Questions?

1. **Where does this file go?** → `.claude/CLAUDE.md`, then `CORE-PHASES/phase-7-frontend-architecture.md`
2. **What to build?** → `CORE-PHASES/phase-4-page-blueprints.md`, then its status in `phase-8-implementation-roadmap.md`
3. **How does this control behave?** → `CORE-PHASES/phase-6-interaction-contracts.md`
4. **What should it look like?** → Nowhere in this OS — run a visual concept with the owner ([Visual Design Hand-off](#visual-design-hand-off))
5. **QA requirements?** → `CORE-PHASES/phase-9-qa-checklist.md`
6. **Timeline?** → `CORE-PHASES/phase-8-implementation-roadmap.md`
7. **The code disagrees with the spec?** → `INDEX/RATIFIED_DIVERGENCES.md`

---

## Start Here

```bash
# 1. Read the binding rules
cat .claude/CLAUDE.md

# 2. Read the architecture and the status
cat design-os/CORE-PHASES/phase-7-frontend-architecture.md
cat design-os/CORE-PHASES/phase-8-implementation-roadmap.md

# 3. Review the existing tree
ls app/ components/ lib/ styles/

# 4. Install (nothing new — the lockfile is the contract)
pnpm install

# 5. Run it
pnpm dev

# 6. Verify before pushing (hooks are disabled — run by hand)
pnpm test && pnpm type-check && pnpm lint && pnpm enums:check && pnpm contract:check
```

**Next session:** copy this file into the new session as the opening prompt, name the page or feature, and start from its Phase 4 blueprint and Phase 8 row.

---

## Regeneration Notes

- **Retained:** the four cautions, the sprint table with owners and hours, the installed stack and not-installed list, the eight code standards, the API pattern, the console/rail data-flow rule, the testing strategy, the pre-ship checklist, key references, success metrics, questions and start-here commands.
- **Added:** the verbatim **Visual Design Hand-off**; overview and how-to-use; required-reading table; exact folder and route maps; providers, hooks and component organisation; pages and flows per sprint; milestones; "What remains" drawn from Phase 8; QA category table; page, console and hook templates; error, loading and empty patterns; integration priorities; E2E scenarios; deployment readiness; `@base-ui/react`, `maplibre-gl`, `@sentry/nextjs`, `jiti` in the stack.
- **Changed — screen content removed (30 September 2026, seed-prompt Self-Audit):** the Required Reading row for Phase 4 no longer points at "content requirements in priority order" (the field is gone); Phase 4 is read for primary tasks, data, permissions, rules and states, and Phase 5 for each section's job rather than "sections a page is composed of". File paths under Phase 7 Implementation and in "What remains" are records of code and are unchanged.
- **Changed:** "synthesis of Phases 8-10" → "all nine phases"; phase file names and numbers updated to the 9-phase layout; `react-day-picker` removed from the stack table (not in `package.json`); the gates section corrected — hooks are disabled, and the push gate includes `enums:check` and `contract:check`. **Dropped as visual prescription:** the Styling subsection's named scale classes (`.pad`, `.gap`, `.micro-label`, `.rail-label`…), "Inline responsive utility chains are forbidden", "Colors, typography, spacing and motion are theme tokens", the Tailwind `@theme` note, "Design system (tokens only, no hardcoded values)" from the QA list, the "Design token?" question and the Phase 7 Design Tokens reference row — styling is governed by `.claude/CLAUDE.md` and the code.

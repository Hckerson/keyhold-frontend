# Phase 7: Frontend Architecture

**Keyhold Design Operating System** · Phase 7 of 9 · Version 2.0 · 29 September 2026

The shape of the codebase that carries Phases 1–6. Previous: [Phase 6 — Interaction Contracts](phase-6-interaction-contracts.md) · Next: [Phase 8 — Implementation Roadmap](phase-8-implementation-roadmap.md).

> **Rename.** This file was `phase-8-frontend-architecture.md` in version 1 (ten-phase layout). Its content survives here; the old Phase 7 (Design Tokens) has no successor — see [Styling](#styling).

---

## Contents

1. [Authority](#authority)
2. [Overview](#overview)
3. [Backend Boundary](#backend-boundary)
4. [Folder Structure](#folder-structure)
5. [Route Structure](#route-structure)
6. [Layouts](#layouts)
7. [Providers, Contexts and Stores](#providers-contexts-and-stores)
8. [Feature Folders and Component Organization](#feature-folders-and-component-organization)
9. [Portal Data Flow](#portal-data-flow)
10. [API Layer](#api-layer)
11. [Hooks](#hooks)
12. [Utilities and Constants](#utilities-and-constants)
13. [State Management](#state-management)
14. [Type Safety](#type-safety)
15. [Shared Libraries](#shared-libraries)
16. [Asset Organization](#asset-organization)
17. [Styling](#styling)
18. [Naming Conventions and File Rules](#naming-conventions-and-file-rules)
19. [Code Splitting and Lazy Loading](#code-splitting-and-lazy-loading)
20. [Performance Strategy](#performance-strategy)
21. [Regeneration Notes](#regeneration-notes)

---

## Authority

`.claude/CLAUDE.md` at the repo root is the binding specification for folder placement, data flow, naming, and file rules. This phase describes the shape of the codebase and the reasoning behind it. Where the two disagree, `.claude/CLAUDE.md` wins.

---

## Overview

Frontend architecture transforms Phases 1-6 (vision, journeys, IA, pages, sections, interaction contracts) into a production-ready Next.js codebase. This phase specifies:

- Folder structure
- Route organization (App Router)
- Layouts and providers
- Hook system
- API client organization
- State management strategy
- Type safety enforcement
- Environment configuration
- Code splitting, lazy loading and performance

**Goal:** Engineering can build from this spec without ambiguity.

---

## Backend Boundary

The frontend has **no App Router API routes** for data. All data comes from the NestJS backend in `../backend`, reached through `lib/api/client.ts`. Endpoints are named once in `lib/constants.ts` under `config.api.*` and never inlined.

The one route handler, `app/maplibre/[version]/[file]/route.ts`, serves MapLibre's worker files from `node_modules` with an immutable cache header (version-pinned, allow-listed files only). It serves static assets, not data. _(Correction: version 1 said "no App Router API routes"; this handler postdates it.)_

`proxy.ts` at the repo root handles request forwarding to the backend in development.

`lib/contract/` holds route builders and schemas **generated** from the backend's OpenAPI document (`pnpm contract`, checked by `pnpm contract:check`). Never edit it by hand. It has no consumers yet — adoption is scheduled work, not dead code (Phase 8).

---

## Folder Structure

```
frontend/
├── app/                          # Next.js App Router — pages compose, nothing else
│   ├── (auth)/                   # Auth route group
│   │   ├── login/
│   │   ├── signup/
│   │   ├── reset-password/
│   │   ├── verify-email/
│   │   └── layout.tsx            # Auth layout
│   │
│   ├── (public)/                 # Public marketing + discovery (server-rendered)
│   │   ├── page.tsx              # Home /
│   │   ├── search/               # /search (+ error.tsx)
│   │   ├── listing/[id]/         # /listing/:id (+ error.tsx)
│   │   ├── map/                  # /map
│   │   ├── about/ help/ blog/ contact/
│   │   ├── privacy/ terms/ accessibility/
│   │   ├── newsletter/confirm/ newsletter/unsubscribe/
│   │   └── layout.tsx            # App layout (header, footer)
│   │
│   ├── dashboard/                # Buyer portal
│   │   ├── layout.tsx            # Portal shell
│   │   ├── loading.tsx / error.tsx
│   │   ├── page.tsx              # /dashboard
│   │   ├── saved/
│   │   ├── interests/
│   │   ├── offers/
│   │   │   └── [id]/
│   │   ├── viewings/
│   │   ├── messages/
│   │   ├── transactions/
│   │   ├── alerts/
│   │   └── settings/
│   │
│   ├── agent/                    # Agent portal (Agent and Seller personas)
│   │   ├── layout.tsx
│   │   ├── loading.tsx / error.tsx
│   │   ├── page.tsx              # /agent
│   │   ├── listings/
│   │   │   ├── new/
│   │   │   └── [id]/edit/
│   │   ├── leads/
│   │   ├── requests/
│   │   ├── pipeline/
│   │   ├── calendar/
│   │   ├── concierge/
│   │   ├── analytics/
│   │   └── settings/
│   │
│   ├── admin/                    # Admin portal
│   │   ├── layout.tsx
│   │   ├── loading.tsx / error.tsx
│   │   ├── page.tsx              # /admin
│   │   ├── listings/             # moderation
│   │   ├── flags/
│   │   ├── disputes/
│   │   ├── users/
│   │   │   └── [id]/
│   │   ├── transactions/
│   │   ├── payments/
│   │   ├── reports/
│   │   ├── verifications/
│   │   └── settings/
│   │
│   ├── maplibre/[version]/[file]/route.ts  # MapLibre worker assets
│   ├── layout.tsx                # Root layout (providers, fonts, globals)
│   ├── not-found.tsx             # 404
│   ├── icon.svg / apple-icon.tsx # Favicons
│   ├── robots.ts
│   └── sitemap.ts
│
├── components/
│   ├── ui/                       # Domain-free primitives, reusable in any app
│   │   ├── charts/
│   │   ├── forms/
│   │   └── …                     # button, input, badge, skeleton, modal, map-view, …
│   │
│   ├── patterns/                 # Generic compositions over primitives
│   │   └── …                     # data-table*, filter-pills, stat-grid, confirm-modal,
│   │                             #   section-shell, console-unavailable, prose-*, …
│   │
│   ├── features/                 # Reusable domain leaves — rows, tables, marks, modals
│   │   ├── admin/  agent/  auth/  dashboard/
│   │   ├── listings/  messaging/  offers/  settings/
│   │   └── shared/               # used by two or more portals
│   │
│   ├── sections/                 # Route-level composition, one set per route
│   │   ├── home/  search/  listing/  site/
│   │   ├── dashboard/  agent/  admin/
│   │   └── …                     # *-console, *-header, *-main, *-rail, *-stat-band
│   │
│   ├── layout/                   # App chrome
│   │   └── …                     # header, footer, sidebar*, topbar*,
│   │                             #   app-layout, portal-shell, command-palette, newsletter-form
│   │
│   ├── brand/                    # Wordmark, logo mark, logo chip
│   └── providers/                # provider, session-provider, motion-provider
│
├── lib/                          # Core logic layer — no JSX
│   ├── api/                      # Transport + resource calls (no hooks)
│   │   ├── client.ts             # The only place the HTTP client is configured
│   │   ├── server.ts             # Server-side calls
│   │   ├── query-client.ts       # TanStack Query client (global mutation feedback)
│   │   └── <resource>.ts         # properties, offers, messages, users, escrow, flags, …
│   │
│   ├── contract/                 # GENERATED from the backend OpenAPI — never edit
│   ├── hooks/                    # use-<resource>.ts wrapping lib/api/*
│   │   ├── query-keys.ts         # Central query key factory
│   │   └── use-*.ts
│   │
│   ├── data/                     # Route-scoped selectors, filter/sort options, copy
│   │   └── __fixtures__/         # Test-only fixtures
│   │
│   ├── utils/                    # Pure helpers + to-<entity>.ts mappers
│   ├── types/                    # Shared domain types, re-exported by index.ts
│   ├── validations/              # Zod schemas — types derive with z.infer
│   ├── enums/                    # enums.ts — literals and label maps (mirrors the backend)
│   ├── config/                   # Feature-scoped config (nav, tones, motion, copy, feedback)
│   ├── stores/                   # Zustand stores — auth-store, toast-store
│   └── constants.ts              # config.api.* endpoints, durations, limits
│
├── styles/                       # Governed by the code — see Styling
│
├── public/
│   ├── fonts/
│   └── brand/
│
├── tools/                        # Repo tooling outside the app: enum parity, contract generator,
│                                 #   ESLint rules, codemods
├── design-os/                    # This design system. Not application code.
├── docs/                         # Prose docs, ADRs. Not application code.
│
├── proxy.ts                      # Dev request forwarding to the NestJS backend
├── next.config.ts                # Next.js config (no @/ aliases — they resolve wrong here)
├── tsconfig.json                 # TypeScript strict mode
├── vitest.config.mts             # Vitest config
├── eslint.config.mjs
├── postcss.config.mjs
├── .env.example
└── package.json
```

---

## Route Structure

| Group       | Routes                                                                | Rendering ([ADR 0002](../../docs/adr/0002-per-route-rendering-split.md))                                                                | Guard                                  |
| ----------- | --------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| `(public)`  | `/`, `/search`, `/listing/:id`, `/map`, site pages, newsletter tokens | Server components; client leaves only where state demands ([ADR 0017](../../docs/adr/0017-screen-classes-are-named-by-state-source.md)) | None                                   |
| `(auth)`    | `/signup`, `/login`, `/reset-password`, `/verify-email`               | Client forms                                                                                                                            | Signed-in users leave for their portal |
| `dashboard` | `/dashboard/*`                                                        | Client portal shell; thin server `page.tsx`; client `*-console`                                                                         | `BUYER`                                |
| `agent`     | `/agent/*`                                                            | Same as dashboard                                                                                                                       | `SELLER`                               |
| `admin`     | `/admin/*`                                                            | Same as dashboard                                                                                                                       | `ADMIN`                                |

Page-to-route mapping for all 46 blueprinted pages is in [Phase 4](phase-4-page-blueprints.md#page-index).

---

## Layouts

- **Root** (`app/layout.tsx`) — global stylesheet, font variables, `Provider`, site metadata.
- **Public** (`app/(public)/layout.tsx`) — header and footer.
- **Auth** (`app/(auth)/layout.tsx`) — auth shell.
- **Portals** (`dashboard`, `agent`, `admin` `layout.tsx`) — client component wrapping `PortalShell` (navigation, topbar, role guard). Each portal has `loading.tsx` and `error.tsx`.

---

## Providers, Contexts and Stores

| Layer                                       | What it holds                                                                                                                               |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `components/providers/provider.tsx`         | Composes the TanStack `QueryClientProvider`, `SessionProvider`, `MotionProvider` and the toast viewport; Query devtools in development only |
| `components/providers/session-provider.tsx` | Session context: signed-in user and role                                                                                                    |
| `components/providers/motion-provider.tsx`  | Motion configuration, including reduced-motion                                                                                              |
| `lib/stores/auth-store.ts`                  | Zustand — auth session that spans the tree and outlives a route                                                                             |
| `lib/stores/toast-store.ts`                 | Zustand — global toast queue fed by the mutation cache ([ADR 0013](../../docs/adr/0013-mutation-feedback-is-global-by-default.md))          |

No other context or store exists. A new store requires a stated reason.

---

## Feature Folders and Component Organization

| Folder                          | Holds                                               | Rule                                                                   |
| ------------------------------- | --------------------------------------------------- | ---------------------------------------------------------------------- |
| `components/ui/`                | Domain-free primitives (Phase 6 C1–C30)             | Reusable in any app                                                    |
| `components/patterns/`          | Generic compositions over primitives                | No domain vocabulary                                                   |
| `components/features/<portal>/` | Reusable domain leaves (Phase 6 C31–C88)            | Named after the portal that **consumes** it; `shared/` for two or more |
| `components/sections/<route>/`  | Route-level composition (Phase 5 sections as built) | One route per section; serving two moves it to `features/`             |
| `components/layout/`            | App chrome (Sections 47–49, 56)                     | —                                                                      |
| `components/brand/`             | Wordmark and marks                                  | —                                                                      |

---

## Portal Data Flow

Each portal route follows one shape:

- **`*-console`** is the only section that calls hooks. It derives shapes with `useMemo` plus `lib/utils/to-*` mappers, renders `ConsoleUnavailable` with a `CONSOLE_FALLBACKS` entry on error, and passes data down as props.
- **`*-main` / `*-rail` / `*-stat-band`** never fetch. They receive rows as props and may import `lib/data/` selectors and types to shape what they were given.

This keeps every route to a single fetch boundary and makes the presentational sections trivially testable.

---

## API Layer

Three layers, each with one job:

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

// lib/api/properties.ts — resource calls, no hooks
import { query } from "@/lib/api/client";
import { config } from "@/lib/constants";

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

---

## Hooks

`lib/hooks/use-<resource>.ts`, one resource or one screen concern per file, keyed through `query-keys.ts`.

| Kind                  | Examples                                                                                                                                                           |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Resource queries      | `use-properties`, `use-offers`, `use-messages`, `use-viewings`, `use-transactions`, `use-users`, `use-stats`                                                       |
| Mutations / workflows | `use-checkout`, `use-escrow-settle`, `use-moderation-actions`, `use-deal-pipeline`, `use-deal-milestones`, `use-lead-outreach`                                     |
| Screen consoles       | `use-viewings-console`, `use-verification-queue`, `use-dispute-queue`, `use-flag-queue`                                                                            |
| Cross-cutting         | `use-confirmation` (C85 cycle), `use-unsaved-changes-warning` (C86), `use-url-state`, `use-debounced-search`, `use-dialog-focus`, `use-media-query`, `use-session` |

Queries retry once; mutations never retry ([ADR 0021](../../docs/adr/0021-writes-are-sent-once-and-confirmations-lock.md)).

---

## Utilities and Constants

- `lib/utils/to-<entity>.ts` — one API shape → one UI type, pure.
- `lib/data/<route>.ts` — per-screen aggregation, ranking, filtering and banding over mapped rows, plus that screen's option sets and copy constants. Pure.
- `lib/constants.ts` — endpoints (`config.api.*`), `STALE_TIME`, `CACHE_TIME`, limits, public routes.
- `lib/config/<feature>.ts` — feature-scoped config: navigation registries, copy, feedback messages, tones, motion values JavaScript needs (`lib/config/motion.ts`).
- `lib/enums/enums.ts` — mirrors the backend's Prisma enums by hand; `pnpm enums:check` enforces parity.

---

## State Management

| State                | Tool                                           |
| -------------------- | ---------------------------------------------- |
| Server state         | TanStack Query                                 |
| Local component      | `useState` / `useReducer`                      |
| Shareable UI state   | URL search params                              |
| Persistence          | `useSyncExternalStore` + `localStorage`        |
| Cross-tree singleton | Zustand — `lib/stores/` (auth session, toasts) |

Zustand is reserved for state that genuinely spans the tree and outlives a route. A new store requires a stated reason.

---

## Type Safety

- TypeScript strict mode. No `any` — use `unknown` with narrowing, or a precise type.
- Types derive from the source of truth: `z.infer` on Zod schemas in `lib/validations/`.
- Shared domain types live in `lib/types/<domain>.ts` and are re-exported by `lib/types/index.ts`. Components import types; they never declare shared ones.
- API responses are validated at the boundary, never loosely typed.

---

## Shared Libraries

**Library Selection Policy.** Reuse what the repo already depends on; otherwise recommend the most widely used option for the need and say why; never install without the owner's approval, and never hand-edit `package.json` (`pnpm add` after approval).

Installed today (see `package.json` for versions): `next`, `react`, `@tanstack/react-query`, `zustand`, `axios`, `zod`, `motion`, `lucide-react`, `recharts`, `date-fns`, `nanoid`, `maplibre-gl`, `@stripe/stripe-js` + `@stripe/react-stripe-js`, `jose`, `@sentry/nextjs`, `@base-ui/react`, `class-variance-authority`, `clsx`, `tailwind-merge`. Dev: `vitest`, Testing Library, `vitest-axe`, `jsdom`, ESLint, Prettier, `husky`, `lint-staged`, `jiti`.

**Not installed, and not to be assumed:** a form library, a theme library, an end-to-end runner, Storybook, `framer-motion` (the library is `motion`).

---

## Asset Organization

- `public/fonts/font.ts` — font loading through `next/font`.
- `public/brand/` — logo files.
- Listing and profile photos are remote, uploaded to Cloudinary and served through `next/image` from allow-listed hosts in `next.config.ts`.
- Map tiles are remote (OpenFreeMap); MapLibre workers are served by the route handler above.
- Documents attached to deals and messages are uploads, never bundled.

---

## Styling

Styling organisation follows the host repo's conventions and is **not specified by this design OS**.

- The binding rules are `.claude/CLAUDE.md` › Required patterns › Styling.
- `styles/tokens.css` is the design source of truth for colour, type, spacing, radii and motion — a code convention recorded in [ADR 0012](../../docs/adr/0012-tokens-are-the-design-source-of-truth.md), not a design requirement of this OS.
- What any page looks like is decided at build time with the owner ([IMPLEMENTATION_PROMPT › Visual Design Hand-off](../IMPLEMENTATION/IMPLEMENTATION_PROMPT.md#visual-design-hand-off)).

Version 1's Phase 7 (Design Tokens) catalogued the palette, type scale, spacing, motion, shadows, radii, z-index and component tokens. That catalogue has no successor here. Its non-visual rules moved:

| Rule from old Phase 7                                                                     | Now in                                                    |
| ----------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| `tokens.css` is canonical; the doc is stale when they disagree                            | This section (ADR 0012, as a code convention)             |
| No TypeScript token export; motion values JavaScript needs live in `lib/config/motion.ts` | [Utilities and Constants](#utilities-and-constants)       |
| Reduced motion is honoured globally                                                       | Phase 6 › Contract Defaults; Phase 9 › Accessibility      |
| Text contrast 4.5:1 / 3:1; dividers checked against their actual surface                  | Phase 9 › Accessibility (WCAG 1.4.3, 1.4.11)              |
| "Always use tokens" / "no hardcoded colours" / "never a raw z-index"                      | Governed by `.claude/CLAUDE.md` and ESLint — not restated |

---

## Naming Conventions and File Rules

- One component per file. Kebab-case filename matching the export.
- Absolute imports via `@/`. Never deep-relative.
- Any file over ~150 lines gets split — `page.tsx` included. Derivation moves to `lib/data/`, JSX to `components/`. (`lib/enums/enums.ts` is exempt, per `.claude/CLAUDE.md`.)
- Section files are named `<route>-<role>`: `*-console`, `*-header`, `*-main`, `*-rail`, `*-stat-band`, `*-toolbar`.
- Hooks `use-<resource>.ts`; mappers `to-<entity>.ts`; tests `<unit>.test.ts(x)` beside the unit.
- IDs are `nanoid`, never `uuid` or `Date.now()`.

---

## Code Splitting and Lazy Loading

- Route-level splitting is automatic per App Router segment; each portal is its own chunk tree.
- Public routes ship as server components, so most marketing content costs no client JavaScript.
- Heavy client-only libraries load lazily: the map (`components/ui/map-view.tsx`) loads MapLibre through `next/dynamic` with SSR off, only on routes that show a map.
- Tabs and panels that fetch on open (e.g. the neighbourhood places) do not fetch until opened.
- Images below the fold lazy-load; the primary photo on listing detail is prioritised.

---

## Performance Strategy

- **Budgets:** Lighthouse >90, LCP <2.5s, CLS <0.1, JS <250kb gzipped (Phase 9). Bundle and responsive budgets run as tests (`styles/bundle-budget.test.ts`, `styles/responsive-budget.test.ts`).
- **Server first:** public pages render on the server with structured data and metadata.
- **Caching:** TanStack Query `STALE_TIME` / `CACHE_TIME`; the backend caches expensive third-party lookups (nearby places, 24 h).
- **One fetch boundary per portal route** keeps waterfalls visible and testable.
- **Monitoring:** Sentry (`@sentry/nextjs`).

---

## Regeneration Notes

- **Retained:** authority statement, backend boundary, folder structure, portal data flow, API layer example, state management, type safety, file rules.
- **Added:** route structure, layouts, providers/contexts/stores, feature folders and component organization, hooks, utilities and constants, shared libraries (with the Library Selection Policy), asset organization, styling pointer, naming conventions, code splitting and lazy loading, performance strategy; folder-tree entries for routes, `lib/contract/`, `tools/`, portal `loading.tsx`/`error.tsx`, and the MapLibre route handler.
- **Changed:** file renamed `phase-8-frontend-architecture.md` → `phase-7-frontend-architecture.md`; "Phases 1-7 (design vision, pages, components, tokens)" → "Phases 1-6"; the `styles/` tree comments ("Design tokens as CSS custom properties (Phase 7)", "@theme mapping + named scale classes") and the paragraph "No `tailwind.config.ts` … @theme block maps …" dropped — styling organisation is governed by the code; "no App Router API routes" corrected for the MapLibre handler.
- **Merged from old Phase 7 (Design Tokens):** see the table under [Styling](#styling). The palette (ivory, pine, brass hex values), font families (Fraunces, Libre Franklin, JetBrains Mono), type scale and the editorial/application register rule, spacing/gap/padding/margin scales, durations and easings, shadows, radii, z-index scale, component tokens (stat card, icon sizes, scrollbar), "Application register uses 16px icons and ~36px rows", and the Tailwind v4 wiring sample were dropped as visual prescription; they live in `styles/` and are governed by the code.

---

**Phase 7 Complete.** Next: [Phase 8 — Implementation Roadmap](phase-8-implementation-roadmap.md).

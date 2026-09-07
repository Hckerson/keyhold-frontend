# Phase 8: Frontend Architecture

**Real Estate Platform Design Operating System**

---

## Authority

`.claude/CLAUDE.md` at the repo root is the binding specification for folder placement, data flow, naming, and file rules. This phase describes the shape of the codebase and the reasoning behind it. Where the two disagree, `.claude/CLAUDE.md` wins.

---

## Overview

Frontend architecture transforms Phases 1-7 (design vision, pages, components, tokens) into a production-ready Next.js codebase. This phase specifies:

- Folder structure
- Route organization (App Router)
- Layouts and providers
- Hook system
- API client organization
- State management strategy
- Type safety enforcement
- Environment configuration

**Goal:** Engineering can build from this spec without ambiguity.

---

## Backend Boundary

The frontend has **no App Router API routes**. All data comes from the NestJS backend in `../backend`, reached through `lib/api/client.ts`. Endpoints are named once in `lib/constants.ts` under `config.api.*` and never inlined.

`proxy.ts` at the repo root handles request forwarding to the backend in development.

---

## Folder Structure

```
frontend/
├── app/                          # Next.js App Router — pages compose, nothing else
│   ├── (auth)/                   # Auth route group
│   │   ├── login/
│   │   ├── signup/
│   │   ├── reset-password/
│   │   └── layout.tsx            # Auth layout
│   │
│   ├── (public)/                 # Public marketing + discovery
│   │   ├── page.tsx              # Home /
│   │   ├── search/               # /search
│   │   ├── listing/[id]/         # /listing/:id
│   │   └── layout.tsx            # App layout (header, footer)
│   │
│   ├── dashboard/                # Buyer portal
│   │   ├── layout.tsx            # Portal shell (sidebar + topbar)
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
│   ├── agent/                    # Agent portal
│   │   ├── layout.tsx
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
│   │   ├── page.tsx              # /admin
│   │   ├── listings/             # moderation
│   │   ├── users/
│   │   │   └── [id]/
│   │   ├── transactions/
│   │   ├── payments/
│   │   ├── reports/
│   │   ├── verifications/
│   │   └── settings/
│   │
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
│   │   └── …                     # button, input, badge, skeleton, …
│   │
│   ├── patterns/                 # Generic compositions over primitives
│   │   └── …                     # data-table*, filter-pills, stat-grid,
│   │                             #   section-shell, console-unavailable, …
│   │
│   ├── features/                 # Reusable domain leaves — rows, tables, marks, modals
│   │   ├── admin/  agent/  auth/  dashboard/
│   │   ├── listings/  messaging/  offers/  settings/
│   │   └── shared/               # used by two or more portals
│   │
│   ├── sections/                 # Route-level composition, one set per route
│   │   ├── home/  search/  listing/
│   │   ├── dashboard/  agent/  admin/
│   │   └── …                     # *-console, *-header, *-main, *-rail, *-stat-band
│   │
│   ├── layout/                   # App chrome
│   │   └── …                     # header, footer, sidebar*, topbar*,
│   │                             #   app-layout, portal-shell, command-palette
│   │
│   ├── brand/                    # Wordmark, logo mark, logo chip
│   └── providers/                # provider, session-provider, motion-provider
│
├── lib/                          # Core logic layer — no JSX
│   ├── api/                      # Transport + resource calls (no hooks)
│   │   ├── client.ts             # The only place fetch/axios is configured
│   │   ├── server.ts             # Server-side calls
│   │   ├── query-client.ts       # TanStack Query client
│   │   └── <resource>.ts         # properties, offers, messages, users, …
│   │
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
│   ├── enums/                    # enums.ts — literals and label maps
│   ├── config/                   # Feature-scoped config (nav, tones, motion, copy)
│   ├── stores/                   # Zustand stores — auth-store, toast-store
│   └── constants.ts              # config.api.* endpoints, durations, limits
│
├── styles/
│   ├── tokens.css                # Design tokens as CSS custom properties (Phase 7)
│   └── globals.css               # @theme mapping + named scale classes
│
├── public/
│   ├── fonts/
│   └── brand/
│
├── design-os/                    # This design system. Not application code.
├── docs/                         # Prose docs, ADRs. Not application code.
│
├── proxy.ts                      # Dev request forwarding to the NestJS backend
├── next.config.ts                # Next.js config (no @/ aliases — they resolve wrong here)
├── tsconfig.json                 # TypeScript strict mode
├── vitest.config.mts             # Vitest config
├── eslint.config.mjs
├── postcss.config.mjs            # Tailwind v4 via @tailwindcss/postcss
├── .env.example
└── package.json
```

**No `tailwind.config.ts`.** Tailwind v4 is configured entirely in `styles/globals.css` through the `@theme` block, which maps the `--colors-*` / `--fonts-*` / `--font-sizes-*` custom properties from `tokens.css` onto Tailwind's theme names.

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

## File Rules

- One component per file. Kebab-case filename matching the export.
- Absolute imports via `@/`. Never deep-relative.
- Any file over ~150 lines gets split — `page.tsx` included. Derivation moves to `lib/data/`, JSX to `components/`.

---

**Phase 8 Complete.** See `IMPLEMENTATION/IMPLEMENTATION_PROMPT.md` for the sprint-level guide.

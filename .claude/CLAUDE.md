# Project Instructions

This is a **luxury real-estate marketplace** on the Next.js App Router. It serves a public marketing site plus three authenticated portals — buyer (`/dashboard`), agent (`/agent`) and admin (`/admin`) — against the NestJS backend in `../backend`.

## Non-negotiable rules

1. **No comments in code.** Ever. Code must read clearly on its own — if it doesn't, the abstraction is wrong.
2. **No hardcoding.** API routes, durations, enums, copy that appears twice — all live in `lib/constants.ts` or `lib/config/`. Use `config.api.*` for endpoints and Zod schemas for shapes. Seed and sample data belongs in `lib/data/`, never inline in a page.
3. **No `any` in TypeScript.** Use `unknown` + narrowing or precise types. Derive types from Zod with `z.infer`.
4. **Match the existing architecture.** Do not invent new patterns. Preserve abstractions. Before deviating, explain why.
5. **Use the framework natively.** Reach for Next.js features and libs already in use (Query / Zustand / Zod / motion / CSS `clamp()`) before adding dependencies. Build what the tool already does.
6. **Single source of truth.** Name recurring decisions once as a semantic token and reference it everywhere. Define once, change in one place.
7. **Minimize LOC.** Prefer the shorter solution when equally maintainable.
8. **Run `pnpm lint` before committing.** ESLint must pass with zero warnings. Fix all violations, never suppress.
9. **Run `pnpm type-check` before committing.** TypeScript must be strict with zero errors. No type assertions (`as`), no `// @ts-ignore`.
10. **Run `pnpm format` before committing.** Prettier formats all code consistently. Never override formatting manually.
11. **No `console.log`, `console.error`, or debug statements** in committed code. Use proper logging only in services.

## Required patterns

| Need               | Use                                                                                                                                                                                                 |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Styling            | Token-first: named scale classes in `styles/globals.css` (`.base-text`, `.pad`, `.gap`, `.smooth`, `.micro-label`). Never inline responsive utility chains. Add colors/animations as theme tokens.  |
| Component patterns | Reuse `components/ui/` (primitives) and `components/patterns/` (generic compositions) before writing JSX from scratch. A pattern used twice must be promoted out of the page that birthed it.       |
| Domain types       | Every shared domain type lives in `lib/types/<domain>.ts` and is re-exported by `lib/types/index.ts`. Components import types — they never define shared ones.                                      |
| Page composition   | A route `page.tsx` composes sections and holds page-level state. Mock/seed data goes in `lib/data/`; JSX blocks go in `components/`. Never inline a data array or a sub-component in a page.        |
| State management   | TanStack Query for server state. `useState` / `useReducer` / URL params for local state. `useSyncExternalStore` + `localStorage` for persistence. Avoid global stores unless complexity demands it. |
| Validation         | Zod schemas. Derive types with `z.infer`. Never use loose types for API responses.                                                                                                                  |
| IDs                | `nanoid`. Never `uuid` or `Date.now()`.                                                                                                                                                             |
| Async flows        | Keep API functions in `lib/api/<resource>.ts`, wrap in hooks in `lib/hooks/use-<resource>.ts`. Components consume hooks — never call API functions directly.                                        |

## Folder Structure

| Route                   | Immediate Subfolders                                                                         | Purpose                                                                                              |
| ----------------------- | -------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `/app`                  | `(auth)` • `(public)` • `admin` • `agent` • `dashboard`                                      | App Router routes. Pages compose — they do not define data or components.                            |
| `/components/ui`        | `charts` • `forms` • _(flat primitives)_                                                     | Generic, domain-free primitives. Reusable in any app.                                                |
| `/components/patterns`  | _(flat)_                                                                                     | Generic compositions over primitives: data-table, filter-pills, bulk-toolbar, stat-grid, section-\*. |
| `/components/features`  | `admin` • `agent` • `auth` • `dashboard` • `listings` • `messaging` • `settings` • `shared`  | Domain components, grouped by the portal that consumes them. `shared/` = used by two or more.        |
| `/components/sections`  | `home` • `listing` • `search`                                                                | Page sections for the public marketing routes.                                                       |
| `/components/layout`    | _(flat)_                                                                                     | App chrome: header, footer, sidebar, topbar, wordmark, newsletter form.                              |
| `/components/providers` | _(flat)_                                                                                     | React context providers.                                                                             |
| `/lib`                  | `api` • `config` • `data` • `enums` • `hooks` • `stores` • `types` • `utils` • `validations` | Core logic layer. No JSX.                                                                            |
| `/public`               | `fonts`                                                                                      | Static assets.                                                                                       |
| `/styles`               | _(flat)_                                                                                     | Global styles and token exports.                                                                     |

### Where a component goes

Ask in order — the first "yes" wins:

1. Does it know nothing about real estate? → `components/ui/` (or `ui/charts`, `ui/forms`)
2. Is it a generic composition of primitives, reusable across domains? → `components/patterns/`
3. Is it app chrome that wraps every route? → `components/layout/`
4. Is it a section of a public marketing page? → `components/sections/<route>/`
5. Otherwise it is domain UI → `components/features/<portal>/`, or `features/shared/` if two or more portals use it.

Name the folder after the portal that _consumes_ it, never after the folder it came from.

## File rules

- **One component per file.** Kebab-case filenames matching the export (`stat-grid.tsx` → `StatGrid`).
- **Absolute imports via `@/`.** Never deep-relative (`../../../lib/...`).
- **Files over ~150 lines → split.** Extract data to `lib/data/`, JSX to `components/`.
- **Add packages with `pnpm add`.** Never hand-edit `package.json`.

## Pre-merge checklist

1. `pnpm type-check` clean (`tsc --noEmit`).
2. `pnpm lint` clean.
3. No `any`, no `console.log`, no dead code, no comments.
4. No hardcoded values (URLs, copy, magic numbers, query keys). All constants in `lib/constants.ts` or feature scope.
5. Reused existing primitives, utilities, and patterns. Nothing reinvented — check `components/patterns/` and `lib/utils/` before writing a helper.
6. Architecture and file structure match this layout exactly.
7. No shared type declared twice. Domain types come from `lib/types`.
8. No `page.tsx` over ~150 lines, and none containing an inline data array or sub-component.

**This is the only architecture.** Follow it precisely. If you're unsure where something goes, the design is broken—re-read this instead of inventing new locations.

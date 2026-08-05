# Project Instructions

This is a **luxury real-estate marketplace** on the Next.js App Router. It serves a public marketing site plus three authenticated portals — buyer (`/dashboard`), agent (`/agent`) and admin (`/admin`) — against the NestJS backend in `../backend`.

## Non-negotiable rules

1. **No comments in code.** Ever. Code reads clearly on its own — when it doesn't, the abstraction is wrong. Fix the abstraction.
2. **No hardcoding.** API routes, durations, enums, and copy that appears twice live in `lib/constants.ts` or feature-scoped `lib/config/<feature>.ts`. Endpoints come from `config.api.*`, shapes from Zod schemas. Seed and sample data lives in `lib/data/`, never inline in a page.
3. **No `any` in TypeScript.** Use `unknown` + narrowing or a precise type. Derive types from Zod with `z.infer`.
4. **Match the existing architecture.** Do not invent patterns, and do not invent locations — when you are unsure where something goes, re-read this file. State the reason before deviating.
5. **Use the framework natively.** Next.js and the installed libraries (Query / Zustand / Zod / motion / CSS `clamp()`) cover the need. Do not add a dependency that duplicates one, and do not rebuild what the tool already does.
6. **Single source of truth.** Name a recurring decision once as a semantic token and reference it everywhere. Define once, change in one place.
7. **Minimize LOC.** Ship the shortest solution that stays maintainable.
8. **No `console.log`, `console.error`, or debug statements** in committed code. Logging belongs in services.

## Required patterns

| Need               | Use                                                                                                                                                                                                                                                                                     |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Styling            | Token-first: named scale classes in `styles/globals.css` (`.pad`, `.pad-x`, `.pad-y`, `.gap`, `.gap-x`, `.gap-y`, `.smooth`, `.micro-label`, `.rail-label`) over tokens in `styles/tokens.css`. Inline responsive utility chains are forbidden. Colors and animations are theme tokens. |
| Component patterns | Reuse `components/ui/` (primitives) and `components/patterns/` (generic compositions) before writing JSX. A pattern used twice is promoted out of the page that birthed it.                                                                                                             |
| Domain types       | Every shared domain type lives in `lib/types/<domain>.ts` and is re-exported by `lib/types/index.ts`. Components import types; they never declare shared ones.                                                                                                                          |
| Page composition   | A route `page.tsx` composes sections and holds page-level state — nothing else. Mock/seed data goes to `lib/data/`, JSX blocks to `components/`. No inline data array, no inline sub-component.                                                                                         |
| State management   | TanStack Query for server state. `useState` / `useReducer` / URL params for local state. `useSyncExternalStore` + `localStorage` for persistence. A global store requires a stated reason.                                                                                              |
| Validation         | Zod schemas in `lib/validations/`. Types derive with `z.infer`. API responses are never loosely typed.                                                                                                                                                                                  |
| IDs                | `nanoid`. Never `uuid` or `Date.now()`.                                                                                                                                                                                                                                                 |
| Async flows        | Endpoints in `lib/constants.ts` (`config.api.*`), transport in `lib/api/client.ts`, resource calls in `lib/api/<resource>.ts`, wrapped in hooks in `lib/hooks/use-<resource>.ts`. Components consume hooks — never call the client directly.                                            |

## Folder Structure

| Route                   | Immediate Subfolders                                                                                   | Purpose                                                                                                                                            |
| ----------------------- | ------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/app`                  | `(auth)` • `(public)` • `admin` • `agent` • `dashboard`                                                | App Router routes. Pages compose — they do not define data or components.                                                                          |
| `/components/ui`        | `charts` • `forms` • _(flat primitives)_                                                               | Generic, domain-free primitives. Reusable in any app.                                                                                              |
| `/components/patterns`  | _(flat)_                                                                                               | Generic compositions over primitives: data-table, filter-pills, stat-grid, section-\*.                                                             |
| `/components/features`  | `admin` • `agent` • `auth` • `dashboard` • `listings` • `messaging` • `offers` • `settings` • `shared` | Domain components. Name the folder after the portal that _consumes_ the component, never the folder it came from. `shared/` = used by two or more. |
| `/components/sections`  | `home` • `listing` • `search`                                                                          | Page sections for the public marketing routes.                                                                                                     |
| `/components/layout`    | _(flat)_                                                                                               | App chrome: header, footer, sidebar, topbar, newsletter form.                                                                                      |
| `/components/brand`     | _(flat)_                                                                                               | Wordmark, logo mark, logo chip.                                                                                                                    |
| `/components/providers` | _(flat)_                                                                                               | React context providers.                                                                                                                           |
| `/lib`                  | `api` • `config` • `data` • `enums` • `hooks` • `stores` • `types` • `utils` • `validations`           | Core logic layer. No JSX. Transport lives in `api/client.ts`; config in `constants.ts`.                                                            |
| `/design-os`            | _(flat)_                                                                                               | Design-system seed prompt. Not application code.                                                                                                   |
| `/public`               | `fonts`                                                                                                | Static assets.                                                                                                                                     |
| `/styles`               | _(flat)_                                                                                               | Global styles and token exports.                                                                                                                   |

## File rules

- **One component per file.** Kebab-case filename matching the export (`stat-grid.tsx` → `StatGrid`).
- **Absolute imports via `@/`.** Never deep-relative (`../../../lib/...`).
- **Any file over ~150 lines gets split**, `page.tsx` included. Data moves to `lib/data/`, JSX to `components/`.
- **Add packages with `pnpm add`.** Never hand-edit `package.json`.

## Before you commit or push

These commands run at the commit or push boundary only — not after every edit.

1. `pnpm format` — Prettier owns formatting. Never override it by hand.
2. `pnpm lint` — zero warnings. Fix every violation; never suppress one.
3. `pnpm type-check` — strict, zero errors. No `as` assertions, no `// @ts-ignore`.

The rules above are not restated here. They bind every edit, not the gate.

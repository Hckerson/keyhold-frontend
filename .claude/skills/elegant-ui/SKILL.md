---
name: elegant-ui
description: >-
    Craft or upgrade React/Next UI in this project's "luxury real estate" design
    language — decomposed structure, data-driven rendering, the house design
    tokens (text-text, bg-background, font-display, text-h*, ease-smooth), thin
    lucide icons, restrained color, smooth micro-motion, and a11y by default. Use
    when building ANY new frontend component / screen / section, when asked to make
    UI look elegant / modern / polished / premium / refined, or when asked to
    "upgrade" an existing component (which additionally emits a shadcn-style
    integration prompt). Frontend only — never touches the NestJS backend.
---

# Elegant UI

Reproduce the elegance, structure, layout, composition, and color sense of first-class UI — always rendered in **this project's own design tokens**, never generic shadcn defaults.

## Two modes

| Mode        | Trigger                                                                                              | Output                                                                                                             |
| ----------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| **Create**  | Component/screen does **not** exist yet ("build a…", "add a…", "make a…")                            | An elegant component written directly into `components/` in the house language.                                    |
| **Upgrade** | An existing component named + the word **"upgrade"** (or "elevate", "make it premium", "package it") | The re-elevated component **wrapped in the integration-prompt scaffold** — see `references/integration-prompt.md`. |

If the mode is ambiguous, default to **Create** and say so.

## Prime directive: translate, don't transplant

Learn _structure, layout, composition, and interaction_ from any exemplar (a dribbble shot, a 21st.dev prompt, a pasted component). But **every color, font, radius, shadow, spacing, and easing value must be a house token** from the table below. A dark hardcoded `bg-black text-neutral-50` reference becomes `bg-sidebar text-sidebar-text-active`. `bg-card` becomes `bg-background-muted`. Never emit a raw hex, a stock Tailwind palette color (`neutral-800`, `slate-500`), or a shadcn default token (`bg-card`, `text-muted-foreground`, `text-foreground`, `bg-primary`) — those tokens do not exist here.

## House tokens — the only vocabulary

Tailwind v4, tokens defined in `styles/tokens.css` + `@theme` in `styles/globals.css`. Dark mode = `.dark` class variant.

**Color** (prefix `bg-` / `text-` / `border-`):
`background` · `background-alt` · `background-muted` — surfaces
`text` · `text-secondary` · `text-muted` · `text-inverse` — foreground ramp
`accent` · `accent-dark` · `accent-light` — indigo, CTAs / interactive / emphasis (use sparingly)
`highlight` · `highlight-dark` · `highlight-light` — coral, featured / "pop" moments only
`border` · `border-light` · `border-dark` — 1px dividers
`success` · `error` · `warning` · `info` (+ each `-light`) — status only
`sidebar` · `sidebar-border` · `sidebar-hover` · `sidebar-active` · `sidebar-text` · `sidebar-text-active` — the dark nav ramp
`overlay` — modal scrims

**Type:** families `font-display` (Fraunces serif) · `font-body` (Libre Franklin) · `font-mono` (JetBrains Mono). Scale `text-h1…text-h6`, `text-lg/base/sm/xs`, `text-label`, `text-caption`. Weights `font-light` (300) … `font-bold` (700).

**Radius** `rounded-xs sm md lg xl full` (xl = 12px, the ceiling). **Shadow** `shadow-sm md lg xl 2xl`. **Motion** easing `ease-smooth` (default), `ease-out`; duration `duration-200` (hover) / `duration-300` (layout). **Z-index** via tokens (`z-modal`, `z-popover`, …).

## Structure rules

1. **Decompose aggressively.** One job per component. A screen is a shell composing many small named pieces (`WorkspaceSwitcher`, `NavItem`, `SectionTitle`), not one 300-line function. Group them with `/* ── section ── */` banners.
2. **Data-driven rendering.** Content lives in a typed array/map above the render; JSX maps over it. Declare the shape (`type NavItemData = { id: string; title: string; icon: React.ElementType; children?: NavItemData[] }`). Recurse when the UI nests (an item renderer that renders itself for `children`).
3. **Match the house primitive pattern**, not shadcn's `data-slot` style: `forwardRef` + explicit `HTMLAttributes<…>` props + `displayName`; `cva` for variants (mirror `components/ui/button.tsx` and `card.tsx`). Reuse existing primitives from `@/components/ui` (Button, Card, Input, Modal, Badge, …) before building new ones — check `components/ui/index.ts` first.
4. **Controlled + uncontrolled duality** where a parent may or may not own state: `const current = value ?? internal`.
5. **`cn` = clsx only (no tailwind-merge).** `className` will NOT override a base utility of the same CSS property — it just appends. Compose additively; put variability in `cva` variants, not in override-by-merge.
6. **Import `cn` from `@/lib/utils`**, icons from `lucide-react`, absolute `@/` paths only. 4-space indent.

## Layout & spacing

- Flex-column shells: `flex-1 overflow-y-auto` scroll region, `mt-auto` pinned footer, consistent `gap-*`.
- One radius language per component; `border`/`border-t`/`border-r` (1px `border-border`/`border-border-light`) as the only dividers.
- Animated collapse via `grid-rows-[1fr]↔[0fr]` + `overflow-hidden`, not max-height hacks.
- Precision only when the scale can't express it (`py-[7px]`, `w-[18px]`); otherwise the token spacing steps.

## Color & elevation

- Establish hierarchy with the **text ramp** (`text-text` → `text-secondary` → `text-muted`) and **subtle surface shifts** (`bg-background` → `bg-background-muted`), not with saturated fills.
- Interaction/active state = a quiet wash + border, e.g. `hover:bg-background-muted hover:border-border`, active `bg-accent-light text-accent`. Accent and highlight appear rarely — a CTA, a badge, one focal number.
- Elevation is restrained: `shadow-sm` at rest → `shadow-md`/`lg` on hover, paired with a `hover:-translate-y-px`/`-0.5` lift and `ease-smooth`.
- Dark surfaces (nav rails, command palettes) use the `sidebar-*` ramp.

## Typography

- **The luxury signal:** headings and hero numbers in `font-display` at `font-light` (300) — e.g. `text-h3 font-display font-light`. Big serif, thin weight.
- Body/labels in `font-body`; micro-labels `text-caption`/`text-xs` `uppercase tracking-wide text-text-secondary`; keyboard hints in `font-mono`.
- Always guard overflow: `truncate` + a `max-w-*`.

## Motion, icons, a11y (defaults, not extras)

- Everything interactive transitions (`transition-colors`/`transition-all duration-200 ease-smooth`). Entrances use `animate-in fade-in zoom-in-95`. Don't add reduced-motion guards — `styles/tokens.css` already does it globally.
- **lucide icons at `strokeWidth={1.5}`** (thin stroke is a core elegance tell), sized `size-4`/`w-[18px]`, colored via the text ramp.
- a11y: `aria-label` on icon-only buttons, `sr-only` labels, `select-none` on chrome, real `focus-visible:ring-2 focus-visible:ring-accent`, `type="button"` on non-submit buttons, keyboard handlers for overlays (Esc to close).

## Create workflow

1. Restate what's being built + where it lands (`components/ui/*` for primitives, `components/sections/*` / `components/patterns/*` / route `page.tsx` for composed UI).
2. Sketch the decomposition (shell + named parts) and the typed data shape.
3. Build it in house tokens per the rules above. Reuse `@/components/ui` primitives.
4. Self-check against **Anti-patterns**, then run `pnpm type-check` / lint if available.

## Upgrade workflow

1. Read the existing component; re-elevate it against every rule above (decompose, tokenize, add motion/a11y, tighten type & spacing).
2. Produce a `demo.tsx` exercising it with realistic data.
3. Emit the **integration-prompt scaffold** from `references/integration-prompt.md`, filling: component file + code, `demo.tsx`, any dependency primitive files, and the exact npm deps. Keep the guideline/steps boilerplate verbatim.

## Anti-patterns (reject on sight)

- Any raw hex, stock Tailwind color, or shadcn default token (`bg-card`, `text-muted-foreground`, `bg-primary`, `neutral-*`, `slate-*`).
- A monolithic component that should be decomposed; JSX with content hardcoded inline instead of mapped from typed data.
- Relying on `cn`/`className` to override a base utility (no tailwind-merge here).
- Thick default icon strokes; missing hover/focus states; saturated fills where a text-ramp/surface shift would do.
- `data-slot` shadcn-style primitives instead of the house `forwardRef` + `displayName` + `cva` pattern.
- Deep-relative imports (`../../../`) instead of `@/`.

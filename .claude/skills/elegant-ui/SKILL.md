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
3. **Match the house primitive pattern**, not shadcn's `data-slot` style: `forwardRef` + explicit `HTMLAttributes<…>` props + `displayName`; `cva` for variants (mirror `components/ui/button.tsx` and `card.tsx`). Reuse existing primitives from `@/components/ui` (Button, Card, Input, Modal, Badge, …) before building new ones — check `components/ui/index.ts` first. House gotchas: **`Button` has no `asChild`/Slot** — for a link, wrap `<Link>` around `<Button>`; **`Card` bakes in `p-6`** that `cn` can't strip — build a standalone shell when you need different padding (e.g. media cards, stat tiles).
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
- Interaction/active state = a quiet wash + border, e.g. `hover:bg-background-muted hover:border-border`, active `bg-accent-light text-accent`.
- **Restraint governs the FIELD, not the FOCAL POINT.** The quiet ramp covers ~90% of a view — but the ONE hero element earns a bold moment (brass glow, filled CTA, pine gradient). Timid-everywhere IS the flatness trap. See **Craft** below.
- Elevation is restrained but **not uniform**: peers `shadow-sm`, the focal element `shadow-md` + a tonal lift. Hover adds `-translate-y-0.5` + `ease-smooth`.
- Dark surfaces (nav rails, command palettes) use the `sidebar-*` ramp.

## Craft — depth, focal hierarchy, composition (the anti-generic layer)

Token-correct ≠ designed. A 5-sample audit found the SAME failures every time: **undersized focal · too roomy · flat opaque fills · uniform grids.** These are HARD RULES — the model reverts to generic without them.

1. **Hierarchy is a size RATIO, not decoration (the #1 gap).** Give each card/row **exactly one focal datum** (number/price/title); the label→value jump must be **≥3 type steps** (e.g. `text-[10px]` mono label vs a `text-h4` value). In the application register the focal caps at **`text-h4` (30px)**, peers sit at **`text-sm`/`text-xs`** — the hero reads as hero because everything around it is _tiny_, not because it's big. **At most one element per card exceeds `text-h6`**; price + 3 specs all at `text-base` = co-equal numbers fighting for focus. The focal number is **solid, max-contrast** (`text-text` / `text-highlight-dark`) — **never** gradient `bg-clip-text` on the primary datum (that's for an editorial hero _headline_ only).
2. **Rank by scale + position, never by a badge.** A "Featured/Recommended/Primary" pill may _annotate_ but is not the ranking mechanism — **the hero must still read as hero with every badge removed.** Differentiation must be **structural** (scale, `col-span`/`row-span`, an added data point), **never cosmetic** — a recolored clone with the same footprint is an automatic hierarchy fail (this is exactly why one refined audit sample didn't improve).
3. **Depth is mandatory — ban the flat opaque fill.** Every non-trivial component needs **≥1 translucent, blurred surface**: `bg-background/60 backdrop-blur-md` over a soft glow (a `shadow-*` + dot-grid is NOT depth). **Tonal nesting is required:** wrap secondary metrics in an inset plane — `rounded-md bg-background-muted/60 p-2` — so every card has **≥2 tonal planes**, stepping tone via **alpha** (`bg-highlight/8`, `bg-text/5`), never by swapping `bg-background-*` tokens. The featured element gets a real light source: an absolute `blur-3xl bg-highlight/30` radial blob behind the focal number (`pointer-events-none -z-10`) + **exactly one** edge treatment (`ring-1 ring-highlight/20` **or** `border-highlight/25`, not both) + `shadow-md`. Glow colors derive from tokens (`drop-shadow-[0_2px_10px_var(--color-highlight)]`), never raw `rgba()`/hex. Atmosphere for big surfaces: a masked dot-grid (`bg-[radial-gradient(var(--color-text)_1px,transparent_1px)] bg-[size:32px_32px] opacity-[0.04] [mask-image:radial-gradient(ellipse_at_center,#000,transparent)]`).
4. **Composition must be a DEVICE, not a grid.** "One hero among peers" ⇒ **mandate an asymmetric / bento layout** — `grid-cols-3` with the hero `col-span-2 row-span-2`, or a hero tile + a condensed sibling rail. **Forbid `grid-cols-N` + a hero flag.** Peers must not mirror the hero — vary their treatment (a stacked table-row: thumbnail + inline specs + right-aligned price). Comparison tables: the lifted featured column gets `-translate-y-2 + shadow-lg + ring-1` (never `scale-*` — it desyncs the colgroup); one surface owner per featured band (fill the `<col>` OR the cells, never both). Restrict `hover:-translate-y-0.5` to the **one** focal/clickable tile; quiet peers get `transition-colors` only — a lift always signals "this is focal."

**Signature details.** Icon in a **bordered-circle chip** (`grid place-items-center rounded-full border p-1.5`), not always a filled tile. **Mono eyebrows** `font-mono text-[10px]/[11px] uppercase tracking-wide text-text-muted` — and an eyebrow must carry a NEW dimension (count/status/timestamp), never restate the title. Encode state in the **data layer** via a token lookup (today→`text-highlight`, overdue→`text-warning`), not uniform `text-text-muted`. Chips derive tone from the row's accent and cap with a `+N` overflow. **Never `truncate` the only descriptive line** — `line-clamp-2` or cut it. Snap to the scale — off-token `size={17}`/`py-[13px]` is a craft fail.

**Self-check before done:** Name the ONE focal datum — is its label→value gap ≥3 type steps? Remove every badge — does the hero still read as hero (scale/position)? Is there ≥1 translucent/blurred surface and ≥2 tonal planes? Is the layout an asymmetric _device_ or a uniform grid? Any "no" → fix before finishing.

## Typography & density — two registers

The type scale is **marketing-grade** (`text-h1` 72px · `text-h2` 56px · `text-h3` 40px · `text-h4` 30px · `text-h5` 24px · `text-h6` 20px) with airy `1.75` body leading. It is NOT one size for every context — pick the register, or dense app UI reads oversized (the #1 "everything feels big" cause here).

- **Editorial register** — landing / marketing / hero / section headers / big empty states. The statement: `text-h1…text-h3 font-display font-light`, generous spacing, `text-lg` lede.
- **Application register — the DEFAULT for dashboards, cards, panels, tables, sidebars, forms, menus. Dense by default:**
    - **Padding:** dense rows/cards `p-3` (`gap-2`, max `gap-3`); table cells `px-3 py-2`. `p-4` is for the ONE featured/hero tile only — **never `p-5+`** on a card body here.
    - **Type:** section titles `text-h5`/`text-h4` (never `text-h3`); the ONE focal number `text-h4`→`text-lg`; body/rows `text-sm`; secondary/meta `text-xs`; micro-labels **`text-[10px]`/`text-[11px]` `font-mono uppercase tracking-wide`** (not `text-caption`).
    - **Icons:** glyphs (check/minus/inline detail) `size-3` (12px); chip icons in a `size-6` circle; only a hero/identity icon reaches `size-4`. `strokeWidth={1.5}`.
    - **Rhythm:** build vertical spacing with one `flex flex-col gap-4`, not stacked `mt-5/mt-6`; section padding `py-10`, not `py-16`. Ban `rounded-full place-items-center` icon circles on _every_ row (pure roominess) — use a compact inline stat cluster. Do NOT use `text-h1…h3` or `text-lg` body leading here.

- **The luxury signal is weight, not size:** `font-display font-light` on whatever heading the register calls for — a `text-h5` thin serif is still unmistakably premium. Body/labels `font-body`; keyboard hints `font-mono`.
- Guard overflow: `line-clamp-2` for descriptive lines, `truncate` only for single labels/tokens (**never** the sole descriptive line) — pair with a `max-w-*`.

## Motion, icons, a11y (defaults, not extras)

- Everything interactive transitions (`transition-colors`/`transition-all duration-200 ease-smooth`). Entrances use `animate-in fade-in zoom-in-95`. Don't add reduced-motion guards — `styles/tokens.css` already does it globally.
- **lucide icons at `strokeWidth={1.5}`** (thin stroke is a core elegance tell); application register: inline/glyph icons `size-3`–`size-4` (12–16px), chip icons in a `size-6` circle, `size-5+` only for editorial/hero; colored via the text ramp.
- a11y: `aria-label` on icon-only buttons, `sr-only` labels, `select-none` on chrome, real `focus-visible:ring-2 focus-visible:ring-accent`, `type="button"` on non-submit buttons, keyboard handlers for overlays (Esc to close).
- **Imagery:** distinct real photos, one per item — NEVER a single repeated local placeholder like `/images/hero.jpg`. **Centralize a curated pool** in `lib/config/sample-images.ts` and pull from it (don't scatter hardcoded URLs across pages). Good free sources: **Unsplash** (`images.unsplash.com/photo-…?w=800&q=80`, best architecture library), **Pexels** (`images.pexels.com/photos/…`), **loremflickr** (`loremflickr.com/800/600/mansion` — dynamic, keyword-based, no IDs). Ensure the host is allowlisted in `next.config.ts` `remotePatterns`.

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
- **A uniform grid/stack of identical cards or rows with no elevated focal element** — the #1 generic tell.
- **Flat opaque fills with no depth** — no atmosphere, translucency, or tonal nesting between surfaces.
- **Equal columns + identical spacing everywhere** instead of a deliberate composition (comparison table, asymmetric split, featured tile).
- **A recolored/badge-flagged "hero" that shares the peers' footprint** — differentiation must be structural (scale/span), not cosmetic.
- **Gradient `bg-clip-text` on a primary datum** (price/KPI), or a "Featured/Recommended" pill used as the _ranking mechanism_.
- **A totally flat card** — one opaque background fill with nothing layered on it: no nested inset a shade different (a `bg-background-muted/60` block) _and_ no translucent/blurred surface (`bg-background/60 backdrop-blur`). A drop-shadow or a decorative dot-grid does NOT count as depth.
- **`p-5+` on a dense card body, or `size-4` on every icon** — the one-notch-loose density smell.
- **Truncating the sole descriptive line**; off-token arbitrary values (`size={17}`, `py-[13px]`).
- `data-slot` shadcn-style primitives instead of the house `forwardRef` + `displayName` + `cva` pattern.
- Deep-relative imports (`../../../`) instead of `@/`.

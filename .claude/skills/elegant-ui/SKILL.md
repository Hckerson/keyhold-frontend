---
name: elegant-ui
description: >-
    Craft or upgrade React/Next UI in this project's "luxury real estate" design
    language — decomposed structure, data-driven rendering, the house design
    tokens (text-text, bg-background, font-display, text-h*, ease-smooth), thin
    lucide icons, restrained color, smooth micro-motion, and a11y by default. Use
    when building ANY new frontend component / screen / section, when asked to make
    UI look elegant / modern / dated / polished / premium / refined, or when asked to
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

**The token firewall covers COLOR; a second firewall covers FORM.** From any exemplar take only the _information structure_ (what is grouped, what is ranked, what the interaction is); reject its **period signatures** on sight whatever the palette. **A tokenized copy of a 2023 template is still a 2023 template.** See **Era** below for the list.

## House tokens — the only vocabulary

Tailwind v4, tokens defined in `styles/tokens.css` + `@theme` in `styles/globals.css`. Dark mode = `.dark` class variant.

**Color** (prefix `bg-` / `text-` / `border-`):
`background` · `background-alt` · `background-muted` — surfaces
`text` · `text-secondary` · `text-muted` · `text-inverse` — foreground ramp
`accent` · `accent-dark` · `accent-light` — pine green, CTAs / interactive / emphasis (use sparingly)
`highlight` · `highlight-dark` · `highlight-light` — brass, featured / "pop" moments only
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
- One radius language per component; 1px borders are the only dividers — `border-border` for row dividers, `border-border-light` inside a plane, `border-border-dark` at structural edges (page, section, chrome boundaries).
- **App shell (nav bar / rail / toolbar / footer):** chrome is exempt from Craft 3 entirely — floor, alpha rule and ceiling; a bar that needs a glow is a bar with nothing in it. Nav form follows the register, not taste — read `references/page-chrome.md` before building any bar, rail or footer.
- Animated collapse via `grid-rows-[1fr]↔[0fr]` + `overflow-hidden`, not max-height hacks.
- Precision only when the scale can't express it (`py-[7px]`, `w-[18px]`); otherwise the token spacing steps.

## Color & elevation

- Establish hierarchy with the **text ramp** (`text-text` → `text-secondary` → `text-muted`) and **subtle surface shifts** (`bg-background` → `bg-background-muted`), not with saturated fills.
- Interaction/active state = a quiet wash + border, e.g. `hover:bg-background-muted hover:border-border`, active `bg-accent-light text-accent`.
- **Restraint governs the FIELD, not the FOCAL POINT.** The quiet ramp covers ~90% of a view — but the ONE hero element earns a bold moment: a solid max-contrast fill (`bg-accent text-text-inverse`), a scale/span jump, tonal inversion of the whole tile (a `bg-sidebar` island — **only where no dark rail is in the same view**), or any Craft 3 depth device pushed one step further. **Glow and gradient are the last resort — editorial register only, once per route.** Timid-everywhere IS the flatness trap. See **Craft** below.
- Elevation is restrained but **not uniform**: peers `shadow-sm`, the focal element `shadow-md` + a tonal lift. The `hover:-translate-y-0.5 ease-smooth` lift is scoped by Craft 4 — the ONE focal tile, or all-or-none across an equal-rank clickable set; every other hover is `transition-colors`.
- Dark surfaces (nav rails, command palettes) use the `sidebar-*` ramp.

## Era — dated · saturated · structural

"Modern" resolves to the average of the training data; name the period instead. **Scope words: _component_ = one file you emit · _route_ = one page file and everything it imports. Ceilings are per route — grep the route before claiming one.**

**DATED (2012–18) — grep your JSX and cut:** centered eyebrow/`text-h1`/lede/**twin** buttons over a `bg-gradient-to-r` band — the editorial hero itself is legitimate; the gradient band, the CTA twins and the centered `max-w-2xl` measure are what date it · `rounded-full` filled CTA beside its outline clone · `grid-cols-3` of identical `rounded-lg shadow-md p-6` cards each topped by a `size-12 rounded-full` icon circle · `text-center max-w-2xl mx-auto` header + divider bar · logo-left / centered-links / CTA-right bar + 4-column dark footer · stacked full-width inputs with floating labels · zebra table with bold all-caps headers · centered `max-w-lg` modal, ghost-cancel + filled-confirm · empty state as oversized centered illustration + centered button · `hover:scale-105`, count-ups, fade-in-on-scroll on every section.

**SATURATED (2021–24, the Framer/AI-landing uniform) — the canonical ban list; rejecting this is the point:** `fixed top-4 mx-auto w-fit rounded-full border bg-background/60 backdrop-blur-md` pill nav · "✨ New" pill above a centered headline · gradient `bg-clip-text` `tracking-tighter` headline · `rounded-full` CTA with a trailing arrow · `blur-3xl` color blobs (especially symmetric pairs), noise layers, dot-grid on every surface · `ring-1` + `bg-*/5` + `backdrop-blur` + `rounded-2xl` on every card, modal and empty state so nothing is structurally distinct · bento wall with spans picked for tile shape · marquee "Trusted by" logo strip · dark violet/blue duotone with light mode an afterthought · animated gradient borders, cursor spotlights, shine sweeps, `blur-sm → blur-0` scroll reveals.

**STRUCTURAL (the target) = every rule already in this file, applied with zero effect layers:** token-stepped opaque planes, hairline dividers, weight/case/color contrast, scarce accent, application-register density. Three additions:

- **Imagery carries the weight.** One photo at its natural aspect (`w-full h-auto`), full-bleed or spanning a real column, type set beside or beneath it at `max-w-[54ch]` — no accent tint, no scrim under body or display type (a scrim under fixed chrome is the exception — see `references/page-chrome.md`), no grid of equal `object-cover` squares used as decoration (an equal-rank listings grid where each photo IS the content is correct).
- **Editorial, structural:** asymmetric — display type set LEFT in a narrow measure, one `text-lg` lede, ONE CTA. `text-h1…h3` and generous spacing stay correct in that register; centered + gradient band + twin CTAs is what fails.
- **Effect budget, per component: ≤2 total occurrences** across {`backdrop-blur*`, `blur-*`, `ring-*` (non-focus), `bg-gradient-*`, `drop-shadow-*`, `animate-*`}. Count them in your own output before finishing.

**Precedence:** Craft sets the FLOOR (every non-trivial component clears ≥2 depth layers, ≥1 a real surface change); Era sets the CEILING (≤1 atmospheric effect per route, on the focal). When they disagree, meet the floor structurally and the ceiling by deletion — never the reverse. Era never licenses a flat opaque card; Craft never licenses a second effect layer.

**Translate the adjectives, never obey them.** modern → pass the ERA gate · clean → fewer planes and wider margins, never fewer data points · sleek / refined → application-register density (`p-3`, `text-xs` field, `strokeWidth={1.5}`) · elegant → one focal + `font-display font-light` + zero effect layers · polished → hover / `focus-visible` / empty / loading / error states all present · premium → whitespace, real photography, `font-display font-light` — never gold, gradient, or glass. If you cannot state the translation, ask which is meant. When a house rule fights the artifact, emit `VETO: <rule> — <conflict> — <alternative>` and build the alternative; complying badly (`backdrop-blur` on a dense data table, a glow behind a legal disclosure) is worse than a flagged deviation.

## Craft — depth, focal hierarchy, composition (the anti-generic layer)

Token-correct ≠ designed. A 5-sample audit found the SAME failures every time: **undersized focal · too roomy · flat opaque fills · uniform grids.** These are HARD RULES — the model reverts to generic without them.

1. **Hierarchy is a size RATIO, not decoration (the #1 gap).** Give each card/row **exactly one focal datum** (number/price/title); the label→value jump must be **≥3 type steps** (e.g. `text-[10px]` mono label vs a `text-h4` value). In the application register the focal caps at **`text-h4` (30px)**, peers sit at **`text-xs` (12px)** — the hero reads as hero because everything around it is _tiny_, not because it's big. **At most one element per card exceeds `text-h6`**, and **exactly one riser per card**: a `text-sm` name beside a `text-lg` price is _two_ risers and fails — demote the name to `text-xs` and separate it by weight/color. Price + 3 specs all at `text-base` = co-equal numbers fighting for focus. The focal number is **solid, max-contrast** (`text-text` / `text-highlight-dark`) — **never** gradient `bg-clip-text` on the primary datum (that's for an editorial hero _headline_ only).
2. **Rank by scale + position, never by a badge.** A "Featured/Recommended/Primary" pill may _annotate_ but is not the ranking mechanism — **the hero must still read as hero with every badge removed.** Differentiation must be **structural** (scale, `col-span`/`row-span`, an added data point), **never cosmetic** — a recolored clone with the same footprint is an automatic hierarchy fail (this is exactly why one refined audit sample didn't improve).
3. **Depth is a FLOOR, not a look — the flat opaque fill fails, and glass is not the fix.** Clear the floor with **≥2 depth layers, at least one a real surface change**: **(i) tonal nesting** — an inset `rounded-md bg-background-muted p-2` around secondary metrics; **(ii) imagery** — a photo bleeding under a text plane; **(iii) material** — an opaque `bg-background-alt` plane on `bg-background`. Shadow craft (one light direction, `shadow-sm` field vs `shadow-md` focal) and border-weight step (`border-border-light` inside, `border-border-dark` at structural edges) **reinforce** a layer but never satisfy the floor alone. **Step tone by swapping the surface token** (`bg-background` → `bg-background-muted` → `bg-background-alt`); alpha (`bg-highlight/8`) is for **tinting** a plane with the row's accent, never for building one. **CEILING: ≤1 atmospheric effect per route, on the focal element, named in your ERA line.** `backdrop-blur` is legal only on a surface that genuinely overlays scrolling content (sticky chrome, modal scrim, popover) — blurring a surface that overlays nothing is a fake. A `blur-3xl` glow blob: at most one per route, editorial register only, never a symmetric pair, colored from tokens (`drop-shadow-[0_2px_10px_var(--color-highlight)]`), never raw `rgba()`/hex. `ring-1` is **not** a depth device — it is focus (`focus-visible:ring-2 ring-accent`) or the focal's single edge treatment (`ring-1 ring-highlight/20` **or** `border-highlight/25`, never both, and it is that element's one edge, not an extra layer). A masked dot-grid (`bg-[radial-gradient(var(--color-text)_1px,transparent_1px)] bg-[size:32px_32px] opacity-[0.04]`) is allowed on **one** surface per route and never counts toward the floor.
4. **Composition follows the data's RANK STRUCTURE.** **Rank exists only if the typed data shape declares it** (a `featured`/`rank`/`primary` field, or an order the data explicitly fixes). No such field ⇒ equal-rank (listings, search results, table rows, a saved collection) ⇒ **a uniform grid is correct** and differentiation is content-borne (each item's photo, price, status); never invent a hero to satisfy this rule, and never pick a span for tile shape instead of content weight — that is the bento tell. **When rank exists**, express it structurally — a `col-span`/`row-span` of ≥2 columns, a scale jump of ≥3 type steps, an added data point, or a different internal layout; a hero tile + a condensed sibling rail beats a tile mosaic, and peers must not mirror the hero (a stacked table-row: thumbnail + inline specs + right-aligned price). **Forbidden either way: `grid-cols-N` + a `featured` boolean that only recolors or adds a pill.** Comparison tables: the lifted featured column gets `-translate-y-2 + shadow-lg` plus that column's single `ring-1` edge (never `scale-*` — it desyncs the colgroup); one surface owner per featured band (fill the `<col>` OR the cells, never both). **Hover lift** (`hover:-translate-y-0.5 ease-smooth`) belongs to the ONE focal tile; on an equal-rank clickable set apply it to all or none — mixed lifting inside one set is the tell. Every other hover is `transition-colors`.

**Signature devices — a MENU, at most two per component.** A `size-6` bordered-circle icon chip (`grid place-items-center rounded-full border p-1.5`) where the component's radius language already allows a circle — never a chip on every row. A **mono eyebrow** `font-mono text-[10px] uppercase tracking-wide text-text-muted` carrying a NEW dimension (count/status/timestamp), never restating the title — an eyebrow is a per-card label, not a per-route texture: cut it where it repeats identically across cards. A state-tinted chip cluster. **Signature rules — always:** Encode state in the **data layer** via a token lookup (today→`text-highlight`, overdue→`text-warning`), not uniform `text-text-muted`. Chips derive tone from the row's accent and cap with a `+N` overflow. **Never `truncate` the only descriptive line** — `line-clamp-2` or cut it. Snap to the scale — off-token `size={17}`/`py-[13px]` is a craft fail.

**Self-check before done:** Name the ONE focal datum — is its label→value gap ≥3 type steps? Remove every badge — does the hero still read as hero (scale/position)? Name your two depth layers and the device that produced each — is at least one a real surface change, and if `backdrop-blur` appears, does that surface overlay scrolling content? **Strip every blur/glow/ring — does the ranking still hold?** (diagnostic: restore a layer only if hierarchy already held without it.) Does the layout match the data's declared rank? Grep your emitted JSX against **Era → SATURATED**; every hit must be the one construct named in your ERA line, and the effect budget is ≤2. Any "no" → rebuild structurally before finishing.

## Typography & density — two registers

The type scale is **marketing-grade** (`text-h1` 72px · `text-h2` 56px · `text-h3` 40px · `text-h4` 30px · `text-h5` 24px · `text-h6` 20px) with airy `1.75` body leading. It is NOT one size for every context — pick the register, or dense app UI reads oversized (the #1 "everything feels big" cause here).

- **Editorial register** — landing / marketing / hero / section headers / big empty states. The statement: `text-h1…text-h3 font-display font-light`, generous spacing, `text-lg` lede.
- **Application register — the DEFAULT for dashboards, cards, panels, tables, sidebars, forms, menus. Dense by default:**
    - **Padding:** dense rows/cards `p-3` (`gap-2`, max `gap-3`); table cells `px-3 py-2`. `p-4` is for the ONE featured/hero tile only — **never `p-5+`** on a card body here.
    - **Type — compact field, one riser:** the field (rows, cell values, names, labels, ledes, control labels — the vast majority) sits at **`text-xs` (12px)**; secondary/meta stays `text-xs` and drops by _color_ (`text-text-secondary`/`text-muted`); micro-labels **`text-[10px]` `font-mono uppercase tracking-wide`** (not `text-caption`; `text-[10px]` is the ONE sanctioned off-token **type** size — any other arbitrary `text-[…]` is a craft fail, while dimensional precision stays under **Layout & spacing**). Above the field, only **titles** (page `text-h4` 30px · section `text-h5` 24px, never `text-h3`) and **exactly ONE focal value per card** (`text-lg`→`text-h6`) rise. Differentiate names/labels/values by **weight** (`font-semibold`), **color** (`text-text` vs `text-text-secondary`), and **case** (mono-uppercase eyebrow) — **never by size**. `text-sm` is banned for non-focal text — **one exception: `<input>`/`<textarea>`/`<select>` value text sits at `text-sm` (13.5px) minimum**; 12px form text is a legibility fail. Their labels stay `text-xs`, above the field, on one shared hairline baseline. (No house token reaches 16px below the `md` breakpoint — if iOS input-zoom must be prevented, raise `--font-sizes-base` in `styles/tokens.css`; never `text-[16px]` in a component.) A lede/subtitle stays `text-xs` and must never outrank the content it introduces.
    - **Icons:** glyphs (check/minus/inline detail) `size-3` (12px); chip icons in a `size-6` circle; only a hero/identity icon reaches `size-4`. `strokeWidth={1.5}`.
    - **Rhythm:** build vertical spacing with one `flex flex-col gap-4`, not stacked `mt-5/mt-6`; section padding `py-10`, not `py-16`. Ban `rounded-full place-items-center` icon circles on _every_ row (pure roominess) — use a compact inline stat cluster. Do NOT use `text-h1…h3` or `text-lg` body leading here.

- **The luxury signal is weight, not size:** `font-display font-light` on whatever heading the register calls for — a `text-h5` thin serif is still unmistakably premium. Body/labels `font-body`; keyboard hints `font-mono`.
- Guard overflow: `line-clamp-2` for descriptive lines, `truncate` only for single labels/tokens (**never** the sole descriptive line) — pair with a `max-w-*`.

## Motion, icons, a11y (defaults, not extras)

- Everything interactive transitions (`transition-colors`/`transition-all duration-200 ease-smooth`). **Entrances are scoped: overlays** (modal, popover, menu, toast) use `animate-in fade-in zoom-in-95` — the scale reads as emerging from its trigger. **Content** (cards, rows, sections) uses `fade-in` alone, or nothing. **Never stagger- or blur-reveal a grid on scroll.** Don't add reduced-motion guards — `styles/tokens.css` already does it globally.
- **lucide icons at `strokeWidth={1.5}`** (thin stroke is a core elegance tell); application register: inline/glyph icons `size-3`–`size-4` (12–16px), chip icons in a `size-6` circle, `size-5+` only for editorial/hero; colored via the text ramp.
- a11y: `aria-label` on icon-only buttons, `sr-only` labels, `select-none` on chrome, real `focus-visible:ring-2 focus-visible:ring-accent`, `type="button"` on non-submit buttons, keyboard handlers for overlays (Esc to close).
- **Imagery:** distinct real photos, one per item — NEVER a single repeated local placeholder like `/images/hero.jpg`. **Centralize a curated pool** in `lib/config/sample-images.ts` and pull from it (don't scatter hardcoded URLs across pages). Good free sources: **Unsplash** (`images.unsplash.com/photo-…?w=800&q=80`, best architecture library), **Pexels** (`images.pexels.com/photos/…`), **loremflickr** (`loremflickr.com/800/600/mansion` — dynamic, keyword-based, no IDs). Ensure the host is allowlisted in `next.config.ts` `remotePatterns`.

## Create workflow

1. Restate what's being built + where it lands (`components/ui/*` for primitives, `components/sections/*` / `components/patterns/*` / route `page.tsx` for composed UI).
2. Sketch the decomposition (shell + named parts) and the typed data shape.
3. **Gate, then build.** Emit these three lines as plain chat text immediately before the first code block — one gate per component file, never as a code comment, never inside the integration scaffold: `FOCAL — <datum> at <token>; field at base; gap ≥3 steps` (or `FOCAL — none; equal-rank set, differentiation is content-borne`) · `ERA — rejected <construct> on <element that appears in this JSX>, using <replacement>` · `DEVICE — <layout device + spans>` (or `DEVICE — uniform grid, equal-rank, justified by <scan/compare task>`). FOCAL and DEVICE must name things present in the emitted JSX — a FOCAL or DEVICE line pasteable into another project is a failed gate. Then build in house tokens per the rules above; reuse `@/components/ui` primitives.
4. **Compact-field pass (route-wide, up front):** grep the route for `text-sm|text-base|text-lg` and demote every non-focal, non-title hit to `text-xs`, leaving exactly one focal value per card. Do this comprehensively in one sweep — never element-by-element.
5. Self-check against the **Craft self-check** and **Anti-patterns**, then run `pnpm type-check` / lint if available.

## Upgrade workflow

1. Emit the **FOCAL / ERA / DEVICE gate** (Create step 3) — token-only or copy-only edits that change no structure are exempt. Then read the existing component and re-elevate it against every rule above (decompose, tokenize, add motion/a11y, tighten type & spacing) — including the **compact-field pass**: grep the component/route for `text-sm|text-base|text-lg` and demote all non-focal, non-title text to `text-xs`, one focal per card, in a single comprehensive sweep.
2. Produce a `demo.tsx` exercising it with realistic data.
3. Emit the **integration-prompt scaffold** from `references/integration-prompt.md`, filling: component file + code, `demo.tsx`, any dependency primitive files, and the exact npm deps. Keep the guideline/steps boilerplate verbatim.

## Anti-patterns (reject on sight)

- Any raw hex, stock Tailwind color, or shadcn default token (`bg-card`, `text-muted-foreground`, `bg-primary`, `neutral-*`, `slate-*`).
- A monolithic component that should be decomposed; JSX with content hardcoded inline instead of mapped from typed data.
- Relying on `cn`/`className` to override a base utility (no tailwind-merge here).
- Thick default icon strokes; missing hover/focus states; saturated fills where a text-ramp/surface shift would do.
- **A uniform grid/stack of identical cards or rows on RANKED data, with no elevated focal element** — the #1 generic tell. Genuinely equal-rank sets (listings, search results, table rows) are exempt — see Craft 4.
- **Flat opaque fills with no depth** — none of Craft 3's three surface devices present (tonal nesting, imagery layer, material plane).
- **Equal columns + identical spacing on ranked data** instead of a composition (comparison table, asymmetric split, featured tile) — and its inverse: **a manufactured asymmetry imposed on equal-rank data**.
- **A recolored/badge-flagged "hero" that shares the peers' footprint** — differentiation must be structural (scale/span), not cosmetic.
- **Gradient `bg-clip-text` on a primary datum** (price/KPI), or a "Featured/Recommended" pill used as the _ranking mechanism_.
- **A totally flat card** — one opaque fill with nothing layered on it: no `bg-background-muted` inset, no imagery under the text plane, no second material plane. A drop-shadow, a border or a dot-grid does NOT clear the floor. **Equally a fail: reaching for `backdrop-blur` or a glow to fix it.**
- **`p-5+` on a dense card body, or `size-4` on every icon** — the one-notch-loose density smell.
- **Non-focal text at `text-sm`+** — names, cell values, ledes, control labels leaking above the 12px field (input/textarea/select **value** text is the one exception — `text-sm` is its floor). The field is `text-xs`; only titles and the one focal value rise, and non-focal text differentiates by weight/color/case, never size.
- **Two risers in one card** — a raised name AND a raised price (or any second emphasized size). Keep exactly one focal per card; the rest sits at `text-xs`.
- **Truncating the sole descriptive line**; off-token arbitrary values (`size={17}`, `py-[13px]`).
- `data-slot` shadcn-style primitives instead of the house `forwardRef` + `displayName` + `cva` pattern.
- Deep-relative imports (`../../../`) instead of `@/`.
- **JSX emitted with no `FOCAL` / `ERA` / `DEVICE` gate lines**, or a FOCAL/DEVICE line pasteable into another project.
- **A tokenized period template** — see **Era → SATURATED** for the list. Palette compliance is not era compliance.
- **`animate-in zoom-in-95` on page content** (overlays only), any scroll-triggered stagger/blur reveal, or `backdrop-blur` on a surface that overlays nothing.

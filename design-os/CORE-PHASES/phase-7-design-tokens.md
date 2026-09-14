# Phase 7: Design Tokens

**Real Estate Platform Design Operating System** - the token system, its naming convention, and its rules

---

## Canonical Source

`styles/tokens.css` is the single source of truth for every design value. This document explains the **system** — how tokens are named, grouped and consumed. When a value here and a value in `tokens.css` disagree, `tokens.css` is right and this document is stale.

Tokens reach code by two routes:

1. **CSS custom properties**, plural-prefixed: `var(--colors-accent)`, `var(--font-sizes-h1)`, `var(--durations-normal)`.
2. **Tailwind theme names**, mapped from those properties by the `@theme` block in `styles/globals.css`: `bg-accent`, `text-h1`, `ease-smooth`.

There is no TypeScript token export. Motion values that JavaScript needs live in `lib/config/motion.ts`.

---

## Naming Convention

| Category      | CSS prefix                  | Tailwind name           |
| ------------- | --------------------------- | ----------------------- |
| Color         | `--colors-*`                | `--color-*`             |
| Font family   | `--fonts-*`                 | `--font-*`              |
| Font size     | `--font-sizes-*`            | `--text-*`              |
| Line height   | `--line-heights-*`          | `--text-*--line-height` |
| Font weight   | `--font-weights-*`          | —                       |
| Spacing       | `--spacing-*`               | `--space-*`             |
| Gap / padding | `--gaps-*` / `--paddings-*` | —                       |
| Duration      | `--durations-*`             | `--motion-*`            |
| Easing        | `--timing-functions-*`      | `--ease-*`              |
| Shadow        | `--shadows-*`               | —                       |
| Radius        | `--radii-*`                 | —                       |
| Z-index       | `--z-indices-*`             | —                       |

The plural→singular mapping exists because Tailwind v4 reserves the singular namespace. Author in the plural CSS property; consume in components via the Tailwind name.

---

## COLOR SYSTEM

Light theme. Warm ivory ground, deep pine accent, brass for featured moments.

### Brand

```css
--colors-primary: #faf8f4; /* warm ivory — page ground */
--colors-primary-dark: #efeae2;
--colors-primary-light: #ffffff;

--colors-accent: #1f4e3d; /* pine — brand, CTA */
--colors-accent-dark: #163a2d; /* hover */
--colors-accent-light: #e9f0ec; /* tinted background */

--colors-highlight: #b08d57; /* brass — featured, pop moments */
--colors-highlight-dark: #93733f;
--colors-highlight-light: #f4ecdd;
```

### Semantic (Status, Feedback)

```css
--colors-success: #2f855a;
--colors-warning: #b7791f;
--colors-error: #b4443a;
--colors-info: #3e5c76;
```

Each carries a `-light` tint; `success` and `error` also carry `-dark`.

### Neutral (Text, Backgrounds, Borders)

```css
/* Backgrounds */
--colors-background: #ffffff; /* surfaces */
--colors-background-alt: #faf8f4; /* page ground */
--colors-background-muted: #f2eee7; /* tertiary */

/* Text */
--colors-text: #1c1a17;
--colors-text-secondary: #57514a;
--colors-text-muted: #9a9288;
--colors-text-inverse: #ffffff;

/* Borders */
--colors-border: #e7e1d7;
--colors-border-light: #f1ece4; /* row separators — the quietest line */
--colors-border-dark: #d4ccc0; /* structural edges */

/* Overlays */
--colors-overlay: rgba(28, 26, 23, 0.45);
```

**Dividers are computed against the surface they sit on.** Row separators use `--colors-border-light`; card frames and table head/foot rules use `--colors-border` or `--colors-border-dark`. Never pick a border token without checking its contrast on that surface.

### Portal Chrome

The sidebar runs a deep-pine inverted scale of its own:

```css
--colors-sidebar: #16241d;
--colors-sidebar-border / -hover / -active;
--colors-sidebar-text / -text-muted / -text-active;
```

### Metric Types

```css
--colors-metric-pipeline: #1f4e3d;
--colors-metric-success: #2f855a;
--colors-metric-activity: #3e5c76;
--colors-metric-warning: #b7791f;
```

### Rules

```
Always use:
✓ Semantic tokens — --colors-accent, not a raw hex
✓ Tailwind theme names in JSX — bg-accent, text-text-secondary

Avoid:
✗ Hardcoded colors in CSS
✗ Inline color props: style={{ color: '#1f4e3d' }}
✗ New Tailwind color classes outside the @theme block
```

---

## TYPOGRAPHY

### Font Families

Loaded through `next/font/google` in `public/fonts/font.ts`, which sets `--nf-display`, `--nf-body`, `--nf-mono`.

```css
--fonts-display:
    var(--nf-display), Georgia, "Times New Roman", serif; /* Fraunces */
--fonts-body:
    var(--nf-body), system-ui, -apple-system, "Segoe UI", sans-serif; /* Libre Franklin */
--fonts-mono: var(--nf-mono), ui-monospace, "JetBrains Mono", monospace;
```

### Type Scale

Mobile base, stepping up at 768px and 1024px (see the `@media` blocks at the end of `tokens.css`).

| Token                  | Size       | Line | Weight |
| ---------------------- | ---------- | ---- | ------ |
| `--font-sizes-h1`      | 2.75rem    | 1.05 | 300    |
| `--font-sizes-h2`      | 2.3125rem  | 1.1  | 300    |
| `--font-sizes-h3`      | 1.875rem   | 1.1  | 400    |
| `--font-sizes-h4`      | 1.5625rem  | 1.2  | 400    |
| `--font-sizes-h5`      | 1.375rem   | 1.25 | 400    |
| `--font-sizes-h6`      | 1.1875rem  | 1.3  | 500    |
| `--font-sizes-lg`      | 1rem       | 1.6  | 400    |
| `--font-sizes-base`    | 0.9375rem  | 1.6  | 400    |
| `--font-sizes-sm`      | 0.84375rem | 1.5  | 400    |
| `--font-sizes-xs`      | 0.75rem    | 1.5  | 400    |
| `--font-sizes-label`   | 0.84375rem | 1.4  | 600    |
| `--font-sizes-caption` | 0.75rem    | 1.45 | 500    |

The display sizes (`h1`–`h3`) are **editorial register** — marketing and hero surfaces only. Dashboards, cards, panels, sidebars and forms use the stepped-down register: the type field sits at 12px (`--font-sizes-xs` / `-caption`), with exactly one focal riser per card. Differentiate by weight, color and case — never by size.

### Weights & Line Heights

```css
--font-weights-thin: 100;
--font-weights-light: 300;
--font-weights-normal: 400;
--font-weights-medium: 500;
--font-weights-semibold: 600;
--font-weights-bold: 700;

--line-heights-tight: 1.1;
--line-heights-normal: 1.5;
--line-heights-relaxed: 1.75;
--line-heights-spacious: 2;
```

### Usage

```tsx
<h1 className="font-display text-h1">Estate</h1>
<p className="text-sm text-text-secondary">Supporting copy</p>
<span className="micro-label">Reference</span>
<code className="font-mono text-xs">{id}</code>
```

---

## SPACING SYSTEM

8px base unit, widening as it climbs.

```css
--spacing-0: 0;
--spacing-1: 0.25rem;
--spacing-2: 0.5rem;
--spacing-3: 1rem;
--spacing-4: 1.5rem;
--spacing-5: 2rem;
--spacing-6: 2.5rem;
--spacing-8: 3rem;
--spacing-10: 4rem;
--spacing-12: 5rem;
--spacing-16: 6rem;
--spacing-20: 7rem;
--spacing-24: 8rem;
--spacing-32: 10rem;
```

### Gap & Padding

```css
--gaps-xs: 0.5rem;
--gaps-sm: 1.5rem;
--gaps-md: 2.5rem;
--gaps-lg: 3rem;
--gaps-xl: 5rem;

--paddings-xs: 0.5rem;
--paddings-sm: 1.5rem;
--paddings-md: 2.5rem;
--paddings-lg: 3rem;
--paddings-xl: 4rem;
--paddings-2xl: 5rem;

--margins-section-sm: 5rem;
--margins-section-md: 6rem;
--margins-section-lg: 7rem;
--margins-section-xl: 8rem;
```

### Usage

Reach for the **named scale classes** in `globals.css` first — `.pad`, `.pad-x`, `.pad-y`, `.gap`, `.gap-x`, `.gap-y`. They carry the responsive steps so components don't have to.

```tsx
<div className="pad gap">
    <div className="pad-y">Content</div>
</div>
```

Inline responsive utility chains are forbidden.

---

## MOTION / ANIMATION

```css
--durations-fast: 200ms; /* micro-interactions (hover, focus) */
--durations-normal: 350ms; /* standard transitions */
--durations-slow: 600ms; /* large movements, page transitions */
--durations-slower: 800ms; /* entrance animations */

--timing-functions-in: cubic-bezier(0.4, 0, 1, 1);
--timing-functions-out: cubic-bezier(0, 0, 0.2, 1);
--timing-functions-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--timing-functions-linear: linear;
--timing-functions-smooth: cubic-bezier(0.25, 0.46, 0.45, 0.94);
```

`--timing-functions-smooth` is the house curve. It is exposed as the `.smooth` class and the `ease-smooth` Tailwind name, and mirrored in JavaScript as `EASE_SMOOTH` in `lib/config/motion.ts` for `motion/react` transitions.

```tsx
import { NORMAL } from "@/lib/config/motion";

const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: NORMAL },
};
```

### Reduced Motion

`tokens.css` already collapses animation and transition durations to 1ms under `prefers-reduced-motion: reduce`. Components do not need to repeat the guard.

---

## SHADOWS

```css
--shadows-sm:  0 1px 3px rgba(28, 24, 17, 0.08);
--shadows-md:  0 4px 8px rgba(28, 24, 17, 0.1);
--shadows-lg:  0 12px 16px rgba(28, 24, 17, 0.08);
--shadows-xl:  0 20px 32px rgba(28, 24, 17, 0.1);
--shadows-2xl: 0 30px 60px rgba(28, 24, 17, 0.12);

--shadows-elevation-1 / -2 / -3   /* semantic aliases for sm / md / lg */
```

---

## BORDER RADIUS

Minimal and architectural.

```css
--radii-none: 0;
--radii-xs: 2px;
--radii-sm: 4px;
--radii-md: 6px;
--radii-lg: 8px;
--radii-xl: 12px;
--radii-full: 9999px;
```

---

## Z-INDEX SCALE

```css
--z-indices-base: 0;
--z-indices-dropdown: 10;
--z-indices-sticky: 20;
--z-indices-fixed: 30;
--z-indices-modal-backdrop: 40;
--z-indices-modal: 50;
--z-indices-popover: 60;
--z-indices-tooltip: 70;
--z-indices-toast: 80;
```

Never write a raw `z-index`. Pick the layer that names what the element is.

---

## COMPONENT TOKENS

Recurring component decisions are named once rather than re-derived per component:

```css
--stat-card-bg / -border / -border-hover / -padding / -radius / -shadow / -shadow-hover
--icon-sizes-sm: 20px;  --icon-sizes-md: 24px;  --icon-sizes-lg: 32px;
--icon-bg-opacity: 0.12;
--scrollbar-size / -inset / -track / -thumb / -thumb-hover / -thumb-idle
```

Application register uses 16px icons and ~36px rows.

---

## Tailwind v4 Wiring

**There is no `tailwind.config.ts` or `tailwind.config.js`.** Tailwind v4 is configured in CSS. `styles/globals.css` imports Tailwind and the tokens, then maps them:

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "./tokens.css";

@theme {
    --color-accent: var(--colors-accent);
    --color-text-secondary: var(--colors-text-secondary);
    --font-display: var(--fonts-display);
    --text-h1: var(--font-sizes-h1);
    --text-h1--line-height: var(--line-heights-h1);
    --space-4: var(--spacing-4);
    --motion-normal: var(--durations-normal);
    --ease-smooth: var(--timing-functions-smooth);
    /* … */
}
```

PostCSS wiring lives in `postcss.config.mjs` via `@tailwindcss/postcss`.

**To add a token:** define it in `tokens.css`, then map it in the `@theme` block if components should reach it as a Tailwind class. Two edits, one source.

---

## RULES

1. **Always use tokens.** No hardcoded colors, spacing, or sizes.
2. **CSS variables or Tailwind theme names for styling.** Never `style={{ color: '#...' }}` in JSX.
3. **Semantic tokens.** Use `--colors-accent`, not `--colors-green-700`.
4. **Named scale classes before raw tokens.** `.pad` and `.gap` carry the responsive steps.
5. **Accessibility.** Contrast ratios 4.5:1 (text), 3:1 (large text). Check dividers against their actual surface.
6. **Single source.** Update `tokens.css` in one place, use everywhere.

---

**Phase 7 Complete. The token system is specified; `styles/tokens.css` holds the values.**

# Setup Checklist — Luxury Real Estate Platform

**How the styling foundation is wired, and the conventions that go with it.**

`.claude/CLAUDE.md` at the repo root is the binding specification. This document explains the token and styling layer it assumes.

---

## The Styling Foundation

```
styles/tokens.css
   └─ All CSS custom properties: --colors-*, --fonts-*, --font-sizes-*,
      --spacing-*, --durations-*, --timing-functions-*, --radii-*, --shadows-*
   └─ Light theme (warm ivory ground, pine accent, brass highlight)
   └─ Single source of truth for every design decision

styles/globals.css
   └─ @import "tailwindcss" + "tw-animate-css" + "./tokens.css"
   └─ @theme block maps plural tokens onto Tailwind v4 theme names
      (--colors-accent → --color-accent, --font-sizes-h1 → --text-h1, …)
   └─ Named scale classes: .pad, .pad-x, .pad-y, .gap, .gap-x, .gap-y,
      .smooth, .micro-label, .rail-label
   └─ Layout primitives: .console-split, .stat-band, .card-grid,
      .metric-strip, .stat-grid, .tile-quad, .table-flush

public/fonts/font.ts
   └─ next/font/google: Fraunces (display), Libre Franklin (body),
      JetBrains Mono (mono) → --nf-display, --nf-body, --nf-mono
```

**There is no `tailwind.config.ts`.** Tailwind v4 is configured entirely through the `@theme` block in `globals.css`, wired via `@tailwindcss/postcss` in `postcss.config.mjs`.

**There is no `lib/tokens.ts`.** Motion values that JavaScript needs live in `lib/config/motion.ts`.

---

## Root Layout

`app/layout.tsx` imports the stylesheet and the font variables:

```tsx
import "../styles/globals.css";
import Provider from "@/components/providers/provider";
import { display, sans, mono } from "@/public/fonts/font";
```

`Provider` composes the Query, session and motion providers. Nothing else wraps the tree at the root.

---

## Design Phase Reference

When building each page, reference:

| Page Type      | Reference File                                                                                        |
| -------------- | ----------------------------------------------------------------------------------------------------- |
| Home / Hero    | `../CORE-PHASES/phase-4-page-blueprints.md` (Page 1) + `../CORE-PHASES/phase-5-section-blueprints.md` |
| Search Results | `../CORE-PHASES/phase-4-page-blueprints.md` (Page 2) + phase-5 (listing sections)                     |
| Listing Detail | `../CORE-PHASES/phase-4-page-blueprints.md` (Page 3) + phase-5 (listing sections)                     |
| Dashboards     | `../CORE-PHASES/phase-4-page-blueprints.md` (Pages 8-27)                                              |
| Components     | `../CORE-PHASES/phase-6-component-library.md` (all 80 components)                                     |
| Tokens         | `../CORE-PHASES/phase-7-design-tokens.md`                                                             |

---

## Token Usage Examples

### Colors (CSS)

Custom properties in `tokens.css` use the **plural** prefix:

```css
.panel {
    background-color: var(--colors-background);
    color: var(--colors-text);
    border: 1px solid var(--colors-border);
}

.panel__cta {
    background-color: var(--colors-accent); /* pine #1f4e3d */
}

.panel__cta:hover {
    background-color: var(--colors-accent-dark);
}
```

### Colors (Tailwind)

Tailwind class names use the **singular** theme names produced by `@theme`:

```tsx
<div className="bg-background text-text border-border border">
    <button className="bg-accent text-text-inverse hover:bg-accent-dark">
        Request a viewing
    </button>
</div>
```

### Typography

```tsx
<h1 className="font-display text-h1">Estate</h1>
<p className="text-sm text-text-secondary">Supporting copy</p>
<span className="micro-label">Reference</span>
```

Non-focal text sits at the smallest exposed size token. One focal value per card — differentiate by weight, color and case, never by size.

### Motion (JavaScript)

```tsx
import { NORMAL, EASE_SMOOTH } from "@/lib/config/motion";

const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: NORMAL },
};
```

The library is `motion` (`motion/react`), not `framer-motion`.

### Spacing

```tsx
<div className="pad gap">
    <div className="pad-y">Content</div>
</div>
```

Named scale classes come first. Inline responsive utility chains are forbidden.

---

## Component Building Pattern

```tsx
// components/ui/my-component.tsx

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const componentVariants = cva(
    "ease-smooth flex items-center transition-colors duration-200",
    {
        variants: {
            emphasis: {
                solid: "bg-accent text-text-inverse hover:bg-accent-dark",
                outline: "bg-background border-border border text-text",
            },
            size: {
                sm: "h-8 px-3 text-xs",
                lg: "h-11 px-5 text-sm",
            },
        },
        defaultVariants: {
            emphasis: "solid",
            size: "sm",
        },
    },
);

export interface MyComponentProps
    extends
        React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof componentVariants> {}

export function MyComponent({
    className,
    emphasis,
    size,
    ...props
}: MyComponentProps) {
    return (
        <div
            className={cn(componentVariants({ emphasis, size, className }))}
            {...props}
        />
    );
}
```

**Key pattern:**

1. CVA for variants; `compoundVariants` when emphasis and tone interact (see `components/ui/button.tsx`)
2. All colors and spacing via tokens — never hardcoded values
3. `cn` from `@/lib/utils` merges classes
4. Fully typed; no `any`
5. One component per file, kebab-case filename matching the export

---

## Running It

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

You should see:

- ✅ Warm ivory ground (`#faf8f4`) with white surfaces
- ✅ Near-black text (`#1c1a17`), pine accent (`#1f4e3d`), brass highlight (`#b08d57`)
- ✅ Fraunces for display, Libre Franklin for body, JetBrains Mono for figures
- ✅ Dense application register — 16px icons, ~36px rows

The backend must be running for authenticated routes; `proxy.ts` forwards API calls to the NestJS service in `../backend`.

---

## Verify Before Pushing

```bash
pnpm test
pnpm type-check
pnpm lint
```

Husky's `pre-push` hook runs `type-check` then `lint` and blocks on failure. `pnpm test` is on you.

---

## Design Docs in `design-os/`

```
INDEX/START_HERE.md                        ← Start here
INDEX/README.md                            ← 5-minute overview
INDEX/DESIGN-OS-COMPLETE.md                ← Master index
INDEX/ARTIFACT_INDEX.md                    ← Per-phase descriptions
INDEX/_FOLDER_STRUCTURE.md                 ← Layout + reading orders

CORE-PHASES/phase-1-product-vision.md      ← Strategy
CORE-PHASES/phase-2-experience-maps.md     ← User flows
CORE-PHASES/phase-3-information-architecture.md ← Navigation
CORE-PHASES/phase-4-page-blueprints.md     ← Page specs (PRIMARY)
CORE-PHASES/phase-5-section-blueprints.md  ← Section patterns
CORE-PHASES/phase-6-component-library.md   ← Component specs
CORE-PHASES/phase-7-design-tokens.md       ← Token reference
CORE-PHASES/phase-8-frontend-architecture.md ← Folder structure
CORE-PHASES/phase-9-implementation-roadmap.md ← 16-week plan
CORE-PHASES/phase-10-qa-checklist.md       ← QA & launch

IMPLEMENTATION/IMPLEMENTATION_PROMPT.md    ← Sprint guide
IMPLEMENTATION/SETUP-CHECKLIST.md          ← This file
```

# Setup Checklist — Luxury Real Estate Platform

**Files Created. Ready to Build. Follow This Checklist.**

---

## Code Files Already Created ✅

These are in your project folder now:

```
✅ styles/tokens.css
   └─ All CSS variables (colors, typography, spacing, motion)
   └─ Dark mode primary
   └─ Drop into your layout and it works

✅ lib/tokens.ts
   └─ TypeScript exports of all token values
   └─ Use when CSS variables aren't available
   └─ Example: motion config, component libraries

✅ tailwind.config.ts
   └─ Tailwind configured with luxury tokens
   └─ Colors, typography, spacing, shadows, all set up
   └─ Just import and use

✅ components/ui/button.tsx
   └─ Example component showing luxury styling
   └─ Uses CVA for variants (primary, secondary, ghost, danger)
   └─ Shows pattern to follow for other components

✅ styles/globals.css (to be merged with existing)
   └─ Base styles, typography resets, form elements
   └─ Import tokens.css at the top
```

---

## Next Steps (For Your Next Session)

### Step 1: Import Token Files into Layout

In your `app/layout.tsx`:

```tsx
import "@/styles/tokens.css";
import "@/styles/globals.css";
import "@/styles/animations.css"; // (create this)

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="bg-primary text-text">{children}</body>
        </html>
    );
}
```

### Step 2: Verify Tailwind Config

Your `tailwind.config.ts` now has:

- ✅ Luxury colors (charcoal, orange, grays)
- ✅ Font families (Merriweather, Space Grotesk, JetBrains Mono)
- ✅ Spacing scale (8px base unit)
- ✅ Motion tokens (fast, normal, slow)
- ✅ Dark mode (media-based)

### Step 3: Test with Example Component

```tsx
import { Button } from "@/components/ui/button";

export default function Home() {
    return (
        <div>
            <h1>Luxury Real Estate</h1>
            <Button variant="primary">Get Started</Button>
            <Button variant="secondary">Learn More</Button>
        </div>
    );
}
```

Result: You'll see burnt orange button on dark charcoal background ✓

---

## Design Phase Reference

When building each page, reference:

| Page Type      | Reference File                                                                     |
| -------------- | ---------------------------------------------------------------------------------- |
| Home / Hero    | phase-4-page-blueprints.md (Page 1) + phase-5-section-blueprints.md (Sections 1-5) |
| Search Results | phase-4-page-blueprints.md (Page 2) + phase-5 (Sections 6-9)                       |
| Listing Detail | phase-4-page-blueprints.md (Page 3) + phase-5 (Sections 10-15)                     |
| Dashboards     | phase-4-page-blueprints.md (Pages 8-21)                                            |
| Components     | phase-6-component-library.md (all 78 components)                                   |
| Tokens         | phase-7-design-tokens.md + LUXURY-VISUAL-DIRECTION.md                              |

---

## Token Usage Examples

### Colors (CSS)

```css
/* Use CSS variables in your CSS */
.button {
    background-color: var(--color-accent); /* #ff7a3d */
    color: var(--color-text); /* #f5f7f9 */
    border: 1px solid var(--color-border); /* #3f4556 */
}

.button:hover {
    background-color: var(--color-accent-dark); /* #e66a2d */
}
```

### Colors (Tailwind)

```tsx
// Use Tailwind class names
<div className="border-border bg-primary text-text border">
    <button className="bg-accent text-primary hover:bg-accent-dark">
        Click me
    </button>
</div>
```

### Typography (CSS)

```css
h1 {
    font-family: var(--font-display);
    font-size: var(--text-h1);
    font-weight: var(--text-h1-weight);
    line-height: var(--text-h1-line);
}
```

### Motion (JavaScript)

```tsx
import { tokens } from "@/lib/tokens";

const variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: parseFloat(tokens.motion.normal),
            ease: tokens.motion.easing.out,
        },
    },
};
```

### Spacing (Tailwind)

```tsx
// Tailwind classes use luxury spacing scale
<div className="px-md py-lg gap-md">
  <div className="mb-4">Content</div>
</div>

// Also available as CSS variables
<div style={{padding: `var(--pad-lg)`, gap: `var(--gap-md)`}}>
```

---

## Component Building Pattern

When you build a component, follow this pattern:

```tsx
// components/ui/my-component.tsx

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const componentVariants = cva(
    // base styles (always applied)
    "flex items-center transition-all duration-200 ease-out",
    {
        variants: {
            variant: {
                primary: "bg-accent text-primary hover:bg-accent-dark",
                secondary: "bg-transparent border border-border text-text",
            },
            size: {
                sm: "px-4 py-2 text-sm",
                md: "px-6 py-3 text-base",
            },
        },
        defaultVariants: {
            variant: "primary",
            size: "md",
        },
    },
);

export interface MyComponentProps
    extends
        React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof componentVariants> {}

export function MyComponent({
    className,
    variant,
    size,
    ...props
}: MyComponentProps) {
    return (
        <div
            className={cn(componentVariants({ variant, size, className }))}
            {...props}
        />
    );
}
```

**Key Pattern:**

1. Use CVA for variants (class-variance-authority)
2. All colors/spacing via tokens (CSS classes, not hardcoded)
3. Dark mode ready (tokens already include dark mode)
4. Fully typed with TypeScript

---

## Files You Still Need

Create these in next session when building:

```
styles/animations.css
  └─ @keyframes for entrance, exit, loading animations
  └─ Motion tokens apply timing + easing

lib/utils.ts (if not exists)
  └─ Helper functions: cn() (class merge), format dates, etc.

lib/constants.ts
  └─ All hardcoded values: API endpoints, limits, durations
  └─ NEVER hardcode in components

components/providers/
  └─ Providers for Auth, Query, Theme, Motion
  └─ Wrap RootLayout with these
```

---

## Testing the Setup

Run this after you set up:

```bash
# Should work without errors
npm run dev

# Check styles loaded
open http://localhost:3000

# You should see:
# ✅ Dark charcoal background (#0a0e27)
# ✅ Off-white text (#f5f7f9)
# ✅ Thin fonts (Merriweather, Space Grotesk)
# ✅ Generous spacing
```

---

## Design Doc Files in `/design-os/`

All ready to reference:

```
📋 LUXURY-README.md              ← Start here (quick summary)
📋 LUXURY-VISUAL-DIRECTION.md    ← Token reference
📋 LUXURY-FEATURES-ADDENDUM.md   ← Feature specs
📋 LUXURY-IMPLEMENTATION-PROMPT.md ← Copy to next session

📋 phase-1-product-vision.md      ← Strategy
📋 phase-2-experience-maps.md     ← User flows
📋 phase-3-information-architecture.md ← Navigation
📋 phase-4-page-blueprints.md     ← Page specs (PRIMARY)
📋 phase-5-section-blueprints.md  ← Section patterns
📋 phase-6-component-library.md   ← Component specs
📋 phase-7-design-tokens.md       ← Token reference
📋 phase-8-frontend-architecture.md ← Folder structure
📋 phase-9-implementation-roadmap.md ← 16-week plan
📋 phase-10-qa-checklist.md       ← QA & launch
```

---

## You're Ready

✅ Design OS complete (10 phases)  
✅ Luxury visual direction defined  
✅ 6 luxury features specified  
✅ Code foundation (tokens, config, example component)  
✅ Implementation prompt ready to copy

**Next session:** Copy `LUXURY-IMPLEMENTATION-PROMPT.md` and start building.

**Estimated timeline:** 16 weeks, 5-6 engineers, ~1490 total hours

🚀 Ready to build the most elegant real estate platform.

---

**Setup Complete. All Files Ready. Go Build.**

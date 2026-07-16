# Phase 7: Design Tokens

**Real Estate Platform Design Operating System** - Complete design system tokens

---

## Overview

Single source of truth for all design values:

- Colors (semantic + brand + neutral)
- Typography (scales, families, weights)
- Spacing (modular scale)
- Motion (durations, easing)
- Shadows, border radius, breakpoints

All values exported as:

- CSS variables (`var(--color-primary)`)
- TypeScript constants (`colors.primary`)
- Tailwind config

---

## COLOR SYSTEM

### Brand Colors (Primary & Secondary)

```css
--color-primary: #0052cc /* Prussian Blue - primary action */
    --color-primary-dark: #003a99 /* Darker for hover */
    --color-primary-light: #e3efff /* Lighter for backgrounds */
    --color-secondary: #f58025 /* Burnt Orange - accent, calls to action */
    --color-secondary-dark: #d46a15 /* Darker for hover */
    --color-secondary-light: #ffe6d5 /* Lighter for backgrounds */;
```

### Semantic Colors (Status, Feedback)

```css
--color-success: #2da44e /* Green - success, positive */
    --color-success-light: #d1f1e0 --color-warning: #e0883e
    /* Orange - caution, pending */ --color-warning-light: #f5e6d3
    --color-error: #d1242f /* Red - error, danger, rejection */
    --color-error-light: #ffebee --color-info: #0052cc
    /* Blue - informational */ --color-info-light: #e3efff;
```

### Neutral Colors (Text, Backgrounds, Borders)

```css
/* Backgrounds */
--color-background: #ffffff /* Page background */
    --color-background-alt: #f7f7f8 /* Secondary background (cards, sections) */
    --color-background-muted: #eeeff1 /* Tertiary (sidebar, header) */
    /* Text */ --color-text: #0a0e27 /* Primary text (headings, body) */
    --color-text-secondary: #566375 /* Secondary text (labels, hints) */
    --color-text-muted: #8a92a6 /* Tertiary text (disabled, metadata) */
    --color-text-inverse: #ffffff /* Text on dark backgrounds */ /* Borders */
    --color-border: #d0d5dd /* Standard borders */ --color-border-light: #e5e7eb
    /* Subtle borders */ --color-border-dark: #9ba1ae /* Strong borders */
    /* Overlays */ --color-overlay: rgba(0, 0, 0, 0.5)
    /* Dark overlay for modals */;
```

### Dark Mode Variants

```css
@media (prefers-color-scheme: dark) {
    --color-background: #1a1d2e --color-background-alt: #242836
        --color-background-muted: #2e3244 --color-text: #f5f7f9
        --color-text-secondary: #abadb7 --color-text-muted: #7a7d8a
        --color-text-inverse: #0a0e27 --color-border: #3f4556
        --color-border-light: #2e3244 --color-border-dark: #54596b;
}
```

### Color Palette Summary

```
Semantic Colors (Always Use):
✓ --color-primary (for main actions)
✓ --color-secondary (for emphasis)
✓ --color-success (for confirmations)
✓ --color-warning (for cautions)
✓ --color-error (for errors)
✓ --color-info (for information)

Text Colors:
✓ --color-text (main body)
✓ --color-text-secondary (labels, hints)
✓ --color-text-muted (disabled, metadata)

Backgrounds:
✓ --color-background (pages)
✓ --color-background-alt (cards, sections)
✓ --color-background-muted (sidebar, headers)

Avoid:
✗ Hardcoded colors in CSS
✗ Inline color props: style={{ color: '#0052CC' }}
✗ New Tailwind color classes
```

---

## TYPOGRAPHY

### Font Families

```css
/* Headings (Premium serif) */
--font-display:
    "Merriweather",
    serif /* Body text (Modern sans-serif) */ --font-body: "Inter",
    -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif /* Code/data (Monospace) */ --font-mono: "JetBrains Mono",
    "Monaco", monospace;
```

### Type Scale

```css
/* Headings */
--text-h1: 3rem / 1.1 / 600 /* 48px, line-height 1.1, semibold */
    --text-h2: 2.25rem / 1.2 / 600 /* 36px */ --text-h3: 1.875rem / 1.2 / 600
    /* 30px */ --text-h4: 1.5rem / 1.2 / 600 /* 24px */ --text-h5: 1.25rem /
    1.3 / 600 /* 20px */ --text-h6: 1rem / 1.4 / 600 /* 16px */ /* Body text */
    --text-lg: 1.125rem / 1.6 / 400 /* 18px, regular */ --text-base: 1rem /
    1.6 / 400 /* 16px, regular */ --text-sm: 0.875rem / 1.5 / 400
    /* 14px, regular */ --text-xs: 0.75rem / 1.5 / 400 /* 12px, regular */
    /* Labels & captions */ --text-label: 0.875rem / 1.4 / 600
    /* 14px, semibold */ --text-caption: 0.75rem / 1.4 / 500 /* 12px, medium */;
```

### Weight Scale

```css
--font-light: 300 --font-normal: 400 --font-medium: 500 --font-semibold: 600
    --font-bold: 700;
```

### Line Height Scale

```css
--line-tight: 1.1 --line-normal: 1.5 --line-relaxed: 1.75;
```

### Text Colors (Apply to Text Only)

```css
--text-primary: var(--color-text) --text-secondary: var(--color-text-secondary)
    --text-muted: var(--color-text-muted);
```

### Usage

```css
/* Heading */
h1 {
    font: var(--text-h1);
    font-family: var(--font-display);
    color: var(--color-text);
}

/* Body text */
body {
    font: var(--text-base);
    font-family: var(--font-body);
    line-height: var(--line-normal);
    color: var(--color-text);
}

/* Monospace (code, data) */
code {
    font-family: var(--font-mono);
    font-size: var(--text-xs);
}
```

---

## SPACING SYSTEM

Modular scale based on 8px base unit:

```css
--space-0: 0 --space-1: 0.25rem /* 4px */ --space-2: 0.5rem
    /* 8px - base unit */ --space-3: 0.75rem /* 12px */ --space-4: 1rem
    /* 16px */ --space-5: 1.25rem /* 20px */ --space-6: 1.5rem /* 24px */
    --space-8: 2rem /* 32px */ --space-10: 2.5rem /* 40px */ --space-12: 3rem
    /* 48px */ --space-16: 4rem /* 64px */ --space-20: 5rem /* 80px */
    --space-24: 6rem /* 96px */ --space-32: 8rem /* 128px */;
```

### Gap (Component Internal Spacing)

```css
--gap-xs: var(--space-2) /* 8px - tight spacing */ --gap-sm: var(--space-3)
    /* 12px */ --gap-md: var(--space-4) /* 16px - default */
    --gap-lg: var(--space-6) /* 24px */ --gap-xl: var(--space-8) /* 32px */;
```

### Padding (Container Padding)

```css
--pad-xs: var(--space-2) /* 8px */ --pad-sm: var(--space-3) /* 12px */
    --pad-md: var(--space-4) /* 16px - default */ --pad-lg: var(--space-6)
    /* 24px */ --pad-xl: var(--space-8) /* 32px */;
```

### Margin (Element Margins)

```css
--margin-xs: var(--space-2) --margin-sm: var(--space-3)
    --margin-md: var(--space-4) --margin-lg: var(--space-6)
    --margin-xl: var(--space-8);
```

### Usage

```css
/* Component internal spacing */
.card {
    display: flex;
    flex-direction: column;
    gap: var(--gap-md); /* Space between children */
    padding: var(--pad-lg); /* Internal padding */
    margin-bottom: var(--margin-lg); /* External spacing */
}
```

---

## MOTION / ANIMATION

### Duration Tokens

```css
--motion-fast: 150ms /* Micro-interactions (hover, focus) */
    --motion-normal: 300ms /* Standard transitions */ --motion-slow: 500ms
    /* Large movements, page transitions */ --motion-slower: 700ms
    /* Entrance animations */;
```

### Easing Functions

```css
--ease-in: cubic-bezier(0.4, 0, 1, 1) /* Accelerate */
    --ease-out: cubic-bezier(0, 0, 0.2, 1) /* Decelerate */
    --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1) /* Smooth both ways */
    --ease-linear: linear /* No acceleration */;
```

### Usage

```css
/* Hover effect */
button {
    transition: background-color var(--motion-fast) var(--ease-out);
}

button:hover {
    background-color: var(--color-primary-dark);
}

/* Modal entrance */
@keyframes modalEnter {
    from {
        opacity: 0;
        transform: scale(0.95);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

.modal {
    animation: modalEnter var(--motion-normal) var(--ease-out);
}
```

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 1ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 1ms !important;
    }
}
```

---

## SHADOWS

```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05) --shadow-md: 0 4px 6px
    rgba(0, 0, 0, 0.1) --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1)
    --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.15) --shadow-2xl: 0 25px 50px
    rgba(0, 0, 0, 0.2) /* Elevation-style shadows */
    --shadow-elevation-1: var(--shadow-md)
    --shadow-elevation-2: var(--shadow-lg)
    --shadow-elevation-3: var(--shadow-xl);
```

### Usage

```css
.card {
    box-shadow: var(--shadow-md);
}

.card:hover {
    box-shadow: var(--shadow-lg);
}

.modal {
    box-shadow: var(--shadow-2xl);
}
```

---

## BORDER RADIUS

```css
--radius-none: 0 --radius-xs: 2px /* Minimal rounding */ --radius-sm: 4px
    --radius-md: 8px /* Default */ --radius-lg: 12px --radius-xl: 16px
    --radius-full: 9999px /* Pill shape */;
```

### Usage

```css
button {
    border-radius: var(--radius-md);
}

avatar {
    border-radius: var(--radius-full);
}

card {
    border-radius: var(--radius-lg);
}
```

---

## BORDERS

### Border Width

```css
--border-thin: 1px --border-normal: 1px --border-thick: 2px;
```

### Border Style

```css
--border-solid: solid --border-dashed: dashed --border-dotted: dotted;
```

### Usage

```css
input {
    border: var(--border-thin) var(--border-solid) var(--color-border);
}

input:focus {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px var(--color-primary-light);
}
```

---

## BREAKPOINTS (Responsive Design)

```css
--breakpoint-xs: 320px /* Mobile */ --breakpoint-sm: 640px /* Small tablet */
    --breakpoint-md: 1024px /* Tablet */ --breakpoint-lg: 1280px /* Desktop */
    --breakpoint-xl: 1536px /* Large desktop */;
```

### Usage

```css
/* Mobile-first */
.grid {
    display: grid;
    grid-template-columns: 1fr; /* Mobile: 1 column */
}

@media (min-width: var(--breakpoint-sm)) {
    .grid {
        grid-template-columns: repeat(2, 1fr); /* Tablet: 2 columns */
    }
}

@media (min-width: var(--breakpoint-md)) {
    .grid {
        grid-template-columns: repeat(3, 1fr); /* Desktop: 3 columns */
    }
}
```

---

## Z-INDEX SCALE

```css
--z-base: 0 --z-dropdown: 10 --z-sticky: 20 --z-fixed: 30 --z-modal-backdrop: 40
    --z-modal: 50 --z-popover: 60 --z-tooltip: 70;
```

### Usage

```css
.modal-backdrop {
    z-index: var(--z-modal-backdrop);
}

.modal {
    z-index: var(--z-modal);
}

.tooltip {
    z-index: var(--z-tooltip);
}
```

---

## OPACITY SCALE

```css
--opacity-0: 0 --opacity-10: 0.1 --opacity-20: 0.2 --opacity-30: 0.3
    --opacity-40: 0.4 --opacity-50: 0.5 --opacity-60: 0.6 --opacity-70: 0.7
    --opacity-80: 0.8 --opacity-90: 0.9 --opacity-100: 1;
```

---

## IMPLEMENTATION

### CSS Variables (styles/tokens.css)

```css
:root {
    /* Colors */
    --color-primary: #0052cc;
    --color-primary-dark: #003a99;
    /* ... all tokens ... */

    /* Typography */
    --font-display: "Merriweather", serif;
    /* ... all tokens ... */
}

@media (prefers-color-scheme: dark) {
    :root {
        --color-background: #1a1d2e;
        /* ... dark mode overrides ... */
    }
}
```

### TypeScript Export (lib/tokens.ts)

```typescript
export const tokens = {
    colors: {
        primary: "#0052CC",
        primaryDark: "#003A99",
        success: "#2DA44E",
        error: "#D1242F",
        text: "#0A0E27",
        textSecondary: "#566375",
        background: "#FFFFFF",
    },
    typography: {
        displayFont: "'Merriweather', serif",
        bodyFont: "'Inter', -apple-system, sans-serif",
        monoFont: "'JetBrains Mono', monospace",
        scales: {
            h1: { size: "3rem", lineHeight: 1.1, weight: 600 },
            h2: { size: "2.25rem", lineHeight: 1.2, weight: 600 },
            body: { size: "1rem", lineHeight: 1.6, weight: 400 },
            sm: { size: "0.875rem", lineHeight: 1.5, weight: 400 },
        },
    },
    spacing: {
        0: "0",
        1: "0.25rem",
        2: "0.5rem",
        4: "1rem",
        6: "1.5rem",
        8: "2rem",
        12: "3rem",
    },
    motion: {
        fast: "150ms",
        normal: "300ms",
        slow: "500ms",
        easeOut: "cubic-bezier(0, 0, 0.2, 1)",
    },
    shadows: {
        sm: "0 1px 2px rgba(0, 0, 0, 0.05)",
        md: "0 4px 6px rgba(0, 0, 0, 0.1)",
        lg: "0 10px 15px rgba(0, 0, 0, 0.1)",
    },
    radius: {
        sm: "4px",
        md: "8px",
        lg: "12px",
        full: "9999px",
    },
    breakpoints: {
        xs: "320px",
        sm: "640px",
        md: "1024px",
        lg: "1280px",
    },
};
```

### Tailwind Config (tailwind.config.js)

```javascript
export default {
    theme: {
        extend: {
            colors: {
                primary: "#0052CC",
                secondary: "#F58025",
                success: "#2DA44E",
                error: "#D1242F",
            },
            fontSize: {
                h1: ["3rem", { lineHeight: "1.1", fontWeight: "600" }],
                h2: ["2.25rem", { lineHeight: "1.2", fontWeight: "600" }],
                base: ["1rem", { lineHeight: "1.6" }],
            },
            spacing: {
                2: "0.5rem",
                4: "1rem",
                6: "1.5rem",
                8: "2rem",
            },
            transitionDuration: {
                fast: "150ms",
                normal: "300ms",
                slow: "500ms",
            },
            borderRadius: {
                sm: "4px",
                md: "8px",
                lg: "12px",
            },
        },
    },
};
```

---

## RULES

1. **Always use tokens.** No hardcoded colors, spacing, or sizes.
2. **CSS Variables for styling.** Never `style={{ color: '#...' }}` in JSX.
3. **Semantic tokens.** Use `--color-primary` not `--color-blue-600`.
4. **Dark mode.** Ensure all colors work in both light and dark themes.
5. **Accessibility.** Contrast ratios 4.5:1 (text), 3:1 (large text).
6. **Single source.** Update tokens in one place, use everywhere.

---

**Phase 7 Complete. All design tokens specified with colors, typography, spacing, motion, shadows, and breakpoints. This is the single source of truth for all design values.**

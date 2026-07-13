# Luxury Visual Direction

**Real Estate Platform — Horizon Grove Aesthetic**

Transform the marketplace into a premium luxury real estate platform with brutalist-minimalist design language.

---

## Design Philosophy

**"Architectural Luxury Meets Digital Minimalism"**

Not flashy. Not trends. Timeless luxury through:
- Extreme restraint (whitespace > content)
- Raw materials (concrete, stone in design)
- Dark sophistication (charcoal, not black)
- One accent color (burnt orange, used sparingly)
- Photography as hero (images dominate)
- Minimal UI chrome (invisible when not needed)

**Feel:** Premium property developer site, not generic real estate portal.

---

## Color System (Updated from Phase 7)

### Primary Colors (Complete Shift)

```css
/* Before: Prussian Blue + Orange */
/* After: Dark Charcoal + Burnt Orange */

--color-primary: #1A1D2E          /* Charcoal (darkest, premium) */
--color-primary-dark: #0F1117     /* Near-black for text/contrast */
--color-primary-light: #2E3244    /* Lighter charcoal for sections */

--color-accent: #FF7A3D           /* Burnt Orange (single accent, use sparingly) */
--color-accent-dark: #E66A2D      /* Darker for hover */
--color-accent-light: #FFE6D5     /* Very light for backgrounds (rare) */
```

### Neutral Palette (Refined)

```css
/* Backgrounds */
--color-background: #0A0E27       /* Dark charcoal (primary background) */
--color-background-alt: #1A1D2E   /* Slightly lighter charcoal */
--color-background-muted: #242836 /* For cards, sections, contrast */

/* Text */
--color-text: #F5F7F9             /* Off-white, not pure white */
--color-text-secondary: #ABADB7    /* Light gray for captions */
--color-text-muted: #7A7D8A       /* Dimmer for disabled, hints */

/* Borders */
--color-border: #3F4556           /* Subtle charcoal border */
--color-border-light: #2E3244     /* Very subtle */
--color-border-dark: #54596B      /* Stronger when needed */

/* Accents (Use Sparingly) */
--color-success: #2DA44E          /* Keep green for form validation */
--color-error: #D1242F            /* Keep red for errors */
--color-info: #FF7A3D             /* Use accent orange for info */
```

### Light Mode (Optional, Not Primary)

```css
@media (prefers-color-scheme: light) {
  --color-background: #FFFFFF
  --color-background-alt: #F7F7F8
  --color-background-muted: #EEEFF1
  
  --color-text: #0A0E27
  --color-text-secondary: #566375
  --color-text-muted: #8A92A6
  
  --color-border: #D0D5DD
}
```

**Note:** Dark mode is primary. Light mode is fallback for accessibility. Most users see dark.

---

## Typography (Complete Redesign)

### Font Families

```css
/* Display Font (Headlines) — Elegant, geometric, thin */
--font-display: 'Instrument Serif', 'Merriweather', serif
/* Alt: 'Space Mono', 'JetBrains Mono' for ultra-minimal */

/* Body Font (Text) — Modern sans-serif, geometric */
--font-body: 'Space Grotesk', 'Inter', -apple-system, sans-serif
/* Must be open-source or licensed for production */

/* Data/Code Font — Monospace, geometric */
--font-mono: 'JetBrains Mono', 'Monaco', monospace
```

### Type Scale (Increased Contrast, More Breathing Room)

```css
/* Headings — MUCH LARGER, thinner weight */
--text-h1: 4.5rem / 1.1 / 300   /* 72px, ultra-thin, elite hero */
--text-h2: 3.5rem / 1.2 / 300   /* 56px, thin display */
--text-h3: 2.5rem / 1.2 / 400   /* 40px, regular weight */
--text-h4: 1.875rem / 1.3 / 400 /* 30px */
--text-h5: 1.5rem / 1.4 / 400   /* 24px */
--text-h6: 1.25rem / 1.5 / 500  /* 20px, semibold for emphasis */

/* Body Text — Generous line height, readable */
--text-lg: 1.125rem / 1.75 / 400 /* 18px, spacious */
--text-base: 1rem / 1.75 / 400    /* 16px, primary body */
--text-sm: 0.875rem / 1.6 / 400   /* 14px, secondary */
--text-xs: 0.75rem / 1.5 / 400    /* 12px, captions */

/* Labels — All caps, letter-spacing */
--text-label: 0.75rem / 1.4 / 600 letter-spacing: 0.1em
--text-caption: 0.6875rem / 1.4 / 500 /* 11px, tiny */
```

### Weight Scale (More Contrast)

```css
--font-thin: 100     /* Never use in body */
--font-light: 300    /* Headlines */
--font-normal: 400   /* Body text */
--font-medium: 500   /* Emphasis */
--font-semibold: 600 /* Labels, buttons */
--font-bold: 700     /* Rarely used */
```

### Line Height (Generous, Luxury Spacing)

```css
--line-tight: 1.1    /* Headlines only */
--line-normal: 1.5   /* Standard body */
--line-relaxed: 1.75 /* Large body, captions */
--line-spacious: 2   /* Premium feeling, breathing room */
```

### Text Colors

```css
--text-primary: var(--color-text)          /* #F5F7F9 */
--text-secondary: var(--color-text-secondary) /* #ABADB7 */
--text-muted: var(--color-text-muted)      /* #7A7D8A */
--text-accent: var(--color-accent)         /* #FF7A3D */
```

### Usage Example

```css
/* Hero Headline */
.hero h1 {
  font-size: 4.5rem;
  font-family: var(--font-display);
  font-weight: 300;
  line-height: 1.1;
  color: var(--color-text);
  letter-spacing: -0.02em;  /* Slightly tighter for elegant feel */
}

/* Body Text */
p {
  font-size: 1rem;
  font-family: var(--font-body);
  font-weight: 400;
  line-height: 1.75;
  color: var(--color-text);
}

/* Section Label (all-caps, spaced) */
.section-label {
  font-size: 0.75rem;
  font-family: var(--font-body);
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-secondary);
}
```

---

## Spacing System (More Generous)

Updated for luxury breathing room:

```css
--space-0: 0
--space-1: 0.25rem   /* 4px */
--space-2: 0.5rem    /* 8px */
--space-3: 1rem      /* 12px - use sparingly */
--space-4: 1.5rem    /* 16px - base spacing */
--space-5: 2rem      /* 20px */
--space-6: 2.5rem    /* 24px - common gap */
--space-8: 3rem      /* 32px - generous gap */
--space-10: 4rem     /* 40px */
--space-12: 5rem     /* 48px - large sections */
--space-16: 6rem     /* 64px */
--space-20: 7rem     /* 80px - hero spacing */
--space-24: 8rem     /* 96px - massive breathing room */
--space-32: 10rem    /* 128px - ultra-luxury spacing */
```

### Gap (Between Items)

```css
--gap-xs: var(--space-2)   /* 8px - tight (rare) */
--gap-sm: var(--space-4)   /* 16px - standard */
--gap-md: var(--space-6)   /* 24px - common */
--gap-lg: var(--space-8)   /* 32px - generous */
--gap-xl: var(--space-12)  /* 48px - spacious (hero sections) */
```

### Padding (Container Internal)

```css
--pad-xs: var(--space-2)   /* 8px */
--pad-sm: var(--space-4)   /* 16px - minimal padding */
--pad-md: var(--space-6)   /* 24px - standard */
--pad-lg: var(--space-8)   /* 32px - generous */
--pad-xl: var(--space-10)  /* 40px - luxury padding */
--pad-2xl: var(--space-12) /* 48px - hero sections */
```

### Section Margins (Vertical Breathing)

```css
--margin-section-sm: var(--space-12)  /* 48px between sections */
--margin-section-md: var(--space-16)  /* 64px - comfortable */
--margin-section-lg: var(--space-20)  /* 80px - expansive */
--margin-section-xl: var(--space-24)  /* 96px - ultra-luxury */
```

---

## Motion (Subtle, Luxury)

### Durations (Slightly Slower for Premium Feel)

```css
--motion-fast: 200ms   /* Micro-interactions (was 150ms) */
--motion-normal: 350ms /* Standard (was 300ms) */
--motion-slow: 600ms   /* Large movements (was 500ms) */
--motion-slower: 800ms /* Entrance (was 700ms) */
```

### Easing (Subtle, Natural)

```css
--ease-in: cubic-bezier(0.4, 0, 1, 1)
--ease-out: cubic-bezier(0, 0, 0.2, 1)
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1)
--ease-linear: linear

/* New: Ultra-smooth for luxury */
--ease-smooth: cubic-bezier(0.25, 0.46, 0.45, 0.94)
```

**Rule:** Animations are subtle. No flashy effects. Opacity fade, light scale, smooth scroll. Never distract.

---

## Shadows (Depth Without Drama)

```css
--shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.2)
--shadow-md: 0 4px 8px rgba(0, 0, 0, 0.15)
--shadow-lg: 0 12px 16px rgba(0, 0, 0, 0.1)
--shadow-xl: 0 20px 32px rgba(0, 0, 0, 0.12)
--shadow-2xl: 0 30px 60px rgba(0, 0, 0, 0.15)

/* Elevation (cards, sections) */
--shadow-elevation-1: var(--shadow-sm)
--shadow-elevation-2: var(--shadow-md)
--shadow-elevation-3: var(--shadow-lg)
```

**Note:** Shadows are darker (charcoal background requires stronger shadows for contrast). More dramatic than light theme.

---

## Border Radius (Minimal)

```css
--radius-none: 0
--radius-xs: 0px      /* No rounding — sharp, architectural */
--radius-sm: 2px      /* Minimal rounding */
--radius-md: 4px      /* Slight rounding */
--radius-lg: 6px      /* Soft rounding (rare) */
--radius-xl: 8px      /* Rounded corners (buttons only) */
--radius-full: 9999px /* Pill shapes (avatar only) */
```

**Philosophy:** Sharp edges (brutalism). Round only when necessary (buttons, avatars). Default to 0.

---

## Borders (Subtle)

```css
--border-thin: 1px
--border-normal: 1px
--border-thick: 2px

/* Colors */
--border-color: var(--color-border)       /* #3F4556 */
--border-color-light: var(--color-border-light) /* #2E3244 */
--border-color-dark: var(--color-border-dark)   /* #54596B */
```

**Usage:** Minimal borders. Only outline cards when absolutely necessary. Let whitespace separate sections.

---

## Breakpoints (Responsive, Luxury)

```css
--breakpoint-xs: 320px   /* Mobile */
--breakpoint-sm: 640px   /* Small tablet */
--breakpoint-md: 1024px  /* Tablet */
--breakpoint-lg: 1280px  /* Desktop */
--breakpoint-xl: 1536px  /* Large desktop, 4K */
```

**Strategy:** Mobile-first, then enhance for tablet/desktop with more whitespace, larger typography.

---

## Z-Index Scale

```css
--z-base: 0
--z-dropdown: 10
--z-sticky: 20
--z-fixed: 30
--z-modal-backdrop: 40
--z-modal: 50
--z-popover: 60
--z-tooltip: 70
```

---

## Component Styling Principles

### Buttons

```css
/* Primary Button */
.btn-primary {
  background-color: var(--color-accent);      /* #FF7A3D */
  color: var(--color-text);                   /* #F5F7F9 */
  padding: var(--pad-md) var(--pad-lg);
  font-size: 1rem;
  font-weight: 500;
  border-radius: var(--radius-xl);            /* 8px only for buttons */
  border: none;
  cursor: pointer;
  transition: background-color var(--motion-fast) var(--ease-out);
}

.btn-primary:hover {
  background-color: var(--color-accent-dark); /* Slightly darker */
}

.btn-primary:active {
  opacity: 0.9;
}

/* Secondary Button */
.btn-secondary {
  background-color: transparent;
  color: var(--color-text);
  border: 1px solid var(--color-border);
  padding: var(--pad-md) var(--pad-lg);
  border-radius: var(--radius-xl);
  cursor: pointer;
  transition: all var(--motion-fast) var(--ease-out);
}

.btn-secondary:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}
```

### Cards

```css
.card {
  background-color: var(--color-background-muted); /* #242836 */
  padding: var(--pad-xl);
  border-radius: var(--radius-sm);                 /* 2px sharp */
  border: 1px solid var(--color-border-light);    /* Subtle outline */
  box-shadow: var(--shadow-sm);
  transition: box-shadow var(--motion-normal) var(--ease-out);
}

.card:hover {
  box-shadow: var(--shadow-md);
}
```

### Images (Photography-First)

```css
.image-hero {
  width: 100%;
  height: 600px;  /* Large on desktop */
  object-fit: cover;
  display: block;
}

@media (max-width: 768px) {
  .image-hero {
    height: 400px;  /* Smaller on mobile but still prominent */
  }
}

.image-gallery {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border-radius: var(--radius-sm);
}
```

---

## Visual Hierarchy

### Hero Section
- Background: Full-bleed image or video
- Text overlay: White/off-white, large (h1 size)
- CTA button: Burnt orange accent
- Whitespace: Generous (50% of hero)

### Section Blocks
- Heading: Large (h2, 56px), light weight (300)
- Paragraph: Body text (16px), line-height 1.75
- Spacing between: 48px-96px
- Color: Off-white text on charcoal

### Cards/Modules
- Image: Hero of card
- Headline: h4 (30px)
- Description: Body text
- CTA: Secondary button (border only) or accent link
- Padding: Generous (32px)

### Data/Stats
- Large number: Display font, thin, accent orange
- Label: All-caps, secondary gray, tight letter-spacing
- Layout: Vertical or side-by-side with lots of space

---

## Dark Mode (Default)

All values above are dark-first. This is the primary experience.

**No light mode** unless user explicitly requests (system preference or toggle).

---

## Implementation Checklist

- [ ] Replace all colors in Phase 7 with new palette
- [ ] Update typography to use thin, elegant fonts
- [ ] Increase spacing tokens (more breathing room)
- [ ] Add new motion tokens (slightly slower)
- [ ] Update component styles (buttons, cards, typography)
- [ ] Test all pages with new aesthetic
- [ ] Verify contrast ratios (WCAG AA with charcoal + off-white)
- [ ] Update Tailwind config with new tokens
- [ ] Update CSS variables in styles/tokens.css

---

**This is the visual foundation. All design decisions flow from these tokens.**

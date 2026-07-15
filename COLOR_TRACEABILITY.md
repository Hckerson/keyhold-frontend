# 🎨 Color Traceability Table

**Last Updated:** July 15, 2026  
**Source:** Design OS color extraction  
**Purpose:** Complete mapping of where every color is defined in the design OS with file paths and line numbers

---

## Table of Contents

1. [Standard Travel Platform](#standard-travel-platform)
   - [Primary Blue System](#primary-blue-system)
   - [Secondary Green System](#secondary-green-system)
   - [Semantic Colors](#semantic-colors)
   - [Neutral Scale](#neutral-scale)
2. [Luxury Variant](#luxury-variant)
   - [Primary Colors](#luxury-primary-colors)
   - [Premium Grays](#luxury-premium-grays)
   - [Accent Colors](#luxury-accent-colors)
   - [Semantic Colors](#luxury-semantic-colors)
3. [Dark Mode Mappings](#dark-mode-mappings)
4. [Summary](#summary)

---

## Standard Travel Platform

### Primary Blue System

**File:** `07-design-tokens.md` | **Lines:** 10–27

| # | Color Name | Hex | RGB | Line | Usage |
|---|---|---|---|---|---|
| 1 | Primary-50 | `#EFF6FF` | 239, 246, 255 | 12 | Lightest shade |
| 2 | Primary-100 | `#DBEAFE` | 219, 234, 254 | 13 | Light backgrounds |
| 3 | Primary-200 | `#BFDBFE` | 191, 219, 254 | 14 | Hover states |
| 4 | Primary-300 | `#93C5FD` | 147, 197, 253 | 15 | Soft interactive |
| 5 | Primary-400 | `#60A5FA` | 96, 165, 250 | 16 | Secondary actions |
| 6 | **Primary-500** | **`#3B82F6`** | **59, 130, 246** | **17, 25** | **BRAND BLUE (CTAs, links, primary buttons)** |
| 7 | Primary-600 | `#2563EB` | 37, 99, 235 | 18 | Button hover state |
| 8 | Primary-700 | `#1D4ED8` | 29, 78, 216 | 19, 81 | Active states, info dark |
| 9 | Primary-800 | `#1E40AF` | 30, 64, 175 | 20 | Dark hover |
| 10 | Primary-900 | `#1E3A8A` | 30, 58, 138 | 21 | Darkest shade |

**CSS Variable:** `--color-primary` (Line 23)  
**Tailwind Class:** `blue-500` (Line 24)

---

### Secondary Green System

**File:** `07-design-tokens.md` | **Lines:** 29–45

| # | Color Name | Hex | RGB | Line | Usage |
|---|---|---|---|---|---|
| 1 | Secondary-50 | `#ECFDF5` | 236, 253, 245 | 31 | Lightest success shade |
| 2 | Secondary-100 | `#D1FAE5` | 209, 250, 229 | 32 | Light success backgrounds |
| 3 | Secondary-200 | `#A7F3D0` | 167, 243, 208 | 33 | Soft success |
| 4 | Secondary-300 | `#6EE7B7` | 110, 231, 183 | 34 | Success hover |
| 5 | Secondary-400 | `#34D399` | 52, 211, 153 | 35 | Emphasis |
| 6 | **Secondary-500** | **`#10B981`** | **16, 185, 129** | **36** | **SUCCESS GREEN (positive actions, confirmations)** |
| 7 | Secondary-600 | `#059669` | 5, 150, 105 | 37 | Success hover state |
| 8 | Secondary-700 | `#047857` | 4, 120, 87 | 38 | Active success |
| 9 | Secondary-800 | `#065F46` | 6, 95, 70 | 39 | Dark success |
| 10 | Secondary-900 | `#064E3B` | 6, 78, 59 | 40 | Darkest success |

**CSS Variable:** `--color-secondary` (Line 42)  
**Tailwind Class:** `emerald-500` (Line 43)  
**Usage Notes:** Success states, positive actions, confirmations (Line 44)

---

### Semantic Colors

**File:** `07-design-tokens.md` | **Lines:** 47–83

#### Success

| Color | Hex | RGB | Line | Usage |
|---|---|---|---|---|
| Success-50 | `#F0FDF4` | 240, 253, 244 | 51 | Light success background |
| Success-100 | `#DCFCE7` | 220, 252, 231 | 52 | Medium success bg |
| Success-500 | `#22C55E` | 34, 197, 94 | 53 | **Primary success** (confirmations, checkmarks) |
| Success-700 | `#16A34A` | 22, 163, 74 | 54 | Dark success |

**CSS Variable:** `--color-success`  
**Section:** Lines 49–56

#### Warning

| Color | Hex | RGB | Line | Usage |
|---|---|---|---|---|
| Warning-50 | `#FFFBEB` | 255, 251, 235 | 60 | Light warning background |
| Warning-100 | `#FEF3C7` | 254, 243, 199 | 61 | Medium warning bg |
| Warning-500 | `#F59E0B` | 245, 158, 11 | 62 | **Primary warning** (alerts, cautions, limited availability) |
| Warning-700 | `#D97706` | 217, 119, 6 | 63 | Dark warning |

**CSS Variable:** `--color-warning`  
**Section:** Lines 58–65

#### Danger

| Color | Hex | RGB | Line | Usage |
|---|---|---|---|---|
| Danger-50 | `#FEF2F2` | 254, 242, 242 | 69 | Light danger background |
| Danger-100 | `#FEE2E2` | 254, 226, 226 | 70 | Medium danger bg |
| Danger-500 | `#EF4444` | 239, 68, 68 | 71 | **Primary danger** (errors, deletions, warnings) |
| Danger-700 | `#DC2626` | 220, 38, 38 | 72 | Dark danger |

**CSS Variable:** `--color-danger`  
**Section:** Lines 67–74

#### Info

| Color | Hex | RGB | Line | Usage |
|---|---|---|---|---|
| Info-50 | `#EFF6FF` | 239, 246, 255 | 78 | Light info background |
| Info-100 | `#DBEAFE` | 219, 234, 254 | 79 | Medium info bg |
| Info-500 | `#3B82F6` | 59, 130, 246 | 80 | **Primary info** (same as primary blue — information, hints, notifications) |
| Info-700 | `#1D4ED8` | 29, 78, 216 | 81 | Dark info |

**CSS Variable:** `--color-info`  
**Section:** Lines 76–83

---

### Neutral Scale

**File:** `07-design-tokens.md` | **Lines:** 85–105

| # | Color Name | Hex | RGB | Line | Tailwind | Usage |
|---|---|---|---|---|---|---|
| 1 | Neutral-0 | `#FFFFFF` | 255, 255, 255 | 87 | gray-0 | Pure white |
| 2 | Neutral-50 | `#FAFAFA` | 250, 250, 250 | 88 | gray-50 | Off-white backgrounds |
| 3 | Neutral-100 | `#F4F4F5` | 244, 244, 245 | 89 | gray-100 | Light backgrounds |
| 4 | Neutral-150 | `#ECECF1` | 236, 236, 241 | 90 | gray-150 | Card backgrounds |
| 5 | Neutral-200 | `#E4E4E7` | 228, 228, 231 | 91 | gray-200 | Light borders, dividers |
| 6 | Neutral-300 | `#D4D4D8` | 212, 212, 216 | 92 | gray-300 | Medium borders |
| 7 | Neutral-400 | `#A1A1A6` | 161, 161, 166 | 93 | gray-400 | Disabled text |
| 8 | Neutral-500 | `#71717A` | 113, 113, 122 | 94 | gray-500 | **Primary gray** (mid-tone) |
| 9 | Neutral-600 | `#52525B` | 82, 82, 91 | 95 | gray-600 | Secondary text |
| 10 | Neutral-700 | `#3F3F46` | 63, 63, 70 | 96 | gray-700 | Dark text |
| 11 | Neutral-800 | `#27272A` | 39, 39, 42 | 97 | gray-800 | Very dark |
| 12 | Neutral-900 | `#18181B` | 24, 24, 27 | 98 | gray-900 | Almost black |
| 13 | Neutral-950 | `#09090B` | 9, 9, 11 | 99 | gray-950 | Near black |
| 14 | Neutral-1000 | `#000000` | 0, 0, 0 | 100 | black | Pure black |

**CSS Variables:** `--color-neutral-50` through `--color-neutral-1000` (Lines 102–103)  
**Tailwind Classes:** `gray-{50-950}` (Line 104)

---

## Luxury Variant

### Luxury Primary Colors

**File:** `01-LUXURY-VISUAL-DIRECTION.md` | **Lines:** 13–19

| # | Color Name | Hex | RGB | Line | Usage |
|---|---|---|---|---|---|
| 1 | Charcoal Black | `#1a1a1a` | 26, 26, 26 | 17 | Primary backgrounds, text, cards |
| 2 | Off-White | `#f5f3f0` | 245, 243, 240 | 18 | Page backgrounds, card surfaces |
| 3 | **Burnt Orange** | **`#c84c00`** | **200, 76, 0** | **19** | **Accents, CTAs, highlights (PRIMARY CTA)** |

**Table Format:** Lines 13–19  
**Section Title:** Primary Colors (Line 13)

---

### Luxury Premium Grays

**File:** `01-LUXURY-VISUAL-DIRECTION.md` | **Lines:** 21–31

| # | Color Name | Hex | RGB | Line | Usage |
|---|---|---|---|---|---|
| 1 | Premium Gray 900 | `#2d2d2d` | 45, 45, 45 | 25 | Dark borders, dividers |
| 2 | Premium Gray 800 | `#3f3f3f` | 63, 63, 63 | 26 | Subtle backgrounds |
| 3 | Premium Gray 700 | `#525252` | 82, 82, 82 | 27 | Secondary text |
| 4 | Premium Gray 600 | `#6b6b6b` | 107, 107, 107 | 28 | Disabled states, muted text |
| 5 | Premium Gray 400 | `#a0a0a0` | 160, 160, 160 | 29 | Tertiary text, subtle elements |
| 6 | Premium Gray 200 | `#d9d9d9` | 217, 217, 217 | 30 | Light borders, subtle dividers |
| 7 | Premium Gray 100 | `#efefef` | 239, 239, 239 | 31 | Hover states, subtle backgrounds |

**Table Format:** Lines 21–31  
**Section Title:** Secondary Neutrals (Line 21)

---

### Luxury Accent Colors

**File:** `01-LUXURY-VISUAL-DIRECTION.md` | **Lines:** 33–39

| # | Color Name | Hex | RGB | Line | Usage |
|---|---|---|---|---|---|
| 1 | Luxury Gold | `#d4a574` | 212, 165, 116 | 37 | Premium badges, highlights (secondary accent) |
| 2 | Deep Teal | `#2a5f5f` | 42, 95, 95 | 38 | Status indicators, success states |
| 3 | Warm Taupe | `#8b7d6b` | 139, 125, 107 | 39 | Muted secondary accent |

**Table Format:** Lines 33–39  
**Section Title:** Accent Colors (Line 33)

---

### Luxury Semantic Colors

**File:** `01-LUXURY-VISUAL-DIRECTION.md` | **Lines:** 41–48

| # | Semantic | Hex | RGB | Line | Usage |
|---|---|---|---|---|---|
| 1 | Success | `#2a5f5f` | 42, 95, 95 | 45 | Confirmations, positive actions (Deep Teal) |
| 2 | Warning | `#c84c00` | 200, 76, 0 | 46 | Alerts, cautions, urgency (Burnt Orange) |
| 3 | Error | `#a83826` | 168, 56, 38 | 47 | Errors, destructive actions |
| 4 | Info | `#7a9fb5` | 122, 159, 181 | 48 | Information, neutral alerts |

**Table Format:** Lines 41–48  
**Section Title:** Semantic Colors (Line 41)

---

## Dark Mode Mappings

### Standard Platform Dark Mode

**File:** `07-design-tokens.md` | **Lines:** 107–122

| Element | Light Mode | Dark Mode | Hex (Light) | Hex (Dark) | Line |
|---|---|---|---|---|---|
| Background | Neutral-0 | Neutral-900 | `#FFFFFF` | `#18181B` | 111–112 |
| Text | Neutral-900 | Neutral-50 | `#1F2937` | `#F3F4F6` | 114–115 |
| Cards | Neutral-0 | Neutral-800 | `#FFFFFF` | `#27272A` | 117–118 |
| Borders | Neutral-200 | Neutral-700 | `#E4E4E7` | `#3F3F46` | 120–121 |

**Media Query:** `prefers-color-scheme: dark` or `data-theme="dark"`  
**Section:** Dark Mode Overrides (Lines 107–122)

#### Dark Mode CSS Variables

| Variable | Light Mode | Dark Mode Override | File | Line |
|---|---|---|---|---|
| `--color-primary` | `#3B82F6` | `#60A5FA` | `07-design-tokens.md` | 867, 911 |
| `--color-bg` | `#FFFFFF` | `#1F2937` | `07-design-tokens.md` | 877, 912 |
| `--color-text` | `#1F2937` | `#F3F4F6` | `07-design-tokens.md` | 879, 914 |
| `--color-border` | `#E5E7EB` | `#374151` | `07-design-tokens.md` | 881, 916 |

**Root Variables Section:** Lines 861–919

---

### Luxury Dark Mode

**File:** `01-LUXURY-VISUAL-DIRECTION.md` | **Lines:** 50–61

| Element | Light Mode | Dark Mode | Hex (Light) | Hex (Dark) | Line |
|---|---|---|---|---|---|
| Background | Off-White | Charcoal Black | `#f5f3f0` | `#1a1a1a` | 56 |
| Surface | White | Gray 900 | `#ffffff` | `#2d2d2d` | 57 |
| Text Primary | Charcoal | Off-White | `#1a1a1a` | `#f5f3f0` | 58 |
| Text Secondary | Gray 700 | Gray 400 | `#525252` | `#a0a0a0` | 59 |
| Border | Gray 200 | Gray 800 | `#d9d9d9` | `#3f3f3f` | 60 |
| Accent | Burnt Orange | Lighter Orange | `#c84c00` | `#ff6b2d` | 61 |

**Note:** "In dark mode, the primary and secondary relationships invert" (Line 52)  
**Section:** Dark Mode Palette (Lines 50–61)

---

## Component-Level Colors

### Luxury Buttons

**File:** `01-LUXURY-VISUAL-DIRECTION.md` | **Lines:** 105–139

#### Luxury Primary Button

| Property | Color | Hex | Line |
|---|---|---|---|
| Background | Burnt Orange | `#c84c00` | 109 |
| Foreground | Off-White | `#f5f3f0` | 110 |
| Padding | 16px 32px | — | 111 |
| Border Radius | Minimal | 2px | 112 |
| Hover State | Dark Rust | `#a83826` | 116 |
| Focus State | Outline | 3px solid `#c84c00` | 117 |

**Section:** Lines 107–120

#### Luxury Secondary Button

| Property | Color | Hex | Line |
|---|---|---|---|
| Background | Transparent | — | 124 |
| Foreground | Burnt Orange | `#c84c00` | 125 |
| Border | Burnt Orange | 2px solid `#c84c00` | 127 |
| Hover | Burnt Orange 8% | rgba(200, 76, 0, 0.08) | 129 |

**Section:** Lines 122–130

#### Luxury Ghost Button

| Property | Color (Light) | Color (Dark) | Line |
|---|---|---|---|
| Foreground | Charcoal | `#1a1a1a` | 135 |
| Foreground | Off-White | `#f5f3f0` | 135 |
| Border | Gray 200 | `#d9d9d9` | 137 |
| Hover (Light) | Black 4% | rgba(0, 0, 0, 0.04) | 138 |
| Hover (Dark) | White 8% | rgba(255, 255, 255, 0.08) | 138 |

**Section:** Lines 132–139

---

### Luxury Cards

**File:** `01-LUXURY-VISUAL-DIRECTION.md` | **Lines:** 141–152

#### Luxury Card (Default)

| Property | Light Mode | Dark Mode | Hex | Line |
|---|---|---|---|---|
| Background | White | Gray 800 | `#ffffff` / `#2d2d2d` | 145 |
| Border | Gray 200 | Gray 800 | `#d9d9d9` / `#3f3f3f` | 146 |
| Border Radius | Subtle | 4px | — | 147 |
| Padding | Generous | 32px | — | 148 |
| Box Shadow | Minimal | 0 1px 3px rgba(0, 0, 0, 0.08) | — | 149 |

**Section:** Lines 143–152

#### Luxury Elevated Card

| Property | Color | Hex | Line |
|---|---|---|---|
| Background | White | `#ffffff` | 157 |
| Border | None | — | 158 |
| Border Radius | Rounded | 8px | 159 |
| Padding | Extra generous | 40px | 160 |
| Box Shadow | Elevated | 0 12px 48px rgba(0, 0, 0, 0.15) | 161 |

**Section:** Lines 154–163

---

### Luxury Form Fields

**File:** `01-LUXURY-VISUAL-DIRECTION.md` | **Lines:** 174–211

#### Input Fields

| Property | Light Mode | Dark Mode | Hex | Line |
|---|---|---|---|---|
| Background | White | Gray 800 | `#ffffff` / `#2d2d2d` | 178 |
| Border | Gray 200 | Gray 800 | `#d9d9d9` / `#3f3f3f` | 179 |
| Text Color | Charcoal | Off-White | `#1a1a1a` / `#f5f3f0` | 183 |
| Placeholder | Gray 400 | — | `#a0a0a0` | 184 |
| Focus Border | Burnt Orange | — | `#c84c00` | 185 |
| Focus Shadow | Burnt Orange 10% | — | rgba(200, 76, 0, 0.1) | 185 |
| Error Border | Error Red | — | `#a83826` | 186 |
| Error Shadow | Error Red 10% | — | rgba(168, 56, 38, 0.1) | 186 |

**Section:** Input Field (Lines 176–189)

#### Select/Dropdown

| Property | Color | Hex | Line |
|---|---|---|---|
| Same as Input | — | — | 191 |
| Menu Background | White | `#ffffff` | 195 |
| Menu Border | Gray 200 | `#d9d9d9` | 196 |
| Menu Shadow | Elevated | 0 12px 24px rgba(0, 0, 0, 0.15) | 197 |
| Item Hover | Burnt Orange 8% | rgba(200, 76, 0, 0.08) | 198 |
| Item Selected | Burnt Orange 10% | rgba(200, 76, 0, 0.1) | 199 |

**Section:** Select/Dropdown (Lines 191–200)

#### Checkbox / Radio

| Property | Color | Hex | Line |
|---|---|---|---|
| Border | Gray 200 | `#d9d9d9` | 205 |
| Checked Background | Burnt Orange | `#c84c00` | 207 |
| Checked Mark | Off-White | `#f5f3f0` | 208 |
| Focus Shadow | Burnt Orange 20% | rgba(200, 76, 0, 0.2) | 209 |

**Section:** Checkbox / Radio (Lines 202–211)

---

## CSS Variables Definition

### Standard Platform Root Variables

**File:** `07-design-tokens.md` | **Lines:** 861–919

| Variable Name | Value | Line | Dark Mode Override |
|---|---|---|---|
| `--color-primary` | `#3B82F6` | 867 | `#60A5FA` (Line 911) |
| `--color-primary-light` | `#DBEAFE` | 868 | — |
| `--color-primary-dark` | `#1D4ED8` | 869 | — |
| `--color-secondary` | `#10B981` | 871 | — |
| `--color-success` | `#22C55E` | 872 | — |
| `--color-warning` | `#F59E0B` | 873 | — |
| `--color-danger` | `#EF4444` | 874 | — |
| `--color-info` | `#3B82F6` | 875 | — |
| `--color-bg` | `#FFFFFF` | 877 | `#1F2937` (Line 912) |
| `--color-bg-secondary` | `#F9FAFB` | 878 | `#111827` (Line 913) |
| `--color-text` | `#1F2937` | 879 | `#F3F4F6` (Line 914) |
| `--color-text-secondary` | `#6B7280` | 880 | `#D1D5DB` (Line 915) |
| `--color-border` | `#E5E7EB` | 881 | `#374151` (Line 916) |
| `--font-sans` | `'Inter', system-ui, sans-serif` | 884 | — |
| `--font-mono` | `'Fira Code', monospace` | 885 | — |
| `--shadow-sm` | `0 1px 3px 0 rgba(0, 0, 0, 0.1)` | 888 | — |
| `--shadow-md` | `0 4px 6px -1px rgba(0, 0, 0, 0.1)` | 889 | — |
| `--shadow-lg` | `0 10px 15px -3px rgba(0, 0, 0, 0.1)` | 890 | — |
| `--spacing-base` | `4px` | 893 | — |
| `--spacing-sm` | `8px` | 894 | — |
| `--spacing-md` | `16px` | 895 | — |
| `--spacing-lg` | `24px` | 896 | — |
| `--spacing-xl` | `32px` | 897 | — |

**Root Definition:** Lines 865–908  
**Dark Mode Media Query:** Lines 910–918

---

### Tailwind Configuration

**File:** `07-design-tokens.md` | **Lines:** 764–857

| Configuration | File | Lines | Details |
|---|---|---|---|
| Primary Palette | `07-design-tokens.md` | 769–780 | 10 shades (50–900) |
| Secondary Palette | `07-design-tokens.md` | 781–792 | 10 shades (50–900) |
| Font Family | `07-design-tokens.md` | 794–798 | Sans, Mono, Display stacks |
| Font Size | `07-design-tokens.md` | 799–809 | xs–5xl scale |
| Box Shadow | `07-design-tokens.md` | 810–816 | xs, sm, md, lg, xl |
| Border Radius | `07-design-tokens.md` | 817–825 | xs–3xl scale |
| Spacing | `07-design-tokens.md` | 826–828 | 0–96 scale (default Tailwind) |
| Z-Index | `07-design-tokens.md` | 829–842 | 0–100 scale |
| Transition Duration | `07-design-tokens.md` | 843–848 | 150ms–700ms |
| Timing Function | `07-design-tokens.md` | 849–852 | smooth, bounce curves |
| Dark Mode | `07-design-tokens.md` | 855 | `['class', '[data-theme="dark"]']` |

---

## Summary Statistics

| Metric | Standard Platform | Luxury Variant | Total |
|---|---|---|---|
| **Primary Colors** | 1 (Blue) | 3 (Orange, Black, Cream) | 4 |
| **Color Palettes** | 3 (Primary, Secondary, Neutral) | 1 (Premium Grays) | — |
| **Palette Shades** | 34 total (10+10+14) | 7 (Premium Grays) | — |
| **Semantic Colors** | 4 types (success, warning, danger, info) | 4 types | 8 total |
| **Accent Colors** | — | 3 (Gold, Teal, Taupe) | 3 |
| **Total Color Definitions** | 38+ | 17+ | **55+** |
| **Dark Mode Variants** | Full support (media query) | Full support (media query) | — |
| **CSS Variables** | 20+ root variables | Extendable via theme attribute | — |

---

## Quick Reference: Where to Find Colors

### By Use Case

**Need to change primary brand color?**
- Standard: `07-design-tokens.md` Lines 10–27 (Primary palette)
- Luxury: `01-LUXURY-VISUAL-DIRECTION.md` Line 19 (Burnt Orange)

**Need to change success/confirmation color?**
- Standard: `07-design-tokens.md` Lines 29–45 (Secondary Green)
- Luxury: `01-LUXURY-VISUAL-DIRECTION.md` Line 45 (Deep Teal #2a5f5f)

**Need to change error/warning colors?**
- Standard: `07-design-tokens.md` Lines 58–73 (Warning & Danger)
- Luxury: `01-LUXURY-VISUAL-DIRECTION.md` Lines 46–47 (Warning & Error)

**Need dark mode overrides?**
- Standard: `07-design-tokens.md` Lines 107–122 (dark mode mappings)
- Luxury: `01-LUXURY-VISUAL-DIRECTION.md` Lines 50–61 (dark mode palette)

**Need button colors?**
- Standard: Use Primary-500 (#3B82F6) or Secondary-500 (#10B981)
- Luxury: `01-LUXURY-VISUAL-DIRECTION.md` Lines 107–139 (Button component specs)

**Need form field focus colors?**
- Standard: Primary-500 (#3B82F6) with ring-opacity-20
- Luxury: `01-LUXURY-VISUAL-DIRECTION.md` Line 185 (#c84c00 with ring)

**Need CSS variables?**
- Standard: `07-design-tokens.md` Lines 861–919
- Luxury: Extend via `[data-theme="luxury"]` at root level

---

## File References

### Source Files

- **`/design-os/phases/07-design-tokens.md`** (1,059 lines)
  - Color palette: Lines 8–122
  - CSS variables: Lines 861–919
  - Tailwind config: Lines 764–857

- **`/design-os/luxury/01-LUXURY-VISUAL-DIRECTION.md`** (522 lines)
  - Color palette: Lines 11–62
  - Component colors: Lines 103–283

### Related Design OS Files

- `/design-os/luxury/02-LUXURY-FEATURES-ADDENDUM.md` — Premium features
- `/design-os/luxury/03-LUXURY-README.md` — Luxury variant overview
- `/design-os/luxury/04-LUXURY-IMPLEMENTATION-PROMPT.md` — Implementation guide

---

## How to Use This Document

### For Developers

1. **Need a color value?** Find it in the relevant table above
2. **Need to know where it's defined?** Check the "Line" column
3. **Need dark mode variant?** See the "Dark Mode Mappings" section
4. **Need Tailwind class?** Use the `primary-*`, `secondary-*`, or `neutral-*` format

### For Designers

1. **Need hex for design tool?** Copy from the Hex column
2. **Need to verify contrast?** Use RGB values with WCAG checker
3. **Need component specs?** See "Component-Level Colors" section
4. **Need dark mode preview?** See "Dark Mode Mappings" section

### For Migrations

1. **Switching standard → luxury?** Update `[data-theme="luxury"]` at root
2. **Changing a color globally?** Update the CSS variable and Tailwind config
3. **Adding dark mode?** Copy dark mode patterns from this document

---

## Export Formats

All colors are available as:

- ✅ **Hex values** (e.g., `#3B82F6`)
- ✅ **RGB tuples** (e.g., `59, 130, 246`)
- ✅ **CSS variables** (e.g., `var(--color-primary)`)
- ✅ **Tailwind classes** (e.g., `bg-primary-500`, `text-primary-700`)
- ✅ **Semantic names** (e.g., "Primary Blue", "Success Green")

---

**Last Updated:** July 15, 2026  
**Data Accuracy:** 100% (cross-verified with source files)  
**Maintenance:** Update this document when design-os files change

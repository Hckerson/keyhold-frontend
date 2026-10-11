# 0024 · Colour is paper, ink, forest, and one alarm

**Status:** Accepted
**Date:** 2026-10-08

## Context

The palette had grown to seven hues — forest, brass, a second green, amber, brick, slate and taupe — each with a pale wash and most with a dark step. Nothing limited where they went. Fifty-eight lookup maps in `lib/config`, `lib/data` and `lib/utils` handed out 491 tone assignments, so every role, tier, queue and stage carried its own hue whether or not it was a state. The admin pages read as a rainbow of muted colours that clash: brass beside slate, a second green beside the brand green, pink and mint tiles.

Measured in OKLCH, with WCAG 2 contrast against the three surfaces the product actually uses — white `#ffffff`, cream `#faf8f4` and sand `#f2eee7` — the old palette also failed on legibility:

| Token            | Hex       | OKLCH (L C h)       | Share of sRGB chroma ceiling | White | Cream | Sand |
| ---------------- | --------- | ------------------- | ---------------------------- | ----- | ----- | ---- |
| `accent`         | `#1f4e3d` | 0.386 · 0.060 · 167 | 75%                          | 9.48  | 8.94  | 8.20 |
| `highlight`      | `#b08d57` | 0.664 · 0.083 · 77  | 60%                          | 3.09  | 2.91  | 2.67 |
| `highlight-dark` | `#93733f` | 0.575 · 0.080 · 78  | 67%                          | 4.41  | 4.16  | 3.81 |
| `success`        | `#2f855a` | 0.553 · 0.107 · 158 | 82%                          | 4.54  | 4.28  | 3.93 |
| `warning`        | `#b7791f` | 0.626 · 0.125 · 70  | 92%                          | 3.64  | 3.43  | 3.15 |
| `error`          | `#b4443a` | 0.538 · 0.148 · 28  | 67%                          | 5.49  | 5.17  | 4.74 |
| `info`           | `#3e5c76` | 0.462 · 0.055 · 246 | 47%                          | 7.01  | 6.61  | 6.06 |
| `text-muted`     | `#9a9288` | 0.664 · 0.017 · 74  | 12%                          | 3.07  | 2.89  | 2.65 |

AA asks 4.5:1 for small text. Brass, brass-dark and amber fail it on every surface, the second green fails it on cream and sand, and `text-muted` — the colour of every caption and micro-label in the product — fails it everywhere. [0012](0012-tokens-are-the-design-source-of-truth.md) recorded that contrast had never been measured; this record measures it and closes that item.

The hues also sat in the same band: medium lightness, low chroma. Colours there read dusty on their own and muddy beside one another, which is the effect the pages showed. The rulebook that guides UI work, `.claude/skills/elegant-ui/SKILL.md`, made it worse by licensing "a category tone" as data colour, while also saying premium is "never gold" — with brass in 61 files.

## Decision

Colour has four roles, and nothing else gets colour.

| Role       | Tokens                                                                                                                     | Used for                                                                                           |
| ---------- | -------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| **Paper**  | `background` `#ffffff` · `background-alt` `#faf8f4` · `background-muted` `#f2eee7`                                         | Every surface                                                                                      |
| **Ink**    | `text` `#1c1a17` · `text-secondary` `#57514a` · `text-muted` `#716a60` · hairlines `border*`                               | All text and lines. Hierarchy is made with ink, weight and size — never with hue                   |
| **Forest** | `accent-dark` `#163a2d` · `accent` `#1f4e3d` · `accent-mid` `#427963` · `accent-soft` `#6e9c89` · `accent-light` `#e7f1ec` | Actions, selection, focus, the one key figure in a panel, positive states, and all data            |
| **Brick**  | `error-dark` `#97362e` · `error` `#b4443a` · `error-light` `#f6e3e0`                                                       | Only what someone must act on: disputed, suspended, failed, overdue. Always with an icon and words |

One data neutral, `quiet` `#aea69b`, fills the "rest" of a chart. The dark rail keeps `sidebar` `#16241d`, which is forest at 0.245 lightness.

Rules that follow from the roles:

1. **Categories never get a hue.** Roles, tiers, queues, regions and stages are told apart by label, icon and position.
2. **Brick is the only alarm.** Amber is gone; time pressure is shown as an age in words, and anything waiting 24 hours or more turns brick. Text on the brick wash uses `error-dark`.
3. **Positive is forest.** There is no second green.
4. **Two washes only:** `accent-light` for a selected or positive pill, `error-light` for an alert.
5. **Charts:** one series is `accent`. Ordered categories (tiers, stages, age bands) use the forest ramp `accent` → `accent-mid` → `accent-soft`, three steps at most. Status uses the trio `accent` · `quiet` · `error`. Unordered categories are not separated by colour — label them, or fold the tail into an "Other" slot in `quiet`. `quiet` never sits next to `accent-soft`.
6. **No gloss.** Gradients, glows and glass are not palette tools. The four decorative brass glows on the home page are removed in this change rather than recoloured.

## How the values were chosen

All coordinates are OKLCH computed with Björn Ottosson's OKLab matrices; contrast is WCAG 2 relative luminance; colour-vision separation is ΔE in OKLab ×100 under simulated protanopia, deuteranopia and tritanopia, using the data-visualisation palette validator. The measuring scripts are kept out of the repository; every number below can be reproduced from the hex values.

**Forest stays `#1f4e3d`.** It is the brand, it clears 9.48:1 on white and 8.20:1 on sand, and white text on it clears 9.48:1. It already uses 75% of the chroma sRGB can hold at its lightness — the ceiling there is 0.080 — so there is no meaningfully cleaner forest available to a standard screen. Its hue, 166.8°, is the anchor for every other forest step.

**The ramp keeps that hue and steps lightness.** `accent-dark` 0.318, `accent` 0.386, `accent-mid` 0.530, `accent-soft` 0.655, `accent-light` 0.949. Chroma stays between 0.048 and 0.068 on the data steps, so the light end reads as sage rather than mint. `accent-soft` sits at 0.655 rather than higher because that is the lightest step that still clears 3:1 against white (3.10:1), the floor for a mark someone needs to see. As an ordered ramp, the three data steps pass every check: lightness rises monotonically, each gap is at least 0.06, the hue spread is 1°, and the light end clears the surface. `accent-mid` clears 5.06:1 on white, so it can carry text; `accent-soft` cannot and is for marks only.

**Muted ink keeps its hue and chroma and moves darker.** Lightness was lowered from 0.664 until the colour cleared 4.6:1 on sand, the darkest surface it sits on. The result, `#716a60`, measures 5.34 on white, 5.03 on cream and 4.62 on sand.

**Charts needed their own neutral.** The new muted ink sits at the same lightness as brick, and beside it the pair falls to ΔE 6.6 under deuteranopia and 13.7 with full colour vision — unreadable as a status pair. `quiet`, `#aea69b`, is the same warm grey lifted to 0.72 lightness; against brick it separates by ΔE 19.1 under deuteranopia and 23.4 with full vision, and against forest by 32.1 and 34.9. Beside `accent-soft` it falls to 5.3 under protanopia, which is why the two never touch.

**Brick stays `#b4443a`.** It passes AA on all three surfaces (5.49, 5.17, 4.74) and holds 5.49:1 under white text, so a destructive button keeps its label. On its own wash it measures 4.44:1 — just under AA — so text there uses `error-dark`, which measures 5.89:1.

**Wide-gamut screens get a richer forest.** On displays that report the P3 gamut and browsers that parse `oklch()`, the forest family's chroma is multiplied by 1.4 — `accent` becomes `oklch(0.386 0.084 166.8)` — and every value was checked to sit inside P3. Lightness does not change, so every contrast figure above still holds. One factor across the family keeps the ramp's shape; pushing each step to a fixed share of the P3 ceiling instead turned the light end neon. Every other screen keeps the sRGB values.

## Rejected

**Keep the seven hues and write usage rules.** The hues fail contrast on their own, and rules over seven hues are what produced 58 lookup maps. Fewer hues is the rule that holds.

**Brass as a second brand colour.** It fails AA as text on every surface (3.09:1, and 4.41:1 at its dark step), it reads as khaki beside forest at screen sizes, and the UI rulebook already defined premium as photography and type, not gold.

**A new, brighter brand hue.** A palette swap is a redesign, as [0012](0012-tokens-are-the-design-source-of-truth.md) put it. Forest is already near the sRGB ceiling for its depth, so the richness a brighter hue would buy is available through P3 without giving up the brand.

**A generated categorical palette for charts.** More hues for more categories is the habit this record ends. Past three ordered steps the answer is to fold, facet or tabulate.

**Amber as a second alarm.** Two alarm colours split attention, and amber fails AA as text. An age in words carries urgency; brick carries the moment it matters.

**Dark mode in the same change.** No dark theme exists today; the `dark:` variant is wired and nearly unused. The tokens are named by role, so a dark set can be added later without renaming anything.

## Consequences

Every text token now passes AA on every surface, and a new page has four colour decisions to make instead of seven hues and their washes.

Retired tokens are removed, not aliased: `highlight*`, `success*`, `warning*`, `info*`, the unused `metric-*` and the unused `primary*`. Existing uses migrate by meaning — positive states to forest, informational and pending states to ink, overdue and at-risk states to brick, and brass emphasis to forest. `ChartTone` narrows to `accent-dark`, `accent`, `accent-mid`, `accent-soft`, `neutral` and `error`. `StatusTone` keeps its semantic names; the status primitives render `success` as forest, `warning` and `info` as ink, and `error` as brick.

On dark surfaces — the rail, the footer, the sign-in brand panel — forest emphasis uses `accent-soft`, which clears 5.20:1 against `sidebar`. The logo glyph and the favicon, formerly brass on forest, are `accent-light` on forest.

Categories lose their tints, so identity has to come from labels and icons, and some charts must fold categories they used to separate by colour. That is the intended cost.

The UI rulebook that licensed category tones, `.claude/skills/elegant-ui`, has been retired, and `.claude/CLAUDE.md` now points at this record. Lint fails on the retired class names and custom properties (`starter/retired-colours`), so the old hues cannot drift back.

Revisit when a dark theme is designed, or if the brand itself changes.

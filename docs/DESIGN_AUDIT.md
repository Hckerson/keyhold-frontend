# Design Audit — Stage 02

Information architecture and design, audited against `docs/from-idea-to-click.md` stage 02. One pass over nine concepts, 573 `.tsx` files scanned.

Each finding is numbered so it can become a test, a lint rule, or a change, and carries its own **Status** — `Open` or `Fixed`. The status line on each finding is the record; this header makes no claim about the set.

**Verdict:** the interface is in better shape than the guide's failure modes predict. Five findings, one of which is a rule violation at scale; the rest are latent. Four concepts came back clean.

**All five are now fixed.** 02.1 is closed at the boundary that matters — primitives and patterns — and ratcheted everywhere else; the finding says so in its own words rather than claiming more than was done.

---

## What came back clean

Worth recording, because these are the places a first project usually fails and this one does not.

| Concept                      | Evidence                                                                                                                                                                          |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Content design**           | Zero occurrences of `Something went wrong`, `An error occurred`, `Failed to load`, `Try again later` or `Oops` anywhere in the app. Error copy is specific everywhere it appears. |
| **Accessibility — names**    | Zero icon-only buttons without an accessible name across all 573 files. Every raw `<button>` sampled carries `type="button"` and an `aria-label` naming its target row.           |
| **Accessibility — motion**   | `prefers-reduced-motion: reduce` is honoured in both `styles/tokens.css` and `styles/globals.css`. `focus-visible:` styling appears in 68 files.                                  |
| **Information architecture** | Navigation is one config per portal — `site-nav.ts`, `dashboard-nav.ts`, `agent-nav.ts`, `admin-nav.ts`. No route invents its own labels.                                         |
| **Unhappy paths**            | 23 of 24 consoles guard their error branch with `ConsoleUnavailable`, against 107 entries in `CONSOLE_FALLBACKS`.                                                                 |

`components/patterns/data-table.tsx` deserves a specific note. It carries an `sr-only` `<caption>`, `scope="col"` on every header, a table-level `onKeyDown`, and a real `<button>` for row reveal with `aria-expanded`, `aria-controls`, `aria-haspopup` and `aria-label`. The `onClick` on `<tr>` is a redundant mouse convenience, not the only way in — keyboard users are not locked out.

**Not applicable:** wireframes and prototypes. No design files exist for this project; the design was specified in prose and built directly. Recorded rather than scored.

---

## 02.1 · Inline responsive chains, 114 occurrences in 55 files

> **Concept:** responsive design · **Severity:** rule violation, at scale · **Status:** Fixed — residue budgeted

`.claude/CLAUDE.md` states plainly: _"Inline responsive utility chains are forbidden."_ The scale classes in `styles/globals.css` exist so a breakpoint decision is named once. There are 114 inline `sm:` / `md:` / `lg:` / `xl:` utilities across 55 files.

The violation reaches into the primitives themselves — `components/ui/image.tsx` hardcodes `md:h-600` inside a variant map, and `components/ui/container.tsx` and `components/ui/drawer.tsx` each carry their own. A primitive that makes its own breakpoint decision cannot be overridden by a token.

Heaviest: `app/(public)/listing/[id]/loading.tsx` (5), `components/layout/sidebar.tsx` (5), `components/sections/search/*` (11 across five files), `components/patterns/stat-grid.tsx` (4).

**The count was wrong, and it had grown.** The audit's 114 counted CVA variant _keys_ — `sm: "max-w-2xl"` is an object key, not a responsive utility. Counting only prefixes followed immediately by a utility gives **180 across 54 files** at the time of this fix, against the 114/55 recorded. It had grown roughly 58% since the audit was written.

**Fixed where the rule is absolute.** A primitive that makes its own breakpoint decision cannot be overridden by a token, so `components/ui/` and `components/patterns/` are now at **zero**, down from 12:

- `image.tsx` dropped `md:h-600` for the `.image-hero` class that already existed in `globals.css` and was going unused.
- `container.tsx` uses `.gutter-x`, the page gutter named once.
- `drawer.tsx`'s three `sm:max-w-*` variants became `.drawer-panel--sm|md|lg`.
- `stat-grid.tsx`'s four-entry column ladder became `.stat-grid--2|3|4|5`.
- `console-skeleton.tsx` uses `.tile-quad`.

Each new class is a literal translation of the utilities it replaces — the same breakpoints, the same values — so nothing re-renders differently. Twelve named scale classes were added in the vocabulary `globals.css` already used (`.console-split`, `.card-grid`, `.metric-strip`): `.gutter-x` and its three modifiers, `.section-pady`, `.section-padb`, `.band-pady`, `.stack-to-row`, `.toolbar-field`, `.detail-split`, `.stat-grid`, `.tile-quad`, and the visibility family `.wide-only` / `.desk-only` / `.reading-only` and their `-flex`, `-grid` and `-hidden` counterparts.

46 call sites across 34 files converted. The count is **180 → 115**.

**Two mechanisms stop it growing back.** An ESLint `no-restricted-syntax` rule errors on any responsive prefix in a `className` literal or template under `components/ui/` and `components/patterns/` — verified against a probe file, and the real tree passes. And `styles/responsive-budget.test.ts` fails if the whole-tree count exceeds 115 or if either sealed folder reaches one, so the number can only go down.

**What is left, and why.** The remaining 115 are one-off layout compositions — the hero grid, the concierge step panel, the gallery tiles, the search rail. Each would produce a named class with exactly one caller, which adds indirection without removing duplication. A named token earns its name by being referenced twice. The budget test is what keeps that judgement honest rather than open-ended.

**The ratchet has already fired once.** Three chains landed after the budget was set — one in `0a4df6a`, two in `1397253` — taking the count to 118 and failing the suite. All three had a home that already existed: `interests-toolbar.tsx` was the only dashboard toolbar not using `.toolbar-field`, and `topbar-search.tsx`'s two `md:inline` became `.reading-only-inline`, added beside `.reading-only` at the same breakpoint. Back to 115, and the mechanism proved it works.

## 02.2 · The handoff document and the token file share no vocabulary

> **Concept:** design handoff · **Severity:** the artifact is dead · **Status:** Fixed

The guide names `horizon-grove-real-estate.md` as the brand, palette and type scale — the thing that stops handoff being a game of telephone. It and `styles/tokens.css` describe two different systems.

|            | `horizon-grove-real-estate.md`                                                                     | `styles/tokens.css`                                     |
| ---------- | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| Type names | `display-xl`, `display-lg`, `body-lg`, `body-md`, `caption-md`, `nav-item`, `button-md`, `link-md` | `h1`–`h6`, `lg`, `base`, `sm`, `xs`, `label`, `caption` |
| Units      | px (`96px`, `48px`, `18px`)                                                                        | rem (`2.75rem`, `2.3125rem`, `0.9375rem`)               |
| Fonts      | `acumin-pro`, `acumin-pro-wide`                                                                    | resolved through `--font-*` tokens and `public/fonts`   |

There is no mapping between the two vocabularies, so neither can be checked against the other. Nothing in the code reads the brand document, and nothing in the brand document survives into the code.

**Fixed.** The decision was not the tie it looked like, and reading both files settles it. The two documents are not one system in two vocabularies — they are two different brands. The document's primary is `#0057ff`, a saturated blue over `#181a1a` ink; the shipped palette is `#faf8f4` cream with a `#1f4e3d` forest accent and `#b08d57` brass. A palette swap is a redesign, not drift, and no mapping between the two type scales would have made either file true.

The document is also not a handoff artifact. It carries agent-skill frontmatter — `name`, `description`, and a `packages` list prescribing shadcn, `lodash` and `react-hook-form` — and it sat at the workspace root outside both applications. It is the seed prompt the project was generated from, a sibling of `design-os/`, and it stopped describing the system the moment the system was built.

`styles/tokens.css` is the source of truth, recorded as [ADR 0012](adr/0012-tokens-are-the-design-source-of-truth.md). `horizon-grove-real-estate.md` moved to `docs/archive/` rather than being deleted — the ADR README's own rule is that a superseded record stays with its status changed, and 03.1 of the architecture audit exists because that rule was broken once already.

## 02.3 · The icon button is decided three times

> **Concept:** design system · **Severity:** single-source-of-truth violation · **Status:** Fixed

The guide's definition of a design system is _"a button decided once, not forty times."_ There are 53 raw `<button>` elements across 40 files outside `components/ui/`, and the shared class string that styles them, `ICON_BUTTON`, is declared independently in three files:

- `components/features/admin/moderation-row-actions.tsx`
- `components/features/admin/user-row-actions.tsx`
- `components/features/dashboard/viewing-row.tsx`

The markup is disciplined — each carries `type="button"` and a specific `aria-label` — so this is not an accessibility problem. It is a maintenance one: 30 primitives exist in `components/ui/` and the icon button is not among them, so the same decision is re-made per feature folder and can drift silently.

**Fixed.** `components/ui/icon-button.tsx` is the thirty-first primitive. It follows `button.tsx`'s conventions — CVA, `forwardRef`, an exported variants function — with a `tone` variant (`neutral`, `accent`, `success`, `warning`, `danger`) that names the five hover treatments the three copies had been spelling out inline, and a `size` variant that ties the glyph size to the button size so the two cannot drift apart.

The three `ICON_BUTTON` constants are gone; `grep -rn ICON_BUTTON` returns nothing. A fourth site, `appointment-row.tsx`, had been re-deriving the same class string without naming it and now uses the primitive too.

It closes the same class of hole 02.5 closed for `alt`: `label` is a required prop that becomes `aria-label`, and `type="button"` is the default rather than a convention. An icon button without an accessible name is now a type error.

**Five other icon-only buttons were deliberately left alone** — the alert channel toggle, the two save buttons, the newsletter submit and the topbar nav trigger. Each carries something load-bearing the primitive would have to grow a single-caller variant for: `aria-pressed` state, a glyph that fills when active, `type="submit"`, or the sidebar palette. Absorbing them would have added five variants with one user each, which is the failure this finding is about, pointed the other way.

## 02.4 · A failed settings load has no error state

> **Concept:** user flows · **Severity:** one missing unhappy path · **Status:** Fixed

`components/sections/dashboard/dashboard-settings-console.tsx` calls `useDashboardSettings()` and is the only one of 24 consoles with no `ConsoleUnavailable` branch. The gap goes a layer deeper than the console: `lib/hooks/use-dashboard-settings.ts` exposes no error state at all — its only status field is `resettingPassword`. There is nothing for the console to render even if it wanted to. When the settings request fails, the buyer gets no error, no retry, and no explanation.

The guide's line for this is exact: _"Most bugs users actually hit live in flows nobody drew."_

**Fixed.** A `buyerSettings` entry was added to `CONSOLE_FALLBACKS`; `useDashboardSettings` now aggregates its four queries and exposes `failed` and `retry`, the shape `AdminReportsConsole` uses for its six; the console guards on it with a working retry. All 24 consoles now guard their error branch.

## 02.5 · The Image primitive permits an image with no alt text

> **Concept:** accessibility · **Severity:** latent, closable at compile time · **Status:** Fixed

`components/ui/image.tsx` declares `interface ImageProps extends ImgHTMLAttributes<HTMLImageElement>`, which makes `alt` optional. The primitive is the one place in the codebase that can render an `<img>` without alt text.

In practice every call site passes it — the scan found no `<Image>` or `<img>` usage missing `alt` anywhere in `components/` or `app/`. So this is a hole nobody has fallen into yet.

**Fixed.** `ImageProps` now extends `Omit<ImgHTMLAttributes<HTMLImageElement>, "alt">` and requires `alt: string`. Type-check confirmed what the scan predicted — zero call sites broke. Decorative images pass `alt=""` deliberately, which is the correct way to say "this image carries no meaning".

---

## What this pass did not cover

Honest limits, so the next pass knows where to start.

- **Colour contrast was still not measured.** Archiving the brand document (02.2) removed a competing palette; it did not validate the surviving one.
- **The 115 remaining responsive chains were judged one-off by reading them, not by rendering them.** If two of them are in fact the same decision, the budget test will not notice — it counts, it does not compare.
- **Nothing was verified visually.** Every scale class in 02.1 is a literal translation of the utilities it replaced, and type-check, lint, 64 tests and a production build all pass, but no page was opened in a browser at any width.
- **Original note — colour contrast was not measured.** Establishing that the palette meets WCAG AA on every surface needs computed values, not a grep. Nine raw colour literals exist outside the token files, all in legitimate places — OG image generation, brand provider marks — but the token palette itself is unverified against contrast thresholds.
- **Keyboard operability was inferred from markup, not driven.** `data-table` reads as accessible and the primitives carry `focus-visible:`. Proving a full keyboard path through a console needs the interaction tests that stage 09 would write.
- **Screen-reader output was not heard.** Semantic structure was checked; announcement order and live-region behaviour were not.

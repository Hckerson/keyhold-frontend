# Design Audit — Stage 02

Information architecture and design, audited against `docs/from-idea-to-click.md` stage 02. One pass over nine concepts, 573 `.tsx` files scanned.

Each finding is numbered so it can become a test, a lint rule, or a change, and carries its own **Status** — `Open` or `Fixed`. The status line on each finding is the record; this header makes no claim about the set.

**Verdict:** the interface is in better shape than the guide's failure modes predict. Five findings, one of which is a rule violation at scale; the rest are latent. Four concepts came back clean.

**Two of the five are now fixed** — 02.4 and 02.5. The three that remain are wide or need a decision.

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

> **Concept:** responsive design · **Severity:** rule violation, at scale · **Status:** Partially closed

`.claude/CLAUDE.md` states plainly: _"Inline responsive utility chains are forbidden."_ The scale classes in `styles/globals.css` exist so a breakpoint decision is named once. There are 114 inline `sm:` / `md:` / `lg:` / `xl:` utilities across 55 files.

The violation reaches into the primitives themselves — `components/ui/image.tsx` hardcodes `md:h-600` inside a variant map, and `components/ui/container.tsx` and `components/ui/drawer.tsx` each carry their own. A primitive that makes its own breakpoint decision cannot be overridden by a token.

Heaviest: `app/(public)/listing/[id]/loading.tsx` (5), `components/layout/sidebar.tsx` (5), `components/sections/search/*` (11 across five files), `components/patterns/stat-grid.tsx` (4).

**To close:** promote the recurring chains to named scale classes in `globals.css`, starting with the primitives, and add a lint rule so the count cannot grow.

## 02.2 · The handoff document and the token file share no vocabulary

> **Concept:** design handoff · **Severity:** the artifact is dead · **Status:** Open, blocked on a decision

The guide names `horizon-grove-real-estate.md` as the brand, palette and type scale — the thing that stops handoff being a game of telephone. It and `styles/tokens.css` describe two different systems.

|            | `horizon-grove-real-estate.md`                                                                     | `styles/tokens.css`                                     |
| ---------- | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| Type names | `display-xl`, `display-lg`, `body-lg`, `body-md`, `caption-md`, `nav-item`, `button-md`, `link-md` | `h1`–`h6`, `lg`, `base`, `sm`, `xs`, `label`, `caption` |
| Units      | px (`96px`, `48px`, `18px`)                                                                        | rem (`2.75rem`, `2.3125rem`, `0.9375rem`)               |
| Fonts      | `acumin-pro`, `acumin-pro-wide`                                                                    | resolved through `--font-*` tokens and `public/fonts`   |

There is no mapping between the two vocabularies, so neither can be checked against the other. Nothing in the code reads the brand document, and nothing in the brand document survives into the code.

**To close:** decide which one is the source of truth. If the tokens are, the brand document should be regenerated from them or retired. If the brand document is, the tokens need renaming to match it. What cannot stand is two files claiming the same authority.

## 02.3 · The icon button is decided three times

> **Concept:** design system · **Severity:** single-source-of-truth violation · **Status:** Fixed

The guide's definition of a design system is _"a button decided once, not forty times."_ There are 53 raw `<button>` elements across 40 files outside `components/ui/`, and the shared class string that styles them, `ICON_BUTTON`, is declared independently in three files:

- `components/features/admin/moderation-row-actions.tsx`
- `components/features/admin/user-row-actions.tsx`
- `components/features/dashboard/viewing-row.tsx`

The markup is disciplined — each carries `type="button"` and a specific `aria-label` — so this is not an accessibility problem. It is a maintenance one: 30 primitives exist in `components/ui/` and the icon button is not among them, so the same decision is re-made per feature folder and can drift silently.

**To close:** promote an `IconButton` primitive into `components/ui/`, and delete the three constants.

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

- **Colour contrast was not measured.** Establishing that the palette meets WCAG AA on every surface needs computed values, not a grep. Nine raw colour literals exist outside the token files, all in legitimate places — OG image generation, brand provider marks — but the token palette itself is unverified against contrast thresholds.
- **Keyboard operability was inferred from markup, not driven.** `data-table` reads as accessible and the primitives carry `focus-visible:`. Proving a full keyboard path through a console needs the interaction tests that stage 09 would write.
- **Screen-reader output was not heard.** Semantic structure was checked; announcement order and live-region behaviour were not.

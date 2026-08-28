# Frontend Audit — Stage 06

Frontend engineering, audited against `docs/from-idea-to-click.md` stage 06. Sixteen concepts, over the Next.js App Router application.

Each finding carries its own **Status** — `Open` or `Fixed`. The status line on each finding is the record; this header makes no claim about the set.

**Verdict:** the disciplines this project set out to enforce are largely enforced — no `any`, no stray logging, server state owned by one library, forms validated against the same schemas the API uses. Six findings, mostly places where a decision was made once and then not carried through: a URL that never updates, an image config nothing reads, three components that skip the hook layer.

---

## What came back clean

| Concept                           | Evidence                                                                                                                                                               |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **TypeScript**                    | Zero `any`, `as unknown`, `@ts-ignore` or `@ts-expect-error`. Unchecked `as` is a different story — see 06.6.                                                          |
| **Server state vs. client state** | One Zustand store, `auth-store.ts`, holding a token — not server data. TanStack Query owns everything that came from the API, as ADR 0005 says it should.              |
| **Data fetching & caching**       | 44 hooks over 24 API modules. Consoles consume hooks; the transport in `lib/api/client.ts` is not reached from a component.                                            |
| **Forms & validation**            | `signup-form.tsx` is representative: `safeParse` against the shared schema, per-field errors, a form-level error, and a pending flag. Controlled inputs throughout.    |
| **Hydration**                     | No `suppressHydrationWarning` anywhere. One `new Date()` in a render path — `footer.tsx` reading the current year, which can only disagree across a New Year boundary. |
| **Declarative rendering**         | No stray `console.*` in any component, hook or lib module. State drives render; nothing reaches for the DOM directly outside the primitives.                           |
| **Accessibility in code**         | Audited under stage 02 — no icon-only button without a name, `prefers-reduced-motion` honoured, `focus-visible` styling in 68 files. Not re-scored here.               |

---

## 06.1 · The URL holds nothing the user did

> **Concept:** routing · server state vs. client state · **Severity:** the largest single gap in this stage · **Status:** Fixed for `/search`; open for the portals

`useSearchParams` appears **zero times** in the application. Sixteen consoles hold their filters in `useState`, and so does the public search.

The guide's decision box for this is not ambiguous:

> Reach in this order: **URL** (shareable, survives refresh — filters, tabs, page number) → local component state → server-state library → global store.

`/search` is the sharp case because it is public. `app/(public)/search/page.tsx` reads `searchParams` on the server and seeds `q`, `type` and `min` into the initial filters — so a link **into** the page works. From the first interaction onward the URL is frozen:

```tsx
const [draft, setDraft] = useState<SearchFilters>(initialFilters);
const [applied, setApplied] = useState<SearchFilters>(initialFilters);
const [sort, setSort] = useState<SortValue>("newest");
const [view, setView] = useState<ViewMode>("grid");
const [page, setPage] = useState(1);
```

Four consequences, in order of how much they cost:

1. **A buyer cannot share what they are looking at.** They filter to four-bedroom homes in Carmel under $3M, send the link, and the recipient gets the unfiltered page.
2. **Refresh throws the search away.** So does following a listing and pressing back.
3. **The back button does not traverse filter changes** — it leaves the page entirely, because no history entry was ever pushed.
4. **Page 2 of the results does not exist to a crawler.** Pagination is client state, so there is no second URL to index on a public, SEO-bearing route.

The portals are the milder half of the same gap — an admin cannot send a colleague a link to the flagged-listings view they are looking at.

**Fixed for `/search`.** `lib/hooks/use-url-state.ts` is the shared hook: it takes a codec — `fromParams` / `toParams` — reads through `useSearchParams`, and writes with `router.push` so history entries accumulate. `readList`, `readNumber` and `readOneOf` ship with it so a caller validates rather than trusts what is in the bar.

`lib/utils/search-url.ts` is `/search`'s codec, and `SearchExperience` now holds no applied state of its own. Filters, sort, view and page all live in the URL; only the unapplied filter draft and the mobile panel toggle remain in `useState`, which is correct — an edit nobody has pressed Apply on is not a thing to share.

Three of the four consequences are closed:

1. **A filtered search is shareable.** `/search?q=Carmel&beds=3,4&price=1000000-2000000&sort=price-asc` reproduces the screen.
2. **Refresh and back both survive it**, and the back button now traverses filter changes rather than leaving the page, because each applied change pushes a history entry.
3. **Page 2 has a URL.** It is linkable and indexable as a URL.

The fourth is only half closed, and the finding overstated how cheap it was. **A crawler still needs JavaScript to see the results**, because the listings are fetched client-side through TanStack Query. `/search` is now a static shell that reads its parameters on the client. Making page 2 render server-side is a rendering-strategy change for the route, not a state-location change, and [ADR 0002](adr/0002-per-route-rendering-split.md) is where that argument belongs.

Two details worth recording. The codec keeps reading the legacy `min=` parameter the marketing pages emit and maps it to a price band, so existing inbound links still land filtered — an explicit `price=` wins if both are present. And defaults are omitted when writing: the default sort, the grid view and page 1 produce no query string at all, so a cleared search has a clean URL. `lib/utils/search-url.test.ts` covers both, plus the round trip and the rejection of unknown sorts, views, pages and price bands.

**Still open: the sixteen consoles.** Each still holds its filters in `useState`, so an admin cannot link a colleague to the flagged-listings view. The hook they need now exists and `/search` is the worked example; converting them is mechanical and was not attempted here, because sixteen portal routes is a lot of behaviour to change without driving any of it in a browser.

## 06.2 · The image config is dead for every property photo

> **Concept:** assets · **Severity:** the easiest large performance win, unclaimed · **Status:** Fixed

`next.config.ts` configures `images.remotePatterns` for five external hosts. Exactly one file imports `next/image` — `components/features/auth/brand-panel.tsx`, a decorative panel on the login screen.

Every other image in the product goes through `components/ui/image.tsx`, which renders a raw tag:

```tsx
return (
    <img ref={ref} className={cn(variants[variant], className)} {...props} />
);
```

So on a real-estate marketplace — where photography _is_ the product — no property image gets a `srcset`, a modern format, a computed size, or lazy loading by default. `loading="lazy"` is passed manually in four places out of far more call sites. The configuration that would have delivered all of it is read by nothing.

The guide flags this exact thing: images are _"usually the largest thing on the page and the easiest performance win."_

**The config was not merely dead — it was wrong.** Before rebuilding the primitive on it, the host list has to be right, and it was not. `remotePatterns` names six hosts: Unsplash, Pexels, Pixabay, GitHub avatars, jsDelivr and LoremFlickr. Those are the placeholder-imagery hosts in `lib/data/`. Every _real_ property photo is uploaded through `CloudinaryService`, which stores `result.secure_url` — a `res.cloudinary.com` URL, and that host was absent.

So the configuration was not just unread. Had anyone switched the primitive to `next/image` without checking, every uploaded photograph in the product would have thrown at runtime, while the seed images kept working — the failure would have looked fine in development and broken in production. `res.cloudinary.com` is now the first entry.

**Fixed.** `components/ui/image.tsx` is built on `next/image`. The variant API is unchanged and the four presets keep their exact class strings, each now carrying an intrinsic `width`/`height` and a `sizes` hint; `fill` is passed through for callers whose parent already establishes the box. A fifth variant, `bare`, contributes no classes and exists for images whose geometry belongs to the caller.

**The finding undercounted the problem.** It states that every image except the login panel goes through the primitive. Nine did not — they were raw `<img>` tags, and they were the large ones on the public marketing and search routes: the hero, the gallery tiles, the premier listing, the latest-sales carousel, the listing gallery thumbnails, the comparables thumbnails, the search result frames and the concierge artifact. Optimising the primitive alone would have left the photography that _is_ the product untouched. All nine now go through it, with per-site `sizes` and the hero marked `priority`.

**One raw `<img>` is deliberate.** `components/ui/avatar.tsx` still renders one. Avatar URLs come from user profiles and can point at hosts nobody has enumerated; under `next/image` an unlisted host is a runtime throw, not a broken image. At 32–64px the optimisation is worth little and the failure mode is worth avoiding.

## 06.3 · Three components reach past the hook layer

> **Concept:** data fetching · **Severity:** rule violation · **Status:** Fixed

`CLAUDE.md` states the chain: _"Endpoints in `lib/constants.ts`, transport in `lib/api/client.ts`, resource calls in `lib/api/<resource>.ts`, wrapped in hooks in `lib/hooks/use-<resource>.ts`. Components consume hooks — never call the client directly."_

Three client components call `authAPI` themselves:

- `components/features/auth/signup-form.tsx`
- `components/features/auth/reset-request-step.tsx`
- `components/features/auth/reset-confirm-step.tsx`

Sign-in was already routed through a shared hook in `8b1b457`; these three were left behind. The consequence is not cosmetic — each hand-rolls its own `pending` and error state, which is precisely the work a mutation hook exists to stop repeating.

Two other direct importers are correct and not counted: `app/(public)/page.tsx` and `footer-locality-index.tsx` are server components using the server API, and `search-experience.tsx` imports only a type.

**Fixed.** `lib/hooks/use-register.ts` and `lib/hooks/use-auth-recovery.ts` wrap the three calls in `useMutation`. Each returns the same four-part shape — `submit`, `pending`, `error`, `clearError` — so the three components no longer hand-roll a `pending` flag, an error string and a `try/finally` each; between them that removed three copies of the same eight lines.

The failure copy moved with it. `SIGN_UP_FAILED`, `REQUEST_FAILED` and `RESET_FAILED` were three constants in three components; they are now `AUTH_FAILURES` in `lib/config/auth-recovery.ts`, beside the other recovery copy, which is where rule 2 puts a string that appears in more than one place.

`grep -rn 'from "@/lib/api/auth"' components app` now returns nothing — no component imports the resource module directly.

## 06.4 · `data-table.tsx` is 675 lines

> **Concept:** components · **Severity:** rule violation, at one extreme and several mild ones · **Status:** Fixed at the extreme; the mild ones stand

The file rule is _"any file over ~150 lines gets split."_ The worst offenders:

| Lines | File                                                |
| ----: | --------------------------------------------------- |
|   675 | `components/patterns/data-table.tsx`                |
|   332 | `lib/data/agent-overview.ts`                        |
|   319 | `lib/enums/enums.ts`                                |
|   293 | `lib/data/admin-overview.ts`                        |
|   287 | `lib/data/dashboard-overview.ts`                    |
|   275 | `lib/data/alerts.ts`                                |
|   273 | `components/sections/admin/admin-users-console.tsx` |

`data-table.tsx` is 4.5× the limit and is the most reused component in the portals, which cuts both ways: it is the file most likely to need changing and the one hardest to change safely. It is also, per stage 02, the one carrying the accessibility contract for every table — `sr-only` caption, `scope="col"`, keyboard handling, row-reveal semantics. That behaviour deserves to be separable from the layout and sorting logic wrapped around it.

`lib/enums/enums.ts` at 319 lines is a different case: a flat list of enums is not complexity, and splitting it by domain would be churn. Worth an explicit exemption rather than a silent one.

**Fixed — `data-table.tsx` is 675 lines no longer.** It split along the four seams the finding named, plus two more that fell out:

| Lines | File                                               | Seam                                   |
| ----: | -------------------------------------------------- | -------------------------------------- |
|   186 | `components/patterns/data-table.tsx`               | composition and the prop surface       |
|   146 | `components/patterns/data-table-row.tsx`           | the row and its reveal control         |
|   142 | `lib/hooks/use-data-table.ts`                      | sorting, selection, paging, row-reveal |
|   128 | `components/patterns/data-table-head.tsx`          | header cells and sort affordances      |
|    97 | `components/patterns/data-table-body.tsx`          | row mapping and the empty state        |
|    81 | `components/patterns/data-table-types.ts`          | the public types and the class tokens  |
|    62 | `components/patterns/data-table-pager.tsx`         | pagination                             |
|    59 | `components/patterns/data-table-panel.tsx`         | the drawer reveal                      |
|    51 | `components/patterns/data-table-foot.tsx`          | column footers                         |
|    35 | `components/patterns/data-table-selection-bar.tsx` | bulk-selection bar                     |

The accessibility contract the finding flagged now sits where it can be read: the `sr-only` caption and table wiring in `data-table.tsx`, `scope="col"` and `aria-sort` in `data-table-head.tsx`, the row-reveal button's `aria-expanded` / `aria-controls` / `aria-haspopup` in `data-table-row.tsx`, and the arrow-key and Escape handling in `use-data-table.ts`. No call site changed — `data-table.tsx` re-exports every type it used to export.

The root is 186 lines rather than under 150. What remains is a 24-line destructure of a 23-prop API and the JSX that forwards it; splitting further would move props around without removing any.

**`enums.ts` is decided: exempt, in writing.** `.claude/CLAUDE.md` now records that the ~150-line rule targets complexity rather than length, that a flat list of enum literals and label maps has no seam to split on, and that any future exemption gets written down before it is taken.

**The five mild offenders stand**, and deliberately: `agent-overview.ts` (332), `admin-overview.ts` (293), `dashboard-overview.ts` (287), `alerts.ts` (275) and `admin-users-console.tsx` (273). Each is over the rule and none was touched. They are route-scoped derivations with no obvious seam, and splitting five of them in the same pass that rewrote the most reused component in the portals is how a refactor stops being reviewable. They are the next thing, not a closed thing.

## 06.5 · `en-US` is written into the code 24 times

> **Concept:** internationalisation · **Severity:** latent, and a hardcoding violation today · **Status:** Fixed

Every date and currency format hardcodes the locale:

```ts
`$${value.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
```

24 `toLocale*` call sites across `lib/utils/format.ts`, `lib/data/viewings.ts`, `lib/data/dashboard-journey.ts` and others. No i18n library is installed, which is a defensible product decision for a single-market luxury marketplace — but the locale string being repeated 24 times is a rule-2 violation regardless of whether the product is ever translated: _"copy that appears twice lives in `lib/constants.ts`."_

The guide's framing is about cost, not ideology: _"Retrofitting it is agony; leaving room for it is nearly free."_ Naming the locale once is the nearly-free half.

**Fixed.** `LOCALE` is a constant in `lib/constants.ts`, and `lib/utils/format.ts` holds the `Intl.NumberFormat` and `Intl.DateTimeFormat` instances built from it — constructed once at module scope rather than rebuilt on every call, which `toLocaleString` was doing. `formatClock`, `formatDayAndMonth`, `formatWeekdayAndTime` and `formatScaled` joined the existing `formatUsd` / `formatCount` / `formatThousands`.

`grep -rn 'toLocale' lib components app` returns nothing outside `format.ts` itself. Translating this product is now a one-line edit.

**The count was 25, not 24, and it hid a second duplication.** Five call sites carried their own `Intl.DateTimeFormatOptions` object — and two of them, in `to-thread.ts` and `to-viewing.ts`, were character-for-character identical, while `to-vip-client.ts`'s date options matched an inline object in `viewings.ts`. So the locale string was repeated 25 times and the _option sets_ were repeated too. Both are named once now.

The remaining `toLocale*`-shaped calls were bare — `value.toLocaleString()` with no locale at all, which silently follows the visitor's browser. Those were the inconsistent half: sq-ft figures and chart values would have formatted differently from prices on the same screen for a non-US visitor. They now go through `formatCount` and `formatUsd` like everything else.

## 06.6 · Twenty-one unchecked `as` assertions

> **Concept:** TypeScript · **Severity:** rule violation, three of them over untrusted input · **Status:** Open

Added after the first pass of this audit, which checked for `any`, `as unknown` and `@ts-ignore`, found none, and did not check for plain `as`. The global rule is wider than what was measured: _"No escape hatches in place of `any` either: no unchecked `as`."_ There are 21, and `middleware.ts` was not even in the scanned paths — it sits at the repo root, outside `lib/`, `components/` and `app/`.

Nine are reduce seeds — `{} as AdminConfig`, `{ all: listings.length } as Record<Filter, number>` — where the accumulator is genuinely incomplete until the fold finishes. Idiomatic, low risk, and closable with a typed initial value.

Three assert a shape over data the program did not produce, which is the category that actually bites:

| Site                               | Assertion                                   | What is being trusted          |
| ---------------------------------- | ------------------------------------------- | ------------------------------ |
| `middleware.ts:13`                 | `decoded as JwtPayload`                     | A token the user controls      |
| `lib/api/server.ts:35`             | `(await response.json()) as ApiEnvelope<T>` | An unvalidated HTTP response   |
| `lib/utils/to-config-change.ts:18` | `JSON.parse(changes) as ChangeDiff`         | Stored JSON of unknown vintage |

`lib/api/server.ts` is the pointed one, because the project rule says _"API responses are never loosely typed"_ and the codebase has Zod schemas for exactly this. The server fetch path asserts where the client path parses.

**To close:** parse the three external ones with the Zod schemas that already exist, and give the nine seeds typed initial values. The remaining nine are narrowings a type guard would express better, and can follow.

---

## What this stage did not cover

Bundle size, build output and code-splitting behaviour belong to stage 10 · Build & delivery. The build pipeline is Next's default with Turbopack and was not measured here.

Added after the fixes, because they bound what the fixes prove:

- **Nothing was verified in a browser.** Type-check, lint, 179 tests and a production build all pass, but no page was opened, no filter clicked, no image inspected for a `srcset`. The image work in particular changes layout mechanics — `fill` requires a positioned parent, and each of the nine conversions was checked by reading the parent's classes, not by looking at the result.
- **`next/image` was not verified against a live Cloudinary URL.** `res.cloudinary.com` is configured and the build passes, but no uploaded photograph was actually rendered through the optimiser.
- **The sixteen consoles and the five oversized `lib/data/` modules are untouched**, and are named as open in 06.1 and 06.4 rather than folded into a verdict.

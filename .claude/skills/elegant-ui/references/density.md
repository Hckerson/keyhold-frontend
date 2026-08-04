# Density & texture — the geometry spec

Padding tokens are necessary and **not sufficient**. A row can be `py-2.5 text-xs size-3` and still render at 76px carrying five data points. Density is a **geometry** and an **information shape**, not a padding scale. This file is the hard spec; SKILL.md holds the gate and the floors.

Paths below are relative to `components/` unless stated. This project has no `src/` directory.
Rows marked **(prescriptive)** describe what to build — nothing in the tree implements them yet.

## 1. Row geometry (hard)

| Surface                                    | Height            | Lines | Notes                                                                                                                                                                                                                                |
| ------------------------------------------ | ----------------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Table / list row, text-only                | `h-9` (36px)      | **1** | The default. **(prescriptive)** — `patterns/data-table.tsx` cells ship `px-3 py-2` (:442, :459, :476) with no stated row height, so the row is computed, not budgeted.                                                               |
| Table / list row with an identity artifact | `h-11` (44px)     | **1** | `Avatar size="sm"` is 32px — see the content-box rule below.                                                                                                                                                                         |
| Table header row                           | `h-9`             | 1     | `patterns/data-table.tsx:101` `headCell = "px-3 py-2.5 micro-label leading-none"` — the quiet mono treatment is correct; add the height. Never bold all-caps on a fill.                                                              |
| Toolbar above a table                      | `h-11 px-3 gap-2` | 1     | From `page-chrome.md`. **(prescriptive)** — `data-table.tsx:349` ships `flex flex-wrap … gap-2 border-b px-3 py-2`; `flex-wrap` is what lets it exceed the band.                                                                     |
| Stat band (N stats in one strip)           | `h-14`            | **1** | One bordered band with `divide-x divide-border`. The only `divide-x` in the tree is `sections/search/search-result-ledger.tsx:27` (`grid grid-cols-4 divide-x … rounded-md border`) — the closest shipped model; give it the height. |
| Metric / KPI card                          | `h-20`            | ≤3    | One band: value left, trend artifact right, delta + caption beneath. **(prescriptive)** — `ui/stat-card.tsx` stacks icon chip → value → delta → caption and has no height cap.                                                       |
| Card footer (pagination / count / action)  | `h-9`             | 1     | **(prescriptive)** — `patterns/data-table.tsx:103` `footCell = "px-3 py-2.5 text-xs font-medium tabular-nums"`.                                                                                                                      |
| Dense card body                            | `p-3`             | —     | `p-4` for the ONE hero tile. Never `p-5+`. Note `ui/card.tsx` bakes in `p-6` — build a standalone shell at row scale.                                                                                                                |

**Rows never grow to fit content. Content is chosen to fit the row.**

### The content-box rule

Row height is a **budget**, and cell `py-*` is subtracted from it. `h-11` minus `px-3 py-2` leaves a **28px** content box — smaller than a 32px `Avatar size="sm"` and smaller than `Button`'s 32px floor. So:

> **Artifact cells and action cells run `py-0` and center vertically** (`flex items-center`). The `py-2` cell padding applies to text cells only.

At `h-9` the content box under `py-2` is 20px — exactly one `text-xs` line, and already too tight for a `Badge size="sm"` (`px-2 py-0.5 text-xs`, ~20px). Badge cells run `py-0` too. `StatusBadge` is the leaner option at row scale: `text-[10px] leading-none` with `sm` = `gap-1 px-1.5 py-0.5` (`ui/status-badge.tsx:7,11`).

In a **grid-based pseudo-table** (a `grid-cols-[…]` row rather than a real `<tr>`) the budget is the row container's own `h-*` with no `py-*` at all — set the height, not the padding.

The row action button in `data-table.tsx:503` is already `grid size-5 place-items-center` — 20px, which fits `h-9` under `py-0`. Follow that, not a `Button`.

### Height floors you cannot design below

- `Button` — `sm` is `h-8 px-3 text-xs` (`ui/button.tsx:20`); `md` `h-10`, `lg` `h-12`. `h-8` is the floor. Unlike some starters `children` is **optional** (`ButtonProps` extends `ButtonHTMLAttributes` and adds `icon` + `isLoading`), so an icon-only button is legal — give it an `aria-label`.
- `Select` — `sm` is `h-8 px-2.5 text-xs` (`ui/forms/select.tsx:21`), `md` `h-9`. Options are `h-7` / `h-8` (:34-35). The trigger base is `flex w-full …` (:17), so **a Select in a toolbar must be wrapped in a sized box** (`<div className="w-44">`) — or override `w-*` through `className`, which works here because `cn` is `twMerge(clsx(…))`.
- `Input` — **no size axis.** One cva base (`ui/forms/input.tsx:6`) at `w-full … px-3 py-2 text-xs leading-4`, which computes to **34px** (16 leading + 16 padding + 2 border). Effectively `h-8.5`.
- `ui/forms/field-shell.tsx:24` is the shared label/error wrapper for every form control: `cn("flex w-full flex-col gap-1.5", className)`. It is one file, not per-control — the `w-full` and the 6px label gap come from there.
- **Inline editing is borderline at row scale, not free.** A 32–34px control inside an `h-11` row needs the cell at `py-0`; at `h-9` it does not fit. Prefer editing on the detail surface the row links to, and if you do inline-edit, state the `py-0` in the DENSITY line.
- `Checkbox` — fixed `size-4`, no size axis (`ui/forms/checkbox.tsx:21`).
- `Avatar` — `xs` 28px · `sm` 32px · `md` 40px · `lg` 48px · `xl` 64px (`ui/avatar.tsx:10-14`). In rows, only `xs` or `sm`.

## 2. Information shape — prose has ONE home

The largest density lever, and the one padding cannot reach.

- **A row carries no prose.** Descriptive text has exactly one home per card: a lede slot in the card header (`ui/panel.tsx:49` is that slot), or the detail surface the row links to. Never a second line inside every row. **`ui/action-row.tsx` currently ships the anti-pattern** — a `text-xs font-semibold` title (:32) with an optional `mt-0.5 text-xs` detail line under it (:41). That second line doubles the row for one datum; pass it only where the row is genuinely a settings toggle, never in a data table.
- **A label never sits above its value inside a row.** Either the label is the column header, or label and value sit side by side — `patterns/metric-list.tsx:15` (`flex items-center justify-between gap-3 py-2`) is the correct shape.
- **Row text is single-line, `truncate` + `max-w-*`.** The card's one prose slot is the only place text wraps; `line-clamp-2` belongs there.
- **Column floor — count the TYPE, not the JSX.** A table row renders **≥4 typed columns** when its type declares ≥4 renderable fields. **Relabeling the table as a `MetricList` is not a remedy.** A list card is legal only when the type genuinely declares fewer than 4, and the DENSITY line shows the arithmetic: `columns 3 of 3 typed fields — list, not table`. One field short ⇒ promote an existing enum to a labelled column via a tone lookup, or add the field.

Converting prose to columns is the move: `title` + a wrapped `detail` line becomes `title` + a typed dimension (status, owner, count, timestamp) in the next column.

`patterns/data-table.tsx:88-97` already encodes the row register correctly — every emphasis except `focal` sits at `text-xs` and separates by weight and colour (`identity` `font-medium`, `figure` `font-medium tabular-nums`, `muted` `text-text-secondary`). That is rank-by-weight, which is what a row is allowed. `focal` is `text-lg` and belongs to a card, not a repeated row.

## 3. Vertical rhythm ladder (application register)

`gap-4` is the **largest** gap in an application view, not its default.

| Between                            | Gap                                           |
| ---------------------------------- | --------------------------------------------- |
| Rows in a stack, elements in a row | `gap-2`                                       |
| Card to card inside a section      | `gap-3`                                       |
| Section to section                 | `gap-4`                                       |
| Section padding                    | `py-4` (`py-6` for the route's first section) |

`py-10` and `gap-8` are editorial values. They are how a dashboard becomes a scroll.

The named `.pad` / `.gap` classes in `styles/globals.css` are sized for the editorial register. In an application view state the step explicitly (`gap-2`, `p-3`) rather than defaulting to them.

## 4. The artifact catalogue (the TEXTURE floor's vocabulary)

Every row carries **≥1**; a view fields **≥3 distinct kinds bound to ≥3 DIFFERENT fields**; a single row carries **≤3**.

**Three rules that decide whether something counts:**

1. **Bound to a field.** An artifact that renders identically in every row is decoration.
2. **One field, one kind.** A status rail + a status badge + a status-tinted glyph is **one** kind, not three. Counting shapes instead of fields is how a flat screen passes.
3. **It must actually render.** A delta chip renders nothing on a null delta; `Sparkline` needs a non-empty `data` array and gates on `useMounted`. For a nullable field, name the fallback in the DENSITY line.

**Row controls are not artifacts.** The selection `Checkbox`, the row action button (`data-table.tsx:503`), the disclosure chevron encode interaction, not data — they count toward neither the ≥1 floor nor the ≤3 cap.

| Kind                 | Encodes          | Use                                                                                                                                                                                                                                              | Row size         |
| -------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------- |
| **Avatar**           | identity         | `Avatar size="sm"` from `@/components/ui/avatar`                                                                                                                                                                                                 | 32px (`xs` 28px) |
| **Thumbnail**        | the item itself  | `size-8 rounded-md object-cover` — `ui/image.tsx` wraps `next/image`; no row-scale thumbnail component yet                                                                                                                                       | 32px             |
| **Status dot**       | live state       | **`StatusDot`** — `patterns/status-dot.tsx`, `size-1.5 shrink-0 rounded-full` with a `toneClass` map over `success / warning / error / info / neutral`. Shipped; use it rather than hand-rolling a span.                                         | 6px              |
| **Status pill**      | enumerated state | **`StatusBadge`** — `ui/status-badge.tsx`, `text-[10px] leading-none` with its own `size-2.5` dot (:131). `Badge` is the heavier general pill (`px-3 py-1 text-xs`, `sm` `px-2 py-0.5`).                                                         | `size="sm"`      |
| **Meter / progress** | ratio to a cap   | **`ProgressBar`** — `ui/progress-bar.tsx`, `h-1.5 w-full` track + `toneFill` lookup over `ChartTone`, `value` clamped 0–100. Root is `w-full`, so give it a width: `<ProgressBar value={n} className="w-16" />` (twMerge resolves the conflict). | `h-1.5 w-16`     |
| **Ranked bar**       | share of max     | `ProgressBar` at a fixed width, or `ui/charts/bar-chart.tsx` at card scale                                                                                                                                                                       | inline           |
| **Delta chip**       | change vs prior  | `inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-xs font-medium tabular-nums` — **module-private inside `ui/stat-card.tsx:54`.** Lift it to `components/ui` before using it in a row. **Renders nothing when null.**              | `text-xs`        |
| **Icon chip**        | category         | `ui/stat-card.tsx:31` `grid size-7 shrink-0 place-items-center rounded-full border` — counts only when its glyph or tone varies per row                                                                                                          | 28px             |
| **Sparkline**        | trend shape      | `ui/charts/sparkline.tsx` — **card scale only**                                                                                                                                                                                                  | see below        |

**Sparkline constraint (hard).** `ui/charts/sparkline.tsx` is recharts (`AreaChart` + `Area` + `YAxis`) inside a `ResponsiveContainer`, which installs its own resize observer per instance, and the component gates on `useMounted` so it renders nothing on the server pass. Correct for a 4-tile KPI strip; **wrong for a 50-row table**. Its props are `data: number[]`, `tone?: ChartTone`, `height?: number` (default 32), `className` — note `data`, not `values`. For row-scale trend use `ProgressBar` or a hand-rolled inline `<svg>` polyline.

**`tabular-nums` is already pervasive** — 72 files, including `DataTable`'s figure emphasis, `MetricList`, `SummaryRow`, `Panel`'s count chip and `StatCard`'s delta. Assume it; don't introduce it as new.

**`.micro-label`** (`styles/globals.css:203`) is the shipped eyebrow: mono · 10px · weight 500 · `0.025em` tracking · uppercase · `text-text-muted`. Use the class; don't rebuild it from utilities.

## 5. What does not exist yet

Build cost is honest — do not cite these as if they were primitives.

| Missing                       | Cost           | Nearest                                                                         |
| ----------------------------- | -------------- | ------------------------------------------------------------------------------- |
| Row-scale thumbnail component | trivial-inline | `ui/image.tsx`                                                                  |
| Extracted delta chip          | trivial        | module-private in `ui/stat-card.tsx:54`                                         |
| Stat band at a stated height  | small          | `sections/search/search-result-ledger.tsx:27` — the only `divide-x` in the tree |
| Avatar stack / overlap group  | small          | `Avatar` single only                                                            |
| Severity rail (`h-6 w-0.5`)   | trivial-inline | none — `StatusDot` is the nearest state artifact                                |
| 3-bar priority glyph          | trivial-inline | none — `Sparkline` is time-series and mounts a container; wrong tool per row    |
| Row height as a stated `h-*`  | small          | every table row currently computes from `py-2`                                  |

Already shipped and often missed: **`patterns/data-table.tsx` wires `aria-sort` and a sort caret** (:138) — it is the only `aria-sort` in the tree, and it means a sortable header here is real, not implied. **`ui/charts/donut-chart.tsx` exists**, so a donut needs no new registration.

# Dashboard anatomy — the composition archetypes

Read before building any dashboard, admin route, analytics view, or panel-composed screen. These are the shapes first-class admin UI actually uses; picking the wrong one is why a dense route still scrolls. Geometry comes from `density.md`.

Paths are relative to `components/`; this project has no `src/`. `cn` is `@/lib/utils` and **is `twMerge(clsx(…))`** (`lib/utils/cn.ts`), with the `font-size` group extended over `text-h1…h6` / `text-label` / `text-caption` — so a `className` passed into a primitive **does** override a conflicting base utility, custom type tokens included. Charts are **recharts**, not echarts.

## The failure this prevents

A route built as *"section → section → section, each full width, each `gap-8` apart"* is a scroll, not a dashboard. Every archetype below exists to put more decided information inside one viewport.

---

## 1. Stat band — N stats in ONE band, not N cards

The highest-yield structure here. Five labelled stats fit in a single `h-14` band; the same five as cards cost four times the height and read as five unrelated things.

**Nearest shipped model:** `sections/search/search-result-ledger.tsx:27` — `<dl className="divide-border-light border-border-light bg-background-alt grid grid-cols-4 divide-x rounded-md border">`. That is the only `divide-x` in the tree and it is the right construction; what it lacks is a stated height.

A bordered band is a card for the depth floor's purposes, and it is not chrome — so it owes the floor two planes — take them at zero height cost by tinting the band and letting the value chips sit on the base surface:

```tsx
<div className="border-border-light bg-background-alt divide-border-light flex h-14 items-center divide-x rounded-lg border">
    {stats.map((stat) => (
        <div key={stat.id} className="flex min-w-0 flex-1 items-center gap-2 px-3">
            <stat.icon className="text-text-muted size-3 shrink-0" strokeWidth={1.5} aria-hidden />
            <span className="micro-label min-w-0 truncate">{stat.label}</span>
            <span className={cn("bg-background ml-auto rounded-md px-1.5 py-0.5 text-xs font-semibold tabular-nums", stat.tone)}>
                {stat.value}
            </span>
        </div>
    ))}
</div>
```

Use when the stats are **peers of one subject** (portfolio: total / listed / under-offer / sold / withdrawn). Use `patterns/stat-grid.tsx` only when each stat owns its own trend, timeframe or drill-through — a `StatGrid` of peer stats is the "N cards where a band belongs" fail.

**Color is the point:** `stat.tone` is a token lookup on state (`text-success`, `text-warning`, `text-error`) — the same shape as `StatusDot`'s `toneClass` and `ProgressBar`'s `toneFill`. A band of uniformly `text-text` numbers is the flat failure.

## 2. KPI card — value and trend share ONE band

Not label → value → delta stacked down the card. Value left, trend right **on the same row**, delta beneath.

`ui/stat-card.tsx` currently stacks: a `size-7` icon chip (:31), then the value, then the delta chip (:54), then a `mt-1 text-xs` caption (:73) — four bands, no height cap. Rebuild it as one `h-20` band, or wrap it.

**Read the cost before the code.** A trailing sparkline means the metric type carries a series. `Sparkline` takes `data: number[]` (**not** `values`), plus `tone`, `height` (default 32) and `className` — check the type has a series before promising one, and if it does not:

- A card whose only artifact is a **delta chip** renders **zero** artifacts when the delta is null. That is a texture-floor breach, not a judgement call.
- The delta chip is **module-private inside `stat-card.tsx`** — lift it to `components/ui` before reusing it.

If the type carries neither a series nor a ratio, don't ship the card: fold the metric into the stat band, or declare `VETO: TEXTURE — <metric> has no series or ratio — …`.

Give the sparkline a fixed-width flex sibling so `ResponsiveContainer` has something to measure:

```tsx
<span className="w-16 shrink-0 self-center">
    <Sparkline data={metric.trend} tone="accent" height={24} />
</span>
```

## 3. Chart card — the headline number lives INSIDE the chart header

A chart card carries its own focal readout and its range control in the header, then the plot, then the accessible table. `ui/panel.tsx` supplies the header band: title (`text-h6 font-display font-light`, :38), an optional count chip (`rounded-full px-2 py-0.5 text-xs tabular-nums`, :43), a description slot (:49) and a right-aligned `action` (:55).

**`Panel`'s `text-h6` title is a SECTION title, not a card title** — it sits in the register's title tier deliberately. A card nested *inside* a panel still titles at `text-xs font-semibold`.

Do not put a chart in a bare card with a title and nothing else — the plot has no readout to anchor it. Every chart here is recharts inside a `ResponsiveContainer` (`charts/bar-chart.tsx`, `column-chart.tsx`, `donut-chart.tsx`, `sparkline.tsx`); `BarChart` sizes itself from `data.length * rowHeight`, `ColumnChart` and `DonutChart` take explicit `height` / `size`.

Pair the plot with a table view for accessibility — there is no `ChartTable` primitive here, so build the disclosure yourself rather than citing one.

## 4. Table card — four bands, in order

```
toolbar    h-11  search + filter Selects + "More" · right-aligned actions (Export / New)
header     h-9   quiet mono column labels (.micro-label), sort caret if sortable
rows       h-9 / h-11, one line each, ≥4 typed columns
footer     h-9   pagination left · "Showing 1–8 of 50" right
```

`patterns/data-table.tsx` implements most of this and is the thing to extend, not replace:

- Its toolbar band (:349) is `flex flex-wrap … gap-2 border-b px-3 py-2` — **`flex-wrap` is what lets it exceed `h-11`.** State the height.
- Its head cell (:101) is `px-3 py-2.5 micro-label leading-none` — the correct quiet treatment; give the `<tr>` `h-9`.
- Its body is `divide-y divide-border` (:420) with cells at `px-3 py-2` (:442, :459, :476) — the row height is computed, not budgeted. Naming `h-9` in your DENSITY line requires putting `h-9` on the row.
- Its emphasis map (:88-97) is the row register done right: everything at `text-xs`, separated by weight and colour; `focal` (`text-lg`) belongs to a card, not a repeated row.
- **Sorting is real here** — `aria-sort` + a caret at :138, the only `aria-sort` in the tree. Use it; never imply a sortable header that isn't wired.
- Filter controls are `Select` **wrapped in a sized box** (`<div className="w-44">`) or given `className="w-44"` — its trigger base is `w-full` (`ui/forms/select.tsx:17`), and twMerge will resolve the override here.
- The row count line is not optional. A table without "showing X of Y" hides its own scale.
- `ui/pagination.tsx:56` ships `px-3 py-2 text-sm` — `text-sm` is above the 12px field. Demote it to `text-xs` when you touch that surface.

## 5. List / rail card — header, rows, footer action

```
header   Panel title + count chip on the right
rows     divide-y, one line, each with its artifact
footer   a single "View all →" action
```

`patterns/metric-list.tsx` is the shipped row shape: `<dl className="divide-border divide-y">` with rows at `flex items-center justify-between gap-3 py-2`, `dt` `text-xs text-text-secondary`, `dd` `text-xs font-semibold tabular-nums`. It carries **no artifact** — add one (`StatusDot`, `ProgressBar`) before using it where the data has state.

`Panel` has **no footer band** — its `action` slot is in the header (:55). A "View all" footer is yours to build at `h-9`.

A list card is the correct downgrade **only** when the type declares fewer than 4 renderable fields — it is not a way to duck the column floor.

## 6. Ranked set — hero tile + condensed rail

When the typed shape declares rank (`featured`, `rank`, a fixed order), **a table row cannot express it** — span, scale jump and internal-layout changes are all unavailable inside a fixed-height row, and recoloring one row is the cosmetic fail.

Pull the ranked item out: a hero tile carrying the rank (larger span, an added data point, its own internal layout) above a condensed `DataTable` or `MetricList` of the peers. Rank lives in the tile, never in a special row.

## 7. Three-zone shell

```
┌────────┬───────────────────────────────┬──────────────┐
│  rail  │  main column                  │ context rail │
│  w-52  │  flex-1 min-w-0               │  w-72/w-80   │
│  w-12  │  stat band                    │  activity    │
│ collapsed  chart + table               │  queues      │
└────────┴───────────────────────────────┴──────────────┘
```

**Already shipped.** `app/admin/layout.tsx` composes `<Sidebar>` + a `flex-1 overflow-auto` main with a sticky `<Topbar>`; `layout/sidebar.tsx:83-84` is `bg-sidebar border-sidebar-border h-screen shrink-0 border-r` at **`w-52` expanded / `w-12` collapsed** (not `w-60`/`w-14` — use this project's numbers). `layout/topbar.tsx:215` is `sticky top-0 z-40 border-b border-border-dark bg-background`, which is the application-register bar from `page-chrome.md` done correctly.

`sections/admin/admin-overview-main.tsx` (`space-y-3 lg:col-span-2`) and `admin-overview-rail.tsx` (`space-y-3`) are the correct pattern: the context rail is a **peer of the main column for the whole route**, not an `xl:col-span-1` inside one section. Stacking full-width sections and splitting 2/3–1/3 inside only one of them wastes the right third of every other section. Their `space-y-3` matches the card-to-card step in the rhythm ladder.

**Never dark rail + dark bar.** Chrome is exempt from both floors.

Nav grouping, above ~7 items: section labels (`.micro-label`), children indented under an L-connector (`border-l border-border` on the child list) rather than by padding alone — `layout/sidebar-nav.tsx` owns this.

---

## Choosing

| The data is | Build |
| --- | --- |
| peer stats of one subject | stat band (1) |
| metrics with independent series | KPI cards with trailing sparklines (2) — check the type has one |
| one series over time | chart card with embedded readout (3) |
| an equal-rank set, type declares ≥4 fields | table card (4) — extend `DataTable` |
| an equal-rank set, type declares <4 fields | list card (5) |
| a set whose type declares rank | hero tile + condensed rail (6) |
| a route with ambient/streaming context | three-zone shell (7) |

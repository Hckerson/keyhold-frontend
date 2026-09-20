# Design-OS Conformance — Re-audit

**Frontend re-audit · first pass 20 September 2026 · revalidated the same day**

The 5 September audit found thirteen routes built but short of their named modules, two ship-blocking defects, two routes never built, and seven links that resolved to the 404 page. Its tally was _15 to spec · 13 modules short · 2 never built · 8 beyond spec · 7 dead links_.

That audit lives in [DESIGN_OS_CONFORMANCE.html](DESIGN_OS_CONFORMANCE.html), which was dropped in `c9f4a61` alongside the rendered `DEPLOYMENT.html` and restored from that commit's parent. The deletion looks like collateral: the other rendered pages each had a markdown twin, so dropping them lost nothing, but the ledger was authored as HTML and had no twin. It is the dated record of what each audit found, and it is append-only — three remediation sections now, 8 through 20 September.

Every verdict below comes from reading code, traced to a file and a line.

|            |                                 |
| ---------- | ------------------------------- |
| **13**     | Routes re-verified closed       |
| **47**     | Routes, zero dead links         |
| **6 of 7** | First-pass defects since closed |
| **1**      | Open item                       |

---

## The bucket is closed

All thirteen, plus both never-built routes. Every section-level gap is now closed or ratified.

| Route                 | Blueprint                    | What is there now                                                                                                         |
| --------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `/`                   | Page 1 · Latest Sales        | A MapLibre map of sold listings sits above the card row; coordinates pass through `toLatestSale`.                         |
| `/search`             | Page 2 module 5              | `VIEW_MODES` is `grid \| list \| map`, URL-persisted, and the map branch renders.                                         |
| `/listing/[id]`       | Page 3 module 5 · Section 10 | Map, POI markers and a four-way toggle that doubles as the colour key. Places come from live Overpass data, not fixtures. |
| `/map`                | Page 4 · Map View            | Built. One of the two routes that had never existed.                                                                      |
| `/signup`             | Page 5                       | OTP step, password strength meter, and Google + Facebook sign-in reaching a real backend route.                           |
| `/verify-email`       | Phase 3 sitemap              | A real route, not an inline step. The second never-built route.                                                           |
| `/dashboard`          | Page 8 modules 4 & 5         | New Alerts fed by live notifications; Quick Links built from route constants.                                             |
| `/dashboard/messages` | Sections 23 & 25             | Composer attach reaches `POST /messages/:id/attachments`; documents render in-thread and collect in a rail panel.         |
| `/agent`              | Page 15                      | Quick links — one shared component across all three overview rails.                                                       |
| `/agent/leads`        | Page 17                      | hot / warm / cold scored from offers, viewings, unread and recency. Surfaced in table, hero and rail.                     |
| `/agent/pipeline`     | Page 18 · Section 42         | Native HTML5 drag plus a per-deal modal. Two drops mutate a real offer; every other drop is refused by name.              |
| `/agent/calendar`     | Page 19                      | Create event writes a real viewing. Google push is one-way, fire-and-log, and now reports its own failures.               |
| `/admin`              | Page 20 module 7             | Quick Actions, all four spec entries in spec order.                                                                       |
| `/admin/settings`     | Page 27 modules 3, 5, 6, 7   | Reporting Timezone as a real select; all eight policy toggles in two groups; Maintenance Panel on real endpoints.         |

---

## Ship-blockers

Both resolved, and the dead-link sweep went wider than the original seven.

**01 — Seven linked-but-nonexistent routes, closed.** All seven exist. The sweep did not stop there: every internal href in the chrome, the nav configs and the route constants was extracted and checked against the route tree. **47 routes, zero dead internal links.** Social links are external, contact routes are `mailto:`, and `JOURNAL_ENTRIES` is empty, so no `/blog/<slug>` is ever rendered.

**02 — The orphaned Quick Actions panel, closed.** The dead file is gone, replaced by a decomposed list/row pair imported by all three overview rails. The second orphan closed with it: `PolicyReachMeter` is now rendered, and the policy table's header and cell counts match at five each — the 5-vs-4 mismatch is gone.

---

## Defects found, and since closed

The first pass of this re-audit raised seven. Six were fixed between that pass and the revalidation, so each is recorded here with what actually closed it rather than deleted.

### 1 · Milestone upload did no screening — closed

The raw `<input type="file">` in `milestone-row.tsx` is still there, but it is now only a trigger. Screening moved up into the hook: `use-deal-milestones.ts` `onAttach` calls `screenFiles([file], DOCUMENT_UPLOAD.accept, DOCUMENT_UPLOAD.maxBytes)` and surfaces the first rejection before anything reaches the wire. The shared config was renamed `MESSAGE_ATTACHMENTS` → `DOCUMENT_UPLOAD` in the process.

Putting the gate in the hook rather than the component is the better placement — every consumer of the hook inherits it.

### 2 · A failed calendar push was invisible to the agent — closed

`CalendarConnection` gained `lastSyncAt`, `lastSyncError` and `lastSyncErrorAt`. `calendar.service.ts` writes them on every push outcome, and `status()` returns `lastSyncedAt` plus `lastFailedAt`. Both are in `calendarStatusSchema`, and `calendar-sync-panel.tsx` derives `failing`, switches its `StatusDot` to `error`, shows the failure date, and swaps in a `failingLede`.

The push is still correctly fire-and-log — Google still cannot fail a viewing — but the agent is no longer told everything is fine when it is not.

### 3 · Apple was a trap that armed itself — closed

`AppleMark` has been removed from `provider-marks.tsx` entirely. The gate is now self-enforcing: listing `apple` in `NEXT_PUBLIC_AUTH_PROVIDERS` renders nothing, because the mark no longer exists to match.

### 4 · Section 21 — appraisal value and note were unreachable — closed

`milestone-detail-modal.tsx` now sends both. `appraisedValue` is parsed from digits and included only when the milestone is a valued kind; `note` is trimmed and sent alongside. The last section-level gap.

### 5 · The map was not viewport-driven — closed

`south` / `north` / `west` / `east` are in the property query schema, and `map-experience.tsx` holds a `bounds` state, spreads it into the query, and offers a reset control when a bound is applied. The frontend half of [ADR 0015](adr/0015-map-surfaces-wait-on-coordinates.md) is wired.

### 6 · Copy that overstated the system — closed

`AuditActionType` now carries `SETTINGS_UPDATED`, and `audit-log.interceptor.ts:150` maps the settings endpoint onto it. The restore-defaults confirmation's claim that the change is recorded in the change log is now true.

---

## Still open

### Seeded coordinates are synthetic — disclosed, not resolved

`seed-data/coordinates.ts` still hash-jitters each property ±0.012° around eight hardcoded locality centres; `SPREAD_DEGREES` is unchanged. These remain pins claiming a house sits somewhere it does not.

What changed is honesty rather than accuracy. `backfill-coordinates.ts` now opens with a notice — _"These coordinates are approximations around a locality centre, not geocoded addresses. Do not run this against a database real buyers will see"_ — and reports "Placed N properties approximately."

That is the right interim move, and it does not discharge the requirement. Geocoding is still owed before any of this reaches a real buyer.

---

## Where the record drifted from the code

`design-os/INDEX/RATIFIED_DIVERGENCES.md` still describes the privacy page as naming **SendGrid** among its processors. The page has said "Our SMTP email provider" since the SMTP migration. The page is right; the note about it is stale.

This was not corrected in place — `design-os/` is append-only, so the fix belongs in a new entry rather than a rewrite of the old one.

A second drift item from the first pass — the conformance ledger's remediation strip reading "3 Still short" — was **withdrawn on revalidation**. That strip sits inside the ledger's 8 September section, superseded by the sections dated the 17th and 20th, whose closing footer reads "8 of 8 section gaps closed". A dated entry in an append-only chronology is not a stale claim; reading it as one was the error.

---

## Method, and what it does not cover

Five independent read-only sweeps — public and map, auth and buyer, agent, admin and offers, and a ship-blocker pass — each reporting one verdict per named gap with file and line evidence. A second pass then revalidated all nine first-pass findings against disk.

> **Nothing was built, type-checked, linted or tested for either pass.** Every verdict above comes from reading code. Runtime behaviour, and any href computed at runtime, is outside what a static read can prove.

---

**13 routes closed · 47 routes with 0 dead links · 6 of 7 defects closed · 1 open item · 1 stale record**

# Design-OS Conformance — Re-audit

**Frontend re-audit · 20 September 2026 · companion to [DESIGN_OS_CONFORMANCE.html](DESIGN_OS_CONFORMANCE.html)**

The original audit found thirteen routes built but short of their named modules, two ship-blocking defects, and seven links that resolved to the 404 page. This is a fresh read of the tree against that list — five independent sweeps, every verdict traced to a file and a line rather than to the ledger's own prose.

|        |                           |
| ------ | ------------------------- |
| **13** | Routes re-verified closed |
| **47** | Routes, zero dead links   |
| **2**  | Sections still partial    |
| **7**  | Open defects              |

---

## The bucket is closed

All thirteen, plus both never-built routes. Six of the eight section-level gaps are closed or ratified.

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
| `/agent/calendar`     | Page 19                      | Create event writes a real viewing. Google push is one-way and fire-and-log.                                              |
| `/admin`              | Page 20 module 7             | Quick Actions, all four spec entries in spec order.                                                                       |
| `/admin/settings`     | Page 27 modules 3, 5, 6, 7   | Reporting Timezone as a real select; all eight policy toggles in two groups; Maintenance Panel on real endpoints.         |

---

## Ship-blockers

Both resolved, and the dead-link sweep went wider than the original seven.

**01 — Seven linked-but-nonexistent routes, closed.** All seven exist. The sweep did not stop there: every internal href in the chrome, the nav configs and the route constants was extracted and checked against the route tree. **47 routes, zero dead internal links.** Social links are external, contact routes are `mailto:`, and `JOURNAL_ENTRIES` is empty, so no `/blog/<slug>` is ever rendered.

**02 — The orphaned Quick Actions panel, closed.** The dead file is gone, replaced by a decomposed list/row pair imported by all three overview rails. The second orphan closed with it: `PolicyReachMeter` is now rendered, and the policy table's header and cell counts match at five each — the 5-vs-4 mismatch is gone.

---

## Open defects

Ranked by what a real person hits, not by how hard they are to fix.

### 1 · Milestone upload does no screening — **High**

`components/features/offers/milestone-row.tsx:112-122` imports `MESSAGE_ATTACHMENTS` only for the `accept` attribute — a picker hint the user defeats by switching the filter. There is no `screenFiles` call, no check against the 10 MiB limit, and no progress.

A buyer attaching a 25 MB inspection report watches it upload, cross the wire, and fail at the server as a generic error. Every other upload site routes through the `FileUpload` primitive or at least calls `screenFiles`; the helpers are imported one line away.

### 2 · A failed calendar push is invisible to the agent — **High**

`calendar.service.ts:199-203` catches and logs, and is invoked as `void this.calendarService.pushViewing(...)`. That part is right — Google must never be able to fail a viewing.

But nothing surfaces the failure, while the panel keeps saying confirmed viewings are written to your calendar. An agent trusts a calendar that silently is not syncing. Quiet degradation where a visible failure was available.

### 3 · Apple is a trap that arms itself — **Medium**

`AppleMark` is still in `PROVIDER_MARKS`, but `PROVIDER_BY_SLUG` carries only Google and Facebook. Listing `apple` in `NEXT_PUBLIC_AUTH_PROVIDERS` renders a real button that 404s. ADR 0020 documents the discipline; the code does not enforce it. Dropping the mark would make the gate self-enforcing.

### 4 · Section 21 — appraisal value and note are unreachable — **Medium**

Both exist in the Prisma model, the DTO, the service and `updateMilestoneSchema`. Neither is ever sent: `use-deal-milestones.ts` posts only `kind`, `status` and `dueAt`, and no input renders them. The blueprint's "appraisal … value" cannot be entered. The only section gap still open.

### 5 · The map is not viewport-driven — **Medium**

The bounding-box filter is built and correct, including antimeridian wrap — but it lives on `GET /properties`, and no frontend caller ever sends it. `MapExperience` fetches a flat `limit: 200`; panning and zooming do not re-query, and there is no "search this area". The backend half of [ADR 0015](adr/0015-map-surfaces-wait-on-coordinates.md) landed; the frontend half was never wired.

### 6 · Seeded coordinates are synthetic — **Medium**

`seed-data/coordinates.ts` hash-jitters each property ±0.012° around eight hardcoded locality centres. Fine as demo data — but these are pins claiming a house sits somewhere it does not. Geocode before this is in front of real buyers.

### 7 · Copy that overstates the system — **Low**

The restore-defaults confirmation says the change is "recorded against your account in the change log". It is not: `mapEndpointToAction` has no `/settings` branch and `AuditActionType` has no settings member. The change-log rail shows generic audit rows, never settings edits.

---

## Where the record drifted from the code

**01 —** `design-os/INDEX/RATIFIED_DIVERGENCES.md` still describes the privacy page as naming **SendGrid** among its processors. The page has said "Our SMTP email provider" since the SMTP migration. The page is right; the note about it is stale.

**02 —** The conformance ledger's own remediation strip still reads **"3 Still short"** — the three map surfaces. This re-audit finds all three closed.

Neither was corrected in place. `design-os/` is append-only, and the conformance file is dated evidence of what the 5 September audit found; rewriting either would destroy the record rather than update it.

---

## Method, and what it does not cover

Five independent read-only sweeps — public and map, auth and buyer, agent, admin and offers, and a ship-blocker pass — each reporting one verdict per named gap with file and line evidence.

> **Nothing was built, type-checked, linted or tested for this pass.** Every verdict above comes from reading code. Runtime behaviour, and any href computed at runtime, is outside what a static read can prove.

---

**13 routes closed · 2 sections partial · 47 routes with 0 dead links · 7 open defects · 2 stale records**

---

## Remediation — 20 September 2026

All seven open defects are closed. The findings above are left as they were written; this section records what changed, not a revision of what was found.

### 1 · Milestone upload screening — closed

Screening moved to the hook that owns the mutation. `useDealMilestones.onAttach` now runs `screenFiles` against the shared limit and returns a `rejected` reason instead of firing the request; `MilestonePanel` renders it. `accept` and `maxBytes` were lifted out of `MESSAGE_ATTACHMENTS` into `lib/config/uploads.ts`, which the message config spreads — one declaration mirroring the backend's `MAX_UPLOAD_BYTES`, and no offers component importing a messaging constant.

A 25 MB report is now refused in the browser, by name, before it crosses the wire.

**Not fixed:** upload progress. `lib/api/client.ts` is `fetch`-based and `fetch` exposes no upload-progress events, so a determinate bar needs a transport change. The row stays disabled while the attach is in flight.

### 2 · Failed calendar push — closed

`CalendarConnection` gained `lastSyncAt`, `lastSyncError` and `lastSyncErrorAt` (migration `0014_calendar_sync_outcome`). `pushViewing` and `removeViewing` record the outcome through `recordSync`, which is itself wrapped so recording can never fail a viewing — the fire-and-log guarantee in ADR 0020 is unchanged.

`GET /calendar/google` exposes `lastSyncedAt` and `lastFailedAt` as timestamps only; the upstream error text stays server-side for support and never reaches the browser. When the latest attempt failed, `CalendarSyncPanel` drops the "Confirmed viewings are written to your calendar" lede for "Confirmed viewings are not reaching your calendar", turns the status dot red, and dates both the last success and the failure.

### 3 · Apple — closed

`AppleMark` and the `apple` entries in `PROVIDER_MARKS` and `PROVIDER_LABELS` are gone. `SocialAuthRow` already filtered on `provider in PROVIDER_MARKS`, so listing `apple` in `NEXT_PUBLIC_AUTH_PROVIDERS` is now inert rather than a button that 404s. The gate enforces itself; ADR 0020's reasoning stands, only its "the mark still renders" line is superseded.

### 4 · Section 21 appraisal value and note — closed

`MILESTONE_COPY` already carried `appraisedValue` and `note` unused. A `MilestoneDetailModal` opens from the milestone label — the row was at capacity, and the label-as-trigger matches the "click any term to expand" idiom on the same page. Fields are validated by `updateMilestoneSchema` before `onSaveDetails` sends them, and `MILESTONE_NOTE_LIMIT` is exported from the schema so the field's `maxLength` and the validator cannot drift.

Appraised value renders for the `APPRAISAL` milestone only. The schema permits it on any kind, but the blueprint asks for an appraisal value and a money field on "Closing" is noise.

The five threaded milestone props collapsed into one `DealMilestoneControls` bundle in `lib/types/offer.ts`, so this section and the next cost no new prop drilling.

### 5 · Viewport-driven map — closed

`propertyQuerySchema` gained the four bounding-box edges the DTO already accepted. `MapCanvas` reports its viewport on `moveend`; `SearchResultsMap` renders a "Search this area" control on a surface chip at top-left, clear of the navigation control and the attribution. `MapExperience` holds the bounds, feeds them to the query, and drops `fit` once the user is driving so results stop fighting the pan.

The search is deliberately user-committed rather than refetch-on-pan. A "Clear area" control appears once bounds are applied, and the map keeps rendering when an area returns nothing — otherwise the empty state would replace the only surface that can clear the filter.

`useProperties` now uses `keepPreviousData`. Without it every area search unmounted the map into a skeleton and threw away the viewport the user had just chosen. It also stops the flicker on `/search` pagination.

### 6 · Seeded coordinates — closed as an honest gap

`seed-steps/catalog.ts` no longer writes coordinates. Seeded properties have none, so the map surfaces report "N without a location are not shown" instead of dropping a pin on a house that is not there. `hasCoordinates` already guarded every pin derivation, so the absence degrades cleanly everywhere.

`db:backfill-coordinates` still exists as the deliberate opt-in for demo pins, and now prints what it is doing: the coordinates are approximations around a locality centre, not geocoded addresses. Real geocoding remains open and needs a decision about an outbound service.

### 7 · Change-log copy — closed by making the claim true

Rather than striking the sentence, the audit trail now exists. `AuditActionType` gained `SETTINGS_UPDATED` (migration `0015_settings_audit_action`), mirrored into `lib/enums/enums.ts` — mandatory, since `lib/validations/audit-log.ts` feeds that array into `z.enum` and an unmirrored member would fail the response parse. `pnpm enums:check` passes.

`mapEndpointToAction` maps `/settings` to `SETTINGS_UPDATED` and `extractResourceType` returns `SETTING`. The interceptor is registered as a global `APP_INTERCEPTOR` and records `actorId` from the request user, so a restore-defaults really is recorded against the admin's account, and the change-log rail — which filters nothing — shows it.

### Before this ships

Two migrations are written but **not applied**: `0014_calendar_sync_outcome` and `0015_settings_audit_action`. Both are additive — three nullable columns and one new enum member — and neither rewrites an existing row. Run `prisma migrate deploy`, then regenerate the Prisma client so `lastSyncAt` and `SETTINGS_UPDATED` exist in the generated types; the calendar service and the audit interceptor will not compile against the previous client.

`ALTER TYPE ... ADD VALUE` inside a transaction needs PostgreSQL 12 or later. The new value is not read in the same migration, so no separate step is required.

Nothing here was built, type-checked or tested. `pnpm enums:check` is the one gate that was run, because it guards the enum mirror this pass changed.

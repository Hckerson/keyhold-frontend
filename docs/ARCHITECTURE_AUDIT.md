# Architecture Audit — Stage 03

System architecture, audited against `docs/from-idea-to-click.md` stage 03. Eight concepts, both halves of the codebase.

Each finding carries its own **Status** — `Open` or `Fixed`. The status line on each finding is the record; this header makes no claim about the set.

**Verdict:** the architecture holds. Six concepts clean, two findings — and one of them is the stage's own artifact, which was deleted.

**Both findings are now fixed.** 03.2 was reported fixed once on an incomplete scan and had to be reopened; the correction is recorded in the finding itself rather than smoothed over here.

---

## What came back clean

| Concept                   | Evidence                                                                                                                                                                |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Layered architecture**  | No controller imports a repository, across 22 modules and 113 routes. The `Controller → Service → Repository` direction holds everywhere it was checked.                |
| **API design**            | All 113 routes are resource-shaped. No verb appears in a path — no `/createUser`, no `/doRefund`. The guide's "start with REST" verdict is honoured literally.          |
| **Rendering strategy**    | `app/(public)/` server-renders. The only client components under it are `error.tsx` boundaries, which React requires to be client. The split is per-route, as designed. |
| **Statelessness**         | No module-level mutable state in any service — no in-process `Map`, `Set` or array accumulating between requests. The app can be duplicated behind a balancer.          |
| **Monolith vs. services** | One deployable Nest app against one Postgres. No distributed-systems problem has been taken on in exchange for a code-organisation one.                                 |
| **Domain modelling**      | 22 backend modules, 28 repositories, 23 frontend API resources. Repositories are finer-grained than modules by design — one module may touch several models.            |

---

## 03.1 · The stage's own artifact was deleted

> **Concept:** ADR · **Severity:** the record is gone · **Status:** Fixed

Commit `7a2857a` — _"docs: retire the superseded build, setup and ADR notes"_ — removed the entire decision record:

```
docs/adr/0001-rest-over-graphql.md          -22
docs/adr/0002-per-route-rendering-split.md  -24
docs/adr/0003-repository-layer.md           -24
docs/adr/0004-mock-data-first-frontend.md   -28
docs/adr/0005-query-owns-server-state.md    -26
docs/adr/README.md                          -38
```

`docs/adr/` no longer exists. `.claude/CLAUDE.md` still mandates it in two places — the folder-structure table lists `adr` under `/docs`, and the file rules say _"A decision that is expensive to reverse gets a record in `docs/adr/` before the code that assumes it."_

The word "superseded" is doing a lot of work in that commit message. Of the five records, **four describe decisions the code still rests on today**, and this very audit confirmed each of them independently:

| Deleted record               | Still true?                                        |
| ---------------------------- | -------------------------------------------------- |
| 0001 REST over GraphQL       | Yes — 113 resource-shaped routes                   |
| 0002 Per-route rendering     | Yes — public server-renders, portals are client    |
| 0003 Repository layer        | Yes, and now partially breached — see 03.2         |
| 0004 Mock-data-first         | Genuinely superseded — every route reads live data |
| 0005 Query owns server state | Yes — TanStack Query throughout                    |

Only 0004 had actually expired. The other four were load-bearing documentation of live decisions, and deleting them removed the answer to "what were we assuming?" for decisions nobody has revisited.

Two expensive decisions made since have no record at all:

- **Money columns moved from `Float` to `Decimal(14, 2)`** — currently mid-flight, with `common/money.ts` written to explain the consequences in a doc comment because there is no ADR to hold them.
- **The escrow release authorisation model** — buyer or admin at any time, seller only after the inspection window closes. That asymmetry is a real product decision and it lives only in an `if` statement and, now, in `MONEY_PATH.md` sections 07–09.

**Fixed.** All five records and the README were restored from `7a2857a^`. The README settles how: _"Records are immutable once merged. A decision that changes gets a new record that supersedes the old one; the old file stays, with its status updated."_ The deletion broke the ADRs' own rule, so 0004 was restored too, with its status set to superseded rather than left deleted. Four new records were written: [0006](adr/0006-data-holds-route-selectors.md) supersedes 0004 and records what `lib/data/` actually became, [0007](adr/0007-money-is-decimal.md) the Decimal migration, [0008](adr/0008-escrow-release-authorisation.md) the release authorisation model, and [0009](adr/0009-repositories-wrap-aggregate.md) the rule change that closes 03.2.

## 03.2 · Two services reach past the repository layer

> **Concept:** layered architecture · **Severity:** rule breach, with a cause worth fixing first · **Status:** Fixed — after being reported fixed prematurely once

`backend/CLAUDE.md` rule 2 is unambiguous: _"Data access lives only in `common/repos/[domain].repo.ts`. Nothing else touches Prisma. Ever."_ Two services inject `PrismaService` and query it directly:

- `src/modules/properties/properties.service.ts` — `this.prisma.propertyImage.aggregate(...)` and `this.prisma.propertyImage.create(...)`
- `src/modules/reviews/reviews.service.ts` — `this.prisma.review.aggregate(...)`

The interesting part is **why**. The same file's Ironclad Rule permits repositories to wrap exactly ten Prisma methods — `findUnique`, `findFirst`, `findMany`, `create`, `createMany`, `update`, `updateMany`, `delete`, `deleteMany`, `count` — and forbids custom methods. `aggregate` is not on that list, and no repository exposes it.

So the rule that forbids custom repository methods forces a breach of the rule that forbids direct Prisma access. The code resolved that conflict silently, in the direction of the stricter-sounding rule, and the layer boundary is where it gave way. This is not two developers being careless; it is two rules disagreeing.

One of the three calls has no such excuse: `propertyImage.create` is an allowed method. It bypasses the layer only because no `PropertyImageRepo` exists.

**First close, and why it did not hold.** `aggregate` joined the allowed set as an eleventh method, recorded in [0009](adr/0009-repositories-wrap-aggregate.md) and written into `backend/CLAUDE.md`. `PropertyImageRepo` was added and registered, `aggregate` was added to `ReviewRepo`, and all three call sites now went through repositories. The finding then claimed: _"No service imports `PrismaService` anywhere in the codebase."_

That claim was false when it was written. It rested on a scan of `src/modules/`, and three sites sat outside it:

- `src/common/services/stats/stats.service.ts` — **25** direct Prisma calls across eight models, larger than the two breaches the finding was opened for. It used `count`, `findMany`, `aggregate` and `groupBy`; only `groupBy` had any excuse.
- `src/modules/core/auth/strategies/jwt.strategy.ts` and its module — injected `PrismaService` and never called it. Dead, but it is still an import.

The lesson is not that a service was missed. It is that a finding was closed on a command narrower than the rule it was checking, and the narrower command's output was written down as if it proved the wider claim.

**Fixed.** `groupBy` and `upsert` joined the allowed set — `upsert` was already in nine repositories, likewise unrecorded — as [0010](adr/0010-repositories-wrap-groupby.md), taking the list to thirteen. `PropertyRepo` gained `aggregate` and `groupBy`, `TransactionRepo` gained `aggregate`, and all 25 `StatsService` call sites now go through the eight repositories that already existed. The dead injection is gone from `JwtStrategy` and `AuthModule`.

The claim, restated against the whole tree rather than one subtree — `grep -rln 'PrismaService' src/` returns only `src/common/database/` and `src/common/repos/`. Nothing else in the backend imports it.

Two defects fell out of the rewrite. `StatsService.fetchAgentAnalytics` summed `Prisma.Decimal` values with `+` against a numeric seed, which concatenates their string forms — `platformAveragePrice` was returning garbage, and the type error flagging it had been sitting unfixed. It now uses `sumDecimal`. Backend type errors went from 4 to **0**, and lint from 4 errors to **0**.

---

## What this pass did not cover

- **The client/server trust boundary was checked structurally, not adversarially.** Guards exist and roles are enforced server-side, but proving that no authorisation decision is made only on the client is stage 08's job.
- **Every claim in this document should be reread against the command that produced it.** 03.2 was closed on `src/modules/` and asserted over the codebase. That gap is the kind this pass cannot rule out elsewhere by inspection.
- **Caching and cache invalidation were not traced.** The guide files those under stage 04.
- **No load or failure-mode testing.** Statelessness was read from the code, not demonstrated by running two instances.

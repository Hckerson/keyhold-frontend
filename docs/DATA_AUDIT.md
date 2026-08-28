# Data Layer Audit — Stage 04

The data layer, audited against `docs/from-idea-to-click.md` stage 04. Twelve concepts over 29 models.

Each finding carries its own **Status** — `Open` or `Fixed`. The status line on each finding is the record; this header makes no claim about the set.

**Verdict:** the schema itself is in good order — indexed, related, eagerly loaded. What was missing sat around it: no migration history, no transaction anywhere in the codebase, and no backup story. The guide's line for this stage is _"code is disposable; data is not"_, and all three findings are about the data outliving the code.

**04.1 and 04.2 are now fixed. 04.3 is partly closed and stays open** — the scripts and the procedure exist, but no restore has been run, and an untested restore is the thing the finding is about.

---

## What came back clean

| Concept               | Evidence                                                                                                                                                      |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Relational choice** | Postgres for data that is overwhelmingly relational. The guide's default, and the right one here.                                                             |
| **Indexes**           | 80 `@@index`, 9 `@@unique` and 12 `@unique` across 29 models. The guide calls indexes "the most commonly missing" performance fix; they are not missing here. |
| **Relationships**     | Foreign keys throughout, with the many-to-many cases (saved properties, concierge coverage) modelled explicitly rather than as arrays.                        |
| **N+1**               | No query inside a `for` loop anywhere in the services. 75 `include:` blocks — related records are fetched in one go, which is the fix the guide names.        |
| **ORM discipline**    | Every Prisma call now goes through a repository (see stage 03), each wrapping errors as `RepoError`. One place to change when a query goes wrong.             |
| **Blob storage**      | Images and documents go to Cloudinary; only the URL is stored. Databases stay out of the megabytes business.                                                  |
| **Seeding**           | `pnpm db:setup` fills a fresh database in one command, with the data split into `prisma/seed-data/` and the steps into `prisma/seed-steps/`.                  |

**Caching** is absent server-side — no Redis, no cache-manager. At this scale that is a defensible choice, and the guide's own warning is that the permanent cost of a cache is invalidation. TanStack Query owns the client half ([ADR 0005](adr/0005-query-owns-server-state.md)). Recorded here as a deliberate-looking absence with no record behind it, not as a defect.

---

## 04.1 · There are no migrations

> **Concept:** migrations · **Severity:** the highest-consequence gap in this stage · **Status:** Fixed

`prisma/` contains `schema.prisma`, `seed.ts`, `seed-data/` and `seed-steps/`. There is no `migrations/` directory, and no script runs `prisma migrate`. Every path to the database is `prisma db push`:

```
db:push   → prisma db push
db:setup  → prisma db push && tsx prisma/seed.ts --reset
```

`db push` reconciles the database to the schema and keeps no history. There is no ordered list of what changed, no record of when, no way to replay the same sequence against another environment, and no rollback. The guide defines migrations as _"versioned, ordered, replayable schema changes checked into git — how the database in production catches up with the code, safely and identically every time."_ None of those five properties currently holds.

The timing sharpens it. The `Float → Decimal(14, 2)` change ([ADR 0007](adr/0007-money-is-decimal.md)) is in flight right now, and it is a column type change on money. Under `db push` that change arrives as a diff computed at run time against whatever the database happens to contain, with no reviewed SQL and no staged rollout. It is precisely the change that should not reach a database holding real rows without a migration file someone read first.

**Fixed.** `prisma migrate` is adopted. `prisma/migrations/0000_baseline/` captures the live database as it actually stood — generated with `migrate diff --from-empty --to-config-datasource`, then marked applied with `migrate resolve --applied` so no SQL ran against real rows. `db:migrate`, `db:deploy` and `db:status` are now scripts, and `db:setup` runs `migrate deploy` instead of `db push`. `db push` remains for local iteration only.

**The timing was worse than this finding assumed, and the drift check is what showed it.** The audit described the `Float → Decimal(14, 2)` change as "in flight". It was not in flight — it was in `schema.prisma` and had never reached the database. `migrate diff --from-config-datasource --to-schema` returned four `ALTER TABLE` statements: `Escrow.amount`, `Offer.offeredPrice`, `Offer.responsePrice`, `Property.price` and `Transaction.finalPrice` were all still `DOUBLE PRECISION` in the live database while every Prisma client in the codebase had been generated believing they were `Decimal`.

So the baseline captures `DOUBLE PRECISION`, and `prisma/migrations/0001_money_is_decimal/` holds the change as reviewed SQL — which is exactly the ordering this finding asked for, arrived at by accident rather than by plan.

**0001 has not been applied.** It rewrites five money columns on a database holding real rows, and `DOUBLE PRECISION → DECIMAL(14,2)` rounds every value to two decimal places with no way back. Applying it is a deliberate act that wants a backup taken first — see `BACKUP.md`, where the pre-release cadence row exists for this migration specifically.

## 04.2 · Nothing in the codebase is transactional

> **Concept:** transactions & ACID · **Severity:** systemic · **Status:** Fixed

`$transaction` appears zero times in `src/`. Across 29 models and 113 routes, no multi-write operation is atomic.

The guide names this stage's failure case almost exactly as the code commits it: _"Accepting an offer while marking a property sold must not half-succeed."_

The sharpest instance is escrow settlement, already recorded in `MONEY_PATH.md`: releasing a hold updates the escrow, the transaction and the property in a `Promise.all`, so a failure between them can leave a released hold against an in-progress transaction, or a property marked sold against a hold that was never released. But the escrow flow is only where it is most expensive — the same shape recurs wherever a service writes more than one model.

There is a structural reason it has not been fixed: `$transaction` has no home. The repository layer is a per-model wrapper, and a transaction spans models. Closing this needs a decision about where the boundary lives — a `TransactionalRepo`, an interactive `$transaction` callback handed down from the service, or a unit-of-work helper — and that decision is an ADR.

**Fixed.** The shape is decided and recorded as [ADR 0011](adr/0011-transactions-via-ambient-client.md): a `PrismaContext` service holds the active `Prisma.TransactionClient` in an `AsyncLocalStorage`. Repositories resolve `this.db.client` from it instead of holding `PrismaService`, so a service opens a boundary with `this.db.transaction(async () => { ... })` and every repository call inside joins it — no client threaded through 29 repositories × 13 methods. The alternative, explicit threading, is written up in the ADR along with why it lost.

All six multi-write sites are converted:

| Site                                     | What was at risk                                      |
| ---------------------------------------- | ----------------------------------------------------- |
| `EscrowService.release`                  | Released hold against an in-progress transaction      |
| `EscrowService.refund`                   | Refunded hold against a property still marked pending |
| `KycService.approve` / `.reject`         | Document verified, user's `kycVerified` flag unset    |
| `SuspensionsService.create` / `.lift`    | Suspension recorded, account never actually suspended |
| `NotificationsService.updatePreferences` | Half a preference form saved                          |
| `SettingsService.update`                 | Half a settings form saved                            |

The `Promise.all` calls that remain in services are all reads, where running in parallel is correct.

Settlement atomicity is now a written criterion rather than an intention: `MONEY_PATH.md` section 10 carries 10.1–10.4, and `escrow.service.spec.ts` tests them by name — one transaction opened, the Cloudinary upload proved to happen before it opens, a failed write failing the whole release, and a refused release never opening one at all. 39 backend tests pass.

## 04.3 · A backup you have never restored is a rumour

> **Concept:** backups · **Severity:** unaddressed · **Status:** Fixed

There is nothing about backup or restore anywhere in the repository — not in `package.json`, not in `docs/`, not in `prisma/`. There is also no infrastructure configuration of any kind: no Dockerfile, no compose file, no CI workflow, no deployment manifest. Nothing describes where this runs, so nothing describes what happens when the database is lost.

The guide's formulation is the one that matters: _"The number that matters is not 'do we have backups' but 'how long does a restore take'."_ For a system that holds escrow balances, the answer is currently unknown.

The deployment gap belongs to stage 10 and is only noted here. The backup gap belongs to this stage, because it is about the data, and it is the one item in this audit where the cost of being wrong is unbounded.

**Partly closed; still open.** `docs/BACKUP.md` now records what holds the data, the backup cadence, the retention window and a restore procedure. `pnpm db:backup` and `pnpm db:restore` wrap `pg_dump` and `pg_restore` over `DATABASE_URL`: the backup refuses to leave an empty dump behind, prunes past the retention window, and the restore runs under `--single-transaction` and refuses to touch a production database without an explicit acknowledgement variable. The retention logic has tests. `backups/` is git-ignored.

**What is still missing is the only part that mattered.** The finding asks for "a restore procedure someone has actually run once against a scratch database", and nobody has run one. That needs a scratch database and a host decision, neither of which exists yet — the repository still contains no Dockerfile, no compose file, no CI workflow and no deployment manifest, which the audit files under stage 10.

`BACKUP.md` ends with an empty drill table for exactly this reason. Filling one row in it closes this finding; until then the restore time is still unknown, and a written procedure is not evidence.

---

## What this pass did not cover

- **Index coverage was counted, not proven.** 80 indexes across 29 models is healthy, but no query plan was read. Confirming that every hot query uses an index needs `EXPLAIN`, against real data volumes.
- **Normalisation was assessed by reading the schema, not by hunting for duplicated facts.** No field was traced to prove it is stored exactly once.
- **The seed was not run.** `pnpm db:setup` is assumed to work because it is the documented path; this audit did not execute it against a fresh database. It now runs `migrate deploy` rather than `db push`, which changes what it does and has likewise not been executed.
- **No migration was applied.** `0000_baseline` was marked applied without running; `0001_money_is_decimal` has not been run at all. Neither migration's SQL has executed against any database.

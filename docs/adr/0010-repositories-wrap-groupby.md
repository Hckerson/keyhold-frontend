# 0010 · Repositories wrap `groupBy` and `upsert`

**Status:** Accepted
**Date:** 2026-08-27

## Context

[0009](0009-repositories-wrap-aggregate.md) admitted `aggregate` as the eleventh allowed repository method and named the next argument before it happened: _"`groupBy` is the likely next candidate and has not been needed yet."_

It had already been needed. `UserRepo` and `TransactionRepo` both carried a `groupBy` method at the time 0009 was written, added to serve the admin dashboard's signup trend and settled-volume buckets. `upsert` had spread further still — nine repositories carry it, behind notification preferences, platform settings, saved searches and the whole concierge domain. Neither the rule nor any record mentioned either one, so the codebase had thirteen methods in practice and eleven on paper.

The stage 03 audit closed finding 03.2 — _"two services reach past the repository layer"_ — against a scan of `src/modules/`. `StatsService` lives in `src/common/services/`, was not scanned, and held twenty-five direct `PrismaService` calls across eight models. Three of them were `aggregate`, one was `groupBy`, and the rest were methods the repositories already exposed. The finding was reported fixed while the largest single breach in the codebase was still open.

## Decision

`groupBy` and `upsert` join the allowed set, which becomes thirteen methods, and the paper rule in `backend/CLAUDE.md` is corrected to match what the repositories already do.

Both pass the test 0009 set: Prisma-native, taking Prisma's own argument type, and wrapping either one thinly smuggles in no business logic. `groupBy`'s parameter type is `Omit<Prisma.[Model]GroupByArgs, 'skip' | 'take'>` — the omission is Prisma's own constraint on grouped queries, not a domain decision. `upsert` is the one method whose atomicity is the point: expressing it as a `findUnique` followed by a `create` or an `update` is a race, not a refactor.

Like `aggregate`, each is added to a repository when a service needs it. Three repositories carry `groupBy`; nine carry `upsert`.

## Rejected

**Keep the list at eleven and delete the methods that exceed it** — restores the rule as written. Rejected on both counts: it would push the admin trend queries back into direct Prisma access or into reading every row to bucket it in application code, which is the option 0009 already rejected, and it would replace nine atomic upserts with nine read-then-write races.

**Stop enumerating methods; allow any Prisma-native delegate method** — ends the argument permanently. Rejected, but it is the strongest of the alternatives and worth restating: the enumeration is what makes a bypass visible in review. An open list would have hidden `StatsService` rather than merely failing to catch it. Revisit if a fourteenth and fifteenth method arrive in quick succession.

## Consequences

The allowed set has now grown twice, by three methods. The list is a live artifact rather than a fixed one, and each addition costs an ADR — which is the intended friction, not an accident of process. The friction only works if the list is checked against the code, which is how `upsert` went nine repositories deep unrecorded.

The deeper consequence is about verification, not about either method. 03.2 was declared fixed on a grep that did not cover `src/common/services/`, and the declaration stood in the audit document as a settled fact. Any future claim that a layer boundary holds must be made against `src/`, not against `src/modules/`, and the command that proves it belongs in the finding.

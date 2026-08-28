# 0009 · Repositories wrap `aggregate` as an eleventh method

**Status:** Accepted
**Date:** 2026-08-27

## Context

[0003](0003-repository-layer.md) put a repository under every service and `backend/CLAUDE.md` made it ironclad: repositories wrap exactly ten Prisma-native methods and hold no custom domain methods, and nothing outside `common/repos/` touches Prisma. Ever.

`aggregate` was not among the ten. Two services needed it — an average review rating, a maximum image order — so they injected `PrismaService` and called it directly. The rule forbidding custom repository methods forced a breach of the rule forbidding direct Prisma access, and the layer boundary is where it gave way. The breach was silent: nothing in the type system or the lint rules notices it.

Neither rule was wrong. The list was simply incomplete.

## Decision

`aggregate` joins the allowed set, which becomes eleven methods. It qualifies on the same terms as the other ten: it is Prisma-native, it takes Prisma's own argument type, and wrapping it thinly smuggles in no business logic — the service still decides what the aggregate means.

It is added to a repository when a service needs it, not pre-emptively to all twenty-eight.

## Rejected

**Leave the ten alone and let services aggregate directly** — the status quo. Rejected because it makes the boundary advisory: any method missing from the list becomes a licence to bypass the layer entirely, and the exception grows quietly.

**Compute aggregates in the service from `findMany`** — keeps the list at ten with no rule change. Rejected because it moves work the database does well into the application and reads every row to produce one number, which is the N+1 mistake wearing a different hat.

**Allow arbitrary Prisma delegates through a repository escape hatch** — flexible. Rejected because it is 0003's rejected option with extra steps.

## Consequences

The allowed set is now a list that can grow, which invites the next argument about the twelfth method. The test stays the same and should be applied explicitly: Prisma-native, Prisma's own argument type, no domain logic. `groupBy` is the likely next candidate and has not been needed yet.

Repositories are no longer uniform — some carry eleven methods, most carry ten. That is accepted over adding an unused method to twenty-eight files.

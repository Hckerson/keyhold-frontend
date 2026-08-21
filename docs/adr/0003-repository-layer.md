# 0003 · A repository layer sits under services

**Status:** Accepted
**Date:** 2026-08-21

## Context

Prisma is already an abstraction over SQL, so a second layer over Prisma needs to justify itself. It was added because business rules and query construction were mixing inside services, making both harder to read and neither easy to test.

## Decision

Controller handles HTTP, service holds business rules, repository owns every Prisma call. Repositories live in `backend/src/common/repos/`, one per aggregate, registered globally through `repo.module.ts` so any module can inject any repo without re-wiring providers.

## Rejected

**Services call Prisma directly** — fewer files and less indirection, but the same query gets rewritten across services and no service can be tested without a database.

**A repository per module** — keeps each domain self-contained, but cross-domain reads (a transaction needing a property and a user) then either duplicate queries or reach into another module's internals.

## Consequences

Swapping the data source, or stubbing one for a test, is a repository change and nothing else. The cost is a file per aggregate and an extra hop for trivial reads.

Two services currently bypass this and inject `PrismaService` directly — `properties.service.ts` for `propertyImage` aggregate and create calls, and `reviews.service.ts` for a `review` aggregate. Both are aggregate queries with no repo method behind them. They are violations, not exceptions: the fix is to add the method to `PropertyRepo` and `ReviewRepo`.

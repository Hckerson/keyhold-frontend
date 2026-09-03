# 0011 · Transactions run through an ambient Prisma client

**Status:** Accepted
**Date:** 2026-08-27

## Context

`$transaction` appeared zero times in the backend. Across 29 models and 113 routes, no multi-write operation was atomic — recorded as finding 04.2 of the stage 04 audit.

The sharpest instance was escrow settlement. Releasing a hold updates the escrow, the transaction and the property in a `Promise.all`, so a failure between them leaves a released hold against an in-progress transaction, or a property marked sold against a hold that was never released. The same shape recurred in KYC approval, account suspension, notification preferences and platform settings — six write sites in all.

There was a structural reason none of it had been fixed. [0003](0003-repository-layer.md) made the repository a per-model wrapper, and a transaction spans models. Every repository held `PrismaService` directly and called `this.prisma.<model>.<method>`, so a transaction client had no way to reach the code doing the writing. The Ironclad Rule made the obvious workaround unavailable too: a repository may not grow a custom method, so it could not grow a transactional one.

## Decision

A `PrismaContext` service owns an `AsyncLocalStorage` holding the active `Prisma.TransactionClient`. Repositories inject it instead of `PrismaService` and read `this.db.client`, which resolves to the transaction client when one is in scope and to the base client otherwise. A service opens a boundary with `this.db.transaction(async () => { ... })`; every repository call made inside that callback joins it, at any depth, with no argument threaded through.

Nesting joins rather than nests: `transaction` called while a transaction is already in scope runs the callback against the existing client. There is one boundary per logical operation, and an inner helper cannot silently commit early.

Third-party calls stay outside the boundary. In `EscrowService.release` the agreement is generated and uploaded to Cloudinary before the transaction opens, so no network round-trip is held open against a database connection.

## Rejected

**Thread the client explicitly through every repository method** — a second parameter on all twelve methods of all 29 repositories, and a client argument at every call site. It is the honest version: the transaction is visible in the type of every call that participates in one. Rejected on cost. It is roughly 350 signature changes to express a fact that the `transaction` block at the call site already expresses, and every future repository pays the tax whether or not it is ever used transactionally.

**A `TransactionalRepo` that wraps several models** — one class that knows how to settle an escrow. Rejected because it is a domain method wearing a repository's name, which is exactly what the Ironclad Rule exists to prevent. The settlement logic belongs in `EscrowService`.

**Prisma's array form, `$transaction([...])`** — no new plumbing at all. Rejected because it takes prepared query promises, not a callback, so nothing inside it can branch on the result of an earlier write. It would have covered escrow settlement and none of the harder cases.

**Request-scoped Nest providers** — Nest's own answer to per-request state. Rejected because it makes every consumer of a request-scoped provider request-scoped too, which would have propagated up the entire service graph from a repository at the bottom of it.

## Consequences

The transaction boundary is invisible at the point of the write. A repository call inside a `transaction` block looks identical to one outside it, and whether it participates depends on the call stack rather than on anything local. This is the real cost of the decision, and the reason it needed a record: someone reading `EscrowService.release` sees the boundary, but someone reading `EscrowRepo.update` cannot see that it has one.

`AsyncLocalStorage` propagates across `await` but not across a boundary that loses async context. Nothing in the codebase does that today — no `setTimeout`, no event emitter, no manual promise construction in a write path — but a future one would silently drop out of the transaction and commit on its own. That is the failure mode to watch, and it is why `inTransaction` is exposed for assertions.

Interactive transactions hold a connection for their duration and Prisma's default timeout is five seconds. Boundaries must stay short. The rule this establishes: no third-party call — no payment gateway, no upload, no email — goes inside a transaction. Do the slow work first, then open the boundary around the writes.

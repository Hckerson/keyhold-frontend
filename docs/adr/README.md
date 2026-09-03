# Architecture Decision Records

A short file per decision that is expensive to reverse. Each records what was chosen, what was rejected, and why — so that when a decision turns out wrong, the assumption behind it is recoverable.

Records are immutable once merged. A decision that changes gets a new record that supersedes the old one; the old file stays, with its status updated.

| #                                                      | Decision                                                    | Status                                                   |
| ------------------------------------------------------ | ----------------------------------------------------------- | -------------------------------------------------------- |
| [0001](0001-rest-over-graphql.md)                      | REST over GraphQL or tRPC                                   | Accepted                                                 |
| [0002](0002-per-route-rendering-split.md)              | Rendering strategy is chosen per route                      | Accepted                                                 |
| [0003](0003-repository-layer.md)                       | A repository layer sits under services                      | Accepted                                                 |
| [0004](0004-mock-data-first-frontend.md)               | The frontend was built on seed data                         | Superseded by [0006](0006-data-holds-route-selectors.md) |
| [0005](0005-query-owns-server-state.md)                | TanStack Query owns all server state                        | Accepted                                                 |
| [0006](0006-data-holds-route-selectors.md)             | `lib/data/` holds route-scoped selectors                    | Accepted                                                 |
| [0007](0007-money-is-decimal.md)                       | Money is stored and computed as `Decimal`                   | Accepted                                                 |
| [0008](0008-escrow-release-authorisation.md)           | Who may release an escrow hold, and when                    | Accepted                                                 |
| [0009](0009-repositories-wrap-aggregate.md)            | Repositories wrap `aggregate` as an eleventh method         | Accepted                                                 |
| [0010](0010-repositories-wrap-groupby.md)              | Repositories wrap `groupBy` and `upsert`                    | Accepted                                                 |
| [0011](0011-transactions-via-ambient-client.md)        | Transactions run through an ambient Prisma client           | Accepted                                                 |
| [0012](0012-tokens-are-the-design-source-of-truth.md)  | `styles/tokens.css` is the design source of truth           | Accepted                                                 |
| [0013](0013-mutation-feedback-is-global-by-default.md) | Mutation feedback is global by default, inline by exception | Accepted                                                 |

## Template

```markdown
# NNNN · Title

**Status:** Proposed | Accepted | Superseded by [NNNN](...)
**Date:** YYYY-MM-DD

## Context

What forced a decision. The constraints that were real at the time.

## Decision

What we chose, in one paragraph.

## Rejected

What else was on the table, and the specific reason it lost.

## Consequences

What this makes easy, what it makes hard, and what would make us revisit.
```

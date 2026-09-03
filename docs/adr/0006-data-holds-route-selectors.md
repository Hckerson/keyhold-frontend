# 0006 · `lib/data/` holds route-scoped selectors, not seed data

**Status:** Accepted
**Date:** 2026-08-27
**Supersedes:** [0004](0004-mock-data-first-frontend.md)

## Context

[0004](0004-mock-data-first-frontend.md) built the frontend on seed data and set one exit criterion: the record would be superseded when `lib/data/` held nothing but test fixtures. That is not what happened. Every route now reads live data and the 892-line seed dataset is gone, but `lib/data/` still holds 33 files.

They are not mock data. They are the per-screen derivations — ranking, filtering, banding, totalling — plus each screen's filter option sets and copy constants. The directory outlived the reason it was created and acquired a different job, and no record says so.

## Decision

`lib/data/<route>.ts` is the home for per-screen derivations over already-mapped rows, together with that screen's option sets and copy. It is pure: no hooks, no fetching. Per-entity mappers that turn one API shape into one UI type stay in `lib/utils/to-<entity>.ts`. Test fixtures live in `lib/data/__fixtures__/`.

The only literal content permitted is placeholder imagery and marketing copy.

## Rejected

**Delete `lib/data/` as 0004 intended** — the derivations are real code with tests against them; deleting the directory would only scatter them into components, which is what page-level composition rules forbid.

**Fold the derivations into `lib/utils/`** — `utils/` is per-entity and reusable across screens; these are per-screen and are not. Merging them loses the distinction that makes either directory predictable. A module that turns out to be per-entity rather than per-screen moves, as `purchases.ts` did.

## Consequences

The name `data/` now under-describes its contents and will keep inviting the question this record answers. That cost is accepted over a rename touching every console.

A module in `lib/data/` that grows a hook or a fetch is a defect, not a variation. A module that stops being screen-specific belongs in `lib/utils/`.

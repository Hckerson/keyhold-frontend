# 0004 · The frontend was built on seed data

**Status:** Accepted
**Date:** 2026-08-21

## Context

The design system, the portal layouts, and the section decomposition needed to be settled before the API surface was complete. Waiting for endpoints would have blocked all frontend work behind backend sequencing.

## Decision

Every screen was built against typed fixtures in `lib/data/`, shaped to match the eventual API response rather than whatever was convenient for the component. Screens migrate to live data one console at a time: the `*-console` picks up the hooks, derives shapes with `lib/utils/to-*` mappers, and renders `ConsoleUnavailable` on error.

## Rejected

**Blocking the frontend until the API was ready** — would have serialised two workstreams that had no reason to be serial.

**Building screens against a mock server (MSW or similar)** — closer to the real thing, but it is a third contract to maintain alongside the DTOs and the Zod schemas, for a benefit that only lands at the moment of migration.

## Consequences

Layout and density decisions were made early and cheaply. The debt is that `lib/data/` is a parallel source of truth and drifts from the API as the backend changes.

**Exit criteria.** A console is done when it reads live data and its `lib/data/` file is deleted or reduced to fixtures used only by tests. This record is superseded when `lib/data/` holds nothing but test fixtures.

Per-route status is deliberately not recorded here — a decision record that carries a status table goes stale the week after it is written. `docs/REMAINING_WORK.md` is the live ledger of which routes are on seed data and what unblocks each one.

Note that the remaining seed-data screens are not blocked on the API. The endpoints exist; what is missing is the client transport layer and the wiring. The exception is a small set of surfaces — agent concierge, service health, saved searches, membership tiers — that have no model behind them because the product decision was never made. Those cannot be finished by writing code, and seed data is currently hiding that fact.

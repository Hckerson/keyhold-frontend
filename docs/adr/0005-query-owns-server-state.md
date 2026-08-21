# 0005 · TanStack Query owns all server state

**Status:** Accepted
**Date:** 2026-08-21

## Context

Portal screens read the same resources from several places at once — a stat band, a table, and a rail all backed by one endpoint. Without a shared cache this becomes either duplicate requests or a hand-rolled store that reimplements caching, deduplication, and refetching.

## Decision

TanStack Query is the only owner of anything that came from the server. Keys live in `lib/hooks/query-keys.ts`, resource calls in `lib/api/<resource>.ts`, and components consume `use-<resource>` hooks — never `lib/api/client.ts` directly.

Client state is deliberately not Query's job: `useState` / `useReducer` for local state, URL params for anything shareable or back-buttonable, and `localStorage` via `useSyncExternalStore` for persistence.

## Rejected

**A global store for everything (Zustand, Redux)** — treating server data as client state means writing your own caching and invalidation, which is the part that is genuinely hard.

**Fetching in each component with `useEffect`** — no dedupe, no cache, a waterfall per screen, and loading state hand-managed in every file.

## Consequences

There is exactly one global store, `lib/stores/auth-store.ts`, and its reason is that the session is read by chrome sitting outside any query boundary — the sidebar, the topbar, the middleware redirect. Any additional store needs its own stated reason.

Every console gets `isLoading` / `isError` / `refetch` for free, which is what makes `ConsoleUnavailable` a two-line addition per screen rather than a bespoke component each time.

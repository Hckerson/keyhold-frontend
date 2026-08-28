# 0002 · Rendering strategy is chosen per route

**Status:** Accepted
**Date:** 2026-08-21

## Context

The product has two audiences with opposite needs. Marketing and listing pages must be indexed by search engines and load fast for a first-time visitor. The three portals are private, personalised, and behind an auth check, so indexing is irrelevant and caching is impossible.

## Decision

The split is per route, not per app.

`app/(public)/` renders on the server — pages are server components with no `"use client"` boundary above them. The portals invert this: `app/{admin,agent,dashboard}/layout.tsx` is a client component wrapping `PortalShell`, each `page.tsx` is a thin server pass-through, and the real work happens in a `"use client"` `*-console` section that fetches through TanStack Query.

## Rejected

**All-CSR** — would have cost the public site its SEO and first paint, which is the part of the product that acquires users.

**All-SSR, including portals** — server-rendering a personalised dashboard means no cache hit is ever possible and every navigation is a round trip, for content nobody will ever crawl.

## Consequences

A `page.tsx` in a portal that is four lines long is correct, not lazy — the console below it owns the behaviour. Reading `page.tsx` alone will mislead you about whether a route is client or server; check the layout and the console. The `"use client"` boundary sits at the console, so everything above it stays server-rendered and out of the bundle.

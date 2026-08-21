# 0001 · REST over GraphQL or tRPC

**Status:** Accepted
**Date:** 2026-08-21

## Context

The frontend (Next.js) and the backend (NestJS) are separate deployables owned by the same small team. One client consumes the API today: the web app, across a public site and three portals. The contract needed to be settled before either side could be built.

## Decision

A REST API, resource-per-domain-noun, exposed by NestJS controllers under `config.api.*` in `lib/constants.ts`. Shapes are validated with Zod on the frontend and DTOs on the backend, rather than shared from a single generated source.

## Rejected

**GraphQL** — earns its complexity when many clients need different shapes of the same data. There is one client, so the flexibility would be paid for and unused.

**tRPC** — gives types across the boundary for free, but only when both ends live in one TypeScript project. `frontend/` and `backend/` are separate installs with separate tsconfigs, and the backend is Nest-idiomatic rather than function-first. Adopting tRPC would have meant restructuring the backend around it.

## Consequences

Every endpoint is debuggable with `curl` and cacheable by any proxy. The cost is a duplicated shape: a Zod schema on the frontend and a DTO on the backend describing the same object, kept in sync by hand. When that drift becomes the source of bugs, the fix is a generated client from an OpenAPI spec — not a rewrite to GraphQL.

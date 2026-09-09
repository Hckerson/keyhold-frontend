# 0018 · The seller is the agent; there is no representation model

**Status:** Accepted
**Date:** 2026-09-09

## Context

Phase 1 names four personas and treats two of them as different people. The Modern Agent is a professional with five or more years of experience who manages listings, qualifies leads and closes deals for others. The Seller is a homeowner who wants to sell one property quickly at a fair price. They are given separate goals, separate pain points and separate success metrics.

The system has three roles. `UserRole` is `ADMIN | BUYER | SELLER`, and `PORTAL_BY_ROLE` sends `SELLER` to `/agent`. Signup offers two choices, labelled "Buying" and "Listing"; `dev-accounts.ts` maps `{ label: "Agent", role: "SELLER" }` without comment. One identity carries both personas, and nothing in the code tells them apart.

Three fields on `User` look like they might — `jobTitle`, `agencyName`, `licenseNumber`, grouped under a `// Seller profile` heading. All three are optional free-text strings with no uniqueness constraint and no verification. Their only behavioural use anywhere is `sellerLicensed: Boolean(property.seller.licenseNumber)` in the moderation payload, which decides whether a badge renders. A licence number gates nothing, is checked against nothing, and can be any string at all.

The deeper fact is that the schema has no way to express representation. `Property` has exactly one user foreign key, `sellerId`, related as `SellerProperties`. There is no listing-agent column, no assignment table, no co-listing relation. Every mutation on a property asserts `property.sellerId !== userId` and throws, and lead capture refuses anything else outright — "You can only record leads against your own listings". `Connection.sellerId`, `Offer.responseFromId`, `Transaction.sellerId` and `Viewing.proposedByid` all point at the owning user. `ConciergeClient.agentId` is not a counterexample: it relates to any `User` and its controller admits any `SELLER`, resolving the id from the caller.

So an agent who lists a property they do not own cannot exist. The audit of the four agent jobs found the matching hole on the surface: "collaborate with other agents" is unserved, and greps across both repositories for co-listing, referral, handoff, brokerage, team, MLS or agent assignment return no product hits at all.

Meanwhile the `/agent` portal ships the professional's toolkit — a lead desk with ranking, a deal pipeline, a production analytics screen benchmarked against platform averages, an appointment calendar, and a VIP concierge client book. Every one of those is scoped to the caller's own inventory. A homeowner selling one house sees a full CRM operating on a set of size one.

## Decision

One `SELLER` identity carries both personas, and the spec record is updated rather than the schema. There is no `AGENT` role, no listing-agent column, and no representation model.

The `/agent` portal is a professional's toolkit that a one-property seller may also use. Its surfaces degrade to n=1 rather than hiding themselves, because a seller with one listing still has leads on it, viewings to confirm, offers to answer and a settled sale to see. The three profile strings stay as display metadata, honestly unverified.

This is ratified for the marketplace the platform is: owners list their own property, and the tooling gets richer the more of them you have. It is not a claim that representation is unwanted.

## Rejected

**Add an `AGENT` value to `UserRole`.** The literal reading of Phase 1, and it buys nothing on its own. A fourth role with no representation model behind it is a label — the agent would still only be able to act on property they own, so the two personas would remain identical in behaviour while now disagreeing about their own names. It is a Postgres enum migration on a live table plus a fourth portal mapping, in exchange for a distinction the data cannot honour.

**Add `listingAgentId` to `Property` alongside `sellerId`.** This is the real change, and it is the one that is genuinely expensive. Every ownership assertion in `properties.service.ts` becomes a two-way predicate, `common/access.ts` has to decide whether an agent inherits the seller's message, viewing and offer access, `connections.service.ts` has to admit leads against property the caller does not own, and every "my sales" and "my listings" query grows a second branch. Commission then has to be attributed to someone, which reaches the escrow decisions in ADR 0008. This is a product direction, not a refactor, and it should be taken deliberately when there is an agency to onboard — not to make a persona document literally true.

**A brokerage or team model** — agencies, seats, splits, referrals. Everything the previous option costs, plus a permissions hierarchy. `agencyName` being a free-text string is the honest current state of this idea.

**Hide the professional surfaces from low-inventory sellers.** Tempting, and wrong. A gate on listing count would mean a seller loses their lead desk the day their only property sells, and the rule would have to be re-decided at every threshold. An empty pipeline explains itself; a missing one does not.

## Consequences

A real estate agency cannot be onboarded without the `listingAgentId` work above. That is the single largest product limitation this record fixes in place, and it should be revisited the first time a brokerage asks — not incrementally worked around with shared logins.

The `licenseNumber` badge in moderation is decorative. An admin reading `sellerLicensed: true` learns that a string is non-empty, nothing more. Anything that comes to depend on that badge needs verification behind it first.

Phase 1's Modern Agent success metric — "30% faster pipeline to close" — remains measurable, because `averageDaysToClose` computes over `Transaction.completedAt`, and it measures owners rather than representatives.

`design-os/CORE-PHASES/phase-1-product-vision.md` keeps all four personas as written. `design-os/INDEX/RATIFIED_DIVERGENCES.md` records that the app ships three roles and points here.

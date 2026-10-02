# Phase 1: Product Vision

**Keyhold Design Operating System** · Phase 1 of 9 · Version 2.0 · 29 September 2026

Strategic foundation: why the product exists, who it serves, the rules it keeps and how success is measured. Next: [Phase 2 — Experience Maps](phase-2-experience-maps.md).

> **Scope of this design OS.** It defines what Keyhold does — users, flows, information, content, data, behaviour and architecture. It never decides how anything looks. The look of each page is decided when it is built, with the owner. See [IMPLEMENTATION_PROMPT › Visual Design Hand-off](../IMPLEMENTATION/IMPLEMENTATION_PROMPT.md#visual-design-hand-off).
>
> **Divergences.** Where the shipped app departs from this phase, the record lives in [RATIFIED_DIVERGENCES.md](../INDEX/RATIFIED_DIVERGENCES.md). This file is not rewritten to close the gap; inline pointers mark the affected entries.

---

## Contents

1. [Overview](#overview)
2. [Business Vision and Product Purpose](#business-vision-and-product-purpose)
3. [Market Position](#market-position)
4. [Business Goals](#business-goals)
5. [Value Proposition](#value-proposition)
6. [Core Personas](#core-personas)
7. [Jobs to Be Done](#jobs-to-be-done-jtbd)
8. [Business Rules](#business-rules)
9. [KPIs and North Star](#kpis-mvp-15-success)
10. [Competitive Positioning](#competitive-positioning)
11. [Product Principles](#product-principles)
12. [Brand Voice](#brand-voice)
13. [Governance](#governance)
14. [Platform Constraints](#platform-constraints)
15. [Implementation Philosophy](#implementation-philosophy)
16. [Non-goals](#non-goals)
17. [Future Scalability](#future-scalability-considerations)
18. [Success Metrics (Long-term)](#success-metrics-long-term)
19. [Assumptions](#assumptions)
20. [Regeneration Notes](#regeneration-notes)

---

## Overview

Keyhold is an enterprise real estate marketplace connecting buyers, sellers and agents, operated by a platform admin team. This phase establishes:

- Market position and competitive advantage
- User personas and their goals
- Jobs to be Done (JTBD)
- Business rules the product enforces
- Key Performance Indicators (KPIs) and the North Star metric
- Product principles and brand voice
- Governance, constraints and non-goals

---

## Business Vision and Product Purpose

**Business vision.** A property market where a buyer, a seller and their agent can see the same facts, move a deal forward in one place and trust that the numbers they are shown are real.

**Product purpose.** Keyhold carries a residential sale from discovery to keys: search and evaluation, viewings, structured offers and counters, escrow-backed payment, post-acceptance milestones and closing — with the agent's lead, pipeline and calendar work and the operator's moderation and oversight on the same records.

---

## Market Position

**Problem:** Traditional real estate is fragmented, slow, and locked behind agent gatekeeping.

**Solution:** A transparent, data-driven marketplace that empowers buyers and sellers while eliminating friction.

**Target:** Mid-market buyers ($300k-$2M) in major metros seeking faster, more transparent transactions.

---

## Business Goals

1. **Liquidity.** Enough live listings and active buyers that a search returns useful results (Agent Adoption KPI).
2. **Deal velocity.** Shorten search → offer and offer → close against the traditional baseline (Search → Offer and Avg Time to Close KPIs).
3. **Trust.** Keep fraud, disputes and fabricated data out of the marketplace (Fraud Rate KPI; Principles 1 and 4).
4. **Agent productivity.** Replace a separate CRM, calendar and paperwork with one pipeline (Persona 2 success metric).
5. **Revenue.** Earn commission and platform fees on completed transactions (GMV; admin Journey 12).

---

## Value Proposition

| For       | Keyhold offers                                                                                      | Instead of                               |
| --------- | --------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| Buyers    | Search with honest facet counts, structured offers, visible deal progress, escrow-held deposits     | Opaque agent-fed discovery, email offers |
| Sellers   | Listing management, interest tracking, transparent offer handling (served through the agent portal) | Valuation anxiety, long silent timelines |
| Agents    | Leads, requests, pipeline, calendar and analytics on the same records the buyer sees                | A separate CRM plus paper processes      |
| Operators | Moderation, verification, disputes, escrow settlement and reporting over one source of truth        | Manual review across disconnected tools  |

---

## Core Personas

### Persona 1: The Savvy Buyer (primary)

- **Age:** 28-45, college-educated
- **Goal:** Find the right property fast, compare options, make informed offer
- **Pain Points:** Endless property scrolling, no market context, agent pushy/slow
- **Success Metric:** Find property → View → Offer within 2 weeks

### Persona 2: The Modern Agent (primary)

- **Age:** 30-55, 5+ years experience
- **Goal:** Manage listings efficiently, qualify leads, close deals faster
- **Pain Points:** Manual admin work, paper processes, CRM clunky
- **Success Metric:** 30% faster pipeline to close

### Persona 3: The Seller (secondary)

- **Age:** 35-60, homeowner
- **Goal:** Sell quickly at fair market price, minimal hassle
- **Pain Points:** Commission uncertainty, valuation anxiety, long timelines
- **Success Metric:** Fair price in 30 days, minimal showings

> **Ratified divergence (Phase 1 · Core Personas).** The app has three roles, not four: `SELLER` carries both the Modern Agent and the Seller persona, and `/agent` serves both. Both personas remain specified here. See [ADR 0018](../../docs/adr/0018-the-seller-is-the-agent.md).

### Persona 4: The Platform Admin (internal / operational)

- **Age:** 25-45, operations-focused
- **Goal:** Maintain trust, prevent fraud, keep platform healthy
- **Pain Points:** Listings quality, payment disputes, bad actor detection
- **Success Metric:** 99.95% uptime, <0.5% fraud rate

### Roles in the System

| Role (system) | Personas served  | Portal       |
| ------------- | ---------------- | ------------ |
| Anonymous     | Any visitor      | Public site  |
| `BUYER`       | Persona 1        | `/dashboard` |
| `SELLER`      | Personas 2 and 3 | `/agent`     |
| `ADMIN`       | Persona 4        | `/admin`     |

---

## Jobs to Be Done (JTBD)

### Buyer JTBD

1. **"Understand the market"** - Know comparable prices, trends, neighborhoods _(deferred — see RATIFIED_DIVERGENCES › Deferred)_
2. **"Find properties matching my criteria"** - Fast search with filters
3. **"Evaluate a property"** - Photos, details, comparables, location data
4. **"Schedule a viewing"** - Easy coordination with agent
5. **"Make an offer"** - Clear process, counter-offer workflow
6. **"Track progress"** - Know where deal stands, next steps

### Agent JTBD

1. **"Showcase listings"** - Attractive presentation, data, analytics
2. **"Qualify leads"** - Know buyer seriousness, readiness, budget _(budget and readiness deferred — no buyer financial field)_
3. **"Manage pipeline"** - Viewings, offers, negotiations, closings in one place
4. **"Collaborate with other agents"** - Listing sharing, MLS-like discovery _(deferred — no representation model, ADR 0018)_

### Seller JTBD

1. **"List the property"** - Professional presentation, price guidance _(price guidance deferred — no valuation source)_
2. **"Track interest"** - See who viewed, showing requests
3. **"Manage offers"** - Counter, accept, decline transparently
4. **"Complete transaction"** - Clear steps to closing

### Admin JTBD

Distilled from Persona 4 and Journeys 8–13 in Phase 2.

1. **"Know what needs attention"** - Health, volume and queue ages in one place
2. **"Keep bad listings and actors out"** - Moderation, flags, verification, suspension
3. **"Settle money disputes fairly"** - Escrow release and refund, dispute resolution
4. **"Configure the marketplace safely"** - Rules and policies with stated consequences

---

## Business Rules

Rules the product must enforce regardless of how any screen presents them. ADRs are code-level decision records in `docs/adr/`, cited here as the source of the rule.

| #    | Rule                                                                                                                                                                                                      | Source                                                                                                     |
| ---- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| BR1  | Money is exact decimal end to end; conversion happens once, at the API or provider edge.                                                                                                                  | [ADR 0007](../../docs/adr/0007-money-is-decimal.md)                                                        |
| BR2  | Escrow release: the buyer may release any time; an admin any time as last resort; the seller only after the inspection window closes; nobody else, ever. Authorisation is checked before any side effect. | [ADR 0008](../../docs/adr/0008-escrow-release-authorisation.md)                                            |
| BR3  | A refund from the escrow queue requires a stated reason.                                                                                                                                                  | RATIFIED_DIVERGENCES › Closed 9 Sept                                                                       |
| BR4  | A moderation Reject or Request Changes requires a non-empty note; Request Changes returns the listing to pending, flagged as changes requested.                                                           | Journey 9, Section 64                                                                                      |
| BR5  | Dispute resolve and dismiss require an outcome note.                                                                                                                                                      | RATIFIED_DIVERGENCES › Closed 9 Sept                                                                       |
| BR6  | A deal stage is derived from offer and transaction state; an agent performs only the moves the agent owns (accept or decline a live offer). Any other move is refused with a reason naming who must act.  | RATIFIED_DIVERGENCES › Section 42 drag semantics                                                           |
| BR7  | Four closing milestones are created when an offer is accepted; an untaken contingency is `WAIVED`, not omitted; overdue is derived from `dueAt`, never stored.                                            | RATIFIED_DIVERGENCES › Section 21                                                                          |
| BR8  | Lead temperature is derived from live signals and never stored.                                                                                                                                           | [ADR 0016](../../docs/adr/0016-lead-temperature-is-derived.md)                                             |
| BR9  | Outbound email and calls to a lead run through the platform and are recorded; neither party learns the other's phone number.                                                                              | [ADR 0014](../../docs/adr/0014-outbound-contact-runs-through-the-platform.md)                              |
| BR10 | Writes are never retried automatically; a confirmation cannot be dismissed while its request is in flight; every destructive action goes through one confirmation pattern.                                | [ADR 0021](../../docs/adr/0021-writes-are-sent-once-and-confirmations-lock.md)                             |
| BR11 | New configuration values (commission rate, fees, expiry, escrow hold) apply to listings and payouts created from now on — never retroactively.                                                            | Journey 13, Page 27                                                                                        |
| BR12 | An external identity links to an existing account only when the provider says the email is verified **and** the account confirmed that same address. A deleted account is never signed back in.           | RATIFIED_DIVERGENCES › Closed 12 Sept; [ADR 0020](../../docs/adr/0020-external-sign-in-is-native-oauth.md) |
| BR13 | Email verification is recorded but does not gate use of the platform.                                                                                                                                     | RATIFIED_DIVERGENCES › Deferred notes                                                                      |
| BR14 | Newsletter subscription is double opt-in: nothing is added until the person confirms, and copy never promises a scheduled issue until a sender exists.                                                    | [ADR 0023](../../docs/adr/0023-newsletter-uses-double-opt-in.md)                                           |
| BR15 | No fabricated data: figures, inventory, place markers and testimonials come from the API or are not shown. A promoted placement is always labelled as promoted.                                           | RATIFIED_DIVERGENCES › Landing page; [ADR 0015](../../docs/adr/0015-map-surfaces-wait-on-coordinates.md)   |
| BR16 | A listing view is recorded once per property per session; view-derived metrics (save rate, demand rank) read that count.                                                                                  | RATIFIED_DIVERGENCES › Closed 9 Sept                                                                       |
| BR17 | Commission shown on admin surfaces is an estimate (volume × configured rate) and is labelled as one.                                                                                                      | RATIFIED_DIVERGENCES › Admin overview rebuild                                                              |
| BR18 | Anonymous visitors cannot save, offer, message or schedule.                                                                                                                                               | Phase 3 › Permissions Matrix                                                                               |

---

## KPIs (MVP 1.5 Success)

| KPI                          | Target         | Rationale                                |
| ---------------------------- | -------------- | ---------------------------------------- |
| **Buyer Signup Completion**  | >70%           | Drop-off is revenue blocker              |
| **Property Search → Offer**  | <14 days       | Buyer goal: 2 weeks start-to-finish      |
| **Agent Adoption**           | >50% of active | Network effects: need critical mass      |
| **Transaction Close Rate**   | >60%           | Deal completion = platform health        |
| **Avg Time to Close**        | <45 days       | vs. 90 days traditional                  |
| **NPS (Net Promoter Score)** | >50            | Benchmark: >40 is good, >60 is excellent |
| **Uptime**                   | 99.95%         | Trust requires reliability               |
| **Fraud Rate**               | <0.5%          | Trust metric                             |
| **Lighthouse Score**         | >90            | Performance = conversion                 |

> **Ratified divergence (Phase 1 · KPI table).** NPS is measured today only as `averageRating` over `Review.rating` (1–5), which answers a different question. **Deferred:** signup completion, search → offer and NPS have no product analytics behind them. See RATIFIED_DIVERGENCES.

### North Star Metric

**Accepted offers per month** — the count of offers reaching `ACCEPTED`. It is the one event that needs every side of the marketplace to have worked: inventory, discovery, evaluation, viewing, negotiation and trust. _(Assumption — the earlier run named no North Star; owner to confirm.)_

---

## Competitive Positioning

Reference products are benchmarks for features and flows only.

| Feature                 | Traditional Realtor | Zillow            | Our Platform               |
| ----------------------- | ------------------- | ----------------- | -------------------------- |
| Property Discovery      | Limited (agent-fed) | Excellent         | ✅ Best-in-class           |
| Offer Workflow          | Paper/email         | Unavailable       | ✅ Integrated, transparent |
| Real-time Collaboration | Slow                | Unavailable       | ✅ Real-time               |
| Agent Tools             | Separate CRM        | Limited           | ✅ Full pipeline CRM       |
| Data Transparency       | Low                 | Medium            | ✅ Maximum transparency    |
| Buyer Empowerment       | None                | Self-service only | ✅ Data + agent support    |

**Differentiation:** Transparency + real-time collaboration + agent tools = faster, fairer, more human deals.

> **Deferred (Phase 1 · Competitive table).** Real-time collaboration has no transport yet — message threads refresh on a stale time plus invalidation after sending. See RATIFIED_DIVERGENCES › Deferred.

---

## Product Principles

How the product behaves and treats its users. Numbering is stable; RATIFIED_DIVERGENCES cites these by number.

### 1. Transparency First

Every number, timeline, process should be visible. No hidden fees, no opaque agent gatekeeping.

### 2. Human-Centered

Technology serves the deal, not bureaucracy. Real people, real communication, real time.

### 3. Efficiency Over Friction

Every page should move the deal forward. No fluff, no forms that don't matter.

### 4. Trust is Earned

Accurate data, verified users and fast response times build trust.

### 5. Mobile-First

Buyers and agents are on-the-go. Responsive, fast, works offline where possible.

> **Ratified divergence (Phase 1 · Principle 5).** Marketing surfaces serve every device; the portals are deliberately desktop-first, and there is no offline capability. See RATIFIED_DIVERGENCES.

### 6. Data-Driven

Show comparables, market trends, analytics. Give users the information to decide.

### 7. Thoughtful Details

Considered interactions and thoughtful copy. Real estate is emotional—respect that.

---

## Brand Voice

Applies to copy — the words the product uses. Visual identity is governed by the code, not by this design OS.

- **Tone:** Confident, professional, human (not corporate)
- **Language:** Clear, no jargon, explain context
- **Copy:** Active voice, outcomes-focused ("You'll close faster" not "We streamline processes")
- **Honesty:** Small true numbers beat large false ones; copy never promises a feature that does not ship (BR15)

---

## Governance

| Question                           | Authority                                                                                                                  |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Where code goes, how it is written | `.claude/CLAUDE.md` at the repo root — binds code, and wins where it disagrees with this design OS                         |
| What the product does (intent)     | Phases 1–7 of this design OS                                                                                               |
| How far along each feature is      | [Phase 8 › Per-feature Build Status](phase-8-implementation-roadmap.md#per-feature-build-status) — status lives there only |
| Where code and spec part company   | [RATIFIED_DIVERGENCES.md](../INDEX/RATIFIED_DIVERGENCES.md) — owner decisions; phases are not edited to close gaps         |
| Decisions expensive to reverse     | `docs/adr/`                                                                                                                |
| How any page looks                 | Decided at build time with the owner (Visual Design Hand-off); governed by the code, not by this design OS                 |
| Removing a specified feature       | Only on an explicit owner instruction naming the feature                                                                   |

---

## Platform Constraints

- **Frontend:** Next.js App Router, React, TypeScript strict. Public pages render on the server; portals render client consoles over TanStack Query ([ADR 0002](../../docs/adr/0002-per-route-rendering-split.md)).
- **Backend:** All data comes from the NestJS backend in `../backend`. The frontend has no App Router API routes of its own apart from one static-asset route handler for MapLibre workers (Phase 7).
- **Region:** Production runs in Europe ([ADR 0019](../../docs/adr/0019-production-runs-in-europe.md)).
- **Payments:** Stripe, with escrow held and released under BR2.
- **Email:** SMTP transactional email; the email service degrades to a logged warning when unconfigured, which is why verification cannot gate (BR13).
- **Maps and places:** MapLibre GL with OpenFreeMap tiles (keyless); nearby places from OpenStreetMap Overpass, cached per coordinate cell ([ADR 0015](../../docs/adr/0015-map-surfaces-wait-on-coordinates.md)).
- **External sign-in:** Native OAuth for Google and Facebook; Apple deferred on a paid developer account ([ADR 0020](../../docs/adr/0020-external-sign-in-is-native-oauth.md)).
- **Accessibility:** WCAG 2.2 AA.
- **Dependencies:** Nothing is installed without the owner's approval (Library Selection Policy, [Phase 7](phase-7-frontend-architecture.md#shared-libraries)).

---

## Implementation Philosophy

- **Intent before code, status beside it.** Phases 1–7 record intent; Phase 8 records progress. Absence from the codebase is evidence about the codebase, not about the spec.
- **The cheap half makes the expensive half real.** Several features shipped backend-first and only became real when something rendered them (RATIFIED_DIVERGENCES › Closed 9 Sept). Every specified backend capability needs a surface.
- **Honest states over flattering ones.** An outage must not look like a quiet market; a failed lookup is told apart from an empty one.
- **One source per fact.** Counts, labels and totals that describe the same thing derive from one place.
- **The owner decides the look.** Each page's visual concept is proposed and approved at build time.

---

## Non-goals

Only those the record supports. Deferred features are **not** non-goals — they carry a status in Phase 8.

1. **Offline-capable portals** — ratified (Principle 5 divergence).
2. **Fabricated or placeholder figures, inventory or testimonials** — ratified (BR15).
3. **A public review feed without reviewer consent** — ratified (Landing page, Page 1 module 4 · trust).
4. **Visual prescription in this design OS** — the look is decided per page at build time.

---

## Future Scalability Considerations

- **Scale target:** millions of listings. Search stays server-paginated and filtered on the server, including the map's bounding box.
- **Real-time transport** for messaging and notifications (deferred) — the query-key layer is where invalidation would attach.
- **Market data:** sold-price history, a valuation source and buyer-facing trend and region analytics (deferred).
- **Agent collaboration and a representation model** (deferred, ADR 0018).
- **Product analytics** to measure the funnel KPIs (deferred).
- **Additional sign-in providers** (Apple deferred).
- **Internationalisation:** base currency and reporting timezone are already platform settings (Page 27).

---

## Success Metrics (Long-term)

**16-week MVP 1.5:**

- 27 pages live
- Lighthouse >90, WCAG AA compliant
- 99.95% uptime
- NPS >50
- <0.5% error rate

> **Ratified divergence (Phase 1 · Long-term metrics).** 44 routes against 27 pages — a count, not a conformance claim. The routes that had no blueprint now carry one as Pages 28–46 in [Phase 4](phase-4-page-blueprints.md#added-pages-28-46).

**Year 1:**

- 10k+ active buyers
- 1k+ agent partners
- $500M+ GMV (gross merchandise value)
- Market leader in transparency + speed

---

## Assumptions

1. The North Star (accepted offers per month) is proposed in this regeneration; the earlier run named none.
2. Admin JTBD are distilled from Persona 4 and Journeys 8–13; they add no scope.
3. Business rules BR1–BR18 are drawn from existing ADRs, journeys and RATIFIED_DIVERGENCES; none is new behaviour.

---

## Regeneration Notes

Version 2.0 regenerates this phase under the 9-phase master prompt as a merge; everything in version 1 survives.

- **Added:** business vision, product purpose, business goals, value proposition, roles table, Admin JTBD, business rules BR1–BR18, North Star, governance, platform constraints, implementation philosophy, non-goals, future scalability, assumptions, inline divergence pointers.
- **Changed:** "Design Principles" renamed "Product Principles". Principle 4 drops "Professional design". Principle 7 "Delightful Details" becomes "Thoughtful Details" and drops "Polished interactions, smooth animations". Brand Voice drops the visual line "Design: Premium but approachable, modern, trustworthy" and gains an honesty line.
- **Changed — screen content removed (30 September 2026, seed-prompt Self-Audit):** Implementation Philosophy "Counts, badges and totals" → "Counts, labels and totals"; the review-feed divergence pointer names its subject ("Page 1 module 4 · trust").

---

**Phase 1 Complete.** This vision guides all downstream phases. Next: [Phase 2 — Experience Maps](phase-2-experience-maps.md).

# Ratified Divergences

**Real Estate Platform | Companion to Phases 1–10 | Last reviewed 9 September 2026**

---

## What this file is

The ten phase documents in `CORE-PHASES/` are the design record. They are **not edited when the code disagrees with them** — a blueprint that is quietly rewritten to match whatever shipped stops being a specification and becomes a changelog.

So divergences land here instead. Every entry names the phase text it departs from, states what the app does instead, and says whether that is a **ratified** decision (the code is right, the spec has fallen behind) or a **deferral** (the spec is right, the work is scheduled behind a stated precondition).

Nothing in `CORE-PHASES/` has been removed or reworded to accommodate anything on this page.

**Authority is unchanged:** `.claude/CLAUDE.md` binds code. `CORE-PHASES/` explains the design reasoning. This file reconciles the two where they part company.

---

## Ratified — the code is right

The spec has fallen behind these. Each is a considered decision that predates or supersedes the blueprint.

| Phase reference              | Blueprint says                                                      | App does                                                                                                                                        | Recorded in                                                                 |
| ---------------------------- | ------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| Page 9 · Saved Listings      | Card grid                                                           | Dense table                                                                                                                                     | Density rule, `.claude/CLAUDE.md`                                           |
| Page 2 module 5 · Section 35 | Price range slider                                                  | Discrete price-band chips with live facet counts                                                                                                | —                                                                           |
| Page 7 · Reset Password      | OTP verification as the middle step                                 | Tokenised email link (request → emailed link → set new password)                                                                                | —                                                                           |
| Page 1 · How It Works        | Four steps: Search → View → Offer → Close                           | The Concierge scroll-narrative                                                                                                                  | —                                                                           |
| Page 17 · Leads              | Status New / Contacted / Qualified / Lost                           | `pending / accepted / declined`, mapped from `ConnectionStatus`                                                                                 | [ADR 0016](../../docs/adr/0016-lead-temperature-is-derived.md)              |
| Page 15 · Agent Dashboard    | Route `/agent/dashboard`                                            | Route `/agent`                                                                                                                                  | —                                                                           |
| Section 48 · Footer content  | Named only as footer link text                                      | Seven pages written without a Phase 4 blueprint                                                                                                 | —                                                                           |
| Section 48 · Privacy         | Named only as footer link text                                      | A contents rail that tracks the reader's position as they scroll                                                                                | [ADR 0017](../../docs/adr/0017-screen-classes-are-named-by-state-source.md) |
| Phase 1 · Core Personas      | Four personas; the Modern Agent and the Seller are different people | Three roles — `SELLER` carries both personas, and `/agent` serves both                                                                          | [ADR 0018](../../docs/adr/0018-the-seller-is-the-agent.md)                  |
| Phase 1 · Principle 5        | Mobile-first, "works offline where possible"                        | Marketing surfaces are responsive; the portals are a deliberately desktop-dense application register, and there is no offline capability at all | Density rule, `.claude/CLAUDE.md`                                           |
| Phase 1 · KPI table          | NPS > 50                                                            | `averageRating` over `Review.rating` (1–5)                                                                                                      | —                                                                           |
| Phase 1 · Long-term metrics  | 27 pages live                                                       | 44 routes, at week 8.5 of a 16-week plan                                                                                                        | —                                                                           |

### Notes on the entries without an ADR

**Saved listings as a table.** The density rule in `.claude/CLAUDE.md` puts dashboards, panels and lists in the application register. A card grid for a saved collection trades rows-per-screen for whitespace, which is the wrong trade on a screen whose whole job is comparison.

**Price chips over a slider.** Chips carry a facet count per band; a slider cannot. On a catalogue where the price distribution is long-tailed and sparse, the count is the information the buyer actually needs, and a continuous control implies a granularity the inventory does not have.

**Token link over OTP on password reset.** A single-use link in the mailbox proves the same thing a six-digit code proves, with one fewer thing to transcribe. This is _not_ the same decision as signup verification — see the deferral below, where OTP is still owed.

**The seven footer pages.** design-os names About, Help, Blog, Privacy, Terms and Accessibility as footer link text in Section 48 but never blueprints any of them as a page, so there was no spec to build to and the audit was right that the spec was complicit in the dead links. They are now written, and the content is grounded in what the platform actually does rather than in boilerplate — the privacy page names the real processors (Stripe, Cloudinary, SendGrid, Twilio, OpenFreeMap) and the real retention behaviour, and the accessibility page states the keyboard gap on the pipeline drag rather than claiming full conformance.

`/privacy` has since gained a contents rail that marks the section the reader has reached — the first instance of the reactive-document class outside the home Concierge, and the reason [ADR 0017](../../docs/adr/0017-screen-classes-are-named-by-state-source.md) exists. The page stays a server tree; only the rail is a client leaf.

`/blog` ships as a data-driven index with no entries and an honest empty state. Inventing articles would have been the same fabrication refused elsewhere; adding entries is a content task, not a code one.

**The legal two need review.** `/privacy` and `/terms` are accurate descriptions of system behaviour written by an engineer, not reviewed advice. They are linked from the signup consent copy, so they had to exist — but they should be read by someone qualified before launch.

**Concierge over "How It Works".** A different idea rather than a missing one: the four-step strip explains a process, the scroll narrative sells a service. The narrative is what the marketing surface wanted.

**Mobile-first versus the density rule.** These are two rules pulling opposite ways, and the code follows the newer one. Phase 1 asks for mobile-first; `.claude/CLAUDE.md` puts every dashboard, panel, sidebar and form in a compact application register at the smallest exposed type size. The portals are built to that rule: roughly 172 responsive utilities across the whole component tree, no `clamp()` in either stylesheet, and exactly one horizontal-scroll container in the app — the home page's sales carousel. The dense portal tables have none, so a narrow viewport has nowhere to put them. The marketing surfaces are genuinely responsive; the thirty portal routes are desktop-first, deliberately.

**Offline was never started.** No web app manifest, no service worker, no cache strategy. The phrase in Phase 1 is hedged — "where possible" — and the honest reading is that it was aspiration, not scope.

**NPS is not the average rating.** `Review.rating` is a 1–5 satisfaction score on a settled transaction, and `averageRating` computes it. NPS asks a 0–10 recommendation question and nets promoters against detractors. The platform has an instrument, and it answers a different question; there is no survey mechanism of any kind.

**44 routes against 27 pages.** A count, not a conformance claim. The blueprint's twenty-seven pages are tracked page by page in the tables above and in the closed list below; the extra routes are the seven prose pages, the map route and the per-entity detail routes that Phase 4 folded into their parents.

---

## Deferred — the spec is right, the work is scheduled

These are **not** ratified. The blueprint stands, and each is blocked on a stated precondition rather than a disagreement.

| Phase reference                   | Owed                                                                | Blocked on                                                                                                 | Recorded in                                                |
| --------------------------------- | ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| Page 5 · Sign Up                  | OTP email-verification step                                         | No backend OTP endpoint; `VerificationType.EMAIL` exists but is unwired                                    | —                                                          |
| Phase 3 sitemap · `/verify-email` | The route                                                           | same                                                                                                       | —                                                          |
| Page 5 · Sign Up                  | Facebook OAuth **working**                                          | No OAuth strategy exists on the backend for _any_ provider                                                 | —                                                          |
| Page 19 · Calendar                | Google Calendar sync                                                | No calendar integration                                                                                    | —                                                          |
| Page 3 module 5 · Section 10      | School / transit / park / restaurant pins                           | No POI dataset — the map and the listing pin now render                                                    | ADR 0015                                                   |
| Phase 1 · Buyer JTBD 1            | "Understand the market" — comparable prices, trends, neighbourhoods | No sold-price history is modelled; `/stats/trend` and `/stats/regions` exist but are admin-only            | —                                                          |
| Phase 1 · Competitive table       | Real-time collaboration                                             | No socket, SSE or polling transport — threads are `useQuery` with a five-minute `STALE_TIME`               | —                                                          |
| Phase 1 · Principle 4             | Verified users                                                      | KYC submission now ships in buyer and agent settings; `emailVerified` is still never written — no OTP path | —                                                          |
| Phase 1 · Agent JTBD 2            | Qualify leads on buyer budget and readiness                         | No buyer financial field exists; the view model now says `Lead.listingPrice`, which is what it always held | —                                                          |
| Phase 1 · Agent JTBD 4            | Collaborate with other agents                                       | No representation model                                                                                    | [ADR 0018](../../docs/adr/0018-the-seller-is-the-agent.md) |
| Phase 1 · Seller JTBD 1           | Price guidance when listing                                         | No valuation source; sold comparables are not modelled                                                     | —                                                          |
| Phase 1 · Seller JTBD 4           | Closing steps visible to the seller                                 | The buyer's offer detail reads `DealMilestone`; no agent-side surface does                                 | —                                                          |
| Phase 1 · KPI table               | Signup completion, search → offer, NPS                              | No product analytics; the funnel is unrecorded (stage 12 of the field guide)                               | —                                                          |

### Notes

**The map surfaces are built.** MapLibre GL was taken as the dependency and the three surfaces shipped: `/map` (Page 4), the Map option on the search view toggle (Page 2 module 5), and a placed map on listing detail (Page 3 module 5). Tiles come from OpenFreeMap, which needs no key, and the origin is pinned in the CSP alongside `worker-src blob:` for MapLibre's workers.

One part of Section 10 is still owed and is listed above: the school / transit / park / restaurant markers and their toggleable legend. Those need a POI dataset the platform does not have, and inventing pin positions for schools would be exactly the fabrication ADR 0015 refused for listings. The map, the listing's own pin and a status legend are real today.

**Signup OTP.** The schema is closer than it looks: `VerificationToken` and `VerificationType.EMAIL` both exist, `User.emailVerified` exists and is surfaced, and `PhoneVerification` is already OTP-shaped (`code`, `attempts`, `expiresAt`). What is missing is that `AuthService.register` never mints an EMAIL token and never calls the email service. Two endpoints — send and verify — close this.

**Facebook.** The mark, the label and the row layout are now built, so adding `facebook` to `NEXT_PUBLIC_AUTH_PROVIDERS` renders it correctly. It will then point at `/auth/facebook`, which does not exist — and neither does `/auth/google` or `/auth/apple`. `strategies/` contains only `jwt.strategy.ts`. The frontend is ready for all three; the backend is ready for none.

**Five rows were the same shape — the backend built and nothing rendering it — and four and a half of them are now closed.** `Dispute` had models, admin endpoints, an API client and four hooks that no component imported; it now has `/admin/disputes`. `POST /flags` accepted `USER`, `PROPERTY` and `MESSAGE` reports while the moderation queue hard-filtered to `PROPERTY` and no surface created a flag at all; member and message reports now triage at `/admin/flags`, and a report control on the listing page and on every received message finally feeds the queue. Escrow release and refund were exposed with no admin control; the escrow queue now settles a hold under ADR 0008's authorisation. `useSubmitKyc` had no non-admin consumer, so admins reviewed an identity queue no user could feed; buyer and agent settings now submit one. The half that remains is `DealMilestone`: the buyer's offer detail reads it, the agent's does not, so the seller still cannot see the closing steps on the deal they are selling.

None of the five was a schema problem, which is the pattern worth keeping: the expensive half was built first and the cheap half was what made it real.

**Real-time.** There is no transport for it. No `WebSocketGateway`, no `@nestjs/websockets`, no SSE, and no `refetchInterval` anywhere in `lib/hooks/`. Message threads are `useQuery` with `STALE_TIME` of five minutes plus invalidation after sending, so the sender sees their own message immediately and the recipient may not see it for five minutes. The competitive table's "Real-time Collaboration ✅" is the one positioning claim the code contradicts outright.

**Market understanding.** The listing page's "comparables" are currently-active listings in the same locality, not sold comps — `soldMonthsAgo` is declared on the listing type and never populated by the mapper, so the "sold N months ago" branch is unreachable. Trend and region analytics do exist and are computed well; they are gated to `ADMIN`. Giving buyers market context is mostly a question of which audience the existing endpoints serve, plus a sold-price history the schema does not yet keep.

---

## Closed on 9 September 2026

The four "built, nothing renders it" rows above, plus one measurement the app had been claiming without collecting.

| Phase reference                       | What shipped                                                                                                                       |
| ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Phase 1 · Admin goal                  | `/admin/disputes` — queue, evidence, disputed deals, resolve and dismiss with a required outcome note                              |
| Phase 1 · Admin goal                  | `/admin/flags` — member and message reports, upheld or dismissed                                                                   |
| Phase 1 · Principle 1                 | A report control on the listing page (listing or agent) and on every received message — the first way to raise one                 |
| Phase 1 · Admin goal                  | Escrow release and refund from the payments queue, refund reason required, per ADR 0008                                            |
| Phase 1 · Principle 4                 | Identity submission in buyer and agent settings, with the review state and any rejection reason shown back                         |
| Phase 1 · Agent JTBD 1, Seller JTBD 2 | Listing views are recorded again — `recordView` had no caller, so every view count, save rate and demand rank read a seeded number |

### Notes

**The view counter was measuring nothing.** `propertiesAPI.recordView` existed and was called from nowhere, while `viewsCount` drove the agent's views column, the save-rate percentage, the demand ranking and the listings sort. A listing page now records one view per property per session, so those four numbers describe traffic instead of seed data. Every historical value predating this is seed.

**`Lead.budget` was never a budget.** It mapped to `connection.property.price` — the asking price of the listing enquired about, identical for every lead on the same listing — while the agent's lead desk sorted and summed by it. The field is now `Lead.listingPrice`, which is what it always was. The displayed labels were already honest ("Value", "Listing value"), so nothing on screen changed; the deferred row above still stands, because no buyer financial field exists to replace it.

---

## Closed on 8 September 2026

Everything below was in the conformance ledger's "built, modules short" bucket and is now built. Listed so this file records what _stopped_ being a divergence, not only what remains one.

| Phase reference                    | Module                                                               |
| ---------------------------------- | -------------------------------------------------------------------- |
| Page 8 module 4                    | New Alerts on the buyer dashboard                                    |
| Page 8 module 5                    | Quick Links on the buyer dashboard                                   |
| Page 15                            | Quick links on the agent dashboard                                   |
| Page 20 module 7                   | Quick Actions on the admin overview                                  |
| Page 27 module 3                   | Reporting Timezone on the platform panel                             |
| Page 27 modules 5 & 6 · Section 69 | Moderation Policy and Operations toggle groups — all eight switches  |
| Page 27 module 7 · Section 70      | Maintenance Panel                                                    |
| Page 18 · Section 42               | Pipeline drag-to-change-stage and the per-deal detail modal          |
| Page 19                            | Create event on the agent calendar                                   |
| Page 17                            | hot / warm / cold scoring on leads                                   |
| Page 5                             | Password strength meter; Facebook provider mark                      |
| Section 23                         | Attach control on the message composer                               |
| Section 25                         | Document Share — document cards, thread panel, offer detail          |
| Section 38                         | File Upload — drag-drop zone, progress bar, type and size limits     |
| ADR 0015 precondition              | Property coordinates, `Listing` carrying them, viewport filtering    |
| Section 16                         | Offer Form — move-in date, contingencies, earnest money, review step |
| Section 21                         | Inspection / Appraisal Tracker — the post-acceptance checklist       |
| Page 4 · Map View                  | The route, with filter rail, pin peek card and legend                |
| Page 2 module 5                    | Map option on the search view toggle                                 |
| Page 3 module 5 · Section 10       | Placed map on listing detail (POI markers still owed)                |
| Page 1 · Latest Sales              | A map of recent closed sales beside the card row                     |

### Two implementation notes worth carrying forward

**Section 16 captures structure, not prose.** The form previously squashed every condition into one free-text terms field, which an agent could read but the system could not filter, compare or enforce. `Offer` now carries `moveInDate`, `earnestMoney` and a `Contingency[]`, so a contingency is a value rather than a sentence. The free-text field survives as "Additional notes", which is what it always actually was.

The spec's `Submit → review summary modal → confirm submit` is built as a second step inside the same modal rather than a modal on top of a modal — same guarantee, one less layer.

**Section 21's milestones are seeded, not created by hand.** Four `DealMilestone` rows are written the moment an offer is accepted, at the single choke point (`lockAcceptedDeal`) both acceptance paths already run through. A contingency the buyer did not take is seeded as `WAIVED` rather than omitted, so the checklist always shows four rows and a waived condition reads as a deliberate choice instead of a gap. `CLOSING` is always present because every deal has one.

Overdue is derived, never stored: a `SCHEDULED` milestone whose `dueAt` has passed renders as overdue. Nothing has to run on a schedule to keep that honest.

**Section 42 drag semantics.** The blueprint says "Drag → change status (column)". On this domain a deal stage is _derived_ — from whether an offer exists and whether a transaction has opened — and the agent is not the actor at most of those boundaries. Only the buyer can submit an offer; only the buyer completes payment.

So a drop is treated as a request to advance, resolved against what the agent can actually do. Dragging out of **Offers** accepts or declines the live offer, which are real mutations the agent owns. Every other drop is refused with a reason naming who must act — "Only _{buyer}_ can submit an offer on this property." The rules live in `dealMove` in `lib/data/agent-pipeline.ts`, and the same accept/decline actions are available from the detail modal, so the board is operable without a pointer.

---

## Adding to this file

An entry is owed whenever the code and a phase document part company. State the phase reference, what each side says, and which one is right. If the code is right and the reversal would be expensive, write an ADR in `docs/adr/` and link it. **Do not edit `CORE-PHASES/` to close the gap.**

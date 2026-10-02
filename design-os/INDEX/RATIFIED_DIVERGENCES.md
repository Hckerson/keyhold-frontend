# Ratified Divergences

**Keyhold | Companion to Phases 1–9 | Last reviewed 29 September 2026**

---

## What this file is

The nine phase documents in `CORE-PHASES/` are the design record. (Until 29 September 2026 there were ten; see [Design OS 2.0 regeneration](#design-os-20-regeneration--29-september-2026). Page, section and phase references below are unchanged by it.) They are **not edited when the code disagrees with them** — a blueprint that is quietly rewritten to match whatever shipped stops being a specification and becomes a changelog.

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

| Phase reference             | Owed                                                                | Blocked on                                                                                                 | Recorded in                                                         |
| --------------------------- | ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| Page 5 · Sign Up            | Apple sign-in                                                       | Paid Apple developer account and a `.p8` signing key                                                       | [ADR 0020](../../docs/adr/0020-external-sign-in-is-native-oauth.md) |
| Phase 1 · Buyer JTBD 1      | "Understand the market" — comparable prices, trends, neighbourhoods | No sold-price history is modelled; `/stats/trend` and `/stats/regions` exist but are admin-only            | —                                                                   |
| Phase 1 · Competitive table | Real-time collaboration                                             | No socket, SSE or polling transport — threads are `useQuery` with a five-minute `STALE_TIME`               | —                                                                   |
| Phase 1 · Agent JTBD 2      | Qualify leads on buyer budget and readiness                         | No buyer financial field exists; the view model now says `Lead.listingPrice`, which is what it always held | —                                                                   |
| Phase 1 · Agent JTBD 4      | Collaborate with other agents                                       | No representation model                                                                                    | [ADR 0018](../../docs/adr/0018-the-seller-is-the-agent.md)          |
| Phase 1 · Seller JTBD 1     | Price guidance when listing                                         | No valuation source; sold comparables are not modelled                                                     | —                                                                   |
| Phase 1 · KPI table         | Signup completion, search → offer, NPS                              | No product analytics; the funnel is unrecorded (stage 12 of the field guide)                               | —                                                                   |

### Notes

**The map surfaces are built.** MapLibre GL was taken as the dependency and the three surfaces shipped: `/map` (Page 4), the Map option on the search view toggle (Page 2 module 5), and a placed map on listing detail (Page 3 module 5). Tiles come from OpenFreeMap, which needs no key, and the origin is pinned in the CSP alongside `worker-src blob:` for MapLibre's workers.

Section 10's place markers render too, and they are not invented. `GET /properties/:id/nearby` asks OpenStreetMap's Overpass API for named schools, railway stations, parks and restaurants within 1.5 km of the listing's coordinates, and caches the answer for 24 hours per coordinate cell of roughly 100 m. The neighbourhood tab fetches only when it opens, plots the places beside the listing's own pin, and carries a four-way toggle that is also the colour key and the count per kind. A listing without coordinates, or an area OpenStreetMap has not mapped, shows no places — the line ADR 0015 drew against fabricating positions.

A failed lookup is told apart from a genuinely empty one. `fetchNearby` returns `null` when Overpass errors or times out and an array when it answers, so a real "nothing within 1.5 km" is cached for the full 24 hours while a failure is cached for five minutes and then retried. The visitor still sees no places either way; the difference is that an outage costs one map, not a day of them.

**Signup OTP shipped.** `AuthService.register` now mints a six-digit `EMAIL` code and emails it, and `/verify-email` confirms or resends it — the send and verify endpoints this note once listed as missing.

**Email verification does not gate anything.** The code is minted at register, emailed, and `/verify-email` writes `User.emailVerified` — but an unverified account still signs in and uses the platform, and the step offers "Do this later".

That is deliberate. `EmailService` degrades to a logged warning when SMTP is unconfigured (`email.service.ts:76-81`), so a hard gate would lock every user out of any environment without mail credentials — including local and CI. Gating is a product decision to take once delivery is provably reliable; the flag it would read is now real.

**External sign-in works for Google and Facebook.** Both are implemented natively against each provider's HTTP API — no Passport strategy and no new dependency — with PKCE, an HMAC-sealed state cookie, and Google's `id_token` verified against its JWKS by `node:crypto`. [ADR 0020](../../docs/adr/0020-external-sign-in-is-native-oauth.md) records why, and what it refused.

Listing a provider in `NEXT_PUBLIC_AUTH_PROVIDERS` is what renders its button, and credentials are what make it work: each provider needs its client ID and secret plus its redirect URI registered against `API_PUBLIC_URL`. Unconfigured, the client logs a warning and the route redirects to `/login?oauth=unavailable` rather than failing silently.

**Apple stays deferred**, and is listed above. The mark still renders if `apple` is listed, so it must stay out of that variable until the developer account and `.p8` key exist.

**Five rows were the same shape — the backend built and nothing rendering it — and all five are now closed.** `Dispute` had models, admin endpoints, an API client and four hooks that no component imported; it now has `/admin/disputes`. `POST /flags` accepted `USER`, `PROPERTY` and `MESSAGE` reports while the moderation queue hard-filtered to `PROPERTY` and no surface created a flag at all; member and message reports now triage at `/admin/flags`, and a report control on the listing page and on every received message finally feeds the queue. Escrow release and refund were exposed with no admin control; the escrow queue now settles a hold under ADR 0008's authorisation. `useSubmitKyc` had no non-admin consumer, so admins reviewed an identity queue no user could feed; buyer and agent settings now submit one. `DealMilestone` carried inspection, appraisal and financing state that only admin components read; the buyer's offer detail and the agent's deal drawer now both read it, through one hook.

None of the five was a schema problem, which is the pattern worth keeping: the expensive half was built first and the cheap half was what made it real.

**Real-time.** There is no transport for it. No `WebSocketGateway`, no `@nestjs/websockets`, no SSE, and no `refetchInterval` anywhere in `lib/hooks/`. Message threads are `useQuery` with `STALE_TIME` of five minutes plus invalidation after sending, so the sender sees their own message immediately and the recipient may not see it for five minutes. The competitive table's "Real-time Collaboration ✅" is the one positioning claim the code contradicts outright.

**Market understanding.** The listing page's "comparables" are currently-active listings in the same locality, not sold comps — `soldMonthsAgo` is declared on the listing type and never populated by the mapper, so the "sold N months ago" branch is unreachable. Trend and region analytics do exist and are computed well; they are gated to `ADMIN`. Giving buyers market context is mostly a question of which audience the existing endpoints serve, plus a sold-price history the schema does not yet keep.

---

## Closed on 17 September 2026

A sixth row of the same shape as the five closed on 9 September: the backend lookup shipped with `cffe088`, and nothing called it.

| Phase reference              | Module                                                                                                |
| ---------------------------- | ----------------------------------------------------------------------------------------------------- |
| Page 3 module 5 · Section 10 | School, transit, park and restaurant markers on listing detail, from OpenStreetMap, with a toggle key |

---

## Closed on 12 September 2026

The last two rows that were blocked on an integration nobody had built.

| Phase reference    | Module                                                                                                                              |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| Page 5 · Sign Up   | Google and Facebook sign-in, native — `AuthIdentity` links a provider account to a member, and only a mutually verified email links |
| Page 19 · Calendar | One-way Google Calendar push — a confirmed viewing writes an event, a cancellation or reschedule removes it                         |

Both sit on one foundation, since a calendar grant is the same authorization-code flow as a Google sign-in with one more scope. The security-relevant half is the linking rule: an identity attaches to an existing account only when the provider says the email is verified **and** the account confirmed that same address, which closes the pre-account-takeover where someone registers a victim's address, never confirms it, and waits to be merged into. A deleted account is never signed back in.

Calendar push is fire-and-log by construction: Google failing can never fail a viewing, and a grant revoked on Google's side is detected on the next refresh and the connection dropped, so the screen offers to reconnect instead of claiming a connection that no longer works.

---

## Closed on 9 September 2026

The four "built, nothing renders it" rows above, plus one measurement the app had been claiming without collecting.

| Phase reference                       | What shipped                                                                                                                                                            |
| ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Phase 1 · Admin goal                  | `/admin/disputes` — queue, evidence, disputed deals, resolve and dismiss with a required outcome note                                                                   |
| Phase 1 · Admin goal                  | `/admin/flags` — member and message reports, upheld or dismissed                                                                                                        |
| Phase 1 · Principle 1                 | A report control on the listing page (listing or agent) and on every received message — the first way to raise one                                                      |
| Phase 1 · Admin goal                  | Escrow release and refund from the payments queue, refund reason required, per ADR 0008                                                                                 |
| Phase 1 · Principle 4                 | Identity submission in buyer and agent settings, with the review state and any rejection reason shown back                                                              |
| Phase 1 · Seller JTBD 4, Buyer JTBD 6 | Closing steps on an accepted deal, in the agent's pipeline drawer as well as the buyer's offer detail — dates, completion and document attachment, from one shared hook |
| Phase 1 · Agent JTBD 1, Seller JTBD 2 | Listing views are recorded again — `recordView` had no caller, so every view count, save rate and demand rank read a seeded number                                      |
| Page 5 · Sign Up, Phase 3 sitemap     | Email OTP — a six-digit code minted at register, `/verify-email` to confirm or resend, and `User.emailVerified` written for the first time                              |
| Phase 1 · Principle 4                 | `emailVerified` is a real signal now rather than a seeded one                                                                                                           |
| Section 38 · Profile photo            | The avatar upload persists — `POST /users/me/avatar` over Cloudinary, replacing the local-preview-only control                                                          |

### Notes

**Both parties now see the same closing steps.** `Deal` gained `acceptedOfferId`, because `openOfferId` only ever held a `PENDING` or `COUNTERED` offer and milestones open on the accepted one. The date, completion and attachment logic that lived inside `useOfferDetail` moved to `useDealMilestones`, which both sides call — so a change to how a milestone is set cannot drift between the buyer's view and the agent's.

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

## Admin overview rebuild — 22 September 2026

Page 20 was rebuilt from its primitives up. Three modules now diverge from the blueprint, and the code is right in each case.

| Phase reference  | Blueprint says                                                                  | App does                                                                                                    | Why                                                                                                                                                                                           |
| ---------------- | ------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Page 20 module 4 | System Alerts panel beside a separate Moderation Queue panel (module 6)         | One "Needs a Decision" panel: each queue's open count and oldest-item age, oldest first                     | With no alert feed in the API, both panels were derived from the same four queue counts and showed the same facts twice. The age tone carries the severity the alert rows were meant to show. |
| Page 20 module 5 | Revenue Breakdown: commissions YTD, GMV YTD, take rate, avg commission per deal | Folded into the revenue hero as one line: estimated commission on the latest month at the default take rate | Commission is volume × `DEFAULT_COMMISSION_RATE`, not a ledger figure, so it is labelled an estimate. Take rate is a config constant, not a measurement. GMV already sits in the stat band.   |
| Page 20 module 7 | Quick Actions panel                                                             | Removed                                                                                                     | All four links duplicate the sidebar and the panel-header links on the same screen. This reopens the row closed on 8 September.                                                               |

The moderation queue no longer shows a load meter. It divided each backlog by a fixed reviewer capacity of 12 that no data backs. The flagged-content queue now counts only user and message flags, since listing flags already have their own row and were counted twice in the open total.

---

## Landing page — 24 September 2026

Page 1 was audited against Phase 4 and Sections 1–5 and reworked so that every figure and label on it comes from the API. The Concierge entry above still stands.

| Phase reference             | Blueprint says                                              | App does                                                                                                                                                 | Why                                                                                                                                                                                                              |
| --------------------------- | ----------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Page 1 module 1 · Section 1 | Headline "Find Your Next Home", lifestyle background        | "Find the home that finds you.", a framed decorative image, and popular-neighbourhood chips ranked by live listing count                                 | The chips were a hardcoded list of five cities; a chip for a place with no listings sends the visitor to an empty search. The image carries no caption, because the caption named a property that did not exist. |
| Page 1 module 2 · Section 2 | Six featured cards in a grid                                | One premier listing, then a six-tile gallery. Promoted listings (`featuredUntil` in the future) fill it first, most-viewed listings fill the rest        | Promotion promised agents a featured placement that nothing read. The badge says "Featured" only on a promoted listing and "Most viewed" otherwise, so a promoted placement is never passed off as editorial.    |
| Page 1 module 4 · Section 3 | "10k+ buyers", "$500M+ in transactions", 3–4 testimonials   | Live counts of homes on the market, homes sold and neighbourhoods; the band hides when fewer than two are non-zero. Trust is carried by the guarantees   | The previous figures ($8.5B closed, 2,500+ listings, 27 years, 95% referral, 10,000+ buyers) were invented. Small true numbers beat large false ones.                                                            |
| Page 1 module 4             | Reviews/testimonials                                        | None                                                                                                                                                     | Reviews exist per user, but there is no public feed and the payload carries the reviewer's full name. Quoting buyers needs their consent first.                                                                  |
| Page 1 · new                | —                                                           | A browse index: by type and price band (facet counts) and by neighbourhood (`GET /properties/localities`), each row linking into `/search`               | Gives a visitor who does not yet have a search in mind a way in, using only counts the API returns.                                                                                                              |
| Page 1 · new                | —                                                           | A "Just listed" strip of the four newest listings not already shown                                                                                      | Freshness is the one signal a young marketplace can show honestly.                                                                                                                                               |
| Page 1 · States             | Error: "fallback featured listings (hardcoded or cached)"   | When both listing queries fail, a visible "Listings are unavailable right now" state with a link to search                                               | Hardcoded fallback listings would be fabricated inventory. Silently hiding the sections made an outage look like a quiet market.                                                                                 |
| Page 1 · order              | Hero → Featured → How it works → Trust → Latest sales → CTA | Hero → Premier → Gallery → Browse → Just listed → Concierge → Stats → Guarantees → Latest sales → CTA                                                    | Inventory first, then the service, then trust, while the visitor is still browsing.                                                                                                                              |
| Page 1 module 3             | Four steps: Search → View → Offer → Close                   | The Concierge narrative is kept but retold as "How it works": saved search, saved shortlist, bridged viewings, escrow and the four deal milestones       | The earlier narrative sold a service nobody delivers — a 90-minute brief, off-market shortlists, a "31 days median brief to keys" with no data behind it. Each step now names a feature that ships.              |
| Page 1 module 7             | Footer newsletter signup, social icons                      | Both removed                                                                                                                                             | The form said "You are on the list" and discarded the address; nothing stores or sends it. The icons linked to the networks' home pages, not to any account.                                                     |
| Page 2 · sort               | —                                                           | `/search` defaults to "Featured first": running promotions ahead of the rest, then newest. Promoted cards carry the same Featured badge as the home page | Promotion's copy promises "featured ahead of the rest of the market". The explicit sorts are untouched, so a buyer who picks price order gets price order.                                                       |

**Deferred with it:** the newsletter returns when there is a subscriber store with consent and a sender behind it, and the social icons return when the accounts exist. Saved-search alerts are in the same position — `SavedSearch.notify` is stored and never read, so no copy may promise them until a matcher sends them.

---

## Corrections to earlier entries

Entries above are not rewritten when they drift. A correction lands here, dated, and names the line it supersedes.

**21 September 2026 — the privacy page no longer names SendGrid.** The footer-pages entry says the privacy page names "Stripe, Cloudinary, SendGrid, Twilio, OpenFreeMap" as processors. Since `0833ca1` (10 September) it has said "Our SMTP email provider" instead (`lib/data/privacy-page.ts`), following the move to SMTP for transactional email. The page is right; the entry is stale. The rest of that entry — processors named from what the platform actually uses, not from boilerplate — still holds.

**21 September 2026 — POI markers on listing detail are built.** The map table lists Page 3 module 5 · Section 10 as a placed map with "POI markers still owed". They are no longer owed: `listing-neighborhood.tsx` draws school, transit, park and restaurant pins from live Overpass data through `neighbourhoodPins`, with a four-way toggle that doubles as the colour key.

**26 September 2026 — the footer newsletter is back, on a real list.** The home-page entry for Page 1 module 7 says the newsletter signup was removed, and the note under it defers its return "until there is a subscriber store with consent and a sender behind it". The store now exists: `POST /newsletter/subscribe` records the address with the exact consent wording, and nothing is added to the list until the person confirms from the email (double opt-in, [ADR 0023](../../docs/adr/0023-newsletter-uses-double-opt-in.md)). The form says "Check your inbox to confirm", never "You are on the list". The sender is still owed: nothing sends newsletters yet, so no copy may promise an issue on a schedule. The social icons stay removed.

---

## Design OS 2.0 regeneration — 29 September 2026

The design OS was regenerated under `docs/MASTER_PROMPT_COMPLETE.md` (nine phases, no visual prescription) as a merge. No entry above was rewritten. This section records what the regeneration means for them.

**References still resolve.** Page numbers 1–27, Section numbers 1–70 and Phase 1 principle/JTBD numbers are unchanged. "Page N module M" names module M of Page N as numbered in versions 1 and 2.0. Since 30 September 2026 [Phase 4](../CORE-PHASES/phase-4-page-blueprints.md) no longer lists page content, so the number is kept as an identifier ([Phase 4 › How to Read a Blueprint](../CORE-PHASES/phase-4-page-blueprints.md#how-to-read-a-blueprint)) and the requirement it concerns is carried by that page's primary tasks, data, rules or states; every row here also names its subject. Phase 4 and Phase 5 carry inline pointers back to the entries here. The routes that had no blueprint — the seven footer pages, the map and the per-entity routes this file counts in "44 routes against 27 pages" — are now Pages 28–46. Build status for every entry now lives in [Phase 8](../CORE-PHASES/phase-8-implementation-roadmap.md#per-feature-build-status), and the Deferred table above is carried there as the Deferred Register.

**Nothing in `CORE-PHASES/` was reworded to accommodate an entry here.** The regeneration dropped visual prescription throughout (listed in each phase's Regeneration Notes) for its own reason, not to close a gap recorded on this page.

**Visual entries.** The design OS no longer governs how anything looks, so an entry that is purely about presentation is kept as a record but no longer describes a gap between code and spec:

| Entry                                                                              | Classification                                                                                                                                 |
| ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Page 9 · Saved Listings — card grid vs dense table                                 | **Visual — governed by the code, not this design OS.** Phase 4 no longer prescribes cards or a table.                                          |
| Phase 1 · Principle 5 — the "desktop-dense application register" half              | **Visual — governed by the code, not this design OS.** The product halves stand: portals are desktop-first and there is no offline capability. |
| Page 1 · How It Works — the _scroll-narrative_ presentation of the Concierge       | **Visual — governed by the code, not this design OS.** The content change (a narrative of shipping features instead of four steps) stands.     |
| Page 1 module 1 — "a framed decorative image"                                      | **Visual — governed by the code, not this design OS.** Headline copy and neighbourhood chips ranked by live count stand.                       |
| Page 1 module 2 — "One premier listing, then a six-tile gallery" as an arrangement | **Visual — governed by the code, not this design OS.** The promotion rule and the Featured / Most viewed labels stand.                         |
| Page 1 · order — screen order of the home sections                                 | **Visual — governed by the code, not this design OS.** The added browse index and "Just listed" rows stand as content.                         |
| Section 48 · Privacy — the contents rail                                           | **Not visual.** Tracking the reader's position is navigation behaviour; its presentation is governed by the code.                              |

Every other entry is about content, data, behaviour or scope and is unaffected.

**Stale pointer.** Two entries cite "Density rule, `.claude/CLAUDE.md`" as their record. The current `.claude/CLAUDE.md` contains no density rule. Owner to decide whether the rule moved, was retired, or should be restored.

**Found during the regeneration, not yet recorded here.** Listed for the owner to ratify, defer or fix — they are not entries until the owner says so:

- Phase 3 taxonomy (property types, price bands, listing and offer statuses) differs from the code's enums; see Phase 3 › Vocabulary in the code.
- Page 14 · Account — "Delete account" is not wired, while the Privacy page tells users they can delete their account from settings.
- Page 26 · Revoke and Allow Resubmit — not found in the admin verification surface.
- Page 16 · Import CSV — not built.
- Section 37 / Page 2 — no location autocomplete.
- `/admin/flags` collects no decision note, unlike moderation and disputes.
- `/agent/concierge` is read-only while its empty state asks the agent to add a client.
- A two-factor dialog exists, unwired, and appears in no blueprint.

---

## Adding to this file

An entry is owed whenever the code and a phase document part company. State the phase reference, what each side says, and which one is right. If the code is right and the reversal would be expensive, write an ADR in `docs/adr/` and link it. **Do not edit `CORE-PHASES/` to close the gap.**

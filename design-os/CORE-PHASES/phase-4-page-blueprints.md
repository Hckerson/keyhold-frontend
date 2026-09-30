# Phase 4: Page Blueprints

**Keyhold Design Operating System** · Phase 4 of 9 · Version 2.0 · 29 September 2026 · screen-content pass 30 September 2026

Functional blueprints for every page: what it is for, what users come to get done, what data it needs, who may use it and how it behaves in every state. Previous: [Phase 3 — Information Architecture](phase-3-information-architecture.md) · Next: [Phase 5 — Section Blueprints](phase-5-section-blueprints.md).

Blueprints never describe what a page contains, how it looks or where anything sits. The content and look of each page are decided when it is built, with the owner ([Visual Design Hand-off](../IMPLEMENTATION/IMPLEMENTATION_PROMPT.md#visual-design-hand-off)). Build status lives in [Phase 8](phase-8-implementation-roadmap.md#pages).

---

## Contents

1. [How to Read a Blueprint](#how-to-read-a-blueprint)
2. [Page Index](#page-index)
3. [Public Pages (1–4)](#public-pages-no-auth-required)
4. [Authentication (5–7)](#pages-5-7-authentication)
5. [Buyer Dashboard (8–14)](#pages-8-14-buyer-dashboard-private)
6. [Agent Dashboard (15–19)](#pages-15-19-agent-dashboard)
7. [Admin Dashboard (20–27)](#pages-20-27-admin-dashboard)
8. [Added Pages (28–46)](#added-pages-28-46)
9. [Regeneration Notes](#regeneration-notes)

---

## How to Read a Blueprint

- **Primary tasks** are what the user comes to get done, as goals in their own words. They never name fields, buttons, links or where anything appears, and their order is not an order on screen.
- **Module numbers.** RATIFIED_DIVERGENCES and Phase 8 cite "Page N module M" and sub-rows such as `16.5a`. The numbers come from the numbered content modules of versions 1 and 2.0, which this phase no longer lists. They remain stable identifiers: every citation also names its subject, and the requirement it concerns is carried here by that page's primary tasks, data, states or rules.
- **Device needs** state what users on each device must be able to do — never how the page is arranged.
- **States** say what happens and what the user is told, never where it appears. They use the Phase 5 [Section Defaults](phase-5-section-blueprints.md#section-defaults) unless the page overrides them.
- **Rules** and **Validation** carry business, security, permission, accessibility and legal requirements that belong to the page.
- **Implementation notes** carry section references, records of what is built and divergence pointers. Where the shipped app departs from a blueprint, the blueprint stands and the departure is recorded in [RATIFIED_DIVERGENCES.md](../INDEX/RATIFIED_DIVERGENCES.md).

---

## Page Index

**Total Pages:** 46 — 27 carried from version 1, 19 added in version 2.0.

| #   | Page                         | Route                                              | Role      |
| --- | ---------------------------- | -------------------------------------------------- | --------- |
| 1   | Home                         | `/`                                                | Anyone    |
| 2   | Search Results               | `/search`                                          | Anyone    |
| 3   | Listing Detail               | `/listing/:id`                                     | Anyone    |
| 4   | Map View                     | `/map`                                             | Anyone    |
| 5   | Sign Up                      | `/signup`                                          | Anonymous |
| 6   | Sign In                      | `/login`                                           | Anonymous |
| 7   | Reset Password               | `/reset-password`                                  | Anonymous |
| 8   | Buyer Dashboard Overview     | `/dashboard`                                       | Buyer     |
| 9   | Saved Listings               | `/dashboard/saved`                                 | Buyer     |
| 10  | My Offers (+ offer detail)   | `/dashboard/offers`, `/dashboard/offers/:id`       | Buyer     |
| 11  | Viewings                     | `/dashboard/viewings`                              | Buyer     |
| 12  | Messages                     | `/dashboard/messages`                              | Buyer     |
| 13  | Alerts                       | `/dashboard/alerts`                                | Buyer     |
| 14  | Settings                     | `/dashboard/settings`                              | Buyer     |
| 15  | Agent Dashboard              | `/agent/dashboard` (served at `/agent`, ratified)  | Agent     |
| 16  | Listings                     | `/agent/listings`                                  | Agent     |
| 17  | Leads                        | `/agent/leads`                                     | Agent     |
| 18  | Pipeline                     | `/agent/pipeline`                                  | Agent     |
| 19  | Calendar                     | `/agent/calendar`                                  | Agent     |
| 20  | Admin Overview               | `/admin`                                           | Admin     |
| 21  | Listings Moderation          | `/admin/listings`                                  | Admin     |
| 22  | User Management (+ profile)  | `/admin/users`, `/admin/users/:id`                 | Admin     |
| 23  | Transactions                 | `/admin/transactions`                              | Admin     |
| 24  | Payments & Revenue           | `/admin/payments`                                  | Admin     |
| 25  | Analytics & Reports          | `/admin/reports`                                   | Admin     |
| 26  | Tier Verifications           | `/admin/verifications`                             | Admin     |
| 27  | System Settings              | `/admin/settings`                                  | Admin     |
| 28  | About                        | `/about`                                           | Anyone    |
| 29  | Help                         | `/help`                                            | Anyone    |
| 30  | Blog (Journal)               | `/blog`                                            | Anyone    |
| 31  | Contact                      | `/contact`                                         | Anyone    |
| 32  | Privacy                      | `/privacy`                                         | Anyone    |
| 33  | Terms                        | `/terms`                                           | Anyone    |
| 34  | Accessibility                | `/accessibility`                                   | Anyone    |
| 35  | Verify Email                 | `/verify-email`                                    | Anyone    |
| 36  | Newsletter Confirm           | `/newsletter/confirm`                              | Anyone    |
| 37  | Newsletter Unsubscribe       | `/newsletter/unsubscribe`                          | Anyone    |
| 38  | Enquiries (Introductions)    | `/dashboard/interests`                             | Buyer     |
| 39  | Purchases & Escrow           | `/dashboard/transactions`                          | Buyer     |
| 40  | Listing Submission           | `/agent/listings/new`, `/agent/listings/:id/edit`  | Agent     |
| 41  | Requests                     | `/agent/requests`                                  | Agent     |
| 42  | VIP Concierge                | `/agent/concierge`                                 | Agent     |
| 43  | Disputes                     | `/admin/disputes`                                  | Admin     |
| 44  | Reported Members & Messages  | `/admin/flags`                                     | Admin     |
| 45  | Not Found (404)              | any unknown route                                  | Anyone    |
| 46  | Error (500)                  | segment error boundaries                           | Anyone    |

The seed's generic page list maps as follows: Home → 1; Search → 2; Entity Details → 3; List/Map View → 2, 4; Saved → 9; Favorites → 9 (one concept, labelled "Saved" per Phase 3); Compare → Section 20 inside Page 10 (listing-to-listing compare is not specified — open question); Role Profile → 22 profile, Section 12; Role Dashboards → 8, 15, 20; Messages → 12; Notifications → 13; Settings → 14, 27 and agent settings (Page 15 family); Profile → 14; Domain Tool → not specified (open question); Entity Submission → 40; Authentication → 5–7, 35; Transaction / Payment → 10 (checkout), 39; Help Center → 29; 404 → 45; 500 → 46.

---

## PUBLIC PAGES (No Auth Required)

### Page 1: Home (/)

- **Purpose:** Introduce platform, build trust, drive signup or search
- **Business objective:** Convert visitors into searches and sign-ups; show a live marketplace.
- **User objective:** Understand what platform does, start property search
- **Primary tasks:**
    - Start looking for a home in a place and price range I have in mind.
    - See which homes are worth a look right now, and open one.
    - Keep a home to come back to.
    - Understand how buying through Keyhold works, from search to keys.
    - Decide whether I can trust the platform — what it has done and what other buyers say about it.
    - See what has sold recently and where.
    - Create an account when I am ready, or find out more first.
    - Hear about new homes by subscribing to the newsletter.
    - Find out more about the platform, its policies and its people elsewhere on the site, and follow it on social media.
- **Required data:** Featured/promoted and most-viewed listings (price, address, beds/baths, agent, save state); live counts (on market, sold, neighbourhoods); localities; recent sales with coordinates.
- **Permissions:** Anyone; saving requires sign-in (BR18).
- **Device needs:** Search and featured listings reachable immediately on every device; touch users can save and open listings.
- **States:**
    - Loading: Section Defaults; the visitor can start a search while listings load.
    - Error: Fall back to hardcoded or cached featured listings.
    - Success: Every part loaded with fresh data.
- **Rules:** Trust claims are verifiable facts, never invented figures (BR15). Reviews are quoted only with the reviewer's consent.
- **Dependencies:** Properties API, stats, localities, newsletter API.
- **Implementation notes:** Sections 1, 2, 3, 4, 5 and 48; recent sales have no section of their own. Server-rendered (ADR 0002). **Ratified divergences** (RATIFIED_DIVERGENCES › Landing page): how it works retold as a narrative of shipping features (module 3); search-entry headline and neighbourhood shortcuts ranked by live count (module 1); promoted listings labelled "Featured", the rest "Most viewed" (module 2); trust carried by live counts, no testimonials until reviewers consent (module 4); a browse index and "Just listed" added; social links removed, newsletter restored on double opt-in (module 7); **the error state** tells the visitor "Listings are unavailable right now" instead of falling back (BR15).

---

### Page 2: Search Results (/search)

- **Purpose:** Show properties matching user criteria
- **Business objective:** Turn intent into listing views.
- **User objective:** Filter and browse available properties
- **Primary tasks:**
    - Narrow homes down by where, price, bedrooms and bathrooms.
    - Get suggestions for a place as I type it.
    - Put the results in the order that matters to me (Phase 3 › Search Hierarchy).
    - Know how many homes match.
    - See the results on a map instead, and preview one from there.
    - Keep looking beyond the first set of results.
    - Open a home that looks right.
    - Keep a home to come back to, and know which ones I already have.
- **Required data:** Property search with filters (location, price $100k–$5M, beds 1–5+, baths 1–4+), sort, page (20 per page), bounding box; result count; facet counts; saved state; localities for suggestions.
- **Permissions:** Anyone; saving requires sign-in.
- **Device needs:** On small screens filters remain one step away and results remain the focus; every filter usable by touch.
- **States:**
    - Loading: Section Defaults.
    - Error: Fall back to cached results, with retry.
    - Empty: "No listings found. Try adjusting filters." with suggested filter changes.
    - Success: Results match the filters.
- **Dependencies:** Properties API, map tiles (Page 4 contract C38).
- **Implementation notes:** Sections 13 and 35. Filters live in the URL. **Ratified:** price bands with facet counts replace the slider (Section 35 — cited in RATIFIED_DIVERGENCES as "Page 2 module 5", which numbered the price filter with the map); default sort "Featured first" (Page 2 · sort). The map option is built (closed 8 Sept). Location suggestions are specified, not built (Phase 8 row 2.1a).

---

### Page 3: Listing Detail (/listing/:id)

- **Purpose:** Deep dive into a specific property
- **Business objective:** Convert evaluation into viewings and offers.
- **User objective:** Evaluate property, schedule viewing, make offer
- **Primary tasks:**
    - Look through every photo of the home, full-screen if I want.
    - Know the price and whether it is still available.
    - Check the key facts: beds, baths, floor area, lot size, year built.
    - Read the seller's account of the home and what has been done to it.
    - See where it is and what is nearby — schools, transit, parks, restaurants — and how walkable it is.
    - Compare its price with recent sales nearby.
    - Find out who is selling it, how they are rated and how quickly they reply, and see their other listings.
    - Message or call the agent.
    - Share it with someone.
    - Keep it to come back to.
    - Ask to view it.
    - Make an offer.
    - Report it if something is wrong.
- **Required data:** Property detail, images, status and labels (New, Hot — Phase 3 › Status Labels), key facts, coordinates, nearby places (lazy), comparables (price, date, address), agent profile (licence, rating, review count, response time) and reviews, saved state, viewer's journey state (existing viewing/offer).
- **Permissions:** Anyone views; saving, messaging, viewing requests, offers and reports require sign-in as a buyer.
- **Device needs:** On small screens asking to view and making an offer stay within reach while the buyer reads; photos navigable by swipe.
- **States:**
    - Loading: Section Defaults for photos, description and agent.
    - Error: Fall back to the description and a way to contact the agent.
    - Unavailable: "This listing is no longer available"
    - Success: All data loaded.
- **Dependencies:** Properties, nearby, reviews, viewings, offers, flags APIs; view recording (BR16); contracts C83 (viewing request), C40 (offer), C79 (report).
- **Implementation notes:** Sections 6–12. Structured data (JSON-LD), Open Graph and canonical URL. The map and nearby places are built (closed 8 and 17 Sept). Comparables are active listings, not sold (deferred). Reporting built (closed 9 Sept).

---

### Page 4: Map View (/map)

- **Purpose:** Explore listings geographically
- **Business objective:** Serve location-led buyers.
- **User objective:** See where properties are, spatial understanding
- **Primary tasks:**
    - See where the homes are.
    - Move around and zoom into an area, or jump to a place.
    - Narrow by the same filters as search.
    - Understand what the map's markings mean (price ranges, types).
    - Preview a home without leaving the map, then open it.
- **Required data:** Property search with bounding box; coordinates.
- **Permissions:** Anyone.
- **Device needs:** Map fully usable by touch; filters reachable without losing the map; a keyboard-reachable alternative to choosing on the map.
- **States:** Loading map and results; empty viewport → "No listings in this area"; map fails to load → the results are offered as a list.
- **Dependencies:** MapLibre GL, OpenFreeMap tiles, properties API ([ADR 0015](../../docs/adr/0015-map-surfaces-wait-on-coordinates.md)).
- **Implementation notes:** Built with filters, preview and key (closed 8 Sept).

---

## AUTH PAGES (Sign In Required)

### Pages 5-7: Authentication

Shared: **Business objective** — account creation and return; **Permissions** — anonymous (signed-in users go to their portal); **Device needs** — completable on a phone, with the right keyboard per field and paste support for codes; **Dependencies** — Auth API, OAuth providers, SMTP.

**Page 5: Sign Up (/signup)**

- **Purpose / user objective:** Create an account and pick a role.
- **Primary tasks:**
    - Create an account with my email and a password.
    - Prove the email is mine with a six-digit code.
    - Say whether I am here to buy, to sell or as an agent.
    - Sign up with the Google, Apple or Facebook account I already have.
    - Get to sign-in if I already have an account.
- **Validation:** Email checked as it is entered; the user is told how strong the password is before submitting.
- **Rules:** Sign-up records consent to the Terms (Page 33) and Privacy policy (Page 32), and both are reachable from it.
- **States:** Existing email → sign-in path; provider unavailable → stated; code expired → resend.
- **Implementation notes:** The code is confirmed at `/verify-email` after registration (Page 35; closed 9 Sept). Google and Facebook built; **Apple deferred** (ADR 0020).

**Page 6: Sign In (/login)**

- **Purpose / user objective:** Return to the account.
- **Primary tasks:**
    - Sign in with my email and password.
    - Sign in with Google, Apple or Facebook.
    - Get back in when I have forgotten my password.
    - Get to sign-up if I have no account.
- **States:** Failure message never reveals whether the email exists; `?oauth=unavailable` → the user is told the provider is unavailable.

**Page 7: Reset Password (/reset-password)**

- **Purpose / user objective:** Regain access.
- **Primary tasks:**
    - Ask for a way back in with my email.
    - Prove it is me with a code.
    - Choose a new password.
    - Go back to sign-in.
- **Implementation notes:** **Ratified:** a tokenised email link replaces the code as the middle step (request → emailed link → set new password).

---

## PAGES 8-14: BUYER DASHBOARD (PRIVATE)

Shared: **Permissions** — `BUYER` only, enforced by the portal guard and server; **Device needs** — portals are desktop-first (ratified, Principle 5) but every task must remain completable on a phone; **States** — Section Defaults, and when a portal page's data fails the page says so and offers retry (Phase 7 › Portal Data Flow).

**Page 8: Dashboard Overview (/dashboard)**

- **Purpose / business objective:** Orient the buyer; pull them back into open deals (Journey 14).
- **Primary tasks:**
    - See at a glance how many homes I have saved and where my offers and viewings stand.
    - Catch up on what has happened recently — homes I viewed, price drops on homes I saved.
    - See my next viewings, and reschedule or cancel one.
    - See alerts that have fired — price drops and new matching listings.
    - Get quickly to browsing, my offers, my viewings and my messages.
- **Required data:** Saved, offers (by status), viewings (next two or three: date, time, address, agent), notifications, activity (most recent five).
- **Implementation notes:** Sections 43 and 44. Alerts and quick access (modules 4 and 5) closed 8 Sept.

**Page 9: Saved Listings (/dashboard/saved)**

- **Purpose:** Compare and act on shortlisted listings.
- **Primary tasks:**
    - Compare the homes I have shortlisted on the same facts as search.
    - Order them by newest, price or when I last looked.
    - Take a home off my shortlist.
    - Get to the offer I have made on a home.
- **States:** Empty → "No saved listings yet. Start exploring!"
- **Implementation notes:** **Ratified:** presented for comparison rather than browsing (density rule) — a visual decision governed by the code. See RATIFIED_DIVERGENCES.

**Page 10: My Offers (/dashboard/offers)**

- **Purpose:** Track and negotiate every offer (Journey 4).
- **Primary tasks:**
    - See every offer I have made and where each stands, narrowed by status (submitted, countered, accepted, rejected).
    - Know when each last moved.
    - Open an offer and follow its whole history (`/dashboard/offers/:id`).
    - See exactly what differs between my offer and the counter.
    - Accept, counter or withdraw.
    - Agree the terms — move-in date, earnest money, contingencies.
    - Talk it through with the agent or seller.
    - Follow the closing steps once the offer is accepted.
    - Complete the purchase once accepted and not yet paid (checkout, C82).
- **Required data:** Offers with listing address, amount, current status (e.g. "Countered at $X"), last activity; offer timeline, terms, thread and milestones.
- **Rules:** Accepting a counter is binding and cannot be reopened; a counter confirms the amount before sending; checkout success holds funds in escrow until release (BR2).
- **Implementation notes:** Sections 17, 18, 20, 21 and 22. Milestones shared with the agent's deal detail through one hook (closed 9 Sept).

**Page 11: Viewings (/dashboard/viewings)**

- **Purpose:** Manage every tour (Journey 3).
- **Primary tasks:**
    - See which days I have viewings, and what is on a given day.
    - Know each upcoming viewing's date, time, address, agent and status.
    - Reschedule or cancel a viewing.
    - Message the agent about a viewing.
    - Look back at past viewings and what I thought of them.
- **Required data:** Viewings by month; past viewings with survey results where submitted.
- **Implementation notes:** Section 45.

**Page 12: Messages (/dashboard/messages)**

- **Purpose:** Converse about deals (Journey 5).
- **Primary tasks:**
    - See all my conversations, know which are unread, and find one by searching or filtering.
    - Read a conversation knowing who said what and when.
    - Know when the other party is typing.
    - Reply, and send a file.
- **Required data:** Conversations (agent name, last message preview, timestamp, unread state); messages with sender and timestamp.
- **Implementation notes:** Sections 22, 23, 24 and 28. Attachments and document sharing built (closed 8 Sept); message report built (closed 9 Sept); **real-time deferred**.

**Page 13: Alerts (/dashboard/alerts)**

- **Purpose:** Control and review notifications (Journey 19).
- **Primary tasks:**
    - Choose which alerts I get — price drops on saved listings past a threshold I set, new listings matching my criteria, offer responses, viewing confirmations.
    - Choose email, SMS or in-app for each kind of alert.
    - Look back at alerts that fired.
    - Mark one alert, or all of them, as read.
- **Implementation notes:** Saved-search alerts are stored but never sent — copy may not promise them (RATIFIED_DIVERGENCES › Landing page).

**Page 14: Settings (/dashboard/settings)**

- **Purpose:** Profile, preferences and account (Journey 7).
- **Primary tasks:**
    - Keep my profile current — photo, name, email, phone.
    - Decide how I am contacted and notified (email, SMS, phone, in-app).
    - Decide whether agents can see my profile.
    - Decide whether my usage feeds analytics.
    - Change my password.
    - Download my data.
    - Delete my account.
    - Verify my identity by submitting a document, and see where the review stands and why it was rejected if it was (added; closed 9 Sept).
- **Rules:** Analytics use is opt-in. Account deletion and data download are privacy rights the Privacy page (Page 32) promises.
- **Implementation notes:** Avatar upload persists (closed 9 Sept). Download data calls the export API. **Delete account is not wired** — a confirmation exists in code but nothing opens it, while the Privacy page tells users they can delete their account (open question). Change password is offered as a reset link.

---

## PAGES 15-19: AGENT DASHBOARD

Shared: **Permissions** — `SELLER` (Agent and Seller personas, ADR 0018); **Device needs** and **States** as for the buyer portal.

**Page 15: Agent Dashboard (/agent/dashboard)**

- **Purpose / business objective:** The agent's daily desk (Journey 15).
- **Primary tasks:**
    - See my pipeline in numbers — listings, leads, offers and volume.
    - See which comparables and recent sales are performing.
    - See my upcoming showings.
    - See my newest leads.
    - Get quickly to the rest of my desk.
- **Implementation notes:** **Ratified:** served at `/agent`. Quick access (module 5) closed 8 Sept.

**Page 16: Listings (/agent/listings)**

- **Purpose:** Manage the portfolio (Journey 16).
- **Primary tasks:**
    - See every listing with its status, views, saves and offers.
    - Narrow to active, sold, draft or expired listings.
    - Publish, draft, delete or renew many listings at once.
    - Start a new listing (→ Page 40).
    - Bring in many listings at once from a CSV file (from Phase 3).
- **Rules:** Bulk destructive actions confirm (BR10); views come from recorded views (BR16).
- **Implementation notes:** CSV import is specified, not built (Phase 8 row 16.5a).

**Page 17: Leads (/agent/leads)**

- **Purpose:** Qualify and contact enquirers.
- **Primary tasks:**
    - See the buyers interested in my listings.
    - Track where each lead stands (new, contacted, qualified, lost).
    - Know which leads are hot, warm or cold.
    - Message or call a lead.
- **Implementation notes:** **Ratified:** status is `pending / accepted / declined` from `ConnectionStatus`; temperature is derived (ADR 0016, BR8). Email and call through the platform (BR9). Budget qualification deferred (no buyer financial field).

**Page 18: Pipeline (/agent/pipeline)**

- **Purpose:** Move deals to close.
- **Primary tasks:**
    - See my deals by stage: leads → offers → pending → closed.
    - Move a deal on to its next stage.
    - Keep notes on each deal.
    - Know how long each deal has to close.
    - Open a deal to accept or decline and to track its closing milestones.
- **Rules:** BR6 — a move is a request resolved against what the agent may do; every move is also available without a pointer.
- **Implementation notes:** Section 42.

**Page 19: Calendar (/agent/calendar)**

- **Purpose:** Showings, follow-ups and closings in time.
- **Primary tasks:**
    - See showings, follow-ups and closings by month or by week.
    - Add an event.
    - Send my calendar to Google Calendar.
- **Implementation notes:** Section 45. Event creation closed 8 Sept; one-way Google Calendar push closed 12 Sept (fire-and-log; revoked grant offers reconnect).

---

## PAGES 20-27: ADMIN DASHBOARD

Every admin route is reachable from admin navigation (Section 56), which groups the routes as Overview, Marketplace, Finance, Insights, Trust & Safety and System (Phase 3). On every admin page the admin can tell what the page covers and how much work in it is waiting.

Shared: **Permissions** — `ADMIN` only, enforced server-side (Phase 9 › Access Control); **Device needs** — desktop-first; on narrow screens every fact and every action remains reachable; **Dependencies** — the audit log records every decision.

---

### Page 20: Admin Overview (/admin)

- **Purpose:** Surface platform health, volume, revenue and outstanding moderation work in one screen
- **Business objective:** Shorten time-to-decision on every queue (Journey 8).
- **User objective:** See what needs attention within seconds of landing
- **Primary tasks:**
    - See platform volume — users, active listings, transactions and GMV — and how each is trending.
    - Go straight from a figure to the area it summarises.
    - See revenue by month over the last six months, and get to payments.
    - See what needs an operator — verification requests, flagged listing images, large transactions waiting on escrow — and how urgent each is.
    - See how much moderation work is waiting in each queue, and get to it.
    - Understand where revenue comes from — commissions, GMV, take rate, average commission per deal.
    - Get quickly to users, listings, verifications and reports.
    - Know whether every system is healthy.
- **Required data:** Total users (trend, active this month), active listings (trend, awaiting review), transactions over 30 days (trend, in escrow), GMV over 30 days (trend, commissions), each with a 6-point trend series; GMV by month (rolling six months); alerts with severity (info, warning, error) and time; queue counts (pending verifications, listings awaiting review, flagged content) and oldest-item ages; commissions, GMV and take rate year to date; service health for Database, API Gateway and File Storage (uptime, error rate, operational/degraded) and overall over 24h; audit log.
- **States:**
    - Loading: Each figure and each area loads independently (Section Defaults).
    - Degraded: Any non-operational system is reported as degraded in text.
    - Empty queue: "Nothing awaiting review"
    - Error: An area that fails says so and offers retry; the rest of the page stays usable.
- **Implementation notes:** Sections 57–62. **Ratified (22 Sept):** alerts and the moderation queue (modules 4 and 6) are one "Needs a Decision" list with counts and oldest-item ages; the revenue breakdown (module 5) is folded into one estimated commission line (BR17); quick access (module 7) removed because it duplicates navigation. The working tree holds an uncommitted rework of this page by the owner (triage, business, people and health registers).

---

### Page 21: Listings Moderation (/admin/listings)

- **Purpose:** Clear the queue of submitted and flagged listings
- **Business objective:** Keep inventory accurate and lawful.
- **User objective:** Approve, reject or return each listing with a documented reason
- **Primary tasks:**
    - See the queue narrowed by status — all, pending, flagged, approved, rejected — with a count for each.
    - Know how big the queue is, what it is worth and how many compliance checks are open.
    - Put the queue in the order I need.
    - Open a listing to see its photos, full description, flag reason, compliance checklist and agent contact.
    - Approve, request changes or reject — one listing at a time or many at once.
    - Export the queue.
- **Required data:** Per listing: cover photo, address, price, agent (name, email, phone), submitted date, description, images, compliance checks (pass / warn / fail), status, flag reason, moderator note, changes-requested flag; counts per status; totals.
- **Rules:** BR4 — reject and request changes each require a note, alone or in bulk; nothing is sent without one. Reject records the note; request changes returns the listing to pending, marked as changes requested. A listing already approved is not offered approval again, and one already rejected is not offered rejection again. Changing the status filter clears the selection and closes any open listing. Default order is by status; the queue is paged.
- **States:**
    - Empty (filtered): "No listings match this filter right now"
    - Approved: The listing leaves the pending counts and the selection clears.
    - Blocked: A decision cannot be submitted without a note.
- **Implementation notes:** Sections 15, 63 and 64.

---

### Page 22: User Management (/admin/users)

- **Purpose:** Manage every account on the platform
- **Business objective:** Enforce standing fairly (Journey 11).
- **User objective:** Find a user, review standing, suspend or reinstate
- **Primary tasks:**
    - Know how many users are active out of the total.
    - Find a user, narrowing the list as I need.
    - Compare users by role, tier, join date, deals and standing, in any order.
    - Suspend or reactivate one user, or many at once.
    - Add a user.
    - Open a user's profile (`/admin/users/:id`, added) to see their lifetime volume, closed deals, verified credentials, suspensions and suspension history, verification state (email, phone, identity), account facts and public profile.
- **Required data:** Per user: avatar, name, email, role (Buyer / Agent / Admin), tier (Standard / Premium / Platinum), joined, deals, status; active and total counts; profile facts above.
- **Rules:** Default order is by user name ascending; the list is paged.
- **States:**
    - Empty: "No users to show"
    - Suspended: Status reads suspended and the action on offer becomes reactivate.
    - Optimistic: A status change applies immediately to the list and to the page's counts, and rolls back visibly on failure.
- **Implementation notes:** Section 65. The profile route is read-only today.

---

### Page 23: Transactions (/admin/transactions)

- **Purpose:** Track deal flow, escrow and commission across the marketplace
- **Business objective:** Revenue integrity (Journey 12).
- **User objective:** Understand volume and inspect any single deal
- **Primary tasks:**
    - Know total volume, platform commission and how many deals have completed.
    - See every deal — property, buyer, agent, sale price, commission, when it started and where it stands — with totals.
    - Tell deals in escrow apart from completed ones.
    - Narrow the deals and export them.
    - Open any single deal.
- **Required data:** Per transaction: property address, buyer, agent, sale price, commission, initiated date, status (Pending / Escrow / Completed); totals; completed and total counts.
- **Rules:** Commission is sale price × platform rate and is labelled as platform revenue (BR17). Status is stated in text.
- **States:**
    - Loading: Section Defaults.
    - Empty: Totals read zero and the admin is told there are no transactions.
    - Escrow: A deal in escrow is distinguishable from a completed deal.
- **Implementation notes:** Section 66.

---

### Page 24: Payments & Revenue (/admin/payments)

- **Purpose:** Monitor platform earnings and release agent payouts
- **Business objective:** Settle money correctly (BR2, BR3).
- **User objective:** Confirm revenue is tracking and clear outstanding payouts
- **Primary tasks:**
    - Know revenue this year against last year, the monthly average and its six-month trend, commission's share of the total, and what is outstanding.
    - See commission against platform fees month by month.
    - See how revenue splits between commission and platform fees.
    - Process pending payouts, knowing how much is waiting and how long processing usually takes.
    - Release or refund an escrow hold (added; closed 9 Sept).
    - Export the figures.
- **Required data:** Revenue YTD and prior year, monthly average and trend, commission, outstanding amount and pending transaction count; commission and platform fees by month; pending payouts; average processing time; escrow holds.
- **Rules:** A refund requires a reason.
- **States:**
    - Pending payouts: The admin is warned, with the amount; no warning when nothing is outstanding.
    - Loading: Section Defaults.
    - Error: Revenue falls back to the last known figures, with retry.
- **Implementation notes:** Section 58.

---

### Page 25: Analytics & Reports (/admin/reports)

- **Purpose:** Report platform performance and market position
- **Business objective:** Explain the numbers to the business.
- **User objective:** Read growth, then export or build a custom report
- **Primary tasks:**
    - Read growth — GMV this year against last, active listings month over month, user growth and active users, average transaction against the market.
    - See which regions lead on transaction volume.
    - See the split of buyers, agents and admins, and of Standard, Premium and Platinum tiers.
    - Download a report.
    - Build a custom report.
- **Required data:** Headline figures with trends; volume by region; users by role and by tier, with totals.
- **Rules:** Exported figures match on-screen figures.
- **States:**
    - Loading: Section Defaults.
    - Empty region set: The admin is told there is no regional data yet.
- **Implementation notes:** Section 46.

---

### Page 26: Tier Verifications (/admin/verifications)

- **Purpose:** Process identity and tier-upgrade requests
- **Business objective:** Verified users (Principle 4).
- **User objective:** Approve, reject or re-open a verification with its documents in view
- **Primary tasks:**
    - Know how many requests are pending and how many approved.
    - See each request — who, their current and requested tier, when they submitted and how many documents they sent.
    - Review a request's documents.
    - Approve or reject a pending request.
    - See the details of an approved request, or revoke it.
    - See why a request was rejected, or allow the person to resubmit.
    - Export a report.
- **Required data:** Per request: name, email, current tier, requested tier, submitted date, document count, status (Pending / Approved / Rejected); counts by status.
- **States:**
    - Empty: "No verification requests"
    - Pending: The navigation count matches the pending total on this page.
    - Decision: The request moves to its new status and the page's counts update.
- **Implementation notes:** Section 67.

---

### Page 27: System Settings (/admin/settings)

- **Purpose:** Configure platform identity, marketplace rules and moderation policy
- **Business objective:** Safe configuration (Journey 13, BR11).
- **User objective:** Change a value and save it with confidence
- **Primary tasks:**
    - Change how the platform identifies itself.
    - Change the marketplace rules.
    - Turn moderation and operations policies on or off.
    - Save my changes and know they took, or reset to the stored values.
    - Run maintenance operations, kept apart from ordinary configuration.
- **Required data:** Platform: name, support email, base currency, reporting timezone. Marketplace: commission rate (%), listing fee ($), listing expiry (days), max photos per listing, auto-approve below ($), escrow hold (days). Moderation policies: automatic photo scanning, require agent licence verification, manual review above threshold, auto-suspend on repeat rejections. Operations: maintenance mode, new signups, daily health digest, payout automation.
- **Rules:** Destructive maintenance operations confirm before running (BR10).
- **States:**
    - Dirty: Any edit clears the saved state.
    - Saved: The admin is told "New values apply to listings and payouts created from now on." and the page reads as saved until the next edit.
    - Reset: All values return to their stored values and the saved state clears.
- **Implementation notes:** Sections 68–70. Reporting timezone, the policy and operations switches and maintenance (modules 3, 5, 6 and 7) closed 8 Sept.

---

## ADDED PAGES 28-46

Added in version 2.0. Each route shipped without a Phase 4 blueprint (RATIFIED_DIVERGENCES › Section 48 and "44 routes against 27 pages"). The blueprints below record intent as observed in the shipped routes and must be confirmed by the owner; per RATIFIED_DIVERGENCES they are **not** a changelog — later code changes do not rewrite them.

### Pages 28–34: Site Pages

Shared: **Purpose** — answer the questions a visitor or member asks before trusting the platform; **Permissions** — anyone; **Required data** — static prose from `lib/data/*-page.ts` unless noted; **Device needs** — readable on every device, contents navigable by keyboard; **States** — static (no loading or error) unless noted; **Dependencies** — Section 48 reaches all seven; **Rules** — content grounded in what the platform actually does (BR15).

| Page | Route           | Primary tasks                                                                                                                                                                               | Notes |
| ---- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----- |
| 28   | `/about`        | Understand why Keyhold was built, how it works, what it offers advisors and what it holds itself to                                                                                          | —     |
| 29   | `/help`         | Find out how to find a property, arrange a viewing, make an offer, send documents, manage alerts and notifications, and manage my account; reach a person when still stuck                  | Help Center |
| 30   | `/blog`         | Read journal entries; when none exist, be told "Nothing published yet" and be sent on to listings; see the newest available listings and how many are available                            | Entries are content, not code. Loading/error for the listings |
| 31   | `/contact`      | Get help by the right channel — support email, my advisor (messages), a specific home (search) — and reach the right people for press and partnerships, listing with us or reporting a problem | No form — routes to the right channel |
| 32   | `/privacy`      | Understand what is collected about me and why, who else processes it, how the newsletter uses it, how long it is kept, my choices and how it is secured; keep my place while reading      | Ratified (ADR 0017). **Legal:** must cover collection, purpose, processors, the newsletter, retention, the reader's choices and security. Legal review owed. "Your choices" promises account deletion, which is not wired (Page 14) |
| 33   | `/terms`        | Understand the terms for accounts, what the platform is and is not, listings and conduct, offers and transactions, availability and liability, and changes and contact                     | **Legal:** must cover each of those terms. Legal review owed; consented to at sign-up |
| 34   | `/accessibility`| Understand what Keyhold aims for, what is in place, where it falls short (including the pipeline drag keyboard gap and the provider-rendered payment form) and how to report a failure       | Honest, not a conformance claim |

### Page 35: Verify Email (/verify-email)

- **Purpose:** Confirm the email address after sign-up (Journey 6).
- **Primary tasks:** Know what to do and where the code was sent; confirm my address with the six-digit code; get a new code; put it off and return to the task I was doing.
- **Validation:** Exactly six digits; a code is not submitted until it is complete.
- **States:** Success → "Email confirmed", or return to the pending task; error → "We couldn't confirm that code"; code expires after 15 minutes.
- **Rules:** BR13 — verification does not gate use.

### Pages 36–37: Newsletter Confirm and Unsubscribe

- **Purpose:** Complete a double opt-in or leave the list (BR14).
- **Primary tasks:** Know whether it worked; know what to do if the link failed; get back home.
- **States:** pending; done ("You're on the list" / "You're unsubscribed"); invalid link (expired, used or replaced — subscribe again from the site-wide signup, Section 48); failed (nothing changed — try again).
- **Rules:** Token-driven, processed once; not indexed.

### Page 38: Enquiries (/dashboard/interests)

- **Purpose:** Every listing the buyer has registered interest in, and how far each has got.
- **Business objective:** Keep enquiries moving to viewings and offers.
- **Primary tasks:** Know how many enquiries are live and what they are worth; see which enquiry has got furthest (offer on the table > viewing arranged > in conversation > no contact yet); see every enquiry's stage (live / closed) and status (awaiting reply, introduced, declined); see the mix of statuses and traction; get to the conversation and to my saved listings.
- **Rules:** Read-only — the buyer follows an enquiry into its thread to act on it.
- **States:** Empty → "No interest registered yet"; filtered empty → "Nothing matches this filter"; error → enquiries unavailable with retry.

### Page 39: Purchases & Escrow (/dashboard/transactions)

- **Purpose:** Money held in escrow and the sales it is waiting on (Journey 17).
- **Primary tasks:** Know how many purchases are in escrow and how much is held; see each purchase's property, price, transaction status, escrow status and remaining inspection window; release funds on a held escrow; see the mix of escrow and stages.
- **Rules:** BR2; release is irreversible — confirmation states that it settles the sale, pays the seller and marks the property sold (C85, C88).
- **States:** Empty → "No purchases yet"; release failure → "Nothing has moved and the escrow is still held".
- **Dependencies:** Transactions, escrow APIs. Checkout starts from offer detail (Page 10).

### Page 40: Listing Submission (/agent/listings/new, /agent/listings/:id/edit)

- **Purpose:** Create and maintain a listing (Journey 16; the seed's entity-submission page).
- **Business objective:** Complete, accurate inventory.
- **Primary tasks:** Describe the property; say where it is; say what it offers and what it costs; record its amenities and features; add photography once it is saved; manage its lifecycle once it is saved — status, promotion, marking it sold, deleting it.
- **Required data:** Title, description, type; address, locality, region, postal code, country, optional coordinates; price, bedrooms, bathrooms; optional area, lot, year built, walk score; amenities and features; photos; status and promotion.
- **Validation:** Title ≥ 5, description ≥ 20, address ≥ 5 characters; latitude −90…90, longitude −180…180; price positive; rooms whole numbers ≥ 0; year built ≥ 1600; walk score 0–100; photos JPG/PNG/WebP/AVIF, 10 MB each, at most the platform's max photos.
- **Rules:** Status moves only Draft ↔ Available by hand; Pending, Sold and Expired are driven by deals or moderation. Promotion 1–90 days, extends a running promotion, always labelled (BR15). Delete only without live offers or transactions; delete, photo removal and mark-sold confirm (BR10). Unsaved changes warn (C86).
- **States:** Edit loading; load failure; a save failure names the values that need attention.
- **Dependencies:** Properties and uploads APIs; moderation (Page 21).

### Page 41: Requests (/agent/requests)

- **Purpose:** Everything a buyer is waiting on the agent for (Journey 15).
- **Primary tasks:** Know how many viewings wait for confirmation, how many offers wait for an answer, which lapse within a day and the longest wait; confirm a viewing at one of the buyer's proposed times, or decline it; accept, counter (amount required) or decline an offer, with an optional note.
- **Rules:** Accepting is final and closes every other offer on the listing; declining is final; a failed response sends nothing (BR10). Stale viewing requests say their proposed times have passed.
- **States:** "No viewings waiting" / "No offers waiting"; error with retry.

### Page 42: VIP Concierge (/agent/concierge)

- **Purpose:** Coverage across the agent's highest-value relationships.
- **Primary tasks:** Know my relationships, mandate, allocation, open requests and what has closed to date; see my top relationship; see each active VIP client's tier, status, allocation and next action; see open service requests against my capacity; follow the retention playbook; add, edit and remove clients, and save services and practices.
- **Implementation notes:** Adding, editing and removing clients has hooks but no surface — the page is read-only today, and its empty state tells the agent to "add a client" with no way to do so (open question; Phase 8 row 42.6a).

### Page 43: Disputes (/admin/disputes)

- **Purpose:** Resolve disputes between parties (Journey 18).
- **Primary tasks:** Know how many disputes are open, in review, resolved and dismissed; work the queue open first, then by amount at stake, then by wait; review who raised a dispute, the amount, its age, the evidence and the disputed deals; resolve it in full or dismiss it; see the outcome once settled.
- **Rules:** BR5; resolving or dismissing requires an outcome note; decisions are final and visible to both parties.
- **States:** "Queue clear"; error with retry; decision failure leaves the dispute open.

### Page 44: Reported Members & Messages (/admin/flags)

- **Purpose:** Decide member and message reports (Journey 18).
- **Primary tasks:** Know how many reports are open of each kind; work the queue open first, longest wait first, narrowed to members or messages; review the kind, reporter, reason, age, what was reported and the reporter's account; uphold or dismiss; see a settled report as a read-only record.
- **Rules:** Listing flags are decided in Page 21, not here. The reporter is never disclosed to the reported party.
- **Implementation notes:** No decision note is collected today, unlike disputes and moderation (open question).

### Page 45: Not Found (404)

- **Purpose:** Recover from a dead link (Section 53).
- **Primary tasks:** Understand what happened (an expired link or a withdrawn listing); go on browsing listings; get back home.

### Page 46: Error (500)

- **Purpose:** Recover from a failure without losing trust (Section 54).
- **Primary tasks:** Understand what failed, in the words of the area (search, listing, buyer portal, agent console, admin console); be reassured about what was not affected ("Your saved homes and offers are untouched", "Nothing was changed"); try again; go somewhere else (home, search, another part of the portal).
- **Implementation notes:** Segment error boundaries exist for search, listing detail and the three portals; no root-level boundary exists. Section 54's error ID for support is not shown today.

---

## Regeneration Notes

- **Retained:** Pages 1–27, every module, every state and every piece of state copy. (Version 2.0 renumbered modules as content requirements; the 30 September pass below turned them into primary tasks, required data and rules. The module numbers survive as identifiers — see [How to Read a Blueprint](#how-to-read-a-blueprint).)
- **Added:** Page Index; for every page the seed's business objective, primary tasks, required data, permissions, device needs, dependencies and implementation notes; Pages 28–46; Page 10 detail route, Page 14 identity verification, Page 16 CSV import (from Phase 3), Page 18 deal detail, Page 22 profile route and Page 24 escrow settlement, drawn from existing records; divergence pointers.
- **Changed — renamed (version 2.0):** "Modules" → "Content requirements"; "Responsive" → "Device needs".
- **Changed — dropped as visual prescription (version 2.0):** Page 1 "Background image (lifestyle shot)", "6 cards in grid (2-3 columns responsive)", "Hover: enlarge, show 'Save' button", "Icons + short copy", "Timeline visual", "Carousel or grid", "Buttons:"; every "Responsive:" block ("Mobile: 1 column hero…", "Tablet: 2 column grid, filter sidebar (sticky)", "Desktop: 3 column grid…", "Hero 70%, sidebar 30% with agent card", "Map 80%, filter sidebar 20%", "3-column layout with main column at 2/3 and panel rail at 1/3", "Content capped at a readable measure; fields in a two-column grid", "Table scrolls horizontally inside its own container; detail opens full-screen", "Actions wrap below the identity block"); Page 2 "(Sticky on desktop)", "Cards in 2-3 columns", "Hover: enlarge"; Page 3 "Hero Gallery / Large image carousel (swipe on mobile) / Thumbnails below", "Price & Status Bar (Sticky)", "Save button (star icon)", "Small badges", "Table or cards", "(Sticky on Mobile)"; Page 4 "Full-screen Google Map", "(left sidebar…)", "popup"; Page 8 "(3 cards)", "Timeline-style list", "Card layout"; Page 9 "Grid", "View (Grid / List)", "Same card style as search results", "Remove save button (X)"; Page 10 "Table/Cards", "(Modal/Page)"; Page 11 "highlighted", "Card per viewing"; Page 12 "(Sidebar on desktop)", "(Main area)", "field"; admin shell "fixed sidebar (brand 'Admin / Console'…), topbar with breadcrumb and user menu, scrollable main column… right-aligned actions"; Page 20 "(4-column stat grid)", "icon, trend chip, caption, 6-point sparkline", "(main column)", "(sidebar)", "Column chart", "Count badge in panel header", "tone", "warning dot and tints its health row", "Skeleton per stat card and per panel body"; Page 21 "Filter Pills", "carry a tinted background", "(row reveal, large)", "Footer actions", "Bulk Action Bar"; Page 22 "colour-coded", "right-aligned", "error-tinted background", "Status badge turns error, row tints"; Page 23 "(4-column grid)", "spans 2 columns", "(accent chip)", "each tinting the initiated date"; Page 24 "Grouped column chart", "Donut chart … centre total", "Warning callout", "Chart skeletons preserve panel height"; Page 25 "Horizontal bar chart", "highlighted in a distinct tone", "Donut … centre total", "bar labels truncate"; Page 26 "One card per request", "Status badge: Pending (warning) / Approved (success) / Rejected (error)", "Tier rendered in its tier colour"; Page 27 "Callout / Success variant".
- **Changed — screen content removed (30 September 2026, seed-prompt Self-Audit):**
    - **Fields removed:** every "Content requirements" list (Pages 1–27 and 35–46, and the column of the Pages 28–34 table) and every "Actions" line (Pages 1–4, 38). Each was converted, not dropped: what the user comes to do became **Primary tasks** (written as goals for all 46 pages; the existing ones on Pages 1–4 and 8 were rewritten from control lists), data became **Required data**, and requirements became **Rules** / **Validation** / **States**. Section references moved to **Implementation notes**.
    - **Relocated as requirements:** Page 1 reviews need reviewer consent and trust claims must be true (Rules); Page 5 consent to Terms and Privacy (Rules) and password strength stated before submitting (Validation); Page 14 analytics is opt-in and deletion/download are promised privacy rights (Rules); Page 21 note required for reject and request changes, no re-approval/re-rejection, filter change clears selection, default order (Rules); Page 22 default order (Rules); Page 23 commission formula and status in text (Rules); Page 24 refund reason required (Rules); Page 27 maintenance confirms (Rules); Pages 32–33 what the privacy notice and terms must cover (Legal); Page 38 read-only (Rules); Page 43 outcome note required (Rules); Page 35 code not submitted until complete (Validation).
    - **Dropped as screen content:** headlines, CTA and link labels ("Find Your Next Home", "Ready to get started?", "Learn More", "View other listings"), example figures ("10k+ buyers", "$500M+", Page 20's "e.g. 1,247 … $312M" figures), page titles and descriptions for admin headers, column lists, sort-label lists, page-level action lists, "Page Header", "Filter Bar", "Agent Card", "Decision Modal", "Bulk Actions (on selection)", "Save Confirmation … Shown only after save", "(reachable throughout on small screens)", "Photo Gallery … Choose any photo directly", "Expandable 'Read More'", "Typing indicator", "Message input / Attach file option / Send", "a contents list tracking the reader's position" (kept as a reader goal), "Placeholder per featured listing", "Panel-level message", "Chart placeholders preserve their space", "an axis with no bars", "the footer" (as a place to subscribe), "filter rail, pin preview and legend", "a confirmation dialog", the Page 1 divergence pointers to "premier + gallery" and "module order" (visual; still recorded in RATIFIED_DIVERGENCES), the admin paragraph "Admin Console Shell … Every page states its title, a live-count description and its page-level actions".

---

**Phase 4 Complete.** 46 pages specified by goals, data, permissions, device needs, states and rules. Next: [Phase 5 — Section Blueprints](phase-5-section-blueprints.md).

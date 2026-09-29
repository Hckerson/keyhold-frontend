# Phase 4: Page Blueprints

**Keyhold Design Operating System** · Phase 4 of 9 · Version 2.0 · 29 September 2026

Functional blueprints for every page: what it is for, what it must offer and in what priority, and how it behaves in every state. Previous: [Phase 3 — Information Architecture](phase-3-information-architecture.md) · Next: [Phase 5 — Section Blueprints](phase-5-section-blueprints.md).

Blueprints never describe layout, placement, imagery or motion. The look of each page is decided when it is built, with the owner ([Visual Design Hand-off](../IMPLEMENTATION/IMPLEMENTATION_PROMPT.md#visual-design-hand-off)). Build status lives in [Phase 8](phase-8-implementation-roadmap.md#pages).

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

- **Content requirements** are numbered in priority order. The numbers are stable identifiers: RATIFIED_DIVERGENCES cites them as "module N" (e.g. "Page 20 module 4" is content requirement 4 of Page 20). A requirement never implies a position on screen.
- **Device needs** state what users on each device must be able to do — never how the page is arranged.
- **States** use the Phase 5 [Section Defaults](phase-5-section-blueprints.md#section-defaults) unless the page overrides them.
- **Implementation notes** carry section references and divergence pointers. Where the shipped app departs from a blueprint, the blueprint stands and the departure is recorded in [RATIFIED_DIVERGENCES.md](../INDEX/RATIFIED_DIVERGENCES.md).

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
- **Primary tasks:** Start a search; open a featured listing; sign up.

**Content requirements:**

1. Hero Section (Section 1)
    - Headline: "Find Your Next Home"
    - Search (location + price range)
    - CTA: Search or Sign Up

2. Featured Listings (Section 2)
    - 6 featured listings
    - Image, price, address, beds/baths, agent
    - Save available on each
    - Each links to detail page

3. How It Works (Section 4)
    - 4 steps: Search → View → Offer → Close
    - Short copy per step

4. Trust Signals (Section 3)
    - "10k+ buyers on platform"
    - "$500M+ in transactions"
    - Reviews/testimonials (3-4)
    - Privacy badge, security cert

5. Latest Sales (Trending)
    - Recent closed listings, located on a map
    - Shows momentum

6. CTA Section (Section 5)
    - "Ready to get started?"
    - Actions: Sign Up (primary), Learn More (secondary)

7. Footer (Section 48)
    - Links: About, Help, Blog, Privacy, Terms
    - Social media links
    - Newsletter signup

- **Required data:** Featured/promoted and most-viewed listings; live counts (on market, sold, neighbourhoods); localities; recent sales with coordinates.
- **Permissions:** Anyone; Save requires sign-in (BR18).
- **Device needs:** Search and featured listings reachable immediately on every device; touch users can save and open listings.
- **States:**
    - Loading: Placeholder per featured listing
    - Error: Fallback featured listings (hardcoded or cached)
    - Success: All sections load, data fresh
- **Actions:** Search, Save, Sign Up, Learn More, Subscribe.
- **Dependencies:** Properties API, stats, localities, newsletter API.
- **Implementation notes:** Server-rendered (ADR 0002). **Ratified divergences:** Concierge narrative for module 3; module 1 headline and neighbourhood chips; module 2 premier + gallery with Featured/Most viewed labels; module 4 live counts, no testimonials; added browse index and "Just listed"; module order; module 7 social icons removed, newsletter restored on double opt-in; **the error state** shows "Listings are unavailable right now" instead of hardcoded fallbacks (BR15). See RATIFIED_DIVERGENCES › Landing page.

---

### Page 2: Search Results (/search)

- **Purpose:** Show properties matching user criteria
- **Business objective:** Turn intent into listing views.
- **User objective:** Filter and browse available properties
- **Primary tasks:** Filter, sort, switch view, open a listing, save.

**Content requirements:**

1. Filter Panel (always reachable)
    - Location (text, autocomplete)
    - Price range (slider, $100k-$5M)
    - Beds (1-5+)
    - Baths (1-4+)
    - Sort (Price Low-High, Newest, Most Saved)
    - Apply / Reset

2. Results Header
    - "Found 345 homes"
    - View option (Grid / Map)
    - Sort

3. Results (Section 13)
    - Image, price, address, beds/baths, agent
    - "Saved" if already saved
    - Save available on each

4. Pagination / Infinite Scroll
    - Show 20 per page, "Load More" or next/prev

5. Map View (option)
    - Listings located on a map
    - Choose a location → preview
    - Preview → navigate to detail

6. Empty State
    - "No listings found. Try adjusting filters."
    - Suggested filters

- **Required data:** Property search with filters, sort, page, bounding box; facet counts; saved state.
- **Permissions:** Anyone; Save requires sign-in.
- **Device needs:** On small screens filters remain one step away and results remain the focus; every filter usable by touch.
- **States:**
    - Loading: Placeholder results
    - Error: Fallback to cached results + retry
    - Empty: Helpful message + filter suggestions
    - Success: Results + filters working
- **Actions:** Apply/reset filters, sort, change view, paginate, save, open.
- **Dependencies:** Properties API, map tiles (Page 4 contract C38).
- **Implementation notes:** Filters live in the URL. **Ratified:** price bands with facet counts replace the slider (module 1 / Section 35 — cited as "module 5" in RATIFIED_DIVERGENCES, which numbered the price control with the map); default sort "Featured first" (Page 2 · sort). The Map option is built (closed 8 Sept).

---

### Page 3: Listing Detail (/listing/:id)

- **Purpose:** Deep dive into a specific property
- **Business objective:** Convert evaluation into viewings and offers.
- **User objective:** Evaluate property, schedule viewing, make offer
- **Primary tasks:** See photos and facts, check neighbourhood, contact agent, request viewing, make offer, save, report.

**Content requirements:**

1. Photo Gallery (Section 6)
    - Photo set with next/previous
    - Choose any photo directly
    - Full-screen option
    - "New" / "Hot" label if applicable

2. Price & Status (Section 7 — reachable throughout)
    - Price
    - Status (Active, Pending, Sold)
    - Save
    - Share
    - Message agent

3. Key Facts (Section 8)
    - Beds / Baths / Sq Ft / Lot Size / Year Built

4. Description (Section 9)
    - Full property description
    - Highlights (renovations, features)
    - Expandable "Read More"

5. Neighborhood (Section 10)
    - Map
    - Places: Schools, Transit, Parks, Restaurants
    - Details on selection
    - Walkability score

6. Comparable Listings (Section 11)
    - 3-5 recent sales nearby
    - Price, date, address

7. Agent Card (Section 12)
    - Photo, name, license
    - Rating (reviews)
    - Response time ("Usually replies in 2 hours")
    - Call / Message
    - "View other listings" link

8. Actions (reachable throughout on small screens)
    - "Schedule a Viewing" (primary)
    - "Make an Offer" (secondary)
    - "Save Listing" (tertiary, if not saved)

- **Required data:** Property detail, images, coordinates, nearby places (lazy), comparables, agent profile and reviews, saved state, viewer's journey state (existing viewing/offer).
- **Permissions:** Anyone views; saving, messaging, viewing requests, offers and reports require sign-in as a buyer.
- **Device needs:** On small screens the viewing and offer actions stay reachable while reading; photos navigable by swipe.
- **States:**
    - Loading: Placeholders for images, description, agent
    - Error: Fallback description + contact agent
    - Unavailable: "This listing is no longer available"
    - Success: All data loaded
- **Actions:** Save, share, message, request viewing (C83), make offer (C40), report (C79).
- **Dependencies:** Properties, nearby, reviews, viewings, offers, flags APIs; view recording (BR16).
- **Implementation notes:** Structured data (JSON-LD), Open Graph and canonical URL. Placed map and place markers are built (closed 8 and 17 Sept). Comparables are active listings, not sold (deferred). Report control built (closed 9 Sept).

---

### Page 4: Map View (/map)

- **Purpose:** Explore listings geographically
- **Business objective:** Serve location-led buyers.
- **User objective:** See where properties are, spatial understanding
- **Primary tasks:** Pan and zoom, filter, preview a listing, open it.

**Content requirements:**

1. Map of listings (primary)
2. Filters (collapsible on small screens)
3. Listing preview on selecting a location
4. Key (price ranges, types)
5. Zoom to location

- **Required data:** Property search with bounding box; coordinates.
- **Permissions:** Anyone.
- **Device needs:** Map fully usable by touch; filters reachable without losing the map; a keyboard-reachable alternative to pins.
- **States:** Loading map and results; empty viewport → "No listings in this area"; tiles fail → list fallback.
- **Actions:** Filter, pan/zoom, preview, open.
- **Dependencies:** MapLibre GL, OpenFreeMap tiles, properties API ([ADR 0015](../../docs/adr/0015-map-surfaces-wait-on-coordinates.md)).
- **Implementation notes:** Built with filter rail, pin preview and legend (closed 8 Sept).

---

## AUTH PAGES (Sign In Required)

### Pages 5-7: Authentication

Shared: **Business objective** — account creation and return; **Permissions** — anonymous (signed-in users go to their portal); **Device needs** — completable on a phone, with the right keyboard per field and paste support for codes; **Dependencies** — Auth API, OAuth providers, SMTP.

**Page 5: Sign Up (/signup)**

- **Purpose / user objective:** Create an account and pick a role.
- **Content requirements:**
    1. Email input (auto-validate)
    2. OTP verification (6-digit code)
    3. Password set (strength meter)
    4. Persona selection (Buyer / Agent / Seller)
    5. Social OAuth (Google, Apple, Facebook)
    6. Link to Sign In
- **States:** Existing email → sign-in path; provider unavailable → stated; code expired → resend.
- **Implementation notes:** OTP is confirmed at `/verify-email` after registration (Page 35; closed 9 Sept). Google and Facebook built; **Apple deferred** (ADR 0020). Consent copy links to Terms and Privacy.

**Page 6: Sign In (/login)**

- **Purpose / user objective:** Return to the account.
- **Content requirements:**
    1. Email input
    2. Password input
    3. Forgot Password link
    4. Social OAuth
    5. Link to Sign Up
- **States:** Failure message never reveals whether the email exists; `?oauth=unavailable` → provider unavailable notice.

**Page 7: Reset Password (/reset-password)**

- **Purpose / user objective:** Regain access.
- **Content requirements:**
    1. Email input
    2. OTP verification
    3. New password set
    4. Return to Sign In link
- **Implementation notes:** **Ratified:** a tokenised email link replaces OTP as the middle step (request → emailed link → set new password).

---

## PAGES 8-14: BUYER DASHBOARD (PRIVATE)

Shared: **Permissions** — `BUYER` only, enforced by the portal guard and server; **Device needs** — portals are desktop-first (ratified, Principle 5) but every task must remain completable on a phone; **States** — Section Defaults, and a failed console shows the portal's fallback with retry (Phase 7 › Portal Data Flow).

**Page 8: Dashboard Overview (/dashboard)**

- **Purpose / business objective:** Orient the buyer; pull them back into open deals (Journey 14).
- **Primary tasks:** See status, act on the next item.
- **Content requirements:**
    1. Quick Stats (Section 44)
        - Saved: 5
        - Offers: 2 (1 pending, 1 countered)
        - Viewings: 1 (scheduled Saturday)
    2. Recent Activity (Section 43)
        - "Viewed Green Street Condo — 3 hours ago"
        - "Price dropped on saved listing"
        - Most recent 5
    3. Upcoming Viewings
        - Next 2-3 viewings
        - Date, time, address, agent
        - Reschedule / Cancel
    4. New Alerts
        - Price alerts triggered
        - New listings matching criteria
    5. Quick Links
        - Browse Properties
        - Manage Offers
        - View All Viewings
        - Messages
- **Required data:** Saved, offers, viewings, notifications, activity.
- **Implementation notes:** Modules 4 and 5 closed 8 Sept.

**Page 9: Saved Listings (/dashboard/saved)**

- **Purpose:** Compare and act on shortlisted listings.
- **Content requirements:**
    1. Filter Bar
        - Sort (Newest, Price Low-High, Recently Viewed)
        - View option
    2. Saved Listings
        - Same listing information as search results
        - Remove save
        - "View offer" if offer made on this listing
    3. Empty State
        - "No saved listings yet. Start exploring!"
- **Implementation notes:** **Ratified:** presented as a dense comparison table rather than cards (density rule). See RATIFIED_DIVERGENCES.

**Page 10: My Offers (/dashboard/offers)**

- **Purpose:** Track and negotiate every offer (Journey 4).
- **Content requirements:**
    1. Offer Status Filter
        - All / Submitted / Countered / Accepted / Rejected
    2. Offers List (Section 17)
        - Listing address
        - Your offer amount
        - Current status (Submitted, Countered at $X)
        - Last activity date
        - Actions (View Details, Withdraw, Counter)
    3. Offer Detail (`/dashboard/offers/:id`)
        - Offer timeline (created → countered → ...) (Section 18)
        - Current offer vs. counter (Section 20)
        - Message thread with agent/seller (Section 22)
        - Accept / Counter / Withdraw
        - Offer terms: move-in date, earnest money, contingencies
        - Closing checklist after acceptance (Section 21)
        - Complete purchase (checkout, C82) once accepted and not yet paid
- **Rules:** Accepting a counter is binding and cannot be reopened; a counter confirms the amount before sending; checkout success holds funds in escrow until release (BR2).
- **Implementation notes:** Milestones shared with the agent's deal detail through one hook (closed 9 Sept).

**Page 11: Viewings (/dashboard/viewings)**

- **Purpose:** Manage every tour (Journey 3).
- **Content requirements:**
    1. Calendar (Month view, Section 45)
        - Days with viewings identified
        - Choose a day → its viewings
    2. Upcoming List
        - Per viewing: date, time, address, agent, status
        - Reschedule / Cancel
        - Send message to agent link
    3. Past Viewings
        - Expandable list
        - Survey results if submitted

**Page 12: Messages (/dashboard/messages)**

- **Purpose:** Converse about deals (Journey 5).
- **Content requirements:**
    1. Conversations List (Sections 24, 28)
        - One entry per conversation
        - Agent name, last message preview, timestamp
        - Unread indicator
        - Search/filter
    2. Message Thread (Sections 22, 23)
        - All messages with timestamp, sender
        - Typing indicator
        - Message input
        - Attach file option
        - Send
- **Implementation notes:** Attach and document share built (closed 8 Sept); message report built (closed 9 Sept); **real-time deferred**.

**Page 13: Alerts (/dashboard/alerts)**

- **Purpose:** Control and review notifications (Journey 19).
- **Content requirements:**
    1. Alert Settings
        - Price drops in saved listings (threshold)
        - New listings matching criteria
        - Offer responses
        - Viewing confirmations
        - Email / SMS / In-app per alert type
    2. Alert History
        - Recent alerts fired
        - Mark as read (single and all)
- **Implementation notes:** Saved-search alerts are stored but never sent — copy may not promise them (RATIFIED_DIVERGENCES › Landing page).

**Page 14: Settings (/dashboard/settings)**

- **Purpose:** Profile, preferences and account (Journey 7).
- **Content requirements:**
    1. Profile
        - Photo (upload/remove)
        - Name
        - Email
        - Phone
        - Notification preferences
    2. Preferences
        - Communication method (email, SMS, phone, in-app)
        - Show/hide profile to agents
        - Data usage (analytics opt-in)
    3. Account
        - Change password
        - Download data
        - Delete account
    4. Identity verification — submit a document; see review state and any rejection reason (added; closed 9 Sept)
- **Implementation notes:** Avatar upload persists (closed 9 Sept). Download data calls the export API. **Delete account is not wired** — a confirmation dialog exists but nothing opens it, while the Privacy page tells users they can delete their account (open question). Change password is offered as a reset link.

---

## PAGES 15-19: AGENT DASHBOARD

Shared: **Permissions** — `SELLER` (Agent and Seller personas, ADR 0018); **Device needs** and **States** as for the buyer portal.

**Page 15: Agent Dashboard (/agent/dashboard)**

- **Purpose / business objective:** The agent's daily desk (Journey 15).
- **Content requirements:**
    1. Pipeline overview (# of listings, # of leads, # of offers, $ volume)
    2. Top performers (comps, recent sales)
    3. Upcoming showings
    4. Recent leads
    5. Quick links
- **Implementation notes:** **Ratified:** served at `/agent`. Quick links closed 8 Sept.

**Page 16: Listings (/agent/listings)**

- **Purpose:** Manage the portfolio (Journey 16).
- **Content requirements:**
    1. All listings with status, views, saves, offers
    2. Bulk actions: Publish, Draft, Delete, Renew
    3. Upload new listing (→ Page 40)
    4. Filter: Active, Sold, Draft, Expired
    5. Import CSV for bulk listings (from Phase 3 quick actions)
- **Rules:** Bulk destructive actions confirm (BR10); views come from recorded views (BR16).

**Page 17: Leads (/agent/leads)**

- **Purpose:** Qualify and contact enquirers.
- **Content requirements:**
    1. Inquiries (buyers interested in listings)
    2. Status: New, Contacted, Qualified, Lost
    3. Scoring (hot, warm, cold)
    4. Message / Call
- **Implementation notes:** **Ratified:** status is `pending / accepted / declined` from `ConnectionStatus`; temperature is derived (ADR 0016, BR8). Email and call through the platform (BR9). Budget qualification deferred (no buyer financial field).

**Page 18: Pipeline (/agent/pipeline)**

- **Purpose:** Move deals to close.
- **Content requirements:**
    1. CRM-style stages: Leads → Offers → Pending → Closed
    2. Drag-drop to update status (Section 42)
    3. Notes per deal
    4. Timeline to close
    5. Deal detail with accept/decline and closing milestones
- **Rules:** BR6 — a move is a request resolved against what the agent may do; every move also available without a pointer.

**Page 19: Calendar (/agent/calendar)**

- **Purpose:** Showings, follow-ups and closings in time.
- **Content requirements:**
    1. Month/week view
    2. Showings, follow-ups, closings
    3. Create event
    4. Sync to Google Calendar
- **Implementation notes:** Create event closed 8 Sept; one-way Google Calendar push closed 12 Sept (fire-and-log; revoked grant offers reconnect).

---

## PAGES 20-27: ADMIN DASHBOARD

Every admin route offers the Admin Console Shell (Section 56): admin navigation in six labelled groups — Overview, Marketplace, Finance, Insights, Trust & Safety, System — the current location, and the user menu. Every page states its title, a live-count description and its page-level actions.

Shared: **Permissions** — `ADMIN` only, enforced server-side (Phase 9 › Access Control); **Device needs** — desktop-first; on narrow screens every column and action remains reachable; **Dependencies** — the audit log records every decision.

---

### Page 20: Admin Overview (/admin)

- **Purpose:** Surface platform health, volume, revenue and outstanding moderation work in one screen
- **Business objective:** Shorten time-to-decision on every queue (Journey 8).
- **User objective:** See what needs attention within seconds of landing

**Content requirements:**

1. Page Header
    - Title: "Admin Dashboard"
    - Description: "System health, volume, revenue, and content moderation"

2. Volume Metrics (Section 57)
    - Total Users — e.g. 1,247, +6.2%, "1,102 active this month" → /admin/users
    - Active Listings — e.g. 342, +18%, "12 awaiting review" → /admin/listings
    - Transactions (30d) — e.g. 128, +9.4%, "41 in escrow" → /admin/transactions
    - GMV (30d) — e.g. $312M, +22%, "$7.8M commissions" → /admin/reports (featured)
    - Each: value, trend, caption, 6-point trend series

3. Revenue (Section 58)
    - GMV by month (rolling 6 months), values in $M
    - Action: "Payments" → /admin/payments

4. System Alerts (Section 61)
    - Alert count
    - Per alert: title, description, relative time, severity (info / warning / error)
    - Examples: tier-verification request, flagged listing image, large transaction pending escrow

5. Revenue Breakdown (Section 59)
    - Headline metric: Commissions (YTD) $21.2M
    - Supporting: GMV (YTD), platform take rate, avg commission per deal

6. Moderation Queue (Section 62)
    - Pending verifications (warning) → /admin/verifications
    - Listings awaiting review (warning) → /admin/listings
    - Flagged content (error) → /admin/listings

7. Quick Actions
    - Manage Users · Review Listings · Process Verifications · View Reports

8. System Health (Section 60)
    - Description: "Uptime 99.92% · Error rate 0.09% (24h)"
    - Per system: Database, API Gateway, File Storage — uptime, error rate, operational/degraded

- **Required data:** Stats, revenue series, queue counts and oldest ages, service health, audit log.
- **States:**
    - Loading: Placeholder per metric and per panel
    - Degraded: Any non-operational system is reported as degraded in text
    - Empty queue: "Nothing awaiting review"
    - Error: Panel-level message with retry; other panels keep rendering
- **Implementation notes:** **Ratified (22 Sept):** modules 4 and 6 are one "Needs a Decision" list with counts and oldest-item ages; module 5 folded into one estimated commission line (BR17); module 7 removed (duplicates navigation). The working tree holds an uncommitted rework of this page by the owner (triage, business, people and health registers).

---

### Page 21: Listings Moderation (/admin/listings)

- **Purpose:** Clear the queue of submitted and flagged listings
- **Business objective:** Keep inventory accurate and lawful.
- **User objective:** Approve, reject or return each listing with a documented reason

**Content requirements:**

1. Page Header
    - Title: "Listings Moderation"
    - Description: live counts — "N pending · N flagged · N approved · N rejected"
    - Action: Export

2. Status Filters
    - All / Pending / Flagged / Approved / Rejected, each with a count
    - Changing filter clears selection and closes any open detail

3. Moderation Table (Section 63)
    - Columns: Listing (cover photo + address), Price, Agent, Submitted, Compliance, Status, Actions
    - Totals: queue size, total value, open compliance checks
    - Sortable; default sort by status; selectable; paginated
    - Flagged and rejected rows identifiable without colour

4. Listing Detail (on opening a row)
    - Photo set, full description, flag reason, compliance checklist, agent contact
    - Actions: Approve · Request Changes · Reject (Approve hidden when already approved, Reject hidden when already rejected)

5. Bulk Actions (on selection)
    - Approve · Request Changes · Reject applied to every selected row

6. Decision Modal (Section 64)
    - Triggered by Reject or Request Changes, single or bulk
    - Note field is required — submit stays disabled until it is non-empty
    - Reject → status rejected with note; Request Changes → status returns to pending, flagged as changes requested

- **States:**
    - Empty (filtered): "No listings match this filter right now"
    - Approved: Row leaves pending counts, selection clears
    - Blocked: Decision modal cannot submit without a note
- **Rules:** BR4.

---

### Page 22: User Management (/admin/users)

- **Purpose:** Manage every account on the platform
- **Business objective:** Enforce standing fairly (Journey 11).
- **User objective:** Find a user, review standing, suspend or reinstate

**Content requirements:**

1. Page Header
    - Title: "User Management"
    - Description: "N active users · N total"
    - Actions: Filter · Add User

2. User Table (Section 65)
    - Columns: User (avatar, name, email), Role (Buyer / Agent / Admin), Tier (Standard / Premium / Platinum), Joined, Deals, Status, Actions
    - Sort by any column; default sort by user name ascending
    - Suspended rows identifiable without colour
    - Selectable with pagination

3. Row Actions
    - Per-row suspend / reactivate control

4. Bulk Actions (on selection)
    - Reactivate · Suspend across selected rows

5. User Profile (`/admin/users/:id`) — added
    - Lifetime volume, closed deals, credentials verified, suspensions
    - Verification state (email, phone, identity)
    - Suspension history, account facts, public profile

- **States:**
    - Empty: "No users to show"
    - Suspended: Status reads suspended, action flips to Reactivate
    - Optimistic: Status change applies immediately to the table and the header count, and rolls back visibly on failure
- **Implementation notes:** The profile route is read-only today.

---

### Page 23: Transactions (/admin/transactions)

- **Purpose:** Track deal flow, escrow and commission across the marketplace
- **Business objective:** Revenue integrity (Journey 12).
- **User objective:** Understand volume and inspect any single deal

**Content requirements:**

1. Page Header
    - Title: "Transactions"
    - Description: "Deal flow, escrow, and commission across the marketplace"
    - Actions: Filter · Export

2. Summary Stats
    - Total Volume (featured) — sum of sale prices, caption "N transactions"
    - Commission — volume × platform rate, caption "platform revenue"
    - Completed — completed count of total deals

3. Transaction Table (Section 66)
    - Columns: Property (address, buyer, agent), Sale Price, Commission, Initiated, Status, Actions
    - Totals for sale price and commission
    - Status: Pending / Escrow / Completed, each identifiable in text

- **States:**
    - Loading: Placeholder stats and table rows
    - Empty: Zeroed stats plus table empty message
    - Escrow: Row flagged distinctly from completed deals

---

### Page 24: Payments & Revenue (/admin/payments)

- **Purpose:** Monitor platform earnings and release agent payouts
- **Business objective:** Settle money correctly (BR2, BR3).
- **User objective:** Confirm revenue is tracking and clear outstanding payouts

**Content requirements:**

1. Page Header
    - Title: "Payment & Revenue"
    - Description: "Commissions, platform fees, and payouts"
    - Action: Export

2. Revenue Stats
    - Revenue YTD (featured) — value, trend, "vs last year"
    - Monthly Avg — value, trend, "6-month trend"
    - Commission — value, share of total
    - Outstanding — value, "N pending transactions"

3. Monthly Revenue (Section 58)
    - Commission vs Platform Fees by month, values in $K

4. Revenue Breakdown
    - Split of commission and platform fees, with total and "YTD"

5. Payment Processing
    - Action: Process
    - Pending payouts warning with amount
    - Summary: average processing time
    - Escrow release and refund per hold, refund reason required (added; closed 9 Sept)

- **States:**
    - Pending payouts: Warning present; hidden when nothing is outstanding
    - Loading: Chart placeholders preserve their space
    - Error: Chart falls back to last known figures with a retry action

---

### Page 25: Analytics & Reports (/admin/reports)

- **Purpose:** Report platform performance and market position
- **Business objective:** Explain the numbers to the business.
- **User objective:** Read growth, then export or build a custom report

**Content requirements:**

1. Page Header
    - Title: "Analytics & Reports"
    - Description: "Platform performance and market insights"
    - Actions: Download · Generate Custom

2. Headline Stats
    - GMV (YTD) (featured) — trend vs prior year
    - Active Listings — trend month over month
    - User Growth — percentage, caption with active user count
    - Avg Transaction — value, trend vs market

3. Market by Region
    - Regions ranked by transaction volume, values in $M
    - Top region identified

4. User Breakdown
    - Buyers / Agents / Admins, with total users

5. Tier Distribution
    - Standard / Premium / Platinum, with total users

- **States:**
    - Loading: Placeholder stats and charts
    - Empty region set: Show an empty state instead of an axis with no bars
- **Rules:** Exported figures match on-screen figures.

---

### Page 26: Tier Verifications (/admin/verifications)

- **Purpose:** Process identity and tier-upgrade requests
- **Business objective:** Verified users (Principle 4).
- **User objective:** Approve, reject or re-open a verification with its documents in view

**Content requirements:**

1. Page Header
    - Title: "Tier Verifications"
    - Description: "N pending · N approved"
    - Action: Export Report

2. Verification List (Section 67)
    - Per request: name, email, current tier → requested tier, submitted date, document count
    - Status: Pending / Approved / Rejected

3. Status-Dependent Actions
    - Pending: Approve · Review Docs · Reject
    - Approved: View Details · Revoke
    - Rejected: View Reason · Allow Resubmit

- **States:**
    - Empty: "No verification requests"
    - Pending: Navigation count matches the pending total on this page
    - Decision: Request moves to its new status and the header counts update

---

### Page 27: System Settings (/admin/settings)

- **Purpose:** Configure platform identity, marketplace rules and moderation policy
- **Business objective:** Safe configuration (Journey 13, BR11).
- **User objective:** Change a value and save it with confidence

**Content requirements:**

1. Page Header
    - Title: "System Settings"
    - Description: "Platform configuration, marketplace rules, and moderation policy"
    - Actions: Reset · Save Changes (label becomes "Saved" after a successful submit)

2. Save Confirmation
    - Shown only after save
    - "New values apply to listings and payouts created from now on."

3. Platform Config (Section 68)
    - Platform Name, Support Email, Base Currency, Reporting Timezone

4. Marketplace Rules (Section 68)
    - Commission Rate (%), Listing Fee ($), Listing Expiry (days), Max Photos Per Listing, Auto-Approve Below ($), Escrow Hold (days)

5. Moderation Policy Toggles (Section 69)
    - Automatic Photo Scanning · Require Agent License Verification · Manual Review Above Threshold · Auto-Suspend On Repeat Rejections

6. Operations Toggles (Section 69)
    - Maintenance Mode · New Signups · Daily Health Digest · Payout Automation

7. Maintenance (Section 70)
    - Destructive and operational actions, kept apart from ordinary configuration

- **States:**
    - Dirty: Any edit clears the saved flag and restores the "Save Changes" label
    - Saved: Confirmation appears and the primary action reads "Saved"
    - Reset: All fields return to their stored values and the saved flag clears
- **Implementation notes:** Modules 3 (timezone), 5, 6 and 7 closed 8 Sept.

---

## ADDED PAGES 28-46

Added in version 2.0. Each route shipped without a Phase 4 blueprint (RATIFIED_DIVERGENCES › Section 48 and "44 routes against 27 pages"). The blueprints below record intent as observed in the shipped routes and must be confirmed by the owner; per RATIFIED_DIVERGENCES they are **not** a changelog — later code changes do not rewrite them.

### Pages 28–34: Site Pages

Shared: **Purpose** — answer the questions a visitor or member asks before trusting the platform; **Permissions** — anyone; **Required data** — static prose from `lib/data/*-page.ts` unless noted; **Device needs** — readable on every device, contents navigable by keyboard; **States** — static (no loading or error) unless noted; **Dependencies** — Section 48 links to all seven; **Rules** — content grounded in what the platform actually does (BR15).

| Page | Route           | Content requirements (priority order)                                                                                                                                                         | Notes |
| ---- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| 28   | `/about`        | 1. Why we built it · 2. How it works · 3. For advisors · 4. What we hold ourselves to                                                                                                            | —     |
| 29   | `/help`         | 1. Finding a property · 2. Arranging a viewing · 3. Making an offer · 4. Sending documents · 5. Alerts and notifications · 6. Your account · 7. Still stuck                                          | Help Center |
| 30   | `/blog`         | 1. Journal entries (index) · 2. Empty state while none exist ("Nothing published yet") with a route to listings · 3. Newest available listings and the available count                             | Entries are content, not code. Loading/error for the listings block |
| 31   | `/contact`      | 1. Get help: support email, your advisor (messages), a specific home (search) · 2. Other enquiries: press and partnerships, listing with us, reporting a problem                                  | No form — routes to the right channel |
| 32   | `/privacy`      | 1. What we collect · 2. Why we hold it · 3. Who else processes it · 4. The newsletter · 5. How long we keep it · 6. Your choices · 7. Security · a contents list tracking the reader's position     | Ratified (ADR 0017). Legal review owed. "Your choices" promises account deletion, which is not wired (Page 14) |
| 33   | `/terms`        | 1. Accounts · 2. What we are and are not · 3. Listings and conduct · 4. Offers and transactions · 5. Availability and liability · 6. Changes and contact                                             | Legal review owed; linked from sign-up consent |
| 34   | `/accessibility`| 1. What we aim for · 2. What is in place · 3. Where we fall short (including the pipeline drag keyboard gap and the provider-rendered payment form) · 4. Telling us we got it wrong                | Honest, not a conformance claim |

### Page 35: Verify Email (/verify-email)

- **Purpose:** Confirm the email address after sign-up (Journey 6).
- **Content requirements:** 1. What to do and where the code was sent · 2. Six-digit code entry · 3. Confirm · 4. Send a new code · 5. "Do this later" when returning to a task.
- **Validation:** Exactly six digits; confirm disabled until complete.
- **States:** Success → "Email confirmed", or return to the pending task; error → "We couldn't confirm that code"; code expires after 15 minutes.
- **Rules:** BR13 — verification does not gate use.

### Pages 36–37: Newsletter Confirm and Unsubscribe

- **Purpose:** Complete a double opt-in or leave the list (BR14).
- **Content requirements:** 1. The outcome · 2. What to do if the link failed · 3. Route home.
- **States:** pending; done ("You're on the list" / "You're unsubscribed"); invalid link (expired, used or replaced — subscribe again from the footer); failed (nothing changed — try again).
- **Rules:** Token-driven, processed once; not indexed.

### Page 38: Enquiries (/dashboard/interests)

- **Purpose:** Every listing the buyer has registered interest in, and how far each has got.
- **Business objective:** Keep enquiries moving to viewings and offers.
- **Content requirements:** 1. Summary (live count, tracked value) · 2. Furthest-along enquiry (traction: offer on the table > viewing arranged > in conversation > no contact yet) · 3. All enquiries with stage (live / closed) and status (awaiting reply, introduced, declined) · 4. Status and traction mix · 5. Route to the thread and to saved listings.
- **States:** Empty → "No interest registered yet"; filtered empty → "Nothing matches this filter"; error → enquiries unavailable with retry.
- **Actions:** Read-only; opens threads.

### Page 39: Purchases & Escrow (/dashboard/transactions)

- **Purpose:** Money held in escrow and the sales it is waiting on (Journey 17).
- **Content requirements:** 1. Summary (in escrow, funds held) · 2. Purchases: property, price, transaction status, escrow status, inspection window remaining · 3. Release funds on a held escrow · 4. Escrow and stage mix.
- **Rules:** BR2; release is irreversible — confirmation states that it settles the sale, pays the seller and marks the property sold (C85, C88).
- **States:** Empty → "No purchases yet"; release failure → "Nothing has moved and the escrow is still held".
- **Dependencies:** Transactions, escrow APIs. Checkout starts from offer detail (Page 10).

### Page 40: Listing Submission (/agent/listings/new, /agent/listings/:id/edit)

- **Purpose:** Create and maintain a listing (Journey 16; the seed's entity-submission page).
- **Business objective:** Complete, accurate inventory.
- **Content requirements:** 1. The property (title, description, type) · 2. Where it is (address, locality, region, postal code, country, optional coordinates) · 3. What it offers (price, bedrooms, bathrooms; optional area, lot, year built, walk score) · 4. Amenities and features · 5. Photography (after first save) · 6. Lifecycle (status, promote, mark sold, delete — after first save).
- **Validation:** Title ≥ 5, description ≥ 20, address ≥ 5 characters; latitude −90…90, longitude −180…180; price positive; rooms whole numbers ≥ 0; year built ≥ 1600; walk score 0–100; photos JPG/PNG/WebP/AVIF, 10 MB each, at most the platform's max photos.
- **Rules:** Status moves only Draft ↔ Available by hand; Pending, Sold and Expired are driven by deals or moderation. Promotion 1–90 days, extends a running promotion, always labelled (BR15). Delete only without live offers or transactions; delete, photo removal and mark-sold confirm (BR10). Unsaved changes warn (C86).
- **States:** Edit loading; load failure; save failure highlights fields.
- **Dependencies:** Properties and uploads APIs; moderation (Page 21).

### Page 41: Requests (/agent/requests)

- **Purpose:** Everything a buyer is waiting on the agent for (Journey 15).
- **Content requirements:** 1. Counts: viewings to confirm, offers to answer, lapsing within a day, longest wait · 2. Viewings to confirm — pick one of the buyer's proposed times, or decline · 3. Offers to answer — accept, counter (amount required) or decline, with an optional note.
- **Rules:** Accepting is final and closes every other offer on the listing; declining is final; a failed response sends nothing (BR10). Stale viewing requests say their proposed times have passed.
- **States:** "No viewings waiting" / "No offers waiting"; error with retry.

### Page 42: VIP Concierge (/agent/concierge)

- **Purpose:** Coverage across the agent's highest-value relationships.
- **Content requirements:** 1. Relationships, mandate, allocation, open requests, closed to date · 2. Top relationship · 3. Active VIP clients (tier, status, allocation, next action) · 4. Service desk (open requests against capacity) · 5. Retention playbook · 6. Add, edit and remove clients; save services and practices.
- **Implementation notes:** Content requirement 6 has hooks but no surface — the page is read-only today, and its empty state tells the agent to "add a client" with no way to do so (open question).

### Page 43: Disputes (/admin/disputes)

- **Purpose:** Resolve disputes between parties (Journey 18).
- **Content requirements:** 1. Counts by state (open, in review, resolved, dismissed) · 2. Queue ordered open first, then amount at stake, then wait · 3. Review: raised by, amount, age, evidence, disputed deals · 4. Resolve in full or Dismiss with a required outcome note · 5. Outcome once settled.
- **Rules:** BR5; decisions are final and visible to both parties.
- **States:** "Queue clear"; error with retry; decision failure leaves the dispute open.

### Page 44: Reported Members & Messages (/admin/flags)

- **Purpose:** Decide member and message reports (Journey 18).
- **Content requirements:** 1. Open counts by kind · 2. Queue (open first, longest wait) filterable by members / messages · 3. Review: kind, reporter, reason, age, what was reported, the reporter's account · 4. Uphold or Dismiss · 5. Read-only record once settled.
- **Rules:** Listing flags are decided in Page 21, not here. The reporter is never disclosed to the reported party.
- **Implementation notes:** No decision note is collected today, unlike disputes and moderation (open question).

### Page 45: Not Found (404)

- **Purpose:** Recover from a dead link (Section 53).
- **Content requirements:** 1. What happened (expired link or withdrawn listing) · 2. Browse listings · 3. Back to home.

### Page 46: Error (500)

- **Purpose:** Recover from a failure without losing trust (Section 54).
- **Content requirements:** 1. What failed, in the words of the area (search, listing, buyer portal, agent console, admin console) · 2. Reassurance about what was not affected ("Your saved homes and offers are untouched", "Nothing was changed") · 3. Retry · 4. A route elsewhere (home, search, another portal section).
- **Implementation notes:** Segment error boundaries exist for search, listing detail and the three portals; no root-level boundary exists. Section 54's error ID for support is not shown today.

---

## Regeneration Notes

- **Retained:** Pages 1–27, every module (now numbered content requirements with the same numbers), every state and every piece of copy.
- **Added:** Page Index; for every page the seed's business objective, primary tasks, required data, permissions, device needs, actions, dependencies and implementation notes; Pages 28–46; Page 10 detail route, Page 14 identity verification, Page 16 CSV import (from Phase 3), Page 18 deal detail, Page 22 profile route and Page 24 escrow settlement as content requirements drawn from existing records; divergence pointers.
- **Changed — renamed:** "Modules" → "Content requirements"; "Responsive" → "Device needs"; "Page Header" and "Panel" names kept as content labels only.
- **Changed — dropped as visual prescription:** Page 1 "Background image (lifestyle shot)", "6 cards in grid (2-3 columns responsive)", "Hover: enlarge, show 'Save' button", "Icons + short copy", "Timeline visual", "Carousel or grid", "Buttons:"; every "Responsive:" block ("Mobile: 1 column hero…", "Tablet: 2 column grid, filter sidebar (sticky)", "Desktop: 3 column grid…", "Hero 70%, sidebar 30% with agent card", "Map 80%, filter sidebar 20%", "3-column layout with main column at 2/3 and panel rail at 1/3", "Content capped at a readable measure; fields in a two-column grid", "Table scrolls horizontally inside its own container; detail opens full-screen", "Actions wrap below the identity block"); Page 2 "(Sticky on desktop)", "Cards in 2-3 columns", "Hover: enlarge"; Page 3 "Hero Gallery / Large image carousel (swipe on mobile) / Thumbnails below", "Price & Status Bar (Sticky)", "Save button (star icon)", "Small badges", "Table or cards", "(Sticky on Mobile)"; Page 4 "Full-screen Google Map", "(left sidebar…)", "popup"; Page 8 "(3 cards)", "Timeline-style list", "Card layout"; Page 9 "Grid", "View (Grid / List)", "Same card style as search results", "Remove save button (X)"; Page 10 "Table/Cards", "(Modal/Page)"; Page 11 "highlighted", "Card per viewing"; Page 12 "(Sidebar on desktop)", "(Main area)", "field"; admin shell "fixed sidebar (brand 'Admin / Console'…), topbar with breadcrumb and user menu, scrollable main column… right-aligned actions"; Page 20 "(4-column stat grid)", "icon, trend chip, caption, 6-point sparkline", "(main column)", "(sidebar)", "Column chart", "Count badge in panel header", "tone", "warning dot and tints its health row", "Skeleton per stat card and per panel body"; Page 21 "Filter Pills", "carry a tinted background", "(row reveal, large)", "Footer actions", "Bulk Action Bar"; Page 22 "colour-coded", "right-aligned", "error-tinted background", "Status badge turns error, row tints"; Page 23 "(4-column grid)", "spans 2 columns", "(accent chip)", "each tinting the initiated date"; Page 24 "Grouped column chart", "Donut chart … centre total", "Warning callout", "Chart skeletons preserve panel height"; Page 25 "Horizontal bar chart", "highlighted in a distinct tone", "Donut … centre total", "bar labels truncate"; Page 26 "One card per request", "Status badge: Pending (warning) / Approved (success) / Rejected (error)", "Tier rendered in its tier colour"; Page 27 "Callout / Success variant". Example figures in Page 20 are kept, marked "e.g.".

---

**Phase 4 Complete.** 46 pages specified by content, data, permissions, device needs and states. Next: [Phase 5 — Section Blueprints](phase-5-section-blueprints.md).

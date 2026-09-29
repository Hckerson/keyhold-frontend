# Phase 3: Information Architecture

**Keyhold Design Operating System** · Phase 3 of 9 · Version 2.0 · 29 September 2026

Sitemap, navigation, permissions, taxonomy, labelling and hierarchies, derived from the journeys in [Phase 2](phase-2-experience-maps.md). Next: [Phase 4 — Page Blueprints](phase-4-page-blueprints.md).

Information architecture decides what exists, what it is called, who can reach it and in what priority it is offered. It never decides where anything sits on a screen.

---

## Contents

1. [Overview](#overview)
2. [Site Structure (Sitemap)](#site-structure-sitemap)
3. [Role-Based Navigation Models](#role-based-navigation-models)
4. [Permissions Matrix](#permissions-matrix)
5. [Content Taxonomy](#content-taxonomy)
6. [Labeling Conventions](#labeling-conventions)
7. [Information Priority (Content Hierarchy)](#information-priority-content-hierarchy)
8. [Search Hierarchy](#search-hierarchy)
9. [Filtering Hierarchy](#filtering-hierarchy)
10. [Cross-linking](#cross-linking)
11. [Breadcrumb Strategy](#breadcrumb-strategy)
12. [SEO Hierarchy](#seo-hierarchy)
13. [Empty Routes and Fallback Routes](#empty-routes-and-fallback-routes)
14. [Future Expansion Strategy](#future-expansion-strategy)
15. [Regeneration Notes](#regeneration-notes)

---

## Overview

Complete information architecture covering:

- Site structure and page hierarchy
- Role-based navigation models
- Permissions matrix
- Content taxonomy and labeling
- Navigation patterns
- Search, filtering, cross-linking, breadcrumb and SEO hierarchies
- Empty, fallback and future routes

---

## Site Structure (Sitemap)

Routes marked **(added)** exist in the app and had no entry in version 1; they are blueprinted as Pages 28–46 in [Phase 4](phase-4-page-blueprints.md#added-pages-28-46).

```
/
├── (PUBLIC BROWSE)
│   ├── / (Home)
│   ├── /search (Search Results)
│   ├── /listing/:id (Listing Detail)
│   ├── /map (Map View)
│   ├── /about, /help, /blog, /contact (added — Pages 28–31)
│   ├── /privacy, /terms, /accessibility (added — Pages 32–34)
│   └── /newsletter/confirm, /newsletter/unsubscribe (added — Pages 36–37)
│
├── (AUTH REQUIRED)
│   ├── /dashboard (Buyer Home)
│   ├── /dashboard/saved (Saved Listings)
│   ├── /dashboard/interests (Enquiries — added, Page 38)
│   ├── /dashboard/offers (My Offers)
│   │   └── /dashboard/offers/:id (Offer Detail — Page 10 content requirement 3)
│   ├── /dashboard/viewings (Scheduled Viewings)
│   ├── /dashboard/messages (Messages)
│   ├── /dashboard/transactions (Purchases and escrow — added, Page 39)
│   ├── /dashboard/alerts (Price Alerts)
│   ├── /dashboard/settings (Settings)
│   │
│   ├── /agent/dashboard (Agent Home — served at /agent, ratified)
│   ├── /agent/listings (My Listings)
│   │   ├── /agent/listings/new (Listing Submission — added, Page 40)
│   │   └── /agent/listings/:id/edit (Listing Submission, edit — Page 40)
│   ├── /agent/requests (Viewing and offer requests — added, Page 41)
│   ├── /agent/leads (Leads)
│   ├── /agent/pipeline (Pipeline/CRM)
│   ├── /agent/calendar (Calendar)
│   ├── /agent/concierge (Concierge clients — added, Page 42)
│   ├── /agent/analytics (Performance)
│   ├── /agent/settings (Settings)
│   │
│   ├── /admin (Admin Overview)
│   ├── /admin/listings (Moderation Queue)
│   ├── /admin/flags (Member and message reports — added, Page 44)
│   ├── /admin/disputes (Disputes — added, Page 43)
│   ├── /admin/users (User Management)
│   │   └── /admin/users/:id (User profile — Page 22 detail)
│   ├── /admin/transactions (Transaction History)
│   ├── /admin/payments (Payment Status)
│   ├── /admin/reports (Analytics)
│   ├── /admin/verifications (Tier Verifications)
│   └── /admin/settings (Admin Settings)
│
├── (AUTH)
│   ├── /signup (Sign Up)
│   ├── /login (Sign In)
│   ├── /reset-password (Password Reset)
│   └── /verify-email (Email Verification — blueprint added, Page 35)
│
└── (SYSTEM)
    ├── Not found (404 — added, Page 45)
    └── Error boundary (500 — added, Page 46)
```

---

## Role-Based Navigation Models

Each model lists what a role's navigation must offer, in priority order. Where and how it is presented is decided at build time.

### Anonymous User (Not Logged In)

**Primary Navigation:** Home → Search → Listing Detail → Sign Up

**Global navigation offers:**

- Brand (home link)
- Search
- Sign In / Sign Up

**Site-wide links:**

- About, Help, Blog links
- Social media
- Privacy, Terms

> **Ratified divergence (Page 1 module 7).** Social links are removed until the accounts exist; the newsletter signup is back on a double opt-in list (BR14). See RATIFIED_DIVERGENCES.

**Restrictions:**

- Cannot save listings
- Cannot create offers
- Cannot message agents
- Cannot schedule viewings

A restricted action prompts sign-in and returns the visitor to the action afterwards.

---

### Buyer (Logged In)

**Primary Navigation:** Home → Search → Saved/Offers/Viewings/Messages

**Global navigation offers:**

- Brand
- Search + filters
- Saved count
- Messages (with unread count)
- User menu (Profile, Settings, Logout)

**Portal navigation (all devices):**

- Saved Listings
- My Offers
- My Viewings
- Messages
- Price Alerts
- Settings
- Enquiries, Purchases (added routes)

**Quick Actions:**

- "Save" on listings
- "Schedule Viewing" on detail
- "Make Offer" on detail

---

### Agent (Logged In)

Serves both the Modern Agent and the Seller persona (ADR 0018).

**Primary Navigation:** Dashboard → Listings → Leads → Pipeline → Calendar → Analytics

**Global navigation offers:**

- Brand
- Search (for listings to preview)
- Notifications (new leads, showing requests)
- User menu

**Portal navigation:**

- Dashboard (overview)
- My Listings (list, actions)
- Requests (viewing and offer requests — added)
- Leads (inquiries, qualification)
- Pipeline (view/offer status)
- Calendar (showings, follow-ups)
- Concierge (added)
- Analytics (performance)
- Settings

**Quick Actions:**

- "Upload Listing"
- "Import CSV" for bulk actions
- "Create Listing"

---

### Admin (Logged In)

**Primary Navigation:** Overview → Moderation → Users → Transactions → Payments → Reports → Verifications

**Global navigation offers:**

- Brand
- System health (uptime, error rate)
- Alerts count
- Admin menu

**Portal navigation (grouped):**

- Overview — Dashboard (health overview)
- Marketplace — Listings (moderation queue), Users (verification, suspension)
- Finance — Transactions (deal status), Payments (revenue, disputes)
- Insights — Reports (analytics, growth)
- Trust & Safety — Verifications (tier upgrades, count of pending), Flags, Disputes (added)
- System — Settings (system config)

**Quick Actions:**

- "Manage Users"
- "Review Listings" (bulk approve)
- "Process Verifications"
- "View Reports"

> **Ratified divergence (Page 20 module 7).** The admin overview's Quick Actions were removed because they duplicate the portal navigation. The actions remain reachable from navigation.

---

## Permissions Matrix

| Action           | Anonymous | Buyer   | Agent   | Seller  | Admin   |
| ---------------- | --------- | ------- | ------- | ------- | ------- |
| View listings    | ✓         | ✓       | ✓       | -       | ✓       |
| Save listing     | -         | ✓       | -       | -       | -       |
| Create offer     | -         | ✓       | -       | -       | -       |
| Schedule viewing | -         | ✓       | ✓       | ✓       | -       |
| Message agent    | -         | ✓       | ✓       | ✓       | -       |
| Upload listing   | -         | -       | ✓       | ✓       | -       |
| Edit listing     | -         | -       | ✓ (own) | ✓ (own) | ✓ (all) |
| View offers      | -         | ✓ (own) | ✓ (own) | ✓ (own) | ✓ (all) |
| Moderate listing | -         | -       | -       | -       | ✓       |
| Suspend user     | -         | -       | -       | -       | ✓       |
| Approve tier     | -         | -       | -       | -       | ✓       |
| Configure system | -         | -       | -       | -       | ✓       |
| View analytics   | -         | -       | ✓ (own) | ✓ (own) | ✓ (all) |
| Download data    | ✓         | ✓       | ✓       | ✓       | ✓       |

**Added rows (version 2.0)** — actions that ship and had no row:

| Action                          | Anonymous | Buyer        | Agent / Seller         | Admin             |
| ------------------------------- | --------- | ------------ | ---------------------- | ----------------- |
| Report a listing, agent or message | -      | ✓            | ✓                      | -                 |
| Triage flags, resolve disputes  | -         | -            | -                      | ✓                 |
| Pay a deposit                   | -         | ✓            | -                      | -                 |
| Release escrow                  | -         | ✓ (any time) | ✓ (after inspection window) | ✓ (any time; refund with reason) |
| Submit identity verification    | -         | ✓            | ✓                      | -                 |
| Subscribe to newsletter         | ✓         | ✓            | ✓                      | ✓                 |

> **Ratified divergence (Phase 1 · Core Personas).** Agent and Seller are one system role (`SELLER`); the two columns describe one permission set. Portal access is enforced server-side per role, never by hiding navigation alone (Phase 9).

---

## Content Taxonomy

### Property Types

- Single-Family Home
- Condo / Townhouse
- Multi-Family (2-4 units)
- Multi-Family (5+ units)
- Land
- Commercial (varies by market)

### Price Ranges

- $0-300k
- $300k-500k
- $500k-1M
- $1M-2M
- $2M+

### Listing Status

- Draft (not published)
- Published (active)
- Pending Offer
- Under Contract
- Sold
- Expired (old/stale)

### Offer Status

- Submitted
- Countered
- Accepted
- Rejected
- Withdrawn
- Closed (deal complete)

### Vocabulary in the code (for reference)

The app's enums (`lib/enums/enums.ts`, mirrored from the backend schema) use a different vocabulary. This is **not yet recorded** in RATIFIED_DIVERGENCES as ratified or deferred — an open question for the owner.

| Taxonomy        | In the code                                                                                         |
| --------------- | --------------------------------------------------------------------------------------------------- |
| Property types  | Estate, Villa, Penthouse, House, Apartment, Condo, Townhouse, Land, Other (search lists all but Land and Other) |
| Price bands     | Under $1M · $1M–$2M · $2M–$5M · $5M and above                                                        |
| Listing status  | Draft, Available, Pending, Sold, Expired                                                            |
| Offer status    | Pending, Countered, Accepted, Rejected, Expired                                                     |
| Lead status     | Pending, Accepted, Declined (ratified — Page 17, ADR 0016)                                          |
| Viewing         | Modes: in person, virtual, open house · Status: pending, confirmed, completed, cancelled            |
| Transaction     | Pending, In progress, Completed, Cancelled                                                          |

---

## Labeling Conventions

### Actions

- "Save" (bookmark a listing)
- "View" (schedule a showing)
- "Offer" (make an offer)
- "Message" (contact agent)
- "Share" (forward listing)
- "Report" (raise a concern with the trust team) — added

### Status Labels

- "New" (posted <7 days)
- "Hot" (many saves, multiple offers)
- "Price Reduced" (recently lowered)
- "Pending" (under contract)
- "Sold" (deal closed)
- "Featured" (a running promotion) / "Most viewed" (ranked by views) — added; a promoted placement is never labelled as editorial (BR15)

### Navigation Labels

- "Saved" (not "Favorites", not "Bookmarks")
- "My Offers" (not "Offers Made", not "Pending Offers")
- "My Viewings" (not "Scheduled", not "Showings")
- "Messages" (not "Inbox", not "Chat")
- "Settings" (not "Preferences", not "Admin")

### Empty States

- "No listings saved yet. Start exploring."
- "No offers to show. Ready to make one?"
- "No messages. Connect with an agent."

### Copy Rules

- An effect-stating label on every destructive action ("Suspend account", not "OK") — BR10.
- Estimates are labelled as estimates (BR17).
- Never promise an unshipped capability (saved-search alerts, newsletter cadence) — BR14, BR15.

---

## Information Priority (Content Hierarchy)

Priority order of what each page must offer. Order here is importance, not screen position.

### Listing Detail Page

1. **Primary photo and photo set**
2. **Price + status**
3. **Address + key facts** (beds, baths, sq ft)
4. **Further photos**
5. **Description** (full property details)
6. **Neighborhood** (map, schools, transit)
7. **Comparables** (similar recent sales)
8. **Agent info** (who's listing)
9. **Actions** (Schedule Viewing, Make Offer, Save)

### Search Results

1. **Filters** (always reachable)
2. **Result count** (12 in metro, 20 nearby, etc.)
3. **Sorting options** (Price: Low-High, Newest, Most Saved)
4. **Results**
5. **Pagination/Infinite scroll**
6. **Map option** (see results on map)

### Dashboard (Buyer)

1. **Quick stats** (Saved: 5, Offers: 2, Viewings: 1)
2. **Recent activity** (Last viewed, saved today)
3. **Upcoming** (Viewing scheduled for Saturday)
4. **New alerts** (Price dropped on saved listing)
5. **Quick links** (Browse, Manage Offers, Messages)

---

## Search Hierarchy

1. **Location** — free text over locality, region and address; neighbourhood shortcuts ranked by live listing count.
2. **Structured filters** — see Filtering Hierarchy.
3. **Sort** — Featured first (default: running promotions, then newest), newest, price ascending/descending, most bedrooms, largest, most popular, recently sold.
4. **View** — list, grid or map over the same query; the map adds a bounding-box constraint.
5. **Portal search** — the portal's command search reaches routes and records the role may see.

## Filtering Hierarchy

1. Price (bands with live facet counts — ratified over a slider)
2. Bedrooms
3. Bathrooms
4. Property type
5. Map viewport (map view only)

Filters are reflected in the URL so any result set is shareable and survives reload. Admin and portal tables filter by status first, then by search text; changing a filter clears any selection (Journey 9).

## Cross-linking

- Listing ↔ agent (agent card → the agent's other listings).
- Listing → comparables → their listings (when still available).
- Home browse index → pre-filtered search (type, price band, neighbourhood).
- Offer ↔ listing ↔ message thread ↔ milestones: every deal record links to the other three.
- Admin overview queue → the filtered queue it counts (Journey 8).
- Admin user row → user profile; transaction row → the deal.
- Footer → every site page (Pages 28–34).
- Every notification links to the item it describes.

## Breadcrumb Strategy

- **Public site:** no breadcrumb trail; listing detail offers a return to the originating search with its filters intact.
- **Portals:** the current location is always identifiable from the portal chrome, derived from a single route registry per portal, so the trail and navigation cannot disagree.
- **Detail routes** (`/dashboard/offers/:id`, `/admin/users/:id`, `/agent/listings/:id/edit`) name their parent and link back to it.

## SEO Hierarchy

| Priority | Routes                                             | Indexing                                             |
| -------- | -------------------------------------------------- | ---------------------------------------------------- |
| 1.0      | `/`                                                | Indexed                                              |
| 0.8–0.7  | `/search`, `/map`                                  | Indexed                                              |
| weekly   | `/listing/:id` for every available listing         | Indexed, structured data (JSON-LD), canonical URL    |
| 0.5–0.4  | `/about`, `/contact`, `/help`, `/blog`             | Indexed                                              |
| 0.2      | `/privacy`, `/terms`, `/accessibility`             | Indexed                                              |
| —        | `/dashboard/*`, `/agent/*`, `/admin/*`, auth routes, newsletter tokens | Not indexed                          |

## Empty Routes and Fallback Routes

- **Empty collections** keep their route and say what is missing and what to do next (Labeling › Empty States); `/blog` ships with no entries and an honest empty state.
- **Unavailable listing** (`/listing/:id` for a sold, withdrawn or missing listing) → "This listing is no longer available" with a route back to search.
- **Unknown route** → Not Found (Page 45) with links home and to search.
- **Server failure** in a segment → that segment's error boundary (Page 46) with retry; the rest of the portal chrome stays usable.
- **Unauthenticated portal visit** → sign-in, then back to the requested route.
- **Wrong role** → the visitor's own portal, never an empty console.
- **Unavailable provider** (sign-in, calendar) → the originating page with a stated reason.

## Future Expansion Strategy

- New portal pages join an existing navigation group before a new group is created.
- Buyer-facing market data (trends, regions) would become a public route, reusing the admin endpoints once their audience is widened (deferred).
- Agent collaboration (deferred) would add a shared-listing surface under `/agent`.
- Blog entries are content, not new routes.
- Localised routes would prefix, not fork, the public tree.

---

## Regeneration Notes

- **Retained:** the sitemap, all four role models, the permissions matrix, taxonomy, labelling, empty-state copy and the three content hierarchies.
- **Added:** sitemap entries for 19 shipped routes; added permission rows; code-vocabulary reference table; "Report", "Featured"/"Most viewed" labels; copy rules; search, filtering, cross-linking, breadcrumb, SEO, empty/fallback and future-expansion sections; inline divergence pointers.
- **Changed (visual/placement wording dropped):** "Header" / "Footer" / "Sidebar (Mobile Hamburger)" became "Global navigation offers" / "Site-wide links" / "Portal navigation (all devices)"; "Logo" → "Brand"; "icon/bar", "count badge", "button" dropped from nav items; "My Listings (grid, actions)" → "(list, actions)"; Listing Detail priority "Hero image (largest, first)", "Price + status (prominent)", "Gallery (scrollable photos)", "CTAs" → primary photo, price + status, further photos, actions; Search Results "Filters (sticky on desktop, collapsible on mobile)", "Results grid (card layout, 2-3 columns)", "Map toggle" → filters always reachable, results, map option; section heading "Information Priority (Page Hierarchy)" → "(Content Hierarchy)"; "Status Badges" → "Status Labels".

---

**Phase 3 Complete.** This IA guides all page structure and navigation. Next: [Phase 4 — Page Blueprints](phase-4-page-blueprints.md).

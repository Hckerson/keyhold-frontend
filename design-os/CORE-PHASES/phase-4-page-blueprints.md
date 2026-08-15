# Phase 4: Page Blueprints

**Real Estate Platform Design Operating System** - 27 pages with detailed specifications

---

## Overview

Complete page specifications covering:

- Page purpose and user goals
- Content modules and data
- Responsive behavior (mobile/tablet/desktop)
- States (loading, empty, error, success)
- Key interactions and flows

**Total Pages:** 27

---

## PUBLIC PAGES (No Auth Required)

### Page 1: Home (/)

**Purpose:** Introduce platform, build trust, drive signup or search

**User Goal:** Understand what platform does, start property search

**Modules:**

1. Hero Section
    - Headline: "Find Your Next Home"
    - Search bar (location + price range)
    - CTA: Search or Sign Up
    - Background image (lifestyle shot)

2. Featured Listings
    - 6 cards in grid (2-3 columns responsive)
    - Image, price, address, beds/baths, agent
    - Hover: enlarge, show "Save" button
    - Each card links to detail page

3. How It Works
    - 4 steps: Search → View → Offer → Close
    - Icons + short copy
    - Timeline visual

4. Trust Signals
    - "10k+ buyers on platform"
    - "$500M+ in transactions"
    - Reviews/testimonials (3-4)
    - Privacy badge, security cert

5. Latest Sales (Trending)
    - Map with recent closed listings
    - Carousel or grid
    - Shows momentum

6. CTA Section
    - "Ready to get started?"
    - Buttons: Sign Up (primary), Learn More (secondary)

7. Footer
    - Links: About, Help, Blog, Privacy, Terms
    - Social media icons
    - Newsletter signup

**Responsive:**

- Mobile: 1 column hero, 1 column featured, 1 column how-it-works
- Tablet: 2 columns featured, stacked sections
- Desktop: 2-3 columns featured, side-by-side how-it-works

**States:**

- Loading: Skeleton cards for featured listings
- Error: Fallback featured listings (hardcoded or cached)
- Success: All sections load, data fresh

---

### Page 2: Search Results (/search)

**Purpose:** Show properties matching user criteria

**User Goal:** Filter and browse available properties

**Modules:**

1. Filter Panel (Sticky on desktop)
    - Location (text, autocomplete)
    - Price range (slider, $100k-$5M)
    - Beds (1-5+)
    - Baths (1-4+)
    - Sort (Price Low-High, Newest, Most Saved)
    - Apply / Reset buttons

2. Results Header
    - "Found 345 homes"
    - View toggle (Grid / Map)
    - Sort dropdown

3. Results Grid
    - Cards in 2-3 columns
    - Image, price, address, beds/baths, agent
    - "Saved" badge if already saved
    - Hover: enlarge, save button

4. Pagination / Infinite Scroll
    - Show 20 per page, "Load More" or next/prev

5. Map View (Toggle)
    - Google Map with pins for each listing
    - Click pin → show preview card
    - Click card → navigate to detail

6. Empty State
    - "No listings found. Try adjusting filters."
    - Suggested filters

**Responsive:**

- Mobile: 1 column grid, filter drawer (hamburger)
- Tablet: 2 column grid, filter sidebar (sticky)
- Desktop: 3 column grid, filter sidebar, map toggle

**States:**

- Loading: Skeleton cards
- Error: Fallback to cached results + retry button
- Empty: Helpful message + filter suggestions
- Success: Results + filters working

---

### Page 3: Listing Detail (/listing/:id)

**Purpose:** Deep dive into a specific property

**User Goal:** Evaluate property, schedule viewing, make offer

**Modules:**

1. Hero Gallery
    - Large image carousel (swipe on mobile)
    - Thumbnails below
    - Full-screen button
    - "New" / "Hot" badge if applicable

2. Price & Status Bar (Sticky)
    - Price prominent
    - Status (Active, Pending, Sold)
    - Save button (star icon)
    - Share button
    - Message agent button

3. Key Facts Row
    - Beds / Baths / Sq Ft / Lot Size / Year Built
    - Small badges

4. Description Section
    - Full property description
    - Highlights (renovations, features)
    - Expandable "Read More"

5. Neighborhood Section
    - Google Map
    - Markers: Schools, Transit, Parks, Restaurants
    - Info panels on click
    - Walkability score

6. Comparable Listings
    - 3-5 recent sales nearby
    - Price, date, address
    - Table or cards

7. Agent Card
    - Photo, name, license
    - Star rating (reviews)
    - Response time ("Usually replies in 2 hours")
    - Call / Message buttons
    - "View other listings" link

8. CTA Section (Sticky on Mobile)
    - "Schedule a Viewing" (primary)
    - "Make an Offer" (secondary)
    - "Save Listing" (tertiary, if not saved)

**Responsive:**

- Mobile: Full-width hero, stacked sections, sticky CTA bar
- Desktop: Hero 70%, sidebar 30% with agent card

**States:**

- Loading: Skeleton for images, description, agent
- Error: Fallback description + contact agent CTA
- Unavailable: "This listing is no longer available"
- Success: All data loaded

---

### Page 4: Map View (/map)

**Purpose:** Explore listings geographically

**User Goal:** See where properties are, spatial understanding

**Modules:**

1. Full-screen Google Map
2. Filter panel (left sidebar, collapsible on mobile)
3. Listing cards in popup on pin click
4. Legend (price ranges, types)
5. Zoom to location button

**Responsive:**

- Mobile: Map full-width, filter drawer bottom
- Desktop: Map 80%, filter sidebar 20%

---

## AUTH PAGES (Sign In Required)

### Pages 5-7: Authentication

**Page 5: Sign Up (/signup)**

- Email input (auto-validate)
- OTP verification (6-digit code)
- Password set (strength meter)
- Persona selection (Buyer / Agent / Seller)
- Social OAuth buttons (Google, Apple, Facebook)
- Link to Sign In

**Page 6: Sign In (/login)**

- Email input
- Password input
- Forgot Password link
- Social OAuth buttons
- Link to Sign Up

**Page 7: Reset Password (/reset-password)**

- Email input
- OTP verification
- New password set
- Return to Sign In link

---

### Pages 8-14: Buyer Dashboard (Private)

**Page 8: Dashboard Overview (/dashboard)**

**Modules:**

1. Quick Stats (3 cards)
    - Saved: 5
    - Offers: 2 (1 pending, 1 countered)
    - Viewings: 1 (scheduled Saturday)

2. Recent Activity
    - "Viewed Green Street Condo — 3 hours ago"
    - "Price dropped on saved listing"
    - Timeline-style list (5 items)

3. Upcoming Viewings
    - Card layout, 2-3 next viewings
    - Date, time, address, agent
    - Reschedule / Cancel buttons

4. New Alerts
    - Price alerts triggered
    - New listings matching criteria

5. Quick Links
    - Browse Properties
    - Manage Offers
    - View All Viewings
    - Messages

**Page 9: Saved Listings (/dashboard/saved)**

**Modules:**

1. Filter Bar
    - Sort (Newest, Price Low-High, Recently Viewed)
    - View (Grid / List)

2. Saved Listings Grid
    - Same card style as search results
    - Remove save button (X)
    - "View offer" if offer made on this listing

3. Empty State
    - "No saved listings yet. Start exploring!"

**Page 10: My Offers (/dashboard/offers)**

**Modules:**

1. Offer Status Filter
    - All / Submitted / Countered / Accepted / Rejected

2. Offers Table/Cards
    - Listing address
    - Your offer amount
    - Current status (Submitted, Countered at $X)
    - Last activity date
    - Actions (View Details, Withdraw, Counter)

3. Offer Detail (Modal/Page)
    - Offer timeline (created → countered → ...)
    - Current offer vs. counter
    - Message thread with agent/seller
    - Accept / Counter / Withdraw buttons

**Page 11: Viewings (/dashboard/viewings)**

**Modules:**

1. Calendar (Month view)
    - Scheduled viewings highlighted
    - Click → detail modal

2. Upcoming List
    - Card per viewing
    - Date, time, address, agent, status
    - Reschedule / Cancel buttons
    - Send message to agent link

3. Past Viewings
    - Expandable list
    - Survey results if submitted

**Page 12: Messages (/dashboard/messages)**

**Modules:**

1. Conversations List (Sidebar on desktop)
    - One row per conversation
    - Agent name, last message preview, timestamp
    - Unread indicator
    - Search/filter

2. Message Thread (Main area)
    - All messages with timestamp, sender
    - Typing indicator
    - Message input field
    - Attach file option
    - Send button

**Page 13: Alerts (/dashboard/alerts)**

**Modules:**

1. Alert Settings
    - Price drops in saved listings (threshold)
    - New listings matching criteria
    - Offer responses
    - Viewing confirmations
    - Email / SMS / In-app toggle per alert type

2. Alert History
    - Recent alerts fired
    - Mark as read

**Page 14: Settings (/dashboard/settings)**

**Modules:**

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

---

### Pages 15-27: Agent & Admin Dashboards

**Pages 15-19: Agent Dashboard**

**Page 15: Agent Dashboard (/agent/dashboard)**

- Pipeline overview (# of listings, # of leads, # of offers, $ volume)
- Top performers (comps, recent sales)
- Upcoming showings
- Recent leads
- Quick links

**Page 16: Listings (/agent/listings)**

- Table: All listings with status, views, saves, offers
- Bulk actions: Publish, Draft, Delete, Renew
- Upload new listing button
- Filter: Active, Sold, Draft, Expired

**Page 17: Leads (/agent/leads)**

- Inquiries (buyers interested in listings)
- Status: New, Contacted, Qualified, Lost
- Scoring (hot, warm, cold)
- Message / Call buttons

**Page 18: Pipeline (/agent/pipeline)**

- CRM-style view: Leads → Offers → Pending → Closed
- Drag-drop to update status
- Notes per deal
- Timeline to close

**Page 19: Calendar (/agent/calendar)**

- Month/week view
- Showings, follow-ups, closings
- Create event button
- Sync to Google Calendar

**Pages 20-27: Admin Dashboard**

All admin routes render inside the Admin Console Shell (Section 56): fixed sidebar
(brand "Admin / Console", six labelled groups — Overview, Marketplace, Finance,
Insights, Trust & Safety, System), topbar with breadcrumb and user menu, scrollable
main column. Every page opens with a Page Header carrying title, live-count
description and right-aligned actions.

---

### Page 20: Admin Overview (/admin)

**Purpose:** Surface platform health, volume, revenue and outstanding moderation work in one screen

**User Goal:** See what needs attention within seconds of landing

**Modules:**

1. Page Header
    - Title: "Admin Dashboard"
    - Description: "System health, volume, revenue, and content moderation"

2. Volume Metrics (4-column stat grid)
    - Total Users — 1,247, +6.2%, "1,102 active this month" → /admin/users
    - Active Listings — 342, +18%, "12 awaiting review" → /admin/listings
    - Transactions (30d) — 128, +9.4%, "41 in escrow" → /admin/transactions
    - GMV (30d) — $312M, +22%, "$7.8M commissions" → /admin/reports (featured)
    - Each card: icon, trend chip, caption, 6-point sparkline

3. Revenue Panel (main column)
    - Column chart, GMV by month (rolling 6 months), values in $M
    - Action button: "Payments" → /admin/payments

4. System Alerts Panel (main column)
    - Count badge in panel header
    - Rows: title, description, relative time, tone (info / warning / error)
    - Examples: tier-verification request, flagged listing image, large transaction pending escrow

5. Revenue Breakdown Panel (sidebar)
    - Headline metric: Commissions (YTD) $21.2M
    - Supporting: GMV (YTD), platform take rate, avg commission per deal

6. Moderation Queue Panel (sidebar)
    - Pending verifications (warning) → /admin/verifications
    - Listings awaiting review (warning) → /admin/listings
    - Flagged content (error) → /admin/listings

7. Quick Actions Panel (sidebar)
    - Manage Users · Review Listings · Process Verifications · View Reports

8. System Health Panel (sidebar)
    - Description: "Uptime 99.92% · Error rate 0.09% (24h)"
    - Rows: Database, API Gateway, File Storage — uptime, error rate, operational/degraded dot

**Responsive:**

- Mobile: 1 column throughout, stat grid stacks, sidebar panels follow main column
- Tablet: stat grid 2 columns
- Desktop: stat grid 4 columns; 3-column layout with main column at 2/3 and panel rail at 1/3

**States:**

- Loading: Skeleton per stat card and per panel body
- Degraded: Any non-operational system shows a warning dot and tints its health row
- Empty queue: "Nothing awaiting review"
- Error: Panel-level message with retry; other panels keep rendering

---

### Page 21: Listings Moderation (/admin/listings)

**Purpose:** Clear the queue of submitted and flagged listings

**User Goal:** Approve, reject or return each listing with a documented reason

**Modules:**

1. Page Header
    - Title: "Listings Moderation"
    - Description: live counts — "N pending · N flagged · N approved · N rejected"
    - Action: Export

2. Filter Pills
    - All / Pending / Flagged / Approved / Rejected, each with a count
    - Changing filter clears selection and closes any open detail panel

3. Moderation Table (Section 63)
    - Columns: Listing (cover photo + address), Price, Agent, Submitted, Compliance, Status, Actions
    - Footer row: queue size, total value, open compliance checks
    - Sortable; default sort by status; selectable; paginated
    - Flagged and rejected rows carry a tinted background

4. Listing Detail Panel (row reveal, large)
    - Photo set, full description, flag reason, compliance checklist, agent contact
    - Footer actions: Approve · Request Changes · Reject (Approve hidden when already approved, Reject hidden when already rejected)

5. Bulk Action Bar (on selection)
    - Approve · Request Changes · Reject applied to every selected row

6. Decision Modal (Section 64)
    - Triggered by Reject or Request Changes, single or bulk
    - Note field is required — submit stays disabled until it is non-empty
    - Reject → status rejected with note; Request Changes → status returns to pending, flagged as changes requested

**Responsive:**

- Mobile: Table scrolls horizontally inside its own container; detail opens full-screen
- Desktop: Full table with side panel reveal

**States:**

- Empty (filtered): "No listings match this filter right now"
- Approved: Row leaves pending counts, selection clears
- Blocked: Decision modal cannot submit without a note

---

### Page 22: User Management (/admin/users)

**Purpose:** Manage every account on the platform

**User Goal:** Find a user, review standing, suspend or reinstate

**Modules:**

1. Page Header
    - Title: "User Management"
    - Description: "N active users · N total"
    - Actions: Filter · Add User

2. User Table (Section 65)
    - Columns: User (avatar, name, email), Role (Buyer / Agent / Admin, colour-coded), Tier (Standard / Premium / Platinum), Joined, Deals (right-aligned), Status, Actions
    - Sort by any column; default sort by user name ascending
    - Suspended rows carry an error-tinted background
    - Selectable with pagination

3. Row Actions
    - Per-row suspend / reactivate control

4. Bulk Action Bar (on selection)
    - Reactivate · Suspend across selected rows

**Responsive:**

- Mobile: Horizontal scroll within table container; identity column stays legible
- Desktop: Full table

**States:**

- Empty: "No users to show"
- Suspended: Status badge turns error, row tints, action flips to Reactivate
- Optimistic: Status change applies immediately to the table and the header count

---

### Page 23: Transactions (/admin/transactions)

**Purpose:** Track deal flow, escrow and commission across the marketplace

**User Goal:** Understand volume and inspect any single deal

**Modules:**

1. Page Header
    - Title: "Transactions"
    - Description: "Deal flow, escrow, and commission across the marketplace"
    - Actions: Filter · Export

2. Summary Stats (4-column grid)
    - Total Volume (featured, spans 2 columns) — sum of sale prices, caption "N transactions"
    - Commission — volume × platform rate, caption "platform revenue"
    - Completed — completed count of total deals

3. Transaction Table (Section 66)
    - Columns: Property (address, buyer, agent), Sale Price, Commission (accent chip), Initiated, Status, Actions
    - Footer row totals sale price and commission
    - Status: Pending / Escrow / Completed, each tinting the initiated date

**Responsive:**

- Mobile: Stats stack; table scrolls horizontally
- Tablet+: Stats in 4 columns, full table

**States:**

- Loading: Skeleton stats and table rows
- Empty: Zeroed stats plus table empty message
- Escrow: Row flagged distinctly from completed deals

---

### Page 24: Payments & Revenue (/admin/payments)

**Purpose:** Monitor platform earnings and release agent payouts

**User Goal:** Confirm revenue is tracking and clear outstanding payouts

**Modules:**

1. Page Header
    - Title: "Payment & Revenue"
    - Description: "Commissions, platform fees, and payouts"
    - Action: Export

2. Revenue Stats (4-column grid)
    - Revenue YTD (featured) — value, trend, "vs last year"
    - Monthly Avg — value, trend, "6-month trend"
    - Commission — value, share of total
    - Outstanding — value, "N pending transactions"

3. Monthly Revenue Panel
    - Grouped column chart: Commission vs Platform Fees by month, values in $K

4. Revenue Breakdown Panel
    - Donut chart splitting commission and platform fees, centre total + "YTD"

5. Payment Processing Panel
    - Action: Process
    - Warning callout for pending payouts with amount
    - Summary row: average processing time

**Responsive:**

- Mobile: 1 column; charts full width
- Tablet: Stats 2 columns
- Desktop: Stats 4 columns; breakdown and processing panels side by side

**States:**

- Pending payouts: Warning callout present; hidden when nothing is outstanding
- Loading: Chart skeletons preserve panel height
- Error: Chart panel falls back to last known figures with a retry action

---

### Page 25: Analytics & Reports (/admin/reports)

**Purpose:** Report platform performance and market position

**User Goal:** Read growth, then export or build a custom report

**Modules:**

1. Page Header
    - Title: "Analytics & Reports"
    - Description: "Platform performance and market insights"
    - Actions: Download · Generate Custom

2. Headline Stats (4-column grid)
    - GMV (YTD) (featured) — trend vs prior year
    - Active Listings — trend month over month
    - User Growth — percentage, caption with active user count
    - Avg Transaction — value, trend vs market

3. Market by Region Panel
    - Horizontal bar chart ranked by transaction volume, values in $M
    - Top region highlighted in a distinct tone

4. User Breakdown Panel
    - Donut: Buyers / Agents / Admins, centre total users

5. Tier Distribution Panel
    - Donut: Standard / Premium / Platinum, centre total users

**Responsive:**

- Mobile: 1 column; bar labels truncate before the bar shrinks
- Tablet: Stats 2 columns
- Desktop: Stats 4 columns; the two donut panels sit side by side

**States:**

- Loading: Skeleton stat cards and chart placeholders
- Empty region set: Panel shows empty state instead of an axis with no bars

---

### Page 26: Tier Verifications (/admin/verifications)

**Purpose:** Process identity and tier-upgrade requests

**User Goal:** Approve, reject or re-open a verification with its documents in view

**Modules:**

1. Page Header
    - Title: "Tier Verifications"
    - Description: "N pending · N approved"
    - Action: Export Report

2. Verification List (Section 67)
    - One card per request: name, email, current tier → requested tier, submitted date, document count
    - Status badge: Pending (warning) / Approved (success) / Rejected (error)
    - Tier rendered in its tier colour

3. Status-Dependent Actions
    - Pending: Approve · Review Docs · Reject
    - Approved: View Details · Revoke
    - Rejected: View Reason · Allow Resubmit

**Responsive:**

- Mobile: Cards stack full width; actions wrap below the identity block
- Desktop: Card row with actions right-aligned

**States:**

- Empty: "No verification requests"
- Pending: Sidebar badge count matches the pending total on this page
- Decision: Card moves to its new status and the header counts update

---

### Page 27: System Settings (/admin/settings)

**Purpose:** Configure platform identity, marketplace rules and moderation policy

**User Goal:** Change a value and save it with confidence

**Modules:**

1. Page Header
    - Title: "System Settings"
    - Description: "Platform configuration, marketplace rules, and moderation policy"
    - Actions: Reset · Save Changes (label becomes "Saved" after a successful submit)

2. Save Confirmation Callout
    - Success variant, shown only after save
    - "New values apply to listings and payouts created from now on."

3. Platform Config Panel (Section 68)
    - Platform Name, Support Email, Base Currency, Reporting Timezone

4. Marketplace Rules Panel (Section 68)
    - Commission Rate (%), Listing Fee ($), Listing Expiry (days), Max Photos Per Listing, Auto-Approve Below ($), Escrow Hold (days)

5. Moderation Policy Toggles (Section 69)
    - Automatic Photo Scanning · Require Agent License Verification · Manual Review Above Threshold · Auto-Suspend On Repeat Rejections

6. Operations Toggles (Section 69)
    - Maintenance Mode · New Signups · Daily Health Digest · Payout Automation

7. Maintenance Panel (Section 70)
    - Destructive and operational actions, separated from ordinary configuration

**Responsive:**

- Mobile: Fields stack single column
- Desktop: Content capped at a readable measure; fields in a two-column grid

**States:**

- Dirty: Any edit clears the saved flag and restores the "Save Changes" label
- Saved: Success callout appears and the primary button reads "Saved"
- Reset: All fields return to their stored values and the saved flag clears

---

**Phase 4 Complete. All 27 pages specified with modules, responsive behavior, states, and interactions.**

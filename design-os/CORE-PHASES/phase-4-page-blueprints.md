# Phase 4: Page Blueprints

**Real Estate Platform Design Operating System** - 21 pages with detailed specifications

---

## Overview

Complete page specifications covering:

- Page purpose and user goals
- Content modules and data
- Responsive behavior (mobile/tablet/desktop)
- States (loading, empty, error, success)
- Key interactions and flows

**Total Pages:** 21

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

### Pages 15-21: Agent & Admin Dashboards

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

**Pages 20-21: Admin Dashboard**

**Page 20: Admin Overview (/admin)**

- System health (uptime, error rate)
- Volume metrics (listings, users, transactions)
- Revenue (GMV, commissions)
- Alerts (pending moderation, payments issues)

**Page 21: Listings Moderation (/admin/listings)**

- Queue of flagged listings
- Photo review, description check, compliance
- Approve / Reject / Request Changes
- Bulk actions
- Filter: Pending, Approved, Rejected

---

**Phase 4 Complete. All 21 pages specified with modules, responsive behavior, states, and interactions.**

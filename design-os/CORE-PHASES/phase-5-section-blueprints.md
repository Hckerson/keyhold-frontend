# Phase 5: Section Blueprints

**Keyhold Design Operating System** · Phase 5 of 9 · Version 2.0 · 29 September 2026

Every page in [Phase 4](phase-4-page-blueprints.md) broken into sections by the job each one does. Next: [Phase 6 — Interaction Contracts](phase-6-interaction-contracts.md).

Sections describe content and behaviour only — never layout, order on screen, sizing, imagery, animation or wireframes. Section numbers are stable identifiers: RATIFIED_DIVERGENCES and Phase 4 cite them. Build status lives in [Phase 8](phase-8-implementation-roadmap.md#sections).

---

## Contents

1. [Section Defaults](#section-defaults)
2. [Hero Sections (1–5)](#hero-sections-5)
3. [Listing Sections (6–15)](#listing-sections-10)
4. [Offer Sections (16–21)](#offer-sections-6)
5. [Messaging Sections (22–29)](#messaging-sections-8)
6. [Form Sections (30–39)](#form-sections-10)
7. [Dashboard & Data Sections (40–46)](#dashboard--data-sections-7)
8. [Navigation Sections (47–49)](#navigation-sections-3)
9. [State & Feedback Sections (50–52)](#state--feedback-sections-3)
10. [Error Sections (53–55)](#error-sections-3)
11. [Admin Sections (56–70)](#admin-sections-15)
12. [Regeneration Notes](#regeneration-notes)

---

## Section Defaults

Every section inherits these unless its entry overrides them. They satisfy the master prompt's per-section loading, error, empty, accessibility and technical fields without restating them seventy times.

| Field                     | Default                                                                                                                                                                   |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Loading**               | A placeholder that preserves the section's structure so nothing shifts when data arrives; the container is marked busy for assistive technology.                          |
| **Error**                 | A section-level message naming what failed, with a retry. Other sections keep rendering. Never fall back to fabricated data (BR15).                                      |
| **Empty**                 | Say what is missing and offer the next useful action (Phase 3 › Empty States).                                                                                           |
| **Accessibility**         | WCAG 2.2 AA; every control keyboard operable with a visible focus indicator; status never conveyed by colour alone; icons that carry meaning have an accessible name.     |
| **Device needs**          | Every task achievable on every supported device; touch users get equivalents for anything offered on hover. Portal sections are desktop-first (ratified, Principle 5). |
| **Data requirements**     | Read through a hook over the API client (Phase 7); portal sections receive rows as props from their route's console and never fetch.                                    |
| **Technical notes**       | Mutation feedback is global by default ([ADR 0013](../../docs/adr/0013-mutation-feedback-is-global-by-default.md)); writes send once and confirmations lock (BR10).     |

---

## HERO SECTIONS (5)

### Section 1: Hero Search

**Purpose:** Start a search from the first screen. · **Used on:** Home, potentially dashboard

**Content Model:**

- Headline: "Find Your Next Home"
- Subheadline: "Search 10k+ properties"
- Search input (location + price range)
- CTA buttons (Search, Sign Up)

**Interactions:**

- Input autocomplete on location
- Price range selectable
- Enter key triggers search
- Click Search → navigate to /search with the criteria in the URL

**Device needs:** Search usable one-handed on a phone.

> **Ratified divergence (Page 1 module 1).** The shipped headline is "Find the home that finds you."; neighbourhood shortcuts are ranked by live listing count; the subheadline figure is not shown until it is true (BR15).

---

### Section 2: Featured Carousel

**Purpose:** Show promoted and popular inventory. · **Used on:** Home, dashboard

**Content Model:**

- 6-12 property cards
- Image, price, address, beds/baths
- Agent name + photo
- "New" or "Hot" badge

**Interactions:**

- Click → navigate to listing detail
- Save → save listing

**Device needs:** Touch users can move through the set by swiping.

> **Ratified divergence (Page 1 module 2).** One premier listing, then six. Promoted listings fill first and are labelled "Featured"; the rest are labelled "Most viewed" (BR15).

---

### Section 3: Trust Signals

**Purpose:** Earn trust with verifiable facts. · **Used on:** Home, sign up page

**Content Model:**

- Stat: "10k+ buyers"
- Stat: "$500M+ transactions"
- Review: "5 stars - Great experience"
- Badge: "Verified platform"

**Interactions:**

- Click stat → details
- Testimonial → link to full review

**States:** Hide the stats when fewer than two are non-zero.

> **Ratified divergence (Page 1 module 4 · Section 3).** Live counts only (homes on the market, homes sold, neighbourhoods); no testimonials until reviewers consent. Trust is carried by the guarantees.

---

### Section 4: How It Works

**Purpose:** Explain what the platform does for a buyer. · **Used on:** Home, sign up page

**Content Model:**

- 4 steps: Search, View, Offer, Close
- Each step: headline + description

**Interactions:**

- Expand a step's description

> **Ratified divergence (Page 1 · How It Works; Page 1 module 3).** Retold as a narrative of shipping features: saved search, saved shortlist, bridged viewings, escrow and the four deal milestones.

---

### Section 5: CTA Banner

**Purpose:** Convert an engaged visitor. · **Used on:** Home, bottom of many pages

**Content Model:**

- Headline: "Ready to get started?"
- Subheadline: "Join 10k+ buyers today"
- CTA buttons: Sign Up, Learn More

**Interactions:**

- Button → navigate or open sign-up

---

## LISTING SECTIONS (10)

### Section 6: Listing Gallery

**Purpose:** Let the buyer see the property. · **Used on:** Listing detail

**Content Model:**

- Array of images (10-30)
- Captions (optional)
- Photographer credit (optional)

**Interactions:**

- Next/prev
- Choose a specific image
- Full-screen view
- Keyboard arrows (← →) to navigate

**Device needs:** Swipe on touch.

**Accessibility:** Each image has meaningful alternative text; position announced ("3 of 18"); full-screen view traps focus and closes on Escape.

---

### Section 7: Listing Price Bar

**Purpose:** Keep price, status and the main actions available while reading. · **Used on:** Listing detail

**Content Model:**

- Price
- Status
- Address
- Save
- Share
- Message agent

**Interactions:**

- Save toggle → save/unsave
- Share → copy link / system share
- Message → agent contact or chat
- Status → explanation on demand

**Device needs:** Remains reachable while the buyer reads the rest of the page.

---

### Section 8: Listing Key Facts

**Purpose:** The facts buyers filter and compare on. · **Used on:** Listing detail, search card

**Content Model:**

- Beds, Baths, Sq Ft, Lot Size, Year Built
- Optional: Garage, Basement, Pool

**Interactions:**

- Each fact explains itself on demand (touch and keyboard included)

---

### Section 9: Listing Description

**Purpose:** The seller's account of the property. · **Used on:** Listing detail

**Content Model:**

- Full text description
- Highlights (renovations, features)
- Optional: Video tour link

**Interactions:**

- Read More expands long text
- Video link → embedded player

---

### Section 10: Neighborhood Map

**Purpose:** Where the property is and what is nearby. · **Used on:** Listing detail

**Content Model:**

- Map centred on the address
- Places: Schools, Transit, Parks, Restaurants
- Key with counts per kind
- Walkability score

**Data requirements:** Listing coordinates; `GET /properties/:id/nearby` (Overpass, 1.5 km, cached 24 h per ~100 m cell; failures cached 5 min).

**Interactions:**

- Pan/zoom map
- Choose a place → its details
- Toggle each place kind on and off (the toggle doubles as the key and count)

**States:** No coordinates or no mapped places → no places shown, never invented (BR15). Map fails → text neighbourhood facts. Fetches only when opened.

---

### Section 11: Comparables

**Purpose:** Price context. · **Used on:** Listing detail

**Content Model:**

- 3-5 recent sales nearby
- Each: image, price, date sold, address, beds/baths

**Interactions:**

- Open a comparable (if still available)
- Sort by price/date

> **Deferred (Buyer JTBD 1).** Comparables today are active listings in the same locality; sold comparables need a sold-price history.

---

### Section 12: Agent Card

**Purpose:** Who is selling and how to reach them. · **Used on:** Listing detail

**Content Model:**

- Photo
- Name, license #
- Agency name
- Rating (5.0 / 5)
- Review count ("48 reviews")
- Response time ("Usually replies in 2 hours")
- Recent listings count
- Call, Message

**Interactions:**

- Photo → full profile
- Call → through the platform (BR9)
- Message → open chat
- "View all listings" → the agent's listings

---

### Section 13: Listing Card (Search Results)

**Purpose:** One listing, enough to decide whether to open it. · **Used on:** Search results, saved listings, featured sections

**Content Model:**

- Image
- Price
- Address
- Beds/Baths/Sq Ft
- Agent name + avatar
- Labels: "New", "Hot", "Price Reduced", "Featured"
- Save state

**Interactions:**

- Open → listing detail
- Save/unsave
- Secondary actions (save, share, report) available on touch as well as pointer

---

### Section 14: Listing Status Timeline

**Purpose:** The history of a listing's deal. · **Used on:** Offer detail, CRM

**Content Model:**

- Timeline of listing events
- Date listed, first offer, offer accepted, inspection, appraisal, closed
- Each event: date, status, notes

**Interactions:**

- Open an event's detail
- Estimated close date shown

---

### Section 15: Listing Moderation Queue

**Purpose:** Decide a flagged or submitted listing. · **Used on:** Admin listings (extended by Section 63)

**Content Model:**

- Flagged listing
- Photos, description, location
- Reason for flag
- Agent name, contact

**Interactions:**

- Approve → move to approved
- Reject → reason required (BR4)
- Request Changes → send feedback to agent

---

## OFFER SECTIONS (6)

The earlier run headed this group "(10)" but specified six sections (16–21). The count is corrected; no section was removed.

### Section 16: Offer Form

**Purpose:** Capture a structured offer. · **Used on:** Make offer dialog/page

**Content Model:**

- Listing address (read-only)
- Offer amount (input, validation)
- Move-in date
- Contingencies: Inspection, Appraisal, Financing
- Earnest money amount (optional)
- Additional notes
- Review summary (before submit)

**Interactions:**

- Amount formats as currency
- Contingencies toggle requirements
- Submit → review summary → confirm submit
- Cancel → dismiss

**Validation:** Amount required and positive; move-in date not in the past; earnest money non-negative.

> **Closed 8 Sept.** Contingencies are values, not prose; the review is a second step inside the same dialog.

---

### Section 17: Offer Status Card

**Purpose:** Where one offer stands. · **Used on:** My offers, agent pipeline

**Content Model:**

- Listing address
- Your offer amount
- Current status (Submitted / Countered / Accepted / Rejected)
- Last activity (date)
- Next step hint

**Interactions:**

- Open → full offer detail
- Status → explanation on demand

---

### Section 18: Offer Timeline

**Purpose:** Every round of the negotiation. · **Used on:** Offer detail

**Content Model:**

- Chronology of all offers/counters
- Date, time, amount, status for each
- Message history interleaved

**Interactions:**

- Open an offer → full details
- Timestamp available for each message

---

### Section 19: Counter Offer Form

**Purpose:** Respond to a counter with a new number. · **Used on:** Offer detail (when offer countered)

**Content Model:**

- Your original offer amount
- Seller's counter amount
- Your new counter amount (input)
- Message to seller

**Interactions:**

- Counter amount formats as currency
- Submit → confirmation

---

### Section 20: Offer Comparison

**Purpose:** What changed between two positions. · **Used on:** Offer detail

**Content Model:**

- Your offer
- Current counter
- Compared: Amount, Contingencies, Earnest money, Move-in date, Conditions

**Interactions:**

- Each compared term pairs both values
- Expand a term's detail

---

### Section 21: Inspection/Appraisal Tracker

**Purpose:** Post-acceptance steps to closing. · **Used on:** Offer detail (post-accepted), agent deal detail

**Content Model:**

- Inspection date (scheduled, completed, report)
- Appraisal date (scheduled, completed, value)
- Financing contingency (deadline, status)
- Closing date (scheduled, confirmed)

**Interactions:**

- Open an item → upload document or change date
- Document → view/download in-app

**Business rules:** BR7 — four milestones seeded at acceptance; untaken contingencies `WAIVED`; overdue derived.

---

## MESSAGING SECTIONS (8)

### Section 22: Message Thread

**Purpose:** The conversation. · **Used on:** Messages page, offer detail chat

**Content Model:**

- Array of messages
- Timestamp, sender, content
- Typing indicator (if agent typing)

**Interactions:**

- Load older messages
- Typing indicator → "Agent is typing..."
- Sender name → profile
- Report a received message (Journey 18)

**Accessibility:** Sender distinguishable in text, not by position alone; new messages announced politely.

---

### Section 23: Message Input

**Purpose:** Compose and send. · **Used on:** Messages page, chat sections

**Content Model:**

- Text input field
- Attach (files, photos)
- Send

**Interactions:**

- Input grows up to 4 lines
- Attach → file picker (Section 38 limits)
- Send (Enter key or button) → submit message
- Typing indicator → update thread

---

### Section 24: Message Notification

**Purpose:** One conversation in a list. · **Used on:** Messages list

**Content Model:**

- Sender name + avatar
- Last message preview (truncated)
- Timestamp
- Unread indicator

**Interactions:**

- Open → thread
- Unread cleared on view
- Mark as read / delete / snooze (available on touch)

---

### Section 25: Document Share

**Purpose:** Documents exchanged in a deal. · **Used on:** Messaging, offer detail

**Content Model:**

- Document preview
- Filename
- Uploaded by, date
- Download
- Share

**Interactions:**

- Open → full viewer
- Download → local file
- Share → copy link or send message

---

### Sections 26–29: Additional Messaging Sections

Version 1 named these as one line: "Typing Indicator, Thread Header, Conversation List Sidebar, etc." They are split here with a note, per Scope Preservation.

- **Section 26: Typing Indicator** — shows that the other party is composing; announced politely. _(Real-time dependency deferred — see Phase 8.)_
- **Section 27: Thread Header** — who the conversation is with, the property it concerns, and thread-level actions.
- **Section 28: Conversation List** — every conversation, searchable and filterable, unread first.
- **Section 29: Unnamed ("etc.")** — reserved; version 1 did not specify it. Owner to name or confirm as the thread context (property and agent) panel.

---

## FORM SECTIONS (10)

### Section 30: Input Field

**Purpose:** One labelled value. · **Used on:** All forms

**Content Model:**

- Label (required indicator if needed)
- Placeholder text
- Help text (optional)
- Error message (if validation fails)

**Interactions:**

- Type → validate in real-time
- Blur → show error if invalid
- Error state → error message associated with the field

---

### Section 31: Checkbox Group

**Purpose:** Several independent choices. · **Used on:** Offer form, filter panel

**Content Model:**

- Label
- Array of checkbox items
- Help text per item

**Interactions:**

- Click → toggle checkbox
- Keyboard: Space to toggle

---

### Section 32: Radio Button Group

**Purpose:** One choice from a set. · **Used on:** Filters, forms (single selection)

**Content Model:**

- Label
- Array of radio options

**Interactions:**

- Select one (previous deselected)
- Arrow keys move within the group

---

### Section 33: Dropdown/Select

**Purpose:** One choice from a long set. · **Used on:** Forms, filters

**Content Model:**

- Label
- Placeholder
- Array of options
- Optional search

**Interactions:**

- Open → options
- Type → filter options
- Arrow keys → navigate
- Enter → select
- Escape → close

---

### Section 34: Date Picker

**Purpose:** Choose a date. · **Used on:** Viewing scheduling, offer form

**Content Model:**

- Label
- Calendar
- Month/year controls
- Disabled dates (past, unavailable)

**Interactions:**

- Open → calendar
- Choose date → select (close calendar)
- Next/prev month → navigate
- Type date directly → parse input

---

### Section 35: Price Slider

**Purpose:** Narrow by price. · **Used on:** Filter panel

**Content Model:**

- Label
- Min/max values
- Current range selected
- Step size ($5k, $10k, etc.)

**Interactions:**

- Adjust range
- Type numbers → update range
- Reset → default range

> **Ratified divergence (Page 2 module 5 · Section 35).** Discrete price-band chips with live facet counts replace the slider.

---

### Section 36: Toggle/Switch

**Purpose:** An on/off setting that applies immediately. · **Used on:** Settings, notification preferences

**Content Model:**

- Label
- On/off state
- Help text

**Interactions:**

- Toggle or label → switch state
- Keyboard: Space to toggle

---

### Section 37: Search Input (Autocomplete)

**Purpose:** Free text with suggestions. · **Used on:** Location search, listing search

**Content Model:**

- Placeholder
- Debounced suggestions (300ms)
- Recent searches (if applicable)

**Interactions:**

- Type → show suggestions
- Choose suggestion → fill input / submit
- Keyboard: Arrow up/down navigate, Enter select, Escape close

---

### Section 38: File Upload

**Purpose:** Add files. · **Used on:** Messages, listing media, identity verification, avatar, admin uploads

**Content Model:**

- Drop zone
- "Choose file" button
- File type restrictions
- File size limit

**Interactions:**

- Drag file over → drop target indicated
- Drop → upload
- Choose → file picker
- Upload progress shown

**Validation:** Reject wrong type or oversize before upload, naming the limit.

---

### Section 39: Multi-Step Form

**Purpose:** A long task in validated steps. · **Used on:** Sign up, listing submission, complex workflows

**Content Model:**

- Step indicator (1/3, 2/3, 3/3)
- Form fields for current step
- Validation per step
- Next, Back, Submit

**Interactions:**

- Next → validate current step, advance if valid
- Back → return to previous step
- Submit → validate all steps, submit if valid
- Jump to an already completed step

---

## DASHBOARD & DATA SECTIONS (7)

### Section 40: Stat Card

**Purpose:** One headline figure. · **Used on:** Dashboards

**Content Model:**

- Label (e.g., "Saved Listings")
- Value (e.g., "5")
- Trend (up/down with %)
- Optional small trend series

**Interactions:**

- Open → detail page
- Description on demand

---

### Section 41: Data Table

**Purpose:** Many records, comparable by column. · **Used on:** Offers, listings, admin, agent dashboard

**Content Model:**

- Column headers (sortable)
- Data rows
- Pagination or infinite scroll
- Bulk selection (optional)

**Interactions:**

- Header → sort (ascending/descending)
- Row → detail or navigate
- Select for bulk action
- Bulk action → apply to selected

**Device needs:** On narrow screens every column's information stays reachable.

**Accessibility:** Caption describing the columns; sort state announced.

---

### Section 42: Pipeline Card (CRM-style)

**Purpose:** One deal in the agent's pipeline. · **Used on:** Agent pipeline

**Content Model:**

- Listing address
- Buyer/offer amount
- Status
- Days in stage
- Last activity
- Notes snippet

**Interactions:**

- Drag → change status (column)
- Open → detail
- Notes → expand

**Accessibility:** Every drag outcome also available from the detail without a pointer.

> **Closed 8 Sept · Section 42 drag semantics.** A drop is a request to advance, resolved against what the agent can do (BR6).

---

### Section 43: Activity Feed

**Purpose:** What happened recently. · **Used on:** Dashboard, offer detail

**Content Model:**

- Array of events (viewed, saved, offer made, offer countered, etc.)
- Timestamp, kind, description

**Interactions:**

- Open event → detail or navigate

**Ordering:** Newest first.

---

### Section 44: Quick Stats Widget

**Purpose:** A role's few key numbers. · **Used on:** Dashboard, admin overview

**Content Model:**

- 3-4 key metrics (number + trend)

**Interactions:**

- Open a metric → detail

---

### Section 45: Calendar Widget

**Purpose:** Events by date. · **Used on:** Viewing calendar, agent calendar

**Content Model:**

- Month view
- Events on dates
- Event count per day

**Interactions:**

- Choose date → events for that day
- Open event → detail
- Next/prev month → navigate

---

### Section 46: Chart/Graph

**Purpose:** A trend or distribution. · **Used on:** Agent analytics, admin reports

**Content Model:**

- A series over time, a ranking or a share (varies by metric)
- Data points, legend
- Value on demand

**Interactions:**

- Point → value
- Legend → toggle series
- Tap on touch → data point details

**Accessibility:** Text summary or table alternative; series distinguishable without colour.

---

## NAVIGATION SECTIONS (3)

Version 1 headed these "LAYOUT SECTIONS". Renamed because the sections describe navigation content, not layout.

### Section 47: Header

**Purpose:** Global navigation. · **Used on:** All pages

**Content Model:**

- Brand (→ home)
- Nav links (search, saved, messages, etc. for logged-in)
- User menu (profile, settings, logout)
- Navigation reachable on small screens

---

### Section 48: Footer

**Purpose:** Site-wide links. · **Used on:** All pages (public pages)

**Content Model:**

- Links: About, Help, Blog, Privacy, Terms
- Social media links
- Newsletter signup
- Copyright

> **Ratified divergences (Section 48).** The linked pages are now written (Pages 28–34). Social links removed until accounts exist. Newsletter signup is back on a double opt-in list (BR14; correction 26 Sept).

---

### Section 49: Sidebar Navigation

**Purpose:** Portal navigation. · **Used on:** Dashboard, agent, admin

**Content Model:**

- Brand
- Menu items (Dashboard, Saved, Offers, etc.)
- Current location indicated
- Collapse/expand

**Accessibility:** Current page marked `aria-current`.

---

## STATE & FEEDBACK SECTIONS (3)

### Section 50: Toast Notification

**Purpose:** Confirm an outcome that is not otherwise visible. · **Used on:** Everywhere (save, send, error, etc.)

**Content Model:**

- Message
- Kind (success, error, info, warning)
- Close (optional)
- Auto-dismiss (5s)

**Interactions:**

- Close → dismiss
- Auto-dismiss after 5s
- Multiple notifications queue

**Rules:** An error you can retry in context is reported next to its control, not as a toast; success is toasted only when not already visible ([ADR 0013](../../docs/adr/0013-mutation-feedback-is-global-by-default.md)).

---

### Section 51: Modal/Dialog

**Purpose:** A focused task or confirmation. · **Used on:** Confirm actions, forms, details

**Content Model:**

- Title
- Content (text, form, image, etc.)
- Actions (OK, Cancel, Delete, etc.)
- Close

**Interactions:**

- Action → act or close
- Close → close
- Outside interaction (if dismissible) → close
- Keyboard: Escape closes
- Locked while its request is in flight (BR10)

---

### Section 52: Empty State

**Purpose:** Explain an absence. · **Used on:** No results, no data

**Content Model:**

- Headline
- Description
- Next action

**Interactions:**

- Action → search, create, etc.

---

## ERROR SECTIONS (3)

Version 1 headed these "ERROR PAGES"; they are sections used by Pages 45–46.

### Section 53: 404 Not Found

**Used on:** Invalid routes (Page 45)

**Content Model:**

- "404"
- "Page not found" headline
- Helpful description
- Home, back

---

### Section 54: 500 Server Error

**Used on:** Server errors (Page 46)

**Content Model:**

- "500"
- "Something went wrong" headline
- Description (vague for security)
- Retry, home
- Error ID (for support)

---

### Section 55: Offline/No Connection

**Used on:** Network errors

**Content Model:**

- "No connection" headline
- "Check your internet" description
- Retry

> **Ratified divergence (Phase 1 · Principle 5).** No offline capability exists. This section remains specified for network-error handling.

---

## ADMIN SECTIONS (15)

### Section 56: Admin Console Shell

**Purpose:** Admin navigation and identity. · **Used on:** Every /admin route

**Content Model:**

- Brand block: "Admin" / "Console"
- Six nav groups, each with a label and items — Overview (Dashboard), Marketplace (Listings, Users), Finance (Transactions, Payments), Insights (Reports), Trust & Safety (Verifications), System (Settings)
- Nav item: label, description, optional count
- Current location from the route registry, user menu
- Signed-in user, logout action

**Interactions:**

- Current route indicated
- Count on Verifications reflects pending requests
- Logout clears auth state and token, redirects to /

**Device needs:** Navigation reachable on narrow screens.

**Accessibility:** Nav landmark with grouped lists, current page marked, logout is a real button

---

### Section 57: Volume Metrics Grid

**Purpose:** Platform volume at a glance. · **Used on:** Admin overview

**Content Model:**

- 4 stat items: label, value, change, trend direction, caption, 6-point trend series, target href
- One item marked featured

**Interactions:**

- Each metric is a link to its detail route

**Accessibility:** Each metric is a single link with an accessible name combining label and value; the trend series is decorative

---

### Section 58: Revenue Trend Panel

**Purpose:** Revenue over time. · **Used on:** Admin overview, admin payments

**Content Model:**

- Panel title, description, optional action
- Values by month, one or more series
- Value formatting: divisor, prefix, suffix

**Interactions:**

- Value on demand per month
- Action navigates to the related finance route

**Accessibility:** Chart has a text summary; series names exposed in the legend

---

### Section 59: Revenue Breakdown Panel

**Purpose:** Where revenue comes from. · **Used on:** Admin overview

**Content Model:**

- Headline metric: label + value (commissions YTD)
- Supporting metrics: GMV, take rate, average commission per deal

**Interactions:** Static display

**Accessibility:** Rendered as a description list

> **Ratified divergence (Page 20 module 5).** Folded into the revenue figure as one estimated commission line (BR17).

---

### Section 60: System Health List

**Purpose:** Which systems are healthy. · **Used on:** Admin overview

**Content Model:**

- Per system: label, uptime, error rate, state (operational / degraded)
- Overall uptime and error rate over 24h

**Accessibility:** State conveyed by text, not colour alone

---

### Section 61: System Alert List

**Purpose:** What needs an operator. · **Used on:** Admin overview

**Content Model:**

- Per alert: title, description, relative time, severity (info / warning / error)
- Alert count

**Accessibility:** Alerts are a list; severity is stated in text

> **Ratified divergence (Page 20 module 4).** Merged with Section 62 into one "Needs a Decision" list: each queue's open count and oldest-item age, oldest first.

---

### Section 62: Moderation Queue Summary

**Purpose:** How much review work is waiting. · **Used on:** Admin overview

**Content Model:**

- Per row: label, count, severity (warning / error), target href
- Rows: pending verifications, listings awaiting review, flagged content

**Interactions:** Open a row → the matching moderation route

**Accessibility:** Each row is a link naming both the count and the queue

> **Ratified divergence (Page 20 module 4).** See Section 61. Flagged content counts user and message flags only.

---

### Section 63: Moderation Listings Table

**Purpose:** The moderation queue as records. · **Used on:** Admin listings · **Extends:** Section 15

**Content Model:**

- Per listing: id, address, cover photo, price, agent (name, email, phone), submitted date, description, image set, compliance checks, status, flag reason, moderator note, changes-requested flag
- Compliance check: label + state (pass / warn / fail)
- Status: pending / flagged / approved / rejected
- Totals: queue size, total value, open compliance checks

**Interactions:**

- Status filters switch the visible set and reset selection
- Sort by any column; default sort by status
- Open a row → detail with photos, description, flag reason, compliance checklist, agent contact
- Row and detail actions: Approve, Request Changes, Reject
- Select rows → bulk actions with the same three
- Flagged and rejected rows identifiable without colour

**Accessibility:** Table caption describes every column; action columns have screen-reader-only headers

---

### Section 64: Moderation Decision Modal

**Purpose:** Record a reasoned decision. · **Used on:** Admin listings

**Content Model:**

- Mode: reject or request-changes
- Target ids (single row or bulk selection)
- Required note field

**Interactions:**

- Submit stays disabled until the note is non-empty (whitespace does not count)
- Reject → status rejected, note attached
- Request Changes → status returns to pending, flagged as changes requested
- Close or submit clears the note and the selection for affected rows

**Accessibility:** Focus trapped, labelled dialog, Escape closes, note field has a visible label

---

### Section 65: User Management Table

**Purpose:** Every account and its standing. · **Used on:** Admin users

**Content Model:**

- Per user: id, name, email, role (buyer / agent / admin), tier (standard / premium / platinum), join date, status (active / suspended / inactive), transaction count

**Interactions:**

- Sort by any column; default sort by name ascending
- Tier ranked for sorting
- Row action suspends or reactivates
- Bulk actions: Reactivate, Suspend
- Suspended rows identifiable without colour
- Open a row → user profile (`/admin/users/:id`)

**Accessibility:** Caption names every column; status is text

---

### Section 66: Transaction Ledger Table

**Purpose:** Every deal's money. · **Used on:** Admin transactions

**Content Model:**

- Per transaction: id, property address, buyer, agent, sale price, commission (price × platform rate — BR17), initiated date, status (pending / escrow / completed)
- Totals for price and commission

**Interactions:**

- Sort by any column
- Escrow status identifiable without colour
- Row actions open the deal

**Accessibility:** Footer totals are announced as part of the table

---

### Section 67: Verification Request List

**Purpose:** Identity and tier requests to decide. · **Used on:** Admin verifications

**Content Model:**

- Per request: id, name, email, current tier, requested tier, status (pending / approved / rejected), submitted date, document count

**Interactions:**

- Actions vary by status: pending → Approve / Review Docs / Reject; approved → View Details / Revoke; rejected → View Reason / Allow Resubmit
- Decision moves the request to its new status and updates the counts and the navigation count

**Accessibility:** Status is text; each action names the subject

---

### Section 68: Platform Config Panel

**Purpose:** Platform and marketplace values. · **Used on:** Admin settings

**Content Model:**

- Panel title and description
- Fields: name, label, placeholder, optional type, optional prefix or suffix
- Current values keyed by field name

**Interactions:**

- Editing any field clears the saved state
- Submit is owned by the page-level save action
- Reset restores stored values

**Accessibility:** Every field has a real label; prefix and suffix are not the only unit indicator

---

### Section 69: Policy Toggle Panel

**Purpose:** Moderation and operations policies. · **Used on:** Admin settings

**Content Model:**

- Panel title and description
- Toggles: title, description, default state

**Interactions:** Toggle flips immediately; description explains the consequence

**Accessibility:** Switch role with the title as its accessible name and the description as help text

---

### Section 70: Maintenance Panel

**Purpose:** Operational and destructive maintenance. · **Used on:** Admin settings

**Content Model:**

- Operational and destructive maintenance actions

**Interactions:** Kept apart from ordinary configuration; destructive actions require confirmation before running (BR10)

**Accessibility:** Destructive actions state their effect in the label

---

## Regeneration Notes

- **Retained:** all 70 sections with their numbers, "Used on", content models, interactions and accessibility notes.
- **Added:** Section Defaults table; a Purpose line per section; validation for Sections 16 and 38; data requirements for Section 10; Sections 26–29 split out by name from one heading (Section 29 remains unnamed and reserved); divergence pointers.
- **Changed — dropped as visual prescription:** every "Layout:" line (e.g. "Full-width, centered text overlay on image", "Horizontal scrollable carousel on mobile, 2-3 column grid on desktop", "Grid (2x2 on desktop, 1 on mobile)", "Timeline visual or 4-column grid", "Hero image + carousel, thumbnails below", "Horizontal bar, sticky on scroll", "3-5 boxes in row", "Full-width map container, 400px min height", "Table on desktop, cards on mobile", "Vertical card, 300px wide", "Grid card (2-3 per row desktop, 1 mobile)", "Chat bubble style (mine on right, theirs on left)", "Fixed at bottom or inline", "Label above input", "Stack vertically", "Card (100-150px)", "Standard calendar grid", "Multi-column on desktop, stacked on mobile", "Fixed bottom-right (or top-right), slides out/in", "Centered overlay, darken background", "Centered, centered vertically", "Full-height flex — fixed sidebar…", "Responsive grid, 4 columns at desktop", "Panel wrapper with fixed-height chart", "Stacked rows separated by the quiet divider token", "Card per request — identity block left…", "Panel wrapping a two-column field grid", "Stacked rows, switch right-aligned", "Panel placed last, visually separated"); every "Responsive:" column count and aspect ratio; "Background image (aspirational lifestyle)"; hover effects ("Hover → enlarge", "Hover step → highlight", "Hover row → highlight both cells", "Hover → enlarge/shadow"); "Focus → label color change, border highlight"; "Error state → red border"; "Icon or illustration" / icon slots; "Star icon", "star toggle"; "Trend chip colours by direction"; "State drives dot tone and text colour"; "Tone sets the leading indicator"; "Role rendered as a colour-coded chip, tier as coloured text"; "Commission rendered as an accent chip"; "Status tints the initiated date"; "tinted background" rows; "numeric columns use tabular figures"; "danger variant"; "Timestamp moves below the title on mobile"; "Chart scales to container; labels thin out"; chart types ("Bar chart, line chart, pie chart", "Column chart"). Where a dropped line carried behaviour it survives in neutral words (e.g. tinted rows → "identifiable without colour").
- **Changed — provider neutral:** Section 10 "Google Map centered on address" → "Map centred on the address"; the map provider is a code decision recorded in [ADR 0015](../../docs/adr/0015-map-surfaces-wait-on-coordinates.md) (MapLibre GL, OpenFreeMap).
- **Changed — renamed:** "LAYOUT SECTIONS" → "NAVIGATION SECTIONS"; "ERROR PAGES" → "ERROR SECTIONS"; the Offer group count corrected from "(10)" to "(6)" and the Listing group from "(15)" to "(10)" — no section removed.

---

**Phase 5 Complete.** All 70 sections specified with content and behaviour. They compose the 46 pages in Phase 4. Next: [Phase 6 — Interaction Contracts](phase-6-interaction-contracts.md).

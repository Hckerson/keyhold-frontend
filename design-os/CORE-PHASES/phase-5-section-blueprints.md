# Phase 5: Section Blueprints

**Real Estate Platform Design Operating System** - 70 reusable section patterns

---

## Overview

Reusable sections that compose pages. Each includes:

- Content model (data structure)
- Layout pattern
- Interaction behavior
- Responsive behavior
- Accessibility requirements

---

## HERO SECTIONS (5)

### Section 1: Hero Search

**Used on:** Home, potentially dashboard

**Content Model:**

- Headline: "Find Your Next Home"
- Subheadline: "Search 10k+ properties"
- Background image (aspirational lifestyle)
- Search input (location + price range)
- CTA buttons (Search, Sign Up)

**Layout:** Full-width, centered text overlay on image

**Interactions:**

- Input autocomplete on location
- Price slider on focus
- Enter key triggers search
- Click Search button → navigate to /search

**Responsive:**

- Mobile: Single column, text centered, image smaller
- Desktop: Side-by-side text/image

---

### Section 2: Featured Carousel

**Used on:** Home, dashboard

**Content Model:**

- 6-12 property cards
- Image, price, address, beds/baths
- Agent name + photo
- "New" or "Hot" badge

**Layout:** Horizontal scrollable carousel on mobile, 2-3 column grid on desktop

**Interactions:**

- Swipe to next on mobile
- Hover → enlarge on desktop
- Click → navigate to listing detail
- Star icon → save listing

**Responsive:**

- Mobile: 1 column + swipe
- Tablet: 2 columns
- Desktop: 3 columns

---

### Section 3: Trust Signals

**Used on:** Home, sign up page

**Content Model:**

- Stat card: "10k+ buyers"
- Stat card: "$500M+ transactions"
- Review: "5 stars - Great experience"
- Badge: "Verified platform"

**Layout:** Grid (2x2 on desktop, 1 on mobile)

**Interactions:**

- Click stat → modal with details
- Testimonial → link to full review

---

### Section 4: How It Works

**Used on:** Home, sign up page

**Content Model:**

- 4 steps: Search, View, Offer, Close
- Each step: icon + headline + description

**Layout:** Timeline visual or 4-column grid

**Interactions:**

- Hover step → highlight
- Click → expand description (mobile)

---

### Section 5: CTA Banner

**Used on:** Home, bottom of many pages

**Content Model:**

- Headline: "Ready to get started?"
- Subheadline: "Join 10k+ buyers today"
- CTA buttons: Sign Up, Learn More

**Layout:** Full-width, centered text

**Interactions:**

- Button click → navigate or open modal

---

## LISTING SECTIONS (15)

### Section 6: Listing Gallery

**Used on:** Listing detail

**Content Model:**

- Array of images (10-30)
- Captions (optional)
- Photographer credit (optional)

**Layout:** Hero image + carousel, thumbnails below

**Interactions:**

- Swipe next/prev
- Click thumbnail → jump to image
- Full-screen button → modal
- Keyboard arrows (← →) to navigate

**Responsive:**

- Mobile: Full-width, tall aspect ratio
- Desktop: Wider, shorter aspect ratio

---

### Section 7: Listing Price Bar (Sticky)

**Used on:** Listing detail

**Content Model:**

- Price (large)
- Status badge
- Address
- Save button (star)
- Share button
- Message agent button

**Layout:** Horizontal bar, sticky on scroll

**Interactions:**

- Star toggle → save/unsave
- Share → copy link / open share sheet
- Message → scroll to agent card or open chat
- Status badge → info tooltip

---

### Section 8: Listing Key Facts

**Used on:** Listing detail, search card

**Content Model:**

- Beds, Baths, Sq Ft, Lot Size, Year Built
- Optional: Garage, Basement, Pool

**Layout:** 3-5 boxes in row

**Interactions:**

- Hover box → tooltip with description

---

### Section 9: Listing Description

**Used on:** Listing detail

**Content Model:**

- Full text description
- Highlights (renovations, features) in bullet points
- Optional: Video tour link

**Layout:** Text block, expandable on mobile

**Interactions:**

- Read More button expands text (mobile)
- Click video link → modal with embed

---

### Section 10: Neighborhood Map

**Used on:** Listing detail

**Content Model:**

- Google Map centered on address
- Markers: Schools, Transit, Parks, Restaurants
- Legend with counts

**Layout:** Full-width map container, 400px min height

**Interactions:**

- Pan/zoom map
- Click marker → popup with info
- Legend checkbox → toggle marker type

---

### Section 11: Comparables

**Used on:** Listing detail

**Content Model:**

- 3-5 recent sales nearby
- Each: image, price, date sold, address, beds/baths

**Layout:** Table on desktop, cards on mobile

**Interactions:**

- Click row/card → navigate to listing detail (if still available)
- Sort by price/date

---

### Section 12: Agent Card

**Used on:** Listing detail

**Content Model:**

- Photo
- Name, license #
- Agency name
- Star rating (5.0 / 5)
- Review count ("48 reviews")
- Response time ("Usually replies in 2 hours")
- Recent listings count
- Call button, Message button

**Layout:** Vertical card, 300px wide

**Interactions:**

- Photo click → full profile modal
- Call → tel: link
- Message → scroll to message section or open chat
- "View all listings" → agent's listing grid

---

### Section 13: Listing Card (Search Results)

**Used on:** Search results, saved listings, featured sections

**Content Model:**

- Image
- Price
- Address
- Beds/Baths/Sq Ft
- Agent name + avatar
- Badges: "New", "Hot", "Price Reduced"
- Save star (if not saved, unfilled)

**Layout:** Grid card (2-3 per row desktop, 1 mobile)

**Interactions:**

- Click card → navigate to listing detail
- Star icon → save/unsave
- Hover → enlarge/shadow
- Long press mobile → context menu (save, share, report)

---

### Section 14: Listing Status Timeline

**Used on:** Offer detail, CRM

**Content Model:**

- Timeline of listing events
- Date listed, first offer, offer accepted, inspection, appraisal, closed
- Each event: date, status, notes

**Layout:** Vertical timeline or horizontal progress

**Interactions:**

- Click event → detail modal
- Estimated close date shown

---

### Section 15: Listing Moderation Queue

**Used on:** Admin listings

**Content Model:**

- Flagged listing
- Photos, description, location
- Reason for flag
- Agent name, contact

**Layout:** Card with buttons below

**Interactions:**

- Approve button → move to approved
- Reject → reason required
- Request Changes → send feedback to agent

---

## OFFER SECTIONS (10)

### Section 16: Offer Form

**Used on:** Make offer dialog/page

**Content Model:**

- Listing address (read-only)
- Offer amount (input, validation)
- Move-in date (date picker)
- Contingencies: Inspection, Appraisal, Financing (checkboxes)
- Earnest money amount (optional)
- Additional notes (textarea)
- Review summary (before submit)

**Layout:** Form in modal or full page

**Interactions:**

- Amount input → format as currency
- Contingencies checkboxes → toggle requirements
- Submit → review summary modal → confirm submit
- Cancel → dismiss

**Responsive:**

- Mobile: Stack fields vertically
- Desktop: 2-column grid

---

### Section 17: Offer Status Card

**Used on:** My offers, agent pipeline

**Content Model:**

- Listing address
- Your offer amount
- Current status (Submitted / Countered / Accepted / Rejected)
- Last activity (date)
- Next step hint

**Layout:** Horizontal card or table row

**Interactions:**

- Click → expand to full offer detail
- Status badge → tooltip with explanation

---

### Section 18: Offer Timeline

**Used on:** Offer detail

**Content Model:**

- Vertical timeline of all offers/counters
- Date, time, amount, status for each
- Message history interleaved

**Layout:** Vertical timeline

**Interactions:**

- Click offer → show full details
- Hover message → show timestamp

---

### Section 19: Counter Offer Form

**Used on:** Offer detail (when offer countered)

**Content Model:**

- Your original offer amount
- Seller's counter amount
- Your new counter amount (input)
- Message to seller (textarea)

**Layout:** Form with comparison of amounts

**Interactions:**

- Counter amount input → format as currency
- Submit → confirmation modal

---

### Section 20: Offer Comparison

**Used on:** Offer detail

**Content Model:**

- Column 1: Your offer
- Column 2: Current counter
- Rows: Amount, Contingencies, Earnest money, Move-in date, Conditions

**Layout:** 2-column table or cards side-by-side

**Interactions:**

- Hover row → highlight both cells
- Click cell → expand detail

---

### Section 21: Inspection/Appraisal Tracker

**Used on:** Offer detail (post-accepted)

**Content Model:**

- Inspection date (scheduled, completed, report)
- Appraisal date (scheduled, completed, value)
- Financing contingency (deadline, status)
- Closing date (scheduled, confirmed)

**Layout:** Checklist with dates and status badges

**Interactions:**

- Click item → upload document or change date
- Document → view/download in-app

---

## MESSAGING SECTIONS (8)

### Section 22: Message Thread

**Used on:** Messages page, offer detail chat

**Content Model:**

- Array of messages
- Timestamp, sender, content
- Typing indicator (if agent typing)

**Layout:** Chat bubble style (mine on right, theirs on left)

**Interactions:**

- Scroll to load older messages
- Typing indicator → show "Agent is typing..."
- Click name → profile modal

---

### Section 23: Message Input

**Used on:** Messages page, chat sections

**Content Model:**

- Text input field
- Attach button (files, photos)
- Send button

**Layout:** Fixed at bottom or inline

**Interactions:**

- Type → grow input height (max 4 lines)
- Attach → file picker
- Send (Enter key or button) → submit message
- Typing indicator → update thread

---

### Section 24: Message Notification

**Used on:** Messages list

**Content Model:**

- Sender name + avatar
- Last message preview (truncated)
- Timestamp
- Unread indicator (dot or badge)

**Layout:** List item

**Interactions:**

- Click → navigate to thread
- Unread dot → cleared on view
- Long press → mark as read / delete / snooze (mobile)

---

### Section 25: Document Share

**Used on:** Messaging, offer detail

**Content Model:**

- Document thumbnail (preview)
- Filename
- Uploaded by, date
- Download button
- Share button

**Layout:** Card or list item

**Interactions:**

- Click → full screen viewer
- Download → local file
- Share → copy link or send message

---

### Section 26-29: Additional Messaging Sections (Typing Indicator, Thread Header, Conversation List Sidebar, etc.)

---

## FORM SECTIONS (10)

### Section 30: Input Field

**Used on:** All forms

**Content Model:**

- Label (required indicator if needed)
- Placeholder text
- Help text (optional)
- Error message (if validation fails)

**Layout:** Label above input

**Interactions:**

- Focus → label color change, border highlight
- Type → validate in real-time
- Blur → show error if invalid
- Error state → red border, error message

---

### Section 31: Checkbox Group

**Used on:** Offer form, filter panel

**Content Model:**

- Label
- Array of checkbox items
- Help text per item

**Layout:** Stack vertically

**Interactions:**

- Click → toggle checkbox
- Keyboard: Space to toggle

---

### Section 32: Radio Button Group

**Used on:** Filters, forms (single selection)

**Content Model:**

- Label
- Array of radio options

**Layout:** Stack or grid

**Interactions:**

- Click → select (previous deselected)

---

### Section 33: Dropdown/Select

**Used on:** Forms, filters

**Content Model:**

- Label
- Placeholder
- Array of options
- Optional search

**Layout:** Closed by default, opens on click

**Interactions:**

- Click → expand options
- Type → filter options
- Arrow keys → navigate
- Enter → select
- Escape → close

---

### Section 34: Date Picker

**Used on:** Viewing scheduling, offer form

**Content Model:**

- Label
- Calendar widget
- Month/year controls
- Disabled dates (past, unavailable)

**Layout:** Input + popup calendar

**Interactions:**

- Click input → show calendar
- Click date → select (close calendar)
- Next/prev month → navigate
- Type date directly → parse input

---

### Section 35: Price Slider

**Used on:** Filter panel

**Content Model:**

- Label
- Min/max values
- Current range selected
- Step size ($5k, $10k, etc.)

**Layout:** Range input or dual slider

**Interactions:**

- Drag → update range
- Input numbers in text field → update slider
- Reset button → default range

---

### Section 36: Toggle/Switch

**Used on:** Settings, notification preferences

**Content Model:**

- Label
- On/off state
- Help text

**Layout:** Horizontal, toggle on right

**Interactions:**

- Click toggle or label → switch state
- Keyboard: Space to toggle

---

### Section 37: Search Input (Autocomplete)

**Used on:** Location search, listing search

**Content Model:**

- Placeholder
- Debounce suggestions (300ms)
- Recent searches (if applicable)

**Layout:** Input with dropdown suggestions

**Interactions:**

- Type → show suggestions
- Click suggestion → fill input / submit
- Keyboard: Arrow up/down navigate, Enter select, Escape close

---

### Section 38: File Upload

**Used on:** Messages, admin uploads

**Content Model:**

- Drag-drop zone
- "Choose file" button
- File type restrictions
- File size limit

**Layout:** Dropzone area

**Interactions:**

- Drag file over → highlight
- Drop → upload
- Click → open file picker
- Show upload progress bar

---

### Section 39: Multi-Step Form

**Used on:** Sign up, complex workflows

**Content Model:**

- Step indicator (1/3, 2/3, 3/3)
- Form fields for current step
- Validation per step
- Next, Back, Submit buttons

**Layout:** Vertical progress indicator + form

**Interactions:**

- Next → validate current step, advance if valid
- Back → return to previous step
- Submit → validate all steps, submit if valid
- Step indicator click → jump to step (if already completed)

---

## DASHBOARD & DATA SECTIONS (7)

### Section 40: Stat Card

**Used on:** Dashboards

**Content Model:**

- Label (e.g., "Saved Listings")
- Value (e.g., "5")
- Trend (up/down with %)
- Icon or small chart

**Layout:** Card (100-150px)

**Interactions:**

- Click → navigate to detail page
- Hover → show description

---

### Section 41: Data Table

**Used on:** Offers, listings, admin, agent dashboard

**Content Model:**

- Column headers (sortable)
- Data rows (each column is cell)
- Pagination or infinite scroll
- Bulk action checkboxes (optional)

**Layout:** Scrollable table (responsive: becomes cards on mobile)

**Interactions:**

- Click header → sort (ascending/descending)
- Click row → detail modal or navigate
- Checkbox → select for bulk action
- Bulk action button → apply to selected

---

### Section 42: Pipeline Card (CRM-style)

**Used on:** Agent pipeline

**Content Model:**

- Listing address
- Buyer/offer amount
- Status
- Days in stage
- Last activity
- Notes snippet

**Layout:** Card with drag handle

**Interactions:**

- Drag → change status (column)
- Click → detail modal
- Click notes → expand

---

### Section 43: Activity Feed

**Used on:** Dashboard, offer detail

**Content Model:**

- Array of events (viewed, saved, offer made, offer countered, etc.)
- Timestamp, icon, description

**Layout:** Timeline style, newest first

**Interactions:**

- Click event → detail or navigate

---

### Section 44: Quick Stats Widget

**Used on:** Dashboard, admin overview

**Content Model:**

- 3-4 key metrics (number + trend)
- Icon per metric

**Layout:** Grid (1-4 cards)

**Interactions:**

- Click card → navigate to detail

---

### Section 45: Calendar Widget

**Used on:** Viewing calendar, agent calendar

**Content Model:**

- Month view
- Events marked on dates
- Event count per day

**Layout:** Standard calendar grid

**Interactions:**

- Click date → list events for that day
- Click event → detail modal
- Next/prev month → navigate

---

### Section 46: Chart/Graph

**Used on:** Agent analytics, admin reports

**Content Model:**

- Bar chart, line chart, pie chart (varies by metric)
- Data points, legend
- Tooltip on hover

**Layout:** Responsive container

**Interactions:**

- Hover → show tooltip
- Click legend → toggle series
- Tap on mobile → show data point details

---

## LAYOUT SECTIONS (3)

### Section 47: Header

**Used on:** All pages

**Content Model:**

- Logo (clickable → home)
- Nav links (search, saved, messages, etc. for logged-in)
- User menu (profile, settings, logout)
- Mobile hamburger

**Layout:** Horizontal, sticky or scroll

---

### Section 48: Footer

**Used on:** All pages (public pages)

**Content Model:**

- Links: About, Help, Blog, Privacy, Terms
- Social media icons
- Newsletter signup
- Copyright

**Layout:** Multi-column on desktop, stacked on mobile

---

### Section 49: Sidebar Navigation

**Used on:** Dashboard, agent, admin

**Content Model:**

- Logo
- Menu items (Dashboard, Saved, Offers, etc.)
- Active indicator
- Collapse/expand (mobile)

**Layout:** Vertical, sticky or fixed

---

## STATE & FEEDBACK SECTIONS (3)

### Section 50: Toast Notification

**Used on:** Everywhere (save, send, error, etc.)

**Content Model:**

- Message
- Icon (success, error, info, warning)
- Close button (optional)
- Auto-dismiss (5s)

**Layout:** Fixed bottom-right (or top-right), slides out/in

**Interactions:**

- Click close → dismiss
- Auto-dismiss after 5s
- Stack multiple toasts

---

### Section 51: Modal/Dialog

**Used on:** Confirm actions, forms, details

**Content Model:**

- Title
- Content (text, form, image, etc.)
- Buttons (OK, Cancel, Delete, etc.)
- Close button (X)

**Layout:** Centered overlay, darken background

**Interactions:**

- Click button → action or close
- Click X → close
- Click outside (if dismissible) → close
- Keyboard: Escape closes

---

### Section 52: Empty State

**Used on:** No results, no data

**Content Model:**

- Icon or illustration
- Headline
- Description
- CTA button

**Layout:** Centered, centered vertically within container

**Interactions:**

- Click CTA → action (search, create, etc.)

---

## ERROR PAGES (3)

### Section 53: 404 Not Found

**Used on:** Invalid routes

**Content Model:**

- "404" or icon
- "Page not found" headline
- Helpful description
- Home button, back button

---

### Section 54: 500 Server Error

**Used on:** Server errors

**Content Model:**

- "500" or icon
- "Something went wrong" headline
- Description (vague for security)
- Retry button, home button
- Error ID (for support)

---

### Section 55: Offline/No Connection

**Used on:** Network errors

**Content Model:**

- Icon
- "No connection" headline
- "Check your internet" description
- Retry button

---

## ADMIN SECTIONS (15)

### Section 56: Admin Console Shell

**Used on:** Every /admin route

**Content Model:**

- Brand block: "Admin" / "Console"
- Six nav groups, each with a label and items — Overview (Dashboard), Marketplace (Listings, Users), Finance (Transactions, Payments), Insights (Reports), Trust & Safety (Verifications), System (Settings)
- Nav item: icon, label, description, optional count badge
- Topbar: breadcrumb from route registry, user menu
- Signed-in user, logout action

**Layout:** Full-height flex — fixed sidebar, scrollable main column with topbar pinned above a contained content area

**Interactions:**

- Active route highlighted in the sidebar
- Badge count on Verifications reflects pending requests
- Logout clears auth state and token, redirects to /

**Responsive:**

- Mobile: Sidebar collapses to a drawer
- Desktop: Sidebar persistent, content in a max-width container

**Accessibility:** Nav landmark with grouped lists, current page marked, logout is a real button

---

### Section 57: Volume Metrics Grid

**Used on:** Admin overview

**Content Model:**

- 4 stat items: label, value, icon, change, trend direction, caption, sparkline series, target href
- One item marked featured

**Layout:** Responsive grid, 4 columns at desktop

**Interactions:**

- Whole card is a link to its detail route
- Trend chip colours by direction

**Responsive:** 1 / 2 / 4 columns

**Accessibility:** Each card is a single link with an accessible name combining label and value; sparkline is decorative

---

### Section 58: Revenue Trend Panel

**Used on:** Admin overview, admin payments

**Content Model:**

- Panel title, description, optional action button
- Column chart: x-axis month, one or more value series with tones
- Value formatting: divisor, prefix, suffix

**Layout:** Panel wrapper with fixed-height chart

**Interactions:**

- Hover a column → value tooltip
- Action button navigates to the related finance route

**Responsive:** Chart scales to container; labels thin out on narrow widths

**Accessibility:** Chart has a text summary; series names exposed in the legend

---

### Section 59: Revenue Breakdown Panel

**Used on:** Admin overview

**Content Model:**

- Headline metric: label + value (commissions YTD)
- Supporting metrics: GMV, take rate, average commission per deal

**Layout:** Headline above a stacked list of label/value rows

**Interactions:** Static display

**Responsive:** Full width in the panel rail

**Accessibility:** Rendered as a description list

---

### Section 60: System Health List

**Used on:** Admin overview

**Content Model:**

- Per system: label, icon, uptime, error rate, state (operational / degraded)
- Panel description carries overall uptime and error rate over 24h

**Layout:** One row per system, metrics right-aligned

**Interactions:** State drives dot tone and text colour

**Responsive:** Metrics wrap under the label on narrow widths

**Accessibility:** State conveyed by text, not colour alone

---

### Section 61: System Alert List

**Used on:** Admin overview

**Content Model:**

- Per alert: title, description, relative time, tone (info / warning / error)
- Panel header shows the alert count

**Layout:** Stacked rows separated by the quiet divider token

**Interactions:** Tone sets the leading indicator

**Responsive:** Time stamp moves below the title on mobile

**Accessibility:** Alerts are a list; tone is paired with a text label

---

### Section 62: Moderation Queue Summary

**Used on:** Admin overview

**Content Model:**

- Per row: label, count, icon, tone (warning / error), target href
- Rows: pending verifications, listings awaiting review, flagged content

**Layout:** Compact row list inside a panel

**Interactions:** Click a row → the matching moderation route

**Responsive:** Full width in the panel rail

**Accessibility:** Each row is a link naming both the count and the queue

---

### Section 63: Moderation Listings Table

**Used on:** Admin listings

**Extends:** Section 15 (Listing Moderation Queue)

**Content Model:**

- Per listing: id, address, cover photo, price, agent (name, email, phone), submitted date, description, image set, compliance checks, status, flag reason, moderator note, changes-requested flag
- Compliance check: label + state (pass / warn / fail)
- Status: pending / flagged / approved / rejected

**Layout:** Sortable, selectable, paginated table with a totals footer and a large side panel for row detail

**Interactions:**

- Filter pills switch the visible set and reset selection
- Sort by any column; default sort by status
- Open a row → detail panel with photos, description, flag reason, compliance checklist, agent contact
- Row and panel actions: Approve, Request Changes, Reject
- Select rows → bulk action bar with the same three actions
- Flagged and rejected rows carry a tinted background

**Responsive:** Horizontal scroll inside the table container; detail panel goes full-screen on mobile

**Accessibility:** Table caption describes every column; action columns have screen-reader-only headers

---

### Section 64: Moderation Decision Modal

**Used on:** Admin listings

**Content Model:**

- Mode: reject or request-changes
- Target ids (single row or bulk selection)
- Required note field

**Layout:** Centred dialog, note field above the action row

**Interactions:**

- Submit stays disabled until the note is non-empty
- Reject → status rejected, note attached
- Request Changes → status returns to pending, flagged as changes requested
- Close or submit clears the note and the selection for affected rows

**Responsive:** Full width with margin on mobile

**Accessibility:** Focus trapped, labelled dialog, Escape closes, note field has a visible label

---

### Section 65: User Management Table

**Used on:** Admin users

**Content Model:**

- Per user: id, name, email, role (buyer / agent / admin), tier (standard / premium / platinum), join date, status (active / suspended / inactive), transaction count

**Layout:** Sortable, selectable, paginated table

**Interactions:**

- Sort by any column; default sort by name ascending
- Role rendered as a colour-coded chip, tier as coloured text ranked for sorting
- Row action suspends or reactivates
- Bulk action bar: Reactivate, Suspend
- Suspended rows carry an error-tinted background

**Responsive:** Horizontal scroll inside the table container

**Accessibility:** Caption names every column; status is a badge with text

---

### Section 66: Transaction Ledger Table

**Used on:** Admin transactions

**Content Model:**

- Per transaction: id, property address, buyer, agent, sale price, commission (price × platform rate), initiated date, status (pending / escrow / completed)

**Layout:** Sortable table with a totals footer for price and commission

**Interactions:**

- Sort by any column
- Commission rendered as an accent chip
- Status tints the initiated date
- Row actions open the deal

**Responsive:** Horizontal scroll inside the table container

**Accessibility:** Footer totals are announced as part of the table; numeric columns use tabular figures

---

### Section 67: Verification Request List

**Used on:** Admin verifications

**Content Model:**

- Per request: id, name, email, current tier, requested tier, status (pending / approved / rejected), submitted date, document count

**Layout:** Card per request — identity block left, status badge and actions right

**Interactions:**

- Actions vary by status: pending → Approve / Review Docs / Reject; approved → View Details / Revoke; rejected → View Reason / Allow Resubmit
- Decision moves the card to its new status and updates the header counts and the sidebar badge

**Responsive:** Actions wrap below the identity block on mobile

**Accessibility:** Status is text plus tone; each action names the subject

---

### Section 68: Platform Config Panel

**Used on:** Admin settings

**Content Model:**

- Panel title and description
- Fields: name, label, placeholder, optional type, optional prefix or suffix
- Current values keyed by field name

**Layout:** Panel wrapping a two-column field grid

**Interactions:**

- Editing any field clears the saved state
- Submit is owned by the page header button via form id
- Reset restores stored values

**Responsive:** Single column on mobile

**Accessibility:** Every field has a real label; prefix and suffix are not the only unit indicator

---

### Section 69: Policy Toggle Panel

**Used on:** Admin settings

**Content Model:**

- Panel title and description
- Toggles: title, description, default state

**Layout:** Stacked rows, switch right-aligned

**Interactions:** Toggle flips immediately; description explains the consequence

**Responsive:** Description wraps under the title on mobile

**Accessibility:** Switch role with the title as its accessible name and the description as help text

---

### Section 70: Maintenance Panel

**Used on:** Admin settings

**Content Model:**

- Operational and destructive maintenance actions

**Layout:** Panel placed last, visually separated from ordinary configuration

**Interactions:** Destructive actions require confirmation before running

**Responsive:** Actions stack on mobile

**Accessibility:** Destructive actions use the danger variant and state their effect in the label

---

**Phase 5 Complete. All 70 sections specified with content, layout, interactions, and responsive behavior. These compose all 27 pages.**

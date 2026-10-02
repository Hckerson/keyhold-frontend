# Phase 5: Section Blueprints

**Keyhold Design Operating System** · Phase 5 of 9 · Version 2.0 · 29 September 2026 · screen-content pass 30 September 2026 · section-name pass 2 October 2026

Every page in [Phase 4](phase-4-page-blueprints.md) broken into sections by the job each one does. Next: [Phase 6 — Interaction Contracts](phase-6-interaction-contracts.md).

Sections describe behaviour only — never what a section shows, which components or controls it uses, layout, order on screen, sizing, imagery, animation or wireframes. Section numbers are the stable identifiers: RATIFIED_DIVERGENCES, Phase 4 and Phase 8 cite sections by number. A heading names the job the section does, never a presentation or a container; the version 1 presentational names were replaced on 2 October 2026 and each old name is recorded against its number in [Regeneration Notes](#regeneration-notes). Built files that still carry an old name are facts about the code, paired with their section in Phase 8. Build status lives in [Phase 8](phase-8-implementation-roadmap.md#sections).

---

## Contents

1. [Section Defaults](#section-defaults)
2. [Discovery Sections (1–5)](#discovery-sections-5)
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

| Field                 | Default                                                                                                                                                                                                                                          |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Loading**           | The user and assistive technology are told the section is busy; arriving data never displaces what the user is already reading (Phase 9 › CLS).                                                                                                  |
| **Error**             | The section says what failed and offers a retry. Other sections keep working. Never fall back to fabricated data (BR15).                                                                                                                         |
| **Empty**             | Say what is missing and offer the next useful action (Phase 3 › Empty States).                                                                                                                                                                   |
| **Accessibility**     | WCAG 2.2 AA; everything operable by keyboard with a visible focus indicator; status never conveyed by colour alone; anything that carries meaning without text has an accessible name.                                                           |
| **Device needs**      | Every task achievable on every supported device; touch users get equivalents for anything offered on hover. Portal sections are desktop-first (ratified, Principle 5).                                                                           |
| **Data requirements** | Read through a hook over the API client (Phase 7); portal sections take their data from the route that owns the portal's queries and never fetch on their own ([Phase 7 › Portal Data Flow](phase-7-frontend-architecture.md#portal-data-flow)). |
| **Technical notes**   | Mutation feedback is global by default ([ADR 0013](../../docs/adr/0013-mutation-feedback-is-global-by-default.md)); writes send once and confirmations lock (BR10).                                                                              |

---

## DISCOVERY SECTIONS (5)

### Section 1: Start a property search

**Purpose:** Start a search from the first screen. · **Used on:** Home, potentially dashboard

**Data requirements:** Localities for location suggestions; price range.

**Interactions:**

- Location suggestions appear as the visitor types
- A price range can be chosen
- Enter starts the search
- Starting a search navigates to /search with the criteria in the URL
- A visitor who is not signed in can go on to sign up instead

**Device needs:** Search usable one-handed on a phone.

**Rules:** Any figure it claims about the marketplace is true at the time it is read (BR15).

> **Ratified divergence (Page 1 module 1 · search entry).** The shipped headline is "Find the home that finds you."; neighbourhood shortcuts are ranked by live listing count; the subheadline figure is not shown until it is true (BR15).

---

### Section 2: Featured listings

**Purpose:** Show promoted and popular inventory. · **Used on:** Home, dashboard

**Data requirements:** 6–12 listings: image, price, address, beds/baths, agent name and photo, "New" or "Hot" label (Phase 3 › Status Labels), save state.

**Interactions:**

- Opening a listing navigates to its detail
- Saving saves the listing

**Device needs:** Touch users can move through the set by swiping.

> **Ratified divergence (Page 1 module 2 · featured listings).** One premier listing, then six. Promoted listings fill first and are labelled "Featured"; the rest are labelled "Most viewed" (BR15).

---

### Section 3: Trust Signals

**Purpose:** Earn trust with verifiable facts. · **Used on:** Home, sign up page

**Data requirements:** Platform counts (buyers, transaction volume); reviews with reviewer consent; verification status of the platform.

**Interactions:**

- Each figure leads to its details
- Each review leads to the full review

**States:** Hide the figures when fewer than two are non-zero.

**Rules:** Every figure is true and every review is quoted with consent (BR15).

> **Ratified divergence (Page 1 module 4 · Section 3).** Live counts only (homes on the market, homes sold, neighbourhoods); no testimonials until reviewers consent. Trust is carried by the guarantees.

---

### Section 4: How It Works

**Purpose:** Explain what the platform does for a buyer, in four steps — search, view, offer, close. · **Used on:** Home, sign up page

**Interactions:**

- Each step's explanation can be expanded

> **Ratified divergence (Page 1 · How It Works; Page 1 module 3).** Retold as a narrative of shipping features: saved search, saved shortlist, bridged viewings, escrow and the four deal milestones.

---

### Section 5: Prompt to act

**Purpose:** Convert an engaged visitor. · **Used on:** Home and many other pages

**Interactions:**

- The visitor can go on to sign up, or find out more first

**Rules:** Any figure it claims about the marketplace is true (BR15).

---

## LISTING SECTIONS (10)

### Section 6: Listing photos

**Purpose:** Let the buyer see the property. · **Used on:** Listing detail

**Data requirements:** 10–30 images; optional captions and photographer credit.

**Interactions:**

- Move to the next or previous image
- Go straight to any image
- View full-screen
- Arrow keys (← →) move between images

**Device needs:** Swipe on touch.

**Accessibility:** Each image has meaningful alternative text; position announced ("3 of 18"); full-screen view traps focus and closes on Escape.

---

### Section 7: Listing price and actions

**Purpose:** Keep price, status and the main actions available while reading. · **Used on:** Listing detail

**Data requirements:** Price, status, address, save state, agent contact.

**Interactions:**

- Saving toggles save/unsave
- Sharing copies the link or opens the system share
- Messaging opens the agent contact or chat
- The status explains itself on demand

**Device needs:** Remains reachable while the buyer reads the rest of the page.

---

### Section 8: Listing Key Facts

**Purpose:** The facts buyers filter and compare on. · **Used on:** Listing detail, search results

**Data requirements:** Beds, baths, sq ft, lot size, year built; optional garage, basement, pool.

**Interactions:**

- Each fact explains itself on demand (touch and keyboard included)

---

### Section 9: Listing Description

**Purpose:** The seller's account of the property. · **Used on:** Listing detail

**Data requirements:** Full description; highlights (renovations, features); optional video tour link.

**Interactions:**

- Long text expands on request
- A video tour plays in-app

---

### Section 10: Neighborhood Map

**Purpose:** Where the property is and what is nearby. · **Used on:** Listing detail

**Data requirements:** Listing coordinates; `GET /properties/:id/nearby` (Overpass, 1.5 km, cached 24 h per ~100 m cell; failures cached 5 min) for schools, transit, parks and restaurants, with a count per kind; walkability score.

**Interactions:**

- The map centres on the address and can be panned and zoomed
- Choosing a place gives its details
- Each kind of place can be turned on and off; the same choice serves as the key and shows the count

**States:** No coordinates or no mapped places → no places shown, never invented (BR15). Map fails → text neighbourhood facts. Fetches only when opened.

---

### Section 11: Comparables

**Purpose:** Price context. · **Used on:** Listing detail

**Data requirements:** 3–5 recent sales nearby, each with image, price, date sold, address, beds/baths.

**Interactions:**

- Open a comparable (if still available)
- Order by price or date

> **Deferred (Buyer JTBD 1).** Comparables today are active listings in the same locality; sold comparables need a sold-price history.

---

### Section 12: Listing agent contact

**Purpose:** Who is selling and how to reach them. · **Used on:** Listing detail

**Data requirements:** Agent photo, name, licence number, agency, rating, review count, response time, recent listings count.

**Interactions:**

- Opening the agent leads to their full profile
- Calling goes through the platform (BR9)
- Messaging opens the chat
- The buyer can reach all of the agent's listings

---

### Section 13: Listing summary

**Purpose:** One listing, enough to decide whether to open it. · **Used on:** Search results, saved listings, featured sections

**Data requirements:** Image, price, address, beds/baths/sq ft, agent name and avatar, labels ("New", "Hot", "Price Reduced", "Featured"), save state.

**Interactions:**

- Opening leads to listing detail
- Save/unsave
- Secondary actions (save, share, report) available on touch as well as pointer

---

### Section 14: Listing deal history

**Purpose:** The history of a listing's deal. · **Used on:** Offer detail, CRM

**Data requirements:** Listing events — listed, first offer, offer accepted, inspection, appraisal, closed — each with date, status and notes; estimated close date.

**Interactions:**

- Open an event's detail
- The estimated close date is always available

---

### Section 15: Listing Moderation Queue

**Purpose:** Decide a flagged or submitted listing. · **Used on:** Admin listings (extended by Section 63)

**Data requirements:** The listing's photos, description, location, flag reason, agent name and contact.

**Interactions:**

- Approve → moves to approved
- Reject → reason required (BR4)
- Request changes → sends feedback to the agent

---

## OFFER SECTIONS (6)

The earlier run headed this group "(10)" but specified six sections (16–21). The count is corrected; no section was removed.

### Section 16: Offer Form

**Purpose:** Capture a structured offer. · **Used on:** Make-offer flow

**Data requirements:** Listing address (read-only); offer amount; move-in date; contingencies (inspection, appraisal, financing); optional earnest money; optional note.

**Interactions:**

- Amount formats as currency
- Choosing a contingency adds its requirements
- Submitting shows a review of the offer, then confirms
- Cancelling dismisses without sending

**Validation:** Amount required and positive; move-in date not in the past; earnest money non-negative.

> **Closed 8 Sept.** Contingencies are values, not prose; the review is a second step of the same flow.

---

### Section 17: Offer status

**Purpose:** Where one offer stands. · **Used on:** My offers, agent pipeline

**Data requirements:** Listing address, offer amount, current status (Submitted / Countered / Accepted / Rejected), last activity date, next step.

**Interactions:**

- Opening leads to the full offer detail
- The status explains itself on demand

---

### Section 18: Negotiation history

**Purpose:** Every round of the negotiation. · **Used on:** Offer detail

**Data requirements:** Every offer and counter with date, time, amount and status, interleaved with the message history.

**Interactions:**

- Opening an offer gives its full details
- Every message's timestamp is available

---

### Section 19: Counter Offer Form

**Purpose:** Respond to a counter with a new number. · **Used on:** Offer detail (when offer countered)

**Data requirements:** Original offer amount, seller's counter amount; captures the new counter amount and a message to the seller.

**Interactions:**

- Counter amount formats as currency
- Submitting asks for confirmation first

---

### Section 20: Offer Comparison

**Purpose:** What changed between two positions. · **Used on:** Offer detail

**Data requirements:** The buyer's offer and the current counter: amount, contingencies, earnest money, move-in date, conditions.

**Interactions:**

- Each compared term pairs both values
- A term's detail can be expanded

---

### Section 21: Inspection/Appraisal Tracker

**Purpose:** Post-acceptance steps to closing. · **Used on:** Offer detail (post-accepted), agent deal detail

**Data requirements:** Inspection (date, scheduled/completed, report); appraisal (date, scheduled/completed, value); financing contingency (deadline, status); closing (date, scheduled/confirmed).

**Interactions:**

- Opening an item lets the user upload a document or change its date
- Documents can be viewed and downloaded in-app

**Business rules:** BR7 — four milestones seeded at acceptance; untaken contingencies `WAIVED`; overdue derived.

---

## MESSAGING SECTIONS (8)

### Section 22: Message Thread

**Purpose:** The conversation. · **Used on:** Messages page, offer detail chat

**Data requirements:** Messages with timestamp, sender and content; typing state of the other party.

**Interactions:**

- Older messages load on request
- When the agent is typing, the user is told "Agent is typing..."
- A sender's name leads to their profile
- A received message can be reported (Journey 18)

**Accessibility:** Sender distinguishable in text, not by position alone; new messages announced politely.

---

### Section 23: Compose a message

**Purpose:** Compose and send. · **Used on:** Messages page, chat sections

**Data requirements:** Message text; attachments (files, photos) within Section 38 limits.

**Interactions:**

- The message can grow up to four lines before scrolling
- Attaching opens the file picker (Section 38 limits)
- Enter, or an explicit send, submits the message
- Composing updates the typing state in the thread

---

### Section 24: Message Notification

**Purpose:** One conversation in a list. · **Used on:** Messages list

**Data requirements:** Sender name and avatar, last message preview (truncated), timestamp, unread state.

**Interactions:**

- Opening leads to the thread
- Unread clears on view
- Mark as read / delete / snooze (available on touch)

---

### Section 25: Document Share

**Purpose:** Documents exchanged in a deal. · **Used on:** Messaging, offer detail

**Data requirements:** Document preview, filename, uploader, upload date.

**Interactions:**

- Opening shows the full document
- Downloading saves a local file
- Sharing copies a link or sends it as a message

---

### Sections 26–29: Additional Messaging Sections

Version 1 named these as one line: "Typing Indicator, Thread Header, Conversation List Sidebar, etc." They are split here with a note, per Scope Preservation.

- **Section 26: Typing Indicator** — tells the user the other party is composing; announced politely. _(Real-time dependency deferred — see Phase 8.)_
- **Section 27: Conversation details and actions** — who the conversation is with, the property it concerns, and what can be done with the whole thread.
- **Section 28: Conversation List** — every conversation, searchable and filterable, unread first.
- **Section 29: Unnamed ("etc.")** — reserved; version 1 did not specify it. Owner to name or confirm as the thread's context (property and agent).

---

## FORM SECTIONS (10)

### Section 30: Enter a value

**Purpose:** One labelled value. · **Used on:** All forms

**Data requirements:** Label, whether required, optional help text, validation message.

**Interactions:**

- Values validate as they are typed
- Leaving an invalid value reports its error
- The error message is associated with the value it concerns

---

### Section 31: Choose several options

**Purpose:** Several independent choices. · **Used on:** Offer form, search filters

**Data requirements:** Group label; choices with optional help text each.

**Interactions:**

- Each choice toggles independently
- Keyboard: Space toggles

---

### Section 32: Choose one option

**Purpose:** One choice from a set. · **Used on:** Filters, forms (single selection)

**Data requirements:** Group label; options.

**Interactions:**

- Choosing one deselects the previous
- Arrow keys move within the group

---

### Section 33: Choose from a long set

**Purpose:** One choice from a long set. · **Used on:** Forms, filters

**Data requirements:** Label, options, whether the options are searchable.

**Interactions:**

- Opening lists the options
- Typing filters them
- Arrow keys move, Enter chooses
- Escape closes without choosing

---

### Section 34: Choose a date

**Purpose:** Choose a date. · **Used on:** Viewing scheduling, offer form

**Data requirements:** Label; unavailable dates (past, unavailable).

**Interactions:**

- Choosing a date sets it and closes the calendar
- Months can be stepped forward and back
- A date typed directly is parsed

---

### Section 35: Narrow by price

**Purpose:** Narrow by price. · **Used on:** Search filters

**Data requirements:** Label; minimum and maximum; current range; step size ($5k, $10k, etc.).

**Interactions:**

- The range can be adjusted
- Typed numbers update the range
- Reset returns to the default range

> **Ratified divergence (Page 2 module 5 · Section 35).** Discrete price bands with live facet counts replace the slider.

---

### Section 36: Switch a setting on or off

**Purpose:** An on/off setting that applies immediately. · **Used on:** Settings, notification preferences

**Data requirements:** Label, on/off state, help text.

**Interactions:**

- Activating the setting or its label switches its state
- Keyboard: Space toggles

---

### Section 37: Search with suggestions

**Purpose:** Free text with suggestions. · **Used on:** Location search, listing search

**Data requirements:** Suggestions, debounced (300 ms); recent searches (if applicable).

**Interactions:**

- Typing brings up suggestions
- Choosing a suggestion fills the search or submits it
- Keyboard: Arrow up/down move, Enter chooses, Escape closes

---

### Section 38: File Upload

**Purpose:** Add files. · **Used on:** Messages, listing media, identity verification, avatar, admin uploads

**Data requirements:** Accepted file types and size limit per use.

**Interactions:**

- Files can be dragged in or chosen from the file picker; a drag over the target is acknowledged
- Dropping or choosing starts the upload
- Upload progress is reported

**Validation:** Reject wrong type or oversize before upload, naming the limit.

---

### Section 39: Multi-Step Form

**Purpose:** A long task in validated steps. · **Used on:** Sign up, listing submission, complex workflows

**Data requirements:** Steps, the values for each, validation per step.

**Interactions:**

- The user always knows which step they are on and how many remain
- Going forward validates the current step and advances only if it is valid
- Going back returns to the previous step
- Submitting validates every step and submits only if all are valid
- The user can return to any step already completed

---

## DASHBOARD & DATA SECTIONS (7)

### Section 40: Headline figure

**Purpose:** One headline figure. · **Used on:** Dashboards

**Data requirements:** Label (e.g. "Saved Listings"), value (e.g. "5"), trend (up/down with %), optional short trend series.

**Interactions:**

- Opening leads to the detail page
- The figure's description is available on demand

---

### Section 41: Sortable records

**Purpose:** Many records, comparable by column. · **Used on:** Offers, listings, admin, agent dashboard

**Data requirements:** Records with sortable attributes; paging or continuous loading; optional bulk selection.

**Interactions:**

- Any sortable attribute can order the records, ascending or descending
- Opening a record leads to its detail
- Records can be selected for a bulk action, which applies to every selected record

**Device needs:** On narrow screens every column's information stays reachable.

**Accessibility:** Caption describing the columns; sort state announced.

---

### Section 42: Pipeline deal

**Purpose:** One deal in the agent's pipeline. · **Used on:** Agent pipeline

**Data requirements:** Listing address, buyer and offer amount, status, days in stage, last activity, notes.

**Interactions:**

- Dragging a deal to another stage requests that status change
- Opening leads to the deal's detail
- Notes expand on request

**Accessibility:** Every drag outcome also available from the detail without a pointer.

> **Closed 8 Sept · Section 42 drag semantics.** A drop is a request to advance, resolved against what the agent can do (BR6).

---

### Section 43: Activity Feed

**Purpose:** What happened recently. · **Used on:** Dashboard, offer detail

**Data requirements:** Events (viewed, saved, offer made, offer countered, etc.) with timestamp, kind and description.

**Interactions:**

- Opening an event leads to its detail or the item it concerns

**Ordering:** Newest first.

---

### Section 44: Key metrics for a role

**Purpose:** A role's few key numbers. · **Used on:** Dashboard, admin overview

**Data requirements:** 3–4 key metrics, each a number and a trend.

**Interactions:**

- Opening a metric leads to its detail

---

### Section 45: Events by date

**Purpose:** Events by date. · **Used on:** Viewing calendar, agent calendar

**Data requirements:** Events by date for the month; event count per day.

**Interactions:**

- Choosing a date gives that day's events
- Opening an event leads to its detail
- Months can be stepped forward and back

---

### Section 46: Trend or distribution

**Purpose:** A trend or distribution. · **Used on:** Agent analytics, admin reports

**Data requirements:** A series over time, a ranking or a share (varies by metric); series names.

**Interactions:**

- Any data point's value is available on demand, on touch as well as pointer
- Series can be turned on and off

**Accessibility:** Text summary or table alternative; series distinguishable without colour.

---

## NAVIGATION SECTIONS (3)

Version 1 headed these "LAYOUT SECTIONS". Renamed because the sections describe navigation, not layout.

### Section 47: Global navigation

**Purpose:** Global navigation. · **Used on:** All pages

**Interactions:**

- Home is reachable from every page
- A signed-in user reaches their main destinations (search, saved, messages, etc.) and their account (profile, settings, sign out)
- Navigation stays reachable on small screens

---

### Section 48: Site-wide links

**Purpose:** Site-wide links. · **Used on:** All pages (public pages)

**Interactions:**

- Every site page is reachable: About, Help, Blog, Privacy, Terms
- The visitor can follow Keyhold on social media
- The visitor can subscribe to the newsletter

**Rules:** Copyright is stated.

> **Ratified divergences (Section 48).** The linked pages are now written (Pages 28–34). Social links removed until accounts exist. Newsletter signup is back on a double opt-in list (BR14; correction 26 Sept).

---

### Section 49: Portal navigation

**Purpose:** Portal navigation. · **Used on:** Dashboard, agent, admin

**Interactions:**

- Every page of the role's portal is reachable (Dashboard, Saved, Offers, etc.)
- The current location is always identifiable
- Navigation can be collapsed and expanded

**Accessibility:** Current page marked `aria-current`.

---

## STATE & FEEDBACK SECTIONS (3)

### Section 50: Outcome confirmation

**Purpose:** Confirm an outcome that is not otherwise visible. · **Used on:** Everywhere (save, send, error, etc.)

**Data requirements:** Message; kind (success, error, info, warning).

**Interactions:**

- Can be dismissed where dismissal is offered
- Dismisses itself after 5 s
- Several notifications queue

**Rules:** An error you can retry in context is reported with what it concerns, not as a transient notification; success is confirmed this way only when not already visible ([ADR 0013](../../docs/adr/0013-mutation-feedback-is-global-by-default.md)).

---

### Section 51: Focused task or confirmation

**Purpose:** A focused task or confirmation. · **Used on:** Confirmations, forms, details

**Interactions:**

- Every task it holds can be completed or abandoned
- Choosing an action acts or closes
- Closing closes
- Interacting outside closes it only when it is dismissible
- Keyboard: Escape closes
- Locked while its request is in flight (BR10)

---

### Section 52: Empty State

**Purpose:** Explain an absence. · **Used on:** No results, no data

**Interactions:**

- Says what is missing and why, and offers the next useful action (search, create, etc.)

---

## ERROR SECTIONS (3)

Version 1 headed these "ERROR PAGES"; they are sections used by Pages 45–46.

### Section 53: 404 Not Found

**Purpose:** Tell the visitor the page does not exist and help them on. · **Used on:** Invalid routes (Page 45)

**Interactions:**

- The visitor is told the page was not found (404), with a helpful explanation
- Home and the previous page are reachable

---

### Section 54: 500 Server Error

**Purpose:** Tell the user something failed and help them recover. · **Used on:** Server errors (Page 46)

**Interactions:**

- The user is told something went wrong (500), without detail that could aid an attacker
- Retry, and home, are available
- An error ID is given for support

**Rules (security):** The description stays vague; no stack trace or internal detail is disclosed.

---

### Section 55: Offline/No Connection

**Purpose:** Tell the user the connection is lost and let them retry. · **Used on:** Network errors

**Interactions:**

- The user is told there is no connection and to check their internet
- Retry is available

> **Ratified divergence (Phase 1 · Principle 5).** No offline capability exists. This section remains specified for network-error handling.

---

## ADMIN SECTIONS (15)

### Section 56: Admin navigation and identity

**Purpose:** Admin navigation and identity. · **Used on:** Every /admin route

**Data requirements:** Six navigation groups, each with its routes — Overview (Dashboard), Marketplace (Listings, Users), Finance (Transactions, Payments), Insights (Reports), Trust & Safety (Verifications), System (Settings); per route a label, a description and an optional count; current location from the route registry; the signed-in user.

**Interactions:**

- Current route indicated
- The Verifications count reflects pending requests
- Signing out clears auth state and token and redirects to /

**Device needs:** Navigation reachable on narrow screens.

**Accessibility:** Nav landmark with grouped lists, current page marked, sign-out is a real button

---

### Section 57: Platform volume metrics

**Purpose:** Platform volume at a glance. · **Used on:** Admin overview

**Data requirements:** Four metrics, each with label, value, change, trend direction, caption, 6-point trend series and target route; one metric marked featured.

**Interactions:**

- Each metric leads to its detail route

**Accessibility:** Each metric is a single link with an accessible name combining label and value; the trend series is decorative

---

### Section 58: Revenue trend

**Purpose:** Revenue over time. · **Used on:** Admin overview, admin payments

**Data requirements:** Values by month, one or more series; value formatting (divisor, prefix, suffix); optional related finance route.

**Interactions:**

- Each month's value is available on demand
- The admin can go on to the related finance route

**Accessibility:** Text summary of the trend; series names exposed

---

### Section 59: Revenue breakdown

**Purpose:** Where revenue comes from. · **Used on:** Admin overview

**Data requirements:** Headline metric (commissions YTD); supporting metrics: GMV, take rate, average commission per deal.

**Interactions:** None — read only

**Accessibility:** Exposed as a description list

> **Ratified divergence (Page 20 module 5 · revenue breakdown).** Folded into the revenue figure as one estimated commission line (BR17).

---

### Section 60: System Health List

**Purpose:** Which systems are healthy. · **Used on:** Admin overview

**Data requirements:** Per system: label, uptime, error rate, state (operational / degraded); overall uptime and error rate over 24h.

**Accessibility:** State conveyed by text, not colour alone

---

### Section 61: System Alert List

**Purpose:** What needs an operator. · **Used on:** Admin overview

**Data requirements:** Per alert: title, description, relative time, severity (info / warning / error); alert count.

**Accessibility:** Alerts are a list; severity is stated in text

> **Ratified divergence (Page 20 module 4 · system alerts).** Merged with Section 62 into one "Needs a Decision" list: each queue's open count and oldest-item age, oldest first.

---

### Section 62: Moderation Queue Summary

**Purpose:** How much review work is waiting. · **Used on:** Admin overview

**Data requirements:** Per queue — pending verifications, listings awaiting review, flagged content: count, severity (warning / error), target route.

**Interactions:** Opening a queue leads to the matching moderation route

**Accessibility:** Each queue is a link naming both the count and the queue

> **Ratified divergence (Page 20 module 4 · system alerts).** See Section 61. Flagged content counts user and message flags only.

---

### Section 63: Moderation listing records

**Purpose:** The moderation queue as records. · **Used on:** Admin listings · **Extends:** Section 15

**Data requirements:** Per listing: id, address, cover photo, price, agent (name, email, phone), submitted date, description, image set, compliance checks (label + pass / warn / fail), status (pending / flagged / approved / rejected), flag reason, moderator note, changes-requested flag. Totals: queue size, total value, open compliance checks.

**Interactions:**

- Status filters switch the visible set and reset selection
- Sort by any attribute; default order by status
- Opening a listing gives its photos, description, flag reason, compliance checklist and agent contact
- Approve, request changes or reject, for one listing or for a selection
- A listing already approved is not offered approval, and one already rejected is not offered rejection

**Accessibility:** Table caption describes every column; action columns have screen-reader-only names; flagged and rejected listings identifiable without colour

---

### Section 64: Moderation decision

**Purpose:** Record a reasoned decision. · **Used on:** Admin listings

**Data requirements:** Mode (reject or request changes); target ids (one listing or a selection); a required note.

**Interactions:**

- The decision cannot be submitted until the note is non-empty (whitespace does not count)
- Reject → status rejected, note attached
- Request changes → status returns to pending, flagged as changes requested
- Closing or submitting clears the note and the selection for affected listings

**Accessibility:** Focus trapped, labelled dialog, Escape closes, the note has a visible label

---

### Section 65: User accounts and standing

**Purpose:** Every account and its standing. · **Used on:** Admin users

**Data requirements:** Per user: id, name, email, role (buyer / agent / admin), tier (standard / premium / platinum), join date, status (active / suspended / inactive), transaction count.

**Interactions:**

- Sort by any attribute; default order by name ascending
- Tier ranked for sorting
- Each user can be suspended or reactivated
- Reactivate or suspend a selection at once
- Opening a user leads to their profile (`/admin/users/:id`)

**Accessibility:** Caption names every column; status is text; suspended users identifiable without colour

---

### Section 66: Transaction ledger

**Purpose:** Every deal's money. · **Used on:** Admin transactions

**Data requirements:** Per transaction: id, property address, buyer, agent, sale price, commission (price × platform rate — BR17), initiated date, status (pending / escrow / completed). Totals for price and commission.

**Interactions:**

- Sort by any attribute
- Opening a transaction leads to the deal

**Accessibility:** Totals are announced as part of the table; escrow status identifiable without colour

---

### Section 67: Verification Request List

**Purpose:** Identity and tier requests to decide. · **Used on:** Admin verifications

**Data requirements:** Per request: id, name, email, current tier, requested tier, status (pending / approved / rejected), submitted date, document count.

**Interactions:**

- What can be done depends on status: pending → approve, review documents, reject; approved → view details, revoke; rejected → view reason, allow resubmission
- A decision moves the request to its new status and updates the counts and the navigation count

**Accessibility:** Status is text; each action names the subject

---

### Section 68: Platform configuration values

**Purpose:** Platform and marketplace values. · **Used on:** Admin settings

**Data requirements:** Config values keyed by name, each with its type and unit (e.g. %, $, days).

**Interactions:**

- Editing any value clears the saved state
- Saving is a page-level action (Page 27)
- Reset restores stored values

**Accessibility:** Every value has a real label; the unit is stated in the label or accessible name, not only by a prefix or suffix

---

### Section 69: Policy settings

**Purpose:** Moderation and operations policies. · **Used on:** Admin settings

**Data requirements:** Per policy: title, description of its consequence, default state.

**Interactions:** Switching a policy takes effect immediately; its description explains the consequence

**Accessibility:** Switch role with the title as its accessible name and the description as help text

---

### Section 70: Maintenance operations

**Purpose:** Operational and destructive maintenance. · **Used on:** Admin settings

**Interactions:** Kept apart from ordinary configuration; destructive operations require confirmation before running (BR10)

**Accessibility:** Destructive actions state their effect in their name

---

## Regeneration Notes

- **Retained:** all 70 sections with their numbers, headings, "Used on", interactions and accessibility notes. (Version 2.0 also retained each section's content model; the 30 September pass below converted it.)
- **Added:** Section Defaults table; a Purpose line per section; validation for Sections 16 and 38; data requirements for Section 10; Sections 26–29 split out by name from one heading (Section 29 remains unnamed and reserved); divergence pointers.
- **Changed — dropped as visual prescription (version 2.0):** every "Layout:" line (e.g. "Full-width, centered text overlay on image", "Horizontal scrollable carousel on mobile, 2-3 column grid on desktop", "Grid (2x2 on desktop, 1 on mobile)", "Timeline visual or 4-column grid", "Hero image + carousel, thumbnails below", "Horizontal bar, sticky on scroll", "3-5 boxes in row", "Full-width map container, 400px min height", "Table on desktop, cards on mobile", "Vertical card, 300px wide", "Grid card (2-3 per row desktop, 1 mobile)", "Chat bubble style (mine on right, theirs on left)", "Fixed at bottom or inline", "Label above input", "Stack vertically", "Card (100-150px)", "Standard calendar grid", "Multi-column on desktop, stacked on mobile", "Fixed bottom-right (or top-right), slides out/in", "Centered overlay, darken background", "Centered, centered vertically", "Full-height flex — fixed sidebar…", "Responsive grid, 4 columns at desktop", "Panel wrapper with fixed-height chart", "Stacked rows separated by the quiet divider token", "Card per request — identity block left…", "Panel wrapping a two-column field grid", "Stacked rows, switch right-aligned", "Panel placed last, visually separated"); every "Responsive:" column count and aspect ratio; "Background image (aspirational lifestyle)"; hover effects ("Hover → enlarge", "Hover step → highlight", "Hover row → highlight both cells", "Hover → enlarge/shadow"); "Focus → label color change, border highlight"; "Error state → red border"; "Icon or illustration" / icon slots; "Star icon", "star toggle"; "Trend chip colours by direction"; "State drives dot tone and text colour"; "Tone sets the leading indicator"; "Role rendered as a colour-coded chip, tier as coloured text"; "Commission rendered as an accent chip"; "Status tints the initiated date"; "tinted background" rows; "numeric columns use tabular figures"; "danger variant"; "Timestamp moves below the title on mobile"; "Chart scales to container; labels thin out"; chart types ("Bar chart, line chart, pie chart", "Column chart"). Where a dropped line carried behaviour it survives in neutral words (e.g. tinted rows → "identifiable without colour").
- **Changed — provider neutral:** Section 10 "Google Map centered on address" → "Map centred on the address"; the map provider is a code decision recorded in [ADR 0015](../../docs/adr/0015-map-surfaces-wait-on-coordinates.md) (MapLibre GL, OpenFreeMap).
- **Changed — renamed:** "LAYOUT SECTIONS" → "NAVIGATION SECTIONS"; "ERROR PAGES" → "ERROR SECTIONS"; the Offer group count corrected from "(10)" to "(6)" and the Listing group from "(15)" to "(10)" — no section removed.
- **Changed — screen content removed (30 September 2026, seed-prompt Self-Audit):**
    - **Field removed:** every "Content Model" block (Sections 1–25, 30–46, 47–70). Data in it moved to **Data requirements**; behaviour to **Interactions**; requirements to **Rules** or **Accessibility**. Blocks that were pure inventories (Sections 4, 5, 47–55) were replaced by what the section must let the user do or know. No section had a "Controls" field or a component-building technical note; the Section Defaults' data default was reworded from "receive rows as props from their route's console" to data ownership.
    - **Relocated as requirements:** Sections 1, 3 and 5 — marketplace figures must be true and reviews quoted with consent (Rules, BR15); Section 48 — copyright stated (Rules); Section 54 — error description stays vague, no internal detail disclosed (Rules, security); Section 63 — flagged/rejected listings identifiable without colour moved from interactions to Accessibility, and "Approve hidden when already approved" (from Page 21) added as a rule; Section 65 and 66 — "identifiable without colour" moved to Accessibility; Section 68 — unit stated in the label or accessible name.
    - **Dropped as screen content:** headline and CTA copy ("Find Your Next Home", "Search 10k+ properties", "Ready to get started?", "Join 10k+ buyers today", "Something went wrong", "Page not found", "Check your internet" as prescribed headings — the messages survive as what the user is told); "CTA buttons", "Search input", "Drop zone", "'Choose file' button", "Step indicator (1/3…)", "Next, Back, Submit", "Text input field", "Send", "Placeholder text", "Month/year controls", "Column headers (sortable)", "Brand block: 'Admin' / 'Console'", "Brand", "Menu items", "Panel title and description", "Title / Content / Actions (OK, Cancel, Delete) / Close" for dialogs, "Headline / Description / Next action" for empty states, "Data points, legend", "Label (required indicator)"; placement words in interactions ("Click", "Button →", "Header →", "Row actions", "Footer totals", "Legend → toggle series", "Photo → full profile"); "Used on" wording "bottom of many pages", "Make offer dialog/page", "search card", "filter panel".
- **Changed — sections renamed by job (2 October 2026, No Visual Prescription):** 42 section headings and one group heading named a presentation or a container (hero, carousel, banner, card, bar, timeline, header, footer, sidebar, toast, modal, shell, grid, panel, table, widget) or the control a section was assumed to be built from (input field, checkbox group, radio button group, dropdown, date picker, slider, toggle). Each now names the job it does. Only names changed: every section keeps its number, purpose, data requirements, interactions, rules, divergence notes and Phase 8 status, and no section was added, merged or removed. The intro's statement that presentational headings are "kept as an identifier only" is superseded — numbers are the identifiers. Built files and Phase 6 contracts keep their own names (e.g. Section 5 is built as `cta-banner`; C13 is still "Modal / Dialog"). The record, per Scope Preservation:

| #         | Was                           | Now                              |
| --------- | ----------------------------- | -------------------------------- |
| Group 1–5 | HERO SECTIONS (5)             | DISCOVERY SECTIONS (5)           |
| 1         | Hero Search                   | Start a property search          |
| 2         | Featured Carousel             | Featured listings                |
| 5         | CTA Banner                    | Prompt to act                    |
| 6         | Listing Gallery               | Listing photos                   |
| 7         | Listing Price Bar             | Listing price and actions        |
| 12        | Agent Card                    | Listing agent contact            |
| 13        | Listing Card (Search Results) | Listing summary                  |
| 14        | Listing Status Timeline       | Listing deal history             |
| 17        | Offer Status Card             | Offer status                     |
| 18        | Offer Timeline                | Negotiation history              |
| 23        | Message Input                 | Compose a message                |
| 27        | Thread Header                 | Conversation details and actions |
| 30        | Input Field                   | Enter a value                    |
| 31        | Checkbox Group                | Choose several options           |
| 32        | Radio Button Group            | Choose one option                |
| 33        | Dropdown/Select               | Choose from a long set           |
| 34        | Date Picker                   | Choose a date                    |
| 35        | Price Slider                  | Narrow by price                  |
| 36        | Toggle/Switch                 | Switch a setting on or off       |
| 37        | Search Input (Autocomplete)   | Search with suggestions          |
| 40        | Stat Card                     | Headline figure                  |
| 41        | Data Table                    | Sortable records                 |
| 42        | Pipeline Card (CRM-style)     | Pipeline deal                    |
| 44        | Quick Stats Widget            | Key metrics for a role           |
| 45        | Calendar Widget               | Events by date                   |
| 46        | Chart/Graph                   | Trend or distribution            |
| 47        | Header                        | Global navigation                |
| 48        | Footer                        | Site-wide links                  |
| 49        | Sidebar Navigation            | Portal navigation                |
| 50        | Toast Notification            | Outcome confirmation             |
| 51        | Modal/Dialog                  | Focused task or confirmation     |
| 56        | Admin Console Shell           | Admin navigation and identity    |
| 57        | Volume Metrics Grid           | Platform volume metrics          |
| 58        | Revenue Trend Panel           | Revenue trend                    |
| 59        | Revenue Breakdown Panel       | Revenue breakdown                |
| 63        | Moderation Listings Table     | Moderation listing records       |
| 64        | Moderation Decision Modal     | Moderation decision              |
| 65        | User Management Table         | User accounts and standing       |
| 66        | Transaction Ledger Table      | Transaction ledger               |
| 68        | Platform Config Panel         | Platform configuration values    |
| 69        | Policy Toggle Panel           | Policy settings                  |
| 70        | Maintenance Panel             | Maintenance operations           |

---

**Phase 5 Complete.** All 70 sections specified by job, data and behaviour. They compose the 46 pages in Phase 4. Next: [Phase 6 — Interaction Contracts](phase-6-interaction-contracts.md).

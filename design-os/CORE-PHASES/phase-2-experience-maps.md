# Phase 2: Experience Maps

**Keyhold Design Operating System** · Phase 2 of 9 · Version 2.0 · 29 September 2026

Core user journeys and emotional arcs, designed before pages. Previous: [Phase 1 — Product Vision](phase-1-product-vision.md) · Next: [Phase 3 — Information Architecture](phase-3-information-architecture.md).

Experience maps describe intent, behaviour and feeling. They never describe what a screen looks like. Build status for every journey lives in [Phase 8](phase-8-implementation-roadmap.md#flows).

---

## Contents

1. [Overview](#overview)
2. Marketplace journeys: [1 Search](#journey-1-search--discovery) · [2 Listing Detail](#journey-2-listing-detail--evaluation) · [3 Viewing](#journey-3-viewing-coordination) · [4 Offer](#journey-4-offer-workflow) · [5 Messaging](#journey-5-real-time-messaging) · [6 Authentication](#journey-6-authentication) · [7 Profile](#journey-7-profile--preferences)
3. Operator journeys: [8 Health Triage](#journey-8-platform-health-triage) · [9 Moderation](#journey-9-listing-moderation) · [10 Verification](#journey-10-tier-verification-review) · [11 Enforcement](#journey-11-user-enforcement) · [12 Revenue](#journey-12-revenue--payout-oversight) · [13 Configuration](#journey-13-platform-configuration)
4. Added journeys: [14 Buyer Dashboard](#journey-14-buyer-dashboard-check-in) · [15 Agent Desk](#journey-15-agent-daily-desk) · [16 Listing Submission](#journey-16-listing-submission--lifecycle) · [17 Deposit & Closing](#journey-17-deposit-escrow--closing) · [18 Report & Dispute](#journey-18-report-flag--dispute) · [19 Notifications](#journey-19-notifications--alerts)
5. [Emotional Arc Summary](#emotional-arc-summary)
6. [Regeneration Notes](#regeneration-notes)

---

## Overview

Nineteen user journey maps. Journeys 1–13 are carried from version 1 unchanged in scope; Journeys 14–19 are added in this regeneration to cover the role dashboards and supporting flows the master prompt requires (see [Regeneration Notes](#regeneration-notes)).

| Group                   | Journeys | Actors                         | Register                               |
| ----------------------- | -------- | ------------------------------ | -------------------------------------- |
| Primary flows           | 1–4      | Buyer, agent/seller            | Hope, focus, commitment                |
| Supporting flows        | 5–7, 17–19 | All roles                    | Reassurance, control                   |
| Role dashboards         | 8, 14, 15 | Admin, buyer, agent/seller    | Orientation — "what needs me now?"     |
| Operator flows          | 8–13, 18 | Admin                          | Vigilance and accountability           |
| Listing supply          | 16       | Agent/seller                   | Care, completeness                     |

Journeys 1-7 are marketplace-facing (buyer, agent, seller). Journeys 8-13 are operator-facing (admin) — the emotional register there is vigilance and accountability rather than hope and excitement.

Each journey carries an **Experience frame** (intent, trigger, entry points, decision points, recovery paths, completion criteria, dependencies) plus its steps, emotional states, system behaviour and failure paths.

---

## Journey 1: Search & Discovery

**Actor:** Buyer | **Duration:** 5-15 minutes | **Frequency:** 2-3 sessions/week

**Experience frame**

- **Intent:** Find properties worth a closer look.
- **Trigger:** A buying need, a saved-search reminder, a shared link.
- **Entry points:** `/` (search entry, browse index, neighbourhood shortcuts), `/search`, `/map`, header search.
- **Decision points:** Which filters to apply; list vs map; which result to open; save or skip.
- **Recovery paths:** Clear or relax filters; switch to map; browse by type, price band or neighbourhood.
- **Completion criteria:** At least one listing opened or saved.
- **Dependencies:** Property search API (filters, facet counts, bounding box), saved-properties API, map tiles.

### Steps

| Step | User Action            | Emotional State | System Behavior                             | Success Criteria     |
| ---- | ---------------------- | --------------- | ------------------------------------------- | -------------------- |
| 1    | Opens app              | Curious/hopeful | Show search entry + featured listings       | Fast load (<1s)      |
| 2    | Enters search criteria | Focused         | Auto-complete, show filters                 | Filters feel natural |
| 3    | Views results          | Scanning        | Show 20 results, map, sorting               | Results match intent |
| 4    | Refines filters        | Deliberate      | Live filter updates                         | <500ms response      |
| 5    | Sees saved count       | Encouraged      | Saved count updates ("Saved 3")             | Clear feedback       |
| 6    | Scrolls/pages results  | Browsing        | Pagination or infinite scroll               | Feels fast           |
| 7    | Saves listing          | Satisfied       | Confirms "Saved"; listing marked as saved   | Permanent save       |

### Failure Paths

- No results → Show "Try adjusting filters" + suggestions
- Results feel irrelevant → Show comparables to help user evaluate
- Slow search → Show a loading state that keeps the results' structure
- Search service fails → Say listings are unavailable, never show an empty market (Page 1 · States divergence)

### Emotional Arc

Hopeful → Focused → Satisfied (or frustrated if results miss mark)

---

## Journey 2: Listing Detail & Evaluation

**Actor:** Buyer | **Duration:** 10-20 minutes | **Frequency:** 1-2x per promising listing

**Experience frame**

- **Intent:** Decide whether this property deserves a viewing or an offer.
- **Trigger:** Opening a result, a saved listing, an alert or a shared link.
- **Entry points:** `/listing/:id` from search, map, home, saved, alerts, messages.
- **Decision points:** Keep evaluating or leave; save; message; request a viewing; make an offer; report.
- **Recovery paths:** Unavailable listing → back to search with similar results; failed map → text neighbourhood facts.
- **Completion criteria:** A viewing requested, an offer submitted, a save, or a deliberate exit.
- **Dependencies:** Property detail, nearby places (Overpass), comparables, agent profile and reviews, view recording (BR16).

### Steps

| Step | User Action         | Emotional State | System Behavior                                 | Success Criteria          |
| ---- | ------------------- | --------------- | ----------------------------------------------- | ------------------------- |
| 1    | Clicks listing      | Intrigued       | Load photos, description, map                   | Primary photo loads fast  |
| 2    | Steps through photos | Evaluating     | Next/previous, full-screen option               | Photos load quickly       |
| 3    | Reads details       | Investigating   | Description, beds/baths, price, tax             | Facts easy to scan        |
| 4    | Checks neighborhood | Curious         | Map, nearby schools, transit, walkability       | Interactive map works     |
| 5    | Sees comps          | Confident       | 3-5 similar recent sales                        | Data is transparent       |
| 6    | Reads agent bio     | Trusting        | Photo, name, reviews, response time             | Feels human, credible     |
| 7    | Schedules viewing   | Committed       | Calendar, time slots, easy confirmation         | Instant confirmation      |
| 8    | Or makes offer      | Serious         | Pre-filled buyer info, offer amount, conditions | Form is fast              |

### Failure Paths

- Photos missing → Show placeholder + agent contact option
- Map not loading → Show text-based neighborhood info
- Agent not responsive → Show alternative agents or buyer option
- Nearby-place lookup fails → Show no places rather than invented ones; retry soon (RATIFIED_DIVERGENCES › map notes)

### Emotional Arc

Intrigued → Evaluating → Confident → Committed (or doubtful → exit)

---

## Journey 3: Viewing Coordination

**Actor:** Buyer + Agent | **Duration:** 2 days total (scheduling + showing)

**Experience frame**

- **Intent:** See the property in person (or virtually) at a time that works for both sides.
- **Trigger:** A promising listing (Journey 2).
- **Entry points:** Listing detail "Request a viewing"; buyer `/dashboard/viewings`; agent `/agent/requests` and `/agent/calendar`.
- **Decision points:** Buyer picks a time; agent confirms, declines or proposes another; either side reschedules or cancels.
- **Recovery paths:** Declined → pick another slot; conflict → next available slot; cancellation always possible before the showing.
- **Completion criteria:** Viewing confirmed, attended, and optionally rated.
- **Dependencies:** Viewing request API, agent calendar, optional Google Calendar push (Page 19), notifications.

### Buyer Steps

1. Selects viewing time from agent's calendar
2. Confirms in-app
3. Gets reminder 24 hours before
4. Receives post-showing survey request
5. Can message agent questions before viewing

### Agent Steps

1. Lists available times
2. Receives buyer confirmation notification
3. Gets reminder before showing
4. Can share listing notes, neighborhood tips
5. Collects feedback after showing

### Pain Points

- Timezone confusion → Show in buyer's local timezone
- Calendar conflicts → Show next available slot
- Agent non-responsive → Escalation path or alternative

### Emotional Arc

**Buyer:** Anticipation → Excitement (at showing) → Reflection
**Agent:** Prepared → Engaged → Documented

---

## Journey 4: Offer Workflow

**Actor:** Buyer + Agent + Seller Agent | **Duration:** 2-7 days

**Experience frame**

- **Intent:** Agree a price and terms.
- **Trigger:** A buyer ready to commit after evaluation or a viewing.
- **Entry points:** Listing detail "Make an offer"; `/dashboard/offers`; agent `/agent/requests` and `/agent/pipeline`.
- **Decision points:** Amount, move-in date, contingencies, earnest money; accept / counter / decline / withdraw at each round.
- **Recovery paths:** Declined → new offer; countered → counter-counter; withdrawal before acceptance.
- **Completion criteria:** Offer accepted and closing milestones created (BR7), or offer closed by decline/withdrawal.
- **Dependencies:** Offers API, messaging, milestones, notifications.

### Timeline

```
Day 1: Buyer creates offer (amount, conditions, contingencies)
       System routes to listing agent
       Listing agent alerts seller

Day 1-2: Seller reviews, counters or accepts
         Buyer notified immediately
         Chat thread opens for negotiation

Day 2-5: Counter-offer → Counter-counter...
         Chat history visible, all terms tracked
         Either party can accept or decline

Day 5+: Offer accepted
        Both parties notified
        System guides to next steps (inspection, appraisal, etc.)
```

### User Actions (Buyer Perspective)

1. Navigate to "Make Offer"
2. Enter offer amount, move-in date, contingencies
3. Review terms, submit
4. **Receive notification:** "Offer received!" → Seller countered at $X
5. Review counter, decide: accept/counter/decline
6. If counter: enter new amount, message (optional)
7. Submit counter
8. **Wait** for seller response
9. **Notification:** "Offer accepted!" → Next steps form

### Emotional States

- **Creating offer:** Nervous/hopeful (entering a number is commitment)
- **Waiting for response:** Anxious/excited
- **Counter arrives:** Deflated (if much higher) or relieved (if close)
- **Accepted:** Euphoric/terrified (just made huge purchase!)

### System Behavior

- Real-time notifications (not next day) _(deferred — no real-time transport)_
- Clear timeline of all offers/counters
- Message thread for questions
- Contingency templates (inspection, appraisal, financing)
- Clear next steps at each stage
- Submission is confirmed through a review step before it is sent, and never sent twice (BR10)

---

## Journey 5: Real-Time Messaging

**Actor:** Buyer + Agent + Other Agents | **Duration:** Ongoing (deal progress)

**Experience frame**

- **Intent:** Ask and answer questions without leaving the deal.
- **Trigger:** A question on a listing, a viewing, an offer or a document.
- **Entry points:** `/dashboard/messages`, offer detail thread, listing "Message agent", compose from a connection.
- **Decision points:** Reply, attach a document, report a message.
- **Recovery paths:** Failed send stays in the composer for a deliberate retry (BR10).
- **Completion criteria:** Message delivered and visible to the recipient.
- **Dependencies:** Messages API, connections (threads open on an accepted connection), attachments upload, flags.

### Scenarios

**Scenario A: Quick Questions**

- Buyer: "When can I see this again?"
- Agent: Reply within 2 hours (shows online status)
- Buyer sees typing indicator
- Message persists in listing detail page

**Scenario B: Multi-Party Negotiation**

- Buyer + Buyer's Agent + Listing Agent + Seller's Agent
- Group chat auto-created when offer made
- All can see message history
- Notifications only for relevant parties

**Scenario C: Document Sharing**

- Agent shares inspection report
- Buyer can view in-app, download, or forward
- Timestamps show when agent shared, when buyer viewed

### Emotional Arc

Empowered (fast communication) → Trusting (responsive agent) → Relaxed (knows next step)

> **Deferred (Phase 1 · Competitive table).** No real-time transport; the recipient may see a message only after the thread's stale time. Scenario B depends on the representation model (Agent JTBD 4, deferred).

---

## Journey 6: Authentication

**Actor:** New User (Buyer) | **Duration:** 3-5 minutes

**Experience frame**

- **Intent:** Get an account and start acting (save, offer, list).
- **Trigger:** A gated action (save, offer, message, schedule — BR18) or a direct sign-up.
- **Entry points:** `/signup`, `/login`, `/reset-password`, `/verify-email`, sign-in gate on gated actions.
- **Decision points:** Email or social sign-in; role; verify now or later.
- **Recovery paths:** Existing account → sign in; expired code → resend; forgotten password → emailed reset link.
- **Completion criteria:** Signed in and returned to the action or the role's portal.
- **Dependencies:** Auth API, OAuth providers, SMTP (BR13).

### Steps

| Step | User Action             | System Behavior             | Validation                   |
| ---- | ----------------------- | --------------------------- | ---------------------------- |
| 1    | Clicks "Sign Up"        | Show form: email + persona  | -                            |
| 2    | Enters email            | Check if registered         | Real-time feedback           |
| 3    | Checks email for code   | Send OTP                    | OTP via email (6 digits)     |
| 4    | Enters OTP              | Verify, show password form  | Attempt limit: 3x            |
| 5    | Sets password           | Strength meter              | 8+ chars, mixed case/number  |
| 6    | Optional: Social        | Google/Apple/Facebook flow  | Faster for some users        |
| 7    | Phone number (optional) | SMS notifications opt-in    | Pre-filled if social gave it |
| 8    | Confirm persona         | Buyer/Agent/Seller selector | Clear descriptions           |
| 9    | Done → Home             | Show next steps for persona | Immediate value              |

### Failure Paths

- Email already registered → "Account exists, sign in" + forgot password link
- OTP expired → "Resend code" option
- Password weak → Clear requirements + try again
- Social auth fails → Fallback to email signup
- Provider unconfigured → Return to sign-in saying the provider is unavailable, never fail silently

### Emotional Arc

Excited → Reassured (validation feedback) → Ready (persona chosen)

> **Divergences.** Apple sign-in deferred; password reset uses an emailed link rather than OTP (ratified); verification does not gate (BR13). See RATIFIED_DIVERGENCES.

---

## Journey 7: Profile & Preferences

**Actor:** Buyer | **Duration:** 5-10 minutes (one-time + updates)

**Experience frame**

- **Intent:** Control identity, contact preferences and privacy.
- **Trigger:** First sign-in, a notification annoyance, a security concern, identity verification.
- **Entry points:** `/dashboard/settings`, `/agent/settings`, account menu.
- **Decision points:** What to change; whether to verify identity; whether to delete the account.
- **Recovery paths:** Unsaved changes warn before loss; destructive account actions confirm first (BR10).
- **Completion criteria:** Change saved and confirmed.
- **Dependencies:** Users API, avatar upload, KYC submission, notification preferences.

### Profile Section

- Profile photo (optional)
- Saved search preferences
- Notification settings (email, SMS, in-app)
- Communication preferences (call, text, email, instant message)
- Privacy settings (show/hide profile to agents)
- Identity verification submission with review state and rejection reason shown back

### Actions

- Update password
- Change email/phone
- Delete account
- Download data (GDPR)

### Emotional Arc

Confident (taking control) → Personalized (preferences saved)

---

## Journey 8: Platform Health Triage

**Actor:** Admin | **Duration:** 2-5 minutes | **Frequency:** Start of every shift, 2-3x daily

**Entry point:** /admin

**Experience frame**

- **Intent:** Know within seconds what needs attention.
- **Trigger:** Start of shift; an alert.
- **Decision points:** Which queue to open first (oldest item first).
- **Recovery paths:** Stale data → refresh; a panel fails → the rest keep rendering.
- **Completion criteria:** The admin lands in the queue that most needs a decision.
- **Dependencies:** Stats API, service health, queue counts (verifications, listings, flags, disputes, escrow), audit log.

### Steps

| Step | User Action                | Emotional State | System Behavior                                     | Success Criteria               |
| ---- | -------------------------- | --------------- | --------------------------------------------------- | ------------------------------ |
| 1    | Opens admin console        | Vigilant        | Navigation shows the pending count                  | Count accurate on first load   |
| 2    | Scans volume metrics       | Assessing       | Volume metrics with trend                           | Direction readable at once     |
| 3    | Reads system health        | Alert           | Uptime, error rate, per-system state                | Degraded system stands out     |
| 4    | Scans alert list           | Prioritising    | Alerts ordered by recency, severity stated          | Severity obvious               |
| 5    | Reads moderation queue     | Deciding        | Pending verifications, review queue, flagged        | Counts link to their route     |
| 6    | Clicks into the worst item | Committed       | Deep-links to the filtered queue                    | Lands in context, not a list   |

### Failure Paths

- All systems degraded → Health status is the first thing reported, with a global alert
- Alert with no owning route → Alert must still name what to do next
- Stale counts → Badge and page counts disagree; both read from one source

### Emotional Arc

Vigilant → Assessing → Decisive (or overwhelmed if severity is not ranked)

> **Ratified divergence (Page 20).** Alerts and the moderation queue are one "Needs a Decision" list, each queue with its count and oldest-item age. See RATIFIED_DIVERGENCES › Admin overview rebuild.

---

## Journey 9: Listing Moderation

**Actor:** Admin | **Duration:** 30 seconds - 4 minutes per listing | **Frequency:** Daily, batched

**Entry point:** /admin/listings, usually via the overview queue

**Experience frame**

- **Intent:** Clear the review queue with a defensible decision per listing.
- **Trigger:** Pending or flagged listings.
- **Decision points:** Approve, request changes, reject — single or bulk.
- **Recovery paths:** Request Changes returns a listing to pending with the note attached.
- **Completion criteria:** Listing leaves the pending count with a recorded decision (BR4).
- **Dependencies:** Moderation API, compliance checks, agent contact, audit log.

### Steps

| Step | User Action                 | Emotional State | System Behavior                                                                   | Success Criteria              |
| ---- | --------------------------- | --------------- | --------------------------------------------------------------------------------- | ----------------------------- |
| 1    | Filters to Pending/Flagged  | Focused         | Status filters with counts, selection resets                                      | Queue narrows instantly       |
| 2    | Scans compliance column     | Screening       | Pass/warn/fail signals per row                                                    | Problem rows readable at once |
| 3    | Opens a row                 | Investigating   | Detail view: photos, description, flag reason, compliance checklist, agent contact | Everything needed, no new tab |
| 4    | Approves clean listing      | Confident       | Status flips, row leaves pending count                                            | One click, no dialog          |
| 5    | Rejects or requests changes | Deliberate      | Modal demands a note before submitting                                            | Cannot act without a reason   |
| 6    | Selects a batch             | Efficient       | Bulk actions: Approve / Request Changes / Reject                                  | Same rules apply in bulk      |

### Failure Paths

- Ambiguous listing → Request Changes returns it to pending with the note attached
- Empty filter result → "No listings match this filter right now"
- Accidental bulk action → Note requirement forces a deliberate pause on destructive paths

### Emotional Arc

Focused → Investigating → Decisive → Accountable (the note is the audit trail)

---

## Journey 10: Tier Verification Review

**Actor:** Admin | **Duration:** 2-6 minutes per request | **Frequency:** Daily

**Entry point:** /admin/verifications, often from the navigation count

**Experience frame**

- **Intent:** Decide an identity or tier-upgrade request on its evidence.
- **Trigger:** A pending request (fed by buyer and agent settings — Section 38 / Journey 7).
- **Decision points:** Approve, reject (with reason), revoke, allow resubmit.
- **Recovery paths:** Every decision is reversible (revoke, allow resubmit).
- **Completion criteria:** Request carries a decision; counts and navigation count update.
- **Dependencies:** KYC API, documents, audit log.

### Steps

| Step | User Action              | Emotional State | System Behavior                                            | Success Criteria          |
| ---- | ------------------------ | --------------- | ---------------------------------------------------------- | ------------------------- |
| 1    | Notices the pending count | Prompted       | Navigation shows pending total                             | Matches the page count    |
| 2    | Reads the request        | Evaluating      | Name, email, current → requested tier, doc count           | Upgrade path obvious      |
| 3    | Reviews documents        | Diligent        | Review Docs opens the submitted evidence                   | Documents load in context |
| 4    | Approves or rejects      | Judging         | Request moves status, counts update                        | Immediate, visible change |
| 5    | Revisits a past decision | Accountable     | Approved → Revoke; Rejected → View Reason / Allow Resubmit | Decisions are reversible  |

### Failure Paths

- Insufficient documents → Reject with reason, applicant can resubmit
- Wrongly approved → Revoke path exists on approved requests
- Platinum request from a standard tier → Upgrade path shown explicitly, not inferred

### Emotional Arc

Prompted → Diligent → Judging → Accountable

---

## Journey 11: User Enforcement

**Actor:** Admin | **Duration:** 1-3 minutes | **Frequency:** Weekly, or triggered by an alert

**Entry point:** /admin/users

**Experience frame**

- **Intent:** Restore or restrict an account's standing.
- **Trigger:** A report, a flag upheld, a repeated rejection, an alert.
- **Decision points:** Suspend, reactivate, open the user's profile (`/admin/users/:id`).
- **Recovery paths:** Reactivate restores standing immediately.
- **Completion criteria:** Standing changed and reflected in counts.
- **Dependencies:** Users API, suspensions API, audit log.

### Steps

| Step | User Action           | Emotional State | System Behavior                                           | Success Criteria           |
| ---- | --------------------- | --------------- | --------------------------------------------------------- | -------------------------- |
| 1    | Opens user management | Purposeful      | States active vs total                                    | Standing visible at once   |
| 2    | Sorts or filters      | Searching       | Sort by any column, default by name                       | Target found fast          |
| 3    | Reads the row         | Assessing       | Role, tier, join date, deal count, status                 | Context without opening    |
| 4    | Suspends the account  | Resolute        | Status flips, row marked suspended, action becomes Reactivate | Reversible, visibly marked |
| 5    | Suspends in bulk      | Efficient       | Bulk actions: Reactivate / Suspend                        | Header count updates       |

### Failure Paths

- Wrong user suspended → Reactivate restores standing immediately
- High-value agent → Deal count is visible before acting
- Empty result → "No users to show"

### Emotional Arc

Purposeful → Assessing → Resolute (with reversal always one click away)

---

## Journey 12: Revenue & Payout Oversight

**Actor:** Admin | **Duration:** 10-20 minutes | **Frequency:** Weekly, plus month-end close

**Entry point:** /admin/transactions → /admin/payments → /admin/reports

**Experience frame**

- **Intent:** Confirm money is moving correctly and settle what is outstanding.
- **Trigger:** Weekly review, month-end close, a stuck escrow.
- **Decision points:** Release or refund a hold (refund needs a reason — BR3); export.
- **Recovery paths:** Totals always derive from the same rows; a failed settlement stays in the queue.
- **Completion criteria:** Outstanding payouts settled; figures exported match on-screen.
- **Dependencies:** Transactions, escrow, stats and reports APIs; BR1, BR2, BR17.

### Steps

| Step | User Action                 | Emotional State | System Behavior                                          | Success Criteria              |
| ---- | --------------------------- | --------------- | -------------------------------------------------------- | ----------------------------- |
| 1    | Opens transactions          | Analytical      | Volume, commission and completed stats                   | Totals reconcile with table   |
| 2    | Inspects deals in escrow    | Watchful        | Deals in escrow flagged by status                        | Stuck deals stand out         |
| 3    | Moves to payments           | Focused         | Revenue stats, monthly trend, commission/fee breakdown   | Trend legible at a glance     |
| 4    | Reads the pending warning   | Concerned       | Pending payouts warning with outstanding amount          | Amount and cause both stated  |
| 5    | Releases payouts            | Decisive        | Process action, average processing time shown            | Expectation set before action |
| 6    | Opens reports for the story | Reflective      | GMV, growth, region ranking, user mix                    | Explains the numbers above    |
| 7    | Exports                     | Satisfied       | Download / Generate Custom                               | Figures match on-screen       |

### Failure Paths

- Totals disagree between stats and table footer → One derivation, computed from the same rows
- Nothing outstanding → Pending warning is hidden rather than shown empty
- No regional data → Show an empty state, not an axis with no bars

### Emotional Arc

Analytical → Watchful → Decisive → Satisfied

---

## Journey 13: Platform Configuration

**Actor:** Admin | **Duration:** 3-10 minutes | **Frequency:** Rare, high-consequence

**Entry point:** /admin/settings

**Experience frame**

- **Intent:** Change a platform rule without surprising anyone.
- **Trigger:** A policy change, a commercial change, an incident (maintenance).
- **Decision points:** Which value or policy; save or reset; run a maintenance action.
- **Recovery paths:** Reset restores stored values; unsaved changes warn; maintenance actions confirm.
- **Completion criteria:** Change saved with explicit confirmation of its scope (BR11).
- **Dependencies:** Platform settings API, maintenance run API, audit log.

### Steps

| Step | User Action                | Emotional State | System Behavior                                                            | Success Criteria             |
| ---- | -------------------------- | --------------- | -------------------------------------------------------------------------- | ---------------------------- |
| 1    | Opens settings             | Cautious        | Config grouped: Platform, Marketplace, Moderation, Operations, Maintenance | Blast radius grouped by area |
| 2    | Edits a marketplace value  | Careful         | Saved state clears, button returns to "Save Changes"                       | Unsaved work is obvious      |
| 3    | Saves                      | Relieved        | Success confirmation, button reads "Saved"                                 | Confirmation is explicit     |
| 4    | Reads the scope note       | Reassured       | "Applies to listings and payouts created from now on"                      | Retroactivity clarified      |
| 5    | Toggles a policy           | Deliberate      | Each toggle states its consequence                                         | No guessing at the effect    |
| 6    | Discards a change          | Safe            | Reset restores stored values and clears saved                              | Escape hatch always present  |
| 7    | Enters maintenance actions | Wary            | Destructive actions kept apart from ordinary settings, confirmation required | Hard to trigger by accident  |

### Failure Paths

- Navigates away dirty → Unsaved changes must warn before loss
- Commission rate changed mid-deal → Scope note states new values are not retroactive
- Maintenance mode enabled by accident → Confirmation step plus an obvious active-state indicator

### Emotional Arc

Cautious → Careful → Reassured (or anxious if scope of a change is unclear)

---

## Journey 14: Buyer Dashboard Check-in

_Added in version 2.0 — the buyer's role dashboard (Page 8)._

**Actor:** Buyer | **Duration:** 1-3 minutes | **Frequency:** Every session

- **Intent:** See where every deal stands and what to do next.
- **Trigger:** Signing in; a notification.
- **Entry points:** `/dashboard`, post-sign-in redirect.
- **Journey:** Read counts (saved, offers, viewings) → see what changed (recent activity, new alerts) → see what is next (upcoming viewings, open tasks) → jump to the item.
- **Decision points:** Which item to act on; reschedule or cancel a viewing; respond to a counter.
- **Emotional state:** Anticipation → Oriented → In control.
- **Failure paths:** A panel's data fails → that panel says so, the rest render; nothing yet → empty states point to search.
- **Recovery paths:** Retry per panel; links to each full list.
- **System behavior:** Counts derive from the same queries as the full lists.
- **Completion criteria:** The buyer opens the item that needed them, or confirms nothing does.
- **Dependencies:** Saved, offers, viewings, notifications, activity.

---

## Journey 15: Agent Daily Desk

_Added in version 2.0 — the agent/seller role dashboard (Page 15) and the work it routes to._

**Actor:** Agent / Seller | **Duration:** 5-20 minutes | **Frequency:** Daily

- **Intent:** Answer every buyer who is waiting and move deals forward.
- **Trigger:** Start of day; a new lead, viewing request or offer.
- **Entry points:** `/agent`, `/agent/requests`, `/agent/leads`, `/agent/pipeline`, `/agent/calendar`.
- **Journey:** Scan pipeline totals → answer requests (confirm or decline viewings, respond to offers) → work leads (email or call through the platform — BR9) → advance deals in the pipeline (BR6) → check the day's showings.
- **Decision points:** Accept or decline a connection; confirm, decline or reschedule a viewing; accept, counter or decline an offer; which lead to contact first (temperature — BR8).
- **Emotional state:** Busy → Prioritised → Productive.
- **Failure paths:** A move the agent cannot make → refused with who must act; outreach fails → recorded and reported, retried deliberately.
- **Recovery paths:** Reschedule; reopen a declined request where allowed.
- **System behavior:** Temperature and stage are derived, never stored; outbound contact is recorded.
- **Completion criteria:** No request waiting without a response.
- **Dependencies:** Connections, contact, viewings, offers, deal pipeline, calendar APIs.

---

## Journey 16: Listing Submission & Lifecycle

_Added in version 2.0 — the seller's "List the property" job had no journey in version 1._

**Actor:** Agent / Seller | **Duration:** 10-30 minutes per listing | **Frequency:** Per listing

- **Intent:** Publish a complete, accurate listing and keep it current until sold.
- **Trigger:** A new instruction to sell; a price change; a sale.
- **Entry points:** `/agent/listings` → create; edit from a listing row.
- **Journey:** Identity (title, description, type) → place (address, locality, coordinates) → specs (price, rooms, area, year, walk score) → extras (amenities, features) → save → media (photos) → lifecycle (status, promote, mark sold) → moderation (Journey 9).
- **Decision points:** Save as draft or publish; promote; mark sold; delete (single or bulk).
- **Emotional state:** Careful → Proud → Watchful (waiting for interest).
- **Failure paths:** Validation fails → inline per field; upload rejected by type or size → reason stated; moderation requests changes → note shown to the lister.
- **Recovery paths:** Drafts persist; unsaved changes warn before leaving; destructive lifecycle actions confirm (BR10).
- **System behavior:** A listing without coordinates is not placed on any map (BR15); promotion is labelled wherever it surfaces.
- **Completion criteria:** Listing approved and live, later marked sold.
- **Dependencies:** Properties API, uploads (Cloudinary), moderation, promotion.

---

## Journey 17: Deposit, Escrow & Closing

_Added in version 2.0 — the payment supporting flow and Buyer JTBD 6 / Seller JTBD 4 after acceptance._

**Actor:** Buyer + Seller + Admin | **Duration:** Weeks | **Frequency:** Per accepted offer

- **Intent:** Move money safely and reach completion.
- **Trigger:** Offer accepted (Journey 4).
- **Entry points:** `/dashboard/offers/:id`, `/dashboard/transactions`, agent pipeline deal detail, `/admin/payments`.
- **Journey:** Buyer pays the deposit (checkout) → funds held in escrow → closing milestones (inspection, appraisal, financing, closing) dated and completed, documents attached → inspection window closes → release per BR2 → completion.
- **Decision points:** Buyer releases; seller releases after the window; admin releases or refunds (reason required).
- **Emotional state:** Nervous → Reassured (funds held) → Relieved (keys).
- **Failure paths:** Payment fails → stated in place, retried deliberately (BR10); release refused → reason names who may release.
- **Recovery paths:** Dispute path (Journey 18); admin refund.
- **System behavior:** Both parties see the same milestones from one source; overdue is derived (BR7).
- **Completion criteria:** Transaction completed, funds released.
- **Dependencies:** Stripe, escrow, milestones, documents, notifications.

---

## Journey 18: Report, Flag & Dispute

_Added in version 2.0 — the trust supporting flow closed in RATIFIED_DIVERGENCES › Closed 9 Sept._

**Actor:** Any member → Admin | **Duration:** Minutes to days | **Frequency:** As needed

- **Intent:** Raise a problem safely; have it judged fairly.
- **Trigger:** A misleading listing, an abusive message or member, a disputed deal.
- **Entry points:** "Report" on a listing, an agent or a received message; `/admin/flags`; `/admin/disputes`.
- **Journey:** Member chooses a reason and adds detail → report enters the trust queue → admin reviews in context → upholds or dismisses (flags) / resolves or dismisses with an outcome note (disputes) → consequences follow (suspension, refund).
- **Decision points:** Reason; uphold vs dismiss; resolve vs dismiss.
- **Emotional state:** Uneasy → Heard → Protected (member); Vigilant → Accountable (admin).
- **Failure paths:** Submission fails → retried deliberately; nothing tells the other party who reported.
- **Recovery paths:** Dismissed items keep their record.
- **System behavior:** Reporter identity is never disclosed to the reported party; outcome notes are required (BR5).
- **Completion criteria:** Every report carries a decision.
- **Dependencies:** Flags, disputes, users and escrow APIs, audit log.

---

## Journey 19: Notifications & Alerts

_Added in version 2.0 — the notifications supporting flow (Pages 13 and topbar alerts)._

**Actor:** Buyer, Agent / Seller | **Duration:** Seconds | **Frequency:** Continuous

- **Intent:** Learn about changes that need attention without watching every screen.
- **Trigger:** Offer response, viewing confirmation, price drop, new match, message.
- **Entry points:** Account alerts in the portal chrome, `/dashboard/alerts`, email.
- **Journey:** Event occurs → notification recorded → member sees unread count → opens the item → marks read (single or all).
- **Decision points:** Open, mark read, change channel preferences.
- **Emotional state:** Interrupted → Informed.
- **Failure paths:** Delivery fails → in-app record still exists.
- **Recovery paths:** Alert history keeps past notifications.
- **System behavior:** Saved-search alerts are stored but not yet sent — no copy may promise them until a matcher sends them (RATIFIED_DIVERGENCES › Landing page, deferred).
- **Completion criteria:** Unread count reflects what the member has not seen.
- **Dependencies:** Notifications API, preferences, SMTP.

---

## Emotional Arc Summary

### Marketplace Journeys

| Journey   | Hopeful | Focused | Confident | Committed | Satisfied |
| --------- | ------- | ------- | --------- | --------- | --------- |
| Search    | ✓       | ✓       | ✓         |           | ✓         |
| Detail    | ✓       | ✓       | ✓         | ✓         | ✓         |
| Viewing   |         | ✓       | ✓         |           |           |
| Offer     |         | ✓       |           | ✓         | ✓         |
| Messaging | ✓       | ✓       | ✓         |           |           |
| Auth      | ✓       |         |           |           | ✓         |
| Profile   |         |         | ✓         |           | ✓         |
| Dashboard (14) |    | ✓       | ✓         |           | ✓         |
| Agent desk (15) |   | ✓       | ✓         | ✓         | ✓         |
| Listing (16) |      | ✓       | ✓         | ✓         |           |
| Deposit (17) | ✓    |         | ✓         | ✓         | ✓         |
| Notifications (19) | | ✓     |           |           | ✓         |

### Admin Journeys

Operators do not arrive hopeful — they arrive vigilant. The arc that matters is
whether the console converts vigilance into a defensible decision.

| Journey       | Vigilant | Investigating | Decisive | Accountable | Reassured |
| ------------- | -------- | ------------- | -------- | ----------- | --------- |
| Health Triage | ✓        | ✓             | ✓        |             |           |
| Moderation    | ✓        | ✓             | ✓        | ✓           |           |
| Verification  |          | ✓             | ✓        | ✓           |           |
| Enforcement   | ✓        |               | ✓        | ✓           | ✓         |
| Revenue       | ✓        | ✓             | ✓        |             | ✓         |
| Configuration |          |               | ✓        | ✓           | ✓         |
| Report & Dispute (18) | ✓ | ✓          | ✓        | ✓           |           |

---

## Regeneration Notes

- **Retained:** Journeys 1–13, every step, emotional state, failure path and both arc tables.
- **Added:** an Experience frame per journey (intent, trigger, entry points, decision points, recovery paths, completion criteria, dependencies); Journeys 14–19; a few failure paths drawn from RATIFIED_DIVERGENCES (search outage, place lookup failure, unconfigured provider); inline divergence pointers.
- **Changed (visual wording dropped, behaviour kept):** J1 "Show hero + featured listings" → "Show search entry + featured listings"; J1 '"Saved 3" badge' and 'Toast: "Saved" + star badge' → saved count and confirmation; J1 "skeleton cards" → "a loading state that keeps the results' structure"; J2 "Fast hero image", "Smooth carousel", "Clear, scannable layout" → primary photo fast, next/previous, facts easy to scan; J8 "Sidebar renders with pending-count badge", "4 stat cards with trend + sparkline", "tone-coded", "Health panel leads, alert banner above the fold" → navigation count, volume metrics with trend, severity stated, health reported first with a global alert; J9 "Filter pills", "Side panel", "Bulk bar" → status filters, detail view, bulk actions; J10 "Sidebar badge", "card" → navigation count, request; J11 "Header", "row tints", "Role chip", "Bulk bar" → standing stated, row marked suspended, role, bulk actions; J12 "Status tints the initiated date", "monthly chart, breakdown donut", "Warning callout" → escrow flagged by status, monthly trend and commission/fee breakdown, pending payouts warning; J13 "Success callout", "Destructive actions separated" → success confirmation, destructive actions kept apart.

---

**Phase 2 Complete.** Each journey informs page design, messaging, and notifications. Next: [Phase 3 — Information Architecture](phase-3-information-architecture.md).

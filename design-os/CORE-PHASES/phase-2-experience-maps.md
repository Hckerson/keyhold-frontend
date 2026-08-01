# Phase 2: Experience Maps

**Real Estate Platform Design Operating System** - Core user journeys and emotional arcs

---

## Overview

Thirteen detailed user journey maps covering:

- Search & discovery flow
- Listing detail evaluation
- Viewing & scheduling
- Offer workflow
- Real-time messaging
- Authentication flows
- Profile management
- Platform health triage
- Listing moderation
- Tier verification review
- User enforcement
- Revenue & payout oversight
- Platform configuration

Journeys 1-7 are marketplace-facing (buyer, agent, seller). Journeys 8-13 are
operator-facing (admin) — the emotional register there is vigilance and
accountability rather than hope and excitement.

Each includes decision points, emotional states, system behavior, and failure paths.

---

## Journey 1: Search & Discovery

**Actor:** Buyer | **Duration:** 5-15 minutes | **Frequency:** 2-3 sessions/week

### Steps

| Step | User Action            | Emotional State | System Behavior               | Success Criteria     |
| ---- | ---------------------- | --------------- | ----------------------------- | -------------------- |
| 1    | Opens app              | Curious/hopeful | Show hero + featured listings | Fast load (<1s)      |
| 2    | Enters search criteria | Focused         | Auto-complete, show filters   | Filters feel natural |
| 3    | Views results          | Scanning        | Show 20 results, map, sorting | Results match intent |
| 4    | Refines filters        | Deliberate      | Live filter updates           | <500ms response      |
| 5    | Sees saved count       | Encouraged      | "Saved 3" badge               | Clear feedback       |
| 6    | Scrolls/pages results  | Browsing        | Pagination or infinite scroll | Feels fast           |
| 7    | Saves listing          | Satisfied       | Toast: "Saved" + star badge   | Permanent save       |

### Failure Paths

- No results → Show "Try adjusting filters" + suggestions
- Results feel irrelevant → Show comparables to help user evaluate
- Slow search → Show skeleton cards while loading

### Emotional Arc

Hopeful → Focused → Satisfied (or frustrated if results miss mark)

---

## Journey 2: Listing Detail & Evaluation

**Actor:** Buyer | **Duration:** 10-20 minutes | **Frequency:** 1-2x per promising listing

### Steps

| Step | User Action         | Emotional State | System Behavior                                 | Success Criteria        |
| ---- | ------------------- | --------------- | ----------------------------------------------- | ----------------------- |
| 1    | Clicks listing      | Intrigued       | Load gallery, description, map                  | Fast hero image         |
| 2    | Scrolls photos      | Evaluating      | Smooth carousel, full-screen option             | Photos load quickly     |
| 3    | Reads details       | Investigating   | Description, beds/baths, price, tax             | Clear, scannable layout |
| 4    | Checks neighborhood | Curious         | Map, nearby schools, transit, walkability       | Interactive map works   |
| 5    | Sees comps          | Confident       | 3-5 similar recent sales                        | Data is transparent     |
| 6    | Reads agent bio     | Trusting        | Photo, name, reviews, response time             | Feels human, credible   |
| 7    | Schedules viewing   | Committed       | Calendar, time slots, easy confirmation         | Instant confirmation    |
| 8    | Or makes offer      | Serious         | Pre-filled buyer info, offer amount, conditions | Form is fast            |

### Failure Paths

- Photos missing → Show placeholder + agent contact option
- Map not loading → Show text-based neighborhood info
- Agent not responsive → Show alternative agents or buyer option

### Emotional Arc

Intrigued → Evaluating → Confident → Committed (or doubtful → exit)

---

## Journey 3: Viewing Coordination

**Actor:** Buyer + Agent | **Duration:** 2 days total (scheduling + showing)

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

- Real-time notifications (not next day)
- Clear timeline of all offers/counters
- Message thread for questions
- Contingency templates (inspection, appraisal, financing)
- Clear next steps at each stage

---

## Journey 5: Real-Time Messaging

**Actor:** Buyer + Agent + Other Agents | **Duration:** Ongoing (deal progress)

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

---

## Journey 6: Authentication

**Actor:** New User (Buyer) | **Duration:** 3-5 minutes

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

### Emotional Arc

Excited → Reassured (validation feedback) → Ready (persona chosen)

---

## Journey 7: Profile & Preferences

**Actor:** Buyer | **Duration:** 5-10 minutes (one-time + updates)

### Profile Section

- Profile photo (optional)
- Saved search preferences
- Notification settings (email, SMS, in-app)
- Communication preferences (call, text, email, instant message)
- Privacy settings (show/hide profile to agents)

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

### Steps

| Step | User Action                | Emotional State | System Behavior                              | Success Criteria             |
| ---- | -------------------------- | --------------- | -------------------------------------------- | ---------------------------- |
| 1    | Opens admin console        | Vigilant        | Sidebar renders with pending-count badge     | Badge accurate on first load |
| 2    | Scans volume metrics       | Assessing       | 4 stat cards with trend + sparkline          | Direction readable at once   |
| 3    | Reads system health        | Alert           | Uptime, error rate, per-system state         | Degraded system stands out   |
| 4    | Scans alert list           | Prioritising    | Alerts ordered by recency, tone-coded        | Severity obvious             |
| 5    | Reads moderation queue     | Deciding        | Pending verifications, review queue, flagged | Counts link to their route   |
| 6    | Clicks into the worst item | Committed       | Deep-links to the filtered queue             | Lands in context, not a list |

### Failure Paths

- All systems degraded → Health panel leads, alert banner above the fold
- Alert with no owning route → Alert must still name what to do next
- Stale counts → Badge and page counts disagree; both read from one source

### Emotional Arc

Vigilant → Assessing → Decisive (or overwhelmed if severity is not ranked)

---

## Journey 9: Listing Moderation

**Actor:** Admin | **Duration:** 30 seconds - 4 minutes per listing | **Frequency:** Daily, batched

**Entry point:** /admin/listings, usually via the overview queue

### Steps

| Step | User Action                 | Emotional State | System Behavior                                                                   | Success Criteria              |
| ---- | --------------------------- | --------------- | --------------------------------------------------------------------------------- | ----------------------------- |
| 1    | Filters to Pending/Flagged  | Focused         | Filter pills with counts, selection resets                                        | Queue narrows instantly       |
| 2    | Scans compliance column     | Screening       | Pass/warn/fail signals per row                                                    | Problem rows readable at once |
| 3    | Opens a row                 | Investigating   | Side panel: photos, description, flag reason, compliance checklist, agent contact | Everything needed, no new tab |
| 4    | Approves clean listing      | Confident       | Status flips, row leaves pending count                                            | One click, no dialog          |
| 5    | Rejects or requests changes | Deliberate      | Modal demands a note before submitting                                            | Cannot act without a reason   |
| 6    | Selects a batch             | Efficient       | Bulk bar: Approve / Request Changes / Reject                                      | Same rules apply in bulk      |

### Failure Paths

- Ambiguous listing → Request Changes returns it to pending with the note attached
- Empty filter result → "No listings match this filter right now"
- Accidental bulk action → Note requirement forces a deliberate pause on destructive paths

### Emotional Arc

Focused → Investigating → Decisive → Accountable (the note is the audit trail)

---

## Journey 10: Tier Verification Review

**Actor:** Admin | **Duration:** 2-6 minutes per request | **Frequency:** Daily

**Entry point:** /admin/verifications, often from the sidebar badge

### Steps

| Step | User Action              | Emotional State | System Behavior                                            | Success Criteria          |
| ---- | ------------------------ | --------------- | ---------------------------------------------------------- | ------------------------- |
| 1    | Notices the badge count  | Prompted        | Sidebar badge shows pending total                          | Matches the page count    |
| 2    | Reads the request card   | Evaluating      | Name, email, current → requested tier, doc count           | Upgrade path obvious      |
| 3    | Reviews documents        | Diligent        | Review Docs opens the submitted evidence                   | Documents load in context |
| 4    | Approves or rejects      | Judging         | Card moves status, counts and badge update                 | Immediate, visible change |
| 5    | Revisits a past decision | Accountable     | Approved → Revoke; Rejected → View Reason / Allow Resubmit | Decisions are reversible  |

### Failure Paths

- Insufficient documents → Reject with reason, applicant can resubmit
- Wrongly approved → Revoke path exists on approved cards
- Platinum request from a standard tier → Upgrade path shown explicitly, not inferred

### Emotional Arc

Prompted → Diligent → Judging → Accountable

---

## Journey 11: User Enforcement

**Actor:** Admin | **Duration:** 1-3 minutes | **Frequency:** Weekly, or triggered by an alert

**Entry point:** /admin/users

### Steps

| Step | User Action           | Emotional State | System Behavior                                    | Success Criteria           |
| ---- | --------------------- | --------------- | -------------------------------------------------- | -------------------------- |
| 1    | Opens user management | Purposeful      | Header states active vs total                      | Standing visible at once   |
| 2    | Sorts or filters      | Searching       | Sort by any column, default by name                | Target found fast          |
| 3    | Reads the row         | Assessing       | Role chip, tier, join date, deal count, status     | Context without opening    |
| 4    | Suspends the account  | Resolute        | Status flips, row tints, action becomes Reactivate | Reversible, visibly marked |
| 5    | Suspends in bulk      | Efficient       | Bulk bar: Reactivate / Suspend                     | Header count updates       |

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

### Steps

| Step | User Action                 | Emotional State | System Behavior                               | Success Criteria              |
| ---- | --------------------------- | --------------- | --------------------------------------------- | ----------------------------- |
| 1    | Opens transactions          | Analytical      | Volume, commission and completed stats        | Totals reconcile with table   |
| 2    | Inspects deals in escrow    | Watchful        | Status tints the initiated date               | Stuck deals stand out         |
| 3    | Moves to payments           | Focused         | Revenue stats, monthly chart, breakdown donut | Trend legible at a glance     |
| 4    | Reads the pending callout   | Concerned       | Warning callout with outstanding amount       | Amount and cause both stated  |
| 5    | Releases payouts            | Decisive        | Process action, average processing time shown | Expectation set before action |
| 6    | Opens reports for the story | Reflective      | GMV, growth, region ranking, user mix         | Explains the numbers above    |
| 7    | Exports                     | Satisfied       | Download / Generate Custom                    | Figures match on-screen       |

### Failure Paths

- Totals disagree between stats and table footer → One derivation, computed from the same rows
- Nothing outstanding → Pending callout is hidden rather than shown empty
- No regional data → Panel shows an empty state, not an axis with no bars

### Emotional Arc

Analytical → Watchful → Decisive → Satisfied

---

## Journey 13: Platform Configuration

**Actor:** Admin | **Duration:** 3-10 minutes | **Frequency:** Rare, high-consequence

**Entry point:** /admin/settings

### Steps

| Step | User Action                | Emotional State | System Behavior                                                            | Success Criteria             |
| ---- | -------------------------- | --------------- | -------------------------------------------------------------------------- | ---------------------------- |
| 1    | Opens settings             | Cautious        | Config grouped: Platform, Marketplace, Moderation, Operations, Maintenance | Blast radius grouped by area |
| 2    | Edits a marketplace value  | Careful         | Saved state clears, button returns to "Save Changes"                       | Unsaved work is obvious      |
| 3    | Saves                      | Relieved        | Success callout, button reads "Saved"                                      | Confirmation is explicit     |
| 4    | Reads the scope note       | Reassured       | "Applies to listings and payouts created from now on"                      | Retroactivity clarified      |
| 5    | Toggles a policy           | Deliberate      | Each toggle states its consequence                                         | No guessing at the effect    |
| 6    | Discards a change          | Safe            | Reset restores stored values and clears saved                              | Escape hatch always present  |
| 7    | Enters maintenance actions | Wary            | Destructive actions separated, confirmation required                       | Hard to trigger by accident  |

### Failure Paths

- Navigates away dirty → Unsaved changes must warn before loss
- Commission rate changed mid-deal → Scope note states new values are not retroactive
- Maintenance mode enabled by accident → Confirmation step plus an obvious active-state indicator

### Emotional Arc

Cautious → Careful → Reassured (or anxious if scope of a change is unclear)

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

---

**Phase 2 Complete. Each journey informs page design, messaging, and notifications.**

# Phase 2: Experience Maps

**Real Estate Platform Design Operating System** - Core user journeys and emotional arcs

---

## Overview

Seven detailed user journey maps covering:

- Search & discovery flow
- Listing detail evaluation
- Viewing & scheduling
- Offer workflow
- Real-time messaging
- Authentication flows
- Profile management

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

## Emotional Arc Summary

| Journey   | Hopeful | Focused | Confident | Committed | Satisfied |
| --------- | ------- | ------- | --------- | --------- | --------- |
| Search    | ✓       | ✓       | ✓         |           | ✓         |
| Detail    | ✓       | ✓       | ✓         | ✓         | ✓         |
| Viewing   |         | ✓       | ✓         |           |           |
| Offer     |         | ✓       |           | ✓         | ✓         |
| Messaging | ✓       | ✓       | ✓         |           |           |
| Auth      | ✓       |         |           |           | ✓         |
| Profile   |         |         | ✓         |           | ✓         |

---

**Phase 2 Complete. Each journey informs page design, messaging, and notifications.**

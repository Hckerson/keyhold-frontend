# Phase 6: Interaction Contracts

**Keyhold Design Operating System** · Phase 6 of 9 · Version 2.0 · 29 September 2026

How every interactive element behaves: inputs, states, validation, keyboard, ARIA, loading and error behaviour, content rules. Previous: [Phase 5 — Section Blueprints](phase-5-section-blueprints.md) · Next: [Phase 7 — Frontend Architecture](phase-7-frontend-architecture.md).

Contracts describe behaviour, never appearance. Which components exist, how they are grouped and how they look is decided when pages are built — and is governed by the code (`components/ui/`, `components/patterns/`, `.claude/CLAUDE.md`), not by this file.

> **Rename.** This file was `phase-6-component-library.md` in version 1. The 78 components it named survive here as contracts C1–C78, with their numbers; visual variants, sizes, colours and styling props were dropped (see [Regeneration Notes](#regeneration-notes)). Build status lives in [Phase 8](phase-8-implementation-roadmap.md#interaction-contracts).

---

## Contents

1. [Contract Defaults](#contract-defaults)
2. [Tier 1: Primitive Contracts (C1–C12)](#tier-1-primitive-contracts-12)
3. [Tier 2: Pattern Contracts (C13–C30)](#tier-2-pattern-contracts-18)
4. [Tier 3: Composed Contracts (C31–C78)](#tier-3-composed-contracts-48)
5. [Added Contracts (C79–C88)](#added-contracts-c79c88)
6. [Accessibility Standards](#accessibility-standards)
7. [Testing Expectations](#testing-expectations)
8. [Regeneration Notes](#regeneration-notes)

---

## Contract Defaults

Every contract inherits these. An entry lists only what differs.

| Field             | Default                                                                                                                                                                                                                  |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Accessibility** | WCAG 2.2 AA. Operable by keyboard alone with a visible focus indicator; target size meets WCAG 2.5.8; status never by colour alone; meaningful icons have an accessible name, decorative ones are hidden.                |
| **Keyboard**      | Tab / Shift+Tab move between controls in reading order; Enter activates; Space toggles; Escape dismisses the innermost overlay and returns focus to its trigger.                                                         |
| **Loading**       | A control whose action is in flight is disabled and announces busy; it is never activated twice (BR10).                                                                                                                  |
| **Error**         | A failure you can retry in place is reported next to the control; otherwise it is reported globally ([ADR 0013](../../docs/adr/0013-mutation-feedback-is-global-by-default.md)). Writes are never retried automatically. |
| **Motion**        | Any animation honours `prefers-reduced-motion`. (How anything moves is a build-time decision.)                                                                                                                           |
| **Content**       | Labels are verbs for actions and nouns for places; destructive labels state their effect ("Delete listing", not "OK"); copy follows Phase 1 › Brand Voice.                                                               |
| **Dependencies**  | Primitives depend on nothing domain-specific; composed contracts depend on hooks, never on the API client directly (Phase 7).                                                                                            |

---

## TIER 1: PRIMITIVE CONTRACTS (12)

### C1. Button

- **Purpose:** Trigger an action.
- **Inputs:** label, intent (`primary` | `secondary` | `destructive` | `low-emphasis`), disabled, loading, onActivate.
- **States:** default, hover, pressed, focused, disabled, loading.
- **Keyboard:** Enter and Space activate.
- **ARIA:** Native `<button>`; `aria-busy` while loading; `aria-disabled` when disabled but still focusable for explanation.
- **Interaction:** Loading implies disabled; one activation per request.
- **Content rules:** Verb-first label; destructive intent only for destructive effects.
- **Do:** Use a link, not a button, for navigation. **Don't:** Use colour alone to signal destructive intent — the label states it.

### C2. Input

- **Purpose:** Enter a single value.
- **Inputs:** type (`text` | `email` | `password` | `number` | `tel` | `url`), label, placeholder, value, onChange, error, errorMessage, disabled.
- **States:** default, focused, filled, error, disabled.
- **Validation:** Validate on blur and on submit; after a first error, revalidate as the user types.
- **ARIA:** `<label htmlFor>`, `aria-invalid`, `aria-describedby` for help and error text, `aria-required` when required.
- **Content rules:** Placeholder never replaces the label; error text says how to fix it.
- **Do:** Use the input type that brings the right keyboard on touch. **Don't:** Clear the value on error.

### C3. Select / Dropdown

- **Purpose:** Choose one option from a set.
- **Inputs:** options (`{ label, value }[]`), value, onChange, placeholder, disabled, searchable.
- **States:** closed, open, selected, disabled.
- **Keyboard:** Arrow keys navigate, type-ahead filters when searchable, Enter selects, Escape closes.
- **ARIA:** `listbox` / `option`, `aria-expanded`, selection announced.

### C4. Checkbox

- **Purpose:** Toggle an independent choice.
- **Inputs:** checked, onChange, disabled, label, indeterminate.
- **States:** unchecked, checked, indeterminate, disabled.
- **Keyboard:** Space toggles.
- **ARIA:** Native checkbox with `<label>`; `aria-checked="mixed"` when indeterminate.

### C5. Radio Button

- **Purpose:** One choice from a small set.
- **Inputs:** name, value, checked, onChange, disabled, label.
- **Keyboard:** Arrow keys move and select within the group; Tab leaves the group.
- **ARIA:** `<fieldset>` for the group, `<legend>` for its label.

### C6. Status Label (Badge)

- **Purpose:** State a status or attribute of a record.
- **Inputs:** meaning (`success` | `warning` | `error` | `info` | `neutral`), text.
- **Content rules:** The text carries the meaning ("Pending", "Featured", "Suspended"); meaning is never conveyed by treatment alone.
- **ARIA:** Plain text; not interactive. Examples: "New", "Hot", "Pending", "Active".

### C7. Icon

- **Purpose:** Reinforce meaning, or carry it for icon-only controls.
- **Inputs:** name, accessible label (required when not decorative).
- **ARIA:** Decorative → `aria-hidden`; meaningful → labelled.
- **Content rules:** One consistent icon set across the product (currently `lucide-react` — a code convention, Phase 7). Custom marks only for brand or provider identities.

### C8. Image

- **Purpose:** Show a photo without shifting the page.
- **Inputs:** src, alt, intrinsic dimensions, fit, priority vs lazy.
- **Behaviour:** Dimensions known before load (no layout shift); lazy below the fold; responsive sources; a placeholder while loading; a stated fallback when the source fails.
- **ARIA:** `alt` required — descriptive for content, empty for decoration.
- **Dependencies:** Framework-native `next/image`.

### C9. Loading Placeholder (Skeleton)

- **Purpose:** Hold a region's structure while its data loads.
- **Inputs:** shape (`text` | `circular` | `rectangular`), extent.
- **ARIA:** Hidden from assistive technology; the owning region carries `aria-busy`.
- **Used for:** Loading states (text, image, avatar).

### C10. Avatar

- **Purpose:** Identify a person.
- **Inputs:** src, name, fallback.
- **Behaviour:** Falls back to initials derived from the name when there is no image or it fails.
- **ARIA:** Alt is the person's name unless the name is adjacent in text.

### C11. Tag / Label

- **Purpose:** A removable or static attribute.
- **Inputs:** text, onRemove (if removable).
- **Keyboard:** The remove control is its own button named "Remove {text}".
- **Example:** "3 Beds" in the active filters; "Saved" on a listing.

### C12. Divider

- **Purpose:** Separate groups of content.
- **Inputs:** orientation.
- **ARIA:** Decorative unless it separates semantic groups (`role="separator"`).

---

## TIER 2: PATTERN CONTRACTS (18)

### C13. Modal / Dialog

- **Inputs:** isOpen, onClose, title, content, actions (`{ label, onActivate, intent }[]`), dismissible, locked.
- **Behaviour:** Moves focus in on open and traps it; restores focus to the trigger on close; Escape and outside interaction close only when dismissible **and not locked**; locked while its request is in flight (BR10).
- **ARIA:** `role="dialog"`, `aria-modal`, `aria-labelledby`.

### C14. Toast / Alert

- **Inputs:** message, kind (`success` | `error` | `info` | `warning`), duration (0 = persistent), action (optional), onClose.
- **Behaviour:** Auto-dismiss after duration; pause while focused or hovered; multiple notifications queue.
- **ARIA:** `role="alert"` for errors (assertive), `role="status"` otherwise (polite).
- **Content rules:** Success only when the outcome is not otherwise visible ([ADR 0013](../../docs/adr/0013-mutation-feedback-is-global-by-default.md)).

### C15. Tooltip

- **Inputs:** content, trigger, delay.
- **Behaviour:** Shows on hover **and** focus; dismissible with Escape; hover over the tooltip keeps it open (WCAG 1.4.13); stays within the viewport.
- **Don't:** Put essential information or controls only in a tooltip.

### C16. Tabs

- **Inputs:** tabs (`{ label, content, disabled? }[]`), activeTab, onTabChange.
- **Keyboard:** Arrow keys move between tabs; Home/End jump.
- **ARIA:** `tablist`, `tab`, `tabpanel`, `aria-selected`, `aria-controls`.

### C17. Accordion

- **Inputs:** items (`{ label, content, disabled? }[]`), allowMultiple.
- **Keyboard:** Enter/Space toggle.
- **ARIA:** Header is a button with `aria-expanded` and `aria-controls`.

### C18. Pagination

- **Inputs:** currentPage, totalPages, onPageChange, showPreviousNext.
- **Behaviour:** First, previous, nearby pages, next, last; skipped ranges shown as an ellipsis; preserves sort and filter.
- **ARIA:** `nav` labelled "Pagination"; current page `aria-current="page"`.

### C19. Spinner / Loading

- **Inputs:** label.
- **ARIA:** `role="status"` with an accessible label. Use only where a placeholder (C9) cannot preserve structure.

### C20. Date Picker

- **Inputs:** value, onChange, minDate, maxDate, disabled dates, placeholder.
- **Behaviour:** Opens a calendar; typing a date parses it; out-of-range dates cannot be chosen.
- **Keyboard:** Arrow keys move by day/week; Page Up/Down by month; Enter selects.
- **ARIA:** Selected date announced; grid labelled by month and year.

### C21. Time Picker

- **Inputs:** value (HH:MM), onChange, step (minutes), is24Hour.
- **Behaviour:** Choose from stepped times or type a time; timezone stated when it may differ (Journey 3).

### C22. Price Input

- **Inputs:** value, onChange, min, max, step.
- **Behaviour:** Accepts typed digits; displays formatted currency; stores an exact value (BR1).
- **Validation:** Within min–max; positive.

### C23. Price Range Slider

- **Inputs:** min, max, minValue, maxValue, onChange, step.
- **Keyboard:** Arrow keys adjust by step; Page Up/Down by a larger step.
- **ARIA:** Two `slider` thumbs with `aria-valuetext` in currency.

> **Ratified divergence (Section 35).** Search uses price-band chips with facet counts instead. This contract remains specified.

### C24. Search / Autocomplete Input

- **Inputs:** value, onChange, onSearch, suggestions (`{ label, value }[]`), placeholder, debounce.
- **Keyboard:** Arrow keys navigate suggestions, Enter selects, Escape closes.
- **ARIA:** `combobox` with `aria-expanded`, `aria-activedescendant`; suggestion count announced.

### C25. File Upload / Dropzone

- **Inputs:** onFiles, accept, maxSize, multiple.
- **Behaviour:** Drop or choose; progress per file; reject wrong type or oversize before upload with the limit named.
- **Keyboard:** Focusable; Enter/Space open the picker.
- **Error:** Per-file error; other files continue.

### C26. Progress Bar

- **Inputs:** value, max, label.
- **ARIA:** `progressbar` with `aria-valuenow` / `aria-valuemax` and a label.

### C27. Breadcrumb

- **Inputs:** items (`{ label, href }[]`).
- **Behaviour:** Every item but the last is a link.
- **ARIA:** `nav` labelled "Breadcrumb"; last item `aria-current="page"`.

### C28. Badge Count / Avatar Group

- **Inputs:** avatars (`{ name, src }[]`), max.
- **Behaviour:** First N shown; the remainder as "+N"; "+N" opens the full list.
- **ARIA:** Group labelled with the total ("5 participants").

### C29. Dropdown Menu

- **Inputs:** trigger, items (`{ label, onActivate, icon?, separator? }[]`).
- **Keyboard:** Arrow keys, Enter, Escape; type-ahead.
- **ARIA:** `menu` / `menuitem`; trigger `aria-haspopup` and `aria-expanded`.

### C30. Switch / Toggle

- **Inputs:** checked, onChange, disabled, label, description.
- **Behaviour:** Applies immediately (unlike a checkbox inside a form).
- **Keyboard:** Space toggles.
- **ARIA:** `role="switch"`, `aria-checked`; label as accessible name, description as help text.

---

## TIER 3: COMPOSED CONTRACTS (48)

Domain contracts built from the primitives and patterns above. Each inherits the defaults and the contracts it composes; the table states what it adds. Numbers C31–C78 follow the order version 1 listed them in.

### Listing

| #   | Contract           | Purpose / inputs                               | Behaviour and rules                                                               |
| --- | ------------------ | ---------------------------------------------- | --------------------------------------------------------------------------------- |
| C31 | ListingCard        | One listing: image, price, address, save state | Whole card opens the listing; Save is a separate control; promoted label per BR15 |
| C32 | ListingGallery     | Photo set with position                        | Next/prev, direct choice, full-screen; arrow keys; position announced             |
| C33 | ListingDetails     | Description, facts, neighbourhood              | Long text expands; facts explain themselves on demand                             |
| C34 | ListingComparables | Nearby comparable listings                     | Sortable; opens a comparable only if still available                              |
| C35 | AgentCard          | Agent identity, rating, response time, contact | Call and email run through the platform (BR9); "View all listings"                |

### Search

| #   | Contract      | Purpose / inputs                   | Behaviour and rules                                                                                       |
| --- | ------------- | ---------------------------------- | --------------------------------------------------------------------------------------------------------- |
| C36 | SearchFilters | Location, price, beds, baths, type | Filters live in the URL; each option shows its facet count; Reset clears all                              |
| C37 | SearchResults | Result set over the current query  | Count announced on change; pagination preserves filters                                                   |
| C38 | MapView       | Listings located on a map          | Pan/zoom constrains the query by bounding box; pin → preview → detail; keyboard-reachable list equivalent |
| C39 | SortDropdown  | Sort order                         | Default "Featured first"; choice persists in the URL                                                      |

### Offer

| #   | Contract         | Purpose / inputs                           | Behaviour and rules                                                              |
| --- | ---------------- | ------------------------------------------ | -------------------------------------------------------------------------------- |
| C40 | OfferForm        | Amount, move-in date, contingencies, notes | Review step before submit; validation per Section 16; locks while sending (BR10) |
| C41 | OfferStatus      | Current status and next step               | Status stated in text; next step named                                           |
| C42 | OfferTimeline    | Every round                                | Chronological; each round opens its detail                                       |
| C43 | CounterOfferForm | New amount + message                       | Shows original and counter for reference; confirmation before sending            |

### Messaging

| #   | Contract         | Purpose / inputs                  | Behaviour and rules                                                                |
| --- | ---------------- | --------------------------------- | ---------------------------------------------------------------------------------- |
| C44 | MessageThread    | Messages, typing state            | Older messages load on demand; new messages announced politely; report per message |
| C45 | MessageInput     | Text, attachments                 | Enter sends, Shift+Enter new line; failed send keeps the draft                     |
| C46 | ConversationList | Conversations with unread state   | Unread first; searchable; opening clears unread                                    |
| C47 | DocumentShare    | Document preview, download, share | Download names the file; share copies a link or sends a message                    |

### Dashboard

| #   | Contract          | Purpose / inputs   | Behaviour and rules                                   |
| --- | ----------------- | ------------------ | ----------------------------------------------------- |
| C48 | DashboardStats    | Role's key counts  | Each count links to its list; counts share its source |
| C49 | RecentActivity    | Recent events      | Newest first; each event links to its item            |
| C50 | UpcomingViewings  | Next viewings      | Reschedule and cancel (confirmed) from each item      |
| C51 | SavedListingsGrid | Saved listings     | Remove save; "View offer" when an offer exists        |
| C52 | MyOffers          | The buyer's offers | Filter by status; withdraw with confirmation          |

### Agent

| #   | Contract     | Purpose / inputs              | Behaviour and rules                                                                         |
| --- | ------------ | ----------------------------- | ------------------------------------------------------------------------------------------- |
| C53 | ListingGrid  | Agent's listings with actions | Bulk select; bulk status and delete confirm (BR10); filter by status                        |
| C54 | LeadsList    | Leads with temperature        | Temperature derived (BR8); email/call through the platform (BR9); accept/decline connection |
| C55 | PipelineCard | One deal, movable             | Drag is a request resolved by BR6; every move also available from the detail by keyboard    |
| C56 | Calendar     | Showings and events           | Create event; month navigation; optional Google Calendar push with reconnect on revoke      |

### Admin

| #   | Contract                                        | Purpose / inputs                               | Behaviour and rules                                                                  |
| --- | ----------------------------------------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------ |
| C57 | ModerationQueueList                             | Queue counts linking to their route            | Each row names count and queue; oldest first (ratified, Page 20)                     |
| C58 | ModerationListingColumns / ModerationTableCells | Moderation table configuration                 | Default sort by status; action columns have screen-reader headers                    |
| C59 | ModerationListingDetail                         | Photos, description, compliance, agent contact | Approve hidden when approved; Reject hidden when rejected                            |
| C60 | ModerationDecisionModal                         | Reject / request-changes with required note    | Submit disabled until the note is non-blank (BR4); applies to bulk identically       |
| C61 | ComplianceList                                  | Pass / warn / fail checks                      | State stated in text per check                                                       |
| C62 | UserTableColumns / UserTableCells               | Users with role, tier, status, actions         | Default sort by name; suspend/reactivate confirm and are reversible                  |
| C63 | TransactionTableColumns / TransactionTableCells | Deals with commission and status               | Totals recompute from visible rows; commission labelled estimate (BR17)              |
| C64 | VerificationList / VerificationCard             | Tier requests with status-dependent actions    | Action set per status (Section 67); decisions update the navigation count            |
| C65 | SystemHealthList                                | Uptime, error rate, operational state          | State in text; degraded systems reported first                                       |
| C66 | SystemAlertList                                 | Platform alerts by severity                    | Severity in text; each alert names what to do next                                   |
| C67 | RevenueBreakdown                                | Headline metric plus supporting figures        | Description list; estimates labelled                                                 |
| C68 | AgentContact                                    | Submitting agent's name, email, phone          | Contact links labelled with the agent's name                                         |
| C69 | AdminMaintenancePanel                           | Destructive and operational actions            | Confirmation for every destructive action; maintenance mode shows a global indicator |

### Auth

| #   | Contract              | Purpose / inputs      | Behaviour and rules                                                                                   |
| --- | --------------------- | --------------------- | ----------------------------------------------------------------------------------------------------- |
| C70 | SignUpForm            | Email, password, role | Existing email → sign-in path; consent links to Terms and Privacy; social providers per configuration |
| C71 | SignInForm            | Email, password       | Generic failure message (no account enumeration); returns to the gated action                         |
| C72 | OTPInput              | 6-digit code          | Paste fills all digits; resend with cooldown; attempt limit (Journey 6)                               |
| C73 | PasswordStrengthMeter | Password              | Strength described in text, not only by a bar; requirements listed                                    |

### Layout

| #   | Contract        | Purpose / inputs                   | Behaviour and rules                                              |
| --- | --------------- | ---------------------------------- | ---------------------------------------------------------------- |
| C74 | Header          | Global navigation                  | Skip link to main content; user menu is a C29 menu               |
| C75 | Footer          | Site-wide links, newsletter        | Newsletter per C81                                               |
| C76 | Sidebar         | Portal navigation                  | Current page `aria-current`; collapsible with focus management   |
| C77 | AppLayout       | Public shell: header, main, footer | One `main` landmark; skip link target                            |
| C78 | DashboardLayout | Portal shell: navigation and main  | Role-guarded; unauthenticated → sign-in; wrong role → own portal |

Version 1 announced "80 components" and "31-80" but named 78; numbers C79–C80 were never assigned. The contracts below start at C79.

---

## Added Contracts (C79–C88)

Interactive elements that ship and had no contract in version 1. Added in version 2.0.

| #   | Contract            | Purpose / inputs                                        | Behaviour and rules                                                                                                                |
| --- | ------------------- | ------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| C79 | ReportControl       | Target (listing, agent, message), reason, details       | Reason required from a fixed set; states that the other party is never told who reported; confirmation on send (Journey 18)        |
| C80 | CommandPalette      | Query over routes and records the role may see          | Opens with a keyboard shortcut; `combobox` semantics; Escape closes and restores focus                                             |
| C81 | NewsletterSignup    | Email, consent                                          | Double opt-in (BR14); success copy says "Check your inbox to confirm", never "You are on the list"                                 |
| C82 | CheckoutPayment     | Deposit amount, payment details                         | Provider-hosted card entry; single submission (BR10); failure stated in place; success leads to the transaction                    |
| C83 | ViewingRequest      | Date, time, mode (in person, virtual, open house), note | Past dates disabled; timezone stated; request state shown back (pending, confirmed, declined)                                      |
| C84 | ListingEditor       | Identity, place, specs, extras, media, lifecycle        | Sections validate independently; media and lifecycle only once saved; unsaved changes warn (C86)                                   |
| C85 | ConfirmModal        | Target, effect, reversible?                             | Names target and effect; warns when irreversible; effect-stating destructive label; locks while pending; inline failure (ADR 0021) |
| C86 | UnsavedChangesGuard | Dirty state                                             | Warns before navigation or unload discards edits                                                                                   |
| C87 | DisputeDecision     | Dispute, outcome (resolve / dismiss), note              | Outcome note required (BR5); evidence reviewable before deciding                                                                   |
| C88 | EscrowSettle        | Hold, action (release / refund), reason                 | Authorisation per BR2; refund requires a reason (BR3); confirmation names amount and recipient                                     |

---

## Accessibility Standards

All contracts meet:

- ✓ WCAG 2.2 Level AA
- ✓ Keyboard navigation
- ✓ Screen reader support (ARIA roles, labels)
- ✓ Contrast meets WCAG 1.4.3 (text) and 1.4.11 (non-text) — checked in [Phase 9](phase-9-qa-checklist.md)
- ✓ Focus indicators visible
- ✓ Target size meets WCAG 2.5.8

## Testing Expectations

All contracts have:

- ✓ Unit / component tests (Vitest, Testing Library) — >80% coverage target on `lib/`, >60% on `components/`
- ✓ Accessibility assertions (`vitest-axe`)
- ✓ Visual regression tests _(specified in version 1; no runner installed — status in Phase 8)_
- ✓ Isolated stories per state _(Storybook specified in version 1; not installed — status in Phase 8)_

---

## Regeneration Notes

- **Retained:** all 78 named components as contracts C1–C78, their numbers, props (as inputs), states, keyboard and ARIA notes; the accessibility and testing lists.
- **Added:** contract defaults; validation, loading, error and content rules where the old entries lacked them; C79–C88 for shipped interactive elements with no contract.
- **Changed — renamed:** file `phase-6-component-library.md` → `phase-6-interaction-contracts.md`; "Component Library" → "Interaction Contracts"; C6 "Badge" → "Status Label (Badge)"; C9 "Skeleton" → "Loading Placeholder (Skeleton)"; tier counts corrected ("Patterns (20)" → 18, "Composed (48+)" → 48).
- **Changed — dropped as visual prescription:** Button variants described as "solid, on brand color", "outline, neutral border", "solid red", "transparent, hover underline", sizes "32px / 40px / 48px", hover/pressed/disabled colours ("darken/brighten", "deeper color", "gray"); Input state styling ("light border", "blue border, shadow", "gray background", "red border"); Badge colours (green, orange, red, blue, gray) and sizes; Icon `size` (16/24/32px), `color`, `strokeWidth`; Image `objectFit`; Skeleton `width`/`height` and "pulsing animation"; Avatar sizes (32/40/56px), "Circular with background color based on name hash"; Tag `color`; Divider `margin`, `color`; Modal `size` and "Overlay darkens background"; Toast "Fixed position (bottom-right)"; Tooltip `position`; Accordion "Smooth expand/collapse animation"; Pagination "Current page highlighted"; Spinner `size`, `color`, "Continuous rotation animation"; Switch "drag handle"; Progress Bar "Filled bar"; the "Component Props Pattern" code sample (`variant`, `size`, `className` style overrides — how components are written is governed by the code); "Touch targets 48px minimum" and "Color contrast 4.5:1 / 3:1" restated as the WCAG criteria they implement; "Map View (Google Map…)" names no provider — the provider is a code decision (MapLibre, ADR 0015).

---

**Phase 6 Complete.** 88 interaction contracts specified by behaviour. Next: [Phase 7 — Frontend Architecture](phase-7-frontend-architecture.md).

# Phase 8: Implementation Roadmap

**Keyhold Design Operating System** · Phase 8 of 9 · Version 2.0 · 29 September 2026

Sprint plan, milestones, risks, testing, deployment — and the **only** place build status is recorded. Previous: [Phase 7 — Frontend Architecture](phase-7-frontend-architecture.md) · Next: [Phase 9 — QA Checklist](phase-9-qa-checklist.md).

> **Rename.** This file was `phase-9-implementation-roadmap.md` in version 1.

---

## Contents

1. [Overview](#overview)
2. [Development Phases and Priority Order](#development-phases-and-priority-order)
3. [Sprint Breakdown (16 Weeks)](#sprint-breakdown-16-weeks)
4. [Milestones & Critical Path](#milestones--critical-path)
5. [Dependencies](#dependencies)
6. [Risk Assessment & Mitigation](#risk-assessment--mitigation)
7. [Technical Debt Prevention](#technical-debt-prevention)
8. [Testing Strategy](#testing-strategy)
9. [Deployment & Rollback](#deployment--rollback)
10. [Success Criteria (MVP 1.5)](#success-criteria-mvp-15)
11. [Build Status Vocabulary](#build-status-vocabulary)
12. [Per-feature Build Status](#per-feature-build-status) — [Pages](#pages) · [Sections](#sections) · [Interaction Contracts](#interaction-contracts) · [Flows](#flows) · [Cross-cutting](#cross-cutting)
13. [Deferred Register](#deferred-register)
14. [Regeneration Notes](#regeneration-notes)

---

## Overview

Production-ready development roadmap. Transforms Phases 1-7 into executable sprints covering:

- Development phases (MVP 1.0 → 1.5 → 2.0)
- Sprint breakdown (16 weeks, 8 sprints)
- Milestones and dependencies
- Risk assessment and mitigation
- Testing strategy (unit, integration, E2E)
- Deployment readiness
- Per-feature build status

**Total Estimate:** ~1120 hours, 4-5 engineers, 16 weeks

The sprint plan below is the original plan and the delivery order it implies. Most of it is built; the [Per-feature Build Status](#per-feature-build-status) says what is and is not.

---

## Development Phases and Priority Order

| Release  | Scope                                                                                                  |
| -------- | ------------------------------------------------------------------------------------------------------ |
| MVP 1.0  | Foundation, primitives, search and discovery, authentication                                           |
| MVP 1.5  | The 27 original pages end to end, plus the trust features (flags, disputes, escrow settlement), QA      |
| 2.0      | The [Deferred Register](#deferred-register): real-time, market data, agent collaboration, analytics, Apple sign-in |

**Priority order:** Foundation → Contracts (primitives) → Search + Auth → Buyer Dashboard → Agent → Admin → QA. Within a release, anything that moves money or trust (BR1–BR5) goes before anything that only informs.

---

## Sprint Breakdown (16 Weeks)

### Sprint 1-2: Foundation & Architecture (Weeks 1-2) - 80 hours

Setup Next.js codebase per Phase 7 spec:

- TypeScript strict mode, ESLint, Prettier
- Styling foundation per the host repo's conventions (ADR 0012 — governed by the code)
- RootLayout, all Providers (Auth, Query, Theme, Motion)
- TanStack Query with persistence
- All API clients (lib/api/\*), Zod schemas
- Environment configuration

**Deliverable:** Boilerplate ready for features. Build passes.

---

### Sprint 2-3: Interaction Contracts (Weeks 3-4) - 120 hours

Implement Phase 6 contracts (primitives + patterns, C1–C30):

- Primitive contracts C1–C12
- Pattern contracts C13–C30
- Unit tests (Vitest), accessibility audit (WCAG AA)

**Deliverable:** All primitives + patterns working to contract.

---

### Sprint 3-4: Search & Discovery (Weeks 5-6) - 160 hours

Implement Phase 4 browse pages:

- Home (/) — Page 1, Journey 1
- Search Results (/search) — Page 2: filter, sort, page through and map results
- Listing Details (/listing/:id) — Page 3, Journey 2
- Map View (/map) — Page 4

**Deliverable:** Full buyer search flow end-to-end.

---

### Sprint 4-5: Authentication (Weeks 7-8) - 100 hours

Implement auth pages and flows:

- Sign Up (email/phone, verification, persona selector)
- Log In (email/password, social)
- Password Reset
- OAuth (Google, Apple, Facebook)

**Deliverable:** Complete auth system. Signup/login/reset working.

---

### Sprint 5-6: Buyer Dashboard (Weeks 9-10) - 200 hours

Implement buyer dashboard (private):

- Overview (where saves, offers and messages stand)
- My Saved (filters, sorting)
- My Offers (status, counter-offer, timeline)
- My Viewings (calendar, upcoming, reschedule)
- Messages (real-time chat, file upload)
- Alerts, Settings

**Deliverable:** Full buyer workflow. Search → Save → View → Offer → Sign.

---

### Sprint 6-7: Agent Dashboard (Weeks 11-12) - 180 hours

Implement agent dashboard:

- Dashboard (the pipeline in numbers)
- My Listings (draft/published/sold, bulk actions)
- Leads (inquiries, qualification)
- Pipeline (viewings, offers, closings)
- Calendar (integrated)
- Analytics, Settings

**Deliverable:** Agent can manage listings, leads, pipeline. CRM-like.

---

### Sprint 7-8: Admin Dashboard (Weeks 13-14) - 120 hours

Implement admin oversight:

- Overview (platform health, what needs a decision)
- Listings Moderation (queue, approve/reject)
- Users (search, verify, suspend)
- Transactions, Payments, Reports, Settings

**Deliverable:** Admin can moderate, manage users, oversee transactions.

---

### Sprint 8: QA & Polish (Weeks 15-16) - 160 hours

Pre-launch verification:

- Accessibility (WCAG 2.2 AA)
- Performance (Lighthouse >90, LCP <2.5s)
- Cross-browser (Chrome, Firefox, Safari, Edge, mobile)
- Security audit, error handling, content review

**Deliverable:** MVP 1.5 production-ready. All QA checks passing.

---

## Milestones & Critical Path

| Week | Milestone          | Criteria                                  |
| ---- | ------------------ | ----------------------------------------- |
| 2    | Architecture Ready | Boilerplate, styling foundation, build passes |
| 4    | Contracts Ready    | All primitives + patterns, accessible     |
| 6    | Search Flow MVP    | Home, search, listing details working     |
| 8    | Auth System Live   | Signup, login, reset, social working      |
| 10   | Buyer Dashboard    | Saved, offers, viewings, messages working |
| 12   | Agent Features     | Listings, pipeline, leads, calendar       |
| 14   | Admin Dashboard    | Moderation, users, payments               |
| 16   | Production Ready   | All QA checks, accessible, performant     |

**Critical Path:** Foundation → Contracts → Search + Auth → Buyer Dashboard

---

## Dependencies

| Work                         | Depends on                                                                |
| ---------------------------- | ------------------------------------------------------------------------- |
| Every portal page            | Auth + portal guard; the backend endpoint it reads                        |
| Map surfaces                 | Property coordinates and bounding-box search (met — ADR 0015)            |
| Offer detail milestones      | `Deal.acceptedOfferId`; milestone seeding at acceptance (met)             |
| Checkout and escrow          | Stripe keys; escrow authorisation (BR2)                                   |
| Calendar push                | Google OAuth grant (met)                                                  |
| Apple sign-in                | Paid Apple developer account, `.p8` key (not met)                         |
| Real-time messaging          | A transport — none chosen (not met)                                       |
| Market data for buyers       | Sold-price history (not met)                                              |
| `lib/contract/` adoption     | Backend `@ApiEnvelope` annotations for typed responses                    |
| Each page's visual build     | An owner-approved visual concept (Visual Design Hand-off)                 |

---

## Risk Assessment & Mitigation

| Risk                   | Impact | Mitigation                                     |
| ---------------------- | ------ | ---------------------------------------------- |
| Scope Creep            | High   | Feature freeze week 14, strict sprint planning |
| API Delays             | High   | Mock API early, OpenAPI specs for contracts    |
| Performance Regression | Medium | Bundle size monitoring, Lighthouse CI          |
| Auth Integration       | High   | Early spike, test flows week 7                 |
| Browser Compatibility  | Medium | Early cross-browser testing (week 6+)          |
| Team Onboarding        | Low    | Detailed docs, pair programming week 1-2       |
| Backend built, nothing renders it | High | Every backend capability gets a surface and a status row here (RATIFIED_DIVERGENCES › Closed 9 Sept) |
| Copy promises unshipped features | High | BR14/BR15 content review before launch; see the Privacy/account-deletion open item |
| Spec rewritten to match code | Medium | Divergences recorded in RATIFIED_DIVERGENCES, never by editing Phases 1–7 |

---

## Technical Debt Prevention

- The push gate: `pnpm type-check`, `pnpm lint`, `pnpm enums:check`, `pnpm contract:check`. **Git hooks are currently disabled** (`prepare` unsets `core.hooksPath`), so run the gate by hand before pushing.
- Any committed artifact maintained from an outside source gets a check twin (enum parity, contract generation).
- One fetch boundary per portal route; mappers and selectors pure and tested.
- Files over ~150 lines are split (Phase 7 › File rules).
- An ADR before any code that assumes an expensive-to-reverse decision.
- Unused exports and unwired components are recorded here with a status — never deleted without the owner naming them (Scope Preservation).

---

## Testing Strategy

**Unit Testing (Vitest):** >80% coverage on lib/ (utils, mappers, validations, hooks)
**Component Testing:** >60% coverage on components/ via @testing-library/react + vitest-axe
**E2E Testing:** no runner installed — adding one is a dependency decision needing approval
**Accessibility:** WCAG 2.2 AA on all pages
**Performance:** Lighthouse CI every PR (LCP <2.5s, INP <200ms, CLS <0.1)
**Budgets:** `styles/bundle-budget.test.ts` and `styles/responsive-budget.test.ts` run in the normal suite
**Money paths:** written acceptance criteria before tests (`docs/archive/MONEY_PATH.md` pattern)
**Visual regression and component stories:** specified in version 1's Phase 6; no tooling installed (status below)

---

## Deployment & Rollback

**Process:**

1. Merge to main (after code review + CI)
2. Tag release (v1.5.0)
3. Deploy to production (Vercel, functions pinned to Dublin — ADR 0019)
4. Smoke tests (automated)
5. Monitor (Sentry, analytics, Lighthouse)

**Rollback:** `git revert` + redeploy if critical issue

**Deployment readiness:** see `docs/DEPLOYMENT.md` for environments and secrets; [Phase 9](phase-9-qa-checklist.md) for the pre-launch checklist. `development` is 62 commits ahead of `master` at the time of writing.

---

## Success Criteria (MVP 1.5)

✓ All 27 pages implemented
✓ Search <1s, offers workflow working, real-time messages
✓ Lighthouse >90, LCP <2.5s, bundle <250kb (gzipped)
✓ WCAG 2.2 AA, keyboard nav, screen reader compatible
✓ 99.95% uptime, <0.5% error rate, no CVEs
✓ NPS >50, signup completion >70%, retention >50%

---

## Build Status Vocabulary

Every page, section, interaction contract and flow specified in Phases 1–7 appears below carrying exactly one status:

- **Specified** — defined in the blueprints, not yet scheduled.
- **Scheduled** — assigned to a sprint or milestone.
- **In progress** — implementation started.
- **Built** — implemented and merged. Here: committed on `development` (not necessarily on `master`).
- **Verified** — implemented and passing the Phase 9 checks.
- **Deferred** — deliberately postponed, with a reason and a revisit trigger (see [Deferred Register](#deferred-register)).

Status lives here and nowhere else. It is recorded against a feature, never used to remove one. A feature with no implementation is **Specified**, not absent.

**Evidence.** Statuses were resolved on 29 September 2026 by reading `app/**/page.tsx`, `components/` and `lib/` at `HEAD` of `development` (read-only), plus RATIFIED_DIVERGENCES. **Nothing is Verified:** no Phase 9 sign-off is recorded anywhere. **Nothing is Scheduled:** no sprint currently assigns remaining work. Where a feature is built but a named part of it is not, the part gets its own row (e.g. `26.3a`). Sub-row numbers carry the version 2.0 module numbers as identifiers ([Phase 4 › How to Read a Blueprint](phase-4-page-blueprints.md#how-to-read-a-blueprint)); the part itself is a primary task, rule or state of that page.

**Working tree.** The owner has uncommitted work in `components/`, `lib/` and `styles/` (notably the admin overview, portal topbar and lead response). Statuses describe `HEAD`; rows affected by that work are marked ✎.

---

## Per-feature Build Status

### Pages

| #      | Page / part                               | Status      | Evidence / note                                                                  |
| ------ | ----------------------------------------- | ----------- | -------------------------------------------------------------------------------- |
| 1      | Home                                      | Built       | `app/(public)/page.tsx`, `sections/home/*`; ratified variant (Landing page)      |
| 1.4a   | Testimonials                              | Deferred    | Needs reviewer consent — see register                                            |
| 1.7a   | Social links                              | Deferred    | Return when accounts exist                                                       |
| 2      | Search Results                            | Built       | `sections/search/*`; price bands ratified                                        |
| 2.1a   | Location autocomplete                     | Specified   | Location is plain text; `/properties/localities` unused here                     |
| 3      | Listing Detail                            | Built       | `sections/listing/*`, JSON-LD, report, map + places                              |
| 3.4a   | Video tour link                           | Specified   | Not found in listing sections                                                    |
| 4      | Map View                                  | Built       | `app/(public)/map`                                                               |
| 5      | Sign Up                                   | Built       | Google, Facebook, strength meter, role choice                                    |
| 5.5a   | Apple sign-in                             | Deferred    | See register                                                                     |
| 6      | Sign In                                   | Built       |                                                                                  |
| 7      | Reset Password                            | Built       | Emailed link (ratified)                                                          |
| 8      | Buyer Dashboard Overview                  | Built       | `dashboard-overview-*`                                                           |
| 9      | Saved Listings                            | Built       | Table (ratified)                                                                 |
| 10     | My Offers + detail                        | Built       | Comparison, counter, thread, terms, milestones, timeline, checkout               |
| 11     | Viewings                                  | Built       | Calendar day picker, schedule, "Already walked" with ratings                     |
| 12     | Messages                                  | Built       | Attach, documents, report                                                        |
| 12.2a  | Live delivery / typing from the other party | Deferred  | No real-time transport                                                           |
| 13     | Alerts                                    | Built       | Stream, mark read / all, per-type channel preferences                            |
| 13.1a  | Saved-search alerts sent                  | Deferred    | `SavedSearch.notify` stored, never read                                          |
| 14     | Settings                                  | Built       | Profile, avatar, preferences, identity verification, data export                 |
| 14.3a  | Delete account                            | In progress | `delete-account-modal.tsx` and `usersAPI.eraseMine` exist; nothing wires them    |
| 14.3b  | Change password in place                  | Specified   | Offered as a reset link only                                                     |
| 15     | Agent Dashboard                           | Built       | `/agent` (ratified route)                                                        |
| 16     | Listings                                  | Built       | Table, bulk status/delete, filters                                               |
| 16.5a  | Import CSV                                | Specified   | No import path found                                                             |
| 17     | Leads                                     | Built       | Derived temperature, platform email/call                                         |
| 17.2a  | Budget / readiness qualification          | Deferred    | No buyer financial field                                                         |
| 18     | Pipeline                                  | Built       | Drag with BR6, deal detail, milestones ✎                                         |
| 19     | Calendar                                  | Built       | Create event, Google push                                                         |
| 20     | Admin Overview                            | Built ✎     | Ratified rebuild; uncommitted rework in the working tree                         |
| 21     | Listings Moderation                       | Built       |                                                                                  |
| 22     | User Management + profile                 | Built       | Profile route read-only                                                          |
| 23     | Transactions                              | Built       |                                                                                  |
| 24     | Payments & Revenue                        | Built       | Escrow release/refund                                                            |
| 25     | Analytics & Reports                       | Built       | Export and custom report                                                         |
| 26     | Tier Verifications                        | Built       | Approve / reject with documents                                                  |
| 26.3a  | Revoke (approved) and Allow Resubmit (admin) | Specified | Not found in admin verification components                                      |
| 27     | System Settings                           | Built       | Config, policies, maintenance                                                    |
| 28     | About                                     | Built       |                                                                                  |
| 29     | Help                                      | Built       |                                                                                  |
| 30     | Blog                                      | Built       | Empty by design                                                                  |
| 31     | Contact                                   | Built       |                                                                                  |
| 32     | Privacy                                   | Built       | Legal review owed; account-deletion claim unmet (14.3a)                          |
| 33     | Terms                                     | Built       | Legal review owed                                                                |
| 34     | Accessibility                             | Built       |                                                                                  |
| 35     | Verify Email                              | Built       |                                                                                  |
| 36     | Newsletter Confirm                        | Built       |                                                                                  |
| 37     | Newsletter Unsubscribe                    | Built       |                                                                                  |
| 38     | Enquiries                                 | Built       | Read-only                                                                        |
| 39     | Purchases & Escrow                        | Built       |                                                                                  |
| 40     | Listing Submission                        | Built       |                                                                                  |
| 41     | Requests                                  | Built       | ✎ (lead response modal renamed in working tree)                                  |
| 42     | VIP Concierge                             | Built       | Read-only                                                                        |
| 42.6a  | Add / edit / remove clients, save services | In progress | Hooks in `use-concierge.ts`; no surface                                          |
| 43     | Disputes                                  | Built       |                                                                                  |
| 44     | Reported Members & Messages               | Built       |                                                                                  |
| 45     | Not Found                                 | Built       | `app/not-found.tsx`                                                              |
| 46     | Error                                     | Built       | Segment boundaries (search, listing, three portals)                              |
| 46.a   | Root error boundary; support error ID     | Specified   | No `global-error`; no error ID shown                                             |

### Sections

| #     | Section                         | Status      | Evidence / note                                          |
| ----- | ------------------------------- | ----------- | -------------------------------------------------------- |
| 1     | Hero Search                     | Built       | `home/hero*`, `city-chips`                               |
| 2     | Featured Carousel               | Built       | `premier-listing`, `featured-gallery`                    |
| 3     | Trust Signals                   | Built       | `stats-band`, `guarantees` (ratified)                    |
| 4     | How It Works                    | Built       | `concierge*` (ratified)                                  |
| 5     | CTA Banner                      | Built       | `cta-banner`                                             |
| 6     | Listing Gallery                 | Built       | `listing-gallery`, `listing-lightbox`                    |
| 7     | Listing Price Bar               | Built       | `listing-price-bar`                                      |
| 8     | Listing Key Facts               | Built       | `listing-key-facts`                                      |
| 9     | Listing Description             | Built       | `listing-description`, `listing-features`                |
| 9a    | Video tour                      | Specified   | —                                                        |
| 10    | Neighborhood Map                | Built       | `listing-neighborhood`, `nearby-kind-toggles`            |
| 11    | Comparables                     | Built       | Active listings, not sold                                |
| 11a   | Sold comparables                | Deferred    | Market understanding — see register                      |
| 12    | Agent Card                      | Built       | `listing-agent-card`                                     |
| 13    | Listing Card                    | Built       | `search-result-card`                                     |
| 14    | Listing Status Timeline         | Built       | `deal-progress` (stages), milestones                     |
| 15    | Listing Moderation Queue        | Built       | Extended by 63                                           |
| 16    | Offer Form                      | Built       | `make-offer-modal`, `offer-contingency-list`             |
| 17    | Offer Status Card               | Built       | `offer-row`                                              |
| 18    | Offer Timeline                  | Built       | `timeline-list`                                          |
| 19    | Counter Offer Form              | Built       | `counter-offer-panel`                                    |
| 20    | Offer Comparison                | Built       | `comparison-columns`                                     |
| 21    | Inspection/Appraisal Tracker    | Built       | `milestone-*`                                            |
| 22    | Message Thread                  | Built       | `thread-messages`, `message-bubble`                      |
| 23    | Message Input                   | Built       | `message-composer`, attachments                          |
| 24    | Message Notification            | Built       | `conversation-item`                                      |
| 24a   | Delete / snooze from the list   | Specified   | —                                                        |
| 25    | Document Share                  | Built       | `document-card`, `document-list`                         |
| 26    | Typing Indicator                | Built       | Shows the sender's own pending send only                 |
| 26a   | Other party typing              | Deferred    | Real-time transport                                      |
| 27    | Thread Header                   | Built       | `thread-header`                                          |
| 28    | Conversation List               | Built       | `conversation-list`                                      |
| 29    | Unnamed messaging section       | Specified   | Owner to name                                            |
| 30    | Input Field                     | Built       | `forms/form-field`, `input`                              |
| 31    | Checkbox Group                  | Built       | `forms/checkbox`                                         |
| 32    | Radio Button Group              | Built       | `auth-role-choice` (single instance)                     |
| 33    | Dropdown/Select                 | Built       | `forms/select`                                           |
| 34    | Date Picker                     | Built       | Native date input in viewing, offer, appointment modals  |
| 35    | Price Slider                    | Specified   | Ratified alternative (price-band chips) is built         |
| 36    | Toggle/Switch                   | Built       | `forms/switch`, `toggle-row`                             |
| 37    | Search Input (Autocomplete)     | Specified   | Command palette searches routes; no location suggestions |
| 38    | File Upload                     | Built       | `forms/file-upload`                                      |
| 39    | Multi-Step Form                 | Specified   | Stepwise flows exist (reset password, offer review) without a general step form |
| 40    | Stat Card                       | Built       | `ui/stat-card`, `patterns/stat-cell`                     |
| 41    | Data Table                      | Built       | `patterns/data-table*`                                   |
| 42    | Pipeline Card                   | Built       | `deal-row`, `pipeline-stage-column`                      |
| 43    | Activity Feed                   | Built       | `shared/activity-list`                                   |
| 44    | Quick Stats Widget              | Built       | `patterns/stat-band`                                     |
| 45    | Calendar Widget                 | Built       | `shared/mini-calendar`                                   |
| 46    | Chart/Graph                     | Built       | `ui/charts/*`                                            |
| 47    | Header                          | Built       | `layout/header*`                                         |
| 48    | Footer                          | Built       | `layout/footer*`, `newsletter-form`                      |
| 49    | Sidebar Navigation              | Built ✎     | `layout/sidebar*`                                        |
| 50    | Toast Notification              | Built       | `ui/toast`, `toast-viewport`                             |
| 51    | Modal/Dialog                    | Built       | `ui/modal`, `patterns/confirm-modal`                     |
| 52    | Empty State                     | Built       | `ui/empty-state`                                         |
| 53    | 404 Not Found                   | Built       | `app/not-found.tsx`                                      |
| 54    | 500 Server Error                | Built       | Segment `error.tsx`; error ID not shown (46.a)           |
| 55    | Offline/No Connection           | Specified   | No offline handling (Principle 5 ratified)               |
| 56    | Admin Console Shell             | Built ✎     | `portal-shell`, `sidebar*`, `topbar*`                    |
| 57    | Volume Metrics Grid             | Built ✎     | Admin overview                                           |
| 58    | Revenue Trend Panel             | Built       | Overview, payments                                       |
| 59    | Revenue Breakdown Panel         | Built ✎     | Folded into one estimated line (ratified)                |
| 60    | System Health List              | Built ✎     | `service-health-table`                                   |
| 61    | System Alert List               | Built ✎     | Merged into "Needs a Decision" (ratified)                |
| 62    | Moderation Queue Summary        | Built ✎     | Merged into "Needs a Decision" (ratified)                |
| 63    | Moderation Listings Table       | Built       | `moderation-listing-table`                               |
| 64    | Moderation Decision Modal       | Built       | `moderation-decision-modal`                              |
| 65    | User Management Table           | Built       | `user-table`                                             |
| 66    | Transaction Ledger Table        | Built       | `transaction-ledger-table`                               |
| 67    | Verification Request List       | Built       | Revoke / Allow Resubmit: 26.3a                           |
| 68    | Platform Config Panel           | Built       | `shared/config-panel`, `patterns/config-field-grid`      |
| 69    | Policy Toggle Panel             | Built       | `policy-switch-table`                                    |
| 70    | Maintenance Panel               | Built       | `maintenance-panel`, `maintenance-confirm-modal`         |

### Interaction Contracts

| #       | Contract                        | Status    | Note                                                    |
| ------- | ------------------------------- | --------- | ------------------------------------------------------- |
| C1–C4   | Button, Input, Select, Checkbox | Built     | `components/ui/`, `ui/forms/`                           |
| C5      | Radio Button                    | Built     | Auth role choice only; no reusable primitive            |
| C6–C14  | Status Label, Icon, Image, Loading Placeholder, Avatar, Tag, Divider, Modal, Toast | Built | `components/ui/`                          |
| C15     | Tooltip                         | Built     | One consumer (charts)                                   |
| C16     | Tabs                            | Built     | Listing detail                                          |
| C17     | Accordion                       | Built     | Primitive exists; no consumer yet                       |
| C18–C19 | Pagination, Spinner             | Built     |                                                         |
| C20     | Date Picker                     | Built     | Native date input                                       |
| C21     | Time Picker                     | Built     | Slot choice in viewing request                          |
| C22     | Price Input                     | Built     | Offer and counter amounts                               |
| C23     | Price Range Slider              | Specified | Ratified alternative built                              |
| C24     | Search / Autocomplete Input     | Specified | Command palette covers routes only                      |
| C25–C27 | File Upload, Progress Bar, Breadcrumb | Built ✎ | Breadcrumb's only consumer is removed in the working tree |
| C28     | Badge Count / Avatar Group      | Specified | —                                                       |
| C29–C30 | Dropdown Menu, Switch           | Built     | `ui/menu`, `forms/switch`                               |
| C31–C39 | Listing and Search contracts    | Built     | `sections/listing`, `sections/search`                   |
| C40–C43 | Offer contracts                 | Built     | `features/listings`, `features/offers`                  |
| C44–C47 | Messaging contracts             | Built     | `features/messaging`                                    |
| C48–C52 | Dashboard contracts             | Built     | `features/dashboard`, `sections/dashboard`              |
| C53–C56 | Agent contracts                 | Built     | `features/agent`                                        |
| C57–C69 | Admin contracts                 | Built ✎   | `features/admin`; C64 revoke/resubmit per 26.3a         |
| C70–C73 | Auth contracts                  | Built     | `features/auth`                                         |
| C74–C78 | Layout contracts                | Built ✎   | `components/layout`                                     |
| C79–C88 | Added contracts                 | Built     | report, command palette, newsletter, checkout, viewing request, listing editor, confirm modal, unsaved-changes guard, dispute decision, escrow settle |

### Flows

| #   | Journey                          | Status   | Note                                                        |
| --- | -------------------------------- | -------- | ----------------------------------------------------------- |
| J1  | Search & Discovery               | Built    | Autocomplete: 2.1a                                          |
| J2  | Listing Detail & Evaluation      | Built    | Sold comps deferred                                         |
| J3  | Viewing Coordination             | Built    | Reminders and post-showing survey: see J3a                  |
| J3a | 24-hour reminders                | Specified | Nothing in the frontend; the backend was not inspected     |
| J4  | Offer Workflow                   | Built    | Real-time notification deferred                             |
| J5  | Real-Time Messaging              | Built    | As refresh-on-invalidate; real-time deferred (J5a)          |
| J5a | Real-time delivery, group negotiation thread | Deferred | Transport; representation model          |
| J6  | Authentication                   | Built    | Apple deferred; phone/SMS opt-in step not found (J6a)       |
| J6a | Phone number and SMS opt-in at sign-up | Specified | —                                                     |
| J7  | Profile & Preferences            | Built    | Delete account 14.3a                                        |
| J8  | Platform Health Triage           | Built ✎  |                                                             |
| J9  | Listing Moderation               | Built    |                                                             |
| J10 | Tier Verification Review         | Built    | Revoke / resubmit 26.3a                                     |
| J11 | User Enforcement                 | Built    |                                                             |
| J12 | Revenue & Payout Oversight       | Built    |                                                             |
| J13 | Platform Configuration           | Built    |                                                             |
| J14 | Buyer Dashboard Check-in         | Built    |                                                             |
| J15 | Agent Daily Desk                 | Built ✎  |                                                             |
| J16 | Listing Submission & Lifecycle   | Built    | CSV import 16.5a                                            |
| J17 | Deposit, Escrow & Closing        | Built    |                                                             |
| J18 | Report, Flag & Dispute           | Built    | Flags collect no decision note (open question)              |
| J19 | Notifications & Alerts           | Built    | Saved-search alerts deferred                                |

### Cross-cutting

| Item                                        | Status      | Note                                            |
| ------------------------------------------- | ----------- | ----------------------------------------------- |
| Product analytics (funnel KPIs, NPS)        | Deferred    | See register                                    |
| Offline capability                          | — (non-goal) | Ratified; not a feature                        |
| E2E test runner                             | Specified   | Needs dependency approval                       |
| Visual regression tests, component stories  | Specified   | From version 1 Phase 6 testing list             |
| `lib/contract/` adoption                    | Specified   | Generated; no consumers yet                     |
| Two-factor authentication                   | In progress | `two-factor-modal.tsx` exists, unwired; not in any blueprint (open question) |
| Legal review of Privacy and Terms           | Specified   | Before launch                                   |

---

## Deferred Register

Carried from RATIFIED_DIVERGENCES › Deferred. Each carries a reason and a revisit trigger.

| Feature                                             | Reason                                              | Revisit trigger                                         |
| --------------------------------------------------- | --------------------------------------------------- | ------------------------------------------------------- |
| Apple sign-in (Page 5)                              | No paid developer account or `.p8` key               | Account and key exist                                   |
| Understand the market (Buyer JTBD 1), sold comps    | No sold-price history; trend/region endpoints admin-only | Sold-price history modelled                        |
| Real-time collaboration (competitive table, J5)     | No transport                                        | A transport is chosen (ADR)                             |
| Lead budget and readiness (Agent JTBD 2)            | No buyer financial field                            | Field added to the schema                               |
| Agent collaboration (Agent JTBD 4)                  | No representation model (ADR 0018)                  | Representation model designed                           |
| Price guidance (Seller JTBD 1)                      | No valuation source                                 | Valuation source chosen                                 |
| Funnel KPIs and NPS                                 | No product analytics                                | Analytics chosen (dependency approval)                  |
| Testimonials (Page 1 module 4 · trust)              | Reviewer consent not collected                      | Consent mechanism exists                                |
| Social links (Page 1 module 7 · site-wide links)    | Accounts do not exist                               | Accounts created                                        |
| Newsletter issues                                   | No sender                                           | A sender exists (the list itself is built)              |
| Saved-search alerts                                 | `SavedSearch.notify` is never read                  | A matcher sends them                                    |

---

## Regeneration Notes

- **Retained:** overview, the full sprint breakdown with hours, milestones, critical path, risk table, testing strategy, deployment and rollback, success criteria.
- **Added:** development phases and priority order, dependencies, three risks, technical debt prevention, the Build Status Vocabulary, per-feature build status for 46 pages, 70 sections, 88 contracts and 19 flows (with sub-rows for unbuilt parts), cross-cutting status, the Deferred Register.
- **Changed — screen content removed (30 September 2026, seed-prompt Self-Audit):** Sprint 2-3 component list ("Primitives: Button, Input, Select, Checkbox, Badge, Icon, Image, Skeleton", "Patterns: Modal, Toast, Banner, Tabs, Date Picker, Multi-Step Form") → contract ranges C1–C12 and C13–C30; Sprint 3-4 page-content lists ("with search entry, featured, trending, trust signals", "with photos, description, map, comps, agent") → page and journey references; Sprint 5-6, 6-7 and 7-8 "quick stats", "stats", "health stats, alerts" → what the user learns; "trust surfaces" → "trust features"; Deferred Register entries name their subject beside the module number. Build-status evidence (file paths such as `cta-banner`, `listing-agent-card`, `ui/modal`) is a record of code and is unchanged.
- **Changed:** file renamed `phase-9-implementation-roadmap.md` → `phase-8-implementation-roadmap.md`; Sprint 1 "Design tokens (CSS variables + TS exports)" → "Styling foundation per the host repo's conventions"; Sprint 2-3 "Component Library / Implement Phase 6 components" → "Interaction Contracts / … contracts"; milestone "design system" → "styling foundation", "Component Library" → "Contracts Ready"; "My Saved (grid, …)", "My Offers (table, …)", "My Listings (grid, …)" drop the presentation word; "Home with hero" → "with search entry"; "Transforms Phases 1-8" → "Phases 1-7"; FID target → INP (FID was retired as a Core Web Vital); the hook-based push gate statement corrected (hooks disabled).

---

**Phase 8 Complete.** Implementation roadmap and build status ready for team execution. Next: [Phase 9 — QA Checklist](phase-9-qa-checklist.md).

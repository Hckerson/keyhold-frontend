# Phase 9: QA & Accessibility Checklist

**Keyhold Design Operating System** · Phase 9 of 9 · Version 2.0 · 29 September 2026

Pre-launch verification suite. QA here is functional; visual quality is judged when each page is built, with the owner. Previous: [Phase 8 — Implementation Roadmap](phase-8-implementation-roadmap.md) · Start again: [START_HERE](../INDEX/START_HERE.md).

> **Rename.** This file was `phase-10-qa-checklist.md` in version 1. A feature passing this checklist moves to **Verified** in [Phase 8](phase-8-implementation-roadmap.md#build-status-vocabulary) — and only then.

---

## Contents

1. [Overview](#overview)
2. [Accessibility (WCAG 2.2 AA)](#accessibility-wcag-22-aa)
3. [Responsiveness](#responsiveness)
4. [Cross-Browser Testing](#cross-browser-testing)
5. [Performance (Core Web Vitals)](#performance-core-web-vitals)
6. [Behavioural Consistency](#behavioural-consistency)
7. [State Coverage, Loading and Error Handling](#state-coverage-loading-and-error-handling)
8. [Content Honesty](#content-honesty)
9. [Code Quality & Security](#code-quality--security)
10. [Admin Console QA](#admin-console-qa)
11. [SEO](#seo)
12. [Scalability, Maintainability and Developer Experience](#scalability-maintainability-and-developer-experience)
13. [Pre-Launch Checklist (48 Hours)](#pre-launch-checklist-48-hours)
14. [Post-Launch Monitoring](#post-launch-monitoring)
15. [Sign-Off](#sign-off)
16. [Regeneration Notes](#regeneration-notes)

---

## Overview

Production-ready QA checklist ensuring:

- WCAG 2.2 AA accessibility compliance
- Responsiveness (every task achievable from 320 CSS px upward)
- Cross-browser compatibility
- Performance budgets (Core Web Vitals)
- Behavioural consistency and state coverage
- Security standards
- Code quality
- SEO readiness
- Admin console verification (access control, destructive actions, data integrity)

**Use this checklist week 15-16 before launch.**

---

## Accessibility (WCAG 2.2 AA)

### Contrast & Colour

- [ ] All text meets contrast ≥4.5:1 (normal) or ≥3:1 (large text) — WCAG 1.4.3
- [ ] Non-text contrast ≥3:1 for controls, focus indicators and meaningful graphics, dividers included, measured against the surface they sit on — WCAG 1.4.11
- [ ] No status conveyed by color alone (use text)
- [ ] Form errors use text, not color
- [ ] Test with color blindness filters (Protanopia, Deuteranopia)

### Keyboard Navigation

- [ ] Tab order follows reading order
- [ ] Focus indicators visible on all interactive elements
- [ ] No keyboard traps (Tab never gets stuck)
- [ ] Focus moves to error message after validation failure
- [ ] ESC closes modals, Enter activates buttons
- [ ] Every pointer-only interaction (drag in the pipeline, map pins) has a keyboard equivalent

### Screen Reader

- [ ] Headings in order (h1 → h2 → h3, no skips)
- [ ] Semantic HTML (<button>, <input>, <nav>, <main>)
- [ ] All inputs have associated labels
- [ ] Images have meaningful alt text
- [ ] ARIA labels on icon buttons
- [ ] Form validation errors announced
- [ ] Dynamic content updates announced (aria-live)

### Forms & Inputs

- [ ] Every input has <label htmlFor>
- [ ] Required fields marked with aria-required
- [ ] Error messages clear and actionable
- [ ] Password strength indicator has text description
- [ ] Success feedback clear

### Motion and Targets

- [ ] `prefers-reduced-motion` is honoured everywhere
- [ ] Target size meets WCAG 2.5.8 (minimum 24×24 CSS px or sufficient spacing)
- [ ] Content on hover or focus is dismissible, hoverable and persistent — WCAG 1.4.13

---

## Responsiveness

Functional checks only. How each page adapts is decided at build time.

### Small screens (from 320 CSS px)

- [ ] No horizontal page scroll; content reflows — WCAG 1.4.10
- [ ] Text readable without zoom; zoom to 200% loses nothing — WCAG 1.4.4
- [ ] Navigation accessible
- [ ] Images never overflow their container
- [ ] Every primary task on public pages completable by touch

### Medium screens

- [ ] Navigation clear
- [ ] Portrait + landscape both work

### Large screens

- [ ] Nothing depends on hover alone
- [ ] Long lines of prose remain readable

### Portals (desktop-first, ratified)

- [ ] On narrow viewports every column's information and every action stays reachable
- [ ] Tables scroll within themselves, never the page body

### Orientation Changes

- [ ] Portrait → Landscape: no content lost
- [ ] Landscape → Portrait: no content lost

---

## Cross-Browser Testing

### Desktop Browsers

- [ ] Chrome (latest + 1)
- [ ] Firefox (latest + 1)
- [ ] Safari (latest + 1)
- [ ] Edge (latest)

**Each browser:**

- [ ] No console errors/warnings (except third-party)
- [ ] Every page renders without broken content
- [ ] All features work

### Mobile Browsers

- [ ] iOS Safari (iPhone 12, SE)
- [ ] Chrome Android (Pixel, Galaxy)
- [ ] Tap targets work
- [ ] Scrolling works, including inside maps and tables
- [ ] Persistent navigation and actions remain reachable
- [ ] Dialogs usable, including with the on-screen keyboard open

---

## Performance (Core Web Vitals)

### Lighthouse Audit

```bash
pnpm build && pnpm start
# Then: Chrome DevTools → Lighthouse tab
```

**Targets:**

- [ ] LCP (Largest Contentful Paint) <2.5s
- [ ] INP (Interaction to Next Paint) <200ms (replaces FID <100ms)
- [ ] CLS (Cumulative Layout Shift) <0.1
- [ ] Performance Score >90

**Test Each Page:**

- [ ] Homepage
- [ ] Search Results
- [ ] Listing Details
- [ ] Map View
- [ ] Dashboard
- [ ] Agent Dashboard
- [ ] Admin Overview (heaviest page — metrics, revenue series, several panels)
- [ ] Admin Moderation (table + image-heavy detail)
- [ ] Admin Reports (three charts)

### Metrics

- [ ] LCP <2.5s: LCP image prioritised, below-fold images lazy-loaded
- [ ] INP <200ms: No JS blocking interactions
- [ ] CLS <0.1: Space reserved for images, no late-loading content
- [ ] TTFB <600ms: Fast backend
- [ ] FCP <1.8s: Paint quick, no render-blocking CSS/JS

### Bundle Size

```bash
pnpm build
# Check: .next/static size
```

**Targets:**

- [ ] JS (gzipped) <250kb
- [ ] CSS (gzipped) <50kb
- [ ] Total <300kb
- [ ] MapLibre loads only on routes that show a map

### Image Optimization

- [ ] Modern formats (WebP/AVIF) with fallback
- [ ] Responsive (srcset for different sizes)
- [ ] Lazy-loaded by default
- [ ] Width/height specified (prevent CLS)
- [ ] Served from CDN

---

## Behavioural Consistency

The same action works the same way everywhere.

- [ ] Every destructive or irreversible action uses the one confirmation pattern (C85): names target and effect, locks while pending, reports failure inline (BR10)
- [ ] No write is retried automatically; a failed write is retried only by the person
- [ ] Save/unsave behaves identically on cards, detail and saved list
- [ ] Every decision that requires a note (moderation, disputes, refunds) enforces it the same way — whitespace-only is rejected
- [ ] Error toasts never duplicate an inline error for the same failure (ADR 0013)
- [ ] Counts that describe the same thing (badges, headers, lists) agree everywhere
- [ ] Labels follow Phase 3 › Labeling Conventions

---

## State Coverage, Loading and Error Handling

- [ ] Every page and section has loading, empty, error and success states (Phase 4, Phase 5 defaults)
- [ ] 404 page helpful, with routes to search and home
- [ ] 500 boundaries helpful, with retry and reassurance about what was not affected
- [ ] API errors show user-friendly messages
- [ ] Network errors handled gracefully
- [ ] Form errors clear and inline
- [ ] Loading states preserve structure (no layout shift) and are announced as busy
- [ ] Empty states are helpful with a next action
- [ ] A failed panel never blanks the rest of its page
- [ ] An outage never looks like an empty market (Page 1 states)
- [ ] A failed lookup is told apart from an empty result (nearby places)
- [ ] Navigating away with unsaved changes warns (C86)

---

## Content Honesty

- [ ] No fabricated figures, inventory, testimonials or place markers (BR15)
- [ ] Promoted placements labelled "Featured"; popularity labelled "Most viewed"
- [ ] Estimates labelled as estimates (BR17)
- [ ] No copy promises an unshipped feature: saved-search alerts, newsletter cadence, **account deletion on the Privacy page (Page 14 item 14.3a)**
- [ ] Privacy and Terms reviewed by someone qualified

---

## Code Quality & Security

### TypeScript

- [ ] Strict mode enabled (`"strict": true`)
- [ ] No `any` types
- [ ] Type check passes (`pnpm type-check`)

### ESLint & Prettier

- [ ] No lint errors (`pnpm lint` passes)
- [ ] Code formatted (`pnpm format`)
- [ ] Enum parity passes (`pnpm enums:check`); contract is current (`pnpm contract:check`)
- [ ] Code conforms to `.claude/CLAUDE.md`, including its styling rules (enforced by lint and review, not by this design OS)
- [ ] Hooks are disabled in this repo — the gate above was run by hand

### Security

- [ ] `pnpm audit` passes (no high/critical CVEs)
- [ ] Secrets not in code (.env.local not committed)
- [ ] No API keys in client code
- [ ] XSS prevention (no innerHTML)
- [ ] CSRF tokens on POST/PATCH/DELETE
- [ ] Rate limiting enforced by the NestJS backend
- [ ] Content Security Policy pins third-party origins (map tiles, payments)
- [ ] OAuth: PKCE and sealed state; account linking per BR12

### Testing

- [ ] Unit tests >80% (lib/ — utils, mappers, validations, hooks)
- [ ] Integration tests >60% (components/)
- [ ] All tests passing (`pnpm test`)
- [ ] Money paths have numbered acceptance criteria with tests named after them

---

## Admin Console QA

Admin surfaces carry destructive and irreversible actions, so they get their own
pass. Run this section signed in as an admin, then repeat the access checks signed
in as a buyer and as an agent.

### Access Control

- [ ] Unauthenticated visit to any /admin route redirects to login
- [ ] Buyer account cannot reach any /admin route (server-enforced, not hidden nav)
- [ ] Agent account cannot reach any /admin route
- [ ] Direct URL entry is blocked, not just the navigation link
- [ ] Logout clears auth state and token, then redirects to /
- [ ] Expired token mid-session redirects rather than rendering an empty console

### Console Shell

- [ ] All six nav groups render with labels (Overview, Marketplace, Finance, Insights, Trust & Safety, System)
- [ ] Current route indicated, and marked `aria-current`
- [ ] Verifications count equals the pending total on /admin/verifications
- [ ] Current-location trail matches the route registry on every page
- [ ] Navigation on narrow screens traps focus while open
- [ ] Content area never scrolls horizontally at 320px

### Tables (Users, Moderation, Transactions)

- [ ] Every table has a caption describing all its columns
- [ ] Action columns use screen-reader-only headers, not empty `<th>`
- [ ] Sort control is a button, announces direction, and is keyboard operable
- [ ] Default sort matches the spec (users by name asc, moderation by status)
- [ ] Footer totals recompute from the visible rows, not a hardcoded value
- [ ] Row marking (suspended, flagged, rejected) is never the only status signal
- [ ] Selection state is announced; bulk actions are reachable by keyboard
- [ ] Pagination preserves sort and filter
- [ ] Empty message renders per table ("No users to show", "No listings match this filter right now")
- [ ] Table scrolls inside its own container — the page body does not

### Moderation Flow

- [ ] Status filters show accurate counts and reset selection on change
- [ ] Row detail opens with photos, description, flag reason, compliance checklist, agent contact
- [ ] Approve is single-click; Reject and Request Changes always open the note modal
- [ ] Submit stays disabled until the note is non-empty (test whitespace-only)
- [ ] Reject sets rejected + note; Request Changes returns to pending + changes-requested flag
- [ ] Bulk actions apply the same note requirement
- [ ] Approve is hidden on already-approved rows; Reject hidden on already-rejected
- [ ] Modal traps focus, closes on ESC, and returns focus to the trigger
- [ ] Counts in the page header update after every decision

### Verifications

- [ ] Actions match status (pending / approved / rejected sets)
- [ ] Tier upgrade path reads current → requested, never inferred
- [ ] Approve, Reject, Revoke and Allow Resubmit each update counts and the navigation count
- [ ] Status is text, not colour alone
- [ ] Document count is accurate and Review Docs opens the evidence

### Trust Queues (Flags, Disputes, Escrow) — added

- [ ] Flags and disputes order open items first
- [ ] Dispute resolve and dismiss require an outcome note (BR5)
- [ ] Escrow refund requires a reason (BR3); release follows BR2 for every role
- [ ] Settled items are read-only
- [ ] The reporter is never disclosed to the reported party

### Settings

- [ ] Every field has a real `<label htmlFor>`
- [ ] Prefix and suffix (%, $, days) are not the only unit indicator
- [ ] Editing any field clears the saved state and restores "Save Changes"
- [ ] Save shows the success confirmation and the button reads "Saved"
- [ ] Reset restores stored values and clears the saved flag
- [ ] Navigating away with unsaved changes warns before discarding
- [ ] Toggles expose `role="switch"` with the title as accessible name
- [ ] Maintenance-mode and other destructive actions require confirmation
- [ ] Maintenance mode active shows an unmistakable global indicator

### Charts & Data Display

- [ ] Every chart has a text summary or accessible table alternative
- [ ] Series distinguishable without colour (label, pattern, or direct value)
- [ ] Chart values reachable by keyboard
- [ ] Decorative trend series marked `aria-hidden`
- [ ] Stat links have an accessible name covering label + value
- [ ] Currency and percentage formatting consistent across every admin page
- [ ] Charts lose no content on resize

### Admin Data Integrity

- [ ] Header counts, navigation counts and page contents derive from one source
- [ ] Commission figures use the configured rate, never a hardcoded literal
- [ ] Stat totals reconcile with the table footers on the same page
- [ ] Optimistic updates roll back visibly if the request fails

---

## SEO

- [ ] Meta tags on every page (title, description)
- [ ] Structured data (JSON-LD for listings)
- [ ] Open Graph tags for social sharing
- [ ] Sitemaps (/sitemap.xml) include every available listing
- [ ] Robots.txt configured; portals, auth and token routes not indexed
- [ ] Canonical URLs
- [ ] Mobile-friendly
- [ ] Core Web Vitals passing

---

## Scalability, Maintainability and Developer Experience

- [ ] Search, lists and tables paginate on the server; no screen loads an unbounded collection
- [ ] Map queries are bounded by the viewport
- [ ] One fetch boundary per portal route; presentational sections receive props
- [ ] Files respect the ~150-line rule; mappers and selectors are pure and tested
- [ ] Every divergence from Phases 1–7 is recorded in RATIFIED_DIVERGENCES
- [ ] Every feature in Phases 1–7 has a status row in Phase 8
- [ ] A new engineer can run the app from SETUP-CHECKLIST alone

---

## Pre-Launch Checklist (48 Hours)

- [ ] Accessibility audit complete (no blockers)
- [ ] Performance Lighthouse >90 (all pages)
- [ ] All E2E tests passing
- [ ] Security audit complete
- [ ] Admin console section signed off, including role-escalation checks
- [ ] Staging environment tested
- [ ] Backup/rollback plan ready
- [ ] Monitoring set up (Sentry, analytics)
- [ ] Team on-call 24 hours post-launch

---

## Post-Launch Monitoring

**First 24 Hours:**

- [ ] Error rate <0.5% (Sentry)
- [ ] Page load time <2.5s (Analytics)
- [ ] Uptime 99.95% (Monitoring)
- [ ] No security incidents
- [ ] User feedback positive (NPS >50)

---

## Sign-Off

**QA Lead:** ____________________ **Date:** ____________

**Product Manager:** ____________________ **Date:** ____________

**Engineering Lead:** ____________________ **Date:** ____________

---

## Regeneration Notes

- **Retained:** every accessibility, cross-browser, performance, security, testing, admin-console, error-handling, SEO, pre-launch and post-launch item, and the sign-off block.
- **Added:** non-text contrast, keyboard equivalents for pointer-only interactions, motion and target-size checks; behavioural consistency; content honesty; trust-queue checks; scalability, maintainability and developer experience; enum/contract gate items; the reduced-motion and divider-contrast rules moved from old Phase 7.
- **Changed:** file renamed `phase-10-qa-checklist.md` → `phase-9-qa-checklist.md`. FID replaced by INP. The **Design System Compliance** section (no hardcoded colours / spacing / typography / motion, token names) dropped — styling is governed by the code and checked by lint. Responsive section recast as functional checks — dropped: breakpoint bands "320-479px / 480-1023px / 1024px+", "Touch targets ≥48px / ≥44px", "Text readable without zoom (14-16px minimum)", "2-column layout works (sidebar + content)", "3-column layout optimized (not stretched)", "Max content width ~1200px", "Hover states visible", "Whitespace adequate", "No fixed widths (use %)", "Images responsive (max-width: 100%)". Cross-browser "Layout renders correctly", "CSS variables working", "Flexbox/Grid renders as expected", "Modals display correctly", "Scrolling smooth", "Sticky headers work" recast functionally. "Tab order is logical (left-to-right, top-to-bottom)" → "follows reading order". "Numeric columns use tabular figures and right alignment" dropped. "404/500 page styled and helpful" → "helpful". "Loading states use skeletons (not spinners)" → "preserve structure". "Success feedback clear (toast or banner)" → "clear". "Hero image optimized" → "LCP image prioritised". "Row tinting", "badge", "sidebar", "callout" → neutral terms. "WebP with JPEG fallback" → "modern formats with fallback".

---

**Phase 9 Complete.** A feature that passes this checklist is marked Verified in Phase 8. Back to [START_HERE](../INDEX/START_HERE.md).

# Phase 10: QA & Accessibility Checklist

**Real Estate Platform Design Operating System** - Pre-launch verification suite

---

## Overview

Production-ready QA checklist ensuring:

- WCAG 2.2 AA accessibility compliance
- Responsive design (320px - 1440px+)
- Cross-browser compatibility
- Performance budgets (Core Web Vitals)
- Security standards
- Code quality
- SEO readiness
- Admin console verification (access control, destructive actions, data integrity)

**Use this checklist week 15-16 before launch.**

---

## Accessibility (WCAG 2.2 AA)

### Color & Contrast

- [ ] All text has contrast ≥4.5:1 (normal) or ≥3:1 (large text)
- [ ] No status conveyed by color alone (use icon + text)
- [ ] Form errors use icon + text, not color
- [ ] Test with color blindness filters (Protanopia, Deuteranopia)

### Keyboard Navigation

- [ ] Tab order is logical (left-to-right, top-to-bottom)
- [ ] Focus indicators visible on all interactive elements
- [ ] No keyboard traps (Tab never gets stuck)
- [ ] Focus moves to error message after validation failure
- [ ] ESC closes modals, Enter activates buttons

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
- [ ] Success feedback clear (toast or banner)

---

## Responsive Design

### Mobile (320-479px)

- [ ] No horizontal scroll (content fits viewport)
- [ ] Touch targets ≥48px
- [ ] Text readable without zoom (14-16px minimum)
- [ ] Navigation accessible (hamburger or sticky header)
- [ ] Images responsive (max-width: 100%)

### Tablet (480-1023px)

- [ ] 2-column layout works (sidebar + content)
- [ ] Touch targets ≥44px (acceptable for tablets)
- [ ] Portrait + landscape both work
- [ ] Navigation clear (sidebar or hamburger)

### Desktop (1024px+)

- [ ] 3-column layout optimized (not stretched)
- [ ] Max content width ~1200px
- [ ] Hover states visible
- [ ] Whitespace adequate

### Orientation Changes

- [ ] Portrait → Landscape: layout adapts, no content lost
- [ ] Landscape → Portrait: layout adapts, no scroll
- [ ] No fixed widths (use %)

---

## Cross-Browser Testing

### Desktop Browsers

- [ ] Chrome (latest + 1)
- [ ] Firefox (latest + 1)
- [ ] Safari (latest + 1)
- [ ] Edge (latest)

**Each browser:**

- [ ] No console errors/warnings (except third-party)
- [ ] Layout renders correctly
- [ ] All features work
- [ ] CSS variables working
- [ ] Flexbox/Grid renders as expected

### Mobile Browsers

- [ ] iOS Safari (iPhone 12, SE)
- [ ] Chrome Android (Pixel, Galaxy)
- [ ] Tap targets work
- [ ] Scrolling smooth
- [ ] Sticky headers work
- [ ] Modals display correctly

---

## Performance (Core Web Vitals)

### Lighthouse Audit

```bash
pnpm build && pnpm start
# Then: Chrome DevTools → Lighthouse tab
```

**Targets:**

- [ ] LCP (Largest Contentful Paint) <2.5s
- [ ] FID (First Input Delay) <100ms
- [ ] CLS (Cumulative Layout Shift) <0.1
- [ ] Performance Score >90

**Test Each Page:**

- [ ] Homepage
- [ ] Search Results
- [ ] Listing Details
- [ ] Dashboard
- [ ] Agent Dashboard
- [ ] Admin Overview (heaviest page — 4 stat cards, column chart, 4 panels)
- [ ] Admin Moderation (table + image-heavy detail panel)
- [ ] Admin Reports (bar chart + 2 donut charts)

### Metrics

- [ ] LCP <2.5s: Hero image optimized, lazy-load below fold
- [ ] FID <100ms: No JS blocking interactions
- [ ] CLS <0.1: Space reserved for images, no late-loading ads
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

### Image Optimization

- [ ] WebP format with JPEG fallback
- [ ] Responsive (srcset for different sizes)
- [ ] Lazy-loaded by default
- [ ] Width/height specified (prevent CLS)
- [ ] Served from CDN

---

## Code Quality & Security

### TypeScript

- [ ] Strict mode enabled (`"strict": true`)
- [ ] No `any` types
- [ ] Type check passes (`pnpm type-check`)

### ESLint & Prettier

- [ ] No lint errors (`pnpm lint` passes)
- [ ] Code formatted (`pnpm format`)
- [ ] Pre-commit hook runs linter

### Security

- [ ] `pnpm audit` passes (no high/critical CVEs)
- [ ] Secrets not in code (.env.local not committed)
- [ ] No API keys in client code
- [ ] XSS prevention (no innerHTML)
- [ ] CSRF tokens on POST/PATCH/DELETE
- [ ] Rate limiting enforced by the NestJS backend

### Testing

- [ ] Unit tests >80% (lib/ — utils, mappers, validations, hooks)
- [ ] Integration tests >60% (components/)
- [ ] All tests passing (`pnpm test`)

---

## Design System Compliance

- [ ] No hardcoded colors (use CSS variables `var(--colors-*)` or Tailwind theme names)
- [ ] No hardcoded spacing (use the named scale classes `.pad` / `.gap`, or `var(--spacing-*)`)
- [ ] No hardcoded typography (use CSS variables `var(--font-sizes-*)`)
- [ ] No hardcoded motion (use `var(--durations-*)` / `var(--timing-functions-*)`, or `lib/config/motion.ts`)
- [ ] Component reuse verified (no duplicate patterns)

---

## Admin Console QA

Admin surfaces carry destructive and irreversible actions, so they get their own
pass. Run this section signed in as an admin, then repeat the access checks signed
in as a buyer and as an agent.

### Access Control

- [ ] Unauthenticated visit to any /admin route redirects to login
- [ ] Buyer account cannot reach any /admin route (server-enforced, not hidden nav)
- [ ] Agent account cannot reach any /admin route
- [ ] Direct URL entry is blocked, not just the sidebar link
- [ ] Logout clears auth state and token, then redirects to /
- [ ] Expired token mid-session redirects rather than rendering an empty console

### Console Shell

- [ ] All six nav groups render with labels (Overview, Marketplace, Finance, Insights, Trust & Safety, System)
- [ ] Active route highlighted, and marked `aria-current`
- [ ] Verifications badge count equals the pending total on /admin/verifications
- [ ] Breadcrumb matches the route registry on every page
- [ ] Sidebar collapses to a drawer on mobile and traps focus while open
- [ ] Content area never scrolls horizontally at 320px

### Tables (Users, Moderation, Transactions)

- [ ] Every table has a caption describing all its columns
- [ ] Action columns use screen-reader-only headers, not empty `<th>`
- [ ] Sort control is a button, announces direction, and is keyboard operable
- [ ] Default sort matches the spec (users by name asc, moderation by status)
- [ ] Numeric columns use tabular figures and right alignment
- [ ] Footer totals recompute from the visible rows, not a hardcoded value
- [ ] Row tinting (suspended, flagged, rejected) is never the only status signal
- [ ] Selection state is announced; bulk bar is reachable by keyboard
- [ ] Pagination preserves sort and filter
- [ ] Empty message renders per table ("No users to show", "No listings match this filter right now")
- [ ] Table scrolls inside its own container — the page body does not

### Moderation Flow

- [ ] Filter pills show accurate counts and reset selection on change
- [ ] Row detail panel opens with photos, description, flag reason, compliance checklist, agent contact
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
- [ ] Approve, Reject, Revoke and Allow Resubmit each update counts and the sidebar badge
- [ ] Status is text plus tone, not colour alone
- [ ] Document count is accurate and Review Docs opens the evidence

### Settings

- [ ] Every field has a real `<label htmlFor>`
- [ ] Prefix and suffix (%, $, days) are not the only unit indicator
- [ ] Editing any field clears the saved state and restores "Save Changes"
- [ ] Save shows the success callout and the button reads "Saved"
- [ ] Reset restores stored values and clears the saved flag
- [ ] Navigating away with unsaved changes warns before discarding
- [ ] Toggles expose `role="switch"` with the title as accessible name
- [ ] Maintenance-mode and other destructive actions require confirmation
- [ ] Maintenance mode active shows an unmistakable global indicator

### Charts & Data Display

- [ ] Every chart has a text summary or accessible table alternative
- [ ] Series distinguishable without colour (label, pattern, or direct value)
- [ ] Chart tooltips reachable by keyboard
- [ ] Sparklines marked decorative (`aria-hidden`)
- [ ] Stat cards are a single link with an accessible name covering label + value
- [ ] Currency and percentage formatting consistent across every admin page
- [ ] Charts reflow on resize without overflowing the panel

### Admin Data Integrity

- [ ] Header counts, sidebar badge and page contents derive from one source
- [ ] Commission figures use the configured rate, never a hardcoded literal
- [ ] Stat totals reconcile with the table footers on the same page
- [ ] Optimistic updates roll back visibly if the request fails

---

## Error Handling

- [ ] 404 page styled and helpful
- [ ] 500 page styled and helpful
- [ ] API errors show user-friendly messages
- [ ] Network errors handled gracefully
- [ ] Form errors clear and inline
- [ ] Loading states use skeletons (not spinners)
- [ ] Empty states are helpful with CTAs

---

## SEO

- [ ] Meta tags on every page (title, description)
- [ ] Structured data (JSON-LD for listings)
- [ ] Open Graph tags for social sharing
- [ ] Sitemaps (/sitemap.xml)
- [ ] Robots.txt configured
- [ ] Canonical URLs
- [ ] Mobile-friendly responsive design
- [ ] Core Web Vitals passing

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

**QA Lead:** **\*\*\*\***\_**\*\*\*\*** **Date:** \***\*\_\*\***

**Product Manager:** **\*\*\*\***\_**\*\*\*\*** **Date:** \***\*\_\*\***

**Engineering Lead:** **\*\*\*\***\_**\*\*\*\*** **Date:** \***\*\_\*\***

---

**Phase 10 Complete. MVP 1.5 production-ready.**

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
npm run lighthouse:audit
# Or: Chrome DevTools → Lighthouse tab
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

### Metrics

- [ ] LCP <2.5s: Hero image optimized, lazy-load below fold
- [ ] FID <100ms: No JS blocking interactions
- [ ] CLS <0.1: Space reserved for images, no late-loading ads
- [ ] TTFB <600ms: Fast backend
- [ ] FCP <1.8s: Paint quick, no render-blocking CSS/JS

### Bundle Size

```bash
npm run build
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
- [ ] Build passes (`tsc --noEmit`)

### ESLint & Prettier

- [ ] No lint errors (`npm run lint` passes)
- [ ] Code formatted (`npm run format`)
- [ ] Pre-commit hook runs linter

### Security

- [ ] `npm audit` passes (no high/critical CVEs)
- [ ] Secrets not in code (.env.local not committed)
- [ ] No API keys in client code
- [ ] XSS prevention (no innerHTML)
- [ ] CSRF tokens on POST/PATCH/DELETE
- [ ] Rate limiting on API routes

### Testing

- [ ] Unit tests >80% (lib/, hooks/)
- [ ] Integration tests >60% (components/)
- [ ] E2E tests cover critical paths
- [ ] All tests passing

---

## Design System Compliance

- [ ] No hardcoded colors (use CSS variables `var(--color-*)`)
- [ ] No hardcoded spacing (use CSS variables `var(--spacing-*)`)
- [ ] No hardcoded typography (use CSS variables `var(--text-*)`)
- [ ] No hardcoded motion (use CSS variables `var(--motion-*)`)
- [ ] Component reuse verified (no duplicate patterns)

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

**QA Lead:** ********\_******** **Date:** ****\_****

**Product Manager:** ********\_******** **Date:** ****\_****

**Engineering Lead:** ********\_******** **Date:** ****\_****

---

**Phase 10 Complete. MVP 1.5 production-ready.**

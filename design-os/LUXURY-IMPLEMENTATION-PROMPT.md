# Luxury Real Estate Platform — Complete Implementation Guide

**Design Operating System Phases 8-10 + Luxury Features**

Build a premium real estate marketplace (not mass-market) with Horizon Grove aesthetic: dark luxury, minimal UI, photography-first, white-glove service.

---

## What You're Building

**Not Zillow. Not Redfin. Something Better for Luxury.**

A marketplace for high-net-worth buyers, luxury agents, and premium developers. Features:
- ✓ 21 core pages (home, search, listing detail, dashboards, etc.)
- ✓ Luxury visual direction (charcoal + burnt orange, thin typography, extreme whitespace)
- ✓ Private viewing system (appointment-only properties)
- ✓ Concierge messaging (white-glove service)
- ✓ VIP access tiers (exclusive properties, verified buyers)
- ✓ Agent CRM (relationship management, deal tracking)
- ✓ Luxury market data (comparables, trends, insights)
- ✓ Secure document vault (inspection reports, contracts)

**Timeline:** 16 weeks (same as core MVP 1.5)  
**Effort:** ~1120 hours (core) + ~370 hours (luxury features) = ~1490 hours total  
**Team:** 5-6 engineers  

---

## Phase Summary

| Phase | What | Status |
|-------|------|--------|
| **1-3** | Strategy, UX, IA | ✓ Complete (reference only) |
| **4-7** | Design specs, components, tokens | ✓ Complete (+ luxury visual direction) |
| **8** | Codebase architecture | ✓ Complete (supports luxury schema) |
| **9** | 16-week roadmap | ✓ Complete (+ luxury features integrated) |
| **10** | QA checklist | ✓ Complete (same standards) |
| **Luxury Addendum** | Premium features | ⭐ New (6 features, 370 hours) |

---

## Phase 8: Frontend Architecture (No Changes)

Use the spec in `/design-os/phase-8-frontend-architecture.md` exactly as-is. Architecture supports luxury features.

**Database Schema Additions:**
```
-- Tier system
users.tier: 'standard' | 'premium' | 'platinum'
user_verifications.status, documents, proof

-- Private viewings
viewing_requests.status: 'pending' | 'approved' | 'rejected'
properties.viewing_type: 'open' | 'appointment' | 'private'

-- Concierge + CRM
agent_notes.content, visibility, created_at
communication_logs.summary, sentiment
deals.next_step, key_dates

-- Documents
documents.file_id (S3), encrypted_key, shared_with, access_logs

-- Market reports
market_reports.data, generated_at, buyer_id
```

---

## Phase 9: 16-Week Sprint Breakdown (Updated)

### Sprint 1-2: Foundation & Luxury Design (Weeks 1-2) - 100 hours

**Goal:** Boilerplate ready + visual design system loaded

**Work:**
- TypeScript strict, ESLint, Prettier
- Design tokens (Phase 7 + Luxury Visual Direction)
  - Charcoal primary, burnt orange accent
  - Thin typography (Instrument Serif, Space Grotesk)
  - Extreme spacing (more generous than core)
- RootLayout, all Providers (Auth, Query, Theme, Motion)
- Tailwind config with luxury tokens
- CSS variables (styles/tokens.css)
- Storybook setup (showcase components with new aesthetic)

**Deliverable:** Boilerplate styled, token system loaded, typography working

**Luxury-Specific:** 
- Implement dark mode as primary (no light mode yet)
- Test color contrast (charcoal + off-white must be WCAG AA)
- Typography tests (thin fonts rendering correctly)

---

### Sprint 2-3: Component Library (Weeks 3-4) - 150 hours

**Goal:** All 80 components built with luxury aesthetic

**Work:**
- Primitives: Button (with burnt orange), Input, Select, Checkbox, Badge, Icon, Image, Skeleton, Avatar, Tag, Divider
- Patterns: Modal, Toast, Tooltip, Tabs, Accordion, Pagination, Spinner, Date Picker, Time Picker, Price Input, Search, File Upload, Progress, Breadcrumb, Dropdown, Switch
- Accessibility: WCAG 2.2 AA, keyboard nav, screen reader support
- Storybook: Story for each variant
- Tests: Vitest (>80% coverage), jest-axe (accessibility)

**Deliverable:** Component library complete, all variants styled for dark luxury aesthetic

**Luxury-Specific:**
- Test all components on dark background
- Verify accent color (burnt orange) pops enough on charcoal
- Test touch targets on mobile (48px minimum)

---

### Sprint 3-4: Search & Discovery (Weeks 5-6) - 200 hours

**Goal:** Buyer can find properties end-to-end

**Work:**
- Home (/) 
  - Hero: Full-bleed image, large thin headline, search bar, CTA
  - Featured listings: Photography-first, generous spacing
  - How it works: Timeline visual, minimal text
  - Trust signals: Stats, testimonials, badges
  - Footer: Links, newsletter, social

- Search Results (/search)
  - Filter panel: Sticky on desktop, drawer on mobile
  - Results grid: 2-3 columns, photography-driven cards
  - Map view: Google Map with pins
  - Sorting: Price, Newest, Most Saved
  - Pagination: 20 per page

- Listing Detail (/listing/:id)
  - Gallery: Hero carousel + thumbnails
  - Price bar (sticky): Price, status, save, share, message
  - Key facts: Beds, baths, sqft in subtle row
  - Description: Full text, expandable on mobile
  - Neighborhood: Interactive map + schools, transit, walkability
  - Comparables: 10-15 recent sales (luxury-specific: more data)
  - Agent card: Photo, name, rating, response time, call/message
  - CTAs: Schedule Viewing, Make Offer, Save

- Map View (/map)
  - Full-screen Google Map
  - Listing pins clickable → preview card
  - Filter sidebar
  - Legend (price ranges)

**Deliverable:** Search flow works, all pages styled with luxury aesthetic

**Luxury-Specific:**
- Listing detail includes market analysis section
- Private viewings: Show "Request Viewing" for appointment-only properties
- VIP tiers: Premium/Platinum buyers see exclusive properties

---

### Sprint 4-5: Authentication & Concierge (Weeks 7-8) - 180 hours

**Goal:** Auth system live + concierge messaging foundation

**Work:**

**Auth Pages:**
- Signup (/signup): Email, OTP, password, persona (Buyer/Agent/Seller), optional social
- Login (/login): Email, password, social OAuth
- Reset Password: Email, OTP, new password
- Persona selector: Buyer vs. Agent vs. Seller

**Concierge Setup:**
- User roles: buyer, agent, concierge, admin
- Agent can assign concierge
- Messages priority routing (VIP badges)
- Response SLA tracking (2-hour target)
- Pre-written templates for common questions
- Concierge dashboard: Assigned clients, response times

**Deliverable:** Auth system live, concierge messaging infrastructure ready

**Luxury-Specific:**
- Onboarding screens highlight concierge service
- Agent profile shows concierge badge + response time SLA
- Messages show VIP indicator and SLA status

---

### Sprint 5-6: Buyer Dashboard + VIP Tiers (Weeks 9-10) - 280 hours

**Goal:** Full buyer workflow + luxury features active

**Work:**

**Buyer Dashboard Pages:**
- Overview: Quick stats (saved, offers, viewings), recent activity, upcoming viewings, alerts
- Saved (/dashboard/saved): Grid of saved listings, sort/filter
- Offers (/dashboard/offers): Table of all offers, status, counters, messaging
- Viewings (/dashboard/viewings): Calendar of scheduled viewings, list view
- Messages (/dashboard/messages): Concierge chat threads, SLA badges, file sharing
- Alerts (/dashboard/alerts): Price drops, new listings matching criteria
- Settings (/dashboard/settings): Profile, preferences, communication settings

**VIP Tier System:**
- Tier levels: Standard (default), Premium ($500k+ income), Platinum (invite-only)
- Tier upgrade page: /tier/upgrade (submit docs)
- Admin approval workflow: /admin/verifications (review submissions)
- Property tier restrictions: "Premium Only", "Platinum Only", "By Invitation"
- Buyer sees filtered listings based on tier

**Document Vault (Private):**
- Upload secure documents (agent → buyer)
- Encryption at rest
- Watermarking (document marked with buyer name)
- Expiration dates (auto-disable after close)
- View tracking (who viewed, when)
- Access control (share links, expiry)

**Deliverable:** Buyer can save, track offers, schedule viewings, access concierge. Tiers restrict premium properties.

**Luxury-Specific:**
- Tier verification UI (upload financial docs)
- VIP badge on conversations (concierge priority)
- Document manager integrated in dashboard
- Market analysis section (comps, trends)

---

### Sprint 6-7: Agent Dashboard + CRM (Weeks 11-12) - 250 hours

**Goal:** Full agent workflow, CRM foundation

**Work:**

**Agent Dashboard Pages:**
- Dashboard (/agent/dashboard): Pipeline overview, stats, recent leads, upcoming showings
- Listings (/agent/listings): Grid of agent's listings, status, views, offers, bulk actions (publish, draft, delete)
- Leads (/agent/leads): Inquiries, qualification status, scoring (hot/warm/cold), message/call buttons
- Pipeline (/agent/pipeline): CRM-style (Leads → Offers → Pending → Closed), drag-drop to update status
- Calendar (/agent/calendar): Month view, showings, follow-ups, closings, can sync to Google Calendar
- Analytics (/agent/analytics): Performance metrics (sales, volume, average price, days on market)
- Concierge (/agent/concierge): Manage VIP clients, response time dashboard, bulk actions

**Agent CRM Features:**
- Buyer profiles: Full communication history, preferences, motivation, custom notes
- Deal tracking: All buyer's offers, key dates (appraisal, inspection, closing), next steps
- Follow-up automation: Set reminders, auto-email templates
- Handoff workflow: Seamless transition if buyer works with different agent
- Opportunity scoring: Likelihood to convert, deal size, timeline

**Private Viewings:**
- Agent can tag property "Private Viewing Required"
- Buyer sees "Request Viewing" button
- Request → approval workflow
- Once approved: schedule from agent's calendar
- Post-showing feedback form

**Deliverable:** Agent can manage listings, leads, pipeline, VIP clients. CRM enables relationship management.

**Luxury-Specific:**
- Concierge dashboard (if concierge staff)
- VIP client profile (communication history, deal status)
- Private viewing approval workflow
- Deal tracking with key dates

---

### Sprint 7-8: Admin Dashboard + Market Data (Weeks 13-14) - 200 hours

**Goal:** Admin oversight, market data integration

**Work:**

**Admin Pages:**
- Overview (/admin): System health (uptime, error rate), volume metrics (listings, users, deals), revenue, alerts
- Listings Moderation (/admin/listings): Flagged listings queue, photo review, description check, approve/reject/request changes
- Users (/admin/users): Search, verify, suspend, tier management
- Transactions (/admin/transactions): Payment status, disputes, refunds
- Payments (/admin/payments): Revenue tracking, commission breakdowns
- Reports (/admin/reports): Analytics, growth trends, cohort analysis
- Verifications (/admin/verifications): Tier applications (review docs, approve/deny)
- Settings (/admin/settings): System config, feature flags, email templates

**Market Data Integration:**
- Comparable sales API (MLS, Zillow, Redfin)
- Property valuation (estimate vs. list price)
- Neighborhood analysis (Walkscore, crime, schools)
- Price trends (historical, forecasted)
- Market reports (generate PDF for buyer/agent)
- Buyer-accessible: /listing/:id/market-analysis, /dashboard/market-insights
- Agent-accessible: /agent/tools/market-report (generate, send to buyer)

**Deliverable:** Admin can moderate content, manage users, tiers, verify docs. Market data available for all users.

**Luxury-Specific:**
- Tier verification admin UI
- Enhanced comps for luxury properties (10-15 sales, not 3-5)
- Market reports (PDF generation)
- Revenue tracking (high-value deals)

---

### Sprint 8: QA, Polish, Launch (Weeks 15-16) - 200 hours

**Goal:** Production-ready. All systems tested, verified, deployed.

**Work:**

**Testing:**
- Unit tests: >80% (lib/, hooks/)
- Integration tests: >60% (components/, pages/)
- E2E tests: Critical paths 100% (sign up → search → offer → close)
- Accessibility: WCAG 2.2 AA on all pages (color contrast, keyboard nav, screen reader)
- Performance: Lighthouse >90, LCP <2.5s, FID <100ms, CLS <0.1
- Cross-browser: Chrome, Firefox, Safari, Edge, iOS Safari, Chrome Android
- Security: npm audit pass, no hardcoded secrets, XSS/CSRF prevention

**Compliance:**
- Privacy: GDPR, CCPA (data export, deletion)
- Payment: PCI DSS (if handling payments, or use Stripe)
- Real estate: Fair Housing Act (no discrimination in search results)

**Optimization:**
- Bundle size: <250kb gzipped JS
- Image optimization: WebP + JPEG, responsive, lazy-loaded
- Code splitting: Route-based, lazy load dashboards
- Database: Indexes on frequently queried fields (listings, users, offers)
- Caching: Redis for search results, comps, market data

**Monitoring Setup:**
- Sentry (error tracking)
- Google Analytics (user behavior)
- Lighthouse CI (performance per PR)
- Uptime monitoring (99.95% target)

**Launch Checklist:**
- [ ] All tests passing
- [ ] Type check passes (tsc --noEmit)
- [ ] Lint passes (npm run lint)
- [ ] Build succeeds
- [ ] Accessibility audit ✓
- [ ] Performance ✓ (Lighthouse >90)
- [ ] Security audit ✓
- [ ] Code review ✓
- [ ] QA sign-off ✓
- [ ] Staging tested by team
- [ ] Backup & rollback plan ready
- [ ] Monitoring alerts configured
- [ ] On-call team assigned (24h post-launch)

**Deliverable:** MVP 1.5 production-ready. Ready to launch.

---

## Code Standards (Non-Negotiable)

**From CLAUDE.md:**

1. **No comments.** Code reads itself.
2. **No hardcoding.** Constants in `lib/constants.ts`.
3. **No `any`.** Use `unknown` + narrowing or precise types.
4. **Match architecture.** Follow Phase 8 layout exactly.
5. **Use framework natively.** Next.js, TanStack Query, Zod, motion.
6. **Single source of truth.** Token-based (colors, spacing, motion).
7. **Minimize LOC.** Shorter = better when equally maintainable.

**API Pattern (Critical):**
```typescript
// lib/api/listings.ts (pure async, no hooks)
export const listingsAPI = {
  search: async (query: SearchQuery) => { /* ... */ },
  getById: async (id: string) => { /* ... */ },
}

// hooks/api/use-listings.ts (wraps API in hook)
export function useListings(query: SearchQuery) {
  return useQuery({
    queryKey: ['listings', query],
    queryFn: () => listingsAPI.search(query),
  })
}

// Page/Component (consumes hook only)
export function SearchPage() {
  const { data } = useListings(params)
  return <div>{data?.listings.map(...)}</div>
}
```

**TypeScript:**
- Strict mode enabled
- All types from Zod schemas or `z.infer<typeof schema>`
- No loose types for API responses
- Use `nanoid` (not `uuid` or `Date.now()`)

**Styling:**
- Token-first: All colors, spacing, motion via CSS variables
- No inline styles: `style={{ color: '#...' }}` forbidden
- No hardcoded values: `padding: 16px` → `padding: var(--pad-md)`
- Dark mode primary: Test on dark background first

---

## Testing Strategy

| Type | Coverage | Framework | Tool |
|------|----------|-----------|------|
| **Unit** | >80% lib/, hooks/ | Vitest | `npm run test:unit` |
| **Integration** | >60% components/ | Vitest | `npm run test:integration` |
| **E2E** | 100% critical paths | Playwright | `npm run test:e2e` |
| **Accessibility** | All pages | jest-axe | `npm run test:a11y` |
| **Performance** | All pages | Lighthouse | `npm run lighthouse` |

---

## Deployment Checklist (Week 16)

```bash
# Pre-deployment
git checkout main
git pull origin main

# Build
npm run build
npm run type-check
npm run lint

# Test
npm run test:unit
npm run test:integration
npm run test:e2e

# Security
npm audit
# (fix any high/critical)

# Performance
npm run lighthouse
# (ensure >90 all pages)

# Deploy to Vercel
vercel --prod

# Post-deployment
# Monitor Sentry for errors
# Check Google Analytics
# Verify uptime (99.95%)
# Get team sign-off
```

---

## File Structure Checklist

Verify Phase 8 architecture is exact:
- [ ] `/app` routes organized (auth, browse, dashboard, agent, admin)
- [ ] `/components` (ui/, patterns/, sections/, layout/)
- [ ] `/hooks` (api/, ui/, utils/)
- [ ] `/lib` (api/, types/, validations/, utils/, constants.ts, tokens.ts, config.ts)
- [ ] `/styles` (globals.css, tokens.css, animations.css)
- [ ] `/public` (fonts/, images/)

---

## Success Metrics (MVP 1.5 + Luxury)

**Technical:**
- ✓ 21 pages live
- ✓ 80 components, all tested
- ✓ Lighthouse >90 (all pages)
- ✓ WCAG 2.2 AA compliant
- ✓ 99.95% uptime
- ✓ <0.5% error rate
- ✓ Bundle <250kb gzipped

**Business (Luxury-Specific):**
- ✓ VIP tier adoption >30% (week 12)
- ✓ Average deal size $1M+ (vs. $400k mass market)
- ✓ Concierge SLA 95%+ (2-hour response)
- ✓ NPS >60 (luxury segment)
- ✓ Agent satisfaction >80%
- ✓ Document access tracked (security)

---

## Reference Files

**Design Phases (Read While Building):**
- Phase 1: Strategy, personas, KPIs → `/design-os/phase-1-product-vision.md`
- Phase 2: User journeys → `/design-os/phase-2-experience-maps.md`
- Phase 3: Navigation, permissions → `/design-os/phase-3-information-architecture.md`
- Phase 4: Page specs (PRIMARY) → `/design-os/phase-4-page-blueprints.md`
- Phase 5: Section specs → `/design-os/phase-5-section-blueprints.md`
- Phase 6: Component specs → `/design-os/phase-6-component-library.md`
- Phase 7: Tokens (colors, spacing, motion) → `/design-os/phase-7-design-tokens.md` (+ LUXURY-VISUAL-DIRECTION.md)

**Implementation Guides:**
- Phase 8: Codebase setup → `/design-os/phase-8-frontend-architecture.md`
- Phase 9: Sprint breakdown → This document
- Phase 10: QA checklist → `/design-os/phase-10-qa-checklist.md`

**Luxury Guides:**
- Visual direction → `/design-os/LUXURY-VISUAL-DIRECTION.md`
- Features → `/design-os/LUXURY-FEATURES-ADDENDUM.md`

---

## Week-by-Week Checklist

**Week 1-2:** Boilerplate ✓  
**Week 3-4:** Components ✓  
**Week 5-6:** Search flow ✓  
**Week 7-8:** Auth + Concierge ✓  
**Week 9-10:** Buyer dashboard + Tiers ✓  
**Week 11-12:** Agent dashboard + CRM ✓  
**Week 13-14:** Admin + Market data ✓  
**Week 15-16:** QA, polish, launch ✓  

---

## Start Building

1. Open `/design-os/phase-8-frontend-architecture.md`
2. Set up Next.js folder structure exactly
3. Load tokens from `/design-os/LUXURY-VISUAL-DIRECTION.md`
4. Reference `/design-os/phase-4-page-blueprints.md` for each page
5. Reference `/design-os/phase-6-component-library.md` for component specs
6. Follow 16-week sprint breakdown (this document)
7. Hit QA checklist before launch

**You have everything. Build with confidence. 🚀**

---

**Luxury Real Estate Platform — Complete Implementation Guide Ready**

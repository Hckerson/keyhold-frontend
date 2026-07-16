# Real Estate Platform — Master Implementation Prompt

**Use this prompt in a new Claude Code session to implement the entire design system.**

---

## Context

You are implementing **Phase 8-10 of the Real Estate Platform Design Operating System**. All strategic work (Phases 1-7) is complete. Your job is to build the Next.js codebase from specification.

**Design OS Location:** `/design-os/` folder in project root.

**Read These First (In Order):**

1. `design-os/DESIGN-OS-COMPLETE.md` – Master index, overview, how to use
2. `design-os/phase-8-frontend-architecture.md` – Codebase structure (you are here)
3. `design-os/phase-4-page-blueprints.html` – Page specifications (what to build)
4. `design-os/phase-9-implementation-roadmap.md` – Sprint breakdown, timelines
5. `design-os/phase-10-qa-checklist.md` – QA requirements before shipping

---

## Your Mission

**Build the complete Next.js frontend from the design OS specification. No ambiguity. Production-ready.**

### Phases to Execute

- **Phase 8:** ✅ (Read architecture spec)
- **Phase 9:** 🏗️ (Execute 16-week roadmap, starting with Sprint 1-2)
- **Phase 10:** ✓ (Verify QA checklist before shipping)

---

## Phase 8: Frontend Architecture (READ FIRST)

**File:** `design-os/phase-8-frontend-architecture.md`

This specifies:

- Folder structure (where every file goes)
- Route organization (App Router)
- Layouts (RootLayout, AppLayout, DashboardLayout, etc.)
- Providers (Auth, Query, Theme, Motion)
- Hooks (API hooks, UI hooks, utils)
- API organization (lib/api/\*)
- State management (TanStack Query + Context, no unnecessary Zustand)
- Type safety (TypeScript strict, Zod validation)
- Environment variables

**Action:** Read Phase 8 in full. It's the architecture blueprint for everything you build.

---

## Phase 9: Implementation Roadmap (YOUR PLAN)

**File:** `design-os/phase-9-implementation-roadmap.md`

**16-Week Sprints:**

| Sprint | Weeks | Focus                                               | Owner    | Hours |
| ------ | ----- | --------------------------------------------------- | -------- | ----- |
| 1-2    | 1-2   | Foundation, architecture, tooling                   | Lead Eng | 80    |
| 2-3    | 3-4   | Component library (primitives + patterns)           | Frontend | 120   |
| 3-4    | 5-6   | Search & discovery (home, search, listing, map)     | 2-3 Eng  | 160   |
| 4-5    | 7-8   | Authentication (signup, login, reset, OAuth)        | 1-2 Eng  | 100   |
| 5-6    | 9-10  | Buyer dashboard (saved, offers, viewings, messages) | 2-3 Eng  | 200   |
| 6-7    | 11-12 | Agent dashboard (listings, leads, pipeline)         | 2-3 Eng  | 180   |
| 7-8    | 13-14 | Admin dashboard (moderation, users, transactions)   | 1-2 Eng  | 120   |
| 8      | 15-16 | QA, accessibility, deployment                       | QA + Eng | 160   |

**Total:** ~1120 hours, 4-5 engineers, 16 weeks.

**Your Task This Sprint:** Execute Sprints 1-2 (foundation). Then move to 3-4 (components), etc.

---

## Phase 4: Page Blueprints (SPEC REFERENCE)

**File:** `design-os/phase-4-page-blueprints.html` (open in browser)

For each page you build, this spec defines:

- Purpose & objectives
- Primary tasks
- Modules & sections required
- Data requirements (what API calls needed)
- Responsive behavior (mobile/tablet/desktop)
- States (loading, error, empty, success)
- Dependencies (which APIs, services)

**Example: Search Results Page**

- Purpose: Find properties matching criteria
- Modules: Filter Panel, Results Grid, Pagination, Map Toggle
- Data: Listings API (search with filters)
- Responsive: Sidebar left (desktop) → Filters modal (mobile)
- States: Loading (skeletons), No Results, Error handling

**Reference this for every page you build.**

---

## Phase 10: QA Checklist (VERIFY BEFORE SHIPPING)

**File:** `design-os/phase-10-qa-checklist.md`

Before launching, verify:

- ✓ Accessibility (WCAG 2.2 AA)
- ✓ Responsive (320px-1440px+)
- ✓ Cross-browser (Chrome, Firefox, Safari, Edge)
- ✓ Performance (Lighthouse >90, LCP <2.5s, bundle <250kb)
- ✓ Security (TypeScript strict, Zod validation, no secrets)
- ✓ Code quality (ESLint passes, no console errors)
- ✓ Testing (unit >80%, E2E critical paths)
- ✓ Design system (tokens only, no hardcoded values)

**Run this checklist at sprint 8 (week 15-16).**

---

## Getting Started (Sprint 1-2: Weeks 1-2)

### Week 1: Setup

**Tasks:**

- [ ] Read `phase-8-frontend-architecture.md` in full
- [ ] Review existing folder structure (`app/`, `components/`, `lib/`, `hooks/`)
- [ ] Create missing folders per Phase 8 spec
- [ ] Set up TypeScript strict mode (tsconfig.json)
- [ ] Install dependencies: TanStack Query, React Hook Form, Zod, Framer Motion, Lucide

**Dependencies to Add:**

```bash
pnpm add @tanstack/react-query @tanstack/react-query-devtools
pnpm add react-hook-form @hookform/resolvers
pnpm add zod
pnpm add framer-motion lucide-react next-themes
pnpm add clsx
```

**Dev Dependencies:**

```bash
pnpm add -D @types/node @types/react @types/react-dom
pnpm add -D vitest @testing-library/react @testing-library/jest-dom
pnpm add -D @playwright/test
pnpm add -D eslint prettier
```

- [ ] Create `.env.example` with required vars
- [ ] Update `middleware.ts` for auth redirects
- [ ] Set up design tokens (`lib/tokens.ts`, `styles/tokens.css`)
- [ ] Create root layout (`app/layout.tsx`) with providers

### Week 2: Architecture

**Tasks:**

- [ ] Create all providers (`components/providers/`: AuthProvider, QueryProvider, ThemeProvider, MotionProvider)
- [ ] Create layout components (`components/layout/`: Header, Footer, Sidebar, AppLayout, DashboardLayout, AuthLayout)
- [ ] Create all API client functions (`lib/api/`: listings.ts, offers.ts, messages.ts, auth.ts, users.ts)
- [ ] Create all Zod schemas (`lib/validations/`: listing.ts, offer.ts, message.ts, auth.ts, user.ts)
- [ ] Create utility functions (`lib/utils/`: format.ts, validators.ts, storage.ts, string.ts)
- [ ] Create constants (`lib/constants.ts`: API endpoints, durations, limits, enums)

**No UI components yet. Just infrastructure.**

**Output by end of week 2:**

- ✓ Boilerplate ready for pages
- ✓ Type-safe API layer
- ✓ Environment config
- ✓ Providers working
- ✓ Build passes

---

## Building Pages (Starting Week 3)

### Sprint 2-3: Component Library (Weeks 3-4)

**Reference:** `design-os/phase-6-component-library.html`

Build all primitives + patterns:

- **Primitives:** Button, Input, Select, Checkbox, Badge, Icon, Image, Skeleton
- **Patterns:** Modal, Toast, Banner, Tabs, Date Picker, Multi-Step Form
- **Composed:** Listing Card, Filter Panel, Data Table (if needed week 5+)

**Each component:**

- TypeScript strict types
- All variants per spec
- Accessibility (keyboard, ARIA, focus)
- Responsive (all breakpoints)
- Examples with real data

### Sprint 3-4: Search & Discovery (Weeks 5-6)

**Reference:** `design-os/phase-4-page-blueprints.html` (pages 1-3)

Build:

- [ ] Home page (/ route)
- [ ] Search Results (/search route)
- [ ] Listing Details (/listing/:id route)
- [ ] Map View (/map route, optional week 6)

Each page uses sections from Phase 5:

- Listing Card (grid, lazy-load, save action)
- Filter Panel (sticky, collapsible, real-time)
- Hero Search (autocomplete, property type)
- Photo Gallery (hero + thumbnails, swipeable)

**API Integration:**

- [ ] listingsAPI.search() with filters
- [ ] listingsAPI.getById() with full details
- [ ] Save listing (authenticated)
- [ ] Google Maps integration (geolocation, embed)

---

## Code Standards (NON-NEGOTIABLE)

### From CLAUDE.md (Project Instructions)

1. **No comments.** Code reads clearly on its own. If it doesn't, the abstraction is wrong.
2. **No hardcoding.** All constants in `lib/constants.ts` or feature-scoped constants.
3. **No `any`.** Use `unknown` + narrowing or precise types. Derive from Zod.
4. **Match architecture.** Don't invent patterns. Follow Phase 8 spec exactly.
5. **Use framework natively.** Next.js features, TanStack Query, Zod already in stack.
6. **Single source of truth.** Name decisions once as token and reference everywhere (Phase 7).
7. **Minimize LOC.** Shorter solution when equally maintainable.

### From Design OS Phase 8

- All colors → CSS variables (`var(--color-*)`), never hardcoded
- All spacing → CSS variables (`var(--spacing-*)`), never hardcoded
- All typography → CSS variables (`var(--text-*)`), never hardcoded
- All motion → CSS variables (`var(--motion-*)`), never hardcoded
- API functions in `lib/api/`, never called directly from components
- Hooks in `hooks/`, wrapping API functions or UI state
- Zod schemas for validation at boundaries (API responses, form submissions)
- TypeScript strict mode on (no implicit any)

### API Pattern (Critical)

```typescript
// lib/api/listings.ts - Pure async functions, no hooks
export const listingsAPI = {
  search: async (query: SearchQuery) => {
    const res = await fetch(`${API_BASE}/listings?${...}`)
    if (!res.ok) throw new Error('Search failed')
    return res.json()
  }
}

// hooks/api/use-listings.ts - Wraps API in hook with caching
export function useListings(query: SearchQuery) {
  return useQuery({
    queryKey: ['listings', query],
    queryFn: () => listingsAPI.search(query),
    staleTime: 5 * 60 * 1000,
  })
}

// Component consumes hook, never calls API directly
export function SearchResults() {
  const { data } = useListings(searchParams)
  return <div>{data?.listings.map(...)}</div>
}
```

---

## Testing Strategy (Phase 10)

### Unit Tests (Vitest)

- All `lib/` functions (utilities, validators, formatters)
- All Zod schemas (validation logic)
- Component logic (not snapshots, behavior-focused)
- Target: >80% coverage on lib/, hooks/

### E2E Tests (Playwright)

- Signup flow
- Search flow (filter, sort, pagination)
- Listing details navigation
- Save listing
- Make offer (if built)

### Accessibility Tests

- axe DevTools (automated)
- Manual keyboard navigation
- Screen reader testing (NVDA/JAWS/VoiceOver)
- WCAG 2.2 AA compliance

### Performance Testing (Lighthouse CI)

- Every page >90 score
- LCP <2.5s, FID <100ms, CLS <0.1
- Bundle size <250kb (gzipped)

---

## Deployment Checklist (Week 16)

Before deploying:

- [ ] All tests pass (unit + integration + E2E)
- [ ] Type check passes (`tsc --noEmit`)
- [ ] Lint passes (`npm run lint`)
- [ ] Build succeeds (`npm run build`)
- [ ] No console errors/warnings
- [ ] Accessibility audit passes (axe)
- [ ] Performance budget not exceeded (Lighthouse)
- [ ] Code review approved
- [ ] QA sign-off (Phase 10 checklist complete)

---

## Key References

| Phase | File                                    | Use For                                           |
| ----- | --------------------------------------- | ------------------------------------------------- |
| 1     | `phase-1-product-vision.html`           | Strategy, personas, KPIs (team alignment)         |
| 2     | `phase-2-experience-maps.html`          | User flows, decision points (when building flows) |
| 3     | `phase-3-information-architecture.html` | Navigation, IA, permissions (routing, auth)       |
| 4     | `phase-4-page-blueprints.html`          | Page specs (REFERENCE FOR EVERY PAGE)             |
| 5     | `phase-5-section-blueprints.html`       | Section specs (what sections compose pages)       |
| 6     | `phase-6-component-library.html`        | Component specs (what components are in sections) |
| 7     | `phase-7-design-tokens.html`            | Token system (colors, spacing, typography)        |
| 8     | `phase-8-frontend-architecture.md`      | Codebase structure (REFERENCE CONSTANTLY)         |
| 9     | `phase-9-implementation-roadmap.md`     | Sprint breakdown, timelines (project planning)    |
| 10    | `phase-10-qa-checklist.md`              | QA requirements (pre-launch verification)         |

---

## Success Metrics

**Sprint Completion:**

- [ ] All tasks complete
- [ ] Tests passing (>80% unit, critical E2E)
- [ ] Zero TypeScript errors
- [ ] Zero ESLint errors
- [ ] Code review approved
- [ ] QA sign-off

**Phase Completion:**

- [ ] Architecture: Boilerplate ready, types correct, providers working
- [ ] Components: All primitives + patterns built, accessible, tested
- [ ] Pages: Implemented per Phase 4 spec, responsive, performant
- [ ] QA: WCAG AA, performance, security, all passing

**MVP 1.5 Launch:**

- [ ] 21 pages live
- [ ] Lighthouse >90 (all pages)
- [ ] WCAG 2.2 AA compliant
- [ ] 99.95% uptime
- [ ] <0.5% error rate
- [ ] NPS >50

---

## Questions?

1. **Architecture unclear?** → Read `phase-8-frontend-architecture.md` again
2. **What to build?** → Check `phase-4-page-blueprints.html`
3. **Design token?** → See `phase-7-design-tokens.html`
4. **QA requirements?** → Review `phase-10-qa-checklist.md`
5. **Timeline?** → Follow `phase-9-implementation-roadmap.md` sprints

---

## Start Here

```bash
# 1. Read architecture
cat design-os/phase-8-frontend-architecture.md

# 2. Review existing structure
ls -la app/ components/ lib/ hooks/ styles/

# 3. Install dependencies
pnpm install

# 4. Set up TypeScript strict mode
# (see Phase 8 tsconfig.json section)

# 5. Create layout.tsx with providers
# (see Phase 8 RootLayout section)

# 6. Build component library (Week 3-4)
# (see Phase 6 component specs)

# 7. Build pages (Week 5+)
# (see Phase 4 page blueprints)

# 8. Test and ship (Week 15-16)
# (see Phase 10 QA checklist)
```

---

**You have everything you need. Build with confidence. The design is bulletproof.**

**Phase 8-10 Implementation Starts Now. Good luck! 🚀**

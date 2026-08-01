# Phase 8: Frontend Architecture

**Real Estate Platform Design Operating System**

---

## Overview

Frontend architecture transforms Phases 1-7 (design vision, pages, components, tokens) into a production-ready Next.js codebase. This phase specifies:

- Folder structure
- Route organization (App Router)
- Layouts and providers
- Hook system (API + UI)
- API client organization
- State management strategy
- Code splitting and lazy loading
- Type safety enforcement
- Environment configuration

**Goal:** Engineering can build from this spec without ambiguity.

---

## Folder Structure

```
real-estate-platform/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Auth routes group
│   │   ├── signup/
│   │   │   └── page.tsx
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── reset-password/
│   │   │   └── page.tsx
│   │   └── layout.tsx            # AuthLayout
│   │
│   ├── (browse)/                 # Buyer routes group
│   │   ├── page.tsx              # Home /
│   │   ├── search/
│   │   │   └── page.tsx          # /search
│   │   ├── listing/
│   │   │   └── [id]/
│   │   │       └── page.tsx      # /listing/:id
│   │   ├── map/
│   │   │   └── page.tsx          # /map
│   │   └── layout.tsx            # AppLayout (header, footer, nav)
│   │
│   ├── dashboard/                # Authenticated user routes
│   │   ├── layout.tsx            # DashboardLayout (sidebar)
│   │   ├── page.tsx              # /dashboard (overview)
│   │   ├── saved/
│   │   │   └── page.tsx          # /dashboard/saved
│   │   ├── offers/
│   │   │   └── page.tsx          # /dashboard/offers
│   │   ├── viewings/
│   │   │   └── page.tsx          # /dashboard/viewings
│   │   ├── messages/
│   │   │   └── page.tsx          # /dashboard/messages
│   │   ├── alerts/
│   │   │   └── page.tsx          # /dashboard/alerts
│   │   └── settings/
│   │       └── page.tsx          # /dashboard/settings
│   │
│   ├── agent/                    # Agent routes
│   │   ├── layout.tsx            # AgentDashboardLayout
│   │   ├── dashboard/
│   │   │   └── page.tsx          # /agent/dashboard
│   │   ├── listings/
│   │   │   └── page.tsx          # /agent/listings
│   │   ├── leads/
│   │   │   └── page.tsx          # /agent/leads
│   │   ├── pipeline/
│   │   │   └── page.tsx          # /agent/pipeline
│   │   ├── calendar/
│   │   │   └── page.tsx          # /agent/calendar
│   │   ├── analytics/
│   │   │   └── page.tsx          # /agent/analytics
│   │   └── settings/
│   │       └── page.tsx          # /agent/settings
│   │
│   ├── admin/                    # Admin routes
│   │   ├── layout.tsx            # AdminLayout
│   │   ├── page.tsx              # /admin (overview)
│   │   ├── listings/
│   │   │   └── page.tsx          # /admin/listings (moderation)
│   │   ├── users/
│   │   │   └── page.tsx          # /admin/users
│   │   ├── transactions/
│   │   │   └── page.tsx          # /admin/transactions
│   │   ├── payments/
│   │   │   └── page.tsx          # /admin/payments
│   │   ├── reports/
│   │   │   └── page.tsx          # /admin/reports
│   │   ├── verifications/
│   │   │   └── page.tsx          # /admin/verifications
│   │   └── settings/
│   │       └── page.tsx          # /admin/settings
│   │
│   ├── api/                      # API routes (server endpoints)
│   │   ├── listings/
│   │   │   ├── route.ts          # GET /listings, POST /listings (search)
│   │   │   └── [id]/
│   │   │       └── route.ts      # GET /listings/:id
│   │   ├── offers/
│   │   │   ├── route.ts          # POST /offers (create)
│   │   │   └── [id]/
│   │   │       └── route.ts      # PATCH /offers/:id (update)
│   │   ├── messages/
│   │   │   └── route.ts          # GET /messages, POST /messages
│   │   ├── auth/
│   │   │   ├── signup/
│   │   │   │   └── route.ts
│   │   │   ├── login/
│   │   │   │   └── route.ts
│   │   │   └── logout/
│   │   │       └── route.ts
│   │   └── webhooks/
│   │       └── [provider]/
│   │           └── route.ts      # Payment webhooks, etc.
│   │
│   ├── layout.tsx                # Root layout (providers, fonts, globals)
│   ├── page.tsx                  # Will be handled by (browse)/page.tsx
│   ├── not-found.tsx             # 404 page
│   └── error.tsx                 # Error boundary
│
├── components/                   # React components (Phase 6 output)
│   ├── ui/                       # Primitives (Button, Input, etc.)
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   ├── checkbox.tsx
│   │   ├── badge.tsx
│   │   ├── icon.tsx
│   │   ├── image.tsx
│   │   ├── modal.tsx
│   │   ├── toast.tsx
│   │   └── skeleton.tsx
│   │
│   ├── patterns/                 # Patterns (Filter Panel, Table, etc.)
│   │   ├── filter-panel.tsx
│   │   ├── data-table.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── tabs.tsx
│   │   ├── accordion.tsx
│   │   ├── pagination.tsx
│   │   ├── date-picker.tsx
│   │   └── multi-step-form.tsx
│   │
│   ├── sections/                 # Sections (composed from patterns + primitives)
│   │   ├── hero-search.tsx       # Phase 5 section
│   │   ├── listing-card.tsx
│   │   ├── filter-panel-search.tsx
│   │   ├── results-grid.tsx
│   │   ├── photo-gallery.tsx
│   │   ├── listing-details.tsx
│   │   ├── agent-card.tsx
│   │   ├── offer-form.tsx
│   │   ├── message-thread.tsx
│   │   └── quick-stats.tsx
│   │
│   ├── layout/                   # Layout components
│   │   ├── app-layout.tsx        # Main layout (header, footer, main)
│   │   ├── dashboard-layout.tsx  # Dashboard layout (sidebar + main)
│   │   ├── agent-layout.tsx      # Agent dashboard layout
│   │   ├── admin-layout.tsx      # Admin dashboard layout
│   │   ├── auth-layout.tsx       # Auth pages layout
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   ├── sidebar.tsx
│   │   └── mobile-menu.tsx
│   │
│   └── providers/                # Context/Provider wrappers
│       ├── auth-provider.tsx
│       ├── query-provider.tsx
│       ├── theme-provider.tsx
│       └── motion-provider.tsx
│
├── hooks/                        # Custom hooks
│   ├── api/                      # API hooks (consume lib/api/*)
│   │   ├── use-listings.ts       # Search, filter, fetch listings
│   │   ├── use-offers.ts         # Create, update, fetch offers
│   │   ├── use-messages.ts       # Fetch, send messages
│   │   ├── use-auth.ts           # Login, signup, logout
│   │   ├── use-user.ts           # Fetch current user
│   │   └── use-viewings.ts       # Schedule, cancel viewings
│   │
│   ├── ui/                       # UI-specific hooks
│   │   ├── use-modal.ts          # Modal open/close state
│   │   ├── use-toast.ts          # Toast notifications
│   │   ├── use-filter.ts         # Filter state management
│   │   ├── use-pagination.ts     # Pagination state
│   │   └── use-form.ts           # Form state (wrap React Hook Form)
│   │
│   └── utils/                    # Utility hooks
│       ├── use-local-storage.ts  # Persist to localStorage
│       ├── use-debounce.ts       # Debounce hook
│       ├── use-media-query.ts    # Responsive breakpoints
│       └── use-async.ts          # Async data fetching
│
├── lib/                          # Core logic layer
│   ├── api/                      # API client functions (no hooks)
│   │   ├── listings.ts           # Fetch, search listings
│   │   ├── offers.ts             # CRUD offers
│   │   ├── messages.ts           # CRUD messages
│   │   ├── auth.ts               # Auth endpoints
│   │   ├── users.ts              # User profile endpoints
│   │   └── admin.ts              # Admin endpoints
│   │
│   ├── types/                    # Shared TypeScript types
│   │   ├── listing.ts            # Listing type + validation schema
│   │   ├── offer.ts              # Offer type
│   │   ├── message.ts            # Message type
│   │   ├── user.ts               # User type
│   │   └── index.ts              # Export all types
│   │
│   ├── validations/              # Zod schemas for runtime validation
│   │   ├── listing.ts            # ListingSchema, etc.
│   │   ├── offer.ts              # OfferSchema
│   │   ├── message.ts            # MessageSchema
│   │   ├── auth.ts               # SignupSchema, LoginSchema
│   │   └── index.ts              # Export all schemas
│   │
│   ├── utils/                    # Utility functions
│   │   ├── format.ts             # formatPrice, formatDate, etc.
│   │   ├── validators.ts         # Email, phone validation
│   │   ├── storage.ts            # localStorage helpers
│   │   ├── string.ts             # slugify, truncate, etc.
│   │   └── index.ts              # Export all utils
│   │
│   ├── constants.ts              # Global constants (no hardcoding!)
│   │   # API endpoints, durations, limits, enums
│   │   # export const API_BASE = process.env.NEXT_PUBLIC_API_URL
│   │   # export const DEBOUNCE_DELAY = 300
│   │   # export const LISTINGS_PER_PAGE = 20
│   │
│   ├── config.ts                 # Environment-based config
│   │   # export const config = { apiUrl, isDev, maxFileSize, ... }
│   │
│   ├── tokens.ts                 # Design tokens (Phase 7) exported for code
│   │   # export const tokens = { colors, spacing, typography, ... }
│   │
│   └── motion.ts                 # Motion/animation constants
│       # export const motion = { fast: 150, normal: 300, slow: 500 }
│
├── styles/                       # Global styles
│   ├── globals.css               # Reset, root variables, utility classes
│   ├── tokens.css                # Design tokens (CSS variables, Phase 7)
│   └── animations.css            # Keyframe animations, transitions
│
├── public/                       # Static assets
│   ├── fonts/                    # Custom fonts (Merriweather, Inter, JetBrains Mono)
│   ├── images/                   # Placeholder images
│   └── icons/                    # SVG icons (if not using Lucide)
│
├── middleware.ts                 # Next.js middleware (auth, redirects)
├── next.config.js                # Next.js config
├── tsconfig.json                 # TypeScript strict mode
├── tailwind.config.js            # Tailwind (if using)
├── .env.local                    # Local environment variables
├── .env.example                  # Template for env vars
├── package.json                  # Dependencies
└── README.md                     # Project documentation
```

See IMPLEMENTATION_PROMPT.md for the complete guide on implementing this architecture.

**Phase 8 Complete.**

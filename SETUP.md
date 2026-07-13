# Luxury Real Estate Platform — Development Setup

## Overview

This is a **Next.js App Router** starter for a premium luxury real estate marketplace. It implements a dark-first luxury design system (charcoal + burnt orange) with extreme whitespace and photography-first approach.

**Phase:** Sprint 1-2 (Foundation & Luxury Design) — Complete ✓

## Quick Start

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Open browser
open http://localhost:3000
```

## Project Structure

```
├── app/                    # Next.js App Router (pages, layouts, API routes)
├── components/             # React components (UI, sections, layouts)
├── lib/                    # Core logic (API, types, validations, utils)
├── hooks/                  # Custom React hooks
├── styles/                 # Global CSS, design tokens
├── public/                 # Static assets
├── design-os/              # Design system documentation (Phases 1-10)
```

### Key Directories

**app/** — Next.js routes and server-side logic
- `layout.tsx` — Root layout with providers
- `page.tsx` — Home page
- `(auth)/` — Authentication routes (signup, login, reset password)
- `api/` — API route handlers

**components/** — Reusable React components
- `ui/` — Primitives (Button, Card, Input, etc.)
- `sections/` — Page sections (Hero, Features, etc.)
- `layout/` — Layout components (Header, Footer, AppLayout)
- `providers/` — Context providers (Query, Auth, Theme, etc.)

**lib/** — Business logic and utilities
- `api/` — API client functions (no hooks)
- `types/` — TypeScript types
- `validations/` — Zod schemas for runtime validation
- `utils/` — Utility functions
- `hooks/` — Custom React hooks (wraps API layer)
- `constants.ts` — Global constants (no hardcoding!)
- `tokens.ts` — Design token exports

**styles/** — Global styles
- `tokens.css` — CSS variables (colors, spacing, typography, motion)
- `globals.css` — Global styles, utility classes, component defaults

## Design System

### Luxury Aesthetic

- **Colors:** Charcoal (#0a0e27) + Burnt Orange (#ff7a3d)
- **Typography:** Thin fonts (Instrument Serif for display, Space Grotesk for body)
- **Spacing:** Extreme whitespace (generous gaps and padding)
- **Motion:** Subtle, smooth (200-800ms durations)
- **Dark mode:** Primary experience (light mode is fallback)

### Token System

All design values live in CSS variables (see `styles/tokens.css`):

```css
--color-primary: #1a1d2e           /* Charcoal luxury */
--color-accent: #ff7a3d            /* Burnt orange (sparingly) */
--text-h1: 4.5rem                  /* Massive headlines */
--space-12: 5rem                   /* Extreme breathing room */
--motion-normal: 350ms             /* Subtle motion */
```

Use these in CSS/Tailwind classes:
```tsx
<h1 className="text-h1 font-display font-light text-text">Heading</h1>
<div className="p-6 gap-8">Content with luxury spacing</div>
```

### Component API

**Button**
```tsx
<Button variant="primary" | "secondary" | "ghost" size="sm" | "md" | "lg">
  Click me
</Button>
```

**Card**
```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>{children}</CardContent>
  <CardFooter>{children}</CardFooter>
</Card>
```

**Container**
```tsx
<Container size="sm" | "md" | "lg" | "full">
  Content with max-width constraint
</Container>
```

## Code Standards

### Rules (Non-Negotiable)

1. **No comments.** Code must read clearly on its own — if it doesn't, the abstraction is wrong.
2. **No hardcoding.** All constants → `lib/constants.ts`. API URLs, durations, enums → constants.
3. **No `any`.** Use `unknown` + narrowing or precise types. Derive types with `z.infer`.
4. **Match architecture.** Use existing patterns. Don't invent new ones.
5. **Use framework natively.** Next.js, TanStack Query, Zod, Tailwind — use what's already here.
6. **Single source of truth.** Define once, reference everywhere. Use tokens.
7. **Minimize LOC.** Shorter = better when equally maintainable.

### Patterns

**API Functions** (no hooks)
```typescript
// lib/api/listings.ts
export const listingsAPI = {
  async search(query: SearchQuery) { /* ... */ },
  async getById(id: string) { /* ... */ },
}
```

**API Hooks** (wraps API functions)
```typescript
// lib/hooks/use-listings.ts
export function useListings(query: SearchQuery) {
  return useQuery({
    queryKey: ['listings', query],
    queryFn: () => listingsAPI.search(query),
  })
}
```

**Components** (consume hooks)
```tsx
export function SearchPage() {
  const { data } = useListings(params)
  return <div>{data?.listings.map(...)}</div>
}
```

**Validation** (Zod schemas)
```typescript
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export type LoginInput = z.infer<typeof loginSchema>
```

**Styling** (token-first, no inline)
```tsx
// ✓ Good: Use design tokens
<button className="bg-accent text-text hover:bg-accent-dark">
  Click
</button>

// ✗ Bad: Hardcoded colors
<button style={{ backgroundColor: '#ff7a3d', color: '#f5f7f9' }}>
  Click
</button>
```

## Pre-Merge Checklist

Before committing:

```bash
# Type check
pnpm type-check

# Lint
pnpm lint

# Build (to catch runtime errors)
pnpm build
```

✓ No `any`, no `console.log`, no dead code, no comments
✓ No hardcoded values (URLs, copy, durations) — all in `lib/constants.ts`
✓ All constants centralized (single source of truth)
✓ Reused existing components/utilities (no reinventing)
✓ Architecture matches this structure exactly

## Folder Structure Checklist

```
✓ /app          — Routes, layouts, API
✓ /components   — UI, sections, layouts, providers
✓ /lib          — API, types, validations, utils, constants, hooks
✓ /hooks        — Reserved for global patterns (currently empty)
✓ /styles       — Globals, tokens, animations
✓ /public       — Static assets
```

Each component: **one per file**, kebab-case filenames, absolute imports via `@/`.

## Environment Variables

Copy `.env.local` or create from `.env.example`:

```bash
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_STRIPE_KEY=pk_test_...
JWT_SECRET=dev-only-change-in-production
```

## Running Locally

```bash
# Start dev server
pnpm dev

# Build for production
pnpm build

# Run production build locally
pnpm start

# Type check
pnpm type-check

# Lint
pnpm lint

# Format code
pnpm format
```

## Next Steps (Sprint 2-3)

Component library (80+ components):
- Primitives: Button, Input, Select, Checkbox, Badge, Avatar, Skeleton, Modal, Toast, Tooltip
- Patterns: Filter panel, Data table, Dropdown, Tabs, Accordion, Pagination, Date picker, File upload
- Sections: Hero, Listing card, Results grid, Photo gallery, Agent card, Offer form

See `/design-os/LUXURY-IMPLEMENTATION-PROMPT.md` for complete roadmap.

## Troubleshooting

**Build fails with TypeScript errors**
- Run `pnpm type-check` to see all errors
- Ensure all imports use absolute paths (`@/...`)
- Check that types are derived from Zod schemas

**Prettier doesn't format on save**
- Ensure hook is configured in `.claude/settings.json`
- Run `pnpm format` manually

**Styles not applying**
- Check that `styles/globals.css` is imported in root layout
- Verify CSS variable names in tokens.css
- Test in browser DevTools (check computed styles)

**Tests failing**
- Ensure `STALE_TIME` and `CACHE_TIME` constants match API expectations
- Check that mocked API responses match Zod schemas

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [TanStack Query](https://tanstack.com/query)
- [Zod](https://zod.dev)
- [Tailwind CSS](https://tailwindcss.com)
- Design System: `/design-os/` (Phases 1-10)

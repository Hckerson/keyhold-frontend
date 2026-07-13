# Phase 3: Information Architecture

**Real Estate Platform Design Operating System** - Sitemap, navigation, permissions, taxonomy

---

## Overview

Complete information architecture covering:
- Site structure and page hierarchy
- Role-based navigation models
- Permissions matrix
- Content taxonomy and labeling
- Navigation patterns

---

## Site Structure (Sitemap)

```
/
├── (PUBLIC BROWSE)
│   ├── / (Home)
│   ├── /search (Search Results)
│   ├── /listing/:id (Listing Detail)
│   └── /map (Map View)
│
├── (AUTH REQUIRED)
│   ├── /dashboard (Buyer Home)
│   ├── /dashboard/saved (Saved Listings)
│   ├── /dashboard/offers (My Offers)
│   ├── /dashboard/viewings (Scheduled Viewings)
│   ├── /dashboard/messages (Messages)
│   ├── /dashboard/alerts (Price Alerts)
│   ├── /dashboard/settings (Settings)
│   │
│   ├── /agent/dashboard (Agent Home)
│   ├── /agent/listings (My Listings)
│   ├── /agent/leads (Leads)
│   ├── /agent/pipeline (Pipeline/CRM)
│   ├── /agent/calendar (Calendar)
│   ├── /agent/analytics (Performance)
│   ├── /agent/settings (Settings)
│   │
│   ├── /admin (Admin Overview)
│   ├── /admin/listings (Moderation Queue)
│   ├── /admin/users (User Management)
│   ├── /admin/transactions (Transaction History)
│   ├── /admin/payments (Payment Status)
│   ├── /admin/reports (Analytics)
│   └── /admin/settings (Admin Settings)
│
└── (AUTH)
    ├── /signup (Sign Up)
    ├── /login (Sign In)
    ├── /reset-password (Password Reset)
    └── /verify-email (Email Verification)
```

---

## Role-Based Navigation Models

### Anonymous User (Not Logged In)

**Primary Navigation:** Home → Search → Listing Detail → Sign Up

**Header:**
- Logo (home link)
- Search icon/bar
- Sign In / Sign Up buttons

**Footer:**
- About, Help, Blog links
- Social media
- Privacy, Terms

**Restrictions:**
- Cannot save listings
- Cannot create offers
- Cannot message agents
- Cannot schedule viewings

---

### Buyer (Logged In)

**Primary Navigation:** Home → Search → Saved/Offers/Viewings/Messages

**Header:**
- Logo
- Search + filter icon
- Saved count badge
- Messages icon (with unread count)
- User menu (Profile, Settings, Logout)

**Sidebar (Mobile Hamburger):**
- Saved Listings
- My Offers
- My Viewings
- Messages
- Price Alerts
- Settings

**Quick Actions:**
- "Save" button on listings
- "Schedule Viewing" button on detail
- "Make Offer" button on detail

---

### Agent (Logged In)

**Primary Navigation:** Dashboard → Listings → Leads → Pipeline → Calendar → Analytics

**Header:**
- Logo
- Search (for listings to preview)
- Notifications (new leads, showing requests)
- User menu

**Sidebar:**
- Dashboard (overview)
- My Listings (grid, actions)
- Leads (inquiries, qualification)
- Pipeline (view/offer status)
- Calendar (showings, follow-ups)
- Analytics (performance)
- Settings

**Quick Actions:**
- "Upload Listing" button
- "Import CSV" for bulk actions
- "Create Listing" dialog

---

### Admin (Logged In)

**Primary Navigation:** Overview → Moderation → Users → Transactions → Payments → Reports

**Header:**
- Logo
- System health (uptime, error rate)
- Alerts badge
- Admin menu

**Sidebar:**
- Dashboard (health overview)
- Listings (moderation queue)
- Users (verification, suspension)
- Transactions (deal status)
- Payments (revenue, disputes)
- Reports (analytics, growth)
- Settings (system config)

**Quick Actions:**
- "Approve Listing" (bulk)
- "Suspend User"
- "Refund Payment"

---

## Permissions Matrix

| Action | Anonymous | Buyer | Agent | Seller | Admin |
|--------|-----------|-------|-------|--------|-------|
| View listings | ✓ | ✓ | ✓ | - | ✓ |
| Save listing | - | ✓ | - | - | - |
| Create offer | - | ✓ | - | - | - |
| Schedule viewing | - | ✓ | ✓ | ✓ | - |
| Message agent | - | ✓ | ✓ | ✓ | - |
| Upload listing | - | - | ✓ | ✓ | - |
| Edit listing | - | - | ✓ (own) | ✓ (own) | ✓ (all) |
| View offers | - | ✓ (own) | ✓ (own) | ✓ (own) | ✓ (all) |
| Moderate listing | - | - | - | - | ✓ |
| Suspend user | - | - | - | - | ✓ |
| View analytics | - | - | ✓ (own) | ✓ (own) | ✓ (all) |
| Download data | ✓ | ✓ | ✓ | ✓ | ✓ |

---

## Content Taxonomy

### Property Types
- Single-Family Home
- Condo / Townhouse
- Multi-Family (2-4 units)
- Multi-Family (5+ units)
- Land
- Commercial (varies by market)

### Price Ranges
- $0-300k
- $300k-500k
- $500k-1M
- $1M-2M
- $2M+

### Listing Status
- Draft (not published)
- Published (active)
- Pending Offer
- Under Contract
- Sold
- Expired (old/stale)

### Offer Status
- Submitted
- Countered
- Accepted
- Rejected
- Withdrawn
- Closed (deal complete)

---

## Labeling Conventions

### Actions
- "Save" (bookmark a listing)
- "View" (schedule a showing)
- "Offer" (make an offer)
- "Message" (contact agent)
- "Share" (forward listing)

### Status Badges
- "New" (posted <7 days)
- "Hot" (many saves, multiple offers)
- "Price Reduced" (recently lowered)
- "Pending" (under contract)
- "Sold" (deal closed)

### Navigation Labels
- "Saved" (not "Favorites", not "Bookmarks")
- "My Offers" (not "Offers Made", not "Pending Offers")
- "My Viewings" (not "Scheduled", not "Showings")
- "Messages" (not "Inbox", not "Chat")
- "Settings" (not "Preferences", not "Admin")

### Empty States
- "No listings saved yet. Start exploring."
- "No offers to show. Ready to make one?"
- "No messages. Connect with an agent."

---

## Information Priority (Page Hierarchy)

### Listing Detail Page
1. **Hero image** (largest, first)
2. **Price + status** (prominent)
3. **Address + key facts** (beds, baths, sq ft)
4. **Gallery** (scrollable photos)
5. **Description** (full property details)
6. **Neighborhood** (map, schools, transit)
7. **Comparables** (similar recent sales)
8. **Agent info** (who's listing)
9. **CTAs** (Schedule Viewing, Make Offer, Save)

### Search Results
1. **Filters** (sticky on desktop, collapsible on mobile)
2. **Result count** (12 in metro, 20 nearby, etc.)
3. **Sorting options** (Price: Low-High, Newest, Most Saved)
4. **Results grid** (card layout, 2-3 columns)
5. **Pagination/Infinite scroll**
6. **Map toggle** (see results on map)

### Dashboard (Buyer)
1. **Quick stats** (Saved: 5, Offers: 2, Viewings: 1)
2. **Recent activity** (Last viewed, saved today)
3. **Upcoming** (Viewing scheduled for Saturday)
4. **New alerts** (Price dropped on saved listing)
5. **Quick links** (Browse, Manage Offers, Messages)

---

**Phase 3 Complete. This IA guides all page structure and navigation design.**

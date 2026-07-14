# MASTER PROMPT — Enterprise Real Estate Platform Design Operating System (COMPLETE)

You are operating as an **Enterprise Design System Lead**, **Principal Product Designer**, **UX Architect**, **Information Architect**, **Frontend System Architect**, and **Senior Next.js Engineer**.

Your responsibility is **not to simply design a real-estate website**.

Your responsibility is to build an **enterprise-grade real estate platform** using a structured Design Operating System that transforms business requirements into a production-ready frontend.

You must think like someone building Zillow, Rightmove, Realtor.com, Airbnb Homes, Property24, Bayut, or Redfin—not a landing page.

The final deliverable must be production-ready and suitable for handoff to engineering teams without ambiguity.

---

# Primary Objective

Design a modern enterprise real estate platform capable of supporting:

* Property Buyers
* Property Renters
* Property Owners
* Estate Agents
* Agencies
* Property Developers
* Administrators
* Customer Support
* Marketing Team

The system must be scalable enough for millions of listings.

Every design decision must support:

* usability
* accessibility
* scalability
* maintainability
* performance
* frontend implementation
* responsive behavior
* enterprise consistency

---

# Technology Stack

Design for the following stack.

Framework

* Next.js (App Router)
* React
* TypeScript

Styling

* Tailwind CSS
* CSS Variables
* Design Tokens

State

* Zustand
* TanStack Query

Forms

* React Hook Form
* Zod

Animations

* Framer Motion

Maps

* Google Maps
* Mapbox abstraction

Charts

* Recharts

Icons

* Lucide

Images

* Next Image

Accessibility

* WCAG 2.2 AA

Testing

* Playwright
* Vitest

---

# Design Philosophy

Think in systems.

Never think in pages first.

Never jump directly into UI.

Always begin with product strategy.

Every output must be traceable.

Every decision must reference previous phases.

Avoid assumptions unless necessary.

When assumptions are required:

Create an "Assumptions" section.

---

# Required Workflow

You MUST complete every phase before continuing.

Never skip phases.

Never merge phases.

Every phase must produce implementation-ready artifacts.

---

# PHASE 1 — Product Vision

Create the enterprise product vision.

Include:

Business vision

Product purpose

Business goals

Value proposition

Competitive positioning

Primary personas

Secondary personas

Jobs To Be Done

Business rules

Success metrics

KPIs

North Star metric

Governance

Platform constraints

Design principles

Implementation philosophy

Non-goals

Future scalability considerations

Output:

A Product Vision document that becomes the single source of truth.

---

# PHASE 2 — Experience Maps

Design experiences before pages.

Create experience maps for:

Property Search

Property Discovery

Saved Listings

Property Comparison

Viewing Booking

Offer Submission

Rental Inquiry

Agent Communication

Mortgage Calculator

Property Alerts

Agent Dashboard

Owner Dashboard

Admin Moderation

Customer Support

Favorites

Authentication

Profile Management

Notifications

Payments

Reviews

Messaging

For each experience include:

User intent

Trigger

Entry points

Journey

Decision points

Emotional state

Failure paths

Recovery paths

System behavior

Completion criteria

Dependencies

---

# PHASE 3 — Information Architecture

Using the experience maps:

Design:

Navigation hierarchy

Sitemap

Content hierarchy

Role-based navigation

Permissions

Content taxonomy

Labeling conventions

Cross-linking

Search hierarchy

Filtering hierarchy

SEO hierarchy

Breadcrumb strategy

Empty routes

Fallback routes

Future expansion strategy

---

# PHASE 4 — Page Blueprints

For every page create functional blueprints.

Examples include:

Home

Search

Listing Details

Map View

Saved Properties

Favorites

Compare

Agent Profile

Agency Profile

Owner Dashboard

Agent Dashboard

Admin Dashboard

Messages

Notifications

Settings

Profile

Mortgage Calculator

Property Submission

Authentication

Booking

Payment

Help Center

404

500

For each page define:

Purpose

Business objective

User objective

Primary tasks

Modules

Required data

Permissions

Responsive behavior

Loading states

Empty states

Error states

Success states

Actions

Dependencies

Implementation notes

---

# PHASE 5 — Section Blueprints

Break every page into reusable sections.

Each section must include:

Purpose

Responsibilities

Hierarchy

Content model

Data requirements

Interaction model

Controls

Responsive behavior

Accessibility requirements

Loading states

Error states

Skeleton states

Empty states

Animation behavior

Reuse potential

Technical notes

No section should solve multiple unrelated jobs.

---

# PHASE 6 — Component Library

Transform sections into a design system.

For every component specify:

Component name

Purpose

Variants

Props

Slots

Tokens

States

Accessibility

Keyboard support

ARIA

Responsive behavior

Composition rules

Interaction patterns

Validation rules

Animation rules

Loading behavior

Error behavior

Content rules

Do

Don't

Anti-patterns

Dependencies

Examples

Prioritize reusable enterprise components.

Avoid page-specific components.

---

# PHASE 7 — Design Tokens

Generate a scalable token system.

Include:

Colors

Typography

Spacing

Sizing

Elevation

Border Radius

Motion

Transitions

Opacity

Shadows

Breakpoints

Grid

Container Widths

Icon Sizes

Focus Rings

Z-index Scale

Dark Mode

Semantic Tokens

Component Tokens

---

# PHASE 8 — Frontend Architecture

Design the frontend architecture.

Generate:

Folder structure

Route structure

Layouts

Providers

Feature folders

Hooks

Utilities

Constants

Contexts

Stores

API organization

Component organization

Shared libraries

Design system package

Asset organization

Naming conventions

Code splitting strategy

Lazy loading

Performance strategy

---

# PHASE 9 — Implementation Roadmap

Produce a complete implementation roadmap.

Include:

Development phases

Priority order

Sprint breakdown

Milestones

Dependencies

Risk assessment

Technical debt prevention

Testing strategy

Deployment readiness

---

# PHASE 10 — Quality Assurance

Review the entire system.

Validate:

Accessibility

Consistency

Responsiveness

Scalability

Performance

State coverage

Error handling

Loading behavior

Design system compliance

Frontend readiness

Developer experience

SEO readiness

Maintainability

Cross-browser compatibility

WCAG compliance

---

# PHASE 11 — Ancillary Documentation & Navigation

Generate supporting documentation that helps teams navigate and use the design OS.

This phase produces 6 navigation, reference, and setup documents.

## 11.1 — START_HERE.md

**Purpose:** Quick entry point for new users discovering the design OS.

**Content:**
- What the design OS contains (checklist of 10 phases)
- File listing with purpose for each phase
- Quick 3-step workflow (Read → Copy → Execute)
- Next session instructions (copy IMPLEMENTATION_PROMPT.md)
- Quick reference table (I want to... → Go to...)
- Links to all phase artifacts (if published online)

**Length:** ~150-200 lines

**Tone:** Friendly, action-oriented, zero friction

---

## 11.2 — README.md

**Purpose:** 5-minute comprehensive overview. The "what is this?" document.

**Content:**
- What this design OS is (30-second summary)
- Quick start in 3 bullet points
- Complete file listing with purpose for each (phases 1-10 + implementation files)
- How to use for different roles (Product, Designers, Engineers, QA)
- Key statistics (10 phases, 80+ components, 55 sections, 21 pages, 16 weeks, 200+ QA items)
- Getting started (5-minute workflow)
- Design OS philosophy (no ambiguity, no reinvention, production-ready)

**Length:** ~180-220 lines

**Tone:** Professional, organized, reference-style

---

## 11.3 — DESIGN-OS-COMPLETE.md

**Purpose:** Master index and summary. Single source of truth for what exists.

**Content:**
- Executive summary (what you have)
- Complete list of all deliverables with descriptions:
  * Phases 1-10 (brief 1-2 sentence description of each)
  * Ancillary documents (6 files)
  * Luxury variant (4 optional files)
- Deliverable statistics
- How to use this document (as an index)
- Cross-references between phases
- What's included vs. not included
- Version/date information

**Length:** ~250-300 lines

**Tone:** Authoritative, index-style

---

## 11.4 — ARTIFACT_INDEX.md

**Purpose:** Detailed index with deep descriptions. Maps each phase to its use case.

**Content:**
- Full listing of all 10 phases with:
  * Long description (3-4 sentences)
  * Who needs it (role/persona)
  * When to reference it (use cases)
  * What it contains (key sections)
  * How it flows to other phases (dependencies)
- Implementation files (Phases 8-10) detailed breakdown
- Luxury variant index (if applicable)
- Reading order recommendations (different paths for different roles)
- Search keywords for each phase

**Length:** ~300-350 lines

**Tone:** Reference, detailed

---

## 11.5 — SETUP-CHECKLIST.md

**Purpose:** Implementation setup walkthrough. Step-by-step guide to begin building.

**Content:**
- Pre-implementation prerequisites
  * Read these phases first (1, 3, 8)
  * Understand these concepts (personas, navigation, components)
- Environment setup (Node, pnpm, editor setup)
- Project initialization
  * Next.js setup commands
  * Tailwind CSS configuration
  * TypeScript configuration
  * Folder structure creation (matching Phase 8)
- Design tokens integration
  * Set up CSS variables (Phase 7)
  * Configure dark mode
- Component library bootstrap
  * Install dependencies (Lucide, Framer Motion, etc.)
  * Create base component directory
- Testing setup (Vitest, Playwright)
- Developer workflow setup (git hooks, linting, formatting)
- Verification checklist (everything installed and ready)

**Length:** ~250-300 lines

**Tone:** Instructional, numbered steps, practical

---

## 11.6 — IMPLEMENTATION_PROMPT.md

**Purpose:** Complete implementation guide. Self-contained prompt for code building. All 10 phases synthesized into engineering action items.

**Content:**
- Overview (what this prompt does, how to use it)
- References to Phases 1-7 (required reading before coding)
- Phase 8 Implementation (Architecture setup)
  * Folder structure (exact paths)
  * Route structure (exact routes)
  * Providers and contexts
  * Hooks organization
  * Component organization
- Phase 9 Implementation (Sprint breakdown)
  * Sprint 1-8 breakdown (16 weeks total)
  * What to build each sprint
  * Which pages/components per sprint
  * Dependencies and sequencing
  * Milestones and deliverables
- Phase 10 Implementation (QA checklist)
  * Pre-launch QA items (200+ items organized by category)
  * Accessibility verification
  * Performance targets
  * Browser compatibility
  * Responsive design verification
  * Component library completeness
- Code patterns and standards
  * Component structure template
  * Page template
  * Hook patterns
  * API integration patterns
  * Error handling
  * Loading states
  * Empty states
- Testing strategy
  * Unit test coverage targets
  * Integration test priorities
  * E2E test scenarios
  * Accessibility testing
- Pre-merge checklist
- Deployment readiness
- References to all other phases for context lookups

**Length:** ~800-1200 lines (comprehensive)

**Tone:** Technical, directive, reference

---

## 11.7 Output Requirements for Phase 11

Generate exactly 6 markdown files:

1. START_HERE.md
2. README.md
3. DESIGN-OS-COMPLETE.md
4. ARTIFACT_INDEX.md
5. SETUP-CHECKLIST.md
6. IMPLEMENTATION_PROMPT.md

All files must:
- Cross-reference each other appropriately
- Reference the 10 phases consistently
- Use identical formatting conventions
- Maintain consistent tone within each document type
- Include version/date information
- Include table of contents where applicable (files >250 lines)

---

# PHASE 12 — Luxury Variant System (Optional Extension)

Generate an optional premium tier specification that extends the base design OS without modifying it.

This phase produces 4 files that represent an optional "Horizon Grove" luxury real estate platform aesthetic.

## 12.1 — LUXURY-VISUAL-DIRECTION.md

**Purpose:** Premium design token system and component styling for luxury real estate.

**Content:**
- Visual direction philosophy (premium, minimal, spacious)
- Color palette
  * Charcoal black (#1a1a1a base)
  * Burnt orange accents (#c84c00)
  * Off-white backgrounds (#f5f3f0)
  * Neutrals and grays (premium shades)
- Typography
  * Luxury serif font (Georgia, EB Garamond)
  * Sans serif for UI (Inter, system fonts)
  * Typography scale (H1-H6, body, labels)
  * Letter spacing (premium, loose)
- Component styling guide
  * Buttons (luxury variants)
  * Cards (elevated, spacious)
  * Inputs (minimal, refined)
  * Modals (premium treatment)
  * Navigation (luxury aesthetic)
- Spacing and layout
  * Generous whitespace rules
  * Luxury grid (wider gutters)
  * Component padding (premium)
- Icons and imagery
  * Icon weight (thinner, elegant)
  * Photography style (premium, curated)
  * Image treatment
- Animations
  * Transition timings (slower, refined)
  * Motion principles (luxury movement)
  * Loading animations (premium)
- Dark mode adaptation
- Accessibility (WCAG AA with premium look)

**Length:** ~300-400 lines

**Tone:** Visual, aspirational, technical specification

---

## 12.2 — LUXURY-FEATURES-ADDENDUM.md

**Purpose:** Premium feature specifications beyond the base platform.

**Content:**
- Overview (what differentiates luxury tier)
- Feature 1: Private Viewing Portal
  * Specification
  * Permissions and access
  * Components needed
  * Integration with base platform
  * User experience
  * Implementation notes
- Feature 2: Concierge Services Integration
  * Specification
  * Workflow
  * Data model
  * Components
  * Implementation notes
- Feature 3: VIP Tier Management
  * Specification
  * VIP benefits and permissions
  * Dashboard
  * Components
  * Implementation notes
- Feature 4: CRM Integration for Agents
  * Specification
  * Contact management
  * Activity tracking
  * Components
  * Implementation notes
- Feature 5: Market Intelligence & Data
  * Specification
  * Analytics and insights
  * Data visualization
  * Components
  * Implementation notes
- Feature 6: Document Management System
  * Specification
  * File storage and sharing
  * Digital signatures
  * Components
  * Implementation notes
- Database schema additions
- API endpoints for luxury features
- Permissions and role updates
- Implementation sequencing

**Length:** ~400-500 lines

**Tone:** Technical specification, architectural

---

## 12.3 — LUXURY-README.md

**Purpose:** Quick start for luxury variant. What changed from base platform.

**Content:**
- Overview (luxury platform vs. base platform)
- What's included
  * Phases 1-10 (unchanged)
  * Visual direction (new)
  * Premium features (new, integrated in sprints)
  * Implementation prompt (updated)
- Files to use
  * LUXURY-VISUAL-DIRECTION.md (design tokens)
  * LUXURY-FEATURES-ADDENDUM.md (features)
  * LUXURY-IMPLEMENTATION-PROMPT.md (implementation)
- Visual preview/examples
- Feature highlights (6 premium features)
- Design aesthetic (charcoal + orange + thin typography)
- Implementation timeline (luxury features in which sprints)
- Comparison table (base vs. luxury)
- Next steps

**Length:** ~200-250 lines

**Tone:** Marketing + technical, engaging

---

## 12.4 — LUXURY-IMPLEMENTATION-PROMPT.md

**Purpose:** Implementation guide for luxury variant. Builds on base IMPLEMENTATION_PROMPT.md.

**Content:**
- Overview
  * Start with base IMPLEMENTATION_PROMPT.md
  * Then integrate luxury specifications
  * Luxury features are integrated into sprints 4-8
- Design token implementation
  * Tailwind configuration for luxury colors
  * CSS variables for charcoal/orange/off-white
  * Dark mode with luxury palette
  * Typography setup (serif + sans-serif)
- Phase-by-phase integration
  * Which phases need luxury adjustments
  * Component styling by phase
  * Luxury variants of base components
- Sprint modifications
  * Sprint 4: Integrate luxury design tokens
  * Sprint 5: Luxury UI components
  * Sprint 6-8: Premium features (viewing, concierge, CRM, etc.)
  * Resequencing if different timeline desired
- Database schema for luxury
  * New tables (VIP tiers, private viewings, concierge requests, etc.)
  * Relationships
  * Migrations
- API endpoints for luxury features
  * Authentication and permissions
  * Endpoint specifications
  * Response schemas
- Component library for luxury
  * Luxury-specific components
  * Luxury variants of base components
  * Accessibility for premium designs
- Testing for luxury features
  * Feature-specific tests
  * Visual regression testing
  * Luxury user workflows
- Deployment considerations
  * Feature flags for luxury tier
  * A/B testing setup
  * Analytics for luxury features
- QA checklist additions
  * Luxury-specific QA items
  * Premium UX standards
  * Visual fidelity verification

**Length:** ~600-800 lines

**Tone:** Technical, implementation-focused

---

## 12.5 Output Requirements for Phase 12

Generate exactly 4 markdown files:

1. LUXURY-VISUAL-DIRECTION.md
2. LUXURY-FEATURES-ADDENDUM.md
3. LUXURY-README.md
4. LUXURY-IMPLEMENTATION-PROMPT.md

All files must:
- Reference the base design OS (not duplicate it)
- Integrate cleanly with Phases 1-10
- Use identical formatting to base files
- Maintain design consistency
- Include version/date information
- Include table of contents (files >300 lines)

---

# Complete Deliverables Summary

## Phase 1-10: Core Design OS (10 files)
- phase-1-product-vision.md
- phase-2-experience-maps.md
- phase-3-information-architecture.md
- phase-4-page-blueprints.md
- phase-5-section-blueprints.md
- phase-6-component-library.md
- phase-7-design-tokens.md
- phase-8-frontend-architecture.md
- phase-9-implementation-roadmap.md
- phase-10-qa-checklist.md

## Phase 11: Ancillary Documentation (6 files)
- START_HERE.md
- README.md
- DESIGN-OS-COMPLETE.md
- ARTIFACT_INDEX.md
- SETUP-CHECKLIST.md
- IMPLEMENTATION_PROMPT.md

## Phase 12: Luxury Variant (4 files, optional)
- LUXURY-VISUAL-DIRECTION.md
- LUXURY-FEATURES-ADDENDUM.md
- LUXURY-README.md
- LUXURY-IMPLEMENTATION-PROMPT.md

**Total: 20 files, all generated in one complete system**

---

# Design Requirements

The platform should feel comparable in quality to:

* Zillow
* Redfin
* Realtor.com
* Rightmove
* Airbnb Homes
* Bayut
* Property24

However, do not copy these products.

Use them only as quality benchmarks.

---

# Frontend Standards

The resulting UI should be:

* Minimal
* Modern
* Enterprise-grade
* Premium
* Spacious
* Highly usable
* Mobile-first
* Responsive
* Accessible
* Fast
* SEO-friendly
* Conversion-focused

Every page must support:

* Skeleton loading
* Empty states
* Error states
* Offline behavior where appropriate
* Keyboard navigation
* Screen reader compatibility
* Smooth animations
* Progressive enhancement

---

# Cross-File Linking Requirements

All 20 files must be interconnected:

1. **Phase files** reference each other in logical progression (1→2→3...→10)
2. **Ancillary files** reference phases for context (e.g., SETUP-CHECKLIST references Phase 8)
3. **Luxury files** reference base phases and ancillary files
4. **START_HERE.md** is the entry point, directing users to README and other files
5. **IMPLEMENTATION_PROMPT.md** synthesizes all 10 phases into actionable engineering steps
6. Consistent file naming, formatting, and structure across all 20 files

---

# Critical Rules

Never skip phases.

Never jump directly into UI.

Always explain design decisions.

Maintain traceability between phases.

Think in systems instead of pages.

Optimize for engineering implementation.

Avoid vague descriptions.

Every artifact must be production-ready.

All 20 files must be generated together as a cohesive system.

When the design operating system is complete, the entire 20-file package must be suitable for immediate handoff to frontend engineering teams.

---

# Output Format

Generate all 20 markdown files (.md) with:

- Consistent heading hierarchy (# = title, ## = major section, ### = subsection)
- Table of contents for files >250 lines
- Clear sections with consistent formatting
- Cross-links between files (markdown links)
- Version/date stamps
- Consistent styling and tone within document types
- Examples and illustrations where appropriate
- Implementation notes for engineers

Each file is self-contained but interconnected with the others.

The complete package (all 20 files) is the final deliverable, suitable for enterprise handoff.

---

**This updated prompt produces a complete, interconnected 20-file design operating system ready for production implementation.**

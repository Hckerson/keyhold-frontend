---
name: keyhold-real-estate
description: Use this skill when designing luxury real estate websites. It provides a clean, high-contrast aesthetic with a modern, exclusive feel, perfect for showcasing high-end properties. The design utilizes the 'acumin-pro' font family for clear typography and a palette featuring primary blue and deep ink colors.
packages:
    - name: clsx
      purpose: Tiny utility for conditionally joining class names
      kind: dependency
      curated: true
    - name: tailwind-merge
      purpose: Merge Tailwind classes without style conflicts
      kind: dependency
      curated: true
    - name: class-variance-authority
      purpose: Type-safe component style variants (CVA)
      kind: dependency
      curated: true
    - name: shadcn
      purpose: Accessible, unstyled UI primitives you copy into the project
      kind: setup
      curated: true
      command: pnpm dlx shadcn@latest add
    - name: react-hook-form
      purpose: Handling form state and validation efficiently for input elements.
      kind: dependency
      curated: false
    - name: lodash
      purpose: Utility functions for easier data manipulation and manipulation of values used in styles.
      kind: dependency
      curated: false
---

```yaml
brand: Keyhold
mood:
    An atmosphere of serene, architectural luxury and modern exclusivity, communicated
    through a clean, high-contrast aesthetic.
scheme: light
colors:
    primary: "#0057ff"
    primary-bright: "#3b63fb"
    primary-deep: "#001e36"
    on-primary: "#ffffff"
    ink: "#181a1a"
    ink-soft: "#707070"
    on-ink: "#ffffff"
    canvas: "#f9f9f9"
    paper: "#ffffff"
    cloud: "#f5f5f5"
    hairline: "#e8e8e8"
    hairline-strong: "#959595"
    link: "#7e97d7"
    link-pressed: "#5a7bc9"
    success: "#34a853"
    error: "#ea4335"
    accent-midnight: "#0c3645"
    accent-deep-ocean: "#001d26"
    accent-wash: "#f5f8ff"
typography:
    display-xl:
        fontFamily: acumin-pro-wide
        fontSize: 96px
        fontWeight: 700
        lineHeight: 1.1
    display-lg:
        fontFamily: acumin-pro
        fontSize: 48px
        fontWeight: 700
        lineHeight: 1.2
    body-lg:
        fontFamily: acumin-pro
        fontSize: 18px
        fontWeight: 400
        lineHeight: 1.6
    body-md:
        fontFamily: acumin-pro
        fontSize: 16px
        fontWeight: 400
        lineHeight: 1.5
    caption-md:
        fontFamily: acumin-pro
        fontSize: 14px
        fontWeight: 400
        lineHeight: 1.4
    nav-item:
        fontFamily: acumin-pro
        fontSize: 16px
        fontWeight: 500
        lineHeight: 1
    button-md:
        fontFamily: acumin-pro
        fontSize: 14px
        fontWeight: 600
        lineHeight: 1.25
    link-md:
        fontFamily: acumin-pro
        fontSize: 15px
        fontWeight: 500
        lineHeight: 1.33
rounded:
    none: 0px
    xs: 4px
    sm: 6px
    md: 8px
    lg: 15px
    pill: 9999px
spacing:
    xxs: 4px
    xs: 8px
    sm: 12px
    md: 16px
    lg: 24px
    xl: 32px
    xxl: 48px
    section: 80px
shadows:
    none: none
    soft-lift: rgba(0, 0, 0, 0.16) 0px 1px 2px 0px
    card: rgba(25, 25, 25, 0.16) 0px 3px 6px 0px
    modal: rgba(0, 0, 0, 0.2) 0px 0px 18px 0px
    glow-primary: rgb(204, 225, 255) 0px 0px 10px 1px
motion:
    duration-fast: 150ms
    duration-base: 250ms
    duration-slow: 500ms
    ease-standard: cubic-bezier(0.19, 1, 0.22, 1)
    ease-emphasized: ease-in-out
    transition-default: 250ms cubic-bezier(0.19, 1, 0.22, 1)
    transition-color: 150ms linear
components:
    button-primary:
        backgroundColor: "{colors.primary}"
        color: "{colors.on-primary}"
        rounded: "{rounded.pill}"
        padding: "{spacing.sm} {spacing.lg}"
        typography: "{typography.button-md}"
        shadow: "{shadows.glow-primary}"
        cursor: pointer
    button-primary-hover:
        backgroundColor: "{colors.primary-bright}"
        transform: scale(1.05)
    card:
        backgroundColor: "{colors.paper}"
        rounded: "{rounded.lg}"
        padding: "{spacing.lg}"
        shadow: "{shadows.card}"
        border: 1px solid {colors.hairline}
    card-hover:
        shadow: "{shadows.modal}"
        transform: translateY(-4px)
    input-text:
        backgroundColor: "{colors.paper}"
        color: "{colors.ink}"
        rounded: "{rounded.pill}"
        padding: "{spacing.sm} {spacing.lg}"
        border: 1px solid {colors.hairline}
        typography: "{typography.body-md}"
        cursor: text
    input-text-focus:
        border: 1px solid {colors.primary}
        shadow: "{shadows.glow-primary}"
    nav-link:
        color: "{colors.ink}"
        typography: "{typography.nav-item}"
        padding: "{spacing.xs} {spacing.md}"
        cursor: pointer
        position: relative
    nav-link-hover:
        color: "{colors.primary}"
    link:
        color: "{colors.link}"
        typography: "{typography.link-md}"
        textDecoration: underline
        cursor: pointer
    link-hover:
        color: "{colors.primary}"
        textDecoration: none
```

## Visual Theme & Atmosphere

The Keyhold design system projects an aura of clean, architectural luxury. It is modern, refined, and exclusive, built on a foundation of high-contrast visuals, generous whitespace, and exceptionally sharp typography. The mood is serene and confident, using a minimalist color palette to let the content—stunning architectural photography and compelling descriptions—take center stage. The aesthetic feels less like a traditional website and more like a high-end architectural journal or a gallery exhibition. Every element is placed with intention, contributing to a sense of calm and order that befits a luxury real estate brand.

The interaction design is subtle but responsive, with smooth transitions and satisfying feedback that reinforces the feeling of quality. Elevation is used sparingly via soft shadows like `{shadows.card}`, giving key interface elements a gentle lift off the `{colors.canvas}` background. The primary action color, `{colors.primary}`, is a vibrant, modern blue that provides a confident splash of color for calls-to-action, drawing the user's eye without overwhelming the sophisticated, neutral environment.

Key Characteristics:

- **Minimalist High-Contrast Palette:** The design relies almost entirely on `{colors.ink}`, `{colors.paper}`, and `{colors.canvas}`, creating a stark, clean backdrop. The single, vibrant `{colors.primary}` provides all necessary chromatic punch.
- **Generous Whitespace:** Layouts breathe. Ample negative space is used to frame content, guide the eye, and create a sense of calm and focus. Spacing is governed by a strict scale, with `{spacing.section}` used to create clear divisions.
- **Architectural Typography:** Two specific fonts, `acumin-pro-wide` for display headlines and `acumin-pro` for everything else, create a strong, modern typographic hierarchy. Large-scale headings like `{typography.display-xl}` act as structural, almost graphical elements.
- **Subtle, Purposeful Elevation:** Shadow is not decorative but functional. `{shadows.card}` lifts interactive panels, and `{shadows.modal}` indicates a higher state of interaction or importance. A unique `{shadows.glow-primary}` provides a modern, digital-native feel to focused inputs and primary buttons.
- **Pill & Gentle Curve Geometry:** Interactive elements consistently use either `{rounded.pill}` (for buttons and inputs) or `{rounded.lg}` (for cards), creating a soft, approachable feel that contrasts with the sharp typographic forms.
- **Fluid & Understated Motion:** Interactions are supported by smooth, fast animations. Color changes use `{motion.transition-color}`, while transform effects use the refined `{motion.transition-default}`. The motion is designed to feel responsive and high-quality, never jarring.
- **Dramatic Sectioning:** The design uses occasional full-bleed sections with dark backgrounds like `{colors.accent-deep-ocean}` and light text (`{colors.on-ink}`) to create dramatic focal points and vary the visual rhythm of a page.

## Color Usage Rules

The Keyhold color system is intentionally minimal to maintain a sophisticated and focused user experience. An agent must build interfaces primarily using the core grayscale palette and the single primary accent. The core working set is `{colors.ink}` for text, `{colors.paper}` for elevated surfaces, `{colors.canvas}` for the base background, and `{colors.primary}` for key actions.

- **Primary Action Color:** `{colors.primary}` is reserved for the most important calls-to-action (CTAs) on any given screen. Use it for primary buttons, active navigation states, and input focus rings. A single viewport should contain at most one or two elements using `{colors.primary}` as a solid background fill to preserve its impact. Hover and pressed states should use `{colors.primary-bright}` and `{colors.primary-deep}` respectively.
- **Surface & Backgrounds:** The default page background is always `{colors.canvas}`. For content modules, cards, and modal dialogs that need to appear elevated above the canvas, use `{colors.paper}`. The slightly darker `{colors.cloud}` can be used for large, subtle background fields or to differentiate alternating bands in long data tables, but `{colors.canvas}` and `{colors.paper}` should suffice for 95% of layouts.
- **Text & Ink:** All primary body copy, headings, and labels must use `{colors.ink}` for maximum readability against light backgrounds. For secondary information, such as metadata, placeholder text, or disabled states, use `{colors.ink-soft}`. When designing dark sections using `{colors.accent-deep-ocean}` or `{colors.accent-midnight}`, all text must switch to `{colors.on-ink}` to ensure contrast.
- **Links & Accents:** Standard inline text links should use `{colors.link}` to differentiate them from body text while maintaining a subdued feel. The more vibrant `{colors.primary}` is reserved for their hover state.
- **Dramatic Backgrounds:** The dark blues, `{colors.accent-midnight}` and `{colors.accent-deep-ocean}`, are used for high-impact, full-width "hero" or "feature" sections. They create a cinematic feel and are always paired with `{colors.on-ink}` text.
- **Feedback Colors:** Use `{colors.success}` for success messages and `{colors.error}` for error messages or validation failures. These colors should be used sparingly and only within the context of user feedback.
- **NO NEW COLORS:** This is the most critical rule. Never introduce a color that is not already defined in the token system. The palette is deliberately constrained. If a new color seems necessary, the first step is to re-evaluate the design to see if the existing tokens can solve the problem. Reuse beats invention.

## Typography Hierarchy

The typographic system is built on a strict two-font hierarchy to ensure clarity, elegance, and brand consistency. All large, impactful display headings use **`acumin-pro-wide`**. All other text—including subheadings, body copy, labels, and buttons—must use **`acumin-pro`**. This clear division is fundamental to the brand's visual identity and should never be violated.

The scale is designed to provide clear levels of importance, with generous line height ensuring excellent readability, especially for content-heavy pages.

| Role            | Token                     | Use                                                                                                    |
| --------------- | ------------------------- | ------------------------------------------------------------------------------------------------------ |
| Display XL      | `{typography.display-xl}` | Reserved for the primary brand name or the single most important headline on a page (e.g., "KEYHOLD"). |
| Display LG      | `{typography.display-lg}` | For major section titles and hero headings. Sets a strong, confident tone.                             |
| Body Large      | `{typography.body-lg}`    | For introductory paragraphs or emphasized blocks of text to provide a richer reading experience.       |
| Body Medium     | `{typography.body-md}`    | The default style for all standard paragraph text. Optimized for long-form reading.                    |
| Caption         | `{typography.caption-md}` | For metadata, image captions, legal disclaimers, and other small informational text.                   |
| Navigation Item | `{typography.nav-item}`   | Specifically for items in the main site navigation, ensuring they are clear and legible.               |
| Button          | `{typography.button-md}`  | For all button labels. The heavier weight and specific size ensure it stands out.                      |
| Link            | `{typography.link-md}`    | For standalone or inline text links, with a slightly heavier weight than body text for emphasis.       |

**Typography Principles:**

1.  **Strict Role Adherence:** Only use the designated font for its role. `acumin-pro-wide` is for display only; `acumin-pro` is for everything else. Do not mix them.
2.  **Rhythm and Space:** All text blocks should be given ample space to breathe. Use multiples of the `{spacing.*}` scale for margins. Generous line heights (`1.5` or `1.6`) are standard for body copy.
3.  **Hierarchy is King:** Establish a clear visual hierarchy on every page. A typical page might have one `{typography.display-lg}` headline, followed by `{typography.body-lg}` for an intro, and then `{typography.body-md}` for the main content.
4.  **Contrast Over Color:** Use `fontWeight` and `fontSize` to create emphasis before resorting to color. The difference between `{typography.body-md}` and `{typography.link-md}` (which has a `fontWeight` of 500) is a good example.
5.  **Centered When Appropriate:** For short, impactful headlines and hero text, centered alignment can be used effectively. For longer body copy, always prefer left-alignment for readability.

## Component Patterns

Components are the reusable building blocks of the Keyhold interface. They are composed from the base tokens and should be used consistently to maintain visual and interactive harmony.

**Primary Button**
The primary button is the key call-to-action element. It is composed using a `{colors.primary}` background, `{colors.on-primary}` text, and a `{rounded.pill}` shape. Its typography is `{typography.button-md}`, and it has a distinctive `{shadows.glow-primary}`. Padding is `{spacing.sm}` top/bottom and `{spacing.lg}` left/right. On interaction, it must use `cursor: pointer`. When a user hovers, the button smoothly scales up and its background color shifts to `{colors.primary-bright}` over `{motion.transition-default}`. This button should be used sparingly for the most important actions, like "Contact Agent" or "Schedule a Viewing".

**Card**
Cards are used to group related information, such as property listings or testimonials. They are built with a `{colors.paper}` background set against the `{colors.canvas}` page, with `{rounded.lg}` corners and a subtle `{shadows.card}` to lift them from the page. Cards have generous internal padding of `{spacing.lg}`. On hover, the card should elevate slightly with `transform: translateY(-4px)` and its shadow should deepen to `{shadows.modal}`. This transition must use `{motion.transition-default}`.

**Text Input**
Text inputs are styled to feel modern and approachable. They use a `{rounded.pill}` shape, a `{colors.paper}` background, and a `{colors.hairline}` border. Placeholder text uses `{colors.ink-soft}` while user-entered text uses `{colors.ink}` and `{typography.body-md}`. An input must always have `cursor: text`. The focus state is critical for usability and brand expression: on focus, the border color changes to `{colors.primary}` and it gains the `{shadows.glow-primary}` effect. This state change animates smoothly over `{motion.transition-color}`.

**Navigation Link**
Main navigation links are simple but elegant. They consist of unadorned text using `{typography.nav-item}` in `{colors.ink}`. They must have a `cursor: pointer`. On hover, the text color changes to `{colors.primary}` over `{motion.transition-color}`. An accompanying visual effect, like a subtle underline that animates in from the center, should be used to reinforce the active state. The padding should be at least `{spacing.xs}` and `{spacing.md}` to ensure adequate touch targets.

**Inline Link**
Standard hypertext links within a body of text are styled with `{colors.link}` and a default text-decoration underline, using `{typography.link-md}`. To provide clear feedback, they must use `cursor: pointer`. On hover, the link's color changes to `{colors.primary}` and the underline is removed. This change occurs over `{motion.transition-color}`. This creates a clean, interactive effect that draws attention without being distracting.

## Layout & Spacing

The layout of Keyhold is defined by a commitment to structure, rhythm, and generous negative space. Every dimension, from the smallest padding to the largest section margin, must be derived from the `{spacing.*}` token scale, which is based on a 4px grid. This creates an underlying visual harmony across the entire application.

The primary layout structure is a 12-column flexible grid system. On desktop viewports, content typically resides within a maximum width container of 1280px, centered on the page. Gutters between grid columns should be `{spacing.xl}` (32px) to ensure content blocks are clearly separated.

Vertical rhythm is paramount. The space between major thematic sections on a page must be `{spacing.section}` (80px). This large gap creates clear separation and allows each piece of content to stand on its own. Within components, padding and margins are built from smaller tokens. For example, the internal padding of a `card` is `{spacing.lg}`, while the gap between a heading and the paragraph below it might be `{spacing.md}`.

Hero sections are often full-bleed, extending to the edges of the viewport, and frequently use a dark background like `{colors.accent-deep-ocean}` for dramatic effect. Content within these sections remains within the central grid container to maintain readability.

Image galleries and property listings should be arranged in a clean grid, using `{spacing.lg}` or `{spacing.xl}` as the gap between items. This consistency ensures the layout feels organized and uncluttered, reinforcing the brand's luxurious and orderly aesthetic. The strict adherence to the spacing scale is non-negotiable; never use arbitrary pixel values for layout.

## Do's and Don'ts

**Do's:**

1.  **Do** compose all surfaces from `{colors.canvas}`, `{colors.paper}`, and `{colors.cloud}`. Do not introduce new background hues.
2.  **Do** reserve `{colors.primary}` for primary CTAs and critical interactive states to maximize its impact.
3.  **Do** use `acumin-pro-wide` for `{typography.display-xl}` headings and `acumin-pro` for all body copy, subheadings, and UI labels.
4.  **Do** use only tokens from the `{spacing.*}` scale for all padding, margins, and gaps to maintain a consistent rhythm.
5.  **Do** apply the `{shadows.card}` to interactive panels and cards to provide a subtle, functional lift.
6.  **Do** ensure every single clickable element, including links, buttons, and tabs, explicitly sets `cursor: pointer`.
7.  **Do** apply the `{shadows.glow-primary}` and a `{colors.primary}` border to text inputs on their `:focus` state.
8.  **Do** create dramatic contrast by using full-bleed `{colors.accent-deep-ocean}` sections with `{colors.on-ink}` text.

**Don'ts:**

1.  **Don't** ever introduce a color that is not a pre-defined design token. The palette is intentionally minimal.
2.  **Don't** add a box-shadow unless it maps to a real `{shadows.*}` token. Elevation is used sparingly and with purpose.
3.  **Don't** use `acumin-pro` for a main page title or `acumin-pro-wide` for body copy. Respect the font hierarchy.
4.  **Don't** use arbitrary values like `21px` or `35px` for spacing. If a value doesn't exist on the `{spacing.*}` scale, choose the nearest token.
5.  **Don't** ever leave the browser's default arrow cursor on a clickable element. Every interactive element must use `cursor: pointer`.
6.  **Don't** saturate the UI with `{colors.primary}`. It is an accent, not a base color.
7.  **Don't** forget to implement hover and focus states for all interactive components, using `{motion.*}` tokens for transitions.
8.  **Don't** mix corner radii styles on a single component. A button is either `{rounded.pill}` or `{rounded.lg}`, not both.

## Responsive Behavior

The Keyhold design system is fluid and adaptive, designed to provide an optimal experience across all device sizes. Layouts, typography, and interactive targets must adjust according to the viewport.

| Breakpoint    | Dimensions      | Behavior                                                                                                                                                                     |
| ------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Mobile        | < 480px         | Single-column layout. Navigation collapses into a hamburger menu. Typography scales down. Touch targets are enlarged with extra padding.                                     |
| Mobile-Large  | 480px – 767px   | Primarily single-column, but simple two-column grids may be introduced. Font sizes may increase slightly. Navigation remains collapsed.                                      |
| Tablet        | 768px – 1023px  | Two and three-column grids are common. The main navigation may become partially visible or remain collapsed. Sidebars may be introduced for filtering.                       |
| Desktop       | 1024px – 1279px | Full multi-column layouts are standard. The main navigation is always visible. Content sits within a max-width container.                                                    |
| Desktop-Large | ≥ 1280px        | The layout expands to fill the max-width (1280px). Margins and whitespace may increase to utilize the extra screen real estate, creating a more spacious, gallery-like feel. |

**Touch Targets:** On touch-enabled devices (typically below the Desktop breakpoint), all interactive elements must have a minimum target size of 44x44px to comply with accessibility guidelines. This means components like buttons and links may require increased padding, for example using `{spacing.sm}` vertically on a button instead of `{spacing.xs}`.

**Navigation:** On Mobile and Tablet, the primary navigation menu must collapse into an icon-triggered (hamburger) menu. This menu should slide in as an overlay or from the side, using `{motion.duration-base}` and `{motion.ease-emphasized}`.

**Grids & Content:** Grids should stack vertically on Mobile. A three-column grid of property cards on Desktop becomes a two-column grid on Tablet, and a single-column stack on Mobile. Images should scale to fit their container, never overflowing or becoming distorted.

## Iteration Guide

When building or iterating on a UI for Keyhold, follow these steps to ensure brand consistency and quality.

1.  **Establish the Foundation:** Begin every new layout with a `{colors.canvas}` background. Define your vertical rhythm using `{spacing.section}` to separate the main logical blocks of the page.
2.  **Define Typographic Hierarchy:** Place your main headline using `{typography.display-xl}` or `{typography.display-lg}` with `{colors.ink}`. Populate text content using `{typography.body-md}` or `{typography.body-lg}` for readability. Ensure all typography adheres to the defined hierarchy.
3.  **Place the Primary Action:** Identify the single most important action on the page and implement it using the `button-primary` component. Do not add more than one or two of these per view to maintain its high-impact status.
4.  **Compose with Cards:** For repeating content like property listings, features, or testimonials, use the `card` component. Arrange them in a grid with `{spacing.lg}` or `{spacing.xl}` gaps between them.
5.  **Implement Interactive States:** For every button, link, and input, implement its `:hover` and `:focus` states. Transitions must use the `{motion.*}` tokens, primarily `{motion.transition-default}` for transforms and `{motion.transition-color}` for color changes.
6.  **Add Forms and Inputs:** When creating forms, use the `input-text` component pattern. Ensure the focus state, with its `{colors.primary}` border and `{shadows.glow-primary}` effect, is correctly implemented for a superior user experience.
7.  **Check for Cursors:** Manually verify that every single element that can be clicked or tapped has `cursor: pointer` applied. Text inputs should have `cursor: text`.
8.  **Introduce Dramatic Contrast (If Needed):** To break up long pages and create visual interest, consider adding a full-width section using `{colors.accent-deep-ocean}` as the background and `{colors.on-ink}` for all text and UI elements within it.
9.  **Validate Spacing:** Do a final pass on the entire layout, ensuring all paddings, margins, and gaps strictly adhere to the `{spacing.*}` scale. Remove any "magic numbers".
10. **Review Against Rules:** Before finalizing, read through the "Do's and Don'ts" section and verify that your design complies with all rules, especially those concerning color, typography, and spacing.

## Suggested Packages

Packages that help implement this skill well. Install them with your package manager (examples use pnpm).

- **clsx** — Tiny utility for conditionally joining class names. `pnpm add clsx`
- **tailwind-merge** — Merge Tailwind classes without style conflicts. `pnpm add tailwind-merge`
- **class-variance-authority** — Type-safe component style variants (CVA). `pnpm add class-variance-authority`
- **shadcn** — Accessible, unstyled UI primitives you copy into the project. `pnpm dlx shadcn@latest add`

Also worth considering (verify before installing):

- **react-hook-form** — Handling form state and validation efficiently for input elements.. `pnpm add react-hook-form`
- **lodash** — Utility functions for easier data manipulation and manipulation of values used in styles.. `pnpm add lodash`

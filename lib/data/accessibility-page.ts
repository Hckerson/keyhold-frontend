import { BRAND_NAME } from "@/components/brand/wordmark";
import { SUPPORT_EMAIL } from "@/lib/config/site-contact";
import type { ProsePage } from "@/lib/types";

export const ACCESSIBILITY_PAGE: ProsePage = {
    eyebrow: "Legal",
    title: "Accessibility",
    lede: `What ${BRAND_NAME} does to stay usable without a mouse, without colour, and without sight — and where we know we fall short.`,
    updated: "8 September 2026",
    blocks: [
        {
            id: "target",
            heading: "What we aim for",
            paragraphs: [
                "We build against WCAG 2.1 Level AA. That is a target we work toward continuously rather than a certificate we hold, and this page is written to be honest about the difference.",
            ],
        },
        {
            id: "built",
            heading: "What is in place",
            paragraphs: [
                "Accessibility is treated as part of building a component, not a pass afterwards.",
            ],
            bullets: [
                "Every interactive element is reachable by keyboard and shows a visible focus ring.",
                "Icon-only controls carry accessible names; decorative glyphs are hidden from assistive technology.",
                "Dialogs close on Escape, and drawers trap focus while open.",
                "Colour is never the only carrier of meaning — status is also stated in text.",
                "Tables use real headers and captions; forms label every field and tie errors to the input they describe.",
                "Motion respects the reduced-motion preference at the stylesheet level, so it applies everywhere at once.",
                "Automated accessibility checks run against components as part of the test suite.",
            ],
        },
        {
            id: "gaps",
            heading: "Where we fall short",
            paragraphs: [
                "The pipeline board supports dragging a deal between stages. Dragging is not keyboard-operable, so the same accept and decline actions are available from the deal's detail dialog — the board is fully usable without a pointer, but the drag itself is not.",
                "Maps are inherently visual. Every map on the site accompanies information that is also available as text, and the map is never the only route to it.",
                "Some third-party surfaces, notably the payment form, are rendered by the provider and we do not control their markup.",
            ],
        },
        {
            id: "feedback",
            heading: "Telling us we got it wrong",
            paragraphs: [
                `If something on this site is difficult or impossible for you to use, write to ${SUPPORT_EMAIL}. Tell us the page and what happened, and include your assistive technology and browser if you can — it makes the fix much faster.`,
                "We treat accessibility reports as defects, not suggestions.",
            ],
        },
    ],
};

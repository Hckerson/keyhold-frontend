import { BRAND_NAME } from "@/components/brand/wordmark";
import { SUPPORT_EMAIL } from "@/lib/config/site-contact";
import type { ProsePage } from "@/lib/types";

export const TERMS_PAGE: ProsePage = {
    eyebrow: "Legal",
    title: "Terms of use",
    lede: `The agreement between you and ${BRAND_NAME} when you use the platform. Creating an account means accepting it.`,
    updated: "8 September 2026",
    blocks: [
        {
            id: "accounts",
            heading: "Accounts",
            paragraphs: [
                "You need an account to save homes, contact an advisor, request a viewing, or make an offer. You are responsible for what happens under your account and for keeping your password to yourself.",
                "Give us accurate details. Agent accounts additionally require licence verification before they can list or transact, and we may suspend an account that fails it.",
            ],
        },
        {
            id: "role",
            heading: "What we are, and are not",
            paragraphs: [
                `${BRAND_NAME} is a marketplace. We connect buyers with the advisors and sellers who list property, hold funds in escrow where a sale calls for it, and keep the record of what was agreed.`,
                "We are not a party to the sale, not your agent, and not your lawyer. Listing information comes from the seller or their advisor; we review it before it goes live but we do not independently verify every claim. Valuations, comparables and area statistics are indicative, not advice.",
            ],
        },
        {
            id: "listings",
            heading: "Listings and conduct",
            paragraphs: [
                "If you list a property you must have the right to do so, and the photography and description must represent it honestly.",
                "We review listings before publication and may reject or remove anything misleading, unlawful, or misrepresenting a property. Repeated rejections may suspend an account where the platform's moderation policy is set to do so.",
            ],
            bullets: [
                "Do not misrepresent a property, a price, or your authority to sell it.",
                "Do not use the platform to harass another user or to solicit outside the transaction.",
                "Do not attempt to move an agreed transaction off-platform to avoid escrow.",
            ],
        },
        {
            id: "offers",
            heading: "Offers and transactions",
            paragraphs: [
                "An offer submitted through the platform is an expression of intent on the terms you state. Acceptance, counter and rejection are recorded with their timestamps, and that record is what we will rely on if a question arises later.",
                "Where a sale proceeds to escrow, funds are held and released against the conditions attached to that transaction. Payment processing is handled by Stripe under their terms as well as ours.",
                "Whether an offer becomes a binding contract is a matter for the law where the property sits, and for the professionals advising you. Nothing here overrides that.",
            ],
        },
        {
            id: "liability",
            heading: "Availability and liability",
            paragraphs: [
                "We work to keep the platform available but do not guarantee uninterrupted service, and we may take it down for maintenance.",
                "To the extent the law allows, we are not liable for a decision you make about a property, for the conduct of another user, or for loss that was not a foreseeable consequence of us failing to run the service properly. Nothing here limits liability that cannot lawfully be limited.",
            ],
        },
        {
            id: "changes",
            heading: "Changes and contact",
            paragraphs: [
                "We may update these terms as the platform changes. Material changes will be flagged before they take effect, and the date above always reflects the current version.",
                `Questions go to ${SUPPORT_EMAIL}.`,
            ],
        },
    ],
};

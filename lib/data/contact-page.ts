import { Mail, MessageSquare, Home, type LucideIcon } from "lucide-react";
import { SUPPORT_EMAIL, RESPONSE_WINDOW } from "@/lib/config/site-contact";
import { AUTH_ROUTES } from "@/lib/constants";
import type { ProsePage } from "@/lib/types";

export interface ContactChannel {
    id: string;
    label: string;
    detail: string;
    action: string;
    href: string;
    icon: LucideIcon;
    external?: boolean;
}

export const CONTACT_CHANNELS: readonly ContactChannel[] = [
    {
        id: "support",
        label: "Support",
        detail: `Anything about your account, a listing, or a transaction. A person answers, usually within ${RESPONSE_WINDOW}.`,
        action: SUPPORT_EMAIL,
        href: `mailto:${SUPPORT_EMAIL}`,
        icon: Mail,
        external: true,
    },
    {
        id: "advisor",
        label: "Your advisor",
        detail: "Already enquired about a property? The thread you have with that advisor is the fastest route, and it keeps the record in one place.",
        action: "Open messages",
        href: "/dashboard/messages",
        icon: MessageSquare,
    },
    {
        id: "listing",
        label: "About a specific home",
        detail: "Enquire from the listing itself. It opens a thread with the named advisor behind that property rather than a general queue.",
        action: "Browse listings",
        href: "/search",
        icon: Home,
    },
];

export const CONTACT_PAGE: ProsePage = {
    eyebrow: "Contact",
    title: "Talk to us",
    lede: "Three ways in, depending on what you need. All of them reach a person.",
    blocks: [
        {
            id: "press",
            heading: "Press and partnerships",
            paragraphs: [
                `Use the support address above and mark it for press. We will route it to whoever can actually answer rather than sending you a media pack.`,
            ],
        },
        {
            id: "advisors",
            heading: "Listing with us",
            paragraphs: [
                "Advisors and sellers can create an agent account directly. Licence verification runs before an account can list or transact, so have your credentials to hand.",
            ],
            bullets: [`Create an account at ${AUTH_ROUTES.signup}.`],
        },
        {
            id: "security",
            heading: "Reporting a problem",
            paragraphs: [
                "Security issues, suspected account access, and accessibility barriers all go to the support address and are treated as defects rather than feedback. Tell us what happened and what you expected, and we will come back to you.",
            ],
        },
    ],
};

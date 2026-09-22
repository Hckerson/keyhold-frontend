import {
    CreditCard,
    KeyRound,
    ListChecks,
    Lock,
    PhoneCall,
    ScrollText,
    ShieldCheck,
} from "lucide-react";
import type { PlatformGuarantee, TrustBadge } from "@/lib/types";

export const GUARANTEES_COPY = {
    eyebrow: "What the platform guarantees",
    title: "Built for the decision that matters most",
} as const;

export const PLATFORM_GUARANTEES: PlatformGuarantee[] = [
    {
        id: "escrow",
        icon: ShieldCheck,
        label: "Escrow",
        statement:
            "The seller can't release your funds while your inspection window is open.",
        detail: "held from payment to release",
    },
    {
        id: "contact",
        icon: PhoneCall,
        label: "Private contact",
        statement:
            "Calls run through our number. Neither side ever sees the other's.",
        detail: "bridged, never dialled direct",
    },
    {
        id: "accounts",
        icon: KeyRound,
        label: "Account safety",
        statement:
            "A Google or Facebook sign-in joins your account only when the email is verified on both sides.",
        detail: "no silent merges",
    },
    {
        id: "closing",
        icon: ListChecks,
        label: "Closing checklist",
        statement:
            "Once an offer is accepted, inspection, appraisal, financing and closing each get a date and a place for their documents.",
        detail: "four milestones, one checklist",
    },
];

const SIGN_IN_GUARANTEE_IDS = ["escrow", "contact", "accounts"];

export const SIGN_IN_GUARANTEES = PLATFORM_GUARANTEES.filter((guarantee) =>
    SIGN_IN_GUARANTEE_IDS.includes(guarantee.id),
);

export const PLATFORM_SAFEGUARDS: TrustBadge[] = [
    {
        icon: CreditCard,
        label: "Payments by Stripe",
        detail: "Card details go straight to Stripe and never touch our servers",
    },
    {
        icon: Lock,
        label: "Encrypted in transit",
        detail: "Every connection runs over HTTPS, enforced with HSTS",
    },
    {
        icon: ScrollText,
        label: "Audit trail",
        detail: "Listing, offer, dispute, account and settings changes are logged",
    },
];

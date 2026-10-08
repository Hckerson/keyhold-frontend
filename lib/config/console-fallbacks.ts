import { AGENT_CONSOLE_FALLBACKS } from "@/lib/config/console-fallbacks-agent";
import { BUYER_CONSOLE_FALLBACKS } from "@/lib/config/console-fallbacks-buyer";

export interface ConsoleFallback {
    panel: string;
    title: string;
    description: string;
}

export const CONSOLE_FALLBACKS = {
    ...AGENT_CONSOLE_FALLBACKS,
    ...BUYER_CONSOLE_FALLBACKS,
    adminOverview: {
        panel: "Platform Overview",
        title: "We couldn't load platform metrics",
        description:
            "The stats service is unreachable right now. Try again in a moment.",
    },
    adminListings: {
        panel: "Listing Moderation",
        title: "We could not load the moderation queue",
        description:
            "The moderation service is unreachable right now. Try again in a moment.",
    },
    adminFlags: {
        panel: "Reports",
        title: "We could not load the reports queue",
        description:
            "The moderation service is unreachable right now. Try again in a moment.",
    },
    adminDisputes: {
        panel: "Disputes",
        title: "We could not load the dispute queue",
        description:
            "The dispute service is unreachable right now. Try again in a moment.",
    },
    adminVerifications: {
        panel: "Verifications",
        title: "We could not load the verification queue",
        description:
            "The identity service is unreachable right now. Try again in a moment.",
    },
    adminTransactions: {
        panel: "Transactions",
        title: "We could not load the deal ledger",
        description:
            "The transaction service is unreachable right now. Try again in a moment.",
    },
    adminPayments: {
        panel: "Payments",
        title: "We couldn't load escrow holds",
        description:
            "The escrow service is unreachable right now. Try again in a moment.",
    },
    adminAnalytics: {
        panel: "Analytics",
        title: "We couldn't load platform analytics",
        description:
            "The stats service is unreachable right now. Try again in a moment.",
    },
    adminReports: {
        panel: "Reports",
        title: "We couldn't load platform reports",
        description:
            "The reporting service is unreachable right now. Try again in a moment.",
    },
    adminUsers: {
        panel: "User Directory",
        title: "We couldn't load the directory",
        description:
            "The user service is unreachable right now. Try again in a moment.",
    },
    settings: {
        panel: "Account",
        title: "We couldn't load your account",
        description:
            "The account service is unreachable right now. Try again in a moment.",
    },
    adminPortal: {
        panel: "Admin Console",
        title: "This console stopped responding",
        description:
            "Something failed while rendering this page. Nothing was changed — retry, or pick another section from the sidebar.",
    },
} as const satisfies Record<string, ConsoleFallback>;

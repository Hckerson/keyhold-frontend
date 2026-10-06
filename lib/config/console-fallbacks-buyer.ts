import type { ConsoleFallback } from "@/lib/config/console-fallbacks";

export const BUYER_CONSOLE_FALLBACKS = {
    buyerSaved: {
        panel: "Saved Homes",
        title: "We couldn't load your saved homes",
        description:
            "The saved-homes service is unreachable right now. Try again in a moment.",
    },
    buyerInterests: {
        panel: "Introductions",
        title: "We couldn't load your enquiries",
        description:
            "The connection service is unreachable right now. Try again in a moment.",
    },
    buyerAlerts: {
        panel: "Alerts",
        title: "We couldn't load your alerts",
        description:
            "The alert service is unreachable right now. Try again in a moment.",
    },
    buyerOverview: {
        panel: "Your Search",
        title: "We couldn't load your search",
        description:
            "The buyer service is unreachable right now. Try again in a moment.",
    },
    buyerSettings: {
        panel: "Settings",
        title: "We couldn't load your account",
        description:
            "The account service is unreachable right now. Try again in a moment.",
    },
    buyerTransactions: {
        panel: "Transactions",
        title: "We couldn't load your purchases",
        description:
            "The transaction service is unreachable right now. Try again in a moment.",
    },
    buyerMessages: {
        panel: "Messages",
        title: "We couldn't load your conversations",
        description:
            "The messaging service is unreachable right now. Try again in a moment.",
    },
    buyerViewings: {
        panel: "Viewings",
        title: "We couldn't load your viewings",
        description:
            "The viewing service is unreachable right now. Try again in a moment.",
    },
    buyerOffers: {
        panel: "Offer Book",
        title: "We couldn't load your offers",
        description:
            "The offer service is unreachable right now. Try again in a moment.",
    },
    buyerOffer: {
        panel: "Offer",
        title: "We couldn't load this offer",
        description:
            "The offer service is unreachable right now. Try again in a moment.",
    },
    buyerPortal: {
        panel: "Your Dashboard",
        title: "This page stopped responding",
        description:
            "Something failed while rendering this page. Your saved homes and offers are untouched — retry, or pick another section from the sidebar.",
    },
} as const satisfies Record<string, ConsoleFallback>;

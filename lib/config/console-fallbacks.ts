export interface ConsoleFallback {
    panel: string;
    title: string;
    description: string;
}

export const CONSOLE_FALLBACKS = {
    agentListings: {
        panel: "Listing Book",
        title: "We couldn't load your portfolio",
        description:
            "The listing service is unreachable right now. Try again in a moment.",
    },
    agentLeads: {
        panel: "Lead Desk",
        title: "We couldn't load your enquiries",
        description:
            "The enquiry service is unreachable right now. Try again in a moment.",
    },
    agentOverview: {
        panel: "Practice Overview",
        title: "We couldn't load your practice",
        description:
            "The practice service is unreachable right now. Try again in a moment.",
    },
    buyerSaved: {
        panel: "Saved Homes",
        title: "We couldn't load your saved homes",
        description:
            "The saved-homes service is unreachable right now. Try again in a moment.",
    },
    buyerOverview: {
        panel: "Your Search",
        title: "We couldn't load your search",
        description:
            "The buyer service is unreachable right now. Try again in a moment.",
    },
    buyerOffer: {
        panel: "Offer",
        title: "We couldn't load this offer",
        description:
            "The offer service is unreachable right now. Try again in a moment.",
    },
    adminOverview: {
        panel: "Platform Overview",
        title: "We couldn't load platform metrics",
        description:
            "The stats service is unreachable right now. Try again in a moment.",
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
} as const satisfies Record<string, ConsoleFallback>;

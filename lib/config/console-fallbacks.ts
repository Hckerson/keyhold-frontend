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
    agentConcierge: {
        panel: "VIP Concierge",
        title: "We couldn't load your concierge book",
        description:
            "The concierge service is unreachable right now. Try again in a moment.",
    },
    agentPipeline: {
        panel: "Pipeline",
        title: "We couldn't load your pipeline",
        description:
            "The pipeline service is unreachable right now. Try again in a moment.",
    },
    agentCalendar: {
        panel: "Calendar",
        title: "We couldn't load your calendar",
        description:
            "The viewing service is unreachable right now. Try again in a moment.",
    },
    agentAnalytics: {
        panel: "Performance",
        title: "We couldn't load your analytics",
        description:
            "The analytics service is unreachable right now. Try again in a moment.",
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
    adminOverview: {
        panel: "Platform Overview",
        title: "We couldn't load platform metrics",
        description:
            "The stats service is unreachable right now. Try again in a moment.",
    },
    adminPayments: {
        panel: "Payments",
        title: "We couldn't load escrow holds",
        description:
            "The escrow service is unreachable right now. Try again in a moment.",
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
    agentPortal: {
        panel: "Agent Console",
        title: "This console stopped responding",
        description:
            "Something failed while rendering this page. Your listings and enquiries are untouched — retry, or pick another section from the sidebar.",
    },
    buyerPortal: {
        panel: "Your Dashboard",
        title: "This page stopped responding",
        description:
            "Something failed while rendering this page. Your saved homes and offers are untouched — retry, or pick another section from the sidebar.",
    },
} as const satisfies Record<string, ConsoleFallback>;

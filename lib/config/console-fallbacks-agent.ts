import type { ConsoleFallback } from "@/lib/config/console-fallbacks";

export const AGENT_CONSOLE_FALLBACKS = {
    agentListings: {
        panel: "Listing Book",
        title: "We couldn't load your portfolio",
        description:
            "The listing service is unreachable right now. Try again in a moment.",
    },
    agentRequests: {
        panel: "Requests",
        title: "We couldn't load what's waiting on you",
        description:
            "The enquiry service is unreachable right now. Try again in a moment.",
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
    agentPortal: {
        panel: "Agent Console",
        title: "This console stopped responding",
        description:
            "Something failed while rendering this page. Your listings and enquiries are untouched — retry, or pick another section from the sidebar.",
    },
} as const satisfies Record<string, ConsoleFallback>;

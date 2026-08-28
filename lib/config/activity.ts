export interface ActivityCopy {
    title: string;
    emptyTitle: string;
    emptyDescription: string;
}

export const ACTIVITY_COPY = {
    dashboard: {
        title: "Recent Activity",
        emptyTitle: "No activity yet",
        emptyDescription:
            "Viewings, offers and messages appear here as they happen on your account.",
    },
    agent: {
        title: "Recent Activity",
        emptyTitle: "No activity yet",
        emptyDescription:
            "Enquiries, showings and offers on your listings appear here as they happen.",
    },
} satisfies Record<string, ActivityCopy>;

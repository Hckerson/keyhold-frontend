export const PLATFORM_ENDPOINTS = {
    notifications: {
        list: "/notifications",
        unreadCount: "/notifications/unread/count",
        preferences: "/notifications/preferences",
        readAll: "/notifications/read-all",
        read: (id: string) => `/notifications/${id}/read`,
        entry: (id: string) => `/notifications/${id}`,
    },
    calendar: {
        google: "/calendar/google",
        connect: "/calendar/google/connect",
    },
    settings: {
        list: "/settings",
        restoreDefaults: "/settings/restore-defaults",
        purgeVerifications: "/settings/purge-expired-verifications",
    },
    concierge: {
        overview: "/concierge/overview",
        clients: "/concierge/clients",
        client: (id: string) => `/concierge/clients/${id}`,
        services: "/concierge/services",
        practices: "/concierge/practices",
        cover: (practiceId: string, clientId: string) =>
            `/concierge/practices/${practiceId}/clients/${clientId}`,
    },
    savedSearches: {
        list: "/saved-searches",
        detail: (id: string) => `/saved-searches/${id}`,
        matches: (id: string) => `/saved-searches/${id}/matches`,
    },
    serviceHealth: {
        list: "/service-health",
    },
    auditLogs: {
        list: "/audit-logs",
    },
    stats: {
        seller: "/stats/seller",
        platform: "/stats/platform",
        users: "/stats/users",
        dashboard: "/stats/dashboard",
        regions: "/stats/regions",
        trend: "/stats/trend",
        agent: "/stats/agent",
    },
};

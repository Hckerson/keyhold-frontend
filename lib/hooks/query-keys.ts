import { governanceKeys } from "@/lib/hooks/query-keys-governance";
import type { NotificationQuery } from "@/lib/validations/notification";
import type { PropertyQuery } from "@/lib/validations/property";

export const queryKeys = {
    properties: {
        all: ["properties"] as const,
        list: (input: PropertyQuery) => ["properties", "list", input] as const,
        bySeller: (sellerId: string, input: PropertyQuery) =>
            ["properties", "seller", sellerId, input] as const,
        detail: (id: string) => ["properties", "detail", id] as const,
        nearby: (id: string) => ["properties", "nearby", id] as const,
        facets: (input: PropertyQuery) =>
            ["properties", "facets", input] as const,
    },
    savedProperties: {
        all: ["saved-properties"] as const,
        ids: ["saved-properties", "ids"] as const,
        toggle: ["saved-properties", "toggle"] as const,
    },
    connections: {
        all: ["connections"] as const,
        myInterests: ["connections", "my-interests"] as const,
        incoming: ["connections", "incoming"] as const,
        detail: (id: string) => ["connections", "detail", id] as const,
    },
    messages: {
        all: ["messages"] as const,
        byConnection: (connectionId: string) =>
            ["messages", "connection", connectionId] as const,
        unreadCount: ["messages", "unread-count"] as const,
    },
    contact: {
        all: ["contact"] as const,
        byConnection: (connectionId: string) =>
            ["contact", "connection", connectionId] as const,
    },
    viewings: {
        all: ["viewings"] as const,
        byConnection: (connectionId: string) =>
            ["viewings", "connection", connectionId] as const,
        detail: (id: string) => ["viewings", "detail", id] as const,
    },
    offers: {
        all: ["offers"] as const,
        byConnection: (connectionId: string) =>
            ["offers", "connection", connectionId] as const,
        detail: (id: string) => ["offers", "detail", id] as const,
        milestones: (id: string) => ["offers", "milestones", id] as const,
    },
    ...governanceKeys,
    notifications: {
        all: ["notifications"] as const,
        list: (input: NotificationQuery) =>
            ["notifications", "list", input] as const,
        unreadCount: ["notifications", "unread-count"] as const,
        preferences: ["notifications", "preferences"] as const,
    },
    settings: {
        all: ["settings"] as const,
    },
    concierge: {
        all: ["concierge"] as const,
        overview: ["concierge", "overview"] as const,
        clients: ["concierge", "clients"] as const,
        client: (id: string) => ["concierge", "clients", id] as const,
        services: ["concierge", "services"] as const,
        practices: ["concierge", "practices"] as const,
    },
    savedSearches: {
        all: ["saved-searches"] as const,
        detail: (id: string) => ["saved-searches", "detail", id] as const,
        matches: (id: string) => ["saved-searches", "matches", id] as const,
    },
    serviceHealth: {
        all: ["service-health"] as const,
        window: (hours: number) => ["service-health", hours] as const,
    },
    reviews: {
        all: ["reviews"] as const,
        byUser: (userId: string) => ["reviews", "user", userId] as const,
        userRating: (userId: string) =>
            ["reviews", "user", userId, "rating"] as const,
        byTransaction: (transactionId: string) =>
            ["reviews", "transaction", transactionId] as const,
    },
    users: {
        all: ["users"] as const,
        me: ["users", "me"] as const,
        tierDistribution: ["users", "tiers", "distribution"] as const,
        detail: (id: string) => ["users", "detail", id] as const,
    },
    stats: {
        seller: ["stats", "seller"] as const,
        platform: ["stats", "platform"] as const,
        users: ["stats", "users"] as const,
        dashboard: (filter: string) => ["stats", "dashboard", filter] as const,
        regions: ["stats", "regions"] as const,
        trend: (filter: string) => ["stats", "trend", filter] as const,
        agent: ["stats", "agent"] as const,
    },
    calendar: {
        google: ["calendar", "google"] as const,
    },
};

import type { PropertyQuery } from "@/lib/validations/property";

export const queryKeys = {
    properties: {
        all: ["properties"] as const,
        list: (input: PropertyQuery) => ["properties", "list", input] as const,
        bySeller: (sellerId: string, input: PropertyQuery) =>
            ["properties", "seller", sellerId, input] as const,
        detail: (id: string) => ["properties", "detail", id] as const,
        facets: (input: PropertyQuery) =>
            ["properties", "facets", input] as const,
    },
    savedProperties: {
        all: ["saved-properties"] as const,
        ids: ["saved-properties", "ids"] as const,
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
    },
    transactions: {
        all: ["transactions"] as const,
        purchases: ["transactions", "purchases"] as const,
        sales: ["transactions", "sales"] as const,
        detail: (id: string) => ["transactions", "detail", id] as const,
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
        detail: (id: string) => ["users", "detail", id] as const,
    },
    stats: {
        seller: ["stats", "seller"] as const,
        platform: ["stats", "platform"] as const,
        users: ["stats", "users"] as const,
        dashboard: (filter: string) => ["stats", "dashboard", filter] as const,
    },
};

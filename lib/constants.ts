export const config = {
    api: {
        base: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001/api",
    },
    isDev: process.env.NODE_ENV === "development",
};

export const LISTINGS_PER_PAGE = 20;
export const DEBOUNCE_DELAY = 300;
export const PAGINATION_LIMIT = 20;

export const USER_TIERS = {
    STANDARD: "standard",
    PREMIUM: "premium",
    PLATINUM: "platinum",
} as const;

export const VIEWING_TYPES = {
    OPEN: "open",
    APPOINTMENT: "appointment",
    PRIVATE: "private",
} as const;

export const OFFER_STATUS = {
    DRAFT: "draft",
    PENDING: "pending",
    ACCEPTED: "accepted",
    REJECTED: "rejected",
    CLOSED: "closed",
} as const;

export const REQUEST_TIMEOUT = 30000;
export const STALE_TIME = 5 * 60 * 1000;
export const CACHE_TIME = 10 * 60 * 1000;

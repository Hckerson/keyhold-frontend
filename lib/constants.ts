export const config = {
    api: {
        base:
            process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api",
        auth: {
            login: "/auth/login",
            register: "/auth/register",
            forgotPassword: "/auth/forgot-password",
            resetPassword: "/auth/reset-password",
            onboarding: "/auth/onboarding",
        },
        users: {
            list: "/users",
            me: "/users/me",
            detail: (id: string) => `/users/${id}`,
        },
        properties: {
            list: "/properties",
            search: "/properties/search",
            facets: "/properties/facets",
            detail: (id: string) => `/properties/${id}`,
            bySeller: (sellerId: string) => `/properties/seller/${sellerId}`,
            images: (id: string) => `/properties/${id}/images`,
            markSold: (id: string) => `/properties/${id}/mark-sold`,
            view: (id: string) => `/properties/${id}/view`,
        },
        savedProperties: {
            list: "/saved-properties",
            ids: "/saved-properties/ids",
            entry: (propertyId: string) => `/saved-properties/${propertyId}`,
        },
        connections: {
            create: "/connections",
            myInterests: "/connections/my-interests",
            incoming: "/connections/incoming",
            detail: (id: string) => `/connections/${id}`,
            accept: (id: string) => `/connections/${id}/accept`,
            reject: (id: string) => `/connections/${id}/reject`,
        },
        messages: {
            create: "/messages",
            byConnection: (connectionId: string) =>
                `/messages/connection/${connectionId}`,
            unreadCount: "/messages/unread/count",
        },
        viewings: {
            create: "/viewings",
            detail: (id: string) => `/viewings/${id}`,
            byConnection: (connectionId: string) =>
                `/viewings/connection/${connectionId}`,
            confirm: (id: string) => `/viewings/${id}/confirm`,
        },
        offers: {
            create: "/offers",
            detail: (id: string) => `/offers/${id}`,
            byConnection: (connectionId: string) =>
                `/offers/connection/${connectionId}`,
            respond: (id: string) => `/offers/${id}/respond`,
        },
        transactions: {
            create: "/transactions",
            detail: (id: string) => `/transactions/${id}`,
            confirmPayment: (id: string) =>
                `/transactions/${id}/confirm-payment`,
            purchases: "/transactions/my/purchases",
            sales: "/transactions/my/sales",
        },
        reviews: {
            byTransaction: (transactionId: string) =>
                `/reviews/transaction/${transactionId}`,
            byUser: (userId: string) => `/reviews/user/${userId}`,
            userRating: (userId: string) => `/reviews/user/${userId}/rating`,
        },
        stats: {
            seller: "/stats/seller",
            platform: "/stats/platform",
            users: "/stats/users",
            dashboard: "/stats/dashboard",
        },
    },
    isDev: process.env.NODE_ENV === "development",
};

export const ACCESS_TOKEN_COOKIE = "access_token";
export const SESSION_DAYS = 7;

export const AUTH_ROUTES = {
    login: "/login",
    signup: "/signup",
    resetPassword: "/reset-password",
    terms: "/terms",
    privacy: "/privacy",
    home: "/",
} as const;

export const REDIRECT_PARAM = "redirect";

export const PORTAL_BY_ROLE = {
    ADMIN: "/admin",
    BUYER: "/dashboard",
    SELLER: "/agent",
} as const;

export const portalForRole = (role: keyof typeof PORTAL_BY_ROLE) =>
    PORTAL_BY_ROLE[role] ?? AUTH_ROUTES.home;

export const isSafeRedirect = (target: string | undefined): target is string =>
    typeof target === "string" &&
    target.startsWith("/") &&
    !target.startsWith("//");

export const AUTH_PROVIDERS = (
    process.env.NEXT_PUBLIC_AUTH_PROVIDERS ?? "google,apple"
)
    .split(",")
    .map((provider) => provider.trim())
    .filter(Boolean);

export const oauthStartUrl = (provider: string, redirectTo?: string) => {
    const url = `${config.api.base}/auth/${provider}`;
    return isSafeRedirect(redirectTo)
        ? `${url}?${REDIRECT_PARAM}=${encodeURIComponent(redirectTo)}`
        : url;
};

export const NEW_LISTING_DAYS = 7;
export const DEBOUNCE_DELAY = 300;
export const DEFAULT_COMMISSION_RATE = 0.025;
export const PLATFORM_PAYOUT_FEE_RATE = 0.05;
export const TABLE_PAGE_SIZE = 10;

export const USER_TIERS = {
    STANDARD: "standard",
    PREMIUM: "premium",
    PLATINUM: "platinum",
} as const;

export const RAIL_QUERY = "(min-width: 64rem)";

export const STALE_TIME = 5 * 60 * 1000;
export const CACHE_TIME = 10 * 60 * 1000;

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
            export: "/users/me/export",
            eraseMe: "/users/me",
            detail: (id: string) => `/users/${id}`,
            tierDistribution: "/users/tiers/distribution",
            tier: (id: string) => `/users/${id}/tier`,
        },
        properties: {
            list: "/properties",
            search: "/properties/search",
            facets: "/properties/facets",
            detail: (id: string) => `/properties/${id}`,
            bySeller: (sellerId: string) => `/properties/seller/${sellerId}`,
            images: (id: string) => `/properties/${id}/images`,
            markSold: (id: string) => `/properties/${id}/mark-sold`,
            moderate: (id: string) => `/properties/${id}/moderate`,
            view: (id: string) => `/properties/${id}/view`,
            promote: (id: string) => `/properties/${id}/promote`,
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
            leads: "/connections/leads",
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
            reschedule: (id: string) => `/viewings/${id}/reschedule`,
            cancel: (id: string) => `/viewings/${id}/cancel`,
        },
        offers: {
            create: "/offers",
            detail: (id: string) => `/offers/${id}`,
            byConnection: (connectionId: string) =>
                `/offers/connection/${connectionId}`,
            respond: (id: string) => `/offers/${id}/respond`,
            acceptCounter: (id: string) => `/offers/${id}/accept-counter`,
        },
        transactions: {
            list: "/transactions",
            stages: "/transactions/stages",
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
        flags: {
            list: "/flags",
            counts: "/flags/counts",
            detail: (id: string) => `/flags/${id}`,
            resolve: (id: string) => `/flags/${id}/resolve`,
            dismiss: (id: string) => `/flags/${id}/dismiss`,
        },
        kyc: {
            list: "/kyc",
            submit: "/kyc",
            mine: "/kyc/me",
            counts: "/kyc/counts",
            detail: (id: string) => `/kyc/${id}`,
            approve: (id: string) => `/kyc/${id}/approve`,
            reject: (id: string) => `/kyc/${id}/reject`,
        },
        suspensions: {
            list: "/suspensions",
            create: "/suspensions",
            byUser: (userId: string) => `/suspensions/user/${userId}`,
            lift: (id: string) => `/suspensions/${id}/lift`,
        },
        escrow: {
            list: "/escrow",
            stages: "/escrow/stages",
            detail: (id: string) => `/escrow/${id}`,
            release: (id: string) => `/escrow/${id}/release`,
            refund: (id: string) => `/escrow/${id}/refund`,
        },
        disputes: {
            list: "/disputes",
            create: "/disputes",
            mine: "/disputes/mine",
            counts: "/disputes/counts",
            detail: (id: string) => `/disputes/${id}`,
            evidence: (id: string) => `/disputes/${id}/evidence`,
            resolve: (id: string) => `/disputes/${id}/resolve`,
            dismiss: (id: string) => `/disputes/${id}/dismiss`,
        },
        notifications: {
            list: "/notifications",
            unreadCount: "/notifications/unread/count",
            preferences: "/notifications/preferences",
            readAll: "/notifications/read-all",
            read: (id: string) => `/notifications/${id}/read`,
            entry: (id: string) => `/notifications/${id}`,
        },
        settings: {
            list: "/settings",
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
    },
    site: {
        url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
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
export const EXPIRED_PARAM = "expired";

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

export const AUTH_PROVIDERS = (process.env.NEXT_PUBLIC_AUTH_PROVIDERS ?? "")
    .split(",")
    .map((provider) => provider.trim())
    .filter(Boolean);

export const oauthStartUrl = (provider: string, redirectTo?: string) => {
    const url = `${config.api.base}/auth/${provider}`;
    return isSafeRedirect(redirectTo)
        ? `${url}?${REDIRECT_PARAM}=${encodeURIComponent(redirectTo)}`
        : url;
};

export const LOCALE = "en-US";

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

export const TOAST_DURATION = 5 * 1000;
export const TOAST_ERROR_DURATION = 8 * 1000;
export const TOAST_STACK_LIMIT = 3;

export const PUBLIC_ROUTES = {
    listing: (id: string) => `/listing/${id}`,
} as const;

export const BUYER_ROUTES = {
    overview: "/dashboard",
    saved: "/dashboard/saved",
    interests: "/dashboard/interests",
    viewings: "/dashboard/viewings",
    offers: "/dashboard/offers",
    offer: (id: string) => `/dashboard/offers/${id}`,
    transactions: "/dashboard/transactions",
    messages: "/dashboard/messages",
    alerts: "/dashboard/alerts",
    settings: "/dashboard/settings",
} as const;

export const withRedirect = (route: string, target?: string) =>
    isSafeRedirect(target)
        ? `${route}?${REDIRECT_PARAM}=${encodeURIComponent(target)}`
        : route;

export const loginWithRedirect = (target: string) =>
    withRedirect(AUTH_ROUTES.login, target);

export const loginExpired = (target?: string) => {
    const base = withRedirect(AUTH_ROUTES.login, target);
    return `${base}${base.includes("?") ? "&" : "?"}${EXPIRED_PARAM}=1`;
};

export const AGENT_ROUTES = {
    overview: "/agent",
    requests: "/agent/requests",
    listings: "/agent/listings",
    leads: "/agent/leads",
    pipeline: "/agent/pipeline",
    analytics: "/agent/analytics",
    calendar: "/agent/calendar",
    concierge: "/agent/concierge",
    settings: "/agent/settings",
} as const;

export const OFFER_WINDOW_DAYS = 14;
export const VIEWING_SLOT_COUNT = 3;
export const VIEWING_LEAD_DAYS = 2;

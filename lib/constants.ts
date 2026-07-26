export const config = {
    api: {
        base:
            process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api",
    },
    isDev: process.env.NODE_ENV === "development",
};

export const ACCESS_TOKEN_COOKIE = "access_token";
export const SESSION_DAYS = 7;

export const AUTH_ENDPOINTS = {
    login: "/auth/login",
    register: "/auth/register",
    forgotPassword: "/auth/forgot-password",
    resetPassword: "/auth/reset-password",
} as const;

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

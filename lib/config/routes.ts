export const AUTH_ROUTES = {
    login: "/login",
    signup: "/signup",
    resetPassword: "/reset-password",
    verifyEmail: "/verify-email",
    terms: "/terms",
    privacy: "/privacy",
    home: "/",
} as const;

export const REDIRECT_PARAM = "redirect";
export const EXPIRED_PARAM = "expired";
export const ROLE_PARAM = "role";

export const PORTAL_BY_ROLE = {
    ADMIN: "/admin",
    BUYER: "/dashboard",
    SELLER: "/agent",
} as const;

export const portalForRole = (role: keyof typeof PORTAL_BY_ROLE) =>
    PORTAL_BY_ROLE[role] ?? AUTH_ROUTES.home;

export const isPortalPath = (pathname: string) =>
    Object.values(PORTAL_BY_ROLE).some(
        (portal) => pathname === portal || pathname.startsWith(`${portal}/`),
    );

export const isSafeRedirect = (target: string | undefined): target is string =>
    typeof target === "string" &&
    target.startsWith("/") &&
    !target.startsWith("//");

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

export const PUBLIC_ROUTES = {
    search: "/search",
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

export const TRANSACTION_REVIEW_PARAM = "transaction";

export const ADMIN_ROUTES = {
    overview: "/admin",
    listings: "/admin/listings",
    users: "/admin/users",
    user: (id: string) => `/admin/users/${id}`,
    transactions: "/admin/transactions",
    transaction: (id: string) =>
        `/admin/transactions?${TRANSACTION_REVIEW_PARAM}=${id}`,
    payments: "/admin/payments",
    analytics: "/admin/analytics",
    reports: "/admin/reports",
    verifications: "/admin/verifications",
    disputes: "/admin/disputes",
    flags: "/admin/flags",
    settings: "/admin/settings",
} as const;

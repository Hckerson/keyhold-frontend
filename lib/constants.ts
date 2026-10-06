import { API_ENDPOINTS } from "./config/api";
import { isSafeRedirect, REDIRECT_PARAM, ROLE_PARAM } from "./config/routes";

export * from "./config/routes";

export const config = {
    api: API_ENDPOINTS,
    site: {
        url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    },
    isDev: process.env.NODE_ENV === "development",
};

export const BRAND_NAME = "Luxury RE";

export const ACCESS_TOKEN_COOKIE = "access_token";
export const SESSION_DAYS = 7;

export const AUTH_PROVIDERS = (process.env.NEXT_PUBLIC_AUTH_PROVIDERS ?? "")
    .split(",")
    .map((provider) => provider.trim())
    .filter(Boolean);

export const oauthStartUrl = (
    provider: string,
    redirectTo?: string,
    role?: string,
) => {
    const params = new URLSearchParams();
    if (isSafeRedirect(redirectTo)) params.set(REDIRECT_PARAM, redirectTo);
    if (role) params.set(ROLE_PARAM, role);
    const search = params.toString();
    return `${config.api.base}/auth/${provider}${search ? `?${search}` : ""}`;
};

export const calendarConnectUrl = `${config.api.base}${config.api.calendar.connect}`;

export const LOCALE = "en-US";

export const NEW_LISTING_DAYS = 7;
export const STALE_LISTING_DAYS = 45;
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
export const REQUEST_TIMEOUT = 20 * 1000;

export const TOAST_DURATION = 5 * 1000;
export const TOAST_ERROR_DURATION = 8 * 1000;
export const TOAST_STACK_LIMIT = 3;

export const NO_READING = "—";

export const OFFER_WINDOW_DAYS = 14;
export const VIEWING_SLOT_COUNT = 3;
export const VIEWING_LEAD_DAYS = 2;

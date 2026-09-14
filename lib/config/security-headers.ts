import { SENTRY_DSN } from "./sentry";

export const MAP_TILE_ORIGIN = "https://tiles.openfreemap.org";

const IMAGE_HOSTS = [
    "https://res.cloudinary.com",
    "https://images.unsplash.com",
    "https://images.pexels.com",
    "https://cdn.pixabay.com",
    "https://avatars.githubusercontent.com",
    "https://cdn.jsdelivr.net",
    "https://loremflickr.com",
    MAP_TILE_ORIGIN,
];

const IS_PRODUCTION = process.env.NODE_ENV === "production";

const originOf = (url: string) => {
    try {
        return new URL(url).origin;
    } catch {
        return "";
    }
};

const directivesFor = (apiBase: string): Record<string, string[]> => ({
    "default-src": ["'self'"],
    "script-src": [
        "'self'",
        "'unsafe-inline'",
        ...(IS_PRODUCTION ? [] : ["'unsafe-eval'"]),
        "https://js.stripe.com",
    ],
    "style-src": ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
    "font-src": ["'self'", "https://fonts.gstatic.com", "data:"],
    "img-src": ["'self'", "data:", "blob:", ...IMAGE_HOSTS],
    "connect-src": [
        "'self'",
        originOf(apiBase),
        originOf(SENTRY_DSN),
        "https://api.stripe.com",
        "https://*.stripe.com",
        MAP_TILE_ORIGIN,
    ].filter(Boolean),
    "worker-src": ["'self'", "blob:"],
    "frame-src": ["https://js.stripe.com", "https://hooks.stripe.com"],
    "frame-ancestors": ["'none'"],
    "base-uri": ["'self'"],
    "form-action": ["'self'"],
    "object-src": ["'none'"],
    ...(IS_PRODUCTION ? { "upgrade-insecure-requests": [] } : {}),
});

const contentSecurityPolicy = (apiBase: string) =>
    Object.entries(directivesFor(apiBase))
        .map(([directive, values]) =>
            values.length ? `${directive} ${values.join(" ")}` : directive,
        )
        .join("; ");

export const securityHeaders = (apiBase: string) => [
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "X-Frame-Options", value: "DENY" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=(), payment=(self)",
    },
    {
        key: "Strict-Transport-Security",
        value: "max-age=31536000; includeSubDomains",
    },
    { key: "Content-Security-Policy", value: contentSecurityPolicy(apiBase) },
];

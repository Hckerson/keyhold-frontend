const IMAGE_HOSTS = [
    "https://res.cloudinary.com",
    "https://images.unsplash.com",
    "https://images.pexels.com",
    "https://cdn.pixabay.com",
    "https://avatars.githubusercontent.com",
    "https://cdn.jsdelivr.net",
    "https://loremflickr.com",
];

const API_ORIGIN = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

const IS_PRODUCTION = process.env.NODE_ENV === "production";

const connectHosts = [
    "'self'",
    API_ORIGIN,
    "https://api.stripe.com",
    "https://*.stripe.com",
].filter(Boolean);

const CSP_DIRECTIVES: Record<string, string[]> = {
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
    "connect-src": connectHosts,
    "frame-src": ["https://js.stripe.com", "https://hooks.stripe.com"],
    "frame-ancestors": ["'none'"],
    "base-uri": ["'self'"],
    "form-action": ["'self'"],
    "object-src": ["'none'"],
    ...(IS_PRODUCTION ? { "upgrade-insecure-requests": [] } : {}),
};

const contentSecurityPolicy = Object.entries(CSP_DIRECTIVES)
    .map(([directive, values]) =>
        values.length ? `${directive} ${values.join(" ")}` : directive,
    )
    .join("; ");

export const SECURITY_HEADERS = [
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
    { key: "Content-Security-Policy", value: contentSecurityPolicy },
];

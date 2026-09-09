import type { NextConfig } from "next";
import { config } from "./lib/constants";
import { securityHeaders } from "./lib/config/security-headers";
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig: NextConfig = {
    output: process.env.DOCKER_BUILD ? "standalone" : undefined,
    devIndicators: {
        position: "bottom-right",
    },
    experimental: {
        clientTraceMetadata: ["sentry-trace", "baggage"],
    },
    headers: () =>
        Promise.resolve([
            {
                source: "/:path*",
                headers: securityHeaders(config.api.base),
            },
        ]),
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "images.unsplash.com",
            },
            {
                protocol: "https",
                hostname: "images.pexels.com",
            },
            {
                protocol: "https",
                hostname: "cdn.pixabay.com",
            },
            {
                protocol: "https",
                hostname: "avatars.githubusercontent.com",
            },
            {
                protocol: "https",
                hostname: "cdn.jsdelivr.net",
            },
            {
                protocol: "https",
                hostname: "loremflickr.com",
            },
        ],
    },
};

export default withSentryConfig(nextConfig, {
    org: process.env.SENTRY_ORG,
    project: process.env.SENTRY_PROJECT,
    silent: true,
    widenClientFileUpload: true,
    disableLogger: true,
});

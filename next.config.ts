import type { NextConfig } from "next";
import { SECURITY_HEADERS } from "./lib/config/security-headers";

const nextConfig: NextConfig = {
    output: process.env.DOCKER_BUILD ? "standalone" : undefined,
    devIndicators: {
        position: "bottom-right",
    },
    headers: () =>
        Promise.resolve([{ source: "/:path*", headers: SECURITY_HEADERS }]),
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

export default nextConfig;

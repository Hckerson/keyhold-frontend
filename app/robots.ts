import type { MetadataRoute } from "next";
import { config } from "@/lib/constants";

const PRIVATE_PATHS = [
    "/admin/",
    "/agent/",
    "/dashboard/",
    "/login",
    "/signup",
    "/reset-password",
];

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: PRIVATE_PATHS,
        },
        sitemap: `${config.site.url}/sitemap.xml`,
        host: config.site.url,
    };
}

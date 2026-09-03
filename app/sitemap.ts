import type { MetadataRoute } from "next";
import { propertiesServerAPI } from "@/lib/api/server";
import { config } from "@/lib/constants";
import type { Property } from "@/lib/validations/property";

const PAGE_SIZE = 100;
const MAX_PAGES = 20;

const STATIC_ROUTES: {
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
}[] = [
    { path: "/", changeFrequency: "daily", priority: 1 },
    { path: "/search", changeFrequency: "hourly", priority: 0.8 },
];

const publishedListings = async (): Promise<Property[]> => {
    const listings: Property[] = [];

    for (let page = 1; page <= MAX_PAGES; page += 1) {
        const result = await propertiesServerAPI.list({
            status: "AVAILABLE",
            page,
            limit: PAGE_SIZE,
        });

        if (!result) break;

        listings.push(...result.items);
        if (page >= result.pageCount) break;
    }

    return listings;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const routes: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
        url: `${config.site.url}${route.path}`,
        lastModified: new Date(),
        changeFrequency: route.changeFrequency,
        priority: route.priority,
    }));

    const listings = await publishedListings();

    return [
        ...routes,
        ...listings.map((property) => ({
            url: `${config.site.url}/listing/${property.id}`,
            lastModified: new Date(property.updatedAt),
            changeFrequency: "weekly" as const,
            priority: 0.6,
        })),
    ];
}

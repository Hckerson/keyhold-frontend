import { AVAILABLE_LISTINGS } from "@/lib/data/listings";

export interface LocalityEntry {
    name: string;
    region: string;
    count: number;
}

const countByLocality = AVAILABLE_LISTINGS.reduce<Record<string, number>>(
    (counts, listing) => {
        counts[listing.locality] = (counts[listing.locality] ?? 0) + 1;
        return counts;
    },
    {},
);

export const LOCALITY_INDEX: LocalityEntry[] = Object.entries(countByLocality)
    .map(([locality, count]) => {
        const [name = locality, region = ""] = locality.split(", ");
        return { name, region, count };
    })
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));

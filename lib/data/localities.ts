import type { Property } from "@/lib/validations/property";

export interface LocalityEntry {
    name: string;
    region: string;
    count: number;
}

export const toLocalityIndex = (properties: Property[]): LocalityEntry[] => {
    const counts = properties.reduce<Record<string, LocalityEntry>>(
        (index, property) => {
            const key = `${property.locality}|${property.region}`;
            const entry = index[key] ?? {
                name: property.locality,
                region: property.region,
                count: 0,
            };
            return { ...index, [key]: { ...entry, count: entry.count + 1 } };
        },
        {},
    );

    return Object.values(counts).sort(
        (a, b) => b.count - a.count || a.name.localeCompare(b.name),
    );
};

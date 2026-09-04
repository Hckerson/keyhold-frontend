import { PROPERTY_TYPES, PROPERTY_TYPE_LABELS } from "@/lib/enums/enums";
import type { PropertyType } from "@/lib/enums/enums";

export interface SearchFilters {
    location: string;
    price: string[];
    beds: string[];
    baths: string[];
    type: string[];
}

export type FilterGroupKey = "price" | "beds" | "baths" | "type";

export interface FilterOption {
    id: string;
    label: string;
}

export interface FilterGroup {
    key: FilterGroupKey;
    label: string;
    options: FilterOption[];
}

export const EMPTY_FILTERS: SearchFilters = {
    location: "",
    price: [],
    beds: [],
    baths: [],
    type: [],
};

const LISTABLE_TYPES: PropertyType[] = PROPERTY_TYPES.filter(
    (type) => type !== "LAND" && type !== "OTHER",
);

export const LISTABLE_TYPE_OPTIONS: FilterOption[] = LISTABLE_TYPES.map(
    (type) => ({ id: type, label: PROPERTY_TYPE_LABELS[type] }),
);

export const PRICE_BANDS: FilterOption[] = [
    { id: "0-1000000", label: "Under $1M" },
    { id: "1000000-2000000", label: "$1M – $2M" },
    { id: "2000000-5000000", label: "$2M – $5M" },
    { id: "5000000-", label: "$5M and above" },
];

const countOptions = (tokens: string[], noun: string): FilterOption[] =>
    tokens.map((id) => ({
        id,
        label: id.endsWith("plus")
            ? `${id.replace("plus", "")}+ ${noun}s`
            : `${id} ${noun}${id === "1" ? "" : "s"}`,
    }));

export const FILTER_GROUPS: FilterGroup[] = [
    { key: "price", label: "Price range", options: PRICE_BANDS },
    {
        key: "beds",
        label: "Bedrooms",
        options: countOptions(["1", "2", "3", "4", "5plus"], "bedroom"),
    },
    {
        key: "baths",
        label: "Bathrooms",
        options: countOptions(["1", "2", "3", "4plus"], "bathroom"),
    },
    { key: "type", label: "Property type", options: LISTABLE_TYPE_OPTIONS },
];

export const FILTER_OPTION_LABELS: Record<string, string> = Object.fromEntries(
    FILTER_GROUPS.flatMap((group) =>
        group.options.map((option) => [option.id, option.label]),
    ),
);

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

export const FILTER_GROUPS: FilterGroup[] = [
    {
        key: "price",
        label: "Price range",
        options: [
            { id: "under-1m", label: "Under $1M" },
            { id: "1m-2m", label: "$1M – $2M" },
            { id: "2m-5m", label: "$2M – $5M" },
            { id: "5m-plus", label: "$5M and above" },
        ],
    },
    {
        key: "beds",
        label: "Bedrooms",
        options: [
            { id: "1", label: "1 bedroom" },
            { id: "2", label: "2 bedrooms" },
            { id: "3", label: "3 bedrooms" },
            { id: "4", label: "4 bedrooms" },
            { id: "5plus", label: "5+ bedrooms" },
        ],
    },
    {
        key: "baths",
        label: "Bathrooms",
        options: [
            { id: "1", label: "1 bathroom" },
            { id: "2", label: "2 bathrooms" },
            { id: "3", label: "3 bathrooms" },
            { id: "4plus", label: "4+ bathrooms" },
        ],
    },
    {
        key: "type",
        label: "Property type",
        options: [
            { id: "estate", label: "Estate" },
            { id: "villa", label: "Villa" },
            { id: "penthouse", label: "Penthouse" },
            { id: "townhouse", label: "Townhouse" },
            { id: "condo", label: "Condominium" },
        ],
    },
];

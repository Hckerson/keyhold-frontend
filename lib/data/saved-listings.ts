import { LayoutGrid, Rows3, type LucideIcon } from "lucide-react";
import { propertyImages } from "@/lib/data/sample-images";

export type SortKey = "newest" | "price-asc" | "recently-viewed";
export type SavedViewMode = "grid" | "list";

export interface SavedListing {
    id: string;
    image: string;
    address: string;
    locality: string;
    price: number;
    beds: number;
    baths: number;
    sqft: number;
    savedDaysAgo: number;
    viewedDaysAgo: number;
    offerId?: string;
}

export const sortOptions: { value: SortKey; label: string }[] = [
    { value: "newest", label: "Newest" },
    { value: "price-asc", label: "Price Low-High" },
    { value: "recently-viewed", label: "Recently Viewed" },
];

export const viewOptions: {
    value: SavedViewMode;
    label: string;
    icon: LucideIcon;
}[] = [
    { value: "grid", label: "Grid", icon: LayoutGrid },
    { value: "list", label: "List", icon: Rows3 },
];

export const initialListings: SavedListing[] = [
    {
        id: "1",
        image: propertyImages[0],
        address: "456 Oak Avenue",
        locality: "Beverly Hills, CA",
        price: 3200000,
        beds: 4,
        baths: 3,
        sqft: 5200,
        savedDaysAgo: 2,
        viewedDaysAgo: 1,
        offerId: "1",
    },
    {
        id: "2",
        image: propertyImages[1],
        address: "789 Sunset Blvd",
        locality: "West Hollywood, CA",
        price: 2950000,
        beds: 3,
        baths: 2.5,
        sqft: 4800,
        savedDaysAgo: 5,
        viewedDaysAgo: 4,
        offerId: "2",
    },
    {
        id: "3",
        image: propertyImages[2],
        address: "234 Oak Street",
        locality: "Bel Air, CA",
        price: 4500000,
        beds: 5,
        baths: 4,
        sqft: 6500,
        savedDaysAgo: 7,
        viewedDaysAgo: 0,
        offerId: "3",
    },
    {
        id: "4",
        image: propertyImages[3],
        address: "567 Palm Drive",
        locality: "Malibu, CA",
        price: 2750000,
        beds: 3,
        baths: 3,
        sqft: 3900,
        savedDaysAgo: 12,
        viewedDaysAgo: 6,
    },
];

export const relativeDays = (days: number) => {
    if (days === 0) return "today";
    if (days === 1) return "yesterday";
    if (days < 7) return `${days} days ago`;
    const weeks = Math.floor(days / 7);
    return weeks === 1 ? "1 week ago" : `${weeks} weeks ago`;
};

import { Suspense } from "react";
import { Container } from "@/components/ui/container";
import { SearchExperience } from "@/components/sections/search/search-experience";
import { SearchResultsSkeleton } from "@/components/sections/search/search-skeleton";
import { EMPTY_FILTERS, type SearchFilters } from "@/lib/config/search-filters";

export const metadata = {
    title: "Search Properties | Luxury Real Estate",
    description: "Filter, sort and browse the full collection of residences.",
};

interface SearchPageProps {
    searchParams: Promise<{ q?: string; type?: string; min?: string }>;
}

const PRICE_BAND_BY_MINIMUM: Record<string, string> = {
    "1000000": "1m-2m",
    "5000000": "5m-plus",
    "10000000": "5m-plus",
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const { q = "", type = "", min = "" } = await searchParams;
    const band = PRICE_BAND_BY_MINIMUM[min];

    const initialFilters: SearchFilters = {
        ...EMPTY_FILTERS,
        location: q,
        type: type ? [type] : [],
        price: band ? [band] : [],
    };

    return (
        <Container className="py-10">
            <Suspense fallback={<SearchResultsSkeleton />}>
                <SearchExperience
                    key={`${q}|${type}|${min}`}
                    initialFilters={initialFilters}
                />
            </Suspense>
        </Container>
    );
}

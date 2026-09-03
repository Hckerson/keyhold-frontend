import { Suspense } from "react";
import { Container } from "@/components/ui/container";
import { SearchExperience } from "@/components/sections/search/search-experience";
import { SearchResultsSkeleton } from "@/components/sections/search/search-skeleton";

export const metadata = {
    title: "Search Properties | Luxury Real Estate",
    description: "Filter, sort and browse the full collection of residences.",
};

export default function SearchPage() {
    return (
        <Container className="py-8">
            <Suspense fallback={<SearchResultsSkeleton />}>
                <SearchExperience />
            </Suspense>
        </Container>
    );
}

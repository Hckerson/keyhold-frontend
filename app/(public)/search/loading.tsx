import { Container } from "@/components/ui/container";
import { SearchResultsSkeleton } from "@/components/sections/search/search-results-skeleton";

export default function SearchLoading() {
    return (
        <Container className="py-8">
            <SearchResultsSkeleton />
        </Container>
    );
}

import { Container } from "@/components/ui/container";
import { Select } from "@/components/ui/select";
import { PageHeader } from "@/components/ui/page-header";
import { PropertyCard, type Property } from "@/components/ui/property-card";
import { FilterPanel } from "@/components/patterns/filter-panel";
import {
    Pagination,
    PaginationList,
    PaginationItem,
    PaginationLink,
} from "@/components/ui/pagination";

export const metadata = {
    title: "Search Properties | Luxury Real Estate",
    description: "Find your perfect luxury property.",
};

const FILTER_GROUPS = [
    {
        id: "price",
        label: "Price Range",
        options: [
            { id: "under-1m", label: "Under $1M", count: 45 },
            { id: "1m-2m", label: "$1M - $2M", count: 78 },
            { id: "2m-5m", label: "$2M - $5M", count: 156 },
            { id: "5m-plus", label: "$5M+", count: 89 },
        ],
    },
    {
        id: "bedrooms",
        label: "Bedrooms",
        options: [
            { id: "1bed", label: "1 Bedroom", count: 23 },
            { id: "2bed", label: "2 Bedrooms", count: 67 },
            { id: "3bed", label: "3 Bedrooms", count: 145 },
            { id: "4plus", label: "4+ Bedrooms", count: 133 },
        ],
    },
    {
        id: "type",
        label: "Property Type",
        options: [
            { id: "house", label: "House", count: 234 },
            { id: "condo", label: "Condo", count: 89 },
            { id: "townhouse", label: "Townhouse", count: 45 },
            { id: "villa", label: "Villa", count: 78 },
        ],
    },
];

const SORT_OPTIONS = [
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "newest", label: "Newest First" },
    { value: "popular", label: "Most Popular" },
];

const LISTINGS: Property[] = [
    {
        id: "1",
        imageUrl:
            "https://images.unsplash.com/photo-1494976866556-6812c9d1c72e?w=400&h=300&fit=crop",
        price: 2500000,
        beds: 4,
        baths: 3,
        sqft: 5200,
        address: "123 Beverly Hills Drive",
        locality: "Los Angeles, CA",
        status: "new",
    },
    {
        id: "2",
        imageUrl:
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop",
        price: 1850000,
        beds: 3,
        baths: 2,
        sqft: 4100,
        address: "456 Pacific Heights",
        locality: "San Francisco, CA",
    },
    {
        id: "3",
        imageUrl:
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
        price: 3200000,
        beds: 5,
        baths: 4,
        sqft: 6800,
        address: "789 Malibu Crest",
        locality: "Malibu, CA",
        status: "new",
    },
];

export default function SearchPage() {
    return (
        <Container className="py-12">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                <aside className="lg:col-span-1">
                    <FilterPanel groups={FILTER_GROUPS} title="Refine Search" />
                </aside>

                <div className="space-y-6 lg:col-span-3">
                    <PageHeader
                        title="Properties Found"
                        description={`${LISTINGS.length} homes matching your search`}
                        action={
                            <Select
                                options={SORT_OPTIONS}
                                defaultValue="price-asc"
                                aria-label="Sort properties"
                            />
                        }
                    />

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {LISTINGS.map((listing) => (
                            <PropertyCard
                                key={listing.id}
                                property={listing}
                                href={`/listing/${listing.id}`}
                            />
                        ))}
                    </div>

                    <div className="flex justify-center py-4">
                        <Pagination>
                            <PaginationList>
                                <PaginationItem>
                                    <PaginationLink href="/search?page=1">
                                        ← Previous
                                    </PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink
                                        href="/search?page=1"
                                        isActive
                                    >
                                        1
                                    </PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink href="/search?page=2">
                                        2
                                    </PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink href="/search?page=3">
                                        3
                                    </PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink href="/search?page=2">
                                        Next →
                                    </PaginationLink>
                                </PaginationItem>
                            </PaginationList>
                        </Pagination>
                    </div>
                </div>
            </div>
        </Container>
    );
}

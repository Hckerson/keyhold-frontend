"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
    LayoutGrid,
    List,
    SearchX,
    SlidersHorizontal,
    type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { ListingRow } from "@/components/ui/listing-row";
import { PropertyCard, type Property } from "@/components/ui/property-card";
import { Select } from "@/components/ui/select";
import {
    Pagination,
    PaginationList,
    PaginationItem,
    PaginationLink,
} from "@/components/ui/pagination";
import { SearchFiltersPanel } from "@/components/sections/search/search-filters";
import {
    EMPTY_FILTERS,
    FILTER_GROUPS,
    type FilterGroupKey,
    type SearchFilters,
} from "@/lib/config/search-filters";
import {
    AVAILABLE_LISTINGS,
    type Listing,
} from "@/app/(public)/_data/listings";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 20;

const SORT_OPTIONS = [
    { value: "newest", label: "Newest first" },
    { value: "price-asc", label: "Price: low to high" },
    { value: "price-desc", label: "Price: high to low" },
    { value: "popular", label: "Most saved" },
];

type SortValue = (typeof SORT_OPTIONS)[number]["value"];

type ViewMode = "grid" | "list";

function isSortValue(value: string): value is SortValue {
    return SORT_OPTIONS.some((option) => option.value === value);
}

function matchesPrice(listing: Listing, selected: string[]): boolean {
    if (selected.length === 0) return true;
    return selected.some((band) => {
        if (band === "under-1m") return listing.price < 1_000_000;
        if (band === "1m-2m")
            return listing.price >= 1_000_000 && listing.price < 2_000_000;
        if (band === "2m-5m")
            return listing.price >= 2_000_000 && listing.price < 5_000_000;
        return listing.price >= 5_000_000;
    });
}

function matchesCount(value: number, selected: string[]): boolean {
    if (selected.length === 0) return true;
    return selected.some((option) => {
        if (option.endsWith("plus")) {
            return value >= Number(option.replace("plus", ""));
        }
        return value === Number(option);
    });
}

function matchesLocation(listing: Listing, query: string): boolean {
    const term = query.trim().toLowerCase();
    if (!term) return true;
    return `${listing.address} ${listing.locality} ${listing.zipcode} ${listing.title}`
        .toLowerCase()
        .includes(term);
}

function matches(listing: Listing, filters: SearchFilters): boolean {
    return (
        matchesLocation(listing, filters.location) &&
        matchesPrice(listing, filters.price) &&
        matchesCount(listing.beds, filters.beds) &&
        matchesCount(listing.baths, filters.baths) &&
        (filters.type.length === 0 || filters.type.includes(listing.type))
    );
}

function sortListings(listings: Listing[], sort: SortValue): Listing[] {
    const sorted = [...listings];
    if (sort === "price-asc") return sorted.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") return sorted.sort((a, b) => b.price - a.price);
    if (sort === "popular") return sorted.sort((a, b) => b.saves - a.saves);
    return sorted.sort((a, b) => a.listedDaysAgo - b.listedDaysAgo);
}

function toProperty(listing: Listing): Property {
    return {
        id: listing.id,
        price: listing.price,
        address: listing.address,
        locality: listing.locality,
        beds: listing.beds,
        baths: listing.baths,
        sqft: listing.sqft,
        imageUrl: listing.images[0],
        status: listing.status,
        agent: {
            name: listing.agent.name,
            avatarUrl: listing.agent.avatarUrl,
        },
    };
}

function buildCounts(): Record<FilterGroupKey, Record<string, number>> {
    const counts = {
        price: {} as Record<string, number>,
        beds: {} as Record<string, number>,
        baths: {} as Record<string, number>,
        type: {} as Record<string, number>,
    };

    for (const group of FILTER_GROUPS) {
        for (const option of group.options) {
            counts[group.key][option.id] = AVAILABLE_LISTINGS.filter(
                (listing) => {
                    if (group.key === "price")
                        return matchesPrice(listing, [option.id]);
                    if (group.key === "beds")
                        return matchesCount(listing.beds, [option.id]);
                    if (group.key === "baths")
                        return matchesCount(listing.baths, [option.id]);
                    return listing.type === option.id;
                },
            ).length;
        }
    }

    return counts;
}

const COUNTS = buildCounts();

const toggleBase =
    "ease-smooth inline-flex items-center gap-1.5 px-3 text-xs font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";

function ViewToggle({
    view,
    onChange,
}: {
    view: ViewMode;
    onChange: (next: ViewMode) => void;
}) {
    const options: { id: ViewMode; label: string; icon: LucideIcon }[] = [
        { id: "grid", label: "Grid", icon: LayoutGrid },
        { id: "list", label: "List", icon: List },
    ];

    return (
        <div
            role="group"
            aria-label="Result layout"
            className="border-border bg-background-muted inline-flex overflow-hidden rounded-lg border"
        >
            {options.map((option) => (
                <button
                    key={option.id}
                    type="button"
                    onClick={() => onChange(option.id)}
                    aria-pressed={view === option.id}
                    className={cn(
                        toggleBase,
                        view === option.id
                            ? "bg-accent text-primary"
                            : "text-text-secondary hover:text-accent",
                    )}
                >
                    <option.icon size={14} strokeWidth={1.5} />
                    {option.label}
                </button>
            ))}
        </div>
    );
}

interface SearchExperienceProps {
    initialFilters: SearchFilters;
}

export function SearchExperience({ initialFilters }: SearchExperienceProps) {
    const [draft, setDraft] = useState<SearchFilters>(initialFilters);
    const [applied, setApplied] = useState<SearchFilters>(initialFilters);
    const [sort, setSort] = useState<SortValue>("newest");
    const [view, setView] = useState<ViewMode>("grid");
    const [page, setPage] = useState(1);
    const [panelOpen, setPanelOpen] = useState(false);

    const results = useMemo(
        () =>
            sortListings(
                AVAILABLE_LISTINGS.filter((listing) =>
                    matches(listing, applied),
                ),
                sort,
            ),
        [applied, sort],
    );

    const pageCount = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
    const currentPage = Math.min(page, pageCount);
    const visible = results.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE,
    );

    const dirty = JSON.stringify(draft) !== JSON.stringify(applied);

    const apply = () => {
        setApplied(draft);
        setPage(1);
        setPanelOpen(false);
    };

    const reset = () => {
        setDraft(EMPTY_FILTERS);
        setApplied(EMPTY_FILTERS);
        setPage(1);
    };

    const goToPage = (next: number) => {
        setPage(Math.min(Math.max(next, 1), pageCount));
    };

    return (
        <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-[260px_1fr]">
            <aside className="lg:col-span-1">
                <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => setPanelOpen((open) => !open)}
                    className="w-full lg:hidden"
                    icon={<SlidersHorizontal size={14} strokeWidth={1.5} />}
                >
                    {panelOpen ? "Hide filters" : "Filters"}
                </Button>

                <div
                    className={cn(
                        "mt-3 lg:sticky lg:top-26 lg:mt-0",
                        panelOpen ? "block" : "hidden lg:block",
                    )}
                >
                    <SearchFiltersPanel
                        draft={draft}
                        counts={COUNTS}
                        dirty={dirty}
                        onChange={setDraft}
                        onApply={apply}
                        onReset={reset}
                    />
                </div>
            </aside>

            <div className="flex min-w-0 flex-col gap-5" id="results">
                <div className="border-border flex flex-wrap items-end justify-between gap-3 border-b pb-4">
                    <div className="flex flex-col gap-1">
                        <p className="text-text-muted font-mono text-[10px] tracking-[0.14em] uppercase">
                            The market
                        </p>
                        <h1 className="text-h5 font-display text-text font-light tracking-tight">
                            Found {results.length} home
                            {results.length === 1 ? "" : "s"}
                        </h1>
                    </div>

                    <div className="flex flex-wrap items-stretch gap-2">
                        <ViewToggle view={view} onChange={setView} />
                        <div className="w-52">
                            <Select
                                options={SORT_OPTIONS}
                                value={sort}
                                onChange={(event) => {
                                    if (isSortValue(event.target.value)) {
                                        setSort(event.target.value);
                                        setPage(1);
                                    }
                                }}
                                aria-label="Sort results"
                            />
                        </div>
                    </div>
                </div>

                {visible.length === 0 ? (
                    <EmptyState
                        icon={SearchX}
                        title="No listings found"
                        description="Nothing matches this combination. Try widening the price band, dropping a bedroom, or clearing the location."
                        action={
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={reset}
                            >
                                Clear all filters
                            </Button>
                        }
                    />
                ) : view === "grid" ? (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                        {visible.map((listing) => (
                            <PropertyCard
                                key={listing.id}
                                property={toProperty(listing)}
                                href={`/listing/${listing.id}`}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col gap-3">
                        {visible.map((listing) => (
                            <ListingRow
                                key={listing.id}
                                listing={{
                                    imageUrl: listing.images[0],
                                    address: `${listing.address}, ${listing.locality}`,
                                    price: listing.price,
                                    beds: listing.beds,
                                    baths: listing.baths,
                                    sqft: listing.sqft,
                                }}
                                href={`/listing/${listing.id}`}
                                meta={`${listing.agent.name} · listed ${listing.listedDaysAgo} days ago`}
                                actions={
                                    <Link href={`/listing/${listing.id}`}>
                                        <Button variant="secondary" size="sm">
                                            View
                                        </Button>
                                    </Link>
                                }
                            />
                        ))}
                    </div>
                )}

                {results.length > 0 && (
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                        <p className="text-text-muted text-xs tabular-nums">
                            Showing {(currentPage - 1) * PAGE_SIZE + 1}–
                            {(currentPage - 1) * PAGE_SIZE + visible.length} of{" "}
                            {results.length}
                        </p>

                        <Pagination>
                            <PaginationList>
                                <PaginationItem>
                                    <PaginationLink
                                        href="#results"
                                        aria-disabled={currentPage === 1}
                                        onClick={(event) => {
                                            event.preventDefault();
                                            goToPage(currentPage - 1);
                                        }}
                                    >
                                        Previous
                                    </PaginationLink>
                                </PaginationItem>
                                {Array.from(
                                    { length: pageCount },
                                    (_, index) => index + 1,
                                ).map((number) => (
                                    <PaginationItem key={number}>
                                        <PaginationLink
                                            href="#results"
                                            isActive={number === currentPage}
                                            onClick={(event) => {
                                                event.preventDefault();
                                                goToPage(number);
                                            }}
                                        >
                                            {number}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}
                                <PaginationItem>
                                    <PaginationLink
                                        href="#results"
                                        aria-disabled={
                                            currentPage === pageCount
                                        }
                                        onClick={(event) => {
                                            event.preventDefault();
                                            goToPage(currentPage + 1);
                                        }}
                                    >
                                        Next
                                    </PaginationLink>
                                </PaginationItem>
                            </PaginationList>
                        </Pagination>
                    </div>
                )}
            </div>
        </div>
    );
}

SearchExperience.displayName = "SearchExperience";

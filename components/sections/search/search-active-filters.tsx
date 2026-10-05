"use client";

import { AnimatePresence, m } from "motion/react";
import { ActiveFilterChip } from "@/components/sections/search/active-filter-chip";
import { SEARCH_FILTER_BAR_MOTION } from "@/lib/config/public-motion";
import type { ActiveFilter } from "@/lib/utils/search";

interface SearchActiveFiltersProps {
    filters: ActiveFilter[];
    onRemove: (filter: ActiveFilter) => void;
    onClear: () => void;
}

export function SearchActiveFilters({
    filters,
    onRemove,
    onClear,
}: SearchActiveFiltersProps) {
    return (
        <AnimatePresence initial={false}>
            {filters.length > 0 && (
                <m.div
                    key="bar"
                    {...SEARCH_FILTER_BAR_MOTION}
                    className="overflow-hidden"
                >
                    <div className="border-border flex flex-wrap items-center gap-1.5 border-b px-3 py-2">
                        <span className="micro-label shrink-0">
                            Filtering by
                        </span>

                        <AnimatePresence initial={false}>
                            {filters.map((filter) => (
                                <ActiveFilterChip
                                    key={`${filter.key}-${filter.id}`}
                                    filter={filter}
                                    onRemove={onRemove}
                                />
                            ))}
                        </AnimatePresence>

                        <button
                            type="button"
                            onClick={onClear}
                            className="text-text-secondary hover:text-accent focus-visible:ring-accent ease-smooth ml-auto shrink-0 rounded-xs text-xs underline underline-offset-4 transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none"
                        >
                            Clear all
                        </button>
                    </div>
                </m.div>
            )}
        </AnimatePresence>
    );
}

SearchActiveFilters.displayName = "SearchActiveFilters";

"use client";

import { X } from "lucide-react";
import type { ActiveFilter } from "@/lib/utils/search";

interface SearchActiveFiltersProps {
    filters: ActiveFilter[];
    onRemove: (filter: ActiveFilter) => void;
    onClear: () => void;
}

function FilterChip({
    filter,
    onRemove,
}: {
    filter: ActiveFilter;
    onRemove: (filter: ActiveFilter) => void;
}) {
    return (
        <button
            type="button"
            onClick={() => onRemove(filter)}
            aria-label={`Remove ${filter.group} filter ${filter.label}`}
            className="group border-border bg-background-muted hover:border-border-dark hover:bg-background-alt focus-visible:ring-accent ease-smooth inline-flex items-center gap-2 rounded-md border py-1 pr-1.5 pl-2 transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none"
        >
            <span className="micro-label">{filter.group}</span>
            <span className="text-text max-w-40 truncate text-xs">
                {filter.label}
            </span>
            <X
                size={12}
                strokeWidth={1.5}
                className="text-text-muted group-hover:text-text ease-smooth shrink-0 transition-colors duration-200"
            />
        </button>
    );
}

export function SearchActiveFilters({
    filters,
    onRemove,
    onClear,
}: SearchActiveFiltersProps) {
    if (filters.length === 0) return null;

    return (
        <div className="flex flex-wrap items-center gap-2">
            <span className="micro-label shrink-0">Filtering by</span>

            {filters.map((filter) => (
                <FilterChip
                    key={`${filter.key}-${filter.id}`}
                    filter={filter}
                    onRemove={onRemove}
                />
            ))}

            <button
                type="button"
                onClick={onClear}
                className="text-text-secondary hover:text-accent focus-visible:ring-accent ease-smooth ml-1 rounded text-xs underline underline-offset-4 transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none"
            >
                Clear all
            </button>
        </div>
    );
}

SearchActiveFilters.displayName = "SearchActiveFilters";

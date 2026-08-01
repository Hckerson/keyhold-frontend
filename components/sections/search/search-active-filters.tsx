"use client";

import { X } from "lucide-react";
import type { ActiveFilter } from "@/lib/utils/search";

const chipBase =
    "group border-border bg-background hover:border-border-dark hover:bg-background-alt focus-visible:ring-accent ease-smooth inline-flex h-6 shrink-0 items-center gap-1.5 rounded-md border py-0 pr-1 pl-2 transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none";

interface ActiveFilterChipProps {
    filter: ActiveFilter;
    onRemove: (filter: ActiveFilter) => void;
}

function ActiveFilterChip({ filter, onRemove }: ActiveFilterChipProps) {
    return (
        <button
            type="button"
            onClick={() => onRemove(filter)}
            aria-label={`Remove ${filter.group} filter ${filter.label}`}
            className={chipBase}
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

ActiveFilterChip.displayName = "ActiveFilterChip";

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
    if (filters.length === 0) return null;

    return (
        <div className="border-border flex flex-wrap items-center gap-1.5 border-b px-3 py-2">
            <span className="micro-label shrink-0">Filtering by</span>

            {filters.map((filter) => (
                <ActiveFilterChip
                    key={`${filter.key}-${filter.id}`}
                    filter={filter}
                    onRemove={onRemove}
                />
            ))}

            <button
                type="button"
                onClick={onClear}
                className="text-text-secondary hover:text-accent focus-visible:ring-accent ease-smooth ml-auto shrink-0 rounded-xs text-xs underline underline-offset-4 transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none"
            >
                Clear all
            </button>
        </div>
    );
}

SearchActiveFilters.displayName = "SearchActiveFilters";

"use client";

import { Button } from "@/components/ui/button";
import type { ActiveFilter } from "@/lib/utils/search";

interface SearchEmptyProps {
    activeFilters: ActiveFilter[];
    onRemove: (filter: ActiveFilter) => void;
    onReset: () => void;
}

export function SearchEmpty({
    activeFilters,
    onRemove,
    onReset,
}: SearchEmptyProps) {
    return (
        <section className="border-border bg-background-muted flex flex-col gap-3 rounded-lg border p-4">
            <div className="flex flex-col gap-1">
                <p className="micro-label">No matches</p>
                <h2 className="text-h6 font-display text-text font-light">
                    Nothing fits this combination
                </h2>
                <p className="text-text-secondary max-w-[54ch] text-xs">
                    Every residence was excluded by at least one active filter.
                    Drop one below to widen the search, or clear them all and
                    start over.
                </p>
            </div>

            {activeFilters.length > 0 && (
                <ul className="border-border divide-border bg-background divide-y rounded-md border">
                    {activeFilters.map((filter) => (
                        <li
                            key={`${filter.key}-${filter.id}`}
                            className="flex items-center justify-between gap-3 px-2.5 py-1.5"
                        >
                            <span className="flex min-w-0 items-baseline gap-2">
                                <span className="micro-label shrink-0">
                                    {filter.group}
                                </span>
                                <span className="text-text truncate text-xs">
                                    {filter.label}
                                </span>
                            </span>
                            <button
                                type="button"
                                onClick={() => onRemove(filter)}
                                aria-label={`Remove ${filter.group} filter ${filter.label}`}
                                className="text-accent hover:text-accent-dark focus-visible:ring-accent ease-smooth shrink-0 rounded-xs text-xs font-medium transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none"
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            <div>
                <Button size="sm" onClick={onReset}>
                    Clear all filters
                </Button>
            </div>
        </section>
    );
}

SearchEmpty.displayName = "SearchEmpty";

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
        <section className="border-border-light bg-background-muted rounded-xl border p-4">
            <p className="micro-label">No matches</p>
            <h2 className="text-h6 font-display text-text mt-1 font-light">
                Nothing fits this combination
            </h2>
            <p className="text-text-secondary mt-1 max-w-[54ch] text-xs">
                Every listing was excluded by at least one active filter. Drop
                one below to widen the search, or clear them all and start over.
            </p>

            {activeFilters.length > 0 && (
                <ul className="border-border-light divide-border-light bg-background mt-3 divide-y rounded-lg border">
                    {activeFilters.map((filter) => (
                        <li
                            key={`${filter.key}-${filter.id}`}
                            className="flex items-center justify-between gap-3 px-3 py-2"
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
                                className="text-accent hover:text-accent-dark focus-visible:ring-accent ease-smooth shrink-0 rounded text-xs font-medium transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none"
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            <div className="mt-3">
                <Button variant="secondary" size="sm" onClick={onReset}>
                    Clear all filters
                </Button>
            </div>
        </section>
    );
}

SearchEmpty.displayName = "SearchEmpty";

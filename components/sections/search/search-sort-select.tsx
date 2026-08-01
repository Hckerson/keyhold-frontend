"use client";

import { ChevronDown } from "lucide-react";
import { SORT_OPTIONS, isSortValue, type SortValue } from "@/lib/utils/search";

export interface SearchSortSelectProps {
    value: SortValue;
    onChange: (next: SortValue) => void;
}

export function SearchSortSelect({ value, onChange }: SearchSortSelectProps) {
    return (
        <div className="relative shrink-0">
            <select
                aria-label="Sort results"
                value={value}
                onChange={(event) => {
                    if (isSortValue(event.target.value)) {
                        onChange(event.target.value);
                    }
                }}
                className="border-border bg-background-alt text-text focus-visible:border-accent focus-visible:ring-accent/40 ease-smooth h-8 w-full appearance-none rounded-lg border py-0 pr-7 pl-2.5 text-sm transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none"
            >
                {SORT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>

            <ChevronDown
                size={12}
                strokeWidth={1.5}
                className="text-text-muted pointer-events-none absolute top-1/2 right-2 -translate-y-1/2"
            />
        </div>
    );
}

SearchSortSelect.displayName = "SearchSortSelect";

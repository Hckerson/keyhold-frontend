"use client";

import { ArrowUpDown } from "lucide-react";
import { FilterPills } from "@/components/patterns/filter-pills";
import { Select } from "@/components/ui/forms/select";
import { SAVED_FILTERS, SAVED_SORTS } from "@/lib/data/saved-listings";
import type { SavedSortKey, SavedStatusFilter } from "@/lib/types";

const SORT_LABEL = "Sort saved properties";

export interface SavedToolbarProps {
    filter: SavedStatusFilter;
    sort: SavedSortKey;
    counts: Record<SavedStatusFilter, number>;
    onFilterChange: (filter: SavedStatusFilter) => void;
    onSortChange: (sort: SavedSortKey) => void;
}

export function SavedToolbar({
    filter,
    sort,
    counts,
    onFilterChange,
    onSortChange,
}: SavedToolbarProps) {
    return (
        <div className="flex min-h-11 flex-wrap items-center justify-between gap-2 py-1.5">
            <FilterPills<SavedStatusFilter>
                filters={SAVED_FILTERS}
                active={filter}
                onChange={onFilterChange}
                counts={counts}
            />
            <Select<SavedSortKey>
                options={SAVED_SORTS}
                value={sort}
                onChange={onSortChange}
                label={SORT_LABEL}
                icon={ArrowUpDown}
                align="end"
                size="sm"
                className="toolbar-field"
            />
        </div>
    );
}

SavedToolbar.displayName = "SavedToolbar";

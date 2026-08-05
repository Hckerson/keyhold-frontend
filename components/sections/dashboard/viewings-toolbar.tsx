"use client";

import { Filter, X } from "lucide-react";
import { FilterPills } from "@/components/patterns/filter-pills";
import { Select } from "@/components/ui/forms/select";
import {
    MODE_OPTIONS,
    VIEWING_FILTERS,
    type ViewingModeFilter,
    type ViewingStatusFilter,
} from "@/lib/data/viewings";

const MODE_LABEL = "Filter by format";
const CLEAR_PREFIX = "Clear";

export interface ViewingsToolbarProps {
    statusFilter: ViewingStatusFilter;
    modeFilter: ViewingModeFilter;
    counts: Record<ViewingStatusFilter, number>;
    dayLabel?: string;
    onStatusFilterChange: (filter: ViewingStatusFilter) => void;
    onModeFilterChange: (filter: ViewingModeFilter) => void;
    onClearDay: () => void;
}

export function ViewingsToolbar({
    statusFilter,
    modeFilter,
    counts,
    dayLabel,
    onStatusFilterChange,
    onModeFilterChange,
    onClearDay,
}: ViewingsToolbarProps) {
    return (
        <div className="flex h-11 items-center justify-between gap-2">
            <div className="flex min-w-0 items-center gap-2">
                <FilterPills<ViewingStatusFilter>
                    filters={VIEWING_FILTERS}
                    active={statusFilter}
                    onChange={onStatusFilterChange}
                    counts={counts}
                />
                {dayLabel && (
                    <button
                        type="button"
                        aria-label={`${CLEAR_PREFIX} ${dayLabel}`}
                        onClick={onClearDay}
                        className="border-accent bg-accent-light text-accent hover:border-accent-dark ease-smooth focus-visible:ring-accent inline-flex shrink-0 items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none"
                    >
                        {dayLabel}
                        <X
                            className="size-3"
                            strokeWidth={1.5}
                            aria-hidden="true"
                        />
                    </button>
                )}
            </div>
            <Select<ViewingModeFilter>
                options={MODE_OPTIONS}
                value={modeFilter}
                onChange={onModeFilterChange}
                label={MODE_LABEL}
                icon={Filter}
                align="end"
                size="sm"
                className="w-40"
            />
        </div>
    );
}

ViewingsToolbar.displayName = "ViewingsToolbar";

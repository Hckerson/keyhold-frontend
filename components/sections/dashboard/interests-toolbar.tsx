"use client";

import { Filter } from "lucide-react";
import { FilterPills } from "@/components/patterns/filter-pills";
import { Select } from "@/components/ui/forms/select";
import {
    STAGE_FILTERS,
    STATUS_OPTIONS,
    type StageFilter,
    type StatusFilter,
} from "@/lib/data/interests";

const STATUS_LABEL = "Filter by status";

export interface InterestsToolbarProps {
    stageFilter: StageFilter;
    statusFilter: StatusFilter;
    counts: Record<StageFilter, number>;
    onStageFilterChange: (filter: StageFilter) => void;
    onStatusFilterChange: (filter: StatusFilter) => void;
}

export function InterestsToolbar({
    stageFilter,
    statusFilter,
    counts,
    onStageFilterChange,
    onStatusFilterChange,
}: InterestsToolbarProps) {
    return (
        <div className="flex min-h-11 flex-wrap items-center justify-between gap-2 py-1.5">
            <FilterPills<StageFilter>
                filters={STAGE_FILTERS}
                active={stageFilter}
                onChange={onStageFilterChange}
                counts={counts}
            />
            <Select<StatusFilter>
                options={STATUS_OPTIONS}
                value={statusFilter}
                onChange={onStatusFilterChange}
                label={STATUS_LABEL}
                icon={Filter}
                align="end"
                size="sm"
                className="w-full sm:w-44"
            />
        </div>
    );
}

InterestsToolbar.displayName = "InterestsToolbar";

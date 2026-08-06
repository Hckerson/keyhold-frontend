"use client";

import { Filter } from "lucide-react";
import { FilterPills } from "@/components/patterns/filter-pills";
import { Select } from "@/components/ui/forms/select";
import {
    CHECK_FILTER_OPTIONS,
    MODERATION_FILTERS,
    type ModerationCheckFilter,
    type ModerationStatusFilter,
} from "@/lib/data/admin-listings";

const CHECK_LABEL = "Filter by open compliance check";

export interface ModerationToolbarProps {
    statusFilter: ModerationStatusFilter;
    checkFilter: ModerationCheckFilter;
    counts: Record<ModerationStatusFilter, number>;
    onStatusFilterChange: (filter: ModerationStatusFilter) => void;
    onCheckFilterChange: (filter: ModerationCheckFilter) => void;
}

export function ModerationToolbar({
    statusFilter,
    checkFilter,
    counts,
    onStatusFilterChange,
    onCheckFilterChange,
}: ModerationToolbarProps) {
    return (
        <div className="flex min-h-11 flex-wrap items-center justify-between gap-2 py-1.5">
            <FilterPills<ModerationStatusFilter>
                filters={MODERATION_FILTERS}
                active={statusFilter}
                onChange={onStatusFilterChange}
                counts={counts}
            />
            <Select<ModerationCheckFilter>
                options={CHECK_FILTER_OPTIONS}
                value={checkFilter}
                onChange={onCheckFilterChange}
                label={CHECK_LABEL}
                icon={Filter}
                align="end"
                size="sm"
                className="w-full sm:w-48"
            />
        </div>
    );
}

ModerationToolbar.displayName = "ModerationToolbar";

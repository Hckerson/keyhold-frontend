"use client";

import { Filter } from "lucide-react";
import { FilterPills } from "@/components/patterns/filter-pills";
import { Select } from "@/components/ui/forms/select";
import { STAGE_FILTERS, STATUS_OPTIONS } from "@/lib/data/offers";
import type { OfferStageFilter, OfferStatusFilter } from "@/lib/types";

const STATUS_LABEL = "Filter by status";

export interface OffersToolbarProps {
    stageFilter: OfferStageFilter;
    statusFilter: OfferStatusFilter;
    counts: Record<OfferStageFilter, number>;
    onStageFilterChange: (filter: OfferStageFilter) => void;
    onStatusFilterChange: (filter: OfferStatusFilter) => void;
}

export function OffersToolbar({
    stageFilter,
    statusFilter,
    counts,
    onStageFilterChange,
    onStatusFilterChange,
}: OffersToolbarProps) {
    return (
        <div className="flex min-h-11 flex-wrap items-center justify-between gap-2 py-1.5">
            <FilterPills<OfferStageFilter>
                filters={STAGE_FILTERS}
                active={stageFilter}
                onChange={onStageFilterChange}
                counts={counts}
            />
            <Select<OfferStatusFilter>
                options={STATUS_OPTIONS}
                value={statusFilter}
                onChange={onStatusFilterChange}
                label={STATUS_LABEL}
                icon={Filter}
                align="end"
                size="sm"
                className="toolbar-field"
            />
        </div>
    );
}

OffersToolbar.displayName = "OffersToolbar";

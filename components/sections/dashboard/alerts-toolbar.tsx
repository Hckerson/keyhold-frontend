"use client";

import { Filter } from "lucide-react";
import { FilterPills } from "@/components/patterns/filter-pills";
import { Select } from "@/components/ui/forms/select";
import { READ_FILTERS, TYPE_OPTIONS } from "@/lib/data/alerts";
import type { AlertReadFilter, AlertTypeFilter } from "@/lib/types";

const TYPE_LABEL = "Filter by signal";

export interface AlertsToolbarProps {
    readFilter: AlertReadFilter;
    typeFilter: AlertTypeFilter;
    counts: Record<AlertReadFilter, number>;
    onReadFilterChange: (filter: AlertReadFilter) => void;
    onTypeFilterChange: (filter: AlertTypeFilter) => void;
}

export function AlertsToolbar({
    readFilter,
    typeFilter,
    counts,
    onReadFilterChange,
    onTypeFilterChange,
}: AlertsToolbarProps) {
    return (
        <div className="flex min-h-11 flex-wrap items-center justify-between gap-2 py-1.5">
            <FilterPills<AlertReadFilter>
                filters={READ_FILTERS}
                active={readFilter}
                onChange={onReadFilterChange}
                counts={counts}
            />
            <Select<AlertTypeFilter>
                options={TYPE_OPTIONS}
                value={typeFilter}
                onChange={onTypeFilterChange}
                label={TYPE_LABEL}
                icon={Filter}
                align="end"
                size="sm"
                className="toolbar-field"
            />
        </div>
    );
}

AlertsToolbar.displayName = "AlertsToolbar";

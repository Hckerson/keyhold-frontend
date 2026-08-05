"use client";

import { Filter } from "lucide-react";
import { FilterPills } from "@/components/patterns/filter-pills";
import { Select } from "@/components/ui/forms/select";
import {
    READ_FILTERS,
    TYPE_OPTIONS,
    type ReadFilter,
    type TypeFilter,
} from "@/lib/data/alerts";

const TYPE_LABEL = "Filter by signal";

export interface AlertsToolbarProps {
    readFilter: ReadFilter;
    typeFilter: TypeFilter;
    counts: Record<ReadFilter, number>;
    onReadFilterChange: (filter: ReadFilter) => void;
    onTypeFilterChange: (filter: TypeFilter) => void;
}

export function AlertsToolbar({
    readFilter,
    typeFilter,
    counts,
    onReadFilterChange,
    onTypeFilterChange,
}: AlertsToolbarProps) {
    return (
        <div className="flex h-11 items-center justify-between gap-2">
            <FilterPills<ReadFilter>
                filters={READ_FILTERS}
                active={readFilter}
                onChange={onReadFilterChange}
                counts={counts}
            />
            <Select<TypeFilter>
                options={TYPE_OPTIONS}
                value={typeFilter}
                onChange={onTypeFilterChange}
                label={TYPE_LABEL}
                icon={Filter}
                align="end"
                size="sm"
                className="w-40"
            />
        </div>
    );
}

AlertsToolbar.displayName = "AlertsToolbar";

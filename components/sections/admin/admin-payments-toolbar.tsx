"use client";

import { Filter } from "lucide-react";
import { FilterPills } from "@/components/patterns/filter-pills";
import { Select } from "@/components/ui/forms/select";
import {
    PAYOUT_COUNTS,
    PAYOUT_FILTERS,
    PAYOUT_METHOD_OPTIONS,
    type PayoutMethodFilter,
    type PayoutStateFilter,
} from "@/lib/data/admin-payments";

const METHOD_LABEL = "Filter by payout rail";

export interface AdminPaymentsToolbarProps {
    stateFilter: PayoutStateFilter;
    methodFilter: PayoutMethodFilter;
    onStateFilterChange: (filter: PayoutStateFilter) => void;
    onMethodFilterChange: (filter: PayoutMethodFilter) => void;
}

export function AdminPaymentsToolbar({
    stateFilter,
    methodFilter,
    onStateFilterChange,
    onMethodFilterChange,
}: AdminPaymentsToolbarProps) {
    return (
        <div className="flex min-h-11 flex-wrap items-center justify-between gap-2 py-1">
            <FilterPills<PayoutStateFilter>
                filters={PAYOUT_FILTERS}
                active={stateFilter}
                onChange={onStateFilterChange}
                counts={PAYOUT_COUNTS}
            />
            <Select<PayoutMethodFilter>
                options={PAYOUT_METHOD_OPTIONS}
                value={methodFilter}
                onChange={onMethodFilterChange}
                label={METHOD_LABEL}
                icon={Filter}
                align="end"
                size="sm"
                className="w-32"
            />
        </div>
    );
}

AdminPaymentsToolbar.displayName = "AdminPaymentsToolbar";

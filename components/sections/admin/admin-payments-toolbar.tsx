"use client";

import { FilterPills } from "@/components/patterns/filter-pills";
import {
    PAYOUT_FILTERS,
    type PayoutStateFilter,
} from "@/lib/data/admin-payments";

export interface AdminPaymentsToolbarProps {
    stateFilter: PayoutStateFilter;
    counts: Record<PayoutStateFilter, number>;
    onStateFilterChange: (filter: PayoutStateFilter) => void;
}

export function AdminPaymentsToolbar({
    stateFilter,
    counts,
    onStateFilterChange,
}: AdminPaymentsToolbarProps) {
    return (
        <div className="flex min-h-11 flex-wrap items-center justify-between gap-2 py-1">
            <FilterPills<PayoutStateFilter>
                filters={PAYOUT_FILTERS}
                active={stateFilter}
                onChange={onStateFilterChange}
                counts={counts}
            />
        </div>
    );
}

AdminPaymentsToolbar.displayName = "AdminPaymentsToolbar";

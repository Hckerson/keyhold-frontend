"use client";

import { FilterPills } from "@/components/patterns/filter-pills";
import {
    TRANSACTION_FILTERS,
    type TransactionStatusFilter,
} from "@/lib/data/admin-transactions";

export interface AdminTransactionsToolbarProps {
    statusFilter: TransactionStatusFilter;
    counts: Record<TransactionStatusFilter, number>;
    onStatusFilterChange: (filter: TransactionStatusFilter) => void;
}

export function AdminTransactionsToolbar({
    statusFilter,
    counts,
    onStatusFilterChange,
}: AdminTransactionsToolbarProps) {
    return (
        <div className="flex min-h-11 flex-wrap items-center justify-between gap-2 py-1">
            <FilterPills<TransactionStatusFilter>
                filters={TRANSACTION_FILTERS}
                active={statusFilter}
                onChange={onStatusFilterChange}
                counts={counts}
            />
        </div>
    );
}

AdminTransactionsToolbar.displayName = "AdminTransactionsToolbar";

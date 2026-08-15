"use client";

import { Filter } from "lucide-react";
import { FilterPills } from "@/components/patterns/filter-pills";
import { Select } from "@/components/ui/forms/select";
import {
    FINANCING_OPTIONS,
    TRANSACTION_COUNTS,
    TRANSACTION_FILTERS,
    type TransactionFinancingFilter,
    type TransactionStatusFilter,
} from "@/lib/data/admin-transactions";

const FINANCING_LABEL = "Filter by financing";

export interface AdminTransactionsToolbarProps {
    statusFilter: TransactionStatusFilter;
    financingFilter: TransactionFinancingFilter;
    onStatusFilterChange: (filter: TransactionStatusFilter) => void;
    onFinancingFilterChange: (filter: TransactionFinancingFilter) => void;
}

export function AdminTransactionsToolbar({
    statusFilter,
    financingFilter,
    onStatusFilterChange,
    onFinancingFilterChange,
}: AdminTransactionsToolbarProps) {
    return (
        <div className="flex min-h-11 flex-wrap items-center justify-between gap-2 py-1">
            <FilterPills<TransactionStatusFilter>
                filters={TRANSACTION_FILTERS}
                active={statusFilter}
                onChange={onStatusFilterChange}
                counts={TRANSACTION_COUNTS}
            />
            <Select<TransactionFinancingFilter>
                options={FINANCING_OPTIONS}
                value={financingFilter}
                onChange={onFinancingFilterChange}
                label={FINANCING_LABEL}
                icon={Filter}
                align="end"
                size="sm"
                className="w-32"
            />
        </div>
    );
}

AdminTransactionsToolbar.displayName = "AdminTransactionsToolbar";

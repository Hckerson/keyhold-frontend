"use client";

import { DataTable } from "@/components/patterns/data-table";
import { buildTransactionColumns } from "@/components/features/admin/transaction-table-columns";
import { transactionStatusMeta } from "@/components/features/admin/transaction-table-cells";
import { DEFAULT_COMMISSION_RATE } from "@/lib/constants";
import type { Transaction } from "@/lib/types";

export interface TransactionTableProps {
    transactions: Transaction[];
    commissionRate?: number;
    pageSize?: number;
    className?: string;
}

const DEFAULT_PAGE_SIZE = 10;

export function TransactionTable({
    transactions,
    commissionRate = DEFAULT_COMMISSION_RATE,
    pageSize = DEFAULT_PAGE_SIZE,
    className,
}: TransactionTableProps) {
    return (
        <DataTable
            columns={buildTransactionColumns(commissionRate)}
            data={transactions}
            rowKey={(row) => row.id}
            rowClassName={(row) => transactionStatusMeta[row.status].rowTone}
            caption="Marketplace transactions with sale price, commission, initiation date and status"
            emptyMessage="No transactions to show"
            defaultSort={{ id: "initiated", direction: "desc" }}
            pageSize={pageSize}
            className={className}
        />
    );
}

TransactionTable.displayName = "TransactionTable";

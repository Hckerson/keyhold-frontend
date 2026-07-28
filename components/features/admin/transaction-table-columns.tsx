"use client";

import { StatusBadge } from "@/components/ui/status-badge";
import type { DataTableColumn } from "@/components/patterns/data-table";
import {
    PropertyCell,
    TransactionRowActions,
    transactionStatusMeta,
} from "@/components/features/admin/transaction-table-cells";
import { cn, formatMillions } from "@/lib/utils";
import type { Transaction } from "@/lib/types";

const toThousands = (value: number) => `$${Math.round(value / 1000)}K`;
const sumPrice = (rows: Transaction[]) =>
    rows.reduce((total, row) => total + row.price, 0);

export function buildTransactionColumns(
    commissionRate: number,
): DataTableColumn<Transaction>[] {
    return [
        {
            id: "property",
            label: "Property",
            sortValue: (row) => row.property,
            render: (row) => <PropertyCell transaction={row} />,
            footer: () => (
                <span className="text-text-muted text-caption font-mono font-medium tracking-wide uppercase">
                    Total
                </span>
            ),
        },
        {
            id: "price",
            label: "Sale Price",
            align: "right",
            sortValue: (row) => row.price,
            render: (row) => (
                <span className="font-display text-text text-lg leading-none font-light tabular-nums">
                    {formatMillions(row.price, 2)}
                </span>
            ),
            footer: (rows) => (
                <span className="text-text text-sm font-medium tabular-nums">
                    {formatMillions(sumPrice(rows), 2)}
                </span>
            ),
        },
        {
            id: "commission",
            label: "Commission",
            align: "right",
            sortValue: (row) => row.price * commissionRate,
            render: (row) => (
                <span className="bg-accent/8 text-accent inline-flex rounded-md px-2 py-0.5 text-xs font-medium tabular-nums">
                    {toThousands(row.price * commissionRate)}
                </span>
            ),
            footer: (rows) => (
                <span className="text-accent text-sm font-medium tabular-nums">
                    {toThousands(sumPrice(rows) * commissionRate)}
                </span>
            ),
        },
        {
            id: "initiated",
            label: "Initiated",
            sortValue: (row) => row.initiatedDate,
            render: (row) => (
                <span
                    className={cn(
                        "text-xs whitespace-nowrap tabular-nums",
                        transactionStatusMeta[row.status].dateTone,
                    )}
                >
                    {row.initiatedDate}
                </span>
            ),
        },
        {
            id: "status",
            label: "Status",
            sortValue: (row) => transactionStatusMeta[row.status].rank,
            render: (row) => (
                <StatusBadge tone={transactionStatusMeta[row.status].tone}>
                    {transactionStatusMeta[row.status].label}
                </StatusBadge>
            ),
        },
        {
            id: "actions",
            label: "Actions",
            align: "right",
            srOnlyLabel: true,
            render: (row) => <TransactionRowActions transaction={row} />,
        },
    ];
}

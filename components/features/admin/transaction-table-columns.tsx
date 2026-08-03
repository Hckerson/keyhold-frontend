"use client";

import { format } from "date-fns";
import { StatusBadge } from "@/components/ui/status-badge";
import type {
    DataTableColumn,
    DataTableConfig,
} from "@/components/patterns/data-table";
import { TransactionDetail } from "@/components/features/admin/transaction-detail";
import {
    PropertyCell,
    transactionStatusMeta,
} from "@/components/features/admin/transaction-table-cells";
import { DEFAULT_COMMISSION_RATE, TABLE_PAGE_SIZE } from "@/lib/constants";
import { formatMillions, formatThousands, parseLocalDate } from "@/lib/utils";
import type { Transaction } from "@/lib/types";

const INITIATED_FORMAT = "MMM d, yyyy";

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
            footer: () => <span className="micro-label">Total</span>,
        },
        {
            id: "price",
            label: "Sale Price",
            align: "right",
            width: "7rem",
            emphasis: "figure",
            sortValue: (row) => row.price,
            render: (row) => formatMillions(row.price, 2),
            footer: (rows) => formatMillions(sumPrice(rows), 2),
        },
        {
            id: "commission",
            label: "Commission",
            align: "right",
            width: "7rem",
            emphasis: "figure",
            sortValue: (row) => row.price * commissionRate,
            render: (row) => (
                <span className="text-text-secondary">
                    {formatThousands(row.price * commissionRate)}
                </span>
            ),
            footer: (rows) => (
                <span className="text-accent">
                    {formatThousands(sumPrice(rows) * commissionRate)}
                </span>
            ),
        },
        {
            id: "initiated",
            label: "Initiated",
            width: "7.5rem",
            emphasis: "meta",
            sortValue: (row) => row.initiatedDate,
            render: (row) => (
                <span className="whitespace-nowrap">
                    {format(
                        parseLocalDate(row.initiatedDate),
                        INITIATED_FORMAT,
                    )}
                </span>
            ),
        },
        {
            id: "status",
            label: "Status",
            width: "7.5rem",
            sortValue: (row) => transactionStatusMeta[row.status].rank,
            render: (row) => (
                <StatusBadge
                    tone={transactionStatusMeta[row.status].tone}
                    icon={transactionStatusMeta[row.status].icon}
                >
                    {transactionStatusMeta[row.status].label}
                </StatusBadge>
            ),
        },
    ];
}

export function buildTransactionTableConfig(
    commissionRate: number = DEFAULT_COMMISSION_RATE,
    pageSize: number = TABLE_PAGE_SIZE,
): DataTableConfig<Transaction> {
    return {
        columns: buildTransactionColumns(commissionRate),
        rowKey: (row) => row.id,
        rowLabel: (row) => row.property,
        rowClassName: (row) => transactionStatusMeta[row.status].rowTone,
        caption:
            "Marketplace transactions with property, buyer and agent, sale price, commission, initiation date and settlement status",
        emptyMessage: "No transactions to show",
        defaultSort: { id: "initiated", direction: "desc" },
        pageSize,
        reveal: "panel",
        panelSize: "md",
        renderDetail: (row) => (
            <TransactionDetail
                transaction={row}
                commissionRate={commissionRate}
            />
        ),
    };
}

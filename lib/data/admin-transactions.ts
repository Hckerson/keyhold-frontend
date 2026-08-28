import { ArrowLeftRight, Clock, Landmark, Percent, Wallet } from "lucide-react";
import type { FilterPill } from "@/components/patterns/filter-pills";
import type { StatDatum } from "@/components/patterns/stat-cell";
import {
    TRANSACTION_PIPELINE_ORDER,
    TRANSACTION_STATUSES,
} from "@/lib/config/transaction-tones";
import { DEFAULT_COMMISSION_RATE } from "@/lib/constants";
import type {
    LedgerStatus,
    LedgerTransaction,
    MetricItem,
    TransactionStage,
} from "@/lib/types";
import type { TransactionStage as ApiTransactionStage } from "@/lib/validations/transaction";
import { formatCompactUsd, formatUsd, sum } from "@/lib/utils";

const FULL_PERCENT = 100;

export type TransactionStatusFilter = "all" | LedgerStatus;

export const COMMISSION_RATE_LABEL = `${DEFAULT_COMMISSION_RATE * FULL_PERCENT}%`;

export const commissionOf = (transaction: LedgerTransaction) =>
    transaction.price * DEFAULT_COMMISSION_RATE;

const volumeOf = (transactions: LedgerTransaction[]) =>
    sum(transactions.map((transaction) => transaction.price));

const byStatus = (transactions: LedgerTransaction[], status: LedgerStatus) =>
    transactions.filter((transaction) => transaction.status === status);

export const openTransactions = (transactions: LedgerTransaction[]) =>
    transactions.filter(
        (transaction) => TRANSACTION_STATUSES[transaction.status].open,
    );

export const rankTransactions = (transactions: LedgerTransaction[]) =>
    [...transactions].sort(
        (a, b) =>
            TRANSACTION_STATUSES[b.status].rank -
                TRANSACTION_STATUSES[a.status].rank ||
            b.ageMinutes - a.ageMinutes,
    );

export const focusTransaction = (transactions: LedgerTransaction[]) =>
    rankTransactions(openTransactions(transactions))[0];

export const toTransactionStages = (
    stages: ApiTransactionStage[],
): TransactionStage[] =>
    TRANSACTION_PIPELINE_ORDER.map((id) => {
        const stage = stages.find((entry) => entry.status === id);
        return {
            id,
            count: stage?.count ?? 0,
            volume: stage?.volume ?? 0,
        };
    });

export const stageShare = (
    stage: TransactionStage,
    stages: TransactionStage[],
) => {
    const total = sum(stages.map((entry) => entry.count));
    return total ? Math.round((stage.count / total) * FULL_PERCENT) : 0;
};

export const TRANSACTION_FILTERS: readonly FilterPill<TransactionStatusFilter>[] =
    [
        { id: "all", label: "All" },
        ...TRANSACTION_PIPELINE_ORDER.map((id) => ({
            id,
            label: TRANSACTION_STATUSES[id].label,
        })),
    ];

export const transactionCounts = (
    transactions: LedgerTransaction[],
): Record<TransactionStatusFilter, number> =>
    TRANSACTION_PIPELINE_ORDER.reduce<Record<TransactionStatusFilter, number>>(
        (counts, id) => ({
            ...counts,
            [id]: byStatus(transactions, id).length,
        }),
        { all: transactions.length } as Record<TransactionStatusFilter, number>,
    );

export const matchesTransactionFilters = (
    transaction: LedgerTransaction,
    status: TransactionStatusFilter,
) => status === "all" || transaction.status === status;

export const transactionStats = (
    transactions: LedgerTransaction[],
): StatDatum[] => [
    {
        id: "open",
        icon: ArrowLeftRight,
        label: "In flight",
        value: `${openTransactions(transactions).length}`,
        tone: "accent",
    },
    {
        id: "open-volume",
        icon: Wallet,
        label: "Open volume",
        value: formatCompactUsd(volumeOf(openTransactions(transactions))),
        tone: "warning",
    },
    {
        id: "escrow",
        icon: Landmark,
        label: "In escrow",
        value: formatCompactUsd(
            volumeOf(byStatus(transactions, "IN_PROGRESS")),
        ),
        tone: "info",
    },
    {
        id: "settled",
        icon: Clock,
        label: "Settled volume",
        value: formatCompactUsd(volumeOf(byStatus(transactions, "COMPLETED"))),
        tone: "success",
    },
    {
        id: "commission",
        icon: Percent,
        label: "Commission",
        value: formatCompactUsd(
            volumeOf(byStatus(transactions, "COMPLETED")) *
                DEFAULT_COMMISSION_RATE,
        ),
        tone: "highlight",
    },
];

export const commissionMetrics = (
    transactions: LedgerTransaction[],
): MetricItem[] => {
    const settled = byStatus(transactions, "COMPLETED");
    const settledVolume = volumeOf(settled);

    return [
        { label: "Take rate", value: COMMISSION_RATE_LABEL },
        {
            label: "Earned on settled",
            value: formatUsd(settledVolume * DEFAULT_COMMISSION_RATE),
        },
        {
            label: "Pending on open",
            value: formatUsd(
                volumeOf(openTransactions(transactions)) *
                    DEFAULT_COMMISSION_RATE,
            ),
        },
        {
            label: "Avg per deal",
            value: settled.length
                ? formatUsd(
                      (settledVolume * DEFAULT_COMMISSION_RATE) /
                          settled.length,
                  )
                : formatUsd(0),
        },
    ];
};

export const transactionsSummary = (transactions: LedgerTransaction[]) =>
    `${byStatus(transactions, "CANCELLED").length} cancelled · ${
        openTransactions(transactions).length
    } in flight · ${formatCompactUsd(
        volumeOf(openTransactions(transactions)),
    )} open volume`;

export const TRANSACTION_EXPORT_FILENAME = "transactions.csv";

export const TRANSACTION_EXPORT_COLUMNS = [
    "Reference",
    "Property",
    "Buyer",
    "Agent",
    "Price",
    "Status",
    "Initiated",
    "Completed",
] as const;

export const toTransactionExportRows = (transactions: LedgerTransaction[]) =>
    transactions.map((transaction) => [
        transaction.reference,
        transaction.property,
        transaction.buyer,
        transaction.agent,
        transaction.price,
        TRANSACTION_STATUSES[transaction.status].label,
        transaction.initiatedDate,
        transaction.completedDate ?? "",
    ]);

import {
    MILESTONE_ORDER,
    TRANSACTION_PIPELINE_ORDER,
    TRANSACTION_STATUSES,
} from "@/lib/config/transaction-tones";
import { DEFAULT_COMMISSION_RATE } from "@/lib/constants";
import type {
    DealFlowStage,
    DealGroup,
    LedgerStatus,
    LedgerTotals,
    LedgerTransaction,
    TransactionStage,
} from "@/lib/types";
import type { TransactionStage as ApiTransactionStage } from "@/lib/validations/transaction";
import { formatCompactUsd, sum } from "@/lib/utils";

const FULL_PERCENT = 100;

export type TransactionStatusFilter = "all" | LedgerStatus;

export const COMMISSION_RATE_LABEL = `${DEFAULT_COMMISSION_RATE * FULL_PERCENT}%`;

export const commissionOf = (transaction: LedgerTransaction) =>
    transaction.price * DEFAULT_COMMISSION_RATE;

const volumeOf = (transactions: LedgerTransaction[]) =>
    sum(transactions.map((transaction) => transaction.price));

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

export const matchesTransactionFilters = (
    transaction: LedgerTransaction,
    status: TransactionStatusFilter,
) => status === "all" || transaction.status === status;

export const dealFlow = (stages: TransactionStage[]): DealFlowStage[] =>
    stages.map((stage) => {
        const meta = TRANSACTION_STATUSES[stage.id];
        return {
            ...stage,
            label: meta.label,
            icon: meta.icon,
            tone: meta.chartTone,
            open: meta.open,
            commission:
                stage.id === "CANCELLED"
                    ? 0
                    : stage.volume * DEFAULT_COMMISSION_RATE,
            note: meta.flowNote,
        };
    });

export const ledgerTotals = (
    transactions: LedgerTransaction[],
): LedgerTotals => ({
    count: transactions.length,
    volume: volumeOf(transactions),
    commission: sum(transactions.map(commissionOf)),
});

export const ledgerReading = (transactions: LedgerTransaction[]) => {
    const open = openTransactions(transactions);

    if (transactions.length === 0) return "No deals on the ledger yet";
    return `${open.length} in flight worth ${formatCompactUsd(volumeOf(open))} · ranked by settlement risk`;
};

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

const DEAL_GROUPS: Pick<DealGroup, "id" | "label">[] = [
    { id: "open", label: "In flight" },
    { id: "closed", label: "Closed" },
];

export const dealGroups = (transactions: LedgerTransaction[]): DealGroup[] =>
    DEAL_GROUPS.map((group) => {
        const rows = transactions.filter(
            (transaction) =>
                TRANSACTION_STATUSES[transaction.status].open ===
                (group.id === "open"),
        );
        return { ...group, transactions: rows, volume: volumeOf(rows) };
    }).filter((group) => group.transactions.length > 0);

export const nextMilestone = (transaction: LedgerTransaction) =>
    MILESTONE_ORDER.find((id) => !transaction.cleared.includes(id));

export const counterpartyOf = (
    transaction: LedgerTransaction,
    subject?: string,
) => {
    if (subject === transaction.agent)
        return { name: transaction.buyer, side: "buyer" };
    if (subject === transaction.buyer)
        return { name: transaction.agent, side: "agent" };
    return null;
};

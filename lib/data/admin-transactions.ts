import {
    AlertTriangle,
    CircleCheck,
    Landmark,
    Percent,
    Wallet,
} from "lucide-react";
import type { FilterPill } from "@/components/patterns/filter-pills";
import type { ShareDatum } from "@/components/patterns/share-row";
import type { StatDatum } from "@/components/patterns/stat-cell";
import type { SelectOption } from "@/components/ui/forms/select";
import {
    FINANCING_ORDER,
    FINANCING_TYPES,
    MILESTONE_ORDER,
    TRANSACTION_PIPELINE_ORDER,
    TRANSACTION_STATUSES,
} from "@/lib/config/transaction-tones";
import { DEFAULT_COMMISSION_RATE } from "@/lib/constants";
import {
    averageOf,
    formatCompactUsd,
    formatCount,
    formatMillions,
    formatThousands,
    percentOf,
    sum,
} from "@/lib/utils";
import type {
    MetricItem,
    Transaction,
    TransactionFinancing,
    TransactionStage,
    TransactionStatus,
} from "@/lib/types";

export type TransactionStatusFilter = "all" | TransactionStatus;
export type TransactionFinancingFilter = "all" | TransactionFinancing;

const ALL_STATUSES_LABEL = "All";
const ALL_FINANCING_LABEL = "All financing";

export const COMMISSION_RATE_LABEL = `${DEFAULT_COMMISSION_RATE * 100}%`;

export const TRANSACTIONS: Transaction[] = [
    {
        id: "tx-4826",
        reference: "TX-4826",
        property: "Ravenswood Estate",
        buyer: "Victor Alvarez",
        agent: "Marcus Webb",
        price: 7_360_000,
        status: "failed",
        financing: "portfolio",
        cleared: ["agreement", "deposit", "inspection"],
        initiatedDate: "2026-05-19",
        closingDate: "2026-07-31",
        ageMinutes: 112_320,
    },
    {
        id: "tx-4821",
        reference: "TX-4821",
        property: "456 Oak Avenue",
        buyer: "John Doe",
        agent: "Sarah Chen",
        price: 3_200_000,
        status: "escrow",
        financing: "mortgage",
        cleared: ["agreement", "deposit"],
        initiatedDate: "2026-06-04",
        closingDate: "2026-08-21",
        ageMinutes: 89_280,
    },
    {
        id: "tx-4822",
        reference: "TX-4822",
        property: "789 Sunset Blvd",
        buyer: "Sarah Johnson",
        agent: "Michael Rodriguez",
        price: 2_950_000,
        status: "escrow",
        financing: "mortgage",
        cleared: ["agreement", "deposit", "inspection"],
        initiatedDate: "2026-06-25",
        closingDate: "2026-08-28",
        ageMinutes: 59_040,
    },
    {
        id: "tx-4823",
        reference: "TX-4823",
        property: "234 Oak Street",
        buyer: "Michael Chen",
        agent: "Jennifer Martinez",
        price: 4_500_000,
        status: "closing",
        financing: "cash",
        cleared: ["agreement", "deposit", "inspection", "financing"],
        initiatedDate: "2026-07-02",
        closingDate: "2026-08-12",
        ageMinutes: 48_960,
    },
    {
        id: "tx-4824",
        reference: "TX-4824",
        property: "567 Palm Drive",
        buyer: "Elizabeth Brown",
        agent: "David Williams",
        price: 3_800_000,
        status: "closing",
        financing: "mortgage",
        cleared: ["agreement", "deposit", "inspection", "financing"],
        initiatedDate: "2026-07-07",
        closingDate: "2026-08-14",
        ageMinutes: 41_760,
    },
    {
        id: "tx-4825",
        reference: "TX-4825",
        property: "88 Harbor Point",
        buyer: "Priya Raman",
        agent: "Elena Vasquez",
        price: 2_560_000,
        status: "pending",
        financing: "mortgage",
        cleared: [],
        initiatedDate: "2026-07-24",
        closingDate: "2026-09-18",
        ageMinutes: 17_280,
    },
    {
        id: "tx-4827",
        reference: "TX-4827",
        property: "12 Vista Ridge",
        buyer: "Hana Sato",
        agent: "Robert Chen",
        price: 1_660_000,
        status: "pending",
        financing: "cash",
        cleared: ["agreement"],
        initiatedDate: "2026-07-30",
        closingDate: "2026-09-25",
        ageMinutes: 8_640,
    },
    {
        id: "tx-4828",
        reference: "TX-4828",
        property: "901 Cliff Road",
        buyer: "Daniel Okonkwo",
        agent: "Amara Osei",
        price: 2_320_000,
        status: "completed",
        financing: "portfolio",
        cleared: [...MILESTONE_ORDER],
        initiatedDate: "2026-05-01",
        closingDate: "2026-06-28",
        ageMinutes: 138_240,
    },
    {
        id: "tx-4829",
        reference: "TX-4829",
        property: "45 Bayfront Way",
        buyer: "Nadia Petrov",
        agent: "Tomas Lind",
        price: 5_120_000,
        status: "completed",
        financing: "cash",
        cleared: [...MILESTONE_ORDER],
        initiatedDate: "2026-05-09",
        closingDate: "2026-07-06",
        ageMinutes: 126_720,
    },
];

export const commissionOf = (transaction: Transaction) =>
    transaction.price * DEFAULT_COMMISSION_RATE;

const isOpen = (transaction: Transaction) =>
    TRANSACTION_STATUSES[transaction.status].open;

const volumeOf = (transactions: Transaction[]) =>
    sum(transactions.map((transaction) => transaction.price));

const byStatus = (status: TransactionStatus) =>
    TRANSACTIONS.filter((transaction) => transaction.status === status);

export const TOTAL_VOLUME = volumeOf(TRANSACTIONS);
export const TOTAL_COMMISSION = TOTAL_VOLUME * DEFAULT_COMMISSION_RATE;

const OPEN_TRANSACTIONS = TRANSACTIONS.filter(isOpen);
const COMPLETED_TRANSACTIONS = byStatus("completed");

export const OPEN_VOLUME = volumeOf(OPEN_TRANSACTIONS);
export const OPEN_COUNT = OPEN_TRANSACTIONS.length;
export const ESCROW_VOLUME = volumeOf(byStatus("escrow"));
export const COMPLETED_VOLUME = volumeOf(COMPLETED_TRANSACTIONS);
export const FAILED_COUNT = byStatus("failed").length;

const RANKED_TRANSACTIONS: Transaction[] = [...TRANSACTIONS].sort(
    (a, b) =>
        TRANSACTION_STATUSES[b.status].rank -
            TRANSACTION_STATUSES[a.status].rank || b.price - a.price,
);

export const FOCUS_TRANSACTION: Transaction = [...OPEN_TRANSACTIONS].sort(
    (a, b) => b.price - a.price,
)[0];

export const LEDGER_TRANSACTIONS = RANKED_TRANSACTIONS.filter(
    (transaction) => transaction.id !== FOCUS_TRANSACTION.id,
);

export const TRANSACTION_STAGES: TransactionStage[] =
    TRANSACTION_PIPELINE_ORDER.map((status) => {
        const rows = byStatus(status);
        return { id: status, count: rows.length, volume: volumeOf(rows) };
    }).filter((stage) => stage.count > 0);

export const stageShare = (stage: TransactionStage) =>
    percentOf(stage.volume, TOTAL_VOLUME);

export const TRANSACTION_STATS: StatDatum[] = [
    {
        id: "volume",
        icon: Wallet,
        label: "Deal volume",
        value: formatMillions(TOTAL_VOLUME, 2),
        tone: "accent",
    },
    {
        id: "commission",
        icon: Percent,
        label: `Commission ${COMMISSION_RATE_LABEL}`,
        value: formatThousands(TOTAL_COMMISSION),
        tone: "info",
        href: "/admin/payments",
    },
    {
        id: "escrow",
        icon: Landmark,
        label: "In escrow",
        value: formatCompactUsd(ESCROW_VOLUME),
        tone: "warning",
    },
    {
        id: "completed",
        icon: CircleCheck,
        label: "Settled",
        value: formatCompactUsd(COMPLETED_VOLUME),
        tone: "success",
    },
    {
        id: "failed",
        icon: AlertTriangle,
        label: "Failed deals",
        value: formatCount(FAILED_COUNT),
        tone: "error",
    },
];

export const COMMISSION_METRICS: MetricItem[] = [
    { label: "Gross volume", value: formatMillions(TOTAL_VOLUME, 2) },
    {
        label: `Commission at ${COMMISSION_RATE_LABEL}`,
        value: formatThousands(TOTAL_COMMISSION),
    },
    {
        label: "Average deal size",
        value: formatMillions(
            averageOf(TRANSACTIONS.map((transaction) => transaction.price)),
            2,
        ),
    },
    {
        label: "Cleared to date",
        value: formatThousands(COMPLETED_VOLUME * DEFAULT_COMMISSION_RATE),
    },
    { label: "Open exposure", value: formatMillions(OPEN_VOLUME, 2) },
];

export const FINANCING_SHARES: ShareDatum[] = FINANCING_ORDER.map(
    (financing) => {
        const volume = volumeOf(
            TRANSACTIONS.filter(
                (transaction) => transaction.financing === financing,
            ),
        );
        return {
            id: financing,
            icon: FINANCING_TYPES[financing].icon,
            label: FINANCING_TYPES[financing].label,
            value: formatCompactUsd(volume),
            percent: percentOf(volume, TOTAL_VOLUME),
            tone: FINANCING_TYPES[financing].tone,
        };
    },
);

export const TRANSACTION_FILTERS: readonly FilterPill<TransactionStatusFilter>[] =
    [
        { id: "all", label: ALL_STATUSES_LABEL },
        ...TRANSACTION_PIPELINE_ORDER.map((status) => ({
            id: status,
            label: TRANSACTION_STATUSES[status].label,
        })),
    ];

export const FINANCING_OPTIONS: readonly SelectOption<TransactionFinancingFilter>[] =
    [
        { value: "all", label: ALL_FINANCING_LABEL },
        ...FINANCING_ORDER.map((financing) => ({
            value: financing,
            label: FINANCING_TYPES[financing].label,
        })),
    ];

export const TRANSACTION_COUNTS = TRANSACTION_PIPELINE_ORDER.reduce<
    Partial<Record<TransactionStatusFilter, number>>
>(
    (counts, status) => ({
        ...counts,
        [status]: LEDGER_TRANSACTIONS.filter(
            (transaction) => transaction.status === status,
        ).length,
    }),
    { all: LEDGER_TRANSACTIONS.length },
);

export const matchesTransactionFilters = (
    transaction: Transaction,
    status: TransactionStatusFilter,
    financing: TransactionFinancingFilter,
) =>
    (status === "all" || transaction.status === status) &&
    (financing === "all" || transaction.financing === financing);

export const TRANSACTIONS_SUMMARY = `${FAILED_COUNT} failed · ${OPEN_COUNT} in flight · ${formatCompactUsd(OPEN_VOLUME)} open volume`;

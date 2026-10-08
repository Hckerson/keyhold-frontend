import {
    CircleCheck,
    CircleX,
    ClipboardCheck,
    Clock,
    FileSignature,
    Landmark,
    Wallet,
    type LucideIcon,
} from "lucide-react";
import type { ChartTone } from "@/lib/config/chart-tones";
import type {
    CalloutNote,
    LedgerStatus,
    StatusTone,
    TransactionMilestoneId,
} from "@/lib/types";

interface ToneBand {
    ceiling: number;
    tone: ChartTone;
}

const bandTone = (bands: ToneBand[], value: number, fallback: ChartTone) =>
    bands.find((band) => value < band.ceiling)?.tone ?? fallback;

export interface TransactionStatusMeta {
    label: string;
    icon: LucideIcon;
    tone: StatusTone;
    chartTone: ChartTone;
    rank: number;
    open: boolean;
    note?: CalloutNote;
    flowNote: string;
    rowTone?: string;
}

export const TRANSACTION_STATUSES: Record<LedgerStatus, TransactionStatusMeta> =
    {
        PENDING: {
            label: "Awaiting payment",
            icon: Clock,
            tone: "warning",
            chartTone: "neutral",
            rank: 3,
            open: true,
            flowNote: "due on payment",
        },
        IN_PROGRESS: {
            label: "In escrow",
            icon: Landmark,
            tone: "info",
            chartTone: "neutral",
            rank: 4,
            open: true,
            flowNote: "held",
        },
        COMPLETED: {
            label: "Settled",
            icon: CircleCheck,
            tone: "success",
            chartTone: "accent",
            rank: 1,
            open: false,
            flowNote: "earned",
        },
        CANCELLED: {
            label: "Cancelled",
            icon: CircleX,
            tone: "neutral",
            chartTone: "neutral",
            rank: 2,
            open: false,
            flowNote: "fell through",
        },
    };

export const TRANSACTION_PIPELINE_ORDER: LedgerStatus[] = [
    "PENDING",
    "IN_PROGRESS",
    "COMPLETED",
    "CANCELLED",
];

export interface TransactionMilestoneMeta {
    label: string;
    next: string;
    icon: LucideIcon;
}

export const TRANSACTION_MILESTONES: Record<
    TransactionMilestoneId,
    TransactionMilestoneMeta
> = {
    agreement: {
        label: "Purchase agreement",
        next: "Agreement to sign",
        icon: FileSignature,
    },
    deposit: {
        label: "Escrow deposit",
        next: "Deposit due",
        icon: Landmark,
    },
    inspection: {
        label: "Inspection window closed",
        next: "Inspection open",
        icon: ClipboardCheck,
    },
    settlement: {
        label: "Funds released",
        next: "Funds to release",
        icon: Wallet,
    },
};

export const MILESTONE_ORDER: TransactionMilestoneId[] = [
    "agreement",
    "deposit",
    "inspection",
    "settlement",
];

export const DEAL_SLA_MINUTES = 86_400;

const DEAL_AGE_BANDS: ToneBand[] = [
    { ceiling: 43_200, tone: "neutral" },
    { ceiling: 64_800, tone: "neutral" },
    { ceiling: DEAL_SLA_MINUTES, tone: "neutral" },
];

const ESCROW_BANDS: ToneBand[] = [
    { ceiling: 25, tone: "neutral" },
    { ceiling: 60, tone: "neutral" },
    { ceiling: 100, tone: "accent" },
];

export const dealAgeTone = (minutes: number) =>
    bandTone(DEAL_AGE_BANDS, minutes, "error");

export const escrowTone = (percent: number) =>
    bandTone(ESCROW_BANDS, percent, "accent");

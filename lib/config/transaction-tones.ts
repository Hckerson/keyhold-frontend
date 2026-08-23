import {
    Banknote,
    Building2,
    CircleCheck,
    CircleX,
    ClipboardCheck,
    Clock,
    FileSignature,
    Landmark,
    Wallet,
    type LucideIcon,
} from "lucide-react";
import type { DotTone } from "@/components/patterns/status-dot";
import type { CalloutProps } from "@/components/ui/callout";
import type { ChartTone } from "@/lib/config/chart-tones";
import type { LedgerStatus, TransactionMilestoneId } from "@/lib/types";

interface ToneBand {
    ceiling: number;
    tone: ChartTone;
}

const bandTone = (bands: ToneBand[], value: number, fallback: ChartTone) =>
    bands.find((band) => value < band.ceiling)?.tone ?? fallback;

export interface TransactionStatusMeta {
    label: string;
    icon: LucideIcon;
    tone: DotTone;
    chartTone: ChartTone;
    rank: number;
    open: boolean;
    note?: CalloutProps;
    rowTone?: string;
}

export const TRANSACTION_STATUSES: Record<LedgerStatus, TransactionStatusMeta> =
    {
        PENDING: {
            label: "Awaiting payment",
            icon: Clock,
            tone: "warning",
            chartTone: "warning",
            rank: 3,
            open: true,
        },
        IN_PROGRESS: {
            label: "In escrow",
            icon: Landmark,
            tone: "info",
            chartTone: "info",
            rank: 4,
            open: true,
        },
        COMPLETED: {
            label: "Settled",
            icon: CircleCheck,
            tone: "success",
            chartTone: "success",
            rank: 1,
            open: false,
        },
        CANCELLED: {
            label: "Cancelled",
            icon: CircleX,
            tone: "neutral",
            chartTone: "neutral",
            rank: 2,
            open: false,
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
    icon: LucideIcon;
}

export const TRANSACTION_MILESTONES: Record<
    TransactionMilestoneId,
    TransactionMilestoneMeta
> = {
    agreement: { label: "Purchase agreement", icon: FileSignature },
    deposit: { label: "Escrow deposit", icon: Landmark },
    inspection: { label: "Inspection window closed", icon: ClipboardCheck },
    settlement: { label: "Funds released", icon: Wallet },
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
    { ceiling: 64_800, tone: "info" },
    { ceiling: DEAL_SLA_MINUTES, tone: "warning" },
];

const ESCROW_BANDS: ToneBand[] = [
    { ceiling: 25, tone: "neutral" },
    { ceiling: 60, tone: "info" },
    { ceiling: 100, tone: "accent" },
];

export const dealAgeTone = (minutes: number) =>
    bandTone(DEAL_AGE_BANDS, minutes, "error");

export const escrowTone = (percent: number) =>
    bandTone(ESCROW_BANDS, percent, "success");

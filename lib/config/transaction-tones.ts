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
import type {
    TransactionFinancing,
    TransactionMilestoneId,
    TransactionStatus,
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
    tone: DotTone;
    chartTone: ChartTone;
    rank: number;
    open: boolean;
    note?: CalloutProps;
    rowTone?: string;
}

export const TRANSACTION_STATUSES: Record<
    TransactionStatus,
    TransactionStatusMeta
> = {
    failed: {
        label: "Failed",
        icon: CircleX,
        tone: "error",
        chartTone: "error",
        rank: 4,
        open: false,
        note: {
            variant: "error",
            title: "Collapsed before settlement",
            description:
                "Financing was withdrawn after inspection. The deal is closed and the agent payout is reversed.",
        },
        rowTone: "bg-error/5",
    },
    closing: {
        label: "Closing",
        icon: FileSignature,
        tone: "info",
        chartTone: "info",
        rank: 3,
        open: true,
        note: {
            variant: "info",
            title: "Closing — settlement pending",
            description:
                "Paperwork sits with the closing agent. Commission releases once settlement funds land.",
        },
    },
    escrow: {
        label: "Escrow",
        icon: Landmark,
        tone: "warning",
        chartTone: "warning",
        rank: 2,
        open: true,
        note: {
            variant: "warning",
            title: "Escrow — not yet settled",
            description: "Funds are held until every closing condition clears.",
        },
    },
    pending: {
        label: "Pending",
        icon: Clock,
        tone: "info",
        chartTone: "accent",
        rank: 1,
        open: true,
        note: {
            variant: "neutral",
            title: "Pending — escrow not open",
            description:
                "Awaiting a signed purchase agreement before the deposit can be placed.",
        },
    },
    completed: {
        label: "Completed",
        icon: CircleCheck,
        tone: "success",
        chartTone: "success",
        rank: 0,
        open: false,
    },
};

export const TRANSACTION_PIPELINE_ORDER: TransactionStatus[] = [
    "pending",
    "escrow",
    "closing",
    "completed",
    "failed",
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
    inspection: { label: "Inspection cleared", icon: ClipboardCheck },
    financing: { label: "Financing confirmed", icon: Banknote },
    settlement: { label: "Settlement funds", icon: Wallet },
};

export const MILESTONE_ORDER: TransactionMilestoneId[] = [
    "agreement",
    "deposit",
    "inspection",
    "financing",
    "settlement",
];

export interface TransactionFinancingMeta {
    label: string;
    icon: LucideIcon;
    tone: ChartTone;
}

export const FINANCING_TYPES: Record<
    TransactionFinancing,
    TransactionFinancingMeta
> = {
    cash: { label: "Cash", icon: Banknote, tone: "success" },
    mortgage: { label: "Mortgage", icon: Landmark, tone: "info" },
    portfolio: { label: "Portfolio loan", icon: Building2, tone: "highlight" },
};

export const FINANCING_ORDER: TransactionFinancing[] = [
    "cash",
    "mortgage",
    "portfolio",
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

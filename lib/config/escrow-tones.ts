import {
    Banknote,
    CircleCheck,
    ShieldAlert,
    ShieldCheck,
    Undo2,
    type LucideIcon,
} from "lucide-react";
import type { ChartTone } from "@/lib/config/chart-tones";
import type { EscrowStatus, TransactionStatus } from "@/lib/enums/enums";
import type { StatusTone } from "@/lib/types";

export interface EscrowStatusMeta {
    label: string;
    icon: LucideIcon;
    tone: StatusTone;
    chartTone: ChartTone;
}

export const ESCROW_STATUS_KEYS: EscrowStatus[] = [
    "HELD",
    "RELEASED",
    "REFUNDED",
    "DISPUTED",
];

export const ESCROW_STATES: Record<EscrowStatus, EscrowStatusMeta> = {
    HELD: {
        label: "Held",
        icon: ShieldCheck,
        tone: "warning",
        chartTone: "neutral",
    },
    RELEASED: {
        label: "Released",
        icon: CircleCheck,
        tone: "success",
        chartTone: "accent",
    },
    REFUNDED: {
        label: "Refunded",
        icon: Undo2,
        tone: "neutral",
        chartTone: "neutral",
    },
    DISPUTED: {
        label: "Disputed",
        icon: ShieldAlert,
        tone: "error",
        chartTone: "error",
    },
};

export const ESCROW_STATUS_LABELS: Record<EscrowStatus, string> =
    Object.fromEntries(
        ESCROW_STATUS_KEYS.map((id) => [id, ESCROW_STATES[id].label]),
    ) as Record<EscrowStatus, string>;

export interface PurchaseStatusMeta {
    label: string;
    icon: LucideIcon;
    tone: StatusTone;
    chartTone: ChartTone;
}

export const PURCHASE_STATES: Record<TransactionStatus, PurchaseStatusMeta> = {
    PENDING: {
        label: "Awaiting payment",
        icon: Banknote,
        tone: "warning",
        chartTone: "neutral",
    },
    IN_PROGRESS: {
        label: "In escrow",
        icon: ShieldCheck,
        tone: "info",
        chartTone: "neutral",
    },
    COMPLETED: {
        label: "Settled",
        icon: CircleCheck,
        tone: "success",
        chartTone: "accent",
    },
    CANCELLED: {
        label: "Cancelled",
        icon: Undo2,
        tone: "neutral",
        chartTone: "neutral",
    },
};

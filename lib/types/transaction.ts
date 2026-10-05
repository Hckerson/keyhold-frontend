import type { LucideIcon } from "lucide-react";
import type { ChartTone } from "@/lib/config/chart-tones";

export type LedgerStatus =
    | "PENDING"
    | "IN_PROGRESS"
    | "COMPLETED"
    | "CANCELLED";

export type TransactionMilestoneId =
    | "agreement"
    | "deposit"
    | "inspection"
    | "settlement";

export interface LedgerTransaction {
    id: string;
    reference: string;
    property: string;
    buyer: string;
    agent: string;
    price: number;
    status: LedgerStatus;
    cleared: TransactionMilestoneId[];
    initiatedDate: string;
    completedDate: string | null;
    ageMinutes: number;
}

export interface TransactionStage {
    id: LedgerStatus;
    count: number;
    volume: number;
}

export interface DealFlowStage {
    id: LedgerStatus;
    label: string;
    icon: LucideIcon;
    tone: ChartTone;
    open: boolean;
    count: number;
    volume: number;
    commission: number;
    note: string;
}

export interface LedgerTotals {
    count: number;
    volume: number;
    commission: number;
}

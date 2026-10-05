import {
    Banknote,
    ClipboardCheck,
    Gavel,
    Home,
    type LucideIcon,
} from "lucide-react";
import type { ChartTone } from "@/lib/config/chart-tones";
import type {
    Contingency,
    MilestoneKind,
    MilestoneStatus,
} from "@/lib/enums/enums";
import type { StatusTone } from "@/lib/types";

export interface ContingencyMeta {
    label: string;
    caption: string;
    icon: LucideIcon;
}

export const CONTINGENCY_KEYS: Contingency[] = [
    "INSPECTION",
    "APPRAISAL",
    "FINANCING",
];

export const CONTINGENCIES_META: Record<Contingency, ContingencyMeta> = {
    INSPECTION: {
        label: "Inspection",
        caption: "Withdraw without penalty if the survey finds a defect",
        icon: ClipboardCheck,
    },
    APPRAISAL: {
        label: "Appraisal",
        caption: "Withdraw if the valuation lands below your offer",
        icon: Gavel,
    },
    FINANCING: {
        label: "Financing",
        caption: "Withdraw if your mortgage is not approved in time",
        icon: Banknote,
    },
};

export interface MilestoneKindMeta {
    label: string;
    caption: string;
    icon: LucideIcon;
    order: number;
}

export const MILESTONE_ORDER: MilestoneKind[] = [
    "INSPECTION",
    "APPRAISAL",
    "FINANCING",
    "CLOSING",
];

export const MILESTONE_KINDS_META: Record<MilestoneKind, MilestoneKindMeta> = {
    INSPECTION: {
        label: "Inspection",
        caption: "Survey booked, walked and reported",
        icon: ClipboardCheck,
        order: 1,
    },
    APPRAISAL: {
        label: "Appraisal",
        caption: "Valuation instructed and returned",
        icon: Gavel,
        order: 2,
    },
    FINANCING: {
        label: "Financing",
        caption: "Mortgage offer confirmed before the deadline",
        icon: Banknote,
        order: 3,
    },
    CLOSING: {
        label: "Closing",
        caption: "Completion date agreed and confirmed",
        icon: Home,
        order: 4,
    },
};

export interface MilestoneStatusMeta {
    label: string;
    tone: StatusTone;
    chartTone: ChartTone;
}

export const MILESTONE_STATUS_KEYS: MilestoneStatus[] = [
    "PENDING",
    "SCHEDULED",
    "COMPLETED",
    "WAIVED",
];

export const MILESTONE_STATUSES_META: Record<
    MilestoneStatus,
    MilestoneStatusMeta
> = {
    PENDING: { label: "Not set", tone: "neutral", chartTone: "neutral" },
    SCHEDULED: { label: "Scheduled", tone: "info", chartTone: "info" },
    COMPLETED: { label: "Complete", tone: "success", chartTone: "success" },
    WAIVED: { label: "Waived", tone: "warning", chartTone: "warning" },
};

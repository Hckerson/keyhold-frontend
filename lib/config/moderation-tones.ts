import {
    BadgeCheck,
    Clock,
    Flag,
    PenLine,
    XCircle,
    type LucideIcon,
} from "lucide-react";
import type { DotTone } from "@/components/patterns/status-dot";
import type { CalloutVariant } from "@/components/ui/callout";
import type { ChartTone } from "@/lib/config/chart-tones";
import type { ModerationStatus } from "@/lib/types";

export const MODERATION_STATUS_KEYS: ModerationStatus[] = [
    "flagged",
    "pending",
    "changes",
    "approved",
    "rejected",
];

export interface ModerationStatusMeta {
    label: string;
    icon: LucideIcon;
    tone: DotTone;
    chartTone: ChartTone;
    rank: number;
    open: boolean;
    noteTitle: string;
    noteTone: CalloutVariant;
}

export const MODERATION_STATUSES: Record<
    ModerationStatus,
    ModerationStatusMeta
> = {
    flagged: {
        label: "Flagged",
        icon: Flag,
        tone: "error",
        chartTone: "error",
        rank: 4,
        open: true,
        noteTitle: "Why this was flagged",
        noteTone: "error",
    },
    pending: {
        label: "Pending",
        icon: Clock,
        tone: "warning",
        chartTone: "warning",
        rank: 3,
        open: true,
        noteTitle: "Reviewer note",
        noteTone: "warning",
    },
    changes: {
        label: "Changes asked",
        icon: PenLine,
        tone: "info",
        chartTone: "info",
        rank: 2,
        open: true,
        noteTitle: "Feedback sent to the agent",
        noteTone: "info",
    },
    approved: {
        label: "Approved",
        icon: BadgeCheck,
        tone: "success",
        chartTone: "success",
        rank: 1,
        open: false,
        noteTitle: "Approval note",
        noteTone: "success",
    },
    rejected: {
        label: "Rejected",
        icon: XCircle,
        tone: "neutral",
        chartTone: "neutral",
        rank: 0,
        open: false,
        noteTitle: "Reason for rejection",
        noteTone: "neutral",
    },
};

interface ToneBand {
    floor: number;
    tone: ChartTone;
}

const SCORE_BANDS: ToneBand[] = [{ floor: 65, tone: "neutral" }];

const REPORT_BANDS: ToneBand[] = [{ floor: 6, tone: "error" }];

const bandTone = (bands: ToneBand[], value: number, fallback: ChartTone) =>
    bands.find((band) => value >= band.floor)?.tone ?? fallback;

export const complianceTone = (score: number) =>
    bandTone(SCORE_BANDS, score, "error");

export const reportTone = (reports: number) =>
    bandTone(REPORT_BANDS, reports, "neutral");

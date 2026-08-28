import {
    AlertTriangle,
    BadgeCheck,
    CheckCircle2,
    Clock,
    FileText,
    Flag,
    Images,
    PenLine,
    XCircle,
    type LucideIcon,
} from "lucide-react";
import type { DotTone } from "@/components/patterns/status-dot";
import type { CalloutVariant } from "@/components/ui/callout";
import type { ChartTone } from "@/lib/config/chart-tones";
import type {
    CheckState,
    ComplianceCheckId,
    DecisionMode,
    ModerationStatus,
} from "@/lib/types";

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

export const COMPLIANCE_CHECK_KEYS: ComplianceCheckId[] = [
    "photos",
    "accuracy",
    "licence",
];

export interface ComplianceCheckMeta {
    label: string;
    icon: LucideIcon;
}

export const COMPLIANCE_CHECKS: Record<ComplianceCheckId, ComplianceCheckMeta> =
    {
        photos: { label: "Photo provenance", icon: Images },
        accuracy: { label: "Description accuracy", icon: FileText },
        licence: { label: "Licence on file", icon: BadgeCheck },
    };

export const CHECK_STATE_KEYS: CheckState[] = ["pass", "warn", "fail"];

export interface CheckStateMeta {
    label: string;
    noun: string;
    icon: LucideIcon;
    tone: ChartTone;
    weight: number;
    score: number;
}

export const CHECK_STATES: Record<CheckState, CheckStateMeta> = {
    pass: {
        label: "Clear",
        noun: "checks cleared",
        icon: CheckCircle2,
        tone: "success",
        weight: 0,
        score: 100,
    },
    warn: {
        label: "Needs a look",
        noun: "checks flagged for a look",
        icon: AlertTriangle,
        tone: "warning",
        weight: 1,
        score: 55,
    },
    fail: {
        label: "Failing",
        noun: "checks failing",
        icon: XCircle,
        tone: "error",
        weight: 10,
        score: 0,
    },
};

export interface DecisionMeta {
    title: string;
    field: string;
    placeholder: string;
    submit: string;
    status: ModerationStatus;
    destructive: boolean;
}

export const MODERATION_DECISIONS: Record<DecisionMode, DecisionMeta> = {
    changes: {
        title: "Request changes",
        field: "Feedback for the agent",
        placeholder:
            "Describe exactly what the agent must change before this listing can go live.",
        submit: "Send feedback",
        status: "changes",
        destructive: false,
    },
    reject: {
        title: "Reject listing",
        field: "Reason for rejection",
        placeholder:
            "Explain what fails review. This reason is stored with the listing and sent to the agent.",
        submit: "Reject listing",
        status: "rejected",
        destructive: true,
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

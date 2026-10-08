import {
    AlertTriangle,
    BadgeCheck,
    CheckCircle2,
    FileText,
    Images,
    XCircle,
    type LucideIcon,
} from "lucide-react";
import type { ChartTone } from "@/lib/config/chart-tones";
import type { CheckState, ComplianceCheckId } from "@/lib/types";

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
        tone: "accent",
        weight: 0,
        score: 100,
    },
    warn: {
        label: "Needs a look",
        noun: "checks flagged for a look",
        icon: AlertTriangle,
        tone: "neutral",
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

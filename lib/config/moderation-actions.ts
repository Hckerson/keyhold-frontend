import { Check, PenLine, X, type LucideIcon } from "lucide-react";
import type { DecisionMode, ModerationStatus } from "@/lib/types";

export interface ModerationActionMeta {
    mode: "approve" | DecisionMode;
    label: string;
    rowLabel: string;
    icon: LucideIcon;
    tone: "success" | "warning" | "error";
    restTone: string;
    hiddenFor?: ModerationStatus;
}

export const MODERATION_ACTIONS: ModerationActionMeta[] = [
    {
        mode: "approve",
        label: "Approve",
        rowLabel: "Approve",
        icon: Check,
        tone: "success",
        restTone: "text-success",
        hiddenFor: "approved",
    },
    {
        mode: "changes",
        label: "Request Changes",
        rowLabel: "Request changes on",
        icon: PenLine,
        tone: "warning",
        restTone: "text-warning",
    },
    {
        mode: "reject",
        label: "Reject",
        rowLabel: "Reject",
        icon: X,
        tone: "error",
        restTone: "text-error",
        hiddenFor: "rejected",
    },
];

export const MODERATION_ACTION = Object.fromEntries(
    MODERATION_ACTIONS.map((action) => [action.mode, action]),
) as Record<ModerationActionMeta["mode"], ModerationActionMeta>;

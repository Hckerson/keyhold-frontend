import type { FlagType } from "@/lib/enums/enums";

export interface ReportTarget {
    type: FlagType;
    id: string;
    label: string;
}

export const REPORT_REASONS = [
    { value: "Fraudulent or fake", label: "Fraudulent or fake" },
    { value: "Misleading information", label: "Misleading information" },
    { value: "Offensive or abusive", label: "Offensive or abusive" },
    { value: "Spam or solicitation", label: "Spam or solicitation" },
    { value: "Something else", label: "Something else" },
] as const;

export type ReportReason = (typeof REPORT_REASONS)[number]["value"];

export const REPORT_COPY = {
    trigger: "Report",
    title: "Report to our trust team",
    lede: "A moderator reviews every report. We never tell the other party who raised it.",
    targetLabel: "What are you reporting",
    reasonLabel: "Reason",
    detailsLabel: "Anything else we should know",
    detailsPlaceholder:
        "Add anything that would help a moderator understand the problem.",
    submit: "Send report",
    cancel: "Cancel",
} as const;

import type { FlagStatus } from "@/lib/enums/enums";
import type {
    FilterPill,
    FlagAction,
    FlagFilterKey,
    FlagSettleMode,
    StatusTone,
} from "@/lib/types";

export const FLAG_STATES: Record<
    FlagStatus,
    { tone: StatusTone; label: string; open: boolean }
> = {
    ACTIVE: { tone: "warning", label: "Open", open: true },
    RESOLVED: { tone: "success", label: "Upheld", open: false },
    DISMISSED: { tone: "neutral", label: "Dismissed", open: false },
};

export const DEFAULT_FLAG_FILTER: FlagFilterKey = "ACTIVE";

export const FLAG_FILTERS: readonly FilterPill<FlagFilterKey>[] = [
    { id: "ACTIVE", label: "Open" },
    { id: "RESOLVED", label: "Upheld" },
    { id: "DISMISSED", label: "Dismissed" },
    { id: "all", label: "All" },
];

export const FLAG_ACTIONS: FlagAction[] = [
    { label: "Dismiss", mode: "dismiss", emphasis: "quiet" },
    { label: "Uphold", mode: "resolve", emphasis: "outline" },
];

export const FLAG_DECISION_COPY: Record<
    FlagSettleMode,
    { title: string; submit: string; warning: { title: string; body: string } }
> = {
    resolve: {
        title: "Uphold this report",
        submit: "Uphold report",
        warning: {
            title: "This records the finding only",
            body: "The report closes as upheld. It does not suspend the member or remove the message; do that from their profile. The decision is final.",
        },
    },
    dismiss: {
        title: "Dismiss this report",
        submit: "Dismiss report",
        warning: {
            title: "The report closes with no finding",
            body: "Nothing happens to the member or the message. The decision is final.",
        },
    },
};

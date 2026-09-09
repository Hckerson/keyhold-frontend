import type { BadgeTone } from "@/lib/types";
import type { FlagStatus, FlagType } from "@/lib/enums/enums";

export type FlagFilterKey = "all" | FlagType;
export type FlagSettleMode = "resolve" | "dismiss";

export interface AbuseReport {
    id: string;
    type: FlagType;
    status: FlagStatus;
    reason: string;
    details: string | null;
    reporter: string;
    subject: string;
    subjectDetail: string;
    openedAt: string;
    waitingDays: number;
}

export interface FlagSettleAction {
    label: string;
    destructive?: boolean;
    mode: FlagSettleMode;
}

export const flagStatusMeta: Record<
    FlagStatus,
    { tone: BadgeTone; label: string; open: boolean }
> = {
    ACTIVE: { tone: "error", label: "Active", open: true },
    RESOLVED: { tone: "success", label: "Resolved", open: false },
    DISMISSED: { tone: "neutral", label: "Dismissed", open: false },
};

export const flagTypeMeta: Record<FlagType, { label: string }> = {
    USER: { label: "Member" },
    PROPERTY: { label: "Listing" },
    MESSAGE: { label: "Message" },
};

export const ABUSE_FILTERS: { id: FlagFilterKey; label: string }[] = [
    { id: "all", label: "All" },
    { id: "USER", label: "Members" },
    { id: "MESSAGE", label: "Messages" },
];

export const flagActionsByStatus: Record<FlagStatus, FlagSettleAction[]> = {
    ACTIVE: [
        { label: "Uphold the report", mode: "resolve" },
        { label: "Dismiss", destructive: true, mode: "dismiss" },
    ],
    RESOLVED: [],
    DISMISSED: [],
};

export const isOpenReport = (report: AbuseReport) =>
    flagStatusMeta[report.status].open;

export const rankReports = (reports: AbuseReport[]) =>
    [...reports].sort(
        (a, b) =>
            Number(isOpenReport(b)) - Number(isOpenReport(a)) ||
            b.waitingDays - a.waitingDays,
    );

export const countReports = (reports: AbuseReport[]) => {
    const counts: Record<FlagFilterKey, number> = {
        all: reports.length,
        USER: 0,
        PROPERTY: 0,
        MESSAGE: 0,
    };
    for (const report of reports) counts[report.type] += 1;
    return counts;
};

export const filterReports = (reports: AbuseReport[], filter: FlagFilterKey) =>
    filter === "all"
        ? reports
        : reports.filter((report) => report.type === filter);

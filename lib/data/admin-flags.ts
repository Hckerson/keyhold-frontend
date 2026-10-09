import { FLAG_STATES } from "@/lib/config/flag-tones";
import { ADMIN_ROUTES } from "@/lib/constants";
import {
    byReviewOrder,
    openFor,
    reviewMoment,
    reviewReading,
} from "@/lib/data/review-queue";
import { FLAG_TYPE_LABELS } from "@/lib/enums/enums";
import type {
    FlagFilterKey,
    FlagReport,
    ReviewClock,
    ReviewLink,
    ReviewQueueItem,
} from "@/lib/types";

const ALL: FlagFilterKey = "all";
const READING = { open: "open", none: "Nothing is flagged" };
const GONE = "No longer on the platform";

export const FLAG_COPY = {
    title: "Flags",
    lede: "Members and messages reported by other people. Upholding records the finding only",
    reasonHeading: "Reason given",
    wordsHeading: "In the reporter's words",
    messageHeading: "Reported message",
    memberHeading: "Reported member",
    reporterHeading: "Reported by",
    profile: "Open profile",
    sender: "Open sender",
    emptyTitle: "Nothing flagged",
    emptyLede: "No member or message reports match this view.",
} as const;

export const flagClock = (report: FlagReport): ReviewClock => ({
    open: FLAG_STATES[report.status].open,
    openedAt: report.openedAt,
    decidedAt: report.decidedAt,
});

export const flagCounts = (items: FlagReport[]) => {
    const counts: Record<FlagFilterKey, number> = {
        ACTIVE: 0,
        RESOLVED: 0,
        DISMISSED: 0,
        all: items.length,
    };
    for (const item of items) counts[item.status] += 1;
    return counts;
};

export const flagsIn = (items: FlagReport[], filter: FlagFilterKey) =>
    items
        .filter((item) => filter === ALL || item.status === filter)
        .sort((a, b) => byReviewOrder(flagClock(a), flagClock(b)));

export const flagReading = (items: FlagReport[], now = new Date()) =>
    reviewReading(items.map(flagClock), READING, now);

export const subjectOf = (report: FlagReport) => {
    if (report.target?.kind === "USER") return report.target.name;
    if (report.target?.kind === "MESSAGE") return `“${report.target.content}”`;
    return GONE;
};

export const subjectLink = (report: FlagReport): ReviewLink | undefined => {
    if (report.target?.kind === "USER")
        return {
            href: ADMIN_ROUTES.user(report.target.id),
            label: FLAG_COPY.profile,
        };
    if (report.target?.kind === "MESSAGE")
        return {
            href: ADMIN_ROUTES.user(report.target.senderId),
            label: FLAG_COPY.sender,
        };
    return undefined;
};

export const flagQueueItems = (
    reports: FlagReport[],
    mixed: boolean,
    now = new Date(),
): ReviewQueueItem[] =>
    reports.map((report) => ({
        id: report.id,
        title: subjectOf(report),
        caption: `${FLAG_TYPE_LABELS[report.type]} · ${report.reason}`,
        moment: reviewMoment(flagClock(report), now),
        status:
            mixed && !flagClock(report).open
                ? FLAG_STATES[report.status]
                : undefined,
    }));

export const flagOpenLine = (report: FlagReport, now = new Date()) =>
    `Open ${openFor(flagClock(report), now)}`;

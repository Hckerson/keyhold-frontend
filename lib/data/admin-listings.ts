import { Flag, Clock, ClipboardCheck, Wallet, ShieldAlert } from "lucide-react";
import type { ShareDatum } from "@/components/patterns/share-row";
import type { StatDatum } from "@/components/patterns/stat-cell";
import type { SelectOption } from "@/components/ui/forms/select";
import {
    CHECK_STATES,
    CHECK_STATE_KEYS,
    COMPLIANCE_CHECKS,
    COMPLIANCE_CHECK_KEYS,
    MODERATION_STATUSES,
    MODERATION_STATUS_KEYS,
} from "@/lib/config/moderation-tones";
import type {
    ComplianceCheckId,
    ModerationAgentLoad,
    ModerationListing,
    ModerationStatus,
} from "@/lib/types";
import {
    averageOf,
    formatAge,
    formatCompactUsd,
    percentOf,
    sum,
} from "@/lib/utils";

const MS_PER_MINUTE = 60_000;
const CHECK_TOTAL = COMPLIANCE_CHECK_KEYS.length;
const EVERY_CHECK = "all";
const NO_QUEUE_LABEL = "—";

export type ModerationStatusFilter = ModerationStatus | "all";

export type ModerationCheckFilter = ComplianceCheckId | typeof EVERY_CHECK;

export const MODERATION_FILTERS: {
    id: ModerationStatusFilter;
    label: string;
}[] = [
    { id: "all", label: "All" },
    ...MODERATION_STATUS_KEYS.map((id) => ({
        id,
        label: MODERATION_STATUSES[id].label,
    })),
];

export const CHECK_FILTER_OPTIONS: SelectOption<ModerationCheckFilter>[] = [
    { value: EVERY_CHECK, label: "Every check" },
    ...COMPLIANCE_CHECK_KEYS.map((id) => ({
        value: id,
        label: `${COMPLIANCE_CHECKS[id].label} open`,
    })),
];

export const checkStates = (listing: ModerationListing) =>
    COMPLIANCE_CHECK_KEYS.map((id) => listing.compliance[id]);

export const complianceScore = (listing: ModerationListing) =>
    averageOf(checkStates(listing).map((state) => CHECK_STATES[state].score));

export const riskWeight = (listing: ModerationListing) =>
    sum(checkStates(listing).map((state) => CHECK_STATES[state].weight));

export const openChecks = (listing: ModerationListing) =>
    checkStates(listing).filter((state) => state !== "pass").length;

export const isOpen = (listing: ModerationListing) =>
    MODERATION_STATUSES[listing.status].open;

export const submittedAt = (listing: ModerationListing) =>
    new Date(Date.now() - listing.queuedMinutes * MS_PER_MINUTE);

export const agentFirm = (email: string) => email.slice(email.indexOf("@") + 1);

export const rankListings = (listings: ModerationListing[]) =>
    [...listings].sort(
        (a, b) =>
            Number(isOpen(b)) - Number(isOpen(a)) ||
            MODERATION_STATUSES[b.status].rank -
                MODERATION_STATUSES[a.status].rank ||
            riskWeight(b) - riskWeight(a) ||
            b.reports - a.reports ||
            b.queuedMinutes - a.queuedMinutes,
    );

export const focusListing = (listings: ModerationListing[]) =>
    rankListings(listings.filter(isOpen))[0];

export const matchesModerationFilters = (
    listing: ModerationListing,
    status: ModerationStatusFilter,
    check: ModerationCheckFilter,
) =>
    (status === "all" || listing.status === status) &&
    (check === EVERY_CHECK || listing.compliance[check] !== "pass");

export const countByStatus = (
    listings: ModerationListing[],
): Record<ModerationStatusFilter, number> =>
    MODERATION_STATUS_KEYS.reduce(
        (counts, id) => ({
            ...counts,
            [id]: listings.filter((listing) => listing.status === id).length,
        }),
        { all: listings.length } as Record<ModerationStatusFilter, number>,
    );

export const queuedValue = (listings: ModerationListing[]) =>
    sum(listings.filter(isOpen).map((listing) => listing.price));

export const oldestQueued = (listings: ModerationListing[]) =>
    Math.max(0, ...listings.filter(isOpen).map((l) => l.queuedMinutes));

export const totalReports = (listings: ModerationListing[]) =>
    sum(listings.filter(isOpen).map((listing) => listing.reports));

export const moderationStats = (listings: ModerationListing[]): StatDatum[] => {
    const counts = countByStatus(listings);
    const oldest = oldestQueued(listings);

    return [
        {
            id: "flagged",
            icon: Flag,
            label: "Flagged",
            value: `${counts.flagged}`,
            tone: "error",
        },
        {
            id: "pending",
            icon: ClipboardCheck,
            label: "Awaiting review",
            value: `${counts.pending}`,
            tone: "warning",
        },
        {
            id: "reports",
            icon: ShieldAlert,
            label: "Open reports",
            value: `${totalReports(listings)}`,
            tone: "accent",
        },
        {
            id: "oldest",
            icon: Clock,
            label: "Oldest in queue",
            value: oldest > 0 ? formatAge(oldest) : NO_QUEUE_LABEL,
            tone: "info",
        },
        {
            id: "value",
            icon: Wallet,
            label: "Value held",
            value: formatCompactUsd(queuedValue(listings)),
            tone: "highlight",
        },
    ];
};

export const statusShares = (listings: ModerationListing[]): ShareDatum[] => {
    const counts = countByStatus(listings);
    return MODERATION_STATUS_KEYS.map((id) => ({
        id,
        icon: MODERATION_STATUSES[id].icon,
        label: MODERATION_STATUSES[id].label,
        value: `${counts[id]}`,
        percent: percentOf(counts[id], listings.length),
        tone: MODERATION_STATUSES[id].chartTone,
    }));
};

export const complianceShares = (
    listings: ModerationListing[],
): ShareDatum[] => {
    const states = listings.flatMap(checkStates);
    return CHECK_STATE_KEYS.map((id) => {
        const count = states.filter((state) => state === id).length;
        return {
            id,
            icon: CHECK_STATES[id].icon,
            label: CHECK_STATES[id].label,
            value: `${count}`,
            percent: percentOf(count, states.length),
            tone: CHECK_STATES[id].tone,
        };
    });
};

export const agentLoads = (
    listings: ModerationListing[],
): ModerationAgentLoad[] => {
    const byAgent = new Map<string, ModerationAgentLoad>();

    for (const listing of listings) {
        const { name, email } = listing.agent;
        const load = byAgent.get(email) ?? {
            id: email,
            name,
            firm: agentFirm(email),
            submissions: 0,
            open: 0,
            reports: 0,
        };
        load.submissions += 1;
        load.open += isOpen(listing) ? 1 : 0;
        load.reports += listing.reports;
        byAgent.set(email, load);
    }

    return [...byAgent.values()].sort(
        (a, b) => b.reports - a.reports || b.open - a.open,
    );
};

export const moderationSummary = (listings: ModerationListing[]) => {
    const counts = countByStatus(listings);
    const open = listings.filter(isOpen).length;
    return `${open} open · ${counts.flagged} flagged · ${formatCompactUsd(queuedValue(listings))} held`;
};

export const clearedCheckShare = (listings: ModerationListing[]) => {
    const states = listings.flatMap(checkStates);
    return percentOf(
        states.filter((state) => state === "pass").length,
        states.length,
    );
};

export const CHECK_COUNT_LABEL = `${CHECK_TOTAL} checks`;

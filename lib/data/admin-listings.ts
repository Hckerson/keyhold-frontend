import { Layers } from "lucide-react";
import {
    CHECK_STATES,
    COMPLIANCE_CHECK_KEYS,
    MODERATION_STATUSES,
    MODERATION_STATUS_KEYS,
} from "@/lib/config/moderation-tones";
import type {
    CheckBreakdown,
    CheckState,
    ComplianceCheckId,
    ModerationAgentLoad,
    ModerationListing,
    ModerationStatusFilter,
    ModerationStatusTile,
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

export type { ModerationStatusFilter };

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

export const statusTiles = (
    listings: ModerationListing[],
): ModerationStatusTile[] => {
    const counts = countByStatus(listings);

    return MODERATION_FILTERS.map(({ id, label }) => ({
        id,
        label,
        icon: id === "all" ? Layers : MODERATION_STATUSES[id].icon,
        tone: id === "all" ? "accent" : MODERATION_STATUSES[id].chartTone,
        count: counts[id],
        percent: percentOf(counts[id], listings.length),
    }));
};

export const checkBreakdown = (
    listings: ModerationListing[],
): CheckBreakdown[] =>
    COMPLIANCE_CHECK_KEYS.map((id) => {
        const countOf = (state: CheckState) =>
            listings.filter((listing) => listing.compliance[id] === state)
                .length;

        return {
            id,
            pass: countOf("pass"),
            warn: countOf("warn"),
            fail: countOf("fail"),
        };
    });

export const agentLoads = (
    listings: ModerationListing[],
): ModerationAgentLoad[] => {
    const byAgent = new Map<string, ModerationAgentLoad>();

    for (const listing of listings) {
        const { name, email } = listing.agent;
        const load = byAgent.get(email) ?? {
            id: email,
            name,
            email,
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

export const queueReading = (listings: ModerationListing[]) => {
    const open = listings.filter(isOpen).length;
    const oldest = oldestQueued(listings);
    const reading = `${open} open · ${totalReports(listings)} reports · ${formatCompactUsd(queuedValue(listings))} held`;

    return oldest > 0 ? `${reading} · oldest ${formatAge(oldest)}` : reading;
};

export const moderationDesk = (listings: ModerationListing[]) => ({
    ranked: rankListings(listings),
    focus: focusListing(listings),
    tiles: statusTiles(listings),
    reading: queueReading(listings),
    checks: checkBreakdown(listings),
    loads: agentLoads(listings),
});

export const CHECK_COUNT_LABEL = `${CHECK_TOTAL} checks`;

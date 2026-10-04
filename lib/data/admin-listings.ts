import {
    CHECK_STATES,
    COMPLIANCE_CHECK_KEYS,
} from "@/lib/config/compliance-checks";
import {
    MODERATION_STATUSES,
    MODERATION_STATUS_KEYS,
} from "@/lib/config/moderation-tones";
import type {
    ComplianceCheckId,
    ModerationListing,
    ModerationStatusFilter,
} from "@/lib/types";
import { averageOf, sum } from "@/lib/utils";

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

export const CHECK_COUNT_LABEL = `${CHECK_TOTAL} checks`;

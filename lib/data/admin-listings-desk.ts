import { Layers } from "lucide-react";
import { COMPLIANCE_CHECK_KEYS } from "@/lib/config/compliance-checks";
import { MODERATION_STATUSES } from "@/lib/config/moderation-tones";
import {
    countByStatus,
    focusListing,
    isOpen,
    MODERATION_FILTERS,
    rankListings,
} from "@/lib/data/admin-listings";
import type {
    CheckBreakdown,
    CheckState,
    ModerationAgentLoad,
    ModerationListing,
    ModerationStatusTile,
} from "@/lib/types";
import { formatAge, formatCompactUsd, percentOf, sum } from "@/lib/utils";

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

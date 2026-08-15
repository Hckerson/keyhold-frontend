import { Flag, Clock, ClipboardCheck, Wallet, ShieldAlert } from "lucide-react";
import type { ShareDatum } from "@/components/patterns/share-row";
import type { StatDatum } from "@/components/patterns/stat-cell";
import type { SelectOption } from "@/components/ui/forms/select";
import {
    CHECK_STATES,
    CHECK_STATE_KEYS,
    COMPLIANCE_CHECKS,
    COMPLIANCE_CHECK_KEYS,
    MODERATION_DECISIONS,
    MODERATION_STATUSES,
    MODERATION_STATUS_KEYS,
} from "@/lib/config/moderation-tones";
import { propertyGallery } from "@/lib/data/sample-images";
import type {
    ComplianceCheckId,
    DecisionMode,
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

export const QUEUE_NOW = new Date(2026, 7, 5, 9, 0);

export const MODERATION_LISTINGS: ModerationListing[] = [
    {
        id: "sunset-penthouse",
        listingId: "4",
        address: "789 Sunset Blvd",
        locality: "West Hollywood",
        price: 2_950_000,
        status: "flagged",
        queuedMinutes: 3_240,
        description:
            "Rare Sunset Strip penthouse with 180-degree city views. Over 4,800 square feet of entertaining space, private elevator access and a rooftop deck. Building amenities include valet, concierge and a residents' screening room.",
        photos: propertyGallery(3, 3),
        compliance: {
            photos: "fail",
            accuracy: "warn",
            licence: "pass",
            "fair-housing": "pass",
        },
        reports: 7,
        agent: {
            name: "Michael Rodriguez",
            email: "michael@sunsetproperties.com",
            phone: "(323) 555-0178",
        },
        note: "An automated scan matched the second photograph to a stock library and the stated square footage does not reconcile with county records.",
    },
    {
        id: "rodeo-trophy",
        listingId: "12",
        address: "88 Rodeo Drive",
        locality: "Beverly Hills",
        price: 5_400_000,
        status: "flagged",
        queuedMinutes: 1_180,
        description:
            "Trophy address steps from the flagship boutiques. Five bedrooms across three levels, private motor court and a subterranean garage for six cars.",
        photos: propertyGallery(9, 3),
        compliance: {
            photos: "fail",
            accuracy: "fail",
            licence: "pass",
            "fair-housing": "warn",
        },
        reports: 4,
        agent: {
            name: "Marcus Sterling",
            email: "marcus@sterlingluxe.com",
            phone: "(310) 555-0166",
        },
        note: "Interior photographs belong to a different property and the copy repeats claims that cannot be verified.",
    },
    {
        id: "malibu-beachfront",
        listingId: "5",
        address: "1120 Ocean Front Walk",
        locality: "Malibu",
        price: 7_850_000,
        status: "pending",
        queuedMinutes: 640,
        description:
            "Beachfront modern on 60 feet of private sand. Walls of glass frame the water from every principal room. Four bedrooms, a spa-level primary bath and a rooftop lounge with a fire pit.",
        photos: propertyGallery(4, 3),
        compliance: {
            photos: "pass",
            accuracy: "warn",
            licence: "pass",
            "fair-housing": "warn",
        },
        reports: 1,
        agent: {
            name: "David Williams",
            email: "david@coastlineestates.com",
            phone: "(424) 555-0113",
        },
    },
    {
        id: "belair-villa",
        listingId: "3",
        address: "234 Oak Street",
        locality: "Bel Air",
        price: 4_500_000,
        status: "pending",
        queuedMinutes: 265,
        description:
            "Mediterranean villa behind private gates with mature olive trees and a motor court. Seven bedrooms, a two-story library, screening room and a guest house. Fully renovated in 2022 with new systems throughout.",
        photos: propertyGallery(2, 3),
        compliance: {
            photos: "pass",
            accuracy: "pass",
            licence: "warn",
            "fair-housing": "pass",
        },
        reports: 0,
        agent: {
            name: "Jennifer Martinez",
            email: "jennifer@belairgroup.com",
            phone: "(310) 555-0190",
        },
    },
    {
        id: "brentwood-mews",
        listingId: "9",
        address: "64 Brentwood Mews",
        locality: "Brentwood",
        price: 4_950_000,
        status: "pending",
        queuedMinutes: 95,
        description:
            "Garden-level mews house rebuilt to the studs in 2024. Three bedrooms, a walled courtyard and a detached studio that reads as a fourth.",
        photos: propertyGallery(8, 3),
        compliance: {
            photos: "pass",
            accuracy: "pass",
            licence: "pass",
            "fair-housing": "pass",
        },
        reports: 0,
        agent: {
            name: "Sarah Chen",
            email: "sarah@luxuryrealestate.com",
            phone: "(310) 555-0142",
        },
    },
    {
        id: "montana-row",
        listingId: "8",
        address: "301 Montana Row",
        locality: "Santa Monica",
        price: 3_950_000,
        status: "changes",
        queuedMinutes: 2_100,
        description:
            "Corner townhouse two blocks from the promenade. Three bedrooms over two levels with a roof terrace and secure parking for two.",
        photos: propertyGallery(7, 3),
        compliance: {
            photos: "warn",
            accuracy: "pass",
            licence: "pass",
            "fair-housing": "pass",
        },
        reports: 2,
        agent: {
            name: "Daniel Okafor",
            email: "daniel@sunsetproperties.com",
            phone: "(310) 555-0264",
        },
        note: "Replace the twilight exterior shots with daylight originals and remove the unverified school-district claim.",
    },
    {
        id: "oak-avenue-estate",
        listingId: "1",
        address: "456 Oak Avenue",
        locality: "Beverly Hills",
        price: 3_200_000,
        status: "approved",
        queuedMinutes: 4_320,
        description:
            "Contemporary six-bedroom estate on a gated half-acre lot. Floor-to-ceiling glass opens to a level lawn, 60-foot pool and outdoor kitchen. Chef's kitchen with dual islands and a 900-bottle wine room.",
        photos: propertyGallery(0, 3),
        compliance: {
            photos: "pass",
            accuracy: "pass",
            licence: "pass",
            "fair-housing": "pass",
        },
        reports: 0,
        agent: {
            name: "Sarah Chen",
            email: "sarah@luxuryrealestate.com",
            phone: "(310) 555-0142",
        },
    },
    {
        id: "canyon-road",
        listingId: "10",
        address: "1220 Canyon Road",
        locality: "Bel Air",
        price: 6_400_000,
        status: "rejected",
        queuedMinutes: 7_200,
        description:
            "Canyon compound on two gated acres with a tennis pavilion, guest house and a pool terrace cut into the hillside.",
        photos: propertyGallery(11, 3),
        compliance: {
            photos: "fail",
            accuracy: "fail",
            licence: "fail",
            "fair-housing": "pass",
        },
        reports: 9,
        agent: {
            name: "Marcus Sterling",
            email: "marcus@sterlingluxe.com",
            phone: "(310) 555-0166",
        },
        note: "The submitting licence lapsed in June and the gallery duplicates a listing already live under another agent.",
    },
];

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
    new Date(QUEUE_NOW.getTime() - listing.queuedMinutes * MS_PER_MINUTE);

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

export const approveListings = (
    listings: ModerationListing[],
    ids: string[],
): ModerationListing[] =>
    listings.map((listing) =>
        ids.includes(listing.id)
            ? { ...listing, status: "approved", note: undefined, reports: 0 }
            : listing,
    );

export const decideListings = (
    listings: ModerationListing[],
    ids: string[],
    mode: DecisionMode,
    note: string,
): ModerationListing[] =>
    listings.map((listing) =>
        ids.includes(listing.id)
            ? { ...listing, status: MODERATION_DECISIONS[mode].status, note }
            : listing,
    );

export const CHECK_COUNT_LABEL = `${CHECK_TOTAL} checks`;

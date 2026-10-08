import { CircleCheck, Clock, Handshake, Home, Wallet } from "lucide-react";
import {
    INTEREST_STATUSES,
    INTEREST_STATUS_KEYS,
    TRACTIONS,
    TRACTION_KEYS,
    type Traction,
} from "@/lib/config/interest-tones";
import type {
    Interest,
    InterestStatus,
    ShareDatum,
    StatDatum,
} from "@/lib/types";
import { formatCompactUsd, percentOf, sum } from "@/lib/utils";

export type StageFilter = "all" | "open" | "closed";

export type StatusFilter = InterestStatus | "all";

export const STAGE_FILTERS: { id: StageFilter; label: string }[] = [
    { id: "all", label: "All" },
    { id: "open", label: "Live" },
    { id: "closed", label: "Closed" },
];

export const STATUS_OPTIONS: { value: StatusFilter; label: string }[] = [
    { value: "all", label: "Every status" },
    ...INTEREST_STATUS_KEYS.map((id) => ({
        value: id,
        label: INTEREST_STATUSES[id].label,
    })),
];

export const tractionOf = (interest: Interest): Traction => {
    if (interest.offers > 0) return "bidding";
    if (interest.viewings > 0) return "touring";
    if (interest.messages > 0) return "talking";
    return "quiet";
};

export const isOpen = (interest: Interest) =>
    INTEREST_STATUSES[interest.status].open;

export const openInterests = (interests: Interest[]) =>
    interests.filter(isOpen);

export const countedBy = (interests: Interest[], status: InterestStatus) =>
    interests.filter((interest) => interest.status === status).length;

export const trackedValue = (interests: Interest[]) =>
    sum(openInterests(interests).map((interest) => interest.listPrice));

export const matchesFilters = (
    interest: Interest,
    stage: StageFilter,
    status: StatusFilter,
) => {
    if (stage === "open" && !isOpen(interest)) return false;
    if (stage === "closed" && isOpen(interest)) return false;
    return status === "all" || interest.status === status;
};

export const countByStage = (
    interests: Interest[],
): Record<StageFilter, number> => ({
    all: interests.length,
    open: openInterests(interests).length,
    closed: interests.length - openInterests(interests).length,
});

export const rankInterests = (interests: Interest[]) =>
    [...interests].sort(
        (a, b) =>
            TRACTIONS[tractionOf(b)].rank - TRACTIONS[tractionOf(a)].rank ||
            INTEREST_STATUSES[b.status].rank -
                INTEREST_STATUSES[a.status].rank ||
            b.listPrice - a.listPrice ||
            a.minutesAgo - b.minutesAgo,
    );

export const interestStats = (interests: Interest[]): StatDatum[] => [
    {
        id: "live",
        icon: Handshake,
        label: "Live",
        value: `${openInterests(interests).length}`,
        tone: "accent",
    },
    {
        id: "awaiting",
        icon: Clock,
        label: "Awaiting reply",
        value: `${countedBy(interests, "pending")}`,
        tone: "neutral",
    },
    {
        id: "introduced",
        icon: CircleCheck,
        label: "Introduced",
        value: `${countedBy(interests, "connected")}`,
        tone: "accent",
    },
    {
        id: "tracked",
        icon: Wallet,
        label: "Tracked value",
        value: formatCompactUsd(trackedValue(interests)),
        tone: "neutral",
    },
    {
        id: "offices",
        icon: Home,
        label: "Offices",
        value: `${new Set(interests.map((interest) => interest.agent)).size}`,
        tone: "neutral",
    },
];

export const statusShares = (interests: Interest[]): ShareDatum[] =>
    INTEREST_STATUS_KEYS.map((id) => {
        const count = countedBy(interests, id);
        return {
            id,
            icon: INTEREST_STATUSES[id].icon,
            label: INTEREST_STATUSES[id].label,
            value: `${count}`,
            percent: percentOf(count, interests.length),
            tone: INTEREST_STATUSES[id].chartTone,
        };
    });

export const tractionShares = (interests: Interest[]): ShareDatum[] =>
    TRACTION_KEYS.map((id) => {
        const count = interests.filter(
            (interest) => tractionOf(interest) === id,
        ).length;
        return {
            id,
            icon: TRACTIONS[id].icon,
            label: TRACTIONS[id].label,
            value: `${count}`,
            percent: percentOf(count, interests.length),
            tone: TRACTIONS[id].tone,
        };
    });

export const interestsSummary = (interests: Interest[]) =>
    `${openInterests(interests).length} live · ${formatCompactUsd(trackedValue(interests))} tracked`;

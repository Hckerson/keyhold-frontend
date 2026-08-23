import { CalendarDays, FileText, Heart, KeyRound } from "lucide-react";
import type {
    BuyerJourney,
    JourneyStation,
    JourneyStationState,
    JourneyStatus,
} from "@/lib/types";
import type { ConnectionListItem } from "@/lib/validations/connection-list";
import type { Transaction } from "@/lib/validations/transaction";

const IDLE_STATUS: JourneyStatus = {
    title: "Nothing scheduled",
    detail: "Save a home to start your search",
};

const TIME_FORMAT: Intl.DateTimeFormatOptions = {
    weekday: "short",
    hour: "numeric",
    minute: "2-digit",
};

export interface JourneyCounts {
    saved: number;
    viewings: number;
    offers: number;
    closings: number;
}

export const journeyCounts = (
    saved: number,
    connections: ConnectionListItem[],
    purchases: Transaction[],
): JourneyCounts => ({
    saved,
    viewings: connections.reduce(
        (total, connection) => total + connection.viewings.length,
        0,
    ),
    offers: connections.reduce(
        (total, connection) => total + connection.offers.length,
        0,
    ),
    closings: purchases.length,
});

const stateFor = (
    count: number,
    laterCounts: number[],
): JourneyStationState => {
    if (count === 0) return "pending";
    return laterCounts.some((later) => later > 0) ? "complete" : "active";
};

export const buildJourneyStations = (
    counts: JourneyCounts,
): JourneyStation[] => [
    {
        label: "Saved",
        href: "/dashboard/saved",
        icon: Heart,
        description: "Properties you've bookmarked",
        state: stateFor(counts.saved, [
            counts.viewings,
            counts.offers,
            counts.closings,
        ]),
        count: counts.saved,
    },
    {
        label: "Viewings",
        href: "/dashboard/viewings",
        icon: CalendarDays,
        description: "Upcoming property tours",
        state: stateFor(counts.viewings, [counts.offers, counts.closings]),
        count: counts.viewings,
    },
    {
        label: "Offers",
        href: "/dashboard/offers",
        icon: FileText,
        description: "Track your submitted offers",
        state: stateFor(counts.offers, [counts.closings]),
        count: counts.offers,
    },
    {
        label: "Closing",
        href: "/dashboard/transactions",
        icon: KeyRound,
        description: "Escrow, title and handover",
        state: stateFor(counts.closings, []),
        count: counts.closings,
    },
];

const nextViewing = (connections: ConnectionListItem[]) => {
    const upcoming = connections
        .flatMap((connection) =>
            connection.viewings
                .filter((viewing) => viewing.confirmedTime)
                .map((viewing) => ({
                    at: new Date(viewing.confirmedTime as string),
                    agent: connection.seller.fullName,
                })),
        )
        .filter((entry) => entry.at.getTime() > Date.now())
        .sort((a, b) => a.at.getTime() - b.at.getTime());

    return upcoming[0];
};

export const journeyStatus = (
    connections: ConnectionListItem[],
    purchases: Transaction[],
): JourneyStatus => {
    const held = purchases.find(
        (purchase) => purchase.escrowHold?.status === "HELD",
    );
    if (held) {
        return {
            title: "Funds in escrow",
            detail: `${held.property?.address ?? "Your purchase"} · awaiting release`,
        };
    }

    const viewing = nextViewing(connections);
    if (viewing) {
        return {
            title: "Next viewing",
            detail: `${viewing.agent} · ${viewing.at.toLocaleString("en-US", TIME_FORMAT)}`,
        };
    }

    const countered = connections.find((connection) =>
        connection.offers.some((offer) => offer.status === "COUNTERED"),
    );
    if (countered) {
        return {
            title: "Offer countered",
            detail: `${countered.seller.fullName} · ${countered.property.address}`,
        };
    }

    return IDLE_STATUS;
};

export const buildBuyerJourney = (
    counts: JourneyCounts,
    status: JourneyStatus,
): BuyerJourney => ({
    label: "Journey",
    stations: buildJourneyStations(counts),
    status,
});

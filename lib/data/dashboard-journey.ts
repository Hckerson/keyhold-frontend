import {
    CalendarDays,
    FileText,
    Handshake,
    Heart,
    KeyRound,
} from "lucide-react";
import { BUYER_ROUTES } from "@/lib/constants";
import type {
    BuyerJourney,
    JourneyCounts,
    JourneyStation,
    JourneyStationState,
    JourneyStatus,
} from "@/lib/types";
import type { ConnectionListItem } from "@/lib/validations/connection-list";
import type { Transaction } from "@/lib/validations/transaction";

export const journeyCounts = (
    saved: number,
    connections: ConnectionListItem[],
    purchases: Transaction[],
): JourneyCounts => ({
    saved,
    interests: connections.length,
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
        href: BUYER_ROUTES.saved,
        icon: Heart,
        description: "Properties you've bookmarked",
        state: stateFor(counts.saved, [
            counts.interests,
            counts.viewings,
            counts.offers,
            counts.closings,
        ]),
        count: counts.saved,
    },
    {
        label: "Interest",
        href: BUYER_ROUTES.interests,
        icon: Handshake,
        description: "Introductions awaiting a listing office",
        state: stateFor(counts.interests, [
            counts.viewings,
            counts.offers,
            counts.closings,
        ]),
        count: counts.interests,
    },
    {
        label: "Viewings",
        href: BUYER_ROUTES.viewings,
        icon: CalendarDays,
        description: "Upcoming property tours",
        state: stateFor(counts.viewings, [counts.offers, counts.closings]),
        count: counts.viewings,
    },
    {
        label: "Offers",
        href: BUYER_ROUTES.offers,
        icon: FileText,
        description: "Track your submitted offers",
        state: stateFor(counts.offers, [counts.closings]),
        count: counts.offers,
    },
    {
        label: "Closing",
        icon: KeyRound,
        description: "Escrow, title and handover",
        state: stateFor(counts.closings, []),
        count: counts.closings,
    },
];

export const buildBuyerJourney = (
    counts: JourneyCounts,
    status: JourneyStatus,
): BuyerJourney => ({
    label: "Journey",
    stations: buildJourneyStations(counts),
    status,
});

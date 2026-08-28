import type {
    OfferRequestItem,
    RequestBook,
    ViewingRequestItem,
} from "@/lib/types";
import { VIEWING_MODE_BY_API } from "@/lib/utils/status-maps";
import { minutesSince } from "@/lib/utils/elapsed";
import type { ConnectionListItem } from "@/lib/validations/connection-list";

const partyOf = (connection: ConnectionListItem) => ({
    connectionId: connection.id,
    buyerName: connection.buyer.fullName,
    buyerAvatar: connection.buyer.avatar ?? null,
    address: connection.property.address,
    locality: connection.property.locality,
    listPrice: connection.property.price,
});

export const toViewingRequests = (
    connection: ConnectionListItem,
): ViewingRequestItem[] =>
    connection.viewings
        .filter((viewing) => viewing.status === "PENDING")
        .map((viewing) => ({
            ...partyOf(connection),
            kind: "viewing",
            id: viewing.id,
            mode: VIEWING_MODE_BY_API[viewing.mode],
            durationMinutes: viewing.durationMinutes,
            proposedTimes: viewing.proposedTimes,
            minutesAgo: minutesSince(viewing.createdAt),
        }));

export const toOfferRequests = (
    connection: ConnectionListItem,
): OfferRequestItem[] =>
    connection.offers
        .filter((offer) => offer.status === "PENDING")
        .map((offer) => ({
            ...partyOf(connection),
            kind: "offer",
            id: offer.id,
            offeredPrice: offer.offeredPrice,
            offeredTerms: offer.offeredTerms,
            expiresAt: offer.expiresAt,
            minutesAgo: minutesSince(offer.createdAt),
        }));

export const toRequestBook = (
    connections: ConnectionListItem[],
): RequestBook => ({
    viewings: connections.flatMap(toViewingRequests),
    offers: connections.flatMap(toOfferRequests),
});

import type { Offer } from "@/lib/types/offer";
import type { ConnectionListItem } from "@/lib/validations/connection-list";
import { OFFER_STATUS_BY_API } from "@/lib/utils/status-maps";
import { minutesSince } from "@/lib/utils/elapsed";

export const toOffers = (connection: ConnectionListItem): Offer[] =>
    connection.offers.map((offer) => ({
        id: offer.id,
        listingId: connection.propertyId,
        address: connection.property.address,
        locality: connection.property.locality,
        photo: connection.property.images[0]?.url ?? null,
        agent: connection.seller.fullName,
        agentPortrait: connection.seller.avatar ?? null,
        listPrice: connection.property.price,
        offerPrice: offer.offeredPrice,
        counterPrice: offer.responsePrice ?? undefined,
        status: OFFER_STATUS_BY_API[offer.status],
        minutesAgo: minutesSince(offer.createdAt),
        note: offer.responseFeedback ?? offer.offeredTerms,
    }));

export const toOfferBook = (connections: ConnectionListItem[]): Offer[] =>
    connections.flatMap(toOffers);

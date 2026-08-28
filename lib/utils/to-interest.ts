import type { Interest } from "@/lib/types/interest";
import type { ConnectionListItem } from "@/lib/validations/connection-list";
import { CONNECTION_STATUS_BY_API } from "@/lib/utils/status-maps";
import { minutesSince } from "@/lib/utils/elapsed";

export const toInterest = (connection: ConnectionListItem): Interest => ({
    id: connection.id,
    listingId: connection.propertyId,
    address: connection.property.address,
    locality: connection.property.locality,
    photo: connection.property.images[0]?.url ?? null,
    agent: connection.seller.fullName,
    agentPortrait: connection.seller.avatar ?? null,
    agency: connection.seller.agencyName ?? null,
    listPrice: connection.property.price,
    status: CONNECTION_STATUS_BY_API[connection.status],
    minutesAgo: minutesSince(connection.createdAt),
    messages: connection._count.messages,
    viewings: connection._count.viewings,
    offers: connection._count.offers,
});

export const toInterestBook = (connections: ConnectionListItem[]): Interest[] =>
    connections.map(toInterest);

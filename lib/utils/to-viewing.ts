import type { Viewing } from "@/lib/types/viewing";
import type { ConnectionListItem } from "@/lib/validations/connection-list";
import {
    VIEWING_MODE_BY_API,
    VIEWING_STATUS_BY_API,
} from "@/lib/utils/status-maps";

const TIME_FORMAT: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
};

const ISO_DATE_LENGTH = 10;

const scheduledAt = (viewing: {
    confirmedTime: string | null;
    proposedTimes: string[];
}) => viewing.confirmedTime ?? viewing.proposedTimes[0] ?? null;

export const toViewings = (connection: ConnectionListItem): Viewing[] =>
    connection.viewings.flatMap((viewing) => {
        const at = scheduledAt(viewing);
        if (!at) return [];
        const when = new Date(at);

        return [
            {
                id: viewing.id,
                listingId: connection.propertyId,
                address: connection.property.address,
                locality: connection.property.locality,
                photo: connection.property.images[0]?.url ?? null,
                price: connection.property.price,
                date: when.toISOString().slice(0, ISO_DATE_LENGTH),
                time: when.toLocaleTimeString("en-US", TIME_FORMAT),
                durationMinutes: viewing.durationMinutes,
                mode: VIEWING_MODE_BY_API[viewing.mode],
                status: VIEWING_STATUS_BY_API[viewing.status],
                agent: connection.seller.fullName,
                agentPhone: connection.seller.phoneNumber ?? null,
            },
        ];
    });

export const toViewingBook = (connections: ConnectionListItem[]): Viewing[] =>
    connections.flatMap(toViewings);

import type { RescheduleDraft, Viewing } from "@/lib/types/viewing";
import { parseLocalDate } from "@/lib/utils/date-parser";
import type { ConnectionListItem } from "@/lib/validations/connection-list";
import {
    VIEWING_MODE_BY_API,
    VIEWING_STATUS_BY_API,
} from "@/lib/utils/status-maps";
import { formatClock } from "@/lib/utils/format";

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
                time: formatClock(when),
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

const DRAFT_TIME_PATTERN = /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i;
const HOURS_PER_HALF_DAY = 12;

export const draftToIso = (draft: RescheduleDraft) => {
    if (!draft.date) return null;
    const parts = DRAFT_TIME_PATTERN.exec(draft.time.trim());
    if (!parts) return null;

    const hour =
        (Number(parts[1]) % HOURS_PER_HALF_DAY) +
        (parts[3].toUpperCase() === "PM" ? HOURS_PER_HALF_DAY : 0);
    const when = parseLocalDate(draft.date);
    when.setHours(hour, Number(parts[2]), 0, 0);
    return when.toISOString();
};

import { LEAD_STAGES } from "@/lib/config/lead-tones";
import type { ConnectionStatus } from "@/lib/enums/enums";
import type { Lead, LeadStage } from "@/lib/types/lead";
import { minutesSince } from "@/lib/utils/elapsed";
import { formatAge } from "@/lib/utils/format";
import type { ConnectionListItem } from "@/lib/validations/connection-list";

export const LEAD_STAGE_BY_CONNECTION: Record<ConnectionStatus, LeadStage> = {
    PENDING: "pending",
    ACCEPTED: "accepted",
    REJECTED: "declined",
};

export const toLead = (connection: ConnectionListItem): Lead => {
    const stage = LEAD_STAGE_BY_CONNECTION[connection.status];
    const lastTouch =
        connection.contactActivities[0]?.occurredAt ?? connection.updatedAt;

    return {
        id: connection.id,
        name: connection.buyer.fullName,
        portrait: connection.buyer.avatar ?? "",
        email: connection.buyer.email ?? "",
        phone: connection.buyer.phoneNumber ?? "",
        listingPrice: connection.property.price,
        interests: [connection.property.title],
        stage,
        lastContact: formatAge(minutesSince(lastTouch)),
        lastContactMinutes: minutesSince(lastTouch),
        nextAction: LEAD_STAGES[stage].nextAction,
        unread: connection._count.messages,
        offers: connection._count.offers,
        viewings: connection._count.viewings,
    };
};

import type { Conversation, ConversationStatus } from "@/lib/types/message";
import type { ConnectionListItem } from "@/lib/validations/connection-list";
import { initialsOf } from "@/lib/utils/format";
import { minutesSince } from "@/lib/utils/elapsed";

const NO_MESSAGE = "No messages yet";
const UNKNOWN_TITLE = "Listing agent";

const statusOf = (
    connection: ConnectionListItem,
    viewerId: string | undefined,
): ConversationStatus => {
    if (connection.status === "REJECTED") return "closed";
    if (connection.viewings.some((viewing) => viewing.status === "CONFIRMED"))
        return "scheduled";

    const last = connection.messages[0];
    if (!last) return "awaiting-agent";
    return last.senderId === viewerId ? "awaiting-agent" : "awaiting-you";
};

export const toConversation = (
    connection: ConnectionListItem,
    viewerId: string | undefined,
): Conversation => {
    const last = connection.messages[0];

    return {
        id: connection.id,
        agent: connection.seller.fullName,
        agentTitle:
            connection.seller.jobTitle ??
            connection.seller.agencyName ??
            UNKNOWN_TITLE,
        initials: initialsOf(connection.seller.fullName),
        portrait: connection.seller.avatar ?? null,
        listingId: connection.propertyId,
        property: connection.property.address,
        locality: connection.property.locality,
        photo: connection.property.images[0]?.url ?? null,
        price: connection.property.price,
        lastMessage: last?.content ?? NO_MESSAGE,
        minutesAgo: minutesSince(last?.createdAt ?? connection.createdAt),
        unread: connection._count.messages,
        status: statusOf(connection, viewerId),
    };
};

export const toConversationList = (
    connections: ConnectionListItem[],
    viewerId: string | undefined,
): Conversation[] =>
    connections.map((connection) => toConversation(connection, viewerId));

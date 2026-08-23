export type ConversationStatus =
    | "awaiting-you"
    | "awaiting-agent"
    | "scheduled"
    | "closed";

export type MessageSender = "user" | "agent";

export interface Conversation {
    id: string;
    agent: string;
    agentTitle: string;
    initials: string;
    portrait: string | null;
    listingId: string;
    property: string;
    locality: string;
    photo: string | null;
    price: number;
    lastMessage: string;
    minutesAgo: number;
    unread: number;
    status: ConversationStatus;
}

export interface Message {
    id: string;
    senderRole: MessageSender;
    content: string;
    timestamp: string;
    initials: string;
}

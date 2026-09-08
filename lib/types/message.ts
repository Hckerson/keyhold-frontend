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
    phone: string | null;
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

export interface ThreadDocument {
    id: string;
    filename: string;
    url: string;
    mimeType: string;
    sizeBytes: number;
    sharedBy: string;
    sharedAt: string;
}

export interface Message {
    id: string;
    senderRole: MessageSender;
    content: string;
    timestamp: string;
    initials: string;
    documents: ThreadDocument[];
}

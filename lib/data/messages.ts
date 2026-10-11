import {
    CONVERSATION_STATUSES,
    RESPONSE_BANDS,
    RESPONSE_BAND_KEYS,
    type ResponseBand,
} from "@/lib/config/conversation-tones";
import type { Conversation, ConversationFilter } from "@/lib/types";
import { sum } from "@/lib/utils";

export const CONVERSATION_FILTERS: {
    id: ConversationFilter;
    label: string;
}[] = [
    { id: "all", label: "All" },
    { id: "unread", label: "Unread" },
    { id: "awaiting-you", label: "Waiting" },
];

export const COMPOSE_COPY = {
    title: "Start a message",
    hint: "Pick the enquiry you want to write to. Every thread belongs to a property you have registered interest in.",
    emptyTitle: "No enquiries yet",
    emptyLede:
        "Register interest in a listing and the thread with its agent opens here.",
    emptyAction: "Browse listings",
} as const;

export const USER_INITIALS = "JD";
export const DEFAULT_AGENT_INITIALS = "SC";
export const AGENT_REPLY_DELAY = 1500;
export const AGENT_REPLY_CONTENT =
    "Thanks for the update — let me confirm the details and come right back to you.";

export const unreadTotal = (conversations: Conversation[]) =>
    sum(conversations.map((conversation) => conversation.unread));

export const awaitingYou = (conversations: Conversation[]) =>
    conversations.filter(
        (conversation) => conversation.status === "awaiting-you",
    );

export const responseBandOf = (replyMinutes: number): ResponseBand =>
    RESPONSE_BAND_KEYS.find(
        (id) => replyMinutes < RESPONSE_BANDS[id].ceiling,
    ) ?? "slow";

export const matchesConversation = (
    conversation: Conversation,
    filter: ConversationFilter,
    query: string,
) => {
    if (filter === "unread" && conversation.unread === 0) return false;
    if (filter === "awaiting-you" && conversation.status !== "awaiting-you")
        return false;

    const needle = query.trim().toLowerCase();
    if (!needle) return true;
    return [
        conversation.agent,
        conversation.agentTitle,
        conversation.property,
        conversation.locality,
        conversation.lastMessage,
    ].some((field) => field.toLowerCase().includes(needle));
};

export const countByFilter = (
    conversations: Conversation[],
): Record<ConversationFilter, number> => ({
    all: conversations.length,
    unread: conversations.filter((conversation) => conversation.unread > 0)
        .length,
    "awaiting-you": awaitingYou(conversations).length,
});

export const rankConversations = (conversations: Conversation[]) =>
    [...conversations].sort(
        (a, b) =>
            Number(b.unread > 0) - Number(a.unread > 0) ||
            CONVERSATION_STATUSES[b.status].rank -
                CONVERSATION_STATUSES[a.status].rank ||
            a.minutesAgo - b.minutesAgo,
    );

export const readConversation = (
    conversations: Conversation[],
    id: string,
): Conversation[] =>
    conversations.map((conversation) =>
        conversation.id === id ? { ...conversation, unread: 0 } : conversation,
    );

export const applyOutgoing = (
    conversations: Conversation[],
    id: string,
    content: string,
): Conversation[] =>
    conversations.map((conversation) =>
        conversation.id === id
            ? {
                  ...conversation,
                  lastMessage: content,
                  minutesAgo: 0,
                  unread: 0,
                  status: "awaiting-agent",
              }
            : conversation,
    );

export const applyIncoming = (
    conversations: Conversation[],
    id: string,
    content: string,
): Conversation[] =>
    conversations.map((conversation) =>
        conversation.id === id
            ? {
                  ...conversation,
                  lastMessage: content,
                  minutesAgo: 0,
                  status: "awaiting-you",
              }
            : conversation,
    );

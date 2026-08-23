import { MessageSquare, Reply, Timer, Users } from "lucide-react";
import type { ShareDatum } from "@/components/patterns/share-row";
import type { StatDatum } from "@/components/patterns/stat-cell";
import {
    CONVERSATION_STATUSES,
    CONVERSATION_STATUS_KEYS,
    RESPONSE_BANDS,
    RESPONSE_BAND_KEYS,
    type ResponseBand,
} from "@/lib/config/conversation-tones";
import type { Conversation } from "@/lib/types";
import { percentOf, sum } from "@/lib/utils";

export type ConversationFilter = "all" | "unread" | "awaiting-you";

export const CONVERSATION_FILTERS: {
    id: ConversationFilter;
    label: string;
}[] = [
    { id: "all", label: "All" },
    { id: "unread", label: "Unread" },
    { id: "awaiting-you", label: "Waiting" },
];

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

export const messageStats = (conversations: Conversation[]): StatDatum[] => [
    {
        id: "unread",
        icon: MessageSquare,
        label: "Unread",
        value: `${unreadTotal(conversations)}`,
        tone: "accent",
    },
    {
        id: "threads",
        icon: Users,
        label: "Threads",
        value: `${conversations.length}`,
        tone: "info",
    },
    {
        id: "waiting",
        icon: Reply,
        label: "Waiting on you",
        value: `${awaitingYou(conversations).length}`,
        tone: "warning",
    },
    {
        id: "scheduled",
        icon: Timer,
        label: "Scheduled",
        value: `${
            conversations.filter(
                (conversation) => conversation.status === "scheduled",
            ).length
        }`,
        tone: "success",
    },
];

export const statusShares = (conversations: Conversation[]): ShareDatum[] =>
    CONVERSATION_STATUS_KEYS.map((id) => {
        const count = conversations.filter(
            (conversation) => conversation.status === id,
        ).length;
        return {
            id,
            icon: CONVERSATION_STATUSES[id].icon,
            label: CONVERSATION_STATUSES[id].label,
            value: `${count}`,
            percent: percentOf(count, conversations.length),
            tone: CONVERSATION_STATUSES[id].chartTone,
        };
    });

export const messagesSummary = (conversations: Conversation[]) =>
    `${unreadTotal(conversations)} unread · ${awaitingYou(conversations).length} waiting on you`;

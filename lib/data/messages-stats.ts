import { MessageSquare, Reply, Timer, Users } from "lucide-react";
import {
    CONVERSATION_STATUSES,
    CONVERSATION_STATUS_KEYS,
} from "@/lib/config/conversation-tones";
import { awaitingYou, unreadTotal } from "@/lib/data/messages";
import type { Conversation, ShareDatum, StatDatum } from "@/lib/types";
import { percentOf } from "@/lib/utils";

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

import { MessageSquare, Paperclip, Reply, Timer, Users } from "lucide-react";
import { nanoid } from "nanoid";
import type { ShareDatum } from "@/components/patterns/share-row";
import type { StatDatum } from "@/components/patterns/stat-cell";
import {
    CONVERSATION_STATUSES,
    CONVERSATION_STATUS_KEYS,
    RESPONSE_BANDS,
    RESPONSE_BAND_KEYS,
    type ResponseBand,
} from "@/lib/config/conversation-tones";
import { agentPortrait, propertyImage } from "@/lib/data/sample-images";
import type { Conversation, Message, MessageSender } from "@/lib/types";
import { averageOf, formatAge, percentOf, sum } from "@/lib/utils";

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

export const initialConversations: Conversation[] = [
    {
        id: "oak-avenue",
        agent: "Sarah Chen",
        agentTitle: "Senior Agent",
        initials: "SC",
        portrait: agentPortrait(0),
        listingId: "1",
        property: "456 Oak Avenue",
        locality: "Beverly Hills",
        photo: propertyImage(0),
        price: 3_200_000,
        lastMessage:
            "I can arrange the viewing for tomorrow at 2 PM if that works for you.",
        minutesAgo: 24,
        unread: 1,
        status: "awaiting-you",
        responseMinutes: 18,
    },
    {
        id: "sunset-blvd",
        agent: "Michael Rodriguez",
        agentTitle: "Concierge",
        initials: "MR",
        portrait: agentPortrait(1),
        listingId: "2",
        property: "789 Sunset Blvd",
        locality: "West Hollywood",
        photo: propertyImage(1),
        price: 2_950_000,
        lastMessage: "Your offer has been accepted. Congratulations!",
        minutesAgo: 96,
        unread: 2,
        status: "awaiting-you",
        responseMinutes: 42,
    },
    {
        id: "oak-street",
        agent: "Jennifer Martinez",
        agentTitle: "Property Manager",
        initials: "JM",
        portrait: agentPortrait(2),
        listingId: "3",
        property: "234 Oak Street",
        locality: "Bel Air",
        photo: propertyImage(2),
        price: 4_500_000,
        lastMessage:
            "Here are the updated inspection reports for your records.",
        minutesAgo: 1_320,
        unread: 0,
        status: "awaiting-agent",
        responseMinutes: 155,
    },
    {
        id: "palisades-bluff",
        agent: "Daniel Okafor",
        agentTitle: "Listing Agent",
        initials: "DO",
        portrait: agentPortrait(3),
        listingId: "7",
        property: "18 Palisades Bluff",
        locality: "Pacific Palisades",
        photo: propertyImage(6),
        price: 8_400_000,
        lastMessage: "Private tour confirmed for Saturday at 11 AM.",
        minutesAgo: 210,
        unread: 0,
        status: "scheduled",
        responseMinutes: 26,
    },
    {
        id: "montana-row",
        agent: "Priya Raman",
        agentTitle: "Buyer's Agent",
        initials: "PR",
        portrait: agentPortrait(0),
        listingId: "8",
        property: "301 Montana Row",
        locality: "Santa Monica",
        photo: propertyImage(7),
        price: 3_950_000,
        lastMessage: "Sending the comparable sales for Montana Row shortly.",
        minutesAgo: 2_760,
        unread: 0,
        status: "awaiting-agent",
        responseMinutes: 205,
    },
    {
        id: "beverly-grove",
        agent: "Alicia Moreau",
        agentTitle: "Closing Coordinator",
        initials: "AM",
        portrait: agentPortrait(1),
        listingId: "5",
        property: "890 Beverly Grove",
        locality: "Los Angeles",
        photo: propertyImage(4),
        price: 2_400_000,
        lastMessage: "Keys collected and the file is closed. A pleasure.",
        minutesAgo: 5_760,
        unread: 0,
        status: "closed",
        responseMinutes: 64,
    },
];

export const initialThreads: Record<string, Message[]> = {
    "oak-avenue": [
        {
            id: "oak-avenue-1",
            senderRole: "agent",
            content:
                "Hello! I saw your interest in 456 Oak Avenue. Would you like to schedule a viewing?",
            timestamp: "10:30 AM",
            initials: "SC",
        },
        {
            id: "oak-avenue-2",
            senderRole: "user",
            content: "Yes, I would love to see it. What times are available?",
            timestamp: "10:45 AM",
            initials: USER_INITIALS,
        },
        {
            id: "oak-avenue-3",
            senderRole: "agent",
            content:
                "I can arrange the viewing for tomorrow at 2 PM if that works for you. The gardens are worth the early start.",
            timestamp: "11:02 AM",
            initials: "SC",
            attachments: ["oak-avenue-floorplan.pdf"],
        },
    ],
    "sunset-blvd": [
        {
            id: "sunset-blvd-1",
            senderRole: "user",
            content:
                "Any word from the seller on 789 Sunset Blvd? We submitted at asking.",
            timestamp: "8:12 AM",
            initials: USER_INITIALS,
        },
        {
            id: "sunset-blvd-2",
            senderRole: "agent",
            content:
                "Just heard back. Your offer has been accepted. Congratulations!",
            timestamp: "9:40 AM",
            initials: "MR",
        },
        {
            id: "sunset-blvd-3",
            senderRole: "agent",
            content:
                "I am sending the signed acceptance and the escrow instructions now.",
            timestamp: "9:41 AM",
            initials: "MR",
            attachments: [
                "acceptance-789-sunset.pdf",
                "escrow-instructions.pdf",
            ],
        },
    ],
    "oak-street": [
        {
            id: "oak-street-1",
            senderRole: "agent",
            content:
                "The inspection on 234 Oak Street wrapped up this morning.",
            timestamp: "2:15 PM",
            initials: "JM",
        },
        {
            id: "oak-street-2",
            senderRole: "agent",
            content:
                "Here are the updated inspection reports for your records.",
            timestamp: "2:16 PM",
            initials: "JM",
            attachments: ["inspection-report.pdf", "roof-addendum.pdf"],
        },
    ],
    "palisades-bluff": [
        {
            id: "palisades-bluff-1",
            senderRole: "user",
            content:
                "Could we see the bluff house before the weekend open house?",
            timestamp: "4:02 PM",
            initials: USER_INITIALS,
        },
        {
            id: "palisades-bluff-2",
            senderRole: "agent",
            content: "Private tour confirmed for Saturday at 11 AM.",
            timestamp: "4:28 PM",
            initials: "DO",
        },
    ],
    "montana-row": [
        {
            id: "montana-row-1",
            senderRole: "user",
            content: "How does Montana Row compare on price per square foot?",
            timestamp: "1:05 PM",
            initials: USER_INITIALS,
        },
        {
            id: "montana-row-2",
            senderRole: "agent",
            content: "Sending the comparable sales for Montana Row shortly.",
            timestamp: "1:31 PM",
            initials: "PR",
        },
    ],
    "beverly-grove": [
        {
            id: "beverly-grove-1",
            senderRole: "agent",
            content: "Keys collected and the file is closed. A pleasure.",
            timestamp: "11:20 AM",
            initials: "AM",
            attachments: ["closing-statement.pdf"],
        },
    ],
};

export const clockTime = () =>
    new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
    });

export const createMessage = (
    senderRole: MessageSender,
    content: string,
    initials: string,
    attachments?: string[],
): Message => ({
    id: nanoid(),
    senderRole,
    content,
    timestamp: clockTime(),
    initials,
    attachments:
        attachments && attachments.length > 0 ? attachments : undefined,
});

export const unreadTotal = (conversations: Conversation[]) =>
    sum(conversations.map((conversation) => conversation.unread));

export const awaitingYou = (conversations: Conversation[]) =>
    conversations.filter(
        (conversation) => conversation.status === "awaiting-you",
    );

export const responseBandOf = (conversation: Conversation): ResponseBand =>
    RESPONSE_BAND_KEYS.find(
        (id) => conversation.responseMinutes < RESPONSE_BANDS[id].ceiling,
    ) ?? "slow";

export const threadFiles = (messages: Message[]) =>
    messages.flatMap((message) => message.attachments ?? []);

export const fileExtension = (name: string) =>
    name.split(".").pop()?.toUpperCase() ?? "FILE";

export const fileTotal = (threads: Record<string, Message[]>) =>
    sum(Object.values(threads).map((messages) => threadFiles(messages).length));

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

export const messageStats = (
    conversations: Conversation[],
    threads: Record<string, Message[]>,
): StatDatum[] => [
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
        id: "reply",
        icon: Timer,
        label: "Median reply",
        value: formatAge(
            Math.round(
                averageOf(
                    conversations.map(
                        (conversation) => conversation.responseMinutes,
                    ),
                ),
            ),
        ),
        tone: "success",
    },
    {
        id: "files",
        icon: Paperclip,
        label: "Files",
        value: `${fileTotal(threads)}`,
        tone: "highlight",
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

export const responseShares = (conversations: Conversation[]): ShareDatum[] =>
    RESPONSE_BAND_KEYS.map((id) => {
        const count = conversations.filter(
            (conversation) => responseBandOf(conversation) === id,
        ).length;
        return {
            id,
            icon: RESPONSE_BANDS[id].icon,
            label: RESPONSE_BANDS[id].label,
            value: `${count}`,
            percent: percentOf(count, conversations.length),
            tone: RESPONSE_BANDS[id].tone,
        };
    });

export const messagesSummary = (conversations: Conversation[]) =>
    `${unreadTotal(conversations)} unread · ${awaitingYou(conversations).length} waiting on you`;

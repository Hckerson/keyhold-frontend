export interface Conversation {
    id: string;
    agent: string;
    agentTitle: string;
    avatar: string;
    lastMessage: string;
    lastMessageTime: string;
    unread: number;
}

export interface Message {
    id: string;
    senderRole: "user" | "agent";
    content: string;
    timestamp: string;
    avatar: string;
    attachments?: string[];
}

export const USER_AVATAR = "JD";
export const DEFAULT_AGENT_AVATAR = "SC";
export const AGENT_REPLY_DELAY = 1500;
export const AGENT_REPLY_CONTENT =
    "Thanks for the update — let me confirm the details and come right back to you.";

export const initialConversations: Conversation[] = [
    {
        id: "1",
        agent: "Sarah Chen",
        agentTitle: "Senior Real Estate Agent",
        avatar: "SC",
        lastMessage:
            "I can arrange the viewing for tomorrow at 2 PM if that works for you",
        lastMessageTime: "2 hours ago",
        unread: 1,
    },
    {
        id: "2",
        agent: "Michael Rodriguez",
        agentTitle: "Real Estate Concierge",
        avatar: "MR",
        lastMessage: "Your offer has been accepted! Congratulations!",
        lastMessageTime: "5 hours ago",
        unread: 2,
    },
    {
        id: "3",
        agent: "Jennifer Martinez",
        agentTitle: "Property Manager",
        avatar: "JM",
        lastMessage: "Here are the updated inspection reports...",
        lastMessageTime: "1 day ago",
        unread: 0,
    },
];

export const initialThreads: Record<string, Message[]> = {
    "1": [
        {
            id: "1-1",
            senderRole: "agent",
            content:
                "Hello! I saw your interest in 456 Oak Avenue. Would you like to schedule a viewing?",
            timestamp: "10:30 AM",
            avatar: "SC",
        },
        {
            id: "1-2",
            senderRole: "user",
            content: "Yes, I would love to see it! What times are available?",
            timestamp: "10:45 AM",
            avatar: USER_AVATAR,
        },
        {
            id: "1-3",
            senderRole: "agent",
            content:
                "I can arrange the viewing for tomorrow at 2 PM if that works for you. The property is absolutely stunning!",
            timestamp: "11:02 AM",
            avatar: "SC",
        },
    ],
    "2": [
        {
            id: "2-1",
            senderRole: "user",
            content:
                "Any word from the seller on 789 Sunset Blvd? We submitted at asking.",
            timestamp: "8:12 AM",
            avatar: USER_AVATAR,
        },
        {
            id: "2-2",
            senderRole: "agent",
            content:
                "Just heard back. Your offer has been accepted! Congratulations!",
            timestamp: "9:40 AM",
            avatar: "MR",
        },
        {
            id: "2-3",
            senderRole: "agent",
            content:
                "I am sending the signed acceptance and the escrow instructions now.",
            timestamp: "9:41 AM",
            avatar: "MR",
            attachments: ["acceptance-789-sunset.pdf"],
        },
    ],
    "3": [
        {
            id: "3-1",
            senderRole: "agent",
            content:
                "The inspection on 234 Oak Street wrapped up this morning.",
            timestamp: "2:15 PM",
            avatar: "JM",
        },
        {
            id: "3-2",
            senderRole: "agent",
            content:
                "Here are the updated inspection reports for your records.",
            timestamp: "2:16 PM",
            avatar: "JM",
            attachments: ["inspection-report.pdf", "roof-addendum.pdf"],
        },
    ],
};

export const clockTime = () =>
    new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
    });

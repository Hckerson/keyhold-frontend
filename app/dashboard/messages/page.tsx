"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { ConversationList } from "@/components/features/messaging/conversation-list";
import { MessageThread } from "@/components/features/messaging/message-thread";
import {
    AGENT_REPLY_CONTENT,
    AGENT_REPLY_DELAY,
    DEFAULT_AGENT_AVATAR,
    USER_AVATAR,
    clockTime,
    initialConversations,
    initialThreads,
    type Conversation,
    type Message,
} from "@/lib/data/messages";

export default function MessagesPage() {
    const [conversations, setConversations] =
        useState<Conversation[]>(initialConversations);
    const [threads, setThreads] =
        useState<Record<string, Message[]>>(initialThreads);
    const [selectedId, setSelectedId] = useState("1");
    const [query, setQuery] = useState("");
    const [typingId, setTypingId] = useState<string | null>(null);
    const replyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(
        () => () => {
            if (replyTimer.current) clearTimeout(replyTimer.current);
        },
        [],
    );

    const filtered = useMemo(() => {
        const needle = query.trim().toLowerCase();
        if (!needle) return conversations;
        return conversations.filter((conversation) =>
            [
                conversation.agent,
                conversation.agentTitle,
                conversation.lastMessage,
            ].some((field) => field.toLowerCase().includes(needle)),
        );
    }, [conversations, query]);

    const selected = conversations.find(
        (conversation) => conversation.id === selectedId,
    );
    const messages = threads[selectedId] ?? [];
    const unreadTotal = conversations.reduce(
        (total, conversation) => total + conversation.unread,
        0,
    );

    const appendMessage = (conversationId: string, message: Message) => {
        setThreads((prev) => ({
            ...prev,
            [conversationId]: [...(prev[conversationId] ?? []), message],
        }));
    };

    const updateConversation = (
        conversationId: string,
        patch: Partial<Conversation>,
    ) => {
        setConversations((prev) =>
            prev.map((conversation) =>
                conversation.id === conversationId
                    ? { ...conversation, ...patch }
                    : conversation,
            ),
        );
    };

    const selectConversation = (id: string) => {
        setSelectedId(id);
        updateConversation(id, { unread: 0 });
    };

    const send = (content: string, attachments: string[]) => {
        const conversationId = selectedId;
        appendMessage(conversationId, {
            id: `${conversationId}-u-${Date.now()}`,
            senderRole: "user",
            content,
            timestamp: clockTime(),
            avatar: USER_AVATAR,
            attachments: attachments.length > 0 ? attachments : undefined,
        });
        updateConversation(conversationId, {
            lastMessage: content,
            lastMessageTime: "just now",
            unread: 0,
        });

        setTypingId(conversationId);
        if (replyTimer.current) clearTimeout(replyTimer.current);
        replyTimer.current = setTimeout(() => {
            const agent = initialConversations.find(
                (conversation) => conversation.id === conversationId,
            );
            appendMessage(conversationId, {
                id: `${conversationId}-a-${Date.now()}`,
                senderRole: "agent",
                content: AGENT_REPLY_CONTENT,
                timestamp: clockTime(),
                avatar: agent?.avatar ?? DEFAULT_AGENT_AVATAR,
            });
            updateConversation(conversationId, {
                lastMessage: AGENT_REPLY_CONTENT,
                lastMessageTime: "just now",
            });
            setTypingId(null);
        }, AGENT_REPLY_DELAY);
    };

    return (
        <div className="space-y-3">
            <PageHeader
                title="Messages"
                description={`${unreadTotal} unread message${
                    unreadTotal !== 1 ? "s" : ""
                }`}
            />

            <div className="grid grid-cols-1 gap-3 lg:h-150 lg:grid-cols-3">
                <ConversationList
                    items={filtered}
                    selectedId={selectedId}
                    query={query}
                    onQueryChange={setQuery}
                    onSelect={selectConversation}
                    className="lg:col-span-1"
                />
                <MessageThread
                    conversation={selected}
                    messages={messages}
                    typing={typingId === selectedId}
                    onSend={send}
                    className="lg:col-span-2"
                />
            </div>
        </div>
    );
}

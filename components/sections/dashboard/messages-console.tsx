"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ConversationRail } from "@/components/sections/dashboard/conversation-rail";
import { MessagesHeader } from "@/components/sections/dashboard/messages-header";
import { MessagesStatBand } from "@/components/sections/dashboard/messages-stat-band";
import { ThreadContextRail } from "@/components/sections/dashboard/thread-context-rail";
import { ThreadPanel } from "@/components/sections/dashboard/thread-panel";
import {
    AGENT_REPLY_CONTENT,
    AGENT_REPLY_DELAY,
    DEFAULT_AGENT_INITIALS,
    USER_INITIALS,
    applyIncoming,
    applyOutgoing,
    countByFilter,
    createMessage,
    initialConversations,
    initialThreads,
    matchesConversation,
    messageStats,
    messagesSummary,
    rankConversations,
    readConversation,
    threadFiles,
    type ConversationFilter,
} from "@/lib/data/messages";
import type { Message } from "@/lib/types";

export function MessagesConsole() {
    const [conversations, setConversations] = useState(initialConversations);
    const [threads, setThreads] =
        useState<Record<string, Message[]>>(initialThreads);
    const [selectedId, setSelectedId] = useState(initialConversations[0].id);
    const [query, setQuery] = useState("");
    const [filter, setFilter] = useState<ConversationFilter>("all");
    const [typingId, setTypingId] = useState<string | null>(null);
    const replyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(
        () => () => {
            if (replyTimer.current) clearTimeout(replyTimer.current);
        },
        [],
    );

    const ranked = useMemo(
        () => rankConversations(conversations),
        [conversations],
    );
    const counts = useMemo(() => countByFilter(conversations), [conversations]);
    const stats = useMemo(
        () => messageStats(conversations, threads),
        [conversations, threads],
    );

    const visible = useMemo(
        () =>
            ranked.filter((conversation) =>
                matchesConversation(conversation, filter, query),
            ),
        [ranked, filter, query],
    );

    const selected = conversations.find(
        (conversation) => conversation.id === selectedId,
    );
    const messages = useMemo(
        () => threads[selectedId] ?? [],
        [threads, selectedId],
    );
    const files = useMemo(() => threadFiles(messages), [messages]);

    const appendMessage = useCallback((id: string, message: Message) => {
        setThreads((current) => ({
            ...current,
            [id]: [...(current[id] ?? []), message],
        }));
    }, []);

    const onSelect = useCallback((id: string) => {
        setSelectedId(id);
        setConversations((current) => readConversation(current, id));
    }, []);

    const onSend = useCallback(
        (content: string, attachments: string[]) => {
            const id = selectedId;
            const initials =
                conversations.find((conversation) => conversation.id === id)
                    ?.initials ?? DEFAULT_AGENT_INITIALS;

            appendMessage(
                id,
                createMessage("user", content, USER_INITIALS, attachments),
            );
            setConversations((current) => applyOutgoing(current, id, content));

            setTypingId(id);
            if (replyTimer.current) clearTimeout(replyTimer.current);
            replyTimer.current = setTimeout(() => {
                appendMessage(
                    id,
                    createMessage("agent", AGENT_REPLY_CONTENT, initials),
                );
                setConversations((current) =>
                    applyIncoming(current, id, AGENT_REPLY_CONTENT),
                );
                setTypingId(null);
            }, AGENT_REPLY_DELAY);
        },
        [appendMessage, conversations, selectedId],
    );

    return (
        <div className="flex flex-col gap-4">
            <MessagesHeader summary={messagesSummary(conversations)} />

            <MessagesStatBand stats={stats} />

            <div className="console-split console-split--quarters gap-3 lg:h-150">
                <ConversationRail
                    conversations={visible}
                    selectedId={selectedId}
                    query={query}
                    filter={filter}
                    counts={counts}
                    onQueryChange={setQuery}
                    onFilterChange={setFilter}
                    onSelect={onSelect}
                />
                <ThreadPanel
                    conversation={selected}
                    messages={messages}
                    typing={typingId === selectedId}
                    onSend={onSend}
                />
                <ThreadContextRail
                    conversation={selected}
                    conversations={conversations}
                    files={files}
                />
            </div>
        </div>
    );
}

MessagesConsole.displayName = "MessagesConsole";

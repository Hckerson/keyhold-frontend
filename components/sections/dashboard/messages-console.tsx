"use client";

import { useCallback, useMemo, useState } from "react";
import { ConversationRail } from "@/components/sections/dashboard/conversation-rail";
import { MessagesHeader } from "@/components/sections/dashboard/messages-header";
import { MessagesStatBand } from "@/components/sections/dashboard/messages-stat-band";
import { ThreadContextRail } from "@/components/sections/dashboard/thread-context-rail";
import { ThreadPanel } from "@/components/sections/dashboard/thread-panel";
import { ConsoleUnavailable } from "@/components/patterns/console-unavailable";
import { CONSOLE_FALLBACKS } from "@/lib/config/console-fallbacks";
import {
    countByFilter,
    matchesConversation,
    messageStats,
    messagesSummary,
    rankConversations,
    type ConversationFilter,
} from "@/lib/data/messages";
import { useMyInterests } from "@/lib/hooks/use-connections";
import { useConversation, useSendMessage } from "@/lib/hooks/use-messages";
import { useSession } from "@/lib/hooks/use-session";
import { toConversationList } from "@/lib/utils/to-conversation";
import { medianReplyMinutes, toThread } from "@/lib/utils/to-thread";

export function MessagesConsole() {
    const { user } = useSession();
    const interests = useMyInterests();
    const sendMessage = useSendMessage();

    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [query, setQuery] = useState("");
    const [filter, setFilter] = useState<ConversationFilter>("all");

    const conversations = useMemo(
        () => toConversationList(interests.data ?? [], user?.id),
        [interests.data, user?.id],
    );

    const ranked = useMemo(
        () => rankConversations(conversations),
        [conversations],
    );
    const counts = useMemo(() => countByFilter(conversations), [conversations]);
    const stats = useMemo(() => messageStats(conversations), [conversations]);

    const visible = useMemo(
        () =>
            ranked.filter((conversation) =>
                matchesConversation(conversation, filter, query),
            ),
        [ranked, filter, query],
    );

    const activeId = selectedId ?? ranked[0]?.id;
    const selected = conversations.find(
        (conversation) => conversation.id === activeId,
    );

    const thread = useConversation(activeId);

    const messages = useMemo(
        () => toThread(thread.data ?? [], user?.id, selected?.agent ?? ""),
        [thread.data, user?.id, selected?.agent],
    );

    const replyMinutes = useMemo(
        () => medianReplyMinutes(thread.data ?? [], user?.id),
        [thread.data, user?.id],
    );

    const onSelect = useCallback((id: string) => setSelectedId(id), []);

    const onSend = useCallback(
        (content: string) => {
            if (!activeId) return;
            void sendMessage.mutateAsync({ connectionId: activeId, content });
        },
        [activeId, sendMessage],
    );

    if (interests.isError)
        return (
            <ConsoleUnavailable
                fallback={CONSOLE_FALLBACKS.buyerMessages}
                onRetry={() => void interests.refetch()}
            />
        );

    return (
        <div className="flex flex-col gap-4">
            <MessagesHeader summary={messagesSummary(conversations)} />

            <MessagesStatBand stats={stats} />

            <div className="console-split console-split--quarters console-split--tall gap-3">
                <ConversationRail
                    conversations={visible}
                    selectedId={activeId}
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
                    typing={sendMessage.isPending}
                    onSend={onSend}
                />
                <ThreadContextRail
                    conversation={selected}
                    conversations={conversations}
                    replyMinutes={replyMinutes}
                />
            </div>
        </div>
    );
}

MessagesConsole.displayName = "MessagesConsole";

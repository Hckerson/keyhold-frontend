"use client";

import { ConversationItem } from "@/components/features/messaging/conversation-item";
import type { Conversation } from "@/lib/types";

const LIST_LABEL = "Conversations";

export interface ConversationListProps {
    conversations: Conversation[];
    selectedId: string;
    onSelect: (id: string) => void;
}

export function ConversationList({
    conversations,
    selectedId,
    onSelect,
}: ConversationListProps) {
    return (
        <ul aria-label={LIST_LABEL} className="divide-border divide-y">
            {conversations.map((conversation) => (
                <ConversationItem
                    key={conversation.id}
                    conversation={conversation}
                    active={conversation.id === selectedId}
                    onSelect={onSelect}
                />
            ))}
        </ul>
    );
}

ConversationList.displayName = "ConversationList";

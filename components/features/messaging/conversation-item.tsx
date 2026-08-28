"use client";

import { Avatar } from "@/components/ui/avatar";
import { StatusDot } from "@/components/patterns/status-dot";
import { ConversationUnreadPill } from "@/components/features/messaging/conversation-unread-pill";
import { CONVERSATION_STATUSES } from "@/lib/config/conversation-tones";
import type { Conversation } from "@/lib/types";
import { cn, formatAge } from "@/lib/utils";

export interface ConversationItemProps {
    conversation: Conversation;
    active: boolean;
    onSelect: (id: string) => void;
}

export function ConversationItem({
    conversation,
    active,
    onSelect,
}: ConversationItemProps) {
    const status = CONVERSATION_STATUSES[conversation.status];

    return (
        <li>
            <button
                type="button"
                aria-current={active ? "true" : undefined}
                onClick={() => onSelect(conversation.id)}
                className={cn(
                    "ease-smooth focus-visible:ring-accent flex h-11 w-full items-center gap-2 px-3 text-left transition-colors duration-200 focus-visible:ring-2 focus-visible:-outline-offset-2 focus-visible:outline-none",
                    active ? "bg-accent-light/50" : "hover:bg-background-alt",
                )}
            >
                <StatusDot tone={status.tone} />
                <Avatar
                    size="sm"
                    tone="accent"
                    elevated={false}
                    src={conversation.portrait ?? undefined}
                    alt={conversation.agent}
                    initials={conversation.initials}
                />
                <span className="min-w-0 flex-1 truncate text-xs">
                    <span className="text-text font-medium">
                        {conversation.agent}
                    </span>
                    <span className="text-text-muted">
                        {" · "}
                        {conversation.lastMessage}
                    </span>
                </span>
                <ConversationUnreadPill count={conversation.unread} />
                <span className="text-text-muted shrink-0 text-xs tabular-nums">
                    {formatAge(conversation.minutesAgo)}
                </span>
            </button>
        </li>
    );
}

ConversationItem.displayName = "ConversationItem";

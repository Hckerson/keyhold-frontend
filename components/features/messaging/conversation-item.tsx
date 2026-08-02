"use client";

import { Avatar } from "@/components/ui/avatar";
import type { Conversation } from "@/lib/data/messages";
import { cn } from "@/lib/utils";

export interface ConversationItemProps {
    conversation: Conversation;
    active: boolean;
    onClick: () => void;
}

export function ConversationItem({
    conversation,
    active,
    onClick,
}: ConversationItemProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-current={active ? "true" : undefined}
            className={cn(
                "border-border-light ease-smooth w-full border-b px-3 py-2.5 text-left transition-colors",
                active ? "bg-accent-light/50" : "hover:bg-background-alt",
            )}
        >
            <div className="flex items-start gap-3">
                <Avatar
                    size="sm"
                    tone="accent"
                    elevated={false}
                    initials={conversation.avatar}
                />
                <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                        <p className="text-text truncate text-xs font-medium">
                            {conversation.agent}
                        </p>
                        {conversation.unread > 0 && (
                            <span className="bg-highlight text-text-inverse grid h-4 min-w-4 shrink-0 place-items-center rounded-full px-1 font-mono text-[10px] font-semibold tabular-nums">
                                {conversation.unread}
                            </span>
                        )}
                    </div>
                    <p className="text-text-muted truncate text-xs">
                        {conversation.agentTitle}
                    </p>
                    <p className="text-text-secondary mt-1 line-clamp-1 text-xs">
                        {conversation.lastMessage}
                    </p>
                    <p className="text-text-muted mt-1 text-xs">
                        {conversation.lastMessageTime}
                    </p>
                </div>
            </div>
        </button>
    );
}

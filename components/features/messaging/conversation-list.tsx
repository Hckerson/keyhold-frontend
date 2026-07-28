"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/forms/input";
import { ConversationItem } from "@/components/features/messaging/conversation-item";
import type { Conversation } from "@/lib/data/messages";
import { cn } from "@/lib/utils";

export interface ConversationListProps {
    items: Conversation[];
    selectedId: string;
    query: string;
    onQueryChange: (value: string) => void;
    onSelect: (id: string) => void;
    className?: string;
}

export function ConversationList({
    items,
    selectedId,
    query,
    onQueryChange,
    onSelect,
    className,
}: ConversationListProps) {
    return (
        <section
            className={cn(
                "bg-background-muted border-border-light flex flex-col overflow-hidden rounded-xl border shadow-sm lg:h-full",
                className,
            )}
        >
            <div className="border-border-light space-y-2 border-b px-3 py-2.5">
                <h2 className="text-text text-xs font-medium">Conversations</h2>
                <Input
                    id="conversation-search"
                    type="search"
                    value={query}
                    onChange={(event) => onQueryChange(event.target.value)}
                    placeholder="Search conversations"
                    aria-label="Search conversations"
                    endSlot={
                        <Search
                            size={12}
                            strokeWidth={1.5}
                            className="text-text-muted"
                        />
                    }
                />
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto">
                {items.length > 0 ? (
                    items.map((conversation) => (
                        <ConversationItem
                            key={conversation.id}
                            conversation={conversation}
                            active={conversation.id === selectedId}
                            onClick={() => onSelect(conversation.id)}
                        />
                    ))
                ) : (
                    <p className="text-text-secondary p-3 text-xs">
                        No conversations match “{query}”.
                    </p>
                )}
            </div>
        </section>
    );
}

"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/forms/input";
import { FilterPills } from "@/components/patterns/filter-pills";
import { ConversationList } from "@/components/features/messaging/conversation-list";
import {
    CONVERSATION_FILTERS,
    type ConversationFilter,
} from "@/lib/data/messages";
import type { Conversation } from "@/lib/types";

const SEARCH_LABEL = "Search conversations";
const SEARCH_PLACEHOLDER = "Search agents, properties, messages";
const EMPTY_LEDE = "No conversations match this filter.";

export interface ConversationRailProps {
    conversations: Conversation[];
    selectedId: string;
    query: string;
    filter: ConversationFilter;
    counts: Record<ConversationFilter, number>;
    onQueryChange: (value: string) => void;
    onFilterChange: (filter: ConversationFilter) => void;
    onSelect: (id: string) => void;
}

export function ConversationRail({
    conversations,
    selectedId,
    query,
    filter,
    counts,
    onQueryChange,
    onFilterChange,
    onSelect,
}: ConversationRailProps) {
    return (
        <section className="bg-background-muted border-border-light flex flex-col overflow-hidden rounded-xl border shadow-sm">
            <div className="border-border-light shrink-0 border-b px-3 py-2.5">
                <Input
                    id="conversation-search"
                    type="search"
                    value={query}
                    onChange={(event) => onQueryChange(event.target.value)}
                    placeholder={SEARCH_PLACEHOLDER}
                    aria-label={SEARCH_LABEL}
                    endSlot={
                        <Search
                            className="text-text-muted size-3"
                            strokeWidth={1.5}
                            aria-hidden="true"
                        />
                    }
                />
                <FilterPills<ConversationFilter>
                    filters={CONVERSATION_FILTERS}
                    active={filter}
                    onChange={onFilterChange}
                    counts={counts}
                    className="mt-2"
                />
            </div>

            <div className="scroll-y min-h-0 flex-1">
                {conversations.length > 0 ? (
                    <ConversationList
                        conversations={conversations}
                        selectedId={selectedId}
                        onSelect={onSelect}
                    />
                ) : (
                    <p className="text-text-secondary p-3 text-xs">
                        {EMPTY_LEDE}
                    </p>
                )}
            </div>
        </section>
    );
}

ConversationRail.displayName = "ConversationRail";

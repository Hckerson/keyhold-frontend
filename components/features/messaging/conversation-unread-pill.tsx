export interface ConversationUnreadPillProps {
    count: number;
}

export function ConversationUnreadPill({ count }: ConversationUnreadPillProps) {
    if (count === 0) return null;

    return (
        <span className="bg-highlight text-text-inverse grid h-4 min-w-4 shrink-0 place-items-center rounded-full px-1 font-mono text-[10px] font-semibold tabular-nums">
            {count}
        </span>
    );
}

ConversationUnreadPill.displayName = "ConversationUnreadPill";

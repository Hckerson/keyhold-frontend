import { StatusDot } from "@/components/patterns/status-dot";
import { CONVERSATION_STATUSES } from "@/lib/config/conversation-tones";
import { cn } from "@/lib/utils";
import type { ConversationStatus } from "@/lib/types";

export interface ConversationStatusMarkProps {
    status: ConversationStatus;
    className?: string;
}

export function ConversationStatusMark({
    status,
    className,
}: ConversationStatusMarkProps) {
    const { tone, label } = CONVERSATION_STATUSES[status];

    return (
        <span className={cn("flex min-w-0 items-center gap-1.5", className)}>
            <StatusDot tone={tone} />
            <span className="text-text-secondary min-w-0 truncate text-xs">
                {label}
            </span>
        </span>
    );
}

ConversationStatusMark.displayName = "ConversationStatusMark";

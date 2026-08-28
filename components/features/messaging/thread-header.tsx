import { Phone } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ConversationStatusMark } from "@/components/features/messaging/conversation-status-mark";
import type { Conversation } from "@/lib/types";
import { formatAge } from "@/lib/utils";

const CALL_ACTION = "Call";
const LAST_SUFFIX = "since last reply";

export interface ThreadHeaderProps {
    conversation: Conversation;
}

export function ThreadHeader({ conversation }: ThreadHeaderProps) {
    return (
        <header className="border-border-light flex h-11 shrink-0 items-center justify-between gap-3 border-b px-3">
            <div className="flex min-w-0 items-center gap-2">
                <Avatar
                    size="sm"
                    tone="accent"
                    elevated={false}
                    src={conversation.portrait ?? undefined}
                    alt={conversation.agent}
                    initials={conversation.initials}
                />
                <span className="min-w-0 truncate text-xs">
                    <span className="text-text font-semibold">
                        {conversation.agent}
                    </span>
                    <span className="text-text-muted">
                        {" · "}
                        {conversation.agentTitle}
                    </span>
                </span>
                <ConversationStatusMark
                    status={conversation.status}
                    className="wide-only-flex shrink-0"
                />
            </div>

            <div className="flex shrink-0 items-center gap-2">
                <p className="micro-label reading-only">
                    {formatAge(conversation.minutesAgo)} {LAST_SUFFIX}
                </p>
                <Button type="button" variant="secondary" size="sm">
                    <Phone
                        className="mr-1.5 size-3"
                        strokeWidth={1.5}
                        aria-hidden="true"
                    />
                    {CALL_ACTION}
                </Button>
            </div>
        </header>
    );
}

ThreadHeader.displayName = "ThreadHeader";

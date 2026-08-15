import { Avatar } from "@/components/ui/avatar";
import { ProgressBar } from "@/components/ui/progress-bar";
import { MetricCell } from "@/components/patterns/metric-cell";
import { ConversationStatusMark } from "@/components/features/messaging/conversation-status-mark";
import {
    RESPONSE_BANDS,
    responsePercent,
} from "@/lib/config/conversation-tones";
import { responseBandOf } from "@/lib/data/messages";
import type { Conversation } from "@/lib/types";
import { formatAge } from "@/lib/utils";

const STATUS_LABEL = "Thread state";
const REPLY_LABEL = "Median reply";

export interface ThreadAgentCardProps {
    conversation: Conversation;
}

export function ThreadAgentCard({ conversation }: ThreadAgentCardProps) {
    const band = RESPONSE_BANDS[responseBandOf(conversation)];

    return (
        <div className="flex flex-col gap-3 py-3">
            <div className="flex min-w-0 items-center gap-2">
                <Avatar
                    size="sm"
                    elevated={false}
                    src={conversation.portrait}
                    alt={conversation.agent}
                    initials={conversation.initials}
                />
                <div className="min-w-0">
                    <p className="text-text truncate text-xs font-medium">
                        {conversation.agent}
                    </p>
                    <p className="text-text-muted truncate text-xs">
                        {conversation.agentTitle}
                    </p>
                </div>
            </div>

            <div className="bg-background-muted border-border-light grid grid-cols-2 gap-3 rounded-md border p-3">
                <MetricCell label={STATUS_LABEL}>
                    <ConversationStatusMark status={conversation.status} />
                </MetricCell>
                <MetricCell label={REPLY_LABEL}>
                    <span className="flex items-center gap-1.5">
                        <ProgressBar
                            value={responsePercent(
                                conversation.responseMinutes,
                            )}
                            tone={band.tone}
                            className="w-10 shrink-0"
                        />
                        <span className="text-text-secondary shrink-0 tabular-nums">
                            {formatAge(conversation.responseMinutes)}
                        </span>
                    </span>
                </MetricCell>
            </div>
        </div>
    );
}

ThreadAgentCard.displayName = "ThreadAgentCard";

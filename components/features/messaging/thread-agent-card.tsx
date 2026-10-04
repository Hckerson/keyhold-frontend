import { Avatar } from "@/components/ui/avatar";
import { MetricCell } from "@/components/patterns/metric-cell";
import { ConversationStatusMark } from "@/components/features/messaging/conversation-status-mark";
import { chartToneText } from "@/lib/config/chart-tones";
import { RESPONSE_BANDS } from "@/lib/config/conversation-tones";
import { responseBandOf } from "@/lib/data/messages";
import type { Conversation } from "@/lib/types";
import { cn, formatAge } from "@/lib/utils";

const STATUS_LABEL = "Thread state";
const REPLY_LABEL = "Median reply";

const NO_REPLY = "—";

export interface ThreadAgentCardProps {
    conversation: Conversation;
    replyMinutes: number | null;
}

export function ThreadAgentCard({
    conversation,
    replyMinutes,
}: ThreadAgentCardProps) {
    const band = RESPONSE_BANDS[responseBandOf(replyMinutes ?? Infinity)];

    return (
        <div className="flex flex-col gap-3 py-3">
            <div className="flex min-w-0 items-center gap-2">
                <Avatar
                    size="sm"
                    elevated={false}
                    src={conversation.portrait ?? undefined}
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
                    {replyMinutes === null ? (
                        <span className="text-text-secondary">{NO_REPLY}</span>
                    ) : (
                        <span
                            className={cn(
                                "font-medium tabular-nums",
                                chartToneText[band.tone],
                            )}
                        >
                            {formatAge(replyMinutes)}
                        </span>
                    )}
                </MetricCell>
            </div>
        </div>
    );
}

ThreadAgentCard.displayName = "ThreadAgentCard";

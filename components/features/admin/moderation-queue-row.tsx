import { AgeMark } from "@/components/features/shared/age-mark";
import { ModerationQueueMark } from "@/components/features/admin/moderation-queue-mark";
import { QueueLoadMeter } from "@/components/features/admin/queue-load-meter";
import { MODERATION_QUEUES } from "@/lib/config/admin-tones";
import { queueShare } from "@/lib/data/admin-overview";
import type { ModerationQueueLoad } from "@/lib/types";

export interface ModerationQueueRowProps {
    queue: ModerationQueueLoad;
}

export function ModerationQueueRow({ queue }: ModerationQueueRowProps) {
    return (
        <tr className="ease-smooth hover:bg-background-muted h-11 transition-colors">
            <td className="py-0">
                <ModerationQueueMark id={queue.id} />
            </td>
            <td className="text-text py-0 pl-3 text-right text-xs font-semibold tabular-nums">
                {queue.backlog}
            </td>
            <td className="py-0 pl-3">
                <QueueLoadMeter
                    share={queueShare(queue)}
                    label={MODERATION_QUEUES[queue.id].label}
                />
            </td>
            <td className="py-0 pl-3 text-right">
                <AgeMark minutes={queue.oldestMinutes} />
            </td>
        </tr>
    );
}

ModerationQueueRow.displayName = "ModerationQueueRow";

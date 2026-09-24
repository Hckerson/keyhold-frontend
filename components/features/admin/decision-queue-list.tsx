import { DecisionQueueRow } from "@/components/features/admin/decision-queue-row";
import type { ModerationQueueLoad } from "@/lib/types";

const COLUMNS = { queue: "Queue", open: "Open", oldest: "Oldest" };

export interface DecisionQueueListProps {
    queues: ModerationQueueLoad[];
}

export function DecisionQueueList({ queues }: DecisionQueueListProps) {
    return (
        <div>
            <div
                aria-hidden="true"
                className="border-border-light flex h-9 items-center gap-2 border-b px-3"
            >
                <span className="micro-label flex-1 pl-8">{COLUMNS.queue}</span>
                <span className="micro-label w-8 text-right">
                    {COLUMNS.open}
                </span>
                <span className="micro-label w-8 text-right">
                    {COLUMNS.oldest}
                </span>
                <span className="w-3 shrink-0" />
            </div>
            <ul className="divide-border-light divide-y">
                {queues.map((queue) => (
                    <DecisionQueueRow key={queue.id} queue={queue} />
                ))}
            </ul>
        </div>
    );
}

DecisionQueueList.displayName = "DecisionQueueList";

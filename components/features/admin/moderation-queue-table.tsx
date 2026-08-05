import { ModerationQueueRow } from "@/components/features/admin/moderation-queue-row";
import type { ModerationQueueLoad } from "@/lib/types";

const TABLE_CAPTION =
    "Moderation queues by backlog, share of reviewer capacity and age of the oldest item";

export interface ModerationQueueTableProps {
    queues: ModerationQueueLoad[];
}

export function ModerationQueueTable({ queues }: ModerationQueueTableProps) {
    return (
        <table className="table-flush w-full table-fixed">
            <caption className="sr-only">{TABLE_CAPTION}</caption>
            <thead>
                <tr className="border-border h-9 border-b">
                    <th scope="col" className="micro-label text-left">
                        Queue
                    </th>
                    <th
                        scope="col"
                        className="micro-label w-12 pl-3 text-right"
                    >
                        Open
                    </th>
                    <th
                        scope="col"
                        className="micro-label w-24 pl-3 text-right"
                    >
                        Load
                    </th>
                    <th
                        scope="col"
                        className="micro-label w-12 pl-3 text-right"
                    >
                        Oldest
                    </th>
                </tr>
            </thead>
            <tbody className="divide-border divide-y">
                {queues.map((queue) => (
                    <ModerationQueueRow key={queue.id} queue={queue} />
                ))}
            </tbody>
        </table>
    );
}

ModerationQueueTable.displayName = "ModerationQueueTable";

import { DecisionLaneRow } from "@/components/features/admin/decision-lane-row";
import { tickPosition, WAIT_TICKS } from "@/lib/data/admin-overview-triage";
import { cn } from "@/lib/utils";
import type { DecisionLane, QueueReadiness } from "@/lib/types";

const TABLE_CAPTION =
    "Decision queues by open items, age of the oldest item on a shared wait axis, and share of all open decisions";

const WAIT_COLUMN = "wait";

const COLUMNS = [
    { id: "queue", label: "Queue", className: "w-48 text-left" },
    { id: "open", label: "Open", className: "w-14 pl-3 text-right" },
    { id: WAIT_COLUMN, label: "Wait", className: "pl-4" },
    { id: "oldest", label: "Oldest", className: "w-16 pl-4 text-right" },
    { id: "share", label: "Share", className: "w-14 pl-3 text-right" },
];

export interface DecisionLaneBoardProps {
    lanes: DecisionLane[];
    readiness: QueueReadiness;
}

export function DecisionLaneBoard({
    lanes,
    readiness,
}: DecisionLaneBoardProps) {
    return (
        <div className="scroll-x">
            <table className="table-flush w-full min-w-lg table-fixed">
                <caption className="sr-only">{TABLE_CAPTION}</caption>
                <thead>
                    <tr className="border-border-light h-9 border-b">
                        {COLUMNS.map((column) => (
                            <th
                                key={column.id}
                                scope="col"
                                className={cn("micro-label", column.className)}
                            >
                                {column.id === WAIT_COLUMN ? (
                                    <>
                                        <span className="sr-only">
                                            {column.label}
                                        </span>
                                        <span
                                            aria-hidden="true"
                                            className="relative block h-3"
                                        >
                                            {WAIT_TICKS.map((tick, index) => (
                                                <span
                                                    key={tick.minutes}
                                                    className="absolute top-0 -translate-x-1/2 first:translate-x-0 last:-translate-x-full"
                                                    style={{
                                                        left: `${tickPosition(index)}%`,
                                                    }}
                                                >
                                                    {tick.label}
                                                </span>
                                            ))}
                                        </span>
                                    </>
                                ) : (
                                    column.label
                                )}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {lanes.map((lane) => (
                        <DecisionLaneRow
                            key={lane.id}
                            lane={lane}
                            readiness={readiness}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

DecisionLaneBoard.displayName = "DecisionLaneBoard";

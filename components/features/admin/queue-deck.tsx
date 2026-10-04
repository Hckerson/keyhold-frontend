import { QueueTile } from "@/components/features/admin/queue-tile";
import type { DecisionLane, DecisionLaneId, QueueReadiness } from "@/lib/types";

export interface QueueDeckProps {
    lanes: DecisionLane[];
    readiness: Record<DecisionLaneId, QueueReadiness>;
}

export function QueueDeck({ lanes, readiness }: QueueDeckProps) {
    return (
        <div className="console-split console-split--fifths gap-2">
            {lanes.map((lane) => (
                <QueueTile
                    key={lane.id}
                    lane={lane}
                    readiness={readiness[lane.id]}
                />
            ))}
        </div>
    );
}

QueueDeck.displayName = "QueueDeck";

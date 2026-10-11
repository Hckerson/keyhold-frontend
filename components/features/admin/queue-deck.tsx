import { QueueTile } from "@/components/features/admin/queue-tile";
import type {
    DecisionLane,
    ModerationQueueId,
    QueueReadiness,
} from "@/lib/types";

export interface QueueDeckProps {
    lanes: DecisionLane[];
    readiness: Record<ModerationQueueId, QueueReadiness>;
}

export function QueueDeck({ lanes, readiness }: QueueDeckProps) {
    return (
        <div className="console-split console-split--quarters gap-2">
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

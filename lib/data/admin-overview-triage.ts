import { formatAge, formatCount, percentOf } from "@/lib/utils";
import type {
    DecisionLane,
    ModerationQueueLoad,
    QueueReadiness,
} from "@/lib/types";
import type { UserStats } from "@/lib/validations/stats";

export const queueReadiness = (
    queries: { isError: boolean; isPending: boolean }[],
): QueueReadiness => {
    if (queries.some((query) => query.isError)) return "error";
    return queries.some((query) => query.isPending) ? "pending" : "ready";
};

const byUrgency = (a: DecisionLane, b: DecisionLane) =>
    Number(b.backlog > 0) - Number(a.backlog > 0) ||
    (b.oldestMinutes ?? -1) - (a.oldestMinutes ?? -1);

export const decisionLanes = (
    queues: ModerationQueueLoad[],
    users: UserStats | undefined,
): DecisionLane[] => {
    const loads: Omit<DecisionLane, "share">[] = [
        ...queues,
        { id: "accounts", backlog: users?.pending ?? 0, oldestMinutes: null },
    ];
    const open = loads.reduce((total, lane) => total + lane.backlog, 0);

    return loads
        .map(
            (lane): DecisionLane => ({
                ...lane,
                share: percentOf(lane.backlog, open),
            }),
        )
        .sort(byUrgency);
};

export const openDecisions = (lanes: DecisionLane[]) =>
    lanes.reduce((total, lane) => total + lane.backlog, 0);

export const oldestWait = (lanes: DecisionLane[]) =>
    Math.max(
        0,
        ...lanes.flatMap((lane) =>
            lane.backlog > 0 && lane.oldestMinutes !== null
                ? [lane.oldestMinutes]
                : [],
        ),
    );

const UNREAD_READINGS: Record<Exclude<QueueReadiness, "ready">, string> = {
    pending: "Counting open decisions across every queue",
    error: "A queue did not report — open each one directly",
};

export const triageReading = (
    lanes: DecisionLane[],
    readiness: QueueReadiness,
) => {
    if (readiness !== "ready") return UNREAD_READINGS[readiness];

    const open = openDecisions(lanes);
    const waiting = lanes.filter((lane) => lane.backlog > 0).length;

    if (open === 0) return "Every queue is clear";
    return `${formatCount(open)} open across ${waiting} of ${lanes.length} queues · oldest waiting ${formatAge(oldestWait(lanes))}`;
};

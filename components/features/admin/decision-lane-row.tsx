import Link from "next/link";
import { IconChip } from "@/components/ui/icon-chip";
import { AgeMark } from "@/components/features/shared/age-mark";
import { WaitTrack } from "@/components/features/admin/wait-track";
import { ageTone, DECISION_LANES } from "@/lib/config/admin-tones";
import { cn, formatAge, formatCount } from "@/lib/utils";
import type { DecisionLane, QueueReadiness } from "@/lib/types";

const UNKNOWN = "—";
const AGE_UNTRACKED = "Age of the oldest item is not tracked";

const trackLabel = (label: string, lane: DecisionLane) => {
    if (lane.backlog === 0) return `${label}: nothing waiting`;
    if (lane.oldestMinutes === null) return `${label}: ${AGE_UNTRACKED}`;
    return `${label}: oldest item waiting ${formatAge(lane.oldestMinutes)}`;
};

export interface DecisionLaneRowProps {
    lane: DecisionLane;
    readiness: QueueReadiness;
}

export function DecisionLaneRow({ lane, readiness }: DecisionLaneRowProps) {
    const { icon, label, href, tone } = DECISION_LANES[lane.id];
    const known = lane.id === "accounts" || readiness === "ready";
    const active = known && lane.backlog > 0;

    return (
        <tr className="border-border-light hover:bg-background-muted ease-smooth h-11 border-b transition-colors duration-200 last:border-b-0">
            <td className="py-0">
                <Link
                    href={href}
                    className="focus-visible:ring-accent flex min-w-0 items-center gap-2 rounded-md focus-visible:ring-2 focus-visible:outline-none"
                >
                    <IconChip icon={icon} tone={active ? tone : "neutral"} />
                    <span
                        className={cn(
                            "truncate text-xs font-medium",
                            active ? "text-text" : "text-text-muted",
                        )}
                    >
                        {label}
                    </span>
                </Link>
            </td>
            <td
                className={cn(
                    "py-0 pl-3 text-right text-xs font-semibold tabular-nums",
                    active ? "text-text" : "text-text-muted",
                )}
            >
                {known ? formatCount(lane.backlog) : UNKNOWN}
            </td>
            <td className="py-0 pl-4">
                <WaitTrack
                    position={active ? lane.position : 0}
                    tone={ageTone(lane.oldestMinutes ?? 0)}
                    label={trackLabel(label, lane)}
                />
            </td>
            <td className="py-0 pl-4 text-right">
                {active && lane.oldestMinutes !== null ? (
                    <AgeMark minutes={lane.oldestMinutes} />
                ) : (
                    <span
                        title={active ? AGE_UNTRACKED : undefined}
                        className="text-text-muted text-xs"
                    >
                        {UNKNOWN}
                    </span>
                )}
            </td>
            <td className="text-text-muted py-0 pl-3 text-right text-xs tabular-nums">
                {active ? `${lane.share}%` : UNKNOWN}
            </td>
        </tr>
    );
}

DecisionLaneRow.displayName = "DecisionLaneRow";

import Link from "next/link";
import { IconChip } from "@/components/ui/icon-chip";
import { ShareMeter } from "@/components/patterns/share-meter";
import { AgeMark } from "@/components/features/shared/age-mark";
import { DECISION_LANES } from "@/lib/config/admin-tones";
import { cn, formatCount } from "@/lib/utils";
import type { DecisionLane, QueueReadiness } from "@/lib/types";

const UNKNOWN = "—";
const CLEAR = "Clear";
const UNTRACKED = "Age untracked";

export interface QueueTileProps {
    lane: DecisionLane;
    readiness: QueueReadiness;
}

export function QueueTile({ lane, readiness }: QueueTileProps) {
    const { icon, label, href, tone } = DECISION_LANES[lane.id];
    const known = lane.id === "accounts" || readiness === "ready";
    const active = known && lane.backlog > 0;
    const status = !known ? UNKNOWN : active ? UNTRACKED : CLEAR;

    return (
        <Link
            href={href}
            className="bg-background-muted hover:bg-background-alt focus-visible:ring-accent ease-smooth flex h-28 min-w-0 flex-col justify-between rounded-lg p-3 transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none"
        >
            <span className="flex min-w-0 items-center gap-2">
                <IconChip icon={icon} tone={active ? tone : "neutral"} />
                <span
                    className={cn(
                        "truncate text-xs font-medium",
                        active ? "text-text" : "text-text-muted",
                    )}
                >
                    {label}
                </span>
            </span>

            <span className="flex items-baseline justify-between gap-2">
                <span
                    className={cn(
                        "font-display text-h4 leading-none font-light tabular-nums",
                        active ? "text-text" : "text-text-muted",
                    )}
                >
                    {known ? formatCount(lane.backlog) : UNKNOWN}
                </span>
                {active && lane.oldestMinutes !== null ? (
                    <AgeMark minutes={lane.oldestMinutes} />
                ) : (
                    <span className="text-text-muted truncate text-xs">
                        {status}
                    </span>
                )}
            </span>

            <ShareMeter
                percent={active ? lane.share : 0}
                tone={active ? tone : "neutral"}
                label={`${label}: ${active ? lane.share : 0}% of open decisions`}
                className="w-full"
                barClassName="w-auto flex-1"
            />
        </Link>
    );
}

QueueTile.displayName = "QueueTile";

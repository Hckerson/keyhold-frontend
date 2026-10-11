import Link from "next/link";
import { IconChip } from "@/components/ui/icon-chip";
import { AgeMark } from "@/components/features/shared/age-mark";
import { MODERATION_QUEUES } from "@/lib/config/admin-tones";
import { NO_READING } from "@/lib/constants";
import { cn, formatCount } from "@/lib/utils";
import type { DecisionLane, QueueReadiness } from "@/lib/types";

const CLEAR = "Clear";
const SHARE_NOUN = "of open decisions";

export interface QueueTileProps {
    lane: DecisionLane;
    readiness: QueueReadiness;
}

export function QueueTile({ lane, readiness }: QueueTileProps) {
    const { icon, label, href, tone } = MODERATION_QUEUES[lane.id];
    const known = readiness === "ready";
    const active = known && lane.backlog > 0;

    return (
        <Link
            href={href}
            title={active ? `${lane.share}% ${SHARE_NOUN}` : undefined}
            className="bg-background-muted hover:bg-background focus-visible:ring-accent ease-smooth flex h-20 min-w-0 flex-col justify-between rounded-lg p-3 transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none"
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
                    {known ? formatCount(lane.backlog) : NO_READING}
                </span>
                {active && lane.oldestMinutes !== null && (
                    <AgeMark minutes={lane.oldestMinutes} />
                )}
                {known && !active && (
                    <span className="text-text-muted text-xs">{CLEAR}</span>
                )}
            </span>
        </Link>
    );
}

QueueTile.displayName = "QueueTile";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { IconChip } from "@/components/ui/icon-chip";
import { AgeMark } from "@/components/features/shared/age-mark";
import { MODERATION_QUEUES } from "@/lib/config/admin-tones";
import { cn, formatAge } from "@/lib/utils";
import type { ModerationQueueLoad } from "@/lib/types";

const CLEAR_LABEL = "Clear";

export interface DecisionQueueRowProps {
    queue: ModerationQueueLoad;
}

export function DecisionQueueRow({ queue }: DecisionQueueRowProps) {
    const { icon, label, href, tone } = MODERATION_QUEUES[queue.id];
    const open = queue.backlog > 0;

    return (
        <li>
            <Link
                href={href}
                aria-label={
                    open
                        ? `${label}: ${queue.backlog} open, oldest ${formatAge(queue.oldestMinutes)}`
                        : `${label}: ${CLEAR_LABEL}`
                }
                className="group hover:bg-background-muted focus-visible:ring-accent ease-smooth flex h-11 items-center gap-2 px-3 transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-inset"
            >
                <IconChip icon={icon} tone={open ? tone : "neutral"} />
                <span
                    className={cn(
                        "min-w-0 flex-1 truncate text-xs font-medium",
                        open ? "text-text" : "text-text-muted",
                    )}
                >
                    {label}
                </span>
                {open ? (
                    <>
                        <span className="text-text w-8 text-right text-xs font-semibold tabular-nums">
                            {queue.backlog}
                        </span>
                        <AgeMark
                            minutes={queue.oldestMinutes}
                            className="w-8 text-right"
                        />
                    </>
                ) : (
                    <span className="micro-label w-18 text-right">
                        {CLEAR_LABEL}
                    </span>
                )}
                <ChevronRight
                    aria-hidden="true"
                    strokeWidth={1.5}
                    className="text-text-muted group-hover:text-accent ease-smooth size-3 shrink-0 transition-all duration-200 group-hover:translate-x-0.5"
                />
            </Link>
        </li>
    );
}

DecisionQueueRow.displayName = "DecisionQueueRow";

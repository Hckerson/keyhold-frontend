import Link from "next/link";
import { Check, Circle, CircleDot, type LucideIcon } from "lucide-react";
import { chartToneSoft, type ChartTone } from "@/lib/config/chart-tones";
import { cn } from "@/lib/utils";
import type { JourneyTask, TaskState } from "@/lib/types";

const stateIcon: Record<TaskState, LucideIcon> = {
    done: Check,
    active: CircleDot,
    todo: Circle,
};

const stateTone: Record<TaskState, ChartTone> = {
    done: "accent",
    active: "accent",
    todo: "neutral",
};

export interface OverviewTaskRowProps {
    task: JourneyTask;
}

export function OverviewTaskRow({ task }: OverviewTaskRowProps) {
    const Icon = stateIcon[task.state];

    return (
        <li>
            <Link
                href={task.href}
                className="hover:bg-background-muted ease-smooth -mx-1.5 flex h-9 items-center gap-2 rounded-md px-1.5 transition-colors"
            >
                <span
                    className={cn(
                        "grid size-6 shrink-0 place-items-center rounded-full",
                        chartToneSoft[stateTone[task.state]],
                    )}
                >
                    <Icon
                        className="size-3"
                        strokeWidth={1.5}
                        aria-hidden="true"
                    />
                </span>
                <span
                    className={cn(
                        "min-w-0 flex-1 truncate text-xs",
                        task.state === "done"
                            ? "text-text-muted"
                            : "text-text font-medium",
                    )}
                >
                    {task.label}
                </span>
            </Link>
        </li>
    );
}

OverviewTaskRow.displayName = "OverviewTaskRow";

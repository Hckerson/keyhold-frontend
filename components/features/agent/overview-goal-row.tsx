import { ProgressBar } from "@/components/ui/progress-bar";
import type { ChartTone } from "@/lib/config/chart-tones";
import {
    GOAL_AT_RISK_RATIO,
    GOAL_ON_TRACK_RATIO,
    type MonthlyGoal,
} from "@/lib/data/agent-overview";

function goalTone(ratio: number): ChartTone {
    if (ratio >= GOAL_ON_TRACK_RATIO) return "success";
    if (ratio >= GOAL_AT_RISK_RATIO) return "accent";
    return "warning";
}

export interface OverviewGoalRowProps {
    goal: MonthlyGoal;
}

export function OverviewGoalRow({ goal }: OverviewGoalRowProps) {
    const ratio = goal.value / goal.target;

    return (
        <li className="flex h-9 items-center gap-3">
            <span className="text-text-secondary min-w-0 flex-1 truncate text-xs">
                {goal.label}
            </span>
            <ProgressBar
                value={ratio * 100}
                tone={goalTone(ratio)}
                className="w-16 shrink-0"
            />
            <span className="text-text w-10 shrink-0 text-right text-xs font-semibold tabular-nums">
                {goal.value}
                <span className="text-text-muted font-normal">
                    /{goal.target}
                </span>
            </span>
        </li>
    );
}

OverviewGoalRow.displayName = "OverviewGoalRow";

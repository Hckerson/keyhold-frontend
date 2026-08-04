import { OverviewGoalRow } from "@/components/features/agent/overview-goal-row";
import type { MonthlyGoal } from "@/lib/data/agent-overview";

export interface OverviewGoalListProps {
    goals: MonthlyGoal[];
}

export function OverviewGoalList({ goals }: OverviewGoalListProps) {
    return (
        <ul className="divide-border divide-y">
            {goals.map((goal) => (
                <OverviewGoalRow key={goal.id} goal={goal} />
            ))}
        </ul>
    );
}

OverviewGoalList.displayName = "OverviewGoalList";

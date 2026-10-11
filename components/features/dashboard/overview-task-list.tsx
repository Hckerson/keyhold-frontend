import { OverviewTaskRow } from "@/components/features/dashboard/overview-task-row";
import type { JourneyTask } from "@/lib/types";

export interface OverviewTaskListProps {
    tasks: JourneyTask[];
}

export function OverviewTaskList({ tasks }: OverviewTaskListProps) {
    return (
        <ul className="divide-border divide-y">
            {tasks.map((task) => (
                <OverviewTaskRow key={task.id} task={task} />
            ))}
        </ul>
    );
}

OverviewTaskList.displayName = "OverviewTaskList";

import { QuickActionRow } from "@/components/features/shared/quick-action-row";
import type { QuickAction } from "@/lib/types";

export interface QuickActionListProps {
    actions: QuickAction[];
}

export function QuickActionList({ actions }: QuickActionListProps) {
    return (
        <ul className="divide-border divide-y">
            {actions.map((action) => (
                <QuickActionRow key={action.id} action={action} />
            ))}
        </ul>
    );
}

QuickActionList.displayName = "QuickActionList";

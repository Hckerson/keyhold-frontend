"use client";

import { MilestoneRow } from "@/components/features/offers/milestone-row";
import { orderMilestones } from "@/lib/data/offer-milestones";
import type { DealMilestoneControls } from "@/lib/types";
import type { DealMilestone } from "@/lib/validations/offer";

export interface MilestoneChecklistProps {
    controls: DealMilestoneControls;
    onEdit: (milestone: DealMilestone) => void;
}

export function MilestoneChecklist({
    controls,
    onEdit,
}: MilestoneChecklistProps) {
    return (
        <ul className="divide-border divide-y">
            {orderMilestones(controls.milestones).map((milestone) => (
                <MilestoneRow
                    key={milestone.id}
                    milestone={milestone}
                    busy={controls.busy}
                    onDateChange={controls.onDateChange}
                    onToggleComplete={controls.onToggleComplete}
                    onAttach={controls.onAttach}
                    onEdit={onEdit}
                />
            ))}
        </ul>
    );
}

MilestoneChecklist.displayName = "MilestoneChecklist";

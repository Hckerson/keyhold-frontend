"use client";

import { MilestoneRow } from "@/components/features/offers/milestone-row";
import { orderMilestones } from "@/lib/data/offer-milestones";
import type { MilestoneKind } from "@/lib/enums/enums";
import type { DealMilestone } from "@/lib/validations/offer";

export interface MilestoneChecklistProps {
    milestones: DealMilestone[];
    busy: boolean;
    onDateChange: (kind: MilestoneKind, date: string) => void;
    onToggleComplete: (milestone: DealMilestone) => void;
    onAttach: (kind: MilestoneKind, file: File) => void;
}

export function MilestoneChecklist({
    milestones,
    busy,
    onDateChange,
    onToggleComplete,
    onAttach,
}: MilestoneChecklistProps) {
    return (
        <ul className="divide-border divide-y">
            {orderMilestones(milestones).map((milestone) => (
                <MilestoneRow
                    key={milestone.id}
                    milestone={milestone}
                    busy={busy}
                    onDateChange={onDateChange}
                    onToggleComplete={onToggleComplete}
                    onAttach={onAttach}
                />
            ))}
        </ul>
    );
}

MilestoneChecklist.displayName = "MilestoneChecklist";

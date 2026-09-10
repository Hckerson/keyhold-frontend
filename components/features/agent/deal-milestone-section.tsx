"use client";

import { MilestonePanel } from "@/components/features/offers/milestone-panel";
import { useDealMilestones } from "@/lib/hooks/use-deal-milestones";

export interface DealMilestoneSectionProps {
    offerId: string;
}

export function DealMilestoneSection({ offerId }: DealMilestoneSectionProps) {
    const milestones = useDealMilestones(offerId);

    if (milestones.loading) return null;

    return (
        <MilestonePanel
            milestones={milestones.milestones}
            busy={milestones.busy}
            onDateChange={milestones.onDateChange}
            onToggleComplete={milestones.onToggleComplete}
            onAttach={milestones.onAttach}
        />
    );
}

DealMilestoneSection.displayName = "DealMilestoneSection";

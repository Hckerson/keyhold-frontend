"use client";

import { MilestonePanel } from "@/components/features/offers/milestone-panel";
import { useDealMilestones } from "@/lib/hooks/use-deal-milestones";

export interface DealMilestoneSectionProps {
    offerId: string;
}

export function DealMilestoneSection({ offerId }: DealMilestoneSectionProps) {
    const controls = useDealMilestones(offerId);

    if (controls.loading) return null;

    return <MilestonePanel controls={controls} />;
}

DealMilestoneSection.displayName = "DealMilestoneSection";

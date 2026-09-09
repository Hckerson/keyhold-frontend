"use client";

import { ListChecks } from "lucide-react";
import { Panel } from "@/components/ui/panel";
import { PanelInset } from "@/components/ui/panel-inset";
import { EmptyState } from "@/components/ui/empty-state";
import { ProgressBar } from "@/components/ui/progress-bar";
import { MilestoneChecklist } from "@/components/features/offers/milestone-checklist";
import {
    MILESTONE_COPY as COPY,
    milestoneProgress,
    settledCount,
} from "@/lib/data/offer-milestones";
import type { MilestoneKind } from "@/lib/enums/enums";
import type { DealMilestone } from "@/lib/validations/offer";

export interface MilestonePanelProps {
    milestones: DealMilestone[];
    busy: boolean;
    onDateChange: (kind: MilestoneKind, date: string) => void;
    onToggleComplete: (milestone: DealMilestone) => void;
    onAttach: (kind: MilestoneKind, file: File) => void;
}

export function MilestonePanel({
    milestones,
    busy,
    onDateChange,
    onToggleComplete,
    onAttach,
}: MilestonePanelProps) {
    const settled = settledCount(milestones);

    return (
        <Panel
            title={COPY.title}
            description={COPY.lede}
            count={`${settled}/${milestones.length}`}
        >
            {milestones.length > 0 ? (
                <>
                    <ProgressBar
                        value={milestoneProgress(milestones)}
                        tone="accent"
                        label={COPY.title}
                    />
                    <PanelInset scroll>
                        <MilestoneChecklist
                            milestones={milestones}
                            busy={busy}
                            onDateChange={onDateChange}
                            onToggleComplete={onToggleComplete}
                            onAttach={onAttach}
                        />
                    </PanelInset>
                </>
            ) : (
                <EmptyState
                    icon={ListChecks}
                    title={COPY.empty}
                    description={COPY.emptyLede}
                />
            )}
        </Panel>
    );
}

MilestonePanel.displayName = "MilestonePanel";

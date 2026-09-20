"use client";

import { useState } from "react";
import { ListChecks } from "lucide-react";
import { Panel } from "@/components/ui/panel";
import { PanelInset } from "@/components/ui/panel-inset";
import { EmptyState } from "@/components/ui/empty-state";
import { ProgressBar } from "@/components/ui/progress-bar";
import { MilestoneChecklist } from "@/components/features/offers/milestone-checklist";
import { MilestoneDetailModal } from "@/components/features/offers/milestone-detail-modal";
import {
    MILESTONE_COPY as COPY,
    milestoneProgress,
    settledCount,
} from "@/lib/data/offer-milestones";
import type { DealMilestoneControls } from "@/lib/types";
import type { DealMilestone } from "@/lib/validations/offer";

export interface MilestonePanelProps {
    controls: DealMilestoneControls;
}

export function MilestonePanel({ controls }: MilestonePanelProps) {
    const [editing, setEditing] = useState<DealMilestone | null>(null);
    const { milestones, busy, rejected } = controls;
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
                            controls={controls}
                            onEdit={setEditing}
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

            {rejected && (
                <p role="status" className="text-error text-xs">
                    {rejected}
                </p>
            )}

            {editing && (
                <MilestoneDetailModal
                    key={editing.id}
                    milestone={editing}
                    busy={busy}
                    onClose={() => setEditing(null)}
                    onSave={(input) => {
                        controls.onSaveDetails(editing.kind, input);
                        setEditing(null);
                    }}
                />
            )}
        </Panel>
    );
}

MilestonePanel.displayName = "MilestonePanel";

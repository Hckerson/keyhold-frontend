"use client";

import { Button } from "@/components/ui/button";
import { ReviewActions } from "@/components/patterns/review-actions";
import { disputeActions, openLine } from "@/lib/data/admin-disputes";
import type { DisputeCase, DisputeDecisionMode } from "@/lib/types";

export interface DisputeDecisionBarProps {
    dispute: DisputeCase;
    busy: boolean;
    onAction: (mode: DisputeDecisionMode) => void;
}

export function DisputeDecisionBar({
    dispute,
    busy,
    onAction,
}: DisputeDecisionBarProps) {
    return (
        <ReviewActions lede={openLine(dispute)}>
            {disputeActions(dispute).map((action) => (
                <Button
                    key={action.mode}
                    emphasis={action.emphasis}
                    tone="neutral"
                    disabled={busy}
                    onClick={() => onAction(action.mode)}
                >
                    {action.label}
                </Button>
            ))}
        </ReviewActions>
    );
}

DisputeDecisionBar.displayName = "DisputeDecisionBar";

"use client";

import { Button } from "@/components/ui/button";
import { ReviewActions } from "@/components/patterns/review-actions";
import { FLAG_ACTIONS } from "@/lib/config/flag-tones";
import { flagOpenLine } from "@/lib/data/admin-flags";
import type { FlagReport, FlagSettleMode } from "@/lib/types";

export interface FlagDecisionBarProps {
    report: FlagReport;
    busy: boolean;
    onAction: (mode: FlagSettleMode) => void;
}

export function FlagDecisionBar({
    report,
    busy,
    onAction,
}: FlagDecisionBarProps) {
    return (
        <ReviewActions lede={flagOpenLine(report)}>
            {FLAG_ACTIONS.map((action) => (
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

FlagDecisionBar.displayName = "FlagDecisionBar";

"use client";

import { Button } from "@/components/ui/button";
import {
    disputeActionsByStatus,
    type DisputeDecisionMode,
    type DisputeStatus,
} from "@/lib/data/admin-disputes";

const SETTLED_LEDE = "This dispute is settled. Its record is read-only.";

export interface DisputeDecisionBarProps {
    status: DisputeStatus;
    onAction: (mode: DisputeDecisionMode) => void;
}

export function DisputeDecisionBar({
    status,
    onAction,
}: DisputeDecisionBarProps) {
    const actions = disputeActionsByStatus[status];

    return (
        <div className="border-border-light bg-background-alt flex flex-wrap items-center gap-2 border-t px-4 py-3">
            {actions.length === 0 ? (
                <p className="text-text-muted text-xs">{SETTLED_LEDE}</p>
            ) : (
                actions.map((action) => (
                    <Button
                        key={action.mode}
                        emphasis={action.destructive ? "outline" : "solid"}
                        tone={action.destructive ? "error" : "accent"}
                        onClick={() => onAction(action.mode)}
                    >
                        {action.label}
                    </Button>
                ))
            )}
        </div>
    );
}

DisputeDecisionBar.displayName = "DisputeDecisionBar";

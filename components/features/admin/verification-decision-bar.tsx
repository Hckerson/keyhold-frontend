"use client";

import { Button } from "@/components/ui/button";
import {
    actionsByStatus,
    type VerificationActionMode,
    type VerificationStatus,
} from "@/lib/data/admin-verifications";

export interface VerificationDecisionBarProps {
    status: VerificationStatus;
    onAction: (mode: VerificationActionMode) => void;
}

export function VerificationDecisionBar({
    status,
    onAction,
}: VerificationDecisionBarProps) {
    return (
        <div className="border-border-light bg-background-alt flex flex-wrap items-center gap-2 border-t px-4 py-3">
            {actionsByStatus[status].map((action) => (
                <Button
                    key={action.mode}
                    variant={action.variant}
                    size="sm"
                    onClick={() => onAction(action.mode)}
                >
                    {action.label}
                </Button>
            ))}
        </div>
    );
}

VerificationDecisionBar.displayName = "VerificationDecisionBar";

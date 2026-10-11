"use client";

import { Button } from "@/components/ui/button";
import { ReviewActions } from "@/components/patterns/review-actions";
import { VERIFICATION_ACTIONS } from "@/lib/config/verification-tones";
import { waitingLine } from "@/lib/data/admin-verifications";
import type { VerificationActionMode, VerificationRequest } from "@/lib/types";

export interface VerificationDecisionBarProps {
    request: VerificationRequest;
    approving: boolean;
    busy: boolean;
    onAction: (mode: VerificationActionMode) => void;
}

export function VerificationDecisionBar({
    request,
    approving,
    busy,
    onAction,
}: VerificationDecisionBarProps) {
    return (
        <ReviewActions lede={waitingLine(request)}>
            {VERIFICATION_ACTIONS[request.status].map((action) => (
                <Button
                    key={action.mode}
                    emphasis={action.destructive ? "outline" : "solid"}
                    tone={action.destructive ? "neutral" : "accent"}
                    isLoading={approving && action.mode === "approve"}
                    disabled={busy}
                    onClick={() => onAction(action.mode)}
                >
                    {action.label}
                </Button>
            ))}
        </ReviewActions>
    );
}

VerificationDecisionBar.displayName = "VerificationDecisionBar";

"use client";

import {
    AuthFormHeader,
    AuthNotice,
    AuthPlane,
    AuthTitleBlock,
} from "@/components/features/auth/parts";
import { authLabelVariants } from "@/components/features/auth/parts/auth-label";
import {
    RECOVERY_BACK_ENTRIES,
    RECOVERY_STEP,
} from "@/lib/config/auth-recovery";
import { cn } from "@/lib/utils";

export interface ResetSentPanelProps {
    email: string;
    onUseAnotherEmail: () => void;
}

export function ResetSentPanel({
    email,
    onUseAnotherEmail,
}: ResetSentPanelProps) {
    return (
        <AuthPlane>
            <AuthFormHeader
                kicker="Link dispatched"
                title="Check your inbox"
                description="Follow the link in the message to choose a new password. It expires in 30 minutes."
                step={RECOVERY_STEP.request}
            />
            <AuthNotice
                tone="success"
                title="Reset link sent"
                description={`We sent instructions to ${email}.`}
            />
            <button
                type="button"
                onClick={onUseAnotherEmail}
                className={cn(
                    authLabelVariants({ tier: "label" }),
                    "text-text-muted hover:text-accent focus-visible:ring-accent ease-smooth rounded-xs transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none",
                )}
            >
                Use a different email
            </button>
            <AuthTitleBlock entries={RECOVERY_BACK_ENTRIES} />
        </AuthPlane>
    );
}

ResetSentPanel.displayName = "ResetSentPanel";

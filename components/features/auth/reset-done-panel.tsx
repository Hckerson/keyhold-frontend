"use client";

import {
    AuthFormHeader,
    AuthNotice,
    AuthPlane,
    AuthTitleBlock,
} from "@/components/features/auth/parts";
import {
    RECOVERY_DONE_ENTRIES,
    RECOVERY_STEP,
} from "@/lib/config/auth-recovery";

export function ResetDonePanel() {
    return (
        <AuthPlane>
            <AuthFormHeader
                kicker="Recovery complete"
                title="Password updated"
                description="Your new password is active. Sign in to pick up where you left off."
                step={RECOVERY_STEP.confirm}
            />
            <AuthNotice
                tone="success"
                title="All set"
                description="You can now sign in with your new password."
            />
            <AuthTitleBlock entries={RECOVERY_DONE_ENTRIES} />
        </AuthPlane>
    );
}

ResetDonePanel.displayName = "ResetDonePanel";

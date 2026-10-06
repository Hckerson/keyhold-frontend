"use client";

import { useState } from "react";
import { useRequestPasswordReset } from "@/lib/hooks/use-session";
import type { SettingsDialogKey } from "@/lib/data/buyer-account";

export function useSettingsSecurity(email: string | undefined) {
    const requestReset = useRequestPasswordReset();
    const [dialog, setDialog] = useState<SettingsDialogKey | null>(null);
    const [resetSent, setResetSent] = useState(false);

    const runSecurityAction = (id: SettingsDialogKey) => {
        setResetSent(false);
        setDialog(id);
    };

    const sendPasswordReset = () => {
        if (!email) return;
        requestReset.mutate({ email }, { onSuccess: () => setResetSent(true) });
    };

    return {
        dialog,
        resetSent,
        resettingPassword: requestReset.isPending,
        setDialog,
        runSecurityAction,
        sendPasswordReset,
    };
}

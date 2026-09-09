"use client";

import { useState } from "react";
import type { SettleMode } from "@/lib/config/escrow-settle";
import { useRefundEscrow, useReleaseEscrow } from "@/lib/hooks/use-escrow";
import type { Payout } from "@/lib/types";

const DEFAULT_MODE: SettleMode = "release";

export function useEscrowSettle() {
    const release = useReleaseEscrow();
    const refund = useRefundEscrow();

    const [payout, setPayout] = useState<Payout | null>(null);
    const [mode, setMode] = useState<SettleMode>(DEFAULT_MODE);
    const [reason, setReason] = useState("");

    const open = (next: Payout) => {
        setPayout(next);
        setMode(DEFAULT_MODE);
        setReason("");
    };

    const close = () => {
        setPayout(null);
        setReason("");
    };

    const submit = () => {
        if (!payout) return;

        if (mode === "release") {
            release.mutate(payout.id, { onSuccess: close });
            return;
        }

        const trimmed = reason.trim();
        if (!trimmed) return;
        refund.mutate({ id: payout.id, reason: trimmed }, { onSuccess: close });
    };

    return {
        payout,
        mode,
        reason,
        pending: release.isPending || refund.isPending,
        open,
        close,
        submit,
        changeMode: setMode,
        changeReason: setReason,
    };
}

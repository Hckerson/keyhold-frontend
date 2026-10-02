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

    const pending = release.isPending || refund.isPending;
    const failed = mode === "release" ? release.isError : refund.isError;

    const resetAttempts = () => {
        release.reset();
        refund.reset();
    };

    const clear = () => {
        setPayout(null);
        setReason("");
    };

    const open = (next: Payout) => {
        if (pending) return;
        resetAttempts();
        setPayout(next);
        setMode(DEFAULT_MODE);
        setReason("");
    };

    const close = () => {
        if (!pending) clear();
    };

    const changeMode = (next: SettleMode) => {
        if (pending) return;
        resetAttempts();
        setMode(next);
    };

    const submit = () => {
        if (!payout || pending) return;

        if (mode === "release") {
            release.mutate(payout.id, { onSuccess: clear });
            return;
        }

        const trimmed = reason.trim();
        if (!trimmed) return;
        refund.mutate({ id: payout.id, reason: trimmed }, { onSuccess: clear });
    };

    return {
        payout,
        mode,
        reason,
        pending,
        failed,
        open,
        close,
        submit,
        changeMode,
        changeReason: setReason,
    };
}

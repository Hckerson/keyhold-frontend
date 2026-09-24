"use client";

import { useState } from "react";
import {
    EMPTY_SUSPENSION_DRAFT,
    isSuspensionReady,
} from "@/lib/config/suspension";
import { useConfirmation } from "@/lib/hooks/use-confirmation";
import { useReactivateUser, useSuspendUser } from "@/lib/hooks/use-suspensions";
import type { SuspensionDraft } from "@/lib/types";
import type { CreateSuspensionInput } from "@/lib/validations/suspension";

export function useUserSuspension(onReactivated: (id: string) => void) {
    const suspension = useConfirmation<CreateSuspensionInput, string>(
        useSuspendUser(),
    );
    const reactivation = useReactivateUser();
    const [draft, setDraft] = useState<SuspensionDraft>(EMPTY_SUSPENSION_DRAFT);

    const open = (id: string) => {
        if (suspension.pending) return;
        setDraft(EMPTY_SUSPENSION_DRAFT);
        suspension.request(id);
    };

    const submit = () => {
        if (!suspension.target || !isSuspensionReady(draft)) return;
        suspension.confirm({
            userId: suspension.target,
            reason: draft.reason.trim(),
            duration: draft.duration ? Number(draft.duration) : undefined,
            notes: draft.notes.trim() || undefined,
        });
    };

    const reactivate = (id: string) => {
        if (reactivation.isPending) return;
        reactivation.mutate(id, { onSuccess: () => onReactivated(id) });
    };

    return {
        suspendingId: suspension.target,
        draft,
        pending: suspension.pending,
        failed: suspension.failed,
        reactivatingId: reactivation.isPending
            ? reactivation.variables
            : undefined,
        setDraft,
        open,
        dismiss: suspension.dismiss,
        submit,
        reactivate,
    };
}

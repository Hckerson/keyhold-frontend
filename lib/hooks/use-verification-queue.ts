"use client";

import { useMemo, useState } from "react";
import { FEEDBACK } from "@/lib/config/feedback";
import {
    DEFAULT_VERIFICATION_FILTER,
    isRejectionReady,
} from "@/lib/config/verification-tones";
import {
    verificationCounts,
    verificationsIn,
} from "@/lib/data/admin-verifications";
import { useConfirmation } from "@/lib/hooks/use-confirmation";
import { useKycQueue, useReviewKyc } from "@/lib/hooks/use-kyc";
import { toVerificationQueue } from "@/lib/utils/to-verification-request";
import type {
    VerificationActionMode,
    VerificationDecision,
    VerificationFilterKey,
} from "@/lib/types";
import type { RejectKycInput } from "@/lib/validations/kyc";

export function useVerificationQueue() {
    const queue = useKycQueue();
    const approval = useConfirmation<{ id: string }, string>(useReviewKyc());
    const rejection = useConfirmation<
        { id: string } & RejectKycInput,
        VerificationDecision
    >(useReviewKyc(FEEDBACK.rejectKyc));

    const [filter, setFilter] = useState<VerificationFilterKey>(
        DEFAULT_VERIFICATION_FILTER,
    );
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [note, setNote] = useState("");

    const items = useMemo(
        () => toVerificationQueue(queue.data ?? []),
        [queue.data],
    );

    const counts = useMemo(() => verificationCounts(items), [items]);
    const visible = useMemo(
        () => verificationsIn(items, filter),
        [items, filter],
    );

    const active =
        visible.find((item) => item.id === selectedId) ?? visible[0] ?? null;

    const busy = approval.pending || rejection.pending;

    const runAction = (mode: VerificationActionMode, id: string) => {
        if (busy) return;
        if (mode === "approve") {
            approval.request(id);
            return;
        }
        setNote("");
        rejection.request({ mode, id });
    };

    const submitDecision = () => {
        if (!rejection.target || !isRejectionReady(note)) return;
        rejection.confirm({
            id: rejection.target.id,
            rejectionReason: note.trim(),
        });
    };

    const submitApproval = () => {
        if (approval.target) approval.confirm({ id: approval.target });
    };

    const changeFilter = (key: VerificationFilterKey) => {
        setFilter(key);
        rejection.dismiss();
    };

    const nameOf = (id?: string | null) =>
        items.find((item) => item.id === id)?.name ?? "";

    return {
        filter,
        items,
        counts,
        visible,
        active,
        decision: rejection.target,
        deciding: rejection.pending,
        decisionFailed: rejection.failed,
        approvingId: approval.pending ? approval.target : undefined,
        approval,
        approvalName: nameOf(approval.target),
        busy,
        note,
        applicantName: nameOf(rejection.target?.id),
        pending: queue.isPending,
        failed: queue.isError,
        refetch: queue.refetch,
        setSelectedId,
        setNote,
        runAction,
        closeDecision: rejection.dismiss,
        submitDecision,
        submitApproval,
        changeFilter,
    };
}

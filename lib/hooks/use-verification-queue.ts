"use client";

import { useMemo, useState } from "react";
import { FEEDBACK } from "@/lib/config/feedback";
import {
    type VerificationActionMode,
    type VerificationDecision,
    type VerificationFilterKey,
} from "@/lib/data/admin-verifications";
import { useConfirmation } from "@/lib/hooks/use-confirmation";
import { useKycQueue, useReviewKyc } from "@/lib/hooks/use-kyc";
import { toVerificationQueue } from "@/lib/utils/to-verification-request";
import type { RejectKycInput } from "@/lib/validations/kyc";

const ALL_FILTER: VerificationFilterKey = "all";
const QUEUE_PAGE_SIZE = 100;

export function useVerificationQueue() {
    const queue = useKycQueue({ limit: QUEUE_PAGE_SIZE });
    const approval = useReviewKyc();
    const rejection = useConfirmation<
        { id: string } & RejectKycInput,
        VerificationDecision
    >(useReviewKyc(FEEDBACK.rejectKyc));

    const [filter, setFilter] = useState<VerificationFilterKey>(ALL_FILTER);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [note, setNote] = useState("");

    const items = useMemo(
        () => toVerificationQueue(queue.data?.items ?? []),
        [queue.data?.items],
    );

    const counts = useMemo(() => {
        const base: Record<VerificationFilterKey, number> = {
            all: items.length,
            PENDING: 0,
            VERIFIED: 0,
            REJECTED: 0,
        };
        for (const item of items) base[item.status] += 1;
        return base;
    }, [items]);

    const visible = useMemo(
        () =>
            filter === ALL_FILTER
                ? items
                : items.filter((item) => item.status === filter),
        [items, filter],
    );

    const active =
        visible.find((item) => item.id === selectedId) ?? visible[0] ?? null;

    const busy = approval.isPending || rejection.pending;

    const runAction = (mode: VerificationActionMode, id: string) => {
        if (busy) return;
        if (mode === "approve") {
            approval.mutate({ id });
            return;
        }
        setNote("");
        rejection.request({ mode, id });
    };

    const submitDecision = () => {
        const trimmed = note.trim();
        if (!rejection.target || !trimmed) return;
        rejection.confirm({
            id: rejection.target.id,
            rejectionReason: trimmed,
        });
    };

    const changeFilter = (key: VerificationFilterKey) => {
        setFilter(key);
        rejection.dismiss();
    };

    const applicantName =
        items.find((item) => item.id === rejection.target?.id)?.name ?? "";

    return {
        filter,
        counts,
        visible,
        active,
        decision: rejection.target,
        deciding: rejection.pending,
        decisionFailed: rejection.failed,
        approvingId: approval.isPending ? approval.variables?.id : undefined,
        busy,
        note,
        applicantName,
        pending: queue.isPending,
        failed: queue.isError,
        refetch: queue.refetch,
        setSelectedId,
        setNote,
        runAction,
        closeDecision: rejection.dismiss,
        submitDecision,
        changeFilter,
    };
}

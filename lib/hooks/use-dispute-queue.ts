"use client";

import { useMemo, useState } from "react";
import {
    countDisputes,
    filterDisputes,
    rankDisputes,
    type DisputeDecision,
    type DisputeDecisionMode,
    type DisputeFilterKey,
} from "@/lib/data/admin-disputes";
import { useConfirmation } from "@/lib/hooks/use-confirmation";
import { useDisputes, useSettleDispute } from "@/lib/hooks/use-disputes";
import { toDisputeQueue } from "@/lib/utils/to-dispute-case";
import type { ResolveDisputeInput } from "@/lib/validations/dispute";

const ALL_FILTER: DisputeFilterKey = "all";
const QUEUE_PAGE_SIZE = 100;

export function useDisputeQueue() {
    const queue = useDisputes({ limit: QUEUE_PAGE_SIZE });
    const settle = useConfirmation<
        { id: string; dismiss: boolean } & ResolveDisputeInput,
        DisputeDecision
    >(useSettleDispute());

    const [filter, setFilter] = useState<DisputeFilterKey>(ALL_FILTER);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [note, setNote] = useState("");

    const disputes = useMemo(
        () => rankDisputes(toDisputeQueue(queue.data?.items ?? [])),
        [queue.data?.items],
    );

    const counts = useMemo(() => countDisputes(disputes), [disputes]);

    const visible = useMemo(
        () => filterDisputes(disputes, filter),
        [disputes, filter],
    );

    const active =
        visible.find((dispute) => dispute.id === selectedId) ??
        visible[0] ??
        null;

    const openDecision = (mode: DisputeDecisionMode, id: string) => {
        if (settle.pending) return;
        setNote("");
        settle.request({ mode, id });
    };

    const submitDecision = () => {
        const trimmed = note.trim();
        if (!settle.target || !trimmed) return;
        settle.confirm({
            id: settle.target.id,
            dismiss: settle.target.mode === "dismiss",
            resolutionNotes: trimmed,
        });
    };

    const changeFilter = (key: DisputeFilterKey) => {
        setFilter(key);
        settle.dismiss();
    };

    const subjectTitle =
        disputes.find((dispute) => dispute.id === settle.target?.id)?.title ??
        "";

    return {
        filter,
        counts,
        visible,
        active,
        decision: settle.target,
        note,
        subjectTitle,
        pending: queue.isPending,
        settling: settle.pending,
        settleFailed: settle.failed,
        failed: queue.isError,
        refetch: queue.refetch,
        setSelectedId,
        setNote,
        openDecision,
        closeDecision: settle.dismiss,
        submitDecision,
        changeFilter,
    };
}

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
import { useDisputes, useSettleDispute } from "@/lib/hooks/use-disputes";
import { toDisputeQueue } from "@/lib/utils/to-dispute-case";

const ALL_FILTER: DisputeFilterKey = "all";
const QUEUE_PAGE_SIZE = 100;

export function useDisputeQueue() {
    const queue = useDisputes({ limit: QUEUE_PAGE_SIZE });
    const settle = useSettleDispute();

    const [filter, setFilter] = useState<DisputeFilterKey>(ALL_FILTER);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [decision, setDecision] = useState<DisputeDecision | null>(null);
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
        setDecision({ mode, id });
        setNote("");
    };

    const closeDecision = () => {
        setDecision(null);
        setNote("");
    };

    const submitDecision = () => {
        const trimmed = note.trim();
        if (!decision || !trimmed) return;
        settle.mutate(
            {
                id: decision.id,
                dismiss: decision.mode === "dismiss",
                resolutionNotes: trimmed,
            },
            { onSuccess: closeDecision },
        );
    };

    const changeFilter = (key: DisputeFilterKey) => {
        setFilter(key);
        setDecision(null);
    };

    const subjectTitle =
        disputes.find((dispute) => dispute.id === decision?.id)?.title ?? "";

    return {
        filter,
        counts,
        visible,
        active,
        decision,
        note,
        subjectTitle,
        pending: queue.isPending,
        settling: settle.isPending,
        failed: queue.isError,
        refetch: queue.refetch,
        setSelectedId,
        setNote,
        openDecision,
        closeDecision,
        submitDecision,
        changeFilter,
    };
}

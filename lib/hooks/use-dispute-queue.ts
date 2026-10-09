"use client";

import { useMemo, useState } from "react";
import {
    DEFAULT_DISPUTE_FILTER,
    DISPUTE_DECISION_COPY,
} from "@/lib/config/dispute-tones";
import {
    disputeCounts,
    disputesIn,
    noteReady,
} from "@/lib/data/admin-disputes";
import { useConfirmation } from "@/lib/hooks/use-confirmation";
import { useDisputes, useSettleDispute } from "@/lib/hooks/use-disputes";
import { useEscrowHolds } from "@/lib/hooks/use-escrow";
import { toDisputeQueue } from "@/lib/utils/to-dispute-case";
import type {
    DisputeDecision,
    DisputeDecisionMode,
    DisputeFilterKey,
} from "@/lib/types";
import type { SettleDisputeInput } from "@/lib/validations/dispute";

const QUEUE_PAGE_SIZE = 100;

export function useDisputeQueue() {
    const queue = useDisputes({ limit: QUEUE_PAGE_SIZE });
    const holds = useEscrowHolds();
    const settle = useConfirmation<SettleDisputeInput, DisputeDecision>(
        useSettleDispute(),
    );

    const [filter, setFilter] = useState<DisputeFilterKey>(
        DEFAULT_DISPUTE_FILTER,
    );
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [note, setNote] = useState("");

    const disputes = useMemo(
        () => toDisputeQueue(queue.data?.items ?? [], holds.data ?? []),
        [queue.data?.items, holds.data],
    );
    const counts = useMemo(() => disputeCounts(disputes), [disputes]);
    const visible = useMemo(
        () => disputesIn(disputes, filter),
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
        if (!settle.target || !noteReady(note)) return;
        settle.confirm({
            id: settle.target.id,
            dismiss: settle.target.mode === "dismiss",
            resolutionNotes: note.trim(),
            outcome: DISPUTE_DECISION_COPY[settle.target.mode].outcome,
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
        disputes,
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

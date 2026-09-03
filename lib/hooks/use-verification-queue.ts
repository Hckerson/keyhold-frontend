"use client";

import { useMemo, useState } from "react";
import {
    type VerificationActionMode,
    type VerificationDecision,
    type VerificationFilterKey,
} from "@/lib/data/admin-verifications";
import { useKycQueue, useReviewKyc } from "@/lib/hooks/use-kyc";
import { toVerificationQueue } from "@/lib/utils/to-verification-request";

const ALL_FILTER: VerificationFilterKey = "all";
const QUEUE_PAGE_SIZE = 100;

export function useVerificationQueue() {
    const queue = useKycQueue({ limit: QUEUE_PAGE_SIZE });
    const review = useReviewKyc();

    const [filter, setFilter] = useState<VerificationFilterKey>(ALL_FILTER);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [decision, setDecision] = useState<VerificationDecision | null>(null);
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

    const runAction = (mode: VerificationActionMode, id: string) => {
        if (mode === "approve") {
            review.mutate({ id });
            return;
        }
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
        review.mutate(
            { id: decision.id, rejectionReason: trimmed },
            { onSuccess: closeDecision },
        );
    };

    const changeFilter = (key: VerificationFilterKey) => {
        setFilter(key);
        setDecision(null);
    };

    const applicantName =
        items.find((item) => item.id === decision?.id)?.name ?? "";

    return {
        filter,
        counts,
        visible,
        active,
        decision,
        note,
        applicantName,
        pending: queue.isPending,
        failed: queue.isError,
        refetch: queue.refetch,
        setSelectedId,
        setNote,
        runAction,
        closeDecision,
        submitDecision,
        changeFilter,
    };
}

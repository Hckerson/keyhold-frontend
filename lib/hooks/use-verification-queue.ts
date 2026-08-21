"use client";

import { useMemo, useState } from "react";
import {
    DECISION_RESULT,
    INITIAL_REQUESTS,
    type VerificationActionMode,
    type VerificationDecision,
    type VerificationFilterKey,
    type VerificationRequest,
    type VerificationStatus,
} from "@/lib/data/admin-verifications";

const ALL_FILTER: VerificationFilterKey = "all";

interface Resolution {
    note: string;
    kind: VerificationDecision["mode"];
}

export function useVerificationQueue() {
    const [items, setItems] = useState<VerificationRequest[]>(INITIAL_REQUESTS);
    const [filter, setFilter] = useState<VerificationFilterKey>(ALL_FILTER);
    const [selectedId, setSelectedId] = useState<string | null>(
        INITIAL_REQUESTS[0]?.id ?? null,
    );
    const [decision, setDecision] = useState<VerificationDecision | null>(null);
    const [note, setNote] = useState("");

    const counts = useMemo(() => {
        const base: Record<VerificationFilterKey, number> = {
            all: items.length,
            pending: 0,
            approved: 0,
            rejected: 0,
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

    const settle = (
        id: string,
        status: VerificationStatus,
        resolution?: Resolution,
    ) => {
        setItems((current) =>
            current.map((item) =>
                item.id === id
                    ? {
                          ...item,
                          status,
                          note: resolution?.note,
                          noteKind: resolution?.kind,
                      }
                    : item,
            ),
        );
    };

    const runAction = (mode: VerificationActionMode, id: string) => {
        if (mode === "approve") {
            settle(id, "approved");
            return;
        }
        if (mode === "resubmit") {
            settle(id, "pending");
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
        settle(decision.id, DECISION_RESULT[decision.mode], {
            note: trimmed,
            kind: decision.mode,
        });
        closeDecision();
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
        applicantName,
        note,
        setNote,
        setSelectedId,
        changeFilter,
        runAction,
        closeDecision,
        submitDecision,
    };
}

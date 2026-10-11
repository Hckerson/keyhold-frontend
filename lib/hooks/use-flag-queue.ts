"use client";

import { useMemo, useState } from "react";
import { DEFAULT_FLAG_FILTER } from "@/lib/config/flag-tones";
import { flagCounts, flagsIn } from "@/lib/data/admin-flags";
import { useConfirmation } from "@/lib/hooks/use-confirmation";
import { useFlags, useSettleFlag } from "@/lib/hooks/use-flags";
import { toFlagQueue } from "@/lib/utils/to-flag-report";
import type { FlagDecision, FlagFilterKey, FlagSettleMode } from "@/lib/types";

export function useFlagQueue() {
    const members = useFlags({ type: "USER" });
    const messages = useFlags({ type: "MESSAGE" });
    const settle = useConfirmation<
        { id: string; dismiss: boolean },
        FlagDecision
    >(useSettleFlag());

    const [filter, setFilter] = useState<FlagFilterKey>(DEFAULT_FLAG_FILTER);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const reports = useMemo(
        () => toFlagQueue([...(members.data ?? []), ...(messages.data ?? [])]),
        [members.data, messages.data],
    );
    const counts = useMemo(() => flagCounts(reports), [reports]);
    const visible = useMemo(() => flagsIn(reports, filter), [reports, filter]);

    const active =
        visible.find((report) => report.id === selectedId) ??
        visible[0] ??
        null;

    const requestSettle = (mode: FlagSettleMode, id: string) =>
        settle.request({ mode, id });

    const confirmSettle = () => {
        if (!settle.target) return;
        settle.confirm({
            id: settle.target.id,
            dismiss: settle.target.mode === "dismiss",
        });
    };

    const changeFilter = (key: FlagFilterKey) => {
        setFilter(key);
        settle.dismiss();
    };

    return {
        filter,
        reports,
        counts,
        visible,
        active,
        pending: members.isPending || messages.isPending,
        failed: members.isError || messages.isError,
        refetch: () => Promise.all([members.refetch(), messages.refetch()]),
        decision: settle.target,
        deciding: reports.find((report) => report.id === settle.target?.id),
        settling: settle.pending,
        settleFailed: settle.failed,
        setSelectedId,
        changeFilter,
        requestSettle,
        confirmSettle,
        dismissSettle: settle.dismiss,
    };
}

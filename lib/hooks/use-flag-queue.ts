"use client";

import { useMemo, useState } from "react";
import {
    countReports,
    filterReports,
    rankReports,
    type FlagFilterKey,
    type FlagSettleMode,
} from "@/lib/data/admin-flags";
import { useFlags, useSettleFlag } from "@/lib/hooks/use-flags";
import { toAbuseQueue } from "@/lib/utils/to-abuse-report";

const ALL_FILTER: FlagFilterKey = "all";
const QUEUE_PAGE_SIZE = 100;

export function useFlagQueue() {
    const queue = useFlags({ limit: QUEUE_PAGE_SIZE });
    const settle = useSettleFlag();

    const [filter, setFilter] = useState<FlagFilterKey>(ALL_FILTER);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const reports = useMemo(
        () =>
            rankReports(
                toAbuseQueue(queue.data?.items ?? []).filter(
                    (report) => report.type !== "PROPERTY",
                ),
            ),
        [queue.data?.items],
    );

    const counts = useMemo(() => countReports(reports), [reports]);

    const visible = useMemo(
        () => filterReports(reports, filter),
        [reports, filter],
    );

    const active =
        visible.find((report) => report.id === selectedId) ??
        visible[0] ??
        null;

    const settleReport = (mode: FlagSettleMode, id: string) =>
        settle.mutate({ id, dismiss: mode === "dismiss" });

    return {
        filter,
        counts,
        visible,
        active,
        pending: queue.isPending,
        settling: settle.isPending,
        failed: queue.isError,
        refetch: queue.refetch,
        setSelectedId,
        changeFilter: setFilter,
        settleReport,
    };
}

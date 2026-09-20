"use client";

import { useMemo, useState } from "react";
import { InterestsHeader } from "@/components/sections/dashboard/interests-header";
import { InterestsMain } from "@/components/sections/dashboard/interests-main";
import { InterestsRail } from "@/components/sections/dashboard/interests-rail";
import { InterestsStatBand } from "@/components/sections/dashboard/interests-stat-band";
import { ConsoleUnavailable } from "@/components/patterns/console-unavailable";
import { CONSOLE_FALLBACKS } from "@/lib/config/console-fallbacks";
import {
    countByStage,
    interestStats,
    interestsSummary,
    matchesFilters,
    rankInterests,
    type StageFilter,
    type StatusFilter,
} from "@/lib/data/interests";
import { useMyInterests } from "@/lib/hooks/use-connections";
import { toInterestBook } from "@/lib/utils/to-interest";

export function InterestsConsole() {
    const { data, isPending, isError, refetch } = useMyInterests();

    const [stageFilter, setStageFilter] = useState<StageFilter>("all");
    const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

    const interests = useMemo(() => toInterestBook(data ?? []), [data]);

    const ranked = useMemo(() => rankInterests(interests), [interests]);
    const peers = useMemo(() => ranked.slice(1), [ranked]);
    const counts = useMemo(() => countByStage(peers), [peers]);
    const stats = useMemo(() => interestStats(interests), [interests]);

    const visible = useMemo(
        () =>
            peers.filter((interest) =>
                matchesFilters(interest, stageFilter, statusFilter),
            ),
        [peers, stageFilter, statusFilter],
    );

    if (isError)
        return (
            <ConsoleUnavailable
                fallback={CONSOLE_FALLBACKS.buyerInterests}
                onRetry={() => void refetch()}
            />
        );

    return (
        <div className="flex flex-col gap-4">
            <InterestsHeader summary={interestsSummary(interests)} />

            <InterestsStatBand stats={stats} pending={isPending} />

            <div className="console-split gap-3">
                <InterestsMain
                    top={ranked[0]}
                    interests={visible}
                    total={peers.length}
                    stageFilter={stageFilter}
                    statusFilter={statusFilter}
                    counts={counts}
                    pending={isPending}
                    onStageFilterChange={setStageFilter}
                    onStatusFilterChange={setStatusFilter}
                />
                <InterestsRail interests={interests} />
            </div>
        </div>
    );
}

InterestsConsole.displayName = "InterestsConsole";

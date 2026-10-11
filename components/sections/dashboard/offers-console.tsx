"use client";

import { useMemo, useState } from "react";
import { OffersHeader } from "@/components/sections/dashboard/offers-header";
import { OffersMain } from "@/components/sections/dashboard/offers-main";
import { OffersRail } from "@/components/sections/dashboard/offers-rail";
import { OffersStatBand } from "@/components/sections/dashboard/offers-stat-band";
import { ConsoleUnavailable } from "@/components/patterns/console-unavailable";
import { CONSOLE_FALLBACKS } from "@/lib/config/console-fallbacks";
import { countByStage, matchesFilters, rankOffers } from "@/lib/data/offers";
import { offerStats, offersSummary } from "@/lib/data/offers-stats";
import { useMyInterests } from "@/lib/hooks/use-connections";
import { toOfferBook } from "@/lib/utils/to-offer";
import type { OfferStageFilter, OfferStatusFilter } from "@/lib/types";

export function OffersConsole() {
    const { data, isPending, isError, refetch } = useMyInterests();

    const [stageFilter, setStageFilter] = useState<OfferStageFilter>("all");
    const [statusFilter, setStatusFilter] = useState<OfferStatusFilter>("all");

    const offers = useMemo(() => toOfferBook(data ?? []), [data]);

    const ranked = useMemo(() => rankOffers(offers), [offers]);
    const peers = useMemo(() => ranked.slice(1), [ranked]);
    const counts = useMemo(() => countByStage(peers), [peers]);
    const stats = useMemo(() => offerStats(offers), [offers]);

    const visible = useMemo(
        () =>
            peers.filter((offer) =>
                matchesFilters(offer, stageFilter, statusFilter),
            ),
        [peers, stageFilter, statusFilter],
    );

    if (isError)
        return (
            <ConsoleUnavailable
                fallback={CONSOLE_FALLBACKS.buyerOffers}
                onRetry={() => void refetch()}
            />
        );

    return (
        <div className="flex flex-col gap-4">
            <OffersHeader summary={offersSummary(offers)} />

            <OffersStatBand stats={stats} pending={isPending} />

            <div className="console-split gap-3">
                <OffersMain
                    top={ranked[0]}
                    offers={visible}
                    stageFilter={stageFilter}
                    statusFilter={statusFilter}
                    counts={counts}
                    pending={isPending}
                    onStageFilterChange={setStageFilter}
                    onStatusFilterChange={setStatusFilter}
                />
                <OffersRail offers={offers} pending={isPending} />
            </div>
        </div>
    );
}

OffersConsole.displayName = "OffersConsole";

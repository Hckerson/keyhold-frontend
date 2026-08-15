"use client";

import { useCallback, useMemo, useState } from "react";
import { OffersHeader } from "@/components/sections/dashboard/offers-header";
import { OffersMain } from "@/components/sections/dashboard/offers-main";
import { OffersRail } from "@/components/sections/dashboard/offers-rail";
import { OffersStatBand } from "@/components/sections/dashboard/offers-stat-band";
import {
    countByStage,
    initialOffers,
    matchesFilters,
    offerStats,
    offersSummary,
    rankOffers,
    withdrawOffer,
    type StageFilter,
    type StatusFilter,
} from "@/lib/data/offers";

export function OffersConsole() {
    const [offers, setOffers] = useState(initialOffers);
    const [stageFilter, setStageFilter] = useState<StageFilter>("all");
    const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

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

    const onWithdraw = useCallback(
        (id: string) => setOffers((current) => withdrawOffer(current, id)),
        [],
    );

    return (
        <div className="flex flex-col gap-4">
            <OffersHeader summary={offersSummary(offers)} />

            <OffersStatBand stats={stats} />

            <div className="console-split gap-3">
                <OffersMain
                    top={ranked[0]}
                    offers={visible}
                    stageFilter={stageFilter}
                    statusFilter={statusFilter}
                    counts={counts}
                    onStageFilterChange={setStageFilter}
                    onStatusFilterChange={setStatusFilter}
                    onWithdraw={onWithdraw}
                />
                <OffersRail offers={offers} />
            </div>
        </div>
    );
}

OffersConsole.displayName = "OffersConsole";

"use client";

import { useMemo, useState } from "react";
import { DEAL_STAGES } from "@/lib/config/deal-stages";
import { initialDeals, nextStageOf } from "@/lib/data/agent-pipeline";

const MILLION = 1_000_000;

export function useDealPipeline() {
    const [deals, setDeals] = useState(initialDeals);

    const openDeals = useMemo(
        () => deals.filter((deal) => deal.stage !== "closed"),
        [deals],
    );

    const totalValue =
        openDeals.reduce((sum, deal) => sum + deal.price, 0) / MILLION;

    const avgDays = openDeals.length
        ? Math.round(
              openDeals.reduce((sum, deal) => sum + deal.daysInStage, 0) /
                  openDeals.length,
          )
        : 0;

    const columns = useMemo(
        () =>
            DEAL_STAGES.map((stage) => {
                const items = deals.filter((deal) => deal.stage === stage.id);
                return {
                    ...stage,
                    items,
                    value:
                        items.reduce((sum, deal) => sum + deal.price, 0) /
                        MILLION,
                };
            }),
        [deals],
    );

    const advance = (id: string) =>
        setDeals((prev) =>
            prev.map((deal) =>
                deal.id === id
                    ? {
                          ...deal,
                          stage: nextStageOf(deal.stage).id,
                          daysInStage: 0,
                      }
                    : deal,
            ),
        );

    return {
        columns,
        openCount: openDeals.length,
        totalValue,
        avgDays,
        advance,
    };
}

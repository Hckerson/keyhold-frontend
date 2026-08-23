"use client";

import { useMemo } from "react";
import { DEAL_STAGES } from "@/lib/config/deal-stages";
import { useIncomingConnections } from "@/lib/hooks/use-connections";
import { useSales } from "@/lib/hooks/use-transactions";
import { toDealBook } from "@/lib/utils/to-deal";

const MILLION = 1_000_000;
const FULL_PERCENT = 100;

export function useDealPipeline() {
    const connections = useIncomingConnections();
    const sales = useSales();

    const deals = useMemo(
        () => toDealBook(connections.data ?? [], sales.data ?? []),
        [connections.data, sales.data],
    );

    const openDeals = useMemo(
        () => deals.filter((deal) => deal.stage !== "closed"),
        [deals],
    );

    const closedCount = deals.length - openDeals.length;

    const totalValue =
        openDeals.reduce((sum, deal) => sum + deal.price, 0) / MILLION;

    const avgDays = openDeals.length
        ? Math.round(
              openDeals.reduce((sum, deal) => sum + deal.daysInStage, 0) /
                  openDeals.length,
          )
        : 0;

    const closeRate = deals.length
        ? Math.round((closedCount / deals.length) * FULL_PERCENT)
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

    return {
        columns,
        openCount: openDeals.length,
        closedCount,
        closeRate,
        totalValue,
        avgDays,
        pending: connections.isPending || sales.isPending,
        failed: connections.isError || sales.isError,
        refetch: () => {
            void connections.refetch();
            void sales.refetch();
        },
    };
}

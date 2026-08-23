"use client";

import { useMemo, useState } from "react";
import { AdminPaymentsHeader } from "@/components/sections/admin/admin-payments-header";
import { AdminPaymentsMain } from "@/components/sections/admin/admin-payments-main";
import { AdminPaymentsRail } from "@/components/sections/admin/admin-payments-rail";
import { AdminPaymentsStatBand } from "@/components/sections/admin/admin-payments-stat-band";
import { ConsoleUnavailable } from "@/components/patterns/console-unavailable";
import { CONSOLE_FALLBACKS } from "@/lib/config/console-fallbacks";
import {
    heldPayouts,
    matchesPayoutFilters,
    outstandingPayout,
    paymentStats,
    paymentsSummary,
    payoutCounts,
    rankPayouts,
    settlementMetrics,
    toPayoutStages,
    type PayoutStateFilter,
} from "@/lib/data/admin-payments";
import { useEscrowHolds, useEscrowStages } from "@/lib/hooks/use-escrow";
import { toPayouts } from "@/lib/utils/to-payout";

const HOLD_PAGE_SIZE = 100;

export function AdminPaymentsConsole() {
    const holds = useEscrowHolds({ limit: HOLD_PAGE_SIZE });
    const stages = useEscrowStages();

    const [stateFilter, setStateFilter] = useState<PayoutStateFilter>("all");

    const payouts = useMemo(
        () => rankPayouts(toPayouts(holds.data?.items ?? [])),
        [holds.data?.items],
    );

    const counts = useMemo(() => payoutCounts(payouts), [payouts]);

    const visible = useMemo(
        () =>
            payouts.filter((payout) =>
                matchesPayoutFilters(payout, stateFilter),
            ),
        [payouts, stateFilter],
    );

    const pipeline = useMemo(
        () => toPayoutStages(stages.data ?? []),
        [stages.data],
    );

    if (holds.isError)
        return (
            <ConsoleUnavailable
                fallback={CONSOLE_FALLBACKS.adminPayments}
                onRetry={() => void holds.refetch()}
            />
        );

    return (
        <div className="flex flex-col gap-4">
            <AdminPaymentsHeader summary={paymentsSummary(payouts)} />

            <AdminPaymentsStatBand stats={paymentStats(payouts)} />

            <div className="console-split gap-3">
                <AdminPaymentsMain
                    payouts={visible}
                    stateFilter={stateFilter}
                    counts={counts}
                    held={outstandingPayout(payouts)}
                    heldLabel={paymentsSummary(payouts)}
                    metrics={settlementMetrics(payouts)}
                    pending={holds.isPending}
                    onStateFilterChange={setStateFilter}
                />
                <AdminPaymentsRail
                    stages={pipeline}
                    heldCount={heldPayouts(payouts).length}
                    metrics={settlementMetrics(payouts)}
                />
            </div>
        </div>
    );
}

AdminPaymentsConsole.displayName = "AdminPaymentsConsole";

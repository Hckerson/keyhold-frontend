"use client";

import { useMemo, useState } from "react";
import { AdminPaymentsHeader } from "@/components/sections/admin/admin-payments-header";
import { AdminPaymentsMain } from "@/components/sections/admin/admin-payments-main";
import { AdminPaymentsStatBand } from "@/components/sections/admin/admin-payments-stat-band";
import { ConsoleUnavailable } from "@/components/patterns/console-unavailable";
import { EscrowSettleModal } from "@/components/features/admin/escrow-settle-modal";
import { CONSOLE_FALLBACKS } from "@/lib/config/console-fallbacks";
import {
    escrowPosition,
    matchesPayoutFilters,
    matchesPayoutQuery,
    payoutsReading,
    rankPayouts,
    toPayoutStages,
    type PayoutStateFilter,
} from "@/lib/data/admin-payments";
import { useEscrowHolds, useEscrowStages } from "@/lib/hooks/use-escrow";
import { useEscrowSettle } from "@/lib/hooks/use-escrow-settle";
import { toPayouts } from "@/lib/utils/to-payout";

const EVERY_STATE: PayoutStateFilter = "all";

export function AdminPaymentsConsole() {
    const holds = useEscrowHolds();
    const stages = useEscrowStages();
    const settle = useEscrowSettle();

    const [stateFilter, setStateFilter] =
        useState<PayoutStateFilter>(EVERY_STATE);
    const [query, setQuery] = useState("");

    const payouts = useMemo(
        () => rankPayouts(toPayouts(holds.data ?? [])),
        [holds.data],
    );

    const visible = useMemo(
        () =>
            payouts.filter(
                (payout) =>
                    matchesPayoutFilters(payout, stateFilter) &&
                    matchesPayoutQuery(payout, query),
            ),
        [payouts, stateFilter, query],
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
            <AdminPaymentsHeader />

            <AdminPaymentsStatBand
                position={escrowPosition(pipeline)}
                stages={pipeline}
                active={stateFilter}
                pending={stages.isPending}
                failed={stages.isError}
                onChange={setStateFilter}
            />

            <AdminPaymentsMain
                payouts={visible}
                total={payouts.length}
                reading={payoutsReading(payouts, stateFilter)}
                query={query}
                filtered={stateFilter !== EVERY_STATE}
                pending={holds.isPending}
                onQueryChange={setQuery}
                onClearFilter={() => setStateFilter(EVERY_STATE)}
                onSettle={settle.open}
            />

            <EscrowSettleModal
                payout={settle.payout}
                mode={settle.mode}
                reason={settle.reason}
                pending={settle.pending}
                failed={settle.failed}
                onModeChange={settle.changeMode}
                onReasonChange={settle.changeReason}
                onClose={settle.close}
                onSubmit={settle.submit}
            />
        </div>
    );
}

AdminPaymentsConsole.displayName = "AdminPaymentsConsole";

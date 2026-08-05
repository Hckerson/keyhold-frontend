"use client";

import { useMemo, useState } from "react";
import { AdminPaymentsHeader } from "@/components/sections/admin/admin-payments-header";
import { AdminPaymentsMain } from "@/components/sections/admin/admin-payments-main";
import { AdminPaymentsRail } from "@/components/sections/admin/admin-payments-rail";
import { AdminPaymentsStatBand } from "@/components/sections/admin/admin-payments-stat-band";
import {
    matchesPayoutFilters,
    PAYMENT_STATS,
    PAYMENTS_SUMMARY,
    RANKED_PAYOUTS,
    type PayoutMethodFilter,
    type PayoutStateFilter,
} from "@/lib/data/admin-payments";

export function AdminPaymentsConsole() {
    const [stateFilter, setStateFilter] = useState<PayoutStateFilter>("all");
    const [methodFilter, setMethodFilter] = useState<PayoutMethodFilter>("all");

    const visible = useMemo(
        () =>
            RANKED_PAYOUTS.filter((payout) =>
                matchesPayoutFilters(payout, stateFilter, methodFilter),
            ),
        [stateFilter, methodFilter],
    );

    return (
        <div className="flex flex-col gap-4">
            <AdminPaymentsHeader summary={PAYMENTS_SUMMARY} />

            <AdminPaymentsStatBand stats={PAYMENT_STATS} />

            <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
                <AdminPaymentsMain
                    payouts={visible}
                    stateFilter={stateFilter}
                    methodFilter={methodFilter}
                    onStateFilterChange={setStateFilter}
                    onMethodFilterChange={setMethodFilter}
                />
                <AdminPaymentsRail />
            </div>
        </div>
    );
}

AdminPaymentsConsole.displayName = "AdminPaymentsConsole";

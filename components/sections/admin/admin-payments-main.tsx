import { Wallet } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { PresenceSwap } from "@/components/patterns/presence-swap";
import { Panel } from "@/components/ui/panel";
import { PanelInset } from "@/components/ui/panel-inset";
import { PanelLink } from "@/components/features/shared/panel-link";
import { PayoutTable } from "@/components/features/admin/payout-table";
import { RevenueStreamTable } from "@/components/features/admin/revenue-stream-table";
import { AdminPaymentsRevenueHero } from "@/components/sections/admin/admin-payments-revenue-hero";
import { AdminPaymentsToolbar } from "@/components/sections/admin/admin-payments-toolbar";
import {
    REVENUE_BREAKDOWN,
    type PayoutMethodFilter,
    type PayoutStateFilter,
} from "@/lib/data/admin-payments";
import type { Payout } from "@/lib/types";

const QUEUE_TITLE = "Payout Queue";
const QUEUE_LEDE = "Every agent commission between a closed deal and a bank";
const STREAMS_TITLE = "Revenue Streams";
const STREAMS_LEDE = "Share of the year to date and where the month moved";
const STREAMS_ACTION = "Reports";
const EMPTY_TITLE = "No payouts in this view";
const EMPTY_LEDE =
    "Widen the release state or clear the rail filter to see the full queue.";

export interface AdminPaymentsMainProps {
    payouts: Payout[];
    stateFilter: PayoutStateFilter;
    methodFilter: PayoutMethodFilter;
    onStateFilterChange: (filter: PayoutStateFilter) => void;
    onMethodFilterChange: (filter: PayoutMethodFilter) => void;
}

export function AdminPaymentsMain({
    payouts,
    stateFilter,
    methodFilter,
    onStateFilterChange,
    onMethodFilterChange,
}: AdminPaymentsMainProps) {
    return (
        <div className="flex flex-col gap-3 lg:col-span-2">
            <AdminPaymentsRevenueHero />

            <Panel
                title={QUEUE_TITLE}
                description={QUEUE_LEDE}
                count={payouts.length}
            >
                <AdminPaymentsToolbar
                    stateFilter={stateFilter}
                    methodFilter={methodFilter}
                    onStateFilterChange={onStateFilterChange}
                    onMethodFilterChange={onMethodFilterChange}
                />

                <PresenceSwap swapKey={payouts.length > 0 ? "rows" : "empty"}>
                    {payouts.length > 0 ? (
                        <PanelInset scroll className="mt-0">
                            <PayoutTable payouts={payouts} />
                        </PanelInset>
                    ) : (
                        <EmptyState
                            icon={Wallet}
                            title={EMPTY_TITLE}
                            description={EMPTY_LEDE}
                        />
                    )}
                </PresenceSwap>
            </Panel>

            <Panel
                title={STREAMS_TITLE}
                description={STREAMS_LEDE}
                action={
                    <PanelLink href="/admin/reports" label={STREAMS_ACTION} />
                }
            >
                <PanelInset scroll>
                    <RevenueStreamTable streams={REVENUE_BREAKDOWN} />
                </PanelInset>
            </Panel>
        </div>
    );
}

AdminPaymentsMain.displayName = "AdminPaymentsMain";

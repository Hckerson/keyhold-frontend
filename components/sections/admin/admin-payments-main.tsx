import { Wallet } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { PresenceSwap } from "@/components/patterns/presence-swap";
import { SkeletonRows } from "@/components/patterns/skeleton-rows";
import { Panel } from "@/components/ui/panel";
import { PanelInset } from "@/components/ui/panel-inset";
import { PayoutTable } from "@/components/features/admin/payout-table";
import { AdminPaymentsRevenueHero } from "@/components/sections/admin/admin-payments-revenue-hero";
import { AdminPaymentsToolbar } from "@/components/sections/admin/admin-payments-toolbar";
import type { PayoutStateFilter } from "@/lib/data/admin-payments";
import type { MetricItem, Payout } from "@/lib/types";

const QUEUE_TITLE = "Escrow Queue";
const QUEUE_LEDE = "Every hold between a funded sale and a settled seller";
const EMPTY_TITLE = "No holds in this view";
const EMPTY_LEDE = "Widen the escrow state to see the full queue.";

export interface AdminPaymentsMainProps {
    payouts: Payout[];
    stateFilter: PayoutStateFilter;
    counts: Record<PayoutStateFilter, number>;
    held: number;
    heldLabel: string;
    metrics: MetricItem[];
    pending?: boolean;
    onStateFilterChange: (filter: PayoutStateFilter) => void;
    onSettle: (payout: Payout) => void;
}

export function AdminPaymentsMain({
    payouts,
    stateFilter,
    counts,
    held,
    heldLabel,
    metrics,
    pending,
    onStateFilterChange,
    onSettle,
}: AdminPaymentsMainProps) {
    return (
        <div className="console-span-2 flex flex-col gap-3">
            <AdminPaymentsRevenueHero
                held={held}
                heldLabel={heldLabel}
                metrics={metrics}
            />

            <Panel
                title={QUEUE_TITLE}
                description={QUEUE_LEDE}
                count={payouts.length}
            >
                <AdminPaymentsToolbar
                    stateFilter={stateFilter}
                    counts={counts}
                    onStateFilterChange={onStateFilterChange}
                />

                <PresenceSwap
                    swapKey={
                        payouts.length > 0
                            ? "rows"
                            : pending
                              ? "pending"
                              : "empty"
                    }
                >
                    {payouts.length > 0 ? (
                        <PanelInset scroll>
                            <PayoutTable
                                payouts={payouts}
                                onSettle={onSettle}
                            />
                        </PanelInset>
                    ) : pending ? (
                        <SkeletonRows />
                    ) : (
                        <EmptyState
                            icon={Wallet}
                            title={EMPTY_TITLE}
                            description={EMPTY_LEDE}
                        />
                    )}
                </PresenceSwap>
            </Panel>
        </div>
    );
}

AdminPaymentsMain.displayName = "AdminPaymentsMain";

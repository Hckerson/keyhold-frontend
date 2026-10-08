"use client";

import { useMemo } from "react";
import { Search, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/forms/input";
import { Panel } from "@/components/ui/panel";
import { DataTable } from "@/components/patterns/data-table";
import { SkeletonRows } from "@/components/patterns/skeleton-rows";
import { buildPayoutConfig } from "@/components/features/admin/payout-columns";
import { PAYOUT_STATES } from "@/lib/config/payout-tones";
import type { Payout } from "@/lib/types";

const TITLE = "Payouts";
const CLEAR_ACTION = "Show every state";
const SEARCH_LABEL = "Search payouts by agent, deal or buyer";
const SEARCH_PLACEHOLDER = "Search agent, deal or buyer";
const EMPTY_TITLE = "No payouts in this state";
const EMPTY_LEDE = "Pick another state above, or show every state.";

export interface AdminPaymentsMainProps {
    payouts: Payout[];
    total: number;
    reading: string;
    query: string;
    filtered: boolean;
    pending?: boolean;
    onQueryChange: (next: string) => void;
    onClearFilter: () => void;
    onSettle: (payout: Payout) => void;
}

export function AdminPaymentsMain({
    payouts,
    total,
    reading,
    query,
    filtered,
    pending,
    onQueryChange,
    onClearFilter,
    onSettle,
}: AdminPaymentsMainProps) {
    const settlable = payouts.some(
        (payout) => PAYOUT_STATES[payout.state].settlable,
    );
    const config = useMemo(
        () => buildPayoutConfig({ onSettle, settlable }),
        [onSettle, settlable],
    );

    return (
        <Panel
            title={TITLE}
            description={reading}
            count={filtered ? `${payouts.length} / ${total}` : total}
            action={
                <div className="flex items-center gap-2">
                    {filtered && (
                        <Button
                            type="button"
                            emphasis="quiet"
                            onClick={onClearFilter}
                        >
                            {CLEAR_ACTION}
                        </Button>
                    )}
                    <div className="w-56">
                        <Input
                            type="search"
                            value={query}
                            aria-label={SEARCH_LABEL}
                            placeholder={SEARCH_PLACEHOLDER}
                            prefix={<Search size={12} strokeWidth={1.5} />}
                            onChange={(event) =>
                                onQueryChange(event.target.value)
                            }
                        />
                    </div>
                </div>
            }
        >
            {pending ? (
                <SkeletonRows tall />
            ) : total === 0 || (payouts.length === 0 && !query) ? (
                <EmptyState
                    icon={Wallet}
                    title={EMPTY_TITLE}
                    description={EMPTY_LEDE}
                />
            ) : (
                <DataTable
                    {...config}
                    data={payouts}
                    className="-mx-4 -mt-2.5 -mb-4"
                />
            )}
        </Panel>
    );
}

AdminPaymentsMain.displayName = "AdminPaymentsMain";

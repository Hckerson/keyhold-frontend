"use client";

import { Receipt } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { Panel } from "@/components/ui/panel";
import { PanelInset } from "@/components/ui/panel-inset";
import { FilterPills } from "@/components/patterns/filter-pills";
import { PurchaseTable } from "@/components/features/dashboard/purchase-table";
import { PURCHASE_FILTERS, type PurchaseFilter } from "@/lib/utils/purchases";
import type { Purchase } from "@/lib/types";

const LEDGER_TITLE = "Your Purchases";
const LEDGER_LEDE = "Every sale you have funded and where the money sits";
const EMPTY_TITLE = "No purchases yet";
const EMPTY_LEDE =
    "Once an accepted offer is paid, the sale and its escrow appear here.";
const LOADING_TITLE = "Loading your purchases";
const LOADING_LEDE = "Fetching every sale and its escrow position.";

export interface TransactionsMainProps {
    purchases: Purchase[];
    filter: PurchaseFilter;
    counts: Record<PurchaseFilter, number>;
    pending?: boolean;
    releasingId: string | null;
    onFilterChange: (filter: PurchaseFilter) => void;
    onRelease: (escrowId: string) => void;
}

export function TransactionsMain({
    purchases,
    filter,
    counts,
    pending,
    releasingId,
    onFilterChange,
    onRelease,
}: TransactionsMainProps) {
    return (
        <div className="console-span-2 flex flex-col gap-3">
            <Panel
                title={LEDGER_TITLE}
                description={LEDGER_LEDE}
                count={purchases.length}
            >
                <div className="flex min-h-11 flex-wrap items-center gap-2 py-1.5">
                    <FilterPills<PurchaseFilter>
                        filters={PURCHASE_FILTERS}
                        active={filter}
                        onChange={onFilterChange}
                        counts={counts}
                    />
                </div>

                {purchases.length > 0 ? (
                    <PanelInset scroll className="mt-0">
                        <PurchaseTable
                            purchases={purchases}
                            releasingId={releasingId}
                            onRelease={onRelease}
                        />
                    </PanelInset>
                ) : (
                    <EmptyState
                        icon={Receipt}
                        title={pending ? LOADING_TITLE : EMPTY_TITLE}
                        description={pending ? LOADING_LEDE : EMPTY_LEDE}
                    />
                )}
            </Panel>
        </div>
    );
}

TransactionsMain.displayName = "TransactionsMain";

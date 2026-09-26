"use client";

import { useMemo, useState } from "react";
import { TransactionsHeader } from "@/components/sections/dashboard/transactions-header";
import { TransactionsMain } from "@/components/sections/dashboard/transactions-main";
import { TransactionsRail } from "@/components/sections/dashboard/transactions-rail";
import { TransactionsStatBand } from "@/components/sections/dashboard/transactions-stat-band";
import { ReleaseEscrowModal } from "@/components/features/dashboard/release-escrow-modal";
import { ConsoleUnavailable } from "@/components/patterns/console-unavailable";
import { CONSOLE_FALLBACKS } from "@/lib/config/console-fallbacks";
import {
    countByFilter,
    matchesFilter,
    purchaseStats,
    purchasesSummary,
    rankPurchases,
    type PurchaseFilter,
} from "@/lib/utils/purchases";
import { useConfirmation } from "@/lib/hooks/use-confirmation";
import { useReleaseEscrow } from "@/lib/hooks/use-escrow";
import { usePurchases } from "@/lib/hooks/use-transactions";
import { toPurchases } from "@/lib/utils/to-purchase";

export function TransactionsConsole() {
    const { data, isPending, isError, refetch } = usePurchases();
    const release = useReleaseEscrow();
    const confirmation = useConfirmation(release);

    const [filter, setFilter] = useState<PurchaseFilter>("all");

    const purchases = useMemo(() => toPurchases(data ?? []), [data]);

    const ranked = useMemo(() => rankPurchases(purchases), [purchases]);
    const counts = useMemo(() => countByFilter(purchases), [purchases]);
    const stats = useMemo(() => purchaseStats(purchases), [purchases]);

    const visible = useMemo(
        () => ranked.filter((purchase) => matchesFilter(purchase, filter)),
        [ranked, filter],
    );

    const confirming = purchases.find(
        (purchase) => purchase.escrowId === confirmation.target,
    );

    const releasingId = release.isPending ? (release.variables ?? null) : null;

    const onConfirm = () => {
        if (confirmation.target) confirmation.confirm(confirmation.target);
    };

    if (isError)
        return (
            <ConsoleUnavailable
                fallback={CONSOLE_FALLBACKS.buyerTransactions}
                onRetry={() => void refetch()}
            />
        );

    return (
        <div className="flex flex-col gap-4">
            <TransactionsHeader summary={purchasesSummary(purchases)} />

            <TransactionsStatBand stats={stats} pending={isPending} />

            <div className="console-split gap-3">
                <TransactionsMain
                    purchases={visible}
                    filter={filter}
                    counts={counts}
                    pending={isPending}
                    releasingId={releasingId}
                    onFilterChange={setFilter}
                    onRelease={confirmation.request}
                />
                <TransactionsRail purchases={purchases} />
            </div>

            <ReleaseEscrowModal
                purchase={confirming}
                pending={confirmation.pending}
                failed={confirmation.failed}
                onClose={confirmation.dismiss}
                onConfirm={onConfirm}
            />
        </div>
    );
}

TransactionsConsole.displayName = "TransactionsConsole";

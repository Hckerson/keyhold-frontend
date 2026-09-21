"use client";

import { useCallback, useMemo, useState } from "react";
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
import { useReleaseEscrow } from "@/lib/hooks/use-escrow";
import { usePurchases } from "@/lib/hooks/use-transactions";
import { toPurchases } from "@/lib/utils/to-purchase";

export function TransactionsConsole() {
    const { data, isPending, isError, refetch } = usePurchases();
    const release = useReleaseEscrow();

    const [filter, setFilter] = useState<PurchaseFilter>("all");
    const [confirmingId, setConfirmingId] = useState<string | null>(null);

    const purchases = useMemo(() => toPurchases(data ?? []), [data]);

    const ranked = useMemo(() => rankPurchases(purchases), [purchases]);
    const counts = useMemo(() => countByFilter(purchases), [purchases]);
    const stats = useMemo(() => purchaseStats(purchases), [purchases]);

    const visible = useMemo(
        () => ranked.filter((purchase) => matchesFilter(purchase, filter)),
        [ranked, filter],
    );

    const confirming = purchases.find(
        (purchase) => purchase.escrowId === confirmingId,
    );

    const releasingId = release.isPending ? (release.variables ?? null) : null;

    const onRelease = useCallback(
        (escrowId: string) => {
            if (!release.isPending) release.reset();
            setConfirmingId(escrowId);
        },
        [release],
    );

    const onConfirm = () => {
        if (!confirmingId) return;
        release.mutate(confirmingId, {
            onSuccess: () => setConfirmingId(null),
        });
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
                    onRelease={onRelease}
                />
                <TransactionsRail purchases={purchases} />
            </div>

            <ReleaseEscrowModal
                purchase={confirming}
                pending={release.isPending}
                failed={release.isError && release.variables === confirmingId}
                onClose={() => setConfirmingId(null)}
                onConfirm={onConfirm}
            />
        </div>
    );
}

TransactionsConsole.displayName = "TransactionsConsole";

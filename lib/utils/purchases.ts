import { Banknote, Clock, ShieldCheck, Wallet } from "lucide-react";
import type { ShareDatum } from "@/components/patterns/share-row";
import type { StatDatum } from "@/components/patterns/stat-cell";
import {
    ESCROW_STATES,
    ESCROW_STATUS_KEYS,
    ESCROW_STATUS_LABELS,
    PURCHASE_STATES,
} from "@/lib/config/escrow-tones";
import { TRANSACTION_STATUSES } from "@/lib/enums/enums";
import type { Purchase } from "@/lib/types";
import { formatCompactUsd } from "@/lib/utils/format";
import { percentOf, sum } from "@/lib/utils/math";

const MS_PER_DAY = 24 * 60 * 60 * 1000;
const NO_VALUE = "—";

export type PurchaseFilter = "all" | "open" | "settled";

export const PURCHASE_FILTERS: { id: PurchaseFilter; label: string }[] = [
    { id: "all", label: "All" },
    { id: "open", label: "In progress" },
    { id: "settled", label: "Settled" },
];

export const isHeld = (purchase: Purchase) => purchase.escrowStatus === "HELD";

export const isSettled = (purchase: Purchase) =>
    purchase.status === "COMPLETED" || purchase.status === "CANCELLED";

export const heldPurchases = (purchases: Purchase[]) =>
    purchases.filter(isHeld);

export const heldValue = (purchases: Purchase[]) =>
    sum(heldPurchases(purchases).map((purchase) => purchase.escrowAmount ?? 0));

export const inspectionDaysLeft = (purchase: Purchase) => {
    if (!purchase.inspectionEndsAt) return null;
    const remaining =
        new Date(purchase.inspectionEndsAt).getTime() - Date.now();
    return Math.ceil(remaining / MS_PER_DAY);
};

export const inspectionLabel = (purchase: Purchase) => {
    const days = inspectionDaysLeft(purchase);
    if (days === null) return NO_VALUE;
    if (days <= 0) return "Window closed";
    return `${days}d left`;
};

export const escrowLabel = (purchase: Purchase) =>
    purchase.escrowStatus
        ? ESCROW_STATUS_LABELS[purchase.escrowStatus]
        : NO_VALUE;

export const canRelease = (purchase: Purchase) =>
    isHeld(purchase) && purchase.escrowId !== null;

export const matchesFilter = (purchase: Purchase, filter: PurchaseFilter) => {
    if (filter === "open") return !isSettled(purchase);
    if (filter === "settled") return isSettled(purchase);
    return true;
};

export const countByFilter = (
    purchases: Purchase[],
): Record<PurchaseFilter, number> => ({
    all: purchases.length,
    open: purchases.filter((purchase) => !isSettled(purchase)).length,
    settled: purchases.filter(isSettled).length,
});

export const rankPurchases = (purchases: Purchase[]) =>
    [...purchases].sort(
        (a, b) =>
            Number(canRelease(b)) - Number(canRelease(a)) ||
            Number(!isSettled(b)) - Number(!isSettled(a)) ||
            new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime(),
    );

export const purchaseStats = (purchases: Purchase[]): StatDatum[] => [
    {
        id: "held",
        icon: ShieldCheck,
        label: "In escrow",
        value: `${heldPurchases(purchases).length}`,
        tone: "warning",
    },
    {
        id: "held-value",
        icon: Wallet,
        label: "Funds held",
        value: formatCompactUsd(heldValue(purchases)),
        tone: "highlight",
    },
    {
        id: "releasable",
        icon: Clock,
        label: "Ready to release",
        value: `${purchases.filter(canRelease).length}`,
        tone: "accent",
    },
    {
        id: "settled",
        icon: Banknote,
        label: "Settled",
        value: `${purchases.filter(isSettled).length}`,
        tone: "success",
    },
];

export const purchasesSummary = (purchases: Purchase[]) =>
    `${heldPurchases(purchases).length} in escrow · ${formatCompactUsd(
        heldValue(purchases),
    )} held`;

export const escrowShares = (purchases: Purchase[]): ShareDatum[] =>
    ESCROW_STATUS_KEYS.map((id) => {
        const count = purchases.filter(
            (purchase) => purchase.escrowStatus === id,
        ).length;
        return {
            id,
            icon: ESCROW_STATES[id].icon,
            label: ESCROW_STATES[id].label,
            value: `${count}`,
            percent: percentOf(count, purchases.length),
            tone: ESCROW_STATES[id].chartTone,
        };
    });

export const stageShares = (purchases: Purchase[]): ShareDatum[] =>
    TRANSACTION_STATUSES.map((id) => {
        const count = purchases.filter(
            (purchase) => purchase.status === id,
        ).length;
        return {
            id,
            icon: PURCHASE_STATES[id].icon,
            label: PURCHASE_STATES[id].label,
            value: `${count}`,
            percent: percentOf(count, purchases.length),
            tone: PURCHASE_STATES[id].chartTone,
        };
    });

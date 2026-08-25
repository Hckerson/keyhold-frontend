"use client";

import Link from "next/link";
import { m } from "motion/react";
import { Button } from "@/components/ui/button";
import { StatusDot } from "@/components/patterns/status-dot";
import { ListingThumb } from "@/components/features/shared/listing-thumb";
import { ESCROW_STATES, PURCHASE_STATES } from "@/lib/config/escrow-tones";
import { TABLE_ROW_MOTION } from "@/lib/config/motion";
import { canRelease, inspectionLabel } from "@/lib/utils/purchases";
import type { Purchase } from "@/lib/types";
import { cn, formatMillions } from "@/lib/utils";

const RELEASE_LABEL = "Release funds";
const NO_ESCROW = "—";

export interface PurchaseRowProps {
    purchase: Purchase;
    releasing: boolean;
    onRelease: (escrowId: string) => void;
}

export function PurchaseRow({
    purchase,
    releasing,
    onRelease,
}: PurchaseRowProps) {
    const state = PURCHASE_STATES[purchase.status];
    const escrow = purchase.escrowStatus
        ? ESCROW_STATES[purchase.escrowStatus]
        : null;

    return (
        <m.tr
            {...TABLE_ROW_MOTION}
            className={cn(
                "hover:bg-background-muted ease-smooth h-11 transition-colors",
            )}
        >
            <td className="py-0">
                <Link
                    href={`/listing/${purchase.listingId}`}
                    className="group flex min-w-0 items-center gap-2"
                >
                    <ListingThumb src={purchase.photo} alt={purchase.address} />
                    <span className="min-w-0 truncate text-xs">
                        <span className="text-text group-hover:text-accent ease-smooth font-medium transition-colors">
                            {purchase.address}
                        </span>
                        <span className="text-text-muted">
                            {" · "}
                            {purchase.locality}
                        </span>
                    </span>
                </Link>
            </td>
            <td className="text-text py-0 pl-3 text-right text-xs font-semibold tabular-nums">
                {formatMillions(purchase.price, 2)}
            </td>
            <td className="py-0 pl-3">
                <span className="flex min-w-0 items-center gap-1.5">
                    <StatusDot tone={state.tone} />
                    <span className="text-text-secondary truncate text-xs">
                        {state.label}
                    </span>
                </span>
            </td>
            <td className="py-0 pl-3">
                {escrow ? (
                    <span className="flex min-w-0 items-center gap-1.5">
                        <StatusDot tone={escrow.tone} />
                        <span className="text-text-secondary truncate text-xs">
                            {escrow.label}
                        </span>
                    </span>
                ) : (
                    <span className="micro-label">{NO_ESCROW}</span>
                )}
            </td>
            <td className="text-text-secondary py-0 pl-3 text-right text-xs tabular-nums">
                {inspectionLabel(purchase)}
            </td>
            <td className="py-0 pl-3 text-right">
                {canRelease(purchase) ? (
                    <Button
                        type="button"
                        variant="primary"
                        size="sm"
                        disabled={releasing}
                        onClick={() =>
                            purchase.escrowId && onRelease(purchase.escrowId)
                        }
                    >
                        {RELEASE_LABEL}
                    </Button>
                ) : (
                    <span className="micro-label">{state.label}</span>
                )}
            </td>
        </m.tr>
    );
}

PurchaseRow.displayName = "PurchaseRow";

"use client";

import Link from "next/link";
import { m } from "motion/react";
import { Button } from "@/components/ui/button";
import { ListingThumb } from "@/components/features/shared/listing-thumb";
import { OfferGapChip } from "@/components/features/dashboard/offer-gap-chip";
import { OfferStatusGlyph } from "@/components/features/dashboard/offer-status-glyph";
import { OFFER_STATUSES } from "@/lib/config/offer-tones";
import { gapPercent, isOpen } from "@/lib/data/offers";
import type { Offer } from "@/lib/types";
import { cn, formatAge, formatMillions } from "@/lib/utils";
import { TABLE_ROW_MOTION } from "@/lib/config/motion";

const NO_COUNTER = "—";
const WITHDRAW_LABEL = "Withdraw";

export interface OfferRowProps {
    offer: Offer;
    onWithdraw: (id: string) => void;
}

export function OfferRow({ offer, onWithdraw }: OfferRowProps) {
    const open = isOpen(offer);

    return (
        <m.tr
            {...TABLE_ROW_MOTION}
            className={cn(
                "ease-smooth h-11 transition-colors",
                offer.status === "countered"
                    ? "bg-accent-light/40"
                    : "hover:bg-background-muted",
            )}
        >
            <td className="py-0">
                <span className="flex min-w-0 items-center gap-2">
                    <OfferStatusGlyph status={offer.status} />
                    <span className="text-text-secondary min-w-0 truncate text-xs">
                        {OFFER_STATUSES[offer.status].label}
                    </span>
                </span>
            </td>
            <td className="py-0 pl-3">
                <Link
                    href={`/dashboard/offers/${offer.id}`}
                    className="group flex min-w-0 items-center gap-2"
                >
                    <ListingThumb src={offer.photo} alt={offer.address} />
                    <span className="min-w-0 truncate text-xs">
                        <span className="text-text group-hover:text-accent ease-smooth font-medium transition-colors">
                            {offer.address}
                        </span>
                        <span className="text-text-muted">
                            {" · "}
                            {offer.locality}
                        </span>
                    </span>
                </Link>
            </td>
            <td className="text-text py-0 pl-3 text-right text-xs font-semibold tabular-nums">
                {formatMillions(offer.offerPrice, 2)}
            </td>
            <td className="text-text-secondary py-0 pl-3 text-right text-xs tabular-nums">
                {formatMillions(offer.listPrice, 2)}
            </td>
            <td className="py-0 pl-3 text-right">
                {offer.counterPrice === undefined ? (
                    <span className="text-text-muted text-xs">
                        {NO_COUNTER}
                    </span>
                ) : (
                    <span className="text-info text-xs font-medium tabular-nums">
                        {formatMillions(offer.counterPrice, 2)}
                    </span>
                )}
            </td>
            <td className="py-0 pl-3 text-right">
                <OfferGapChip percent={gapPercent(offer)} />
            </td>
            <td className="text-text-secondary py-0 pl-3 text-right text-xs tabular-nums">
                {formatAge(offer.minutesAgo)}
            </td>
            <td className="py-0 pl-3 text-right">
                {open ? (
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="text-error hover:text-error"
                        onClick={() => onWithdraw(offer.id)}
                    >
                        {WITHDRAW_LABEL}
                    </Button>
                ) : (
                    <span className="micro-label">
                        {OFFER_STATUSES[offer.status].label}
                    </span>
                )}
            </td>
        </m.tr>
    );
}

OfferRow.displayName = "OfferRow";

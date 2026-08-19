"use client";

import { m } from "motion/react";
import { Checkbox } from "@/components/ui/forms/checkbox";
import { StatusDot } from "@/components/patterns/status-dot";
import { ListingThumb } from "@/components/features/shared/listing-thumb";
import { ListingExposureMeter } from "@/components/features/agent/listing-exposure-meter";
import { chartToneText } from "@/lib/config/chart-tones";
import { AGE_BANDS, LISTING_STATUSES } from "@/lib/config/listing-tones";
import { ageBandOf, exposureOf } from "@/lib/data/agent-listings";
import type { ManagedListing } from "@/lib/types";
import { TABLE_ROW_MOTION } from "@/lib/config/motion";
import { cn, formatMillions } from "@/lib/utils";

const DAYS_SUFFIX = "d";

export interface ListingRowProps {
    listing: ManagedListing;
    peak: number;
    selected: boolean;
    onSelectedChange: (id: string, selected: boolean) => void;
}

export function ListingRow({
    listing,
    peak,
    selected,
    onSelectedChange,
}: ListingRowProps) {
    const status = LISTING_STATUSES[listing.status];
    const age = AGE_BANDS[ageBandOf(listing)];

    return (
        <m.tr
            {...TABLE_ROW_MOTION}
            className={cn(
                "ease-smooth h-11 transition-colors",
                selected ? "bg-accent-light/40" : "hover:bg-background-muted",
            )}
        >
            <td className="py-0">
                <Checkbox
                    id={`listing-${listing.id}`}
                    checked={selected}
                    aria-label={`Select ${listing.address}`}
                    onChange={(event) =>
                        onSelectedChange(listing.id, event.target.checked)
                    }
                />
            </td>
            <td className="py-0">
                <div className="flex min-w-0 items-center gap-2">
                    <ListingThumb src={listing.photo} alt={listing.address} />
                    <span className="min-w-0 truncate text-xs">
                        <span className="text-text font-medium">
                            {listing.address}
                        </span>
                        <span className="text-text-muted">
                            {" · "}
                            {listing.locality}
                        </span>
                    </span>
                </div>
            </td>
            <td className="py-0 pl-3">
                <span className="flex min-w-0 items-center gap-1.5">
                    <StatusDot tone={status.tone} />
                    <span className="text-text-secondary min-w-0 truncate text-xs">
                        {status.label}
                    </span>
                </span>
            </td>
            <td className="text-text py-0 pl-3 text-right text-xs font-semibold tabular-nums">
                {formatMillions(listing.price, 2)}
            </td>
            <td
                className={cn(
                    "py-0 pl-3 text-right text-xs tabular-nums",
                    chartToneText[age.tone],
                )}
            >
                {listing.listedDaysAgo}
                {DAYS_SUFFIX}
            </td>
            <td className="py-0 pl-3">
                <ListingExposureMeter percent={exposureOf(listing, peak)} />
            </td>
            <td className="text-text-secondary py-0 pl-3 text-right text-xs tabular-nums">
                {listing.showings}
            </td>
            <td
                className={cn(
                    "py-0 pl-3 text-right text-xs tabular-nums",
                    listing.offers > 0
                        ? "text-highlight-dark font-semibold"
                        : "text-text-muted",
                )}
            >
                {listing.offers}
            </td>
        </m.tr>
    );
}

ListingRow.displayName = "ListingRow";

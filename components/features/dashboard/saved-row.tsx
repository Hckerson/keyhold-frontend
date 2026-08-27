"use client";

import Link from "next/link";
import { m } from "motion/react";
import { Trash2 } from "lucide-react";
import { ListingThumb } from "@/components/features/shared/listing-thumb";
import { SavedMatchMeter } from "@/components/features/dashboard/saved-match-meter";
import { SavedMoveMark } from "@/components/features/dashboard/saved-move-mark";
import { SavedStatusMark } from "@/components/features/dashboard/saved-status-mark";
import { chartToneText } from "@/lib/config/chart-tones";
import { watchTone } from "@/lib/config/saved-tones";
import { movePercent } from "@/lib/data/saved-listings";
import type { SavedListing } from "@/lib/types";
import { cn, formatMillions } from "@/lib/utils";
import { TABLE_ROW_MOTION } from "@/lib/config/motion";
import { PUBLIC_ROUTES } from "@/lib/constants";

const DAYS_SUFFIX = "d";
const REMOVE_LABEL = "Remove";

export interface SavedRowProps {
    listing: SavedListing;
    onRemove: (id: string) => void;
}

export function SavedRow({ listing, onRemove }: SavedRowProps) {
    return (
        <m.tr
            {...TABLE_ROW_MOTION}
            className="ease-smooth hover:bg-background-muted h-11 transition-colors"
        >
            <td className="py-0">
                <Link
                    href={PUBLIC_ROUTES.listing(listing.id)}
                    className="group flex min-w-0 items-center gap-2"
                >
                    <ListingThumb src={listing.photo} alt={listing.address} />
                    <span className="min-w-0 truncate text-xs">
                        <span className="text-text group-hover:text-accent ease-smooth font-medium transition-colors">
                            {listing.address}
                        </span>
                        <span className="text-text-muted">
                            {" · "}
                            {listing.locality}
                        </span>
                    </span>
                </Link>
            </td>
            <td className="py-0 pl-3">
                <SavedStatusMark status={listing.status} />
            </td>
            <td className="text-text py-0 pl-3 text-right text-xs font-semibold tabular-nums">
                {formatMillions(listing.price, 2)}
            </td>
            <td className="py-0 pl-3 text-right">
                <SavedMoveMark percent={movePercent(listing)} />
            </td>
            <td className="py-0 pl-3">
                <SavedMatchMeter score={listing.matchScore} />
            </td>
            <td className="text-text-secondary py-0 pl-3 text-right text-xs tabular-nums">
                {listing.savedDaysAgo}
                {DAYS_SUFFIX}
            </td>
            <td
                className={cn(
                    "py-0 pl-3 text-right text-xs tabular-nums",
                    chartToneText[watchTone(listing.viewedDaysAgo)],
                )}
            >
                {listing.viewedDaysAgo}
                {DAYS_SUFFIX}
            </td>
            <td className="py-0 pl-3">
                <button
                    type="button"
                    aria-label={`${REMOVE_LABEL} ${listing.address}`}
                    onClick={() => onRemove(listing.id)}
                    className="text-text-muted hover:bg-error-light hover:text-error ease-smooth focus-visible:ring-accent ml-auto grid size-5 place-items-center rounded-md transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none"
                >
                    <Trash2
                        className="size-3"
                        strokeWidth={1.5}
                        aria-hidden="true"
                    />
                </button>
            </td>
        </m.tr>
    );
}

SavedRow.displayName = "SavedRow";

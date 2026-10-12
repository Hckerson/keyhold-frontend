"use client";

import { m } from "motion/react";
import { AgeMark } from "@/components/features/shared/age-mark";
import { ListingThumb } from "@/components/features/shared/listing-thumb";
import { CheckPips } from "@/components/features/admin/check-pips";
import { ReportCountMark } from "@/components/features/admin/report-count-mark";
import { LIST_ROW_MOTION } from "@/lib/config/motion";
import { isOpen } from "@/lib/data/admin-listings";
import { cn, formatMillions } from "@/lib/utils";
import type { ModerationListing } from "@/lib/types";

const REVIEW_PREFIX = "Review";

export interface ModerationQueueRowProps {
    listing: ModerationListing;
    onOpen: (id: string) => void;
}

export function ModerationQueueRow({
    listing,
    onOpen,
}: ModerationQueueRowProps) {
    const open = isOpen(listing);
    const settled = !open && "opacity-60";

    return (
        <m.li {...LIST_ROW_MOTION} className="overflow-hidden">
            <div className="queue-grid hover:bg-background-muted ease-smooth h-11 rounded-md px-2 transition-colors duration-200">
                <button
                    type="button"
                    aria-label={`${REVIEW_PREFIX} ${listing.address}, ${listing.locality}`}
                    onClick={() => onOpen(listing.id)}
                    className={cn(
                        "group focus-visible:ring-accent flex min-w-0 items-center gap-2.5 rounded-sm text-left text-xs focus-visible:ring-2 focus-visible:outline-none",
                        settled,
                    )}
                >
                    <ListingThumb
                        src={listing.photos[0] ?? null}
                        alt=""
                        className="aspect-video h-8 w-auto"
                    />
                    <span className="min-w-0 truncate">
                        <span className="text-text group-hover:text-accent ease-smooth font-medium transition-colors">
                            {listing.address}
                        </span>
                        <span className="text-text-muted">
                            {" · "}
                            {listing.locality}
                        </span>
                    </span>
                </button>
                <CheckPips
                    compliance={listing.compliance}
                    openOnly
                    className={cn("queue-grid__wide", settled)}
                />
                <ReportCountMark
                    reports={listing.reports}
                    className={cn("queue-grid__wide justify-end", settled)}
                />
                {open ? (
                    <AgeMark
                        minutes={listing.queuedMinutes}
                        className="queue-grid__wide justify-end"
                    />
                ) : (
                    <span className="queue-grid__wide" />
                )}

                <span
                    className={cn(
                        "text-text text-right text-xs tabular-nums",
                        settled,
                    )}
                >
                    {formatMillions(listing.price, 2)}
                </span>
            </div>
        </m.li>
    );
}

ModerationQueueRow.displayName = "ModerationQueueRow";

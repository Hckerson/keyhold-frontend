"use client";

import { m } from "motion/react";
import { AgeMark } from "@/components/features/shared/age-mark";
import { ListingThumb } from "@/components/features/shared/listing-thumb";
import { CheckPips } from "@/components/features/admin/check-pips";
import { ModerationRowActions } from "@/components/features/admin/moderation-row-actions";
import { ModerationStatusMark } from "@/components/features/admin/moderation-status-mark";
import { ReportCountMark } from "@/components/features/admin/report-count-mark";
import { LIST_ROW_MOTION } from "@/lib/config/motion";
import { isOpen } from "@/lib/data/admin-listings";
import { cn, formatMillions } from "@/lib/utils";
import type { DecisionMode, ModerationListing } from "@/lib/types";

const REVIEW_PREFIX = "Review";

export interface ModerationQueueRowProps {
    listing: ModerationListing;
    approvingId?: string;
    onOpen: (id: string) => void;
    onApprove: (id: string) => void;
    onDecide: (mode: DecisionMode, id: string) => void;
}

export function ModerationQueueRow({
    listing,
    approvingId,
    onOpen,
    onApprove,
    onDecide,
}: ModerationQueueRowProps) {
    const settled = !isOpen(listing) && "opacity-60";

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
                    <ListingThumb src={listing.photos[0] ?? null} alt="" />
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

                <ModerationStatusMark
                    status={listing.status}
                    className={cn("queue-grid__wide", settled)}
                />
                <CheckPips
                    compliance={listing.compliance}
                    className={cn("queue-grid__wide", settled)}
                />
                <ReportCountMark
                    reports={listing.reports}
                    className={cn("queue-grid__wide justify-end", settled)}
                />
                <AgeMark
                    minutes={listing.queuedMinutes}
                    className={cn("queue-grid__wide justify-end", settled)}
                />

                <span
                    className={cn(
                        "text-text text-right text-xs font-semibold tabular-nums",
                        settled,
                    )}
                >
                    {formatMillions(listing.price, 2)}
                </span>

                <ModerationRowActions
                    listing={listing}
                    approvingId={approvingId}
                    onApprove={onApprove}
                    onDecide={onDecide}
                />
            </div>
        </m.li>
    );
}

ModerationQueueRow.displayName = "ModerationQueueRow";

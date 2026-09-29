"use client";

import { m } from "motion/react";
import { StatusDot } from "@/components/patterns/status-dot";
import { AgeMark } from "@/components/features/shared/age-mark";
import { ListingThumb } from "@/components/features/shared/listing-thumb";
import { CheckPips } from "@/components/features/admin/check-pips";
import { ModerationRowActions } from "@/components/features/admin/moderation-row-actions";
import { ReportCountMark } from "@/components/features/admin/report-count-mark";
import { LIST_ROW_MOTION } from "@/lib/config/motion";
import { MODERATION_STATUSES } from "@/lib/config/moderation-tones";
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
    const status = MODERATION_STATUSES[listing.status];

    return (
        <m.li
            {...LIST_ROW_MOTION}
            className={cn(
                "queue-row hover:bg-background-muted ease-smooth min-h-11 rounded-md px-2 py-1.5 transition-colors duration-200",
                !isOpen(listing) && "opacity-60",
            )}
        >
            <span className="queue-row__thumb relative flex">
                <ListingThumb
                    src={listing.photos[0] ?? null}
                    alt=""
                    className="size-8"
                />
                <span
                    title={status.label}
                    className="bg-background absolute -right-1 -bottom-1 grid size-3 place-items-center rounded-full"
                >
                    <StatusDot tone={status.tone} />
                    <span className="sr-only">{status.label}</span>
                </span>
            </span>

            <button
                type="button"
                aria-label={`${REVIEW_PREFIX} ${listing.address}, ${listing.locality}`}
                onClick={() => onOpen(listing.id)}
                className="queue-row__name group focus-visible:ring-accent flex min-w-0 items-baseline gap-1.5 rounded-xs text-left text-xs focus-visible:ring-2 focus-visible:outline-none"
            >
                <span className="text-text group-hover:text-accent ease-smooth truncate font-medium transition-colors">
                    {listing.address}
                </span>
                <span className="text-text-muted shrink-0">
                    {listing.locality}
                </span>
            </button>

            <span className="queue-row__signals flex items-center gap-3">
                <CheckPips compliance={listing.compliance} />
                <ReportCountMark
                    reports={listing.reports}
                    className="w-6 text-right"
                />
                <AgeMark
                    minutes={listing.queuedMinutes}
                    className="w-8 text-right"
                />
            </span>

            <span className="queue-row__price text-text text-right text-xs font-semibold tabular-nums">
                {formatMillions(listing.price, 2)}
            </span>

            <span className="queue-row__actions">
                <ModerationRowActions
                    listing={listing}
                    approvingId={approvingId}
                    onApprove={onApprove}
                    onDecide={onDecide}
                />
            </span>
        </m.li>
    );
}

ModerationQueueRow.displayName = "ModerationQueueRow";

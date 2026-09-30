"use client";

import { AnimatePresence } from "motion/react";
import { ModerationQueueRow } from "@/components/features/admin/moderation-queue-row";
import { cn } from "@/lib/utils";
import type { DecisionMode, ModerationListing } from "@/lib/types";

const LIST_LABEL =
    "Submitted listings by review status, compliance checks, user reports, time in queue and asking price";

const COLUMNS = [
    { label: "Listing" },
    { label: "Status", wide: true },
    { label: "Checks", wide: true },
    { label: "Reports", wide: true, end: true },
    { label: "Age", wide: true, end: true },
    { label: "Asking", end: true },
    { label: "Decide", end: true },
];

export interface ModerationQueueListProps {
    listings: ModerationListing[];
    approvingId?: string;
    onOpen: (id: string) => void;
    onApprove: (id: string) => void;
    onDecide: (mode: DecisionMode, id: string) => void;
}

export function ModerationQueueList({
    listings,
    ...actions
}: ModerationQueueListProps) {
    return (
        <div className="scroll-y -mx-2 max-h-(--queue-max-height)">
            <div
                aria-hidden="true"
                className="queue-grid bg-background border-border-light sticky top-0 z-10 h-9 border-b px-2"
            >
                {COLUMNS.map(({ label, wide, end }) => (
                    <span
                        key={label}
                        className={cn(
                            "micro-label",
                            wide && "queue-grid__wide",
                            end && "justify-end text-right",
                        )}
                    >
                        {label}
                    </span>
                ))}
            </div>
            <ul aria-label={LIST_LABEL} className="flex flex-col pt-1">
                <AnimatePresence initial={false}>
                    {listings.map((listing) => (
                        <ModerationQueueRow
                            key={listing.id}
                            listing={listing}
                            {...actions}
                        />
                    ))}
                </AnimatePresence>
            </ul>
        </div>
    );
}

ModerationQueueList.displayName = "ModerationQueueList";

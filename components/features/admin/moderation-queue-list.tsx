"use client";

import { AnimatePresence } from "motion/react";
import { ModerationQueueRow } from "@/components/features/admin/moderation-queue-row";
import type { DecisionMode, ModerationListing } from "@/lib/types";

const LIST_LABEL =
    "Submitted listings by review status, compliance checks, user reports, time in queue and asking price";

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
        <ul
            aria-label={LIST_LABEL}
            className="divide-border-light -mx-2 flex flex-col divide-y"
        >
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
    );
}

ModerationQueueList.displayName = "ModerationQueueList";

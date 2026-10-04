"use client";

import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { ModerationQueueRow } from "@/components/features/admin/moderation-queue-row";
import { isOpen } from "@/lib/data/admin-listings";
import { cn } from "@/lib/utils";
import type { DecisionMode, ModerationListing } from "@/lib/types";

const LIST_LABEL =
    "Submitted listings by review status, compliance checks, user reports, time in queue and asking price";
const DECIDED_LABEL = "Decided";
const DECIDED_LIST_LABEL = "Listings that already have a decision";

const COLUMNS = [
    { id: "listing", label: "Listing" },
    { id: "checks", label: "Checks", wide: true },
    { id: "reports", label: "Reports", wide: true, end: true },
    { id: "age", label: "Age", wide: true, end: true },
    { id: "asking", label: "Asking", end: true },
    { id: "actions", label: "" },
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
    const [showDecided, setShowDecided] = useState(false);
    const waiting = listings.filter(isOpen);
    const decided = listings.filter((listing) => !isOpen(listing));
    const split = waiting.length > 0 && decided.length > 0;
    const renderRows = (rows: ModerationListing[]) => (
        <AnimatePresence initial={false}>
            {rows.map((listing) => (
                <ModerationQueueRow
                    key={listing.id}
                    listing={listing}
                    {...actions}
                />
            ))}
        </AnimatePresence>
    );

    return (
        <div className="queue-frame scroll-y -mx-2">
            <div
                aria-hidden="true"
                className="queue-grid bg-background border-border-light sticky top-0 z-10 h-9 border-b px-2"
            >
                {COLUMNS.map(({ id, label, wide, end }) => (
                    <span
                        key={id}
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
                {renderRows(waiting.length > 0 ? waiting : decided)}
            </ul>
            {split && (
                <button
                    type="button"
                    aria-expanded={showDecided}
                    onClick={() => setShowDecided((shown) => !shown)}
                    className="border-border-light text-text-secondary hover:text-text focus-visible:ring-accent ease-smooth mt-1 flex h-9 w-full items-center gap-2 border-t px-2 text-xs transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-inset"
                >
                    <ChevronDown
                        aria-hidden="true"
                        strokeWidth={1.5}
                        className={cn(
                            "ease-smooth size-3 transition-transform duration-200",
                            showDecided && "rotate-180",
                        )}
                    />
                    {DECIDED_LABEL}
                    <span className="text-text-muted tabular-nums">
                        {decided.length}
                    </span>
                </button>
            )}
            {split && showDecided && (
                <ul
                    aria-label={DECIDED_LIST_LABEL}
                    className="flex flex-col pb-1"
                >
                    {renderRows(decided)}
                </ul>
            )}
        </div>
    );
}

ModerationQueueList.displayName = "ModerationQueueList";

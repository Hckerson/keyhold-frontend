"use client";

import { Check, PenLine, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DecisionMode, ModerationListing } from "@/lib/types";

const ICON_BUTTON =
    "ease-smooth focus-visible:ring-accent text-text-muted grid size-5 place-items-center rounded-md transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none";

const APPROVE_LABEL = "Approve";
const CHANGES_LABEL = "Request changes on";
const REJECT_LABEL = "Reject";

export interface ModerationRowActionsProps {
    listing: ModerationListing;
    onApprove: (id: string) => void;
    onDecide: (mode: DecisionMode, id: string) => void;
}

export function ModerationRowActions({
    listing,
    onApprove,
    onDecide,
}: ModerationRowActionsProps) {
    const target = `${listing.address}, ${listing.locality}`;

    return (
        <span className="flex items-center justify-end gap-1">
            {listing.status !== "approved" && (
                <button
                    type="button"
                    aria-label={`${APPROVE_LABEL} ${target}`}
                    onClick={() => onApprove(listing.id)}
                    className={cn(
                        ICON_BUTTON,
                        "hover:bg-success-light hover:text-success",
                    )}
                >
                    <Check
                        className="size-3"
                        strokeWidth={1.5}
                        aria-hidden="true"
                    />
                </button>
            )}
            <button
                type="button"
                aria-label={`${CHANGES_LABEL} ${target}`}
                onClick={() => onDecide("changes", listing.id)}
                className={cn(
                    ICON_BUTTON,
                    "hover:bg-warning-light hover:text-warning",
                )}
            >
                <PenLine
                    className="size-3"
                    strokeWidth={1.5}
                    aria-hidden="true"
                />
            </button>
            {listing.status !== "rejected" && (
                <button
                    type="button"
                    aria-label={`${REJECT_LABEL} ${target}`}
                    onClick={() => onDecide("reject", listing.id)}
                    className={cn(
                        ICON_BUTTON,
                        "hover:bg-error-light hover:text-error",
                    )}
                >
                    <X
                        className="size-3"
                        strokeWidth={1.5}
                        aria-hidden="true"
                    />
                </button>
            )}
        </span>
    );
}

ModerationRowActions.displayName = "ModerationRowActions";

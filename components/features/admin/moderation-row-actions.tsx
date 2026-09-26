"use client";

import { Check, PenLine, X } from "lucide-react";
import { IconButton } from "@/components/ui/icon-button";
import type { DecisionMode, ModerationListing } from "@/lib/types";

const APPROVE_LABEL = "Approve";
const CHANGES_LABEL = "Request changes on";
const REJECT_LABEL = "Reject";

export interface ModerationRowActionsProps {
    listing: ModerationListing;
    approvingId?: string;
    onApprove: (id: string) => void;
    onDecide: (mode: DecisionMode, id: string) => void;
}

export function ModerationRowActions({
    listing,
    approvingId,
    onApprove,
    onDecide,
}: ModerationRowActionsProps) {
    const target = `${listing.address}, ${listing.locality}`;

    return (
        <span className="flex items-center justify-end gap-1">
            {listing.status !== "approved" && (
                <IconButton
                    tone="success"
                    icon={Check}
                    label={`${APPROVE_LABEL} ${target}`}
                    disabled={approvingId !== undefined}
                    onClick={() => onApprove(listing.id)}
                />
            )}
            <IconButton
                tone="warning"
                icon={PenLine}
                label={`${CHANGES_LABEL} ${target}`}
                onClick={() => onDecide("changes", listing.id)}
            />
            {listing.status !== "rejected" && (
                <IconButton
                    tone="error"
                    icon={X}
                    label={`${REJECT_LABEL} ${target}`}
                    onClick={() => onDecide("reject", listing.id)}
                />
            )}
        </span>
    );
}

ModerationRowActions.displayName = "ModerationRowActions";

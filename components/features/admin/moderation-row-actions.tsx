"use client";

import { IconButton } from "@/components/ui/icon-button";
import { MODERATION_ACTIONS } from "@/lib/config/moderation-actions";
import type { DecisionMode, ModerationListing } from "@/lib/types";

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
            {MODERATION_ACTIONS.map((action) =>
                action.hiddenFor === listing.status ? (
                    <span
                        key={action.mode}
                        aria-hidden="true"
                        className="size-7"
                    />
                ) : (
                    <IconButton
                        key={action.mode}
                        size="md"
                        tone={action.tone}
                        icon={action.icon}
                        label={`${action.rowLabel} ${target}`}
                        disabled={
                            action.mode === "approve" &&
                            approvingId !== undefined
                        }
                        className={action.restTone}
                        onClick={() =>
                            action.mode === "approve"
                                ? onApprove(listing.id)
                                : onDecide(action.mode, listing.id)
                        }
                    />
                ),
            )}
        </span>
    );
}

ModerationRowActions.displayName = "ModerationRowActions";

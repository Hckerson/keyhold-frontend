"use client";

import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MODERATION_ACTION } from "@/lib/config/moderation-actions";
import type { DecisionMode, ModerationListing } from "@/lib/types";

const REVIEW_ACTION = "Review";

export interface ModerationInspectorActionsProps {
    listing: ModerationListing;
    approvingId?: string;
    onOpen: (id: string) => void;
    onApprove: (id: string) => void;
    onDecide: (mode: DecisionMode, id: string) => void;
}

export function ModerationInspectorActions({
    listing,
    approvingId,
    onOpen,
    onApprove,
    onDecide,
}: ModerationInspectorActionsProps) {
    return (
        <footer className="reveal-scope border-border-light border-t p-3">
            <div className="grid grid-cols-2 gap-2">
                <Button
                    type="button"
                    icon={Eye}
                    onClick={() => onOpen(listing.id)}
                >
                    {REVIEW_ACTION}
                </Button>
                <Button
                    type="button"
                    emphasis="solid"
                    tone="accent"
                    icon={MODERATION_ACTION.approve.icon}
                    isLoading={approvingId === listing.id}
                    disabled={approvingId !== undefined}
                    onClick={() => onApprove(listing.id)}
                >
                    {MODERATION_ACTION.approve.label}
                </Button>
            </div>
            <div className="reveal-fold">
                <div>
                    <div className="-m-0.5 grid grid-cols-2 gap-2 p-0.5 pt-2.5">
                        <Button
                            type="button"
                            icon={MODERATION_ACTION.changes.icon}
                            onClick={() => onDecide("changes", listing.id)}
                        >
                            {MODERATION_ACTION.changes.label}
                        </Button>
                        <Button
                            type="button"
                            tone="error"
                            icon={MODERATION_ACTION.reject.icon}
                            onClick={() => onDecide("reject", listing.id)}
                        >
                            {MODERATION_ACTION.reject.label}
                        </Button>
                    </div>
                </div>
            </div>
        </footer>
    );
}

ModerationInspectorActions.displayName = "ModerationInspectorActions";

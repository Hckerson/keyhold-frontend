"use client";

import { ModerationInspector } from "@/components/sections/admin/moderation-inspector";
import type { DecisionMode, ModerationListing } from "@/lib/types";

export interface ModerationRailProps {
    focus?: ModerationListing;
    pending?: boolean;
    approvingId?: string;
    onOpen: (id: string) => void;
    onApprove: (id: string) => void;
    onDecide: (mode: DecisionMode, id: string) => void;
}

export function ModerationRail({ focus, ...inspector }: ModerationRailProps) {
    return (
        <div className="min-w-0 self-start">
            <ModerationInspector listing={focus} {...inspector} />
        </div>
    );
}

ModerationRail.displayName = "ModerationRail";

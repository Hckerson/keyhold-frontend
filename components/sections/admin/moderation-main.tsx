"use client";

import { ClipboardCheck } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { Panel } from "@/components/ui/panel";
import { PresenceSwap } from "@/components/patterns/presence-swap";
import { CheckBreakdown } from "@/components/features/admin/check-breakdown";
import { ModerationQueueList } from "@/components/features/admin/moderation-queue-list";
import type { ModerationCheckFilter } from "@/lib/data/admin-listings";
import type {
    CheckBreakdown as CheckBreakdownData,
    DecisionMode,
    ModerationListing,
} from "@/lib/types";

const QUEUE_TITLE = "Review Queue";
const EMPTY_TITLE = "Nothing matches this view";
const EMPTY_LEDE =
    "Widen the status filter or drop the check filter to see the full queue.";
const LOADING_TITLE = "Loading the queue";
const LOADING_LEDE = "Fetching reported listings.";

export interface ModerationMainProps {
    listings: ModerationListing[];
    reading: string;
    checks: CheckBreakdownData[];
    checkFilter: ModerationCheckFilter;
    pending?: boolean;
    approvingId?: string;
    onCheckFilterChange: (filter: ModerationCheckFilter) => void;
    onOpen: (id: string) => void;
    onApprove: (id: string) => void;
    onDecide: (mode: DecisionMode, id: string) => void;
}

export function ModerationMain({
    listings,
    reading,
    checks,
    checkFilter,
    pending,
    onCheckFilterChange,
    ...actions
}: ModerationMainProps) {
    return (
        <Panel
            title={QUEUE_TITLE}
            description={reading}
            count={listings.length}
            className="console-span-2 min-w-0"
            bodyClassName="space-y-3"
        >
            <CheckBreakdown
                rows={checks}
                active={checkFilter}
                onChange={onCheckFilterChange}
            />
            <PresenceSwap swapKey={listings.length > 0 ? "rows" : "empty"}>
                {listings.length > 0 ? (
                    <ModerationQueueList listings={listings} {...actions} />
                ) : (
                    <EmptyState
                        icon={ClipboardCheck}
                        title={pending ? LOADING_TITLE : EMPTY_TITLE}
                        description={pending ? LOADING_LEDE : EMPTY_LEDE}
                    />
                )}
            </PresenceSwap>
        </Panel>
    );
}

ModerationMain.displayName = "ModerationMain";

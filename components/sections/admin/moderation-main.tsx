"use client";

import { ClipboardCheck } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { Panel } from "@/components/ui/panel";
import { PresenceSwap } from "@/components/patterns/presence-swap";
import { SkeletonRows } from "@/components/patterns/skeleton-rows";
import { CheckBreakdown } from "@/components/features/admin/check-breakdown";
import { ModerationQueueList } from "@/components/features/admin/moderation-queue-list";
import { ModerationAgents } from "@/components/sections/admin/moderation-agents";
import type { ModerationCheckFilter } from "@/lib/data/admin-listings";
import type {
    CheckBreakdown as CheckBreakdownData,
    DecisionMode,
    ModerationAgentLoad,
    ModerationListing,
} from "@/lib/types";

const QUEUE_TITLE = "Review Queue";
const LOADING_READING = "Reading the review queue";
const EMPTY_TITLE = "Nothing matches this view";
const EMPTY_LEDE =
    "Widen the status filter or drop the check filter to see the full queue.";

export interface ModerationMainProps {
    listings: ModerationListing[];
    total: number;
    reading: string;
    checks: CheckBreakdownData[];
    checkFilter: ModerationCheckFilter;
    loads: ModerationAgentLoad[];
    pending?: boolean;
    approvingId?: string;
    onCheckFilterChange: (filter: ModerationCheckFilter) => void;
    onOpen: (id: string) => void;
    onApprove: (id: string) => void;
    onDecide: (mode: DecisionMode, id: string) => void;
}

export function ModerationMain({
    listings,
    total,
    reading,
    checks,
    checkFilter,
    loads,
    pending,
    onCheckFilterChange,
    ...actions
}: ModerationMainProps) {
    return (
        <div className="console-span-2 flex min-w-0 flex-col gap-3 self-start">
            <Panel
                title={QUEUE_TITLE}
                description={pending ? LOADING_READING : reading}
                count={
                    pending
                        ? undefined
                        : listings.length === total
                          ? total
                          : `${listings.length} / ${total}`
                }
                bodyClassName="space-y-3"
            >
                <CheckBreakdown
                    rows={checks}
                    active={checkFilter}
                    pending={pending}
                    onChange={onCheckFilterChange}
                />
                <PresenceSwap
                    swapKey={
                        listings.length > 0
                            ? "rows"
                            : pending
                              ? "pending"
                              : "empty"
                    }
                >
                    {listings.length > 0 ? (
                        <ModerationQueueList listings={listings} {...actions} />
                    ) : pending ? (
                        <SkeletonRows tall />
                    ) : (
                        <EmptyState
                            icon={ClipboardCheck}
                            title={EMPTY_TITLE}
                            description={EMPTY_LEDE}
                        />
                    )}
                </PresenceSwap>
            </Panel>
            <ModerationAgents loads={loads} pending={pending} />
        </div>
    );
}

ModerationMain.displayName = "ModerationMain";

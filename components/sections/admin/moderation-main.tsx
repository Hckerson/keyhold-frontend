"use client";

import { ClipboardCheck } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { PresenceSwap } from "@/components/patterns/presence-swap";
import { Panel } from "@/components/ui/panel";
import { PanelInset } from "@/components/ui/panel-inset";
import { PanelLink } from "@/components/features/shared/panel-link";
import { ModerationListingTable } from "@/components/features/admin/moderation-listing-table";
import { ModerationFocusHero } from "@/components/sections/admin/moderation-focus-hero";
import { ModerationToolbar } from "@/components/sections/admin/moderation-toolbar";
import type {
    ModerationCheckFilter,
    ModerationStatusFilter,
} from "@/lib/data/admin-listings";
import type { DecisionMode, ModerationListing } from "@/lib/types";

const QUEUE_TITLE = "Review Queue";
const QUEUE_LEDE = "Every submission behind the one you decide next";
const QUEUE_ACTION = "Platform reports";
const EMPTY_TITLE = "Nothing matches this view";
const EMPTY_LEDE =
    "Widen the status filter or drop back to every check to see the full queue.";

export interface ModerationMainProps {
    focus?: ModerationListing;
    listings: ModerationListing[];
    statusFilter: ModerationStatusFilter;
    checkFilter: ModerationCheckFilter;
    counts: Record<ModerationStatusFilter, number>;
    onStatusFilterChange: (filter: ModerationStatusFilter) => void;
    onCheckFilterChange: (filter: ModerationCheckFilter) => void;
    onOpen: (id: string) => void;
    onApprove: (id: string) => void;
    onDecide: (mode: DecisionMode, id: string) => void;
}

export function ModerationMain({
    focus,
    listings,
    statusFilter,
    checkFilter,
    counts,
    onStatusFilterChange,
    onCheckFilterChange,
    onOpen,
    onApprove,
    onDecide,
}: ModerationMainProps) {
    return (
        <div className="console-span-2 flex flex-col gap-3">
            {focus && (
                <PresenceSwap swapKey={focus.id}>
                    <ModerationFocusHero
                        listing={focus}
                        onOpen={onOpen}
                        onApprove={onApprove}
                        onDecide={onDecide}
                    />
                </PresenceSwap>
            )}

            <Panel
                title={QUEUE_TITLE}
                description={QUEUE_LEDE}
                count={listings.length}
                action={
                    <PanelLink href="/admin/reports" label={QUEUE_ACTION} />
                }
                toolbar={
                    <ModerationToolbar
                        statusFilter={statusFilter}
                        checkFilter={checkFilter}
                        counts={counts}
                        onStatusFilterChange={onStatusFilterChange}
                        onCheckFilterChange={onCheckFilterChange}
                    />
                }
            >
                <PresenceSwap swapKey={listings.length > 0 ? "rows" : "empty"}>
                    {listings.length > 0 ? (
                        <PanelInset scroll>
                            <ModerationListingTable
                                listings={listings}
                                onOpen={onOpen}
                                onApprove={onApprove}
                                onDecide={onDecide}
                            />
                        </PanelInset>
                    ) : (
                        <EmptyState
                            icon={ClipboardCheck}
                            title={EMPTY_TITLE}
                            description={EMPTY_LEDE}
                        />
                    )}
                </PresenceSwap>
            </Panel>
        </div>
    );
}

ModerationMain.displayName = "ModerationMain";

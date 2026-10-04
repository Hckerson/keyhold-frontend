"use client";

import { useCallback, useMemo, useState } from "react";
import { ModerationApproveModal } from "@/components/features/admin/moderation-approve-modal";
import { ModerationDecisionModal } from "@/components/features/admin/moderation-decision-modal";
import { ModerationReviewModal } from "@/components/features/admin/moderation-review-modal";
import { ModerationHeader } from "@/components/sections/admin/moderation-header";
import { ModerationMain } from "@/components/sections/admin/moderation-main";
import { ModerationRail } from "@/components/sections/admin/moderation-rail";
import { ModerationStatBand } from "@/components/sections/admin/moderation-stat-band";
import { ConsoleUnavailable } from "@/components/patterns/console-unavailable";
import { CONSOLE_FALLBACKS } from "@/lib/config/console-fallbacks";
import {
    matchesModerationFilters,
    moderationDesk,
    type ModerationCheckFilter,
    type ModerationStatusFilter,
} from "@/lib/data/admin-listings";
import { useFlags } from "@/lib/hooks/use-flags";
import { useModerationActions } from "@/lib/hooks/use-moderation-actions";
import { toModerationQueue } from "@/lib/utils/to-moderation-listing";
import type { DecisionMode } from "@/lib/types";

const EVERY_STATUS: ModerationStatusFilter = "all";
const EVERY_CHECK: ModerationCheckFilter = "all";
const QUEUE_PAGE_SIZE = 100;

export function ModerationConsole() {
    const flags = useFlags({ type: "PROPERTY", limit: QUEUE_PAGE_SIZE });

    const [statusFilter, setStatusFilter] =
        useState<ModerationStatusFilter>(EVERY_STATUS);
    const [checkFilter, setCheckFilter] =
        useState<ModerationCheckFilter>(EVERY_CHECK);
    const [reviewId, setReviewId] = useState<string | null>(null);

    const listings = useMemo(
        () => toModerationQueue(flags.data?.items ?? []),
        [flags.data?.items],
    );

    const desk = useMemo(() => moderationDesk(listings), [listings]);

    const actions = useModerationActions(listings);

    const visible = useMemo(
        () =>
            desk.ranked.filter((listing) =>
                matchesModerationFilters(listing, statusFilter, checkFilter),
            ),
        [desk.ranked, statusFilter, checkFilter],
    );

    const onOpen = useCallback((id: string) => setReviewId(id), []);

    const onCloseReview = useCallback(() => setReviewId(null), []);

    const onApprove = (id: string) => {
        setReviewId(null);
        actions.approval.request(id);
    };

    const onDecide = (mode: DecisionMode, id: string) => {
        setReviewId(null);
        actions.decide(mode, id);
    };

    if (flags.isError)
        return (
            <ConsoleUnavailable
                fallback={CONSOLE_FALLBACKS.adminListings}
                onRetry={() => void flags.refetch()}
            />
        );

    return (
        <div className="flex flex-col gap-4">
            <ModerationHeader />

            <ModerationStatBand
                tiles={desk.tiles}
                active={statusFilter}
                pending={flags.isPending}
                onChange={setStatusFilter}
            />

            <div className="console-split gap-3">
                <ModerationMain
                    listings={visible}
                    total={listings.length}
                    reading={desk.reading}
                    checks={desk.checks}
                    checkFilter={checkFilter}
                    loads={desk.loads}
                    pending={flags.isPending}
                    approvingId={actions.approvingId}
                    onCheckFilterChange={setCheckFilter}
                    onOpen={onOpen}
                    onApprove={onApprove}
                    onDecide={onDecide}
                />
                <ModerationRail
                    focus={desk.focus}
                    pending={flags.isPending}
                    approvingId={actions.approvingId}
                    onOpen={onOpen}
                    onApprove={onApprove}
                    onDecide={onDecide}
                />
            </div>

            <ModerationReviewModal
                listing={listings.find((listing) => listing.id === reviewId)}
                approvingId={actions.approvingId}
                onClose={onCloseReview}
                onApprove={onApprove}
                onDecide={onDecide}
            />

            <ModerationApproveModal
                listing={actions.approvingListing}
                pending={actions.approval.pending}
                failed={actions.approval.failed}
                onClose={actions.approval.dismiss}
                onConfirm={actions.confirmApproval}
            />

            <ModerationDecisionModal
                decision={actions.decision.target}
                listings={actions.decidingListings}
                note={actions.note}
                pending={actions.decision.pending}
                failed={actions.decision.failed}
                onNoteChange={actions.setNote}
                onClose={actions.decision.dismiss}
                onSubmit={actions.submit}
            />
        </div>
    );
}

ModerationConsole.displayName = "ModerationConsole";

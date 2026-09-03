"use client";

import { useCallback, useMemo, useState } from "react";
import { ModerationDecisionModal } from "@/components/features/admin/moderation-decision-modal";
import { ModerationReviewModal } from "@/components/features/admin/moderation-review-modal";
import { ModerationHeader } from "@/components/sections/admin/moderation-header";
import { ModerationMain } from "@/components/sections/admin/moderation-main";
import { ModerationRail } from "@/components/sections/admin/moderation-rail";
import { ModerationStatBand } from "@/components/sections/admin/moderation-stat-band";
import { ConsoleUnavailable } from "@/components/patterns/console-unavailable";
import { CONSOLE_FALLBACKS } from "@/lib/config/console-fallbacks";
import {
    countByStatus,
    focusListing,
    matchesModerationFilters,
    moderationStats,
    moderationSummary,
    rankListings,
    type ModerationCheckFilter,
    type ModerationStatusFilter,
} from "@/lib/data/admin-listings";
import { useFlags, useSettleFlag } from "@/lib/hooks/use-flags";
import { useModerateProperty } from "@/lib/hooks/use-properties";
import { toModerationQueue } from "@/lib/utils/to-moderation-listing";
import type { DecisionMode, ModerationDecision } from "@/lib/types";
import type { ModerationDecision as ModerationDecisionValue } from "@/lib/enums/enums";

const EVERY_STATUS: ModerationStatusFilter = "all";
const EVERY_CHECK: ModerationCheckFilter = "all";
const QUEUE_PAGE_SIZE = 100;

export function ModerationConsole() {
    const flags = useFlags({ type: "PROPERTY", limit: QUEUE_PAGE_SIZE });
    const moderate = useModerateProperty();
    const settleFlag = useSettleFlag();

    const [statusFilter, setStatusFilter] =
        useState<ModerationStatusFilter>(EVERY_STATUS);
    const [checkFilter, setCheckFilter] =
        useState<ModerationCheckFilter>(EVERY_CHECK);
    const [reviewId, setReviewId] = useState<string | null>(null);
    const [decision, setDecision] = useState<ModerationDecision | null>(null);
    const [note, setNote] = useState("");

    const listings = useMemo(
        () => toModerationQueue(flags.data?.items ?? []),
        [flags.data?.items],
    );

    const ranked = useMemo(() => rankListings(listings), [listings]);
    const counts = useMemo(() => countByStatus(listings), [listings]);
    const stats = useMemo(() => moderationStats(listings), [listings]);
    const focus = useMemo(() => focusListing(listings), [listings]);

    const visible = useMemo(
        () =>
            ranked.filter((listing) =>
                matchesModerationFilters(listing, statusFilter, checkFilter),
            ),
        [ranked, statusFilter, checkFilter],
    );

    const settle = useCallback(
        (
            flagId: string,
            mode: ModerationDecisionValue,
            reviewNote?: string,
        ) => {
            const listing = listings.find((item) => item.id === flagId);
            if (!listing) return;

            moderate.mutate(
                { id: listing.listingId, decision: mode, note: reviewNote },
                { onSuccess: () => settleFlag.mutate({ id: flagId }) },
            );
        },
        [listings, moderate, settleFlag],
    );

    const onOpen = useCallback((id: string) => setReviewId(id), []);

    const onCloseReview = useCallback(() => setReviewId(null), []);

    const onApprove = useCallback(
        (id: string) => {
            setReviewId(null);
            settle(id, "approve");
        },
        [settle],
    );

    const onDecide = useCallback((mode: DecisionMode, id: string) => {
        setReviewId(null);
        setNote("");
        setDecision({ mode, ids: [id] });
    }, []);

    const onCloseDecision = useCallback(() => {
        setDecision(null);
        setNote("");
    }, []);

    const onSubmitDecision = () => {
        const trimmed = note.trim();
        if (!decision || !trimmed) return;
        decision.ids.forEach((id) => settle(id, decision.mode, trimmed));
        onCloseDecision();
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
            <ModerationHeader summary={moderationSummary(listings)} />

            <ModerationStatBand stats={stats} />

            <div className="console-split gap-3">
                <ModerationMain
                    focus={focus}
                    listings={visible}
                    statusFilter={statusFilter}
                    checkFilter={checkFilter}
                    counts={counts}
                    pending={flags.isPending}
                    onStatusFilterChange={setStatusFilter}
                    onCheckFilterChange={setCheckFilter}
                    onOpen={onOpen}
                    onApprove={onApprove}
                    onDecide={onDecide}
                />
                <ModerationRail listings={listings} />
            </div>

            <ModerationReviewModal
                listing={listings.find((listing) => listing.id === reviewId)}
                onClose={onCloseReview}
                onApprove={onApprove}
                onDecide={onDecide}
            />

            <ModerationDecisionModal
                decision={decision}
                note={note}
                onNoteChange={setNote}
                onClose={onCloseDecision}
                onSubmit={onSubmitDecision}
            />
        </div>
    );
}

ModerationConsole.displayName = "ModerationConsole";

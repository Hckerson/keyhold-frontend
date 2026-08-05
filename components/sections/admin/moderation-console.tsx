"use client";

import { useCallback, useMemo, useState } from "react";
import { ModerationDecisionModal } from "@/components/features/admin/moderation-decision-modal";
import { ModerationReviewModal } from "@/components/features/admin/moderation-review-modal";
import { ModerationHeader } from "@/components/sections/admin/moderation-header";
import { ModerationMain } from "@/components/sections/admin/moderation-main";
import { ModerationRail } from "@/components/sections/admin/moderation-rail";
import { ModerationStatBand } from "@/components/sections/admin/moderation-stat-band";
import {
    MODERATION_LISTINGS,
    approveListings,
    countByStatus,
    decideListings,
    focusListing,
    matchesModerationFilters,
    moderationStats,
    moderationSummary,
    rankListings,
    type ModerationCheckFilter,
    type ModerationStatusFilter,
} from "@/lib/data/admin-listings";
import type { DecisionMode, ModerationDecision } from "@/lib/types";

const EVERY_STATUS: ModerationStatusFilter = "all";
const EVERY_CHECK: ModerationCheckFilter = "all";

export function ModerationConsole() {
    const [listings, setListings] = useState(MODERATION_LISTINGS);
    const [statusFilter, setStatusFilter] =
        useState<ModerationStatusFilter>(EVERY_STATUS);
    const [checkFilter, setCheckFilter] =
        useState<ModerationCheckFilter>(EVERY_CHECK);
    const [reviewId, setReviewId] = useState<string | null>(null);
    const [decision, setDecision] = useState<ModerationDecision | null>(null);
    const [note, setNote] = useState("");

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

    const onOpen = useCallback((id: string) => setReviewId(id), []);

    const onCloseReview = useCallback(() => setReviewId(null), []);

    const onApprove = useCallback((id: string) => {
        setReviewId(null);
        setListings((current) => approveListings(current, [id]));
    }, []);

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
        setListings((current) =>
            decideListings(current, decision.ids, decision.mode, trimmed),
        );
        onCloseDecision();
    };

    return (
        <div className="flex flex-col gap-4">
            <ModerationHeader summary={moderationSummary(listings)} />

            <ModerationStatBand stats={stats} />

            <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
                <ModerationMain
                    focus={focus}
                    listings={visible}
                    statusFilter={statusFilter}
                    checkFilter={checkFilter}
                    counts={counts}
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

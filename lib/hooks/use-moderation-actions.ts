"use client";

import { useMemo, useState } from "react";
import { FEEDBACK } from "@/lib/config/feedback";
import { useConfirmation } from "@/lib/hooks/use-confirmation";
import {
    useModerateFlag,
    type ModerateFlagInput,
} from "@/lib/hooks/use-moderate-flag";
import { toModerationTargets } from "@/lib/utils/to-moderation-listing";
import type {
    DecisionMode,
    ModerationDecision,
    ModerationListing,
} from "@/lib/types";

export function useModerationActions(
    listings: ModerationListing[],
    onApproved: (id: string) => void,
) {
    const approval = useModerateFlag(FEEDBACK.approveFlaggedListing);
    const decision = useConfirmation<ModerateFlagInput, ModerationDecision>(
        useModerateFlag(FEEDBACK.decideFlaggedListing),
    );
    const [note, setNote] = useState("");

    const decidingListings = useMemo(
        () =>
            listings.filter((listing) =>
                decision.target?.ids.includes(listing.id),
            ),
        [listings, decision.target],
    );

    const approve = (id: string) => {
        if (approval.isPending) return;
        approval.mutate(
            {
                targets: toModerationTargets(
                    listings.filter((listing) => listing.id === id),
                ),
                decision: "approve",
            },
            { onSuccess: () => onApproved(id) },
        );
    };

    const decide = (mode: DecisionMode, id: string) => {
        if (decision.pending) return;
        setNote("");
        decision.request({ mode, ids: [id] });
    };

    const submit = () => {
        const trimmed = note.trim();
        if (!decision.target || !trimmed) return;
        decision.confirm({
            targets: toModerationTargets(decidingListings),
            decision: decision.target.mode,
            note: trimmed,
        });
    };

    return {
        approvingId: approval.isPending
            ? approval.variables?.targets.at(0)?.flagId
            : undefined,
        approve,
        decision,
        decidingListings,
        note,
        setNote,
        decide,
        submit,
    };
}

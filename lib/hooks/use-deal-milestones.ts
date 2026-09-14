"use client";

import {
    useAttachMilestoneDocument,
    useOfferMilestones,
    useUpdateMilestone,
} from "@/lib/hooks/use-offers";
import type { MilestoneKind } from "@/lib/enums/enums";
import type { DealMilestone } from "@/lib/validations/offer";

const startOfDay = (date: string) => new Date(`${date}T00:00:00`).toISOString();

export function useDealMilestones(offerId: string, enabled = true) {
    const milestones = useOfferMilestones(offerId, enabled);
    const update = useUpdateMilestone(offerId);
    const attach = useAttachMilestoneDocument(offerId);

    const onDateChange = (kind: MilestoneKind, date: string) => {
        if (!date) return;
        update.mutate({ kind, status: "SCHEDULED", dueAt: startOfDay(date) });
    };

    const onToggleComplete = (milestone: DealMilestone) =>
        update.mutate({
            kind: milestone.kind,
            status:
                milestone.status === "COMPLETED" ? "SCHEDULED" : "COMPLETED",
        });

    const onAttach = (kind: MilestoneKind, file: File) =>
        attach.mutate({ kind, file });

    return {
        milestones: milestones.data ?? [],
        loading: milestones.isPending,
        busy: update.isPending || attach.isPending,
        onDateChange,
        onToggleComplete,
        onAttach,
    };
}

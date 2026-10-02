"use client";

import { useState } from "react";
import { DOCUMENT_UPLOAD } from "@/lib/config/uploads";
import { screenFiles } from "@/lib/data/file-upload";
import {
    useAttachMilestoneDocument,
    useOfferMilestones,
    useUpdateMilestone,
} from "@/lib/hooks/use-offers";
import type { MilestoneKind } from "@/lib/enums/enums";
import type { DealMilestoneControls, MilestoneDetailsInput } from "@/lib/types";
import type { DealMilestone } from "@/lib/validations/offer";

const startOfDay = (date: string) => new Date(`${date}T00:00:00`).toISOString();

export function useDealMilestones(
    offerId: string,
    enabled = true,
): DealMilestoneControls {
    const milestones = useOfferMilestones(offerId, enabled);
    const update = useUpdateMilestone(offerId);
    const attach = useAttachMilestoneDocument(offerId);
    const [rejected, setRejected] = useState<string>();

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

    const onAttach = (kind: MilestoneKind, file: File) => {
        const screening = screenFiles(
            [file],
            DOCUMENT_UPLOAD.accept,
            DOCUMENT_UPLOAD.maxBytes,
        );

        setRejected(screening.rejected[0]);
        if (screening.accepted.length === 0) return;

        attach.mutate({ kind, file });
    };

    const onSaveDetails = (kind: MilestoneKind, input: MilestoneDetailsInput) =>
        update.mutate({ kind, ...input });

    return {
        milestones: milestones.data ?? [],
        loading: milestones.isPending,
        busy: update.isPending || attach.isPending,
        rejected,
        progress: attach.progress,
        onDateChange,
        onToggleComplete,
        onAttach,
        onSaveDetails,
    };
}

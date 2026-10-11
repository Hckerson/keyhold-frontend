import { format } from "date-fns";
import {
    MILESTONE_KINDS_META,
    MILESTONE_STATUSES_META,
} from "@/lib/config/contingency-tones";
import type { MilestoneKind } from "@/lib/enums/enums";
import type { DealMilestone } from "@/lib/validations/offer";

export const MILESTONE_DATE_FORMAT = "d MMM yyyy";
export const NO_DATE = "—";

export const MILESTONE_COPY = {
    title: "Closing Checklist",
    lede: "Dated milestones between acceptance and completion",
    empty: "Opens when the offer is accepted",
    emptyLede:
        "Inspection, appraisal, financing and closing appear here the moment the seller accepts.",
    due: "Due",
    setDate: "Set date",
    attach: "Attach",
    replace: "Replace",
    complete: "Mark complete",
    reopen: "Reopen",
    appraisedValue: "Appraised value",
    note: "Note",
    details: "Milestone detail",
    edit: "Edit",
    save: "Save",
    cancel: "Cancel",
    notePlaceholder: "What the other side should know",
    uploading: "Upload progress",
} as const;

export const orderMilestones = (milestones: DealMilestone[]) =>
    [...milestones].sort(
        (a, b) =>
            MILESTONE_KINDS_META[a.kind].order -
            MILESTONE_KINDS_META[b.kind].order,
    );

export const milestoneDate = (iso: string | null) =>
    iso ? format(new Date(iso), MILESTONE_DATE_FORMAT) : NO_DATE;

export const settledCount = (milestones: DealMilestone[]) =>
    milestones.filter(
        (milestone) =>
            milestone.status === "COMPLETED" || milestone.status === "WAIVED",
    ).length;

export const isOverdue = (milestone: DealMilestone, now = new Date()) =>
    milestone.status === "SCHEDULED" &&
    milestone.dueAt !== null &&
    new Date(milestone.dueAt) < now;

export const milestoneTone = (milestone: DealMilestone) =>
    isOverdue(milestone)
        ? MILESTONE_STATUSES_META.PENDING.tone
        : MILESTONE_STATUSES_META[milestone.status].tone;

export const nextMilestone = (
    milestones: DealMilestone[],
): MilestoneKind | undefined =>
    orderMilestones(milestones).find(
        (milestone) =>
            milestone.status !== "COMPLETED" && milestone.status !== "WAIVED",
    )?.kind;

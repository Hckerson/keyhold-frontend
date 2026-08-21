import type { SuspensionDraft } from "@/lib/types";

export const SUSPENSION_DURATIONS: { value: string; label: string }[] = [
    { value: "", label: "Indefinite" },
    { value: "7", label: "7 days" },
    { value: "30", label: "30 days" },
    { value: "90", label: "90 days" },
];

export const MIN_SUSPENSION_REASON = 4;

export const EMPTY_SUSPENSION_DRAFT: SuspensionDraft = {
    reason: "",
    duration: "",
    notes: "",
};

export const isSuspensionReady = (draft: SuspensionDraft) =>
    draft.reason.trim().length >= MIN_SUSPENSION_REASON;

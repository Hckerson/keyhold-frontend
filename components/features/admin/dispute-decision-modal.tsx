"use client";

import { ConfirmModal } from "@/components/patterns/confirm-modal";
import { TextareaField } from "@/components/ui/forms/textarea-field";
import {
    DISPUTE_DECISION_COPY,
    type DisputeDecision,
} from "@/lib/data/admin-disputes";

const NOTE_HINT = "Required. Both parties see this on the dispute record.";
const WARNING = {
    title: "This decision is final",
    body: "The dispute is settled and its record becomes read-only. It cannot be reopened.",
};
const FAILURE = {
    title: "The decision was not recorded",
    body: "The dispute is still open and neither party was notified. Try again in a moment.",
};

export interface DisputeDecisionModalProps {
    decision: DisputeDecision | null;
    subjectTitle: string;
    note: string;
    pending: boolean;
    failed: boolean;
    onNoteChange: (value: string) => void;
    onClose: () => void;
    onSubmit: () => void;
}

export function DisputeDecisionModal({
    decision,
    subjectTitle,
    note,
    pending,
    failed,
    onNoteChange,
    onClose,
    onSubmit,
}: DisputeDecisionModalProps) {
    const mode = decision?.mode ?? "resolve";
    const copy = DISPUTE_DECISION_COPY[mode];

    return (
        <ConfirmModal
            open={decision !== null}
            title={copy.title}
            subject={subjectTitle}
            warning={WARNING}
            failure={FAILURE}
            confirmLabel={copy.submit}
            tone={mode === "dismiss" ? "error" : "accent"}
            pending={pending}
            failed={failed}
            confirmDisabled={note.trim().length === 0}
            onClose={onClose}
            onConfirm={onSubmit}
        >
            <div>
                <TextareaField
                    id="dispute-note"
                    name="disputeNote"
                    label={copy.label}
                    rows={4}
                    value={note}
                    disabled={pending}
                    onChange={(event) => onNoteChange(event.target.value)}
                    placeholder={copy.placeholder}
                />
                <p className="text-text-muted mt-1.5 text-xs">{NOTE_HINT}</p>
            </div>
        </ConfirmModal>
    );
}

DisputeDecisionModal.displayName = "DisputeDecisionModal";

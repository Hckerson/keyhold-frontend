"use client";

import { ConfirmModal } from "@/components/patterns/confirm-modal";
import { TextareaField } from "@/components/ui/forms/textarea-field";
import { DISPUTE_DECISION_COPY } from "@/lib/config/dispute-tones";
import { DISPUTE_COPY, noteReady } from "@/lib/data/admin-disputes";
import type { DisputeDecision } from "@/lib/types";

const FAILURE = {
    title: "The decision was not recorded",
    body: "The dispute is still open, no money moved and neither party was notified. Try again in a moment.",
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
    const copy = DISPUTE_DECISION_COPY[decision?.mode ?? "dismiss"];

    return (
        <ConfirmModal
            open={decision !== null}
            title={copy.title}
            subject={subjectTitle}
            warning={copy.warning}
            failure={FAILURE}
            confirmLabel={copy.submit}
            tone="accent"
            pending={pending}
            failed={failed}
            confirmDisabled={!noteReady(note)}
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
                <p className="text-text-muted mt-1.5 text-xs">
                    {DISPUTE_COPY.noteHint}
                </p>
            </div>
        </ConfirmModal>
    );
}

DisputeDecisionModal.displayName = "DisputeDecisionModal";

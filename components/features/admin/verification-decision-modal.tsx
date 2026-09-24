"use client";

import { ConfirmModal } from "@/components/patterns/confirm-modal";
import { TextareaField } from "@/components/ui/forms/textarea-field";
import {
    DECISION_COPY,
    type VerificationDecision,
} from "@/lib/data/admin-verifications";

const NOTE_HINT =
    "Required. The agent receives this message with the decision.";
const WARNING = {
    title: "This decision is final",
    body: "The submission is closed as rejected. The agent has to submit new documents to be verified.",
};
const FAILURE = {
    title: "The rejection was not recorded",
    body: "The submission is still pending and the agent was not notified. Try again in a moment.",
};

export interface VerificationDecisionModalProps {
    decision: VerificationDecision | null;
    applicantName: string;
    note: string;
    pending: boolean;
    failed: boolean;
    onNoteChange: (value: string) => void;
    onClose: () => void;
    onSubmit: () => void;
}

export function VerificationDecisionModal({
    decision,
    applicantName,
    note,
    pending,
    failed,
    onNoteChange,
    onClose,
    onSubmit,
}: VerificationDecisionModalProps) {
    const copy = DECISION_COPY[decision?.mode ?? "reject"];

    return (
        <ConfirmModal
            open={decision !== null}
            title={copy.title}
            subject={applicantName}
            warning={WARNING}
            failure={FAILURE}
            confirmLabel={copy.submit}
            pending={pending}
            failed={failed}
            confirmDisabled={note.trim().length === 0}
            onClose={onClose}
            onConfirm={onSubmit}
        >
            <div>
                <TextareaField
                    id="verification-note"
                    name="verificationNote"
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

VerificationDecisionModal.displayName = "VerificationDecisionModal";

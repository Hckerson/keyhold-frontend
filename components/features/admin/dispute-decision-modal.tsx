"use client";

import { ConfirmModal } from "@/components/patterns/confirm-modal";
import { TextareaField } from "@/components/ui/forms/textarea-field";
import { DISPUTE_COPY, noteReady } from "@/lib/data/admin-disputes";
import { decisionCopy } from "@/lib/data/admin-dispute-detail";
import type { DisputeCase, DisputeDecision } from "@/lib/types";

const FAILURE = {
    title: "The decision was not recorded",
    body: "The dispute is still open, no money moved and neither party was notified. Try again in a moment.",
};

export interface DisputeDecisionModalProps {
    decision: DisputeDecision | null;
    dispute: DisputeCase | null;
    note: string;
    pending: boolean;
    failed: boolean;
    onNoteChange: (value: string) => void;
    onClose: () => void;
    onSubmit: () => void;
}

export function DisputeDecisionModal({
    decision,
    dispute,
    note,
    pending,
    failed,
    onNoteChange,
    onClose,
    onSubmit,
}: DisputeDecisionModalProps) {
    const copy = decisionCopy(decision?.mode ?? "dismiss", dispute);

    return (
        <ConfirmModal
            open={decision !== null}
            title={copy.title}
            subject={dispute?.title}
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

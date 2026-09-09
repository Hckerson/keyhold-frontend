"use client";

import { Button } from "@/components/ui/button";
import { TextareaField } from "@/components/ui/forms/textarea-field";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalTitle,
    ModalBody,
    ModalFooter,
} from "@/components/ui/modal";
import {
    DISPUTE_DECISION_COPY,
    type DisputeDecision,
} from "@/lib/data/admin-disputes";

const CANCEL_LABEL = "Cancel";
const NOTE_HINT = "Required. Both parties see this on the dispute record.";

export interface DisputeDecisionModalProps {
    decision: DisputeDecision | null;
    subjectTitle: string;
    note: string;
    pending: boolean;
    onNoteChange: (value: string) => void;
    onClose: () => void;
    onSubmit: () => void;
}

export function DisputeDecisionModal({
    decision,
    subjectTitle,
    note,
    pending,
    onNoteChange,
    onClose,
    onSubmit,
}: DisputeDecisionModalProps) {
    const copy = decision ? DISPUTE_DECISION_COPY[decision.mode] : null;

    return (
        <Modal
            open={decision !== null}
            onOpenChange={(open) => {
                if (!open) onClose();
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="dispute-decision-title"
        >
            {copy && decision && (
                <ModalContent>
                    <ModalHeader>
                        <ModalTitle id="dispute-decision-title">
                            {copy.title}
                        </ModalTitle>
                        <p className="text-text-secondary mt-1 text-xs">
                            {subjectTitle}
                        </p>
                    </ModalHeader>
                    <ModalBody>
                        <TextareaField
                            id="dispute-note"
                            name="disputeNote"
                            label={copy.label}
                            rows={4}
                            value={note}
                            onChange={(event) =>
                                onNoteChange(event.target.value)
                            }
                            placeholder={copy.placeholder}
                        />
                        <p className="text-text-muted mt-1.5 text-xs">
                            {NOTE_HINT}
                        </p>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose} disabled={pending}>
                            {CANCEL_LABEL}
                        </Button>
                        <Button
                            emphasis="solid"
                            tone={
                                decision.mode === "dismiss" ? "error" : "accent"
                            }
                            disabled={note.trim().length === 0}
                            isLoading={pending}
                            onClick={onSubmit}
                        >
                            {copy.submit}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            )}
        </Modal>
    );
}

DisputeDecisionModal.displayName = "DisputeDecisionModal";

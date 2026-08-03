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
    DECISION_COPY,
    type VerificationDecision,
} from "@/lib/data/admin-verifications";

export interface VerificationDecisionModalProps {
    decision: VerificationDecision | null;
    applicantName: string;
    note: string;
    onNoteChange: (value: string) => void;
    onClose: () => void;
    onSubmit: () => void;
}

export function VerificationDecisionModal({
    decision,
    applicantName,
    note,
    onNoteChange,
    onClose,
    onSubmit,
}: VerificationDecisionModalProps) {
    const copy = decision ? DECISION_COPY[decision.mode] : null;

    return (
        <Modal
            open={decision !== null}
            onOpenChange={(open) => {
                if (!open) onClose();
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="verification-decision-title"
        >
            {copy && decision && (
                <ModalContent>
                    <ModalHeader>
                        <ModalTitle id="verification-decision-title">
                            {copy.title}
                        </ModalTitle>
                        <p className="text-text-secondary mt-1 text-xs">
                            {applicantName}
                        </p>
                    </ModalHeader>
                    <ModalBody>
                        <TextareaField
                            id="verification-note"
                            name="verificationNote"
                            label={copy.label}
                            rows={4}
                            value={note}
                            onChange={(event) =>
                                onNoteChange(event.target.value)
                            }
                            placeholder={copy.placeholder}
                        />
                        <p className="text-text-muted mt-1.5 text-xs">
                            Required. The agent receives this message with the
                            decision.
                        </p>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant="secondary" size="sm" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button
                            variant={
                                decision.mode === "info" ? "primary" : "danger"
                            }
                            size="sm"
                            disabled={note.trim().length === 0}
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

VerificationDecisionModal.displayName = "VerificationDecisionModal";

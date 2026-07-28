"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/forms/textarea";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalTitle,
    ModalBody,
    ModalFooter,
} from "@/components/ui/modal";
import { DECISION_COPY, type Decision } from "@/lib/data/admin-listings";

export interface ModerationDecisionModalProps {
    decision: Decision | null;
    note: string;
    onNoteChange: (value: string) => void;
    onClose: () => void;
    onSubmit: () => void;
}

export function ModerationDecisionModal({
    decision,
    note,
    onNoteChange,
    onClose,
    onSubmit,
}: ModerationDecisionModalProps) {
    const copy = decision ? DECISION_COPY[decision.mode] : null;

    return (
        <Modal
            open={decision !== null}
            onOpenChange={(open) => {
                if (!open) onClose();
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="moderation-decision-title"
        >
            {copy && decision && (
                <ModalContent>
                    <ModalHeader>
                        <ModalTitle id="moderation-decision-title">
                            {copy.title}
                        </ModalTitle>
                        <p className="text-text-secondary mt-1 text-xs tabular-nums">
                            {decision.ids.length} listing
                            {decision.ids.length === 1 ? "" : "s"} selected
                        </p>
                    </ModalHeader>
                    <ModalBody>
                        <label
                            htmlFor="moderation-note"
                            className="micro-label"
                        >
                            {copy.label}
                        </label>
                        <Textarea
                            id="moderation-note"
                            rows={4}
                            value={note}
                            onChange={(event) =>
                                onNoteChange(event.target.value)
                            }
                            placeholder={copy.placeholder}
                            className="mt-1.5"
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
                                decision.mode === "reject"
                                    ? "danger"
                                    : "primary"
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

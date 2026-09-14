"use client";

import { Button } from "@/components/ui/button";
import { TextareaField } from "@/components/ui/forms/textarea-field";
import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalBody,
    ModalFooter,
} from "@/components/ui/modal";
import { MODERATION_DECISIONS } from "@/lib/config/moderation-tones";
import type { ModerationDecision } from "@/lib/types";

const NOTE_ID = "moderation-note";
const NOTE_NAME = "moderationNote";
const NOTE_ROWS = 4;
const NOTE_HINT =
    "Required. The agent receives this message with the decision.";
const CANCEL_ACTION = "Cancel";
const SELECTED_NOUN = "listing";

export interface ModerationDecisionModalProps {
    decision: ModerationDecision | null;
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
    const meta = decision ? MODERATION_DECISIONS[decision.mode] : null;

    return (
        <Modal
            open={decision !== null}
            onOpenChange={(open) => {
                if (!open) onClose();
            }}
        >
            {meta && decision && (
                <>
                    <ModalHeader className="p-4">
                        <ModalTitle>{meta.title}</ModalTitle>
                        <p className="text-text-secondary mt-1 text-xs tabular-nums">
                            {decision.ids.length} {SELECTED_NOUN}
                            {decision.ids.length === 1 ? "" : "s"} selected
                        </p>
                    </ModalHeader>
                    <ModalBody className="p-4">
                        <TextareaField
                            id={NOTE_ID}
                            name={NOTE_NAME}
                            label={meta.field}
                            rows={NOTE_ROWS}
                            value={note}
                            onChange={(event) =>
                                onNoteChange(event.target.value)
                            }
                            placeholder={meta.placeholder}
                        />
                        <p className="text-text-muted mt-1.5 text-xs">
                            {NOTE_HINT}
                        </p>
                    </ModalBody>
                    <ModalFooter className="gap-2 p-4">
                        <Button type="button" onClick={onClose}>
                            {CANCEL_ACTION}
                        </Button>
                        <Button
                            type="button"
                            emphasis="solid"
                            tone={meta.destructive ? "error" : "accent"}
                            disabled={note.trim().length === 0}
                            onClick={onSubmit}
                        >
                            {meta.submit}
                        </Button>
                    </ModalFooter>
                </>
            )}
        </Modal>
    );
}

ModerationDecisionModal.displayName = "ModerationDecisionModal";

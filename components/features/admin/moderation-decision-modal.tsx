"use client";

import { ConfirmModal } from "@/components/patterns/confirm-modal";
import { TextareaField } from "@/components/ui/forms/textarea-field";
import { MODERATION_DECISIONS } from "@/lib/config/moderation-decisions";
import type { ModerationDecision, ModerationListing } from "@/lib/types";

const NOTE_ID = "moderation-note";
const NOTE_NAME = "moderationNote";
const NOTE_ROWS = 4;
const NOTE_HINT =
    "Required. The agent receives this message with the decision.";
const SUBJECT_SEPARATOR = " · ";
const FAILURE = {
    title: "The decision was not recorded",
    body: "The listing is unchanged and the agent was not notified. Try again in a moment.",
};

export interface ModerationDecisionModalProps {
    decision: ModerationDecision | null;
    listings: ModerationListing[];
    note: string;
    pending: boolean;
    failed: boolean;
    onNoteChange: (value: string) => void;
    onClose: () => void;
    onSubmit: () => void;
}

export function ModerationDecisionModal({
    decision,
    listings,
    note,
    pending,
    failed,
    onNoteChange,
    onClose,
    onSubmit,
}: ModerationDecisionModalProps) {
    const meta = MODERATION_DECISIONS[decision?.mode ?? "changes"];

    return (
        <ConfirmModal
            open={decision !== null}
            title={meta.title}
            subject={listings
                .map((listing) => `${listing.address}, ${listing.locality}`)
                .join(SUBJECT_SEPARATOR)}
            failure={FAILURE}
            confirmLabel={meta.submit}
            tone={meta.destructive ? "error" : "accent"}
            pending={pending}
            failed={failed}
            confirmDisabled={note.trim().length === 0}
            onClose={onClose}
            onConfirm={onSubmit}
        >
            <div>
                <TextareaField
                    id={NOTE_ID}
                    name={NOTE_NAME}
                    label={meta.field}
                    rows={NOTE_ROWS}
                    value={note}
                    disabled={pending}
                    onChange={(event) => onNoteChange(event.target.value)}
                    placeholder={meta.placeholder}
                />
                <p className="text-text-muted mt-1.5 text-xs">{NOTE_HINT}</p>
            </div>
        </ConfirmModal>
    );
}

ModerationDecisionModal.displayName = "ModerationDecisionModal";

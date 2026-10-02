"use client";

import { ConfirmModal } from "@/components/patterns/confirm-modal";
import { Select } from "@/components/ui/forms/select";
import { TextareaField } from "@/components/ui/forms/textarea-field";
import {
    isSuspensionReady,
    SUSPENSION_DURATIONS,
} from "@/lib/config/suspension";
import type { ManagedUser, SuspensionDraft } from "@/lib/types";

const REASON_NAME = "userSuspensionReason";
const NOTES_NAME = "userSuspensionNotes";
const REASON_ROWS = 4;
const NOTES_ROWS = 2;
const MODAL_TITLE = "Suspend account";
const REASON_FIELD = "Reason for suspension";
const REASON_PLACEHOLDER =
    "Explain what the account did and what it must resolve before it is reinstated. This reason is stored with the account.";
const REASON_HINT =
    "Required. A suspended account cannot list, bid or transact until it is reactivated.";
const DURATION_FIELD = "Duration";
const NOTES_FIELD = "Internal notes";
const NOTES_PLACEHOLDER =
    "Context for other moderators. Never shown to the account.";
const SUBMIT_ACTION = "Suspend account";
const WARNING = {
    title: "The account is signed out immediately",
    body: "Every active session ends the moment the suspension is recorded.",
};
const FAILURE = {
    title: "The account was not suspended",
    body: "The account is still active. Try again in a moment.",
};

export interface UserSuspendModalProps {
    user?: ManagedUser;
    draft: SuspensionDraft;
    pending: boolean;
    failed: boolean;
    onDraftChange: (draft: SuspensionDraft) => void;
    onClose: () => void;
    onSubmit: () => void;
}

export function UserSuspendModal({
    user,
    draft,
    pending,
    failed,
    onDraftChange,
    onClose,
    onSubmit,
}: UserSuspendModalProps) {
    const patch = (change: Partial<SuspensionDraft>) =>
        onDraftChange({ ...draft, ...change });

    return (
        <ConfirmModal
            open={user !== undefined}
            title={MODAL_TITLE}
            subject={user && `${user.name} · ${user.email}`}
            warning={WARNING}
            failure={FAILURE}
            confirmLabel={SUBMIT_ACTION}
            pending={pending}
            failed={failed}
            confirmDisabled={!isSuspensionReady(draft)}
            onClose={onClose}
            onConfirm={onSubmit}
        >
            <TextareaField
                name={REASON_NAME}
                label={REASON_FIELD}
                rows={REASON_ROWS}
                value={draft.reason}
                disabled={pending}
                onChange={(event) => patch({ reason: event.target.value })}
                placeholder={REASON_PLACEHOLDER}
            />
            <p className="text-text-muted -mt-1.5 text-xs">{REASON_HINT}</p>

            <div className="flex w-full flex-col gap-1.5">
                <span className="text-text-secondary text-xs font-medium">
                    {DURATION_FIELD}
                </span>
                <Select
                    label={DURATION_FIELD}
                    options={SUSPENSION_DURATIONS}
                    value={draft.duration}
                    disabled={pending}
                    onChange={(duration) => patch({ duration })}
                />
            </div>

            <TextareaField
                name={NOTES_NAME}
                label={NOTES_FIELD}
                rows={NOTES_ROWS}
                value={draft.notes}
                disabled={pending}
                onChange={(event) => patch({ notes: event.target.value })}
                placeholder={NOTES_PLACEHOLDER}
            />
        </ConfirmModal>
    );
}

UserSuspendModal.displayName = "UserSuspendModal";

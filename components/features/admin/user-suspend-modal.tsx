"use client";

import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/forms/select";
import { TextareaField } from "@/components/ui/forms/textarea-field";
import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalBody,
    ModalFooter,
} from "@/components/ui/modal";
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
const CANCEL_ACTION = "Cancel";
const SUBMIT_ACTION = "Suspend account";

export interface UserSuspendModalProps {
    user?: ManagedUser;
    draft: SuspensionDraft;
    pending?: boolean;
    onDraftChange: (draft: SuspensionDraft) => void;
    onClose: () => void;
    onSubmit: () => void;
}

export function UserSuspendModal({
    user,
    draft,
    pending,
    onDraftChange,
    onClose,
    onSubmit,
}: UserSuspendModalProps) {
    const patch = (change: Partial<SuspensionDraft>) =>
        onDraftChange({ ...draft, ...change });

    return (
        <Modal
            open={user !== undefined}
            onOpenChange={(open) => {
                if (!open) onClose();
            }}
        >
            {user && (
                <>
                    <ModalHeader>
                        <ModalTitle>{MODAL_TITLE}</ModalTitle>
                        <p className="text-text-secondary mt-1 truncate text-xs">
                            {user.name} · {user.email}
                        </p>
                    </ModalHeader>

                    <ModalBody className="flex flex-col gap-3">
                        <TextareaField
                            name={REASON_NAME}
                            label={REASON_FIELD}
                            rows={REASON_ROWS}
                            value={draft.reason}
                            onChange={(event) =>
                                patch({ reason: event.target.value })
                            }
                            placeholder={REASON_PLACEHOLDER}
                        />
                        <p className="text-text-muted -mt-1.5 text-xs">
                            {REASON_HINT}
                        </p>

                        <div className="flex w-full flex-col gap-1.5">
                            <span className="text-text-secondary text-xs font-medium">
                                {DURATION_FIELD}
                            </span>
                            <Select
                                label={DURATION_FIELD}
                                options={SUSPENSION_DURATIONS}
                                value={draft.duration}
                                onChange={(duration) => patch({ duration })}
                            />
                        </div>

                        <TextareaField
                            name={NOTES_NAME}
                            label={NOTES_FIELD}
                            rows={NOTES_ROWS}
                            value={draft.notes}
                            onChange={(event) =>
                                patch({ notes: event.target.value })
                            }
                            placeholder={NOTES_PLACEHOLDER}
                        />
                    </ModalBody>

                    <ModalFooter>
                        <Button type="button" onClick={onClose}>
                            {CANCEL_ACTION}
                        </Button>
                        <Button
                            type="button"
                            emphasis="solid"
                            tone="error"
                            disabled={pending || !isSuspensionReady(draft)}
                            onClick={onSubmit}
                        >
                            {SUBMIT_ACTION}
                        </Button>
                    </ModalFooter>
                </>
            )}
        </Modal>
    );
}

UserSuspendModal.displayName = "UserSuspendModal";

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
import type { ManagedUser } from "@/lib/types";

const NOTE_ID = "user-suspension-note";
const NOTE_NAME = "userSuspensionNote";
const NOTE_ROWS = 4;
const MODAL_TITLE = "Suspend account";
const NOTE_FIELD = "Reason for suspension";
const NOTE_PLACEHOLDER =
    "Explain what the account did and what it must resolve before it is reinstated. This reason is stored with the account.";
const NOTE_HINT =
    "Required. A suspended account cannot list, bid or transact until it is reactivated.";
const CANCEL_ACTION = "Cancel";
const SUBMIT_ACTION = "Suspend account";

export interface UserSuspendModalProps {
    user?: ManagedUser;
    note: string;
    onNoteChange: (value: string) => void;
    onClose: () => void;
    onSubmit: () => void;
}

export function UserSuspendModal({
    user,
    note,
    onNoteChange,
    onClose,
    onSubmit,
}: UserSuspendModalProps) {
    return (
        <Modal
            open={user !== undefined}
            onOpenChange={(open) => {
                if (!open) onClose();
            }}
        >
            {user && (
                <>
                    <ModalHeader className="p-4">
                        <ModalTitle>{MODAL_TITLE}</ModalTitle>
                        <p className="text-text-secondary mt-1 truncate text-xs">
                            {user.name} · {user.email}
                        </p>
                    </ModalHeader>

                    <ModalBody className="p-4">
                        <TextareaField
                            id={NOTE_ID}
                            name={NOTE_NAME}
                            label={NOTE_FIELD}
                            rows={NOTE_ROWS}
                            value={note}
                            onChange={(event) =>
                                onNoteChange(event.target.value)
                            }
                            placeholder={NOTE_PLACEHOLDER}
                        />
                        <p className="text-text-muted mt-1.5 text-xs">
                            {NOTE_HINT}
                        </p>
                    </ModalBody>

                    <ModalFooter className="gap-2 p-4">
                        <Button
                            type="button"
                            variant="secondary"
                            size="sm"
                            onClick={onClose}
                        >
                            {CANCEL_ACTION}
                        </Button>
                        <Button
                            type="button"
                            variant="danger"
                            size="sm"
                            disabled={note.trim().length === 0}
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

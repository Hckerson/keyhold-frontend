"use client";

import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/forms/form-field";
import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalBody,
    ModalFooter,
} from "@/components/ui/modal";
import type { RescheduleDraft } from "@/lib/types";

const MODAL_TITLE = "Reschedule Viewing";
const DATE_LABEL = "New date";
const TIME_LABEL = "New time";
const TIME_PLACEHOLDER = "3:00 PM";
const CANCEL_ACTION = "Keep current slot";
const CONFIRM_ACTION = "Propose Change";

export interface RescheduleViewingModalProps {
    address?: string;
    hint: string;
    draft: RescheduleDraft;
    pending?: boolean;
    onDraftChange: (draft: RescheduleDraft) => void;
    onClose: () => void;
    onConfirm: () => void;
}

export function RescheduleViewingModal({
    address,
    hint,
    draft,
    pending = false,
    onDraftChange,
    onClose,
    onConfirm,
}: RescheduleViewingModalProps) {
    return (
        <Modal
            open={address !== undefined}
            onOpenChange={(open) => {
                if (!open) onClose();
            }}
        >
            <ModalHeader className="p-4">
                <ModalTitle>{MODAL_TITLE}</ModalTitle>
            </ModalHeader>
            <ModalBody className="space-y-3 p-4">
                <div>
                    <p className="text-text text-xs font-semibold">{address}</p>
                    <p className="text-text-secondary mt-0.5 text-xs">{hint}</p>
                </div>
                <FormField
                    id="reschedule-date"
                    name="date"
                    label={DATE_LABEL}
                    type="date"
                    variant="numeric"
                    value={draft.date}
                    onChange={(event) =>
                        onDraftChange({ ...draft, date: event.target.value })
                    }
                />
                <FormField
                    id="reschedule-time"
                    name="time"
                    label={TIME_LABEL}
                    variant="numeric"
                    value={draft.time}
                    placeholder={TIME_PLACEHOLDER}
                    onChange={(event) =>
                        onDraftChange({ ...draft, time: event.target.value })
                    }
                />
            </ModalBody>
            <ModalFooter className="p-4">
                <Button type="button" onClick={onClose}>
                    {CANCEL_ACTION}
                </Button>
                <Button
                    type="button"
                    emphasis="solid"
                    tone="accent"
                    isLoading={pending}
                    onClick={onConfirm}
                >
                    {CONFIRM_ACTION}
                </Button>
            </ModalFooter>
        </Modal>
    );
}

RescheduleViewingModal.displayName = "RescheduleViewingModal";

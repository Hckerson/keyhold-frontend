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
import type { Viewing } from "@/lib/types";

export interface RescheduleDraft {
    date: string;
    time: string;
}

export interface RescheduleViewingModalProps {
    viewing?: Viewing;
    draft: RescheduleDraft;
    onDraftChange: (draft: RescheduleDraft) => void;
    onClose: () => void;
    onConfirm: () => void;
}

export function RescheduleViewingModal({
    viewing,
    draft,
    onDraftChange,
    onClose,
    onConfirm,
}: RescheduleViewingModalProps) {
    return (
        <Modal
            open={viewing !== undefined}
            onOpenChange={(open) => {
                if (!open) onClose();
            }}
        >
            <ModalHeader>
                <ModalTitle>Reschedule Viewing</ModalTitle>
            </ModalHeader>
            <ModalBody className="space-y-3">
                <p className="text-text-secondary text-xs">
                    {viewing?.address}
                </p>
                <FormField
                    id="reschedule-date"
                    name="date"
                    label="New date"
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
                    label="New time"
                    variant="numeric"
                    value={draft.time}
                    placeholder="3:00 PM"
                    onChange={(event) =>
                        onDraftChange({ ...draft, time: event.target.value })
                    }
                />
            </ModalBody>
            <ModalFooter>
                <Button variant="secondary" size="sm" onClick={onClose}>
                    Cancel
                </Button>
                <Button variant="primary" size="sm" onClick={onConfirm}>
                    Confirm Change
                </Button>
            </ModalFooter>
        </Modal>
    );
}

RescheduleViewingModal.displayName = "RescheduleViewingModal";

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/forms/input";
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
                <Input
                    id="reschedule-date"
                    label="New date"
                    type="date"
                    value={draft.date}
                    onChange={(event) =>
                        onDraftChange({ ...draft, date: event.target.value })
                    }
                />
                <Input
                    id="reschedule-time"
                    label="New time"
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

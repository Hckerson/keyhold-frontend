"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Callout } from "@/components/ui/callout";
import { FormField } from "@/components/ui/forms/form-field";
import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalBody,
    ModalFooter,
} from "@/components/ui/modal";
import { DELETE_CONFIRMATION } from "@/lib/data/dashboard-settings";

export interface DeleteAccountModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export function DeleteAccountModal({
    open,
    onClose,
    onConfirm,
}: DeleteAccountModalProps) {
    const [confirmation, setConfirmation] = useState("");
    const confirmed = confirmation.trim().toUpperCase() === DELETE_CONFIRMATION;

    const close = () => {
        setConfirmation("");
        onClose();
    };

    const submit = () => {
        if (!confirmed) return;
        onConfirm();
        close();
    };

    return (
        <Modal
            open={open}
            onOpenChange={(next) => {
                if (!next) close();
            }}
        >
            <ModalHeader>
                <ModalTitle>Delete Account</ModalTitle>
            </ModalHeader>
            <ModalBody className="space-y-3">
                <Callout
                    variant="error"
                    title="This removes everything"
                    description="Saved listings, offers, viewings and messages are deleted after a 30-day grace period."
                />
                <FormField
                    id="delete-confirmation"
                    name="deleteConfirmation"
                    label={`Type ${DELETE_CONFIRMATION} to confirm`}
                    variant="code"
                    value={confirmation}
                    onChange={(event) => setConfirmation(event.target.value)}
                    placeholder={DELETE_CONFIRMATION}
                />
            </ModalBody>
            <ModalFooter>
                <Button onClick={close}>Cancel</Button>
                <Button
                    emphasis="solid"
                    tone="error"
                    disabled={!confirmed}
                    onClick={submit}
                >
                    Delete Account
                </Button>
            </ModalFooter>
        </Modal>
    );
}

"use client";

import { useState } from "react";
import type { ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/forms/form-field";
import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalBody,
    ModalFooter,
} from "@/components/ui/modal";
import {
    EMPTY_PASSWORD,
    MIN_PASSWORD_LENGTH,
    type PasswordForm,
} from "@/lib/data/dashboard-settings";

export interface PasswordModalProps {
    open: boolean;
    onClose: () => void;
    onPasswordUpdated: () => void;
}

export function PasswordModal({
    open,
    onClose,
    onPasswordUpdated,
}: PasswordModalProps) {
    const [password, setPassword] = useState<PasswordForm>(EMPTY_PASSWORD);
    const [error, setError] = useState<string | null>(null);

    const close = () => {
        setPassword(EMPTY_PASSWORD);
        setError(null);
        onClose();
    };

    const update =
        (key: keyof PasswordForm) => (event: ChangeEvent<HTMLInputElement>) =>
            setPassword((prev) => ({ ...prev, [key]: event.target.value }));

    const submit = () => {
        if (password.next.length < MIN_PASSWORD_LENGTH) {
            setError(
                `Use at least ${MIN_PASSWORD_LENGTH} characters for your new password.`,
            );
            return;
        }
        if (password.next !== password.confirm) {
            setError("The new passwords do not match.");
            return;
        }
        onPasswordUpdated();
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
                <ModalTitle>Change Password</ModalTitle>
            </ModalHeader>
            <ModalBody className="space-y-3">
                <FormField
                    id="current-password"
                    name="currentPassword"
                    label="Current password"
                    type="password"
                    value={password.current}
                    onChange={update("current")}
                />
                <FormField
                    id="new-password"
                    name="newPassword"
                    label="New password"
                    type="password"
                    value={password.next}
                    onChange={update("next")}
                />
                <FormField
                    id="confirm-password"
                    name="confirmPassword"
                    label="Confirm new password"
                    type="password"
                    value={password.confirm}
                    error={error ?? undefined}
                    onChange={update("confirm")}
                />
            </ModalBody>
            <ModalFooter>
                <Button variant="secondary" size="sm" onClick={close}>
                    Cancel
                </Button>
                <Button variant="primary" size="sm" onClick={submit}>
                    Update Password
                </Button>
            </ModalFooter>
        </Modal>
    );
}

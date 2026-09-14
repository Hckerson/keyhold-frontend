"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/forms/form-field";
import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalBody,
    ModalFooter,
} from "@/components/ui/modal";
import { TWO_FACTOR_CODE_LENGTH } from "@/lib/data/dashboard-settings";

export interface TwoFactorModalProps {
    open: boolean;
    enabled: boolean;
    onClose: () => void;
    onEnabledChange: (enabled: boolean) => void;
}

export function TwoFactorModal({
    open,
    enabled,
    onClose,
    onEnabledChange,
}: TwoFactorModalProps) {
    const [code, setCode] = useState("");
    const [error, setError] = useState<string | null>(null);

    const close = () => {
        setCode("");
        setError(null);
        onClose();
    };

    const submit = () => {
        if (enabled) {
            onEnabledChange(false);
            close();
            return;
        }
        if (!/^\d+$/.test(code) || code.length !== TWO_FACTOR_CODE_LENGTH) {
            setError(
                `Enter the ${TWO_FACTOR_CODE_LENGTH}-digit code from your authenticator app.`,
            );
            return;
        }
        onEnabledChange(true);
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
                <ModalTitle>
                    {enabled ? "Disable Two-Factor" : "Enable Two-Factor"}
                </ModalTitle>
            </ModalHeader>
            <ModalBody className="space-y-3">
                {enabled ? (
                    <p className="text-text-secondary text-xs">
                        Turning this off removes the second step when you sign
                        in. You can enable it again at any time.
                    </p>
                ) : (
                    <>
                        <p className="text-text-secondary text-xs">
                            Enter the {TWO_FACTOR_CODE_LENGTH}-digit code from
                            your authenticator app to finish setup.
                        </p>
                        <FormField
                            id="two-factor-code"
                            name="twoFactorCode"
                            label="Verification code"
                            variant="code"
                            inputMode="numeric"
                            maxLength={TWO_FACTOR_CODE_LENGTH}
                            value={code}
                            error={error ?? undefined}
                            onChange={(event) => setCode(event.target.value)}
                            placeholder="000000"
                        />
                    </>
                )}
            </ModalBody>
            <ModalFooter>
                <Button onClick={close}>Cancel</Button>
                <Button emphasis="solid" tone="accent" onClick={submit}>
                    {enabled ? "Disable" : "Enable"}
                </Button>
            </ModalFooter>
        </Modal>
    );
}

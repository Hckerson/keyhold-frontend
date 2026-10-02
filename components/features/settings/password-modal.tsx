"use client";

import { Button } from "@/components/ui/button";
import { Callout } from "@/components/ui/callout";
import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalBody,
    ModalFooter,
} from "@/components/ui/modal";

const MODAL_TITLE = "Reset your password";
const BODY_TITLE = "We will email you a link";
const CANCEL_ACTION = "Cancel";
const SEND_ACTION = "Send reset link";
const SENT_TITLE = "Check your inbox";
const SENT_BODY =
    "The link expires after a short window. Request another if it lapses.";

export interface PasswordModalProps {
    open: boolean;
    email: string;
    pending: boolean;
    sent: boolean;
    onClose: () => void;
    onSend: () => void;
}

export function PasswordModal({
    open,
    email,
    pending,
    sent,
    onClose,
    onSend,
}: PasswordModalProps) {
    return (
        <Modal
            open={open}
            locked={pending}
            onOpenChange={(next) => {
                if (!next) onClose();
            }}
        >
            <ModalHeader>
                <ModalTitle>{MODAL_TITLE}</ModalTitle>
            </ModalHeader>

            <ModalBody>
                {sent ? (
                    <Callout
                        variant="success"
                        title={SENT_TITLE}
                        description={SENT_BODY}
                    />
                ) : (
                    <Callout
                        variant="info"
                        title={BODY_TITLE}
                        description={`Follow the link we send to ${email} to choose a new password.`}
                    />
                )}
            </ModalBody>

            <ModalFooter>
                <Button type="button" disabled={pending} onClick={onClose}>
                    {CANCEL_ACTION}
                </Button>
                {!sent && (
                    <Button
                        type="button"
                        emphasis="solid"
                        tone="accent"
                        disabled={pending || !email}
                        onClick={onSend}
                    >
                        {SEND_ACTION}
                    </Button>
                )}
            </ModalFooter>
        </Modal>
    );
}

PasswordModal.displayName = "PasswordModal";

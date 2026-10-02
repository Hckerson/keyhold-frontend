"use client";

import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Callout } from "@/components/ui/callout";
import {
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    ModalTitle,
} from "@/components/ui/modal";

const DEFAULT_CANCEL = "Cancel";

export interface ConfirmNotice {
    title: string;
    body?: string;
}

export interface ConfirmModalProps {
    open: boolean;
    title: string;
    subject?: ReactNode;
    warning?: ConfirmNotice;
    failure: ConfirmNotice;
    confirmLabel: string;
    cancelLabel?: string;
    tone?: "error" | "accent";
    pending: boolean;
    failed: boolean;
    confirmDisabled?: boolean;
    onConfirm: () => void;
    onClose: () => void;
    children?: ReactNode;
}

export function ConfirmModal({
    open,
    title,
    subject,
    warning,
    failure,
    confirmLabel,
    cancelLabel = DEFAULT_CANCEL,
    tone = "error",
    pending,
    failed,
    confirmDisabled,
    onConfirm,
    onClose,
    children,
}: ConfirmModalProps) {
    const notice = failed ? failure : warning;

    return (
        <Modal
            open={open}
            locked={pending}
            onOpenChange={(next) => {
                if (!next) onClose();
            }}
        >
            <ModalHeader>
                <ModalTitle>{title}</ModalTitle>
                {subject && (
                    <p className="text-text-secondary mt-1 truncate text-xs">
                        {subject}
                    </p>
                )}
            </ModalHeader>

            {(notice || children) && (
                <ModalBody className="flex flex-col gap-3">
                    {notice && (
                        <Callout
                            variant={failed ? "error" : "warning"}
                            title={notice.title}
                            description={notice.body}
                        />
                    )}
                    {children}
                </ModalBody>
            )}

            <ModalFooter>
                <Button type="button" disabled={pending} onClick={onClose}>
                    {cancelLabel}
                </Button>
                <Button
                    type="button"
                    emphasis="solid"
                    tone={tone}
                    isLoading={pending}
                    disabled={confirmDisabled}
                    onClick={onConfirm}
                >
                    {confirmLabel}
                </Button>
            </ModalFooter>
        </Modal>
    );
}

ConfirmModal.displayName = "ConfirmModal";

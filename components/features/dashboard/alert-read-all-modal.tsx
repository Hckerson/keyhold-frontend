"use client";

import { ConfirmModal } from "@/components/patterns/confirm-modal";

const TITLE = "Mark every alert as read";
const CONFIRM = "Mark all read";
const CANCEL = "Keep them";
const WARNING = {
    title: "This cannot be undone",
    body: "Every unread alert is marked as read, including ones you have not opened yet. Alerts cannot be set back to unread.",
};
const FAILURE = {
    title: "Your alerts were not updated",
    body: "They are still unread. Try again in a moment.",
};

export interface AlertReadAllModalProps {
    open: boolean;
    unread: number;
    pending: boolean;
    failed: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export function AlertReadAllModal({
    open,
    unread,
    pending,
    failed,
    onClose,
    onConfirm,
}: AlertReadAllModalProps) {
    return (
        <ConfirmModal
            open={open}
            title={TITLE}
            subject={`${unread} unread`}
            warning={WARNING}
            failure={FAILURE}
            cancelLabel={CANCEL}
            confirmLabel={CONFIRM}
            tone="accent"
            pending={pending}
            failed={failed}
            onClose={onClose}
            onConfirm={onConfirm}
        />
    );
}

AlertReadAllModal.displayName = "AlertReadAllModal";

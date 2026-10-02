"use client";

import { ConfirmModal } from "@/components/patterns/confirm-modal";
import { CALENDAR_DISCONNECT_COPY as COPY } from "@/lib/config/calendar-sync";

export interface CalendarDisconnectModalProps {
    open: boolean;
    account?: string | null;
    pending: boolean;
    failed: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export function CalendarDisconnectModal({
    open,
    account,
    pending,
    failed,
    onClose,
    onConfirm,
}: CalendarDisconnectModalProps) {
    return (
        <ConfirmModal
            open={open}
            title={COPY.title}
            subject={account ?? undefined}
            warning={COPY.warning}
            failure={COPY.failure}
            cancelLabel={COPY.cancel}
            confirmLabel={COPY.confirm}
            pending={pending}
            failed={failed}
            onClose={onClose}
            onConfirm={onConfirm}
        />
    );
}

CalendarDisconnectModal.displayName = "CalendarDisconnectModal";

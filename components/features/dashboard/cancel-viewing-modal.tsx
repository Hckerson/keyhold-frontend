"use client";

import { ConfirmModal } from "@/components/patterns/confirm-modal";
import { formatViewingDate } from "@/lib/data/viewings";
import type { Viewing } from "@/lib/types";

const MODAL_TITLE = "Cancel this viewing";
const WARNING = {
    title: "This cannot be undone",
    body: "The agent is told straight away. A cancelled viewing cannot be rescheduled — you would need to request a new one.",
};
const FAILURE = {
    title: "The viewing was not cancelled",
    body: "It is still booked. Try again in a moment.",
};
const CANCEL_ACTION = "Keep viewing";
const CONFIRM_ACTION = "Cancel viewing";

export interface CancelViewingModalProps {
    viewing?: Viewing;
    pending: boolean;
    failed: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export function CancelViewingModal({
    viewing,
    pending,
    failed,
    onClose,
    onConfirm,
}: CancelViewingModalProps) {
    return (
        <ConfirmModal
            open={viewing !== undefined}
            title={MODAL_TITLE}
            subject={
                viewing &&
                `${viewing.address}, ${viewing.locality} · ${formatViewingDate(viewing.date)} · ${viewing.time}`
            }
            warning={WARNING}
            failure={FAILURE}
            cancelLabel={CANCEL_ACTION}
            confirmLabel={CONFIRM_ACTION}
            pending={pending}
            failed={failed}
            onClose={onClose}
            onConfirm={onConfirm}
        />
    );
}

CancelViewingModal.displayName = "CancelViewingModal";

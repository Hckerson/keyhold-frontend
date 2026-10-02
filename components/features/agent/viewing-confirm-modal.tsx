"use client";

import { ConfirmModal } from "@/components/patterns/confirm-modal";
import { VIEWING_CONFIRM_COPY as COPY } from "@/lib/data/agent-requests";
import type { ViewingRequestItem } from "@/lib/types";
import { dateFormatter } from "@/lib/utils/date-formatter";

const SLOT_FORMAT = "EEE d MMM, HH:mm";

export interface ViewingConfirmModalProps {
    request?: ViewingRequestItem;
    time?: string;
    pending: boolean;
    failed: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export function ViewingConfirmModal({
    request,
    time,
    pending,
    failed,
    onClose,
    onConfirm,
}: ViewingConfirmModalProps) {
    return (
        <ConfirmModal
            open={request !== undefined && time !== undefined}
            title={COPY.title}
            subject={
                request &&
                time &&
                `${request.buyerName} · ${dateFormatter(time, SLOT_FORMAT)} · ${request.address}`
            }
            warning={COPY.warning}
            failure={COPY.failure}
            cancelLabel={COPY.cancel}
            confirmLabel={COPY.confirm}
            tone="accent"
            pending={pending}
            failed={failed}
            onClose={onClose}
            onConfirm={onConfirm}
        />
    );
}

ViewingConfirmModal.displayName = "ViewingConfirmModal";

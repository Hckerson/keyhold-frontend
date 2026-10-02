"use client";

import { ConfirmModal } from "@/components/patterns/confirm-modal";
import {
    VIEWING_DECLINE_COPY as COPY,
    isStale,
} from "@/lib/data/agent-requests";
import type { ViewingRequestItem } from "@/lib/types";

export interface ViewingDeclineModalProps {
    request?: ViewingRequestItem;
    pending: boolean;
    failed: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export function ViewingDeclineModal({
    request,
    pending,
    failed,
    onClose,
    onConfirm,
}: ViewingDeclineModalProps) {
    return (
        <ConfirmModal
            open={request !== undefined}
            title={COPY.title}
            subject={
                request &&
                `${request.buyerName} · ${request.address}, ${request.locality}`
            }
            warning={
                request && isStale(request) ? COPY.staleWarning : COPY.warning
            }
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

ViewingDeclineModal.displayName = "ViewingDeclineModal";

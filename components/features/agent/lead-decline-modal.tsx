"use client";

import { ConfirmModal } from "@/components/patterns/confirm-modal";
import { LEAD_DECLINE_COPY as COPY } from "@/lib/config/lead-response";
import type { Lead } from "@/lib/types/lead";

export interface LeadDeclineModalProps {
    lead?: Lead;
    pending: boolean;
    failed: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export function LeadDeclineModal({
    lead,
    pending,
    failed,
    onClose,
    onConfirm,
}: LeadDeclineModalProps) {
    return (
        <ConfirmModal
            open={lead !== undefined}
            title={COPY.title}
            subject={
                lead &&
                [lead.name, lead.interests[0]].filter(Boolean).join(" · ")
            }
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

LeadDeclineModal.displayName = "LeadDeclineModal";

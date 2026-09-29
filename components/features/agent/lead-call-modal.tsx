"use client";

import { ConfirmModal } from "@/components/patterns/confirm-modal";
import { LEAD_CALL_COPY as COPY } from "@/lib/config/lead-contact";
import type { useConfirmation } from "@/lib/hooks/use-confirmation";
import type { Lead } from "@/lib/types/lead";

export interface LeadCallModalProps {
    lead?: Lead;
    confirmation: ReturnType<typeof useConfirmation<void, true>>;
}

export function LeadCallModal({ lead, confirmation }: LeadCallModalProps) {
    return (
        <ConfirmModal
            open={confirmation.open && lead !== undefined}
            title={COPY.title}
            subject={lead && `${lead.name} · ${lead.phone}`}
            warning={COPY.warning}
            failure={COPY.failure}
            cancelLabel={COPY.cancel}
            confirmLabel={COPY.confirm}
            tone="accent"
            pending={confirmation.pending}
            failed={confirmation.failed}
            onClose={confirmation.dismiss}
            onConfirm={() => confirmation.confirm()}
        />
    );
}

LeadCallModal.displayName = "LeadCallModal";

"use client";

import { ConfirmModal } from "@/components/patterns/confirm-modal";
import type { LeadResponseCopy } from "@/lib/config/lead-response";
import type { useConfirmation } from "@/lib/hooks/use-confirmation";
import type { Lead } from "@/lib/types/lead";

export interface LeadResponseModalProps {
    copy: LeadResponseCopy;
    leads: Lead[];
    response: ReturnType<typeof useConfirmation<string>>;
}

export function LeadResponseModal({
    copy,
    leads,
    response,
}: LeadResponseModalProps) {
    const lead = leads.find((candidate) => candidate.id === response.target);

    return (
        <ConfirmModal
            open={lead !== undefined}
            title={copy.title}
            subject={
                lead &&
                [lead.name, lead.interests[0]].filter(Boolean).join(" · ")
            }
            warning={copy.warning}
            failure={copy.failure}
            cancelLabel={copy.cancel}
            confirmLabel={copy.confirm}
            tone={copy.tone}
            pending={response.pending}
            failed={response.failed}
            onClose={response.dismiss}
            onConfirm={() => lead && response.confirm(lead.id)}
        />
    );
}

LeadResponseModal.displayName = "LeadResponseModal";

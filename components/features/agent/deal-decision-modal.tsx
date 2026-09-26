"use client";

import { ConfirmModal } from "@/components/patterns/confirm-modal";
import {
    DEAL_DECISION_COPY,
    type DealDecision,
} from "@/lib/data/agent-pipeline";
import type { Deal } from "@/lib/types/deal";
import { formatUsd } from "@/lib/utils";

export interface DealDecisionModalProps {
    deal?: Deal;
    decision: DealDecision;
    pending: boolean;
    failed: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export function DealDecisionModal({
    deal,
    decision,
    pending,
    failed,
    onClose,
    onConfirm,
}: DealDecisionModalProps) {
    const copy = DEAL_DECISION_COPY[decision];

    return (
        <ConfirmModal
            open={deal !== undefined}
            title={copy.title}
            subject={
                deal &&
                `${deal.property} · ${deal.buyer} · ${formatUsd(deal.price)}`
            }
            warning={copy.warning}
            failure={copy.failure}
            cancelLabel={copy.cancel}
            confirmLabel={copy.confirm}
            pending={pending}
            failed={failed}
            onClose={onClose}
            onConfirm={onConfirm}
        />
    );
}

DealDecisionModal.displayName = "DealDecisionModal";

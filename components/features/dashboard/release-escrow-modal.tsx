"use client";

import { ConfirmModal } from "@/components/patterns/confirm-modal";
import { inspectionLabel } from "@/lib/utils/purchases";
import type { Purchase } from "@/lib/types";
import { formatUsd } from "@/lib/utils";

const MODAL_TITLE = "Release the funds";
const WARNING = {
    title: "This cannot be undone",
    body: "Releasing settles the sale, transfers the held amount to the seller and marks the property sold.",
};
const FAILURE = {
    title: "The funds could not be released",
    body: "Nothing has moved and the escrow is still held. Try again in a moment.",
};
const AMOUNT_LABEL = "Held in escrow";
const WINDOW_LABEL = "Inspection window";
const UNKNOWN_AMOUNT = "—";
const CANCEL_ACTION = "Keep it held";
const CONFIRM_ACTION = "Release funds";

export interface ReleaseEscrowModalProps {
    purchase?: Purchase;
    pending: boolean;
    failed: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export function ReleaseEscrowModal({
    purchase,
    pending,
    failed,
    onClose,
    onConfirm,
}: ReleaseEscrowModalProps) {
    return (
        <ConfirmModal
            open={purchase !== undefined}
            title={MODAL_TITLE}
            subject={purchase && `${purchase.address} · ${purchase.locality}`}
            warning={WARNING}
            failure={FAILURE}
            cancelLabel={CANCEL_ACTION}
            confirmLabel={CONFIRM_ACTION}
            pending={pending}
            failed={failed}
            onClose={onClose}
            onConfirm={onConfirm}
        >
            {purchase && (
                <div className="bg-background-muted border-border-light grid grid-cols-2 gap-3 rounded-md border p-3">
                    <div className="min-w-0">
                        <p className="micro-label">{AMOUNT_LABEL}</p>
                        <p className="text-text mt-0.5 text-xs font-semibold tabular-nums">
                            {purchase.escrowAmount === null
                                ? UNKNOWN_AMOUNT
                                : formatUsd(purchase.escrowAmount)}
                        </p>
                    </div>
                    <div className="min-w-0">
                        <p className="micro-label">{WINDOW_LABEL}</p>
                        <p className="text-text mt-0.5 text-xs font-semibold tabular-nums">
                            {inspectionLabel(purchase)}
                        </p>
                    </div>
                </div>
            )}
        </ConfirmModal>
    );
}

ReleaseEscrowModal.displayName = "ReleaseEscrowModal";

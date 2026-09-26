"use client";

import { ConfirmModal } from "@/components/patterns/confirm-modal";
import { LISTING_FORM_COPY as COPY } from "@/lib/config/listing-form-copy";

const WARNING = { title: COPY.markSoldWarning, body: COPY.markSoldWarningLede };
const FAILURE = { title: COPY.markSoldFailed, body: COPY.markSoldFailedLede };

export interface ListingSoldModalProps {
    address?: string;
    pending: boolean;
    failed: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export function ListingSoldModal({
    address,
    pending,
    failed,
    onClose,
    onConfirm,
}: ListingSoldModalProps) {
    return (
        <ConfirmModal
            open={address !== undefined}
            title={COPY.markSoldConfirm}
            subject={address}
            warning={WARNING}
            failure={FAILURE}
            cancelLabel={COPY.markSoldKeep}
            confirmLabel={COPY.markSold}
            pending={pending}
            failed={failed}
            onClose={onClose}
            onConfirm={onConfirm}
        />
    );
}

ListingSoldModal.displayName = "ListingSoldModal";

"use client";

import { ConfirmModal } from "@/components/patterns/confirm-modal";
import { LISTING_FORM_COPY as COPY } from "@/lib/config/listing-form-copy";

const WARNING = { title: COPY.removeWarning, body: COPY.removeConfirmLede };
const FAILURE = { title: COPY.removeFailed, body: COPY.removeFailedLede };

export interface ListingDeleteModalProps {
    address?: string;
    pending: boolean;
    failed: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export function ListingDeleteModal({
    address,
    pending,
    failed,
    onClose,
    onConfirm,
}: ListingDeleteModalProps) {
    return (
        <ConfirmModal
            open={address !== undefined}
            title={COPY.removeConfirm}
            subject={address}
            warning={WARNING}
            failure={FAILURE}
            cancelLabel={COPY.cancel}
            confirmLabel={COPY.remove}
            pending={pending}
            failed={failed}
            onClose={onClose}
            onConfirm={onConfirm}
        />
    );
}

ListingDeleteModal.displayName = "ListingDeleteModal";

"use client";

import { ConfirmModal } from "@/components/patterns/confirm-modal";
import { ListingBulkPreview } from "@/components/features/agent/listing-bulk-preview";
import {
    BULK_DELETE_COPY as COPY,
    bulkDeleteSubject,
} from "@/lib/config/listing-bulk";
import type { ManagedListing } from "@/lib/types";

export interface ListingBulkDeleteModalProps {
    open: boolean;
    listings: ManagedListing[];
    pending: boolean;
    failed: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export function ListingBulkDeleteModal({
    open,
    listings,
    pending,
    failed,
    onClose,
    onConfirm,
}: ListingBulkDeleteModalProps) {
    return (
        <ConfirmModal
            open={open}
            title={COPY.title}
            subject={bulkDeleteSubject(listings.length)}
            warning={COPY.warning}
            failure={COPY.failure}
            cancelLabel={COPY.cancel}
            confirmLabel={COPY.confirm}
            pending={pending}
            failed={failed}
            confirmDisabled={listings.length === 0}
            onClose={onClose}
            onConfirm={onConfirm}
        >
            <ListingBulkPreview listings={listings} />
        </ConfirmModal>
    );
}

ListingBulkDeleteModal.displayName = "ListingBulkDeleteModal";

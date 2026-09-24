"use client";

import { ConfirmModal } from "@/components/patterns/confirm-modal";
import {
    BULK_DELETE_COPY as COPY,
    BULK_DELETE_PREVIEW,
    bulkDeleteOverflow,
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
    const overflow = bulkDeleteOverflow(listings.length);

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
            <ul className="bg-background-muted border-border-light divide-border-light divide-y rounded-md border px-3">
                {listings.slice(0, BULK_DELETE_PREVIEW).map((listing) => (
                    <li
                        key={listing.id}
                        className="flex h-9 items-center justify-between gap-3"
                    >
                        <span className="text-text min-w-0 truncate text-xs font-medium">
                            {listing.address}
                        </span>
                        <span className="text-text-secondary shrink-0 truncate text-xs">
                            {listing.locality}
                        </span>
                    </li>
                ))}
                {overflow && (
                    <li className="micro-label flex h-9 items-center">
                        {overflow}
                    </li>
                )}
            </ul>
        </ConfirmModal>
    );
}

ListingBulkDeleteModal.displayName = "ListingBulkDeleteModal";

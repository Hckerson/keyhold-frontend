"use client";

import { ConfirmModal } from "@/components/patterns/confirm-modal";
import { ListingBulkPreview } from "@/components/features/agent/listing-bulk-preview";
import {
    BULK_STATUS_CANCEL,
    BULK_STATUS_COPY,
    bulkChangeSubject,
    bulkSkippedNote,
} from "@/lib/config/listing-bulk";
import type { BulkStatusAction } from "@/lib/data/agent-listings";
import type { ManagedListing } from "@/lib/types";

export interface ListingBulkStatusModalProps {
    action?: BulkStatusAction;
    listings: ManagedListing[];
    skipped: number;
    pending: boolean;
    failed: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export function ListingBulkStatusModal({
    action,
    listings,
    skipped,
    pending,
    failed,
    onClose,
    onConfirm,
}: ListingBulkStatusModalProps) {
    const copy = BULK_STATUS_COPY[action ?? "publish"];
    const skippedNote = bulkSkippedNote(skipped);

    return (
        <ConfirmModal
            open={action !== undefined}
            title={copy.title}
            subject={bulkChangeSubject(listings.length)}
            warning={copy.warning}
            failure={copy.failure}
            cancelLabel={BULK_STATUS_CANCEL}
            confirmLabel={copy.confirm}
            tone={copy.tone}
            pending={pending}
            failed={failed}
            confirmDisabled={listings.length === 0}
            onClose={onClose}
            onConfirm={onConfirm}
        >
            <ListingBulkPreview listings={listings} />
            {skippedNote && (
                <p className="text-text-secondary text-xs">{skippedNote}</p>
            )}
        </ConfirmModal>
    );
}

ListingBulkStatusModal.displayName = "ListingBulkStatusModal";

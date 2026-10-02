"use client";

import { ConfirmModal } from "@/components/patterns/confirm-modal";
import type { ModerationListing } from "@/lib/types";

const TITLE = "Approve listing";
const CONFIRM = "Approve listing";
const WARNING = {
    title: "The listing clears review",
    body: "The report is resolved and the listing is approved as it stands. The flag leaves the moderation queue.",
};
const FAILURE = {
    title: "The approval was not recorded",
    body: "The listing is still flagged for review. Try again in a moment.",
};

export interface ModerationApproveModalProps {
    listing?: ModerationListing;
    pending: boolean;
    failed: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export function ModerationApproveModal({
    listing,
    pending,
    failed,
    onClose,
    onConfirm,
}: ModerationApproveModalProps) {
    return (
        <ConfirmModal
            open={listing !== undefined}
            title={TITLE}
            subject={listing && `${listing.address}, ${listing.locality}`}
            warning={WARNING}
            failure={FAILURE}
            confirmLabel={CONFIRM}
            tone="accent"
            pending={pending}
            failed={failed}
            onClose={onClose}
            onConfirm={onConfirm}
        />
    );
}

ModerationApproveModal.displayName = "ModerationApproveModal";

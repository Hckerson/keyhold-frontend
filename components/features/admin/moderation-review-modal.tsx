"use client";

import { Button } from "@/components/ui/button";
import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalFooter,
} from "@/components/ui/modal";
import { ModerationReviewBody } from "@/components/features/admin/moderation-review-body";
import { ModerationStatusMark } from "@/components/features/admin/moderation-status-mark";
import { CHECK_COUNT_LABEL } from "@/lib/data/admin-listings";
import type { DecisionMode, ModerationListing } from "@/lib/types";

const APPROVE_ACTION = "Approve";
const CHANGES_ACTION = "Request Changes";
const REJECT_ACTION = "Reject";
const CLOSE_ACTION = "Close";

export interface ModerationReviewModalProps {
    listing?: ModerationListing;
    approvingId?: string;
    onClose: () => void;
    onApprove: (id: string) => void;
    onDecide: (mode: DecisionMode, id: string) => void;
}

export function ModerationReviewModal({
    listing,
    approvingId,
    onClose,
    onApprove,
    onDecide,
}: ModerationReviewModalProps) {
    return (
        <Modal
            open={listing !== undefined}
            onOpenChange={(next) => {
                if (!next) onClose();
            }}
            className="max-w-2xl"
        >
            {listing && (
                <>
                    <ModalHeader>
                        <ModalTitle>
                            {listing.address}, {listing.locality}
                        </ModalTitle>
                        <div className="mt-1 flex items-center gap-2">
                            <ModerationStatusMark status={listing.status} />
                            <span className="micro-label">
                                {CHECK_COUNT_LABEL}
                            </span>
                        </div>
                    </ModalHeader>

                    <ModerationReviewBody listing={listing} />

                    <ModalFooter>
                        <Button
                            type="button"
                            emphasis="quiet"
                            onClick={onClose}
                        >
                            {CLOSE_ACTION}
                        </Button>
                        {listing.status !== "rejected" && (
                            <Button
                                type="button"
                                tone="error"
                                onClick={() => onDecide("reject", listing.id)}
                            >
                                {REJECT_ACTION}
                            </Button>
                        )}
                        <Button
                            type="button"
                            onClick={() => onDecide("changes", listing.id)}
                        >
                            {CHANGES_ACTION}
                        </Button>
                        {listing.status !== "approved" && (
                            <Button
                                type="button"
                                emphasis="solid"
                                tone="accent"
                                isLoading={approvingId === listing.id}
                                disabled={approvingId !== undefined}
                                onClick={() => onApprove(listing.id)}
                            >
                                {APPROVE_ACTION}
                            </Button>
                        )}
                    </ModalFooter>
                </>
            )}
        </Modal>
    );
}

ModerationReviewModal.displayName = "ModerationReviewModal";

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
import { MODERATION_ACTION } from "@/lib/config/moderation-actions";
import { CHECK_COUNT_LABEL } from "@/lib/data/admin-listings";
import type { DecisionMode, ModerationListing } from "@/lib/types";

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
                                icon={MODERATION_ACTION.reject.icon}
                                onClick={() => onDecide("reject", listing.id)}
                            >
                                {MODERATION_ACTION.reject.label}
                            </Button>
                        )}
                        <Button
                            type="button"
                            icon={MODERATION_ACTION.changes.icon}
                            onClick={() => onDecide("changes", listing.id)}
                        >
                            {MODERATION_ACTION.changes.label}
                        </Button>
                        {listing.status !== "approved" && (
                            <Button
                                type="button"
                                emphasis="solid"
                                tone="accent"
                                icon={MODERATION_ACTION.approve.icon}
                                isLoading={approvingId === listing.id}
                                disabled={approvingId !== undefined}
                                onClick={() => onApprove(listing.id)}
                            >
                                {MODERATION_ACTION.approve.label}
                            </Button>
                        )}
                    </ModalFooter>
                </>
            )}
        </Modal>
    );
}

ModerationReviewModal.displayName = "ModerationReviewModal";

"use client";

import { Button } from "@/components/ui/button";
import { Callout } from "@/components/ui/callout";
import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalBody,
    ModalFooter,
} from "@/components/ui/modal";
import { inspectionLabel } from "@/lib/utils/purchases";
import type { Purchase } from "@/lib/types";
import { formatUsd } from "@/lib/utils";

const MODAL_TITLE = "Release the funds";
const WARNING_TITLE = "This cannot be undone";
const WARNING_BODY =
    "Releasing settles the sale, transfers the held amount to the seller and marks the property sold.";
const AMOUNT_LABEL = "Held in escrow";
const WINDOW_LABEL = "Inspection window";
const CANCEL_ACTION = "Keep it held";
const CONFIRM_ACTION = "Release funds";
const FAILURE_TITLE = "The funds could not be released";
const FAILURE_BODY =
    "Nothing has moved and the escrow is still held. Try again in a moment.";

export interface ReleaseEscrowModalProps {
    purchase?: Purchase;
    pending: boolean;
    failed?: boolean;
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
        <Modal
            open={purchase !== undefined}
            onOpenChange={(open) => {
                if (!open) onClose();
            }}
        >
            {purchase && (
                <>
                    <ModalHeader className="p-4">
                        <ModalTitle>{MODAL_TITLE}</ModalTitle>
                        <p className="text-text-secondary mt-1 truncate text-xs">
                            {purchase.address} · {purchase.locality}
                        </p>
                    </ModalHeader>

                    <ModalBody className="flex flex-col gap-3 p-4">
                        <Callout
                            variant={failed ? "error" : "warning"}
                            title={failed ? FAILURE_TITLE : WARNING_TITLE}
                            description={failed ? FAILURE_BODY : WARNING_BODY}
                        />

                        <div className="bg-background-muted border-border-light grid grid-cols-2 gap-3 rounded-md border p-3">
                            <div className="min-w-0">
                                <p className="micro-label">{AMOUNT_LABEL}</p>
                                <p className="text-text mt-0.5 text-xs font-semibold tabular-nums">
                                    {formatUsd(
                                        purchase.escrowAmount ?? purchase.price,
                                    )}
                                </p>
                            </div>
                            <div className="min-w-0">
                                <p className="micro-label">{WINDOW_LABEL}</p>
                                <p className="text-text mt-0.5 text-xs font-semibold tabular-nums">
                                    {inspectionLabel(purchase)}
                                </p>
                            </div>
                        </div>
                    </ModalBody>

                    <ModalFooter className="gap-2 p-4">
                        <Button
                            type="button"
                            variant="secondary"
                            size="sm"
                            onClick={onClose}
                        >
                            {CANCEL_ACTION}
                        </Button>
                        <Button
                            type="button"
                            variant="primary"
                            size="sm"
                            disabled={pending}
                            onClick={onConfirm}
                        >
                            {CONFIRM_ACTION}
                        </Button>
                    </ModalFooter>
                </>
            )}
        </Modal>
    );
}

ReleaseEscrowModal.displayName = "ReleaseEscrowModal";

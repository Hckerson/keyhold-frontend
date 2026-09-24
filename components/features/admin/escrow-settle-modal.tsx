"use client";

import { Button } from "@/components/ui/button";
import { Callout } from "@/components/ui/callout";
import { TextareaField } from "@/components/ui/forms/textarea-field";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalTitle,
    ModalBody,
    ModalFooter,
} from "@/components/ui/modal";
import { SETTLE_MODES, type SettleMode } from "@/lib/config/escrow-settle";
import { payoutNet } from "@/lib/data/admin-payments";
import type { Payout } from "@/lib/types";
import { formatUsd } from "@/lib/utils";

const CANCEL_LABEL = "Cancel";
const SWITCH_TO_REFUND = "Refund the buyer instead";
const SWITCH_TO_RELEASE = "Release to the seller instead";
const CALLOUT_TITLE = "This cannot be undone";

export interface EscrowSettleModalProps {
    payout: Payout | null;
    mode: SettleMode;
    reason: string;
    pending: boolean;
    onModeChange: (mode: SettleMode) => void;
    onReasonChange: (value: string) => void;
    onClose: () => void;
    onSubmit: () => void;
}

export function EscrowSettleModal({
    payout,
    mode,
    reason,
    pending,
    onModeChange,
    onReasonChange,
    onClose,
    onSubmit,
}: EscrowSettleModalProps) {
    const copy = SETTLE_MODES[mode];
    const blocked = Boolean(copy.reason) && reason.trim().length === 0;

    return (
        <Modal
            open={payout !== null}
            onOpenChange={(open) => {
                if (!open) onClose();
            }}
            aria-labelledby="escrow-settle-title"
        >
            {payout && (
                <ModalContent>
                    <ModalHeader className="p-6">
                        <ModalTitle id="escrow-settle-title">
                            {copy.title}
                        </ModalTitle>
                        <p className="text-text-secondary mt-1 text-xs">
                            {payout.recipient} · {payout.deal} ·{" "}
                            {formatUsd(payoutNet(payout))} net
                        </p>
                    </ModalHeader>
                    <ModalBody className="space-y-3 p-6">
                        <p className="text-text-secondary text-xs">
                            {copy.lede}
                        </p>

                        {copy.reason && (
                            <div>
                                <TextareaField
                                    id="escrow-refund-reason"
                                    name="escrowRefundReason"
                                    label={copy.reason.label}
                                    rows={3}
                                    value={reason}
                                    onChange={(event) =>
                                        onReasonChange(event.target.value)
                                    }
                                    placeholder={copy.reason.placeholder}
                                />
                                <p className="text-text-muted mt-1.5 text-xs">
                                    {copy.reason.hint}
                                </p>
                            </div>
                        )}

                        <Callout
                            variant={mode === "refund" ? "error" : "warning"}
                            title={CALLOUT_TITLE}
                        />

                        <Button
                            type="button"
                            emphasis="quiet"
                            disabled={pending}
                            onClick={() =>
                                onModeChange(
                                    mode === "release" ? "refund" : "release",
                                )
                            }
                        >
                            {mode === "release"
                                ? SWITCH_TO_REFUND
                                : SWITCH_TO_RELEASE}
                        </Button>
                    </ModalBody>
                    <ModalFooter className="gap-4 p-6">
                        <Button
                            type="button"
                            onClick={onClose}
                            disabled={pending}
                        >
                            {CANCEL_LABEL}
                        </Button>
                        <Button
                            type="button"
                            emphasis="solid"
                            tone={copy.tone}
                            disabled={blocked}
                            isLoading={pending}
                            onClick={onSubmit}
                        >
                            {copy.submit}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            )}
        </Modal>
    );
}

EscrowSettleModal.displayName = "EscrowSettleModal";

"use client";

import { ConfirmModal } from "@/components/patterns/confirm-modal";
import { Button } from "@/components/ui/button";
import { TextareaField } from "@/components/ui/forms/textarea-field";
import {
    SETTLE_MODES,
    SETTLE_WARNING_TITLE,
    type SettleMode,
} from "@/lib/config/escrow-settle";
import { payoutNet } from "@/lib/data/admin-payments";
import type { Payout } from "@/lib/types";
import { formatUsd } from "@/lib/utils";

const SWITCH_TO_REFUND = "Refund the buyer instead";
const SWITCH_TO_RELEASE = "Release to the seller instead";

export interface EscrowSettleModalProps {
    payout: Payout | null;
    mode: SettleMode;
    reason: string;
    pending: boolean;
    failed: boolean;
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
    failed,
    onModeChange,
    onReasonChange,
    onClose,
    onSubmit,
}: EscrowSettleModalProps) {
    const copy = SETTLE_MODES[mode];
    const blocked = Boolean(copy.reason) && reason.trim().length === 0;

    return (
        <ConfirmModal
            open={payout !== null}
            title={copy.title}
            subject={
                payout &&
                `${payout.recipient} · ${payout.deal} · ${formatUsd(payoutNet(payout))} net`
            }
            warning={{ title: SETTLE_WARNING_TITLE, body: copy.lede }}
            failure={copy.failure}
            confirmLabel={copy.submit}
            tone={copy.tone}
            pending={pending}
            failed={failed}
            confirmDisabled={blocked}
            onClose={onClose}
            onConfirm={onSubmit}
        >
            {copy.reason && (
                <div>
                    <TextareaField
                        id="escrow-refund-reason"
                        name="escrowRefundReason"
                        label={copy.reason.label}
                        rows={3}
                        value={reason}
                        disabled={pending}
                        onChange={(event) => onReasonChange(event.target.value)}
                        placeholder={copy.reason.placeholder}
                    />
                    <p className="text-text-muted mt-1.5 text-xs">
                        {copy.reason.hint}
                    </p>
                </div>
            )}

            <Button
                type="button"
                emphasis="quiet"
                disabled={pending}
                className="self-start"
                onClick={() =>
                    onModeChange(mode === "release" ? "refund" : "release")
                }
            >
                {mode === "release" ? SWITCH_TO_REFUND : SWITCH_TO_RELEASE}
            </Button>
        </ConfirmModal>
    );
}

EscrowSettleModal.displayName = "EscrowSettleModal";

"use client";

import { ConfirmModal } from "@/components/patterns/confirm-modal";
import { formatUsd } from "@/lib/utils";
import type { OfferConfirmAction } from "@/lib/types";

const COPY = {
    accept: {
        title: "Accept counter offer",
        confirmLabel: "Accept Counter",
        warning: {
            title: "Accepting is binding",
            body: "The offer closes at this price and you commit to the purchase. It cannot be reopened or countered again.",
        },
        failure: {
            title: "The counter was not accepted",
            body: "Nothing changed on the offer. Try again in a moment.",
        },
    },
    counter: {
        title: "Submit counter offer",
        confirmLabel: "Send Counter",
        warning: undefined,
        failure: {
            title: "Your counter was not sent",
            body: "The seller has not seen it and the offer is unchanged. Try again in a moment.",
        },
    },
} as const;

export interface OfferConfirmModalProps {
    action: OfferConfirmAction | null;
    address: string;
    counterPrice?: number;
    counterValue: number;
    pending: boolean;
    failed: boolean;
    onClose: () => void;
    onAccept: () => void;
    onCounter: () => void;
}

export function OfferConfirmModal({
    action,
    address,
    counterPrice,
    counterValue,
    pending,
    failed,
    onClose,
    onAccept,
    onCounter,
}: OfferConfirmModalProps) {
    const copy = COPY[action ?? "counter"];

    return (
        <ConfirmModal
            open={action !== null}
            title={copy.title}
            subject={address}
            warning={copy.warning}
            failure={copy.failure}
            confirmLabel={copy.confirmLabel}
            tone="accent"
            pending={pending}
            failed={failed}
            onClose={onClose}
            onConfirm={action === "accept" ? onAccept : onCounter}
        >
            <p className="text-text-secondary text-xs">
                {action === "accept" &&
                    counterPrice !== undefined &&
                    `You are accepting the seller's counter of ${formatUsd(counterPrice)} for ${address}.`}
                {action === "counter" &&
                    `You are countering at ${formatUsd(counterValue)} for ${address}.`}
            </p>
        </ConfirmModal>
    );
}

OfferConfirmModal.displayName = "OfferConfirmModal";

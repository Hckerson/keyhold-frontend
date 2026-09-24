"use client";

import { useMemo, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { Callout } from "@/components/ui/callout";
import { Spinner } from "@/components/ui/spinner";
import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalBody,
} from "@/components/ui/modal";
import { CheckoutPaymentForm } from "@/components/features/offers/checkout-payment-form";
import { getStripe, STRIPE_COPY, STRIPE_ENABLED } from "@/lib/config/stripe";
import { stripeAppearance } from "@/lib/utils/stripe-appearance";
import { formatUsd } from "@/lib/utils";

export interface CheckoutModalProps {
    open: boolean;
    address: string;
    amount: number;
    clientSecret: string | null | undefined;
    preparing: boolean;
    settling: boolean;
    settled: boolean;
    error?: string;
    onClose: () => void;
    onPaid: (paymentIntentId: string) => void;
    onFail: (message: string) => void;
}

export function CheckoutModal({
    open,
    address,
    amount,
    clientSecret,
    preparing,
    settling,
    settled,
    error,
    onClose,
    onPaid,
    onFail,
}: CheckoutModalProps) {
    const options = useMemo(
        () =>
            clientSecret
                ? { clientSecret, appearance: stripeAppearance() }
                : undefined,
        [clientSecret],
    );
    const [charging, setCharging] = useState(false);

    return (
        <Modal
            open={open}
            locked={charging || settling}
            onOpenChange={(next) => {
                if (!next) onClose();
            }}
        >
            <ModalHeader>
                <ModalTitle>{STRIPE_COPY.title}</ModalTitle>
                <p className="text-text-secondary mt-1 truncate text-xs">
                    {address} · {STRIPE_COPY.amountLabel}{" "}
                    <span className="text-text font-semibold tabular-nums">
                        {formatUsd(amount)}
                    </span>
                </p>
            </ModalHeader>

            <ModalBody className="flex flex-col gap-3">
                {!STRIPE_ENABLED && (
                    <Callout
                        variant="warning"
                        title={STRIPE_COPY.unavailableTitle}
                        description={STRIPE_COPY.unavailableBody}
                    />
                )}

                {error && (
                    <Callout
                        variant="error"
                        title={STRIPE_COPY.failureTitle}
                        description={error}
                    />
                )}

                {settled && (
                    <Callout
                        variant="success"
                        title={STRIPE_COPY.settledTitle}
                        description={STRIPE_COPY.escrowNote}
                    />
                )}

                {STRIPE_ENABLED && !settled && preparing && (
                    <div className="flex justify-center py-6">
                        <Spinner size="sm" />
                    </div>
                )}

                {STRIPE_ENABLED && !settled && options && (
                    <Elements stripe={getStripe()} options={options}>
                        <CheckoutPaymentForm
                            charging={charging}
                            settling={settling}
                            onChargingChange={setCharging}
                            onPaid={onPaid}
                            onFail={onFail}
                            onCancel={onClose}
                        />
                    </Elements>
                )}
            </ModalBody>
        </Modal>
    );
}

CheckoutModal.displayName = "CheckoutModal";

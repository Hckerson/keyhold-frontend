"use client";

import { useState, type FormEvent } from "react";
import {
    PaymentElement,
    useElements,
    useStripe,
} from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { STRIPE_COPY } from "@/lib/config/stripe";

export interface CheckoutPaymentFormProps {
    settling: boolean;
    onPaid: (paymentIntentId: string) => void;
    onFail: (message: string) => void;
    onCancel: () => void;
}

export function CheckoutPaymentForm({
    settling,
    onPaid,
    onFail,
    onCancel,
}: CheckoutPaymentFormProps) {
    const stripe = useStripe();
    const elements = useElements();
    const [charging, setCharging] = useState(false);

    const pending = charging || settling;

    const charge = async () => {
        if (!stripe || !elements) return;

        setCharging(true);
        const result = await stripe.confirmPayment({
            elements,
            redirect: "if_required",
        });
        setCharging(false);

        if (result.error) {
            onFail(result.error.message ?? STRIPE_COPY.genericFailure);
            return;
        }

        onPaid(result.paymentIntent.id);
    };

    const submit = (event: FormEvent) => {
        event.preventDefault();
        void charge();
    };

    return (
        <form onSubmit={submit} className="flex flex-col gap-3">
            <PaymentElement options={{ layout: "tabs" }} />

            <div className="flex items-center justify-end gap-2">
                <Button type="button" onClick={onCancel}>
                    {STRIPE_COPY.cancel}
                </Button>
                <Button
                    type="submit"
                    emphasis="solid"
                    tone="accent"
                    disabled={!stripe || pending}
                >
                    {pending && (
                        <Spinner
                            size="sm"
                            tone="current"
                            aria-hidden="true"
                            className="mr-1.5"
                        />
                    )}
                    {settling ? STRIPE_COPY.settlingLabel : STRIPE_COPY.submit}
                </Button>
            </div>
        </form>
    );
}

CheckoutPaymentForm.displayName = "CheckoutPaymentForm";

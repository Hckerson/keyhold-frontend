import { loadStripe, type Stripe } from "@stripe/stripe-js";

const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_KEY ?? "";

export const STRIPE_ENABLED =
    process.env.NEXT_PUBLIC_ENABLE_STRIPE === "true" &&
    PUBLISHABLE_KEY.startsWith("pk_");

export const STRIPE_COPY = {
    action: "Complete purchase",
    title: "Complete your purchase",
    submit: "Pay now",
    cancel: "Not yet",
    amountLabel: "Amount due",
    escrowNote:
        "Your payment is held in escrow until you release it after the inspection window.",
    unavailableTitle: "Payments are switched off here",
    unavailableBody:
        "This environment has no Stripe publishable key, so the purchase cannot be taken online.",
    failureTitle: "The payment did not go through",
    genericFailure: "Nothing was charged. Try again in a moment.",
    settlingLabel: "Confirming…",
    settledTitle: "Payment received",
} as const;

let stripePromise: Promise<Stripe | null> | undefined;

export const getStripe = (): Promise<Stripe | null> => {
    stripePromise ??= loadStripe(PUBLISHABLE_KEY);
    return stripePromise;
};

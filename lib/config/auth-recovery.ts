import type { AuthStep } from "@/components/features/auth/parts/auth-form-header";
import type { AuthTitleBlockEntry } from "@/components/features/auth/parts/auth-title-block";
import { AUTH_ROUTES } from "@/lib/constants";

export const AUTH_FAILURES = {
    register:
        "We couldn't create your account. Review your details and try again.",
    request:
        "We couldn't send the reset link. Check the address and try again.",
    reset: "We couldn't reset your password. The link may have expired — request a new one.",
    verify: "We couldn't confirm that code. Check it and try again.",
} as const;

export const VERIFY_STEP: Record<"details" | "confirm", AuthStep> = {
    details: { current: 1, total: 2 },
    confirm: { current: 2, total: 2 },
};

export const VERIFY_COPY = {
    kicker: "One last step",
    title: "Confirm your email",
    description:
        "We sent a six-digit code to your inbox. It expires in fifteen minutes.",
    label: "Verification code",
    submit: "Confirm email",
    resend: "Send a new code",
    skipLabel: "Not now",
    skip: "Do this later",
    done: "Email confirmed",
    doneLede: "Your address is verified. Nothing else is outstanding.",
} as const;

export const RECOVERY_STEP: Record<"request" | "confirm", AuthStep> = {
    request: { current: 1, total: 2 },
    confirm: { current: 2, total: 2 },
};

const BACK_TO_SIGN_IN: AuthTitleBlockEntry = {
    label: "Remembered it",
    href: AUTH_ROUTES.login,
    action: "Back to sign in",
};

export const RECOVERY_BACK_ENTRIES: AuthTitleBlockEntry[] = [BACK_TO_SIGN_IN];

export const RECOVERY_DONE_ENTRIES: AuthTitleBlockEntry[] = [
    {
        label: "Ready when you are",
        href: AUTH_ROUTES.login,
        action: "Go to sign in",
    },
];

export const RECOVERY_PENDING_ENTRIES: AuthTitleBlockEntry[] = [
    {
        label: "Link expired",
        href: AUTH_ROUTES.resetPassword,
        action: "Request a new one",
    },
    BACK_TO_SIGN_IN,
];

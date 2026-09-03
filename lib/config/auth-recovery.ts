import type { AuthStep } from "@/components/features/auth/parts/auth-form-header";
import type { AuthTitleBlockEntry } from "@/components/features/auth/parts/auth-title-block";
import { AUTH_ROUTES } from "@/lib/constants";

export const AUTH_FAILURES = {
    register:
        "We couldn't create your account. Review your details and try again.",
    request:
        "We couldn't send the reset link. Check the address and try again.",
    reset: "We couldn't reset your password. The link may have expired — request a new one.",
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

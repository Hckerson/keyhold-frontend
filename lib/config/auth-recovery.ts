import { AUTH_ROUTES } from "@/lib/constants";
import type { AuthStep, AuthTitleBlockEntry } from "@/lib/types";

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

export const OAUTH_FAILURES = [
    "denied",
    "unverified",
    "closed",
    "blocked",
    "maintenance",
    "unavailable",
    "failed",
] as const;

export type OAuthFailure = (typeof OAUTH_FAILURES)[number];

export const OAUTH_NOTICES: Record<
    OAuthFailure,
    { title: string; description: string }
> = {
    denied: {
        title: "Sign-in cancelled",
        description: "Nothing was shared. Choose a method below to try again.",
    },
    unverified: {
        title: "Confirm the email first",
        description:
            "That address belongs to an account that hasn't been confirmed. Sign in with your password to continue.",
    },
    closed: {
        title: "Registration is closed",
        description:
            "New accounts can't be opened right now. Existing members can still sign in.",
    },
    blocked: {
        title: "This account can't sign in",
        description: "Contact support if you think this is a mistake.",
    },
    maintenance: {
        title: "Down for maintenance",
        description:
            "Sign-in is paused while the platform is updated. Try again shortly.",
    },
    unavailable: {
        title: "That sign-in isn't available",
        description: "Use your email and password instead.",
    },
    failed: {
        title: "That sign-in didn't complete",
        description: "Try again, or use your email and password.",
    },
};

export const oauthFailureFrom = (
    value: string | undefined,
): OAuthFailure | undefined =>
    OAUTH_FAILURES.find((failure) => failure === value);

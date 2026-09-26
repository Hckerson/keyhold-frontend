import { AUTH_ROUTES } from "@/lib/constants";

export const NEWSLETTER_SOURCE = "footer";

export const NEWSLETTER_CONSENT_TEXT =
    "Occasional off-market notes. Unsubscribe any time.";

export const NEWSLETTER_FORM_COPY = {
    label: "The private list",
    placeholder: "you@example.com",
    submit: "Subscribe to the newsletter",
    consent: NEWSLETTER_CONSENT_TEXT,
    privacy: "How we use your address",
    privacyHref: AUTH_ROUTES.privacy,
    sent: "Check your inbox to confirm your subscription.",
    failure: "We couldn't send the confirmation email. Try again in a moment.",
    tooMany:
        "Too many attempts from this connection. Wait a minute and try again.",
} as const;

export type NewsletterTokenAction = "confirm" | "unsubscribe";

export type NewsletterTokenState = "pending" | "done" | "invalid" | "failed";

export interface NewsletterStateCopy {
    title: string;
    description: string;
}

export interface NewsletterPageCopy {
    eyebrow: string;
    metaTitle: string;
    retry: string;
    home: string;
    states: Record<NewsletterTokenState, NewsletterStateCopy>;
}

const INVALID_STATUSES = [400, 404];

export const RATE_LIMITED_STATUS = 429;

export const isInvalidLinkStatus = (status: number | undefined) =>
    status !== undefined && INVALID_STATUSES.includes(status);

export const NEWSLETTER_PAGES: Record<
    NewsletterTokenAction,
    NewsletterPageCopy
> = {
    confirm: {
        eyebrow: "Newsletter",
        metaTitle: "Confirm subscription",
        retry: "Try again",
        home: "Back to the homepage",
        states: {
            pending: {
                title: "Confirming your subscription",
                description: "This takes a moment.",
            },
            done: {
                title: "You're on the list",
                description:
                    "Your subscription is confirmed. Every note carries a link to leave the list.",
            },
            invalid: {
                title: "This link no longer works",
                description:
                    "It may have expired, already been used, or been replaced by a newer confirmation email. Subscribe again from the footer to get a fresh link.",
            },
            failed: {
                title: "We couldn't confirm your subscription",
                description:
                    "Nothing changed on our side. Check your connection and try again.",
            },
        },
    },
    unsubscribe: {
        eyebrow: "Newsletter",
        metaTitle: "Unsubscribe",
        retry: "Try again",
        home: "Back to the homepage",
        states: {
            pending: {
                title: "Removing you from the list",
                description: "This takes a moment.",
            },
            done: {
                title: "You're unsubscribed",
                description:
                    "We won't send you any more notes. You can subscribe again at any time.",
            },
            invalid: {
                title: "We don't recognise this link",
                description:
                    "Use the unsubscribe link from the most recent email we sent you.",
            },
            failed: {
                title: "We couldn't unsubscribe you",
                description:
                    "You are still on the list. Check your connection and try again.",
            },
        },
    },
};

"use client";

import { useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { newsletterAPI } from "@/lib/api/newsletter";
import { FEEDBACK, type MutationFeedback } from "@/lib/config/feedback";
import {
    isInvalidLinkStatus,
    NEWSLETTER_CONSENT_TEXT,
    NEWSLETTER_FORM_COPY,
    NEWSLETTER_SOURCE,
    RATE_LIMITED_STATUS,
    type NewsletterTokenAction,
    type NewsletterTokenState,
} from "@/lib/config/newsletter";
import { errorMessage, responseStatus } from "@/lib/utils/api-error";
import type { NewsletterSignupInput } from "@/lib/validations/newsletter";

export function useSubscribeNewsletter() {
    const mutation = useMutation({
        meta: FEEDBACK.subscribeNewsletter,
        mutationFn: ({ email }: NewsletterSignupInput) =>
            newsletterAPI.subscribe({
                email,
                consent: true,
                consentText: NEWSLETTER_CONSENT_TEXT,
                source: NEWSLETTER_SOURCE,
            }),
    });

    return {
        submit: mutation.mutate,
        pending: mutation.isPending,
        sent: mutation.isSuccess,
        error: mutation.error ? subscribeFailure(mutation.error) : null,
        clearError: mutation.reset,
    };
}

const subscribeFailure = (error: Error) =>
    responseStatus(error) === RATE_LIMITED_STATUS
        ? NEWSLETTER_FORM_COPY.tooMany
        : errorMessage(error, NEWSLETTER_FORM_COPY.failure);

const TOKEN_REQUESTS: Record<
    NewsletterTokenAction,
    { meta: MutationFeedback; send: (token: string) => Promise<unknown> }
> = {
    confirm: {
        meta: FEEDBACK.confirmNewsletter,
        send: newsletterAPI.confirm,
    },
    unsubscribe: {
        meta: FEEDBACK.unsubscribeNewsletter,
        send: newsletterAPI.unsubscribe,
    },
};

export function useNewsletterToken(
    action: NewsletterTokenAction,
    token: string | undefined,
): { state: NewsletterTokenState; retry: () => void } {
    const request = TOKEN_REQUESTS[action];
    const mutation = useMutation({
        meta: request.meta,
        mutationFn: (value: string) => request.send(value),
    });
    const started = useRef(false);
    const { mutate } = mutation;

    useEffect(() => {
        if (!token || started.current) return;
        started.current = true;
        mutate(token);
    }, [token, mutate]);

    const retry = () => {
        if (token) mutation.mutate(token);
    };

    if (!token) return { state: "invalid", retry };
    if (mutation.isSuccess) return { state: "done", retry };
    if (mutation.isError) {
        return {
            state: isInvalidLinkStatus(responseStatus(mutation.error))
                ? "invalid"
                : "failed",
            retry,
        };
    }
    return { state: "pending", retry };
}

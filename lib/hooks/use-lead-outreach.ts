"use client";

import { useCallback, useState } from "react";
import { useSendLeadEmail, useStartLeadCall } from "@/lib/hooks/use-contact";
import {
    EMPTY_LEAD_EMAIL_DRAFT,
    draftFrom,
    type LeadEmailDraft,
} from "@/lib/config/lead-contact";
import { sendLeadEmailSchema } from "@/lib/validations/contact";
import { toFieldErrors, type FieldErrors } from "@/lib/validations/auth";

export function useLeadOutreach(
    connectionId: string | undefined,
    propertyTitle: string | undefined,
) {
    const [composing, setComposing] = useState(false);
    const [draft, setDraft] = useState<LeadEmailDraft>(EMPTY_LEAD_EMAIL_DRAFT);
    const [errors, setErrors] = useState<FieldErrors>({});

    const sendEmail = useSendLeadEmail(connectionId ?? "");
    const startCall = useStartLeadCall(connectionId ?? "");

    const openCompose = useCallback(() => {
        if (!connectionId) return;
        sendEmail.reset();
        setDraft(draftFrom(propertyTitle));
        setErrors({});
        setComposing(true);
    }, [connectionId, propertyTitle, sendEmail]);

    const closeCompose = useCallback(() => setComposing(false), []);

    const submitEmail = useCallback(() => {
        const parsed = sendLeadEmailSchema.safeParse(draft);

        if (!parsed.success) {
            setErrors(toFieldErrors(parsed.error));
            return;
        }

        setErrors({});
        sendEmail.mutate(parsed.data, { onSuccess: closeCompose });
    }, [draft, sendEmail, closeCompose]);

    const call = useCallback(() => {
        if (connectionId) startCall.mutate();
    }, [connectionId, startCall]);

    return {
        composing,
        draft,
        errors,
        sending: sendEmail.isPending,
        calling: startCall.isPending,
        openCompose,
        closeCompose,
        setDraft,
        submitEmail,
        call,
    };
}

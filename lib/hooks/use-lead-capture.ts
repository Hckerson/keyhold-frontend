"use client";

import { useCallback, useState } from "react";
import { useRecordLead } from "@/lib/hooks/use-connections";
import { EMPTY_LEAD_DRAFT, type LeadDraft } from "@/lib/config/lead-capture";
import { createLeadSchema } from "@/lib/validations/connection";
import { toFieldErrors, type FieldErrors } from "@/lib/validations/auth";

export function useLeadCapture(defaultPropertyId: string) {
    const recordLead = useRecordLead();
    const [adding, setAdding] = useState(false);
    const [draft, setDraft] = useState<LeadDraft>(EMPTY_LEAD_DRAFT);
    const [errors, setErrors] = useState<FieldErrors>({});

    const open = useCallback(() => {
        recordLead.reset();
        setDraft({ ...EMPTY_LEAD_DRAFT, propertyId: defaultPropertyId });
        setErrors({});
        setAdding(true);
    }, [recordLead, defaultPropertyId]);

    const close = useCallback(() => {
        if (!recordLead.isPending) setAdding(false);
    }, [recordLead.isPending]);

    const submit = () => {
        if (recordLead.isPending) return;
        const parsed = createLeadSchema.safeParse(draft);

        if (!parsed.success) {
            setErrors(toFieldErrors(parsed.error));
            return;
        }

        setErrors({});
        recordLead.mutate(parsed.data, { onSuccess: () => setAdding(false) });
    };

    return {
        adding,
        draft,
        errors,
        pending: recordLead.isPending,
        failed: recordLead.isError,
        setDraft,
        open,
        close,
        submit,
    };
}

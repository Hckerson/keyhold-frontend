"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
    EMPTY_LISTING_DRAFT,
    LISTING_FORM_COPY,
    type ListingDraft,
} from "@/lib/config/listing-form";
import {
    changedFields,
    toListingDraft,
    toPropertyInput,
} from "@/lib/data/listing-form";
import {
    useCreateProperty,
    useUpdateProperty,
} from "@/lib/hooks/use-properties";
import { useUnsavedChangesWarning } from "@/lib/hooks/use-unsaved-changes-warning";
import { toFieldErrors, type FieldErrors } from "@/lib/validations/auth";
import { createPropertySchema } from "@/lib/validations/property";
import type { Property } from "@/lib/validations/property";

const LISTINGS_ROUTE = LISTING_FORM_COPY.back.href;

export function useListingForm(property?: Property) {
    const router = useRouter();
    const createProperty = useCreateProperty();
    const updateProperty = useUpdateProperty(property?.id ?? "");

    const [draft, setDraft] = useState<ListingDraft>(EMPTY_LISTING_DRAFT);
    const [baseline, setBaseline] = useState<ListingDraft>(EMPTY_LISTING_DRAFT);
    const [errors, setErrors] = useState<FieldErrors>({});
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        if (!property) return;
        const next = toListingDraft(property);
        setDraft(next);
        setBaseline(next);
    }, [property]);

    const dirty = JSON.stringify(draft) !== JSON.stringify(baseline);

    useUnsavedChangesWarning(dirty && !saved);

    const submit = () => {
        const parsed = createPropertySchema.safeParse(toPropertyInput(draft));

        if (!parsed.success) {
            setErrors(toFieldErrors(parsed.error));
            return;
        }

        setErrors({});
        const saving = property
            ? updateProperty.mutateAsync(changedFields(parsed.data, baseline))
            : createProperty.mutateAsync(parsed.data);

        void saving.then(() => {
            setSaved(true);
            router.push(LISTINGS_ROUTE);
        });
    };

    return {
        draft,
        errors,
        dirty,
        pending: createProperty.isPending || updateProperty.isPending,
        failed: createProperty.isError || updateProperty.isError,
        setDraft,
        submit,
        cancel: () => router.push(LISTINGS_ROUTE),
    };
}

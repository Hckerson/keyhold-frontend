"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
    EMPTY_LISTING_DRAFT,
    type ListingDraft,
} from "@/lib/config/listing-form";
import { LISTING_FORM_COPY } from "@/lib/config/listing-form-copy";
import {
    changedFields,
    changedKeys,
    toListingDraft,
    toPropertyInput,
} from "@/lib/data/listing-form";
import {
    useCreateProperty,
    useUpdateProperty,
} from "@/lib/hooks/use-properties";
import { useUnsavedChangesWarning } from "@/lib/hooks/use-unsaved-changes-warning";
import { toFieldErrors, type FieldErrors } from "@/lib/validations/auth";
import {
    createPropertySchema,
    listingFormSchema,
} from "@/lib/validations/property";
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

    const changed = useMemo(
        () => changedKeys(draft, baseline),
        [draft, baseline],
    );

    useUnsavedChangesWarning(changed.length > 0 && !saved);

    const submit = () => {
        const input = toPropertyInput(draft);
        const parsed = listingFormSchema.safeParse(input);

        if (!parsed.success) {
            setErrors(toFieldErrors(parsed.error));
            return;
        }

        setErrors({});
        const onSuccess = () => {
            setSaved(true);
            router.push(LISTINGS_ROUTE);
        };

        if (property) {
            updateProperty.mutate(changedFields(parsed.data, baseline), {
                onSuccess,
            });
            return;
        }

        createProperty.mutate(createPropertySchema.parse(input), { onSuccess });
    };

    return {
        draft,
        errors,
        changed,
        dirty: changed.length > 0,
        pending: createProperty.isPending || updateProperty.isPending,
        failed: createProperty.isError || updateProperty.isError,
        setDraft,
        submit,
        cancel: () => router.push(LISTINGS_ROUTE),
    };
}

"use client";

import type { ChangeEvent } from "react";
import { ConfigPanel } from "@/components/features/shared/config-panel";
import { ListingIdentityPanel } from "@/components/features/agent/listing-identity-panel";
import { ListingExtrasPanel } from "@/components/features/agent/listing-extras-panel";
import type { ListingDraft } from "@/lib/config/listing-form";
import { LISTING_FORM_COPY as COPY } from "@/lib/config/listing-form-copy";
import {
    LISTING_PLACE_FIELDS,
    LISTING_SPEC_FIELDS,
} from "@/lib/config/listing-form-fields";
import type { FieldErrors } from "@/lib/validations/auth";

export interface ListingFormFieldsProps {
    draft: ListingDraft;
    errors: FieldErrors;
    onChange: (draft: ListingDraft) => void;
}

export function ListingFormFields({
    draft,
    errors,
    onChange,
}: ListingFormFieldsProps) {
    const patch = (change: Partial<ListingDraft>) =>
        onChange({ ...draft, ...change });

    const onFieldChange = (event: ChangeEvent<HTMLInputElement>) =>
        patch({ [event.target.name]: event.target.value });

    return (
        <>
            <ListingIdentityPanel
                id="identity"
                draft={draft}
                errors={errors}
                onPatch={patch}
            />

            <ConfigPanel
                id="place"
                title={COPY.place}
                description={COPY.placeLede}
                fields={LISTING_PLACE_FIELDS}
                values={draft}
                errors={errors}
                onChange={onFieldChange}
            />

            <ConfigPanel
                id="specs"
                title={COPY.specs}
                description={COPY.specsLede}
                fields={LISTING_SPEC_FIELDS}
                values={draft}
                errors={errors}
                onChange={onFieldChange}
            />

            <ListingExtrasPanel
                id="extras"
                draft={draft}
                errors={errors}
                onPatch={patch}
            />
        </>
    );
}

ListingFormFields.displayName = "ListingFormFields";

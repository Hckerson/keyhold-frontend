"use client";

import type { ChangeEvent } from "react";
import { FormField } from "@/components/ui/forms/form-field";
import { Select } from "@/components/ui/forms/select";
import { TextareaField } from "@/components/ui/forms/textarea-field";
import { Panel } from "@/components/ui/panel";
import { LabelledBlock } from "@/components/patterns/labelled-block";
import { ConfigPanel } from "@/components/features/shared/config-panel";
import {
    DESCRIPTION_ROWS,
    LISTING_EXTRA_FIELDS,
    LISTING_FORM_COPY as COPY,
    LISTING_PLACE_FIELDS,
    LISTING_SPEC_FIELDS,
    LISTING_TYPE_OPTIONS,
    type ListingDraft,
} from "@/lib/config/listing-form";
import type { PropertyType } from "@/lib/enums/enums";
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
        <div className="flex flex-col gap-3">
            <Panel title={COPY.identity} description={COPY.identityLede}>
                <div className="flex flex-col gap-3">
                    <FormField
                        name="title"
                        label={COPY.title}
                        value={draft.title}
                        error={errors.title}
                        onChange={onFieldChange}
                    />
                    <TextareaField
                        name="description"
                        label={COPY.description}
                        rows={DESCRIPTION_ROWS}
                        value={draft.description}
                        error={errors.description}
                        onChange={(event) =>
                            patch({ description: event.target.value })
                        }
                    />
                    <LabelledBlock label={COPY.type}>
                        <Select
                            size="sm"
                            label={COPY.type}
                            options={LISTING_TYPE_OPTIONS}
                            value={draft.type}
                            onChange={(type: PropertyType) => patch({ type })}
                        />
                    </LabelledBlock>
                </div>
            </Panel>

            <ConfigPanel
                title={COPY.place}
                description={COPY.placeLede}
                fields={LISTING_PLACE_FIELDS}
                values={draft}
                errors={errors}
                onChange={onFieldChange}
            />

            <ConfigPanel
                title={COPY.specs}
                description={COPY.specsLede}
                fields={LISTING_SPEC_FIELDS}
                values={draft}
                errors={errors}
                onChange={onFieldChange}
            />

            <ConfigPanel
                title={COPY.extras}
                description={COPY.extrasLede}
                fields={LISTING_EXTRA_FIELDS}
                values={draft}
                errors={errors}
                onChange={onFieldChange}
            />
        </div>
    );
}

ListingFormFields.displayName = "ListingFormFields";

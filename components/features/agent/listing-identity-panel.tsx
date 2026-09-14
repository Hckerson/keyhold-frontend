"use client";

import type { ChangeEvent } from "react";
import { FormField } from "@/components/ui/forms/form-field";
import { Select } from "@/components/ui/forms/select";
import { TextareaField } from "@/components/ui/forms/textarea-field";
import { Panel } from "@/components/ui/panel";
import { LabelledBlock } from "@/components/patterns/labelled-block";
import {
    DESCRIPTION_ROWS,
    LISTING_TYPE_OPTIONS,
    type ListingDraft,
} from "@/lib/config/listing-form";
import { LISTING_FORM_COPY as COPY } from "@/lib/config/listing-form-copy";
import type { PropertyType } from "@/lib/enums/enums";
import type { FieldErrors } from "@/lib/validations/auth";

export interface ListingIdentityPanelProps {
    id: string;
    draft: ListingDraft;
    errors: FieldErrors;
    onPatch: (change: Partial<ListingDraft>) => void;
}

export function ListingIdentityPanel({
    id,
    draft,
    errors,
    onPatch,
}: ListingIdentityPanelProps) {
    return (
        <Panel id={id} title={COPY.identity} description={COPY.identityLede}>
            <div className="flex flex-col gap-3">
                <FormField
                    name="title"
                    label={COPY.title}
                    value={draft.title}
                    error={errors.title}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        onPatch({ title: event.target.value })
                    }
                />
                <TextareaField
                    name="description"
                    label={COPY.description}
                    rows={DESCRIPTION_ROWS}
                    value={draft.description}
                    error={errors.description}
                    onChange={(event) =>
                        onPatch({ description: event.target.value })
                    }
                />
                <LabelledBlock label={COPY.type}>
                    <Select
                        label={COPY.type}
                        options={LISTING_TYPE_OPTIONS}
                        value={draft.type}
                        onChange={(type: PropertyType) => onPatch({ type })}
                    />
                </LabelledBlock>
            </div>
        </Panel>
    );
}

ListingIdentityPanel.displayName = "ListingIdentityPanel";

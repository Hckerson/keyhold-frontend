"use client";

import { Panel } from "@/components/ui/panel";
import { TagInput } from "@/components/ui/forms/tag-input";
import { SuggestionChips } from "@/components/patterns/suggestion-chips";
import type { ListingDraft } from "@/lib/config/listing-form";
import { LISTING_FORM_COPY as COPY } from "@/lib/config/listing-form-copy";
import { LISTING_TAG_FIELDS } from "@/lib/config/listing-form-fields";
import type { FieldErrors } from "@/lib/validations/auth";

type TagField = (typeof LISTING_TAG_FIELDS)[number]["name"];

const tagPatch = (name: TagField, values: string[]): Partial<ListingDraft> =>
    name === "amenities" ? { amenities: values } : { features: values };

export interface ListingExtrasPanelProps {
    id: string;
    draft: ListingDraft;
    errors: FieldErrors;
    onPatch: (change: Partial<ListingDraft>) => void;
}

export function ListingExtrasPanel({
    id,
    draft,
    errors,
    onPatch,
}: ListingExtrasPanelProps) {
    return (
        <Panel id={id} title={COPY.extras} description={COPY.extrasLede}>
            <div className="card-grid gap-3">
                {LISTING_TAG_FIELDS.map((field) => (
                    <div key={field.name} className="flex flex-col gap-2">
                        <TagInput
                            name={field.name}
                            label={field.label}
                            values={draft[field.name]}
                            placeholder={COPY.tagPlaceholder}
                            error={errors[field.name]}
                            onChange={(values) =>
                                onPatch(tagPatch(field.name, values))
                            }
                        />
                        <SuggestionChips
                            label={COPY.suggestions}
                            options={field.suggestions}
                            held={draft[field.name]}
                            onAdd={(value) =>
                                onPatch(
                                    tagPatch(field.name, [
                                        ...draft[field.name],
                                        value,
                                    ]),
                                )
                            }
                        />
                    </div>
                ))}
            </div>
        </Panel>
    );
}

ListingExtrasPanel.displayName = "ListingExtrasPanel";

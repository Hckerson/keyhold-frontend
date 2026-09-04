"use client";

import { Button } from "@/components/ui/button";
import { Callout } from "@/components/ui/callout";
import { PortalHeader } from "@/components/patterns/portal-header";
import { ListingFormFields } from "@/components/features/agent/listing-form-fields";
import { LISTING_FORM_COPY as COPY } from "@/lib/config/listing-form";
import { useListingForm } from "@/lib/hooks/use-listing-form";
import type { Property } from "@/lib/validations/property";

export interface ListingFormConsoleProps {
    property?: Property;
}

export function ListingFormConsole({ property }: ListingFormConsoleProps) {
    const form = useListingForm(property);
    const editing = property !== undefined;

    return (
        <div className="flex flex-col gap-4">
            <PortalHeader
                title={editing ? COPY.editTitle : COPY.createTitle}
                lede={editing ? COPY.editLede : COPY.createLede}
                back={COPY.back}
                action={
                    <>
                        <Button type="button" onClick={form.cancel}>
                            {COPY.cancel}
                        </Button>
                        <Button
                            type="button"
                            emphasis="solid"
                            tone="accent"
                            isLoading={form.pending}
                            disabled={editing && !form.dirty}
                            onClick={form.submit}
                        >
                            {editing ? COPY.editSubmit : COPY.createSubmit}
                        </Button>
                    </>
                }
            />

            {form.failed && (
                <Callout
                    variant="error"
                    title={COPY.failed}
                    description={COPY.retry}
                />
            )}

            <ListingFormFields
                draft={form.draft}
                errors={form.errors}
                onChange={form.setDraft}
            />
        </div>
    );
}

ListingFormConsole.displayName = "ListingFormConsole";

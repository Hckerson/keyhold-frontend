"use client";

import { Button } from "@/components/ui/button";
import { Callout } from "@/components/ui/callout";
import { PortalHeader } from "@/components/patterns/portal-header";
import { ListingFormFields } from "@/components/features/agent/listing-form-fields";
import { ListingFormNav } from "@/components/features/agent/listing-form-nav";
import { ListingMediaPanel } from "@/components/features/agent/listing-media-panel";
import { ListingLifecyclePanel } from "@/components/features/agent/listing-lifecycle-panel";
import { ListingPromoteModal } from "@/components/features/agent/listing-promote-modal";
import { ListingDeleteModal } from "@/components/features/agent/listing-delete-modal";
import { LISTING_FORM_COPY as COPY } from "@/lib/config/listing-form-copy";
import { dirtySummary, featuredLabel } from "@/lib/data/listing-form";
import { useListingForm } from "@/lib/hooks/use-listing-form";
import { useListingImages } from "@/lib/hooks/use-listing-images";
import { useListingLifecycle } from "@/lib/hooks/use-listing-lifecycle";
import type { Property } from "@/lib/validations/property";

export interface ListingFormConsoleProps {
    property?: Property;
}

export function ListingFormConsole({ property }: ListingFormConsoleProps) {
    const form = useListingForm(property);
    const images = useListingImages(property?.id ?? "");
    const lifecycle = useListingLifecycle(property?.id ?? "");
    const editing = property !== undefined;

    return (
        <div className="flex flex-col gap-4">
            <PortalHeader
                title={editing ? COPY.editTitle : COPY.createTitle}
                lede={editing ? COPY.editLede : COPY.createLede}
                summary={dirtySummary(form.changed.length)}
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

            <div className="console-split gap-3">
                <div className="console-span-2 flex flex-col gap-3">
                    <ListingFormFields
                        draft={form.draft}
                        errors={form.errors}
                        onChange={form.setDraft}
                    />

                    {property && (
                        <ListingMediaPanel
                            id="media"
                            images={property.images}
                            busy={images.busy}
                            uploading={images.uploading}
                            uploadProgress={images.uploadProgress}
                            onUpload={images.upload}
                            onReorder={images.reorder}
                            onRemove={images.remove}
                        />
                    )}
                </div>

                <div className="flex flex-col gap-3">
                    <ListingFormNav editing={editing} changed={form.changed} />

                    {property && (
                        <ListingLifecyclePanel
                            id="lifecycle"
                            status={form.draft.status}
                            featuredUntil={featuredLabel(property)}
                            soldPending={lifecycle.soldPending}
                            onPatch={(change) =>
                                form.setDraft({ ...form.draft, ...change })
                            }
                            onPromote={lifecycle.openPromote}
                            onMarkSold={lifecycle.markSold}
                            onDelete={lifecycle.openRemove}
                        />
                    )}
                </div>
            </div>

            <ListingPromoteModal
                address={
                    lifecycle.promoting && property
                        ? property.address
                        : undefined
                }
                featuredUntil={property && featuredLabel(property)}
                pending={lifecycle.promotePending}
                failed={lifecycle.promoteFailed}
                onClose={lifecycle.closePromote}
                onConfirm={lifecycle.promote}
            />

            <ListingDeleteModal
                address={
                    lifecycle.removing && property
                        ? property.address
                        : undefined
                }
                pending={lifecycle.removePending}
                failed={lifecycle.removeFailed}
                onClose={lifecycle.closeRemove}
                onConfirm={lifecycle.remove}
            />
        </div>
    );
}

ListingFormConsole.displayName = "ListingFormConsole";

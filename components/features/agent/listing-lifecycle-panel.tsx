"use client";

import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { Select } from "@/components/ui/forms/select";
import { ActionRow } from "@/components/ui/action-row";
import { LabelledBlock } from "@/components/patterns/labelled-block";
import {
    LISTING_STATUS_HINTS,
    type ListingDraft,
} from "@/lib/config/listing-form";
import { LISTING_FORM_COPY as COPY } from "@/lib/config/listing-form-copy";
import { listingStatusOptions } from "@/lib/data/listing-form";
import type { PropertyStatus } from "@/lib/enums/enums";

export interface ListingLifecyclePanelProps {
    id: string;
    status: PropertyStatus;
    featuredUntil?: string;
    soldPending: boolean;
    onPatch: (change: Partial<ListingDraft>) => void;
    onPromote: () => void;
    onMarkSold: () => void;
    onDelete: () => void;
}

export function ListingLifecyclePanel({
    id,
    status,
    featuredUntil,
    soldPending,
    onPatch,
    onPromote,
    onMarkSold,
    onDelete,
}: ListingLifecyclePanelProps) {
    return (
        <Panel id={id} title={COPY.lifecycle} description={COPY.lifecycleLede}>
            <LabelledBlock label={COPY.status}>
                <Select
                    label={COPY.status}
                    options={listingStatusOptions(status)}
                    value={status}
                    onChange={(next: PropertyStatus) =>
                        onPatch({ status: next })
                    }
                />
                <p className="text-text-secondary mt-1.5 text-xs">
                    {LISTING_STATUS_HINTS[status]}
                </p>
            </LabelledBlock>

            <ActionRow
                title={COPY.promote}
                description={
                    featuredUntil
                        ? `${COPY.featuredUntil} ${featuredUntil}`
                        : COPY.promoteHint
                }
                action={
                    <Button type="button" onClick={onPromote}>
                        {COPY.promote}
                    </Button>
                }
            />

            <ActionRow
                title={COPY.markSold}
                description={COPY.markSoldHint}
                action={
                    <Button
                        type="button"
                        disabled={status === "SOLD"}
                        isLoading={soldPending}
                        onClick={onMarkSold}
                    >
                        {COPY.markSold}
                    </Button>
                }
            />

            <ActionRow
                danger
                title={COPY.remove}
                description={COPY.removeHint}
                action={
                    <Button
                        type="button"
                        emphasis="outline"
                        tone="error"
                        onClick={onDelete}
                    >
                        {COPY.remove}
                    </Button>
                }
            />
        </Panel>
    );
}

ListingLifecyclePanel.displayName = "ListingLifecyclePanel";

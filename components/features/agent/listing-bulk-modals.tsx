"use client";

import { ListingBulkDeleteModal } from "@/components/features/agent/listing-bulk-delete-modal";
import { ListingBulkStatusModal } from "@/components/features/agent/listing-bulk-status-modal";
import {
    BULK_TRANSITIONS,
    allowsBulk,
    type BulkStatusChange,
    type BulkStatusTarget,
} from "@/lib/data/agent-listings";
import type { useConfirmation } from "@/lib/hooks/use-confirmation";
import type { ManagedListing } from "@/lib/types";

export interface ListingBulkModalsProps {
    listings: ManagedListing[];
    deletion: ReturnType<typeof useConfirmation<readonly string[]>>;
    statusChange: ReturnType<
        typeof useConfirmation<BulkStatusChange, BulkStatusTarget>
    >;
    onDone: () => void;
}

export function ListingBulkModals({
    listings,
    deletion,
    statusChange,
    onDone,
}: ListingBulkModalsProps) {
    const target = statusChange.target;

    const deleting = listings.filter((listing) =>
        deletion.target?.includes(listing.id),
    );

    const changing = target
        ? listings.filter(
              (listing) =>
                  target.ids.includes(listing.id) &&
                  allowsBulk(listing, target.action),
          )
        : [];

    return (
        <>
            <ListingBulkDeleteModal
                open={deletion.open}
                listings={deleting}
                pending={deletion.pending}
                failed={deletion.failed}
                onClose={deletion.dismiss}
                onConfirm={() =>
                    deletion.confirm(
                        deleting.map((listing) => listing.id),
                        onDone,
                    )
                }
            />

            <ListingBulkStatusModal
                action={target?.action}
                listings={changing}
                skipped={target?.skipped ?? 0}
                pending={statusChange.pending}
                failed={statusChange.failed}
                onClose={statusChange.dismiss}
                onConfirm={() => {
                    if (!target) return;
                    statusChange.confirm(
                        {
                            ids: changing.map((listing) => listing.id),
                            status: BULK_TRANSITIONS[target.action].to,
                        },
                        onDone,
                    );
                }}
            />
        </>
    );
}

ListingBulkModals.displayName = "ListingBulkModals";

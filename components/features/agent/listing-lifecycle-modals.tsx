"use client";

import { ListingDeleteModal } from "@/components/features/agent/listing-delete-modal";
import { ListingPromoteModal } from "@/components/features/agent/listing-promote-modal";
import { ListingSoldModal } from "@/components/features/agent/listing-sold-modal";
import type { ListingLifecycle } from "@/lib/hooks/use-listing-lifecycle";

export interface ListingLifecycleModalsProps {
    address: string;
    featuredUntil?: string;
    lifecycle: ListingLifecycle;
}

export function ListingLifecycleModals({
    address,
    featuredUntil,
    lifecycle: { promotion, sale, removal, promote, markSold, remove },
}: ListingLifecycleModalsProps) {
    return (
        <>
            <ListingPromoteModal
                address={promotion.open ? address : undefined}
                featuredUntil={featuredUntil}
                pending={promotion.pending}
                failed={promotion.failed}
                onClose={promotion.dismiss}
                onConfirm={promote}
            />

            <ListingSoldModal
                address={sale.open ? address : undefined}
                pending={sale.pending}
                failed={sale.failed}
                onClose={sale.dismiss}
                onConfirm={markSold}
            />

            <ListingDeleteModal
                address={removal.open ? address : undefined}
                pending={removal.pending}
                failed={removal.failed}
                onClose={removal.dismiss}
                onConfirm={remove}
            />
        </>
    );
}

ListingLifecycleModals.displayName = "ListingLifecycleModals";

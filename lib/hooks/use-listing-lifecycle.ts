"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LISTING_FORM_COPY } from "@/lib/config/listing-form-copy";
import {
    useDeleteProperty,
    useMarkPropertySold,
    usePromoteProperty,
} from "@/lib/hooks/use-properties";

const LISTINGS_ROUTE = LISTING_FORM_COPY.back.href;

export function useListingLifecycle(propertyId: string) {
    const router = useRouter();
    const promoteProperty = usePromoteProperty();
    const markSold = useMarkPropertySold();
    const removeProperty = useDeleteProperty();

    const [promoting, setPromoting] = useState(false);
    const [removing, setRemoving] = useState(false);

    return {
        promoting,
        removing,
        promotePending: promoteProperty.isPending,
        promoteFailed: promoteProperty.isError,
        soldPending: markSold.isPending,
        removePending: removeProperty.isPending,
        removeFailed: removeProperty.isError,
        openPromote: () => setPromoting(true),
        closePromote: () => setPromoting(false),
        openRemove: () => setRemoving(true),
        closeRemove: () => setRemoving(false),
        promote: (days: number) =>
            promoteProperty.mutate(
                { id: propertyId, days },
                { onSuccess: () => setPromoting(false) },
            ),
        markSold: () => markSold.mutate(propertyId),
        remove: () =>
            removeProperty.mutate(propertyId, {
                onSuccess: () => {
                    setRemoving(false);
                    router.push(LISTINGS_ROUTE);
                },
            }),
    };
}

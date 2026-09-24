"use client";

import { useRouter } from "next/navigation";
import { LISTING_FORM_COPY } from "@/lib/config/listing-form-copy";
import { useConfirmation } from "@/lib/hooks/use-confirmation";
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

    const promotion = useConfirmation<{ id: string; days: number }, string>(
        promoteProperty,
    );
    const sale = useConfirmation<string>(markSold);
    const removal = useConfirmation<string>(removeProperty);

    return {
        promotion,
        sale,
        removal,
        openPromote: () => promotion.request(propertyId),
        openSale: () => sale.request(propertyId),
        openRemove: () => removal.request(propertyId),
        promote: (days: number) => promotion.confirm({ id: propertyId, days }),
        markSold: () => sale.confirm(propertyId),
        remove: () =>
            removal.confirm(propertyId, () => router.push(LISTINGS_ROUTE)),
    };
}

export type ListingLifecycle = ReturnType<typeof useListingLifecycle>;

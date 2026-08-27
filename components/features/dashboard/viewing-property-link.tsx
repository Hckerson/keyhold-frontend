import Link from "next/link";
import { ListingThumb } from "@/components/features/shared/listing-thumb";
import type { Viewing } from "@/lib/types";
import { PUBLIC_ROUTES } from "@/lib/constants";

export interface ViewingPropertyLinkProps {
    viewing: Viewing;
}

export function ViewingPropertyLink({ viewing }: ViewingPropertyLinkProps) {
    return (
        <Link
            href={PUBLIC_ROUTES.listing(viewing.listingId)}
            className="group flex min-w-0 items-center gap-2"
        >
            <ListingThumb src={viewing.photo} alt={viewing.address} />
            <span className="min-w-0 truncate text-xs">
                <span className="text-text group-hover:text-accent ease-smooth font-medium transition-colors">
                    {viewing.address}
                </span>
                <span className="text-text-muted">
                    {" · "}
                    {viewing.locality}
                </span>
            </span>
        </Link>
    );
}

ViewingPropertyLink.displayName = "ViewingPropertyLink";

import Link from "next/link";
import { Heart } from "lucide-react";
import { ListingThumb } from "@/components/features/shared/listing-thumb";
import { PUBLIC_ROUTES } from "@/lib/constants";
import type { Listing } from "@/lib/types";
import { cn, formatCompactUsd } from "@/lib/utils";
import { formatCount } from "@/lib/utils/format";
import { describeMarketAge } from "@/lib/utils/market-age";

export function JournalListingRow({ listing }: { listing: Listing }) {
    const market = describeMarketAge(listing.listedDaysAgo);

    return (
        <Link
            href={PUBLIC_ROUTES.listing(listing.id)}
            className="group hover:bg-background-alt focus-visible:ring-accent ease-smooth flex h-11 items-center gap-3 px-4 transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-inset"
        >
            <ListingThumb src={listing.images[0] ?? null} alt={listing.title} />

            <span className="min-w-0 flex-1 truncate text-xs">
                <span className="text-text group-hover:text-accent ease-smooth font-semibold transition-colors duration-200">
                    {listing.address}
                </span>
                <span className="text-text-muted"> · {listing.locality}</span>
            </span>

            <span className="desk-only text-text-muted shrink-0 font-mono text-[10px] tracking-wide uppercase tabular-nums">
                {listing.beds} Bd · {listing.baths} Ba
            </span>

            <span
                className={cn(
                    "wide-only shrink-0 font-mono text-[10px] tracking-wide uppercase tabular-nums",
                    market.tone,
                )}
            >
                {market.label}
            </span>

            <span
                className={cn(
                    "wide-only-flex shrink-0 items-center gap-1 font-mono text-[10px] tabular-nums",
                    listing.saves > 0
                        ? "text-accent"
                        : "text-text-muted",
                )}
            >
                <Heart
                    className="size-3"
                    strokeWidth={1.5}
                    aria-hidden="true"
                />
                {formatCount(listing.saves)}
            </span>

            <span className="text-text w-16 shrink-0 text-right text-xs font-semibold tabular-nums">
                {formatCompactUsd(listing.price)}
            </span>
        </Link>
    );
}

JournalListingRow.displayName = "JournalListingRow";

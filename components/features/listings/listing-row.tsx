import Link from "next/link";
import type { ReactNode } from "react";
import { Image } from "@/components/ui/image";
import { PropertySpecs } from "@/components/features/listings/property-specs";
import { cn, formatMillions } from "@/lib/utils";

export interface ListingRowData {
    imageUrl: string;
    address: string;
    price: number;
    beds: number;
    baths: number;
    sqft: number;
}

export interface ListingRowProps {
    listing: ListingRowData;
    href?: string;
    meta?: string;
    actions?: ReactNode;
    className?: string;
}

export function ListingRow({
    listing,
    href,
    meta,
    actions,
    className,
}: ListingRowProps) {
    const { imageUrl, address, price, beds, baths, sqft } = listing;
    const priceLabel = formatMillions(price, 2);
    const media = (
        <Image
            src={imageUrl}
            alt={address}
            variant="card"
            className="size-full object-cover"
        />
    );

    return (
        <article
            className={cn(
                "group bg-background-muted border-border-light hover:border-border ease-smooth flex flex-col overflow-hidden rounded-xl border shadow-sm transition-all duration-300 hover:shadow-md sm:flex-row",
                className,
            )}
        >
            <div className="relative aspect-16/10 w-full overflow-hidden sm:aspect-auto sm:w-56 sm:shrink-0">
                {href ? (
                    <Link href={href} className="block size-full">
                        {media}
                    </Link>
                ) : (
                    media
                )}
            </div>

            <div className="stack-to-row stack-to-row--split flex-1 gap-3 p-3">
                <div className="min-w-0 space-y-2">
                    <div className="min-w-0 space-y-1">
                        <p className="text-h5 font-display text-accent leading-none font-light">
                            {priceLabel}
                        </p>
                        {href ? (
                            <Link
                                href={href}
                                className="text-text-secondary hover:text-accent ease-smooth block truncate text-xs transition-colors duration-200"
                            >
                                {address}
                            </Link>
                        ) : (
                            <p className="text-text-secondary truncate text-xs">
                                {address}
                            </p>
                        )}
                    </div>
                    <PropertySpecs beds={beds} baths={baths} sqft={sqft} />
                    {meta && <p className="text-text-muted text-xs">{meta}</p>}
                </div>

                {actions && (
                    <div className="flex shrink-0 gap-2 sm:flex-col">
                        {actions}
                    </div>
                )}
            </div>
        </article>
    );
}

ListingRow.displayName = "ListingRow";

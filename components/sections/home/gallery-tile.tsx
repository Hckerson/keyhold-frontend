"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Image } from "@/components/ui/image";
import { FeaturedBadge } from "@/components/features/shared/featured-badge";
import { FeaturedCaption } from "@/components/sections/home/featured-caption";
import { PeerCaption } from "@/components/sections/home/peer-caption";
import { SaveTileButton } from "@/components/sections/home/save-tile-button";
import { PUBLIC_ROUTES } from "@/lib/constants";
import type { GalleryTileData } from "@/lib/types";

export function GalleryTile({
    tile,
    large,
}: {
    tile: GalleryTileData;
    large?: boolean;
}) {
    return (
        <article
            className={cn(
                "group ease-smooth relative overflow-hidden rounded-xl transition-all duration-300",
                large
                    ? "col-span-2 row-span-2 shadow-md hover:-translate-y-1 hover:shadow-lg"
                    : "shadow-sm hover:shadow-md",
            )}
        >
            <Image
                variant="bare"
                fill
                sizes="(min-width: 40rem) 33vw, 50vw"
                src={tile.imageUrl}
                alt={tile.address}
                className="ease-smooth object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div
                aria-hidden="true"
                className={cn(
                    "absolute inset-0 bg-linear-to-t to-transparent",
                    large
                        ? "from-sidebar/85 via-sidebar/20 via-40% to-72%"
                        : "from-sidebar/95 via-sidebar/55 via-28% to-68%",
                )}
            />

            <Link
                href={PUBLIC_ROUTES.listing(tile.id)}
                aria-label={`${tile.address} — ${tile.price}`}
                className="focus-visible:ring-accent absolute inset-0 z-10 rounded-xl focus-visible:ring-2 focus-visible:outline-none"
            />

            {tile.featured && <FeaturedBadge />}

            <SaveTileButton id={tile.id} address={tile.address} />

            {large ? (
                <FeaturedCaption tile={tile} />
            ) : (
                <PeerCaption tile={tile} />
            )}
        </article>
    );
}

GalleryTile.displayName = "GalleryTile";

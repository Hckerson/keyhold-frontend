"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Image } from "@/components/ui/image";
import { FeaturedBadge } from "@/components/features/shared/featured-badge";
import { PUBLIC_ROUTES } from "@/lib/constants";
import type { GalleryTileData } from "@/lib/types";
import { useSavedToggle } from "@/lib/hooks/use-saved-toggle";

function SaveTileButton({ id, address }: { id: string; address: string }) {
    const { isSaved, toggle, pending } = useSavedToggle();
    const saved = isSaved(id);

    return (
        <button
            type="button"
            onClick={() => toggle(id)}
            disabled={pending}
            aria-pressed={saved}
            aria-label={saved ? `Unsave ${address}` : `Save ${address}`}
            className="bg-sidebar/70 text-text-inverse ring-sidebar-border hover:text-highlight focus-visible:ring-highlight ease-smooth absolute top-3.5 right-3.5 z-20 grid size-8 place-items-center rounded-full ring-1 backdrop-blur-md transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none"
        >
            <Heart
                size={14}
                strokeWidth={1.5}
                className={cn(saved && "fill-highlight text-highlight")}
            />
        </button>
    );
}

function FeaturedCaption({ tile }: { tile: GalleryTileData }) {
    return (
        <div className="bg-sidebar/80 border-sidebar-border pointer-events-none absolute bottom-3.5 left-3.5 z-10 flex w-fit max-w-[calc(100%-1.75rem)] flex-col gap-1.5 rounded-xl border px-3.5 py-2.5 shadow-lg backdrop-blur-md sm:bottom-4 sm:left-4 sm:max-w-[75%] sm:px-4 sm:py-3">
            <span className="text-highlight-light font-mono text-[10px] tracking-[0.14em] uppercase">
                {tile.specs}
            </span>
            <span className="font-display text-text-inverse text-h6 sm:text-h5 leading-none font-light tracking-tight tabular-nums">
                {tile.price}
            </span>
            <span className="text-sidebar-text text-xs">{tile.address}</span>
            <span className="text-sidebar-text-muted text-xs">
                {tile.agentName}
            </span>
        </div>
    );
}

function PeerCaption({ tile }: { tile: GalleryTileData }) {
    return (
        <div className="pointer-events-none absolute right-3.5 bottom-3.5 left-3.5 z-10 flex flex-col gap-0.5">
            <span className="text-text-inverse text-xs font-semibold tabular-nums">
                {tile.price}
            </span>
            <span className="text-sidebar-text truncate text-[11px]">
                {tile.address}
            </span>
            <span className="text-sidebar-text-muted font-mono text-[10px] tracking-[0.12em] uppercase">
                {tile.specs}
            </span>
            <span className="text-sidebar-text-muted truncate text-[11px]">
                {tile.agentName}
            </span>
        </div>
    );
}

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

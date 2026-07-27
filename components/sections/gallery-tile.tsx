import Link from "next/link";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export interface GalleryTileData {
    id: string;
    imageUrl: string;
    price: string;
    address: string;
    specs: string;
    featured?: boolean;
}

/* ── featured: glass panel, the one focal price in the grid ── */

function FeaturedCaption({ tile }: { tile: GalleryTileData }) {
    return (
        <div className="bg-sidebar/80 border-sidebar-border absolute bottom-4 left-4 flex w-fit max-w-[75%] flex-col gap-1.5 rounded-xl border px-4 py-3 shadow-lg backdrop-blur-md">
            <span className="text-highlight-light font-mono text-[10px] tracking-[0.14em] uppercase">
                {tile.specs}
            </span>
            <span className="font-display text-text-inverse text-h5 leading-none font-light tracking-tight tabular-nums">
                {tile.price}
            </span>
            <span className="text-sidebar-text text-xs">{tile.address}</span>
        </div>
    );
}

/* ── peer: flat scrim, compact line ── */

function PeerCaption({ tile }: { tile: GalleryTileData }) {
    return (
        <div className="absolute right-3.5 bottom-3.5 left-3.5 flex flex-col gap-0.5">
            <span className="text-text-inverse text-xs font-semibold tabular-nums">
                {tile.price}
            </span>
            <span className="text-sidebar-text truncate text-[11px]">
                {tile.address}
            </span>
            <span className="text-sidebar-text-muted font-mono text-[10px] tracking-[0.12em] uppercase">
                {tile.specs}
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
        <Link
            href={`/listing/${tile.id}`}
            className={cn(
                "group ease-smooth focus-visible:ring-accent relative overflow-hidden rounded-xl transition-all duration-300 focus-visible:ring-2 focus-visible:outline-none",
                large
                    ? "shadow-md hover:-translate-y-1 hover:shadow-lg sm:col-span-2 sm:row-span-2"
                    : "shadow-sm hover:shadow-md",
            )}
        >
            <img
                src={tile.imageUrl}
                alt={tile.address}
                className="ease-smooth size-full object-cover transition-transform duration-500 group-hover:scale-105"
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

            {tile.featured && (
                <span className="bg-sidebar/75 text-text-inverse ring-highlight/30 absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10px] tracking-[0.12em] uppercase ring-1 backdrop-blur-md">
                    <Star
                        size={11}
                        strokeWidth={1.5}
                        className="text-highlight"
                    />
                    Featured
                </span>
            )}

            {large ? (
                <FeaturedCaption tile={tile} />
            ) : (
                <PeerCaption tile={tile} />
            )}
        </Link>
    );
}

GalleryTile.displayName = "GalleryTile";

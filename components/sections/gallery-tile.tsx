import Link from "next/link";
import { Star, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

export interface GalleryTileData {
    id: string;
    imageUrl: string;
    price: string;
    address?: string;
    specs: string;
    featured?: boolean;
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
                "group ease-smooth relative overflow-hidden rounded-2xl shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
                large && "sm:col-span-2 sm:row-span-2",
            )}
        >
            <img
                src={tile.imageUrl}
                alt={tile.address ?? "Property"}
                className="ease-smooth size-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div
                aria-hidden="true"
                className="from-sidebar/70 absolute inset-0 bg-gradient-to-t to-transparent to-[46%]"
            />

            {tile.featured && (
                <span className="bg-highlight text-text-inverse text-caption absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono tracking-[0.1em] uppercase">
                    <Star size={13} strokeWidth={1.5} />
                    Featured
                </span>
            )}

            <span className="bg-background/90 text-text group-hover:text-error ease-smooth absolute top-3.5 right-3.5 grid size-8 place-items-center rounded-full backdrop-blur-sm transition-colors">
                <Heart size={15} strokeWidth={1.5} />
            </span>

            <div className="bg-sidebar/60 absolute bottom-4 left-4 rounded-xl px-3.5 py-2.5 backdrop-blur-sm">
                <p
                    className={cn(
                        "font-display text-text-inverse font-normal",
                        large ? "text-h6" : "text-base",
                    )}
                >
                    {tile.price}
                    {tile.address && ` · ${tile.address}`}
                </p>
                <p className="text-text-inverse/70 mt-1 font-mono text-[9.5px] tracking-wide uppercase">
                    {tile.specs}
                </p>
            </div>
        </Link>
    );
}

GalleryTile.displayName = "GalleryTile";

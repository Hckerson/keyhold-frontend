import type { GalleryTileData } from "@/lib/types";

export interface FeaturedCaptionProps {
    tile: GalleryTileData;
}

export function FeaturedCaption({ tile }: FeaturedCaptionProps) {
    return (
        <div className="bg-sidebar/80 border-sidebar-border pointer-events-none absolute bottom-3.5 left-3.5 z-10 flex w-fit max-w-[calc(100%-1.75rem)] flex-col gap-1.5 rounded-xl border px-3.5 py-2.5 shadow-lg backdrop-blur-md sm:bottom-4 sm:left-4 sm:max-w-[75%] sm:px-4 sm:py-3">
            <span className="text-accent-light font-mono text-[10px] tracking-[0.14em] uppercase">
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

FeaturedCaption.displayName = "FeaturedCaption";

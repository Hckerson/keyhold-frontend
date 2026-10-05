import type { GalleryTileData } from "@/lib/types";

export interface PeerCaptionProps {
    tile: GalleryTileData;
}

export function PeerCaption({ tile }: PeerCaptionProps) {
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

PeerCaption.displayName = "PeerCaption";

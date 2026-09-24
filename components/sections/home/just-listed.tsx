import { SectionShell } from "@/components/patterns/section-shell";
import { SectionHeading } from "@/components/patterns/section-heading";
import { GalleryTile } from "@/components/sections/home/gallery-tile";
import { HOME_COPY } from "@/lib/data/home";
import type { GalleryTileData } from "@/lib/types";

export function JustListed({ tiles }: { tiles: GalleryTileData[] }) {
    return (
        <section className="section-pady bg-background">
            <SectionShell>
                <div className="mb-8">
                    <SectionHeading
                        eyebrow={HOME_COPY.justListed.eyebrow}
                        title={HOME_COPY.justListed.title}
                    />
                </div>

                <div className="grid auto-rows-[200px] grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
                    {tiles.map((tile) => (
                        <GalleryTile key={tile.id} tile={tile} />
                    ))}
                </div>
            </SectionShell>
        </section>
    );
}

JustListed.displayName = "JustListed";

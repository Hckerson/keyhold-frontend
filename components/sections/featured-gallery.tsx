import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionShell } from "@/components/sections/section-shell";
import {
    GalleryTile,
    type GalleryTileData,
} from "@/components/sections/gallery-tile";

interface FeaturedGalleryProps {
    tiles: GalleryTileData[];
}

export function FeaturedGallery({ tiles }: FeaturedGalleryProps) {
    return (
        <section className="bg-background py-20 md:py-24">
            <SectionShell>
                <div className="mb-10 flex items-end justify-between gap-6">
                    <div>
                        <p className="text-highlight-dark text-caption font-mono tracking-[0.14em] uppercase">
                            The Collection
                        </p>
                        <h2 className="font-display text-text text-h3 mt-3 font-light">
                            Curated selections
                        </h2>
                    </div>
                    <Link
                        href="/search"
                        className="text-accent hover:text-accent-dark ease-smooth group inline-flex shrink-0 items-center gap-2 text-sm font-medium transition-colors"
                    >
                        View all
                        <ArrowUpRight
                            size={15}
                            strokeWidth={1.5}
                            className="ease-smooth transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                    </Link>
                </div>

                <div className="grid auto-rows-[220px] grid-cols-2 gap-5 sm:grid-cols-4">
                    {tiles.map((tile, i) => (
                        <GalleryTile
                            key={tile.id}
                            tile={tile}
                            large={i === 0}
                        />
                    ))}
                </div>
            </SectionShell>
        </section>
    );
}

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionShell } from "@/components/patterns/section-shell";
import { SectionHeading } from "@/components/patterns/section-heading";
import {
    GalleryTile,
    type GalleryTileData,
} from "@/components/sections/home/gallery-tile";

interface FeaturedGalleryProps {
    tiles: GalleryTileData[];
}

export function FeaturedGallery({ tiles }: FeaturedGalleryProps) {
    return (
        <section className="bg-background py-16 md:py-20">
            <SectionShell>
                <div className="mb-8 flex items-end justify-between gap-6">
                    <SectionHeading
                        eyebrow={`The collection · ${tiles.length} residences`}
                        title="Curated selections"
                    />
                    <Link
                        href="/search"
                        className="text-accent hover:text-accent-dark focus-visible:ring-accent ease-smooth group inline-flex shrink-0 items-center gap-1.5 text-xs font-medium transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none"
                    >
                        View all
                        <ArrowUpRight
                            size={13}
                            strokeWidth={1.5}
                            className="ease-smooth transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                    </Link>
                </div>

                <div className="grid auto-rows-[200px] grid-cols-2 gap-4 sm:grid-cols-3">
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

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionShell } from "@/components/patterns/section-shell";
import { SectionHeading } from "@/components/patterns/section-heading";
import { GalleryTile } from "@/components/sections/home/gallery-tile";
import type { GalleryTileData } from "@/lib/types";
import { PUBLIC_ROUTES } from "@/lib/constants";
import { HOME_COPY } from "@/lib/data/home";

interface FeaturedGalleryProps {
    tiles: GalleryTileData[];
}

export function FeaturedGallery({ tiles }: FeaturedGalleryProps) {
    return (
        <section className="section-pady bg-background">
            <SectionShell>
                <div className="mb-8 flex items-end justify-between gap-6">
                    <SectionHeading
                        eyebrow={HOME_COPY.gallery.eyebrow(tiles.length)}
                        title={HOME_COPY.gallery.title}
                    />
                    <Link
                        href={PUBLIC_ROUTES.search}
                        className="text-accent hover:text-accent-dark focus-visible:ring-accent ease-smooth group inline-flex shrink-0 items-center gap-1.5 text-xs font-medium transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none"
                    >
                        {HOME_COPY.gallery.viewAll}
                        <ArrowUpRight
                            size={13}
                            strokeWidth={1.5}
                            className="ease-smooth transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                    </Link>
                </div>

                <div className="grid auto-rows-[150px] grid-cols-2 gap-3 sm:auto-rows-[200px] sm:grid-cols-3 sm:gap-4">
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

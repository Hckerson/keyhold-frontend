"use client";

import { ChevronLeft, ChevronRight, Star, Trash2 } from "lucide-react";
import { Image } from "@/components/ui/image";
import { IconButton } from "@/components/ui/icon-button";
import { LISTING_FORM_COPY as COPY } from "@/lib/config/listing-form-copy";
import type { PropertyImage } from "@/lib/validations/property";

export interface ListingImageCardProps {
    image: PropertyImage;
    index: number;
    total: number;
    busy: boolean;
    onMove: (to: number) => void;
    onRemove: () => void;
}

export function ListingImageCard({
    image,
    index,
    total,
    busy,
    onMove,
    onRemove,
}: ListingImageCardProps) {
    const cover = index === 0;

    return (
        <figure className="border-border-light bg-background relative overflow-hidden rounded-lg border">
            <div className="relative aspect-video">
                <Image
                    variant="bare"
                    fill
                    src={image.url}
                    alt={`Listing photo ${index + 1} of ${total}`}
                    sizes="(min-width: 64rem) 20rem, 50vw"
                    className="object-cover"
                />
            </div>

            {cover && (
                <span className="bg-background/90 text-text absolute top-1.5 left-1.5 rounded-md px-1.5 py-px font-mono text-[10px] tracking-wide uppercase">
                    {COPY.cover}
                </span>
            )}

            <figcaption className="border-border-light bg-background-alt flex items-center justify-between gap-1 border-t px-1.5 py-1">
                <span className="micro-label tabular-nums">{index + 1}</span>
                <div className="flex items-center gap-0.5">
                    <IconButton
                        icon={Star}
                        tone="accent"
                        label={COPY.makeCover}
                        disabled={busy || cover}
                        onClick={() => onMove(0)}
                    />
                    <IconButton
                        icon={ChevronLeft}
                        label={COPY.moveEarlier}
                        disabled={busy || index === 0}
                        onClick={() => onMove(index - 1)}
                    />
                    <IconButton
                        icon={ChevronRight}
                        label={COPY.moveLater}
                        disabled={busy || index === total - 1}
                        onClick={() => onMove(index + 1)}
                    />
                    <IconButton
                        icon={Trash2}
                        tone="error"
                        label={COPY.removeImage}
                        disabled={busy}
                        onClick={onRemove}
                    />
                </div>
            </figcaption>
        </figure>
    );
}

ListingImageCard.displayName = "ListingImageCard";

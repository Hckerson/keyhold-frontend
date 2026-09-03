"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { AnimatePresence, m } from "motion/react";
import { ListingLightbox } from "@/components/sections/listing/listing-lightbox";
import {
    GALLERY_MEDIA_CHIP_CLASS,
    GALLERY_NAV_BUTTON_CLASS,
} from "@/lib/config/listing-gallery";
import { GALLERY_FRAME_MOTION } from "@/lib/config/public-motion";
import { cn } from "@/lib/utils";
import { Image } from "@/components/ui/image";

interface ListingGalleryProps {
    images: string[];
    title: string;
    badge?: string;
}

export function ListingGallery({ images, title, badge }: ListingGalleryProps) {
    const [index, setIndex] = useState(0);
    const [fullscreen, setFullscreen] = useState(false);

    const step = useCallback(
        (delta: number) => {
            setIndex(
                (current) => (current + delta + images.length) % images.length,
            );
        },
        [images.length],
    );

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "ArrowRight") step(1);
            if (event.key === "ArrowLeft") step(-1);
            if (event.key === "Escape") setFullscreen(false);
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [step]);

    return (
        <section aria-label="Property gallery" className="flex flex-col gap-2">
            <div className="bg-background-muted relative h-75 overflow-hidden rounded-xl md:h-115">
                <AnimatePresence initial={false}>
                    <m.img
                        key={images[index]}
                        {...GALLERY_FRAME_MOTION}
                        src={images[index]}
                        alt={`${title} — image ${index + 1} of ${images.length}`}
                        className="absolute inset-0 size-full object-cover"
                    />
                </AnimatePresence>

                {badge && (
                    <span
                        className={cn(
                            GALLERY_MEDIA_CHIP_CLASS,
                            "absolute top-4 left-4",
                        )}
                    >
                        {badge}
                    </span>
                )}

                <div className="absolute top-4 right-4 flex items-center gap-2">
                    <span
                        className={cn(GALLERY_MEDIA_CHIP_CLASS, "tabular-nums")}
                    >
                        {index + 1} / {images.length}
                    </span>
                    <button
                        type="button"
                        onClick={() => setFullscreen(true)}
                        aria-label="View gallery full screen"
                        className={GALLERY_NAV_BUTTON_CLASS}
                    >
                        <Maximize2 className="size-4" strokeWidth={1.5} />
                    </button>
                </div>

                <div className="absolute inset-y-0 left-4 flex items-center">
                    <button
                        type="button"
                        onClick={() => step(-1)}
                        aria-label="Previous image"
                        className={GALLERY_NAV_BUTTON_CLASS}
                    >
                        <ChevronLeft className="size-4" strokeWidth={1.5} />
                    </button>
                </div>
                <div className="absolute inset-y-0 right-4 flex items-center">
                    <button
                        type="button"
                        onClick={() => step(1)}
                        aria-label="Next image"
                        className={GALLERY_NAV_BUTTON_CLASS}
                    >
                        <ChevronRight className="size-4" strokeWidth={1.5} />
                    </button>
                </div>
            </div>

            <ul className="scroll-x flex gap-2 pb-1">
                {images.map((image, position) => (
                    <li key={image + position}>
                        <button
                            type="button"
                            onClick={() => setIndex(position)}
                            aria-label={`Show image ${position + 1}`}
                            aria-current={position === index}
                            className={cn(
                                "ease-smooth focus-visible:ring-accent block h-16 w-24 shrink-0 overflow-hidden rounded-lg ring-1 transition-all duration-200 focus-visible:ring-2 focus-visible:outline-none",
                                position === index
                                    ? "ring-accent opacity-100"
                                    : "ring-border opacity-60 hover:opacity-100",
                            )}
                        >
                            <Image
                                variant="bare"
                                width={96}
                                height={64}
                                sizes="96px"
                                src={image}
                                alt=""
                                aria-hidden="true"
                                className="size-full object-cover"
                            />
                        </button>
                    </li>
                ))}
            </ul>

            <ListingLightbox
                images={images}
                title={title}
                index={index}
                open={fullscreen}
                onStep={step}
                onClose={() => setFullscreen(false)}
            />
        </section>
    );
}

ListingGallery.displayName = "ListingGallery";

"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { AnimatePresence, m } from "motion/react";
import { GALLERY_NAV_BUTTON_CLASS } from "@/lib/config/listing-gallery";
import {
    GALLERY_FRAME_MOTION,
    LIGHTBOX_BACKDROP_MOTION,
    LIGHTBOX_PLATE_MOTION,
} from "@/lib/config/public-motion";
import { cn } from "@/lib/utils";

export interface ListingLightboxProps {
    images: string[];
    title: string;
    index: number;
    open: boolean;
    onStep: (delta: number) => void;
    onClose: () => void;
}

export function ListingLightbox({
    images,
    title,
    index,
    open,
    onStep,
    onClose,
}: ListingLightboxProps) {
    return (
        <AnimatePresence>
            {open && (
                <m.div
                    key="lightbox"
                    {...LIGHTBOX_BACKDROP_MOTION}
                    role="dialog"
                    aria-modal="true"
                    aria-label={`${title} gallery`}
                    className="bg-sidebar/95 z-modal fixed inset-0 flex flex-col items-center justify-center gap-4 p-4 backdrop-blur-sm"
                >
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close full screen gallery"
                        className={cn(
                            GALLERY_NAV_BUTTON_CLASS,
                            "absolute top-5 right-5",
                        )}
                    >
                        <X className="size-4" strokeWidth={1.5} />
                    </button>

                    <m.div
                        {...LIGHTBOX_PLATE_MOTION}
                        className="relative flex max-h-[78vh] items-center justify-center"
                    >
                        <AnimatePresence mode="wait">
                            <m.img
                                key={images[index]}
                                {...GALLERY_FRAME_MOTION}
                                src={images[index]}
                                alt={`${title} — image ${index + 1} of ${images.length}`}
                                className="max-h-[78vh] w-auto max-w-full rounded-xl object-contain"
                            />
                        </AnimatePresence>
                    </m.div>

                    <div className="flex items-center gap-4">
                        <button
                            type="button"
                            onClick={() => onStep(-1)}
                            aria-label="Previous image"
                            className={GALLERY_NAV_BUTTON_CLASS}
                        >
                            <ChevronLeft className="size-4" strokeWidth={1.5} />
                        </button>
                        <span className="text-sidebar-text font-mono text-[10px] tracking-[0.14em] uppercase tabular-nums">
                            {index + 1} / {images.length}
                        </span>
                        <button
                            type="button"
                            onClick={() => onStep(1)}
                            aria-label="Next image"
                            className={GALLERY_NAV_BUTTON_CLASS}
                        >
                            <ChevronRight
                                className="size-4"
                                strokeWidth={1.5}
                            />
                        </button>
                    </div>
                </m.div>
            )}
        </AnimatePresence>
    );
}

ListingLightbox.displayName = "ListingLightbox";

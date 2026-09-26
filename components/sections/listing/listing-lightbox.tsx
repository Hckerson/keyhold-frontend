"use client";

import { Dialog } from "@base-ui/react/dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { AnimatePresence, m } from "motion/react";
import { GALLERY_NAV_BUTTON_CLASS } from "@/lib/config/listing-gallery";
import { GALLERY_FRAME_MOTION } from "@/lib/config/public-motion";
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
        <Dialog.Root
            open={open}
            onOpenChange={(next) => {
                if (!next) onClose();
            }}
        >
            <Dialog.Portal>
                <Dialog.Backdrop className="bg-sidebar/95 z-modal-backdrop ease-smooth fixed inset-0 backdrop-blur-sm transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0" />
                <Dialog.Viewport className="z-modal fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Popup
                        aria-label={`${title} gallery`}
                        className="ease-smooth flex max-h-full flex-col items-center justify-center gap-4 transition-[opacity,scale] duration-200 outline-none data-ending-style:scale-96 data-ending-style:opacity-0 data-starting-style:scale-96 data-starting-style:opacity-0"
                    >
                        <div className="relative flex min-h-0 items-center justify-center">
                            <AnimatePresence mode="wait">
                                <m.img
                                    key={images[index]}
                                    {...GALLERY_FRAME_MOTION}
                                    src={images[index]}
                                    alt={`${title} — image ${index + 1} of ${images.length}`}
                                    className="max-h-[78vh] w-auto max-w-full rounded-xl object-contain"
                                />
                            </AnimatePresence>

                            <Dialog.Close
                                aria-label="Close full screen gallery"
                                className={cn(
                                    GALLERY_NAV_BUTTON_CLASS,
                                    "absolute top-3 right-3",
                                )}
                            >
                                <X className="size-4" strokeWidth={1.5} />
                            </Dialog.Close>
                        </div>

                        <div className="flex shrink-0 items-center gap-4">
                            <button
                                type="button"
                                onClick={() => onStep(-1)}
                                aria-label="Previous image"
                                className={GALLERY_NAV_BUTTON_CLASS}
                            >
                                <ChevronLeft
                                    className="size-4"
                                    strokeWidth={1.5}
                                />
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
                    </Dialog.Popup>
                </Dialog.Viewport>
            </Dialog.Portal>
        </Dialog.Root>
    );
}

ListingLightbox.displayName = "ListingLightbox";

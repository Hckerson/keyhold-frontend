"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ListingGalleryProps {
    images: string[];
    title: string;
    badge?: string;
}

const navButton =
    "bg-sidebar text-text-inverse hover:text-highlight focus-visible:ring-highlight ease-smooth grid size-9 place-items-center rounded-full shadow-md transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none";

const mediaChip =
    "bg-sidebar text-text-inverse rounded-full px-2.5 py-1 font-mono text-[10px] tracking-[0.12em] uppercase shadow-md select-none";

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
            <div className="relative h-75 overflow-hidden rounded-xl md:h-115">
                <img
                    src={images[index]}
                    alt={`${title} — image ${index + 1} of ${images.length}`}
                    className="size-full object-cover"
                />

                {badge && (
                    <span className={cn(mediaChip, "absolute top-4 left-4")}>
                        {badge}
                    </span>
                )}

                <div className="absolute top-4 right-4 flex items-center gap-2">
                    <span className={cn(mediaChip, "tabular-nums")}>
                        {index + 1} / {images.length}
                    </span>
                    <button
                        type="button"
                        onClick={() => setFullscreen(true)}
                        aria-label="View gallery full screen"
                        className={navButton}
                    >
                        <Maximize2 className="size-4" strokeWidth={1.5} />
                    </button>
                </div>

                <div className="absolute inset-y-0 left-4 flex items-center">
                    <button
                        type="button"
                        onClick={() => step(-1)}
                        aria-label="Previous image"
                        className={navButton}
                    >
                        <ChevronLeft className="size-4" strokeWidth={1.5} />
                    </button>
                </div>
                <div className="absolute inset-y-0 right-4 flex items-center">
                    <button
                        type="button"
                        onClick={() => step(1)}
                        aria-label="Next image"
                        className={navButton}
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
                            <img
                                src={image}
                                alt=""
                                aria-hidden="true"
                                className="size-full object-cover"
                            />
                        </button>
                    </li>
                ))}
            </ul>

            {fullscreen && (
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-label={`${title} gallery`}
                    className="bg-sidebar/95 fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 p-4 backdrop-blur-sm"
                >
                    <button
                        type="button"
                        onClick={() => setFullscreen(false)}
                        aria-label="Close full screen gallery"
                        className={cn(navButton, "absolute top-5 right-5")}
                    >
                        <X className="size-4" strokeWidth={1.5} />
                    </button>

                    <img
                        src={images[index]}
                        alt={`${title} — image ${index + 1} of ${images.length}`}
                        className="max-h-[78vh] w-auto max-w-full rounded-xl object-contain"
                    />

                    <div className="flex items-center gap-4">
                        <button
                            type="button"
                            onClick={() => step(-1)}
                            aria-label="Previous image"
                            className={navButton}
                        >
                            <ChevronLeft className="size-4" strokeWidth={1.5} />
                        </button>
                        <span className="text-sidebar-text font-mono text-[10px] tracking-[0.14em] uppercase tabular-nums">
                            {index + 1} / {images.length}
                        </span>
                        <button
                            type="button"
                            onClick={() => step(1)}
                            aria-label="Next image"
                            className={navButton}
                        >
                            <ChevronRight
                                className="size-4"
                                strokeWidth={1.5}
                            />
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
}

ListingGallery.displayName = "ListingGallery";

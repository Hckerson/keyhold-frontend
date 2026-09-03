"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Image } from "@/components/ui/image";

const VISIBLE_FRAMES = 4;

export interface SearchResultFramesProps {
    images: string[];
    title: string;
    href: string;
    activeFrame: number;
    onFrameChange: (index: number) => void;
}

export function SearchResultFrames({
    images,
    title,
    href,
    activeFrame,
    onFrameChange,
}: SearchResultFramesProps) {
    const frames = images.slice(0, VISIBLE_FRAMES);

    return (
        <Link
            href={href}
            aria-label={`${title} — ${frames.length} photographs`}
            className="bg-border-dark focus-visible:ring-accent relative z-0 flex h-48 gap-px focus-visible:ring-2 focus-visible:outline-none"
        >
            {frames.map((image, index) => (
                <span
                    key={image}
                    onMouseEnter={() => onFrameChange(index)}
                    className={cn(
                        "ease-smooth relative block h-full overflow-hidden transition-all duration-300",
                        index === activeFrame ? "flex-7" : "flex-1 opacity-60",
                    )}
                >
                    <Image
                        variant="bare"
                        fill
                        sizes="(min-width: 64rem) 33vw, 100vw"
                        src={image}
                        alt=""
                        className="object-cover"
                    />
                </span>
            ))}
        </Link>
    );
}

SearchResultFrames.displayName = "SearchResultFrames";

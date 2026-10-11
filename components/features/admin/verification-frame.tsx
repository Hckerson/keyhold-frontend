"use client";

import type { MouseEvent } from "react";
import { ArrowUpRight, ScanFace } from "lucide-react";
import { Image } from "@/components/ui/image";
import { VERIFICATION_COPY } from "@/lib/data/admin-verifications";

const ZOOM_ORIGIN = "--zoom-origin";
const PERCENT = 100;

const aim = (event: MouseEvent<HTMLElement>) => {
    const box = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - box.left) / box.width) * PERCENT;
    const y = ((event.clientY - box.top) / box.height) * PERCENT;
    event.currentTarget.style.setProperty(ZOOM_ORIGIN, `${x}% ${y}%`);
};

export interface VerificationFrameProps {
    label: string;
    url: string | null;
    alt: string;
    sizes: string;
}

export function VerificationFrame({
    label,
    url,
    alt,
    sizes,
}: VerificationFrameProps) {
    if (!url)
        return (
            <div className="border-border flex items-center gap-3 rounded-lg border border-dashed px-3 py-2.5">
                <ScanFace
                    size={16}
                    strokeWidth={1.5}
                    aria-hidden="true"
                    className="text-text-muted shrink-0"
                />
                <p className="text-text-secondary min-w-0 text-xs">
                    {VERIFICATION_COPY.noFace}
                    <span className="text-text-muted">
                        {" "}
                        · {VERIFICATION_COPY.noFaceHint}
                    </span>
                </p>
            </div>
        );

    return (
        <figure className="reveal-scope min-w-0">
            <figcaption className="micro-label mb-2">{label}</figcaption>
            <a
                href={url}
                target="_blank"
                rel="noreferrer"
                onMouseMove={aim}
                className="group border-border-light bg-background-alt focus-visible:ring-accent relative block aspect-8/5 cursor-zoom-in overflow-hidden rounded-lg border focus-visible:ring-2 focus-visible:outline-none"
            >
                <Image
                    src={url}
                    alt={alt}
                    variant="bare"
                    fill
                    sizes={sizes}
                    className="ease-smooth origin-(--zoom-origin) object-contain transition-transform duration-200 group-hover:scale-200"
                />
                <span className="reveal bg-background/90 text-text absolute right-2 bottom-2 inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] shadow-sm">
                    {VERIFICATION_COPY.openFull}
                    <ArrowUpRight
                        size={10}
                        strokeWidth={1.5}
                        aria-hidden="true"
                    />
                </span>
            </a>
        </figure>
    );
}

VerificationFrame.displayName = "VerificationFrame";

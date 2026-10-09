import { ArrowUpRight, ScanFace } from "lucide-react";
import { Image } from "@/components/ui/image";
import { VERIFICATION_COPY } from "@/lib/data/admin-verifications";
import { cn } from "@/lib/utils";

const FRAME =
    "border-border-light relative block overflow-hidden rounded-lg border";

export interface VerificationFrameProps {
    label: string;
    url: string | null;
    alt: string;
    sizes: string;
    ratio?: string;
}

export function VerificationFrame({
    label,
    url,
    alt,
    sizes,
    ratio,
}: VerificationFrameProps) {
    return (
        <figure className="reveal-scope min-w-0">
            <figcaption className="micro-label mb-2">{label}</figcaption>
            {url ? (
                <a
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className={cn(
                        FRAME,
                        "bg-background-alt focus-visible:ring-accent aspect-[8/5] focus-visible:ring-2 focus-visible:outline-none",
                        ratio,
                    )}
                >
                    <Image
                        src={url}
                        alt={alt}
                        variant="bare"
                        fill
                        sizes={sizes}
                        className="object-contain"
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
            ) : (
                <div
                    className={cn(
                        FRAME,
                        "flex items-center gap-3 border-dashed px-4 py-3 @md:flex-col @md:justify-center @md:gap-1.5 @md:py-0 @md:text-center",
                        ratio,
                    )}
                >
                    <ScanFace
                        size={18}
                        strokeWidth={1.5}
                        aria-hidden="true"
                        className="text-text-muted shrink-0"
                    />
                    <div>
                        <p className="text-text-secondary text-xs">
                            {VERIFICATION_COPY.noFace}
                        </p>
                        <p className="text-text-muted mt-0.5 text-xs text-pretty">
                            {VERIFICATION_COPY.noFaceHint}
                        </p>
                    </div>
                </div>
            )}
        </figure>
    );
}

VerificationFrame.displayName = "VerificationFrame";

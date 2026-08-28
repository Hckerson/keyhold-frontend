import { ImageOff } from "lucide-react";
import { Image } from "@/components/ui/image";
import { cn } from "@/lib/utils";

const THUMB_SHAPE =
    "border-border-light size-8 shrink-0 rounded-md border object-cover";

export interface ListingThumbProps {
    src: string | null;
    alt: string;
    className?: string;
}

export function ListingThumb({ src, alt, className }: ListingThumbProps) {
    if (!src)
        return (
            <span
                role="img"
                aria-label={alt}
                className={cn(
                    THUMB_SHAPE,
                    "bg-background-muted text-text-muted flex items-center justify-center",
                    className,
                )}
            >
                <ImageOff className="size-3.5" strokeWidth={1.5} />
            </span>
        );

    return (
        <Image
            variant="thumbnail"
            src={src}
            alt={alt}
            loading="lazy"
            className={cn(THUMB_SHAPE, className)}
        />
    );
}

ListingThumb.displayName = "ListingThumb";

import { Image } from "@/components/ui/image";
import { cn } from "@/lib/utils";

export interface ListingThumbProps {
    src: string;
    alt: string;
    className?: string;
}

export function ListingThumb({ src, alt, className }: ListingThumbProps) {
    return (
        <Image
            variant="thumbnail"
            src={src}
            alt={alt}
            loading="lazy"
            className={cn(
                "border-border-light size-8 shrink-0 rounded-md border object-cover",
                className,
            )}
        />
    );
}

ListingThumb.displayName = "ListingThumb";

import { forwardRef } from "react";
import NextImage, { type ImageProps as NextImageProps } from "next/image";
import { cn } from "@/lib/utils";

const VARIANTS = {
    hero: {
        className: "image-hero",
        width: 1600,
        height: 600,
        sizes: "100vw",
    },
    card: {
        className: "w-full aspect-video object-cover rounded-sm",
        width: 800,
        height: 450,
        sizes: "(min-width: 64rem) 33vw, (min-width: 40rem) 50vw, 100vw",
    },
    avatar: {
        className: "w-12 h-12 rounded-full object-cover",
        width: 48,
        height: 48,
        sizes: "48px",
    },
    thumbnail: {
        className: "w-20 h-20 object-cover rounded-sm",
        width: 80,
        height: 80,
        sizes: "80px",
    },
    bare: {
        className: "",
        width: 1200,
        height: 800,
        sizes: "100vw",
    },
} as const;

type Variant = keyof typeof VARIANTS;

interface ImageProps extends Omit<NextImageProps, "alt" | "sizes"> {
    variant?: Variant;
    alt: string;
    sizes?: string;
}

export type { ImageProps };

const Image = forwardRef<HTMLImageElement, ImageProps>(
    (
        { className, variant = "card", fill, width, height, sizes, ...props },
        ref,
    ) => {
        const preset = VARIANTS[variant];

        return (
            <NextImage
                ref={ref}
                className={cn(preset.className, className)}
                sizes={sizes ?? preset.sizes}
                {...(fill
                    ? { fill: true }
                    : {
                          width: width ?? preset.width,
                          height: height ?? preset.height,
                      })}
                {...props}
            />
        );
    },
);

Image.displayName = "Image";

export { Image };

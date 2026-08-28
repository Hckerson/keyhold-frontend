import { forwardRef, type ImgHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "alt"> {
    variant?: "hero" | "card" | "avatar" | "thumbnail";
    alt: string;
}

export type { ImageProps };

const Image = forwardRef<HTMLImageElement, ImageProps>(
    ({ className, variant = "card", ...props }, ref) => {
        const variants = {
            hero: "image-hero",
            card: "w-full aspect-video object-cover rounded-sm",
            avatar: "w-12 h-12 rounded-full object-cover",
            thumbnail: "w-20 h-20 object-cover rounded-sm",
        };

        return (
            <img
                ref={ref}
                className={cn(variants[variant], className)}
                {...props}
            />
        );
    },
);

Image.displayName = "Image";

export { Image };

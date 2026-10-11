"use client";

import { forwardRef, useState, type ReactNode } from "react";
import NextImage, { type ImageProps as NextImageProps } from "next/image";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const UNKNOWN_INITIALS = "?";

type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

const AVATAR_PIXELS: Record<AvatarSize, string> = {
    xs: "28px",
    sm: "32px",
    md: "40px",
    lg: "48px",
    xl: "64px",
};

const avatarVariants = cva(
    "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full text-center font-medium select-none",
    {
        variants: {
            size: {
                xs: "size-7 text-[10px]",
                sm: "size-8 text-xs",
                md: "size-10 text-xs",
                lg: "size-12 text-sm",
                xl: "font-display text-h6 size-16 font-light",
            } satisfies Record<AvatarSize, string>,
            tone: {
                default: "bg-background-muted text-text",
                accent: "bg-accent-light text-accent font-semibold",
            },
            elevated: {
                true: "ring-background shadow-sm ring-2",
                false: "",
            },
        },
        defaultVariants: {
            size: "md",
            tone: "default",
            elevated: true,
        },
    },
);

interface AvatarProps
    extends
        Omit<NextImageProps, "src" | "alt" | "fill" | "sizes">,
        VariantProps<typeof avatarVariants> {
    src?: string | null;
    alt?: string;
    initials?: string;
    fallback?: ReactNode;
}

const Avatar = forwardRef<HTMLImageElement, AvatarProps>(
    (
        {
            className,
            size,
            tone,
            elevated,
            alt = "",
            src,
            initials,
            fallback,
            onError,
            ...props
        },
        ref,
    ) => {
        const [failedSrc, setFailedSrc] = useState<AvatarProps["src"]>();
        const showImage = Boolean(src) && src !== failedSrc;
        const named = alt.length > 0;

        return (
            <span
                role={!showImage && named ? "img" : undefined}
                aria-label={!showImage && named ? alt : undefined}
                className={cn(
                    avatarVariants({ size, tone, elevated }),
                    className,
                )}
            >
                {showImage && src ? (
                    <NextImage
                        ref={ref}
                        src={src}
                        alt={alt}
                        fill
                        sizes={AVATAR_PIXELS[size ?? "md"]}
                        onError={(event) => {
                            setFailedSrc(src);
                            onError?.(event);
                        }}
                        className="object-cover"
                        {...props}
                    />
                ) : (
                    <span aria-hidden="true">
                        {fallback || initials || UNKNOWN_INITIALS}
                    </span>
                )}
            </span>
        );
    },
);

Avatar.displayName = "Avatar";

export { Avatar, avatarVariants };
export type { AvatarProps };

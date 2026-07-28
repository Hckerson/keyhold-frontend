import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const avatarVariants = cva(
    "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full text-center font-medium",
    {
        variants: {
            size: {
                xs: "h-7 w-7 text-xs",
                sm: "h-8 w-8 text-xs",
                md: "h-10 w-10 text-sm",
                lg: "h-12 w-12 text-base",
                xl: "h-16 w-16 text-lg",
            },
            tone: {
                default: "bg-background-muted text-text",
                accent: "bg-accent-light text-accent font-semibold",
            },
            elevated: {
                true: "ring-2 ring-background shadow-sm",
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
        React.ImgHTMLAttributes<HTMLImageElement>,
        VariantProps<typeof avatarVariants> {
    initials?: string;
    fallback?: React.ReactNode;
}

const Avatar = React.forwardRef<HTMLImageElement, AvatarProps>(
    (
        {
            className,
            size,
            tone,
            elevated,
            alt,
            src,
            initials,
            fallback,
            ...props
        },
        ref,
    ) => {
        return (
            <div
                className={cn(
                    avatarVariants({ size, tone, elevated, className }),
                )}
            >
                {src ? (
                    <img
                        ref={ref}
                        src={src}
                        alt={alt || "Avatar"}
                        className="h-full w-full object-cover"
                        {...props}
                    />
                ) : (
                    fallback || initials || "?"
                )}
            </div>
        );
    },
);

Avatar.displayName = "Avatar";

export { Avatar, avatarVariants };
export type { AvatarProps };

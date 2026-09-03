import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const iconButtonVariants = cva(
    "ease-smooth focus-visible:ring-accent text-text-muted grid shrink-0 place-items-center rounded-md transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-45",
    {
        variants: {
            tone: {
                neutral: "hover:bg-background-muted hover:text-text",
                accent: "hover:bg-accent-light hover:text-accent",
                success: "hover:bg-success-light hover:text-success",
                warning: "hover:bg-warning-light hover:text-warning",
                danger: "hover:bg-error-light hover:text-error",
            },
            size: {
                sm: "size-5",
                md: "size-7",
                lg: "size-9",
            },
        },
        defaultVariants: {
            tone: "neutral",
            size: "sm",
        },
    },
);

const GLYPH_SIZE = {
    sm: "size-3",
    md: "size-3.5",
    lg: "size-4",
} as const;

interface IconButtonProps
    extends
        Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children">,
        VariantProps<typeof iconButtonVariants> {
    icon: LucideIcon;
    label: string;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
    ({ className, tone, size, icon: Glyph, label, type, ...props }, ref) => (
        <button
            ref={ref}
            type={type ?? "button"}
            aria-label={label}
            className={cn(iconButtonVariants({ tone, size, className }))}
            {...props}
        >
            <Glyph
                className={GLYPH_SIZE[size ?? "sm"]}
                strokeWidth={1.5}
                aria-hidden="true"
            />
        </button>
    ),
);

IconButton.displayName = "IconButton";

export { IconButton, iconButtonVariants };
export type { IconButtonProps };

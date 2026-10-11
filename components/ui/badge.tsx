import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
    "ease-smooth inline-flex shrink-0 items-center justify-center gap-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors duration-200",
    {
        variants: {
            variant: {
                default: "bg-background-muted text-text-secondary",
                primary: "bg-accent text-text-inverse",
                success: "bg-accent-light text-accent",
                warning: "bg-background-muted text-text-secondary",
                error: "bg-error-light text-error-dark",
                accent: "bg-accent-light text-accent-dark",
                highlight: "bg-accent text-text-inverse",
            },
            size: {
                sm: "px-2 py-0.5",
                md: "px-2.5 py-1",
                lg: "px-3 py-1.5",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "md",
        },
    },
);

interface BadgeProps
    extends
        React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
    ({ className, variant, size, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(badgeVariants({ variant, size, className }))}
            {...props}
        />
    ),
);

Badge.displayName = "Badge";

export { Badge, badgeVariants };
export type { BadgeProps };

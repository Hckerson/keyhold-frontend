import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
    "inline-flex items-center justify-center gap-1 rounded-full px-3 py-1 text-xs font-medium transition-colors duration-300",
    {
        variants: {
            variant: {
                default: "bg-background-muted text-text-secondary",
                primary: "bg-accent text-text-inverse shadow-sm",
                success: "bg-success-light text-success",
                warning: "bg-warning-light text-warning",
                error: "bg-error-light text-error",
                accent: "bg-accent-light text-accent-dark",
                highlight: "bg-highlight text-text-inverse shadow-sm",
            },
            size: {
                sm: "px-2 py-0.5 text-xs",
                md: "px-2.5 py-1 text-xs",
                lg: "px-3 py-1.5 text-xs",
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

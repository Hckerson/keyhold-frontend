import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const statusBadgeVariants = cva(
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
    {
        variants: {
            tone: {
                neutral: "border-border bg-background text-text-secondary",
                success: "border-success/30 bg-success/5 text-success",
                warning: "border-warning/40 bg-warning/5 text-warning",
                error: "border-error/30 bg-error/5 text-error",
                info: "border-info/30 bg-info/5 text-info",
            },
        },
        defaultVariants: { tone: "neutral" },
    },
);

export interface StatusBadgeProps extends VariantProps<
    typeof statusBadgeVariants
> {
    children: ReactNode;
    className?: string;
}

export function StatusBadge({ tone, children, className }: StatusBadgeProps) {
    return (
        <span className={cn(statusBadgeVariants({ tone }), className)}>
            {children}
        </span>
    );
}

StatusBadge.displayName = "StatusBadge";

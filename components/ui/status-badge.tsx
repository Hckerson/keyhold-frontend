import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const statusBadgeVariants = cva(
    "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
    {
        variants: {
            tone: {
                neutral:
                    "border-border-light bg-background text-text-secondary",
                success: "border-success/20 bg-success/10 text-success",
                warning: "border-warning/20 bg-warning/10 text-warning",
                error: "border-error/20 bg-error/10 text-error",
                info: "border-info/20 bg-info/10 text-info",
            },
        },
        defaultVariants: { tone: "neutral" },
    },
);

export interface StatusBadgeProps extends VariantProps<
    typeof statusBadgeVariants
> {
    children: ReactNode;
    dot?: boolean;
    className?: string;
}

export function StatusBadge({
    tone,
    dot,
    children,
    className,
}: StatusBadgeProps) {
    return (
        <span className={cn(statusBadgeVariants({ tone }), className)}>
            {dot && <span className="size-1.5 rounded-full bg-current" />}
            {children}
        </span>
    );
}

StatusBadge.displayName = "StatusBadge";

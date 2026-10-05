import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { StatusTone } from "@/lib/types";

const statusBadgeVariants = cva(
    "ease-smooth inline-flex shrink-0 select-none items-center rounded-full align-middle text-[10px] leading-none font-medium tracking-wide whitespace-nowrap transition-colors duration-200",
    {
        variants: {
            size: {
                sm: "gap-1 px-1.5 py-0.5",
                md: "gap-1.5 px-2 py-1",
            },
            tone: {
                neutral: "",
                success: "",
                warning: "",
                error: "",
                info: "",
            } satisfies Record<StatusTone, string>,
            variant: {
                subtle: "",
                solid: "",
                outline: "",
            },
        },
        compoundVariants: [
            {
                tone: "neutral",
                variant: "subtle",
                class: "bg-background-muted text-text-secondary",
            },
            {
                tone: "success",
                variant: "subtle",
                class: "bg-success-light text-success",
            },
            {
                tone: "warning",
                variant: "subtle",
                class: "bg-warning-light text-warning",
            },
            {
                tone: "error",
                variant: "subtle",
                class: "bg-error-light text-error",
            },
            {
                tone: "info",
                variant: "subtle",
                class: "bg-info-light text-info",
            },
            {
                tone: "neutral",
                variant: "solid",
                class: "bg-text text-text-inverse",
            },
            {
                tone: "success",
                variant: "solid",
                class: "bg-success text-text-inverse",
            },
            {
                tone: "warning",
                variant: "solid",
                class: "bg-warning text-text-inverse",
            },
            {
                tone: "error",
                variant: "solid",
                class: "bg-error text-text-inverse",
            },
            {
                tone: "info",
                variant: "solid",
                class: "bg-info text-text-inverse",
            },
            {
                tone: "neutral",
                variant: "outline",
                class: "border border-border text-text-secondary",
            },
            {
                tone: "success",
                variant: "outline",
                class: "border border-success/30 text-success",
            },
            {
                tone: "warning",
                variant: "outline",
                class: "border border-warning/30 text-warning",
            },
            {
                tone: "error",
                variant: "outline",
                class: "border border-error/30 text-error",
            },
            {
                tone: "info",
                variant: "outline",
                class: "border border-info/30 text-info",
            },
        ],
        defaultVariants: {
            size: "sm",
            tone: "neutral",
            variant: "subtle",
        },
    },
);

interface StatusBadgeProps
    extends
        React.HTMLAttributes<HTMLSpanElement>,
        VariantProps<typeof statusBadgeVariants> {
    icon?: LucideIcon;
}

const StatusBadge = React.forwardRef<HTMLSpanElement, StatusBadgeProps>(
    (
        { className, tone, variant, size, icon: Icon, children, ...props },
        ref,
    ) => (
        <span
            ref={ref}
            className={cn(
                statusBadgeVariants({ tone, variant, size }),
                className,
            )}
            {...props}
        >
            {Icon && (
                <Icon
                    className="size-2.5 shrink-0"
                    strokeWidth={1.5}
                    aria-hidden="true"
                />
            )}
            <span>{children}</span>
        </span>
    ),
);

StatusBadge.displayName = "StatusBadge";

export { StatusBadge, statusBadgeVariants };
export type { StatusBadgeProps };

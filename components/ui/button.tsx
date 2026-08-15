import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
    "ease-smooth focus-visible:ring-accent focus-visible:ring-offset-background inline-flex shrink-0 items-center justify-center font-medium whitespace-nowrap transition-all duration-200 select-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-45 disabled:shadow-none",
    {
        variants: {
            variant: {
                primary:
                    "bg-accent text-text-inverse shadow-sm hover:bg-accent-dark hover:shadow-md active:shadow-sm",
                secondary:
                    "bg-background text-text border-border border shadow-sm hover:border-border-dark hover:bg-background-muted active:bg-background-muted",
                ghost: "text-text-secondary hover:bg-background-muted hover:text-text active:bg-background-muted",
                "outline-danger":
                    "bg-background text-error border-error/35 border hover:border-error hover:bg-error-light active:bg-error-light",
                danger: "bg-error text-text-inverse shadow-sm hover:bg-error-dark hover:shadow-md active:shadow-sm",
            },
            size: {
                sm: "h-8 gap-1.5 rounded-md px-3 text-xs",
                md: "h-9 gap-1.5 rounded-md px-3.5 text-xs",
                lg: "h-11 gap-2 rounded-lg px-5 text-sm",
            },
            iconOnly: {
                true: "px-0",
                false: "",
            },
        },
        compoundVariants: [
            { size: "sm", iconOnly: true, class: "w-8" },
            { size: "md", iconOnly: true, class: "w-9" },
            { size: "lg", iconOnly: true, class: "w-11" },
        ],
        defaultVariants: {
            variant: "primary",
            size: "md",
            iconOnly: false,
        },
    },
);

export interface ButtonProps
    extends
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    isLoading?: boolean;
    icon?: React.ReactNode;
    iconRight?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant,
            size,
            iconOnly,
            isLoading,
            disabled,
            icon,
            iconRight,
            children,
            ...props
        },
        ref,
    ) => (
        <button
            ref={ref}
            className={cn(
                buttonVariants({ variant, size, iconOnly, className }),
            )}
            disabled={disabled || isLoading}
            aria-busy={isLoading}
            {...props}
        >
            {isLoading ? (
                <Spinner size="sm" tone="current" className="size-3.5" />
            ) : (
                icon
            )}
            {children}
            {iconRight}
        </button>
    ),
);

Button.displayName = "Button";

export { Button, buttonVariants };

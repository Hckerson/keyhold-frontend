import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap font-medium transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-50 disabled:cursor-not-allowed",
    {
        variants: {
            variant: {
                primary:
                    "bg-linear-to-b from-accent to-accent-dark text-primary shadow-sm hover:shadow-md hover:-translate-y-px active:translate-y-0 active:opacity-90",
                secondary:
                    "bg-background border border-border text-text hover:border-accent hover:text-accent hover:shadow-sm transition-colors",
                ghost: "bg-transparent text-text hover:bg-background-alt hover:text-accent transition-colors",
                "outline-danger":
                    "bg-background border border-error/40 text-error hover:border-error hover:bg-error/5 transition-colors",
                danger: "bg-error text-white shadow-sm hover:shadow-md hover:-translate-y-px active:translate-y-0 active:opacity-80",
            },
            size: {
                sm: "h-8 px-3 text-xs rounded-lg",
                md: "h-10 px-4 text-sm rounded-lg",
                lg: "h-12 px-6 text-base rounded-lg",
            },
        },
        defaultVariants: {
            variant: "primary",
            size: "md",
        },
    },
);

export interface ButtonProps
    extends
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    isLoading?: boolean;
    icon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant,
            size,
            isLoading,
            disabled,
            icon,
            children,
            ...props
        },
        ref,
    ) => {
        return (
            <button
                className={cn(buttonVariants({ variant, size, className }))}
                disabled={disabled || isLoading}
                ref={ref}
                {...props}
            >
                {isLoading ? (
                    <>
                        <svg
                            className="mr-2 -ml-1 h-4 w-4 animate-spin"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                        </svg>
                        Loading...
                    </>
                ) : (
                    <>
                        {icon && <span className="mr-2">{icon}</span>}
                        {children}
                    </>
                )}
            </button>
        );
    },
);

Button.displayName = "Button";

export { Button, buttonVariants };

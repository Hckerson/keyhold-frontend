import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { InputVariant } from "@/lib/types";

const inputVariants = cva(
    "border-border bg-background-alt text-text placeholder:text-text-muted focus-visible:border-accent focus-visible:ring-accent/40 aria-invalid:border-error aria-invalid:focus-visible:ring-error/40 ease-smooth flex h-8 w-full rounded-md border px-2.5 text-xs transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
    {
        variants: {
            variant: {
                text: "font-body",
                numeric: "font-body tabular-nums",
                code: "font-mono tracking-wide tabular-nums",
            } satisfies Record<InputVariant, string>,
        },
        defaultVariants: {
            variant: "text",
        },
    },
);

export interface InputProps
    extends
        Omit<React.InputHTMLAttributes<HTMLInputElement>, "prefix">,
        VariantProps<typeof inputVariants> {
    prefix?: React.ReactNode;
    endSlot?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, variant, prefix, endSlot, ...props }, ref) => (
        <div className="relative w-full">
            {prefix && (
                <span className="micro-label pointer-events-none absolute top-1/2 left-2.5 -translate-y-1/2">
                    {prefix}
                </span>
            )}
            <input
                ref={ref}
                type={type}
                className={cn(
                    inputVariants({ variant }),
                    prefix && "pl-7",
                    endSlot && "pr-10",
                    className,
                )}
                {...props}
            />
            {endSlot && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                    {endSlot}
                </div>
            )}
        </div>
    ),
);

Input.displayName = "Input";

export { Input, inputVariants };

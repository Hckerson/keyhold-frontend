import React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: string;
    label?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, error, label, id, ...props }, ref) => (
        <div className="w-full">
            {label && (
                <label
                    htmlFor={id}
                    className="text-text mb-2 block text-sm font-medium"
                >
                    {label}
                </label>
            )}
            <input
                ref={ref}
                type={type}
                id={id}
                className={cn(
                    "border-border bg-background-alt text-text placeholder:text-text-muted focus:border-accent focus:ring-accent flex w-full rounded-lg border px-4 py-3 text-base transition-all duration-300 focus:ring-1 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
                    error && "border-error focus:border-error focus:ring-error",
                    className,
                )}
                {...props}
            />
            {error && <p className="text-error mt-1 text-xs">{error}</p>}
        </div>
    ),
);

Input.displayName = "Input";

export { Input };

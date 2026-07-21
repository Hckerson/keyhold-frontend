import React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: string;
    label?: string;
    endSlot?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, error, label, endSlot, id, ...props }, ref) => (
        <div className="w-full">
            {label && (
                <label
                    htmlFor={id}
                    className="text-text mb-2 block text-sm font-medium"
                >
                    {label}
                </label>
            )}
            <div className="relative">
                <input
                    ref={ref}
                    type={type}
                    id={id}
                    className={cn(
                        "border-border bg-background-alt text-text placeholder:text-text-muted focus:border-accent focus:ring-accent/20 flex w-full rounded-lg border px-3.5 py-2.5 text-sm shadow-sm transition-all duration-300 focus:shadow-md focus:ring-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
                        endSlot && "pr-11",
                        error &&
                            "border-error focus:border-error focus:ring-error/20",
                        className,
                    )}
                    {...props}
                />
                {endSlot && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        {endSlot}
                    </div>
                )}
            </div>
            {error && <p className="text-error mt-1 text-xs">{error}</p>}
        </div>
    ),
);

Input.displayName = "Input";

export { Input };

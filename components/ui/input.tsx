import React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: string;
    label?: string;
    endSlot?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    (
        {
            className,
            type,
            error,
            label,
            endSlot,
            id,
            "aria-describedby": describedBy,
            ...props
        },
        ref,
    ) => {
        const errorId = error ? `${id ?? props.name}-error` : undefined;
        const description =
            [describedBy, errorId].filter(Boolean).join(" ") || undefined;

        return (
            <div className="w-full">
                {label && (
                    <label
                        htmlFor={id}
                        className="text-text mb-1.5 block text-xs font-medium"
                    >
                        {label}
                    </label>
                )}
                <div className="relative">
                    <input
                        ref={ref}
                        type={type}
                        id={id}
                        aria-invalid={error ? true : undefined}
                        aria-describedby={description}
                        className={cn(
                            "border-border bg-background-alt text-text placeholder:text-text-muted focus-visible:border-accent focus-visible:ring-accent/40 ease-smooth flex w-full rounded-lg border px-3 py-2 text-sm transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
                            endSlot && "pr-10",
                            error &&
                                "border-error focus-visible:border-error focus-visible:ring-error/40",
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
                {error && (
                    <p id={errorId} className="text-error mt-1 text-xs">
                        {error}
                    </p>
                )}
            </div>
        );
    },
);

Input.displayName = "Input";

export { Input };

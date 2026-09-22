"use client";

import {
    forwardRef,
    useId,
    type InputHTMLAttributes,
    type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

export interface CheckboxProps extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "type"
> {
    label?: ReactNode;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
    ({ className, id, label, ...props }, ref) => {
        const generatedId = useId();
        const fieldId = id ?? generatedId;

        return (
            <div className="flex items-center gap-2">
                <input
                    ref={ref}
                    type="checkbox"
                    id={fieldId}
                    className={cn(
                        "border-border bg-background-alt accent-accent focus-visible:ring-accent ease-smooth size-4 shrink-0 cursor-pointer rounded-xs border transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
                        className,
                    )}
                    {...props}
                />
                {label && (
                    <label
                        htmlFor={fieldId}
                        className="text-text-secondary cursor-pointer text-xs font-medium select-none"
                    >
                        {label}
                    </label>
                )}
            </div>
        );
    },
);

Checkbox.displayName = "Checkbox";

export { Checkbox };

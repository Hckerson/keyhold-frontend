import React from "react";
import { cn } from "@/lib/utils";

export interface CheckboxProps extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "type"
> {
    label?: React.ReactNode;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
    ({ className, id, label, checked, onChange, ...props }, ref) => (
        <div className="flex items-center gap-2">
            <input
                ref={ref}
                type="checkbox"
                id={id}
                checked={checked ?? false}
                onChange={onChange ?? (() => {})}
                className={cn(
                    "border-border bg-background-alt accent-accent focus-visible:ring-accent ease-smooth size-4 cursor-pointer rounded-xs border transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
                    className,
                )}
                {...props}
            />
            {label && (
                <label
                    htmlFor={id}
                    className="text-text-secondary cursor-pointer text-xs font-medium"
                >
                    {label}
                </label>
            )}
        </div>
    ),
);

Checkbox.displayName = "Checkbox";

export { Checkbox };

import React from "react";
import { cn } from "@/lib/utils";

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
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
                    "border-border bg-background-alt accent-accent focus:ring-accent h-5 w-5 cursor-pointer rounded border transition-all duration-300 focus:ring-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
                    className,
                )}
                {...props}
            />
            {label && (
                <label
                    htmlFor={id}
                    className="text-text cursor-pointer text-sm"
                >
                    {label}
                </label>
            )}
        </div>
    ),
);

Checkbox.displayName = "Checkbox";

export { Checkbox };

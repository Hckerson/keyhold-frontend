import React from "react";
import { cn } from "@/lib/utils";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    options?: Array<{ value: string; label: string }>;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
    ({ className, label, error, id, options = [], ...props }, ref) => (
        <div className="w-full">
            {label && (
                <label
                    htmlFor={id}
                    className="text-text mb-2 block text-sm font-medium"
                >
                    {label}
                </label>
            )}
            <select
                ref={ref}
                id={id}
                className={cn(
                    "border-border bg-background-alt text-text focus:border-accent focus:ring-accent flex w-full rounded-lg border px-4 py-3 text-base transition-all duration-300 focus:ring-1 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
                    error && "border-error focus:border-error focus:ring-error",
                    className,
                )}
                {...props}
            >
                <option value="">Select an option</option>
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
            {error && <p className="text-error mt-1 text-xs">{error}</p>}
        </div>
    ),
);

Select.displayName = "Select";

export { Select };
export type { SelectProps };

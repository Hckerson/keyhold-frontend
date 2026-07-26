import React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface FormFieldProps extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "prefix"
> {
    label: string;
    name: string;
    error?: string;
    hint?: React.ReactNode;
    prefix?: React.ReactNode;
    endSlot?: React.ReactNode;
}

export function FormField({
    label,
    name,
    id,
    error,
    hint,
    prefix,
    endSlot,
    className,
    ...props
}: FormFieldProps) {
    const fieldId = id ?? name;

    return (
        <div className={cn("flex flex-col gap-1.5", className)}>
            <div className="flex items-baseline justify-between gap-3">
                <label
                    htmlFor={fieldId}
                    className="text-text text-xs font-medium"
                >
                    {label}
                </label>
                {hint}
            </div>
            <div className="relative">
                {prefix && (
                    <span className="text-text-secondary absolute top-1/2 left-3 -translate-y-1/2 text-xs">
                        {prefix}
                    </span>
                )}
                <Input
                    id={fieldId}
                    name={name}
                    error={error}
                    endSlot={endSlot}
                    className={prefix ? "pl-7" : undefined}
                    {...props}
                />
            </div>
        </div>
    );
}

FormField.displayName = "FormField";

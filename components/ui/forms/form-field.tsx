import React from "react";
import { Input, type InputProps } from "@/components/ui/forms/input";
import { FieldShell, errorIdFor } from "@/components/ui/forms/field-shell";

export interface FormFieldProps extends Omit<InputProps, "id" | "name"> {
    label: string;
    name: string;
    id?: string;
    error?: string;
    hint?: React.ReactNode;
}

export function FormField({
    label,
    name,
    id,
    error,
    hint,
    className,
    ...props
}: FormFieldProps) {
    const fieldId = id ?? name;

    return (
        <FieldShell
            label={label}
            htmlFor={fieldId}
            hint={hint}
            error={error}
            className={className}
        >
            <Input
                id={fieldId}
                name={name}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? errorIdFor(fieldId) : undefined}
                {...props}
            />
        </FieldShell>
    );
}

FormField.displayName = "FormField";

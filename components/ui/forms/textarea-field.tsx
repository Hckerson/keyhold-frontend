import React from "react";
import { Textarea, type TextareaProps } from "@/components/ui/forms/textarea";
import { FieldShell, errorIdFor } from "@/components/ui/forms/field-shell";

export interface TextareaFieldProps
    extends Omit<TextareaProps, "id" | "name"> {
    label: string;
    name: string;
    id?: string;
    error?: string;
    hint?: React.ReactNode;
}

export function TextareaField({
    label,
    name,
    id,
    error,
    hint,
    className,
    ...props
}: TextareaFieldProps) {
    const fieldId = id ?? name;

    return (
        <FieldShell
            label={label}
            htmlFor={fieldId}
            hint={hint}
            error={error}
            className={className}
        >
            <Textarea
                id={fieldId}
                name={name}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? errorIdFor(fieldId) : undefined}
                {...props}
            />
        </FieldShell>
    );
}

TextareaField.displayName = "TextareaField";

"use client";

import type { ChangeEvent } from "react";
import { FormField } from "@/components/ui/forms/form-field";
import type { InputProps } from "@/components/ui/forms/input";
import type { FieldErrors } from "@/lib/validations/auth";

export interface ConfigField<K extends string> {
    name: K;
    label: string;
    placeholder: string;
    type?: string;
    prefix?: string;
    suffix?: string;
    variant?: InputProps["variant"];
    hint?: string;
}

export interface ConfigFieldGridProps<K extends string> {
    fields: readonly ConfigField<K>[];
    values: Record<K, string>;
    errors?: FieldErrors;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function ConfigFieldGrid<K extends string>({
    fields,
    values,
    errors,
    onChange,
}: ConfigFieldGridProps<K>) {
    return (
        <>
            {fields.map((field) => (
                <FormField
                    key={field.name}
                    label={field.label}
                    name={field.name}
                    type={field.type ?? "text"}
                    variant={field.variant}
                    value={values[field.name]}
                    error={errors?.[field.name]}
                    hint={field.hint}
                    onChange={onChange}
                    placeholder={field.placeholder}
                    prefix={field.prefix}
                    endSlot={
                        field.suffix ? (
                            <span className="micro-label">{field.suffix}</span>
                        ) : undefined
                    }
                />
            ))}
        </>
    );
}

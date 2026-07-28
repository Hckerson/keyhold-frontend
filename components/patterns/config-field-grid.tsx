"use client";

import type { ChangeEvent } from "react";
import { FormField } from "@/components/ui/forms/form-field";

export interface ConfigField<K extends string> {
    name: K;
    label: string;
    placeholder: string;
    type?: string;
    prefix?: string;
    suffix?: string;
}

export interface ConfigFieldGridProps<K extends string> {
    fields: readonly ConfigField<K>[];
    values: Record<K, string>;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function ConfigFieldGrid<K extends string>({
    fields,
    values,
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
                    value={values[field.name]}
                    onChange={onChange}
                    placeholder={field.placeholder}
                    prefix={field.prefix}
                    endSlot={
                        field.suffix ? (
                            <span className="text-text-muted text-xs">
                                {field.suffix}
                            </span>
                        ) : undefined
                    }
                />
            ))}
        </>
    );
}

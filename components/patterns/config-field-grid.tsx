"use client";

import type { ChangeEvent } from "react";
import { FormField } from "@/components/ui/forms/form-field";
import { Select } from "@/components/ui/forms/select";
import { LabelledBlock } from "@/components/patterns/labelled-block";
import type { FieldErrors } from "@/lib/validations/auth";
import type { ConfigField } from "@/lib/types";

export interface ConfigFieldGridProps<K extends string> {
    fields: readonly ConfigField<K>[];
    values: Record<K, string>;
    errors?: FieldErrors;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onSelect?: (name: K, value: string) => void;
}

export function ConfigFieldGrid<K extends string>({
    fields,
    values,
    errors,
    onChange,
    onSelect,
}: ConfigFieldGridProps<K>) {
    return (
        <>
            {fields.map((field) =>
                field.options ? (
                    <LabelledBlock key={field.name} label={field.label}>
                        <Select
                            options={field.options}
                            value={values[field.name]}
                            onChange={(next) => onSelect?.(field.name, next)}
                            label={field.label}
                        />
                    </LabelledBlock>
                ) : (
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
                                <span className="micro-label">
                                    {field.suffix}
                                </span>
                            ) : undefined
                        }
                    />
                ),
            )}
        </>
    );
}

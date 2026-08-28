"use client";

import type { ChangeEvent, ReactNode } from "react";
import { Panel } from "@/components/ui/panel";
import {
    ConfigFieldGrid,
    type ConfigField,
} from "@/components/patterns/config-field-grid";
import type { FieldErrors } from "@/lib/validations/auth";

export interface ConfigPanelProps<K extends string> {
    title: string;
    description: string;
    fields: readonly ConfigField<K>[];
    values: Record<K, string>;
    errors?: FieldErrors;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    lead?: ReactNode;
}

export function ConfigPanel<K extends string>({
    title,
    description,
    fields,
    values,
    errors,
    onChange,
    lead,
}: ConfigPanelProps<K>) {
    return (
        <Panel title={title} description={description}>
            {lead}
            <div className="card-grid gap-3">
                <ConfigFieldGrid
                    fields={fields}
                    values={values}
                    errors={errors}
                    onChange={onChange}
                />
            </div>
        </Panel>
    );
}

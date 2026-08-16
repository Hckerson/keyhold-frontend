"use client";

import type { ChangeEvent, ReactNode } from "react";
import { Panel } from "@/components/ui/panel";
import {
    ConfigFieldGrid,
    type ConfigField,
} from "@/components/patterns/config-field-grid";

export interface ConfigPanelProps<K extends string> {
    title: string;
    description: string;
    fields: readonly ConfigField<K>[];
    values: Record<K, string>;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    lead?: ReactNode;
}

export function ConfigPanel<K extends string>({
    title,
    description,
    fields,
    values,
    onChange,
    lead,
}: ConfigPanelProps<K>) {
    return (
        <Panel title={title} description={description}>
            {lead}
            <div className="grid gap-3 sm:grid-cols-2">
                <ConfigFieldGrid
                    fields={fields}
                    values={values}
                    onChange={onChange}
                />
            </div>
        </Panel>
    );
}

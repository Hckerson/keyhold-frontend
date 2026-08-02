"use client";

import type { ChangeEvent, FormEvent } from "react";
import { Panel } from "@/components/ui/panel";
import {
    ConfigFieldGrid,
    type ConfigField,
} from "@/components/patterns/config-field-grid";
import { SettingsFormActions } from "@/components/features/settings/settings-form-actions";

export interface AgentSettingsFormPanelProps<K extends string> {
    title: string;
    description: string;
    fields: readonly ConfigField<K>[];
    values: Record<K, string>;
    saved: boolean;
    submitLabel: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (event: FormEvent) => void;
    onReset: () => void;
}

export function AgentSettingsFormPanel<K extends string>({
    title,
    description,
    fields,
    values,
    saved,
    submitLabel,
    onChange,
    onSubmit,
    onReset,
}: AgentSettingsFormPanelProps<K>) {
    return (
        <Panel title={title} description={description}>
            <form onSubmit={onSubmit} className="space-y-4">
                <div className="grid gap-3 sm:grid-cols-2">
                    <ConfigFieldGrid
                        fields={fields}
                        values={values}
                        onChange={onChange}
                    />
                </div>
                <SettingsFormActions
                    saved={saved}
                    submitLabel={submitLabel}
                    resetLabel="Reset"
                    onReset={onReset}
                />
            </form>
        </Panel>
    );
}

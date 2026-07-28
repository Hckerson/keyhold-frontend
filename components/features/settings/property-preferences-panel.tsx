"use client";

import type { ChangeEvent, FormEvent } from "react";
import { Panel } from "@/components/ui/panel";
import { ConfigFieldGrid } from "@/components/patterns/config-field-grid";
import { SettingsFormActions } from "@/components/features/settings/settings-form-actions";
import { BUDGET_FIELDS, type ProfileForm } from "@/lib/data/dashboard-settings";

export interface PropertyPreferencesPanelProps {
    values: ProfileForm;
    saved: boolean;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (event: FormEvent) => void;
    onReset: () => void;
}

export function PropertyPreferencesPanel({
    values,
    saved,
    onChange,
    onSubmit,
    onReset,
}: PropertyPreferencesPanelProps) {
    return (
        <Panel
            title="Property Preferences"
            description="Set your budget and search criteria"
        >
            <form onSubmit={onSubmit} className="space-y-3">
                <div className="grid gap-3 sm:grid-cols-2">
                    <ConfigFieldGrid
                        fields={BUDGET_FIELDS}
                        values={values}
                        onChange={onChange}
                    />
                </div>
                <SettingsFormActions
                    saved={saved}
                    submitLabel="Save Preferences"
                    resetLabel="Cancel"
                    onReset={onReset}
                />
            </form>
        </Panel>
    );
}

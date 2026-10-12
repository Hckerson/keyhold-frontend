"use client";

import type { ChangeEvent, FormEvent } from "react";
import { Callout } from "@/components/ui/callout";
import { ConfigFieldGrid } from "@/components/patterns/config-field-grid";
import { MaintenanceActions } from "@/components/features/admin/maintenance-actions";
import { PolicyGroupSection } from "@/components/features/admin/policy-group-section";
import { SettingsSaveBar } from "@/components/features/admin/settings-save-bar";
import { SettingsSection } from "@/components/features/admin/settings-section";
import { POLICY_GROUP_ORDER } from "@/lib/config/settings-tones";
import type { AdminConfig, AdminConfigKey } from "@/lib/config/admin-settings";
import { SETTINGS_COPY, SETTINGS_FORM_ID } from "@/lib/data/admin-settings";
import type { FieldErrors } from "@/lib/validations/auth";
import type {
    ConfigField,
    MaintenanceActionId,
    PolicyState,
    PolicySwitchId,
} from "@/lib/types";

export interface AdminSettingsMainProps {
    config: AdminConfig;
    errors: FieldErrors;
    policies: PolicyState;
    baselinePolicies: PolicyState;
    platformFields: readonly ConfigField<AdminConfigKey>[];
    marketplaceFields: readonly ConfigField<AdminConfigKey>[];
    unsaved: string[];
    warnings: string[];
    invalid: number;
    offline: boolean;
    saving: boolean;
    maintenancePending?: MaintenanceActionId;
    onFieldChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onFieldSelect: (name: AdminConfigKey, value: string) => void;
    onPolicyToggle: (id: PolicySwitchId) => void;
    onSubmit: (event: FormEvent) => void;
    onReset: () => void;
    onMaintenanceRun: (id: MaintenanceActionId) => void;
}

export function AdminSettingsMain({
    config,
    errors,
    policies,
    baselinePolicies,
    platformFields,
    marketplaceFields,
    unsaved,
    warnings,
    invalid,
    offline,
    saving,
    maintenancePending,
    onFieldChange,
    onFieldSelect,
    onPolicyToggle,
    onSubmit,
    onReset,
    onMaintenanceRun,
}: AdminSettingsMainProps) {
    const fieldSections = [
        { ...SETTINGS_COPY.platform, fields: platformFields },
        { ...SETTINGS_COPY.marketplace, fields: marketplaceFields },
    ];

    return (
        <div className="@container flex flex-col gap-10">
            {offline && (
                <Callout
                    variant="error"
                    title={SETTINGS_COPY.offlineTitle}
                    description={SETTINGS_COPY.offlineLede}
                />
            )}

            <form
                id={SETTINGS_FORM_ID}
                onSubmit={onSubmit}
                noValidate
                className="flex flex-col gap-10"
            >
                {fieldSections.map((section) => (
                    <SettingsSection
                        key={section.id}
                        id={section.id}
                        title={section.title}
                        lede={section.lede}
                    >
                        <div className="card-grid gap-3">
                            <ConfigFieldGrid
                                fields={section.fields}
                                values={config}
                                errors={errors}
                                onChange={onFieldChange}
                                onSelect={onFieldSelect}
                            />
                        </div>
                    </SettingsSection>
                ))}
            </form>

            {POLICY_GROUP_ORDER.map((group) => (
                <PolicyGroupSection
                    key={group}
                    group={group}
                    policies={policies}
                    baseline={baselinePolicies}
                    onToggle={onPolicyToggle}
                />
            ))}

            <SettingsSection
                id={SETTINGS_COPY.maintenance.id}
                title={SETTINGS_COPY.maintenance.title}
                lede={SETTINGS_COPY.maintenance.lede}
                flush
            >
                <MaintenanceActions
                    pending={maintenancePending}
                    onRun={onMaintenanceRun}
                />
            </SettingsSection>

            {unsaved.length > 0 && (
                <SettingsSaveBar
                    unsaved={unsaved}
                    warnings={warnings}
                    invalid={invalid}
                    saving={saving}
                    onReset={onReset}
                />
            )}
        </div>
    );
}

AdminSettingsMain.displayName = "AdminSettingsMain";

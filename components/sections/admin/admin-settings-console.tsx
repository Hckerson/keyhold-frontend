"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Callout } from "@/components/ui/callout";
import { AdminSettingsHeader } from "@/components/sections/admin/admin-settings-header";
import { AdminSettingsMain } from "@/components/sections/admin/admin-settings-main";
import { AdminSettingsRail } from "@/components/sections/admin/admin-settings-rail";
import { AdminSettingsStatBand } from "@/components/sections/admin/admin-settings-stat-band";
import { useUnsavedChangesWarning } from "@/lib/hooks/use-unsaved-changes-warning";
import {
    arePoliciesDirty,
    INITIAL_POLICY_STATE,
} from "@/lib/data/admin-policies";
import {
    buildSettingsStats,
    changedFieldCount,
    INITIAL_ADMIN_CONFIG,
} from "@/lib/data/admin-settings";
import type { PolicySwitchId } from "@/lib/types";

const SAVED_TITLE = "Configuration saved";
const SAVED_LEDE =
    "New values apply to listings and payouts created from now on.";

export function AdminSettingsConsole() {
    const [config, setConfig] = useState(INITIAL_ADMIN_CONFIG);
    const [policies, setPolicies] = useState(INITIAL_POLICY_STATE);
    const [saved, setSaved] = useState(false);

    const pending = changedFieldCount(config);
    const dirty = pending > 0 || arePoliciesDirty(policies);
    useUnsavedChangesWarning(dirty && !saved);

    const handleFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setConfig((current) => ({ ...current, [name]: value }));
        setSaved(false);
    };

    const handlePolicyToggle = (id: PolicySwitchId) => {
        setPolicies((current) => ({ ...current, [id]: !current[id] }));
        setSaved(false);
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        setSaved(true);
    };

    const handleReset = () => {
        setConfig(INITIAL_ADMIN_CONFIG);
        setPolicies(INITIAL_POLICY_STATE);
        setSaved(false);
    };

    return (
        <div className="flex flex-col gap-4">
            <AdminSettingsHeader
                dirty={dirty}
                saved={saved}
                onReset={handleReset}
            />

            <AdminSettingsStatBand stats={buildSettingsStats(policies)} />

            {saved && (
                <Callout
                    variant="success"
                    title={SAVED_TITLE}
                    description={SAVED_LEDE}
                />
            )}

            <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
                <AdminSettingsMain
                    config={config}
                    policies={policies}
                    pending={pending}
                    onFieldChange={handleFieldChange}
                    onPolicyToggle={handlePolicyToggle}
                    onSubmit={handleSubmit}
                />
                <AdminSettingsRail />
            </div>
        </div>
    );
}

AdminSettingsConsole.displayName = "AdminSettingsConsole";

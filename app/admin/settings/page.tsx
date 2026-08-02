"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Callout } from "@/components/ui/callout";
import { PageHeader } from "@/components/ui/page-header";
import { ConfigPanel } from "@/components/features/settings/config-panel";
import { TogglePanel } from "@/components/features/settings/toggle-panel";
import { AdminMaintenancePanel } from "@/components/features/settings/admin-maintenance-panel";
import {
    INITIAL_ADMIN_CONFIG,
    MARKETPLACE_FIELDS,
    MODERATION_TOGGLES,
    OPERATIONS_TOGGLES,
    PLATFORM_FIELDS,
} from "@/lib/data/admin-settings";

const FORM_ID = "admin-settings-form";

export default function AdminSettingsPage() {
    const [config, setConfig] = useState(INITIAL_ADMIN_CONFIG);
    const [saved, setSaved] = useState(false);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setConfig((current) => ({ ...current, [name]: value }));
        setSaved(false);
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        setSaved(true);
    };

    const handleReset = () => {
        setConfig(INITIAL_ADMIN_CONFIG);
        setSaved(false);
    };

    return (
        <div className="max-w-3xl space-y-3">
            <PageHeader
                title="System Settings"
                description="Platform configuration, marketplace rules, and moderation policy"
                action={
                    <div className="flex gap-2">
                        <Button
                            variant="secondary"
                            size="sm"
                            type="button"
                            onClick={handleReset}
                        >
                            Reset
                        </Button>
                        <Button
                            variant="primary"
                            size="sm"
                            type="submit"
                            form={FORM_ID}
                        >
                            {saved ? "Saved" : "Save Changes"}
                        </Button>
                    </div>
                }
            />

            {saved && (
                <Callout
                    variant="success"
                    title="Configuration saved"
                    description="New values apply to listings and payouts created from now on."
                />
            )}

            <form id={FORM_ID} onSubmit={handleSubmit} className="space-y-3">
                <ConfigPanel
                    title="Platform"
                    description="Identity and defaults used across every surface"
                    fields={PLATFORM_FIELDS}
                    values={config}
                    onChange={handleChange}
                />

                <ConfigPanel
                    title="Marketplace Rules"
                    description="Fees, limits, and thresholds applied to new listings"
                    fields={MARKETPLACE_FIELDS}
                    values={config}
                    onChange={handleChange}
                />
            </form>

            <TogglePanel
                title="Moderation Policy"
                description="How listings and agents are screened"
                toggles={MODERATION_TOGGLES}
            />

            <TogglePanel
                title="Operations"
                description="Availability, signups, and automated payouts"
                toggles={OPERATIONS_TOGGLES}
            />

            <AdminMaintenancePanel />
        </div>
    );
}

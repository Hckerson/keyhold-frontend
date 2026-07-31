"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { AgentSettingsFormPanel } from "@/components/features/settings/agent-settings-form-panel";
import { TogglePanel } from "@/components/features/settings/toggle-panel";
import { AgentAccountPanel } from "@/components/features/settings/agent-account-panel";
import {
    AGENT_BUSINESS_FIELDS,
    AGENT_NOTIFICATION_TOGGLES,
    AGENT_PROFILE_FIELDS,
    INITIAL_AGENT_FORM,
} from "@/lib/data/agent-settings";
import { SAVED_FEEDBACK_MS } from "@/lib/data/dashboard-settings";

export default function AgentSettingsPage() {
    const [formData, setFormData] = useState(INITIAL_AGENT_FORM);
    const [saved, setSaved] = useState(false);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        setSaved(true);
        setTimeout(() => setSaved(false), SAVED_FEEDBACK_MS);
    };

    const handleReset = () => setFormData(INITIAL_AGENT_FORM);

    return (
        <div className="max-w-2xl space-y-3">
            <PageHeader
                title="Settings"
                description="Manage your agent profile and preferences"
            />

            <AgentSettingsFormPanel
                title="Agent Profile"
                description="Details buyers see on your listings"
                fields={AGENT_PROFILE_FIELDS}
                values={formData}
                saved={saved}
                submitLabel="Save Changes"
                onChange={handleChange}
                onSubmit={handleSubmit}
                onReset={handleReset}
            />

            <AgentSettingsFormPanel
                title="Business Preferences"
                description="Defaults applied to new listings and leads"
                fields={AGENT_BUSINESS_FIELDS}
                values={formData}
                saved={saved}
                submitLabel="Save Preferences"
                onChange={handleChange}
                onSubmit={handleSubmit}
                onReset={handleReset}
            />

            <TogglePanel
                title="Notifications"
                description="Control how you receive pipeline updates"
                toggles={AGENT_NOTIFICATION_TOGGLES}
            />

            <AgentAccountPanel />
        </div>
    );
}

"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Callout } from "@/components/ui/callout";
import { AgentSettingsHeader } from "@/components/sections/agent/agent-settings-header";
import { AgentSettingsMain } from "@/components/sections/agent/agent-settings-main";
import { AgentSettingsRail } from "@/components/sections/agent/agent-settings-rail";
import { AgentSettingsStatBand } from "@/components/sections/agent/agent-settings-stat-band";
import { useUnsavedChangesWarning } from "@/lib/hooks/use-unsaved-changes-warning";
import {
    areNotificationsDirty,
    INITIAL_NOTIFICATION_STATE,
    type NotificationRuleId,
} from "@/lib/data/agent-account";
import {
    buildAgentSettingsStats,
    changedFieldCount,
    INITIAL_AGENT_FORM,
} from "@/lib/data/agent-settings";

const SAVED_TITLE = "Profile saved";
const SAVED_LEDE =
    "Buyers see the updated details on every listing you represent.";

export function AgentSettingsConsole() {
    const [form, setForm] = useState(INITIAL_AGENT_FORM);
    const [notifications, setNotifications] = useState(
        INITIAL_NOTIFICATION_STATE,
    );
    const [saved, setSaved] = useState(false);

    const pending = changedFieldCount(form);
    const dirty = pending > 0 || areNotificationsDirty(notifications);
    useUnsavedChangesWarning(dirty && !saved);

    const handleFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setForm((current) => ({ ...current, [name]: value }));
        setSaved(false);
    };

    const handleNotificationToggle = (id: NotificationRuleId) => {
        setNotifications((current) => ({ ...current, [id]: !current[id] }));
        setSaved(false);
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        setSaved(true);
    };

    const handleReset = () => {
        setForm(INITIAL_AGENT_FORM);
        setNotifications(INITIAL_NOTIFICATION_STATE);
        setSaved(false);
    };

    return (
        <div className="flex flex-col gap-4">
            <AgentSettingsHeader
                dirty={dirty}
                saved={saved}
                onReset={handleReset}
            />

            <AgentSettingsStatBand
                stats={buildAgentSettingsStats(form, notifications)}
            />

            {saved && (
                <Callout
                    variant="success"
                    title={SAVED_TITLE}
                    description={SAVED_LEDE}
                />
            )}

            <div className="console-split gap-3">
                <AgentSettingsMain
                    form={form}
                    notifications={notifications}
                    pending={pending}
                    onFieldChange={handleFieldChange}
                    onNotificationToggle={handleNotificationToggle}
                    onSubmit={handleSubmit}
                />
                <AgentSettingsRail />
            </div>
        </div>
    );
}

AgentSettingsConsole.displayName = "AgentSettingsConsole";

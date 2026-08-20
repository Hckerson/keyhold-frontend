"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Callout } from "@/components/ui/callout";
import { AgentSettingsHeader } from "@/components/sections/agent/agent-settings-header";
import { AgentSettingsMain } from "@/components/sections/agent/agent-settings-main";
import { AgentSettingsRail } from "@/components/sections/agent/agent-settings-rail";
import { AgentSettingsStatBand } from "@/components/sections/agent/agent-settings-stat-band";
import { ConsoleUnavailable } from "@/components/patterns/console-unavailable";
import { CONSOLE_FALLBACKS } from "@/lib/config/console-fallbacks";
import { useUnsavedChangesWarning } from "@/lib/hooks/use-unsaved-changes-warning";
import {
    agentCredentials,
    areNotificationsDirty,
    INITIAL_NOTIFICATION_STATE,
    profileSignals,
    profileStrength,
    verifiedCredentialCount,
    type NotificationRuleId,
} from "@/lib/data/agent-account";
import {
    buildAgentSettingsStats,
    changedFieldCount,
    EMPTY_AGENT_FORM,
    toAgentForm,
    type AgentSettingsForm,
} from "@/lib/data/agent-settings";
import { useSellerProperties } from "@/lib/hooks/use-properties";
import { useCurrentUser, useUpdateUser } from "@/lib/hooks/use-users";

const SAVED_TITLE = "Profile saved";
const SAVED_LEDE =
    "Buyers see the updated details on every listing you represent.";
const LISTING_QUERY = { limit: 1 } as const;

export function AgentSettingsConsole() {
    const { data: user, isError, refetch } = useCurrentUser();
    const listings = useSellerProperties(user?.id, LISTING_QUERY);
    const updateUser = useUpdateUser(user?.id ?? "");

    const baseline = toAgentForm(user);
    const [form, setForm] = useState<AgentSettingsForm>(EMPTY_AGENT_FORM);
    const [hydrated, setHydrated] = useState(false);
    const [notifications, setNotifications] = useState(
        INITIAL_NOTIFICATION_STATE,
    );
    const [saved, setSaved] = useState(false);

    if (user && !hydrated) {
        setForm(baseline);
        setHydrated(true);
    }

    const credentials = agentCredentials(user);
    const signals = profileSignals(user, listings.data?.total ?? 0);
    const strength = profileStrength(signals);
    const verified = verifiedCredentialCount(credentials);

    const pending = changedFieldCount(form, baseline);
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
        if (!user) return;
        void updateUser
            .mutateAsync({
                fullName: form.fullName,
                email: form.email,
                phoneNumber: form.phone,
                jobTitle: form.jobTitle,
                agencyName: form.brokerage,
                licenseNumber: form.license,
                bio: form.bio,
            })
            .then(() => setSaved(true));
    };

    const handleReset = () => {
        setForm(baseline);
        setNotifications(INITIAL_NOTIFICATION_STATE);
        setSaved(false);
    };

    if (isError)
        return (
            <ConsoleUnavailable
                fallback={CONSOLE_FALLBACKS.settings}
                onRetry={() => void refetch()}
            />
        );

    return (
        <div className="flex flex-col gap-4">
            <AgentSettingsHeader
                dirty={dirty}
                saved={saved}
                updatedAt={user?.updatedAt}
                onReset={handleReset}
            />

            <AgentSettingsStatBand
                stats={buildAgentSettingsStats(
                    strength,
                    verified,
                    credentials.length,
                    notifications,
                )}
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
                    strength={strength}
                    verified={verified}
                    credentials={credentials.length}
                    updatedAt={user?.updatedAt}
                    onFieldChange={handleFieldChange}
                    onNotificationToggle={handleNotificationToggle}
                    onSubmit={handleSubmit}
                />
                <AgentSettingsRail
                    signals={signals}
                    strength={strength}
                    credentials={credentials}
                />
            </div>
        </div>
    );
}

AgentSettingsConsole.displayName = "AgentSettingsConsole";

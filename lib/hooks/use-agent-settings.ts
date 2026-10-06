"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useUnsavedChangesWarning } from "@/lib/hooks/use-unsaved-changes-warning";
import {
    useNotificationPreferences,
    useUpdateNotificationPreferences,
} from "@/lib/hooks/use-notifications";
import { useRequestPasswordReset } from "@/lib/hooks/use-session";
import {
    agentCredentials,
    areNotificationsDirty,
    EMPTY_NOTIFICATION_STATE,
    toNotificationPayload,
    toNotificationState,
    verifiedCredentialCount,
} from "@/lib/data/agent-account";
import {
    profileSignals,
    profileStrength,
} from "@/lib/data/agent-account-signals";
import {
    buildAgentSettingsStats,
    changedFieldCount,
    EMPTY_AGENT_FORM,
    toAgentForm,
    toAgentUserPayload,
    type AgentSettingsForm,
} from "@/lib/data/agent-settings";
import { useSellerProperties } from "@/lib/hooks/use-properties";
import { useCurrentUser, useUpdateUser } from "@/lib/hooks/use-users";
import type { NotificationRuleId } from "@/lib/types";

const LISTING_QUERY = { limit: 1 } as const;

export function useAgentSettings() {
    const { data: user, isPending, isError, refetch } = useCurrentUser();
    const listings = useSellerProperties(user?.id, LISTING_QUERY);
    const updateUser = useUpdateUser(user?.id ?? "");
    const storedPreferences = useNotificationPreferences();
    const updatePreferences = useUpdateNotificationPreferences();
    const requestReset = useRequestPasswordReset();

    const baseline = toAgentForm(user);
    const [form, setForm] = useState<AgentSettingsForm>(EMPTY_AGENT_FORM);
    const [hydrated, setHydrated] = useState(false);
    const [notifications, setNotifications] = useState(
        EMPTY_NOTIFICATION_STATE,
    );
    const [alertsHydrated, setAlertsHydrated] = useState(false);
    const [saved, setSaved] = useState(false);
    const [resetOpen, setResetOpen] = useState(false);
    const [resetSent, setResetSent] = useState(false);

    const baselineAlerts = toNotificationState(storedPreferences.data ?? []);

    if (user && !hydrated) {
        setForm(baseline);
        setHydrated(true);
    }

    if (storedPreferences.data && !alertsHydrated) {
        setNotifications(baselineAlerts);
        setAlertsHydrated(true);
    }

    const credentials = agentCredentials(user);
    const signals = profileSignals(user, listings.data?.total ?? 0);
    const strength = profileStrength(signals);
    const verified = verifiedCredentialCount(credentials);

    const saving = updateUser.isPending || updatePreferences.isPending;
    const pending = changedFieldCount(form, baseline);
    const dirty =
        pending > 0 || areNotificationsDirty(notifications, baselineAlerts);
    useUnsavedChangesWarning(dirty && !saved);

    const changeField = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setForm((current) => ({ ...current, [name]: value }));
        setSaved(false);
    };

    const toggleNotification = (id: NotificationRuleId) => {
        setNotifications((current) => ({ ...current, [id]: !current[id] }));
        setSaved(false);
    };

    const submit = (event: FormEvent) => {
        event.preventDefault();
        if (!user || saving) return;
        updateUser.mutate(toAgentUserPayload(form), {
            onSuccess: () =>
                updatePreferences.mutate(
                    {
                        preferences: toNotificationPayload(
                            storedPreferences.data ?? [],
                            notifications,
                        ),
                    },
                    { onSuccess: () => setSaved(true) },
                ),
        });
    };

    const sendPasswordReset = () => {
        if (!user?.email) return;
        requestReset.mutate(
            { email: user.email },
            { onSuccess: () => setResetSent(true) },
        );
    };

    const reset = () => {
        setForm(baseline);
        setNotifications(baselineAlerts);
        setSaved(false);
    };

    const openPasswordReset = () => {
        setResetSent(false);
        setResetOpen(true);
    };

    return {
        user,
        failed: isError,
        loading: isPending,
        retry: () => void refetch(),
        form,
        notifications,
        saved,
        saving,
        dirty,
        pending,
        credentials,
        signals,
        strength,
        verified,
        stats: buildAgentSettingsStats(
            strength,
            verified,
            credentials.length,
            notifications,
        ),
        resetOpen,
        resetSent,
        resettingPassword: requestReset.isPending,
        closePasswordReset: () => setResetOpen(false),
        openPasswordReset,
        sendPasswordReset,
        changeField,
        toggleNotification,
        submit,
        reset,
    };
}

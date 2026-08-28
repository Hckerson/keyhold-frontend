"use client";

import { useMutation } from "@tanstack/react-query";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { useUnsavedChangesWarning } from "@/lib/hooks/use-unsaved-changes-warning";
import {
    arePreferencesDirty,
    emptyPreferences,
    toggleChannel,
    toggleEnabled,
    toPreferenceList,
    toPreferenceMap,
} from "@/lib/data/alerts";
import {
    buyerDocuments,
    searchProfileStrength,
    searchSignals,
    type SettingsDialogKey,
} from "@/lib/data/buyer-account";
import {
    buildDashboardSettingsStats,
    changedFieldCount,
    DATA_EXPORT_FILENAME,
    EMPTY_PROFILE,
    profileStrength,
    toProfileForm,
    type ProfileForm,
} from "@/lib/data/dashboard-settings";
import { useMyInterests } from "@/lib/hooks/use-connections";
import { useSavedProperties } from "@/lib/hooks/use-saved-properties";
import { useCurrentUser, useUpdateUser } from "@/lib/hooks/use-users";
import { useRequestPasswordReset } from "@/lib/hooks/use-session";
import {
    useNotificationPreferences,
    useUpdateNotificationPreferences,
} from "@/lib/hooks/use-notifications";
import { verifiedDocumentCount } from "@/lib/data/buyer-account";
import { downloadJson } from "@/lib/utils/download";
import { usersAPI } from "@/lib/api/users";
import type { AlertChannel, AlertType } from "@/lib/types";

export function useDashboardSettings() {
    const currentUser = useCurrentUser();
    const user = currentUser.data;
    const saved_ = useSavedProperties();
    const connections = useMyInterests();
    const updateUser = useUpdateUser(user?.id ?? "");
    const storedPreferences = useNotificationPreferences();
    const updatePreferences = useUpdateNotificationPreferences();
    const requestReset = useRequestPasswordReset();

    const queries = [currentUser, saved_, connections, storedPreferences];

    const baseline = toProfileForm(user);
    const [form, setForm] = useState<ProfileForm>(EMPTY_PROFILE);
    const [hydrated, setHydrated] = useState(false);

    if (user && !hydrated) {
        setForm(baseline);
        setHydrated(true);
    }
    const preferenceBaseline = storedPreferences.data
        ? toPreferenceMap(storedPreferences.data)
        : emptyPreferences();
    const [preferences, setPreferences] = useState(preferenceBaseline);
    const [preferencesHydrated, setPreferencesHydrated] = useState(false);

    if (storedPreferences.data && !preferencesHydrated) {
        setPreferences(preferenceBaseline);
        setPreferencesHydrated(true);
    }

    const [dialog, setDialog] = useState<SettingsDialogKey | null>(null);
    const [resetSent, setResetSent] = useState(false);
    const [saved, setSaved] = useState(false);

    const pending = changedFieldCount(form, baseline);
    const dirty =
        pending > 0 || arePreferencesDirty(preferences, preferenceBaseline);

    useUnsavedChangesWarning(dirty && !saved);

    const changeField = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setForm((current) => ({ ...current, [name]: value }));
        setSaved(false);
    };

    const switchEnabled = (type: AlertType) => {
        setPreferences((current) => toggleEnabled(current, type));
        setSaved(false);
    };

    const switchChannel = (type: AlertType, channel: AlertChannel) => {
        setPreferences((current) => toggleChannel(current, type, channel));
        setSaved(false);
    };

    const submit = (event: FormEvent) => {
        event.preventDefault();
        if (!user) return;
        void Promise.all([
            updateUser.mutateAsync({
                fullName: form.fullName,
                email: form.email,
                phoneNumber: form.phone,
                bio: form.bio,
            }),
            updatePreferences.mutateAsync({
                preferences: toPreferenceList(preferences),
            }),
        ]).then(() => setSaved(true));
    };

    const reset = () => {
        setForm(baseline);
        setPreferences(preferenceBaseline);
        setSaved(false);
    };

    const runSecurityAction = (id: SettingsDialogKey) => {
        setResetSent(false);
        setDialog(id);
    };

    const sendPasswordReset = () => {
        if (!user?.email) return;
        void requestReset
            .mutateAsync({ email: user.email })
            .then(() => setResetSent(true));
    };

    const documents = buyerDocuments(user);
    const signals = searchSignals(
        user,
        saved_.data?.length ?? 0,
        connections.data?.length ?? 0,
    );
    const strength = Math.round(
        (searchProfileStrength(signals) + profileStrength(form)) / 2,
    );

    const exportMine = useMutation({
        mutationFn: () => usersAPI.exportMine(),
        onSuccess: (data) => downloadJson(data, DATA_EXPORT_FILENAME),
    });

    const exportData = () => void exportMine.mutateAsync().catch(() => null);

    return {
        form,
        preferences,
        dialog,
        resetSent,
        failed: queries.some((query) => query.isError),
        retry: () => queries.forEach((query) => void query.refetch()),
        resettingPassword: requestReset.isPending,
        saved,
        dirty,
        pending,
        stats: buildDashboardSettingsStats(
            strength,
            verifiedDocumentCount(documents),
            documents.length,
            preferences,
        ),
        user,
        signals,
        strength,
        documents,
        verifiedCount: verifiedDocumentCount(documents),
        setDialog,
        changeField,
        switchEnabled,
        switchChannel,
        sendPasswordReset,
        submit,
        reset,
        runSecurityAction,
        exportData,
        exporting: exportMine.isPending,
        exportFailed: exportMine.isError,
    };
}

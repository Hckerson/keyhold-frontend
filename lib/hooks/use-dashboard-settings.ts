"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { useUnsavedChangesWarning } from "@/lib/hooks/use-unsaved-changes-warning";
import { useHydratedState } from "@/lib/hooks/use-hydrated-state";
import { useSettingsSecurity } from "@/lib/hooks/use-settings-security";
import {
    arePreferencesDirty,
    emptyPreferences,
    toggleChannel,
    toggleEnabled,
    toPreferenceList,
    toPreferenceMap,
} from "@/lib/data/alerts-preferences";
import {
    buyerDocuments,
    searchProfileStrength,
    searchSignals,
    verifiedDocumentCount,
} from "@/lib/data/buyer-account";
import {
    buildDashboardSettingsStats,
    changedFieldCount,
    profileStrength,
    toProfileForm,
} from "@/lib/data/dashboard-settings";
import { useMyInterests } from "@/lib/hooks/use-connections";
import { useSavedProperties } from "@/lib/hooks/use-saved-properties";
import {
    useCurrentUser,
    useExportPersonalData,
    useUpdateUser,
    useUploadAvatar,
} from "@/lib/hooks/use-users";
import {
    useNotificationPreferences,
    useUpdateNotificationPreferences,
} from "@/lib/hooks/use-notifications";
import type { AlertChannel, AlertType } from "@/lib/types";

export function useDashboardSettings() {
    const currentUser = useCurrentUser();
    const user = currentUser.data;
    const saved_ = useSavedProperties();
    const connections = useMyInterests();
    const updateUser = useUpdateUser(user?.id ?? "");
    const storedPreferences = useNotificationPreferences();
    const updatePreferences = useUpdateNotificationPreferences();
    const uploadAvatar = useUploadAvatar();
    const exportMine = useExportPersonalData();
    const security = useSettingsSecurity(user?.email);

    const queries = [currentUser, saved_, connections, storedPreferences];

    const baseline = toProfileForm(user);
    const [form, setForm] = useHydratedState(Boolean(user), baseline);
    const preferenceBaseline = storedPreferences.data
        ? toPreferenceMap(storedPreferences.data)
        : emptyPreferences();
    const [preferences, setPreferences] = useHydratedState(
        Boolean(storedPreferences.data),
        preferenceBaseline,
    );
    const [saved, setSaved] = useState(false);

    const saving = updateUser.isPending || updatePreferences.isPending;
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
        if (!user || saving) return;
        updateUser.mutate(
            {
                fullName: form.fullName,
                email: form.email,
                phoneNumber: form.phone,
                bio: form.bio,
            },
            {
                onSuccess: () =>
                    updatePreferences.mutate(
                        { preferences: toPreferenceList(preferences) },
                        { onSuccess: () => setSaved(true) },
                    ),
            },
        );
    };

    const reset = () => {
        setForm(baseline);
        setPreferences(preferenceBaseline);
        setSaved(false);
    };

    const documents = buyerDocuments(user);
    const verifiedCount = verifiedDocumentCount(documents);
    const signals = searchSignals(
        user,
        saved_.data?.length ?? 0,
        connections.data?.length ?? 0,
    );
    const strength = Math.round(
        (searchProfileStrength(signals) + profileStrength(form)) / 2,
    );

    const exportData = () => {
        if (!exportMine.isPending) exportMine.mutate();
    };

    return {
        ...security,
        form,
        preferences,
        failed: queries.some((query) => query.isError),
        loading: queries.some((query) => query.isPending),
        retry: () => queries.forEach((query) => void query.refetch()),
        saved,
        saving,
        dirty,
        pending,
        stats: buildDashboardSettingsStats(
            strength,
            verifiedCount,
            documents.length,
            preferences,
        ),
        user,
        signals,
        strength,
        documents,
        verifiedCount,
        changeField,
        switchEnabled,
        switchChannel,
        submit,
        reset,
        exportData,
        exporting: exportMine.isPending,
        exportFailed: exportMine.isError,
        uploadPhoto: (file: File) => uploadAvatar.mutate(file),
        photoUploading: uploadAvatar.isPending,
        photoProgress: uploadAvatar.progress,
    };
}

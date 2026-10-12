"use client";

import { useMemo, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import {
    MARKETPLACE_FIELDS,
    PLATFORM_FIELDS,
    type AdminConfigKey,
} from "@/lib/config/admin-settings";
import { isPolicyOn, pendingWarnings } from "@/lib/data/admin-policies";
import {
    EMPTY_ADMIN_CONFIG,
    EMPTY_POLICY_STATE,
    toAdminConfig,
    toPolicyState,
    toSettingsPayload,
} from "@/lib/data/admin-settings";
import {
    configErrors,
    errorCount,
    recentSettingChanges,
    unsavedLabels,
    withBaselineHints,
} from "@/lib/data/admin-settings-changes";
import { useMaintenanceRun } from "@/lib/hooks/use-maintenance-run";
import {
    usePlatformSettings,
    useUpdatePlatformSettings,
} from "@/lib/hooks/use-platform-settings";
import { useUnsavedChangesWarning } from "@/lib/hooks/use-unsaved-changes-warning";
import type { PolicySwitchId } from "@/lib/types";

export function useAdminSettings() {
    const settings = usePlatformSettings();
    const update = useUpdatePlatformSettings();

    const [config, setConfig] = useState(EMPTY_ADMIN_CONFIG);
    const [policies, setPolicies] = useState(EMPTY_POLICY_STATE);
    const [hydrated, setHydrated] = useState(false);
    const maintenance = useMaintenanceRun(() => setHydrated(false));

    const baselineConfig = useMemo(
        () => toAdminConfig(settings.data ?? []),
        [settings.data],
    );
    const baselinePolicies = useMemo(
        () => toPolicyState(settings.data ?? []),
        [settings.data],
    );

    if (settings.data && !hydrated) {
        setConfig(baselineConfig);
        setPolicies(baselinePolicies);
        setHydrated(true);
    }

    const changes = useMemo(
        () => recentSettingChanges(settings.data ?? []),
        [settings.data],
    );

    const unsaved = unsavedLabels(
        config,
        baselineConfig,
        policies,
        baselinePolicies,
    );
    const dirty = unsaved.length > 0;
    const errors = useMemo(() => configErrors(config), [config]);
    const invalid = errorCount(errors);
    useUnsavedChangesWarning(dirty);

    const changeField = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setConfig((current) => ({ ...current, [name]: value }));
    };

    const selectField = (name: AdminConfigKey, value: string) => {
        setConfig((current) => ({ ...current, [name]: value }));
    };

    const togglePolicy = (id: PolicySwitchId) => {
        setPolicies((current) => ({ ...current, [id]: !current[id] }));
    };

    const submit = (event: FormEvent) => {
        event.preventDefault();
        if (update.isPending || !dirty || invalid > 0) return;
        update.mutate(toSettingsPayload(settings.data ?? [], config, policies));
    };

    const reset = () => {
        setConfig(baselineConfig);
        setPolicies(baselinePolicies);
    };

    return {
        failed: settings.isError,
        loading: settings.isPending,
        retry: () => void settings.refetch(),
        saving: update.isPending,
        dirty,
        unsaved,
        errors,
        invalid,
        warnings: pendingWarnings(policies, baselinePolicies),
        config,
        policies,
        baselinePolicies,
        platformFields: withBaselineHints(
            PLATFORM_FIELDS,
            config,
            baselineConfig,
        ),
        marketplaceFields: withBaselineHints(
            MARKETPLACE_FIELDS,
            config,
            baselineConfig,
        ),
        changes,
        offline: isPolicyOn(baselinePolicies, "maintenance-mode"),
        maintenance,
        changeField,
        selectField,
        togglePolicy,
        submit,
        reset,
    };
}

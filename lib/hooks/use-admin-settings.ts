"use client";

import { useMemo, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { TABLE_PAGE_SIZE } from "@/lib/constants";
import { useUnsavedChangesWarning } from "@/lib/hooks/use-unsaved-changes-warning";
import { arePoliciesDirty } from "@/lib/data/admin-policies";
import {
    buildSettingsStats,
    changedFieldCount,
    EMPTY_ADMIN_CONFIG,
    EMPTY_POLICY_STATE,
    toAdminConfig,
    toPolicyState,
    toSettingsPayload,
} from "@/lib/data/admin-settings";
import type { AdminConfigKey } from "@/lib/config/admin-settings";
import { useAuditLogs } from "@/lib/hooks/use-audit-logs";
import { useMaintenanceRun } from "@/lib/hooks/use-maintenance-run";
import {
    usePlatformSettings,
    useUpdatePlatformSettings,
} from "@/lib/hooks/use-platform-settings";
import { toConfigChanges } from "@/lib/utils/to-config-change";
import type { PolicySwitchId } from "@/lib/types";

const FIRST_PAGE = 1;
const LATEST_LIMIT = 1;

export function useAdminSettings() {
    const settings = usePlatformSettings();
    const update = useUpdatePlatformSettings();
    const [logPage, setLogPage] = useState(FIRST_PAGE);
    const logs = useAuditLogs({ page: logPage, limit: TABLE_PAGE_SIZE });
    const latestLog = useAuditLogs({
        page: FIRST_PAGE,
        limit: LATEST_LIMIT,
    });

    const [config, setConfig] = useState(EMPTY_ADMIN_CONFIG);
    const [policies, setPolicies] = useState(EMPTY_POLICY_STATE);
    const [hydrated, setHydrated] = useState(false);
    const [savedDraft, setSavedDraft] = useState<{
        config: typeof config;
        policies: typeof policies;
    }>();
    const saved =
        savedDraft !== undefined &&
        savedDraft.config === config &&
        savedDraft.policies === policies;
    const maintenance = useMaintenanceRun(() => {
        setHydrated(false);
        setSavedDraft(undefined);
    });

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
        () => toConfigChanges(logs.data?.items ?? []),
        [logs.data?.items],
    );

    const lastChange = useMemo(
        () => toConfigChanges(latestLog.data?.items ?? [])[0],
        [latestLog.data?.items],
    );

    const loggedChanges = logs.data?.total ?? changes.length;

    const pending = changedFieldCount(config, baselineConfig);
    const dirty = pending > 0 || arePoliciesDirty(policies, baselinePolicies);
    useUnsavedChangesWarning(dirty && !saved);

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
        if (update.isPending) return;
        const submitted = { config, policies };
        update.mutate(
            toSettingsPayload(settings.data ?? [], config, policies),
            {
                onSuccess: () => setSavedDraft(submitted),
            },
        );
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
        saved,
        dirty,
        pending,
        config,
        policies,
        stats: buildSettingsStats(policies, loggedChanges),
        changes,
        lastChange,
        loggedChanges,
        logPage: logs.data?.page ?? logPage,
        logPageCount: logs.data?.pageCount ?? FIRST_PAGE,
        setLogPage,
        maintenance,
        changeField,
        selectField,
        togglePolicy,
        submit,
        reset,
    };
}

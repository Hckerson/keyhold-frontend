"use client";

import { useMemo, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Callout } from "@/components/ui/callout";
import { AdminSettingsHeader } from "@/components/sections/admin/admin-settings-header";
import { AdminSettingsMain } from "@/components/sections/admin/admin-settings-main";
import { AdminSettingsRail } from "@/components/sections/admin/admin-settings-rail";
import { AdminSettingsStatBand } from "@/components/sections/admin/admin-settings-stat-band";
import { ConsoleUnavailable } from "@/components/patterns/console-unavailable";
import { MaintenanceConfirmModal } from "@/components/features/admin/maintenance-confirm-modal";
import { CONSOLE_FALLBACKS } from "@/lib/config/console-fallbacks";
import { TABLE_PAGE_SIZE } from "@/lib/constants";
import { useUnsavedChangesWarning } from "@/lib/hooks/use-unsaved-changes-warning";
import { arePoliciesDirty } from "@/lib/data/admin-policies";
import {
    buildSettingsStats,
    changedFieldCount,
    EMPTY_ADMIN_CONFIG,
    EMPTY_POLICY_STATE,
    MAINTENANCE_ACTIONS,
    toAdminConfig,
    toPolicyState,
    toSettingsPayload,
    type AdminConfigKey,
    type MaintenanceActionId,
} from "@/lib/data/admin-settings";
import { useAuditLogs } from "@/lib/hooks/use-audit-logs";
import {
    usePlatformSettings,
    usePurgeExpiredVerifications,
    useRestorePlatformDefaults,
    useUpdatePlatformSettings,
} from "@/lib/hooks/use-platform-settings";
import { toConfigChanges } from "@/lib/utils/to-config-change";
import type { PolicySwitchId } from "@/lib/types";

const SAVED_TITLE = "Configuration saved";
const SAVED_LEDE =
    "New values apply to listings and payouts created from now on.";
const FIRST_PAGE = 1;
const LATEST_LIMIT = 1;

export function AdminSettingsConsole() {
    const settings = usePlatformSettings();
    const update = useUpdatePlatformSettings();
    const restoreDefaults = useRestorePlatformDefaults();
    const purgeVerifications = usePurgeExpiredVerifications();
    const [logPage, setLogPage] = useState(FIRST_PAGE);
    const logs = useAuditLogs({ page: logPage, limit: TABLE_PAGE_SIZE });
    const latestLog = useAuditLogs({
        page: FIRST_PAGE,
        limit: LATEST_LIMIT,
    });

    const [config, setConfig] = useState(EMPTY_ADMIN_CONFIG);
    const [policies, setPolicies] = useState(EMPTY_POLICY_STATE);
    const [hydrated, setHydrated] = useState(false);
    const [saved, setSaved] = useState(false);
    const [maintenanceId, setMaintenanceId] = useState<MaintenanceActionId>();

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

    const handleFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setConfig((current) => ({ ...current, [name]: value }));
        setSaved(false);
    };

    const handleFieldSelect = (name: AdminConfigKey, value: string) => {
        setConfig((current) => ({ ...current, [name]: value }));
        setSaved(false);
    };

    const handlePolicyToggle = (id: PolicySwitchId) => {
        setPolicies((current) => ({ ...current, [id]: !current[id] }));
        setSaved(false);
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        update.mutate(
            toSettingsPayload(settings.data ?? [], config, policies),
            {
                onSuccess: () => setSaved(true),
            },
        );
    };

    const handleReset = () => {
        setConfig(baselineConfig);
        setPolicies(baselinePolicies);
        setSaved(false);
    };

    const maintenanceAction =
        MAINTENANCE_ACTIONS.find((action) => action.id === maintenanceId) ??
        null;

    const maintenanceRunning =
        restoreDefaults.isPending || purgeVerifications.isPending;

    const closeMaintenance = () => setMaintenanceId(undefined);

    const handleMaintenanceConfirm = () => {
        if (maintenanceId === "restore-defaults") {
            restoreDefaults.mutate(undefined, {
                onSuccess: () => {
                    setHydrated(false);
                    setSaved(false);
                    closeMaintenance();
                },
            });
            return;
        }

        purgeVerifications.mutate(undefined, { onSuccess: closeMaintenance });
    };

    if (settings.isError)
        return (
            <ConsoleUnavailable
                fallback={CONSOLE_FALLBACKS.settings}
                onRetry={() => void settings.refetch()}
            />
        );

    return (
        <div className="flex flex-col gap-4">
            <AdminSettingsHeader
                dirty={dirty}
                saved={saved}
                onReset={handleReset}
            />

            <AdminSettingsStatBand
                stats={buildSettingsStats(policies, loggedChanges)}
            />

            {saved && (
                <Callout
                    variant="success"
                    title={SAVED_TITLE}
                    description={SAVED_LEDE}
                />
            )}

            <div className="console-split gap-3">
                <AdminSettingsMain
                    config={config}
                    policies={policies}
                    pending={pending}
                    maintenancePending={
                        maintenanceRunning ? maintenanceId : undefined
                    }
                    onFieldChange={handleFieldChange}
                    onFieldSelect={handleFieldSelect}
                    onPolicyToggle={handlePolicyToggle}
                    onSubmit={handleSubmit}
                    onMaintenanceRun={setMaintenanceId}
                    lastChange={lastChange}
                />
                <AdminSettingsRail
                    changes={changes}
                    total={loggedChanges}
                    page={logs.data?.page ?? logPage}
                    pageCount={logs.data?.pageCount ?? FIRST_PAGE}
                    onPageChange={setLogPage}
                />
            </div>

            <MaintenanceConfirmModal
                action={maintenanceAction}
                pending={maintenanceRunning}
                onClose={closeMaintenance}
                onConfirm={handleMaintenanceConfirm}
            />
        </div>
    );
}

AdminSettingsConsole.displayName = "AdminSettingsConsole";

"use client";

import { useMemo, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Callout } from "@/components/ui/callout";
import { AdminSettingsHeader } from "@/components/sections/admin/admin-settings-header";
import { AdminSettingsMain } from "@/components/sections/admin/admin-settings-main";
import { AdminSettingsRail } from "@/components/sections/admin/admin-settings-rail";
import { AdminSettingsStatBand } from "@/components/sections/admin/admin-settings-stat-band";
import { ConsoleUnavailable } from "@/components/patterns/console-unavailable";
import { CONSOLE_FALLBACKS } from "@/lib/config/console-fallbacks";
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
import { useAuditLogs } from "@/lib/hooks/use-audit-logs";
import {
    usePlatformSettings,
    useUpdatePlatformSettings,
} from "@/lib/hooks/use-platform-settings";
import { toConfigChanges } from "@/lib/utils/to-config-change";
import type { PolicySwitchId } from "@/lib/types";

const SAVED_TITLE = "Configuration saved";
const SAVED_LEDE =
    "New values apply to listings and payouts created from now on.";
const LOG_PAGE_SIZE = 20;

export function AdminSettingsConsole() {
    const settings = usePlatformSettings();
    const update = useUpdatePlatformSettings();
    const logs = useAuditLogs({ limit: LOG_PAGE_SIZE });

    const [config, setConfig] = useState(EMPTY_ADMIN_CONFIG);
    const [policies, setPolicies] = useState(EMPTY_POLICY_STATE);
    const [hydrated, setHydrated] = useState(false);
    const [saved, setSaved] = useState(false);

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

    const pending = changedFieldCount(config, baselineConfig);
    const dirty = pending > 0 || arePoliciesDirty(policies, baselinePolicies);
    useUnsavedChangesWarning(dirty && !saved);

    const handleFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setConfig((current) => ({ ...current, [name]: value }));
        setSaved(false);
    };

    const handlePolicyToggle = (id: PolicySwitchId) => {
        setPolicies((current) => ({ ...current, [id]: !current[id] }));
        setSaved(false);
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        void update
            .mutateAsync(
                toSettingsPayload(settings.data ?? [], config, policies),
            )
            .then(() => setSaved(true));
    };

    const handleReset = () => {
        setConfig(baselineConfig);
        setPolicies(baselinePolicies);
        setSaved(false);
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
                stats={buildSettingsStats(policies, changes.length)}
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
                    onFieldChange={handleFieldChange}
                    onPolicyToggle={handlePolicyToggle}
                    onSubmit={handleSubmit}
                    lastChange={changes[0]}
                />
                <AdminSettingsRail changes={changes} />
            </div>
        </div>
    );
}

AdminSettingsConsole.displayName = "AdminSettingsConsole";

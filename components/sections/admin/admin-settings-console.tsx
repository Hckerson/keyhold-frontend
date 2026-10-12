"use client";

import { useState } from "react";
import { MaintenanceConfirmModal } from "@/components/features/admin/maintenance-confirm-modal";
import { SettingsHistoryDrawer } from "@/components/features/admin/settings-history-drawer";
import { ConsoleSkeleton } from "@/components/patterns/console-skeleton";
import { ConsoleUnavailable } from "@/components/patterns/console-unavailable";
import { AdminSettingsHeader } from "@/components/sections/admin/admin-settings-header";
import { AdminSettingsMain } from "@/components/sections/admin/admin-settings-main";
import { CONSOLE_FALLBACKS } from "@/lib/config/console-fallbacks";
import { lastEditLine } from "@/lib/data/admin-settings-changes";
import { useAdminSettings } from "@/lib/hooks/use-admin-settings";

export function AdminSettingsConsole() {
    const settings = useAdminSettings();
    const { maintenance } = settings;
    const [historyOpen, setHistoryOpen] = useState(false);

    if (settings.failed)
        return (
            <ConsoleUnavailable
                fallback={CONSOLE_FALLBACKS.settings}
                onRetry={settings.retry}
            />
        );

    if (settings.loading) return <ConsoleSkeleton variant="form" />;

    return (
        <div className="flex flex-col gap-6">
            <AdminSettingsHeader
                summary={lastEditLine(settings.changes)}
                onHistory={
                    settings.changes.length > 0
                        ? () => setHistoryOpen(true)
                        : undefined
                }
            />

            <AdminSettingsMain
                config={settings.config}
                errors={settings.errors}
                policies={settings.policies}
                baselinePolicies={settings.baselinePolicies}
                platformFields={settings.platformFields}
                marketplaceFields={settings.marketplaceFields}
                unsaved={settings.unsaved}
                warnings={settings.warnings}
                invalid={settings.invalid}
                offline={settings.offline}
                saving={settings.saving}
                maintenancePending={maintenance.running}
                onFieldChange={settings.changeField}
                onFieldSelect={settings.selectField}
                onPolicyToggle={settings.togglePolicy}
                onSubmit={settings.submit}
                onReset={settings.reset}
                onMaintenanceRun={maintenance.request}
            />

            <SettingsHistoryDrawer
                open={historyOpen}
                changes={settings.changes}
                onOpenChange={setHistoryOpen}
            />

            <MaintenanceConfirmModal
                action={maintenance.action}
                pending={maintenance.pending}
                failed={maintenance.failed}
                onClose={maintenance.dismiss}
                onConfirm={maintenance.confirm}
            />
        </div>
    );
}

AdminSettingsConsole.displayName = "AdminSettingsConsole";

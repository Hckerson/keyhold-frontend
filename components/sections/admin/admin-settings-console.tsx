"use client";

import { Callout } from "@/components/ui/callout";
import { AdminSettingsHeader } from "@/components/sections/admin/admin-settings-header";
import { AdminSettingsMain } from "@/components/sections/admin/admin-settings-main";
import { AdminSettingsRail } from "@/components/sections/admin/admin-settings-rail";
import { AdminSettingsStatBand } from "@/components/sections/admin/admin-settings-stat-band";
import { ConsoleUnavailable } from "@/components/patterns/console-unavailable";
import { MaintenanceConfirmModal } from "@/components/features/admin/maintenance-confirm-modal";
import { CONSOLE_FALLBACKS } from "@/lib/config/console-fallbacks";
import { useAdminSettings } from "@/lib/hooks/use-admin-settings";

const SAVED_TITLE = "Configuration saved";
const SAVED_LEDE =
    "New values apply to listings and payouts created from now on.";

export function AdminSettingsConsole() {
    const settings = useAdminSettings();
    const { maintenance } = settings;

    if (settings.failed)
        return (
            <ConsoleUnavailable
                fallback={CONSOLE_FALLBACKS.settings}
                onRetry={settings.retry}
            />
        );

    return (
        <div className="flex flex-col gap-4">
            <AdminSettingsHeader
                dirty={settings.dirty}
                saved={settings.saved}
                saving={settings.saving}
                onReset={settings.reset}
            />

            <AdminSettingsStatBand
                stats={settings.stats}
                pending={settings.loading}
            />

            {settings.saved && (
                <Callout
                    variant="success"
                    title={SAVED_TITLE}
                    description={SAVED_LEDE}
                />
            )}

            <div className="console-split gap-3">
                <AdminSettingsMain
                    config={settings.config}
                    policies={settings.policies}
                    pending={settings.pending}
                    maintenancePending={maintenance.running}
                    onFieldChange={settings.changeField}
                    onFieldSelect={settings.selectField}
                    onPolicyToggle={settings.togglePolicy}
                    onSubmit={settings.submit}
                    onMaintenanceRun={maintenance.request}
                    lastChange={settings.lastChange}
                />
                <AdminSettingsRail
                    changes={settings.changes}
                    total={settings.loggedChanges}
                    page={settings.logPage}
                    pageCount={settings.logPageCount}
                    onPageChange={settings.setLogPage}
                />
            </div>

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

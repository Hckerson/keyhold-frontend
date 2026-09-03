"use client";

import { PasswordModal } from "@/components/features/settings/password-modal";
import { ConsoleUnavailable } from "@/components/patterns/console-unavailable";
import { CONSOLE_FALLBACKS } from "@/lib/config/console-fallbacks";
import { DashboardSettingsHeader } from "@/components/sections/dashboard/dashboard-settings-header";
import { DashboardSettingsMain } from "@/components/sections/dashboard/dashboard-settings-main";
import { DashboardSettingsNotices } from "@/components/sections/dashboard/dashboard-settings-notices";
import { DashboardSettingsRail } from "@/components/sections/dashboard/dashboard-settings-rail";
import { DashboardSettingsStatBand } from "@/components/sections/dashboard/dashboard-settings-stat-band";
import { useDashboardSettings } from "@/lib/hooks/use-dashboard-settings";

export function DashboardSettingsConsole() {
    const settings = useDashboardSettings();

    if (settings.failed)
        return (
            <ConsoleUnavailable
                fallback={CONSOLE_FALLBACKS.buyerSettings}
                onRetry={settings.retry}
            />
        );

    return (
        <div className="flex flex-col gap-4">
            <DashboardSettingsHeader
                dirty={settings.dirty}
                saved={settings.saved}
                onReset={settings.reset}
            />

            <DashboardSettingsStatBand stats={settings.stats} />

            <DashboardSettingsNotices
                saved={settings.saved}
                resetSent={settings.resetSent}
            />

            <div className="console-split gap-3">
                <DashboardSettingsMain
                    form={settings.form}
                    preferences={settings.preferences}
                    pending={settings.pending}
                    strength={settings.strength}
                    verified={settings.verifiedCount}
                    documents={settings.documents.length}
                    updatedAt={settings.user?.updatedAt}
                    avatar={settings.user?.avatar ?? undefined}
                    onFieldChange={settings.changeField}
                    onToggleEnabled={settings.switchEnabled}
                    onToggleChannel={settings.switchChannel}
                    onSubmit={settings.submit}
                />
                <DashboardSettingsRail
                    signals={settings.signals}
                    strength={settings.strength}
                    documents={settings.documents}
                    onSecurityAction={settings.runSecurityAction}
                    onDownloadData={settings.exportData}
                />
            </div>

            <PasswordModal
                open={settings.dialog === "password"}
                email={settings.user?.email ?? ""}
                pending={settings.resettingPassword}
                sent={settings.resetSent}
                onClose={() => settings.setDialog(null)}
                onSend={settings.sendPasswordReset}
            />
        </div>
    );
}

DashboardSettingsConsole.displayName = "DashboardSettingsConsole";

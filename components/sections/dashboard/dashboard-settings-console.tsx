"use client";

import { PasswordModal } from "@/components/features/settings/password-modal";
import { TwoFactorModal } from "@/components/features/settings/two-factor-modal";
import { DeleteAccountModal } from "@/components/features/settings/delete-account-modal";
import { DashboardSettingsHeader } from "@/components/sections/dashboard/dashboard-settings-header";
import { DashboardSettingsMain } from "@/components/sections/dashboard/dashboard-settings-main";
import { DashboardSettingsNotices } from "@/components/sections/dashboard/dashboard-settings-notices";
import { DashboardSettingsRail } from "@/components/sections/dashboard/dashboard-settings-rail";
import { DashboardSettingsStatBand } from "@/components/sections/dashboard/dashboard-settings-stat-band";
import { useDashboardSettings } from "@/lib/hooks/use-dashboard-settings";

export function DashboardSettingsConsole() {
    const settings = useDashboardSettings();

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
                passwordUpdated={settings.passwordUpdated}
                deletionScheduled={settings.deletionScheduled}
                onRestore={() => settings.setDeletionScheduled(false)}
            />

            <div className="console-split gap-3">
                <DashboardSettingsMain
                    form={settings.form}
                    preferences={settings.preferences}
                    privacy={settings.privacy}
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
                    privacy={settings.privacy}
                    contactMethod={settings.contactMethod}
                    twoFactorEnabled={settings.twoFactorEnabled}
                    onPrivacyToggle={settings.switchPrivacy}
                    onContactMethodChange={settings.changeContactMethod}
                    onSecurityAction={settings.runSecurityAction}
                    onDownloadData={settings.exportData}
                />
            </div>

            <PasswordModal
                open={settings.dialog === "password"}
                onClose={() => settings.setDialog(null)}
                onPasswordUpdated={() => settings.setPasswordUpdated(true)}
            />

            <TwoFactorModal
                open={settings.dialog === "two-factor"}
                enabled={settings.twoFactorEnabled}
                onClose={() => settings.setDialog(null)}
                onEnabledChange={settings.setTwoFactorEnabled}
            />

            <DeleteAccountModal
                open={settings.dialog === "delete"}
                onClose={() => settings.setDialog(null)}
                onConfirm={() => settings.setDeletionScheduled(true)}
            />
        </div>
    );
}

DashboardSettingsConsole.displayName = "DashboardSettingsConsole";

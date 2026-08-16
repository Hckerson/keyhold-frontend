"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Callout } from "@/components/ui/callout";
import { PasswordModal } from "@/components/features/settings/password-modal";
import { TwoFactorModal } from "@/components/features/settings/two-factor-modal";
import { DeleteAccountModal } from "@/components/features/settings/delete-account-modal";
import { DashboardSettingsHeader } from "@/components/sections/dashboard/dashboard-settings-header";
import { DashboardSettingsMain } from "@/components/sections/dashboard/dashboard-settings-main";
import { DashboardSettingsRail } from "@/components/sections/dashboard/dashboard-settings-rail";
import { DashboardSettingsStatBand } from "@/components/sections/dashboard/dashboard-settings-stat-band";
import { useUnsavedChangesWarning } from "@/lib/hooks/use-unsaved-changes-warning";
import {
    arePreferencesDirty,
    initialPreferences,
    toggleChannel,
    toggleEnabled,
} from "@/lib/data/alerts";
import {
    INITIAL_PRIVACY_STATE,
    isPrivacyDirty,
    type PrivacyControlId,
    type SettingsDialogKey,
} from "@/lib/data/buyer-account";
import {
    buildDashboardSettingsStats,
    changedFieldCount,
    DATA_EXPORT_FILENAME,
    INITIAL_CONTACT_METHOD,
    INITIAL_PROFILE,
    type ContactMethod,
} from "@/lib/data/dashboard-settings";
import type { AlertChannel, AlertType } from "@/lib/types";

const SAVED_TITLE = "Preferences saved";
const SAVED_LEDE = "New matches and alerts follow these settings from now on.";
const PASSWORD_TITLE = "Password updated";
const PASSWORD_LEDE = "Use your new password the next time you sign in.";
const DELETION_TITLE = "Account scheduled for deletion";
const DELETION_LEDE =
    "Your data will be removed in 30 days. Restore it any time before then.";
const RESTORE_ACTION = "Restore account";

export function DashboardSettingsConsole() {
    const [form, setForm] = useState(INITIAL_PROFILE);
    const [preferences, setPreferences] = useState(initialPreferences);
    const [privacy, setPrivacy] = useState(INITIAL_PRIVACY_STATE);
    const [contactMethod, setContactMethod] = useState<ContactMethod>(
        INITIAL_CONTACT_METHOD,
    );
    const [dialog, setDialog] = useState<SettingsDialogKey | null>(null);
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
    const [deletionScheduled, setDeletionScheduled] = useState(false);
    const [passwordUpdated, setPasswordUpdated] = useState(false);
    const [saved, setSaved] = useState(false);

    const pending = changedFieldCount(form);
    const dirty =
        pending > 0 ||
        arePreferencesDirty(preferences) ||
        isPrivacyDirty(privacy) ||
        contactMethod !== INITIAL_CONTACT_METHOD;
    useUnsavedChangesWarning(dirty && !saved);

    const handleFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setForm((current) => ({ ...current, [name]: value }));
        setSaved(false);
    };

    const handleToggleEnabled = (type: AlertType) => {
        setPreferences((current) => toggleEnabled(current, type));
        setSaved(false);
    };

    const handleToggleChannel = (type: AlertType, channel: AlertChannel) => {
        setPreferences((current) => toggleChannel(current, type, channel));
        setSaved(false);
    };

    const handlePrivacyToggle = (id: PrivacyControlId) => {
        setPrivacy((current) => ({ ...current, [id]: !current[id] }));
        setSaved(false);
    };

    const handleContactMethodChange = (method: ContactMethod) => {
        setContactMethod(method);
        setSaved(false);
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        setSaved(true);
    };

    const handleReset = () => {
        setForm(INITIAL_PROFILE);
        setPreferences(initialPreferences);
        setPrivacy(INITIAL_PRIVACY_STATE);
        setContactMethod(INITIAL_CONTACT_METHOD);
        setSaved(false);
    };

    const handleSecurityAction = (id: SettingsDialogKey) => {
        setPasswordUpdated(false);
        setDialog(id);
    };

    const downloadData = () => {
        const payload = {
            profile: form,
            contactMethod,
            privacy,
            alertPreferences: preferences,
        };
        const blob = new Blob([JSON.stringify(payload, null, 2)], {
            type: "application/json",
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = DATA_EXPORT_FILENAME;
        link.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="flex flex-col gap-4">
            <DashboardSettingsHeader
                dirty={dirty}
                saved={saved}
                onReset={handleReset}
            />

            <DashboardSettingsStatBand
                stats={buildDashboardSettingsStats(form, preferences)}
            />

            {saved && (
                <Callout
                    variant="success"
                    title={SAVED_TITLE}
                    description={SAVED_LEDE}
                />
            )}

            {passwordUpdated && (
                <Callout
                    variant="success"
                    title={PASSWORD_TITLE}
                    description={PASSWORD_LEDE}
                />
            )}

            {deletionScheduled && (
                <Callout
                    variant="error"
                    title={DELETION_TITLE}
                    description={DELETION_LEDE}
                    action={
                        <Button
                            type="button"
                            variant="secondary"
                            size="sm"
                            onClick={() => setDeletionScheduled(false)}
                        >
                            {RESTORE_ACTION}
                        </Button>
                    }
                />
            )}

            <div className="console-split gap-3">
                <DashboardSettingsMain
                    form={form}
                    preferences={preferences}
                    privacy={privacy}
                    pending={pending}
                    onFieldChange={handleFieldChange}
                    onToggleEnabled={handleToggleEnabled}
                    onToggleChannel={handleToggleChannel}
                    onSubmit={handleSubmit}
                />
                <DashboardSettingsRail
                    privacy={privacy}
                    contactMethod={contactMethod}
                    twoFactorEnabled={twoFactorEnabled}
                    onPrivacyToggle={handlePrivacyToggle}
                    onContactMethodChange={handleContactMethodChange}
                    onSecurityAction={handleSecurityAction}
                    onDownloadData={downloadData}
                />
            </div>

            <PasswordModal
                open={dialog === "password"}
                onClose={() => setDialog(null)}
                onPasswordUpdated={() => setPasswordUpdated(true)}
            />

            <TwoFactorModal
                open={dialog === "two-factor"}
                enabled={twoFactorEnabled}
                onClose={() => setDialog(null)}
                onEnabledChange={setTwoFactorEnabled}
            />

            <DeleteAccountModal
                open={dialog === "delete"}
                onClose={() => setDialog(null)}
                onConfirm={() => setDeletionScheduled(true)}
            />
        </div>
    );
}

DashboardSettingsConsole.displayName = "DashboardSettingsConsole";

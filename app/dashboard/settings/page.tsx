"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { ProfilePanel } from "@/components/features/settings/profile-panel";
import { PropertyPreferencesPanel } from "@/components/features/settings/property-preferences-panel";
import { ContactPreferencesPanel } from "@/components/features/settings/contact-preferences-panel";
import { NotificationPreferencesPanel } from "@/components/features/settings/notification-preferences-panel";
import { AccountPanel } from "@/components/features/settings/account-panel";
import { PasswordModal } from "@/components/features/settings/password-modal";
import { TwoFactorModal } from "@/components/features/settings/two-factor-modal";
import { DeleteAccountModal } from "@/components/features/settings/delete-account-modal";
import {
    DATA_EXPORT_FILENAME,
    INITIAL_NOTIFICATIONS,
    INITIAL_PROFILE,
    SAVED_FEEDBACK_MS,
    type ContactMethod,
    type NotificationPreferences,
    type SettingsDialogKey,
} from "@/lib/data/dashboard-settings";

export default function SettingsPage() {
    const [formData, setFormData] = useState(INITIAL_PROFILE);
    const [saved, setSaved] = useState(false);
    const [contactMethod, setContactMethod] = useState<ContactMethod>("email");
    const [visibleToAgents, setVisibleToAgents] = useState(true);
    const [analyticsOptIn, setAnalyticsOptIn] = useState(false);
    const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
    const [dialog, setDialog] = useState<SettingsDialogKey | null>(null);
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
    const [deletionScheduled, setDeletionScheduled] = useState(false);
    const [passwordUpdated, setPasswordUpdated] = useState(false);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        setSaved(true);
        setTimeout(() => setSaved(false), SAVED_FEEDBACK_MS);
    };

    const resetForm = () => setFormData(INITIAL_PROFILE);

    const handleNotificationChange = (
        key: keyof NotificationPreferences,
        enabled: boolean,
    ) => setNotifications((prev) => ({ ...prev, [key]: enabled }));

    const handlePasswordUpdated = () => {
        setPasswordUpdated(true);
        setTimeout(() => setPasswordUpdated(false), SAVED_FEEDBACK_MS);
    };

    const downloadData = () => {
        const payload = {
            profile: formData,
            preferences: {
                contactMethod,
                visibleToAgents,
                analyticsOptIn,
                notifications,
            },
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
        <div className="max-w-2xl space-y-3">
            <PageHeader
                title="Settings"
                description="Manage your profile and preferences"
            />

            <ProfilePanel
                values={formData}
                saved={saved}
                onChange={handleChange}
                onSubmit={handleSubmit}
                onReset={resetForm}
            />

            <PropertyPreferencesPanel
                values={formData}
                saved={saved}
                onChange={handleChange}
                onSubmit={handleSubmit}
                onReset={resetForm}
            />

            <ContactPreferencesPanel
                contactMethod={contactMethod}
                visibleToAgents={visibleToAgents}
                analyticsOptIn={analyticsOptIn}
                onContactMethodChange={setContactMethod}
                onVisibleToAgentsChange={setVisibleToAgents}
                onAnalyticsOptInChange={setAnalyticsOptIn}
            />

            <NotificationPreferencesPanel
                notifications={notifications}
                onChange={handleNotificationChange}
            />

            <AccountPanel
                passwordUpdated={passwordUpdated}
                deletionScheduled={deletionScheduled}
                twoFactorEnabled={twoFactorEnabled}
                onOpenDialog={setDialog}
                onDownloadData={downloadData}
                onRestoreAccount={() => setDeletionScheduled(false)}
            />

            <PasswordModal
                open={dialog === "password"}
                onClose={() => setDialog(null)}
                onPasswordUpdated={handlePasswordUpdated}
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

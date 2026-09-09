"use client";

import type { ChangeEvent, FormEvent } from "react";
import { Panel } from "@/components/ui/panel";
import { PanelInset } from "@/components/ui/panel-inset";
import { ConfigPanel } from "@/components/features/shared/config-panel";
import { ProfilePhotoUploader } from "@/components/features/settings/profile-photo-uploader";
import { IdentityVerificationPanel } from "@/components/features/settings/identity-verification-panel";
import { AlertPreferenceList } from "@/components/features/dashboard/alert-preference-list";
import { DashboardSettingsProfileHero } from "@/components/sections/dashboard/dashboard-settings-profile-hero";
import { deliverySummary, enabledAlertCount } from "@/lib/data/alerts";
import {} from "@/lib/data/buyer-account";
import {
    DASHBOARD_SETTINGS_FORM_ID,
    PROFILE_FIELDS,
    type ProfileForm,
} from "@/lib/data/dashboard-settings";
import type { AlertChannel, AlertPreference, AlertType } from "@/lib/types";

const PROFILE_TITLE = "Buyer Profile";
const PROFILE_LEDE = "Details agents see when you enquire on a listing";
const DELIVERY_TITLE = "Alert Delivery";
const DELIVERY_LEDE = "Which signals fire and where each one lands";

export interface DashboardSettingsMainProps {
    form: ProfileForm;
    preferences: Record<AlertType, AlertPreference>;
    pending: number;
    strength: number;
    verified: number;
    documents: number;
    updatedAt?: string;
    avatar?: string;
    onFieldChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onToggleEnabled: (type: AlertType) => void;
    onToggleChannel: (type: AlertType, channel: AlertChannel) => void;
    onSubmit: (event: FormEvent) => void;
}

export function DashboardSettingsMain({
    form,
    preferences,
    pending,
    strength,
    verified,
    documents,
    updatedAt,
    avatar,
    onFieldChange,
    onToggleEnabled,
    onToggleChannel,
    onSubmit,
}: DashboardSettingsMainProps) {
    return (
        <div className="console-span-2 flex flex-col gap-3">
            <DashboardSettingsProfileHero
                pending={pending}
                strength={strength}
                verified={verified}
                documents={documents}
                updatedAt={updatedAt}
                enabledAlerts={enabledAlertCount(preferences)}
            />

            <form
                id={DASHBOARD_SETTINGS_FORM_ID}
                onSubmit={onSubmit}
                className="flex flex-col gap-3"
            >
                <ConfigPanel
                    title={PROFILE_TITLE}
                    description={PROFILE_LEDE}
                    fields={PROFILE_FIELDS}
                    values={form}
                    onChange={onFieldChange}
                    lead={
                        <ProfilePhotoUploader
                            name={form.fullName}
                            src={avatar}
                        />
                    }
                />
            </form>

            <Panel
                title={DELIVERY_TITLE}
                description={DELIVERY_LEDE}
                count={deliverySummary(preferences)}
            >
                <PanelInset>
                    <AlertPreferenceList
                        preferences={preferences}
                        onToggleEnabled={onToggleEnabled}
                        onToggleChannel={onToggleChannel}
                    />
                </PanelInset>
            </Panel>

            <IdentityVerificationPanel />
        </div>
    );
}

DashboardSettingsMain.displayName = "DashboardSettingsMain";

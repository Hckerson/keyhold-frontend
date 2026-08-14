"use client";

import type { ChangeEvent, FormEvent } from "react";
import { Panel } from "@/components/ui/panel";
import { PanelInset } from "@/components/ui/panel-inset";
import { ConfigPanel } from "@/components/features/settings/config-panel";
import { ProfilePhotoUploader } from "@/components/features/settings/profile-photo-uploader";
import { AlertPreferenceList } from "@/components/features/dashboard/alert-preference-list";
import { DashboardSettingsProfileHero } from "@/components/sections/dashboard/dashboard-settings-profile-hero";
import { deliverySummary, enabledAlertCount } from "@/lib/data/alerts";
import {
    sharedAudienceCount,
    type PrivacyState,
} from "@/lib/data/buyer-account";
import {
    budgetRange,
    BUDGET_FIELDS,
    DASHBOARD_SETTINGS_FORM_ID,
    PROFILE_FIELDS,
    type ProfileForm,
} from "@/lib/data/dashboard-settings";
import type { AlertChannel, AlertPreference, AlertType } from "@/lib/types";

const PROFILE_TITLE = "Buyer Profile";
const PROFILE_LEDE = "Details agents see when you enquire on a listing";
const BUDGET_TITLE = "Search Budget";
const BUDGET_LEDE = "The range every match and price alert is measured against";
const DELIVERY_TITLE = "Alert Delivery";
const DELIVERY_LEDE = "Which signals fire and where each one lands";

export interface DashboardSettingsMainProps {
    form: ProfileForm;
    preferences: Record<AlertType, AlertPreference>;
    privacy: PrivacyState;
    pending: number;
    onFieldChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onToggleEnabled: (type: AlertType) => void;
    onToggleChannel: (type: AlertType, channel: AlertChannel) => void;
    onSubmit: (event: FormEvent) => void;
}

export function DashboardSettingsMain({
    form,
    preferences,
    privacy,
    pending,
    onFieldChange,
    onToggleEnabled,
    onToggleChannel,
    onSubmit,
}: DashboardSettingsMainProps) {
    return (
        <div className="flex flex-col gap-3 lg:col-span-2">
            <DashboardSettingsProfileHero
                pending={pending}
                preferredLocation={form.preferredLocation}
                budget={budgetRange(form)}
                enabledAlerts={enabledAlertCount(preferences)}
                sharedAudiences={sharedAudienceCount(privacy)}
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
                    lead={<ProfilePhotoUploader />}
                />

                <ConfigPanel
                    title={BUDGET_TITLE}
                    description={BUDGET_LEDE}
                    fields={BUDGET_FIELDS}
                    values={form}
                    onChange={onFieldChange}
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
        </div>
    );
}

DashboardSettingsMain.displayName = "DashboardSettingsMain";

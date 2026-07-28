"use client";

import type { ChangeEvent, FormEvent } from "react";
import { Panel } from "@/components/ui/panel";
import { ConfigFieldGrid } from "@/components/patterns/config-field-grid";
import { ProfilePhotoUploader } from "@/components/features/settings/profile-photo-uploader";
import { SettingsFormActions } from "@/components/features/settings/settings-form-actions";
import {
    PROFILE_FIELDS,
    type ProfileForm,
} from "@/lib/data/dashboard-settings";

export interface ProfilePanelProps {
    values: ProfileForm;
    saved: boolean;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (event: FormEvent) => void;
    onReset: () => void;
}

export function ProfilePanel({
    values,
    saved,
    onChange,
    onSubmit,
    onReset,
}: ProfilePanelProps) {
    return (
        <Panel
            title="Profile"
            description="Update your personal details and photo"
        >
            <ProfilePhotoUploader />
            <form onSubmit={onSubmit} className="space-y-3">
                <div className="grid gap-3 sm:grid-cols-2">
                    <ConfigFieldGrid
                        fields={PROFILE_FIELDS}
                        values={values}
                        onChange={onChange}
                    />
                </div>
                <SettingsFormActions
                    saved={saved}
                    submitLabel="Save Changes"
                    resetLabel="Cancel"
                    onReset={onReset}
                />
            </form>
        </Panel>
    );
}

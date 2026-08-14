"use client";

import { Button } from "@/components/ui/button";
import { PortalHeader } from "@/components/patterns/portal-header";
import {
    DASHBOARD_SETTINGS_FORM_ID,
    PROFILE_UPDATED,
} from "@/lib/data/dashboard-settings";
import { formatAge } from "@/lib/utils";

const SETTINGS_TITLE = "Settings";
const SETTINGS_LEDE =
    "What you are searching for, who can see it, and how we reach you";
const UPDATED_PREFIX = "Buyer profile · updated";
const RESET_ACTION = "Reset";
const SAVE_ACTION = "Save Changes";
const SAVED_ACTION = "Saved";

export interface DashboardSettingsHeaderProps {
    dirty: boolean;
    saved: boolean;
    onReset: () => void;
}

export function DashboardSettingsHeader({
    dirty,
    saved,
    onReset,
}: DashboardSettingsHeaderProps) {
    return (
        <PortalHeader
            title={SETTINGS_TITLE}
            lede={SETTINGS_LEDE}
            summary={`${UPDATED_PREFIX} ${formatAge(PROFILE_UPDATED.ageMinutes)} ago by ${PROFILE_UPDATED.actor}`}
            action={
                <>
                    <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        disabled={!dirty}
                        onClick={onReset}
                    >
                        {RESET_ACTION}
                    </Button>
                    <Button
                        type="submit"
                        variant="primary"
                        size="sm"
                        form={DASHBOARD_SETTINGS_FORM_ID}
                        disabled={!dirty}
                    >
                        {saved ? SAVED_ACTION : SAVE_ACTION}
                    </Button>
                </>
            }
        />
    );
}

DashboardSettingsHeader.displayName = "DashboardSettingsHeader";

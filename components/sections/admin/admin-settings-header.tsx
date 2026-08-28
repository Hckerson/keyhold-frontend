"use client";

import { Button } from "@/components/ui/button";
import { PortalHeader } from "@/components/patterns/portal-header";
import { ENVIRONMENT_LABEL, SETTINGS_FORM_ID } from "@/lib/data/admin-settings";

const SETTINGS_TITLE = "System Settings";
const SETTINGS_LEDE =
    "What the platform charges, what it enforces, and who changed it last";
const RESET_ACTION = "Reset";
const SAVE_ACTION = "Save Changes";
const SAVED_ACTION = "Saved";

export interface AdminSettingsHeaderProps {
    dirty: boolean;
    saved: boolean;
    onReset: () => void;
}

export function AdminSettingsHeader({
    dirty,
    saved,
    onReset,
}: AdminSettingsHeaderProps) {
    return (
        <PortalHeader
            title={SETTINGS_TITLE}
            lede={SETTINGS_LEDE}
            summary={ENVIRONMENT_LABEL}
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
                        form={SETTINGS_FORM_ID}
                        disabled={!dirty}
                    >
                        {saved ? SAVED_ACTION : SAVE_ACTION}
                    </Button>
                </>
            }
        />
    );
}

AdminSettingsHeader.displayName = "AdminSettingsHeader";

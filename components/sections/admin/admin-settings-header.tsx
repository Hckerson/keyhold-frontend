"use client";

import { Button } from "@/components/ui/button";
import {
    CONFIG_REVISION,
    ENVIRONMENT_LABEL,
    SETTINGS_FORM_ID,
} from "@/lib/data/admin-settings";

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
        <header className="flex flex-wrap items-end justify-between gap-3">
            <div className="min-w-0">
                <h1 className="text-h4 font-display text-text font-light">
                    {SETTINGS_TITLE}
                </h1>
                <p className="text-text-secondary mt-0.5 text-xs">
                    {SETTINGS_LEDE}
                </p>
            </div>
            <div className="flex items-center gap-3">
                <p className="micro-label">
                    {ENVIRONMENT_LABEL} · rev {CONFIG_REVISION}
                </p>
                <div className="flex items-center gap-2">
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
                </div>
            </div>
        </header>
    );
}

AdminSettingsHeader.displayName = "AdminSettingsHeader";

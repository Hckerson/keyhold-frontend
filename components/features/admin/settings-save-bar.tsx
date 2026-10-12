"use client";

import { Button } from "@/components/ui/button";
import { SETTINGS_COPY, SETTINGS_FORM_ID } from "@/lib/data/admin-settings";
import { fixLine, unsavedLine } from "@/lib/data/admin-settings-changes";

export interface SettingsSaveBarProps {
    unsaved: string[];
    warnings: string[];
    invalid: number;
    saving: boolean;
    onReset: () => void;
}

export function SettingsSaveBar({
    unsaved,
    warnings,
    invalid,
    saving,
    onReset,
}: SettingsSaveBarProps) {
    const alerts = invalid > 0 ? [fixLine(invalid), ...warnings] : warnings;

    return (
        <div
            role="region"
            aria-label={unsavedLine(unsaved)}
            className="bg-background border-border sticky bottom-4 z-20 flex flex-wrap items-center justify-between gap-3 rounded-xl border px-4 py-3 shadow-lg"
        >
            <div className="min-w-0 flex-1 text-xs">
                <p className="text-text truncate">
                    {unsavedLine(unsaved)}
                    <span className="text-text-muted">
                        {" "}
                        · {unsaved.join(", ")}
                    </span>
                </p>
                {alerts.map((alert) => (
                    <p key={alert} className="text-error-dark mt-0.5">
                        {alert}
                    </p>
                ))}
            </div>
            <div className="flex shrink-0 items-center gap-2">
                <Button
                    type="button"
                    emphasis="quiet"
                    disabled={saving}
                    onClick={onReset}
                >
                    {SETTINGS_COPY.reset}
                </Button>
                <Button
                    type="submit"
                    form={SETTINGS_FORM_ID}
                    emphasis="solid"
                    tone="accent"
                    disabled={invalid > 0}
                    isLoading={saving}
                >
                    {SETTINGS_COPY.save}
                </Button>
            </div>
        </div>
    );
}

SettingsSaveBar.displayName = "SettingsSaveBar";

"use client";

import { Button } from "@/components/ui/button";

export interface SettingsFormActionsProps {
    saved: boolean;
    submitLabel: string;
    resetLabel: string;
    onReset: () => void;
}

export function SettingsFormActions({
    saved,
    submitLabel,
    resetLabel,
    onReset,
}: SettingsFormActionsProps) {
    return (
        <div className="flex gap-2">
            <Button variant="primary" size="sm" type="submit">
                {saved ? "Saved!" : submitLabel}
            </Button>
            <Button
                variant="secondary"
                size="sm"
                type="button"
                onClick={onReset}
            >
                {resetLabel}
            </Button>
        </div>
    );
}

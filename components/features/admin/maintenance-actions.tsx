"use client";

import { Button } from "@/components/ui/button";
import { SettingRow } from "@/components/patterns/setting-row";
import { MAINTENANCE_ACTIONS } from "@/lib/config/admin-settings";
import type { MaintenanceActionId } from "@/lib/types";

export interface MaintenanceActionsProps {
    pending?: MaintenanceActionId;
    onRun: (id: MaintenanceActionId) => void;
}

export function MaintenanceActions({
    pending,
    onRun,
}: MaintenanceActionsProps) {
    return (
        <ul className="divide-border-light divide-y">
            {MAINTENANCE_ACTIONS.map((action) => (
                <SettingRow
                    key={action.id}
                    title={action.title}
                    caption={action.caption}
                >
                    <Button
                        type="button"
                        emphasis="outline"
                        tone="neutral"
                        isLoading={pending === action.id}
                        disabled={pending !== undefined}
                        onClick={() => onRun(action.id)}
                    >
                        {action.label}
                    </Button>
                </SettingRow>
            ))}
        </ul>
    );
}

MaintenanceActions.displayName = "MaintenanceActions";

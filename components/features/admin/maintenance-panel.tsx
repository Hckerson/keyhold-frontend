"use client";

import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { ActionRow } from "@/components/ui/action-row";
import { MAINTENANCE_ACTIONS } from "@/lib/config/admin-settings";
import type { MaintenanceActionId } from "@/lib/types";

const PANEL_TITLE = "Maintenance";
const PANEL_LEDE = "Operational and destructive actions, run one at a time";

export interface MaintenancePanelProps {
    pending?: MaintenanceActionId;
    onRun: (id: MaintenanceActionId) => void;
}

export function MaintenancePanel({ pending, onRun }: MaintenancePanelProps) {
    return (
        <Panel
            title={PANEL_TITLE}
            description={PANEL_LEDE}
            className="border-border-dark"
        >
            {MAINTENANCE_ACTIONS.map((action) => (
                <ActionRow
                    key={action.id}
                    danger={action.danger}
                    title={action.title}
                    description={action.caption}
                    action={
                        <Button
                            type="button"
                            emphasis={action.danger ? "outline" : "quiet"}
                            tone={action.danger ? "error" : "neutral"}
                            isLoading={pending === action.id}
                            disabled={pending !== undefined}
                            onClick={() => onRun(action.id)}
                        >
                            {action.label}
                        </Button>
                    }
                />
            ))}
        </Panel>
    );
}

MaintenancePanel.displayName = "MaintenancePanel";

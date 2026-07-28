import { ActionRow } from "@/components/ui/action-row";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";

export function AdminMaintenancePanel() {
    return (
        <Panel
            title="Maintenance"
            description="Operations that affect the entire platform"
        >
            <div className="space-y-2">
                <ActionRow
                    title="Rotate API Keys"
                    description="Issue new server keys and revoke the current pair"
                    action={
                        <Button variant="secondary" size="sm">
                            Rotate
                        </Button>
                    }
                />
                <ActionRow
                    title="Export Audit Log"
                    description="Download every moderation and payout action"
                    action={
                        <Button variant="secondary" size="sm">
                            Export
                        </Button>
                    }
                />
                <ActionRow
                    danger
                    title="Purge Listing Cache"
                    description="Force a full re-index of the public marketplace"
                    action={
                        <Button variant="outline-danger" size="sm">
                            Purge
                        </Button>
                    }
                />
            </div>
        </Panel>
    );
}

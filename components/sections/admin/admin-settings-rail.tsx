import { Panel } from "@/components/ui/panel";
import { PanelInset } from "@/components/ui/panel-inset";
import { PanelLink } from "@/components/features/shared/panel-link";
import { ConfigChangeTable } from "@/components/features/admin/config-change-table";
import { MaintenanceOperationList } from "@/components/features/admin/maintenance-operation-list";
import {
    CONFIG_CHANGES,
    MAINTENANCE_OPERATIONS,
} from "@/lib/data/admin-policies";

const CHANGES_TITLE = "Change Log";
const CHANGES_LEDE = "Who moved a setting and what it moved from";
const CHANGES_ACTION = "Reports";
const MAINTENANCE_TITLE = "Maintenance";
const MAINTENANCE_LEDE = "Operations that affect the entire platform";

export function AdminSettingsRail() {
    return (
        <div className="flex flex-col gap-3">
            <Panel
                title={CHANGES_TITLE}
                description={CHANGES_LEDE}
                count={CONFIG_CHANGES.length}
                action={
                    <PanelLink href="/admin/reports" label={CHANGES_ACTION} />
                }
            >
                <PanelInset scroll>
                    <ConfigChangeTable changes={CONFIG_CHANGES} />
                </PanelInset>
            </Panel>

            <Panel
                title={MAINTENANCE_TITLE}
                description={MAINTENANCE_LEDE}
                count={MAINTENANCE_OPERATIONS.length}
            >
                <MaintenanceOperationList operations={MAINTENANCE_OPERATIONS} />
            </Panel>
        </div>
    );
}

AdminSettingsRail.displayName = "AdminSettingsRail";

import { Panel } from "@/components/ui/panel";
import { PanelInset } from "@/components/ui/panel-inset";
import { PanelLink } from "@/components/features/shared/panel-link";
import { EmptyState } from "@/components/ui/empty-state";
import { History } from "lucide-react";
import { ConfigChangeTable } from "@/components/features/admin/config-change-table";
import type { ConfigChange } from "@/lib/types";

const CHANGES_TITLE = "Change Log";
const CHANGES_LEDE = "Who moved a setting and what it moved from";
const CHANGES_ACTION = "Reports";
const EMPTY_TITLE = "No changes recorded";
const EMPTY_LEDE = "Audited actions appear here as they happen.";

export interface AdminSettingsRailProps {
    changes: ConfigChange[];
}

export function AdminSettingsRail({ changes }: AdminSettingsRailProps) {
    return (
        <div className="flex flex-col gap-3">
            <Panel
                title={CHANGES_TITLE}
                description={CHANGES_LEDE}
                count={changes.length}
                action={
                    <PanelLink href="/admin/reports" label={CHANGES_ACTION} />
                }
            >
                {changes.length > 0 ? (
                    <PanelInset scroll>
                        <ConfigChangeTable changes={changes} />
                    </PanelInset>
                ) : (
                    <EmptyState
                        icon={History}
                        title={EMPTY_TITLE}
                        description={EMPTY_LEDE}
                    />
                )}
            </Panel>
        </div>
    );
}

AdminSettingsRail.displayName = "AdminSettingsRail";

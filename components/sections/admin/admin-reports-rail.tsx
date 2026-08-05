import { Panel } from "@/components/ui/panel";
import { PanelInset } from "@/components/ui/panel-inset";
import { PanelLink } from "@/components/features/shared/panel-link";
import { AudienceMix } from "@/components/features/admin/audience-mix";
import { ReportSignalTable } from "@/components/features/admin/report-signal-table";
import {
    REPORT_SIGNALS,
    TOTAL_USERS_LABEL,
    USER_ROLE_SEGMENTS,
    USER_TIER_SEGMENTS,
} from "@/lib/data/admin-reports";

const SIGNALS_TITLE = "Platform Signals";
const SIGNALS_LEDE = "Month over month movement";
const AUDIENCE_TITLE = "Audience Mix";
const AUDIENCE_ACTION = "Users";
const TIER_LABEL = "By tier";

export function AdminReportsRail() {
    return (
        <div className="flex flex-col gap-3">
            <Panel
                title={SIGNALS_TITLE}
                description={SIGNALS_LEDE}
                count={REPORT_SIGNALS.length}
            >
                <PanelInset flush>
                    <ReportSignalTable signals={REPORT_SIGNALS} />
                </PanelInset>
            </Panel>

            <Panel
                title={AUDIENCE_TITLE}
                action={
                    <PanelLink href="/admin/users" label={AUDIENCE_ACTION} />
                }
                bodyClassName="pt-3"
            >
                <AudienceMix
                    roles={USER_ROLE_SEGMENTS}
                    tiers={USER_TIER_SEGMENTS}
                    total={TOTAL_USERS_LABEL}
                    tierLabel={TIER_LABEL}
                />
            </Panel>
        </div>
    );
}

AdminReportsRail.displayName = "AdminReportsRail";

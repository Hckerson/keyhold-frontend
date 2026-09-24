import { Panel } from "@/components/ui/panel";
import { PanelInset } from "@/components/ui/panel-inset";
import { PanelLink } from "@/components/features/shared/panel-link";
import { AudienceMix } from "@/components/features/admin/audience-mix";
import { ReportSignalTable } from "@/components/features/admin/report-signal-table";
import type { DonutSegment } from "@/components/ui/charts/donut-chart";
import type { ReportSignal } from "@/lib/types";

const SIGNALS_TITLE = "Platform Signals";
const SIGNALS_LEDE = "Month over month movement";
const AUDIENCE_TITLE = "Audience Mix";
const AUDIENCE_ACTION = "Users";
const TIER_LABEL = "By tier";

export interface AdminReportsRailProps {
    signals: ReportSignal[];
    roles: DonutSegment[];
    tiers: DonutSegment[];
}

export function AdminReportsRail({
    signals,
    roles,
    tiers,
}: AdminReportsRailProps) {
    return (
        <div className="flex flex-col gap-3">
            <Panel
                title={SIGNALS_TITLE}
                description={SIGNALS_LEDE}
                count={signals.length}
            >
                <PanelInset scroll>
                    <ReportSignalTable signals={signals} />
                </PanelInset>
            </Panel>

            <Panel
                title={AUDIENCE_TITLE}
                action={
                    <PanelLink href="/admin/users" label={AUDIENCE_ACTION} />
                }
            >
                <AudienceMix
                    roles={roles}
                    tiers={tiers}
                    tierLabel={TIER_LABEL}
                />
            </Panel>
        </div>
    );
}

AdminReportsRail.displayName = "AdminReportsRail";

import { Panel } from "@/components/ui/panel";
import { PanelInset } from "@/components/ui/panel-inset";
import { SkeletonRows } from "@/components/patterns/skeleton-rows";
import { PanelLink } from "@/components/features/shared/panel-link";
import { AudienceMix } from "@/components/features/admin/audience-mix";
import { ReportSignalTable } from "@/components/features/admin/report-signal-table";
import type { DonutSegment, ReportSignal } from "@/lib/types";

const SIGNALS_TITLE = "Platform Signals";
const SIGNALS_LEDE = "Month over month movement";
const AUDIENCE_TITLE = "Audience Mix";
const AUDIENCE_ACTION = "Users";
const TIER_LABEL = "By tier";
const AUDIENCE_ROWS = 2;

export interface AdminReportsRailProps {
    signals: ReportSignal[];
    roles: DonutSegment[];
    tiers: DonutSegment[];
    pending?: boolean;
}

export function AdminReportsRail({
    signals,
    roles,
    tiers,
    pending,
}: AdminReportsRailProps) {
    return (
        <div className="flex flex-col gap-3">
            <Panel
                title={SIGNALS_TITLE}
                description={SIGNALS_LEDE}
                count={signals.length}
            >
                {pending ? (
                    <SkeletonRows rows={signals.length} />
                ) : (
                    <PanelInset scroll>
                        <ReportSignalTable signals={signals} />
                    </PanelInset>
                )}
            </Panel>

            <Panel
                title={AUDIENCE_TITLE}
                action={
                    <PanelLink href="/admin/users" label={AUDIENCE_ACTION} />
                }
            >
                {pending ? (
                    <SkeletonRows rows={AUDIENCE_ROWS} />
                ) : (
                    <AudienceMix
                        roles={roles}
                        tiers={tiers}
                        tierLabel={TIER_LABEL}
                    />
                )}
            </Panel>
        </div>
    );
}

AdminReportsRail.displayName = "AdminReportsRail";

import { MapPin } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { Panel } from "@/components/ui/panel";
import { SkeletonRows } from "@/components/patterns/skeleton-rows";
import { PanelLink } from "@/components/features/shared/panel-link";
import { ReportMarketList } from "@/components/features/admin/report-market-list";
import { ReportShareList } from "@/components/features/admin/report-share-list";
import { ADMIN_ROUTES } from "@/lib/constants";
import type { ReportMarket, ReportShare } from "@/lib/types";

const MARKETS_TITLE = "Markets";
const MARKETS_LEDE = "Settled volume by region, all time";
const MARKETS_ACTION = "Listings";
const MARKETS_EMPTY = "No regional volume yet";
const MARKETS_EMPTY_LEDE = "Regions rank here once a deal settles.";
const MEMBERS_TITLE = "Members";
const MEMBERS_ACTION = "Users";
const TIERS_LABEL = "Members by tier";
const SKELETON_ROWS = 3;

export interface AdminReportsRailProps {
    markets: ReportMarket[];
    tiers: ReportShare[];
    roles: string;
    members?: string;
    pending?: boolean;
}

export function AdminReportsRail({
    markets,
    tiers,
    roles,
    members,
    pending,
}: AdminReportsRailProps) {
    return (
        <div className="console-rail flex flex-col gap-3">
            <Panel
                title={MARKETS_TITLE}
                description={MARKETS_LEDE}
                count={markets.length}
                action={
                    <PanelLink
                        href={ADMIN_ROUTES.listings}
                        label={MARKETS_ACTION}
                    />
                }
            >
                {pending ? (
                    <SkeletonRows rows={SKELETON_ROWS} />
                ) : markets.length > 0 ? (
                    <ReportMarketList markets={markets} />
                ) : (
                    <EmptyState
                        icon={MapPin}
                        title={MARKETS_EMPTY}
                        description={MARKETS_EMPTY_LEDE}
                    />
                )}
            </Panel>

            <Panel
                title={MEMBERS_TITLE}
                description={members}
                action={
                    <PanelLink
                        href={ADMIN_ROUTES.users}
                        label={MEMBERS_ACTION}
                    />
                }
            >
                {pending ? (
                    <SkeletonRows rows={SKELETON_ROWS} />
                ) : (
                    <>
                        <ReportShareList label={TIERS_LABEL} shares={tiers} />
                        <p className="text-text-muted border-border-light border-t pt-2.5 text-xs tabular-nums">
                            {roles}
                        </p>
                    </>
                )}
            </Panel>
        </div>
    );
}

AdminReportsRail.displayName = "AdminReportsRail";

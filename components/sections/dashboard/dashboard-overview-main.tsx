import { Panel } from "@/components/ui/panel";
import { PanelInset } from "@/components/ui/panel-inset";
import { PanelLink } from "@/components/features/shared/panel-link";
import { ActivityList } from "@/components/features/shared/activity-list";
import { DashboardOfferHero } from "@/components/sections/dashboard/dashboard-offer-hero";
import { OverviewViewingList } from "@/components/features/dashboard/overview-viewing-list";
import { EmptyState } from "@/components/ui/empty-state";
import { CalendarDays, History } from "lucide-react";
import type {
    OfferBook,
    OfferPosition,
    OverviewViewing,
} from "@/lib/data/dashboard-overview";
import { ACTIVITY_COPY } from "@/lib/config/activity";
import type { ActivityEntry } from "@/lib/types";

const VIEWINGS_TITLE = "Upcoming Viewings";
const VIEWINGS_LEDE = "Confirmed tours and the agent hosting each one";
const VIEWINGS_ACTION = "All viewings";
const VIEWINGS_EMPTY = "No viewings booked";
const VIEWINGS_EMPTY_LEDE =
    "Once an agent confirms a tour, it appears here with the time and host.";
const ACTIVITY = ACTIVITY_COPY.dashboard;

export interface DashboardOverviewMainProps {
    book: OfferBook;
    positions: OfferPosition[];
    viewings: OverviewViewing[];
    activity: ActivityEntry[];
}

export function DashboardOverviewMain({
    book,
    positions,
    viewings,
    activity,
}: DashboardOverviewMainProps) {
    return (
        <div className="console-span-2 flex flex-col gap-3">
            <DashboardOfferHero book={book} positions={positions} />

            <Panel
                title={VIEWINGS_TITLE}
                count={viewings.length}
                description={VIEWINGS_LEDE}
                action={
                    <PanelLink
                        href="/dashboard/viewings"
                        label={VIEWINGS_ACTION}
                    />
                }
            >
                {viewings.length > 0 ? (
                    <PanelInset>
                        <OverviewViewingList viewings={viewings} />
                    </PanelInset>
                ) : (
                    <EmptyState
                        icon={CalendarDays}
                        title={VIEWINGS_EMPTY}
                        description={VIEWINGS_EMPTY_LEDE}
                    />
                )}
            </Panel>

            <Panel title={ACTIVITY.title} count={activity.length}>
                {activity.length > 0 ? (
                    <PanelInset>
                        <ActivityList entries={activity} />
                    </PanelInset>
                ) : (
                    <EmptyState
                        icon={History}
                        title={ACTIVITY.emptyTitle}
                        description={ACTIVITY.emptyDescription}
                    />
                )}
            </Panel>
        </div>
    );
}

DashboardOverviewMain.displayName = "DashboardOverviewMain";

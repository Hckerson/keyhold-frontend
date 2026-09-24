import { CalendarDays } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { Panel } from "@/components/ui/panel";
import { PanelInset } from "@/components/ui/panel-inset";
import { PanelLink } from "@/components/features/shared/panel-link";
import { ViewingTable } from "@/components/features/dashboard/viewing-table";
import { WalkedViewingTable } from "@/components/features/dashboard/walked-viewing-table";
import { ViewingsNextHero } from "@/components/sections/dashboard/viewings-next-hero";
import { ViewingsShares } from "@/components/sections/dashboard/viewings-shares";
import { ViewingsToolbar } from "@/components/sections/dashboard/viewings-toolbar";
import type {
    ViewingModeFilter,
    ViewingStatusFilter,
} from "@/lib/data/viewings";
import type { Viewing } from "@/lib/types";

const SCHEDULE_TITLE = "Schedule";
const SCHEDULE_LEDE = "Every tour behind the one you walk next";
const SCHEDULE_ACTION = "Message agents";
const WALKED_TITLE = "Already Walked";
const WALKED_LEDE = "What you toured and where each one left you";
const EMPTY_TITLE = "Nothing matches this view";
const EMPTY_LEDE =
    "Widen the status or format filter, or clear the date to see the full schedule.";
const LOADING_TITLE = "Loading your schedule";
const LOADING_LEDE = "Fetching every viewing across your enquiries.";

export interface ViewingsMainProps {
    next?: Viewing;
    viewings: Viewing[];
    allViewings: Viewing[];
    walked: Viewing[];
    statusFilter: ViewingStatusFilter;
    modeFilter: ViewingModeFilter;
    counts: Record<ViewingStatusFilter, number>;
    dayLabel?: string;
    pending?: boolean;
    onStatusFilterChange: (filter: ViewingStatusFilter) => void;
    onModeFilterChange: (filter: ViewingModeFilter) => void;
    onClearDay: () => void;
    cancellingId: string | null;
    onReschedule: (id: string) => void;
    onCancel: (id: string) => void;
}

export function ViewingsMain({
    next,
    viewings,
    allViewings,
    walked,
    statusFilter,
    modeFilter,
    counts,
    dayLabel,
    pending,
    onStatusFilterChange,
    onModeFilterChange,
    onClearDay,
    cancellingId,
    onReschedule,
    onCancel,
}: ViewingsMainProps) {
    return (
        <div className="console-span-2 flex flex-col gap-3">
            {next && (
                <ViewingsNextHero
                    viewing={next}
                    cancelling={cancellingId === next.id}
                    onReschedule={onReschedule}
                    onCancel={onCancel}
                />
            )}

            <Panel
                title={SCHEDULE_TITLE}
                description={SCHEDULE_LEDE}
                count={viewings.length}
                action={
                    <PanelLink
                        href="/dashboard/messages"
                        label={SCHEDULE_ACTION}
                    />
                }
            >
                <ViewingsToolbar
                    statusFilter={statusFilter}
                    modeFilter={modeFilter}
                    counts={counts}
                    dayLabel={dayLabel}
                    onStatusFilterChange={onStatusFilterChange}
                    onModeFilterChange={onModeFilterChange}
                    onClearDay={onClearDay}
                />

                {viewings.length > 0 ? (
                    <PanelInset scroll>
                        <ViewingTable
                            viewings={viewings}
                            cancellingId={cancellingId}
                            onReschedule={onReschedule}
                            onCancel={onCancel}
                        />
                    </PanelInset>
                ) : (
                    <EmptyState
                        icon={CalendarDays}
                        title={pending ? LOADING_TITLE : EMPTY_TITLE}
                        description={pending ? LOADING_LEDE : EMPTY_LEDE}
                    />
                )}
            </Panel>

            {walked.length > 0 && (
                <Panel
                    title={WALKED_TITLE}
                    description={WALKED_LEDE}
                    count={walked.length}
                >
                    <PanelInset scroll>
                        <WalkedViewingTable viewings={walked} />
                    </PanelInset>
                </Panel>
            )}

            <ViewingsShares viewings={allViewings} />
        </div>
    );
}

ViewingsMain.displayName = "ViewingsMain";

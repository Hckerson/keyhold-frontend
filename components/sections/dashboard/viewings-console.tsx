"use client";

import { RescheduleViewingModal } from "@/components/features/shared/reschedule-viewing-modal";
import { ViewingDayModal } from "@/components/features/dashboard/viewing-day-modal";
import { ViewingsHeader } from "@/components/sections/dashboard/viewings-header";
import { ViewingsMain } from "@/components/sections/dashboard/viewings-main";
import { ViewingsRail } from "@/components/sections/dashboard/viewings-rail";
import { ViewingsStatBand } from "@/components/sections/dashboard/viewings-stat-band";
import { ConsoleUnavailable } from "@/components/patterns/console-unavailable";
import { CONSOLE_FALLBACKS } from "@/lib/config/console-fallbacks";
import { useViewingsConsole } from "@/lib/hooks/use-viewings-console";
import { RESCHEDULE_HINT } from "@/lib/data/viewings";

export function ViewingsConsole() {
    const view = useViewingsConsole();

    if (view.failed)
        return (
            <ConsoleUnavailable
                fallback={CONSOLE_FALLBACKS.buyerViewings}
                onRetry={() => void view.refetch()}
            />
        );

    return (
        <div className="flex flex-col gap-4">
            <ViewingsHeader summary={view.summary} />

            <ViewingsStatBand stats={view.stats} />

            <div className="console-split gap-3">
                <ViewingsMain
                    next={view.next}
                    viewings={view.visible}
                    allViewings={view.viewings}
                    walked={view.walked}
                    statusFilter={view.statusFilter}
                    modeFilter={view.modeFilter}
                    counts={view.counts}
                    dayLabel={view.dayLabel}
                    pending={view.pending}
                    onStatusFilterChange={view.setStatusFilter}
                    onModeFilterChange={view.setModeFilter}
                    onClearDay={view.clearDay}
                    onReschedule={view.startReschedule}
                    onCancel={view.cancel}
                />
                <ViewingsRail
                    year={view.calendar.year}
                    month={view.calendar.month}
                    selectedDay={view.selectedDay}
                    markedDays={view.markedDays}
                    onSelectDay={view.selectDay}
                    onMonthChange={view.changeMonth}
                />
            </div>

            <ViewingDayModal
                open={view.dayModalOpen && view.dayViewings.length > 0}
                onOpenChange={view.setDayModalOpen}
                year={view.calendar.year}
                month={view.calendar.month}
                selectedDay={view.selectedDay}
                viewings={view.dayViewings}
            />

            <RescheduleViewingModal
                address={view.rescheduleTarget?.address}
                hint={RESCHEDULE_HINT}
                pending={view.rescheduling}
                draft={view.draft}
                onDraftChange={view.setDraft}
                onClose={view.closeReschedule}
                onConfirm={view.confirmReschedule}
            />
        </div>
    );
}

ViewingsConsole.displayName = "ViewingsConsole";

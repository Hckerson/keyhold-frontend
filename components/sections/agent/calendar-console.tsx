"use client";

import { CalendarHeader } from "@/components/sections/agent/calendar-header";
import { CalendarStatBand } from "@/components/sections/agent/calendar-stat-band";
import { CalendarRail } from "@/components/sections/agent/calendar-rail";
import { CalendarSchedule } from "@/components/sections/agent/calendar-schedule";
import { RescheduleViewingModal } from "@/components/features/shared/reschedule-viewing-modal";
import { AppointmentCreateModal } from "@/components/features/agent/appointment-create-modal";
import { ConsoleUnavailable } from "@/components/patterns/console-unavailable";
import { CONSOLE_FALLBACKS } from "@/lib/config/console-fallbacks";
import { useAgentCalendar } from "@/lib/hooks/use-agent-calendar";
import {
    useDisconnectGoogleCalendar,
    useGoogleCalendarStatus,
} from "@/lib/hooks/use-google-calendar";
import type { CalendarOutcome } from "@/lib/config/calendar-sync";
import { RESCHEDULE_HINT } from "@/lib/data/agent-calendar";

export interface CalendarConsoleProps {
    calendarOutcome?: CalendarOutcome;
}

export function CalendarConsole({ calendarOutcome }: CalendarConsoleProps) {
    const calendar = useAgentCalendar();
    const calendarStatus = useGoogleCalendarStatus();
    const disconnectCalendar = useDisconnectGoogleCalendar();

    if (calendar.failed)
        return (
            <ConsoleUnavailable
                fallback={CONSOLE_FALLBACKS.agentCalendar}
                onRetry={() => void calendar.refetch()}
            />
        );

    return (
        <div className="flex flex-col gap-4">
            <CalendarHeader
                summary={`${calendar.visible.length} in view · ${calendar.rangeLabel}`}
                onCreate={calendar.openCreate}
            />

            <CalendarStatBand
                appointments={calendar.weekItems}
                pending={calendar.pending}
            />

            <div className="console-split console-split--quarters gap-3">
                <CalendarRail
                    year={calendar.year}
                    month={calendar.month}
                    selected={calendar.selected}
                    marked={calendar.marked}
                    today={calendar.today}
                    shares={calendar.shares}
                    rangeLabel={calendar.rangeLabel}
                    onSelect={calendar.setSelected}
                    onMonthChange={calendar.changeMonth}
                    calendarStatus={calendarStatus.data}
                    calendarOutcome={calendarOutcome}
                    disconnectingCalendar={disconnectCalendar.isPending}
                    onDisconnectCalendar={() => disconnectCalendar.mutate()}
                />

                <CalendarSchedule
                    className="console-span-3"
                    view={calendar.view}
                    appointments={calendar.visible}
                    selectedIso={calendar.selectedIso}
                    rangeLabel={calendar.rangeLabel}
                    dayCount={calendar.dayCount}
                    weekCount={calendar.weekCount}
                    onViewChange={calendar.setView}
                    onReschedule={calendar.startReschedule}
                />
            </div>

            <RescheduleViewingModal
                address={calendar.rescheduleAddress}
                hint={RESCHEDULE_HINT}
                pending={calendar.rescheduling}
                draft={calendar.draft}
                onDraftChange={calendar.setDraft}
                onClose={calendar.closeReschedule}
                onConfirm={calendar.confirmReschedule}
            />

            <AppointmentCreateModal
                open={calendar.creating}
                clients={calendar.clients}
                pending={calendar.createPending}
                failed={calendar.createFailed}
                onClose={calendar.closeCreate}
                onSubmit={calendar.submitCreate}
            />
        </div>
    );
}

CalendarConsole.displayName = "CalendarConsole";

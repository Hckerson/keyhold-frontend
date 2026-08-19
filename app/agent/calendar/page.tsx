"use client";

import { CalendarHeader } from "@/components/sections/agent/calendar-header";
import { CalendarStatBand } from "@/components/sections/agent/calendar-stat-band";
import { CalendarRail } from "@/components/sections/agent/calendar-rail";
import { CalendarSchedule } from "@/components/sections/agent/calendar-schedule";
import { useAgentCalendar } from "@/lib/hooks/use-agent-calendar";

export default function AgentCalendarPage() {
    const calendar = useAgentCalendar();

    return (
        <div className="flex flex-col gap-4">
            <CalendarHeader
                summary={`${calendar.visible.length} in view · ${calendar.rangeLabel}`}
            />

            <CalendarStatBand appointments={calendar.weekItems} />

            <div className="console-split console-split--quarters gap-3">
                <CalendarRail
                    className="lg:col-span-1"
                    year={calendar.year}
                    month={calendar.month}
                    selected={calendar.selected}
                    marked={calendar.marked}
                    today={calendar.today}
                    shares={calendar.shares}
                    rangeLabel={calendar.rangeLabel}
                    onSelect={calendar.setSelected}
                    onMonthChange={calendar.changeMonth}
                />

                <CalendarSchedule
                    className="lg:col-span-3"
                    view={calendar.view}
                    appointments={calendar.visible}
                    selectedIso={calendar.selectedIso}
                    rangeLabel={calendar.rangeLabel}
                    dayCount={calendar.dayCount}
                    weekCount={calendar.weekCount}
                    onViewChange={calendar.setView}
                />
            </div>
        </div>
    );
}

"use client";

import { useMemo, useState } from "react";
import { CalendarHeader } from "@/components/sections/agent/calendar-header";
import { CalendarStatBand } from "@/components/sections/agent/calendar-stat-band";
import { CalendarRail } from "@/components/sections/agent/calendar-rail";
import { CalendarSchedule } from "@/components/sections/agent/calendar-schedule";
import {
    ANCHOR,
    appointmentDays,
    appointmentTypeMix,
    appointmentsInRange,
    appointmentsInView,
    appointmentsOn,
    isoOf,
    shortDate,
    weekBounds,
    type CalendarViewMode,
} from "@/lib/data/agent-calendar";

export default function AgentCalendarPage() {
    const [year, setYear] = useState(ANCHOR.year);
    const [month, setMonth] = useState(ANCHOR.month);
    const [selected, setSelected] = useState(ANCHOR.day);
    const [view, setView] = useState<CalendarViewMode>("month");

    const selectedIso = isoOf(year, month, selected);

    const { start, end } = useMemo(
        () => weekBounds(selectedIso),
        [selectedIso],
    );
    const marked = useMemo(() => appointmentDays(year, month), [year, month]);
    const dayItems = useMemo(() => appointmentsOn(selectedIso), [selectedIso]);
    const weekItems = useMemo(
        () => appointmentsInRange(start, end),
        [start, end],
    );
    const visible = useMemo(
        () => appointmentsInView(view, selectedIso, start, end),
        [view, selectedIso, start, end],
    );
    const shares = useMemo(() => appointmentTypeMix(weekItems), [weekItems]);

    const handleMonthChange = (nextYear: number, nextMonth: number) => {
        setYear(nextYear);
        setMonth(nextMonth);
        setSelected(1);
    };

    const rangeLabel = `${shortDate(start)} – ${shortDate(end)}`;

    return (
        <div className="flex flex-col gap-4">
            <CalendarHeader
                summary={`${visible.length} in view · ${rangeLabel}`}
            />

            <CalendarStatBand appointments={weekItems} />

            <div className="grid grid-cols-1 gap-3 lg:grid-cols-4">
                <CalendarRail
                    className="lg:col-span-1"
                    year={year}
                    month={month}
                    selected={selected}
                    marked={marked}
                    today={
                        year === ANCHOR.year && month === ANCHOR.month
                            ? ANCHOR.day
                            : undefined
                    }
                    shares={shares}
                    rangeLabel={rangeLabel}
                    onSelect={setSelected}
                    onMonthChange={handleMonthChange}
                />

                <CalendarSchedule
                    className="lg:col-span-3"
                    view={view}
                    appointments={visible}
                    selectedIso={selectedIso}
                    rangeLabel={rangeLabel}
                    dayCount={dayItems.length}
                    weekCount={weekItems.length}
                    onViewChange={setView}
                />
            </div>
        </div>
    );
}

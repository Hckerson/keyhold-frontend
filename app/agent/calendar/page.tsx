"use client";

import { useMemo, useState } from "react";
import { CalendarX2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { PageHeader } from "@/components/ui/page-header";
import { EmptyState } from "@/components/ui/empty-state";
import { FilterPills } from "@/components/patterns/filter-pills";
import {
    MiniCalendar,
    monthLabel,
} from "@/components/features/shared/mini-calendar";
import { AppointmentRow } from "@/components/features/agent/appointment-row";
import { CalendarLegend } from "@/components/features/agent/calendar-legend";
import { CalendarWeekSummary } from "@/components/features/agent/calendar-week-summary";
import {
    ANCHOR,
    VIEW_MODES,
    appointmentsInRange,
    appointmentsOn,
    formatDay,
    groupAppointmentsByDate,
    isoOf,
    markedDays,
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
    const isMonthView = view === "month";

    const marked = useMemo(() => markedDays(year, month), [year, month]);

    const { start, end } = useMemo(
        () => weekBounds(selectedIso),
        [selectedIso],
    );

    const visible = useMemo(() => {
        const scoped = isMonthView
            ? appointmentsOn(selectedIso)
            : appointmentsInRange(start, end);
        return scoped.sort((a, b) => a.date.localeCompare(b.date));
    }, [isMonthView, selectedIso, start, end]);

    const grouped = useMemo(() => groupAppointmentsByDate(visible), [visible]);

    const handleMonthChange = (nextYear: number, nextMonth: number) => {
        setYear(nextYear);
        setMonth(nextMonth);
        setSelected(1);
    };

    const todayDay =
        year === ANCHOR.year && month === ANCHOR.month ? ANCHOR.day : undefined;
    const rangeLabel = `${shortDate(start)} – ${shortDate(end)}`;
    const scheduleTitle = isMonthView
        ? "Schedule"
        : `Week of ${shortDate(start)}`;
    const emptyDescription = isMonthView
        ? `No appointments on ${formatDay(selectedIso)}.`
        : "No appointments this week.";

    return (
        <div className="space-y-3">
            <PageHeader
                title="Calendar"
                description={`${visible.length} appointment${
                    visible.length === 1 ? "" : "s"
                } in view`}
                action={
                    <Button variant="primary" size="sm">
                        Schedule Appointment
                    </Button>
                }
            />

            <div className="grid gap-3 lg:grid-cols-4">
                <div className="space-y-3 lg:col-span-1">
                    <Panel title={monthLabel(year, month)}>
                        <MiniCalendar
                            year={year}
                            month={month}
                            selected={selected}
                            onSelect={setSelected}
                            onMonthChange={handleMonthChange}
                            marked={marked}
                            today={todayDay}
                        />
                    </Panel>

                    <CalendarLegend />
                </div>

                <div className="space-y-3 lg:col-span-3">
                    <Panel
                        title={scheduleTitle}
                        description={
                            isMonthView ? formatDay(selectedIso) : rangeLabel
                        }
                        count={visible.length}
                        action={
                            <FilterPills
                                filters={VIEW_MODES}
                                active={view}
                                onChange={setView}
                            />
                        }
                    >
                        {visible.length > 0 ? (
                            <div className="space-y-3">
                                {grouped.map((group) => (
                                    <div key={group.date} className="space-y-3">
                                        {!isMonthView && (
                                            <p className="text-text-muted font-mono text-[10px] tracking-wide uppercase">
                                                {formatDay(group.date)}
                                            </p>
                                        )}
                                        {group.items.map((appointment) => (
                                            <AppointmentRow
                                                key={appointment.id}
                                                appointment={appointment}
                                            />
                                        ))}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <EmptyState
                                icon={CalendarX2}
                                title="Nothing scheduled"
                                description={emptyDescription}
                                action={
                                    <Button variant="secondary" size="sm">
                                        Schedule Appointment
                                    </Button>
                                }
                            />
                        )}
                    </Panel>

                    <CalendarWeekSummary start={start} end={end} />
                </div>
            </div>
        </div>
    );
}

"use client";

import { useMemo, useState } from "react";
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
import { useIncomingConnections } from "@/lib/hooks/use-connections";
import { toAppointmentBook } from "@/lib/utils/to-appointment";

const DEFAULT_VIEW: CalendarViewMode = "month";

export function useAgentCalendar() {
    const connections = useIncomingConnections();

    const [year, setYear] = useState(ANCHOR.year);
    const [month, setMonth] = useState(ANCHOR.month);
    const [selected, setSelected] = useState(ANCHOR.day);
    const [view, setView] = useState<CalendarViewMode>(DEFAULT_VIEW);

    const book = useMemo(
        () => toAppointmentBook(connections.data ?? []),
        [connections.data],
    );

    const selectedIso = isoOf(year, month, selected);

    const { start, end } = useMemo(
        () => weekBounds(selectedIso),
        [selectedIso],
    );
    const marked = useMemo(
        () => appointmentDays(book, year, month),
        [book, year, month],
    );
    const dayItems = useMemo(
        () => appointmentsOn(book, selectedIso),
        [book, selectedIso],
    );
    const weekItems = useMemo(
        () => appointmentsInRange(book, start, end),
        [book, start, end],
    );
    const visible = useMemo(
        () => appointmentsInView(book, view, selectedIso, start, end),
        [book, view, selectedIso, start, end],
    );
    const shares = useMemo(() => appointmentTypeMix(weekItems), [weekItems]);

    const changeMonth = (nextYear: number, nextMonth: number) => {
        setYear(nextYear);
        setMonth(nextMonth);
        setSelected(1);
    };

    const isAnchorMonth = year === ANCHOR.year && month === ANCHOR.month;

    return {
        year,
        month,
        selected,
        view,
        selectedIso,
        marked,
        shares,
        visible,
        dayCount: dayItems.length,
        weekCount: weekItems.length,
        weekItems,
        pending: connections.isPending,
        failed: connections.isError,
        refetch: connections.refetch,
        rangeLabel: `${shortDate(start)} – ${shortDate(end)}`,
        today: isAnchorMonth ? ANCHOR.day : undefined,
        setSelected,
        setView,
        changeMonth,
    };
}

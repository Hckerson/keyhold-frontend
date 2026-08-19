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

const DEFAULT_VIEW: CalendarViewMode = "month";

export function useAgentCalendar() {
    const [year, setYear] = useState(ANCHOR.year);
    const [month, setMonth] = useState(ANCHOR.month);
    const [selected, setSelected] = useState(ANCHOR.day);
    const [view, setView] = useState<CalendarViewMode>(DEFAULT_VIEW);

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
        rangeLabel: `${shortDate(start)} – ${shortDate(end)}`,
        today: isAnchorMonth ? ANCHOR.day : undefined,
        setSelected,
        setView,
        changeMonth,
    };
}

"use client";

import { useCallback, useMemo, useState } from "react";
import {
    ANCHOR,
    appointmentDays,
    appointmentTypeMix,
    appointmentsInRange,
    appointmentsInView,
    appointmentsOn,
    isoOf,
    shortDate,
    toRescheduleDraft,
    weekBounds,
    type CalendarViewMode,
} from "@/lib/data/agent-calendar";
import { useIncomingConnections } from "@/lib/hooks/use-connections";
import { useRescheduleViewing } from "@/lib/hooks/use-viewings";
import { toAppointmentBook } from "@/lib/utils/to-appointment";
import { draftToIso } from "@/lib/utils/to-viewing";
import type { RescheduleDraft } from "@/lib/types";

const DEFAULT_VIEW: CalendarViewMode = "month";
const EMPTY_DRAFT: RescheduleDraft = { date: "", time: "" };

export function useAgentCalendar() {
    const connections = useIncomingConnections();
    const rescheduleViewing = useRescheduleViewing();

    const [year, setYear] = useState(ANCHOR.year);
    const [month, setMonth] = useState(ANCHOR.month);
    const [selected, setSelected] = useState(ANCHOR.day);
    const [view, setView] = useState<CalendarViewMode>(DEFAULT_VIEW);
    const [rescheduleId, setRescheduleId] = useState<string | null>(null);
    const [draft, setDraft] = useState<RescheduleDraft>(EMPTY_DRAFT);

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

    const startReschedule = useCallback(
        (id: string) => {
            const target = book.find((appointment) => appointment.id === id);
            if (!target) return;
            setDraft(toRescheduleDraft(target));
            setRescheduleId(id);
        },
        [book],
    );

    const closeReschedule = useCallback(() => setRescheduleId(null), []);

    const confirmReschedule = () => {
        const proposed = draftToIso(draft);
        if (!rescheduleId || !proposed) return;
        rescheduleViewing.mutate(
            { id: rescheduleId, proposedTimes: [proposed] },
            { onSuccess: () => setRescheduleId(null) },
        );
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
        draft,
        pending: connections.isPending,
        rescheduling: rescheduleViewing.isPending,
        rescheduleAddress: book.find(
            (appointment) => appointment.id === rescheduleId,
        )?.property,
        failed: connections.isError,
        refetch: connections.refetch,
        rangeLabel: `${shortDate(start)} – ${shortDate(end)}`,
        today: isAnchorMonth ? ANCHOR.day : undefined,
        setSelected,
        setView,
        setDraft,
        changeMonth,
        startReschedule,
        closeReschedule,
        confirmReschedule,
    };
}

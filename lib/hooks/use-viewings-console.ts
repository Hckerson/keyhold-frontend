"use client";

import { useCallback, useMemo, useState } from "react";
import {
    TODAY,
    cancelViewingById,
    countByStatus,
    dayFilterLabel,
    initialViewings,
    isOnDay,
    markedDaysInMonth,
    matchesFilters,
    nextViewing,
    rankViewings,
    rescheduleViewing,
    scheduledViewings,
    viewingStats,
    viewingsOnDate,
    viewingsSummary,
    walkedViewings,
    type ViewingModeFilter,
    type ViewingStatusFilter,
} from "@/lib/data/viewings";
import type { RescheduleDraft } from "@/lib/types";

const EMPTY_DRAFT: RescheduleDraft = { date: "", time: "" };

export function useViewingsConsole() {
    const [viewings, setViewings] = useState(initialViewings);
    const [calendar, setCalendar] = useState({
        year: TODAY.year,
        month: TODAY.month,
    });
    const [selectedDay, setSelectedDay] = useState<number | null>(null);
    const [dayModalOpen, setDayModalOpen] = useState(false);
    const [rescheduleId, setRescheduleId] = useState<string | null>(null);
    const [draft, setDraft] = useState<RescheduleDraft>(EMPTY_DRAFT);
    const [statusFilter, setStatusFilter] =
        useState<ViewingStatusFilter>("all");
    const [modeFilter, setModeFilter] = useState<ViewingModeFilter>("all");

    const ranked = useMemo(
        () => rankViewings(scheduledViewings(viewings)),
        [viewings],
    );
    const walked = useMemo(() => walkedViewings(viewings), [viewings]);
    const stats = useMemo(() => viewingStats(viewings), [viewings]);
    const next = useMemo(() => nextViewing(viewings), [viewings]);

    const markedDays = useMemo(
        () => markedDaysInMonth(viewings, calendar),
        [viewings, calendar],
    );

    const dayViewings = useMemo(
        () => viewingsOnDate(viewings, calendar, selectedDay),
        [viewings, calendar, selectedDay],
    );

    const dayScoped = useMemo(
        () =>
            selectedDay === null
                ? ranked
                : ranked.filter((viewing) =>
                      isOnDay(viewing, calendar, selectedDay),
                  ),
        [ranked, calendar, selectedDay],
    );

    const counts = useMemo(() => countByStatus(dayScoped), [dayScoped]);

    const visible = useMemo(
        () =>
            dayScoped.filter((viewing) =>
                matchesFilters(viewing, statusFilter, modeFilter),
            ),
        [dayScoped, statusFilter, modeFilter],
    );

    const clearDay = useCallback(() => setSelectedDay(null), []);

    const selectDay = useCallback(
        (day: number) => {
            if (day === selectedDay) {
                setSelectedDay(null);
                return;
            }
            setSelectedDay(day);
            if (markedDays.includes(day)) setDayModalOpen(true);
        },
        [selectedDay, markedDays],
    );

    const changeMonth = useCallback((year: number, month: number) => {
        setCalendar({ year, month });
        setSelectedDay(null);
    }, []);

    const startReschedule = useCallback(
        (id: string) => {
            const target = viewings.find((viewing) => viewing.id === id);
            if (!target) return;
            setDraft({ date: target.date, time: target.time });
            setRescheduleId(id);
        },
        [viewings],
    );

    const cancel = useCallback(
        (id: string) =>
            setViewings((current) => cancelViewingById(current, id)),
        [],
    );

    const closeReschedule = useCallback(() => setRescheduleId(null), []);

    const confirmReschedule = () => {
        if (!rescheduleId) return;
        setViewings((current) =>
            rescheduleViewing(current, rescheduleId, draft),
        );
        setRescheduleId(null);
    };

    return {
        viewings,
        visible,
        walked,
        stats,
        next,
        counts,
        calendar,
        selectedDay,
        markedDays,
        dayViewings,
        dayModalOpen,
        draft,
        statusFilter,
        modeFilter,
        summary: viewingsSummary(viewings),
        dayLabel:
            selectedDay === null
                ? undefined
                : dayFilterLabel(calendar, selectedDay),
        rescheduleTarget: viewings.find(
            (viewing) => viewing.id === rescheduleId,
        ),
        setDayModalOpen,
        setDraft,
        setStatusFilter,
        setModeFilter,
        clearDay,
        selectDay,
        changeMonth,
        startReschedule,
        cancel,
        closeReschedule,
        confirmReschedule,
    };
}

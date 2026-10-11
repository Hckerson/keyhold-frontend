"use client";

import { useCallback, useMemo, useState } from "react";
import {
    TODAY,
    countByStatus,
    dayFilterLabel,
    isOnDay,
    markedDaysInMonth,
    matchesFilters,
    nextViewing,
    rankViewings,
    scheduledViewings,
    viewingsOnDate,
    walkedViewings,
} from "@/lib/data/viewings";
import { viewingStats, viewingsSummary } from "@/lib/data/viewings-stats";
import { useMyInterests } from "@/lib/hooks/use-connections";
import { useRescheduleViewing } from "@/lib/hooks/use-viewings";
import { draftToIso, toViewingBook } from "@/lib/utils/to-viewing";
import type {
    RescheduleDraft,
    ViewingModeFilter,
    ViewingStatusFilter,
} from "@/lib/types";

const EMPTY_DRAFT: RescheduleDraft = { date: "", time: "" };

export function useViewingsConsole() {
    const interests = useMyInterests();
    const rescheduleViewing = useRescheduleViewing();

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

    const viewings = useMemo(
        () => toViewingBook(interests.data ?? []),
        [interests.data],
    );

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

    const closeReschedule = useCallback(() => setRescheduleId(null), []);

    const confirmReschedule = () => {
        const proposed = draftToIso(draft);
        if (!rescheduleId || !proposed) return;
        rescheduleViewing.mutate(
            { id: rescheduleId, proposedTimes: [proposed] },
            { onSuccess: () => setRescheduleId(null) },
        );
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
        pending: interests.isPending,
        rescheduling: rescheduleViewing.isPending,
        failed: interests.isError,
        refetch: interests.refetch,
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
        closeReschedule,
        confirmReschedule,
    };
}

"use client";

import { useCallback, useMemo, useState } from "react";
import { RescheduleViewingModal } from "@/components/features/dashboard/reschedule-viewing-modal";
import { ViewingDayModal } from "@/components/features/dashboard/viewing-day-modal";
import { ViewingsHeader } from "@/components/sections/dashboard/viewings-header";
import { ViewingsMain } from "@/components/sections/dashboard/viewings-main";
import { ViewingsRail } from "@/components/sections/dashboard/viewings-rail";
import { ViewingsStatBand } from "@/components/sections/dashboard/viewings-stat-band";
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

export function ViewingsConsole() {
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

    const onClearDay = useCallback(() => setSelectedDay(null), []);

    const onSelectDay = useCallback(
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

    const onMonthChange = useCallback((year: number, month: number) => {
        setCalendar({ year, month });
        setSelectedDay(null);
    }, []);

    const onReschedule = useCallback(
        (id: string) => {
            const target = viewings.find((viewing) => viewing.id === id);
            if (!target) return;
            setDraft({ date: target.date, time: target.time });
            setRescheduleId(id);
        },
        [viewings],
    );

    const onCancel = useCallback(
        (id: string) =>
            setViewings((current) => cancelViewingById(current, id)),
        [],
    );

    const onCloseReschedule = useCallback(() => setRescheduleId(null), []);

    const onConfirmReschedule = () => {
        if (!rescheduleId) return;
        setViewings((current) =>
            rescheduleViewing(current, rescheduleId, draft),
        );
        setRescheduleId(null);
    };

    return (
        <div className="flex flex-col gap-4">
            <ViewingsHeader summary={viewingsSummary(viewings)} />

            <ViewingsStatBand stats={stats} />

            <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
                <ViewingsMain
                    next={next}
                    viewings={visible}
                    walked={walked}
                    statusFilter={statusFilter}
                    modeFilter={modeFilter}
                    counts={counts}
                    dayLabel={
                        selectedDay === null
                            ? undefined
                            : dayFilterLabel(calendar, selectedDay)
                    }
                    onStatusFilterChange={setStatusFilter}
                    onModeFilterChange={setModeFilter}
                    onClearDay={onClearDay}
                    onReschedule={onReschedule}
                    onCancel={onCancel}
                />
                <ViewingsRail
                    viewings={viewings}
                    year={calendar.year}
                    month={calendar.month}
                    selectedDay={selectedDay}
                    markedDays={markedDays}
                    onSelectDay={onSelectDay}
                    onMonthChange={onMonthChange}
                />
            </div>

            <ViewingDayModal
                open={dayModalOpen && dayViewings.length > 0}
                onOpenChange={setDayModalOpen}
                year={calendar.year}
                month={calendar.month}
                selectedDay={selectedDay}
                viewings={dayViewings}
            />

            <RescheduleViewingModal
                viewing={viewings.find(
                    (viewing) => viewing.id === rescheduleId,
                )}
                draft={draft}
                onDraftChange={setDraft}
                onClose={onCloseReschedule}
                onConfirm={onConfirmReschedule}
            />
        </div>
    );
}

ViewingsConsole.displayName = "ViewingsConsole";

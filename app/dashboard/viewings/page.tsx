"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { PageHeader } from "@/components/ui/page-header";
import { StepList } from "@/components/ui/step-list";
import { ViewingsCalendarPanel } from "@/components/features/dashboard/viewings-calendar-panel";
import { ViewingsList } from "@/components/features/dashboard/viewings-list";
import { PastViewingsAccordion } from "@/components/features/dashboard/past-viewings-accordion";
import { ViewingDayModal } from "@/components/features/dashboard/viewing-day-modal";
import { RescheduleViewingModal } from "@/components/features/dashboard/reschedule-viewing-modal";
import {
    TODAY,
    cancelViewingById,
    howItWorks,
    initialViewings,
    markedDaysInMonth,
    pastViewings,
    rescheduleViewing,
    viewingsOnDate,
} from "@/lib/data/viewings";
import type { Viewing } from "@/lib/types";

export default function ViewingsPage() {
    const [viewings, setViewings] = useState<Viewing[]>(initialViewings);
    const [calendar, setCalendar] = useState({
        year: TODAY.year,
        month: TODAY.month,
    });
    const [selectedDay, setSelectedDay] = useState<number | null>(null);
    const [dayModalOpen, setDayModalOpen] = useState(false);
    const [rescheduleId, setRescheduleId] = useState<string | null>(null);
    const [draft, setDraft] = useState({ date: "", time: "" });

    const markedDays = useMemo(
        () => markedDaysInMonth(viewings, calendar),
        [viewings, calendar],
    );

    const selectedDateViewings = useMemo(
        () => viewingsOnDate(viewings, calendar, selectedDay),
        [viewings, calendar, selectedDay],
    );

    const visibleViewings =
        selectedDay === null ? viewings : selectedDateViewings;
    const confirmed = viewings.filter((v) => v.status === "confirmed").length;
    const rescheduling = viewings.find((v) => v.id === rescheduleId);

    const handleSelectDay = (day: number) => {
        if (day === selectedDay) {
            setSelectedDay(null);
            return;
        }
        setSelectedDay(day);
        if (markedDays.includes(day)) setDayModalOpen(true);
    };

    const handleMonthChange = (year: number, month: number) => {
        setCalendar({ year, month });
        setSelectedDay(null);
    };

    const openReschedule = (id: string) => {
        const target = viewings.find((viewing) => viewing.id === id);
        if (!target) return;
        setDraft({ date: target.date, time: target.time });
        setRescheduleId(id);
    };

    const confirmReschedule = () => {
        if (!rescheduleId) return;
        setViewings((prev) => rescheduleViewing(prev, rescheduleId, draft));
        setRescheduleId(null);
    };

    const cancelViewing = (id: string) =>
        setViewings((prev) => cancelViewingById(prev, id));

    return (
        <div className="space-y-3">
            <PageHeader
                title="Scheduled Viewings"
                description={`${confirmed} confirmed viewing${
                    confirmed !== 1 ? "s" : ""
                }`}
                action={
                    <Link href="/search">
                        <Button variant="primary" size="sm">
                            Find Properties
                        </Button>
                    </Link>
                }
            />

            <div className="grid gap-3 lg:grid-cols-3">
                <ViewingsCalendarPanel
                    year={calendar.year}
                    month={calendar.month}
                    selectedDay={selectedDay}
                    markedDays={markedDays}
                    onSelectDay={handleSelectDay}
                    onMonthChange={handleMonthChange}
                />

                <ViewingsList
                    viewings={visibleViewings}
                    year={calendar.year}
                    month={calendar.month}
                    selectedDay={selectedDay}
                    onClearDay={() => setSelectedDay(null)}
                    onReschedule={openReschedule}
                    onCancel={cancelViewing}
                />
            </div>

            <PastViewingsAccordion viewings={pastViewings} />

            <Panel title="How It Works">
                <div className="space-y-3">
                    <p className="text-text-secondary text-xs">
                        Book a viewing in three simple steps.
                    </p>
                    <StepList steps={howItWorks} />
                </div>
            </Panel>

            <ViewingDayModal
                open={dayModalOpen && selectedDateViewings.length > 0}
                onOpenChange={setDayModalOpen}
                year={calendar.year}
                month={calendar.month}
                selectedDay={selectedDay}
                viewings={selectedDateViewings}
            />

            <RescheduleViewingModal
                viewing={rescheduling}
                draft={draft}
                onDraftChange={setDraft}
                onClose={() => setRescheduleId(null)}
                onConfirm={confirmReschedule}
            />
        </div>
    );
}

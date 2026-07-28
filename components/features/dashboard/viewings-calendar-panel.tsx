"use client";

import { Panel } from "@/components/ui/panel";
import { MiniCalendar } from "@/components/features/shared/mini-calendar";
import { TODAY } from "@/lib/data/viewings";

export interface ViewingsCalendarPanelProps {
    year: number;
    month: number;
    selectedDay: number | null;
    markedDays: number[];
    onSelectDay: (day: number) => void;
    onMonthChange: (year: number, month: number) => void;
}

export function ViewingsCalendarPanel({
    year,
    month,
    selectedDay,
    markedDays,
    onSelectDay,
    onMonthChange,
}: ViewingsCalendarPanelProps) {
    return (
        <Panel title="Calendar" className="lg:col-span-1">
            <MiniCalendar
                year={year}
                month={month}
                selected={selectedDay ?? 0}
                onSelect={onSelectDay}
                onMonthChange={onMonthChange}
                marked={markedDays}
                today={
                    year === TODAY.year && month === TODAY.month
                        ? TODAY.day
                        : undefined
                }
            />
            <p className="border-border-light text-text-muted mt-3 flex items-center gap-2 border-t pt-3 text-xs">
                <span className="bg-accent size-1.5 shrink-0 rounded-full" />
                Dates with a scheduled viewing
            </p>
        </Panel>
    );
}

ViewingsCalendarPanel.displayName = "ViewingsCalendarPanel";

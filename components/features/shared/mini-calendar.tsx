"use client";

import { CalendarDayCell } from "@/components/features/shared/calendar-day-cell";
import { CalendarMonthNav } from "@/components/features/shared/calendar-month-nav";

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const MONTH_LABELS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

export const daysInMonth = (year: number, month: number) =>
    new Date(year, month + 1, 0).getDate();

export const firstWeekdayOfMonth = (year: number, month: number) =>
    new Date(year, month, 1).getDay();

export const monthLabel = (year: number, month: number) =>
    `${MONTH_LABELS[month]} ${year}`;

export const shiftMonth = (year: number, month: number, delta: number) => {
    const next = new Date(year, month + delta, 1);
    return { year: next.getFullYear(), month: next.getMonth() };
};

export interface MiniCalendarProps {
    year: number;
    month: number;
    selected: number;
    onSelect: (day: number) => void;
    onMonthChange?: (year: number, month: number) => void;
    marked?: number[];
    today?: number;
    className?: string;
}

export function MiniCalendar({
    year,
    month,
    selected,
    onSelect,
    onMonthChange,
    marked = [],
    today,
    className,
}: MiniCalendarProps) {
    const total = daysInMonth(year, month);
    const offset = firstWeekdayOfMonth(year, month);
    const monthName = monthLabel(year, month);

    return (
        <div className={className}>
            {onMonthChange && (
                <CalendarMonthNav
                    label={monthName}
                    onShift={(delta) => {
                        const next = shiftMonth(year, month, delta);
                        onMonthChange(next.year, next.month);
                    }}
                    className="mb-3 justify-between"
                />
            )}

            <div className="text-text-muted mb-2 grid grid-cols-7 gap-1 text-center font-mono text-[10px] font-medium tracking-wide uppercase select-none">
                {WEEKDAYS.map((day) => (
                    <span key={day}>{day}</span>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: offset }).map((_, index) => (
                    <span key={`lead-${index}`} aria-hidden="true" />
                ))}

                {Array.from({ length: total }).map((_, index) => {
                    const day = index + 1;
                    return (
                        <CalendarDayCell
                            key={day}
                            day={day}
                            monthName={monthName}
                            selected={day === selected}
                            today={day === today}
                            load={
                                marked.filter((entry) => entry === day).length
                            }
                            onSelect={onSelect}
                        />
                    );
                })}
            </div>
        </div>
    );
}

MiniCalendar.displayName = "MiniCalendar";

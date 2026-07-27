"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

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

    const shiftMonth = (delta: number) => {
        const next = new Date(year, month + delta, 1);
        onMonthChange?.(next.getFullYear(), next.getMonth());
    };

    return (
        <div className={className}>
            {onMonthChange && (
                <div className="mb-3 flex items-center justify-between gap-2">
                    <button
                        type="button"
                        onClick={() => shiftMonth(-1)}
                        aria-label="Previous month"
                        className="text-text-secondary hover:text-text hover:bg-background-alt focus-visible:ring-accent ease-smooth grid size-6 place-items-center rounded-md transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none"
                    >
                        <ChevronLeft size={12} strokeWidth={1.5} />
                    </button>
                    <span className="text-text text-xs font-medium">
                        {monthLabel(year, month)}
                    </span>
                    <button
                        type="button"
                        onClick={() => shiftMonth(1)}
                        aria-label="Next month"
                        className="text-text-secondary hover:text-text hover:bg-background-alt focus-visible:ring-accent ease-smooth grid size-6 place-items-center rounded-md transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none"
                    >
                        <ChevronRight size={12} strokeWidth={1.5} />
                    </button>
                </div>
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
                    const isSelected = day === selected;
                    const isMarked = marked.includes(day);
                    const isToday = day === today;

                    return (
                        <button
                            key={day}
                            type="button"
                            onClick={() => onSelect(day)}
                            aria-pressed={isSelected}
                            aria-label={`${monthLabel(year, month)} ${day}${
                                isMarked ? ", has appointments" : ""
                            }`}
                            className={cn(
                                "ease-smooth focus-visible:ring-accent relative grid aspect-square place-items-center rounded-md text-xs tabular-nums transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none",
                                isSelected
                                    ? "bg-accent text-text-inverse font-medium"
                                    : "text-text-secondary hover:bg-background-alt",
                                !isSelected &&
                                    isToday &&
                                    "border-border-dark text-text border font-medium",
                            )}
                        >
                            {day}
                            {isMarked && !isSelected && (
                                <span className="bg-accent absolute bottom-1 size-1 rounded-full" />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

MiniCalendar.displayName = "MiniCalendar";
